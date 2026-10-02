import React from 'react';
import { cn } from '../../utils/cn';

export interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Keyboard shortcut chip. Renders as a legible key cap rather than the old
 * grey block that looked like a disabled input.
 */
export const Kbd: React.FC<KbdProps> = ({ children, className }) => (
  <kbd
    className={cn(
      'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md',
      'bg-interactive border border-hairline text-2xs font-mono font-medium text-fg-muted',
      className,
    )}
  >
    {children}
  </kbd>
);
