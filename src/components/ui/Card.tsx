import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  /** Raise one elevation level — for elements that sit *above* the page. */
  raised?: boolean;
}

/**
 * Default content surface: one background, one hairline, one shadow.
 * Hover shifts the border and lifts 1px — no colour jumps, no glow.
 * Padding is NOT baked in so callers own their rhythm.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, raised = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'bg-surface border border-hairline rounded-2xl shadow-card',
          hoverable && 'cursor-pointer transition-colors duration-150 ease-out hover:border-strong',
          className,
        )}
        whileHover={hoverable ? { y: -2, boxShadow: 'var(--shadow-lift)' } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={raised ? { boxShadow: 'var(--shadow-pop)' } : undefined}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = 'Card';
