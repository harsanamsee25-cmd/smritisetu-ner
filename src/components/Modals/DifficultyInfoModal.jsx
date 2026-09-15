import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Sliders, Zap, CheckCircle, HelpCircle } from 'lucide-react';

export const DifficultyInfoModal = () => {
  const { activeModal, closeModal, aiDifficulty, aiStats } = useApp();

  if (activeModal !== 'difficulty_info') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative border-4 border-teal-100 overflow-hidden text-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-2xl shadow-sm">
            🧠
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide bg-amber-100 px-2 py-0.5 rounded-md">
              Auto-Adjusting Personalization
            </span>
            <h3 className="text-2xl font-extrabold text-teal-950 mt-0.5">
              How SmritiSetu Adapts
            </h3>
          </div>
        </div>

        {/* Informational Text */}
        <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-100 mb-6 text-sm sm:text-base leading-relaxed text-gray-700">
          <p className="mb-2 font-bold text-teal-950">
            Auto-Adjusting: Activity difficulty adapts to recent interaction patterns.
          </p>
          <p className="text-xs sm:text-sm font-medium text-teal-900">
            When Aai takes a little longer, the system automatically reduces choice cards (e.g. from 4 pairs to 3 pairs) to keep memory exercises comfortable, encouraging, and dignified.
          </p>
        </div>

        {/* Live Simulation Metrics */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 mb-6 space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Interaction Patterns Observed
          </h4>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
            <span className="flex items-center space-x-2 text-gray-600">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Response Speed:</span>
            </span>
            <span className="font-bold text-teal-900">{aiStats.avgResponseTimeSec}s per match</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-gray-200 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <Sliders className="w-4 h-4 text-sky-500" />
              <span>Average Attempts per Pair:</span>
            </span>
            <span className="font-bold text-teal-900">{aiStats.recentAttempts} attempts</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-gray-200 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              <span>Hint Assistance Needed:</span>
            </span>
            <span className="font-bold text-teal-900">{aiStats.hintsUsedCount} hint requested</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-gray-200 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Session Completion Rate:</span>
            </span>
            <span className="font-bold text-emerald-700">{aiStats.completionRate}%</span>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="w-full py-3.5 bg-tea-700 hover:bg-tea-800 text-white font-bold text-base rounded-2xl shadow-md transition active:scale-95"
        >
          Got it, Close Explanation
        </button>
      </div>
    </div>
  );
};
