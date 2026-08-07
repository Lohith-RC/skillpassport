import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TrendingUp, Zap, ShieldCheck, Rocket, Code, Award, ExternalLink } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const InvestorAnalytics: React.FC = () => {
  const { addToast, setInspectingRepo } = useAppStore();

  const ventureProjects = [
    {
      name: 'skillpassport-identity-engine',
      founder: 'Rahul Sharma (VTU)',
      stack: 'Next.js 14, WebGL, Go, AWS',
      commitsCount: 284,
      latency: '42ms',
      buildStatus: 'LIVE 🟢',
      proofScore: 88,
      marketPotential: 'Seed Ready ($2.5M Target)',
    },
    {
      name: 'distributed-raft-consensus',
      founder: 'Priya Patel (IIIT)',
      stack: 'Golang 1.22, Docker Swarm, gRPC',
      commitsCount: 168,
      latency: '18ms',
      buildStatus: 'PASSED 🟢',
      proofScore: 84,
      marketPotential: 'Pre-Seed Infrastructure',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Investor Banner Header */}
      <Card className="p-6 md:p-8 space-y-4 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Venture &amp; Investor Prototype Analytics
              </h2>
              <Badge variant="purple">Technical Founder Sourcing</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              Discover early-stage technical founders based on commit velocity, production build times, and runtime latency
            </p>
          </div>

          <Button
            variant="purple"
            size="sm"
            onClick={() => addToast('Exported Venture Portfolio Telemetry Audit PDF!', 'success')}
          >
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Export Venture Dealflow Report
          </Button>
        </div>

        {/* Venture Pipeline Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Tracked Technical Founders</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">42 Verified</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Avg Commit Velocity</div>
            <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">18 Commits/Wk</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Production Latency</div>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">30ms Median</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">VC Dealflow Velocity</div>
            <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">14 Pitch Ready</div>
          </div>
        </div>
      </Card>

      {/* Venture Technical Founder Card Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span>High-Velocity Prototype Projects ({ventureProjects.length})</span>
          <span className="text-xs font-mono text-purple-600">Empirical Code Telemetry Verified</span>
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {ventureProjects.map((vp, idx) => (
            <Card key={idx} hoverable className="p-6 space-y-4 border-slate-200 dark:border-border-default">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{vp.name}</h4>
                    <Badge variant="emerald">{vp.buildStatus}</Badge>
                    <Badge variant="purple">{vp.marketPotential}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-300 font-medium">Founder: {vp.founder}</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">Stack: {vp.stack}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="purple"
                    size="sm"
                    onClick={() => addToast(`Initiated VC Intro meeting request with ${vp.founder}!`, 'success')}
                  >
                    <Rocket className="w-4 h-4 mr-1.5" />
                    Connect with Founder
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-border-subtle grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
                  <div className="text-[11px] text-slate-500">Commits Count</div>
                  <div className="font-bold text-purple-600">{vp.commitsCount}</div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
                  <div className="text-[11px] text-slate-500">Response Latency</div>
                  <div className="font-bold text-emerald-600">{vp.latency}</div>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
                  <div className="text-[11px] text-slate-500">Proof Score</div>
                  <div className="font-bold text-slate-900 dark:text-white">{vp.proofScore}% Gold</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
