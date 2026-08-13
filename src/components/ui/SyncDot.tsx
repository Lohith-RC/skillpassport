import React from 'react';
import { motion } from 'framer-motion';

interface SyncDotProps {
  status: 'synced' | 'syncing' | 'error';
  className?: string;
}

/**
 * SyncDot - Animated connection status indicator.
 * Pulses when syncing, solid when synced, red on error.
 */
export const SyncDot: React.FC<SyncDotProps> = ({ status, className = '' }) => {
  const colorClass =
    status === 'synced'
      ? 'bg-emerald-500'
      : status === 'syncing'
      ? 'bg-amber-500'
      : 'bg-red-500';

  return (
    <motion.span
      className={`w-2 h-2 rounded-full inline-block ${colorClass} ${className}`}
      animate={
        status === 'syncing'
          ? { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }
          : {}
      }
      transition={
        status === 'syncing'
          ? { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
          : {}
      }
    />
  );
};
