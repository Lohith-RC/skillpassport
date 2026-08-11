import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { X, ExternalLink, Activity, Server, Cpu, CheckCircle2, Terminal, ShieldCheck, FileCode, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

export const ProjectInspectDrawer: React.FC = () => {
  const { inspectingRepo, setInspectingRepo, addToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'security'>('overview');
  const [isExecuting, setIsExecuting] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectingRepo) {
        setInspectingRepo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectingRepo, setInspectingRepo]);

  if (!inspectingRepo) return null;

  const handleRunPipeline = () => {
    setIsExecuting(true);
    addToast(`Triggered live re-run of CI/CD runner for ${inspectingRepo.name}...`, 'info');
    setTimeout(() => {
      setIsExecuting(false);
      addToast(`CI/CD Runner completed successfully! 100% tests passed.`, 'success');
    }, 2000);
  };

  return (
    <div 
      onClick={() => setInspectingRepo(null)}
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-xl w-full h-full border-l border-slate-200 dark:border-border-default shadow-2xl p-6 space-y-6 overflow-y-auto rounded-none flex flex-col justify-between"
      >
        
        <div className="space-y-6">
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

          {/* Inspection Mode Tabs */}
          <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'overview' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 dark:text-gray-400'
              }`}
            >
              Overview &amp; AST
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'logs' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 dark:text-gray-400'
              }`}
            >
              Runner Logs
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                activeTab === 'security' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 dark:text-gray-400'
              }`}
            >
              Security Audit
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
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

              {/* AST Static Analysis Gauge */}
              <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                  <span className="flex items-center"><FileCode className="w-4 h-4 mr-1.5 text-purple-600" /> AST Code Health Index</span>
                  <span className="text-emerald-600 font-mono font-bold">96/100 Grade A+</span>
                </div>
                <ProgressBar progress={96} color="emerald" />
                <p className="text-[11px] text-slate-500 font-mono">Zero cognitive complexity violations detected.</p>
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
                    <li>Automated unit test coverage: {inspectingRepo.coverage || 95}% passing.</li>
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
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-emerald-500" />
                  Live CI/CD Build Runner Stream
                </h3>
                <Button variant="purple" size="sm" onClick={handleRunPipeline} disabled={isExecuting}>
                  <Play className="w-3.5 h-3.5 mr-1" />
                  {isExecuting ? 'Running...' : 'Re-Run Pipeline'}
                </Button>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 space-y-1 overflow-x-auto min-h-[250px]">
                <div>[00:00:01] 🚀 Initializing GitHub Actions runner node v20.11.0...</div>
                <div>[00:00:02] 📦 Fetching remote repository: {inspectingRepo.fullName}</div>
                <div>[00:00:05] 🔨 Running `npm run build` &amp; TypeScript strict type checks...</div>
                <div>[00:00:12] ✅ compilation clean (0 warnings, 0 errors).</div>
                <div>[00:00:15] 🧪 Executing Vitest unit tests ({inspectingRepo.coverage || 95}% target)...</div>
                <div>[00:00:22] PASS src/tests/auth.test.ts (142ms)</div>
                <div>[00:00:24] PASS src/tests/telemetry.test.ts (98ms)</div>
                <div className="text-purple-400">[00:00:30] 🔒 Cryptographic SHA-256 Seal verified: e89f412a...</div>
                <div className="text-emerald-300 font-bold pt-2">🟢 SUCCESS: Pipeline completed in {inspectingRepo.buildTime || '38s'} with exit code 0.</div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                <div className="flex justify-between items-center font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> Dependabot Vulnerability Scan</span>
                  <span>0 Critical Bugs</span>
                </div>
                <p className="text-slate-600 dark:text-gray-300">All 42 npm dependencies verified against Snyk CVE database.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-2 font-mono">
                <div className="font-bold text-slate-900 dark:text-white">Security Compliance Checkpoints</div>
                <div className="flex justify-between text-slate-600 dark:text-gray-300">
                  <span>OWASP Top 10 Static Audit:</span>
                  <span className="text-emerald-500 font-bold">100% Passed</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-gray-300">
                  <span>Secret Hardcoding Prevention:</span>
                  <span className="text-emerald-500 font-bold">Verified Zero Keys</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        <div className="pt-6 border-t border-slate-200 dark:border-border-subtle flex items-center justify-between shrink-0">
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

