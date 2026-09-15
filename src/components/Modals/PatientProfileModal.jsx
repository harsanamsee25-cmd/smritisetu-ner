import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Phone, MapPin, ShieldCheck, Heart, Award } from 'lucide-react';

export const PatientProfileModal = () => {
  const { activeModal, closeModal, profile } = useApp();

  if (activeModal !== 'profile') return null;

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

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-3xl font-extrabold shadow-sm border border-teal-200">
            👵
          </div>
          <div>
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wide bg-teal-100 px-2 py-0.5 rounded-md">
              ID: {profile.id}
            </span>
            <h3 className="text-2xl font-extrabold text-teal-950 mt-1">
              {profile.name}
            </h3>
            <p className="text-xs text-gray-600 font-semibold">
              Age {profile.age} • {profile.gender} • Language: {profile.language}
            </p>
          </div>
        </div>

        {/* Profile Info Details Grid */}
        <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-100 mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
            <span className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4 text-teal-700" />
              <span>Location / District:</span>
            </span>
            <span className="font-bold text-gray-900">{profile.district}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Assigned ASHA Worker:</span>
            </span>
            <span className="font-bold text-teal-900">{profile.assignedAsha}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4 text-rose-600" />
              <span>Emergency Contact:</span>
            </span>
            <span className="font-bold text-rose-700">{profile.emergencyContact}</span>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Medication Adherence:</span>
            </span>
            <span className="font-bold text-emerald-700">{profile.adherenceRate}% (Stable)</span>
          </div>
        </div>

        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mb-6">
          ⚠️ <strong>Hackathon Demo Note:</strong> All patient personal details are simulated mock records for clinical demonstration purposes.
        </div>

        <button
          onClick={closeModal}
          className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-base rounded-2xl shadow-md transition active:scale-95"
        >
          Close Patient Profile
        </button>
      </div>
    </div>
  );
};
