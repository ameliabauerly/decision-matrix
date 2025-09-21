export interface Criterion {
  id: string;
  name: string;
  weight: number;
}

export interface Alternative {
  id: string;
  name: string;
}

export interface Score {
  criterionId: string;
  alternativeId: string;
  value: number;
}

export interface WeightedScore {
  alternativeId: string;
  alternativeName: string;
  totalScore: number;
  rank: number;
  criterionScores: {
    criterionName: string;
    rawScore: number;
    weightedScore: number;
  }[];
}

export interface DecisionMatrix {
  criteria: Criterion[];
  alternatives: Alternative[];
  scores: Score[];
}

export type Step = 'criteria' | 'alternatives' | 'scoring' | 'results';