import type { LobDefinition } from '@/types';
import { policyLob } from './policy/policy-config';

/**
 * ── THE LOB REGISTRY ─────────────────────────────────────────────────────────
 * This is the thesis of the whole POC.
 *
 * There are 156+ Lines of Business. Each is ONE entry in this array. LOB 1
 * (Policy) is fully wired; the rest are `config-ready` placeholders that render
 * on the dashboard and prove the scale: onboarding LOB 2…156 means adding an
 * entry here + a config folder, and touching NO engine code.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** The other insurance lines that exist in the legacy nav tree (real prefixes). */
const NAMED_LOBS: Array<Pick<LobDefinition, 'code' | 'name' | 'navPrefix'>> = [
  { code: 'BOP', name: "Business Owner's Policy", navPrefix: 'BOP' },
  { code: 'CAU', name: 'Commercial Auto', navPrefix: 'CAU' },
  { code: 'IRM', name: 'Inland Marine', navPrefix: 'IRM' },
  { code: 'WRM', name: "Workers' Compensation", navPrefix: 'WRM' },
  { code: 'LIA', name: 'General Liability', navPrefix: 'LIA' },
  { code: 'RMP', name: 'Risk Management Package', navPrefix: 'RMP' },
];

/** Fill out the remaining placeholders so the dashboard shows the true scale. */
const TOTAL_LOBS = 156;
const generatedPlaceholders: LobDefinition[] = Array.from(
  { length: TOTAL_LOBS - 1 - NAMED_LOBS.length },
  (_, i) => {
    const n = i + NAMED_LOBS.length + 2; // LOB numbers start after the named ones
    return {
      code: `L${String(n).padStart(3, '0')}`,
      name: `Line of Business ${n}`,
      navPrefix: `L${n}`,
      status: 'config-ready' as const,
    };
  },
);

export const LOB_REGISTRY: LobDefinition[] = [
  policyLob, // LOB 1 — active
  ...NAMED_LOBS.map((l) => ({ ...l, status: 'config-ready' as const })),
  ...generatedPlaceholders,
];

export const getLob = (code: string): LobDefinition | undefined =>
  LOB_REGISTRY.find((l) => l.code === code);

export const activeLobs = () => LOB_REGISTRY.filter((l) => l.status === 'active');

export const lobStats = () => ({
  total: LOB_REGISTRY.length,
  active: LOB_REGISTRY.filter((l) => l.status === 'active').length,
  configReady: LOB_REGISTRY.filter((l) => l.status === 'config-ready').length,
});
