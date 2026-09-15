import React from 'react';
import { useApp } from '../context/AppContext';
import { MemoryMatch } from '../components/Games/MemoryMatch';
import { RoutineRecall } from '../components/Games/RoutineRecall';
import { DifficultyControl } from '../components/Games/DifficultyControl';
import { Brain, Sparkles, ArrowLeft, Play, Sun, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const GamesHub = () => {
  const { activeGame, setActiveGame, t } = useApp();

  const handleLaunchGame = (gameKey) => {
    soundManager.playSoftChime();
    setActiveGame(gameKey);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Games Banner Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-tea-700 text-white rounded-3xl p-6 sm:p-8 shadow-lifted relative overflow-hidden border border-teal-700">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-400 text-teal-950 text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              <span>🧠 Cognitive Memory Gym</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('exerciseTitle')}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-amber-300 mt-1">
              {t('exerciseSub')}
            </p>
          </div>

          {activeGame && (
            <button
              onClick={() => {
                soundManager.playGentleClick();
                setActiveGame(null);
              }}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 flex items-center space-x-2 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Games Hub</span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Difficulty AI Widget */}
      <DifficultyControl />

      {/* Render Active Game OR Game Selector Cards */}
      {activeGame === 'memory' ? (
        <MemoryMatch />
      ) : activeGame === 'routine' ? (
        <RoutineRecall />
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-teal-950 tracking-tight">
            Choose Today's Activity:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game 1 Selector Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200 hover:border-teal-400 transition flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl font-extrabold shadow-sm">
                  🫖
                </div>

                <span className="inline-block bg-teal-100 text-teal-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  4 Pairs • NE Heritage Themes
                </span>

                <h3 className="text-2xl font-extrabold text-teal-950">
                  North East Heritage Memory Match
                </h3>

                <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                  Flip large cards to discover familiar tea cups, orchids, traditional shawls, and hornbills. Built with gentle positive feedback and automatic AI pair reduction.
                </p>
              </div>

              <button
                onClick={() => handleLaunchGame('memory')}
                className="w-full min-h-[56px] bg-tea-700 hover:bg-tea-800 text-white text-lg font-extrabold rounded-2xl shadow-md flex items-center justify-center space-x-2 transition active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play Memory Match →</span>
              </button>
            </div>

            {/* Game 2 Selector Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200 hover:border-teal-400 transition flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-3xl font-extrabold shadow-sm">
                  🌅
                </div>

                <span className="inline-block bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                  Sequencing • Daily Routine
                </span>

                <h3 className="text-2xl font-extrabold text-teal-950">
                  My Morning Routine Recall
                </h3>

                <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                  Arrange morning sunlight, fresh Assam tea, gentle walks, and breakfast step-by-step. Includes click-to-place and gentle hints.
                </p>
              </div>

              <button
                onClick={() => handleLaunchGame('routine')}
                className="w-full min-h-[56px] bg-tea-700 hover:bg-tea-800 text-white text-lg font-extrabold rounded-2xl shadow-md flex items-center justify-center space-x-2 transition active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start Routine Recall →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
