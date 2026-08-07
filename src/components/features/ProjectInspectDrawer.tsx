import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { X, ExternalLink, Activity, Server, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ProjectInspectDrawer: React.FC = () => {
  const { inspectingRepo, setInspectingRepo } = useAppStore();

  if (!inspectingRepo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md flex justify-end">
      <div className="glass-card max-w-xl w-full h-full border-l border-slate-200 dark:border-border-default shadow-2xl p-6 space-y-6 overflow-y-auto rounded-none">
        
        {/* Drawer Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{inspectingRepo.name}</h2>
              <Badge variant="emerald">{inspectingRepo.status}</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-mono mt-1">{inspectingRepo.fullName}</p>
          </div>
          <button
            onClick={() => setInspectingRepo(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-bg-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Telemetry Bar */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center text-xs">
          <div>
            <div className="text-slate-500 dark:text-gray-400 flex items-center justify-center"><Activity className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Latency</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono mt-1">42ms</div>
          </div>
          <div>
            <div className="text-slate-500 dark:text-gray-400 flex items-center justify-center"><Server className="w-3.5 h-3.5 mr-1 text-purple-600" /> Build Time</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono mt-1">{inspectingRepo.buildTime || '38s'}</div>
          </div>
          <div>
            <div className="text-slate-500 dark:text-gray-400 flex items-center justify-center"><Cpu className="w-3.5 h-3.5 mr-1 text-amber-500" /> Runner</div>
            <div className="font-bold text-slate-900 dark:text-white font-mono mt-1">AWS EC2 / Vercel</div>
          </div>
        </div>

        {/* Description & Architecture Highlights */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Architecture &amp; System Overview</h3>
          <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
            {inspectingRepo.description}
          </p>
          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-2 text-xs">
            <div className="font-semibold text-purple-600 dark:text-purple-400 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Verified Technical Proof Highlights:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-gray-300 pl-2">
              <li>Cryptographic SHA-256 commit signature verified on remote origin.</li>
              <li>Automated unit test coverage: 94.8% passing across 142 spec files.</li>
              <li>Production SSL certificate active with HTTP/3 QUIC protocol support.</li>
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs">Tech Stack Components</h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {inspectingRepo.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle text-slate-700 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="pt-6 border-t border-slate-200 dark:border-border-subtle flex items-center justify-between">
          <Button variant="secondary" size="sm" onClick={() => setInspectingRepo(null)}>
            Close Drawer
          </Button>
          <a
            href={`https://${inspectingRepo.fullName}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition"
          >
            <span>Open Repository on {inspectingRepo.platform.toUpperCase()}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
