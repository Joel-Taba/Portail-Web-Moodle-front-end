import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data: Record<string, unknown>[], columns: string[], title: string, filename: string) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(11);
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const formattedDate = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${now.getFullYear()}:${pad(now.getMonth() + 1)}:${pad(now.getDate())}`;
    doc.text(`Exporté le ${formattedDate}`, 14, 30);

    // Prepare data
    const tableRows = data.map(item => columns.map(col => {
        const val = item[col];
        if (typeof val === 'object' && val !== null) {
            // Handle objects like instructor or tags
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ('name' in val) return (val as any).name; // Instructor
            if (Array.isArray(val)) return val.join(', '); // Tags
            return JSON.stringify(val);
        }
        return String(val ?? '');
    }));

    // Generate table
    autoTable(doc, {
        head: [columns],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    doc.save(`${filename}.pdf`);
};
