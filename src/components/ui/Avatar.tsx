import React from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  /** Initials or a single character. */
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Render as a circle rather than a rounded square. */
  rounded?: boolean;
  className?: string;
}

const sizes: Record<string, string> = {
  xs: 'w-6 h-6 text-2xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase() || 'SP';

/** Neutral avatar — accent stays reserved for status, not identity decoration. */
export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', rounded = true, className }) => (
  <div
    className={cn(
      'flex items-center justify-center shrink-0 select-none',
      'bg-inset border border-hairline text-fg font-semibold tracking-tight',
      rounded ? 'rounded-full' : 'rounded-xl',
      sizes[size],
      className,
    )}
    aria-hidden="true"
  >
    {initials(name)}
  </div>
);
