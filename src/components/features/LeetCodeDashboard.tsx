import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { fetchLeetCodeStats } from '../../services/api';
import { LeetCodeStats } from '../../types';
import { Code, Trophy, Award, Zap } from 'lucide-react';

export const LeetCodeDashboard: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    fetchLeetCodeStats().then(setStats);
  }, []);

  if (!stats) return <div className="text-sm text-slate-500 dark:text-gray-400">Loading LeetCode Telemetry...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column Score Card */}
      <Card className="space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-xl text-amber-600">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">LeetCode Performance</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">leetcode.com/rahul_coder</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle text-center space-y-4">
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {stats.solved.total} / {stats.targets.total}
          </div>
          <div className="text-xs text-slate-500 dark:text-gray-400">Total Solved Problems</div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-600 dark:text-emerald-400">Easy ({stats.solved.easy} / {stats.targets.easy})</span>
                <span className="text-slate-500 dark:text-gray-400 font-mono">78.8%</span>
              </div>
              <ProgressBar progress={78.8} color="emerald" height="sm" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-amber-600 dark:text-amber-400">Medium ({stats.solved.medium} / {stats.targets.medium})</span>
                <span className="text-slate-500 dark:text-gray-400 font-mono">81.6%</span>
              </div>
              <ProgressBar progress={81.6} color="amber" height="sm" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-red-500">Hard ({stats.solved.hard} / {stats.targets.hard})</span>
                <span className="text-slate-500 dark:text-gray-400 font-mono">60.0%</span>
              </div>
              <ProgressBar progress={60} color="amber" height="sm" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between">
          <div>
            <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold">LeetCode Contest Rating</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {stats.contestRating} <span className="text-xs font-sans text-slate-500 dark:text-gray-400">({stats.badgeName})</span>
            </div>
          </div>
          <Badge variant="amber">{stats.contestPercentile}</Badge>
        </div>
      </Card>

      {/* Right Column Algorithmic Breakdown */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Topic Mastery Radar */}
        <Card className="space-y-4 border-slate-200 dark:border-border-default">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
              <Award className="w-4 h-4 text-amber-500 mr-2" />
              Algorithmic Topic Mastery Breakdown
            </h3>
            <Badge variant="emerald">Seeded Benchmark Verified</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.topics.map((t) => (
              <div key={t.name} className="p-3 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center space-y-1">
                <div className="text-xs text-slate-500 dark:text-gray-400">{t.name}</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">{t.score}%</div>
                <ProgressBar progress={t.score} color="purple" height="sm" />
              </div>
            ))}
          </div>
        </Card>

        {/* Seeded Recent Submissions Table */}
        <Card className="space-y-4 border-slate-200 dark:border-border-default">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
            <Zap className="w-4 h-4 text-emerald-500 mr-2" />
            Recent Accepted Submissions Log
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-border-subtle text-slate-500 dark:text-gray-400">
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Difficulty</th>
                  <th className="pb-3 font-semibold">Language</th>
                  <th className="pb-3 font-semibold">Runtime Performance</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-border-subtle/50 text-slate-700 dark:text-gray-300">
                {stats.recentSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="py-3 font-sans font-medium text-slate-900 dark:text-white">{sub.title}</td>
                    <td className="py-3">
                      <span className={sub.difficulty === 'Hard' ? 'text-red-500 font-bold' : 'text-amber-600 font-bold'}>
                        {sub.difficulty}
                      </span>
                    </td>
                    <td className="py-3">{sub.language}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">{sub.runtime}</td>
                    <td className="py-3 text-slate-500">{sub.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
};
