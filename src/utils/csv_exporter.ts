const exportArrayToCSV = (array: Array<any>, filename: string) => {
  const csvRows = [] as any;

  const keys = Object.keys(array[0]);

  keys.unshift("id");

  csvRows.push(keys);

  for (let i = 0; i < array.length; i++) {
    const row = array[i];
    csvRows.push(Object.values(row));
  }

  const csvContent =
    "data:text/csv;charset=utf-8" +
    csvRows.map((row: any) => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);

  link.setAttribute("download", `${filename}.csv`);

  document.body.appendChild(link);

  link.click();
};

export default exportArrayToCSV;
