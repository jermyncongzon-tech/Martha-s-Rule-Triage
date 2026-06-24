import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  throw new Error("Usage: node enhance_mr_dashboard.mjs <input.xlsx> <output.xlsx>");
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const raw = workbook.worksheets.getItem("Raw");
const dashboard = workbook.worksheets.getOrAdd("Dashboard");
const data = workbook.worksheets.getOrAdd("Dashboard Data");
const lookups = workbook.worksheets.getItem("Lookups");

function range(sheet, a1) {
  return sheet.getRange(a1);
}

function setWidth(sheet, widths) {
  for (const [col, px] of Object.entries(widths)) {
    range(sheet, `${col}:${col}`).format.columnWidthPx = px;
  }
}

function styleBlock(sheet, a1, { fill, font, numberFormat, wrap, rowHeightPx } = {}) {
  const r = range(sheet, a1);
  if (fill !== undefined) r.format.fill = fill;
  if (font !== undefined) r.format.font = font;
  if (numberFormat !== undefined) r.format.numberFormat = numberFormat;
  if (wrap !== undefined) r.format.wrapText = wrap;
  if (rowHeightPx !== undefined) r.format.rowHeightPx = rowHeightPx;
}

function addFormulaColumn(sheet, a1, startRow, endRow, formulaFactory) {
  range(sheet, a1).formulas = Array.from({ length: endRow - startRow + 1 }, (_, i) => [
    formulaFactory(startRow + i),
  ]);
}

function writeTable(sheet, startCell, rows) {
  const match = startCell.match(/^([A-Z]+)(\d+)$/);
  const startCol = match[1];
  const startRow = Number(match[2]);
  const colToNum = (col) =>
    col.split("").reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
  const numToCol = (num) => {
    let out = "";
    while (num > 0) {
      const mod = (num - 1) % 26;
      out = String.fromCharCode(65 + mod) + out;
      num = Math.floor((num - mod) / 26);
    }
    return out;
  };
  const endCol = numToCol(colToNum(startCol) + rows[0].length - 1);
  const endRow = startRow + rows.length - 1;
  range(sheet, `${startCell}:${endCol}${endRow}`).values = rows;
  return `${startCell}:${endCol}${endRow}`;
}

function writeFormulaTable(sheet, startCell, rows) {
  const match = startCell.match(/^([A-Z]+)(\d+)$/);
  const startCol = match[1];
  const startRow = Number(match[2]);
  const colToNum = (col) =>
    col.split("").reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
  const numToCol = (num) => {
    let out = "";
    while (num > 0) {
      const mod = (num - 1) % 26;
      out = String.fromCharCode(65 + mod) + out;
      num = Math.floor((num - mod) / 26);
    }
    return out;
  };
  const endCol = numToCol(colToNum(startCol) + rows[0].length - 1);
  const endRow = startRow + rows.length - 1;
  const values = rows.map((tableRow) =>
    tableRow.map((value) => (typeof value === "string" && value.startsWith("=") ? null : value))
  );
  range(sheet, `${startCell}:${endCol}${endRow}`).values = values;
  rows.forEach((tableRow, rIndex) => {
    tableRow.forEach((value, cIndex) => {
      if (typeof value === "string" && value.startsWith("=")) {
        const cell = `${numToCol(colToNum(startCol) + cIndex)}${startRow + rIndex}`;
        range(sheet, cell).formulas = [[value]];
      }
    });
  });
  return `${startCell}:${endCol}${endRow}`;
}

function sanitizeText(value) {
  return String(value ?? "").replaceAll('"', '""');
}

function countFormula(sourceRange, value) {
  return `=COUNTIF(${sourceRange},"${sanitizeText(value)}")`;
}

function percentFormula(countCell) {
  return `=IFERROR(${countCell}/Dashboard!$B$7,0)`;
}

function safeValues(address) {
  return range(lookups, address).values.flat().filter((value) => value !== null && value !== "");
}

