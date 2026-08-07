import React, { useState, useCallback } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Auth3DGlobe } from '../canvas/Auth3DGlobe';
import {
  Shield,
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
  Star,
  Sun,
  Moon,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type AuthMode = 'login' | 'signup';
type UserRole = 'developer' | 'company' | 'university' | 'investor';

interface RoleOption {
  id: UserRole;
  label: string;
  sublabel: string;
  Icon: React.FC<{ className?: string }>;
  color: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'developer',
    label: 'Developer',
    sublabel: 'Build, code and deploy',
    Icon: Code2,
    color: '#2563EB',
  },
  {
    id: 'company',
    label: 'Company',
    sublabel: 'Hire and build amazing teams',
    Icon: Building2,
    color: '#10B981',
  },
  {
    id: 'university',
    label: 'University',
    sublabel: 'Educate and empower students',
    Icon: GraduationCap,
    color: '#F59E0B',
  },
  {
    id: 'investor',
    label: 'Investor',
    sublabel: 'Invest in innovative ideas',
    Icon: TrendingUp,
    color: '#8B5CF6',
  },
];

// Sidebar floating icon nodes shown behind the form
const SIDEBAR_NODES = [
  { Icon: Rocket,    label: 'Projects',     top: '12%',  left: '50%' },
  { Icon: Rocket,    label: 'Deployments',  top: '26%',  left: '50%' },
  { Icon: Trophy,    label: 'Challenges',   top: '40%',  left: '50%' },
  { Icon: Building2, label: 'Companies',    top: '54%',  left: '50%' },
  { Icon: GraduationCap, label: 'Universities', top: '68%', left: '50%' },
  { Icon: Users,     label: 'Mentors',      top: '82%',  left: '50%' },
];

// Password strength scoring
function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  widthPct: number;
} {
  if (!password) return { score: 0, label: '', color: '#374151', widthPct: 0 };
  let score = 0;
  if (password.length >= 8)                          score++;
  if (/[A-Z]/.test(password))                        score++;
  if (/[0-9]/.test(password))                        score++;
  if (/[^A-Za-z0-9]/.test(password))                 score++;

  const map = [
    { label: 'Very Weak', color: '#EF4444', widthPct: 20 },
    { label: 'Weak',      color: '#F97316', widthPct: 40 },
    { label: 'Fair',      color: '#F59E0B', widthPct: 60 },
    { label: 'Strong',    color: '#10B981', widthPct: 80 },
    { label: 'Very Strong', color: '#2563EB', widthPct: 100 },
  ];
  return { score, ...map[Math.min(score, 4)] };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
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
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
      {label}
    </label>
    <div className="relative">
      <IconLeft className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-gray-100 dark:bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-gray-300 dark:border-[#1C263B] rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/20 transition"
      />
      {trailing && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{trailing}</span>
      )}
    </div>
  </div>
);

const SocialButton: React.FC<{
  Icon: React.FC<{ className?: string }>;
  label: string;
  onClick?: () => void;
}> = ({ Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-gray-300 dark:border-[#1C263B] rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-gray-100 dark:bg-[#13192B] hover:border-gray-400 dark:hover:border-gray-400 dark:border-[#2C3A55] transition"
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// AuthBackground — 3D interactive globe with floating nodes
// ─────────────────────────────────────────────────────────────────────────────

const AuthBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden select-none">
    {/* Gradient overlay */}
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 80% at 30% 50%, rgba(37,99,235,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 70% 20%, rgba(124,58,237,0.06) 0%, transparent 50%)',
      }}
    />

    {/* Interactive 3D Globe Canvas */}
    <Auth3DGlobe />

    {/* Floating sidebar node icons */}
    <div className="absolute left-[8%] top-0 bottom-0 flex flex-col justify-around py-16 z-[2] pointer-events-none">
      {SIDEBAR_NODES.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 opacity-60">
          <div className="w-12 h-12 rounded-xl bg-white/10 dark:bg-gray-50 dark:bg-[#0F1626]/80 border border-gray-200/20 dark:border-gray-300 dark:border-[#1C263B] flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>
          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">{label}</span>
        </div>
      ))}
    </div>

    {/* Scattered star particles (dark mode only) */}
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white dark:bg-white hidden dark:block"
        style={{
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.4 + 0.1,
        }}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LoginForm
// ─────────────────────────────────────────────────────────────────────────────

