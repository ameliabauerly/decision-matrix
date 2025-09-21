import React, { useState } from 'react';
import type { Criterion } from '../types';

interface CriteriaStepProps {
  criteria: Criterion[];
  onUpdate: (criteria: Criterion[]) => void;
  onNext: () => void;
}

const CriteriaStep: React.FC<CriteriaStepProps> = ({ criteria, onUpdate, onNext }) => {
  const [newCriterion, setNewCriterion] = useState({ name: '', weight: 10 });

  const addCriterion = () => {
    if (newCriterion.name.trim() && criteria.length < 10) {
      const criterion: Criterion = {
        id: Date.now().toString(),
        name: newCriterion.name.trim(),
        weight: newCriterion.weight
      };
      onUpdate([...criteria, criterion]);
      setNewCriterion({ name: '', weight: 10 });
    }
  };

  const updateCriterion = (id: string, field: keyof Criterion, value: string | number) => {
    const updated = criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    );
    onUpdate(updated);
  };

  const removeCriterion = (id: string) => {
    onUpdate(criteria.filter(c => c.id !== id));
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Step 1: Define Criteria</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Criterion</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Criterion name"
            value={newCriterion.name}
            onChange={(e) => setNewCriterion({ ...newCriterion, name: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min="1"
            max="100"
            value={newCriterion.weight}
            onChange={(e) => setNewCriterion({ ...newCriterion, weight: parseInt(e.target.value) || 0 })}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCriterion}
            disabled={!newCriterion.name.trim() || criteria.length >= 10}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Maximum 10 criteria allowed. Current: {criteria.length}/10
        </p>
      </div>

      {criteria.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Criteria List</h3>
          <div className="space-y-3">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-md">
                <input
                  type="text"
                  value={criterion.name}
                  onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={criterion.weight}
                  onChange={(e) => updateCriterion(criterion.id, 'weight', parseInt(e.target.value) || 0)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">%</span>
                <button
                  onClick={() => removeCriterion(criterion.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm">
              <span className="font-semibold">Total Weight:</span> {totalWeight}%
              {totalWeight !== 100 && (
                <span className="text-orange-600 ml-2">
                  (Consider adjusting weights to total 100%)
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={criteria.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next: Define Alternatives
        </button>
      </div>
    </div>
  );
};

export default CriteriaStep;