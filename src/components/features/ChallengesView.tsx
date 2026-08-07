import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Plus, 
  Trophy, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Award, 
  Grid, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Code, 
  Database, 
  Terminal, 
  Smartphone, 
  Cpu, 
  Layout, 
  Shield, 
  CheckCircle2, 
  TrendingUp,
  Search,
  Zap,
  Check
} from 'lucide-react';

export const ChallengesView: React.FC = () => {
  const { addToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Recommended' | 'Popular' | 'New' | 'Ending Soon' | 'High Rewards'>('All');

  // Challenge list matching screenshot
  const challenges = [
    {
      id: 'netflix-rec-engine',
      company: 'Netflix',
      verified: true,
      featured: true,
      title: 'Build a Scalable Recommendation Engine',
      description: 'Design and implement a recommendation system that suggests movies based on user behavior and preferences.',
      tech: ['Python', 'Machine Learning', 'SQL', 'Algorithms'],
      reward: '$5,000',
      timeLeft: '3d 12h',
      difficulty: 'Hard',
      difficultyColor: 'text-red-400 bg-red-500/20 border-red-500/30',
      participants: 612,
      logoBg: 'bg-red-600',
      logoText: 'N',
    },
    {
      id: 'airbnb-search-algo',
      company: 'Airbnb',
      verified: true,
      featured: false,
      title: 'Optimize Booking Search Algorithm',
      description: 'Improve search ranking algorithm to deliver more relevant results and enhance user experience.',
      tech: ['Python', 'Search', 'Elasticsearch', 'Data Structures'],
      reward: '$3,000',
      timeLeft: '5d 8h',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      participants: 458,
      logoBg: 'bg-[#FF5A5F]',
      logoText: 'A',
    },
    {
      id: 'aws-[#070A11]-pipeline',
      company: 'Amazon Web Services',
      verified: true,
      featured: false,
      title: 'Real-time Data Pipeline Challenge',
      description: 'Build a real-time data pipeline to process streaming data and generate insights.',
      tech: ['AWS', 'Kafka', 'Python', 'Data Engineering'],
      reward: '$4,000',
      timeLeft: '7d 15h',
      difficulty: 'Hard',
      difficultyColor: 'text-red-400 bg-red-500/20 border-red-500/30',
      participants: 329,
      logoBg: 'bg-[#FF9900]',
      logoText: 'aws',
    },
    {
      id: 'google-docs-clone',
      company: 'Google',
      verified: true,
      featured: false,
      title: 'Build a Google Docs Clone',
      description: 'Create a collaborative document editor with real-time sync, comments and version history.',
      tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
      reward: '$2,500',
      timeLeft: '10d 6h',
      difficulty: 'Medium',
      difficultyColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      participants: 872,
      logoBg: 'bg-[#4285F4]',
      logoText: 'G',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* TITLE BANNER & HOST ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
            Challenge Marketplace <Trophy className="w-6 h-6 ml-2 text-amber-400 fill-current" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Solve real-world problems, showcase your skills, earn rewards and get noticed by top companies.
          </p>
        </div>

        <button
          onClick={() => addToast('Opening challenge host wizard...', 'info')}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs transition shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Challenge</span>
        </button>
      </div>


      {/* 5 TOP METRIC CARDS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Active Challenges */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Active Challenges</div>
            <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">24</div>
            <div className="text-[9px] text-emerald-400 font-semibold">Live right now</div>
          </div>
        </div>

        {/* Card 2: Total Rewards */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Total Rewards</div>
            <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">$28,450</div>
            <div className="text-[9px] text-slate-400">Total prize pool</div>
          </div>
        </div>

        {/* Card 3: Participants */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Participants</div>
            <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">3,248</div>
            <div className="text-[9px] text-slate-400">Developers participating</div>
          </div>
        </div>

        {/* Card 4: Success Rate */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Success Rate</div>
            <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">32%</div>
            <div className="text-[9px] text-slate-400">Average completion</div>
          </div>
        </div>

        {/* Card 5: My Rank */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">My Rank</div>
            <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">#142</div>
            <div className="text-[9px] text-pink-400 font-semibold">Top 5% this month</div>
          </div>
        </div>

      </div>


      {/* MAIN TWO COLUMN LAYOUT: STREAM (SPAN 2) + CATEGORIES & LEADERBOARD (SPAN 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: STREAM (SPAN 2 COLS) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-[#161D2F] pb-4">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {(['All Challenges', 'Recommended', 'Popular', 'New', 'Ending Soon', 'High Rewards'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.replace(' Challenges', '') as any)}
                  className={`pb-2 text-xs font-semibold border-b-2 transition ${
                    activeTab === tab.replace(' Challenges', '') || (activeTab === 'All' && tab === 'All Challenges')
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="p-1 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] text-slate-400">
                <Grid className="w-4 h-4 text-white" />
              </div>
              <select className="bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-xl px-3 py-1.5 text-slate-300 font-sans text-xs focus:outline-none focus:border-purple-500">
                <option>Sort by: Ending Soon</option>
                <option>Sort by: Reward</option>
                <option>Sort by: Popularity</option>
              </select>
            </div>
          </div>

          {/* Challenge Cards List */}
          <div className="space-y-4">
            {challenges.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] hover:border-purple-500/40 transition space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Company Logo + Title + Details */}
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${c.logoBg} flex items-center justify-center font-extrabold text-slate-900 dark:text-white text-base shadow-lg shrink-0`}>
                      {c.logoText}
                    </div>

                    <div className="space-y-1">
                      {c.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block mb-1">
                          Featured
                        </span>
                      )}

                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm hover:text-purple-400 transition cursor-pointer">
                          {c.title}
                        </h3>
                        <span className="text-xs text-slate-400 flex items-center">
                          {c.company} <Check className="w-3 h-3 text-blue-400 ml-1 inline" />
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                        {c.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {c.tech.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-md bg-[#141D30] border border-[#202D47] text-[10px] font-mono text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Metrics Column */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-gray-200 dark:border-[#161D2F] pt-3 sm:pt-0 shrink-0 text-right space-y-1">
                    <div>
                      <div className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">{c.reward}</div>
                      <div className="text-[10px] text-slate-400">Top Reward</div>
                    </div>

                    <div className="text-xs font-mono text-slate-300 flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" /> {c.timeLeft}
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded-md border font-semibold ${c.difficultyColor}`}>
                        • {c.difficulty} •
                      </span>
                      <span className="text-slate-400">{c.participants} Participants</span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => addToast(`Opening challenge breakdown for ${c.title}...`, 'info')}
                        className="px-3.5 py-1.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 text-xs font-semibold transition"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => addToast(`Enrolled in ${c.title}! Good luck!`, 'success')}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold transition shadow-md flex items-center space-x-1"
                      >
                        <span>Participate</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => addToast('Loaded 20 more live challenges.', 'info')}
            className="w-full py-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-2"
          >
            <span>View All Challenges</span>
            <ArrowRight className="w-4 h-4" />
          </button>


          {/* HOW CHALLENGES WORK BANNER */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">How Challenges Work</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto">1</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Choose Challenge</div>
                <p className="text-[10px] text-slate-400">Pick a challenge that matches your skills</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto">2</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Build Solution</div>
                <p className="text-[10px] text-slate-400">Work on your solution and submit your best work</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto">3</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Get Evaluated</div>
                <p className="text-[10px] text-slate-400">Our AI and experts evaluate your submission</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto">4</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Earn Rewards</div>
                <p className="text-[10px] text-slate-400">Top performers win cash and get recognition</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="w-6 h-6 rounded-full bg-pink-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto">5</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">Get Discovered</div>
                <p className="text-[10px] text-slate-400">Top talent gets noticed by companies</p>
              </div>

            </div>
          </div>

        </div>


        {/* RIGHT COLUMN: CATEGORIES + LEADERBOARD + MY STATS (SPAN 1 COL) */}
        <div className="space-y-6">
          
          {/* PANEL 1: CATEGORIES */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Categories</h3>
              <button className="text-[11px] text-purple-400 hover:underline">View All</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>AI &amp; Machine Learning</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">8</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span>Web Development</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">12</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Data Science</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">6</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>DevOps</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">4</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Smartphone className="w-4 h-4 text-pink-400" />
                  <span>Mobile Development</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">5</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Blockchain</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">3</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Layout className="w-4 h-4 text-indigo-400" />
                  <span>UI/UX Design</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">2</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] flex items-center justify-between transition cursor-pointer">
                <span className="flex items-center space-x-2.5 text-slate-200">
                  <Shield className="w-4 h-4 text-red-400" />
                  <span>Cyber Security</span>
                </span>
                <span className="font-mono text-slate-400 text-[11px]">4</span>
              </div>
            </div>
          </div>


          {/* PANEL 2: LEADERBOARD */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#161D2F] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Leaderboard</h3>
              <select className="bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] rounded-lg px-2 py-1 text-[11px] text-slate-300 font-sans">
                <option>This Month</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Rank 1 */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center space-x-3">
                  <span className="text-base">🥇</span>
                  <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden border border-amber-400">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80" alt="Arjun Patel" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Arjun Patel</div>
                    <div className="text-[10px] text-slate-400 font-mono">8,450 XP</div>
                  </div>
                </div>
                <div className="font-extrabold font-mono text-amber-400">$1,200</div>
              </div>

              {/* Rank 2 */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <span className="text-base">🥈</span>
                  <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden border border-slate-400">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80" alt="Priya Singh" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Priya Singh</div>
                    <div className="text-[10px] text-slate-400 font-mono">7,230 XP</div>
                  </div>
                </div>
                <div className="font-extrabold font-mono text-slate-300">$900</div>
              </div>

              {/* Rank 3 */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-900/10 border border-amber-800/30">
                <div className="flex items-center space-x-3">
                  <span className="text-base">🥉</span>
                  <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden border border-amber-600">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=80" alt="Rohan Verma" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Rohan Verma</div>
                    <div className="text-[10px] text-slate-400 font-mono">6,870 XP</div>
                  </div>
                </div>
                <div className="font-extrabold font-mono text-amber-500">$700</div>
              </div>

              {/* Rank 4 */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B]">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-slate-400 text-xs w-4 text-center">4</span>
                  <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" alt="Neha Gupta" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Neha Gupta</div>
                    <div className="text-[10px] text-slate-400 font-mono">6,250 XP</div>
                  </div>
                </div>
                <div className="font-extrabold font-mono text-emerald-400">$500</div>
              </div>

              {/* Rank 5 */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B]">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-slate-400 text-xs w-4 text-center">5</span>
                  <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=64&q=80" alt="Karan Mehta" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Karan Mehta</div>
                    <div className="text-[10px] text-slate-400 font-mono">5,890 XP</div>
                  </div>
                </div>
                <div className="font-extrabold font-mono text-emerald-400">$300</div>
              </div>

            </div>

            <button
              onClick={() => addToast('Opening global challenge leaderboard...', 'info')}
              className="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F1626] hover:bg-gray-100 dark:bg-[#172033] border border-gray-300 dark:border-[#1C263B] text-slate-300 text-xs font-semibold transition"
            >
              View Full Leaderboard →
            </button>
          </div>


          {/* PANEL 3: MY CHALLENGE STATS */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-[#161D2F] space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">My Challenge Stats</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px]">Participated</span>
                  <Code className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">18</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px]">Completed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">7</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px]">Win Rate</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">38%</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-[#1C263B] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[10px]">Rewards Won</span>
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-extrabold font-mono text-emerald-400">$2,150</div>
              </div>
            </div>

            <button
              onClick={() => addToast('Opening your challenge submission history...', 'info')}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition shadow-lg shadow-purple-600/25 flex items-center justify-center space-x-1.5"
            >
              <span>View My Submissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
