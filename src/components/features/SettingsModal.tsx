import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { UserRole } from '../../types';
import { X, User, Sliders, Shield, Bell, Zap, Save, Check, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const ROLE_OPTIONS: { id: UserRole; label: string }[] = [
  { id: 'developer', label: 'Developer' },
  { id: 'recruiter', label: 'Recruiter' },
  { id: 'university', label: 'University' },
  { id: 'investor', label: 'Investor' },
];

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    profile,
    updateProfile,
    isTelemetryActive,
    toggleTelemetry,
    addToast,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'telemetry' | 'notifications'>('profile');
  const [name, setName] = useState(profile.name);
  const [headline, setHeadline] = useState(profile.headline);
  const [location, setLocation] = useState(profile.location);
  const [degree, setDegree] = useState(profile.degree);
  const [role, setRole] = useState<UserRole>(profile.role ?? 'developer');
  const [socialLinks, setSocialLinks] = useState(profile.socialLinks ?? {
    github: '', linkedin: '', twitter: '', portfolio: '',
  });

  // Re-sync form state every time the modal opens so stale edits never persist.
  useEffect(() => {
    if (isSettingsOpen) {
      setName(profile.name);
      setHeadline(profile.headline);
      setLocation(profile.location);
      setDegree(profile.degree);
      setRole(profile.role ?? 'developer');
      setSocialLinks(profile.socialLinks ?? { github: '', linkedin: '', twitter: '', portfolio: '' });
    }
  }, [isSettingsOpen, profile]);

  const [notificationPrefs, setNotificationPrefs] = useState(() => {
    try {
      const stored = localStorage.getItem('sp_notification_prefs');
      return stored
        ? JSON.parse(stored)
        : { recruiterAlerts: true, contestVelocity: true, pipelineReports: true };
    } catch {
      return { recruiterAlerts: true, contestVelocity: true, pipelineReports: true };
    }
  });

  if (!isSettingsOpen) return null;

  const toggleNotificationPref = (key: keyof typeof notificationPrefs) => {
    const next = { ...notificationPrefs, [key]: !notificationPrefs[key] };
    setNotificationPrefs(next);
    try {
      localStorage.setItem('sp_notification_prefs', JSON.stringify(next));
    } catch {
      /* ignore */
    }
    addToast(`Notification preference updated.`, 'success');
  };

  const handleSaveProfile = () => {
    if (!name.trim()) {
      addToast('Display name cannot be empty.', 'warning');
      return;
    }
    updateProfile({ name, headline, location, degree, role, socialLinks });
    addToast(activeTab === 'profile'
      ? 'Developer Profile settings saved successfully!'
      : 'Settings saved successfully!', 'success');
    setSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0B0F19] max-w-2xl w-full rounded-3xl border border-gray-200 dark:border-[#161D2F] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#161D2F] bg-gray-50 dark:bg-[#0F1626]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Platform Settings & Customization</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configure verified identity, live telemetry & preferences</p>
            </div>
          </div>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#13192B] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-[#161D2F] px-6 bg-white dark:bg-[#0B0F19]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Developer Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'telemetry'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Live Telemetry</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Professional Headline</label>
                <textarea
                  rows={2}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Degree / Institution</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Primary Role</label>
                <div className="grid grid-cols-4 gap-2">
                  {ROLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                        role === opt.id
                          ? 'border-blue-600 bg-blue-600/10 text-blue-600 dark:text-blue-400'
                          : 'border-gray-300 dark:border-[#1C263B] text-slate-500 dark:text-slate-400 hover:border-blue-500/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400">Tailors the sidebar and landing experience to your workflow.</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-[#161D2F]">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 pt-2">
                  <Github className="w-3.5 h-3.5 text-slate-400" /> Social Links
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Github className="w-3 h-3" /> GitHub
                    </label>
                    <input
                      type="url"
                      value={socialLinks.github ?? ''}
                      onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Linkedin className="w-3 h-3" /> LinkedIn
                    </label>
                    <input
                      type="url"
                      value={socialLinks.linkedin ?? ''}
                      onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Twitter className="w-3 h-3" /> X / Twitter
                    </label>
                    <input
                      type="url"
                      value={socialLinks.twitter ?? ''}
                      onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                      placeholder="https://x.com/username"
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Globe className="w-3 h-3" /> Portfolio
                    </label>
                    <input
                      type="url"
                      value={socialLinks.portfolio ?? ''}
                      onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })}
                      placeholder="https://portfolio.dev"
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-200 dark:border-[#1C263B] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Real-Time Telemetry Stream</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Stream 42ms runtime benchmark metrics into proof cards</div>
                </div>
                <button
                  onClick={toggleTelemetry}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    isTelemetryActive ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-slate-700 dark:bg-[#1C263B] dark:text-slate-400'
                  }`}
                >
                  {isTelemetryActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-200 dark:border-[#1C263B] space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span>SHA-256 Verification Runner Status</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Runner #891 • 0 failures • Average Latency: 42ms • Target Cluster: AWS ap-south-1
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-200 dark:border-[#1C263B] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Instant Recruiter Alerts</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Get notified when top companies request interview slots</div>
                </div>
                <button
                  onClick={() => toggleNotificationPref('recruiterAlerts')}
                  role="switch"
                  aria-checked={notificationPrefs.recruiterAlerts}
                  className={`relative w-11 h-6 rounded-full transition ${notificationPrefs.recruiterAlerts ? 'bg-blue-600' : 'bg-gray-300 dark:bg-[#1C263B]'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notificationPrefs.recruiterAlerts ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-200 dark:border-[#1C263B] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Contest Velocity Summary</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Weekly report on rating velocity across LeetCode & Codeforces</div>
                </div>
                <button
                  onClick={() => toggleNotificationPref('contestVelocity')}
                  role="switch"
                  aria-checked={notificationPrefs.contestVelocity}
                  className={`relative w-11 h-6 rounded-full transition ${notificationPrefs.contestVelocity ? 'bg-blue-600' : 'bg-gray-300 dark:bg-[#1C263B]'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notificationPrefs.contestVelocity ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0F1626] border border-gray-200 dark:border-[#1C263B] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Pipeline & Deployment Reports</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Alerts when production pipelines pass or fail on your repos</div>
                </div>
                <button
                  onClick={() => toggleNotificationPref('pipelineReports')}
                  role="switch"
                  aria-checked={notificationPrefs.pipelineReports}
                  className={`relative w-11 h-6 rounded-full transition ${notificationPrefs.pipelineReports ? 'bg-blue-600' : 'bg-gray-300 dark:bg-[#1C263B]'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notificationPrefs.pipelineReports ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 dark:border-[#161D2F] bg-gray-50 dark:bg-[#0F1626]">
          <button
            onClick={() => setSettingsOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-[#13192B] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProfile}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};
