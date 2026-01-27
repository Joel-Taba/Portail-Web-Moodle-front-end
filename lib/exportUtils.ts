import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data: Record<string, unknown>[], columns: string[], title: string, filename: string) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(11);
    doc.text(`Exporté le ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);

    // Prepare data
    const tableRows = data.map(item => columns.map(col => {
        const val = item[col];
        if (typeof val === 'object' && val !== null) {
            // Handle objects like instructor or tags
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ('name' in val) return (val as any).name; // Instructor or Category object
            if (Array.isArray(val)) return val.join(', '); // Tags
            return JSON.stringify(val);
        }
        // Format dates in a clean, readable French format
        if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
            const date = new Date(val);
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(',', ' à');
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
