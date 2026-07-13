import { useMemo, useState } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import { useLoaderData, useLocation } from 'react-router';
import { getItem as getPolicyID } from '@utils/session-storage';

import { CommonDataGrid } from '@components/data-grid/data-grid';
import { getGridConfig } from '@components/data-grid/data-grid-config-registry';
import { useSmartNavigation } from '@hooks/use-smart-navigation';
import { getItem } from '@utils/local-storage';

import type { LobActionMenuLoaderData } from '@features/policy/utils/lobActionMenuLoader';
import type { GenericRow } from '@components/data-grid/data-grid-normalize';

interface SessionInfoLike {
  policyId?: string;
  nodeKey?: string;
  sessionXml?: string;
}

interface SessionXmlFlags {
  isInquiry: boolean;
  transactionId: string;
}
const policyId = getPolicyID<Record<string, unknown>>('aqs:global-variables', {})?.mstrPolicyID;
const transactionType = getPolicyID<Record<string, unknown>>(
  'aqs:global-variables',
  {},
)?.mstrTransactionType;
function parseSessionXmlFlags(sessionXml: string | undefined): SessionXmlFlags {
  if (!sessionXml || !sessionXml.trim()) {
    return { isInquiry: false, transactionId: '' };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sessionXml, 'text/xml');
    if (doc.querySelector('parsererror')) {
      return { isInquiry: false, transactionId: '' };
    }

    const items = Array.from(doc.querySelectorAll('item'));
    const getValue = (name: string): string => {
      const found = items.find(
        (item) => (item.getAttribute('name') ?? '').trim().toLowerCase() === name,
      );
      return (found?.getAttribute('value') ?? '').trim();
    };

    const inquiryValue = getValue('inquiry').toUpperCase();
    const transactionId = getValue('transactionid');

    const isInquiryByTransaction = transactionId === '7' || transactionId === '10';
    const isInquiry = inquiryValue === 'T' || isInquiryByTransaction;

    return { isInquiry, transactionId };
  } catch {
    return { isInquiry: false, transactionId: '' };
  }
}

function isTrueFlag(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  const normalized = value.trim().toUpperCase();
  return normalized === 'T' || normalized === 'TRUE' || normalized === '1';
}

