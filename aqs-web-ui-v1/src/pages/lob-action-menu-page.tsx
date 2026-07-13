import { Suspense } from 'react';
import { Typography } from '@mui/material';

import { Loader } from '@components/loader';
import LobActionMenu from '@features/policy/components/LobActionMenu';
import { getItem } from '@utils/session-storage';

export default function LobActionMenuPage() {
  const policyId = getItem<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;

  return (
    <Suspense fallback={<Loader />}>
      <div className="grid grid-cols-4 gap-x-2 items-start w-full h-full">
        <div className="col-span-1 py-4! px-8! relative h-full bg-[#F9F7F0] min-h-175">
          <h1 className="text-[16px] font-semibold text-left text-[#00205B]">
            Policy Structure
          </h1>
          <Typography className="policy-id-no">Policy - {(policyId || '') as string}</Typography>
        </div>
        <div className="col-span-3 px-16! p-4!">
          <LobActionMenu />
        </div>
      </div>
    </Suspense>
  );
}
