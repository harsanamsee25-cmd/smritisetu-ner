import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Check, Trash2, Pill, Droplet, Brain, Mic } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const NotificationDrawer = () => {
  const { activeModal, closeModal, notifications, setNotifications } = useApp();

  if (activeModal !== 'notifications') return null;

  const markAllRead = () => {
    soundManager.playGentleClick();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    soundManager.playGentleClick();
    setNotifications([]);
  };

  const removeNotification = (id) => {
    soundManager.playGentleClick();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative border-4 border-teal-100 text-gray-900 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-teal-950">
              🔔 Notifications
            </h3>
            <p className="text-xs text-gray-600 font-semibold">
              Today's care alerts & reminders
            </p>
          </div>
        </div>

        {/* Action Header */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between text-xs font-bold text-teal-800 mb-4 pb-2 border-b border-teal-100">
            <button onClick={markAllRead} className="hover:underline flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
            <button onClick={clearAll} className="hover:underline text-rose-600 flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          </div>
        )}

        {/* Notification Items */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 mb-6">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-medium">
              <span className="text-4xl block mb-2">🎉</span>
              No pending notifications for today!
            </div>
          ) : (
            notifications.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                  item.read ? 'bg-gray-50 border-gray-200' : 'bg-amber-50/80 border-amber-200 shadow-sm'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                  <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">
                    {item.time}
                  </span>
                </div>
                <button
                  onClick={() => removeNotification(item.id)}
                  className="text-gray-400 hover:text-rose-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          onClick={closeModal}
          className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm rounded-2xl transition"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};
