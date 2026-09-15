import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, Bell, Sparkles, ShieldCheck, Globe, Type, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Header = () => {
  const {
    viewMode,
    switchViewMode,
    lang,
    soundEnabled,
    setSoundEnabled,
    demoMode,
    toggleDemoMode,
    fontScale,
    setFontScale,
    openModal,
    notifications,
    t
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm">
      {/* Assamese Gamocha Woven Motif Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Branding Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-tea-700 text-white flex items-center justify-center text-2xl shadow-soft">
            🧠
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-teal-950 tracking-tight">
                {t('appTitle')}
              </span>
              {viewMode === 'caregiver' && demoMode && (
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300">
                  Demo Data
                </span>
              )}
            </div>
            <p className="text-xs font-medium text-amber-700 hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* CONDITION 1: SIMPLIFIED ELDERLY PATIENT HEADER */}
        {viewMode === 'patient' ? (
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switch Button */}
            <button
              onClick={() => openModal('languages')}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-teal-200 text-teal-900 text-xs sm:text-sm font-extrabold hover:bg-teal-50 flex items-center space-x-1 shadow-sm"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-teal-700" />
              <span>{lang === 'en' ? '🌐 English' : '🌐 অসমীয়া'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-bold text-xs sm:text-sm flex items-center space-x-1.5 hover:bg-teal-100 transition"
              title={soundEnabled ? "Sound On" : "Sound Off"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-teal-700" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
              <span className="hidden sm:inline">{soundEnabled ? t('soundOn') : t('soundOff')}</span>
            </button>

            {/* Accessibility Font Scaler */}
            <div className="flex items-center bg-teal-50 border border-teal-200 rounded-xl p-0.5">
              <button
                onClick={() => setFontScale('sm')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontScale === 'sm' ? 'bg-tea-700 text-white' : 'text-teal-900'}`}
                title="Small Text"
              >
                A−
              </button>
              <button
                onClick={() => setFontScale('md')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontScale === 'md' ? 'bg-tea-700 text-white' : 'text-teal-900'}`}
                title="Normal Text"
              >
                A
              </button>
              <button
                onClick={() => setFontScale('lg')}
                className={`px-2 py-1 text-xs font-bold rounded-lg ${fontScale === 'lg' ? 'bg-tea-700 text-white' : 'text-teal-900'}`}
                title="Large Text"
              >
                A+
              </button>
            </div>

            {/* Notifications Bell */}
            <button
              onClick={() => openModal('notifications')}
              className="p-2.5 rounded-xl bg-white border border-teal-200 text-teal-800 hover:bg-teal-50 transition relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-teal-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-xs font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Unobtrusive Caregiver Portal Switch */}
            <button
              onClick={() => switchViewMode('caregiver')}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-teal-800 bg-gray-100 hover:bg-teal-100 border border-gray-200 transition flex items-center space-x-1"
              title="Switch to Caregiver Portal"
            >
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span className="hidden lg:inline">Caregiver Portal</span>
            </button>
          </div>
        ) : (
          /* CONDITION 2: RICH CAREGIVER HEADER */
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Architecture Modal Trigger */}
            <button
              onClick={() => openModal('languages')}
              className="px-3 py-2 rounded-xl bg-white border border-teal-200 text-teal-900 font-bold text-xs sm:text-sm flex items-center space-x-1.5 hover:bg-teal-50 shadow-sm"
            >
              <Globe className="w-4 h-4 text-teal-700" />
              <span>Languages (2 Tiers)</span>
            </button>

            {/* Demo Mode Button */}
            <button
              onClick={toggleDemoMode}
              title="Toggle Demo Data Mode"
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1 border transition ${
                demoMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">🎬 {t('demoMode')}</span>
            </button>

            {/* Return to Patient View Button */}
            <button
              onClick={() => switchViewMode('patient')}
              className="px-4 py-2 rounded-xl bg-tea-700 hover:bg-tea-800 text-white font-bold text-xs sm:text-sm flex items-center space-x-1.5 shadow-md transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>👵 Patient View</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