const LoginForm: React.FC<{ onSwitchMode: () => void }> = ({ onSwitchMode }) => {
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
    // Simulate async auth
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    addToast('Signed in successfully! Welcome back, Rahul.', 'success');
    setActiveTab('dashboard');
  }, [email, password, addToast, setActiveTab]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to your SkillPassport account</p>
      </div>

      {/* Form fields */}
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
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setRemember((r) => !r)}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          {remember ? (
            <CheckSquare className="w-4 h-4 text-blue-500" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          <span>Remember me</span>
        </button>
        <button
          type="button"
          onClick={() => addToast('Password reset email sent.', 'info')}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition"
        >
          Forgot password?
        </button>
      </div>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60"
        style={{
          background: loading
            ? '#1D4ED8'
            : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          boxShadow: '0 0 24px -4px rgba(37,99,235,0.45)',
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Signing In…
          </span>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Divider */}
      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-gray-300 dark:bg-[#1C263B]" />
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-[#1C263B]" />
      </div>

      {/* Social auth */}
      <div className="space-y-2.5">
        <SocialButton
          Icon={Github}
          label="Continue with GitHub"
          onClick={() => addToast('Redirecting to GitHub OAuth…', 'info')}
        />
        <SocialButton
          Icon={Chrome}
          label="Continue with Google"
          onClick={() => addToast('Redirecting to Google OAuth…', 'info')}
        />
        <SocialButton
          Icon={Linkedin}
          label="Continue with LinkedIn"
          onClick={() => addToast('Redirecting to LinkedIn OAuth…', 'info')}
        />
      </div>

      {/* Security footer */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        <Shield className="w-3 h-3 text-slate-500" />
        <span className="text-[11px] text-slate-500">Secure login powered by enterprise-grade encryption</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SignupForm
// ─────────────────────────────────────────────────────────────────────────────

const SignupForm: React.FC<{ onSwitchMode: () => void }> = ({ onSwitchMode }) => {
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
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    addToast(`Account created! Welcome aboard, ${fullName.split(' ')[0]}.`, 'success');
    setActiveTab('dashboard');
  }, [fullName, username, emailAddr, password, confirmPw, agreedTerms, addToast, setActiveTab]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Create Your Account <Star className="w-5 h-5 text-yellow-400" />
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Start building your professional identity</p>
      </div>

      {/* Name + Username row */}
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

      {/* Email */}
      <InputField
        id="signup-email"
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={emailAddr}
        onChange={setEmailAddr}
        IconLeft={Mail}
      />

      {/* Password + strength */}
      <div className="space-y-2">
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
        {/* Strength bar */}
        {password && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-gray-200 dark:bg-[#1C263B] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${strength.widthPct}%`, backgroundColor: strength.color }}
              />
            </div>
            <span className="text-[11px] font-semibold shrink-0" style={{ color: strength.color }}>
              {strength.label}
            </span>
          </div>
        )}
      </div>

      {/* Confirm password */}
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

      {/* Role selector */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">I am a</p>
        <div className="grid grid-cols-4 gap-2">
          {ROLE_OPTIONS.map(({ id, label, sublabel, Icon }) => {
            const isSelected = selectedRole === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedRole(id)}
                style={{
                  borderColor: isSelected ? '#2563EB' : (document.documentElement.classList.contains('dark') ? '#1C263B' : '#D1D5DB'),
                  backgroundColor: isSelected ? 'rgba(37,99,235,0.10)' : undefined,
                }}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition text-center ${!isSelected ? 'bg-gray-50 dark:bg-gray-50 dark:bg-[#0F1626]' : ''}`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{label}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">{sublabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms checkbox */}
      <button
        type="button"
        onClick={() => setAgreedTerms((v) => !v)}
        className="flex items-start gap-2.5 text-left group"
      >
        <span className="mt-0.5 shrink-0">
          {agreedTerms ? (
            <CheckSquare className="w-4 h-4 text-blue-500" />
          ) : (
            <Square className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />
          )}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          I agree to the{' '}
          <span className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold cursor-pointer">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold cursor-pointer">
            Privacy Policy
          </span>
        </span>
      </button>

      {/* Create Account CTA */}
      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60"
        style={{
          background: loading
            ? '#1D4ED8'
            : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          boxShadow: '0 0 24px -4px rgba(37,99,235,0.45)',
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Creating Account…
          </span>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Divider */}
      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-[#1C263B]" />
        <span className="text-[11px] text-slate-500 font-medium shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-[#1C263B]" />
      </div>

      {/* Social auth — compact row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { Icon: Github, label: 'GitHub' },
          { Icon: Chrome, label: 'Google' },
          { Icon: Linkedin, label: 'LinkedIn' },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            type="button"
            onClick={() => addToast(`Redirecting to ${label} OAuth…`, 'info')}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 dark:bg-gray-50 dark:bg-[#0F1626] border border-gray-300 dark:border-gray-300 dark:border-[#1C263B] rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-gray-100 dark:bg-[#13192B] hover:border-gray-400 dark:hover:border-gray-400 dark:border-[#2C3A55] transition"
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AuthView — Root export
// ─────────────────────────────────────────────────────────────────────────────

export const AuthView: React.FC<{ initialMode?: AuthMode }> = ({ initialMode = 'login' }) => {
  const { setActiveTab } = useAppStore();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const isLogin = mode === 'login';

  const switchLabel = isLogin
    ? "Don't have an account?"
    : 'Already have an account?';
  const switchCta = isLogin ? 'Sign up' : 'Sign in';

  const { isDarkMode, toggleTheme } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070A11] text-slate-900 dark:text-white flex flex-col relative overflow-hidden">
      {/* Interactive 3D background */}
      <AuthBackground />

      {/* Top navigation bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4">
        {/* Brand */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Shield className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              SkillPassport <span className="text-blue-600 dark:text-blue-500">AI</span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">One Identity. Endless Opportunities.</p>
          </div>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-3 text-sm">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <span className="text-slate-500 dark:text-slate-400">{switchLabel}</span>
          <button
            onClick={() => setMode(isLogin ? 'signup' : 'login')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition"
          >
            {switchCta}
          </button>
        </div>
      </header>

      {/* Centred form card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-md bg-white/90 dark:bg-[#0B0F19]/90 border border-gray-200 dark:border-[#161D2F] rounded-2xl p-8 space-y-6 backdrop-blur-xl shadow-2xl dark:shadow-none"
          style={{ boxShadow: isDarkMode ? '0 25px 60px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,99,235,0.08)' : undefined }}
        >
          {isLogin ? (
            <LoginForm onSwitchMode={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitchMode={() => setMode('login')} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4">
        <p className="text-[11px] text-slate-500">
          © 2025 SkillPassport AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
