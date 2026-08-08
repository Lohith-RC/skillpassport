import React, { useState, useCallback } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Auth3DGlobe } from '../canvas/Auth3DGlobe';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AtSign,
  Github,
  Linkedin,
  CheckSquare,
  Square,
  Chrome,
  Code2,
  Building2,
  GraduationCap,
  TrendingUp,
  Rocket,
  Trophy,
  Users,
  Sparkles,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Constants
// ─────────────────────────────────────────────────────────────────────────────

type AuthMode = 'login' | 'signup';
type UserRole = 'developer' | 'company' | 'university' | 'investor';

interface RoleOption {
  id: UserRole;
  label: string;
  sublabel: string;
  Icon: React.FC<{ className?: string }>;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'developer',
    label: 'Developer',
    sublabel: 'Build, code and deploy',
    Icon: Code2,
  },
  {
    id: 'company',
    label: 'Company',
    sublabel: 'Hire and build amazing teams',
    Icon: Building2,
  },
  {
    id: 'university',
    label: 'University',
    sublabel: 'Educate and empower students',
    Icon: GraduationCap,
  },
  {
    id: 'investor',
    label: 'Investor',
    sublabel: 'Invest in innovative ideas',
    Icon: TrendingUp,
  },
];

const SIDEBAR_NODES = [
  { Icon: Code2, label: 'Projects' },
  { Icon: Rocket, label: 'Deployments' },
  { Icon: Trophy, label: 'Challenges' },
  { Icon: Building2, label: 'Companies' },
  { Icon: GraduationCap, label: 'Universities' },
  { Icon: Users, label: 'Mentors' },
];

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  widthPct: number;
} {
  if (!password) return { score: 0, label: '', color: '#374151', widthPct: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: 'Very Weak', color: '#EF4444', widthPct: 25 },
    { label: 'Weak', color: '#F97316', widthPct: 50 },
    { label: 'Fair', color: '#F59E0B', widthPct: 75 },
    { label: 'Strong', color: '#10B981', widthPct: 90 },
    { label: 'Very Strong', color: '#2563EB', widthPct: 100 },
  ];
  return { score, ...map[Math.min(score, 4)] };
}

// ─────────────────────────────────────────────────────────────────────────────
// Input Field Component
// ─────────────────────────────────────────────────────────────────────────────

