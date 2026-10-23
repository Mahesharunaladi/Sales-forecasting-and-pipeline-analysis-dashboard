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
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'portal_login':
        return <Lock className="w-4 h-4 text-indigo-600" />;
      case 'quote_modified':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'executive_call':
        return <Video className="w-4 h-4 text-emerald-600" />;
      case 'security_review':
        return <Shield className="w-4 h-4 text-violet-600" />;
      case 'contract_redline':
        return <FileText className="w-4 h-4 text-rose-600" />;
      default:
        return <Zap className="w-4 h-4 text-blue-600" />;
    }
  };

  const filteredTouchpoints = selectedEventType === 'all' 
    ? touchpointEvents 
    : touchpointEvents.filter(t => t.eventType === selectedEventType);

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-soft overflow-hidden flex flex-col">
      {/* Module Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/50">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Continuous Buyer Engagement & Activity Spikes
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100/70 text-blue-700">
              Hawkes Point Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizes real-time buyer signals (quote views, security reviews, exec calls) and how engagement naturally peaks and decays over continuous time.
          </p>
        </div>

        {/* View toggles */}
        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('intensity')}
              className={`px-3 py-1.5 rounded-md transition-all font-semibold ${
                activeTab === 'intensity'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Activity Intensity
            </button>
            <button
              onClick={() => setActiveTab('propensity')}
              className={`px-3 py-1.5 rounded-md transition-all font-semibold ${
                activeTab === 'propensity'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Win Propensity Curve
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart + Live Event Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Left: Continuous Point Process Area Chart (7 Cols) */}
        <div className="lg:col-span-7 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-700">
                {activeTab === 'intensity' ? 'Engagement Spikes vs Baseline Decay Trajectory' : 'Live Deal Win Probability (%)'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span>
                <span className="text-slate-600">Buyer Activity Spikes</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300"></span>
                <span className="text-slate-500">Baseline Decay</span>
              </div>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Blue Intensity Gradient */}
                  <linearGradient id="lightHawkesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Emerald Propensity Gradient */}
                  <linearGradient id="lightPropensityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false}
                  domain={activeTab === 'intensity' ? [0, 100] : [50, 100]}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as HawkesStreamPoint;
                      return (
                        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-xs space-y-1 text-slate-800">
                          <div className="flex items-center justify-between gap-4 font-bold text-slate-900 border-b border-slate-100 pb-1">
                            <span>Time: {label} (Day {data.dayIndex})</span>
                            <span className="text-blue-600 font-mono">Intensity: {data.intensity}</span>
                          </div>
                          <div className="text-slate-600 flex justify-between gap-4">
                            <span>Activity Score:</span>
                            <span className="font-bold text-blue-600">{data.intensity} pts</span>
                          </div>
                          <div className="text-slate-600 flex justify-between gap-4">
                            <span>Win Probability:</span>
                            <span className="font-bold text-emerald-600">{data.winPropensityDecay}%</span>
                          </div>
                          {data.keyEvent && (
                            <div className="mt-1.5 pt-1 border-t border-slate-100 text-[11px] text-amber-700 font-medium flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
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
                      stroke="#94a3b8" 
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="#f8fafc" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="intensity" 
                      stroke="#2563eb" 
                      strokeWidth={2.5}
                      fill="url(#lightHawkesGradient)" 
                    />
                  </>
                ) : (
                  <Area 
                    type="monotone" 
                    dataKey="winPropensityDecay" 
                    stroke="#10b981" 
                    strokeWidth={2.5}
                    fill="url(#lightPropensityGradient)" 
                  />
                )}

                <ReferenceLine x="15:00" stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Quote v3', fill: '#d97706', fontSize: 10, position: 'top' }} />
                <ReferenceLine x="10:15" stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Exec Demo', fill: '#059669', fontSize: 10, position: 'top' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Model Note */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Self-exciting customer interaction model (auto-adjusts for deal momentum)
            </span>
            <span className="text-slate-600 font-medium">Continuous Time</span>
          </div>
        </div>

        {/* Right: Real-Time Customer Touchpoint Feed (5 Cols) */}
        <div className="lg:col-span-5 p-5 flex flex-col justify-between bg-slate-50/40">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Recent Customer Touchpoints
                </h3>
              </div>
              
              {/* Event Type Filter */}
              <div className="flex items-center space-x-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select 
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
                >
                  <option value="all">All Touchpoints ({touchpointEvents.length})</option>
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
                  className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-soft hover:shadow-card transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 mt-0.5">
                        {getEventIcon(event.eventType)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {event.accountName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            (${(event.dealSize / 1000).toFixed(0)}k)
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug mt-0.5">
                          {event.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
                          <span>Owner: <strong className="text-slate-700">{event.rep}</strong></span>
                          <span>•</span>
                          <span>{event.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Excitement Score Pill */}
                    <div className="text-right flex flex-col items-end">
                      <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ArrowUpRight className="w-3 h-3" />
                        {event.excitementScore} pts
                      </span>
                      <span className="text-[10px] text-blue-600 font-medium mt-0.5">
                        +{event.intensityBurst} surge
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Feed Active
            </span>
            <span className="text-slate-400">Sync interval: 500ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
