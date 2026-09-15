import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, User, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const IntroScreen = () => {
  const { setIsIntroFinished, switchViewMode, lang, setLang, t } = useApp();

  const handleEnter = (mode) => {
    soundManager.playSoftChime();
    switchViewMode(mode);
    setIsIntroFinished(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#EAE0D0] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Decorative Gamocha Red Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 shadow-sm" />

      {/* Language Switcher Top Right */}
      <div className="flex justify-between items-center pt-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-teal-100 shadow-sm">
          <span className="text-xl">👵</span>
          <span className="text-xs font-bold tracking-wide uppercase text-teal-800">Assam & NE India Edition</span>
        </div>

        <div className="bg-white rounded-full p-1 border border-amber-200 shadow-sm flex items-center space-x-1">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              lang === 'en'
                ? 'bg-tea-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('as')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              lang === 'as'
                ? 'bg-tea-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            অসমীয়া
          </button>
        </div>
      </div>

      {/* Hero Body Content */}
      <div className="max-w-2xl mx-auto text-center my-auto py-12 px-4">
        {/* Brand Icon Badge */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-tea-700 text-white shadow-lifted mb-6 transform transition hover:scale-105">
          <span className="text-5xl">🧠</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-950 tracking-tight mb-3">
          {t('appTitle')}
        </h1>

        <p className="text-xl md:text-2xl font-bold text-amber-700 mb-4">
          {t('tagline')}
        </p>

        <p className="text-base md:text-lg text-gray-700 max-w-lg mx-auto leading-relaxed mb-10">
          A gentle digital companion designed specifically for memory assistance, routine recall, family voice reminders, and ASHA worker care in North Eastern India.
        </p>

        {/* Action Entry Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
          <button
            onClick={() => handleEnter('patient')}
            className="w-full min-h-[64px] bg-tea-700 hover:bg-tea-800 text-white text-xl font-bold rounded-2xl shadow-lifted hover:shadow-lg flex items-center justify-center space-x-3 transition active:scale-[0.98] border-2 border-teal-600"
          >
            <span className="text-2xl">👵</span>
            <span>{t('patientView')}</span>
          </button>

          <button
            onClick={() => handleEnter('caregiver')}
            className="w-full min-h-[64px] bg-white hover:bg-teal-50 text-teal-900 text-xl font-bold rounded-2xl shadow-lifted hover:shadow-lg flex items-center justify-center space-x-3 transition active:scale-[0.98] border-2 border-teal-200"
          >
            <ShieldCheck className="w-7 h-7 text-teal-700" />
            <span>{t('caregiverPortal')}</span>
          </button>
        </div>
      </div>

      {/* Footer Features Strip */}
      <div className="max-w-3xl mx-auto w-full border-t border-amber-200/60 pt-6 pb-2 text-center text-xs text-gray-600 flex flex-wrap justify-center gap-6">
        <span className="flex items-center gap-1 font-medium">
          <span className="text-emerald-600">🟢</span> Offline-First Sync
        </span>
        <span className="flex items-center gap-1 font-medium">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Assamese Voice Support
        </span>
        <span className="flex items-center gap-1 font-medium">
          <Sparkles className="w-4 h-4 text-amber-500" /> Dynamic AI Difficulty
        </span>
      </div>
    </div>
  );
};
