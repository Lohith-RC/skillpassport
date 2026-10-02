import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'purple' | 'emerald' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'purple', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-white disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';
    
    const variants = {
      purple: 'bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black shadow-md border border-white',
      primary: 'bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black shadow-md border border-white',
      secondary: 'bg-zinc-950 hover:bg-zinc-900 active:bg-zinc-800 text-white border border-zinc-800 shadow-sm',
      emerald: 'bg-white hover:bg-zinc-200 text-black border border-white',
      ghost: 'bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-transparent hover:border-zinc-800',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-xs sm:text-sm',
      lg: 'h-12 px-6 text-sm sm:text-base',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...(props as any)}
      >
        {isLoading && (
          <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
