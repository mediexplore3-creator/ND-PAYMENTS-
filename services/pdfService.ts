import type { Transaction } from '../types';

declare const jspdf: any;

export const generateReceipt = (transaction: Transaction) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Payment Receipt", 105, 20, { align: 'center' });

  doc.setFontSize(12);
  let yPosition = 40;
  doc.text(`Transaction ID: ${transaction.id}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Amount: INR ${transaction.amount.toFixed(2)}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Date: ${new Date(transaction.date).toLocaleString()}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Status: ${transaction.status}`, 20, yPosition);
  
  if (transaction.note) {
    yPosition += 10;
    doc.text(`Note: ${transaction.note}`, 20, yPosition);
  }

  yPosition += 10;
  doc.setLineWidth(0.5);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.text("Thank you for your payment!", 105, yPosition, { align: 'center' });

  doc.save(`receipt-${transaction.id}.pdf`);
};