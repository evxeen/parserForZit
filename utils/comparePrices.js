import fs from "fs";

export const comparePrices = () => {
  const oldArr = JSON.parse(fs.readFileSync("./data/dataFile.json", "utf8"));
  const newArr = JSON.parse(fs.readFileSync("./data/newDataFile.json", "utf8"));

  return oldArr.map((oldRow, index) => {
    const newRow = newArr[index];

    if (oldRow[oldRow.length - 1] === newRow[newRow.length - 1]) {
      return [...oldRow.slice(0, oldRow.length - 1), "–"];
    } else {
      return [...oldRow.slice(0, oldRow.length - 1), newRow[newRow.length - 1]];
    }
  });
};
