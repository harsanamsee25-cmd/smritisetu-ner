import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Pill, Droplet, Brain, Clock, PlusCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const AddReminderModal = () => {
  const { activeModal, closeModal, addReminder, t } = useApp();

  const [title, setTitle] = useState('');
  const [titleAssamese, setTitleAssamese] = useState('');
  const [type, setType] = useState('medicine'); // medicine | hydration | cognitive
  const [time, setTime] = useState('5:00 PM');
  const [dosage, setDosage] = useState('1 Tablet with water');
  const [audioMessage, setAudioMessage] = useState('Aai, please remember your evening medication!');
  const [sender, setSender] = useState('Daughter Bimala');

  if (activeModal !== 'add_reminder') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addReminder({
      title: title.trim(),
      titleAssamese: titleAssamese.trim() || title.trim(),
      type,
      time,
      dosage,
      audioMessage,
      sender
    });

    // Reset form
    setTitle('');
    setTitleAssamese('');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative border-4 border-teal-100 overflow-hidden text-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold shadow-sm">
            ➕
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-teal-950">
              Add New Reminder
            </h3>
            <p className="text-xs font-semibold text-gray-600">
              Schedule medication, hydration, or memory session
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reminder Type Selectors */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Reminder Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('medicine')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition ${
                  type === 'medicine'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Pill className="w-4 h-4" />
                <span>💊 Medicine</span>
              </button>

              <button
                type="button"
                onClick={() => setType('hydration')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition ${
                  type === 'hydration'
                    ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Droplet className="w-4 h-4" />
                <span>💧 Water</span>
              </button>

              <button
                type="button"
                onClick={() => setType('cognitive')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition ${
                  type === 'cognitive'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>🧠 Session</span>
              </button>
            </div>
          </div>

          {/* Title Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Evening BP Medicine"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Title (Assamese / অসমীয়া)
              </label>
              <input
                type="text"
                placeholder="e.g. পাছবেলাৰ ঔষধ"
                value={titleAssamese}
                onChange={e => setTitleAssamese(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Time & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Scheduled Time
              </label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Dosage / Instructions
              </label>
              <input
                type="text"
                value={dosage}
                onChange={e => setDosage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-sm focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Family Voice Message */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Family Voice Message Quote
            </label>
            <input
              type="text"
              value={audioMessage}
              onChange={e => setAudioMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-sm focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full min-h-[52px] bg-tea-700 hover:bg-tea-800 text-white font-extrabold text-lg rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Save & Add Reminder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
