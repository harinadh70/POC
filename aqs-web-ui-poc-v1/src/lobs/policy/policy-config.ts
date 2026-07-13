import type { LobDefinition, PageConfig } from '@/types';

/**
 * LOB 1 — Policy (POL). The ONE fully-wired line of business.
 *
 * Everything Policy-specific lives here as data: which pages exist, their
 * render strategy, and any static schema. The engine consumes this; adding
 * Policy required zero engine edits, and neither will LOB 2…156.
 */

const policyInformation: PageConfig = {
  pageId: 'policy-information',
  title: 'Policy Information',
  version: '2015.08.01',
  // Hybrid: a static schema provides layout/permissions and is merged with the
  // live PageBuild values at render time (SDD §10.2.2).
  strategy: 'hybrid',
  tabs: [
    { id: 'general', label: 'General' },
    { id: 'coverage', label: 'Coverage' },
    { id: 'named-insured', label: 'Named Insured' },
  ],
  gridListNames: ['UC_COVERAGE'],
  permissions: ['POLICY_VIEW', 'POLICY_EDIT'],
};

export const policyLob: LobDefinition = {
  code: 'POL',
  name: 'Policy',
  navPrefix: 'POL',
  status: 'active',
  color: '#1f4e82',
  pages: {
    'policy-information': policyInformation,
  },
};

/** Entry points shown on the dashboard for this LOB ("new policy" buttons). */
export const policyEntryPoints = [
  { pageId: 'policy-information', label: 'Open Policy Information', primary: true },
];
