import React from 'react';
import { useApp } from '../context/AppContext';
import { Pill, Droplet, Brain, CheckCircle2, Clock, Volume2, ArrowRight, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { soundManager } from '../utils/audio';

export const PatientHome = () => {
  const {
    profile,
    reminders,
    markReminderTaken,
    snoozeReminder,
    setActiveTab,
    setActiveGame,
    playingVoice,
    handlePlayVoice,
    handleStopVoice,
    openModal,
    lang,
    setLang,
    t
  } = useApp();

  const medReminder = reminders.find(r => r.type === 'medicine') || reminders[0];
  const hydReminder = reminders.find(r => r.type === 'hydration') || reminders[1];

  const handleStartQuickSession = () => {
    soundManager.playSoftChime();
    setActiveTab('games');
    setActiveGame('memory');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Patient Welcome Hero Card */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-tea-700 text-white rounded-3xl p-6 sm:p-8 shadow-lifted relative overflow-hidden border border-teal-700">
        {/* Assamese Gamocha Motif Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Assam Care Companion Active</span>
              </div>

              {/* Language Switcher Pill */}
              <button
                onClick={() => openModal('languages')}
                className="bg-amber-400 hover:bg-amber-300 text-teal-950 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300 shadow-sm transition active:scale-95 flex items-center space-x-1"
              >
                <span>🌐 {lang === 'en' ? 'English | অসমীয়া' : 'অসমীয়া (অসমিয়া)'}</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t('welcomeBack')}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-amber-300">
              {t('subWelcome')}
            </p>

            <p className="text-sm sm:text-base text-teal-100 max-w-xl font-medium pt-1">
              Have a peaceful morning. We have prepared your gentle memory exercises and family voice notes for today.
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openModal('offline_sync')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-2xl border border-white/20 flex items-center space-x-2 transition"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>🟢 {t('offlineMode')}</span>
            </button>
            <button
              onClick={() => openModal('profile')}
              className="bg-amber-400 hover:bg-amber-300 text-teal-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-sm flex items-center space-x-2 transition active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-teal-900" />
              <span>View Care Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK COGNITIVE SESSION HERO CARD */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-lifted relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-400">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur px-3.5 py-1 rounded-full text-xs font-extrabold text-amber-100 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Recommended Activity</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            🧠 {t('todaysSessionHero')}
          </h2>

          <p className="text-lg font-bold text-amber-100">
            {t('sessionHeroSub')}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm font-bold text-amber-50 pt-1">
            <span className="bg-amber-800/60 px-3 py-1 rounded-lg border border-amber-400/40">
              ✨ {t('aiGentle')}
            </span>
            <span className="bg-amber-800/60 px-3 py-1 rounded-lg border border-amber-400/40">
              ❤️ {t('aiPersonalized')}
            </span>
          </div>
        </div>

        <button
          onClick={handleStartQuickSession}
          className="w-full md:w-auto min-h-[64px] px-8 bg-white hover:bg-amber-50 text-amber-950 font-extrabold text-xl sm:text-2xl rounded-2xl shadow-2xl flex items-center justify-center space-x-3 transition active:scale-95 border-2 border-amber-200 flex-shrink-0"
        >
          <span>{t('startSession')}</span>
        </button>
      </div>

      {/* TODAY'S REMINDERS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight flex items-center gap-2">
            <span>🔔</span>
            <span>{t('todaysReminders')}</span>
          </h2>

          <button
            onClick={() => setActiveTab('reminders')}
            className="text-sm font-bold text-teal-700 hover:text-teal-900 underline"
          >
            View All Timeline →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MEDICATION REMINDER CARD */}
          {medReminder && (
            <div className={`rounded-3xl p-6 sm:p-7 shadow-lifted border-2 transition relative ${
              medReminder.status === 'taken'
                ? 'bg-emerald-50/90 border-emerald-300'
                : 'bg-white border-teal-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl font-bold shadow-sm">
                    💊
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2.5 py-0.5 rounded-full">
                      Important Medicine
                    </span>
                    <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                      {medReminder.title}
                    </h3>
                    <p className="text-sm font-semibold text-teal-800">
                      {medReminder.titleAssamese}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-extrabold text-teal-900 block">
                    {medReminder.time}
                  </span>
                  <span className={`inline-block text-xs font-extrabold uppercase px-2.5 py-1 rounded-full mt-1 ${
                    medReminder.status === 'taken' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {medReminder.status === 'taken' ? t('takenStatus') : t('upcomingStatus')}
                  </span>
                </div>
              </div>

              <div className="bg-teal-50/60 rounded-2xl p-3.5 mb-6 text-sm font-medium text-teal-900 border border-teal-100">
                📌 <strong>Dosage:</strong> {medReminder.dosage}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => markReminderTaken(medReminder.id)}
                  disabled={medReminder.status === 'taken'}
                  className={`min-h-[56px] font-extrabold text-lg sm:text-xl rounded-2xl flex items-center justify-center space-x-2 transition shadow-md ${
                    medReminder.status === 'taken'
                      ? 'bg-emerald-200 text-emerald-900 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{medReminder.status === 'taken' ? t('takenStatus') : t('markTaken')}</span>
                </button>

                <button
                  onClick={() => snoozeReminder(medReminder.id)}
                  disabled={medReminder.status === 'taken'}
                  className="min-h-[56px] bg-white hover:bg-amber-50 text-amber-900 font-bold text-base sm:text-lg rounded-2xl border-2 border-amber-300 flex items-center justify-center space-x-2 transition active:scale-95 shadow-sm disabled:opacity-50"
                >
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span>{t('remindLater')}</span>
                </button>
              </div>
            </div>
          )}

          {/* HYDRATION REMINDER & FAMILY VOICE CARD */}
          {hydReminder && (
            <div className={`rounded-3xl p-6 sm:p-7 shadow-lifted border-2 transition relative ${
              hydReminder.status === 'taken'
                ? 'bg-emerald-50/90 border-emerald-300'
                : 'bg-white border-teal-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl font-bold shadow-sm">
                    💧
                  </div>
                  <div>
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-100 px-2.5 py-0.5 rounded-full">
                      Daily Routine
                    </span>
                    <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                      {hydReminder.title}
                    </h3>
                    <p className="text-sm font-semibold text-teal-800">
                      {hydReminder.titleAssamese}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-extrabold text-teal-900 block">
                    {hydReminder.time}
                  </span>
                  <span className={`inline-block text-xs font-extrabold uppercase px-2.5 py-1 rounded-full mt-1 ${
                    hydReminder.status === 'taken' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {hydReminder.status === 'taken' ? t('takenStatus') : t('upcomingStatus')}
                  </span>
                </div>
              </div>

              {/* SIMULATED FAMILY VOICE AUDIO PLAYER */}
              <div className="mb-6">
                <AudioVisualizer
                  isPlaying={playingVoice?.id === hydReminder.id}
                  onTogglePlay={() => {
                    if (playingVoice?.id === hydReminder.id) {
                      handleStopVoice();
                    } else {
                      handlePlayVoice(hydReminder);
                    }
                  }}
                  onReplay={() => handlePlayVoice(hydReminder)}
                  title={`Voice Note: ${hydReminder.sender}`}
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => markReminderTaken(hydReminder.id)}
                  disabled={hydReminder.status === 'taken'}
                  className={`min-h-[56px] font-extrabold text-lg sm:text-xl rounded-2xl flex items-center justify-center space-x-2 transition shadow-md ${
                    hydReminder.status === 'taken'
                      ? 'bg-emerald-200 text-emerald-900 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{hydReminder.status === 'taken' ? t('takenStatus') : t('markTaken')}</span>
                </button>

                <button
                  onClick={() => snoozeReminder(hydReminder.id)}
                  disabled={hydReminder.status === 'taken'}
                  className="min-h-[56px] bg-white hover:bg-amber-50 text-amber-900 font-bold text-base sm:text-lg rounded-2xl border-2 border-amber-300 flex items-center justify-center space-x-2 transition active:scale-95 shadow-sm disabled:opacity-50"
                >
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span>{t('remindLater')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
