import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { 
  Flame, 
  Trophy, 
  CalendarCheck, 
  Sparkles, 
  Github, 
  Gitlab, 
  Code, 
  Terminal, 
  GraduationCap, 
  BarChart2, 
  Layers, 
  Zap, 
  TrendingUp 
} from 'lucide-react';

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

export const ContributionMatrix: React.FC = () => {
  const { profile, addToast } = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('heatmap');

  // Active metric state per platform
  const [ghMetric, setGhMetric] = useState<MetricType>('commits');
  const [glMetric, setGlMetric] = useState<MetricType>('mrs');
  const [lcMetric, setLcMetric] = useState<MetricType>('solved');
  const [hrMetric, setHrMetric] = useState<MetricType>('contests');

  const weeks = Array.from({ length: 52 });
  const daysPerWeek = 7;

  // Render a specific platform heat matrix grid with custom level colors
  const renderGrid = (levelClasses: PlatformMatrixConfig['levelClasses'], seedOffset: number) => (
    <div className="flex space-x-1.5 min-w-[850px]">
      {weeks.map((_, wIndex) => (
        <div key={wIndex} className="flex flex-col space-y-1.5">
          {Array.from({ length: daysPerWeek }).map((_, dIndex) => {
            const seed = (wIndex * 7 + dIndex + seedOffset) % 13;
            let lvl = levelClasses.lvl0;
            if (seed === 2 || seed === 3) lvl = levelClasses.lvl1;
            if (seed === 5 || seed === 7) lvl = levelClasses.lvl2;
            if (seed === 8 || seed === 11) lvl = levelClasses.lvl3;
            if (seed === 12) lvl = levelClasses.lvl4;

            return (
              <div
                key={dIndex}
                className={`w-3 h-3 rounded-[3px] transition-transform duration-150 hover:scale-125 cursor-pointer ${lvl}`}
                title={`Week ${wIndex + 1}, Day ${dIndex + 1}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      
      {/* Page Header & View Toggle Toolbar */}
      <Card className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
                <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
                Multi-Platform Contribution Matrices
              </h2>
              <Badge variant="purple">10-Service Live Data Feeds</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              Independent data matrices populated with live telemetry for each connected developer platform
            </p>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
            <button
              onClick={() => {
                setViewMode('heatmap');
                addToast('Switched to 52-Week Matrix Heatmap View', 'info');
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-lg transition ${
                viewMode === 'heatmap'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 mr-1.5" />
              Matrix Heatmaps
            </button>

            <button
              onClick={() => {
                setViewMode('velocity');
                addToast('Switched to Weekly Velocity Breakdown View', 'info');
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-lg transition ${
                viewMode === 'velocity'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
              Velocity Trends
            </button>

            <button
              onClick={() => {
                setViewMode('telemetry');
                addToast('Switched to Live Telemetry Stream View', 'info');
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-lg transition ${
                viewMode === 'telemetry'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Live Telemetry
            </button>
          </div>
        </div>

        {/* Aggregate Summary Analytics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Active Streak</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">21 Consecutive Days</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Peak Activity: 18 Commits/Day</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Longest Streak</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">48 Days</div>
              <div className="text-[10px] text-amber-600 font-semibold mt-0.5">May 2025 - July 2025</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-md shadow-purple-600/20">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Total Active Days</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">294 / 365 Days</div>
              <div className="text-[10px] text-purple-600 font-semibold mt-0.5">80.5% Annual Consistency</div>
            </div>
          </div>
        </div>
      </Card>

      {/* MATRIX SECTION 1: GITHUB PLATFORM MATRIX */}
      <Card className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600">
              <Github className="w-5 h-5 text-slate-900 dark:text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center">
                GitHub Contribution &amp; Code Review Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">github.com/rahulsharma • 840 Verified Contributions</p>
            </div>
          </div>

          {/* Metric Swap Selector */}
          <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
            {[
              { id: 'commits' as MetricType, label: 'Commits (840)' },
              { id: 'prs' as MetricType, label: 'Pull Requests (142)' },
              { id: 'pipelines' as MetricType, label: 'Code Reviews (96)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setGhMetric(m.id);
                  addToast(`Swapped GitHub Matrix to ${m.label}`, 'success');
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

        {/* Matrix View Render */}
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
              1
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
              <span>Displaying GitHub {ghMetric.toUpperCase()} matrix telemetry</span>
              <span className="text-emerald-600 font-semibold">Peak Day: 24 Commits on Nov 14</span>
            </div>
          </div>
        )}

        {viewMode === 'velocity' && (
          <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle space-y-3 text-xs">
            <div className="font-bold text-slate-900 dark:text-white">GitHub Weekly Commit Velocity</div>
            <ProgressBar progress={84} color="emerald" />
            <div className="flex justify-between text-slate-500 font-mono">
              <span>Q1: 180 Commits</span>
              <span>Q2: 240 Commits</span>
              <span>Q3: 210 Commits</span>
              <span>Q4: 210 Commits</span>
            </div>
          </div>
        )}

        {viewMode === 'telemetry' && (
          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle text-xs font-mono space-y-2">
            <div className="text-emerald-600 font-bold">🟢 Live GitHub Stream Telemetry</div>
            <div className="text-slate-600 dark:text-gray-300">Latest Commit SHA: <span className="text-purple-600">e89f412a</span> — "feat(auth): add zero-knowledge proof verification route"</div>
          </div>
        )}
      </Card>

      {/* MATRIX SECTION 2: GITLAB PIPELINE MATRIX */}
      <Card className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/40 flex items-center justify-center text-orange-500">
              <Gitlab className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center">
                GitLab Merge Request &amp; CI/CD Runner Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">gitlab.com/rahul_dev • 412 Verified MRs &amp; Pipeline Runs</p>
            </div>
          </div>

          {/* Metric Swap Selector */}
          <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
            {[
              { id: 'mrs' as MetricType, label: 'Merge Requests (412)' },
              { id: 'pipelines' as MetricType, label: 'CI Builds (312)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setGlMetric(m.id);
                  addToast(`Swapped GitLab Matrix to ${m.label}`, 'success');
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

        {/* Matrix View Render */}
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
            3
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
            <span>Displaying GitLab {glMetric.toUpperCase()} matrix telemetry</span>
            <span className="text-orange-500 font-semibold">Runner Pipeline Build Success: 99.1%</span>
          </div>
        </div>
      </Card>

      {/* MATRIX SECTION 3: LEETCODE ALGORITHMIC MATRIX */}
      <Card className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-amber-500">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center">
                LeetCode Algorithmic Submission Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">leetcode.com/rahul_coder • 264 Solved / 1,942 Knight Rating</p>
            </div>
          </div>

          {/* Metric Swap Selector */}
          <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
            {[
              { id: 'solved' as MetricType, label: 'Accepted Problems (264)' },
              { id: 'contests' as MetricType, label: 'Contest Rounds (48)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setLcMetric(m.id);
                  addToast(`Swapped LeetCode Matrix to ${m.label}`, 'success');
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

        {/* Matrix View Render */}
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
            7
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
            <span>Displaying LeetCode {lcMetric.toUpperCase()} matrix telemetry</span>
            <span className="text-amber-500 font-semibold">Global Percentile: Top 3.8%</span>
          </div>
        </div>
      </Card>

      {/* MATRIX SECTION 4: HACKERRANK & CODEFORCES COMBINED MATRIX */}
      <Card className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 flex items-center justify-center text-purple-600">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center">
                HackerRank &amp; Codeforces Contest Activity Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">hackerrank.com &amp; codeforces.com • 243 Contest Solves</p>
            </div>
          </div>

          <Badge variant="purple">6 Star HackerRank Problem Solver</Badge>
        </div>

        {/* Matrix View Render */}
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
            9
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-border-subtle text-xs text-slate-500 dark:text-gray-400 font-mono">
            <span>Displaying HackerRank + Codeforces combined matrix telemetry</span>
            <span className="text-purple-600 font-semibold">Specialist Rating: 1,640</span>
          </div>
        </div>
      </Card>

    </div>
  );
};
