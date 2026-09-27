import React from 'react';
import { 
  Activity, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  RefreshCw, 
  ShieldCheck, 
  Bell, 
  HelpCircle,
  BarChart3
} from 'lucide-react';

interface HeaderProps {
  onRefresh?: () => void;
  isSimulating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isSimulating }) => {
  return (
    <header className="border-b border-slate-800 bg-[#090d16]/90 backdrop-blur-xl sticky top-0 z-50 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow-blue">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse-subtle" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#090d16]" />
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-['Outfit'] flex items-center gap-2">
                AURA<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">·CRO</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Hawkes v3.8 Active
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Continuous Stream
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              AI-Powered B2B Sales Forecasting, Causal XAI & Capacity Optimization Engine
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center space-x-3 self-end md:self-auto">
          {/* Neural Engine State */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Point Process Intensity: <strong className="text-white font-mono">λ = 0.842/hr</strong></span>
          </div>

          {/* Quick Refresh */}
          <button
            onClick={onRefresh}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-xs font-medium text-slate-200 border border-slate-700 transition-all active:scale-95 shadow-sm"
            title="Recalculate Hawkes & SHAP kernels"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Calibrating...' : 'Sync AI Engine'}</span>
          </button>

          {/* Live Alert Bell */}
          <div className="relative">
            <button className="p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 border border-slate-700 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
