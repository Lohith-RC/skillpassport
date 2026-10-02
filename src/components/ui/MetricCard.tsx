import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';
import { cn } from '../../utils/cn';

type Accent = 'blue' | 'purple' | 'emerald' | 'amber' | 'rose';

export interface MetricCardProps {
  label: string;
  value: number;
  Icon: React.FC<{ className?: string }>;
  accent?: Accent;
  duration?: number;
  footer?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const accentStyles: Record<Accent, string> = {
  blue: 'bg-blue-600/15 border-blue-500/30 text-blue-500',
  purple: 'bg-purple-600/15 border-purple-500/30 text-purple-500',
  emerald: 'bg-emerald-600/15 border-emerald-500/30 text-emerald-500',
  amber: 'bg-amber-600/15 border-amber-500/30 text-amber-500',
  rose: 'bg-rose-600/15 border-rose-500/30 text-rose-500',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  Icon,
  accent = 'blue',
  duration = 1.0,
  footer,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-[#161D2F]',
        'space-y-2 hover:border-blue-500/40 transition',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
          {label}
        </span>
        <div
          className={cn(
            'w-7 h-7 rounded-lg border flex items-center justify-center shrink-0',
            accentStyles[accent]
          )}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
        <AnimatedNumber value={value} duration={duration} />
      </div>
      {footer ? (
        <div className="text-[10px] font-semibold text-emerald-500 flex items-center">
          {footer}
        </div>
      ) : (
        <div className="h-4" aria-hidden="true" />
      )}
      {action && <div>{action}</div>}
    </div>
  );
};