import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';
import { cn } from '../../utils/cn';

type Accent = 'blue' | 'purple' | 'emerald' | 'amber' | 'rose';

export interface MetricCardProps {
  label: string;
  value: number;
  Icon?: React.FC<{ className?: string }>;
  accent?: Accent;
  duration?: number;
  footer?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * One number, one label, one optional delta.
 * The old version gave every card its own rainbow tile — five colours in one
 * row. Icons now render neutral; only genuinely semantic accents (up/down)
 * keep a tint, so a metric row reads as a single instrument panel.
 */
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
  const semanticTint =
    accent === 'emerald'
      ? 'bg-success-soft text-success'
      : accent === 'rose'
        ? 'bg-danger-soft text-danger'
        : 'bg-interactive text-fg-muted';

  return (
    <div
      className={cn(
        'p-4 rounded-2xl bg-surface border border-hairline shadow-card',
        'space-y-2 transition-colors duration-150 ease-out hover:border-strong',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow leading-tight normal-case tracking-normal text-[11px] font-medium text-fg-muted">
          {label}
        </span>
        {Icon && (
          <div
            className={cn(
              'w-7 h-7 rounded-lg border border-hairline flex items-center justify-center shrink-0',
              semanticTint,
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="text-xl font-semibold font-mono tabular text-fg tracking-tight">
        <AnimatedNumber value={value} duration={duration} />
      </div>

      {footer ? (
        <div className="text-2xs font-medium text-fg-muted flex items-center">{footer}</div>
      ) : (
        <div className="h-4" aria-hidden="true" />
      )}

      {action && <div>{action}</div>}
    </div>
  );
};
