import { useState } from 'react';
import type { Criterion, Alternative, Score, Step } from './types';
import { calculateWeightedScores, validateMatrix } from './utils/calculations';
import CriteriaStep from './components/CriteriaStep';
import AlternativesStep from './components/AlternativesStep';
import ScoringStep from './components/ScoringStep';
import ResultsStep from './components/ResultsStep';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('criteria');
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [weightedScores, setWeightedScores] = useState<any[]>([]);

  const handleNext = () => {
    switch (currentStep) {
      case 'criteria':
        setCurrentStep('alternatives');
        break;
      case 'alternatives':
        setCurrentStep('scoring');
        break;
      case 'scoring':
        // Calculate results
        const errors = validateMatrix(criteria, alternatives, scores);
        if (errors.length === 0) {
          const results = calculateWeightedScores(criteria, alternatives, scores);
          setWeightedScores(results);
          setCurrentStep('results');
        } else {
          alert('Please complete all required fields:\n' + errors.join('\n'));
        }
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'alternatives':
        setCurrentStep('criteria');
        break;
      case 'scoring':
        setCurrentStep('alternatives');
        break;
      case 'results':
        setCurrentStep('scoring');
        break;
    }
  };

  const handleNewMatrix = () => {
    setCurrentStep('criteria');
    setCriteria([]);
    setAlternatives([]);
    setScores([]);
    setWeightedScores([]);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'criteria':
        return (
          <CriteriaStep
            criteria={criteria}
            onUpdate={setCriteria}
            onNext={handleNext}
          />
        );
      case 'alternatives':
        return (
          <AlternativesStep
            alternatives={alternatives}
            onUpdate={setAlternatives}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'scoring':
        return (
          <ScoringStep
            criteria={criteria}
            alternatives={alternatives}
            scores={scores}
            onUpdate={setScores}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'results':
        return (
          <ResultsStep
            criteria={criteria}
            alternatives={alternatives}
            weightedScores={weightedScores}
            onBack={handleBack}
            onNewMatrix={handleNewMatrix}
          />
        );
      default:
        return null;
    }
  };


  const getStepNumber = () => {
    switch (currentStep) {
      case 'criteria':
        return 1;
      case 'alternatives':
        return 2;
      case 'scoring':
        return 3;
      case 'results':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Decision Matrix</h1>
              <p className="text-sm text-gray-600">Make informed decisions with weighted criteria</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Step {getStepNumber()} of 4
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(getStepNumber() / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {[
              { key: 'criteria', label: 'Criteria', number: 1 },
              { key: 'alternatives', label: 'Alternatives', number: 2 },
              { key: 'scoring', label: 'Scoring', number: 3 },
              { key: 'results', label: 'Results', number: 4 }
            ].map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  currentStep === step.key 
                    ? 'bg-blue-600 text-white' 
                    : getStepNumber() > step.number
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === step.key ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
                {index < 3 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    getStepNumber() > step.number ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {renderCurrentStep()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-600">
            Decision Matrix Tool - Make informed decisions with weighted criteria analysis
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;