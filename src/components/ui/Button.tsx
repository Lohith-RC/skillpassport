import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'purple' | 'emerald' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'purple', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      purple: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-md shadow-purple-600/20',
      primary: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-md shadow-purple-600/20',
      secondary: 'bg-white dark:bg-bg-card hover:bg-slate-100 dark:hover:bg-bg-hover text-slate-800 dark:text-gray-200 border border-slate-200 dark:border-border-default shadow-sm',
      emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20',
      ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-bg-hover text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-xs sm:text-sm',
      lg: 'h-12 px-6 text-sm sm:text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
