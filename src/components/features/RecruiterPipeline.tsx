import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAppStore } from '../../stores/useAppStore';
import { RecruiterCandidate } from '../../types';
import { mockCandidates } from '../../services/api';
import { ShieldCheck, Search, Filter, Calendar, ExternalLink, CheckCircle, Award, Bookmark, ArrowUpDown, X, Zap } from 'lucide-react';

export const RecruiterPipeline: React.FC = () => {
  const { setInterviewModalOpen, addToast } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'proofScore' | 'liveAppsCount'>('proofScore');
  const [comparingCandidates, setComparingCandidates] = useState<RecruiterCandidate[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string, name: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(bId => bId !== id));
      addToast(`Removed ${name} from candidate shortlist`, 'info');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      addToast(`Shortlisted candidate ${name}!`, 'success');
    }
  };

  const filteredCandidates = mockCandidates
    .filter((cand) => {
      const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.verifiedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTier = selectedTier === 'ALL' || cand.tier === selectedTier;
      return matchesSearch && matchesTier;
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const toggleCompare = (candidate: RecruiterCandidate) => {
    if (comparingCandidates.some(c => c.id === candidate.id)) {
      setComparingCandidates(comparingCandidates.filter(c => c.id !== candidate.id));
    } else {
      if (comparingCandidates.length >= 2) {
        addToast('You can compare a maximum of 2 candidates side-by-side.', 'warning');
        return;
      }
      setComparingCandidates([...comparingCandidates, candidate]);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Recruiter Portal Header */}
      <Card className="p-6 md:p-8 space-y-6 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Enterprise Talent Sourcing Portal
              </h2>
              <Badge variant="purple">Zero-Resume Evidence Hiring</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              Search verified developers by live app telemetry, commit proofs, and institutional seals
            </p>
          </div>
          
          <Button
            variant="purple"
            size="sm"
            onClick={() => addToast('Audit PDF export integration coming soon in Stage 2.', 'info')}
          >
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            Export Evidence Audit PDF (Coming Soon)
          </Button>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by skill (e.g. Next.js, Java, Go, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-bg-input border border-slate-200 dark:border-border-default rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex bg-slate-100 dark:bg-bg-base p-1 rounded-xl border border-slate-200 dark:border-border-subtle text-xs font-semibold">
                {['ALL', 'GOLD', 'SILVER'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      selectedTier === tier
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'proofScore' | 'liveAppsCount')}
                className="bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle text-xs font-semibold text-slate-800 dark:text-gray-200 px-3 py-2 rounded-xl focus:outline-none"
              >
                <option value="proofScore">Sort: Proof Score</option>
                <option value="liveAppsCount">Sort: Production Live Apps</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Candidate Pipeline List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span>Verified Candidate Matches ({filteredCandidates.length})</span>
          <div className="flex items-center space-x-4">
            {bookmarkedIds.length > 0 && (
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                Shortlisted ({bookmarkedIds.length})
              </span>
            )}
            {comparingCandidates.length > 0 && (
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                Comparing {comparingCandidates.length} candidate(s)
              </span>
            )}
          </div>
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {filteredCandidates.map((cand) => {
            const isComparing = comparingCandidates.some(c => c.id === cand.id);
            const isBookmarked = bookmarkedIds.includes(cand.id);

            return (
              <Card key={cand.id} hoverable className="p-6 space-y-4 border-slate-200 dark:border-border-default">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  
                  {/* Left Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md shrink-0">
                      {cand.avatar}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{cand.name}</h4>
                        <Badge variant="purple">Proof Score: {cand.proofScore}% {cand.tier}</Badge>
                        <Badge variant="emerald">{cand.availability}</Badge>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-gray-300">{cand.headline}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                        Top Project: <span className="text-purple-600 dark:text-purple-400">{cand.topProject}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <button
                      onClick={() => toggleBookmark(cand.id, cand.name)}
                      className={`p-2 rounded-xl border transition ${
                        isBookmarked
                          ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                          : 'border-slate-200 dark:border-border-subtle text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      title={isBookmarked ? 'Shortlisted Candidate' : 'Bookmark Candidate'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <Button
                      variant={isComparing ? 'purple' : 'secondary'}
                      size="sm"
                      onClick={() => toggleCompare(cand)}
                    >
                      {isComparing ? 'Comparing ✓' : 'Compare'}
                    </Button>
                    <Button
                      variant="purple"
                      size="sm"
                      onClick={() => setInterviewModalOpen(true, cand)}
                    >
                      <Calendar className="w-4 h-4 mr-1.5" />
                      Schedule Interview
                    </Button>
                  </div>
                </div>

                {/* Verified Proof Pills */}
                <div className="pt-3 border-t border-slate-200 dark:border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap gap-2">
                    {cand.verifiedSkills.map((skill) => (
                      <span key={skill} className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle font-mono text-slate-700 dark:text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-slate-500 dark:text-gray-400 font-mono">
                    <span className="flex items-center"><Award className="w-3.5 h-3.5 mr-1 text-emerald-500" /> {cand.verifiedInternships}</span>
                    <span className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1 text-purple-600" /> {cand.liveAppsCount} Live Deployed Apps</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Candidate Comparison Drawer Panel */}
      {comparingCandidates.length === 2 && (
        <Card className="p-6 space-y-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-800/40 pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              Side-by-Side Candidate Telemetry &amp; Proof Comparison
            </h3>
            <button
              onClick={() => setComparingCandidates([])}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {comparingCandidates.map((c) => (
              <div key={c.id} className="p-4 bg-white dark:bg-bg-base rounded-xl border border-purple-200 dark:border-purple-900 space-y-3 shadow-sm">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex justify-between items-center">
                  <span>{c.name} ({c.tier})</span>
                  <span className="text-purple-600 font-mono text-sm">{c.proofScore}% Proof Score</span>
                </div>
                <p className="text-slate-600 dark:text-gray-300">{c.headline}</p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-border-subtle font-mono text-[11px]">
                  <div className="flex justify-between text-slate-700 dark:text-gray-300">
                    <span>Production Deployed Apps:</span>
                    <span className="text-emerald-600 font-bold">{c.liveAppsCount} Apps</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-gray-300">
                    <span>Verified Academic Seal:</span>
                    <span className="text-purple-600 font-bold">{c.verifiedInternships}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-gray-300">
                    <span>Availability Status:</span>
                    <span className="text-blue-600 font-bold">{c.availability}</span>
                  </div>
                </div>

                <Button variant="purple" size="sm" className="w-full" onClick={() => setInterviewModalOpen(true, c)}>
                  Schedule Interview &rarr;
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Institutional Seals Grid */}
      <Card className="p-6 space-y-4 border-slate-200 dark:border-border-default">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Verified Institutional &amp; Enterprise Seals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span>VTU University Academic Registrar Seal</span>
              <span className="text-emerald-600 font-mono">🟢 Verified 9.42 CGPA</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400">Cryptographically signed on July 14, 2025.</p>
            <div className="text-[10px] font-mono text-slate-500 bg-white dark:bg-bg-card p-2 rounded border border-slate-200 dark:border-border-subtle">
              SHA-256: 8f92a1c4b78912e...e45a901
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-bg-base border border-slate-200 dark:border-border-subtle space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span>Acme Corp Engineering Internship Seal</span>
              <span className="text-purple-600 font-mono">🔵 CTO Signed</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400">Full-stack engineering sign-off for optimizing latency by 45%.</p>
            <div className="text-[10px] font-mono text-slate-500 bg-white dark:bg-bg-card p-2 rounded border border-slate-200 dark:border-border-subtle">
              SHA-256: a12e459018f92a1...c4b7891
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
};

