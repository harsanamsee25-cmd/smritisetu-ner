/**
 * SmritiSetu NER ML Inference Engine & Model Runner
 * 
 * PROTOTYPE DEMONSTRATION NOTICE:
 * Client-side browser inference runner. Uses decision tree feature classification.
 * Synthetic training data used for hackathon demonstration. Not clinically validated.
 */

import { trainAdaptiveModel } from './trainModel';
import { extractPlayerFeatures } from './featureEngineering';

let trainedTreeModel = null;

// Initialize & Train Model on Client Startup
export const getOrTrainModel = () => {
  if (!trainedTreeModel) {
    trainedTreeModel = trainAdaptiveModel();
  }
  return trainedTreeModel;
};

// Traverse Decision Tree Node for Inference
const predictTree = (node, features) => {
  if (node.isLeaf) {
    return node;
  }
  const featureVal = features[node.feature];
  if (featureVal <= node.threshold) {
    return predictTree(node.left, features);
  } else {
    return predictTree(node.right, features);
  }
};

// Generate Natural Rationale Explanation for Caregiver & Feedback UI
const generateReason = (features, prediction, confidence) => {
  const accPct = Math.round(features.accuracy * 100);
  const rTime = features.responseTime;

  if (prediction === 'challenging') {
    return `High accuracy (${accPct}%) and fast response time (${rTime}s) indicate high cognitive engagement. Difficulty stepped up for gentle stimulation.`;
  } else if (prediction === 'gentle') {
    return `Higher response time (${rTime}s) and hint assistance (${features.hintsUsed}) observed. Reduced card count to maintain comfort and dignity.`;
  } else {
    return `Stable baseline accuracy (${accPct}%) and steady pace (${rTime}s). Maintaining standard adaptive challenge.`;
  }
};

export const predictDifficulty = (sessionData, history = [], currentDifficulty = 'adaptive') => {
  const model = getOrTrainModel();
  const features = extractPlayerFeatures(sessionData, history, currentDifficulty);
  const leaf = predictTree(model.tree, features);

  const predictedDifficulty = leaf.prediction || 'adaptive';
  const confidence = Math.min(96, Math.max(72, leaf.confidence || 82));
  const reason = generateReason(features, predictedDifficulty, confidence);

  return {
    difficulty: predictedDifficulty,
    confidence: confidence,
    reason: reason,
    features: features,
    timestamp: new Date().toISOString()
  };
};

export const savePrediction = (predictionObj) => {
  try {
    localStorage.setItem('smritisetu_last_ml_prediction', JSON.stringify(predictionObj));
  } catch (e) {
    console.warn('Failed to save prediction to localStorage', e);
  }
};

export const getLastPrediction = () => {
  try {
    const saved = localStorage.getItem('smritisetu_last_ml_prediction');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};
