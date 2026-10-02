import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Landing3DCanvas } from '../canvas/Landing3DCanvas';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Link2, Fingerprint,
  Globe, Copy, Check, Sliders, Github, GraduationCap, Users, TrendingUp,
} from 'lucide-react';

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}> = ({ children, delay = 0, threshold, className = '' }) => {
  const ref = useScrollReveal({ delay, ...(threshold !== undefined ? { threshold } : {}) });
  return <div ref={ref} className={className}>{children}</div>;
};

/** The 3D canvas is the one place allowed to fail — WebGL may be absent. */
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

const FeatureCopy: Record<'proof' | 'zk' | 'recruiter' | 'academic', {
  badge: string; title: string; body: string; cta: string; to: string; code: string[];
}> = {
  proof: {
    badge: 'Live commit telemetry',
    title: 'Automated cross-platform aggregation',
    body: 'SkillPassport polls connected platform webhooks to compile a 52-week activity graph. Every commit, pull request and contest round is recorded against your identity.',
    cta: 'View contribution heatmap',
    to: 'heatmap',
    code: ['// Live telemetry payload', '{ "user": "you", "proofScore": 0, "platforms": 0 }', '// Status: awaiting first connection'],
  },
  zk: {
    badge: 'Cryptographic integrity',
    title: 'Tamper-evident seals',
    body: 'Share a verified score without exposing raw source or private repos. Every seal is a content hash that a recruiter can independently re-check.',
    cta: 'Explore time capsule seals',
    to: 'timecapsule',
    code: ['SHA256: 8f92a1c4b78912e...e45a901', 'Issuer: your connected platform', 'Status: awaiting first seal'],
  },
  recruiter: {
    badge: 'Evidence over résumés',
    title: 'Recruiter sourcing portal',
    body: 'Search developers by verified proof score, live production apps and institutional seals — with side-by-side candidate comparison.',
    cta: 'Open recruiter portal',
    to: 'recruiter',
    code: ['// Candidate match', '{ "proofScore": 96, "tier": "PLATINUM" }', '// 22 live deployed apps'],
  },
  academic: {
    badge: 'Institutional trust',
    title: 'University registrar verification',
    body: 'Degree and transcript attestations land directly from institutional registrars, timestamped against your passport.',
    cta: 'View certifications',
    to: 'university',
    code: ['// Registrar attestation', '{ "cgpa": 9.42, "status": "SIGNED" }', '// Cryptographically timestamped'],
  },
};

