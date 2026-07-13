// pages/LobGridExample.tsx

import * as React from "react";
import { Container, Typography, Box } from "@mui/material";
import PolicyLobGrid from "../components/PolicyLobGrid";
import type { GridResponse } from "../types/grid-response";

const response: GridResponse = {
  "Session": {
    "CompLoc": "PIPH",
    "UserId": "PKASYAP",
    "PolicyId": "489384",
    "NodeKey": "POL|POL|0|",
    "Action": "ADD|NEXT",
    "DiagnosticMode": "0",
    "SessionXml": "<items />"
  },
  "Page": {
    "@totalunits": "0",
    "@totalpremium": "0",
    "LOB": [
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "CAU",
        "sequencer": "21",
        "nodekey": "CAU|POL|0|0|",
        "text": "Commercial Automobile",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "KRM",
        "sequencer": "25",
        "nodekey": "KRM|POL|0|",
        "text": "Crime",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "EBL",
        "sequencer": "17",
        "nodekey": "BOP|POL|0|EBL|0|",
        "text": "Employee Benefits",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "LIA",
        "sequencer": "10",
        "nodekey": "LIA|POL|0|0|",
        "text": "General Liability",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "INM",
        "sequencer": "16",
        "nodekey": "INM|POL|0|",
        "text": "Inland Marine",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "LQL",
        "sequencer": "35",
        "nodekey": "BOP|POL|0|LQL|0|",
        "text": "Liquor Liability",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "PRF",
        "sequencer": "18",
        "nodekey": "BOP|POL|0|PRF|0|",
        "text": "Professional Liability",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "PRP",
        "sequencer": "14",
        "nodekey": "PRP|POL|0|",
        "text": "Property",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "SAM",
        "sequencer": "19",
        "nodekey": "BOP|POL|0|SAM|0|",
        "text": "Sexual/Physical Abuse",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "STP",
        "sequencer": "26",
        "nodekey": "BOP|POL|0|STP|0|",
        "text": "Stop Gap",
        "units": "0",
        "premium": "0"
      },
      {
        "@converted": "T",
        "@exists": "F",
        "@lob": "UCP",
        "sequencer": "15",
        "nodekey": "BOP|POL|0|UCP|0|",
        "text": "UltimateCover",
        "units": "0",
        "premium": "0"
      }
    ]
  },
  "ListData": null
};

export default function LobGridExample() {
  return (
    <Container sx={{ py: 3 }} maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 2 }}>
        XSL to React Migration: LOB Grid POC
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        This component demonstrates the migration from legacy XSL transformations to React.
        The grid displays Lines of Business (LOB) data that was previously rendered using XSL files
        in the legacy ASP system.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Migration Features:
        </Typography>
        <ul>
          <li>✅ XML data normalization from legacy API format</li>
          <li>✅ Sortable columns with visual indicators</li>
          <li>✅ Search/filter functionality</li>
          <li>✅ Row selection with checkboxes</li>
          <li>✅ Currency formatting for premium values</li>
          <li>✅ Export to CSV functionality</li>
          <li>✅ Totals footer showing aggregated values</li>
          <li>✅ Responsive design with MUI components</li>
      </ul>
    </Box>

    <PolicyLobGrid
      data={response}
      currency="USD"
      checkboxSelection
      pageSize={25}
      onRowClick={(row) => {
        console.log("Row clicked:", row);
        // In a real app, this might navigate to the LOB details page
        // or dispatch an action to load more data
      }}
      height={600}
    />
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Technical Implementation:
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        This POC replaces the legacy XSL transformation pipeline:
      </Typography>
      <Box component="pre" sx={{
        bgcolor: 'grey.100',
        p: 2,
        borderRadius: 1,
        fontSize: '0.875rem',
        overflow: 'auto'
      }}>
      {`Legacy Flow:
ASP Backend → XML Response → XSL Transformation (via xmllist.htc) → HTML Table

React Migration:
ASP Backend → XML Response → TypeScript Normalization → MUI Table Component → React UI`}
      </Box>
    </Box>
  </Container>
  );
}
