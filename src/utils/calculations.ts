import type { Criterion, Alternative, Score, WeightedScore } from '../types';

export const calculateWeightedScores = (
  criteria: Criterion[],
  alternatives: Alternative[],
  scores: Score[]
): WeightedScore[] => {
  const result: WeightedScore[] = [];

  alternatives.forEach(alternative => {
    const criterionScores = criteria.map(criterion => {
      const score = scores.find(s => 
        s.criterionId === criterion.id && s.alternativeId === alternative.id
      );
      const rawScore = score?.value || 0;
      const weightedScore = rawScore * criterion.weight;
      
      return {
        criterionName: criterion.name,
        rawScore,
        weightedScore
      };
    });

    const totalScore = criterionScores.reduce((sum, cs) => sum + cs.weightedScore, 0);

    result.push({
      alternativeId: alternative.id,
      alternativeName: alternative.name,
      totalScore,
      rank: 0, // Will be set after sorting
      criterionScores
    });
  });

  // Sort by total score (highest first) and assign ranks
  result.sort((a, b) => b.totalScore - a.totalScore);
  result.forEach((item, index) => {
    item.rank = index + 1;
  });

  return result;
};

export const validateMatrix = (
  criteria: Criterion[],
  alternatives: Alternative[],
  scores: Score[]
): string[] => {
  const errors: string[] = [];

  if (criteria.length === 0) {
    errors.push('At least one criterion is required');
  }

  if (alternatives.length === 0) {
    errors.push('At least one alternative is required');
  }

  if (criteria.length > 10) {
    errors.push('Maximum 10 criteria allowed');
  }

  if (alternatives.length > 3) {
    errors.push('Maximum 3 alternatives allowed');
  }

  // Check if all scores are filled
  const requiredScores = criteria.length * alternatives.length;
  const actualScores = scores.length;
  
  if (actualScores < requiredScores) {
    errors.push('All criteria must be scored for all alternatives');
  }

  // Check for missing scores
  criteria.forEach(criterion => {
    alternatives.forEach(alternative => {
      const hasScore = scores.some(s => 
        s.criterionId === criterion.id && s.alternativeId === alternative.id
      );
      if (!hasScore) {
        errors.push(`Missing score for "${criterion.name}" and "${alternative.name}"`);
      }
    });
  });

  return errors;
};