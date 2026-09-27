import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle,
  Info,
  ShieldCheck
} from 'lucide-react';
import { ExecutiveKpis } from '../../types/dashboard';

interface ExecutiveKpiBarProps {
  data: ExecutiveKpis;
}

export const ExecutiveKpiBar: React.FC<ExecutiveKpiBarProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Forecasted Revenue with Confidence Interval */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a]/80 border border-slate-800 p-5 backdrop-blur-md shadow-glass transition-all hover:border-blue-500/40 hover:shadow-glow-blue group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-blue-400" />
            Total Forecasted Revenue
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ArrowUpRight className="w-3 h-3" />
            +{data.forecastedRevenue.growthPercentage}%
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <div className="text-2xl lg:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            ${data.forecastedRevenue.base.toFixed(1)}M
          </div>
          <span className="text-xs font-mono font-medium text-slate-400">
            ± ${(data.forecastedRevenue.confidenceInterval * 1000).toFixed(0)}k CI
          </span>
        </div>

        {/* Confidence Interval Visual Range */}
        <div className="mt-3.5">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono">
            <span>P10: ${data.forecastedRevenue.lowerBound.toFixed(1)}M</span>
            <span className="text-cyan-400 font-semibold">P50 Expected</span>
            <span>P90: ${data.forecastedRevenue.upperBound.toFixed(1)}M</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2 p-0.5 relative overflow-hidden flex items-center">
            {/* Gaussian gradient confidence band */}
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 w-full shadow-glow-blue"
              style={{ opacity: 0.85 }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5 flex items-center justify-between">
            <span>Neural Hawkes Multi-Horizon Bayesian Fit</span>
            <span className="text-emerald-400 font-medium">95% Credible Interval</span>
          </div>
        </div>
      </div>

      {/* 2. Weighted Win Propensity */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a]/80 border border-slate-800 p-5 backdrop-blur-md shadow-glass transition-all hover:border-emerald-500/40 hover:shadow-glow-emerald group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Weighted Win Propensity
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ArrowUpRight className="w-3 h-3" />
            +{(data.weightedWinPropensity.current - data.weightedWinPropensity.historicalAvg).toFixed(1)}% vs Prior
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <div className="text-2xl lg:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            {data.weightedWinPropensity.current}%
          </div>
          <span className="text-xs text-slate-400">
            Pipeline Avg
          </span>
        </div>

        {/* Sparkline & Bar */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            <span>Historical baseline: {data.weightedWinPropensity.historicalAvg}%</span>
            <span className="text-emerald-400 font-mono font-medium">High Conviction</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2 relative overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 shadow-glow-emerald"
              style={{ width: `${data.weightedWinPropensity.current}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>SHAP Calibrated across 142 Active Pipeline Opps</span>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Deal Velocity */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a]/80 border border-slate-800 p-5 backdrop-blur-md shadow-glass transition-all hover:border-amber-500/40 hover:shadow-glow-amber group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            Dynamic Deal Velocity
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ArrowDownRight className="w-3 h-3" />
            {data.dealVelocity.deltaDays} Days Faster
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <div className="text-2xl lg:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            {data.dealVelocity.avgDays} <span className="text-lg font-normal text-slate-400">Days</span>
          </div>
          <span className="text-xs text-slate-400">
            Average Sales Cycle
          </span>
        </div>

        {/* Benchmark progress */}
        <div className="mt-3.5">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Industry Benchmark: {data.dealVelocity.industryBenchmark}d</span>
            <span className="text-amber-400 font-mono">29% Acceleration</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2 relative overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700 shadow-glow-amber"
              style={{ width: `${(data.dealVelocity.avgDays / data.dealVelocity.industryBenchmark) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5">
            Latency reduced via continuous touchpoint triggers
          </div>
        </div>
      </div>

      {/* 4. Salesforce FTE Capacity Utilization */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0f172a]/80 border border-slate-800 p-5 backdrop-blur-md shadow-glass transition-all hover:border-cyan-500/40 hover:shadow-glow-blue group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-cyan-400" />
            FTE Capacity Utilization
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" />
            {data.capacityUtilization.burnoutRiskCount} Near Limit
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <div className="text-2xl lg:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            {data.capacityUtilization.percentage}%
          </div>
          <span className="text-xs text-slate-400">
            ({data.capacityUtilization.activeReps}/{data.capacityUtilization.totalReps} Reps Loaded)
          </span>
        </div>

        {/* Capacity Bar */}
        <div className="mt-3.5">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Optimal Band: 75% - 85%</span>
            <span className="text-cyan-400 font-mono font-medium">Kawas Active</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-2 relative overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                data.capacityUtilization.percentage > 90 
                  ? 'bg-rose-500 shadow-glow-rose' 
                  : data.capacityUtilization.percentage > 80 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400' 
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${data.capacityUtilization.percentage}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5 flex items-center justify-between">
            <span>Linear Program solver balanced</span>
            <span className="text-cyan-400 hover:underline cursor-pointer">Module 4 &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