function createChart(sheet, type, chartRange, title, from, extent, options = {}) {
  const chart = sheet.charts.add(type, {
    title,
    categories: options.categories,
    series: [{ name: options.seriesName ?? "Calls", values: options.values }],
    hasLegend: options.hasLegend ?? false,
    legend: options.hasLegend ? { position: "bottom", textStyle: { fontSize: 9 } } : undefined,
    barOptions: options.barOptions,
    dataLabels: options.dataLabels ?? { showValue: false },
    from: options.from,
    extent,
  });
  return chart;
}

function applyDashboardCard(cellRange, labelRange, valueRange, accent) {
  styleBlock(dashboard, cellRange, { fill: accent });
  styleBlock(dashboard, labelRange, {
    font: { color: "#153246", bold: true, size: 10 },
    wrap: true,
  });
  styleBlock(dashboard, valueRange, {
    font: { color: "#08283D", bold: true, size: 18 },
  });
}

const lastRow = 1000;

raw.getRange("A1:AS1").unmerge();
raw.getRange("A1:W1").merge();
raw.getRange("X1:AH1").merge();
raw.getRange("AI1:AP1").merge();
raw.getRange("AQ1:AS1").merge();
raw.getRange("A1").values = [["PERRT Call Log"]];
raw.getRange("X1").values = [["PERRT Visit"]];
raw.getRange("AI1").values = [["Local Review Outcomes"]];
raw.getRange("AQ1").values = [["Dashboard helper"]];
styleBlock(raw, "A1:AS1", {
  fill: "#0B3A5B",
  font: { color: "#FFFFFF", bold: true, size: 12 },
  rowHeightPx: 34,
});
styleBlock(raw, "A2:AS2", {
  fill: "#5A9ED6",
  font: { color: "#FFFFFF", bold: true, size: 11 },
  wrap: true,
  rowHeightPx: 64,
});
styleBlock(raw, "A3:AS1000", {
  fill: "#BFE7F7",
  wrap: true,
  rowHeightPx: 28,
});
styleBlock(raw, "A3:AS1000", { font: { color: "#000000", size: 10 } });

addFormulaColumn(raw, `AQ3:AQ${lastRow}`, 3, lastRow, (row) => `=IF($E${row}="","",TEXT($E${row},"mmm yyyy"))`);
addFormulaColumn(
  raw,
  `AR3:AR${lastRow}`,
  3,
  lastRow,
  (row) =>
    `=IF(OR($E${row}="",$H${row}=""),"",IF(OR(WEEKDAY($E${row},2)>5,MOD($H${row},1)>TIME(17,0,0)),"Out of hours","In hours"))`
);
addFormulaColumn(raw, `AS3:AS${lastRow}`, 3, lastRow, (row) => `=IF(OR($E${row}="",$H${row}=""),"",INT($E${row})+MOD($H${row},1))`);
raw.getRange("C3:C1000").format.numberFormat = "dd/mm/yyyy";
raw.getRange("E3:E1000").format.numberFormat = "dd/mm/yyyy";
raw.getRange("H3:H1000").format.numberFormat = "hh:mm";
raw.getRange("AA3:AA1000").format.numberFormat = "hh:mm";
raw.getRange("AD3:AD1000").format.numberFormat = "0.00";
raw.getRange("AQ3:AQ1000").format.numberFormat = "@";
raw.getRange("AS3:AS1000").format.numberFormat = "dd/mm/yyyy hh:mm";
setWidth(raw, {
  A: 120, B: 110, C: 100, D: 110, E: 120, F: 220, G: 260, H: 130, I: 165,
  J: 220, K: 80, L: 160, M: 150, N: 180, O: 190, P: 180, Q: 210, R: 320,
  S: 210, T: 110, U: 150, V: 160, W: 360, X: 220, Y: 95, Z: 135, AA: 150,
  AB: 220, AC: 260, AD: 110, AE: 270, AF: 175, AG: 175, AH: 190, AI: 220,
  AJ: 300, AK: 230, AL: 300, AM: 190, AN: 360, AO: 300, AP: 260, AQ: 130,
  AR: 145, AS: 170,
});