export default function LobActionMenu() {
  const loaderData = useLoaderData() as LobActionMenuLoaderData;
  const location = useLocation();
  const gridConfig = getGridConfig('LOB_SUMMARY');
  const fallbackGridData = { Page: { LOB: [] } };
  const { smartNavigate } = useSmartNavigation();
  const [selectedRow, setSelectedRow] = useState<GenericRow | null>(null);

  // Wrap setSelectedRow to add logging
  const handleRowClick = (row: GenericRow) => {
    const nodeKey = row?.nodekey ?? row?.nodeKey;
    console.log('[LobActionMenu] LOB row selected', {
      lob: row?.text,
      nodeKey,
      exists: row?.exists,
      converted: row?.converted,
    });
    setSelectedRow(row);
  };

  const sessionInfo = getItem<SessionInfoLike>('sessionInformation');
  const sessionFlags = useMemo(
    () => parseSessionXmlFlags(sessionInfo?.sessionXml),
    [sessionInfo?.sessionXml],
  );

  const selectedNodeKey = useMemo(() => {
    const rawNodeKey = selectedRow?.nodekey ?? selectedRow?.nodeKey;
    return typeof rawNodeKey === 'string' ? rawNodeKey.trim() : '';
  }, [selectedRow]);

  const selectedExists = useMemo(() => {
    if (!selectedRow) return false;
    const rawExists = selectedRow?.exists;
    if (typeof rawExists !== 'string') return false;
    return isTrueFlag(rawExists);
  }, [selectedRow]);

  const selectedConverted = useMemo(() => {
    if (!selectedRow) return false;
    const rawConverted = selectedRow?.converted;
    if (typeof rawConverted !== 'string' || rawConverted.trim() === '') {
      return true;
    }
    return isTrueFlag(rawConverted);
  }, [selectedRow]);

  const isInquiryMode = sessionFlags.isInquiry;
  const editLabel = isInquiryMode ? 'View' : 'Edit';

  const disableAdd = !selectedRow || selectedExists || isInquiryMode || !selectedConverted;
  const disableEdit = !selectedRow || !selectedExists || selectedNodeKey === '';
  const disableDelete =
    !selectedRow ||
    !selectedExists ||
    isInquiryMode ||
    !selectedConverted ||
    selectedNodeKey === '';

  const navigateLobAction = (action: string): void => {
    if (!selectedNodeKey) {
      console.warn('[LobActionMenu] No LOB selected - cannot navigate', {
        action,
        selectedRow,
      });
      return;
    }

    console.log('[LobActionMenu] Navigating to LOB action', {
      action,
      selectedLOB: selectedRow?.text,
      nodeKey: selectedNodeKey,
      policyId: sessionInfo?.policyId,
      note: 'This will trigger cycling API call in dataStrategy',
    });

    // Navigate with new action - let backend cycling response determine frame/route
    // This will trigger dataStrategy → executeAction → cycling API → redirect
    smartNavigate(location.pathname, {
      nodeKey: selectedNodeKey,
      policyId: sessionInfo?.policyId ?? '0',
      xmlDetail: sessionInfo?.sessionXml ?? '',
      queryParams: {
        action,
        // Removed hardcoded frame - let backend response control routing
      },
    });
  };

  if (!gridConfig) {
    return (
      <div>
        <Alert severity="error">LOB grid configuration is missing.</Alert>
      </div>
    );
  }

  return (
    <div>
      ⟪?⟫ <h1 className="text-[28px] font-semibold text-left text-[#00205B]">Line of Business Action Menu</h1>
      ⟪?⟫ </div>
      ⟪?⟫
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-4">
          {/* TODO ⟪missing lines 174-175 — not captured in photos⟫ */}
          <h3>Policy - {(policyId || '') as string}</h3>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: '#00205B',
              fontSize: '14px',
              backgroundColor: '#E9F1FF',
              padding: '6px',
              fontWeight: '500',
              display: 'inline-block',
            }}
          >
            {(transactionType || '') as string}
          </Typography>
        </div>

        <Button
          id="pageIssue"
          name="Issue"
          variant="secondary"
          onClick={() => {
            // Navigate to issue action - let backend determine frame/route
            smartNavigate(location.pathname, {
              nodeKey: selectedNodeKey || sessionInfo?.nodeKey || '',
              policyId: sessionInfo?.policyId ?? '0',
              xmlDetail: sessionInfo?.sessionXml ?? '',
              queryParams: {
                action: 'ISSUE',
                // Removed hardcoded frame - let backend response control routing
              },
            });
          }}
        >
          Issue
        </Button>
      </div>
      <div className="flex flex-row gap-3 my-3!">
        <Button
          id="dtaAdd"
          name="Add"
          variant="tableMedium"
          disabled={disableAdd}
          onClick={() => navigateLobAction('ADD')}
        >
          Add
        </Button>
        <Button
          id="dtaEdit"
          name="Edit"
          variant="tableMedium"
          disabled={disableEdit}
          onClick={() => navigateLobAction('ACTION')}
        >
          {editLabel}
        </Button>
        <Button
          id="dtaDelete"
          name="Delete"
          variant="tableMedium"
          disabled={disableDelete}
          onClick={() => navigateLobAction('DELETE')}
        >
          Delete
        </Button>
      </div>
      {loaderData?.error ? (
        <Alert severity="error" sx={{ mb: 1.5 }}>
          {loaderData.error}
        </Alert>
      ) : null}
      {loaderData?.warning ? (
        <Alert severity="warning" sx={{ mb: 1.5 }}>
          {loaderData.warning}
        </Alert>
      ) : null}
      <CommonDataGrid
        gridConfig={gridConfig}
        data={loaderData?.pageBuild ?? fallbackGridData}
        onRowClick={handleRowClick}
        height={600}
      />
      {/* TODO ⟪missing lines 258-end — not captured in photos; closing JSX/return()/function not captured⟫ */}
