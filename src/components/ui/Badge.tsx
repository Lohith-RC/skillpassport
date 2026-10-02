import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'purple' | 'emerald' | 'blue' | 'amber' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'purple',
  children,
  ...props
}) => {
  const variants = {
    purple: 'bg-zinc-900 text-white border-zinc-700 font-mono',
    emerald: 'bg-zinc-900 text-zinc-200 border-zinc-700 font-mono',
    blue: 'bg-white text-black font-bold border-white font-mono',
    amber: 'bg-zinc-800 text-white border-zinc-600 font-mono',
    neutral: 'bg-zinc-900 text-zinc-300 border-zinc-800 font-mono',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
