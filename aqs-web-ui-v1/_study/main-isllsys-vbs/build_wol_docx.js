// Build the line-by-line window_onload -> React side-by-side Word document.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, HeadingLevel, AlignmentType,
  PageOrientation, TableLayoutType,
} = require('docx');

const DIR = '/Users/harinadh/My code/aqs-web-ui/_study/main-isllsys-vbs';
const rows = JSON.parse(fs.readFileSync(path.join(DIR, '_wol_rows.json'), 'utf8'));

const CAT = {
  'converted':        { label: 'CONVERTED',        color: '1B7A43', shade: 'E6F4EA' },
  'eliminated':       { label: 'ELIMINATED',       color: '6B7280', shade: 'F1F3F5' },
  'moved-elsewhere':  { label: 'MOVED ELSEWHERE',  color: '1F5FA8', shade: 'E7F0FB' },
  'framework-handles':{ label: 'FRAMEWORK HANDLES',color: '7A3EA1', shade: 'F1E9F8' },
};

const MONO = 'Consolas';
const SANS = 'Calibri';

// split code that may use "\n" or " / " as line separators
function codeLines(code) {
  return String(code).replace(/ \/ /g, '\n').split('\n');
}

function codeParas(code, shade) {
  return codeLines(code).map((ln) =>
    new Paragraph({
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: shade },
      spacing: { after: 0, line: 240 },
      children: [new TextRun({ text: ln === '' ? ' ' : ln, font: MONO, size: 15 })],
    })
  );
}

function explPara(text) {
  return new Paragraph({
    spacing: { before: 60, after: 40, line: 250 },
    children: [new TextRun({ text: String(text), font: SANS, size: 18 })],
  });
}

function lineTag(vbsLines) {
  return new Paragraph({
    spacing: { after: 20 },
    children: [new TextRun({ text: `Line ${vbsLines}`, font: SANS, size: 15, bold: true, color: '9A3412' })],
  });
}

function catChip(category) {
  const c = CAT[category] || CAT['eliminated'];
  return new Paragraph({
    spacing: { after: 20 },
    children: [new TextRun({ text: c.label, font: SANS, size: 14, bold: true, color: 'FFFFFF' })],
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: c.color },
  });
}

const HEADER_FILL = '1F3A5F';
function headerCell(text, widthDxa) {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: HEADER_FILL },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: 'FFFFFF', font: SANS, size: 20 })] })],
  });
}

const LEFT_W = 7050;
const RIGHT_W = 7050;
const TABLE_W = LEFT_W + RIGHT_W;

function bodyCell(children, widthDxa, fill) {
  return new TableCell({
    width: { size: widthDxa, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    shading: fill ? { type: ShadingType.CLEAR, color: 'auto', fill } : undefined,
    children,
  });
}

// ---- build table rows ----
const tableRows = [
  new TableRow({
    tableHeader: true,
    children: [
      headerCell('Legacy VBScript  —  Main_ISLLSYS_20010101.vbs · Sub window_onload', LEFT_W),
      headerCell('React POC equivalent  —  src/engine/load/shell-load.ts', RIGHT_W),
    ],
  }),
];

for (const r of rows) {
  const c = CAT[r.category] || CAT['eliminated'];
  const left = [lineTag(r.vbsLines), ...codeParas(r.vbsCode, 'F6F8FA'), explPara(r.vbsExplanation)];
  const right = [catChip(r.category), ...codeParas(r.reactCode, c.shade), explPara(r.reactExplanation)];
  tableRows.push(new TableRow({
    cantSplit: false,
    children: [bodyCell(left, LEFT_W), bodyCell(right, RIGHT_W)],
  }));
}

const table = new Table({
  columnWidths: [LEFT_W, RIGHT_W],
  width: { size: TABLE_W, type: WidthType.DXA },
  layout: TableLayoutType.FIXED,
  rows: tableRows,
});

// ---- intro paragraphs ----
const intro = [
  new Paragraph({
    heading: HeadingLevel.TITLE,
    children: [new TextRun({ text: 'window_onload — Legacy VBScript → React POC', font: SANS })],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: 'Main_ISLLSYS_20010101.vbs  ·  the frameset-shell bootstrap  ·  every line explained with its React equivalent', italics: true, color: '444444', font: SANS, size: 20 })],
  }),
  new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text: 'What this file is: ', bold: true, font: SANS, size: 20 }),
      new TextRun({ text: 'Main_ISLLSYS_20010101.vbs is the top-level browser window that hosts the AQS frameset (the menu, tree, and content frames). Its window_onload runs once when that window opens: it registers the window, decides the screen layout from the policy id, parses the permission XML, and starts a chained load of menu → tree → first page. This is DIFFERENT from Eebrowser.vbs window_onload, which initializes a single page.', font: SANS, size: 20 })],
  }),
  new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text: 'React target: ', bold: true, font: SANS, size: 20 }),
      new TextRun({ text: 'The routine is converted to src/engine/load/shell-load.ts, split into two phases — shellLoad() (a route loader that runs BEFORE the shell renders) and useShellLoad() (a React effect that runs AFTER the first render). It is wired into router.tsx (loader on the "/" route) and AppLayout.tsx. Shipped and verified running.', font: SANS, size: 20 })],
  }),
  new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: 'Legend: ', bold: true, font: SANS, size: 20 })],
  }),
  new Paragraph({
    spacing: { after: 160 },
    children: [
      new TextRun({ text: ' CONVERTED ', color: 'FFFFFF', font: SANS, size: 16, bold: true, shading: { type: ShadingType.CLEAR, fill: CAT['converted'].color } }),
      new TextRun({ text: '  direct code in shell-load.ts        ', font: SANS, size: 18 }),
      new TextRun({ text: ' MOVED ELSEWHERE ', color: 'FFFFFF', font: SANS, size: 16, bold: true, shading: { type: ShadingType.CLEAR, fill: CAT['moved-elsewhere'].color } }),
      new TextRun({ text: '  lives in another engine file        ', font: SANS, size: 18 }),
      new TextRun({ text: ' FRAMEWORK HANDLES ', color: 'FFFFFF', font: SANS, size: 16, bold: true, shading: { type: ShadingType.CLEAR, fill: CAT['framework-handles'].color } }),
      new TextRun({ text: '  React Router/MUI does it        ', font: SANS, size: 18 }),
      new TextRun({ text: ' ELIMINATED ', color: 'FFFFFF', font: SANS, size: 16, bold: true, shading: { type: ShadingType.CLEAR, fill: CAT['eliminated'].color } }),
      new TextRun({ text: '  not needed in the SPA', font: SANS, size: 18 }),
    ],
  }),
];

const doc = new Document({
  sections: [{
    properties: {
      page: {
        // Pass PORTRAIT dims + LANDSCAPE; docx-js swaps to 15840 wide × 12240 tall.
        size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE },
        margin: { top: 720, bottom: 720, left: 720, right: 720 },
      },
    },
    children: [...intro, table],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  const out = path.join(DIR, 'window_onload_VBS_to_React_side_by_side.docx');
  fs.writeFileSync(out, buf);
  console.log('WROTE', out, buf.length, 'bytes');
});
