import { compact, isArray, isEmpty, isPlainObject } from 'lodash-es';

import { createFeatureLogger } from '@utils/logger-builder';
import type { Call } from '@/services/xml-server-call';
import type { ServiceField } from '@utils/normalize-service-config';

const logger = createFeatureLogger('util', 'TransformPageBuildResponse');

const METADATA_MATCHCODES = new Set(['PAGETITLE', 'PATHLABEL', 'PAGELABEL']);
// Known modal/button matchcodes that should be classified as buttons even when
// controltype isn't explicitly 'button'. Add additional header/button matchcodes
// here when the PageBuild uses custom matchcodes (e.g. 'HeaderBtn1').
const KNOWN_BUTTON_MATCHCODES = new Set(['OK', 'CANCEL', 'NEXT', 'BACK', 'SUBMIT', 'HEADERBTN1']);

const flag = (value: unknown, defaultFalse = false): boolean => {
  if (value === undefined || value === null || value === '') return defaultFalse;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).trim().toUpperCase();
  return normalized === 'T' || normalized === 'TRUE' || normalized === '1' || normalized === 'Y';
};

const asRecord = (value: unknown): Record<string, unknown> | null => {
  return isPlainObject(value) ? (value as Record<string, unknown>) : null;
};

const readString = (obj: Record<string, unknown>, key: string): string => {
  const value = obj[key];
  if (value === undefined || value === null) return '';
  return String(value);
};

const readStringEither = (
  obj: Record<string, unknown>,
  atKey: string,
  plainKey: string,
): string => {
  return readString(obj, atKey) || readString(obj, plainKey);
};

const readUnknownEither = (
  obj: Record<string, unknown>,
  atKey: string,
  plainKey: string,
): unknown => {
  if (obj[atKey] !== undefined) return obj[atKey];
  return obj[plainKey];
};

const readCalls = (control: Record<string, unknown>): Call[] => {
  const callsNode = asRecord(control.calls ?? control['@calls']);
  if (!callsNode) return [];

  const callNode = callsNode.call;
  const callItems = isArray(callNode) ? callNode : callNode ? [callNode] : [];

  const parsed = compact(
    callItems.map((entry) => {
      const rec = asRecord(entry);
      if (!rec) return null;
      return {
        project: readStringEither(rec, '@project', 'project'),
        class: readStringEither(rec, '@class', 'class'),
        subroutine: readStringEither(rec, '@subroutine', 'subroutine'),
      } satisfies Call;
    }),
  ).filter((item) => item.project || item.class || item.subroutine);

  return parsed;
};

