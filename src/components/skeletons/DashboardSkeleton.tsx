import React from 'react';

/**
 * DashboardSkeleton - Matches the Dashboard.tsx layout structure.
 * Shown while the lazy-loaded Dashboard module loads.
 */
export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    {/* Welcome banner */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-8 w-72 skeleton-box rounded-lg" />
        <div className="h-4 w-48 skeleton-box rounded" />
      </div>
      <div className="h-10 w-40 skeleton-box rounded-xl" />
    </div>

    {/* 6 metric cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 skeleton-box rounded" />
            <div className="w-7 h-7 skeleton-box rounded-lg" />
          </div>
          <div className="h-7 w-12 skeleton-box rounded" />
          <div className="h-3 w-20 skeleton-box rounded" />
        </div>
      ))}
    </div>

    {/* Middle row: hero card + recent activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-200 dark:border-[#161D2F]">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 skeleton-box rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-48 skeleton-box rounded" />
            <div className="h-3 w-64 skeleton-box rounded" />
            <div className="h-8 w-36 skeleton-box rounded-xl mt-2" />
          </div>
        </div>
      </div>
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-3">
        <div className="h-4 w-28 skeleton-box rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 skeleton-box rounded-full" />
            <div className="space-y-1 flex-1">
              <div className="h-3 w-full skeleton-box rounded" />
              <div className="h-2.5 w-16 skeleton-box rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-4">
        <div className="h-4 w-32 skeleton-box rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 skeleton-box rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-3">
          <div className="h-4 w-36 skeleton-box rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 skeleton-box rounded-xl" />
          ))}
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-3">
          <div className="h-4 w-20 skeleton-box rounded" />
          <div className="h-20 skeleton-box rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);
