import React from 'react';
import { cn } from '../../utils/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** Denser variant for side columns. */
  compact?: boolean;
  className?: string;
}

/**
 * The one empty state in the product. Before this, every view improvised its
 * own — which is how a 400px gap of dead space ends up between two sections.
 * Copy rule: say what's missing, why it matters, then give one action.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
}) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-line bg-canvas',
      compact ? 'p-6 gap-2' : 'p-10 gap-3',
      className,
    )}
  >
    {icon && (
      <div className="w-10 h-10 rounded-xl bg-interactive border border-hairline flex items-center justify-center text-fg-muted">
        {icon}
      </div>
    )}
    <div className="space-y-1.5">
      <p className="text-sm font-semibold text-fg">{title}</p>
      {description && (
        <p className="text-xs leading-relaxed text-fg-muted max-w-md mx-auto">{description}</p>
      )}
    </div>
    {action && <div className="pt-1">{action}</div>}
  </div>
);
