import fs from "fs";
import XLSX from "xlsx";

export const updateTable = () => {
  const newPrices = JSON.parse(
    fs.readFileSync("./data/comparedFile.json", "utf8"),
  );

  function getLastElements() {
    return newPrices.map((row) => row[row.length - 1]);
  }

  let lastElements = getLastElements();

  const todayData = new Date();
  const day = String(todayData.getDate()).padStart(2, "0");
  const month = String(todayData.getMonth() + 1).padStart(2, "0"); // Месяцы в JS начинаются с 0
  const year = todayData.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const workbook = XLSX.readFile("./data/data.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  data[0].push(formattedDate);

  for (let i = 1; i < data.length && i - 1 < lastElements.length; i++) {
    data[i].push(lastElements[i - 1]); // Добавляем значение из массива цен в конец подмассива
  }
  const updatedSheet = XLSX.utils.aoa_to_sheet(data);

  workbook.Sheets[sheetName] = updatedSheet;

  XLSX.writeFile(workbook, "./data/data.xlsx");
};
