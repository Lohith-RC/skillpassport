import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { fetchRepositories } from '../../services/api';
import { Repository } from '../../types';
import { useAppStore } from '../../stores/useAppStore';
import { Github, Gitlab, Star, GitFork, Clock, Plus, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export const ProjectEvidenceCard: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const { setInspectingRepo, setSyncModalOpen, addToast } = useAppStore();

  useEffect(() => {
    fetchRepositories().then(setRepos);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Repository &amp; CI/CD Telemetry Vault</h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Live production deployments and build telemetry aggregated from GitHub, GitLab, and Bitbucket</p>
        </div>
        <Button variant="purple" size="sm" onClick={() => setSyncModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" />
          Connect New Repository
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <Card key={repo.id} hoverable className="space-y-4 border-slate-200 dark:border-border-default">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle flex items-center justify-center text-xl text-slate-800 dark:text-white">
                  {repo.platform === 'github' ? (
                    <Github className="w-5 h-5 text-slate-900 dark:text-white" />
                  ) : (
                    <Gitlab className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{repo.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-mono">{repo.fullName}</p>
                </div>
              </div>
              <Badge variant={repo.status === 'LIVE' ? 'emerald' : 'purple'}>
                {repo.status === 'LIVE' ? 'Production Live' : `GitLab CI PASSED 🟢`}
              </Badge>
            </div>

            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">{repo.description}</p>

            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-600 dark:text-gray-400">
              {repo.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-bg-base border border-slate-200 dark:border-border-subtle">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-border-subtle flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 font-mono">
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-amber-500" />{repo.stars}</span>
                <span className="flex items-center"><GitFork className="w-3.5 h-3.5 mr-1" />{repo.forks}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{repo.commitsCount} Commits</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInspectingRepo(repo);
                  addToast(`Opening live telemetry drawer for ${repo.name}`, 'info');
                }}
              >
                Inspect Code &amp; Telemetry &rarr;
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
