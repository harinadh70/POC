/**
 * @file use-browser-commands.ts
 * @description React hook for applying browser commands from loader data
 *
 * This hook simplifies command execution by delegating to BrowserCommandsProvider.
 * Commands should be fetched in loaders and provided via useLoaderData().
 *
 * @example
 * ```tsx
 * // In loader:
 * export async function pageLoader({ context }) {
 *   const navContext = context.get(navigationContext);
 *   return data({ browserCommands: navContext?.browserCommands || [] });
 * }
 *
 * // In component:
 * function Page() {
 *   const { browserCommands } = useLoaderData();
 *   useBrowserCommands(browserCommands); // Auto-executes
 *   return <div>...</div>;
 * }
 * ```
 */

import { useEffect, useRef } from 'react';
import { useBrowserCommandsStore } from '@providers/browser-commands-provider';
import type { BrowserCommand } from '@/types';

/**
 * Hook for applying browser commands from loader data.
 *
 * Automatically executes commands when they change.
 * Commands should be fetched in loaders, not useEffect.
 * Uses ref-based deduplication to prevent infinite loops from array reference changes.
 *
 * @param commands - Array of commands from loader data
 * @param autoExecute - Whether to execute commands automatically (default: true)
 * @returns Object with isExecuting state and executeCommands function
 *
 * @example
 * ```tsx
 * // Simple usage - auto-execute commands
 * function MyPage() {
 *   const { browserCommands } = useLoaderData();
 *   useBrowserCommands(browserCommands);
 *   return <div>...</div>;
 * }
 *
 * // Manual execution control
 * function AdvancedPage() {
 *   const { browserCommands } = useLoaderData();
 *   const { executeCommands, isExecuting } = useBrowserCommands(browserCommands, false);
 *
 *   const handleAction = async () => {
 *     await executeCommands(browserCommands);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleAction} disabled={isExecuting}>
 *         Execute Commands
 *       </button>
 *     </div>
 *   );
 * }
 * ...
 */
export function useBrowserCommands(commands?: BrowserCommand[], autoExecute = true) {
  const { executeCommands, isExecuting } = useBrowserCommandsStore();
  const executedSignatureRef = useRef<string | null>(null);
  useEffect(() => {
    if (!autoExecute || !commands || commands.length === 0) {
      return;
    }

    // Create a signature of the commands to detect actual changes
    // This prevents re-execution when array reference changes but content is same
    const commandSignature = JSON.stringify(
      commands.map((cmd) => ({
        verb: cmd.verb,
        noun: cmd.noun,
        addinf: cmd.addinf,
      })),
    );

    // Skip if we've already executed these exact commands
    if (executedSignatureRef.current === commandSignature) {
      return;
    }

    // Mark as executed before execution to prevent race conditions
    executedSignatureRef.current = commandSignature;

    // Execute commands from loader
    executeCommands(commands).catch((error) => {
      console.error('[useBrowserCommands] Failed to execute commands:', error);
      // Reset on error to allow retry
      executedSignatureRef.current = null;
    });
  }, [commands, autoExecute, executeCommands]);
  // TODO ⟪missing lines 101-102 — not captured in photos⟫
