import type { LabelRow } from './csv';
import { getAvery5160Position } from './pdf';

const LABEL_W = 66.7;
const LABELS_PER_PAGE = 30;
const PADDING_X = 2;
const BARCODE_H = 12;
const BARCODE_Y_OFFSET = 2;

export async function generateLabelPdf(rows: LabelRow[]): Promise<void> {
  const [{ jsPDF }, bwipjs] = await Promise.all([
    import('jspdf'),
    import('bwip-js/browser')
  ]);

  const doc = new jsPDF({ unit: 'mm', format: 'letter', orientation: 'portrait' });

  for (let i = 0; i < rows.length; i++) {
    if (i > 0 && i % LABELS_PER_PAGE === 0) {
      doc.addPage();
    }

    const row = rows[i];
    const pageIndex = i % LABELS_PER_PAGE;
    const { x, y } = getAvery5160Position(pageIndex);

    try {
      const canvas = document.createElement('canvas');
      bwipjs.toCanvas(canvas, {
        bcid: 'code128',
        text: row.code,
        scale: 3,
        height: 12,
        includetext: false
      });
      doc.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        x + PADDING_X,
        y + BARCODE_Y_OFFSET,
        LABEL_W - PADDING_X * 2,
        BARCODE_H
      );
    } catch {
      // skip labels with invalid barcode values
    }

    doc.setFontSize(7);
    doc.setTextColor(30, 30, 30);
    doc.text(row.name || row.code, x + PADDING_X, y + BARCODE_Y_OFFSET + BARCODE_H + 3, {
      maxWidth: LABEL_W - PADDING_X * 2
    });

    if (row.price) {
      doc.setFontSize(6);
      doc.text(row.price, x + LABEL_W - PADDING_X, y + BARCODE_Y_OFFSET + BARCODE_H + 7, {
        align: 'right'
      });
    }
  }

  doc.save('avery-5160-labels.pdf');
}
