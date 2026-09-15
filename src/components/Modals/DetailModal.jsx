import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Clock, CheckCircle2, Volume2, Pill, Droplet, Brain } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const DetailModal = () => {
  const { activeModal, modalPayload, closeModal, markReminderTaken, snoozeReminder, handlePlayVoice, t } = useApp();

  if (activeModal !== 'reminder_detail' || !modalPayload) return null;

  const item = modalPayload;

  const getIcon = (type) => {
    switch(type) {
      case 'medicine': return <Pill className="w-8 h-8 text-rose-600" />;
      case 'hydration': return <Droplet className="w-8 h-8 text-sky-600" />;
      default: return <Brain className="w-8 h-8 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative border-4 border-teal-100 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-teal-700" />

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4 mb-4 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
            {getIcon(item.type)}
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-full">
              {item.category || 'Reminder'}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {item.title}
            </h3>
            {item.titleAssamese && (
              <p className="text-sm font-semibold text-teal-800">
                {item.titleAssamese}
              </p>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="bg-teal-50/70 rounded-2xl p-4 mb-6 space-y-3 border border-teal-100">
          <div className="flex items-center justify-between text-base font-semibold text-gray-800">
            <span className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5 text-teal-700" />
              <span>Scheduled Time:</span>
            </span>
            <span className="text-lg font-bold text-teal-900">{item.time}</span>
          </div>

          {item.dosage && (
            <div className="flex items-center justify-between text-base font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
              <span className="text-gray-600">Instructions / Dosage:</span>
              <span className="font-bold text-gray-900">{item.dosage}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-base font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
            <span className="text-gray-600">Status:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              item.status === 'taken' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {item.status === 'taken' ? t('takenStatus') : t('upcomingStatus')}
            </span>
          </div>
        </div>

        {/* Audio Family Message Button */}
        {item.audioMessage && (
          <div className="mb-6">
            <button
              onClick={() => handlePlayVoice(item)}
              className="w-full py-3.5 px-4 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-md transition active:scale-98"
            >
              <Volume2 className="w-6 h-6 text-amber-300" />
              <span className="text-lg">🔊 {t('playVoice')}</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              markReminderTaken(item.id);
              closeModal();
            }}
            disabled={item.status === 'taken'}
            className={`min-h-[56px] text-lg font-bold rounded-2xl flex items-center justify-center space-x-2 transition shadow-md ${
              item.status === 'taken'
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>{t('markTaken')}</span>
          </button>

          <button
            onClick={() => {
              snoozeReminder(item.id);
              closeModal();
            }}
            className="min-h-[56px] bg-white hover:bg-amber-50 text-amber-900 font-bold text-lg rounded-2xl border-2 border-amber-300 flex items-center justify-center space-x-2 transition active:scale-95 shadow-sm"
          >
            <Clock className="w-5 h-5 text-amber-700" />
            <span>{t('remindLater')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
