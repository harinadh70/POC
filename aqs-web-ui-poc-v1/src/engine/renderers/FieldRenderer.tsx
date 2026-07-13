import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import type { ControlDef } from '@/types';
import { usePageStore } from '@/stores/page-store';
import { useAuthStore } from '@/stores/auth-store';
import { executeAction } from '@/engine/commands/execute-action';
import { useNavigate } from 'react-router-dom';
import { pageIdToPath } from '@/config/routes';

/**
 * FieldRenderer — draws ONE control from its type. This is the whole point of
 * the migration: every legacy .htc control maps to an MUI control here
 * (SDD §7.2), and no page ever hand-writes a field.
 *
 * Discrete controls (select/combo/checkbox/radio) fire executeAction on change;
 * free-text controls fire on blur — mirroring legacy onChange / onBlur.
 */
export function FieldRenderer({ control }: { control: ControlDef }) {
  const setValue = usePageStore((s) => s.setValue);
  const session = useAuthStore((s) => s.session);
  const navigate = useNavigate();
  const [local, setLocal] = useState(control.value ?? '');

  if (control.visible === false) return null;

  const nav = (pageId: string) =>
    navigate(pageIdToPath(pageId, session?.lob ?? 'POL'));

  const fire = (value: unknown) => {
    if (!session) return;
    void executeAction({ session, matchcode: control.matchcode, value }, nav);
  };

  const common = {
    label: control.label,
    required: control.required,
    disabled: control.disabled,
    InputProps: { readOnly: control.readOnly },
  } as const;

  switch (control.type) {
    case 'label':
      return (
        <div>
          <Typography variant="caption" color="text.secondary">
            {control.label}
          </Typography>
          <Typography variant="body2">{String(control.value ?? '')}</Typography>
        </div>
      );

    case 'select':
      return (
        <TextField
          {...common}
          select
          value={control.value ?? ''}
          onChange={(e) => {
            setValue(control.matchcode, e.target.value);
            fire(e.target.value);
          }}
        >
          {(control.options ?? []).map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
      );

    case 'combo':
      return (
        <Autocomplete
          options={control.options ?? []}
          getOptionLabel={(o) => o.label}
          value={(control.options ?? []).find((o) => o.value === control.value) ?? null}
          isOptionEqualToValue={(o, v) => o.value === v.value}
          disabled={control.disabled}
          readOnly={control.readOnly}
          onChange={(_e, opt) => {
            setValue(control.matchcode, opt?.value ?? '');
            fire(opt?.value ?? '');
          }}
          renderInput={(params) => (
            <TextField {...params} label={control.label} required={control.required} />
          )}
        />
      );

    case 'date':
      // Target is MUI X DatePicker (Calendar.htc → DatePicker); native input
      // keeps the POC dependency-light while preserving behaviour.
      return (
        <TextField
          {...common}
          type="date"
          value={control.value ?? ''}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setValue(control.matchcode, e.target.value)}
          onBlur={(e) => fire(e.target.value)}
        />
      );

    case 'number':
      return (
        <TextField
          {...common}
          type="number"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={(e) => {
            setValue(control.matchcode, e.target.value);
            fire(e.target.value);
          }}
        />
      );

    case 'textarea':
      return (
        <TextField
          {...common}
          multiline
          minRows={2}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={(e) => setValue(control.matchcode, e.target.value)}
        />
      );

    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(control.value)}
              disabled={control.disabled}
              onChange={(e) => {
                setValue(control.matchcode, e.target.checked);
                fire(e.target.checked);
              }}
            />
          }
          label={control.label ?? ''}
        />
      );

    case 'radio':
      return (
        <FormControl disabled={control.disabled}>
          <FormLabel>{control.label}</FormLabel>
          <RadioGroup
            row
            value={control.value ?? ''}
            onChange={(e) => {
              setValue(control.matchcode, e.target.value);
              fire(e.target.value);
            }}
          >
            {(control.options ?? []).map((o) => (
              <FormControlLabel key={o.value} value={o.value} control={<Radio />} label={o.label} />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case 'text':
    default:
      return (
        <TextField
          {...common}
          value={local}
          inputProps={{ maxLength: control.maxLength }}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={(e) => {
            setValue(control.matchcode, e.target.value);
            fire(e.target.value);
          }}
        />
      );
  }
}
