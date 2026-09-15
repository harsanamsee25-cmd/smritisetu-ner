/**
 * Feature Engineering for SmritiSetu NER Adaptive ML System
 * Prototype Note: Synthetic feature extraction used for hackathon demonstration. Not clinically validated.
 */

export const DIFFICULTY_MAP = {
  gentle: 0,
  adaptive: 1,
  challenging: 2
};

export const REVERSE_DIFFICULTY_MAP = {
  0: 'gentle',
  1: 'adaptive',
  2: 'challenging'
};

export const extractPlayerFeatures = (sessionData, history = [], currentDifficultyStr = 'adaptive') => {
  const score = sessionData.score || 0;
  const maxScore = sessionData.maxScore || 4;
  const accuracy = sessionData.accuracy !== undefined 
    ? sessionData.accuracy 
    : (maxScore > 0 ? score / maxScore : 0.8);

  const responseTime = sessionData.responseTime || sessionData.completionTimeSeconds || 15;
  const attempts = sessionData.attempts || (score > 0 ? score : 4);
  const hintsUsed = sessionData.hintsUsed || 0;
  const completed = sessionData.completed !== undefined ? (sessionData.completed ? 1 : 0) : 1;
  const recentScore = score;

  const prevSession = history.length > 0 ? history[history.length - 1] : null;
  const previousScore = prevSession ? (prevSession.score || 0) : recentScore;

  // Compute consecutive success streak (sessions with accuracy >= 0.75)
  let successStreak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    const acc = history[i].accuracy !== undefined 
      ? history[i].accuracy 
      : ((history[i].maxScore || 4) > 0 ? history[i].score / history[i].maxScore : 0.8);
    if (acc >= 0.75) {
      successStreak++;
    } else {
      break;
    }
  }

  const currentDiffVal = DIFFICULTY_MAP[currentDifficultyStr] ?? 1;

  return {
    accuracy: Number(accuracy.toFixed(2)),
    responseTime: Number(responseTime.toFixed(1)),
    attempts: Number(attempts),
    hintsUsed: Number(hintsUsed),
    completed: Number(completed),
    currentDifficulty: currentDiffVal,
    recentScore: Number(recentScore),
    previousScore: Number(previousScore),
    successStreak: Number(successStreak)
  };
};
