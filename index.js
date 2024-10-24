import fs from "fs";
import XLSX from "xlsx";
import { convertData } from "./utils/convertData.js";
import { comparePrices } from "./utils/comparePrices.js";
import { updateTable } from "./utils/updateTable.js";
import { createTable } from "./utils/createTable.js";

if (fs.existsSync("./data/metiz.xls")) {
  const workbook = XLSX.readFile("./data/metiz.xls");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (fs.existsSync("./data/data.xlsx")) {
    const result = convertData(data, "./data/newDataFile.json");
    const compared = comparePrices();
    fs.writeFileSync(
      "./data/comparedFile.json",
      JSON.stringify(compared, null, 2),
    );
    updateTable();
    fs.unlinkSync("./data/metiz.xls");
    fs.unlinkSync("./data/dataFile.json");
    fs.unlinkSync("./data/comparedFile.json");
    fs.renameSync("./data/newDataFile.json", "./data/dataFile.json");
  } else {
    const result = convertData(data, "./data/dataFile.json");
    createTable(result);
    fs.unlinkSync("./data/metiz.xls");
  }
} else {
  console.log("Добавьте файл с продукцией!");
}
