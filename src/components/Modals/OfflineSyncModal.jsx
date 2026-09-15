import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, RefreshCw, WifiOff, CheckCircle2, HardDrive, Database } from 'lucide-react';

export const OfflineSyncModal = () => {
  const { activeModal, closeModal, offlineState, triggerSync, t } = useApp();

  if (activeModal !== 'offline_sync') return null;

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

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <WifiOff className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide bg-emerald-100 px-2 py-0.5 rounded-md">
              Offline-First Data Storage
            </span>
            <h3 className="text-2xl font-extrabold text-teal-950 mt-0.5">
              Offline Sync Status
            </h3>
          </div>
        </div>

        {/* Sync Summary Card */}
        <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100 mb-6 space-y-3">
          <div className="flex items-center justify-between text-base font-semibold text-gray-800">
            <span className="flex items-center space-x-2 text-gray-600">
              <HardDrive className="w-5 h-5 text-teal-700" />
              <span>Last Synced Server Time:</span>
            </span>
            <span className="font-bold text-teal-950">{offlineState.lastSynced}</span>
          </div>

          <div className="flex items-center justify-between text-base font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
            <span className="flex items-center space-x-2 text-gray-600">
              <Database className="w-5 h-5 text-teal-700" />
              <span>Local Cached Records:</span>
            </span>
            <span className="font-bold text-teal-950">24 activity logs</span>
          </div>

          <div className="flex items-center justify-between text-base font-semibold text-gray-800 border-t border-teal-200/50 pt-2">
            <span className="text-gray-600">Pending Cloud Uploads:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              offlineState.pendingItems > 0 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
            }`}>
              {offlineState.pendingItems > 0 ? `${offlineState.pendingItems} items pending` : 'All Synced'}
            </span>
          </div>
        </div>

        <p className="text-xs font-medium text-gray-600 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
          💡 <strong>How it works:</strong> All memory game scores, medication confirmations, and family voice notes are stored safely on the device so ASHA workers can use SmritiSetu deep in rural North East areas without continuous internet access.
        </p>

        {/* Action Sync Button */}
        <button
          onClick={triggerSync}
          disabled={offlineState.isSyncing}
          className="w-full min-h-[56px] bg-tea-700 hover:bg-tea-800 text-white font-bold text-lg rounded-2xl flex items-center justify-center space-x-2 shadow-md transition active:scale-95 disabled:opacity-75"
        >
          <RefreshCw className={`w-6 h-6 ${offlineState.isSyncing ? 'animate-spin' : ''}`} />
          <span>{offlineState.isSyncing ? t('syncing') : t('syncNow')}</span>
        </button>
      </div>
    </div>
  );
};
