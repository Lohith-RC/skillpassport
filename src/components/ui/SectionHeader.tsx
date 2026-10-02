import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  title: string;
  description?: React.ReactNode;
  /** Small uppercase label above the title. */
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/** Consistent heading rhythm for every panel and page section. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  eyebrow,
  action,
  className,
}) => (
  <div className={cn('flex items-start justify-between gap-4', className)}>
    <div className="space-y-1 min-w-0">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h3 className="text-base font-semibold text-fg tracking-tight leading-tight">{title}</h3>
      {description && (
        <p className="text-xs text-fg-muted leading-relaxed">{description}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