data.reset();
dashboard.reset();
dashboard.deleteAllDrawings();
data.deleteAllDrawings();
dashboard.showGridLines = false;
data.showGridLines = false;

const months = safeValues("K2:K13");
const triage = safeValues("A2:A6");
const primary = safeValues("G2:G48");
const secondary = safeValues("H2:H10");
const actions = safeValues("B2:B6");
const outcomes = safeValues("C2:C9");
const learning = safeValues("D2:D7");
const callerTypes = safeValues("E2:E5");
const wards = safeValues("J2:J48");
const services = safeValues("I2:I12");
const hourClass = safeValues("L2:L3");
const ethnicityRows = [["Ethnic group", "Calls"], ["White - British", "=COUNTIF(Raw!$U$3:$U$1000,A2)"], ["Other / not stated", '=COUNTIF(Raw!$U$3:$U$1000,"<>White - British")']];
const rawRows = raw
  .getRange("A3:AS1000")
  .values
  .filter((row) => row[0] !== null && row[0] !== "");

function excelDateToUtc(serial) {
  if (typeof serial !== "number" || !Number.isFinite(serial)) return null;
  return new Date(Math.round((serial - 25569) * 86400 * 1000));
}

function timeFraction(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return ((value % 1) + 1) % 1;
}

function countExact(index, categories) {
  return categories.map((category) =>
    rawRows.filter((row) => String(row[index] ?? "") === category).length
  );
}

function countContains(index, categories) {
  return categories.map((category) =>
    rawRows.filter((row) => String(row[index] ?? "").includes(category)).length
  );
}

function countPrimaryConcern(categories) {
  return categories.map((category) =>
    rawRows.filter((row) => String(row[16] ?? "") === category || String(row[15] ?? "") === category).length
  );
}

function countMonth(categories) {
  return categories.map((category) => rawRows.filter((row) => String(row[42] ?? "") === category).length);
}

function countDayOfWeek() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const counts = Object.fromEntries(labels.map((label) => [label, 0]));
  for (const row of rawRows) {
    const date = excelDateToUtc(row[4]);
    if (!date) continue;
    const day = date.getUTCDay();
    const label = labels[day === 0 ? 6 : day - 1];
    counts[label] += 1;
  }
  return labels.map((label) => counts[label]);
}

function countTimeBands() {
  const bands = [
    ["00:00-07:59", 0, 8 / 24],
    ["08:00-11:59", 8 / 24, 12 / 24],
    ["12:00-16:59", 12 / 24, 17 / 24 + 1 / 86400],
    ["17:01-23:59", 17 / 24 + 1 / 86400, 1],
  ];
  return bands.map(([, min, max]) =>
    rawRows.filter((row) => {
      const t = timeFraction(row[7]);
      return t !== null && t >= min && t < max;
    }).length
  );
}

