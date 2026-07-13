// types
import type { FormControl } from '@/types';

// ----------------------------------------

export const toBool = (v: unknown) => v === true || v === 'T' || v === 'true' || v === 1;
export const toReq = (v: unknown) => v === true || v === 'T' || v === 'true' || v === 1;
export const kindOf = (c: FormControl) => c.controltype; // unify
