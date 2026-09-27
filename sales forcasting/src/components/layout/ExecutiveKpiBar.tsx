import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { ExecutiveKpis } from '../../types/dashboard';

interface ExecutiveKpiBarProps {
  data: ExecutiveKpis;
}

export const ExecutiveKpiBar: React.FC<ExecutiveKpiBarProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Forecasted Revenue */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:shadow-card shadow-card-hover transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
            Total Forecasted Revenue
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <ArrowUpRight className="w-3 h-3" />
            +{data.forecastedRevenue.growthPercentage}%
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mt-1">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ${data.forecastedRevenue.base.toFixed(1)}M
          </div>
          <span className="text-xs font-medium text-slate-500">
            ± ${(data.forecastedRevenue.confidenceInterval * 1000).toFixed(0)}k range
          </span>
        </div>

        {/* Confidence Interval Visual Range */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
            <span>Low: ${data.forecastedRevenue.lowerBound.toFixed(1)}M</span>
            <span className="text-blue-600 font-semibold">Expected $14.2M</span>
            <span>High: ${data.forecastedRevenue.upperBound.toFixed(1)}M</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex items-center">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 w-full"
            />
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>95% statistical confidence</span>
            <span className="text-emerald-600 font-medium">On Track to Target</span>
          </div>
        </div>
      </div>

      {/* 2. Weighted Win Propensity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:shadow-card shadow-card-hover transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            Weighted Win Rate
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <ArrowUpRight className="w-3 h-3" />
            +{(data.weightedWinPropensity.current - data.weightedWinPropensity.historicalAvg).toFixed(1)}% vs avg
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mt-1">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.weightedWinPropensity.current}%
          </div>
          <span className="text-xs text-slate-500">
            Across open pipeline
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span>Industry Benchmark: {data.weightedWinPropensity.historicalAvg}%</span>
            <span className="text-emerald-700 font-semibold">Strong Momentum</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${data.weightedWinPropensity.current}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline-block" />
            <span>Calibrated across 142 qualified opportunities</span>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Deal Velocity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:shadow-card shadow-card-hover transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-amber-50 text-amber-600">
              <Clock className="w-3.5 h-3.5" />
            </span>
            Average Sales Cycle
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <ArrowDownRight className="w-3 h-3" />
            5.2 days faster
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mt-1">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.dealVelocity.avgDays} <span className="text-lg font-normal text-slate-500">Days</span>
          </div>
          <span className="text-xs text-slate-500">
            from lead to closed-won
          </span>
        </div>

        {/* Velocity benchmark */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
            <span>Target Benchmark: {data.dealVelocity.industryBenchmark}d</span>
            <span className="text-amber-700 font-semibold">29% Faster Cycle</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{ width: `${(data.dealVelocity.avgDays / data.dealVelocity.industryBenchmark) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Accelerated by rapid quote turnaround actions
          </div>
        </div>
      </div>

      {/* 4. Sales Team Capacity */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft hover:shadow-card shadow-card-hover transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-600">
              <Users className="w-3.5 h-3.5" />
            </span>
            Team Workload Capacity
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
            <AlertCircle className="w-3 h-3" />
            {data.capacityUtilization.burnoutRiskCount} Reps Busy
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mt-1">
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.capacityUtilization.percentage}%
          </div>
          <span className="text-xs text-slate-500">
            ({data.capacityUtilization.activeReps}/{data.capacityUtilization.totalReps} Reps Loaded)
          </span>
        </div>

        {/* Capacity Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
            <span>Healthy Target: 70% - 85%</span>
            <span className="text-indigo-600 font-medium">Auto-Balancing</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                data.capacityUtilization.percentage > 90 
                  ? 'bg-rose-500' 
                  : data.capacityUtilization.percentage > 80 
                  ? 'bg-blue-600' 
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${data.capacityUtilization.percentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Quota capacity balanced</span>
            <span className="text-blue-600 font-semibold hover:underline cursor-pointer">View Team &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
