import React from 'react';

export interface ListRow {
  id: string;
  selected?: boolean;
  [key: string]: any;
}

export interface ListColumn {
  key: string;
  label: string;
  width: number;
  sortField?: string;
  title?: string;
}

export interface XmlListProps {
  columns: ListColumn[];
  rows: ListRow[];
  sortField?: string;
  sortOrder?: 'ascending' | 'descending';
  onRowSelect?: (row: ListRow) => void;
  onSort?: (field: string) => void;
  className?: string;
  footerText?: string;
}

export const XmlList: React.FC<XmlListProps> = ({
  columns,
  rows,
  sortField,
  sortOrder = 'descending',
  onRowSelect,
  onSort,
  className = '',
  footerText,
}) => {
  const sortedRows = React.useMemo(() => {
    if (!sortField) return rows;

    return [...rows].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal < bVal) return sortOrder === 'ascending' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [rows, sortField, sortOrder]);

  return (
    <div className={`xml-list ${className}`}>
      {/* Header */}
      <div id="divHead" style={{ overflowX: 'hidden' }}>
        <table
          id="tblHead"
          className="clsListTableHead"
          cellSpacing={0}
          cellPadding={0}
          style={{ tableLayout: 'fixed' }}
        >
          <thead>
            <tr id="rowHead">
              {columns.map((col) => (
                <td
                  key={col.key}
                  width={col.width}
                  id="header"
                  name={col.sortField || col.key}
                  title={col.title || `Sort by ${col.label}`}
                  style={{ cursor: onSort ? 'pointer' : 'default' }}
                  onClick={() => onSort?.(col.sortField || col.key)}
                >
                  {col.label}
                </td>
              ))}
              <td width={20} id="header">&#160;</td>
            </tr>
          </thead>
        </table>
      </div>

      {/* Body */}
      <div id="divBody" className="clsListDiv" style={{ overflowY: 'scroll' }}>
        <table
          id="tblBody"
          className="clsListTable"
          cellSpacing={0}
          cellPadding={0}
          style={{ tableLayout: 'fixed' }}
        >
          <tbody>
            {sortedRows.map((row) => (
              <tr
                key={row.id}
                id={row.id}
                className={row.selected ? 'clsListRowSelected' : 'clsListRow'}
                onClick={() => onRowSelect?.(row)}
                style={{ cursor: onRowSelect ? 'pointer' : 'default' }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    width={col.width}
                    sortfield={col.sortField || col.key}
                  >
                    {row[col.key]}&#160;
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <table
        id="footerTable"
        cellSpacing={0}
        cellPadding={0}
        style={{ tableLayout: 'fixed' }}
      >
        <tbody>
          <tr id="footerRow">
            <td
              width="100%"
              style={{ textAlign: footerText?.includes('Count') ? 'center' : 'left' }}
              id="footerCell"
            >
              {footerText || '&#160;'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};</content>
<parameter name="filePath">c:\Users\skudale\Documents\aqs-web-ui\src\components\XmlList.tsx
