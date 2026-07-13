// types/grid-response.ts

export type Session = {
  CompLoc: string;
  UserId: string;
  PolicyId: string;
  NodeKey: string;
  Action: string;
  DiagnosticNode: string;
  SessionXml: string;
};

export type LobItem = {
  "@converted": "T" | "F";
  "@exists": "T" | "F";
  "@lob": string;         // code, e.g., "PRP"
  sequencer: string;      // numeric-ish string
  nodekey: string;
  text: string;           // display name, e.g., "Property"
  units: string;          // numeric-ish string
  premium: string;        // numeric-ish string
};

export type Page = {
  "@totalunits": string;
  "@totalpremium": string;
  LOB: LobItem[] | LobItem;  // backend sometimes flips array/single
};

export type GridResponse = {
  Session: Session;
  Page: Page;
  ListData: unknown | null;
};
