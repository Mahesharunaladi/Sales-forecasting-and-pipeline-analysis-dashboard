import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine, 
  Cell,
  CartesianGrid
} from 'recharts';
import { 
  Sliders, 
  BrainCircuit, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Check, 
  RotateCcw,
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';
import { OpportunityScenario, ShapFactor } from '../../types/dashboard';

interface CausalXaiWorkspaceProps {
  scenarios: OpportunityScenario[];
}

export const CausalXaiWorkspace: React.FC<CausalXaiWorkspaceProps> = ({ scenarios }) => {
  const [selectedOppId, setSelectedOppId] = useState<string>(scenarios[0].id);
  const currentScenario = scenarios.find(s => s.id === selectedOppId) || scenarios[0];

  // Interactive Counterfactual Sliders State
  const [quoteLatencyDays, setQuoteLatencyDays] = useState<number>(currentScenario.currentQuoteLatency);
  const [sponsorMeetings, setSponsorMeetings] = useState<number>(currentScenario.currentSponsorMeetings);
  const [discountPct, setDiscountPct] = useState<number>(currentScenario.currentDiscount);

  // Sync sliders when scenario changes
  useEffect(() => {
    setQuoteLatencyDays(currentScenario.currentQuoteLatency);
    setSponsorMeetings(currentScenario.currentSponsorMeetings);
    setDiscountPct(currentScenario.currentDiscount);
  }, [selectedOppId, currentScenario]);

  // Causal simulation calculation
  const calculateSimulatedWinRate = (): number => {
    const base = currentScenario.baseWinRate;
    
    // Latency effect: each day faster adds +2.8%, each day slower removes -3.2%
    const latencyDiff = currentScenario.currentQuoteLatency - quoteLatencyDays;
    const latencyImpact = latencyDiff > 0 ? latencyDiff * 2.8 : latencyDiff * 3.2;

    // Sponsor meetings effect: each extra meeting adds +5.5%
    const meetingDiff = sponsorMeetings - currentScenario.currentSponsorMeetings;
    const meetingImpact = meetingDiff > 0 ? meetingDiff * 5.5 : meetingDiff * 7.0;

    // Discount effect
    const discountDiff = currentScenario.currentDiscount - discountPct;
    const discountImpact = discountDiff * -0.8;

    const result = Math.round(Math.min(99, Math.max(10, base + latencyImpact + meetingImpact + discountImpact)));
    return result;
  };

  const simulatedWinRate = calculateSimulatedWinRate();
  const winRateDelta = simulatedWinRate - currentScenario.baseWinRate;

  const handleResetSliders = () => {
    setQuoteLatencyDays(currentScenario.currentQuoteLatency);
    setSponsorMeetings(currentScenario.currentSponsorMeetings);
    setDiscountPct(currentScenario.currentDiscount);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-soft overflow-hidden flex flex-col">
      {/* Workspace Header & Account Selector */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/50">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Deal Win Drivers & Interactive "What-If" Simulator
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100/70 text-indigo-700">
              Explainable AI (SHAP)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            See exactly why deals are won or stalled, and simulate how reducing quote turnaround or booking executive meetings boosts win rates.
          </p>
        </div>

        {/* Opportunity Selector Dropdown */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <label className="text-xs text-slate-600 font-semibold">Select Deal:</label>
          <select
            value={selectedOppId}
            onChange={(e) => setSelectedOppId(e.target.value)}
            className="bg-white border border-slate-300 text-slate-800 font-semibold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 shadow-sm"
          >
            {scenarios.map((scen) => (
              <option key={scen.id} value={scen.id}>
                {scen.name} • {scen.stage}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Left: SHAP Attribution Bar Chart (6 Cols) */}
        <div className="lg:col-span-6 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Deal Drivers & Risk Factors
                </h3>
                <p className="text-xs text-slate-500">
                  Impact on current <strong className="text-slate-900">{currentScenario.baseWinRate}%</strong> win propensity
                </p>
              </div>

              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Rep: {currentScenario.leadOwner}
              </span>
            </div>

            {/* Horizontal SHAP Bar Chart */}
            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={currentScenario.shapFactors}
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis 
                    type="number" 
                    domain={[-30, 30]} 
                    tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}%`}
                    stroke="#94a3b8"
                    fontSize={11}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="featureName" 
                    stroke="#475569" 
                    fontSize={11}
                    width={140}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as ShapFactor;
                        return (
                          <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs max-w-xs shadow-xl text-slate-800">
                            <div className="font-bold text-slate-900 flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                              <span>{data.featureName}</span>
                              <span className={data.impactPercentage > 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                                {data.impactPercentage > 0 ? `+${data.impactPercentage}%` : `${data.impactPercentage}%`}
                              </span>
                            </div>
                            <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                              {data.description}
                            </p>
                            <div className="mt-1 text-[11px] text-slate-400">
                              Category: {data.category}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine x={0} stroke="#cbd5e1" strokeWidth={1.5} />
                  <Bar dataKey="impactPercentage" radius={[4, 4, 4, 4]}>
                    {currentScenario.shapFactors.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.impactPercentage >= 0 ? '#10b981' : '#f43f5e'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Risk Summary */}
          <div className="mt-3 p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 text-xs">
            <div className="flex items-center space-x-2 text-rose-800 font-bold mb-1">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Primary Bottleneck to Fix</span>
            </div>
            <p className="text-rose-900 leading-snug">
              Quote revision latency is currently taking {currentScenario.currentQuoteLatency} days, which imposes a <strong className="font-bold text-rose-700">-22%</strong> penalty on closing this deal.
            </p>
          </div>
        </div>

        {/* Right: Counterfactual Simulation & Output Card (6 Cols) */}
        <div className="lg:col-span-6 p-5 flex flex-col justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Simulate Deal Interventions
                </h3>
              </div>
              <button
                onClick={handleResetSliders}
                className="flex items-center space-x-1 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sliders</span>
              </button>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-3.5">
              {/* Slider 1: Quote Latency (Days) */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-soft">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Quote Revision Speed</span>
                  <span className={`font-bold text-xs px-2.5 py-0.5 rounded-full ${
                    quoteLatencyDays <= 4 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {quoteLatencyDays} Days {quoteLatencyDays <= 4 && '⚡ Fast Turnaround'}
                  </span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={quoteLatencyDays}
                  onChange={(e) => setQuoteLatencyDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1 Day (Instant)</span>
                  <span className="text-slate-700 font-medium">Current: {currentScenario.currentQuoteLatency}d</span>
                  <span>20 Days (Slow)</span>
                </div>
              </div>

              {/* Slider 2: Executive Sponsor Meetings */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-soft">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Executive Sponsor Meetings</span>
                  <span className={`font-bold text-xs px-2.5 py-0.5 rounded-full ${
                    sponsorMeetings >= 3 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {sponsorMeetings} Meetings {sponsorMeetings >= 3 && '🎯 C-Suite Aligned'}
                  </span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={sponsorMeetings}
                  onChange={(e) => setSponsorMeetings(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0 (No Exec Access)</span>
                  <span className="text-slate-700 font-medium">Current: {currentScenario.currentSponsorMeetings}</span>
                  <span>8 (Deeply Connected)</span>
                </div>
              </div>

              {/* Slider 3: Discount / Concession % */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-soft">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Price Discount / Concession</span>
                  <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {discountPct}%
                  </span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0% (Standard)</span>
                  <span className="text-slate-700 font-medium">Current: {currentScenario.currentDiscount}%</span>
                  <span>30% (High Discount)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Counterfactual Output Card */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-200/80 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Simulated Win Propensity
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-slate-400 text-sm line-through">
                    {currentScenario.baseWinRate}%
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-2xl font-extrabold text-slate-900">
                    {simulatedWinRate}%
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    winRateDelta >= 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {winRateDelta >= 0 ? `+${winRateDelta}%` : `${winRateDelta}%`}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-500">Pipeline Value Gain</span>
                <div className="text-sm font-bold text-emerald-700">
                  +${Math.round(((simulatedWinRate - currentScenario.baseWinRate) / 100) * currentScenario.amount).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Prescriptive Guidance */}
            <div className="mt-3 pt-2.5 border-t border-blue-100 text-xs text-slate-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                {quoteLatencyDays <= 4 
                  ? 'Great Plan: Accelerating quote turnaround to ≤ 4 days will cut the sales cycle by 21 days.' 
                  : 'Recommended Action: Reducing quote turnaround under 4 days gives an immediate +14% lift in win probability.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
