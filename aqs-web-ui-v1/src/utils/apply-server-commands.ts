export type BrowserCommand = {
  verb: string;
  noun: string;
  addinf: string;
  resfil?: string;
};

/** Parse legacy browser-commands XML into a simple array */
export function parseBrowserCommands(xmlString: string): BrowserCommand[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');
  const calls = Array.from(doc.getElementsByTagName('call'));
  return calls.map((node) => ({
    verb: node.getAttribute('verb') || '',
    noun: node.getAttribute('noun') || '',
    addinf: node.getAttribute('addinf') || '',
    resfil: node.getAttribute('resfil') || '',
  }));
}

/**
 * Parse browser commands from XMLServerCall API response
 *
 * XMLServerCall returns commands in results.aqs.BrowserCtl.call array
 * with a different format than the XML cycling response.
 *
 * @param response - XMLServerCall response object
 * @returns Array of browser commands
 *
 * @example
 * ```typescript
 * const response = await xmlServerCall(payload);
 * const commands = parseBrowserCommandsFromXMLServerCall(response);
 * // Returns: [{ verb: "SET_VARIABLE", noun: "mstrPolicyID", addinf: "487672" }, ...]
 * ```
 */
export function parseBrowserCommandsFromXMLServerCall(response: {
  results?: {
    aqs?: {
      BrowserCtl?: {
        call?: unknown;
      };
    };
  };
}): BrowserCommand[] {
  try {
    const call = response.results?.aqs?.BrowserCtl?.call;

    if (!call) {
      return [];
    }

    // Handle single call object
    if (!Array.isArray(call)) {
      const cmd = call as Record<string, unknown>;
      return [
        {
          verb: String(cmd.verb || ''),
          noun: String(cmd.noun || ''),
          addinf: String(cmd.addinf || ''),
          resfil: cmd.resfil ? String(cmd.resfil) : undefined,
        },
      ];
    }

    // Handle array of calls
    return call.map((cmd) => {
      const command = cmd as Record<string, unknown>;
      return {
        verb: String(command.verb || ''),
        noun: String(command.noun || ''),
        addinf: String(command.addinf || ''),
        resfil: command.resfil ? String(command.resfil) : undefined,
      };
    });
  } catch (error) {
    console.error('Error parsing browser commands from XMLServerCall response', error);
    return [];
  }
}

/**
 * Parse browser commands from PageBuild API response
 *
 * PageBuild returns commands in Page.calls.call array when @type is "browsercommand"
 * These are initial setup commands that should be executed on page load.
 *
 * @param pageBuildData - PageBuild response object
 * @returns Array of browser commands
 *
 * @example
 * ```typescript
 * const pageBuildData = await fetchPageBuild(...);
 * const commands = parseBrowserCommandsFromPageBuild(pageBuildData);
 * // Returns: [{ verb: "SET_DISABLED", noun: "POLPOL_LPOLNUM", addinf: "T" }, ...]
 * ```
 */
export function parseBrowserCommandsFromPageBuild(pageBuildData: unknown): BrowserCommand[] {
  try {
    if (!pageBuildData || typeof pageBuildData !== 'object') {
      return [];
    }

    const data = pageBuildData as Record<string, unknown>;
    const page = data.Page as Record<string, unknown> | undefined;

    if (!page) {
      return [];
    }

    const calls = page.calls as Record<string, unknown> | undefined;

    if (!calls) {
      return [];
    }

    // Only process if calls type is "browsercommand"
    const callsType = calls['@type'];
    if (callsType !== 'browsercommand') {
      return [];
    }

    const call = calls.call as unknown;

    if (!call) {
      return [];
    }

    // Handle single call object
    if (!Array.isArray(call)) {
      const cmd = call as Record<string, unknown>;
      return [
        {
          verb: String(cmd['@verb'] || ''),
          noun: String(cmd['@noun'] || ''),
          addinf: String(cmd['@addinf'] || ''),
          resfil: cmd['@resfil'] ? String(cmd['@resfil']) : undefined,
        },
      ];
    }

    // Handle array of calls
    return call.map((cmd) => {
      const command = cmd as Record<string, unknown>;
      return {
        verb: String(command['@verb'] || ''),
        noun: String(command['@noun'] || ''),
        addinf: String(command['@addinf'] || ''),
        resfil: command['@resfil'] ? String(command['@resfil']) : undefined,
      };
    });
  } catch (error) {
    console.error('Error parsing browser commands from PageBuild response', error);
    return [];
  }
}

