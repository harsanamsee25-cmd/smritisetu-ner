import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Sliders, Zap, CheckCircle, HelpCircle, ArrowRight, Cpu } from 'lucide-react';

export const DifficultyInfoModal = () => {
  const { activeModal, closeModal, aiDifficulty, lastPrediction } = useApp();

  if (activeModal !== 'difficulty_info') return null;

  const features = lastPrediction?.features || { accuracy: 0.85, responseTime: 12.0, attempts: 4, hintsUsed: 0 };

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
              ML-POWERED ADAPTIVE SYSTEM
            </span>
            <h3 className="text-2xl font-extrabold text-teal-950 mt-0.5">
              How Adaptive Difficulty Works
            </h3>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-100 mb-5 text-sm sm:text-base leading-relaxed text-gray-700">
          <p className="font-semibold text-teal-950 mb-2">
            SmritiSetu looks at your recent activity, such as accuracy, response time, attempts and hints.
          </p>
          <p className="text-xs sm:text-sm font-medium text-teal-900">
            A lightweight machine-learning model uses these signals to select a comfortable challenge level for your next activity.
          </p>
        </div>

        {/* Conceptual Pipeline Flow Diagram */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white rounded-2xl p-4 mb-5 border border-teal-800">
          <h4 className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider mb-3 text-center">
            Client-Side ML Pipeline Flow
          </h4>

          <div className="grid grid-cols-4 items-center gap-1 text-center text-[11px] font-bold">
            <div className="bg-teal-800/80 p-2 rounded-xl border border-teal-700">
              <span className="text-lg block">📊</span>
              <span>Your Performance</span>
            </div>
            <div className="text-amber-400 font-extrabold text-base flex justify-center">→</div>
            <div className="bg-teal-800/80 p-2 rounded-xl border border-teal-700">
              <span className="text-lg block">⚙️</span>
              <span>ML Model</span>
            </div>
            <div className="text-amber-400 font-extrabold text-base flex justify-center">→</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-2 text-center text-[11px] font-bold mt-2">
            <div className="bg-amber-400 text-teal-950 p-2 rounded-xl">
              <span>Personalized Level</span>
            </div>
            <div className="bg-emerald-400 text-teal-950 p-2 rounded-xl">
              <span>Next Activity</span>
            </div>
          </div>
        </div>

        {/* Live Feature Matrix Observed */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 mb-5 space-y-2.5 text-xs font-semibold text-gray-800">
          <div className="flex items-center justify-between text-gray-500 uppercase tracking-wider font-extrabold text-[10px] pb-1 border-b border-gray-200">
            <span>Features Vector</span>
            <span>Current Value</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-gray-600">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Accuracy Rating:</span>
            </span>
            <span className="font-bold text-teal-900">{Math.round(features.accuracy * 100)}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-gray-600">
              <Sliders className="w-3.5 h-3.5 text-sky-500" />
              <span>Response Time:</span>
            </span>
            <span className="font-bold text-teal-900">{features.responseTime}s</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center space-x-1.5 text-gray-600">
              <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
              <span>Hints Requested:</span>
            </span>
            <span className="font-bold text-teal-900">{features.hintsUsed}</span>
          </div>
        </div>

        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium mb-5">
          ℹ️ <strong>Non-Clinical Note:</strong> This feature is for activity personalization only. It is not a medical diagnosis.
        </div>

        <button
          onClick={closeModal}
          className="w-full py-3 bg-tea-700 hover:bg-tea-800 text-white font-bold text-sm rounded-2xl shadow-md transition active:scale-95"
        >
          Got it, Close Explanation
        </button>
      </div>
    </div>
  );
};
