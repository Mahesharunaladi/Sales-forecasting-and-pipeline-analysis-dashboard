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
  Target
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
  // Base win rate + latency delta effect + sponsor meetings effect + discount elasticity
  const calculateSimulatedWinRate = (): number => {
    const base = currentScenario.baseWinRate;
    
    // Latency effect: each day faster than current adds +2.8%, each day slower removes -3.2%
    const latencyDiff = currentScenario.currentQuoteLatency - quoteLatencyDays;
    const latencyImpact = latencyDiff > 0 ? latencyDiff * 2.8 : latencyDiff * 3.2;

    // Sponsor meetings effect: each extra meeting adds +5.5%, fewer meetings deducts -7.0%
    const meetingDiff = sponsorMeetings - currentScenario.currentSponsorMeetings;
    const meetingImpact = meetingDiff > 0 ? meetingDiff * 5.5 : meetingDiff * 7.0;

    // Discount effect: non-linear optimal elasticity
    const discountDiff = currentScenario.currentDiscount - discountPct;
    const discountImpact = discountDiff * -0.8; // higher discount slightly improves close rate, but with diminishing returns

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
    <div className="rounded-2xl bg-[#0f172a]/90 border border-slate-800 backdrop-blur-md shadow-glass overflow-hidden flex flex-col">
      {/* Workspace Header & Account Selector */}
      <div className="p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight font-['Outfit']">
              Module 3: Causal XAI & Counterfactual "What-If" Workspace
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-800 text-violet-400 border border-slate-700">
              SHAP Attributions + Pearl Causal Graph
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explainable AI feature attribution with real-time counterfactual interventions to model win-rate sensitivity.
          </p>
        </div>

        {/* Opportunity Selector Dropdown */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <label className="text-xs text-slate-400 font-medium">Target Account:</label>
          <select
            value={selectedOppId}
            onChange={(e) => setSelectedOppId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white font-medium text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-violet-500 shadow-inner"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
        {/* Left: SHAP Attribution Bar Chart (6 Cols) */}
        <div className="lg:col-span-6 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  SHAP Value Factor Attributions
                </h3>
                <p className="text-[11px] text-slate-400">
                  Marginal contribution of key drivers to current <strong className="text-white">{currentScenario.baseWinRate}%</strong> win propensity
                </p>
              </div>

              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Owner: {currentScenario.leadOwner}
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis 
                    type="number" 
                    domain={[-30, 30]} 
                    tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}%`}
                    stroke="#64748b"
                    fontSize={10}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="featureName" 
                    stroke="#94a3b8" 
                    fontSize={11}
                    width={140}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as ShapFactor;
                        return (
                          <div className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-xs max-w-xs shadow-xl">
                            <div className="font-bold text-white flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                              <span>{data.featureName}</span>
                              <span className={data.impactPercentage > 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                                {data.impactPercentage > 0 ? `+${data.impactPercentage}%` : `${data.impactPercentage}%`}
                              </span>
                            </div>
                            <p className="text-slate-300 text-[11px] mt-1.5 leading-relaxed">
                              {data.description}
                            </p>
                            <div className="mt-1 text-[10px] text-slate-500 font-mono">
                              Category: {data.category}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine x={0} stroke="#475569" strokeWidth={1.5} />
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
          <div className="mt-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px]">
            <div className="flex items-center space-x-2 text-rose-400 font-semibold mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Primary Bottleneck Detected</span>
            </div>
            <p className="text-slate-300 leading-snug">
              Quote turnaround latency ({currentScenario.currentQuoteLatency} days) imposes a <strong className="text-rose-400 font-mono">-22%</strong> penalty on deal closure due to lack of competitive agility.
            </p>
          </div>
        </div>

        {/* Right: Counterfactual Simulation & Output Card (6 Cols) */}
        <div className="lg:col-span-6 p-5 flex flex-col justify-between bg-slate-950/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-violet-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Counterfactual "What-If" Sliders
                </h3>
              </div>
              <button
                onClick={handleResetSliders}
                className="flex items-center space-x-1 text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Baseline</span>
              </button>
            </div>

            {/* Interactive Sliders */}
            <div className="space-y-4">
              {/* Slider 1: Quote Latency (Days) */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Quote Revision Latency</span>
                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    quoteLatencyDays <= 4 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-200'
                  }`}>
                    {quoteLatencyDays} Days {quoteLatencyDays <= 4 && '⚡ Optimal'}
                  </span>
                </div>
                <input 
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={quoteLatencyDays}
                  onChange={(e) => setQuoteLatencyDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 Day (Ultra-Fast)</span>
                  <span className="text-slate-400">Current: {currentScenario.currentQuoteLatency}d</span>
                  <span>20 Days (Stalled)</span>
                </div>
              </div>

              {/* Slider 2: Executive Sponsor Meetings */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Executive Sponsor Alignments</span>
                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                    sponsorMeetings >= 3 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-200'
                  }`}>
                    {sponsorMeetings} Meetings {sponsorMeetings >= 3 && '🎯 Multi-Threaded'}
                  </span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={sponsorMeetings}
                  onChange={(e) => setSponsorMeetings(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0 (Single-Thread)</span>
                  <span className="text-slate-400">Current: {currentScenario.currentSponsorMeetings}</span>
                  <span>8 (C-Suite Embedded)</span>
                </div>
              </div>

              {/* Slider 3: Discount / Concession % */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Target Discount / Margin Concession</span>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200">
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0% (Full Price)</span>
                  <span className="text-slate-400">Current: {currentScenario.currentDiscount}%</span>
                  <span>30% (High Margin Cut)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Counterfactual Output Card */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 border border-violet-500/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-violet-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  Live Counterfactual Projection
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-slate-400 text-sm line-through font-mono">
                    {currentScenario.baseWinRate}%
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-2xl font-extrabold text-white font-['Outfit']">
                    {simulatedWinRate}%
                  </span>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                    winRateDelta >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {winRateDelta >= 0 ? `+${winRateDelta}%` : `${winRateDelta}%`}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400">Expected Value Delta</span>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  +${Math.round(((simulatedWinRate - currentScenario.baseWinRate) / 100) * currentScenario.amount).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Prescriptive Guidance */}
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {quoteLatencyDays <= 4 
                  ? 'High-Impact Action: Turnaround ≤ 4 days accelerates closing cycle by +21 days.' 
                  : 'Actionable: Reducing quote turnaround below 4 days yields an instant +14% lift in win propensity.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
