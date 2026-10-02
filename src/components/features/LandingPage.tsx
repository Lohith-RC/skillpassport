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
  Award,
  CheckCircle2,
  Fingerprint,
  Link2,
  Globe,
  ChevronRight,
  Copy,
  Check,
  Sliders,
  Activity,
} from 'lucide-react';

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

export const LandingPage: React.FC = () => {
  const { setActiveTab, setSyncModalOpen, addToast } = useAppStore();

  // ── Scroll Reveal Hooks ──────────────────────────────────────────────────
  const statsReveal = useScrollReveal({ threshold: 0.2 });
  const how1Reveal = useScrollReveal({ delay: 0 });
  const how2Reveal = useScrollReveal({ delay: 120 });
  const how3Reveal = useScrollReveal({ delay: 240 });

  // ── Entrance Mount Animation ─────────────────────────────────────────────
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    const fallback = window.setTimeout(() => setMounted(true), 150);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(fallback);
    };
  }, []);

  // ── WebGL Detection ───────────────────────────────────────────────────────
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

  // ── INTERACTIVE WIDGET 1: Hero Identity Proof Simulator ────────────────────
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['github', 'leetcode', 'gitlab']);
  const [copiedSha, setCopiedSha] = useState(false);

  const platformScores: Record<string, { name: string; score: number; label: string }> = {
    github: { name: 'GitHub', score: 35, label: '840 Commits' },
    leetcode: { name: 'LeetCode', score: 28, label: '264 Solved' },
    gitlab: { name: 'GitLab', score: 18, label: '412 MRs' },
    kaggle: { name: 'Kaggle', score: 14, label: '340 Upvotes' },
  };

  const calculatedProofScore = selectedPlatforms.reduce((acc, id) => acc + (platformScores[id]?.score || 0), 0);
  const currentShaSeal = `SHA256:${selectedPlatforms.join('_')}_${calculatedProofScore}_8f92a1c4b789`;

  const togglePlatformInSimulator = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length === 1) {
        addToast('At least 1 platform must remain selected.', 'warning');
        return;
      }
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const copyShaToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentShaSeal);
    }
    setCopiedSha(true);
    addToast('Zero-Knowledge SHA-256 seal copied to clipboard!', 'success');
    setTimeout(() => setCopiedSha(false), 2000);
  };

  // ── INTERACTIVE WIDGET 2: Core Feature Showcase Tab Switcher ───────────────
  const [activeFeatureTab, setActiveFeatureTab] = useState<'proof' | 'zk' | 'recruiter' | 'academic'>('proof');

  const heroAnim = (delayMs: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`.replace('duration-700', `duration-700 delay-[${delayMs}ms]`);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black font-sans">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PURE MONOCHROME BLACK NAVIGATION HEADER                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/95 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 hover:opacity-90 transition group"
            aria-label="Go to dashboard"
          >
            <img
              src="/logo.png"
              alt="SkillPassport AI Logo"
              className="w-9 h-9 rounded-xl object-cover shadow-md border border-zinc-700 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="hidden sm:block text-left">
              <span className="font-extrabold text-sm text-white tracking-tight">
                SkillPassport <span className="text-zinc-400">AI</span>
              </span>
              <p className="text-[10px] text-zinc-400 font-mono leading-none">
                Verified Identity Protocol
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('login')}
              className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
            >
              Sign In
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('signup')}
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION — STARK MONOCHROME BLACK & WHITE                      */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* ── Left: Hero Content ────────────────────────────────────────── */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">

              {/* Badge */}
              <div className={heroAnim(0)}>
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-zinc-900 text-white border border-zinc-700 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Monochrome Zero-Knowledge Proof Protocol</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className={heroAnim(100)}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.1]">
                  Verified Work Replaces
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] mt-1 text-zinc-300">
                  Traditional Resumes.
                </span>
              </h1>

              <p className={`text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0 ${heroAnim(200)}`}>
                SkillPassport AI aggregates live commit telemetry, algorithmic contest benchmarks,
                and academic seals into a single tamper-proof cryptographic developer passport.
              </p>

              {/* INTERACTIVE HERO PROOF SIMULATOR WIDGET (MONOCHROME) */}
              <div className={`p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-4 text-left ${heroAnim(250)}`}>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center">
                    <Sliders className="w-3.5 h-3.5 text-white mr-2" />
                    Interactive Proof Score Simulator (Toggle platforms)
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                    {calculatedProofScore}% Proof Score
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(platformScores).map(([key, data]) => {
                    const isSelected = selectedPlatforms.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => togglePlatformInSimulator(key)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-white text-black font-bold border-white shadow-sm'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span>{data.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                        </div>
                        <div className="text-[10px] font-mono opacity-80 mt-1">{data.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* SHA Seal Copy Line */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black border border-zinc-800 font-mono text-[11px]">
                  <span className="text-zinc-400 truncate mr-2">{currentShaSeal}</span>
                  <button
                    onClick={copyShaToClipboard}
                    className="px-3 py-1 rounded-lg bg-white hover:bg-zinc-200 text-black font-sans text-xs font-bold flex items-center shrink-0 transition"
                  >
                    {copiedSha ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copiedSha ? 'Copied' : 'Copy Seal'}
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-4 justify-center lg:justify-start ${heroAnim(300)}`}>
                <Button variant="primary" size="lg" onClick={() => setActiveTab('profile')}>
                  Explore Passport Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => setSyncModalOpen(true)}>
                  <ShieldCheck className="w-4 h-4 mr-2 text-white" />
                  Sync 10 Platforms
                </Button>
              </div>

              {/* Social Proof Pills */}
              <div className={`pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-400 font-mono ${heroAnim(400)}`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  10 Connected Services
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Zero-Knowledge SHA Seals
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  42ms Response Latency
                </span>
              </div>
            </div>

            {/* ── Right: 3D Interactive WebGL Mesh Scene ───────────────────────── */}
            <div
              className={`relative transition-all duration-1000 ease-out ${
                mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: mounted ? '300ms' : '0ms' }}
            >
              {webglOk ? (
                <CanvasErrorBoundary
                  fallback={
                    <div className="min-h-[380px] md:min-h-[440px] flex items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 p-8">
                      <p className="text-sm font-semibold text-white">Interactive 3D Experience</p>
                    </div>
                  }
                >
                  <Card className="relative overflow-hidden p-2 min-h-[380px] md:min-h-[440px] flex items-center justify-center bg-zinc-950 border-zinc-800 shadow-2xl">
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                      <Badge variant="blue">Live WebGL 3D Node Mesh</Badge>
                      <span className="text-[10px] font-mono text-white bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        Mouse Reactive
                      </span>
                    </div>
                    <Landing3DCanvas />
                  </Card>
                </CanvasErrorBoundary>
              ) : (
                <div className="min-h-[380px] md:min-h-[440px] flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800">
                  <Badge variant="neutral">WebGL Required</Badge>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* STATS STRIP                                                        */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={statsReveal}
          className="relative py-8 sm:py-12 border-y border-zinc-800 bg-zinc-950"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: '10K+', label: 'Verified Developers' },
                { value: '42ms', label: 'Avg. Verification' },
                { value: '10', label: 'Platform Integrations' },
                { value: '99.9%', label: 'Uptime SLA' },
              ].map((stat) => (
                <div key={stat.label} className="text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* INTERACTIVE FEATURE SHOWCASE TAB STRIP (MONOCHROME)                 */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <RevealDiv className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Interactive Feature Inspector
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto">
              Select a module below to preview live telemetry data and zero-knowledge seals
            </p>
          </RevealDiv>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 text-xs font-semibold gap-1">
              {[
                { id: 'proof', label: '⚡ Proof Engine' },
                { id: 'zk', label: '🛡️ ZK SHA Seals' },
                { id: 'recruiter', label: '👥 Talent Sourcing' },
                { id: 'academic', label: '🎓 Academic Registries' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    activeFeatureTab === tab.id
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display Card */}
          <Card className="p-6 sm:p-8 bg-zinc-950 border-zinc-800 space-y-6">
            {activeFeatureTab === 'proof' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <Badge variant="blue">Live Commit Telemetry</Badge>
                  <h3 className="text-xl font-bold text-white">Automated Cross-Platform Aggregation</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    SkillPassport continuously polls connected platform webhooks to compile a 52-week activity graph. Every commit, pull request, and contest round is verified.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('heatmap')}>
                    View Contribution Heatmap &rarr;
                  </Button>
                </div>
                <div className="p-4 bg-black rounded-xl border border-zinc-800 font-mono text-xs space-y-2 text-zinc-300">
                  <div className="text-white font-bold">// Live Telemetry Payload</div>
                  <div>&#123; "user": "rahul.sharma", "proofScore": 88, "platforms": 10 &#125;</div>
                  <div className="text-zinc-400 font-bold">// 52-Week Heatmap: 840 Verified Commits</div>
                  <div className="text-white">// Status: 200 OK (Latency 42ms)</div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'zk' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <Badge variant="blue">Cryptographic Integrity</Badge>
                  <h3 className="text-xl font-bold text-white">Zero-Knowledge Identity Seals</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Share your verified skill score without revealing raw source code or private company repos. Every seal is SHA-256 signed.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('timecapsule')}>
                    Explore Time Capsule Seals &rarr;
                  </Button>
                </div>
                <div className="p-4 bg-black rounded-xl border border-zinc-800 font-mono text-xs space-y-2">
                  <div className="text-white">SHA256: 8f92a1c4b78912e...e45a901</div>
                  <div className="text-zinc-400">Issuer: VTU Registrar &amp; Acme Corp CTO</div>
                  <div className="text-white font-bold">Status: VERIFIED &amp; UNTAMPERED</div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'recruiter' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <Badge variant="blue">Zero-Resume Evidence Hiring</Badge>
                  <h3 className="text-xl font-bold text-white">Enterprise Talent Sourcing Portal</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Search developers by verified proof score, live production apps, and institutional seals with 2-candidate side-by-side comparisons.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('recruiter')}>
                    Open Recruiter Pipeline &rarr;
                  </Button>
                </div>
                <div className="p-4 bg-black rounded-xl border border-zinc-800 text-xs space-y-2">
                  <div className="font-bold text-white flex justify-between">
                    <span>Ananya Gupta (96% Proof Score)</span>
                    <span className="text-zinc-300 font-mono">PLATINUM</span>
                  </div>
                  <div className="text-zinc-400 text-[11px]">Verified Skills: PyTorch, Rust, vLLM, CUDA</div>
                  <div className="text-white font-mono text-[11px]">22 Live Production Deployed Apps</div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'academic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <Badge variant="blue">Institutional Trust</Badge>
                  <h3 className="text-xl font-bold text-white">University Registrar Verifications</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Official digital degree transcript seals verified with CGPA ratings directly from university registrars.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('university')}>
                    View University Hub &rarr;
                  </Button>
                </div>
                <div className="p-4 bg-black rounded-xl border border-zinc-800 text-xs space-y-2 font-mono">
                  <div className="text-white font-bold">VTU Academic Registrar Seal</div>
                  <div className="text-zinc-300">Degree: Computer Science (9.42 CGPA)</div>
                  <div className="text-white">Cryptographically Signed &amp; Timestamped</div>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* HOW IT WORKS 3-STEP PROCESS                                        */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <RevealDiv className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              3 Steps to a Portable Identity
            </h2>
          </RevealDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div ref={how1Reveal}>
              <Card
                hoverable
                onClick={() => setSyncModalOpen(true)}
                className="p-6 sm:p-8 space-y-4 h-full bg-zinc-950 border-zinc-800 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white border border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Link2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-white text-base sm:text-lg">01. Connect Platforms</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Link GitHub, LeetCode, GitLab, Kaggle, and 6 more platforms to aggregate your activity trail.
                </p>
              </Card>
            </div>

            <div ref={how2Reveal}>
              <Card
                hoverable
                onClick={() => setActiveTab('repos')}
                className="p-6 sm:p-8 space-y-4 h-full bg-zinc-950 border-zinc-800 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white border border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Fingerprint className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-white text-base sm:text-lg">02. Generate SHA Seals</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  SHA-256 verification engine creates cryptographic proof seals for all your repositories and achievements.
                </p>
              </Card>
            </div>

            <div ref={how3Reveal}>
              <Card
                hoverable
                onClick={() => setActiveTab('recruiter')}
                className="p-6 sm:p-8 space-y-4 h-full bg-zinc-950 border-zinc-800 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white border border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-white text-base sm:text-lg">03. Share Verified Identity</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Present your tamper-proof SkillPassport to recruiters, universities, and investors — zero resume needed.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM CALL TO ACTION BANNER                                       */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Card className="p-8 sm:p-12 bg-zinc-950 border-zinc-800 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Claim Your Verified Passport?
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Join 10,000+ developers replacing traditional resumes with cryptographic proof.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary" size="lg" onClick={() => setActiveTab('signup')}>
                Create Free Account &rarr;
              </Button>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;
