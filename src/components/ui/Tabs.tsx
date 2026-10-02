import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Full-width segmented control (mobile / narrow columns). */
  stretch?: boolean;
  className?: string;
}

/**
 * Segmented control. The active state is marked by a raised surface plus a
 * sliding indicator rather than a saturated colour block — keeps the accent
 * budget free for the thing that actually matters on the page.
 */
export const Tabs: React.FC<TabsProps> = ({ items, value, onChange, stretch, className }) => (
  <div
    role="tablist"
    className={cn(
      'inline-flex items-center gap-1 p-1 rounded-xl bg-inset border border-hairline',
      stretch && 'w-full',
      className,
    )}
  >
    {items.map((item) => {
      const active = item.id === value;
      return (
        <button
          key={item.id}
          role="tab"
          aria-selected={active}
          onClick={() => onChange(item.id)}
          className={cn(
            'relative flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium whitespace-nowrap',
            'transition-colors duration-150 ease-out',
            stretch && 'flex-1 justify-center',
            active ? 'text-fg' : 'text-fg-muted hover:text-fg',
          )}
        >
          {active && (
            <motion.span
              layoutId={`tab-pill-${items.map((i) => i.id).join('')}`}
              className="absolute inset-0 rounded-lg bg-surface border border-hairline shadow-card"
              transition={{ type: 'spring', stiffness: 450, damping: 34 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {item.icon}
            {item.label}
            {item.badge}
          </span>
        </button>
      );
    })}
  </div>
);
