import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { CheckCircle2, MapPin, GraduationCap, RefreshCw, Sparkles, Share2, Award, ShieldCheck, FileCheck, X, Key, Activity } from 'lucide-react';

export const PassportCard: React.FC = () => {
  const { profile, setActiveTab, setSyncModalOpen, addToast } = useAppStore();
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showSealModal, setShowSealModal] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Verified SkillPassport link copied to clipboard!', 'success');
  };

  const platformsList = Object.values(profile.platforms).filter(p => p.connected);

  return (
    <div className="space-y-6">
      {/* Hero Banner Profile Card with Light Theme & Purple Accent */}
      <Card className="relative overflow-hidden p-6 md:p-8 border-slate-200 dark:border-border-default">
        {/* Subtle Background Purple Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 p-1 shadow-xl shadow-purple-500/20">
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-bg-card flex items-center justify-center font-extrabold text-2xl text-slate-900 dark:text-white">
                  {profile.avatar}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-bg-card flex items-center justify-center text-[10px] text-white" title="Cryptographically Verified">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{profile.name}</h1>
                <Badge variant="emerald">Verified Engineer</Badge>
                <button onClick={() => setShowAuditModal(true)} className="cursor-pointer">
                  <Badge variant="purple">Gold Tier {profile.proofScore}% Audit &rarr;</Badge>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-medium">{profile.headline}</p>
              <p className="text-xs text-slate-500 dark:text-gray-400 flex items-center space-x-3 pt-1">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-purple-600" />{profile.location}</span>
                <span>•</span>
                <span className="flex items-center"><GraduationCap className="w-3.5 h-3.5 mr-1 text-emerald-600" />{profile.degree}</span>
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowSealModal(true)}>
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-500" />
              Verify SHA-256 Seal
            </Button>
            <Button variant="secondary" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1.5" />
              Share Passport
            </Button>
            <Button variant="purple" size="sm" onClick={() => setSyncModalOpen(true)}>
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Sync 10 Platforms ({platformsList.length}/10)
            </Button>
          </div>
        </div>

        {/* Connected 10 Platforms Handle Stream Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-border-subtle flex flex-wrap gap-2">
          {platformsList.map((platform) => (
            <div
              key={platform.id}
              onClick={() => setSyncModalOpen(true)}
              className="cursor-pointer flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle hover:border-purple-500 text-xs font-mono text-slate-700 dark:text-gray-200 transition"
            >
              <i className={platform.icon} style={{ color: platform.color }} />
              <span>{platform.handle}</span>
            </div>
          ))}
        </div>

        {/* Metric Cards Bar */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 dark:border-border-subtle pt-6">
          <div
            onClick={() => setActiveTab('heatmap')}
            className="cursor-pointer p-4 rounded-xl bg-slate-50 dark:bg-bg-base/60 border border-slate-200 dark:border-border-subtle hover:border-purple-500 transition"
          >
            <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Total Contributions</div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">{profile.totalContributions.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">10 Connected Platforms &rarr;</div>
          </div>

          <div
            onClick={() => setActiveTab('repos')}
            className="cursor-pointer p-4 rounded-xl bg-slate-50 dark:bg-bg-base/60 border border-slate-200 dark:border-border-subtle hover:border-purple-500 transition"
          >
            <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">CI/CD Pipelines Passed</div>
            <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">{profile.pipelinesPassed}</div>
            <div className="text-[10px] text-slate-500 dark:text-gray-400 mt-0.5">Runner Telemetry &rarr;</div>
          </div>

          <div
            onClick={() => setActiveTab('leetcode')}
            className="cursor-pointer p-4 rounded-xl bg-slate-50 dark:bg-bg-base/60 border border-slate-200 dark:border-border-subtle hover:border-amber-500 transition"
          >
            <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">LeetCode Solved</div>
            <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">{profile.leetcodeSolved}</div>
            <div className="text-[10px] text-amber-600 font-semibold mt-0.5">Top 3.8% Contest Rating &rarr;</div>
          </div>

          <div
            onClick={() => setShowAuditModal(true)}
            className="cursor-pointer p-4 rounded-xl bg-slate-50 dark:bg-bg-base/60 border border-slate-200 dark:border-border-subtle hover:border-emerald-500 transition"
          >
            <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">Proof of Skill Score</div>
            <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">{profile.proofScore}%</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Audit Breakdown &rarr;</div>
          </div>
        </div>
      </Card>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
                <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                Aggregated 10-Platform Contribution Stream
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400">GitHub, GitLab, LeetCode, HackerRank, Codeforces, Kaggle, Bitbucket</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('heatmap')}>
              View Full Matrix &rarr;
            </Button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-2">
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center justify-between">
              <span>🟢 Live 10-Platform Stream Active</span>
              <span>Updated 2m ago</span>
            </div>
            <ProgressBar progress={profile.proofScore} color="emerald" />
          </div>
        </Card>

        {/* Skill Stack Breakdown */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Verified Tech Stack</h3>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="space-y-3 text-xs font-semibold">
            <div>
              <div className="flex justify-between mb-1 text-slate-700 dark:text-gray-300"><span>TypeScript / Next.js 14</span><span className="text-purple-600 font-mono">42% (84 Repos)</span></div>
              <ProgressBar progress={42} color="purple" height="sm" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-slate-700 dark:text-gray-300"><span>Java / Spring Boot 3</span><span className="text-emerald-600 font-mono">30% (52 Repos)</span></div>
              <ProgressBar progress={30} color="emerald" height="sm" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-slate-700 dark:text-gray-300"><span>Go / Distributed Raft</span><span className="text-amber-600 font-mono">18% (28 Repos)</span></div>
              <ProgressBar progress={18} color="amber" height="sm" />
            </div>
          </div>
        </Card>
      </div>

      {/* Proof Score Audit Breakdown Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full rounded-2xl border border-slate-200 dark:border-border-default p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-border-subtle pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Proof of Skill Score Audit (88/100)</h3>
              </div>
              <button onClick={() => setShowAuditModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>1. Production CI/CD Telemetry (35 pts)</span>
                  <span className="text-emerald-600 font-mono">31/35 pts</span>
                </div>
                <p className="text-slate-500">312 green runner pipelines passed across GitHub Actions &amp; GitLab CI.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>2. Algorithmic Mastery (25 pts)</span>
                  <span className="text-amber-600 font-mono">22/25 pts</span>
                </div>
                <p className="text-slate-500">264 LeetCode solved (1,942 Knight Rating, top 3.8%).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>3. Multi-Platform Sync Stream (25 pts)</span>
                  <span className="text-purple-600 font-mono">23/25 pts</span>
                </div>
                <p className="text-slate-500">9 active platform integrations verified (GitHub, GitLab, LeetCode, etc.).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>4. Registrar Academic Verification (15 pts)</span>
                  <span className="text-blue-600 font-mono">12/15 pts</span>
                </div>
                <p className="text-slate-500">VTU 9.42 CGPA official university digital transcript seal.</p>
              </div>
            </div>

            <Button variant="purple" className="w-full" onClick={() => setShowAuditModal(false)}>
              Close Audit Report
            </Button>
          </div>
        </div>
      )}

      {/* SHA-256 Seal Verification Modal */}
      {showSealModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-2xl border border-slate-200 dark:border-border-default p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-border-subtle pb-3">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Cryptographic Proof Seal</h3>
              </div>
              <button onClick={() => setShowSealModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-100 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="text-slate-500 text-[10px]">ISSUER ASSIGNED ID</div>
                <div className="text-slate-900 dark:text-white font-bold">{profile.id}</div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="text-slate-500 text-[10px]">SHA-256 MERKLE PROOF ROOT</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold break-all">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>

              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-sans text-xs pt-1">
                <FileCheck className="w-4 h-4" />
                <span>Zero-Knowledge Proof verified against 10 platform webhooks.</span>
              </div>
            </div>

            <Button variant="purple" className="w-full" onClick={() => setShowSealModal(false)}>
              Dismiss Verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