function chartTop(labels, values, maxItems = 12) {
  return labels
    .map((label, index) => ({ label, value: values[index] ?? 0 }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
    .slice(0, maxItems);
}

const monthCounts = countMonth(months);
const hourCounts = countExact(43, hourClass);
const triageCounts = countExact(14, triage);
const primaryCounts = countPrimaryConcern(primary);
const secondaryCounts = countExact(17, secondary);
const actionCounts = countContains(28, actions);
const outcomeCounts = countContains(30, outcomes);
const wardCounts = countExact(9, wards);
const serviceCounts = countExact(11, services);
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayCounts = countDayOfWeek();
const timeLabels = ["00:00-07:59", "08:00-11:59", "12:00-16:59", "17:01-23:59"];
const timeCounts = countTimeBands();
const learningCounts = countExact(32, learning);

writeFormulaTable(data, "A1", [
  ["Metric", "Value"],
  ["Total calls", "=COUNTA(Raw!$A$3:$A$1000)"],
  ["Repeat calls", '=COUNTIF(Raw!$D$3:$D$1000,"Yes")'],
  ["Repeat call rate", "=IFERROR(B3/B2,0)"],
  ["In-hours calls", '=COUNTIF(Raw!$AR$3:$AR$1000,"In hours")'],
  ["Out-of-hours calls", '=COUNTIF(Raw!$AR$3:$AR$1000,"Out of hours")'],
  ["% out-of-hours", "=IFERROR(B6/B2,0)"],
  ["Total hours spent", "=SUM(Raw!$AD$3:$AD$1000)"],
  ["Average hours per call", "=IFERROR(B8/B2,0)"],
  ["PERRT/Outreach review calls", "=COUNTA(Raw!$X$3:$X$1000)"],
  ["Escalation or transfer calls", '=COUNTIF(Raw!$AE$3:$AE$1000,"*Escalated*")+COUNTIF(Raw!$AE$3:$AE$1000,"*Transfer*")+COUNTIF(Raw!$AE$3:$AE$1000,"*Transferred*")'],
  ["Calls with learning identified", '=COUNTIF(Raw!$AF$3:$AF$1000,"Yes")'],
  ["Learning identified rate", "=IFERROR(B12/B2,0)"],
  ["U1/U2 urgent calls", '=COUNTIF(Raw!$O$3:$O$1000,"U1 - Emergent")+COUNTIF(Raw!$O$3:$O$1000,"U2 - Urgent clinical")'],
  ["U1/U2 urgent rate", "=IFERROR(B14/B2,0)"],
  ["Pending learning reviews", '=COUNTIF(Raw!$AF$3:$AF$1000,"Pending")'],
]);

writeFormulaTable(data, "D1", [["Month", "Calls"], ...months.map((m) => [m, countFormula("Raw!$AQ$3:$AQ$1000", m)])]);
writeFormulaTable(data, "G1", [["Hours classification", "Calls"], ...hourClass.map((v) => [v, countFormula("Raw!$AR$3:$AR$1000", v)])]);
writeFormulaTable(data, "J1", [["Triage category", "Calls"], ...triage.map((v) => [v, countFormula("Raw!$O$3:$O$1000", v)])]);
writeFormulaTable(data, "M1", [["Caller type", "Calls"], ...callerTypes.map((v) => [v, countFormula("Raw!$M$3:$M$1000", v)])]);
writeFormulaTable(data, "P1", [["Primary concern", "Calls"], ...primary.map((v) => [v, `=COUNTIF(Raw!$Q$3:$Q$1000,"${sanitizeText(v)}")+COUNTIF(Raw!$P$3:$P$1000,"${sanitizeText(v)}")`])]);
writeFormulaTable(data, "S1", [["NHSE issue category", "Calls"], ...primary.map((v) => [v, countFormula("Raw!$P$3:$P$1000", v)])]);
writeFormulaTable(data, "V1", [["Secondary concern", "Calls"], ...secondary.map((v) => [v, countFormula("Raw!$R$3:$R$1000", v)])]);
writeTable(data, "Y1", [["Action", "Calls"], ...actions.map((v, i) => [v, actionCounts[i] ?? 0])]);
writeTable(data, "AB1", [["Outcome", "Calls"], ...outcomes.map((v, i) => [v, outcomeCounts[i] ?? 0])]);
writeFormulaTable(data, "AE1", [["Learning theme", "Calls"], ...learning.map((v) => [v, countFormula("Raw!$AG$3:$AG$1000", v)])]);
writeFormulaTable(data, "AH1", [["Ward / area", "Calls", "Hours", "Avg hours", "Out of hours", "PERRT review rate"], ...wards.map((v, i) => {
  const row = i + 2;
  return [
    v,
    countFormula("Raw!$J$3:$J$1000", v),
    `=SUMIF(Raw!$J$3:$J$1000,AH${row},Raw!$AD$3:$AD$1000)`,
    `=IFERROR(AJ${row}/AI${row},0)`,
    `=COUNTIFS(Raw!$J$3:$J$1000,AH${row},Raw!$AR$3:$AR$1000,"Out of hours")`,
    `=IFERROR(COUNTIFS(Raw!$J$3:$J$1000,AH${row},Raw!$X$3:$X$1000,"<>")/AI${row},0)`,
  ];
})]);
writeFormulaTable(data, "AO1", [["Specialty / service", "Calls", "Hours", "Avg hours", "Out of hours", "PERRT review rate"], ...services.map((v, i) => {
  const row = i + 2;
  return [
    v,
    countFormula("Raw!$L$3:$L$1000", v),
    `=SUMIF(Raw!$L$3:$L$1000,AO${row},Raw!$AD$3:$AD$1000)`,
    `=IFERROR(AQ${row}/AP${row},0)`,
    `=COUNTIFS(Raw!$L$3:$L$1000,AO${row},Raw!$AR$3:$AR$1000,"Out of hours")`,
    `=IFERROR(COUNTIFS(Raw!$L$3:$L$1000,AO${row},Raw!$X$3:$X$1000,"<>")/AP${row},0)`,
  ];
})]);
writeFormulaTable(data, "AV1", [["Day of week", "Calls"], ["Mon", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Mon"),--(Raw!$A$3:$A$1000<>""))'], ["Tue", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Tue"),--(Raw!$A$3:$A$1000<>""))'], ["Wed", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Wed"),--(Raw!$A$3:$A$1000<>""))'], ["Thu", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Thu"),--(Raw!$A$3:$A$1000<>""))'], ["Fri", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Fri"),--(Raw!$A$3:$A$1000<>""))'], ["Sat", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Sat"),--(Raw!$A$3:$A$1000<>""))'], ["Sun", '=SUMPRODUCT(--(TEXT(Raw!$E$3:$E$1000,"ddd")="Sun"),--(Raw!$A$3:$A$1000<>""))']]);
writeFormulaTable(data, "AY1", [["Time band", "Calls"], ["00:00-07:59", '=COUNTIFS(Raw!$H$3:$H$1000,">=0",Raw!$H$3:$H$1000,"<"&TIME(8,0,0))'], ["08:00-11:59", '=COUNTIFS(Raw!$H$3:$H$1000,">="&TIME(8,0,0),Raw!$H$3:$H$1000,"<"&TIME(12,0,0))'], ["12:00-16:59", '=COUNTIFS(Raw!$H$3:$H$1000,">="&TIME(12,0,0),Raw!$H$3:$H$1000,"<="&TIME(17,0,0))'], ["17:01-23:59", '=COUNTIFS(Raw!$H$3:$H$1000,">"&TIME(17,0,0),Raw!$H$3:$H$1000,"<1")']]);
writeFormulaTable(data, "BB1", [["Learning identified", "Calls"], ["Yes", '=COUNTIF(Raw!$AF$3:$AF$1000,"Yes")'], ["No", '=COUNTIF(Raw!$AF$3:$AF$1000,"No")'], ["Pending", '=COUNTIF(Raw!$AF$3:$AF$1000,"Pending")']]);
writeFormulaTable(data, "BE1", ethnicityRows);

