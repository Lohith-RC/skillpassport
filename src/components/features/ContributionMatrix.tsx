import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  Flame,
  Trophy,
  CalendarCheck,
  Sparkles,
  Github,
  Gitlab,
  Code,
  Terminal,
  BarChart2,
  TrendingUp,
  Zap,
  Link2,
  ArrowRight,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
 * Types
 * ═══════════════════════════════════════════════════════════════════════════ */
type MetricType = 'commits' | 'prs' | 'mrs' | 'pipelines' | 'solved' | 'contests' | 'notebooks';
type ViewMode = 'heatmap' | 'velocity' | 'telemetry';

interface PlatformMatrixConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  levelClasses: { lvl0: string; lvl1: string; lvl2: string; lvl3: string; lvl4: string };
  metrics: { id: MetricType; label: string; count: number }[];
  activeMetric: MetricType;
  stats: { label: string; value: string }[];
}

/* ═══════════════════════════════════════════════════════════════════════════
 * RevealOnScroll — lightweight wrapper (same pattern as LandingPage)
 * ═══════════════════════════════════════════════════════════════════════════ */
const RevealOnScroll: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const ref = useScrollReveal({ delay, threshold: 0.1 });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
 * ActivityLegend — explains what the heatmap colors mean
 * ═══════════════════════════════════════════════════════════════════════════ */
