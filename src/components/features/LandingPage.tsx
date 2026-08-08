import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Landing3DCanvas } from '../canvas/Landing3DCanvas';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Code, Award, CheckCircle2, Shield } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setSyncModalOpen } = useAppStore();

  return (
    <div className="space-y-12 py-4">

      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between mb-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 hover:opacity-80 transition group"
        >
          <img
            src="/logo.png"
            alt="SkillPassport AI Logo"
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-blue-600/30 border border-blue-500/30 group-hover:scale-105 transition-transform duration-200"
          />
          <div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              SkillPassport <span className="text-blue-600 dark:text-blue-500">AI</span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">One Identity. Endless Opportunities.</p>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('login')}
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className="px-4 py-2 text-sm font-bold text-slate-900 dark:text-white rounded-xl transition"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
          >
            Get Started
          </button>
        </div>
      </nav>
      
      {/* 3D WebGL Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Hero Content */}
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SkillPassport AI — Next.js 15 TRD Engine</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Verified Work Replaces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500">
              Traditional Resumes.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl">
            SkillPassport AI builds the trusted digital identity and infrastructure for technical talent, connecting developers, companies, universities, and investors through zero-knowledge proof verification.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="purple" size="lg" onClick={() => setActiveTab('profile')}>
              <span>Explore Passport Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button variant="secondary" size="lg" onClick={() => setSyncModalOpen(true)}>
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
              Sync 10 Platforms
            </Button>
          </div>

          {/* Social Proof Pills */}
          <div className="pt-4 border-t border-slate-200 dark:border-border-subtle flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-gray-400 font-mono">
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" /> 10 Connected Services</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-purple-600 mr-1.5" /> Zero-Knowledge SHA Seals</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-500 mr-1.5" /> 42ms Response Latency</span>
          </div>
        </div>

        {/* Right 3D WebGL Canvas Card */}
        <Card className="relative overflow-hidden p-2 min-h-[420px] flex items-center justify-center border-slate-200 dark:border-border-default shadow-2xl">
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="emerald">Live WebGL 3D Node Mesh</Badge>
          </div>
          <Landing3DCanvas />
        </Card>

      </div>

      {/* TRD 5 Core Investor Demo Feature Cards Grid */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            5 Core Investor Demo Modules
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            Architected according to strict TRD technical implementation standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable onClick={() => setActiveTab('profile')} className="p-6 space-y-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Module 2: 10-Platform Passport</h3>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              52-week green activity heatmap aggregating GitHub, GitLab, LeetCode, HackerRank, Codeforces, and Kaggle.
            </p>
            <span className="text-xs font-semibold text-purple-600 hover:underline">Explore Passport &rarr;</span>
          </Card>

          <Card hoverable onClick={() => setActiveTab('repos')} className="p-6 space-y-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Module 3: Code Telemetry Vault</h3>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              Empirical runtime telemetry displaying 42ms response latency, CI build runners, and cryptographic SHA seals.
            </p>
            <span className="text-xs font-semibold text-emerald-600 hover:underline">Inspect Telemetry &rarr;</span>
          </Card>

          <Card hoverable onClick={() => setActiveTab('recruiter')} className="p-6 space-y-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Module 4: Recruiter Sourcing Portal</h3>
            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
              Zero-resume evidence hiring pipeline with candidate comparison matrix and direct interview scheduling.
            </p>
            <span className="text-xs font-semibold text-amber-600 hover:underline">Open Portal &rarr;</span>
          </Card>
        </div>
      </div>

    </div>
  );
};
