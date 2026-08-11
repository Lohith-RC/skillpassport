import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { X, Calendar, DollarSign, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const defaultDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
};

export const InterviewModal: React.FC = () => {
  const { isInterviewModalOpen, setInterviewModalOpen, selectedCandidate, addToast } = useAppStore();
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState('14:00');
  const [role, setRole] = useState('Senior Full-Stack Engineer');
  const [comp, setComp] = useState('$140,000 - $170,000 USD');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInterviewModalOpen) {
        setInterviewModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInterviewModalOpen, setInterviewModalOpen]);

  if (!isInterviewModalOpen || !selectedCandidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = new Date(`${date}T${time}:00Z`);
    if (selected.getTime() < Date.now()) {
      addToast('Please pick a future date and time for the interview.', 'warning');
      return;
    }
    try {
      const invites = JSON.parse(localStorage.getItem('sp_interview_invites') || '[]');
      invites.push({
        candidate: selectedCandidate.name,
        candidateId: selectedCandidate.id,
        role,
        date,
        time,
        comp,
        sentAt: new Date().toISOString(),
      });
      localStorage.setItem('sp_interview_invites', JSON.stringify(invites));
    } catch {
      /* ignore */
    }
    addToast(`Interview invitation scheduled for ${selectedCandidate.name} on ${date} at ${time} UTC (${role}).`, 'success');
    setInterviewModalOpen(false);
  };

  return (
    <div 
      onClick={() => setInterviewModalOpen(false)}
      className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-lg w-full rounded-2xl border border-slate-200 dark:border-border-default overflow-hidden shadow-2xl p-6 space-y-6"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              Schedule Candidate Interview
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Direct evidence-based hiring invitation with zero resume friction
            </p>
          </div>
          <button
            onClick={() => setInterviewModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-bg-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Summary Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-bg-base border border-slate-200 dark:border-border-subtle flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center">
              {selectedCandidate.avatar}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{selectedCandidate.name}</h4>
              <p className="text-xs text-slate-500 dark:text-gray-400">{selectedCandidate.headline}</p>
            </div>
          </div>
          <Badge variant="purple">Proof {selectedCandidate.proofScore}%</Badge>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 dark:text-gray-300 mb-1">Target Engineering Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 dark:bg-bg-input border border-slate-200 dark:border-border-default rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-gray-300 mb-1">Interview Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-bg-input border border-slate-200 dark:border-border-default rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-gray-300 mb-1">Interview Time (UTC)</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-bg-input border border-slate-200 dark:border-border-default rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-gray-300 mb-1">Compensation Range</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={comp}
                onChange={(e) => setComp(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-bg-input border border-slate-200 dark:border-border-default rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                required
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-border-subtle flex justify-end space-x-3">
            <Button type="button" variant="secondary" size="sm" onClick={() => setInterviewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="purple" size="sm">
              <Send className="w-4 h-4 mr-1.5" />
              Send Formal Invitation
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};
