import React from 'react';
import { Volume2, Pause, Play, RotateCcw } from 'lucide-react';

export const AudioVisualizer = ({ isPlaying, onTogglePlay, onReplay, title = "Playing Family Message..." }) => {
  return (
    <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-4 sm:p-5 rounded-2xl shadow-lifted border border-teal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className="w-14 h-14 rounded-2xl bg-amber-400 hover:bg-amber-300 text-teal-950 flex items-center justify-center shadow-md transform active:scale-95 transition flex-shrink-0"
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>

        <div className="overflow-hidden">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 tracking-wider uppercase">
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce-gentle' : ''}`} />
            <span>{isPlaying ? title : "Family Voice Note"}</span>
          </div>
          <p className="text-sm font-semibold text-teal-100 truncate mt-0.5">
            {isPlaying ? "Daughter Bimala • 0:14" : "Click play to listen to message"}
          </p>
        </div>
      </div>

      {/* Animated Waveform Bars */}
      <div className="flex items-center space-x-1.5 h-10 px-3 py-1 bg-teal-950/50 rounded-xl border border-teal-700/50">
        {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70].map((h, i) => (
          <div
            key={i}
            className={`w-1.5 bg-amber-300 rounded-full transition-all duration-300 ${
              isPlaying ? 'animate-wave' : 'h-2 opacity-50'
            }`}
            style={{
              animationDelay: isPlaying ? `${(i * 0.1) % 0.8}s` : '0s',
              height: isPlaying ? undefined : `${Math.max(4, h * 0.25)}px`
            }}
          />
        ))}
      </div>

      {onReplay && (
        <button
          onClick={onReplay}
          title="Replay message"
          className="p-2.5 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-teal-100 transition"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
