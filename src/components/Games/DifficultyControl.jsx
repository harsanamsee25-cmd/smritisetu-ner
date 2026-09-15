import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Info, Sliders, Cpu } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const DifficultyControl = () => {
  const { aiDifficulty, setAiDifficulty, lastPrediction, openModal } = useApp();

  const handleSelectLevel = (level) => {
    soundManager.playGentleClick();
    setAiDifficulty(level);
  };

  return (
    <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white rounded-3xl p-6 shadow-lifted border border-teal-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-teal-950 flex items-center justify-center font-extrabold text-xl shadow-sm">
            ⚡
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>ML-POWERED ADAPTIVE DIFFICULTY</span>
              <span className="text-[11px] bg-emerald-400 text-teal-950 px-2.5 py-0.5 rounded-full font-extrabold uppercase">
                ML Classifier
              </span>
            </h3>
            <p className="text-xs text-teal-200 font-medium mt-0.5">
              ML model adapts activity difficulty using your recent performance.
            </p>
          </div>
        </div>

        <button
          onClick={() => openModal('difficulty_info')}
          className="px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-amber-300 transition text-xs font-bold flex items-center space-x-1 border border-teal-700"
          title="How Adaptive Difficulty Works"
        >
          <Info className="w-4 h-4" />
          <span>How ML Model Works</span>
        </button>
      </div>

      {/* Model Telemetry Banner */}
      {lastPrediction && (
        <div className="bg-teal-950/90 p-3 rounded-2xl border border-teal-800/80 mb-4 flex items-center justify-between text-xs font-semibold text-teal-200">
          <span className="flex items-center space-x-1.5 truncate">
            <Cpu className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="truncate">Model Reason: {lastPrediction.reason}</span>
          </span>
          <span className="bg-amber-400 text-teal-950 px-2 py-0.5 rounded-md font-bold text-[11px] flex-shrink-0 ml-2">
            Confidence: {lastPrediction.confidence}%
          </span>
        </div>
      )}

      {/* Slider Selector Buttons */}
      <div className="bg-teal-950/80 p-1.5 rounded-2xl border border-teal-800 grid grid-cols-3 gap-2">
        <button
          onClick={() => handleSelectLevel('gentle')}
          className={`py-3 px-3 rounded-xl text-sm font-bold transition flex items-center justify-center space-x-1.5 ${
            aiDifficulty === 'gentle'
              ? 'bg-amber-400 text-teal-950 shadow-md font-extrabold'
              : 'text-teal-200 hover:text-white hover:bg-teal-900/60'
          }`}
        >
          <span>🌱 Gentle</span>
        </button>

        <button
          onClick={() => handleSelectLevel('adaptive')}
          className={`py-3 px-3 rounded-xl text-sm font-bold transition flex items-center justify-center space-x-1.5 ${
            aiDifficulty === 'adaptive'
              ? 'bg-amber-400 text-teal-950 shadow-md font-extrabold'
              : 'text-teal-200 hover:text-white hover:bg-teal-900/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Adaptive</span>
        </button>

        <button
          onClick={() => handleSelectLevel('challenging')}
          className={`py-3 px-3 rounded-xl text-sm font-bold transition flex items-center justify-center space-x-1.5 ${
            aiDifficulty === 'challenging'
              ? 'bg-amber-400 text-teal-950 shadow-md font-extrabold'
              : 'text-teal-200 hover:text-white hover:bg-teal-900/60'
          }`}
        >
          <span>🏆 Challenging</span>
        </button>
      </div>
    </div>
  );
};
