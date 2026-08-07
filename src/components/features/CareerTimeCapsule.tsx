import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockCareerMilestones } from '../../services/api';
import { Clock, ShieldCheck, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const CareerTimeCapsule: React.FC = () => {
  const { addToast } = useAppStore();

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
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 4 Verified Milestones
            </Badge>
          </div>
        </div>
      </Card>

      {/* Interactive Milestone Timeline Path */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-500/30 space-y-8 my-6">
        {mockCareerMilestones.map((m, idx) => (
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
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-white shadow-sm" style={{ backgroundColor: m.color }}>
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
                  onClick={() => addToast(`Verified Cryptographic Hash: ${m.shaSeal}`, 'info')}
                  className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline text-left sm:text-right"
                >
                  {m.shaSeal}
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
};
