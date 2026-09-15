import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Trophy, RotateCcw, Home, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';

export const GameCompleteModal = () => {
  const { activeModal, modalPayload, closeModal, setActiveTab, setActiveGame, t } = useApp();

  useEffect(() => {
    if (activeModal === 'game_complete') {
      soundManager.playSoftChime();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti effect unavailable', e);
      }
    }
  }, [activeModal]);

  if (activeModal !== 'game_complete' || !modalPayload) return null;

  const { gameTitle, score, maxScore, timeSeconds, attempts, encouragement } = modalPayload;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border-4 border-amber-300 text-center overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Banner Accent */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-600" />

        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lifted border-2 border-amber-300">
          <Trophy className="w-10 h-10 text-amber-600" />
        </div>

        <span className="bg-amber-100 text-amber-900 font-extrabold text-sm uppercase px-3 py-1 rounded-full border border-amber-300">
          🌟 {encouragement || 'Shabash! Wonderful!'}
        </span>

        <h2 className="text-3xl font-extrabold text-teal-950 mt-3 mb-1">
          You Completed Today's Exercise!
        </h2>
        <p className="text-base font-semibold text-teal-800 mb-6">
          {gameTitle || 'Memory Exercise'}
        </p>

        {/* Results Card */}
        <div className="bg-teal-50 rounded-2xl p-5 mb-6 border border-teal-200 grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-sm">
            <span className="text-xs text-gray-500 font-bold block mb-1">Items Matched</span>
            <span className="text-2xl font-extrabold text-tea-700">
              {score} / {maxScore}
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-sm">
            <span className="text-xs text-gray-500 font-bold block mb-1">Time Spent</span>
            <span className="text-2xl font-extrabold text-teal-900">
              {timeSeconds}s
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-sm">
            <span className="text-xs text-gray-500 font-bold block mb-1">Total Turns</span>
            <span className="text-2xl font-extrabold text-amber-700">
              {attempts}
            </span>
          </div>
        </div>

        {/* Supportive Praise */}
        <div className="bg-amber-50/90 rounded-2xl p-4 mb-4 border border-amber-200 text-amber-950 font-medium text-base">
          “{encouragement || `Shabash! You remembered ${score} out of ${maxScore} pairs today.`}”
        </div>

        {/* ML Prediction Feedback Ribbon */}
        {modalPayload?.prediction && (
          <div className="bg-teal-50 rounded-2xl p-3.5 mb-6 border border-teal-200 text-teal-950 text-xs font-semibold space-y-1">
            <p className="font-extrabold text-teal-900 text-sm">
              ✨ Your next activity has been adjusted based on your performance.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-1 text-teal-800">
              <span>Difficulty: <strong className="uppercase text-teal-950 font-bold">{modalPayload.prediction.difficulty}</strong></span>
              <span>•</span>
              <span className="bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-md border border-amber-300">
                ML Confidence: {modalPayload.prediction.confidence}%
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              closeModal();
              // Re-trigger active game
              const current = modalPayload.gameKey;
              setActiveGame(null);
              setTimeout(() => setActiveGame(current), 50);
            }}
            className="min-h-[56px] bg-white hover:bg-teal-50 text-teal-900 font-bold text-lg rounded-2xl border-2 border-teal-300 flex items-center justify-center space-x-2 transition active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-5 h-5 text-teal-700" />
            <span>Play Again</span>
          </button>

          <button
            onClick={() => {
              closeModal();
              setActiveGame(null);
              setActiveTab('home');
            }}
            className="min-h-[56px] bg-tea-700 hover:bg-tea-800 text-white font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-md transition active:scale-95"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
