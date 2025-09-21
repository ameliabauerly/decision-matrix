import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Criterion, Alternative, WeightedScore } from '../types';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToPDF = (
  criteria: Criterion[],
  alternatives: Alternative[],
  weightedScores: WeightedScore[]
): void => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Decision Matrix Results', 14, 22);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  let yPosition = 40;

  // Criteria and Weights
  doc.setFontSize(14);
  doc.text('Criteria and Weights', 14, yPosition);
  yPosition += 10;

  const criteriaData = criteria.map(criterion => [
    criterion.name,
    `${criterion.weight}%`
  ]);

  doc.autoTable({
    startY: yPosition,
    head: [['Criterion', 'Weight']],
    body: criteriaData,
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    margin: { left: 14, right: 14 }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 20;

  // Alternatives
  doc.setFontSize(14);
  doc.text('Alternatives', 14, yPosition);
  yPosition += 10;

  const alternativesData = alternatives.map(alt => [alt.name]);

  doc.autoTable({
    startY: yPosition,
    head: [['Alternative']],
    body: alternativesData,
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    margin: { left: 14, right: 14 }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 20;

  // Scoring Matrix
  doc.setFontSize(14);
  doc.text('Scoring Matrix', 14, yPosition);
  yPosition += 10;

  const scoringHeaders = ['Criterion', ...alternatives.map(alt => alt.name)];
  const scoringData = criteria.map(criterion => {
    const row = [criterion.name];
    alternatives.forEach(alternative => {
      const weightedScore = weightedScores.find(ws => ws.alternativeId === alternative.id);
      const criterionScore = weightedScore?.criterionScores.find(cs => cs.criterionName === criterion.name);
      row.push(criterionScore ? criterionScore.rawScore.toString() : '0');
    });
    return row;
  });

  doc.autoTable({
    startY: yPosition,
    head: [scoringHeaders],
    body: scoringData,
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    margin: { left: 14, right: 14 }
  });

  yPosition = (doc as any).lastAutoTable.finalY + 20;

  // Results
  doc.setFontSize(14);
  doc.text('Ranked Results', 14, yPosition);
  yPosition += 10;

  const resultsData = weightedScores.map(ws => [
    ws.rank.toString(),
    ws.alternativeName,
    ws.totalScore.toFixed(2)
  ]);

  doc.autoTable({
    startY: yPosition,
    head: [['Rank', 'Alternative', 'Total Score']],
    body: resultsData,
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    margin: { left: 14, right: 14 }
  });

  // Save the PDF
  doc.save('decision-matrix-results.pdf');
};