import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const [inputPath, sheetName, outputPath, range] = process.argv.slice(2);

if (!inputPath || !sheetName || !outputPath) {
  throw new Error(
    "Usage: node render_workbook_sheet.mjs <input.xlsx> <sheetName> <output.png> [range]"
  );
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const blob = await workbook.render({
  sheetName,
  ...(range ? { range } : {}),
  scale: 2,
});

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, Buffer.from(await blob.arrayBuffer()));
console.log(outputPath);
