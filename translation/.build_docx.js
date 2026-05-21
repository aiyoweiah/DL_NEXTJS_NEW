// One-shot markdown → .docx for BRAND_CONTENT_GUIDE.md
// Run: node .build_docx.js
// Output: BRAND_CONTENT_GUIDE.docx

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageOrientation,
} = require('docx');

const SRC = path.join(__dirname, 'BRAND_CONTENT_GUIDE.md');
const OUT = path.join(__dirname, 'BRAND_CONTENT_GUIDE.docx');

const raw = fs.readFileSync(SRC, 'utf8');
const lines = raw.split(/\r?\n/);

const BORDER = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' };
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER, insideHorizontal: BORDER, insideVertical: BORDER };
const HEADER_FILL = 'F5F5FF'; // Whisper from brand palette
const ACCENT = '2D2B8E';

// Parse inline markdown into TextRun[]
function inline(text) {
  const runs = [];
  // Order matters: bold, italic, strike, code, plain
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(~~([^~]+)~~)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0; let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) runs.push(new TextRun({ text: text.slice(last, m.index) }));
    if (m[1]) runs.push(new TextRun({ text: m[2], bold: true }));
    else if (m[3]) runs.push(new TextRun({ text: m[4], italics: true }));
    else if (m[5]) runs.push(new TextRun({ text: m[6], strike: true }));
    else if (m[7]) runs.push(new TextRun({ text: m[8], font: 'Consolas', size: 20 }));
    else if (m[9]) runs.push(new TextRun({ text: m[10], color: ACCENT, underline: { type: 'single' } }));
    last = m.index + m[0].length;
  }
  if (last < text.length) runs.push(new TextRun({ text: text.slice(last) }));
  if (runs.length === 0) runs.push(new TextRun({ text: text }));
  return runs;
}

const children = [];
let i = 0;
const numConfigs = []; // tracked at top level

while (i < lines.length) {
  let ln = lines[i];

  // Skip blank
  if (ln.trim() === '') { i++; continue; }

  // HR — render as a small spacer paragraph with a bottom border
  if (/^---+\s*$/.test(ln)) {
    children.push(new Paragraph({
      children: [new TextRun({ text: '' })],
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'b7b5fe', space: 1 } },
      spacing: { before: 120, after: 120 },
    }));
    i++; continue;
  }

  // Headings
  let h = ln.match(/^(#{1,6})\s+(.*)$/);
  if (h) {
    const level = h[1].length;
    const text = h[2];
    const heading = level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : level === 3 ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_4;
    children.push(new Paragraph({ heading, children: inline(text) }));
    i++; continue;
  }

  // Blockquote
  if (/^>\s?/.test(ln)) {
    const buf = [];
    while (i < lines.length && /^>\s?/.test(lines[i])) {
      buf.push(lines[i].replace(/^>\s?/, ''));
      i++;
    }
    children.push(new Paragraph({
      children: inline(buf.join(' ')),
      indent: { left: 360 },
      border: { left: { style: BorderStyle.SINGLE, size: 12, color: 'b7b5fe', space: 8 } },
      spacing: { before: 80, after: 80 },
      shading: { type: ShadingType.CLEAR, fill: 'F5F5FF' },
    }));
    continue;
  }

  // Table
  if (/^\|.*\|\s*$/.test(ln) && i + 1 < lines.length && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
    const rows = [];
    while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
      const cells = lines[i].replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      rows.push(cells);
      i++;
    }
    // rows[0] = header, rows[1] = separator, rows[2..] = data
    const header = rows[0];
    const dataRows = rows.slice(2);
    const colCount = header.length;
    // Content width DXA: US Letter (12240) - margins (1440 each) = 9360
    const contentWidth = 9360;
    const colWidth = Math.floor(contentWidth / colCount);
    const columnWidths = Array(colCount).fill(colWidth);

    const buildCell = (text, isHeader) => new TableCell({
      borders: BORDERS,
      width: { size: colWidth, type: WidthType.DXA },
      shading: isHeader ? { type: ShadingType.CLEAR, fill: HEADER_FILL } : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({
        children: inline(text || ''),
        spacing: { before: 40, after: 40 },
      })],
    });

    const tableRows = [
      new TableRow({ tableHeader: true, children: header.map(c => buildCell(c, true)) }),
      ...dataRows.map(r => new TableRow({
        children: r.map((c, idx) => buildCell(c, false)).concat(
          Array(Math.max(0, colCount - r.length)).fill(0).map(() => buildCell('', false))
        ).slice(0, colCount),
      })),
    ];

    children.push(new Table({
      width: { size: contentWidth, type: WidthType.DXA },
      columnWidths,
      rows: tableRows,
    }));
    children.push(new Paragraph({ children: [new TextRun({ text: '' })], spacing: { after: 80 } }));
    continue;
  }

  // Bullet list
  if (/^[-*]\s+/.test(ln)) {
    while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
      const text = lines[i].replace(/^[-*]\s+/, '');
      children.push(new Paragraph({
        numbering: { reference: 'bullets', level: 0 },
        children: inline(text),
      }));
      i++;
    }
    continue;
  }

  // Numbered list
  if (/^\d+\.\s+/.test(ln)) {
    while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
      const text = lines[i].replace(/^\d+\.\s+/, '');
      children.push(new Paragraph({
        numbering: { reference: 'numbers', level: 0 },
        children: inline(text),
      }));
      i++;
    }
    continue;
  }

  // Default paragraph
  children.push(new Paragraph({ children: inline(ln), spacing: { after: 80 } }));
  i++;
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } }, // 11pt
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: '2D2B8E' },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: '212830' },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: '212830' },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'numbers', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log('Wrote', OUT, '·', buf.length, 'bytes');
});
