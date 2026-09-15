import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, Type, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const AccessibilityBar = () => {
  const { fontScale, setFontScale, handleReadScreenAloud, t } = useApp();

  return (
    <div className="bg-amber-50/90 border-b border-amber-200/70 px-4 py-2 text-amber-950">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        {/* Left Accessibility Tag */}
        <div className="flex items-center space-x-2 font-bold text-amber-900">
          <Type className="w-4 h-4 text-amber-700" />
          <span>Accessibility Options</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Read Aloud Button */}
          <button
            onClick={() => {
              soundManager.playGentleClick();
              handleReadScreenAloud();
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300 shadow-sm transition active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-amber-800" />
            <span>🔊 {t('readAloud')}</span>
          </button>

          {/* Font Resizer */}
          <div className="flex items-center bg-white rounded-xl p-0.5 border border-amber-300 shadow-sm">
            <span className="text-xs text-amber-800 font-semibold px-2">Font Size:</span>
            <button
              onClick={() => {
                soundManager.playGentleClick();
                setFontScale('sm');
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                fontScale === 'sm' ? 'bg-tea-700 text-white' : 'text-gray-700 hover:bg-amber-100'
              }`}
            >
              A−
            </button>
            <button
              onClick={() => {
                soundManager.playGentleClick();
                setFontScale('md');
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                fontScale === 'md' ? 'bg-tea-700 text-white' : 'text-gray-700 hover:bg-amber-100'
              }`}
            >
              A
            </button>
            <button
              onClick={() => {
                soundManager.playGentleClick();
                setFontScale('lg');
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                fontScale === 'lg' ? 'bg-tea-700 text-white' : 'text-gray-700 hover:bg-amber-100'
              }`}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
