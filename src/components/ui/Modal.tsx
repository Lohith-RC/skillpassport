import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { TabType } from '../../types';
import { mockCandidates, mockRepositories } from '../../services/api';
import { cn } from '../../utils/cn';
import { Kbd } from './Kbd';
import {
  Search, X, UserCheck, BarChart3, Code, GitBranch, ShieldCheck,
  GraduationCap, TrendingUp, Sparkles, Clock, LayoutDashboard, Users,
} from 'lucide-react';

interface PaletteItem {
  key: string;
  group: string;
  label: string;
  icon: React.ReactNode;
  meta?: React.ReactNode;
  hint?: React.ReactNode;
  shortcut?: string;
  run: () => void;
}

/**
 * Command palette (Linear-style).
 * Behaviours people expect and the old version lacked: click-outside to
 * dismiss, Arrow/Enter navigation, and shortcuts that actually work — the
 * Cmd+1..9 chips were previously decorative.
 */
export const Modal: React.FC = () => {
  const {
    isSearchOpen, setSearchOpen, setActiveTab, profile,
    setInspectingRepo, setInterviewModalOpen,
  } = useAppStore();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => { setSearchOpen(false); setQuery(''); setActive(0); };

  const go = (tab: TabType) => { setActiveTab(tab); close(); };

  /* ── Data → flat, keyboard-navigable item list ─────────────────────── */
  const items = useMemo<PaletteItem[]>(() => {
    const views: { id: TabType; label: string; icon: React.ReactNode; shortcut: string }[] = [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-accent" />, shortcut: '1' },
      { id: 'profile', label: 'Skill Passport', icon: <UserCheck className="w-4 h-4 text-accent" />, shortcut: '2' },
      { id: 'repos', label: 'Projects', icon: <GitBranch className="w-4 h-4 text-accent" />, shortcut: '3' },
      { id: 'heatmap', label: 'Contribution', icon: <BarChart3 className="w-4 h-4 text-accent" />, shortcut: '4' },
      { id: 'challenges', label: 'Challenges', icon: <Code className="w-4 h-4 text-accent" />, shortcut: '5' },
      { id: 'leetcode', label: 'LeetCode', icon: <TrendingUp className="w-4 h-4 text-accent" />, shortcut: '6' },
      { id: 'timecapsule', label: 'Time Capsule', icon: <Clock className="w-4 h-4 text-accent" />, shortcut: '7' },
      { id: 'university', label: 'Certifications', icon: <GraduationCap className="w-4 h-4 text-accent" />, shortcut: '8' },
      { id: 'recruiter', label: 'Recruiter Portal', icon: <ShieldCheck className="w-4 h-4 text-accent" />, shortcut: '9' },
      { id: 'investor', label: 'Investor Hub', icon: <Users className="w-4 h-4 text-accent" />, shortcut: '' },
      { id: 'landing', label: 'Landing Page', icon: <Sparkles className="w-4 h-4 text-accent" />, shortcut: '' },
    ];

    const q = query.trim().toLowerCase();

    const viewItems: PaletteItem[] = views
      .filter((v) => v.label.toLowerCase().includes(q))
      .map((v) => ({
        key: `view-${v.id}`,
        group: 'Navigation',
        label: v.label,
        icon: v.icon,
        shortcut: v.shortcut,
        run: () => go(v.id),
      }));

    const candidateItems: PaletteItem[] = mockCandidates
      .filter((c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.verifiedSkills.some((s) => s.toLowerCase().includes(q)),
      )
      .slice(0, q ? 6 : 4)
      .map((c) => ({
        key: `cand-${c.id}`,
        group: 'Candidates',
        label: c.name,
        icon: <span className="text-2xs font-semibold">{c.avatar}</span>,
        meta: (
          <span className="text-2xs font-mono text-accent tabular">{c.proofScore}%</span>
        ),
        hint: <span className="text-2xs text-fg-subtle">{c.headline}</span>,
        run: () => { setActiveTab('recruiter'); setInterviewModalOpen(true, c); close(); },
      }));

    const repoItems: PaletteItem[] = mockRepositories
      .filter((r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.tags.join(' ').toLowerCase().includes(q),
      )
      .slice(0, q ? 5 : 3)
      .map((r) => ({
        key: `repo-${r.id}`,
        group: 'Repositories',
        label: r.name,
        icon: <GitBranch className="w-4 h-4 text-fg-muted" />,
        meta: <span className="text-2xs font-mono text-success">Verified</span>,
        run: () => { setActiveTab('repos'); setInspectingRepo(r); close(); },
      }));

    return [...viewItems, ...candidateItems, ...repoItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const grouped = useMemo(() => {
    const out: { group: string; items: PaletteItem[] }[] = [];
    items.forEach((item) => {
      const last = out[out.length - 1];
      if (last && last.group === item.group) last.items.push(item);
      else out.push({ group: item.group, items: [item] });
    });
    return out;
  }, [items]);

  /* ── Keyboard: Escape, arrows, Enter, and real Cmd+1..9 ────────────── */
  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => (items.length ? (i + 1) % items.length : 0));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        items[active]?.run();
        return;
      }
      // Cmd/Ctrl + 1..9 → jump straight to the matching view
      if ((e.metaKey || e.ctrlKey) && /^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const view = items.find((i) => i.group === 'Navigation' && i.shortcut === e.key);
        view?.run();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, items, active]);

  /* Keep the highlighted row in view while arrowing. */
  useEffect(() => {
    if (!isSearchOpen) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, isSearchOpen]);

  if (!isSearchOpen) return null;

  const activeId = items[active]?.key;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
      className="fixed inset-0 z-50 bg-overlay backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4 animate-fade-in"
    >
      <div className="max-w-xl w-full rounded-2xl bg-raised border border-hairline shadow-pop overflow-hidden">
        {/* Search */}
        <div className="flex items-center gap-3 px-4 h-12 border-b border-hairline">
          <Search className="w-4 h-4 text-fg-subtle shrink-0" />
          <input
            type="text"
            placeholder="Search views, candidates, repos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-controls="palette-results"
            aria-activedescendant={activeId}
            autoComplete="off"
            className="w-full bg-transparent text-sm text-fg focus:outline-none placeholder:text-fg-subtle"
            autoFocus
          />
          <button
            onClick={close}
            aria-label="Close search"
            className="p-1 rounded-md text-fg-subtle hover:text-fg hover:bg-interactive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} id="palette-results" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {items.length === 0 && (
            <p className="px-3 py-8 text-center text-xs text-fg-muted">
              No matches for “{query}”.
            </p>
          )}

          {grouped.map((group) => (
            <div key={group.group} className="mb-1.5 last:mb-0">
              <p className="eyebrow px-2.5 py-1.5">{group.group}</p>
              {group.items.map((item) => {
                const idx = items.indexOf(item);
                const isActive = item.key === activeId;
                return (
                  <button
                    key={item.key}
                    data-idx={idx}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActive(idx)}
                    onClick={item.run}
                    className={cn(
                      'w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-3 transition-colors duration-100',
                      isActive ? 'bg-interactive' : 'hover:bg-interactive',
                    )}
                  >
                    <span className="w-6 h-6 rounded-md bg-surface border border-hairline flex items-center justify-center shrink-0">
                      {item.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-medium text-fg truncate">{item.label}</span>
                        {item.meta}
                      </span>
                      {item.hint && <span className="block truncate mt-0.5">{item.hint}</span>}
                    </span>
                    {item.shortcut && <Kbd>⌘{item.shortcut}</Kbd>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-hairline text-2xs text-fg-subtle">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd><Kbd>↓</Kbd> navigate
            <Kbd className="ml-1">↵</Kbd> open
            <Kbd className="ml-1">esc</Kbd> close
          </span>
          <span className="font-mono truncate">
            {profile.name} · {profile.tier} · {profile.proofScore}%
          </span>
        </div>
      </div>
    </div>
  );
};
