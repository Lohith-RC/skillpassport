import React from 'react';

interface GenericSkeletonProps {
  lines?: number;
  className?: string;
}

/**
 * GenericSkeleton - Simple fallback skeleton for any view.
 * Used when a view-specific skeleton doesn't exist yet.
 */
export const GenericSkeleton: React.FC<GenericSkeletonProps> = ({
  lines = 6,
  className = '',
}) => (
  <div className={`space-y-4 animate-pulse ${className}`}>
    <div className="h-8 w-64 skeleton-box rounded-lg" />
    <div className="h-4 w-48 skeleton-box rounded" />
    <div className="space-y-3 pt-4">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-10 h-10 skeleton-box rounded-xl shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3.5 skeleton-box rounded" style={{ width: `${70 + Math.random() * 25}%` }} />
            <div className="h-2.5 skeleton-box rounded" style={{ width: `${40 + Math.random() * 30}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