const InputField: React.FC<{
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  IconLeft: React.FC<{ className?: string }>;
  trailing?: React.ReactNode;
}> = ({ id, label, type = 'text', placeholder, value, onChange, IconLeft, trailing }) => (
  <div className="space-y-1.5 text-left">
    <label htmlFor={id} className="block text-[11px] font-semibold text-slate-300">
      {label}
    </label>
    <div className="relative">
      <IconLeft className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/20 transition"
      />
      {trailing && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{trailing}</span>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LoginForm
// ─────────────────────────────────────────────────────────────────────────────

const LoginForm: React.FC<{ onSwitchMode: () => void }> = () => {
  const { setActiveTab, addToast } = useAppStore();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]         = useState(false);
  const [loading, setLoading]           = useState(false);

  const handleSignIn = useCallback(async () => {
    if (!email || !password) {
      addToast('Please enter your email and password.', 'warning');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    addToast('Signed in successfully! Welcome back, Rahul.', 'success');
    setActiveTab('dashboard');
  }, [email, password, addToast, setActiveTab]);

  return (
    <div className="space-y-5 text-left">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Welcome Back 👋
        </h2>
        <p className="text-xs text-slate-400">Sign in to continue your journey</p>
      </div>

      <div className="space-y-4">
        <InputField
          id="login-email"
          label="Email or Username"
          type="email"
          placeholder="Enter your email or username"
          value={email}
          onChange={setEmail}
          IconLeft={User}
        />
        <InputField
          id="login-password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          IconLeft={Lock}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-slate-500 hover:text-slate-300 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setRemember((r) => !r)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          {remember ? (
            <CheckSquare className="w-4 h-4 text-blue-500" />
          ) : (
            <Square className="w-4 h-4 text-slate-500" />
          )}
          <span>Remember me</span>
        </button>
        <button
          type="button"
          onClick={() => addToast('Password reset email sent to your registered address.', 'info')}
          className="text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60 hover:opacity-95 shadow-lg shadow-purple-600/30"
        style={{
          background: loading
            ? '#1D4ED8'
            : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        }}
      >
        {loading ? 'Signing In…' : 'Sign In'}
      </button>

      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-[#1C263B]" />
        <span className="text-[11px] text-slate-500 font-medium shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-[#1C263B]" />
      </div>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => addToast('Redirecting to GitHub OAuth…', 'info')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs font-medium text-slate-200 hover:bg-[#13192B] hover:border-[#2C3A55] transition"
        >
          <Github className="w-4 h-4" />
          <span>Continue with GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => addToast('Redirecting to Google OAuth…', 'info')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs font-medium text-slate-200 hover:bg-[#13192B] hover:border-[#2C3A55] transition"
        >
          <Chrome className="w-4 h-4 text-rose-500" />
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          onClick={() => addToast('Redirecting to LinkedIn OAuth…', 'info')}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs font-medium text-slate-200 hover:bg-[#13192B] hover:border-[#2C3A55] transition"
        >
          <Linkedin className="w-4 h-4 text-blue-400" />
          <span>Continue with LinkedIn</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-500">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>Secure login powered by enterprise-grade encryption</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SignupForm
// ─────────────────────────────────────────────────────────────────────────────

const SignupForm: React.FC<{ onSwitchMode: () => void }> = () => {
  const { setActiveTab, addToast } = useAppStore();
  const [fullName, setFullName]           = useState('');
  const [username, setUsername]           = useState('');
  const [emailAddr, setEmailAddr]         = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPw, setConfirmPw]         = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [selectedRole, setSelectedRole]   = useState<UserRole>('developer');
  const [agreedTerms, setAgreedTerms]     = useState(false);
  const [loading, setLoading]             = useState(false);

  const strength = getPasswordStrength(password);

  const handleCreate = useCallback(async () => {
    if (!fullName || !username || !emailAddr || !password) {
      addToast('Please fill in all required fields.', 'warning');
      return;
    }
    if (password !== confirmPw) {
      addToast('Passwords do not match. Please try again.', 'warning');
      return;
    }
    if (!agreedTerms) {
      addToast('Please accept the Terms of Service to continue.', 'warning');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    addToast(`Account created! Welcome aboard, ${fullName.split(' ')[0]}.`, 'success');
    setActiveTab('dashboard');
  }, [fullName, username, emailAddr, password, confirmPw, agreedTerms, addToast, setActiveTab]);

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Create Your Account <Sparkles className="w-5 h-5 text-indigo-400 fill-indigo-400" />
        </h2>
        <p className="text-xs text-slate-400">Start building your professional identity</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InputField
          id="signup-fullname"
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={setFullName}
          IconLeft={User}
        />
        <InputField
          id="signup-username"
          label="Username"
          placeholder="Choose a username"
          value={username}
          onChange={setUsername}
          IconLeft={AtSign}
        />
      </div>

      <InputField
        id="signup-email"
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={emailAddr}
        onChange={setEmailAddr}
        IconLeft={Mail}
      />

      <div className="space-y-1.5">
        <InputField
          id="signup-password"
          label="Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={password}
          onChange={setPassword}
          IconLeft={Lock}
          trailing={
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="text-slate-500 hover:text-slate-300 transition"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        
        {/* Segmented Password Strength */}
        <div className="space-y-1 pt-0.5">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((barIndex) => {
              const activeBars = Math.ceil((strength.widthPct / 100) * 4);
              const isActive = password.length > 0 && barIndex <= activeBars;
              return (
                <div
                  key={barIndex}
                  className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? strength.color : '#1C263B',
                  }}
                />
              );
            })}
            <span className="text-[10px] font-semibold text-slate-400 shrink-0 ml-1">
              Password strength: <span style={{ color: strength.color || '#EF4444' }}>{strength.label || 'Weak'}</span>
            </span>
          </div>
        </div>
      </div>

      <InputField
        id="signup-confirm"
        label="Confirm Password"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Confirm your password"
        value={confirmPw}
        onChange={setConfirmPw}
        IconLeft={Lock}
        trailing={
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="text-slate-500 hover:text-slate-300 transition"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />

      {/* Role selector - 4 items in 1 row */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold text-slate-300">I am a</p>
        <div className="grid grid-cols-4 gap-2">
          {ROLE_OPTIONS.map(({ id, label, sublabel, Icon }) => {
            const isSelected = selectedRole === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedRole(id)}
                className={`relative flex flex-col items-center justify-between p-3 rounded-xl border text-center transition ${
                  isSelected
                    ? 'border-purple-600 bg-purple-950/20 shadow-md shadow-purple-900/20'
                    : 'border-[#1C263B] bg-[#0F1626] hover:bg-[#13192B]'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center shadow">
                    <svg className="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-purple-400' : 'text-slate-400'}`} />
                <span className="text-[11px] font-bold text-white leading-tight">{label}</span>
                <span className="text-[9px] text-slate-400 leading-tight mt-0.5 line-clamp-2">{sublabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms checkbox */}
      <button
        type="button"
        onClick={() => setAgreedTerms((v) => !v)}
        className="flex items-center gap-2 text-left group pt-0.5"
      >
        <span className="shrink-0">
          {agreedTerms ? (
            <CheckSquare className="w-4 h-4 text-blue-500" />
          ) : (
            <Square className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
          )}
        </span>
        <span className="text-xs text-slate-400">
          I agree to the{' '}
          <span className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer">
            Privacy Policy
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60 hover:opacity-95 shadow-lg shadow-purple-600/30"
        style={{
          background: loading
            ? '#1D4ED8'
            : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        }}
      >
        {loading ? 'Creating Account…' : 'Create Account'}
      </button>

      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-[#1C263B]" />
        <span className="text-[11px] text-slate-500 font-medium shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-[#1C263B]" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => addToast('Redirecting to GitHub OAuth…', 'info')}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs font-medium text-slate-200 hover:bg-[#13192B] transition"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => addToast('Redirecting to Google OAuth…', 'info')}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs font-medium text-slate-200 hover:bg-[#13192B] transition"
        >
          <Chrome className="w-3.5 h-3.5 text-rose-500" />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => addToast('Redirecting to LinkedIn OAuth…', 'info')}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0F1626] border border-[#1C263B] rounded-xl text-xs font-medium text-slate-200 hover:bg-[#13192B] transition"
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-400" />
          <span>LinkedIn</span>
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AuthView — Root Component (Exact Visual Match to Screenshot)
// ─────────────────────────────────────────────────────────────────────────────

export const AuthView: React.FC<{ initialMode?: AuthMode }> = ({ initialMode = 'login' }) => {
  const { setActiveTab } = useAppStore();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen bg-[#070A11] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* 3D WebGL Globe Canvas Background */}
      <Auth3DGlobe />

      {/* Deep Space Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle 600px at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 70%), radial-gradient(circle 500px at 80% 50%, rgba(139,92,246,0.10) 0%, transparent 60%), #070A11',
        }}
      />

      {/* Floating Vertical Node Stack on Left (matching screenshot curve) */}
      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col justify-center space-y-7 z-10 pointer-events-none hidden md:flex">
        {SIDEBAR_NODES.map(({ Icon, label }) => (
          <div key={label} className="flex items-center space-x-3 group pointer-events-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1626]/80 border border-[#1C263B] flex items-center justify-center backdrop-blur-md shadow-lg shadow-black/40 hover:border-purple-500/50 hover:bg-[#13192B] transition-all cursor-pointer">
              <Icon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[11px] font-semibold text-slate-300 tracking-wide drop-shadow">{label}</span>
          </div>
        ))}
      </div>

      {/* TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        {/* Brand Logo Header */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 hover:opacity-90 transition group text-left"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0 border border-purple-400/30">
            <span className="font-extrabold text-white text-lg font-mono">✦</span>
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white leading-tight">
              SkillPassport <span className="text-blue-500">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">One Identity. Endless Opportunities.</p>
          </div>
        </button>

        {/* Right Auth Switch Link */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button
            onClick={() => setMode(isLogin ? 'signup' : 'login')}
            className="text-purple-400 hover:text-purple-300 font-bold transition ml-1"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT — FLOATING AUTH CARD */}
      <main className="relative z-20 flex-1 flex items-center justify-center md:justify-end px-4 md:px-16 lg:px-24 py-6">
        <div
          className={`w-full ${
            isLogin ? 'max-w-[440px]' : 'max-w-[560px]'
          } bg-[#0B0F19]/90 border border-[#161D2F] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300`}
          style={{
            boxShadow: '0 25px 60px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.15)',
          }}
        >
          {isLogin ? (
            <LoginForm onSwitchMode={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitchMode={() => setMode('login')} />
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 text-center py-4">
        <p className="text-[11px] text-slate-500 font-medium">
          © 2025 SkillPassport AI. All rights reserved.
        </p>
      </footer>

    </div>
  );
};
