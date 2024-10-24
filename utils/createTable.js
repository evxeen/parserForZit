import XLSX from "xlsx";

export const createTable = (data) => {
  const todayData = new Date();
  const day = String(todayData.getDate()).padStart(2, "0");
  const month = String(todayData.getMonth() + 1).padStart(2, "0"); // Месяцы в JS начинаются с 0
  const year = todayData.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  let sheetData = [];

  sheetData.push(["Название", "", "D", "L", formattedDate], ...data);

  // Создание новой книги и листа
  const newWorkbook = XLSX.utils.book_new(); // Создаем новую книгу
  const newWorksheet = XLSX.utils.aoa_to_sheet(sheetData); // Преобразуем данные в формат листа

  // Добавляем лист в книгу
  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1"); // Добавляем новый лист с именем "Sheet1"

  // Записываем данные в новый Excel файл
  XLSX.writeFile(newWorkbook, "./data/data.xlsx");
};
