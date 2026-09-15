import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGE_TIERS } from '../../data/mockData';
import { X, Globe, Check, Lock, Info } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const LanguageTiersModal = () => {
  const { activeModal, closeModal, lang, setLang } = useApp();

  if (activeModal !== 'languages') return null;

  const handleSelectLanguage = (langObj) => {
    if (langObj.status !== 'active') return;
    soundManager.playGentleClick();
    setLang(langObj.id);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 relative border-4 border-teal-100 overflow-hidden text-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-teal-950">
              North East India Languages
            </h3>
            <p className="text-xs font-semibold text-gray-600">
              Select Regional Language Architecture
            </p>
          </div>
        </div>

        {/* Tier 1 Section */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>🟢 {LANGUAGE_TIERS.tier1.title}</span>
            </span>
            <span className="text-[11px] text-gray-500 font-bold">Voice Synthesis & Speech AI</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {LANGUAGE_TIERS.tier1.languages.map((l) => {
              const isActive = l.status === 'active';
              const isSelected = lang === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => handleSelectLanguage(l)}
                  disabled={!isActive}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-tea-700 text-white border-tea-800 shadow-md'
                      : isActive
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 hover:bg-emerald-100/70 cursor-pointer'
                      : 'bg-gray-50 border-gray-200 text-gray-400 opacity-65 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <span className="font-extrabold text-sm block">{l.name}</span>
                    <span className={`text-[11px] font-bold block mt-0.5 ${
                      isSelected ? 'text-amber-300' : isActive ? 'text-emerald-700' : 'text-gray-400'
                    }`}>
                      {l.label}
                    </span>
                  </div>
                  {isSelected ? (
                    <Check className="w-5 h-5 text-amber-300" />
                  ) : !isActive ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 2 Section */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>🟠 {LANGUAGE_TIERS.tier2.title}</span>
            </span>
            <span className="text-[11px] text-gray-500 font-bold">Key Word Trigger & Command Mode</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {LANGUAGE_TIERS.tier2.languages.map((l) => (
              <div
                key={l.id}
                className="p-3 rounded-2xl border bg-gray-50 border-gray-200 text-gray-400 opacity-65 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-sm block text-gray-600">{l.name}</span>
                  <span className="text-[11px] font-semibold block text-amber-700 mt-0.5">
                    {l.label}
                  </span>
                </div>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-teal-50 p-3 rounded-2xl border border-teal-200 text-xs text-teal-900 flex items-start space-x-2">
          <Info className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
          <span>
            Assamese (অসমীয়া) is currently active with full speech synthesis and voice note playback. Additional North Eastern Indian regional languages are staged in Tier 1 & Tier 2 roadmap.
          </span>
        </div>
      </div>
    </div>
  );
};
