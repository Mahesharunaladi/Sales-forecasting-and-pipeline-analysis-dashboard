import React from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Bell, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Search,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onRefresh?: () => void;
  isSimulating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isSimulating }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50 px-4 lg:px-8 py-3.5 shadow-sm transition-all">
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <TrendingUp className="w-5 h-5" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                Aura<span className="text-blue-600">Sales</span>
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                AI Forecast Engine
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Real-time sales predictions, deal health insights, and team capacity planning
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex items-center space-x-3 self-end md:self-auto">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All models calibrated &bull; <strong>95% accuracy</strong></span>
          </div>

          {/* Quick Refresh */}
          <button
            onClick={onRefresh}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition-all active:scale-95"
            title="Recalculate AI predictions"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Updating...' : 'Sync Predictions'}</span>
          </button>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
            title="Recent alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              JD
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-800 leading-tight">Jordan Davis</div>
              <div className="text-[11px] text-slate-500 leading-tight">VP of Sales</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
