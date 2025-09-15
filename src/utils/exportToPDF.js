// utils/exportUtils.js
import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = (data, filename = "data.pdf") => {
  if (!data || !data.length) {
    console.error("No data provided for PDF export");
    return;
  }

  const doc = new jsPDF();

  const headers = [Object.keys(data[0])];
  const rows = data.map(row => Object.values(row));

  doc.text("Exported Data", 14, 10);
  doc.autoTable({
    head: headers,
    body: rows,
    startY: 20,
  });

  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
};