export const LandingPage: React.FC = () => {
  const { setActiveTab, setSyncModalOpen, addToast } = useAppStore();

  const statsReveal = useScrollReveal({ threshold: 0.2 });
  const how1Reveal = useScrollReveal({ delay: 0 });
  const how2Reveal = useScrollReveal({ delay: 120 });
  const how3Reveal = useScrollReveal({ delay: 240 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    const fallback = window.setTimeout(() => setMounted(true), 150);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(fallback);
    };
  }, []);

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

  /* ── Interactive proof-score simulator ───────────────────────────────── */
  const [selected, setSelected] = useState<string[]>(['github', 'leetcode', 'gitlab']);
  const [copied, setCopied] = useState(false);
  const [featureTab, setFeatureTab] = useState('proof');

  const platformScores: Record<string, { name: string; score: number; label: string }> = {
    github: { name: 'GitHub', score: 35, label: '840 commits' },
    leetcode: { name: 'LeetCode', score: 28, label: '264 solved' },
    gitlab: { name: 'GitLab', score: 18, label: '412 MRs' },
    kaggle: { name: 'Kaggle', score: 14, label: '340 upvotes' },
  };

  const proofScore = selected.reduce((acc, id) => acc + (platformScores[id]?.score || 0), 0);
  const seal = `SHA256:${selected.join('_')}_${proofScore}_8f92a1c4b789`;

  const togglePlatform = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length === 1) {
        addToast('At least one platform must stay selected.', 'warning');
        return;
      }
      setSelected(selected.filter((p) => p !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const copySeal = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(seal);
    setCopied(true);
    addToast('Seal copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const feature = FeatureCopy[featureTab as keyof typeof FeatureCopy];

  const fadeIn = (delayMs: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    } [transition-delay:${delayMs}ms]`;

  return (
    <div className="min-h-screen bg-canvas text-fg overflow-x-hidden font-sans">

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-header backdrop-blur-xl border-b border-hairline">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setActiveTab('dashboard')} className="flex items-center gap-2.5 group" aria-label="Go to dashboard">
            <img src="/logo.png" alt="" className="w-8 h-8 rounded-lg border border-hairline group-hover:scale-105 transition-transform duration-200" />
            <span className="text-left leading-tight">
              <span className="block text-sm font-bold tracking-tight">SkillPassport <span className="text-fg-muted font-medium">AI</span></span>
              <span className="block text-2xs text-fg-subtle">Verified Developer Identity</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('login')}>Sign in</Button>
            <Button variant="primary" size="sm" onClick={() => setActiveTab('signup')}>
              Get started <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative border-b border-hairline">
        <div className="absolute inset-0 blueprint-grid opacity-70 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            <div className="space-y-6 text-center lg:text-left">
              <div className={fadeIn(0)}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-hairline text-2xs font-medium text-fg-muted">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  Evidence-based developer identity
                </span>
              </div>

              <h1 className={`space-y-1 ${fadeIn(100)}`}>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">
                  Verified work replaces
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-fg-muted">
                  the traditional résumé.
                </span>
              </h1>

              <p className={`text-sm sm:text-base text-fg-muted leading-relaxed max-w-xl mx-auto lg:mx-0 ${fadeIn(200)}`}>
                Aggregate commit telemetry, contest results and academic attestations into a
                single passport a recruiter can verify in one click.
              </p>

              {/* Interactive proof-score simulator */}
              <div className={`panel p-4 sm:p-5 space-y-4 text-left ${fadeIn(250)}`}>
                <div className="flex items-center justify-between border-b border-hairline pb-3">
                  <span className="flex items-center gap-2 text-xs font-semibold">
                    <Sliders className="w-3.5 h-3.5 text-fg-muted" />
                    Proof score simulator
                  </span>
                  <span className="text-xs font-mono font-semibold tabular px-2 py-0.5 rounded-md bg-accent-soft text-accent">
                    {proofScore}% proof score
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(platformScores).map(([key, data]) => {
                    const on = selected.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => togglePlatform(key)}
                        aria-pressed={on}
                        className={`p-2.5 rounded-xl border text-left transition-colors duration-150 ${
                          on
                            ? 'bg-accent text-accent-fg border-transparent'
                            : 'bg-inset border-hairline text-fg-muted hover:text-fg hover:border-strong'
                        }`}
                      >
                        <span className="flex items-center justify-between text-[11px] font-semibold">
                          <span>{data.name}</span>
                          {on && <Check className="w-3 h-3" strokeWidth={3} />}
                        </span>
                        <span className={`block text-2xs font-mono mt-0.5 ${on ? 'opacity-80' : 'opacity-70'}`}>
                          {data.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-inset border border-hairline">
                  <code className="font-mono text-2xs text-fg-muted truncate">{seal}</code>
                  <button
                    onClick={copySeal}
                    className="px-2.5 py-1 rounded-lg bg-surface hover:bg-interactive border border-hairline text-2xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy seal'}
                  </button>
                </div>
              </div>

              <div className={`flex flex-wrap gap-3 justify-center lg:justify-start ${fadeIn(300)}`}>
                <Button variant="primary" size="lg" onClick={() => setActiveTab('signup')}>
                  Create your passport <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => setSyncModalOpen(true)}>
                  <ShieldCheck className="w-4 h-4" /> Connect platforms
                </Button>
              </div>

              <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-2xs text-fg-muted ${fadeIn(400)}`}>
                {['10 platform integrations', 'Content-hash seals', 'Works offline in demo mode'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 3D canvas */}
            <div
              className={`relative transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
              style={{ transitionDelay: mounted ? '300ms' : '0ms' }}
            >
              {webglOk ? (
                <CanvasErrorBoundary
                  fallback={
                    <div className="min-h-[360px] md:min-h-[420px] panel flex items-center justify-center p-8">
                      <p className="text-sm font-semibold">Interactive 3D identity graph</p>
                    </div>
                  }
                >
                  <div className="panel relative overflow-hidden p-3 flex items-center justify-center">
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <Badge variant="neutral">Live WebGL node mesh</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 z-10">
                      <Badge variant="neutral">Mouse reactive</Badge>
                    </div>
                    <Landing3DCanvas />
                  </div>
                </CanvasErrorBoundary>
              ) : (
                <div className="min-h-[360px] md:min-h-[420px] panel flex items-center justify-center">
                  <Badge variant="neutral">WebGL unavailable</Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────────────────────────── */}
      <section ref={statsReveal} className="border-b border-hairline bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {[
              { value: '10', label: 'Platform integrations' },
              { value: 'SHA-256', label: 'Content-hash seals' },
              { value: '4', label: 'Verification sources' },
              { value: '1', label: 'Portable identity' },
            ].map((stat) => (
              <div key={stat.label} className="py-6 md:px-6 md:first:pl-0 text-center space-y-1">
                <dt className="order-2 text-2xs text-fg-muted">{stat.label}</dt>
                <dd className="order-1 text-xl sm:text-2xl font-semibold font-mono tabular tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Feature inspector ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Reveal className="text-center space-y-2 mb-8">
          <p className="eyebrow">Product tour</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Inspect the modules</h2>
          <p className="text-sm text-fg-muted max-w-lg mx-auto">
            Preview each part of the passport before you create an account.
          </p>
        </Reveal>

        <div className="flex justify-center mb-6">
          <Tabs
            value={featureTab}
            onChange={setFeatureTab}
            items={[
              { id: 'proof', label: 'Proof engine' },
              { id: 'zk', label: 'Seals' },
              { id: 'recruiter', label: 'Recruiting' },
              { id: 'academic', label: 'Academic' },
            ]}
          />
        </div>

        <Reveal className="panel p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <Badge variant="accent">{feature.badge}</Badge>
              <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
              <p className="text-sm text-fg-muted leading-relaxed">{feature.body}</p>
              <Button variant="secondary" size="sm" onClick={() => setActiveTab(feature.to as any)}>
                {feature.cta} <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <pre className="p-4 rounded-xl bg-inset border border-hairline font-mono text-2xs leading-relaxed text-fg-muted overflow-x-auto">
              {feature.code.join('\n')}
            </pre>
          </div>
        </Reveal>
      </section>

      {/* ── Three steps ────────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Reveal className="text-center space-y-2 mb-10">
            <p className="eyebrow">How it works</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Three steps to a portable identity</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { ref: how1Reveal, Icon: Link2, n: '01', title: 'Connect platforms', body: 'Link GitHub, LeetCode, GitLab, Kaggle and six more accounts to aggregate your activity trail.', to: () => setSyncModalOpen(true) },
              { ref: how2Reveal, Icon: Fingerprint, n: '02', title: 'Generate seals', body: 'Content hashes are produced for repositories and milestones so any claim stays checkable.', to: () => setActiveTab('repos') },
              { ref: how3Reveal, Icon: Globe, n: '03', title: 'Share the passport', body: 'Hand recruiters, universities or investors a link instead of a document to trust.', to: () => setActiveTab('recruiter') },
            ].map((step) => (
              <div key={step.n} ref={step.ref}>
                <button
                  onClick={step.to}
                  className="w-full h-full text-left panel p-6 space-y-3 transition-colors duration-150 hover:border-strong group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-inset border border-hairline flex items-center justify-center">
                      <step.Icon className="w-5 h-5 text-fg-muted group-hover:text-accent transition-colors" />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">{step.n}</span>
                  </div>
                  <h3 className="font-semibold tracking-tight">{step.title}</h3>
                  <p className="text-xs text-fg-muted leading-relaxed">{step.body}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="panel p-8 sm:p-12 text-center space-y-5 relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" aria-hidden="true" />
          <div className="relative space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em]">
              Claim your verified passport
            </h2>
            <p className="text-sm text-fg-muted max-w-xl mx-auto">
              Start empty, connect one platform, and every number on your profile becomes
              something a stranger can check.
            </p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" onClick={() => setActiveTab('signup')}>
              Create free account <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="lg" onClick={() => setActiveTab('login')}>
              Sign in
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-fg-muted">
          <span className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="w-5 h-5 rounded border border-hairline" />
            © 2026 SkillPassport AI. All rights reserved.
          </span>
          <span className="flex items-center gap-4">
            <button onClick={() => setActiveTab('login')} className="hover:text-fg transition-colors">Sign in</button>
            <button onClick={() => setActiveTab('signup')} className="hover:text-fg transition-colors">Create account</button>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
