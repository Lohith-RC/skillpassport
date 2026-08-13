import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../stores/useAppStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AUTO_DISMISS_MS = 4000;

const ToastItem: React.FC<{ id: string; message: string; type: 'success' | 'info' | 'warning' }> = ({
  id,
  message,
  type,
}) => {
  const { removeToast } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const bgColors = {
    success: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20',
    info: 'bg-blue-600 text-white shadow-lg shadow-blue-600/20',
    warning: 'bg-amber-600 text-white shadow-lg shadow-amber-600/20',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" />,
    info: <Info className="w-5 h-5 mr-2 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 mr-2 shrink-0" />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`pointer-events-auto p-4 rounded-xl flex items-center justify-between ${bgColors[type]}`}
    >
      <div className="flex items-center text-xs font-semibold">
        {icons[type]}
        <span>{message}</span>
      </div>
      <button
        onClick={() => removeToast(id)}
        className="ml-3 p-1 rounded hover:bg-white/20 text-white/80 hover:text-white transition"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useAppStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} id={toast.id} message={toast.message} type={toast.type} />
        ))}
      </AnimatePresence>
    </div>
  );
};