data.getUsedRange().format.font = { name: "Aptos", size: 10 };
styleBlock(data, "A1:BF1", { fill: "#0B3A5B", font: { color: "#FFFFFF", bold: true } });
data.getUsedRange().format.wrapText = true;
setWidth(data, { A: 190, B: 110, D: 110, E: 80, G: 150, H: 80, J: 260, K: 80, M: 130, N: 80, P: 310, Q: 80, S: 310, T: 80, V: 360, W: 80, Y: 260, Z: 80, AB: 310, AC: 80, AE: 150, AF: 80, AH: 300, AI: 80, AJ: 80, AK: 90, AL: 80, AM: 115, AO: 190, AP: 80, AQ: 80, AR: 90, AS: 80, AT: 115, AV: 100, AW: 80, AY: 120, AZ: 80, BB: 145, BC: 80, BE: 170, BF: 80 });

dashboard.getRange("A1:L1").merge();
dashboard.getRange("A1").values = [["Martha's Rule Call Dashboard"]];
styleBlock(dashboard, "A1:L1", { fill: "#0B3A5B", font: { color: "#FFFFFF", bold: true, size: 22 }, rowHeightPx: 42 });
dashboard.getRange("A2:L2").merge();
dashboard.getRange("A2").values = [["Operational, governance and improvement view of demand, timing, acuity, concern themes, actions, outcomes, workload and learning."]];
styleBlock(dashboard, "A2:L2", { fill: "#E6F0F7", font: { color: "#173B52", italic: true, size: 10 }, rowHeightPx: 26 });

