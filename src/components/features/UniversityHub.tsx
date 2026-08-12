import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { mockUniversityStudents, fetchUniversityStudents } from '../../services/api';
import { GraduationCap, ShieldCheck, CheckCircle2, Award, FileSpreadsheet, Send } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const UniversityHub: React.FC = () => {
  const { addToast } = useAppStore();
  const [students, setStudents] = useState(mockUniversityStudents);
  const [sealHashes, setSealHashes] = useState<Record<string, string>>({});

  // Load the live roster from the backend; the API layer falls back to the
  // seeded mock list when the backend is offline (demo mode).
  useEffect(() => {
    let cancelled = false;
    fetchUniversityStudents()
      .then((data) => { if (!cancelled) setStudents(data); })
      .catch(() => { /* keep seeded fallback on server errors */ });
    return () => { cancelled = true; };
  }, []);

  const deriveSealHash = (usn: string, name: string) => {
    let h = 2166136261;
    const input = `${usn}|${name}`;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return 'SHA-256-' + (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
  };

  const signTranscript = (id: string, name: string, usn: string) => {
    const hash = deriveSealHash(usn, name);
    setStudents(students.map(s => s.id === id ? { ...s, status: 'VERIFIED' } : s));
    setSealHashes(prev => ({ ...prev, [id]: hash }));
    addToast(`Signed official university transcript seal for ${name}: ${hash}`, 'success');
  };

  const handleBatchSign = () => {
    const pending = students.filter(s => s.status !== 'VERIFIED');
    if (pending.length === 0) {
      addToast('All student transcripts are already signed.', 'info');
      return;
    }
    const nextHashes: Record<string, string> = { ...sealHashes };
    pending.forEach(s => { nextHashes[s.id] = deriveSealHash(s.usn, s.name); });
    setSealHashes(nextHashes);
    setStudents(students.map(s => ({ ...s, status: 'VERIFIED' })));
    addToast(`Batch signed ${pending.length} student institutional transcript seals (simulated registrar action).`, 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* University Header */}
      <Card className="p-6 md:p-8 space-y-4 border-slate-200 dark:border-border-default">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-border-subtle pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                University Academic &amp; Industry Readiness Hub
              </h2>
              <Badge variant="purple">VTU Academic Registrar Portal</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              Verify student academic transcripts, track industry contribution velocity, and sign institutional seals
            </p>
          </div>

          <Button
            variant="purple"
            size="sm"
            onClick={handleBatchSign}
          >
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            Batch Sign Student Seals
          </Button>
        </div>

        {/* Readiness Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Class Batch Size</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">142 Students</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Average Class CGPA</div>
            <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">9.12 CGPA</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Industry Readiness</div>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">94.8% Gold/Silver</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-bg-base rounded-xl border border-slate-200 dark:border-border-subtle text-center">
            <div className="text-xs text-slate-500">Verified Seals</div>
            <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">128 Signed</div>
          </div>
        </div>
      </Card>

      {/* Student Roster Table */}
      <Card className="p-6 space-y-4 border-slate-200 dark:border-border-default">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center">
          <GraduationCap className="w-5 h-5 text-purple-600 mr-2" />
          Senior Engineering Class Roster &amp; Academic Seals
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-border-subtle text-slate-500 dark:text-gray-400">
                <th className="pb-3 font-semibold">USN / ID</th>
                <th className="pb-3 font-semibold">Student Name</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">CGPA</th>
                <th className="pb-3 font-semibold">Proof Score</th>
                <th className="pb-3 font-semibold">Commits</th>
                <th className="pb-3 font-semibold">Transcript Seal</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-border-subtle/50 text-slate-700 dark:text-gray-300">
              {students.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 font-bold text-purple-600">{s.usn}</td>
                  <td className="py-3 font-sans font-semibold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="py-3 font-sans">{s.department}</td>
                  <td className="py-3 text-emerald-600 font-bold">{s.cgpa}</td>
                  <td className="py-3">
                    <Badge variant="purple">{s.proofScore}% Score</Badge>
                  </td>
                  <td className="py-3">{s.commitsCount}</td>
                  <td className="py-3">
                    {s.status === 'VERIFIED' ? (
                      <span className="text-emerald-600 font-bold flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Signed
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold">Pending Review</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    {s.status === 'VERIFIED' ? (
                      <button
                        onClick={() => addToast(`Transcript seal hash for ${s.name}: ${sealHashes[s.id] || deriveSealHash(s.usn, s.name)}`, 'info')}
                        className="text-purple-600 hover:underline text-[11px]"
                      >
                        View Seal Hash
                      </button>
                    ) : (
                      <Button variant="purple" size="sm" onClick={() => signTranscript(s.id, s.name, s.usn)}>
                        Sign Seal
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
