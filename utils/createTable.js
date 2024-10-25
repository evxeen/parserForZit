import XLSX from "xlsx";

export const createTable = (data) => {
  const todayData = new Date();
  const day = String(todayData.getDate()).padStart(2, "0");
  const month = String(todayData.getMonth() + 1).padStart(2, "0");
  const year = todayData.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  let sheetData = [];

  sheetData.push(["Название", "", "D", "L", formattedDate], ...data);

  const newWorkbook = XLSX.utils.book_new();
  const newWorksheet = XLSX.utils.aoa_to_sheet(sheetData);

  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

  XLSX.writeFile(newWorkbook, "./data/data.xlsx");
};
