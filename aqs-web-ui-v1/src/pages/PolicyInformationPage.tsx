import { useState } from 'react';
import { Suspense } from 'react';
import { Loader } from '@components/loader';
import { useLoaderData } from 'react-router';
import { TabContextProvider } from '@providers/tab-context-provider';
import PolicyInformation from '@/features/policy/components/PolicyInformation';
import { getItem } from '@utils/session-storage';
import { isEmpty } from 'lodash-es';
import { Typography } from '@mui/material';

export default function PolicyInformationPage() {
    const loaderData = useLoaderData() as any;
    const [loading] = useState(false);

    const policyId = getItem<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;

    if (loading)
        return (
            <Suspense fallback={<Loader />}>
                <main className="p-4 md:p-6">
                    <Loader />
                </main>
            </Suspense>
        );

    if (isEmpty(loaderData?.pageBuild)) return null;

    return (
        <TabContextProvider>
            <div className="grid grid-cols-4 gap-x-2 items-start w-full h-full">
                <div className="col-span-1 py-4! px-8! relative h-full bg-[#F9F7F0] min-h-216 ">
                    <h1 className="text-[16px] font-semibold text-left text-[#00205B] ">
                        Policy Structure
                    </h1>
                    <Typography className=" policy-id-no ">
                        Policy {(policyId || '') as string}
                    </Typography>
                </div>
                <div className="col-span-3 px-8! p-4! customGridWrapper">
                    <PolicyInformation />
                </div>
            </div>
        </TabContextProvider>
    );
// TODO ⟪missing line 45 — not captured in photos (closing brace of function, cut off in photo)⟫