/**
 * Apply parsed commands using provided handlers.
 * Handlers are intentionally small and synchronous where possible.
 */
export async function applyCommands(
  commands: BrowserCommand[],
  handlers: {
    setText?: (noun: string, value: string) => void;
    setDisabled?: (noun: string, disabled: boolean) => void;
    clearCombo?: (noun: string) => void;
    loadCombo?: (noun: string, items: Array<{ value: string; label: string }>) => void;
    displayMessage?: (
      type: 'INFO' | 'WARNING' | 'ERROR',
      message: string,
    ) => Promise<number> | void;
    openWindow?: (url: string) => void;
    navigate?: (path: string, state?: any) => void;
    callServer?: (noun: string, addinf: string) => Promise<any>;
  },
) {
  for (const c of commands) {
    const verb = c.verb.toUpperCase();
    switch (verb) {
      case 'SET_TEXT':
        handlers.setText?.(c.noun, c.addinf);
        break;
      case 'SET_DISABLED':
        handlers.setDisabled?.(
          c.noun,
          c.addinf.toUpperCase() === 'T' || c.addinf.toUpperCase() === 'TRUE',
        );
        break;
      case 'CLEAR_COMBO':
        handlers.clearCombo?.(c.noun);
        break;
      case 'LOAD_COMBO':
      case 'LOAD_COMBOS':
        // legacy: server often supplies marrListItems separately; if addinf contains XML list, parse
        if (c.addinf && c.addinf.trim().startsWith('<')) {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(c.addinf, 'text/xml');
            const items = Array.from(doc.getElementsByTagName('item')).map((it) => ({
              value: it.getAttribute('value') || '',
              label: it.getAttribute('text') || it.textContent || '',
            }));
            handlers.loadCombo?.(c.noun, items);
          } catch {
            // ignore parse errors
          }
        } else {
          // no inline list - caller should fetch or already have marrListItems
        }
        break;
      case 'DISPLAY_ERROR':
      case 'DISPLAY_MESSAGE':
      case 'DISPLAY_INFORMATION': {
        const parts = c.addinf.split('##');
        const msg = parts[0] || c.addinf;
        const type = (
          parts[1] || (verb === 'DISPLAY_ERROR' ? 'ERROR' : 'WARNING')
        ).toUpperCase() as 'INFO' | 'WARNING' | 'ERROR';
        await handlers.displayMessage?.(type, msg);
        break;
      }
      case 'DISPLAY_QUESTION': {
        // Expect handler.displayMessage to return user choice as number (1=yes,2=no)
        // response filters handled by caller if needed
        await handlers.displayMessage?.('WARNING', c.addinf);
        break;
      }
      case 'OPEN_WINDOW':
        handlers.openWindow?.(c.addinf);
        break;
      case 'NAVIGATE':
        handlers.navigate?.(c.addinf);
        break;
      case 'NAVIGATE_CYCLING':
        // addinf might contain cycling info; prefer server-provided route
        if (c.addinf && c.addinf.length > 0) {
          handlers.navigate?.(c.addinf);
        } else {
          // caller may have provided route in earlier commands or via server response
        }
        break;
      case 'CALL_SERVER':
        await handlers.callServer?.(c.noun, c.addinf);
        break;
      default:
        // Unknown command: ignore or log
        // TODO ⟪missing lines 248-end — not captured in photos⟫
