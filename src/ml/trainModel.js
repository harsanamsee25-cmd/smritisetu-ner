/**
 * Client-Side Decision Tree Classifier Trainer for Smritisetu NER
 * 
 * PROTOTYPE DEMONSTRATION NOTICE:
 * Trains a lightweight decision tree classifier on gameplay feature vectors.
 * Synthetic data is used for hackathon prototype demonstration only. Not clinically validated.
 */

import { getFullTrainingDataset } from './trainingData';

// Gini Impurity Calculation
const calculateGini = (samples) => {
  if (!samples || samples.length === 0) return 0;
  const counts = {};
  samples.forEach(s => {
    counts[s.target] = (counts[s.target] || 0) + 1;
  });
  let gini = 1.0;
  const total = samples.length;
  Object.keys(counts).forEach(key => {
    const p = counts[key] / total;
    gini -= p * p;
  });
  return gini;
};

// Build Decision Node recursively
const buildTree = (samples, depth = 0, maxDepth = 4) => {
  const counts = { gentle: 0, adaptive: 0, challenging: 0 };
  samples.forEach(s => { counts[s.target] = (counts[s.target] || 0) + 1; });
  const total = samples.length;

  // Calculate probabilities
  const probs = {
    gentle: total > 0 ? counts.gentle / total : 0,
    adaptive: total > 0 ? counts.adaptive / total : 0,
    challenging: total > 0 ? counts.challenging / total : 0
  };

  // Base case: pure leaf or max depth reached
  if (depth >= maxDepth || Object.values(probs).some(p => p >= 0.95) || total <= 5) {
    const winningClass = Object.keys(probs).reduce((a, b) => probs[a] > probs[b] ? a : b);
    return {
      isLeaf: true,
      prediction: winningClass,
      probabilities: probs,
      confidence: Math.round(probs[winningClass] * 100),
      samplesCount: total
    };
  }

  const features = ['accuracy', 'responseTime', 'attempts', 'hintsUsed', 'successStreak'];
  let bestFeature = null;
  let bestThreshold = null;
  let bestGiniGain = -1;
  const parentGini = calculateGini(samples);

  features.forEach(feature => {
    const values = samples.map(s => s[feature]).sort((a, b) => a - b);
    for (let i = 0; i < values.length - 1; i++) {
      const threshold = (values[i] + values[i + 1]) / 2;
      const left = samples.filter(s => s[feature] <= threshold);
      const right = samples.filter(s => s[feature] > threshold);

      if (left.length === 0 || right.length === 0) continue;

      const giniLeft = calculateGini(left);
      const giniRight = calculateGini(right);
      const weightedGini = (left.length / total) * giniLeft + (right.length / total) * giniRight;
      const giniGain = parentGini - weightedGini;

      if (giniGain > bestGiniGain) {
        bestGiniGain = giniGain;
        bestFeature = feature;
        bestThreshold = threshold;
      }
    }
  });

  if (!bestFeature || bestGiniGain <= 0.01) {
    const winningClass = Object.keys(probs).reduce((a, b) => probs[a] > probs[b] ? a : b);
    return {
      isLeaf: true,
      prediction: winningClass,
      probabilities: probs,
      confidence: Math.round(probs[winningClass] * 100),
      samplesCount: total
    };
  }

  const leftSamples = samples.filter(s => s[bestFeature] <= bestThreshold);
  const rightSamples = samples.filter(s => s[bestFeature] > bestThreshold);

  return {
    isLeaf: false,
    feature: bestFeature,
    threshold: Number(bestThreshold.toFixed(2)),
    left: buildTree(leftSamples, depth + 1, maxDepth),
    right: buildTree(rightSamples, depth + 1, maxDepth),
    probabilities: probs,
    samplesCount: total
  };
};

export const trainAdaptiveModel = () => {
  const dataset = getFullTrainingDataset();
  const rootNode = buildTree(dataset);

  return {
    modelType: 'DecisionTree',
    trainedOnSamples: dataset.length,
    timestamp: new Date().toISOString(),
    tree: rootNode
  };
};