dashboard.getRange("A4:L4").merge();
dashboard.getRange("A4").values = [["Filters / slicer fields"]];
styleBlock(dashboard, "A4:L4", { fill: "#214E6D", font: { color: "#FFFFFF", bold: true, size: 12 }, rowHeightPx: 24 });
writeTable(dashboard, "A5", [["Date range", "Month range", "Ward / area", "Specialty / service", "Caller type", "In/out hours", "Triage", "Primary concern", "NHSE issue", "Learning theme", "Data note", "Use"]]);
writeTable(dashboard, "A6", [["Raw dates", "Dashboard Data months", "Raw Ward", "Raw Speciality", "Raw caller", "Raw helper", "Raw triage", "Raw primary", "Raw NHSE", "Raw learning", "Filter Raw or build Pivot slicers", "Refresh"]]);
styleBlock(dashboard, "A5:L6", { fill: "#F4F8FB", font: { color: "#173B52", bold: true, size: 9 }, wrap: true, rowHeightPx: 30 });

const kpiRows = [
  ["Total calls", "='Dashboard Data'!B2", "Repeat calls", "='Dashboard Data'!B3", "Repeat rate", "='Dashboard Data'!B4", "Out-of-hours calls", "='Dashboard Data'!B6"],
  ["Total hours", "='Dashboard Data'!B8", "Avg hours/call", "='Dashboard Data'!B9", "PERRT reviews", "='Dashboard Data'!B10", "Escalation/transfer", "='Dashboard Data'!B11"],
  ["Learning identified", "='Dashboard Data'!B12", "Learning rate", "='Dashboard Data'!B13", "U1/U2 urgent", "='Dashboard Data'!B14", "Pending learning", "='Dashboard Data'!B16"],
];

let row = 8;
for (const kpiRow of kpiRows) {
  for (let i = 0; i < 4; i++) {
    const startCol = ["A", "D", "G", "J"][i];
    const label = kpiRow[i * 2];
    const formula = kpiRow[i * 2 + 1];
    dashboard.getRange(`${startCol}${row}:${
      startCol === "A" ? "C" : startCol === "D" ? "F" : startCol === "G" ? "I" : "L"
    }${row + 1}`).merge();
    dashboard.getRange(`${startCol}${row}`).values = [[label]];
    dashboard.getRange(`${startCol}${row + 2}:${
      startCol === "A" ? "C" : startCol === "D" ? "F" : startCol === "G" ? "I" : "L"
    }${row + 2}`).merge();
    dashboard.getRange(`${startCol}${row + 2}`).formulas = [[formula]];
  }
  row += 4;
}

