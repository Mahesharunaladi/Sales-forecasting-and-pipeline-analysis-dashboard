import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { 
  Zap, 
  Clock, 
  Mail, 
  FileText, 
  Video, 
  Shield, 
  Lock, 
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { HawkesStreamPoint, TouchpointEvent, InteractionEventType } from '../../types/dashboard';

interface HawkesStreamModuleProps {
  timeSeriesData: HawkesStreamPoint[];
  touchpointEvents: TouchpointEvent[];
}

export const HawkesStreamModule: React.FC<HawkesStreamModuleProps> = ({
  timeSeriesData,
  touchpointEvents
}) => {
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'intensity' | 'propensity'>('intensity');

  const getEventIcon = (type: InteractionEventType) => {
    switch (type) {
      case 'email_sent':
      case 'email_opened':
        return <Mail className="w-3.5 h-3.5 text-blue-400" />;
      case 'portal_login':
        return <Lock className="w-3.5 h-3.5 text-cyan-400" />;
      case 'quote_modified':
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case 'executive_call':
        return <Video className="w-3.5 h-3.5 text-emerald-400" />;
      case 'security_review':
        return <Shield className="w-3.5 h-3.5 text-violet-400" />;
      case 'contract_redline':
        return <FileText className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const filteredTouchpoints = selectedEventType === 'all' 
    ? touchpointEvents 
    : touchpointEvents.filter(t => t.eventType === selectedEventType);

  return (
    <div className="rounded-2xl bg-[#0f172a]/90 border border-slate-800 backdrop-blur-md shadow-glass overflow-hidden flex flex-col">
      {/* Module Header */}
      <div className="p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight font-['Outfit']">
              Module 1: Continuous Neural Hawkes Interaction Stream
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-800 text-cyan-400 border border-slate-700">
              λ(t) Point Process
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Captures asynchronous buyer-seller intensity bursts & real-time win-propensity decay without artificial quarter boundaries.
          </p>
        </div>

        {/* View toggles & equation badge */}
        <div className="flex items-center space-x-2">
          <div className="hidden xl:flex items-center text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            <span>λ(t) = μ + Σ α·e<sup>-β(t - tᵢ)</sup></span>
          </div>

          <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('intensity')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'intensity'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hawkes Intensity λ(t)
            </button>
            <button
              onClick={() => setActiveTab('propensity')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'propensity'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Propensity Decay Curve
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart + Live Event Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
        {/* Left: Continuous Point Process Area Chart (7 Cols) */}
        <div className="lg:col-span-7 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-300">
                {activeTab === 'intensity' ? 'Point-Process Excitement Surge vs Baseline Decay' : 'Real-Time Win Propensity Trajectory (%)'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            
            <div className="flex items-center space-x-3 text-[11px]">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
                <span className="text-slate-400">Interaction Burst</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600"></span>
                <span className="text-slate-400">Base Decay μ</span>
              </div>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Blue Intensity Gradient */}
                  <linearGradient id="hawkesIntensityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Emerald Propensity Gradient */}
                  <linearGradient id="hawkesPropensityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Decay Gradient */}
                  <linearGradient id="decayGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false}
                  domain={activeTab === 'intensity' ? [0, 100] : [50, 100]}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as HawkesStreamPoint;
                      return (
                        <div className="bg-[#0f172a] border border-slate-700 rounded-lg p-3 shadow-xl text-xs space-y-1">
                          <div className="flex items-center justify-between gap-4 font-semibold text-white border-b border-slate-800 pb-1">
                            <span>Time: {label} (Day {data.dayIndex})</span>
                            <span className="text-cyan-400 font-mono">λ = {data.intensity}</span>
                          </div>
                          <div className="text-slate-300 flex justify-between gap-4">
                            <span>Hawkes Intensity:</span>
                            <span className="font-bold text-blue-400">{data.intensity} pts</span>
                          </div>
                          <div className="text-slate-300 flex justify-between gap-4">
                            <span>Win Propensity:</span>
                            <span className="font-bold text-emerald-400">{data.winPropensityDecay}%</span>
                          </div>
                          {data.keyEvent && (
                            <div className="mt-1.5 pt-1 border-t border-slate-800 text-[11px] text-amber-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>{data.keyEvent}</span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {activeTab === 'intensity' ? (
                  <>
                    <Area 
                      type="monotone" 
                      dataKey="baselineDecay" 
                      stroke="#475569" 
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="url(#decayGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="intensity" 
                      stroke="#3b82f6" 
                      strokeWidth={2.5}
                      fill="url(#hawkesIntensityGradient)" 
                    />
                  </>
                ) : (
                  <Area 
                    type="monotone" 
                    dataKey="winPropensityDecay" 
                    stroke="#10b981" 
                    strokeWidth={2.5}
                    fill="url(#hawkesPropensityGradient)" 
                  />
                )}

                {/* Event Markers */}
                <ReferenceLine x="15:00" stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Quote v3', fill: '#f59e0b', fontSize: 10, position: 'top' }} />
                <ReferenceLine x="10:15" stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Exec Demo', fill: '#10b981', fontSize: 10, position: 'top' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Model Note */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Excitement self-excitation factor α = 1.48 | Memory decay β = 0.22/day
            </span>
            <span className="text-slate-400 font-mono">No rigid Q-end bias</span>
          </div>
        </div>

        {/* Right: Real-Time Customer Touchpoint Feed (5 Cols) */}
        <div className="lg:col-span-5 p-5 flex flex-col justify-between bg-slate-950/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Live Touchpoint Stream
                </h3>
              </div>
              
              {/* Event Type Filter */}
              <div className="flex items-center space-x-1 text-[11px]">
                <Filter className="w-3 h-3 text-slate-400" />
                <select 
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-2 py-0.5 text-[11px] focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Events ({touchpointEvents.length})</option>
                  <option value="quote_modified">Quotes</option>
                  <option value="executive_call">Exec Calls</option>
                  <option value="security_review">Security</option>
                  <option value="portal_login">Portals</option>
                </select>
              </div>
            </div>

            {/* Event List */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {filteredTouchpoints.map((event) => (
                <div 
                  key={event.id}
                  className="group relative p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700/80 mt-0.5">
                        {getEventIcon(event.eventType)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {event.accountName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            (${(event.dealSize / 1000).toFixed(0)}k)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                          {event.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-slate-500">
                          <span>Owner: <strong className="text-slate-400">{event.rep}</strong></span>
                          <span>•</span>
                          <span>{event.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Excitement Score Pill */}
                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ArrowUpRight className="w-2.5 h-2.5" />
                        S: {event.excitementScore}
                      </span>
                      <span className="text-[9px] text-cyan-400/80 font-mono mt-0.5">
                        +{event.intensityBurst} λ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Hawkes Stream Ingesting
            </span>
            <span className="text-slate-500 font-mono">Poll: 500ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
