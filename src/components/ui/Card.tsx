import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const hoverAnimation = {
  y: -3,
  boxShadow: '0 10px 30px -4px rgba(37, 99, 235, 0.15), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
  borderColor: 'rgba(37, 99, 235, 0.4)',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass-card p-6 border border-border-default rounded-2xl',
          hoverable && 'cursor-pointer',
          className
        )}
        whileHover={hoverable ? hoverAnimation : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
