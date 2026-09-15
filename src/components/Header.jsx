import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, Bell, Sparkles, User, ShieldCheck, Type, Globe } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Header = () => {
  const {
    viewMode,
    switchViewMode,
    lang,
    setLang,
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
        {/* Logo / App Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-tea-700 text-white flex items-center justify-center text-2xl shadow-soft">
            🧠
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl text-teal-950 tracking-tight">
                {t('appTitle')}
              </span>
              {demoMode && (
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

        {/* Center / Mode Switcher Toggle (👵 Patient View | 👩‍⚕️ Caregiver Portal) */}
        <div className="bg-teal-50/90 p-1 rounded-2xl border border-teal-200/80 flex items-center shadow-inner">
          <button
            onClick={() => switchViewMode('patient')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm sm:text-base font-bold transition ${
              viewMode === 'patient'
                ? 'bg-tea-700 text-white shadow-md'
                : 'text-teal-800 hover:text-teal-950 hover:bg-teal-100/50'
            }`}
          >
            <span className="text-lg">👵</span>
            <span className="hidden md:inline">{t('patientView')}</span>
            <span className="md:hidden">Patient</span>
          </button>

          <button
            onClick={() => switchViewMode('caregiver')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm sm:text-base font-bold transition ${
              viewMode === 'caregiver'
                ? 'bg-teal-900 text-white shadow-md'
                : 'text-teal-800 hover:text-teal-950 hover:bg-teal-100/50'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="hidden md:inline">{t('caregiverPortal')}</span>
            <span className="md:hidden">Caregiver</span>
          </button>
        </div>

        {/* Right Tools & Toggles */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
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
            <span className="hidden lg:inline">🎬 {t('demoMode')}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={() => {
              soundManager.playGentleClick();
              setLang(lang === 'en' ? 'as' : 'en');
            }}
            title="Change Language"
            className="px-2.5 py-2 rounded-xl bg-white border border-teal-200 text-teal-900 text-xs sm:text-sm font-bold hover:bg-teal-50 flex items-center space-x-1"
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span>{lang === 'en' ? 'অসমীয়া' : 'ENG'}</span>
          </button>

          {/* Accessibility Text Scaler */}
          <div className="hidden sm:flex items-center bg-teal-50 border border-teal-200 rounded-xl p-0.5">
            <button
              onClick={() => setFontScale('sm')}
              className={`px-2 py-1 text-xs font-bold rounded-lg ${fontScale === 'sm' ? 'bg-tea-700 text-white' : 'text-teal-900'}`}
              title="Small Text"
            >
              A-
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

          {/* Mute/Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-white border border-teal-200 text-teal-800 hover:bg-teal-50 transition"
            title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-teal-700" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </button>

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
        </div>
      </div>
    </header>
  );
};
