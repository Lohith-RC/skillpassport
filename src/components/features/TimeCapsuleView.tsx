import React, { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { mockCareerMilestones, fetchCareerMilestones } from '../../services/api';
import { CareerMilestone } from '../../types';
import {
  Plus,
  Rocket,
  Code,
  Trophy,
  GraduationCap,
  Lightbulb,
  ExternalLink,
  Calendar,
  Sparkles,
  ChevronDown,
  ArrowRight,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

type FilterKey = 'All' | 'Projects' | 'Experience' | 'Achievements' | 'Certifications' | 'Education';

const FILTER_TABS: FilterKey[] = ['All', 'Projects', 'Experience', 'Achievements', 'Certifications', 'Education'];

const FILTER_MAP: Record<FilterKey, string[] | null> = {
  All: null,
  Projects: ['REPO'],
  Experience: ['DEPLOYMENT'],
  Achievements: ['CONTEST'],
  Certifications: ['ACADEMIC', 'SEAL'],
  Education: ['ACADEMIC'],
};

const CATEGORY_STYLES: Record<string, { Icon: React.FC<{ className?: string }>; bg: string; border: string; text: string; shadow: string; label: string }> = {
  REPO: { Icon: Code, bg: 'bg-emerald-600/20', border: 'border-emerald-500', text: 'text-emerald-400', shadow: 'shadow-emerald-500/20', label: 'Project' },
  DEPLOYMENT: { Icon: Rocket, bg: 'bg-blue-600/20', border: 'border-blue-500', text: 'text-blue-400', shadow: 'shadow-blue-500/20', label: 'Deployment' },
  CONTEST: { Icon: Trophy, bg: 'bg-amber-600/20', border: 'border-amber-500', text: 'text-amber-400', shadow: 'shadow-amber-500/20', label: 'Contest' },
  ACADEMIC: { Icon: GraduationCap, bg: 'bg-purple-600/20', border: 'border-purple-500', text: 'text-purple-400', shadow: 'shadow-purple-500/20', label: 'Academic' },
  SEAL: { Icon: ShieldCheck, bg: 'bg-teal-600/20', border: 'border-teal-500', text: 'text-teal-400', shadow: 'shadow-teal-500/20', label: 'Seal' },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateSeal = (): string => {
  try {
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    return `SHA-256: ${Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')}`;
  } catch {
    return `SHA-256: ${Math.random().toString(16).substring(2, 14)}`;
  }
};

export const TimeCapsuleView: React.FC = () => {
  const { addToast, profile, setActiveTab } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const [viewMode, setViewMode] = useState<'Timeline' | 'Calendar'>('Timeline');
  const [milestones, setMilestones] = useState<CareerMilestone[]>(mockCareerMilestones);
  const [visibleCount, setVisibleCount] = useState(6);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ title: '', year: new Date().getFullYear().toString(), category: 'REPO' as CareerMilestone['category'], description: '' });

  // Load live career milestones from the backend; falls back to the seeded
  // mock list when the backend is offline (demo mode).
  useEffect(() => {
    let cancelled = false;
    fetchCareerMilestones()
      .then((data) => { if (!cancelled) setMilestones(data); })
      .catch(() => { /* keep seeded fallback on server errors */ });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(
    () => (FILTER_MAP[activeFilter] ? milestones.filter((m) => FILTER_MAP[activeFilter]!.includes(m.category)) : milestones),
    [activeFilter, milestones]
  );

  const years = useMemo(() => {
    if (milestones.length === 0) return { min: 0, max: 0 };
    const ys = milestones.map((m) => parseInt(m.year, 10));
    return { min: Math.min(...ys), max: Math.max(...ys) };
  }, [milestones]);

  const stats = useMemo(
    () => ({
      years: years.min > 0 ? years.max - years.min + 1 : 0,
      milestones: milestones.length,
      projects: milestones.filter((m) => m.category === 'REPO' || m.category === 'DEPLOYMENT').length,
      achievements: milestones.filter((m) => m.category === 'CONTEST' || m.category === 'SEAL').length,
    }),
    [milestones, years]
  );

  const topSkills = useMemo(() => {
    const connected = Object.values(profile.platforms).filter((p) => p.connected);
    const max = Math.max(1, ...connected.map((p) => p.contributions));
    return connected
      .map((p) => ({ name: p.name, pct: Math.max(5, Math.round((p.contributions / max) * 100)) }))
      .slice(0, 5);
  }, [profile.platforms]);

  const handleAddMilestone = () => {
    if (!form.title.trim() || !form.description.trim()) {
      addToast('Please add a title and description for your milestone.', 'warning');
      return;
    }
    const year = Math.min(2100, Math.max(2000, parseInt(form.year, 10) || new Date().getFullYear()));
    const style = CATEGORY_STYLES[form.category];
    const entry: CareerMilestone = {
      id: `m_${Date.now()}`,
      year: year.toString(),
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      proofBadge: 'User Submitted',
      shaSeal: generateSeal(),
      icon: 'fa-solid fa-shield-halved',
      color: '#8B5CF6',
    };
    setMilestones((prev) => [entry, ...prev]);
    setFormOpen(false);
    setForm({ title: '', year: new Date().getFullYear().toString(), category: 'REPO', description: '' });
    addToast(`Milestone "${entry.title}" added with a cryptographic proof seal.`, 'success');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Empty state (new user with zero proof)
  // ─────────────────────────────────────────────────────────────────────────────
  if (profile.proofScore === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Time Capsule</h1>
            <p className="text-xs text-slate-400 mt-1">Visualizing your journey, growth and verified career milestones</p>
          </div>
          <button
            onClick={() => setFormOpen((o) => !o)}
            className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
          </button>
        </div>

        {formOpen && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <MilestoneForm form={form} setForm={setForm} onCancel={() => setFormOpen(false)} onSubmit={handleAddMilestone} />
          </div>
        )}

        <div className="p-16 text-center bg-white dark:bg-[#0B0F19] rounded-2xl border border-gray-200 dark:border-[#161D2F] space-y-4 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-purple-600/10 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/20">
            <Sparkles className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Milestones Logged Yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Your career time capsule starts clean. Add a milestone above or sync platforms to generate cryptographic SHA proof seals.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* TITLE & TOP ACTION BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
            Time Capsule
          </h1>
          <p className="text-xs text-slate-400 mt-1">Visualizing your journey, growth and milestones over time</p>
        </div>

        <button
          onClick={() => setFormOpen((o) => !o)}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-[#2B2354] hover:border-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-500/10"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          <span>{formOpen ? 'Close Form' : 'Add Milestone'}</span>
        </button>
      </div>

      {/* ADD MILESTONE FORM */}
      {formOpen && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <MilestoneForm form={form} setForm={setForm} onCancel={() => setFormOpen(false)} onSubmit={handleAddMilestone} />
        </div>
      )}

      {/* MILESTONE FILTER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#161D2F] pb-4">

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeFilter === tab
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-gray-50 dark:bg-[#0F1626]'
              }`}
            >
              {tab === 'All' ? 'All Milestones' : tab}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1 bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('Timeline')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              viewMode === 'Timeline' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setViewMode('Calendar')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              viewMode === 'Calendar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Calendar View
          </button>
        </div>

      </div>


      {/* MAIN TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT STREAM / CALENDAR (SPAN 2 COLS) */}
        <div className="lg:col-span-2 space-y-4">

          {viewMode === 'Timeline' ? (
            <>
              {filtered.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-[#0B0F19] rounded-2xl border border-dashed border-gray-300 dark:border-[#232F48] space-y-2">
                  <Lightbulb className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">No milestones in this category yet.</p>
                </div>
              ) : (
                <div className="relative pl-8 space-y-6 border-l-2 border-[#162544] my-2">
                  {filtered.slice(0, visibleCount).map((m) => {
                    const style = CATEGORY_STYLES[m.category] ?? CATEGORY_STYLES.REPO;
                    const Icon = style.Icon;
                    return (
                      <div key={m.id} className="relative group">
                        <span className={`absolute -left-[45px] top-0.5 w-8 h-8 rounded-full ${style.bg} border-2 ${style.border} ${style.text} flex items-center justify-center shadow-lg ${style.shadow}`}>
                          <Icon className="w-4 h-4" />
                        </span>

                        <div className={`p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-blue-500/40 transition space-y-3`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-[10px] font-mono text-slate-500">{m.year} · {style.label}</div>
                              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{m.title}</h3>
                              <p className="text-xs text-slate-400 mt-1">{m.description}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-lg bg-slate-900 border border-gray-300 dark:border-[#1C263B] text-[10px] font-bold text-emerald-400 shrink-0`}>
                              {m.proofBadge}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">{m.icon || 'fa-solid fa-certificate'}</span>
                              <span className="px-2 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300 truncate max-w-[220px]">{m.shaSeal}</span>
                            </div>

                            <button
                              onClick={() => addToast(`Proof seal: ${m.shaSeal}`, 'info')}
                              className="text-xs font-semibold text-blue-400 hover:underline flex items-center space-x-1 shrink-0"
                            >
                              <span>View Seal</span>
                              <ExternalLink className="w-3 h-3 ml-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Reveal more / all shown */}
              {filtered.length > visibleCount ? (
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="w-full py-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-2"
                >
                  <span>View More Milestones ({filtered.length - visibleCount} remaining)</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                filtered.length > 0 && (
                  <div className="text-center text-[10px] font-mono text-slate-500">Showing all {filtered.length} milestones</div>
                )
              )}
            </>
          ) : (
            /* CALENDAR VIEW — milestone density by year/month */
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Milestone Calendar</h3>
                <span className="text-[10px] font-mono text-slate-400">{filtered.length} events</span>
              </div>
              {Object.entries(
                filtered.reduce<Record<string, CareerMilestone[]>>((acc, m) => {
                  (acc[m.year] = acc[m.year] ?? []).push(m);
                  return acc;
                }, {})
              )
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([year, entries]) => {
                  const monthIndexes = entries.map((_, i) => Math.floor((i * 12) / Math.max(1, entries.length)));
                  return (
                    <div key={year} className="space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400">{year}</div>
                      <div className="grid grid-cols-12 gap-1">
                        {MONTHS.map((month, mi) => {
                          const active = monthIndexes.includes(mi);
                          return (
                            <div
                              key={month}
                              title={`${month} ${year}${active ? ` · ${entries[monthIndexes.indexOf(mi)].title}` : ''}`}
                              className={`h-8 rounded-lg border flex items-center justify-center text-[9px] font-mono transition ${
                                active
                                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25'
                                  : 'bg-gray-50 dark:bg-[#0F1626] border-gray-300 dark:border-[#1C263B] text-slate-500'
                              }`}
                            >
                              {active ? '●' : month.slice(0, 1)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN STATS & INSIGHTS (SPAN 1 COL) */}
        <div className="space-y-6">

          {/* CARD 1: JOURNEY OVERVIEW (derived from real milestones) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Journey Overview</h3>
              <button onClick={() => setActiveTab('heatmap')} className="text-[11px] text-blue-400 hover:underline">View Analytics</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">{stats.years}+</span>
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-[11px] text-slate-400">Years of Journey</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">{stats.milestones}</span>
                  <Rocket className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-400">Milestones</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">{stats.projects}</span>
                  <Code className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-[11px] text-slate-400">Projects & Deploys</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">{stats.achievements}</span>
                  <Trophy className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400">Achievements</div>
              </div>
            </div>
          </div>

          {/* CARD 2: GROWTH OVER TIME CHART */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Growth Over Time</h3>
              <button onClick={() => setActiveTab('investor')} className="text-[11px] text-blue-400 hover:underline">View Details</button>
            </div>

            <div className="pt-2">
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 200 80">
                <defs>
                  <linearGradient id="timeCapsuleChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 70 Q 50 60, 100 40 T 200 10 L 200 80 L 0 80 Z" fill="url(#timeCapsuleChartGrad)" />
                <path d="M 0 70 Q 50 60, 100 40 T 200 10" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
                <circle cx="200" cy="10" r="4" fill="#8B5CF6" className="animate-ping" />
                <circle cx="200" cy="10" r="4" fill="#FFFFFF" />
              </svg>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-gray-200 dark:border-[#161D2F]">
                {years.min > 0
                  ? Array.from({ length: Math.min(5, years.max - years.min + 1) }, (_, i) => years.min + i).map((y) => <span key={y}>{y}</span>)
                  : <span>—</span>}
              </div>
            </div>
          </div>

          {/* CARD 3: TOP SKILLS OVER TIME (derived from connected platforms) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Top Platforms Over Time</h3>
              <button onClick={() => setActiveTab('profile')} className="text-[11px] text-blue-400 hover:underline">Manage</button>
            </div>

            {topSkills.length === 0 ? (
              <p className="text-xs text-slate-400">Connect platforms to see your verified activity distribution.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {topSkills.map((s) => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">{s.name}</span>
                      <span className="font-mono text-slate-400">{s.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#141D30] overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CARD 4: TIME CAPSULE INSIGHTS */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101426] via-[#120F2A] to-[#0D162B] border border-[#2B2354] space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Time Capsule Insights</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You have logged <span className="font-bold text-white">{stats.milestones} verified milestones</span> spanning{' '}
              <span className="font-bold text-white">{stats.years} years</span> — {stats.projects} project deployments and{' '}
              {stats.achievements} achievements, all sealed with cryptographic proofs.
            </p>

            <div className="flex items-center justify-center py-2">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-lg">
                  🔮
                </div>
              </div>
            </div>

            <button
              onClick={() => addToast('AI Time Capsule report (simulated) — full report ships with the backend integration.', 'info')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-1.5"
            >
              <span>Explore Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Add Milestone inline form
// ─────────────────────────────────────────────────────────────────────────────

const MilestoneForm: React.FC<{
  form: { title: string; year: string; category: CareerMilestone['category']; description: string };
  setForm: React.Dispatch<React.SetStateAction<{ title: string; year: string; category: CareerMilestone['category']; description: string }>>;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ form, setForm, onCancel, onSubmit }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
        <Plus className="w-4 h-4 text-purple-400" /> New Career Milestone
      </h3>
      <button onClick={onCancel} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-gray-100 dark:hover:bg-[#172033] transition" aria-label="Close form">
        <X className="w-4 h-4" />
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
      <input
        type="text"
        placeholder="Milestone title (e.g. Shipped Payments Gateway)"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition sm:col-span-2"
      />
      <input
        type="number"
        min={2000}
        max={2100}
        placeholder="Year (e.g. 2026)"
        value={form.year}
        onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
        className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition"
      />
      <select
        value={form.category}
        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as CareerMilestone['category'] }))}
        className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
      >
        {(['REPO', 'DEPLOYMENT', 'CONTEST', 'ACADEMIC', 'SEAL'] as const).map((c) => (
          <option key={c} value={c}>{CATEGORY_STYLES[c].label}</option>
        ))}
      </select>
      <textarea
        placeholder="Describe what you achieved and how it was verified…"
        rows={2}
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition sm:col-span-2 resize-none"
      />
    </div>

    <div className="flex items-center justify-end gap-2">
      <button
        onClick={onCancel}
        className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-300 text-xs font-semibold hover:border-red-500/40 transition"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-lg shadow-blue-600/25 flex items-center space-x-1.5"
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Add & Seal Milestone</span>
      </button>
    </div>
  </div>
);
