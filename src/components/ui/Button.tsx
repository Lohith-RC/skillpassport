import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'purple' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

/**
 * Restrained button system.
 * `primary` is the single accent action; everything else stays neutral so at
 * most one accent is ever active on screen (design-spec rule).
 * `purple` / `emerald` are legacy aliases kept so existing views compile
 * unchanged and inherit the new look.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = cn(
      'relative inline-flex items-center justify-center font-semibold rounded-xl select-none',
      'transition-[background-color,border-color,color,box-shadow] duration-150 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-focusring focus-visible:ring-offset-2',
      'focus-visible:ring-offset-canvas',
      'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    );

    const variants: Record<string, string> = {
      primary:
        'bg-accent-fill text-accent-fg border border-transparent shadow-card hover:bg-accent-fill-hover active:translate-y-px',
      secondary:
        'bg-surface text-fg border border-line shadow-card hover:bg-interactive hover:border-strong active:translate-y-px',
      outline:
        'bg-transparent text-fg border border-line hover:bg-interactive hover:border-strong',
      ghost:
        'bg-transparent text-fg-muted border border-transparent hover:text-fg hover:bg-interactive',
      danger:
        'bg-danger text-white border border-transparent shadow-card hover:opacity-90 active:translate-y-px',
      // Legacy aliases
      purple: 'bg-accent-fill text-accent-fg border border-transparent shadow-card hover:bg-accent-fill-hover active:translate-y-px',
      emerald: 'bg-surface text-fg border border-line shadow-card hover:bg-interactive hover:border-strong active:translate-y-px',
    };

    const sizes: Record<string, string> = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-11 px-5 text-sm gap-2',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0, scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        {...(props as any)}
      >
        {isLoading && (
          <span className="mr-1 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