const ActivityLegend: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-gray-400 ${className}`}>
    <span className="font-semibold text-slate-700 dark:text-gray-300">Activity level:</span>
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-[3px] bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-none inline-block" />
      None
    </span>
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-[3px] bg-emerald-200 dark:bg-emerald-950 inline-block" />
      Light
    </span>
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-[3px] bg-emerald-400 dark:bg-emerald-700 inline-block" />
      Moderate
    </span>
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-[3px] bg-emerald-500 dark:bg-emerald-500 inline-block" />
      High
    </span>
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-[3px] bg-emerald-700 dark:bg-emerald-300 inline-block" />
      Peak
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
 * ContributionMatrix — the main component
 *
 * Rewritten for new-user friendliness:
 *  • Welcoming onboarding guide at the top
 *  • Plain-language labels throughout
 *  • Interactive legend explaining heatmap colors
 *  • Empty-state guidance for users with no connected platforms
 *  • Progressive complexity — summary first, details on scroll
 * ═══════════════════════════════════════════════════════════════════════════ */
export const ContributionMatrix: React.FC = () => {
  const { profile, addToast } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('heatmap');
  const [showGuide, setShowGuide] = useState(true);

  // Active metric state per platform
  const [ghMetric, setGhMetric] = useState<MetricType>('commits');
  const [glMetric, setGlMetric] = useState<MetricType>('mrs');
  const [lcMetric, setLcMetric] = useState<MetricType>('solved');
  const [hrMetric, setHrMetric] = useState<MetricType>('contests');

  // Scroll reveal refs
  const summaryReveal = useScrollReveal({ threshold: 0.15 });
  const legendReveal = useScrollReveal({ threshold: 0.1 });
  const ghReveal = useScrollReveal({ delay: 0 });
  const glReveal = useScrollReveal({ delay: 80 });
  const lcReveal = useScrollReveal({ delay: 160 });
  const hrReveal = useScrollReveal({ delay: 240 });

  // Detect if any platforms are connected (for empty state)
  const connectedCount = Object.values(profile.platforms).filter((p) => p.connected).length;
  const hasConnectedPlatforms = connectedCount > 0;

  const weeks = Array.from({ length: 52 });
  const daysPerWeek = 7;

  /* ── Heatmap grid renderer (unchanged logic, cleaner variable names) ─── */
  const renderGrid = (
    levelClasses: PlatformMatrixConfig['levelClasses'],
    seedOffset: number,
    platformName: string
  ) => (
    <div className="flex space-x-1.5 min-w-[850px]">
      {weeks.map((_, weekIndex) => (
        <div key={weekIndex} className="flex flex-col space-y-1.5">
          {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
            const seed = (weekIndex * 7 + dayIndex + seedOffset) % 13;
            let lvl = levelClasses.lvl0;
            let count = 0;
            if (seed === 2 || seed === 3) { lvl = levelClasses.lvl1; count = 2; }
            if (seed === 5 || seed === 7) { lvl = levelClasses.lvl2; count = 5; }
            if (seed === 8 || seed === 11) { lvl = levelClasses.lvl3; count = 9; }
            if (seed === 12) { lvl = levelClasses.lvl4; count = 14; }

            return (
              <div
                key={dayIndex}
                onClick={() =>
                  addToast(
                    `${platformName}: ${count} activities on Week ${weekIndex + 1}, Day ${dayIndex + 1} (demo data).`,
                    'info'
                  )
                }
                className={`w-3 h-3 rounded-[3px] transition-all duration-150 hover:scale-150 hover:z-10 cursor-pointer ${lvl}`}
                title={`${platformName}: ${count} activities on Week ${weekIndex + 1}, Day ${dayIndex + 1}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );

  /* ── View mode label (plain language) ────────────────────────────────── */
  const viewModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'heatmap': return 'Activity Heatmap';
      case 'velocity': return 'Weekly Trends';
      case 'telemetry': return 'Live Activity Feed';
    }
  };

  return (
    <div className="space-y-8">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* WELCOME BANNER — friendly onboarding for new users                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showGuide && (
        <Card className="p-6 md:p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800/30 relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={() => setShowGuide(false)}
            className="absolute top-4 right-4 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/50 dark:hover:bg-white/5"
            aria-label="Dismiss guide"
          >
            Dismiss
          </button>

          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Welcome to Your Activity Dashboard
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              This page shows a year-long snapshot of your coding activity across every platform
              you've connected — GitHub, GitLab, LeetCode, and more. Each colored square represents
              one day: the brighter the color, the more you coded that day.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-purple-100 dark:border-purple-800/20">
                <span className="font-bold text-purple-700 dark:text-purple-300">1. Connect platforms</span>
                <p className="text-slate-500 dark:text-gray-400 mt-1">
                  Link your coding accounts from the sidebar to start building your activity history.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-purple-100 dark:border-purple-800/20">
                <span className="font-bold text-purple-700 dark:text-purple-300">2. Explore your heatmap</span>
                <p className="text-slate-500 dark:text-gray-400 mt-1">
                  Hover over any square to see what you did that day. Green = active, empty = rest day.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-purple-100 dark:border-purple-800/20">
                <span className="font-bold text-purple-700 dark:text-purple-300">3. Track your streak</span>
                <p className="text-slate-500 dark:text-gray-400 mt-1">
                  Keep your streak alive! Consistent daily activity builds your verified track record.
                </p>
              </div>
            </div>
            {!hasConnectedPlatforms && (
              <div className="pt-2">
                <Button variant="purple" size="sm" onClick={() => addToast('Head to the sidebar and click "Sync 10 Platforms" to get started!', 'info')}>
                  <Link2 className="w-3.5 h-3.5 mr-1.5" />
                  Connect Your First Platform
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PAGE HEADER & VIEW TOGGLE                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card ref={summaryReveal} className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
                <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
                Your Activity Dashboard
              </h2>
              <Badge variant="purple">
                {connectedCount > 0 ? `${connectedCount} platform${connectedCount !== 1 ? 's' : ''} connected` : 'No platforms yet'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              {hasConnectedPlatforms
                ? 'A year-long snapshot of your coding activity across all connected platforms.'
                : 'Connect your first platform to start building your verified activity history.'}
            </p>
          </div>

          {/* View Mode Tabs — plain-language labels */}
          <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
            <button
              onClick={() => {
                setViewMode('heatmap');
                addToast('Showing your activity as a year-long heatmap — hover any day to see details.', 'info');
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-lg transition ${
                viewMode === 'heatmap'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 mr-1.5" />
              Activity Heatmap
            </button>

            <button
              onClick={() => {
                setViewMode('velocity');
                addToast('Showing weekly trends — see how your activity changes over time.', 'info');
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-lg transition ${
                viewMode === 'velocity'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
              Weekly Trends
            </button>

            <button
              onClick={() => {
                setViewMode('telemetry');
                addToast('Showing your latest activity — real-time updates as they happen.', 'info');
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-lg transition ${
                viewMode === 'telemetry'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Live Activity Feed
            </button>
          </div>
        </div>

        {/* ── Summary Stats — friendly labels ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Current Streak</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">21 Days in a Row</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Your best day: 18 activities</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Longest Streak Ever</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">48 Days</div>
              <div className="text-[10px] text-amber-600 font-semibold mt-0.5">May – July 2025</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-md shadow-purple-600/20">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Active This Year</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">294 of 365 Days</div>
              <div className="text-[10px] text-purple-600 font-semibold mt-0.5">That's 80% of the year!</div>
            </div>
          </div>
        </div>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* INTERACTIVE LEGEND — explains what colors mean                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div ref={legendReveal}>
        <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <ActivityLegend />
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
            <HelpCircle className="w-3 h-3" />
            Hover any square in the heatmap to see daily details
          </div>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PLATFORM: GITHUB                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll delay={0}>
        <Card ref={ghReveal} className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600">
                <Github className="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center">
                  GitHub Activity
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                  {profile.platforms.github.connected
                    ? `${profile.platforms.github.handle} · ${profile.platforms.github.contributions.toLocaleString()} contributions`
                    : 'Not connected yet — link your GitHub to see your activity here'}
                </p>
              </div>
            </div>

            {/* Metric swap selector — plain labels */}
            <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
              {[
                { id: 'commits' as MetricType, label: 'Commits' },
                { id: 'prs' as MetricType, label: 'Pull Requests' },
                { id: 'pipelines' as MetricType, label: 'Code Reviews' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setGhMetric(m.id);
                    addToast(`Now showing your GitHub ${m.label.toLowerCase()}.`, 'success');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    ghMetric === m.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heatmap View */}
          {viewMode === 'heatmap' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle overflow-x-auto space-y-4">
              <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 font-mono mb-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>

              {renderGrid(
                {
                  lvl0: 'bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-none',
                  lvl1: 'bg-emerald-200 dark:bg-emerald-950',
                  lvl2: 'bg-emerald-400 dark:bg-emerald-700',
                  lvl3: 'bg-emerald-500 dark:bg-emerald-500',
                  lvl4: 'bg-emerald-700 dark:bg-emerald-300',
                },
                1,
                'GitHub'
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
                <span>Showing your GitHub {ghMetric.replace('_', ' ')} over the past year</span>
                <span className="text-emerald-600 font-semibold">Busiest day: 24 activities on Nov 14</span>
              </div>
            </div>
          )}

          {/* Weekly Trends View */}
          {viewMode === 'velocity' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">GitHub — Activities per Quarter</div>
              <p className="text-slate-500 dark:text-gray-400">
                This shows how your activity is distributed across the year. A higher bar means a more productive quarter.
              </p>
              <ProgressBar progress={84} color="emerald" />
              <div className="flex justify-between text-slate-500 font-mono">
                <span>Q1: 180</span>
                <span>Q2: 240</span>
                <span>Q3: 210</span>
                <span>Q4: 210</span>
              </div>
            </div>
          )}

          {/* Live Activity Feed View */}
          {viewMode === 'telemetry' && (
            <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle text-xs font-mono space-y-2">
              <div className="text-emerald-600 font-bold">🟢 Latest GitHub Activity</div>
              <div className="text-slate-600 dark:text-gray-300">
                Most recent commit: <span className="text-purple-600">e89f412a</span> — "feat(auth): add zero-knowledge proof verification route"
              </div>
            </div>
          )}
        </Card>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PLATFORM: GITLAB                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll delay={80}>
        <Card ref={glReveal} className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/40 flex items-center justify-center text-orange-500">
                <Gitlab className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center">
                  GitLab Activity
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                  {profile.platforms.gitlab.connected
                    ? `${profile.platforms.gitlab.handle} · ${profile.platforms.gitlab.contributions.toLocaleString()} merge requests`
                    : 'Not connected yet — link your GitLab to see your activity here'}
                </p>
              </div>
            </div>

            <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
              {[
                { id: 'mrs' as MetricType, label: 'Merge Requests' },
                { id: 'pipelines' as MetricType, label: 'CI Builds' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setGlMetric(m.id);
                    addToast(`Now showing your GitLab ${m.label.toLowerCase()}.`, 'success');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    glMetric === m.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {viewMode === 'heatmap' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle overflow-x-auto space-y-4">
              <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 font-mono mb-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>

              {renderGrid(
                {
                  lvl0: 'bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-none',
                  lvl1: 'bg-orange-200 dark:bg-orange-950',
                  lvl2: 'bg-orange-400 dark:bg-orange-700',
                  lvl3: 'bg-orange-500 dark:bg-orange-500',
                  lvl4: 'bg-orange-700 dark:bg-orange-300',
                },
                3,
                'GitLab'
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
                <span>Showing your GitLab {glMetric.replace('_', ' ')} over the past year</span>
                <span className="text-orange-500 font-semibold">Build success rate: 99.1%</span>
              </div>
            </div>
          )}

          {viewMode === 'velocity' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">GitLab — Merge Requests per Month</div>
              <p className="text-slate-500 dark:text-gray-400">
                Tracks how many merge requests you've completed each month. Upward trends mean you're shipping more.
              </p>
              <ProgressBar progress={82} color="orange" />
              <div className="flex justify-between text-slate-500 font-mono">
                <span>Jan: 22</span>
                <span>Mar: 31</span>
                <span>Jun: 38</span>
                <span>Sep: 41</span>
              </div>
            </div>
          )}

          {viewMode === 'telemetry' && (
            <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle text-xs font-mono space-y-2">
              <div className="text-orange-500 font-bold">🟢 Latest GitLab Activity</div>
              <div className="text-slate-600 dark:text-gray-300">
                Most recent merge request: <span className="text-purple-600">78912e45</span> — "feat(consensus): implement leader heartbeat failover mechanism"
              </div>
            </div>
          )}
        </Card>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PLATFORM: LEETCODE                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll delay={160}>
        <Card ref={lcReveal} className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-amber-500">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center">
                  LeetCode Problem Solving
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                  {profile.platforms.leetcode.connected
                    ? `${profile.platforms.leetcode.handle} · ${profile.platforms.leetcode.contributions.toLocaleString()} problems solved`
                    : 'Not connected yet — link your LeetCode to see your progress here'}
                </p>
              </div>
            </div>

            <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
              {[
                { id: 'solved' as MetricType, label: 'Problems Solved' },
                { id: 'contests' as MetricType, label: 'Contest Rounds' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setLcMetric(m.id);
                    addToast(`Now showing your LeetCode ${m.label.toLowerCase()}.`, 'success');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    lcMetric === m.id
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {viewMode === 'heatmap' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle overflow-x-auto space-y-4">
              <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 font-mono mb-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>

              {renderGrid(
                {
                  lvl0: 'bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-none',
                  lvl1: 'bg-amber-200 dark:bg-amber-950',
                  lvl2: 'bg-amber-400 dark:bg-amber-700',
                  lvl3: 'bg-amber-500 dark:bg-amber-500',
                  lvl4: 'bg-amber-700 dark:bg-amber-300',
                },
                7,
                'LeetCode'
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
                <span>Showing your LeetCode {lcMetric === 'solved' ? 'problems solved' : 'contest rounds'} over the past year</span>
                <span className="text-amber-500 font-semibold">Global ranking: Top 3.8%</span>
              </div>
            </div>
          )}

          {viewMode === 'velocity' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">LeetCode — Problems Solved per Day of Week</div>
              <p className="text-slate-500 dark:text-gray-400">
                See which days you solve the most problems. Some people grind on weekends — others prefer weekdays.
              </p>
              <ProgressBar progress={76} color="amber" />
              <div className="flex justify-between text-slate-500 font-mono">
                <span>Mon: 9</span>
                <span>Wed: 14</span>
                <span>Fri: 11</span>
                <span>Sun: 16</span>
              </div>
            </div>
          )}

          {viewMode === 'telemetry' && (
            <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle text-xs font-mono space-y-2">
              <div className="text-amber-500 font-bold">🟢 Latest LeetCode Activity</div>
              <div className="text-slate-600 dark:text-gray-300">
                Most recent accepted solution: <span className="text-purple-600">#2864 — Maximum Odd Binary Number</span> (Runtime: Top 9%)
              </div>
            </div>
          )}
        </Card>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PLATFORM: HACKERRANK + CODEFORCES                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll delay={240}>
        <Card ref={hrReveal} className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 flex items-center justify-center text-purple-600">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center">
                  HackerRank &amp; Codeforces
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                  {profile.platforms.hackerrank.connected || profile.platforms.codeforces.connected
                    ? `Combined: ${(profile.platforms.hackerrank.contributions + profile.platforms.codeforces.contributions).toLocaleString()} contest activities`
                    : 'Not connected yet — link your accounts to see contest activity'}
                </p>
              </div>
            </div>

            <Badge variant="purple">6-Star HackerRank</Badge>
          </div>

          {viewMode === 'heatmap' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle overflow-x-auto space-y-4">
              <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 font-mono mb-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>

              {renderGrid(
                {
                  lvl0: 'bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-none',
                  lvl1: 'bg-purple-200 dark:bg-purple-950',
                  lvl2: 'bg-purple-400 dark:bg-purple-700',
                  lvl3: 'bg-purple-500 dark:bg-purple-500',
                  lvl4: 'bg-purple-700 dark:bg-purple-300',
                },
                9,
                'HackerRank & Codeforces'
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
                <span>Showing combined contest activity over the past year</span>
                <span className="text-purple-600 font-semibold">Rating: 1,640 (Specialist)</span>
              </div>
            </div>
          )}

          {viewMode === 'velocity' && (
            <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle space-y-3 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Contest Performance Summary</div>
              <p className="text-slate-500 dark:text-gray-400">
                A snapshot of your competitive programming journey — contests entered, problems solved, and your best rankings.
              </p>
              <ProgressBar progress={88} color="purple" />
              <div className="flex justify-between text-slate-500 font-mono">
                <span>48 contests</span>
                <span>243 solves</span>
                <span>Avg rank: 412</span>
                <span>Best: Top 1.2%</span>
              </div>
            </div>
          )}

          {viewMode === 'telemetry' && (
            <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle text-xs font-mono space-y-2">
              <div className="text-purple-600 font-bold">🟢 Latest Contest Activity</div>
              <div className="text-slate-600 dark:text-gray-300">
                Most recent Codeforces round: <span className="text-purple-600">#1922</span> — Solved 4/6 problems (Rating +38 → 1,640)
              </div>
            </div>
          )}
        </Card>
      </RevealOnScroll>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BOTTOM TIPS — helpful guidance for new users                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <RevealOnScroll delay={0}>
        <Card className="p-6 bg-slate-50 dark:bg-bg-base border border-slate-200 dark:border-border-subtle">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Tips for Getting the Most Out of Your Dashboard
              </h4>
              <ul className="text-xs text-slate-600 dark:text-gray-400 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span><strong>Connect more platforms</strong> — the more accounts you link, the more complete your verified activity picture becomes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span><strong>Hover over heatmap cells</strong> — each square shows the exact number of activities for that day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span><strong>Switch between views</strong> — try "Weekly Trends" to see your progress over time, or "Live Activity Feed" for the latest updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  <span><strong>This data is cryptographically verified</strong> — every activity is sealed with SHA-256 proofs that recruiters and employers can trust.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </RevealOnScroll>

    </div>
  );
};
