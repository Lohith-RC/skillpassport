import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { PlatformId } from '../../types';
import { mock10PlatformsSeededDetails } from '../../services/api';
import { X, RefreshCw, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const PlatformSyncModal: React.FC = () => {
  const { isSyncModalOpen, setSyncModalOpen, profile, togglePlatformConnection, addToast } = useAppStore();
  const [selectedPlatformId, setSelectedPlatformId] = useState<PlatformId>('github');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSyncModalOpen) {
        setSyncModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSyncModalOpen, setSyncModalOpen]);

  if (!isSyncModalOpen) return null;

  const platformsList = Object.values(profile.platforms);
  const selectedDetail = mock10PlatformsSeededDetails.find(p => p.platformId === selectedPlatformId);

  const handleToggle = (id: PlatformId, name: string, isConnected: boolean) => {
    togglePlatformConnection(id);
    if (isConnected) {
      addToast(`Disconnected ${name} profile.`, 'warning');
    } else {
      addToast(`Connected ${name} (simulated sync — OAuth ships with the backend integration).`, 'success');
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Platform sync settings"
      onClick={() => setSyncModalOpen(false)}
      className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-4xl w-full rounded-2xl border border-slate-200 dark:border-border-default overflow-hidden shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <RefreshCw className="w-5 h-5 text-purple-600 mr-2" />
              10-Platform Developer Identity Hub
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Live seeded telemetry across coding, competitive, design, and enterprise platforms
            </p>
          </div>
          <button
            onClick={() => setSyncModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-bg-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column Platform Selector List */}
          <div className="space-y-2 md:col-span-1 border-r border-slate-200 dark:border-border-subtle pr-4 max-h-[400px] overflow-y-auto">
            {platformsList.map((platform) => {
              const isSelected = selectedPlatformId === platform.id;
              return (
                <div
                  key={platform.id}
                  onClick={() => setSelectedPlatformId(platform.id)}
                  className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition border ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800'
                      : 'bg-slate-50 dark:bg-bg-base border-slate-200 dark:border-border-subtle hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-bg-card border border-slate-200 dark:border-border-subtle flex items-center justify-center text-sm shadow-sm" style={{ color: platform.color }}>
                      <i className={platform.icon} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{platform.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{platform.connected ? 'Synced ✓' : 'Disconnected'}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-purple-600' : 'text-slate-400'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column Detailed Platform Seeded Telemetry Panel */}
          <div className="md:col-span-2 space-y-4">
            {selectedDetail ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{selectedDetail.name} — {selectedDetail.title}</h3>
                    <Badge variant="purple" className="mt-1">{selectedDetail.ratingBadge}</Badge>
                  </div>
                  <Button
                    variant={profile.platforms[selectedPlatformId]?.connected ? 'secondary' : 'purple'}
                    size="sm"
                    onClick={() => handleToggle(selectedPlatformId, selectedDetail.name, profile.platforms[selectedPlatformId]?.connected)}
                  >
                    {profile.platforms[selectedPlatformId]?.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>

                {/* Seeded Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedDetail.metrics.map((m) => (
                    <div key={m.label} className="p-3 bg-white dark:bg-bg-card rounded-xl border border-slate-200 dark:border-border-subtle text-center">
                      <div className="text-[11px] text-slate-500">{m.label}</div>
                      <div className="text-lg font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity Log Stream */}
                <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-2xl border border-slate-200 dark:border-border-subtle space-y-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center">
                    <Award className="w-4 h-4 text-purple-600 mr-1.5" /> Recent Verified Telemetry Log
                  </div>
                  {selectedDetail.recentActivities.map((act, idx) => (
                    <div key={idx} className="p-2.5 bg-white dark:bg-bg-card rounded-xl border border-slate-200 dark:border-border-subtle text-xs space-y-0.5">
                      <div className="font-semibold text-slate-900 dark:text-white">{act.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex justify-between">
                        <span>{act.subtitle}</span>
                        <span className="text-purple-600">{act.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500">Select a platform from the left panel to inspect seeded telemetry.</div>
            )}
          </div>

        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-border-subtle flex justify-end space-x-3">
          <Button variant="secondary" size="sm" onClick={() => setSyncModalOpen(false)}>
            Close Hub
          </Button>
          <Button
            variant="purple"
            size="sm"
            onClick={() => {
              const disconnected = Object.values(profile.platforms).filter((p) => !p.connected);
              if (disconnected.length === 0) {
                addToast('All 10 platforms are already connected.', 'info');
                setSyncModalOpen(false);
                return;
              }
              disconnected.forEach((p) => togglePlatformConnection(p.id));
              addToast(
                `Connected ${disconnected.length} platform${disconnected.length > 1 ? 's' : ''} (simulated sync).`,
                'success'
              );
              setSyncModalOpen(false);
            }}
          >
            <RefreshCw className="w-4 h-4 mr-1.5" />
            Resync All 10 Platforms
          </Button>
        </div>

      </div>
    </div>
  );
};
