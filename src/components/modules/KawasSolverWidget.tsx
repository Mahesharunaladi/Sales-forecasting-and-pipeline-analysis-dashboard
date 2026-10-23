import React, { useState } from 'react';
import { 
  Users2, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  Briefcase, 
  TrendingUp, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KawasRep } from '../../types/dashboard';

interface KawasSolverWidgetProps {
  reps: KawasRep[];
  onRebalance?: () => void;
}

export const KawasSolverWidget: React.FC<KawasSolverWidgetProps> = ({ reps, onRebalance }) => {
  const [isSolving, setIsSolving] = useState(false);
  const [repsData, setRepsData] = useState<KawasRep[]>(reps);
  const [optimizedStatus, setOptimizedStatus] = useState<string>('Balanced (Team Workload ≤85%)');

  const handleRunOptimizer = () => {
    setIsSolving(true);
    setTimeout(() => {
      const rebalanced = repsData.map(r => {
        if (r.name === 'Sarah Chen') {
          return { ...r, capacityPct: 82, status: 'Optimal' as const };
        }
        if (r.name === 'Devon Wright') {
          return { ...r, capacityPct: 70, assignedDealsCount: 5, status: 'Optimal' as const };
        }
        if (r.name === 'Elena Rostova') {
          return { ...r, capacityPct: 78, status: 'Optimal' as const };
        }
        return { ...r, capacityPct: 74, status: 'Optimal' as const };
      });

      setRepsData(rebalanced);
      setIsSolving(false);
      setOptimizedStatus('Workloads Balanced & Fairly Distributed');

      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#2563eb', '#10b981', '#6366f1', '#f59e0b']
      });

      if (onRebalance) {
        onRebalance();
      }
    }, 800);
  };

  const getCapacityBarColor = (pct: number) => {
    if (pct > 90) return 'bg-rose-500';
    if (pct > 80) return 'bg-amber-500';
    return 'bg-blue-600';
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-soft overflow-hidden flex flex-col">
      {/* Widget Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/50">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Sales Team Capacity & Smart Deal Routing (Kawas Solver)
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100/70 text-blue-700">
              Workload Optimizer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automatically routes enterprise opportunities to the best-matched sales reps while avoiding burnout and overload.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRunOptimizer}
            disabled={isSolving}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSolving ? 'animate-spin' : ''}`} />
            <span>{isSolving ? 'Balancing Team...' : 'Auto-Balance Team Workload'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Rep Workload Cards */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {repsData.map((rep) => {
          return (
            <div 
              key={rep.id}
              className="rounded-xl bg-slate-50/60 hover:bg-white border border-slate-200 p-4 transition-all shadow-soft hover:shadow-card flex flex-col justify-between"
            >
              <div>
                {/* Rep Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200">
                      {rep.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {rep.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate max-w-[130px]">{rep.role}</p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    rep.status === 'Optimal' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : rep.status === 'Near Capacity' 
                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {rep.status}
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1 mb-3 bg-white p-2.5 rounded-lg border border-slate-200/70">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Workload:</span>
                    <span className="font-bold text-slate-900">{rep.capacityPct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getCapacityBarColor(rep.capacityPct)} transition-all duration-700`}
                      style={{ width: `${rep.capacityPct}%` }}
                    />
                  </div>
                </div>

                {/* Pipeline Stats */}
                <div className="grid grid-cols-2 gap-2 bg-white p-2 rounded-lg border border-slate-200/70 mb-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Active Deals</span>
                    <span className="text-slate-900 font-bold">{rep.assignedDealsCount} / {rep.optimalMaxDeals} max</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Pipeline Value</span>
                    <span className="text-emerald-700 font-bold">${(rep.pipelineValue / 1000000).toFixed(2)}M</span>
                  </div>
                </div>

                {/* Assigned Opportunities Sample */}
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">
                    Assigned Accounts
                  </span>
                  <div className="space-y-1.5">
                    {rep.assignedOpportunities.slice(0, 2).map((opp, i) => (
                      <div key={i} className="p-2 rounded-lg bg-white border border-slate-200/80 text-xs flex items-center justify-between">
                        <span className="text-slate-800 font-medium truncate max-w-[130px]" title={opp.dealName}>
                          {opp.dealName}
                        </span>
                        <span className="text-emerald-700 font-bold shrink-0">
                          {opp.winFitScore}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rep Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>Burnout Risk: Low</span>
                <span className="text-blue-600 font-semibold">Healthy Flow</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Solver Status Bar */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Team Capacity Status: <strong className="text-slate-900">{optimizedStatus}</strong></span>
        </div>
        <div className="text-slate-500">
          Smart balance target: 70%–85% optimal utilization
        </div>
      </div>
    </div>
  );
};
