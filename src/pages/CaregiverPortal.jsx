import React from 'react';
import { useApp } from '../context/AppContext';
import { MISSED_DOSES_LOG, COGNITIVE_TREND_DATA } from '../data/mockData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Droplet,
  Brain,
  WifiOff,
  RefreshCw,
  User,
  Phone,
  Calendar,
  FileText,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export const CaregiverPortal = () => {
  const { profile, offlineState, triggerSync, openModal, demoMode } = useApp();

  return (
    <div className="space-y-8 pb-12">
      {/* Caregiver Portal Top Header Bar */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-lifted border border-teal-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-400/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ASHA & Family Portal Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              👩‍⚕️ Caregiver Dashboard
            </h1>

            <div className="flex items-center space-x-3 text-sm font-semibold text-teal-200">
              <span>Patient: <strong className="text-white">{profile.name}</strong></span>
              <span>•</span>
              <span className="bg-teal-800/80 px-2.5 py-0.5 rounded-md font-mono text-amber-300">
                ID #{profile.id}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold px-4 py-2 rounded-2xl text-xs sm:text-sm flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>🟢 {profile.status} • {offlineState.pendingItems > 0 ? `${offlineState.pendingItems} Pending` : 'Synced'}</span>
            </div>

            <button
              onClick={() => openModal('profile')}
              className="bg-amber-400 hover:bg-amber-300 text-teal-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-sm transition active:scale-95"
            >
              Patient Profile
            </button>
          </div>
        </div>
      </div>

      {/* KEY METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Medication Adherence */}
        <div className="bg-white rounded-3xl p-6 shadow-lifted border-2 border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Medication Adherence
            </span>
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </span>
          </div>
          <div className="text-4xl font-extrabold text-teal-950 mb-1">
            {profile.adherenceRate}%
          </div>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            ↑ 5% this week (Target 85%+)
          </span>
        </div>

        {/* Metric 2: Hydration Target */}
        <div className="bg-white rounded-3xl p-6 shadow-lifted border-2 border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Hydration Tracked
            </span>
            <span className="p-2 bg-sky-100 text-sky-700 rounded-xl">
              <Droplet className="w-5 h-5" />
            </span>
          </div>
          <div className="text-4xl font-extrabold text-teal-950 mb-1">
            {profile.hydrationCount} / {profile.targetHydration}
          </div>
          <span className="text-xs font-bold text-sky-700">
            Reminders completed today
          </span>
        </div>

        {/* Metric 3: Cognitive Sessions */}
        <div className="bg-white rounded-3xl p-6 shadow-lifted border-2 border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Cognitive Sessions
            </span>
            <span className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Brain className="w-5 h-5" />
            </span>
          </div>
          <div className="text-4xl font-extrabold text-teal-950 mb-1">
            {profile.cognitiveSessionsCompleted}
          </div>
          <span className="text-xs font-bold text-purple-700">
            Completed exercises this week
          </span>
        </div>

        {/* Metric 4: Missed Doses */}
        <div className="bg-white rounded-3xl p-6 shadow-lifted border-2 border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Missed Doses Logged
            </span>
            <span className="p-2 bg-rose-100 text-rose-700 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </span>
          </div>
          <div className="text-4xl font-extrabold text-rose-700 mb-1">
            {profile.missedDosesCount}
          </div>
          <span className="text-xs font-bold text-rose-600">
            Recorded this week
          </span>
        </div>
      </div>

      {/* COGNITIVE TREND CHART (RECHARTS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-teal-950">
                Cognitive Activity Trend
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full">
                Trend: Improving 📈
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-500 mt-1">
              7-Day Memory Match performance score trajectory
            </p>
          </div>

          <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            ℹ️ Non-diagnostic activity observation
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={COGNITIVE_TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E4D40" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1E4D40" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" fontWeight="600" />
              <YAxis domain={[50, 100]} stroke="#64748B" fontWeight="600" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E4D40',
                  borderRadius: '12px',
                  color: '#FFF',
                  fontWeight: 'bold',
                  border: 'none'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#1E4D40"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MISSED DOSES AUDIT LOG TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lifted border-2 border-teal-200">
        <h2 className="text-2xl font-extrabold text-teal-950 mb-4">
          Missed Doses & Audit Log
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-teal-100 text-teal-950 bg-teal-50/80">
                <th className="p-3 font-extrabold">Date</th>
                <th className="p-3 font-extrabold">Medicine</th>
                <th className="p-3 font-extrabold">Scheduled Time</th>
                <th className="p-3 font-extrabold">Status</th>
                <th className="p-3 font-extrabold">ASHA Action</th>
              </tr>
            </thead>
            <tbody>
              {MISSED_DOSES_LOG.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => openModal('reminder_detail', { title: row.medicine, time: row.time, status: row.status })}
                  className="border-b border-teal-100/60 hover:bg-teal-50/50 cursor-pointer transition"
                >
                  <td className="p-3 font-semibold text-gray-700">{row.date}</td>
                  <td className="p-3 font-bold text-gray-900">{row.medicine}</td>
                  <td className="p-3 font-semibold text-teal-900">{row.time}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      row.status === 'Missed'
                        ? 'bg-rose-100 text-rose-800'
                        : row.status.includes('Late')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-600 font-medium">
                    {row.followUp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OFFLINE-FIRST SYNC STATUS WIDGET */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-950 text-white rounded-3xl p-6 shadow-lifted border border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
            <WifiOff className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>🟢 Offline Mode Active</span>
              <span className="text-xs bg-emerald-400 text-teal-950 px-2 py-0.5 rounded-full font-bold">
                Synced Locally
              </span>
            </h3>
            <p className="text-xs text-teal-200 mt-0.5">
              {offlineState.pendingItems > 0 ? `${offlineState.pendingItems} items pending cloud sync` : 'All records synchronized'} • Last synced: {offlineState.lastSynced}
            </p>
          </div>
        </div>

        <button
          onClick={triggerSync}
          disabled={offlineState.isSyncing}
          className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-teal-950 font-extrabold text-base rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-75"
        >
          <RefreshCw className={`w-5 h-5 ${offlineState.isSyncing ? 'animate-spin' : ''}`} />
          <span>{offlineState.isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>
    </div>
  );
};
