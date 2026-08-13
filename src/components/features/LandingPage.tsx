import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Landing3DCanvas } from '../canvas/Landing3DCanvas';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code,
  Award,
  CheckCircle2,
  Shield,
  Fingerprint,
  Link2,
  Lock,
  Globe,
  ChevronRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
 * RevealDiv — lightweight wrapper that applies scroll-reveal to its children
 * ═══════════════════════════════════════════════════════════════════════════ */
const RevealDiv: React.FC<{
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}> = ({ children, delay = 0, threshold, className = '' }) => {
  const ref = useScrollReveal({ delay, ...(threshold !== undefined ? { threshold } : {}) });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
 * CanvasErrorBoundary — catches WebGL / render failures in the 3D canvas
 * ═══════════════════════════════════════════════════════════════════════════ */
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn('[LandingPage] 3D Canvas error:', error.message);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
 * LandingPage — Immersive, scroll-driven, 3D-oriented landing experience
 * ═══════════════════════════════════════════════════════════════════════════ */
export const LandingPage: React.FC = () => {
  const { setActiveTab, setSyncModalOpen } = useAppStore();

  // ── Scroll Reveal Refs (each call is a separate hook — Rules of Hooks) ──
  const statsReveal = useScrollReveal({ threshold: 0.2 });
  const how1Reveal = useScrollReveal({ delay: 0 });
  const how2Reveal = useScrollReveal({ delay: 120 });
  const how3Reveal = useScrollReveal({ delay: 240 });
  const mod1Reveal = useScrollReveal({ delay: 0 });
  const mod2Reveal = useScrollReveal({ delay: 100 });
  const mod3Reveal = useScrollReveal({ delay: 200 });
  const trustReveal = useScrollReveal({ threshold: 0.12 });
  const ctaReveal = useScrollReveal({ threshold: 0.2 });

  // ── Mount-triggered hero entrance animation ─────────────────────────────
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ── WebGL support detection (graceful fallback) ─────────────────────────
  const [webglOk, setWebglOk] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  /* ── Shared animation class builder ──────────────────────────────────── */
  const heroAnim = (delayMs: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`.replace('duration-700', `duration-700 delay-[${delayMs}ms]`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070A11] overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Ambient Depth — fixed gradient orbs for atmospheric layering        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] dark:bg-purple-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] dark:bg-blue-500/[0.04] blur-[80px]" />
      </div>

      <div className="relative z-10">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* NAVIGATION BAR — glassmorphic sticky nav                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#070A11]/80 border-b border-slate-200/50 dark:border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 hover:opacity-80 transition group"
              aria-label="Go to dashboard"
            >
              <img
                src="/logo.png"
                alt="SkillPassport AI Logo"
                className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-blue-600/20 border border-blue-500/20 group-hover:scale-105 transition-transform duration-200"
              />
              <div className="hidden sm:block">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  SkillPassport <span className="text-blue-600 dark:text-blue-500">AI</span>
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                  One Identity. Endless Opportunities.
                </p>
              </div>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveTab('login')}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION — staggered mount entrance + 3D canvas                */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* ── Left: Hero Text Content ──────────────────────────────── */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">

              {/* Badge */}
              <div className={heroAnim(0)}>
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>SkillPassport AI — Interactive Product Demo</span>
                </div>
              </div>

              {/* Heading */}
              <h1 className={heroAnim(100)}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  Verified Work Replaces
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] mt-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500">
                  Traditional Resumes.
                </span>
              </h1>

              {/* Subheading */}
              <p className={`text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 ${heroAnim(200)}`}>
                SkillPassport AI builds the trusted digital identity and infrastructure
                for technical talent, connecting developers, companies, universities,
                and investors through zero-knowledge proof verification.
              </p>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 justify-center lg:justify-start ${heroAnim(300)}`}>
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
              <div className={`pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-gray-400 font-mono ${heroAnim(400)}`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  10 Connected Services
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  Zero-Knowledge SHA Seals
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  42ms Response Latency
                </span>
              </div>
            </div>

            {/* ── Right: 3D WebGL Canvas with Error Boundary ────────────── */}
            <div
              className={`relative transition-all duration-1000 ease-out ${
                mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: mounted ? '300ms' : '0ms' }}
            >
              {webglOk ? (
                <CanvasErrorBoundary
                  fallback={
                    <div className="min-h-[380px] md:min-h-[440px] flex items-center justify-center glass-card rounded-2xl border border-border-default">
                      <div className="text-center space-y-3 p-8">
                        <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center mx-auto">
                          <Sparkles className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Interactive 3D Experience
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Enable WebGL for the full immersive demo
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Card className="relative overflow-hidden p-2 min-h-[380px] md:min-h-[440px] flex items-center justify-center border-slate-200 dark:border-border-default shadow-2xl shadow-purple-600/5 dark:shadow-purple-600/10">
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="emerald">Live WebGL 3D Node Mesh</Badge>
                    </div>
                    <Landing3DCanvas />
                  </Card>
                </CanvasErrorBoundary>
              ) : (
                /* WebGL not supported — static fallback */
                <div className="min-h-[380px] md:min-h-[440px] flex items-center justify-center glass-card rounded-2xl border border-border-default">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center mx-auto animate-float">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      3D Interactive Demo
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Enable hardware acceleration and WebGL in your browser for the full immersive experience.
                    </p>
                    <Badge variant="purple">WebGL Required</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SOCIAL PROOF STATS BAR — scroll-revealed                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={statsReveal}
          className="relative py-8 sm:py-12 border-y border-slate-200/50 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: '10K+', label: 'Verified Developers', color: 'text-purple-600 dark:text-purple-400' },
                { value: '42ms', label: 'Avg. Verification', color: 'text-emerald-600 dark:text-emerald-400' },
                { value: '10', label: 'Platform Integrations', color: 'text-blue-600 dark:text-blue-400' },
                { value: '99.9%', label: 'Uptime SLA', color: 'text-amber-600 dark:text-amber-400' },
              ].map((stat) => (
                <div key={stat.label} className="text-center space-y-1">
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HOW IT WORKS — 3-step process with staggered scroll reveal         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <RevealDiv className="text-center space-y-3 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How SkillPassport Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 max-w-lg mx-auto">
              Three steps to a verified, portable professional identity
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div ref={how1Reveal}>
              <Card hoverable className="p-6 sm:p-8 space-y-4 h-full relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-6xl font-extrabold text-slate-100 dark:text-white/[0.03] select-none pointer-events-none">
                  01
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Link2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Connect Your Platforms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  Link GitHub, LeetCode, Kaggle, and 7 more coding platforms to
                  aggregate your verified activity trail.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </div>

            {/* Step 2 */}
            <div ref={how2Reveal}>
              <Card hoverable className="p-6 sm:p-8 space-y-4 h-full relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-6xl font-extrabold text-slate-100 dark:text-white/[0.03] select-none pointer-events-none">
                  02
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Fingerprint className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Generate Zero-Knowledge Proof
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  Our SHA-256 verification engine creates cryptographic seals of your
                  skills, contributions, and achievements.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </div>

            {/* Step 3 */}
            <div ref={how3Reveal}>
              <Card hoverable className="p-6 sm:p-8 space-y-4 h-full relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-6xl font-extrabold text-slate-100 dark:text-white/[0.03] select-none pointer-events-none">
                  03
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Share Verified Identity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  Present your tamper-proof SkillPassport to recruiters, universities,
                  and investors — no resume needed.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* CORE PRODUCT MODULES — staggered scroll reveal                      */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <RevealDiv className="text-center space-y-3 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Core Product Modules
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 max-w-lg mx-auto">
              Explore the verified-talent identity stack — click any module to jump in
            </p>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Module 1 */}
            <div ref={mod1Reveal}>
              <Card
                hoverable
                onClick={() => setActiveTab('profile')}
                className="p-6 sm:p-8 space-y-4 cursor-pointer h-full group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Module 1: 10-Platform Passport
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  52-week green activity heatmap aggregating GitHub, GitLab, LeetCode,
                  HackerRank, Codeforces, and Kaggle.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
                  Explore Passport <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </div>

            {/* Module 2 */}
            <div ref={mod2Reveal}>
              <Card
                hoverable
                onClick={() => setActiveTab('repos')}
                className="p-6 sm:p-8 space-y-4 cursor-pointer h-full group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Module 2: Code Telemetry Vault
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  Empirical runtime telemetry displaying 42ms response latency, CI build
                  runners, and cryptographic SHA seals.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Inspect Telemetry <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </div>

            {/* Module 3 */}
            <div ref={mod3Reveal}>
              <Card
                hoverable
                onClick={() => setActiveTab('recruiter')}
                className="p-6 sm:p-8 space-y-4 cursor-pointer h-full group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Module 3: Recruiter Sourcing Portal
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  Zero-resume evidence hiring pipeline with candidate comparison matrix
                  and direct interview scheduling.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  Open Portal <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* TRUST & SECURITY — depth-stacked card layout                        */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section ref={trustReveal} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          {/* Subtle gradient wash */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/[0.03] to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  Enterprise-Grade Security
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Your Skills,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    Cryptographically Sealed
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                  Every contribution, achievement, and skill verification is sealed with
                  SHA-256 cryptographic proofs. Tamper-proof, portable, and instantly
                  verifiable by any employer or institution.
                </p>
                <div className="space-y-3">
                  {[
                    'Zero-knowledge proofs preserve privacy while proving competence',
                    'Real-time verification — no manual resume review needed',
                    'Cross-platform aggregation from 10+ coding ecosystems',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Depth-stacked verification card */}
              <div className="relative">
                {/* Primary card */}
                <div className="relative z-10 glass-card rounded-2xl border border-slate-200 dark:border-border-default p-6 space-y-4 shadow-xl shadow-purple-600/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        SHA-256 Verification Seal
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        0x7f3a...e2d1
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Proofs Generated', value: '2,847' },
                      { label: 'Avg Latency', value: '42ms' },
                      { label: 'Success Rate', value: '99.9%' },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="p-3 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center"
                      >
                        <div className="text-[10px] text-slate-500">{m.label}</div>
                        <div className="text-base font-bold font-mono text-purple-600 dark:text-purple-400">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle">
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Runner Status</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          ACTIVE
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cluster</span>
                        <span>AWS ap-south-1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failures</span>
                        <span className="text-emerald-600 dark:text-emerald-400">0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Depth layers — stacked behind for 3D feel */}
                <div
                  className="absolute -bottom-3 left-4 right-4 h-full glass-card rounded-2xl border border-slate-200/30 dark:border-white/5 -z-10 opacity-50"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-6 left-8 right-8 h-full glass-card rounded-2xl border border-slate-200/20 dark:border-white/[0.03] -z-20 opacity-25"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FINAL CTA — gradient banner                                         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section ref={ctaReveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600" />
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative px-6 sm:px-12 py-12 sm:py-16 lg:py-20 text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Ready to Build Your Verified Identity?
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
                Join thousands of developers who replaced resumes with cryptographically
                verified proof of their skills and contributions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <button
                  onClick={() => setActiveTab('signup')}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-purple-700 bg-white rounded-xl shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Create Your SkillPassport
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all"
                >
                  Sign In to Dashboard
                </button>
              </div>
              <p className="text-[11px] text-white/50 font-mono pt-2">
                Free for developers · No credit card required · Enterprise plans available
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FOOTER                                                              */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <footer className="border-t border-slate-200/50 dark:border-white/[0.06] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="" className="w-5 h-5 rounded-lg" aria-hidden="true" />
              <span className="font-semibold">SkillPassport AI</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <span>v1.0.0</span>
              <span aria-hidden="true">·</span>
              <span>Built with zero-knowledge proofs</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
