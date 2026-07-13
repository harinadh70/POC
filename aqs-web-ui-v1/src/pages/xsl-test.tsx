import React from 'react';
import { MlcSumList } from '@features/prp/components/MlcSumList';

// Mock data for testing
const mockData = [
  {
    id: '1',
    selected: false,
    year: '2023',
    losses: '2',
    lossamount: '15000.00',
    eligibleamount: '50000.00',
    sortdate: '20230101',
  },
  {
    id: '2',
    selected: true,
    year: '2022',
    losses: '1',
    lossamount: '8000.00',
    eligibleamount: '45000.00',
    sortdate: '20220101',
  },
  {
    id: '3',
    selected: false,
    year: '2021',
    losses: '3',
    lossamount: '25000.00',
    eligibleamount: '55000.00',
    sortdate: '20210101',
  },
];

export default function TestMlcSumList() {
  const handleRowSelect = (row: any) => {
    console.log('Row selected:', row);
  };

  const handleSort = (field: string) => {
    console.log('Sort by:', field);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>XSL to React Migration Test</h1>
      <p>This component replicates the MlcSumLst.xsl functionality in React.</p>

      <MlcSumList
        rows={mockData}
        onRowSelect={handleRowSelect}
        onSort={handleSort}
      />

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Test Instructions:</h3>
        <ul>
          <li>Click on column headers to sort</li>
          <li>Click on rows to select them</li>
          <li>Selected row should have blue background</li>
          <li>Table should match legacy XSL appearance</li>
        </ul>
      </div>
    </div>
  );
}</content>
<parameter name="filePath">c:\Users\skudale\Documents\aqs-web-ui\src\pages\xsl-test.tsx
