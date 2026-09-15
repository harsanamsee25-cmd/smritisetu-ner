import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mic, Square, Save, Play, Check } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const VoiceRecordModal = () => {
  const { activeModal, closeModal, setVoiceNotes, t } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [senderName, setSenderName] = useState('Daughter Bimala');
  const [customText, setCustomText] = useState('Aai, please drink water and take your rest properly. ❤️');

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  if (activeModal !== 'voice_record') return null;

  const startRecording = () => {
    soundManager.playGentleClick();
    setIsRecording(true);
    setSeconds(0);
    setRecordedAudio(null);
  };

  const stopRecording = () => {
    soundManager.playGentleClick();
    setIsRecording(false);
    setRecordedAudio({
      duration: `0:${seconds < 10 ? '0' : ''}${seconds}`
    });
  };

  const handleSaveNote = () => {
    soundManager.playSoftChime();
    const newNote = {
      id: `vn-${Date.now()}`,
      sender: senderName,
      senderAssamese: senderName,
      time: 'Just now',
      duration: recordedAudio?.duration || '0:15',
      text: customText,
      textAssamese: customText,
      avatar: '🎙️'
    };

    setVoiceNotes(prev => [newNote, ...prev]);
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

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-3">
            <Mic className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-teal-950">
            🎙️ Record Family Voice Note
          </h3>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            Leave a loving voice reminder for Aai
          </p>
        </div>

        {/* Sender & Text Config */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Sender Name
            </label>
            <input
              type="text"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-semibold focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Message Preview / Transcript
            </label>
            <textarea
              rows={2}
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 font-medium text-sm focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>

        {/* Recording Animation Stage */}
        <div className="bg-teal-50 rounded-2xl p-6 text-center border border-teal-100 mb-6 flex flex-col items-center justify-center min-h-[160px]">
          {isRecording ? (
            <div className="space-y-4">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-rose-500 animate-ping opacity-30 absolute" />
                <div className="w-20 h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg relative z-10">
                  <Mic className="w-10 h-10 animate-pulse" />
                </div>
              </div>
              <div className="font-mono text-3xl font-extrabold text-rose-600">
                0:{seconds < 10 ? '0' : ''}{seconds}
              </div>
              <p className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                Recording Voice Note...
              </p>
            </div>
          ) : recordedAudio ? (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <p className="text-lg font-bold text-emerald-800">
                Voice Note Captured ({recordedAudio.duration})
              </p>
              <p className="text-xs text-gray-600">Ready to save to family messages list</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600">
                Press start and speak clearly near your device microphone.
              </p>
            </div>
          )}
        </div>

        {/* Record Control Buttons */}
        <div className="flex items-center justify-center gap-3">
          {!isRecording && !recordedAudio && (
            <button
              onClick={startRecording}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-md transition active:scale-95"
            >
              <Mic className="w-6 h-6" />
              <span>Start Recording</span>
            </button>
          )}

          {isRecording && (
            <button
              onClick={stopRecording}
              className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-md transition active:scale-95"
            >
              <Square className="w-6 h-6 fill-current text-white" />
              <span>Stop Recording</span>
            </button>
          )}

          {recordedAudio && (
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={startRecording}
                className="py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl transition"
              >
                Re-record
              </button>
              <button
                onClick={handleSaveNote}
                className="py-3.5 bg-tea-700 hover:bg-tea-800 text-white font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-md transition active:scale-95"
              >
                <Save className="w-5 h-5" />
                <span>Save Voice Note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
