import fs from "fs";

export const comparePrices = () => {
  const oldArr = JSON.parse(fs.readFileSync("./data/dataFile.json", "utf8"));
  const newArr = JSON.parse(fs.readFileSync("./data/newDataFile.json", "utf8"));

  return oldArr.map((oldRow, index) => {
    const newRow = newArr[index];

    // Если последний элемент в старом и новом массиве одинаковый
    if (oldRow[oldRow.length - 1] === newRow[newRow.length - 1]) {
      // Заменяем последний элемент на "-"
      return [...oldRow.slice(0, oldRow.length - 1), "–"];
    } else {
      // Если элементы разные, добавляем новый элемент
      return [...oldRow.slice(0, oldRow.length - 1), newRow[newRow.length - 1]];
    }
  });
};