const extractRadioOptions = (control: Record<string, unknown>) => {
  const options: Array<{ label: string; value: string }> = [];
  for (let index = 1; index <= 20; index += 1) {
    const text = readStringEither(control, `@text${index}`, `text${index}`).trim();
    const value = readStringEither(control, `@value${index}`, `value${index}`).trim();
    if (!text && !value) continue;
    options.push({
      label: text || value,
      value: value || text,
    });
  }

  const seen = new Set<string>();
  return options.filter((option) => {
    const key = `${option.label}::${option.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const extractComboOptions = (control: Record<string, unknown>) => {
  const options: Array<{ label: string; value: string }> = [];
  const listItemsNode = asRecord(control.listitems ?? control['@listitems']);
  if (!listItemsNode) return options;

  const itemNode = listItemsNode.item;
  const items = isArray(itemNode) ? itemNode : itemNode ? [itemNode] : [];

  for (const itemEntry of items) {
    const item = asRecord(itemEntry);
    if (!item) continue;

    const value = readStringEither(item, '@value', 'value').trim();
    const label = readStringEither(item, '#text', 'text').trim() || value;

    if (value || label) {
      options.push({ label: label || value, value: value || label });
    }
  }
  return options;
};

const extractControls = (xmlDetail: unknown): Record<string, unknown>[] => {
  const detail = asRecord(xmlDetail);
  if (!detail) return [];
  const page = asRecord(detail.Page);
  const controls = asRecord(page?.controls);
  const rawControls = controls?.control;
  const controlArray = isArray(rawControls) ? rawControls : rawControls ? [rawControls] : [];
  return compact(controlArray.map((control) => asRecord(control)));
};

const extractUtpOrder = (xmlDetail: unknown): string[] => {
  const detail = asRecord(xmlDetail);
  if (!detail) return [];

  const page = asRecord(detail.Page);
  const utp = asRecord(page?.utp);
  const dataNode = utp?.data;
  const items = isArray(dataNode) ? dataNode : dataNode ? [dataNode] : [];

  return compact(
    items.map((item) => {
      const rec = asRecord(item);
      if (!rec) return '';
      return readString(rec, '@matchcode').trim();
    }),
  );
};

export interface ModalPageMetadata {
  title?: string;
  pathLabel?: string;
  pageLabel?: string;
}

export interface PageBuildButton {
  matchcode: string;
  text: string;
  disabled: boolean;
  visible: boolean;
  relatedControl?: string;
  calls: Call[];
  order?: number;
}

export interface TransformedPageBuildResponse {
  metadata: ModalPageMetadata;
  serviceFields: ServiceField[];
  buttons: PageBuildButton[];
  defaultValues: Record<string, string | boolean>;
  fieldOrder: string[];
  utpOrder: string[];
}

export function transformPageBuildResponse(xmlDetail: unknown): TransformedPageBuildResponse {
  const controls = extractControls(xmlDetail);
  const metadata: ModalPageMetadata = {};
  const buttons: PageBuildButton[] = [];
  const serviceFields: ServiceField[] = [];
  const defaultValues: Record<string, string | boolean> = {};
  const fieldOrder: string[] = [];
  const utpOrder = extractUtpOrder(xmlDetail);

  for (const control of controls) {
    const matchcode = readStringEither(control, '@matchcode', 'matchcode').trim();
    if (!matchcode) {
      logger.warn('Skipping PageBuild control without @matchcode', control);
      continue;
    }

    const upperMatchcode = matchcode.toUpperCase();
    const text = readStringEither(control, '@text', 'text').trim();
    const label = readStringEither(control, '@ctrllabel', 'ctrllabel').trim();
    const rawControlType =
      readStringEither(control, '@controltype', 'controltype').trim() ||
      readStringEither(control, '@type', 'type').trim();
    const normalizedControlType =
      rawControlType.toLowerCase() === 'radiobutton' ? 'radio' : rawControlType;

    // Skip controls that are really tab definitions (some PageBuilds include tabs in the
    // controls array). Filter out any explicit 'tab' control types and defensive check
    // for matchcodes that look like tab identifiers (e.g., 'TABPOL') where controltype
    // is empty or 'tab'. This prevents rendering tab definitions as form fields.
    const upControlType = normalizedControlType.trim().toLowerCase();
    const isExplicitTab = upControlType === 'tab';
    const isLikelyTabMatchcode =
      matchcode.toUpperCase().startsWith('TAB') &&
      (upControlType === '' || upControlType === 'tab');
    if (isExplicitTab || isLikelyTabMatchcode) {
      logger.debug('Skipping PageBuild tab/control treated as tab', {
        matchcode,
        controlType: rawControlType,
      });
      continue;
    }

    if (upperMatchcode === 'PAGETITLE') {
      metadata.title = text || label || metadata.title;
      continue;
    }
    if (upperMatchcode === 'PATHLABEL') {
      metadata.pathLabel = text || label || metadata.pathLabel;
      continue;
    }
    if (upperMatchcode === 'PAGELABEL') {
      metadata.pageLabel = text || label || metadata.pageLabel;
      continue;
    }

    const parsedCalls = readCalls(control);
    // IMPORTANT: some form fields (e.g., radio/inputs) include `calls` for post/commit behavior.
    // Using the presence of a `calls` node to classify buttons causes real fields to disappear.
    const isButton =
      KNOWN_BUTTON_MATCHCODES.has(upperMatchcode) ||
      normalizedControlType.toLowerCase() === 'button';

    console.log('[CLASSIFY_CONTROL]', {
      matchcode,
      controlType: normalizedControlType,
      parsedCalls,
      isButton,
    });

    if (isButton && !METADATA_MATCHCODES.has(upperMatchcode)) {
      const rawVisible = readUnknownEither(control, '@visible', 'visible');
      const visible =
        rawVisible === undefined
          ? true
          : typeof rawVisible === 'string' && rawVisible.trim() === ''
            ? false
            : flag(rawVisible, false);

      logger.debug('Classified control as button', {
        matchcode,
        controlType: normalizedControlType,
        visible,
        disabled: flag(readUnknownEither(control, '@disabled', 'disabled')),
        callCount: parsedCalls.length,
      });

      if (!visible) {
        logger.info('Filtered hidden modal button from render', { matchcode });
      }

      const order = (() => {
        const utporder = readUnknownEither(control, '@utporder', 'utporder');
        if (utporder === undefined || utporder === null || utporder === '') {
          return undefined;
        }
        const parsed = Number(utporder);
        return isNaN(parsed) ? undefined : parsed;
      })();

      buttons.push({
        matchcode,
        text: text || label || matchcode,
        disabled: flag(readUnknownEither(control, '@disabled', 'disabled')),
        visible,
        relatedControl:
          readStringEither(control, '@relatedcontrol', 'relatedcontrol').trim() ||
          undefined,
        calls: parsedCalls,
        order,
      });
      continue;
    }

    const radioOptions =
      normalizedControlType.toLowerCase() === 'radio' ? extractRadioOptions(control) : [];
    const isCombo = !isEmpty(control?.listitems as []) || !isEmpty(control['@listitems']);
    const comboOptions =
      normalizedControlType.toLowerCase() === 'combo' || isCombo
        ? extractComboOptions(control)
        : [];

    console.log('===OPTIONS===', comboOptions);

    logger.debug('Classified control as service field', {
      matchcode,
      controlType: normalizedControlType,
      label: label || text || matchcode,
      radioOptionCount: radioOptions.length,
      comboOptionCount: comboOptions.length,
    });

    const field: ServiceField = {
      matchcode,
      ctrllabel: label || text || matchcode,
      label: label || text || matchcode,
      controltype: normalizedControlType,
      type: readStringEither(control, '@type', 'type').trim(),
      text,
      value: readStringEither(control, '@value', 'value').trim(),
      default: readStringEither(control, '@default', 'default').trim(),
      required: readStringEither(control, '@required', 'required').trim(),
      disabled: readStringEither(control, '@disabled', 'disabled').trim(),
      visible: readStringEither(control, '@visible', 'visible').trim(),
      tabindex: readStringEither(control, '@tabindex', 'tabindex').trim(),
      ctrlwidth: readStringEither(control, '@ctrlwidth', 'ctrlwidth').trim(),
      top: readStringEither(control, '@top', 'top').trim() || undefined,
      left: readStringEither(control, '@left', 'left').trim() || undefined,
      maxlength: readStringEither(control, '@maxlength', 'maxlength').trim() || undefined,
      iscalendar: readStringEither(control, '@iscalendar', 'iscalendar').trim() || undefined,
      options: radioOptions.length > 0 ? radioOptions : comboOptions,
      listitems: comboOptions.length > 0 ? comboOptions : undefined,
    };

    serviceFields.push(field);
    fieldOrder.push(matchcode);

    if (normalizedControlType.toLowerCase() === 'checkbox') {
      defaultValues[matchcode] =
        flag(readUnknownEither(control, '@default', 'default')) ||
        flag(readUnknownEither(control, '@value', 'value'));
    } else if (normalizedControlType.toLowerCase() === 'radio') {
      const defaultValue = readStringEither(control, '@default', 'default').trim();
      defaultValues[matchcode] =
        defaultValue === ''
          ? readStringEither(control, '@value1', 'value1').trim()
          : defaultValue;
    } else if (normalizedControlType.toLowerCase() === 'combo') {
      // For combo boxes, prefer @default or @listindex as the stored value (not @text).
      // If those are missing but the server provided @text (display label), map
      // that label to the corresponding option.value so the form stores the
      // canonical option value instead of the label (prevents synthetic options).
      const defaultValueRaw =
        readStringEither(control, '@default', 'default').trim() ||
        readStringEither(control, '@listindex', 'listindex').trim();
      let finalDefault = defaultValueRaw || '';
      // If no default value but text exists, attempt to map display text -> option value
      if (!finalDefault) {
        const displayText = readStringEither(control, '@text', 'text').trim();
        if (displayText) {
          const match = comboOptions.find((o) => o.label === displayText);
          if (match) finalDefault = match.value;
        }
      } else {
        // If defaultValueRaw exists but doesn't match any option value, try
        // mapping it from a matching option label (defensive).
        if (finalDefault && !comboOptions.some((o) => o.value === finalDefault)) {
          const byLabel = comboOptions.find((o) => o.label === finalDefault);
          if (byLabel) finalDefault = byLabel.value;
        }
      }
      defaultValues[matchcode] = finalDefault || '';
    } else {
      // For textbox, date, etc., use @text first (for prefilled values), then @value, then @default
      defaultValues[matchcode] =
        readStringEither(control, '@text', 'text').trim() ||
        readStringEither(control, '@value', 'value').trim() ||
        readStringEither(control, '@default', 'default').trim() ||
        '';
    }
  }

  logger.info('PageBuild response transformed', {
    fieldCount: serviceFields.length,
    buttonCount: buttons.length,
    hasTitle: !!metadata.title,
    fieldOrderCount: fieldOrder.length,
    utpOrderCount: utpOrder.length,
  });

  return {
    metadata,
    serviceFields,
    buttons,
    defaultValues,
    fieldOrder,
    utpOrder,
  };
}
