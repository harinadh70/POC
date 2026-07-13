/**
 * Example Implementation Page
 *
 * Shows how to:
 * 1. Import grid config and component
 * 2. Pass API response data to universal grid
 * 3. Handle row selection
 * 4. Use grid config-by-id lookup
 */

import * as React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { CommonDataGrid } from '@components/data-grid/data-grid';
import { getGridConfig } from '@components/data-grid/data-grid-config-registry';
import type { GenericRow } from '@components/data-grid/data-grid-normalize';
export default function GridConfigExamplePage() {
  // State for selected rows
  const [selectedLobRow, setSelectedLobRow] = React.useState<GenericRow | null>(null);
  const [selectedInsuredRow, setSelectedInsuredRow] = React.useState<GenericRow | null>(null);
  const [selectedWipRow, setSelectedWipRow] = React.useState<GenericRow | null>(null);

  // Get grid configs by ID
  const lobGridConfig = getGridConfig('LOB_SUMMARY');
  const insuredGridConfig = getGridConfig('INSURED_DETAILS');
  const wipGridConfig = getGridConfig('WIP_SERVICES');

  /**
   * SAMPLE API RESPONSE - LOB Summary
   * This is what comes from the backend API
   */
  const SAMPLE_LOB_RESPONSE = {
    Session: {
      CompLoc: 'PIPH',
      UserId: 'PKASYAP',
      PolicyId: '489384',
      NodeKey: 'POL|POL|0|',
      Action: 'ADD|NEXT',
      DiagnosticMode: '0',
      SessionXml: '<items />',
    },
    Page: {
      '@totalunits': '0',
      '@totalpremium': '0',
      LOB: [
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'CAU',
          sequencer: '21',
          nodekey: 'CAU|POL|0|0|',
          text: 'Commercial Automobile',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'KRM',
          sequencer: '25',
          nodekey: 'KRM|POL|0|',
          text: 'Crime',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'EBL',
          sequencer: '17',
          nodekey: 'BOP|POL|0|EBL|0|',
          text: 'Employee Benefits',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'LIA',
          sequencer: '10',
          nodekey: 'LIA|POL|0|0|',
          text: 'General Liability',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'INM',
          sequencer: '16',
          nodekey: 'INM|POL|0|',
          text: 'Inland Marine',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'LQL',
          sequencer: '35',
          nodekey: 'BOP|POL|0|LQL|0|',
          text: 'Liquor Liability',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'PRF',
          sequencer: '18',
          nodekey: 'BOP|POL|0|PRF|0|',
          text: 'Professional Liability',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'PRP',
          sequencer: '14',
          nodekey: 'PRP|POL|0|',
          text: 'Property',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'SAM',
          sequencer: '19',
          nodekey: 'BOP|POL|0|SAM|0|',
          text: 'Sexual/Physical Abuse',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'STP',
          sequencer: '26',
          nodekey: 'BOP|POL|0|STP|0|',
          text: 'Stop Gap',
          units: '0',
          premium: '0',
        },
        {
          '@converted': 'T',
          '@exists': 'F',
          '@lob': 'UCP',
          sequencer: '15',
          nodekey: 'BOP|POL|0|UCP|0|',
          text: 'UltimateCover',
          units: '0',
          premium: '0',
        },
      ],
    },
    ListData: null,
  };

  // API Response for Insured Details
  const insuredDetailsResponse = {
    policy: [
      {
        sequencer: '1',
        policyid: '489259',
        policynumber: '10982347',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Business Auto',
      },
      {
        sequencer: '2',
        policyid: '488379',
        policynumber: '1287467538',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Mobile Home Park',
      },
      {
        policyid: '488353',
        policynumber: '21847655',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'For Profit Corporation',
      },
      {
        sequencer: '4',
        policyid: '488380',
        policynumber: '2343276454',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Accountants',
      },
      {
        sequencer: '5',
        policyid: '489061',
        policynumber: '23441123',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Business Auto',
      },
      {
        sequencer: '6',
        policyid: '488475',
        policynumber: '2389478756',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Accountants',
      },
      {
        sequencer: '7',
        policyid: '488459',
        policynumber: '243175658',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Executive Safeguard',
      },
      {
        sequencer: '8',
        policyid: '488497',
        policynumber: '2677777524',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Professional Excess',
      },
      {
        sequencer: '9',
        policyid: '488481',
        policynumber: '289174965',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Allied Health Care',
      },
      {
        sequencer: '10',
        policyid: '489384',
        policynumber: '28973737',
        insuredname: "Lindsay's Dance Studio",
        productcode: 'Business Auto',
      },
    // TODO ⟪missing lines 232-232 — not captured in photos⟫
    count: '10',
    message: '',
    ],
  };

  // API Response for Work In Progress Services
  const wipServicesResponse = {
    policy: [
      {
        sequencer: '1',
        policyid: '489259',
        policynumber: '10982347',
        productcode: 'Business Auto',
        insuredname: "Lindsay's Dance Studio",
        externalid: 'PATH001',
        workflowstatus: 'Pending Review',
        primarytransaction: 'New Business',
        effdate: '2024-01-15',
        owner: 'John Smith',
        policytype: 'Commercial',
        description: 'Policy pending underwriter approval',
      },
      {
        sequencer: '2',
        policyid: '488379',
        policynumber: '1287467538',
        productcode: 'Mobile Home Park',
        insuredname: "Lindsay's Dance Studio",
        externalid: 'PATH002',
        workflowstatus: 'In Progress',
        primarytransaction: 'Renewal',
        effdate: '2024-02-01',
        owner: 'Jane Doe',
        policytype: 'Commercial',
        description: 'Renewal in processing',
      },
      {
        sequencer: '3',
        policyid: '488353',
        policynumber: '21847655',
        productcode: 'For Profit Corporation',
        insuredname: "Lindsay's Dance Studio",
        externalid: 'PATH003',
        workflowstatus: 'Pending Quote',
        primarytransaction: 'Modification',
        effdate: '2024-03-10',
        owner: 'Mike Johnson',
        policytype: 'Commercial',
        description: 'Awaiting quote from underwriter',
      },
      {
        sequencer: '4',
        policyid: '488380',
        policynumber: '2343276454',
        productcode: 'Accountants',
        insuredname: "Lindsay's Dance Studio",
        externalid: 'PATH004',
        workflowstatus: 'Ready to Issue',
        primarytransaction: 'New Business',
        effdate: '2024-04-05',
        owner: 'Sarah Williams',
        policytype: 'Professional',
        description: 'Ready for policy issuance',
      },
      {
        sequencer: '5',
        policyid: '489061',
        policynumber: '23441123',
        productcode: 'Business Auto',
        insuredname: "Lindsay's Dance Studio",
        externalid: 'PATH005',
        workflowstatus: 'Issued',
        primarytransaction: 'Renewal',
        effdate: '2024-05-20',
        owner: 'Tom Brown',
        policytype: 'Commercial',
        description: 'Policy issued and active',
      },
      {
        sequencer: '6',
        policyid: '488475',
        policynumber: '2389478756',
        productcode: 'Accountants',
        insuredname: "Lindsay's Dance Studio",
        externalid: 'PATH006',
        workflowstatus: 'On Hold',
        primarytransaction: 'New Business',
        effdate: '2024-06-15',
        owner: 'Emily Clark',
        policytype: 'Professional',
        description: 'Policy on hold - waiting for information',
      },
    ],
    count: '6',
    message: '',
  };

  if (!lobGridConfig || !insuredGridConfig || !wipGridConfig) {
    return (
      <Container>
        <Typography color="error">Grid configuration not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* GRID 1: LOB Summary */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <h3>Grid 1: LOB</h3>
        <Box sx={{ bgcolor: '#fafafa', p: 1, borderRadius: 1, mb: 2 }}>
          <CommonDataGrid
            gridConfig={lobGridConfig}
            data={SAMPLE_LOB_RESPONSE}
            onRowClick={(row) => setSelectedLobRow(row as any)}
            height="400px"
          />
        </Box>

        {selectedLobRow && (
          <Paper sx={{ p: 2, bgcolor: '#647682' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Selected LOB Row:
            </Typography>
            <Typography
              component="pre"
              variant="body2"
              sx={{ fontSize: '0.75rem', overflow: 'auto', maxHeight: '200px' }}
            >
              {JSON.stringify(selectedLobRow, null, 2)}
            </Typography>
          </Paper>
        )}
      </Paper>

      {/* GRID 2: Insured Details */}
      <Paper sx={{ p: 2 }}>
        <h3>Grid 2: Insured Details</h3>
        <Box sx={{ bgcolor: '#fafafa', p: 1, borderRadius: 1, mb: 2 }}>
          <CommonDataGrid
            gridConfig={insuredGridConfig}
            data={insuredDetailsResponse}
            onRowClick={(row) => setSelectedInsuredRow(row as any)}
            height="400px"
          />
        </Box>

        {selectedInsuredRow && (
          <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Selected Insured Row:
            </Typography>
            <Typography
              component="pre"
              variant="body2"
              sx={{ fontSize: '0.75rem', overflow: 'auto', maxHeight: '200px' }}
            >
              {JSON.stringify(selectedInsuredRow, null, 2)}
            </Typography>
          </Paper>
        )}
      </Paper>

      {/* GRID 3: Work In Progress Services */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            Grid 3: {wipGridConfig.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Configuration ID: <code>{wipGridConfig.id}</code> | XSL:{' '}
            <code>{wipGridConfig.xslFile}</code>
          </Typography>
        </Box>

        <Box sx={{ bgcolor: '#fafafa', p: 1, borderRadius: 1, mb: 2 }}>
          <CommonDataGrid
            gridConfig={wipGridConfig}
            data={wipServicesResponse}
            onRowClick={(row) => setSelectedWipRow(row as any)}
            height="400px"
          />
        </Box>

        {selectedWipRow && (
          <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Selected WIP Row:
            </Typography>
            <Typography
              component="pre"
              variant="body2"
              sx={{ fontSize: '0.75rem', overflow: 'auto', maxHeight: '200px' }}
            >
              {JSON.stringify(selectedWipRow, null, 2)}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
}
