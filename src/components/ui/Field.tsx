import React from 'react';
import { cn } from '../../utils/cn';

export interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Label + control + hint/error, with the error wired to the control. */
export const Field: React.FC<FieldProps> = ({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}) => {
  const hintId = htmlFor ? `${htmlFor}-hint` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className="block text-xs font-medium text-fg-muted">
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-2xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-2xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/** Single input skin — one background, one hairline, one focus ring. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full h-10 px-3 rounded-xl bg-inset border text-sm text-fg placeholder:text-fg-subtle',
        'transition-colors duration-150 ease-out',
        'focus:outline-none focus:border-focusring focus:bg-surface',
        invalid ? 'border-danger' : 'border-line hover:border-strong',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
