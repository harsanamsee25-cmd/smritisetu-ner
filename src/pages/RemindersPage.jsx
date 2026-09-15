import React from 'react';
import { useApp } from '../context/AppContext';
import { Pill, Droplet, Brain, Clock, CheckCircle2, Volume2, Mic, Plus, Heart, Play, Pause } from 'lucide-react';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { soundManager } from '../utils/audio';

export const RemindersPage = () => {
  const {
    reminders,
    markReminderTaken,
    snoozeReminder,
    voiceNotes,
    playingVoice,
    handlePlayVoice,
    handleStopVoice,
    openModal,
    t
  } = useApp();

  const getReminderIcon = (type) => {
    switch (type) {
      case 'medicine': return <Pill className="w-6 h-6 text-rose-600" />;
      case 'hydration': return <Droplet className="w-6 h-6 text-sky-600" />;
      default: return <Brain className="w-6 h-6 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Reminders Timeline Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-tea-700 text-white rounded-3xl p-6 sm:p-8 shadow-lifted border border-teal-700">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          🔔 {t('reminders')}
        </h1>
        <p className="text-lg font-bold text-amber-300 mt-1">
          Daily Care Timeline & Family Messages
        </p>
      </div>

      {/* TODAY'S TIMELINE LIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
        <h2 className="text-2xl font-extrabold text-teal-950 mb-6">
          Today's Schedule
        </h2>

        <div className="space-y-4">
          {reminders.map((rem) => {
            const isTaken = rem.status === 'taken';
            return (
              <div
                key={rem.id}
                onClick={() => openModal('reminder_detail', rem)}
                className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isTaken
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-white border-teal-200 hover:border-teal-400 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
                    {getReminderIcon(rem.type)}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-extrabold text-teal-900">{rem.time}</span>
                      <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isTaken ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {isTaken ? t('takenStatus') : t('upcomingStatus')}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mt-0.5">
                      {rem.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-800">
                      {rem.titleAssamese}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markReminderTaken(rem.id);
                    }}
                    disabled={isTaken}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center space-x-1.5 ${
                      isTaken
                        ? 'bg-emerald-200 text-emerald-900 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-95'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isTaken ? t('takenStatus') : t('markTaken')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAMILY VOICE NOTES SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-teal-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-950 flex items-center gap-2">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
              <span>{t('messagesFromFamily')}</span>
            </h2>
            <p className="text-sm font-semibold text-gray-600 mt-0.5">
              Listen to warm voice reminders recorded by your loved ones
            </p>
          </div>

          <button
            onClick={() => openModal('voice_record')}
            className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md flex items-center space-x-2 transition active:scale-95"
          >
            <Mic className="w-5 h-5" />
            <span>🎙️ {t('recordVoice')}</span>
          </button>
        </div>

        {/* Voice Notes List */}
        <div className="space-y-4">
          {voiceNotes.map((note) => {
            const isPlayingThis = playingVoice?.id === note.id;
            return (
              <div
                key={note.id}
                className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{note.avatar || '👩‍🌾'}</span>
                    <div>
                      <h4 className="font-extrabold text-lg text-teal-950">{note.sender}</h4>
                      <span className="text-xs text-gray-500 font-bold">{note.time} • {note.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isPlayingThis) {
                        handleStopVoice();
                      } else {
                        handlePlayVoice(note);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-1.5 transition ${
                      isPlayingThis
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-teal-800 hover:bg-teal-900 text-white shadow-sm'
                    }`}
                  >
                    {isPlayingThis ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlayingThis ? 'Pause' : '▶ Play'}</span>
                  </button>
                </div>

                <p className="text-base font-semibold text-gray-800 bg-white p-3 rounded-xl border border-teal-100">
                  “{note.text}”
                </p>

                {isPlayingThis && (
                  <AudioVisualizer
                    isPlaying={true}
                    onTogglePlay={handleStopVoice}
                    title={`Playing: ${note.sender}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
