/**
 * Synthetic Training Dataset for SmritiSetu NER Adaptive ML Classifier
 * 
 * PROTOTYPE DEMONSTRATION NOTICE:
 * This dataset consists of synthetic gameplay feature examples representing various player
 * engagement and response patterns. It is used strictly for technical prototype demonstration
 * and is NOT clinically or medically validated.
 */

export const TRAINING_DATASET = [
  // --- CLASS 0: GENTLE (Players needing lower cognitive load / extra assistance) ---
  { accuracy: 0.25, responseTime: 28.0, attempts: 9, hintsUsed: 3, completed: 1, currentDifficulty: 1, recentScore: 1, previousScore: 2, successStreak: 0, target: 'gentle' },
  { accuracy: 0.50, responseTime: 24.5, attempts: 8, hintsUsed: 2, completed: 1, currentDifficulty: 1, recentScore: 2, previousScore: 2, successStreak: 0, target: 'gentle' },
  { accuracy: 0.33, responseTime: 32.0, attempts: 10, hintsUsed: 4, completed: 0, currentDifficulty: 1, recentScore: 1, previousScore: 1, successStreak: 0, target: 'gentle' },
  { accuracy: 0.40, responseTime: 22.0, attempts: 7, hintsUsed: 3, completed: 1, currentDifficulty: 0, recentScore: 2, previousScore: 1, successStreak: 0, target: 'gentle' },
  { accuracy: 0.50, responseTime: 26.0, attempts: 8, hintsUsed: 2, completed: 1, currentDifficulty: 2, recentScore: 2, previousScore: 2, successStreak: 0, target: 'gentle' },
  { accuracy: 0.20, responseTime: 35.0, attempts: 11, hintsUsed: 4, completed: 0, currentDifficulty: 1, recentScore: 1, previousScore: 1, successStreak: 0, target: 'gentle' },
  { accuracy: 0.60, responseTime: 21.0, attempts: 7, hintsUsed: 2, completed: 1, currentDifficulty: 0, recentScore: 2, previousScore: 2, successStreak: 0, target: 'gentle' },
  { accuracy: 0.45, responseTime: 29.0, attempts: 9, hintsUsed: 3, completed: 1, currentDifficulty: 1, recentScore: 2, previousScore: 1, successStreak: 0, target: 'gentle' },
  { accuracy: 0.30, responseTime: 30.0, attempts: 10, hintsUsed: 3, completed: 0, currentDifficulty: 2, recentScore: 1, previousScore: 2, successStreak: 0, target: 'gentle' },
  { accuracy: 0.50, responseTime: 25.0, attempts: 8, hintsUsed: 2, completed: 1, currentDifficulty: 1, recentScore: 2, previousScore: 2, successStreak: 0, target: 'gentle' },

  // --- CLASS 1: ADAPTIVE (Comfortable baseline performance) ---
  { accuracy: 0.75, responseTime: 14.0, attempts: 5, hintsUsed: 1, completed: 1, currentDifficulty: 1, recentScore: 3, previousScore: 3, successStreak: 1, target: 'adaptive' },
  { accuracy: 0.75, responseTime: 16.5, attempts: 5, hintsUsed: 1, completed: 1, currentDifficulty: 1, recentScore: 3, previousScore: 3, successStreak: 2, target: 'adaptive' },
  { accuracy: 0.80, responseTime: 13.0, attempts: 5, hintsUsed: 0, completed: 1, currentDifficulty: 0, recentScore: 3, previousScore: 2, successStreak: 1, target: 'adaptive' },
  { accuracy: 0.70, responseTime: 18.0, attempts: 6, hintsUsed: 1, completed: 1, currentDifficulty: 1, recentScore: 3, previousScore: 3, successStreak: 1, target: 'adaptive' },
  { accuracy: 0.75, responseTime: 15.0, attempts: 5, hintsUsed: 1, completed: 1, currentDifficulty: 2, recentScore: 3, previousScore: 4, successStreak: 0, target: 'adaptive' },
  { accuracy: 0.65, responseTime: 17.0, attempts: 6, hintsUsed: 2, completed: 1, currentDifficulty: 1, recentScore: 3, previousScore: 3, successStreak: 0, target: 'adaptive' },
  { accuracy: 0.80, responseTime: 12.5, attempts: 5, hintsUsed: 1, completed: 1, currentDifficulty: 1, recentScore: 3, previousScore: 3, successStreak: 2, target: 'adaptive' },
  { accuracy: 0.75, responseTime: 14.5, attempts: 5, hintsUsed: 1, completed: 1, currentDifficulty: 1, recentScore: 3, previousScore: 2, successStreak: 1, target: 'adaptive' },

  // --- CLASS 2: CHALLENGING (High accuracy, fast execution, high streak) ---
  { accuracy: 1.00, responseTime: 7.5,  attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 1, recentScore: 4, previousScore: 4, successStreak: 3, target: 'challenging' },
  { accuracy: 1.00, responseTime: 8.2,  attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 2, recentScore: 4, previousScore: 4, successStreak: 4, target: 'challenging' },
  { accuracy: 0.95, responseTime: 9.0,  attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 1, recentScore: 4, previousScore: 4, successStreak: 3, target: 'challenging' },
  { accuracy: 1.00, responseTime: 6.8,  attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 2, recentScore: 4, previousScore: 4, successStreak: 5, target: 'challenging' },
  { accuracy: 0.90, responseTime: 10.0, attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 1, recentScore: 4, previousScore: 3, successStreak: 3, target: 'challenging' },
  { accuracy: 1.00, responseTime: 8.0,  attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 1, recentScore: 4, previousScore: 4, successStreak: 4, target: 'challenging' },
  { accuracy: 0.95, responseTime: 9.5,  attempts: 4, hintsUsed: 0, completed: 1, currentDifficulty: 2, recentScore: 4, previousScore: 4, successStreak: 3, target: 'challenging' },
];

// Generate data samples to build a 120-item dataset
export const getFullTrainingDataset = () => {
  const base = TRAINING_DATASET;
  const dataset = [];

  for (let i = 0; i < 6; i++) {
    base.forEach(item => {
      // Add slight synthetic variance
      const noise = (Math.random() - 0.5) * 0.05;
      dataset.push({
        ...item,
        accuracy: Math.min(1.0, Math.max(0.1, Number((item.accuracy + noise).toFixed(2)))),
        responseTime: Math.max(3.0, Number((item.responseTime + noise * 10).toFixed(1))),
        attempts: Math.max(3, item.attempts + (Math.random() > 0.7 ? 1 : 0))
      });
    });
  }

  return dataset;
};
