import React from 'react';
import { useLoaderData } from 'react-router';
import { MlcSumList } from '@features/prp/components/MlcSumList';

// Types
import type { PrpLoaderData } from '@features/prp/utils/loader';

// ---------------------------------------

export default function PrpMlcSumPage() {
  const { mlcSumRows } = useLoaderData() as PrpLoaderData;

  const handleRowSelect = (row: any) => {
    console.log('[PRP] Row selected:', row);
    // Handle row selection logic here
  };

  const handleSort = (field: string) => {
    console.log('[PRP] Sort by:', field);
    // Handle sorting logic here
  };

  return (
    <div className="prp-mlc-sum-page">
      <h1>Multiple Location Premium And Dispersion Credit Plan</h1>

      <div className="page-content">
        {/* Property Type selector would go here */}

        <div className="list-container">
          <MlcSumList
            rows={mlcSumRows}
            onRowSelect={handleRowSelect}
            onSort={handleSort}
          />
        </div>

        {/* Action buttons and form fields would go here */}
        <div className="form-section">
          <div className="field">
            <label>Total Eligible Premium</label>
            <input type="text" readOnly />
          </div>
          <div className="field">
            <label>Final Credit</label>
            <input type="text" readOnly />
          </div>
          <div className="field">
            <label>
              <input type="checkbox" />
              Recalc MLPDC Credit
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}</content>
<parameter name="filePath">c:\Users\skudale\Documents\aqs-web-ui\src\pages\prp-mlc-sum.tsx
