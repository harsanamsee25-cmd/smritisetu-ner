import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Info, Sliders } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const DifficultyControl = () => {
  const { aiDifficulty, setAiDifficulty, openModal } = useApp();

  const handleSelectLevel = (level) => {
    soundManager.playGentleClick();
    setAiDifficulty(level);
  };

  return (
    <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white rounded-3xl p-6 shadow-lifted border border-teal-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-teal-950 flex items-center justify-center font-extrabold text-xl shadow-sm">
            ⚡
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Smart Dynamic Difficulty</span>
              <span className="text-xs bg-amber-400 text-teal-950 px-2 py-0.5 rounded-full font-bold uppercase">
                AI Powered
              </span>
            </h3>
            <p className="text-xs text-teal-200 font-medium">
              Automatically adjusts memory card count & hints based on response speed
            </p>
          </div>
        </div>

        <button
          onClick={() => openModal('difficulty_info')}
          className="p-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-amber-300 transition"
          title="How SmritiSetu Adapts Info"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

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
