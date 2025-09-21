import React from 'react';
import type { Criterion, Alternative, WeightedScore } from '../types';
import { exportToPDF } from '../utils/pdfExport';

interface ResultsStepProps {
  criteria: Criterion[];
  alternatives: Alternative[];
  weightedScores: WeightedScore[];
  onBack: () => void;
  onNewMatrix: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ 
  criteria, 
  alternatives, 
  weightedScores, 
  onBack, 
  onNewMatrix 
}) => {
  const handleExportPDF = () => {
    exportToPDF(criteria, alternatives, weightedScores);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Step 4: Results</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Criteria</h3>
          <p className="text-3xl font-bold text-blue-600">{criteria.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Alternatives</h3>
          <p className="text-3xl font-bold text-green-600">{alternatives.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Best Option</h3>
          <p className="text-xl font-bold text-purple-600">
            {weightedScores.length > 0 ? weightedScores[0].alternativeName : 'N/A'}
          </p>
        </div>
      </div>

      {/* Ranked Results */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Ranked Results</h3>
        <div className="space-y-4">
          {weightedScores.map((result, index) => (
            <div 
              key={result.alternativeId}
              className={`p-4 rounded-lg border-2 ${
                index === 0 
                  ? 'border-green-500 bg-green-50' 
                  : index === 1 
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${
                    index === 0 ? 'text-green-600' : 
                    index === 1 ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    #{result.rank}
                  </span>
                  <h4 className="text-lg font-semibold">{result.alternativeName}</h4>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  {result.totalScore.toFixed(2)}
                </span>
              </div>
              
              {/* Detailed scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                {result.criterionScores.map((criterionScore) => (
                  <div key={criterionScore.criterionName} className="flex justify-between">
                    <span className="text-gray-600">{criterionScore.criterionName}:</span>
                    <span className="font-medium">
                      {criterionScore.rawScore} × {criteria.find(c => c.name === criterionScore.criterionName)?.weight}% = {criterionScore.weightedScore.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Matrix */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Detailed Scoring Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Criterion (Weight)
                </th>
                {alternatives.map(alternative => (
                  <th key={alternative.id} className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    {alternative.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map(criterion => (
                <tr key={criterion.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    {criterion.name}
                    <span className="text-sm text-gray-500 ml-2">({criterion.weight}%)</span>
                  </td>
                  {alternatives.map(alternative => {
                    const weightedScore = weightedScores.find(ws => ws.alternativeId === alternative.id);
                    const criterionScore = weightedScore?.criterionScores.find(cs => cs.criterionName === criterion.name);
                    return (
                      <td key={alternative.id} className="border border-gray-300 px-4 py-3 text-center">
                        <div className="text-sm">
                          <div className="font-medium">{criterionScore?.rawScore || 0}</div>
                          <div className="text-gray-500">
                            × {criterion.weight}% = {criterionScore?.weightedScore.toFixed(2) || '0.00'}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-semibold">
                <td className="border border-gray-300 px-4 py-3">Total Score</td>
                {alternatives.map(alternative => {
                  const weightedScore = weightedScores.find(ws => ws.alternativeId === alternative.id);
                  return (
                    <td key={alternative.id} className="border border-gray-300 px-4 py-3 text-center text-lg">
                      {weightedScore?.totalScore.toFixed(2) || '0.00'}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back: Score Alternatives
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleExportPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Export PDF
          </button>
          <button
            onClick={onNewMatrix}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Start New Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;