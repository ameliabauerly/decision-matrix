import React from 'react';
import type { Criterion, Alternative, Score } from '../types';

interface ScoringStepProps {
  criteria: Criterion[];
  alternatives: Alternative[];
  scores: Score[];
  onUpdate: (scores: Score[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const ScoringStep: React.FC<ScoringStepProps> = ({ 
  criteria, 
  alternatives, 
  scores, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const updateScore = (criterionId: string, alternativeId: string, value: number) => {
    const existingScoreIndex = scores.findIndex(
      s => s.criterionId === criterionId && s.alternativeId === alternativeId
    );

    let updatedScores: Score[];
    if (existingScoreIndex >= 0) {
      updatedScores = scores.map((s, index) => 
        index === existingScoreIndex ? { ...s, value } : s
      );
    } else {
      updatedScores = [...scores, { criterionId, alternativeId, value }];
    }

    onUpdate(updatedScores);
  };

  const getScore = (criterionId: string, alternativeId: string): number => {
    const score = scores.find(
      s => s.criterionId === criterionId && s.alternativeId === alternativeId
    );
    return score?.value || 0;
  };

  const isComplete = criteria.length > 0 && alternatives.length > 0 && 
    scores.length === criteria.length * alternatives.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Step 3: Score Alternatives</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-600 mb-4">
          Rate each alternative against each criterion using a scale of 1-5 (1 = poor, 5 = excellent)
        </p>
        
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
                  {alternatives.map(alternative => (
                    <td key={alternative.id} className="border border-gray-300 px-4 py-3 text-center">
                      <select
                        value={getScore(criterion.id, alternative.id)}
                        onChange={(e) => updateScore(criterion.id, alternative.id, parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={0}>-</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Scoring Guide:</strong> 1 = Poor, 2 = Below Average, 3 = Average, 4 = Good, 5 = Excellent
          </p>
        </div>

        {!isComplete && (
          <div className="mt-4 p-3 bg-orange-50 rounded-md">
            <p className="text-sm text-orange-800">
              Please complete all scores before proceeding to results.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back: Define Alternatives
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Calculate Results
        </button>
      </div>
    </div>
  );
};

export default ScoringStep;