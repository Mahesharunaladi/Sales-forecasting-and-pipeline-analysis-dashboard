import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  BrainCircuit, 
  Scale, 
  Headphones, 
  Users, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  Lock, 
  Mail, 
  User, 
  Play,
  Activity,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (user: { name: string; email: string; role: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [email, setEmail] = useState('jordan.davis@salespulse.com');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Jordan Davis');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: authMode === 'register' ? (fullName || 'New Leader') : 'Jordan Davis',
      email: email || 'jordan.davis@salespulse.com',
      role: 'VP of Sales'
    });
  };

  const handleQuickDemo = () => {
    onLogin({
      name: 'Jordan Davis',
      email: 'jordan.davis@salespulse.com',
      role: 'VP of Sales'
    });
  };

  const workflowSteps = [
    {
      step: '01',
      title: 'Continuous Signal Stream',
      tag: 'Neural Hawkes Process',
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      desc: 'Instead of waiting for rigid quarter-end estimates, the system continuously tracks buyer interactions (quote views, email bursts, exec meetings) and updates deal momentum in real time.',
      stat: 'Real-time 500ms sync'
    },
    {
      step: '02',
      title: 'Cold-Start Prospecting',
      tag: 'PRISM Lead Scoring',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      desc: 'Predicts conversion probability for brand-new, uncontacted target accounts based on tech stack fit, company ARR tier, and hiring velocity before reps spend outreach time.',
      stat: '91.4% prior precision'
    },
    {
      step: '03',
      title: 'Causal What-If Simulation',
      tag: 'Explainable AI & SHAP',
      icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
      desc: 'Reveals exactly which factors are holding deals back (e.g., quote revision latency), allowing sales leaders to test counterfactual scenarios live with interactive sliders.',
      stat: '+18% win-rate lift'
    },
    {
      step: '04',
      title: 'Prescriptive Team Balancing',
      tag: 'Kawas Capacity Solver',
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      desc: 'Optimally routes high-stakes deals to available reps based on domain fit and current workload, automatically balancing quota capacity and preventing team burnout.',
      stat: 'Balanced at ≤85% capacity'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-blue-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Sales<span className="text-blue-600">Pulse</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Pipeline Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAuthMode('login')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 transition-all"
            >
              Get Started
            </button>
            <button
              onClick={handleQuickDemo}
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Instant Demo</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-16 pb-12 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Next-Generation B2B Revenue & Pipeline Analytics</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Predictable sales forecasting powered by <span className="text-blue-600">real buyer signals</span>.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Replace subjective quarterly rep forecasts with continuous interaction modeling, explainable AI "what-if" simulations, and smart sales team capacity balancing.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleQuickDemo}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all"
          >
            <span>Launch Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setAuthMode('login')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-soft transition-all"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Login to Workspace</span>
          </button>
        </div>

        {/* Highlight Stats Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
            <div className="text-2xl font-extrabold text-slate-900">$14.2M</div>
            <div className="text-xs text-slate-500 mt-0.5">Forecasted Q4 Pipeline</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">±$800k 95% CI</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
            <div className="text-2xl font-extrabold text-slate-900">68.4%</div>
            <div className="text-xs text-slate-500 mt-0.5">Weighted Win Rate</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">+14.2% vs Baseline</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
            <div className="text-2xl font-extrabold text-slate-900">34 Days</div>
            <div className="text-xs text-slate-500 mt-0.5">Avg Sales Cycle</div>
            <div className="text-[11px] text-amber-600 font-semibold mt-1">5.2d Faster Turnaround</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
            <div className="text-2xl font-extrabold text-slate-900">85%</div>
            <div className="text-xs text-slate-500 mt-0.5">Team Capacity Load</div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">Auto-Balanced (Kawas)</div>
          </div>
        </div>
      </section>

      {/* Project Description & Architecture Workflow */}
      <section className="px-6 lg:px-12 py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              System Architecture & Methodology
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How the 4-Stage Sales Intelligence System Works
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              SalesPulse unifies point-process neural event modeling with explainable causal graphs so sales executives always know which deals to prioritize and how to intervene.
            </p>
          </div>

          {/* Workflow Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeWorkflowStep === idx 
                    ? 'bg-blue-50/40 border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:shadow-soft'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      PHASE {step.step}
                    </span>
                    <span className="p-2 rounded-xl bg-white border border-slate-200 shadow-soft">
                      {step.icon}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 mb-2">
                    {step.tag}
                  </span>

                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>{step.stat}</span>
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Deep-Dive Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h4 className="text-lg font-bold">Ready to see your live pipeline in action?</h4>
              <p className="text-xs text-blue-100 mt-1 max-w-2xl">
                Explore continuous buyer engagement curves, simulate counterfactual quote speed scenarios, and auto-balance your sales team with one click.
              </p>
            </div>
            <button
              onClick={handleQuickDemo}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all shrink-0"
            >
              Open Live Dashboard &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 lg:px-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="font-semibold text-slate-800">SalesPulse Platform</span>
            <span>&bull; Intelligent Sales Forecasting & Pipeline Analytics</span>
          </div>
          <div>
            <span>Continuous Hawkes &bull; Causal SHAP &bull; Kawas Solver &bull; Voice Sentiment</span>
          </div>
        </div>
      </footer>

      {/* Login / Register Modal */}
      {authMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setAuthMode(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-lg p-1"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {authMode === 'login' ? 'Sign in to SalesPulse' : 'Create SalesPulse Account'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Access executive pipeline forecasting & deal intelligence
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              {authMode === 'register' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Jordan Davis"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all mt-2"
              >
                {authMode === 'login' ? 'Enter Dashboard' : 'Complete Registration & Enter'}
              </button>

              {/* Quick Demo button inside modal */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ⚡ One-Click Demo Login (Jordan Davis - VP Sales)
                </button>
              </div>

              {/* Switch Auth mode */}
              <div className="text-center pt-2 text-[11px] text-slate-500">
                {authMode === 'login' ? (
                  <span>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Register here
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
