import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { mockCareerMilestones } from '../../services/api';
import { Clock, ShieldCheck, CheckCircle2, Key, Filter, X } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const CareerTimeCapsule: React.FC = () => {
  const { addToast } = useAppStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [inspectingSeal, setInspectingSeal] = useState<{ title: string; shaSeal: string; year: string } | null>(null);

  const categories = ['ALL', 'EDUCATION', 'INTERNSHIP', 'PRODUCTION', 'ALGORITHMS'];

  const filteredMilestones = mockCareerMilestones.filter((m) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'EDUCATION') return m.title.toLowerCase().includes('vtu') || m.title.toLowerCase().includes('degree');
    if (selectedFilter === 'INTERNSHIP') return m.title.toLowerCase().includes('internship') || m.title.toLowerCase().includes('acme');
    if (selectedFilter === 'PRODUCTION') return m.title.toLowerCase().includes('release') || m.title.toLowerCase().includes('microservice') || m.title.toLowerCase().includes('saas');
    if (selectedFilter === 'ALGORITHMS') return m.title.toLowerCase().includes('leetcode') || m.title.toLowerCase().includes('knight');
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <Card className="p-6 md:p-8 space-y-4 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Career Time Capsule &amp; Milestone Timeline
              </h2>
              <Badge variant="purple">Immutable Verification</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              Interactive timeline tracking professional developer evolution from first commit to production deployment
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="emerald" className="px-3 py-1 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {filteredMilestones.length} Verified Milestones
            </Badge>
          </div>
        </div>

        {/* Milestone Category Filters */}
        <div className="flex items-center space-x-2 pt-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex flex-wrap bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedFilter === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Interactive Milestone Timeline Path */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-500/30 space-y-8 my-6">
        {filteredMilestones.map((m) => (
          <div key={m.id} className="relative group">
            {/* Animated Node Circle */}
            <div
              className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-bg-card border-2 flex items-center justify-center text-xs shadow-md transition-transform group-hover:scale-125"
              style={{ borderColor: m.color, color: m.color }}
            >
              <i className={m.icon} />
            </div>

            <Card hoverable className="p-6 space-y-3 border-slate-200 dark:border-border-default">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-slate-900 dark:text-white shadow-sm" style={{ backgroundColor: m.color }}>
                    {m.year}
                  </span>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{m.title}</h3>
                </div>
                <Badge variant="purple">{m.proofBadge}</Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                {m.description}
              </p>

              <div className="pt-3 border-t border-slate-200 dark:border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-500">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>Verified Timestamp: {m.year}-07-14T10:42:00Z</span>
                </div>
                <button
                  onClick={() => setInspectingSeal({ title: m.title, shaSeal: m.shaSeal, year: m.year })}
                  className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline text-left sm:text-right flex items-center justify-end"
                >
                  <Key className="w-3 h-3 mr-1" />
                  {m.shaSeal}
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Proof Seal Inspector Dialog */}
      {inspectingSeal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-2xl border border-slate-200 dark:border-border-default p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-border-subtle pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Milestone SHA-256 Proof</h3>
              </div>
              <button onClick={() => setInspectingSeal(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-100 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="text-slate-500 text-[10px]">MILESTONE TITLE</div>
                <div className="text-slate-900 dark:text-white font-bold">{inspectingSeal.title}</div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-1">
                <div className="text-slate-500 text-[10px]">IMMUTABLE HASH SEAL</div>
                <div className="text-purple-600 dark:text-purple-400 font-bold break-all">{inspectingSeal.shaSeal}</div>
              </div>

              <div className="text-emerald-600 dark:text-emerald-400 font-sans text-xs flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                <span>Verified against institution ledger timestamp ({inspectingSeal.year}).</span>
              </div>
            </div>

            <Button variant="purple" className="w-full" onClick={() => {
              navigator.clipboard.writeText(inspectingSeal.shaSeal);
              addToast('Copied Cryptographic Proof Hash to clipboard!', 'success');
              setInspectingSeal(null);
            }}>
              Copy Hash &amp; Close
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

