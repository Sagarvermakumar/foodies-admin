// utils/exportUtils.js
export const exportToCSV = (data, filename = "data.csv") => {
  if (!data?.length) {
    console.error("No data provided for CSV export");
    return;
  }

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row =>
    Object.values(row)
      .map(value => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );

  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
