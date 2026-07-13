import React from 'react';
import { XmlList, ListColumn, ListRow } from '@components/XmlList';

const MLC_SUM_COLUMNS: ListColumn[] = [
  {
    key: 'year',
    label: 'Experience Year',
    width: 210,
    sortField: 'sortdate',
    title: 'Sort by Experience Year',
  },
  {
    key: 'losses',
    label: 'Total # Losses',
    width: 160,
    sortField: 'losses',
    title: 'Sort by Loss Totals',
  },
  {
    key: 'lossamount',
    label: 'Total Loss Amount',
    width: 160,
    sortField: 'lossamount',
    title: 'Sort by Loss Amounts',
  },
  {
    key: 'eligibleamount',
    label: 'Total Eligible Premium From Experience Year',
    width: 205,
    sortField: 'eligibleamount',
    title: 'Sort by Eligible Premium',
  },
];

export interface MlcSumRow extends ListRow {
  year: string;
  losses: string;
  lossamount: string;
  eligibleamount: string;
  sortdate: string;
}

export interface MlcSumListProps {
  rows: MlcSumRow[];
  onRowSelect?: (row: MlcSumRow) => void;
  onSort?: (field: string) => void;
  sortField?: string;
  sortOrder?: 'ascending' | 'descending';
}

export const MlcSumList: React.FC<MlcSumListProps> = ({
  rows,
  onRowSelect,
  onSort,
  sortField = 'sortdate',
  sortOrder = 'descending',
}) => {
  return (
    <XmlList
      columns={MLC_SUM_COLUMNS}
      rows={rows}
      sortField={sortField}
      sortOrder={sortOrder}
