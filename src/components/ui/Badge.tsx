import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'neutral'
    | 'outline'
    | 'accent'
    | 'success'
    | 'warning'
    | 'danger'
    // Legacy aliases — mapped onto the restrained system
    | 'purple'
    | 'emerald'
    | 'blue'
    | 'amber';
}

/**
 * Status/metadata chip. At most one accent chip should be active in a card,
 * matching the "max 2 accent colours on screen" design rule. Data values use
 * the mono face; everything else stays in the UI face.
 */
export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children,
  ...props
}) => {
  const variants: Record<string, string> = {
    neutral: 'bg-interactive text-fg-muted border-hairline',
    outline: 'bg-transparent text-fg-muted border-line',
    accent: 'bg-accent-soft text-accent border-transparent',
    success: 'bg-success-soft text-success border-transparent',
    warning: 'bg-warning-soft text-warning border-transparent',
    danger: 'bg-danger-soft text-danger border-transparent',
    // Legacy aliases
    purple: 'bg-accent-soft text-accent border-transparent',
    blue: 'bg-accent-soft text-accent border-transparent',
    emerald: 'bg-success-soft text-success border-transparent',
    amber: 'bg-warning-soft text-warning border-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-2xs font-semibold border leading-4',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
