import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  throw new Error(
    "Usage: node fix_dashboard_workbook.mjs <input.xlsx> <output.xlsx>"
  );
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const raw = workbook.worksheets.getItem("Raw");
const dashboard = workbook.worksheets.getItem("Dashboard");

function setColumnWidth(sheet, column, widthPx) {
  sheet.getRange(`${column}:${column}`).format.columnWidthPx = widthPx;
}

function buildFormulaColumn(startRow, endRow, formulaFactory) {
  return Array.from({ length: endRow - startRow + 1 }, (_, index) => [
    formulaFactory(startRow + index),
  ]);
}

const formulaStartRow = 3;
const formulaEndRow = 1000;

raw.getRange(`AQ${formulaStartRow}:AQ${formulaEndRow}`).formulas = buildFormulaColumn(
  formulaStartRow,
  formulaEndRow,
  (row) => `=IF($E${row}="","",TEXT($E${row},"mmm yyyy"))`
);

raw.getRange(`AR${formulaStartRow}:AR${formulaEndRow}`).formulas = buildFormulaColumn(
  formulaStartRow,
  formulaEndRow,
  (row) =>
    `=IF(OR($E${row}="",$H${row}=""),"",IF(OR(WEEKDAY($E${row},2)>5,MOD($H${row},1)>TIME(17,0,0)),"Out of hours","In hours"))`
);

raw.getRange(`AS${formulaStartRow}:AS${formulaEndRow}`).formulas = buildFormulaColumn(
  formulaStartRow,
  formulaEndRow,
  (row) => `=IF(OR($E${row}="",$H${row}=""),"",INT($E${row})+MOD($H${row},1))`
);

raw.getRange("C3:C1000").format.numberFormat = "dd/mm/yyyy";
raw.getRange("E3:E1000").format.numberFormat = "dd/mm/yyyy";
raw.getRange("H3:H1000").format.numberFormat = "hh:mm";
raw.getRange("AA3:AA1000").format.numberFormat = "hh:mm";
raw.getRange("AD3:AD1000").format.numberFormat = "0.00";
raw.getRange("AQ3:AQ1000").format.numberFormat = "@";
raw.getRange("AS3:AS1000").format.numberFormat = "dd/mm/yyyy hh:mm";

raw.getRange("A2:AS2").format.wrapText = true;
raw.getRange("W3:W1000").format.wrapText = true;
raw.getRange("AN3:AO1000").format.wrapText = true;
raw.getRange("A1:AS1").format.rowHeightPx = 34;
raw.getRange("A2:AS2").format.rowHeightPx = 64;
raw.getRange("A3:AS1000").format.rowHeightPx = 24;

const rawWidths = {
  A: 120,
  B: 110,
  C: 95,
  D: 105,
  E: 130,
  F: 220,
  G: 260,
  H: 130,
  I: 165,
  J: 220,
  K: 80,
  L: 150,
  M: 140,
  N: 170,
  O: 170,
  P: 170,
  Q: 180,
  R: 260,
  S: 180,
  T: 95,
  U: 135,
  V: 150,
  W: 320,
  X: 170,
  Y: 90,
  Z: 140,
  AA: 140,
  AB: 180,
  AC: 210,
  AD: 90,
  AE: 230,
  AF: 150,
  AG: 150,
  AH: 150,
  AI: 200,
  AJ: 280,
  AK: 220,
  AL: 260,
  AM: 160,
  AN: 340,
  AO: 280,
  AP: 230,
  AQ: 120,
  AR: 130,
  AS: 160,
};

for (const [column, widthPx] of Object.entries(rawWidths)) {
  setColumnWidth(raw, column, widthPx);
}

dashboard.getRange("A4:K5").format.wrapText = true;
dashboard.getRange("A20:K98").format.wrapText = true;
dashboard.getRange("A4:K4").format.rowHeightPx = 54;
dashboard.getRange("A5:K5").format.rowHeightPx = 38;
dashboard.getRange("A8:K98").format.rowHeightPx = 26;
dashboard.getRange("A20:K27").format.rowHeightPx = 34;
dashboard.getRange("A33:K46").format.rowHeightPx = 34;
dashboard.getRange("A52:K98").format.rowHeightPx = 34;

const dashboardWidths = {
  A: 300,
  B: 80,
  C: 85,
  D: 95,
  E: 350,
  F: 80,
  G: 85,
  H: 105,
  I: 380,
  J: 80,
  K: 90,
};

for (const [column, widthPx] of Object.entries(dashboardWidths)) {
  setColumnWidth(dashboard, column, widthPx);
}

dashboard.getRange("B5:B98").format.numberFormat = "0";
dashboard.getRange("C5:C98").format.numberFormat = "0%";
dashboard.getRange("F5:F98").format.numberFormat = "0";
dashboard.getRange("G5:G98").format.numberFormat = "0%";
dashboard.getRange("J5:J98").format.numberFormat = "0";
dashboard.getRange("K5:K98").format.numberFormat = "0%";
dashboard.getRange("D5").format.numberFormat = "0%";
dashboard.getRange("G5:H5").format.numberFormat = "0.00";
dashboard.getRange("I5:J5").format.numberFormat = "0";
dashboard.getRange("K5").format.numberFormat = "0";

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