[
  ["A8:C10", "A8:C9", "A10:C10", "#E8F3FB"],
  ["D8:F10", "D8:F9", "D10:F10", "#EEF5EA"],
  ["G8:I10", "G8:I9", "G10:I10", "#FFF4E6"],
  ["J8:L10", "J8:L9", "J10:L10", "#F3EEFA"],
  ["A12:C14", "A12:C13", "A14:C14", "#E8F3FB"],
  ["D12:F14", "D12:F13", "D14:F14", "#EEF5EA"],
  ["G12:I14", "G12:I13", "G14:I14", "#FFF4E6"],
  ["J12:L14", "J12:L13", "J14:L14", "#F3EEFA"],
  ["A16:C18", "A16:C17", "A18:C18", "#E8F3FB"],
  ["D16:F18", "D16:F17", "D18:F18", "#EEF5EA"],
  ["G16:I18", "G16:I17", "G18:I18", "#FFF4E6"],
  ["J16:L18", "J16:L17", "J18:L18", "#F3EEFA"],
].forEach(([cellRange, labelRange, valueRange, accent]) => applyDashboardCard(cellRange, labelRange, valueRange, accent));

dashboard.getRange("D10:F10").format.numberFormat = "0%";
dashboard.getRange("D18:F18").format.numberFormat = "0%";
dashboard.getRange("A14:F14").format.numberFormat = "0.00";

createChart(dashboard, "bar", null, "Calls by month", null, { widthPx: 480, heightPx: 250 }, {
  from: { row: 20, col: 0 },
  categories: months,
  values: monthCounts,
  barOptions: { direction: "column", grouping: "clustered", gapWidth: 90 },
});
createChart(dashboard, "pie", null, "In-hours vs out-of-hours", null, { widthPx: 360, heightPx: 250 }, {
  from: { row: 20, col: 6 },
  categories: hourClass,
  values: hourCounts,
  hasLegend: true,
  dataLabels: { showValue: true, position: "outEnd" },
});
createChart(dashboard, "bar", null, "Triage category breakdown", null, { widthPx: 480, heightPx: 260 }, {
  from: { row: 36, col: 0 },
  categories: triage,
  values: triageCounts,
  barOptions: { direction: "column", grouping: "clustered", gapWidth: 90 },
});
const topPrimary = chartTop(primary, primaryCounts, 10);
createChart(dashboard, "bar", null, "Primary concern breakdown", null, { widthPx: 520, heightPx: 300 }, {
  from: { row: 36, col: 6 },
  categories: topPrimary.length ? topPrimary.map((item) => item.label) : primary,
  values: topPrimary.length ? topPrimary.map((item) => item.value) : primaryCounts,
  barOptions: { direction: "bar", grouping: "clustered", gapWidth: 80 },
});
const topSecondary = chartTop(secondary, secondaryCounts, 9);
createChart(dashboard, "bar", null, "Secondary concern breakdown", null, { widthPx: 560, heightPx: 300 }, {
  from: { row: 56, col: 0 },
  categories: topSecondary.length ? topSecondary.map((item) => item.label) : secondary,
  values: topSecondary.length ? topSecondary.map((item) => item.value) : secondaryCounts,
  barOptions: { direction: "bar", grouping: "clustered", gapWidth: 80 },
});
const topOutcomes = chartTop(outcomes, outcomeCounts, 8);
createChart(dashboard, "bar", null, "Outcome breakdown", null, { widthPx: 520, heightPx: 300 }, {
  from: { row: 56, col: 6 },
  categories: topOutcomes.length ? topOutcomes.map((item) => item.label) : outcomes,
  values: topOutcomes.length ? topOutcomes.map((item) => item.value) : outcomeCounts,
  barOptions: { direction: "bar", grouping: "clustered", gapWidth: 80 },
});
const topWards = chartTop(wards, wardCounts, 12);
createChart(dashboard, "bar", null, "Calls by ward / area", null, { widthPx: 560, heightPx: 300 }, {
  from: { row: 77, col: 0 },
  categories: topWards.length ? topWards.map((item) => item.label) : wards.slice(0, 12),
  values: topWards.length ? topWards.map((item) => item.value) : wardCounts.slice(0, 12),
  barOptions: { direction: "bar", grouping: "clustered", gapWidth: 80 },
});
const topServices = chartTop(services, serviceCounts, 10);
createChart(dashboard, "bar", null, "Calls by specialty / service", null, { widthPx: 520, heightPx: 300 }, {
  from: { row: 77, col: 6 },
  categories: topServices.length ? topServices.map((item) => item.label) : services,
  values: topServices.length ? topServices.map((item) => item.value) : serviceCounts,
  barOptions: { direction: "bar", grouping: "clustered", gapWidth: 80 },
});
createChart(dashboard, "bar", null, "Calls by day of week", null, { widthPx: 360, heightPx: 235 }, {
  from: { row: 98, col: 0 },
  categories: dayLabels,
  values: dayCounts,
  barOptions: { direction: "column", grouping: "clustered", gapWidth: 90 },
});
createChart(dashboard, "bar", null, "Calls by time of day", null, { widthPx: 360, heightPx: 235 }, {
  from: { row: 98, col: 4 },
  categories: timeLabels,
  values: timeCounts,
  barOptions: { direction: "column", grouping: "clustered", gapWidth: 90 },
});
createChart(dashboard, "pie", null, "Learning theme breakdown", null, { widthPx: 360, heightPx: 235 }, {
  from: { row: 98, col: 8 },
  categories: learning,
  values: learningCounts,
  hasLegend: true,
  dataLabels: { showValue: true, position: "outEnd" },
});

