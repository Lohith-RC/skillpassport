import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * AnimatedNumber - Animates from 0 to value using spring physics.
 * Renders on the compositor thread (no layout thrashing).
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1.2,
  className = '',
  prefix = '',
  suffix = '',
}) => {
  const mv = useMotionValue(value);
  const display = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (value === 0) return; // skip animation for zero
    mv.set(0);
    const controls = animate(mv, value, {
      duration,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, duration, mv]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};
