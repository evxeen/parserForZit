import fs from "fs";

export const convertData = (data, path) => {
  let template = data
    .map((item) => item.filter((subItem) => subItem !== null))
    .filter((item) => item.length !== 0);

  const index = template.findIndex((row) =>
    row.some((cell) => String(cell).includes("Анкерная техника")),
  );

  if (index !== -1) {
    template = template.slice(index);
  }

  template = template.filter((row) => {
    const isTargetRow1 = row.includes("Размер, мм");
    const isTargetRow2 = row.includes("L");
    const isTargetRow3 = row.includes("Размеры");
    const isTargetRow4 = row.includes("Цена");
    const isTargetRow5 = row.includes("d");
    const isTargetRow6 = row.includes("dвн");
    const isTargetRow7 = row.includes("dнар");
    return !(
      isTargetRow1 ||
      isTargetRow2 ||
      isTargetRow3 ||
      isTargetRow4 ||
      isTargetRow5 ||
      isTargetRow6 ||
      isTargetRow7
    );
  });

  template = template
    .map((row) => {
      return row.map((cell) => {
        if (typeof cell === "string") {
          const rangeMatch = cell.match(/^(\d+)\s*-\s*(\d+)$/);
          if (rangeMatch) {
            return parseFloat(`${rangeMatch[1]}.${rangeMatch[2]}`);
          }
        }

        const num = parseFloat(cell);
        return isNaN(num) ? cell : num;
      });
    })
    .filter((item) => item.length !== 0);

  let transformedData = [];
  let accumulatedString = "";

  template.forEach((row) => {
    if (row.every((item) => typeof item === "string")) {
      accumulatedString += row.join(" ") + " ";
    } else if (row.every((item) => typeof item === "number")) {
      // Если массив содержит только числа
      if (row.length === 2) {
        transformedData.push([accumulatedString.trim(), "", "", ...row]);
      } else {
        transformedData.push([accumulatedString.trim(), "", ...row]);
      }
      accumulatedString = "";
    }
  });

  if (accumulatedString.trim() !== "") {
    transformedData.push([accumulatedString.trim()]);
  }

  fs.writeFileSync(path, JSON.stringify(transformedData, null, 2));

  return transformedData;
};
