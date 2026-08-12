import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Bell, ShieldCheck, Briefcase, Rocket, Trophy, CheckCircle, Trash2, X } from 'lucide-react';

export const NotificationsDropdown: React.FC = () => {
  const {
    isNotificationsOpen,
    setNotificationsOpen,
    notifications,
    markNotificationRead,
    clearNotifications,
    addToast,
  } = useAppStore();

  // Close on outside click or Escape so the panel never lingers over the UI.
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNotificationsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNotificationsOpen, setNotificationsOpen]);

  if (!isNotificationsOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-purple-500" />;
      case 'interview':
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'deployment':
        return <Rocket className="w-4 h-4 text-emerald-500" />;
      case 'badge':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div ref={panelRef} className="absolute right-12 top-16 z-50 w-80 sm:w-96 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#161D2F] bg-gray-50 dark:bg-[#0F1626]">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-extrabold text-slate-900 dark:text-white">Notifications</span>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-600 text-white">
              {notifications.filter(n => !n.read).length} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {notifications.length > 0 && (
            <button
              onClick={() => {
                clearNotifications();
                addToast('All notifications cleared.', 'info');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setNotificationsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-[#161D2F]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle className="w-8 h-8 mx-auto text-emerald-500 opacity-60" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">You're all caught up!</p>
            <p className="text-[10px] text-slate-400">No unread notifications in your feed.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-3.5 flex items-start space-x-3 cursor-pointer transition ${
                item.read
                  ? 'bg-transparent opacity-75'
                  : 'bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
            >
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-[#0F1626] border border-gray-200 dark:border-[#1C263B] shrink-0 mt-0.5">
                {getNotificationIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 dark:text-slate-200 leading-snug">{item.title}</p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">{item.time}</span>
              </div>
              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
