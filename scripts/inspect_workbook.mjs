import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = process.argv[2];

if (!inputPath) {
  throw new Error("Usage: node inspect_workbook.mjs <input.xlsx>");
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

if (process.argv[3] === "--help-inspect") {
  const topic = process.argv[4] || "inspect";
  const help = await workbook.help(topic);
  console.log(help);
  process.exit(0);
}

if (process.argv[3] === "--inspect-sheets") {
  const result = await workbook.inspect({
    kind: "sheet",
    summary: "List workbook sheets",
  });
  console.log(result.ndjson);
  process.exit(0);
}

if (process.argv[3] === "--inspect-range") {
  const range = process.argv[4];
  const include = process.argv[5] || "values,formulas";
  if (!range) {
    throw new Error("Usage: --inspect-range <Sheet!A1:D20>");
  }
  const result = await workbook.inspect({
    kind: "table",
    range,
    include,
    tableMaxRows: 40,
    tableMaxCols: 20,
    summary: `Inspect ${range}`,
  });
  console.log(result.ndjson);
  process.exit(0);
}

if (process.argv[3] === "--dump-formulas") {
  const range = process.argv[4];
  if (!range) {
    throw new Error("Usage: --dump-formulas <Sheet!A1:D20>");
  }
  const bang = range.indexOf("!");
  const sheetName = range.slice(0, bang);
  const a1 = range.slice(bang + 1);
  const sheet = workbook.worksheets.getItem(sheetName);
  const formulas = sheet.getRange(a1).formulas;
  console.log(JSON.stringify(formulas, null, 2));
  process.exit(0);
}

if (process.argv[3] === "--scan-errors") {
  const result = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 300 },
    summary: "Formula error scan",
  });
  console.log(result.ndjson);
  process.exit(0);
}

const out = {
  sheetNames: workbook.worksheets.items.map((ws, index) => ({
    index: index + 1,
    name: ws.name,
  })),
};

console.log(JSON.stringify(out, null, 2));
