// Whole-file reference: all routines of Main_ISLLSYS_20010101.vbs -> React, side by side.
const fs = require('fs'); const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, HeadingLevel, PageOrientation, TableLayoutType } = require('docx');

const DIR = '/Users/harinadh/My code/aqs-web-ui/_study/main-isllsys-vbs';
const R = JSON.parse(fs.readFileSync(path.join(DIR, '_allroutines.json'), 'utf8'));
const MONO = 'Consolas', SANS = 'Calibri';

const ST = {
  shipped:    { label: 'SHIPPED',    color: '1B7A43', shade: 'E6F4EA' },
  scaffolded: { label: 'SCAFFOLDED', color: '1F5FA8', shade: 'E7F0FB' },
  design:     { label: 'DESIGN',     color: 'B45309', shade: 'FBF0E2' },
  eliminated: { label: 'ELIMINATED', color: '6B7280', shade: 'F1F3F5' },
};
const st = (s) => ST[s] || ST.design;

function txt(t, o={}) { return new TextRun({ text: String(t), font: o.mono ? MONO : SANS, size: o.size||20, bold: !!o.bold, italics: !!o.italics, color: o.color }); }
function p(children, o={}) { return new Paragraph({ spacing: { before: o.before??0, after: o.after??40, line: o.line??252 }, shading: o.fill?{type:ShadingType.CLEAR,color:'auto',fill:o.fill}:undefined, children: Array.isArray(children)?children:[children] }); }
function codeCell(code, w, fill) {
  const paras = String(code).split('\n').map(ln => new Paragraph({ spacing:{after:0,line:238}, children:[new TextRun({text: ln===''?' ':ln, font:MONO, size:15})] }));
  return new TableCell({ width:{size:w,type:WidthType.DXA}, shading:{type:ShadingType.CLEAR,color:'auto',fill}, margins:{top:80,bottom:80,left:130,right:130}, children:paras });
}
function cell(children, w, o={}) {
  return new TableCell({ width:{size:w,type:WidthType.DXA}, shading:o.fill?{type:ShadingType.CLEAR,color:'auto',fill:o.fill}:undefined, margins:{top:60,bottom:60,left:120,right:120}, children:Array.isArray(children)?children:[children] });
}
function hcell(t,w){ return cell([p(txt(t,{bold:true,color:'FFFFFF',size:18}))], w, {fill:'1F3A5F'}); }

const children = [];

// ---- title + intro ----
children.push(new Paragraph({ heading: HeadingLevel.TITLE, children:[txt('Main_ISLLSYS_20010101.vbs — full routine reference', {})] }));
children.push(p(txt('The frameset-shell controller  ·  ~9,090 lines  ·  '+R.length+' routines  ·  legacy VBScript → React POC', {italics:true, color:'555555', size:20}), {after:120}));
children.push(p([txt('How to read the status: ',{bold:true,size:20}),
  txt('SHIPPED',{bold:true,color:ST.shipped.color,size:20}), txt(' = real working POC code today (window_onload).  ',{size:20}),
  txt('SCAFFOLDED',{bold:true,color:ST.scaffolded.color,size:20}), txt(' = a POC file partly covers it (execute-action.ts, dispatch.ts, window-manager.ts).  ',{size:20}),
  txt('DESIGN',{bold:true,color:ST.design.color,size:20}), txt(' = mapped, not built yet — where it WOULD live.  ',{size:20}),
  txt('ELIMINATED',{bold:true,color:ST.eliminated.color,size:20}), txt(' = not needed in the SPA (frames, MSXML islands, IE timing hacks).',{size:20})], {after:80}));
const counts = R.reduce((a,r)=>{a[r.status]=(a[r.status]||0)+1;return a;},{});
children.push(p([txt('This file: ',{bold:true,size:20}), txt(`${counts.shipped||0} shipped · ${counts.scaffolded||0} scaffolded · ${counts.design||0} design · ${counts.eliminated||0} eliminated. Only window_onload is fully built; the rest is the migration map, in file order.`,{size:20})], {after:160}));

// ---- summary table ----
children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing:{before:120,after:100}, children:[txt('Summary — every routine at a glance',{})] }));
const CW = [520, 2650, 1150, 1750, 1500, 6830]; // = 14400
const sumRows = [ new TableRow({ tableHeader:true, children:[hcell('#',CW[0]),hcell('Routine',CW[1]),hcell('Lines',CW[2]),hcell('Area',CW[3]),hcell('Status',CW[4]),hcell('Purpose',CW[5])] }) ];
R.forEach((r,i)=>{
  const s = st(r.status);
  sumRows.push(new TableRow({ children:[
    cell([p(txt(String(i+1),{size:16}))],CW[0]),
    cell([p(txt(r.name,{mono:true,size:16,bold:true}))],CW[1]),
    cell([p(txt(r.lines,{mono:true,size:15}))],CW[2]),
    cell([p(txt(r.area,{size:16}))],CW[3]),
    cell([p(txt(s.label,{size:14,bold:true,color:'FFFFFF'}))],CW[4],{fill:s.color}),
    cell([p(txt(r.purpose,{size:16}))],CW[5]),
  ]}));
});
children.push(new Table({ columnWidths:CW, width:{size:14400,type:WidthType.DXA}, layout:TableLayoutType.FIXED, rows:sumRows }));

// ---- per-routine detail ----
children.push(new Paragraph({ pageBreakBefore:true, heading: HeadingLevel.HEADING_2, spacing:{after:100}, children:[txt('Routine-by-routine detail (file order)',{})] }));
const LW=7000, RW=7000;
R.forEach((r,i)=>{
  const s = st(r.status);
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, spacing:{before:220,after:60}, children:[
    txt(`${i+1}. ${r.name}`,{}), txt(`   ${r.kind||''} · lines ${r.lines} · ${r.area}`,{size:16,color:'666666'})
  ]}));
  children.push(p([txt(s.label+'  ',{bold:true,color:'FFFFFF',size:15,}), ], {fill:s.color, after:40}));
  children.push(p([txt('Purpose. ',{bold:true,size:20}), txt(r.purpose,{size:20})], {after:60}));
  children.push(new Table({ columnWidths:[LW,RW], width:{size:LW+RW,type:WidthType.DXA}, layout:TableLayoutType.FIXED, rows:[
    new TableRow({ tableHeader:true, children:[hcell('Legacy VBScript',LW), hcell('React POC  ·  '+(r.reactHome||''),RW)] }),
    new TableRow({ children:[ codeCell(r.legacy,LW,'F6F8FA'), codeCell(r.react,RW,s.shade) ] }),
  ]}));
  children.push(p([txt('How it maps. ',{bold:true,size:20}), txt(r.explanation,{size:20})], {before:80, after:40}));
});

const doc = new Document({ sections:[{ properties:{ page:{
  size:{ width:12240, height:15840, orientation:PageOrientation.LANDSCAPE },
  margin:{ top:700, bottom:700, left:720, right:720 } } }, children }] });
Packer.toBuffer(doc).then(buf=>{ const out=path.join(DIR,'Main_ISLLSYS_full_routine_reference.docx'); fs.writeFileSync(out,buf); console.log('WROTE',out,buf.length,'bytes'); });
