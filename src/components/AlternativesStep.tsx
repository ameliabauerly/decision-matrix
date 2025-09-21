import React, { useState } from 'react';
import type { Alternative } from '../types';

interface AlternativesStepProps {
  alternatives: Alternative[];
  onUpdate: (alternatives: Alternative[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const AlternativesStep: React.FC<AlternativesStepProps> = ({ 
  alternatives, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const [newAlternative, setNewAlternative] = useState('');

  const addAlternative = () => {
    if (newAlternative.trim() && alternatives.length < 3) {
      const alternative: Alternative = {
        id: Date.now().toString(),
        name: newAlternative.trim()
      };
      onUpdate([...alternatives, alternative]);
      setNewAlternative('');
    }
  };

  const updateAlternative = (id: string, name: string) => {
    const updated = alternatives.map(a => 
      a.id === id ? { ...a, name } : a
    );
    onUpdate(updated);
  };

  const removeAlternative = (id: string) => {
    onUpdate(alternatives.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Step 2: Define Alternatives</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Alternative</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Alternative name"
            value={newAlternative}
            onChange={(e) => setNewAlternative(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addAlternative}
            disabled={!newAlternative.trim() || alternatives.length >= 3}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Maximum 3 alternatives allowed. Current: {alternatives.length}/3
        </p>
      </div>

      {alternatives.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Alternatives List</h3>
          <div className="space-y-3">
            {alternatives.map((alternative) => (
              <div key={alternative.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-md">
                <input
                  type="text"
                  value={alternative.name}
                  onChange={(e) => updateAlternative(alternative.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeAlternative(alternative.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back: Define Criteria
        </button>
        <button
          onClick={onNext}
          disabled={alternatives.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next: Score Alternatives
        </button>
      </div>
    </div>
  );
};

export default AlternativesStep;