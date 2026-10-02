import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface AnimatedContentProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Travel distance in px. */
  distance?: number;
  /** Seconds of delay — pair with a growing index for stagger. */
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Scroll-in wrapper (React Bits `AnimatedContent` pattern): children enter
 * once, from a direction, by a distance — then stay put.
 *
 * Reduced motion skips the transform entirely and renders the final state,
 * per the accessibility rule that content must not be animated into view
 * for users who opted out.
 */
export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  direction = 'up',
  distance = 26,
  delay = 0,
  duration = 0.7,
  className,
}) => {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const x = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
  const y = direction === 'up' ? distance : direction === 'down' ? -distance : 0;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
