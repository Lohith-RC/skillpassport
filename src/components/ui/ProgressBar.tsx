import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  progress: number; // 0 - 100
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'orange';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'blue',
  height = 'md',
  className,
}) => {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    blue: 'bg-accent-blue',
    emerald: 'bg-accent-emerald',
    amber: 'bg-accent-amber',
    purple: 'bg-accent-purple',
    orange: 'bg-orange-500',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('w-full rounded-full bg-bg-base overflow-hidden border border-border-subtle p-0.5', heightClasses[height], className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-700 ease-out', colorClasses[color])}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