dashboard.getRange("A121:L121").merge();
dashboard.getRange("A121").values = [["Supporting Analysis"]];
styleBlock(dashboard, "A121:L121", { fill: "#214E6D", font: { color: "#FFFFFF", bold: true, size: 12 }, rowHeightPx: 24 });
writeTable(dashboard, "A123", [["PERRT action", "Calls"], ...actions.map((v, i) => [v, actionCounts[i] ?? 0])]);
writeFormulaTable(dashboard, "D123", [["NHSE issue category", "Calls"], ...primary.map((v) => [v, countFormula("Raw!$P$3:$P$1000", v)])]);
writeFormulaTable(dashboard, "G123", [["Workload by classification", "Hours", "Avg hours"], ["In hours", '=SUMIF(Raw!$AR$3:$AR$1000,"In hours",Raw!$AD$3:$AD$1000)', "=IFERROR(B124/'Dashboard Data'!B5,0)"], ["Out of hours", '=SUMIF(Raw!$AR$3:$AR$1000,"Out of hours",Raw!$AD$3:$AD$1000)', "=IFERROR(B125/'Dashboard Data'!B6,0)"]]);
writeFormulaTable(dashboard, "J123", [["Equity and access", "Calls"], ["Learning disability recorded", '=COUNTIF(Raw!$V$3:$V$1000,"<>")'], ["Ethnicity recorded", '=COUNTIF(Raw!$U$3:$U$1000,"<>")'], ["Not stated gender", '=COUNTIF(Raw!$T$3:$T$1000,"Not Stated")']]);
styleBlock(dashboard, "A123:K123", { fill: "#D7EAF7", font: { color: "#173B52", bold: true }, wrap: true });
styleBlock(dashboard, "A124:K140", { fill: "#F8FBFD", font: { color: "#172434", size: 10 }, wrap: true });

dashboard.getRange("A142:L142").merge();
dashboard.getRange("A142").values = [["Notes: action and outcome counts can exceed total calls where structured fields contain more than one selected option. Equity views should be interpreted cautiously when demographic completion is low."]];
styleBlock(dashboard, "A142:L142", { fill: "#F4F8FB", font: { color: "#536B7D", italic: true, size: 9 }, wrap: true, rowHeightPx: 36 });

dashboard.getUsedRange().format.font.name = "Aptos";
dashboard.getUsedRange().format.wrapText = true;
setWidth(dashboard, { A: 155, B: 105, C: 105, D: 155, E: 105, F: 105, G: 155, H: 105, I: 105, J: 155, K: 105, L: 105 });
dashboard.freezePanes.freezeRows(4);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
