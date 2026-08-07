import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-emerald-600 text-white shadow-emerald-600/20',
          info: 'bg-purple-600 text-white shadow-purple-600/20',
          warning: 'bg-amber-600 text-white shadow-amber-600/20',
        };

        const icons = {
          success: <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" />,
          info: <Info className="w-5 h-5 mr-2 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 mr-2 shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg flex items-center justify-between transition-all duration-300 transform translate-y-0 ${bgColors[toast.type]}`}
          >
            <div className="flex items-center text-xs font-semibold">
              {icons[toast.type]}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded hover:bg-white/20 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
