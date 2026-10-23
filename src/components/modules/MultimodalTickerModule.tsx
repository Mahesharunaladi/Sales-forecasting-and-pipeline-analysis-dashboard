import React, { useState } from 'react';
import { 
  Globe, 
  Headphones, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Mic, 
  Radio, 
  Volume2, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { MacroIndicator, CallSentimentSnippet } from '../../types/dashboard';

interface MultimodalTickerModuleProps {
  macroIndicators: MacroIndicator[];
  callSnippets: CallSentimentSnippet[];
}

export const MultimodalTickerModule: React.FC<MultimodalTickerModuleProps> = ({
  macroIndicators,
  callSnippets
}) => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const activeSnippet = callSnippets[activeSnippetIndex] || callSnippets[0];

  const getSentimentBadge = (sentiment: 'Positive' | 'Neutral' | 'At-Risk') => {
    switch (sentiment) {
      case 'Positive':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Positive Buyer Sentiment (+{(activeSnippet.sentimentScore * 100).toFixed(0)}%)
          </span>
        );
      case 'At-Risk':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            Needs Attention ({(activeSnippet.sentimentScore * 100).toFixed(0)}%)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Neutral Sentiment
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-soft overflow-hidden flex flex-col">
      {/* Module Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/50">
              <Headphones className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Customer Call Sentiment & Macroeconomic Pulse
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100/70 text-amber-900">
              Voice AI + Market Factors
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Transcribes executive sales calls to detect buyer excitement and contract risks, layered with macroeconomic tech sector trends.
          </p>
        </div>

        {/* Global Multiplier Pill */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Market Multiplier: <strong className="text-emerald-700">+4.8% Tailwinds</strong></span>
          </div>
        </div>
      </div>

      {/* 1. Macroeconomic Ticker Strip */}
      <div className="bg-slate-50/80 border-b border-slate-200 px-5 py-3 overflow-x-auto">
        <div className="flex items-center space-x-3.5 min-w-max">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            Market Pulse:
          </span>

          {macroIndicators.map((macro) => (
            <div 
              key={macro.id}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs shadow-soft hover:border-slate-300 transition-colors"
            >
              <span className="text-slate-600 font-medium">{macro.name}</span>
              <span className="text-slate-900 font-bold">{macro.value}</span>
              <span className={`flex items-center text-xs font-bold ${
                macro.change >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {macro.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {macro.change > 0 ? `+${macro.change}%` : `${macro.change}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Conversational Audio / Transcript Intelligence */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Transcript Selector & Call Snippets (5 Cols) */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
            <span>Recent Call Recordings</span>
            <span className="text-slate-400 font-normal">Click to listen</span>
          </h3>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {callSnippets.map((snippet, idx) => (
              <div
                key={snippet.id}
                onClick={() => setActiveSnippetIndex(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeSnippetIndex === idx
                    ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">
                    {snippet.accountName}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ${(snippet.dealAmount / 1000).toFixed(0)}k • {snippet.timestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Mic className="w-3.5 h-3.5 text-blue-600" />
                    {snippet.speaker} ({snippet.speakerRole})
                  </span>
                  {snippet.overallSentiment === 'Positive' ? (
                    <span className="text-emerald-700 font-bold text-[11px]">Positive 👍</span>
                  ) : snippet.overallSentiment === 'At-Risk' ? (
                    <span className="text-rose-700 font-bold text-[11px]">At-Risk ⚠️</span>
                  ) : (
                    <span className="text-amber-800 font-bold text-[11px]">Neutral</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Call Deep Dive & Signal Extraction (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-50/60 rounded-xl border border-slate-200 p-4.5 flex flex-col justify-between">
          <div>
            {/* Call Detail Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {activeSnippet.accountName}
                  </h4>
                  <span className="text-xs font-semibold text-blue-700">
                    (${(activeSnippet.dealAmount / 1000).toFixed(0)}k Deal)
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Speaker: <strong className="text-slate-800">{activeSnippet.speaker}</strong> ({activeSnippet.speakerRole})
                </div>
              </div>

              <div>
                {getSentimentBadge(activeSnippet.overallSentiment)}
              </div>
            </div>

            {/* Audio Wave Visual representation */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 mb-3 flex items-center space-x-3 shadow-soft">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center space-x-1 h-6">
                {[12, 24, 18, 36, 48, 20, 60, 42, 28, 55, 75, 45, 30, 65, 80, 50, 35, 70, 40, 25, 60, 45, 30, 20, 10].map((h, i) => (
                  <span 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-300 ${
                      activeSnippet.overallSentiment === 'Positive'
                        ? 'bg-emerald-500'
                        : activeSnippet.overallSentiment === 'At-Risk'
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ height: `${(h / 80) * 100}%` }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-slate-500 shrink-0">04:18 / 32:40</span>
            </div>

            {/* Verbatim Excerpt */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs italic text-slate-800 mb-3 leading-relaxed shadow-soft">
              <p>“{activeSnippet.quote}”</p>
            </div>

            {/* Extracted Neural Signal */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
              <div className="flex items-center space-x-1.5 text-blue-800 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Extracted Key Signal & Sales Action</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {activeSnippet.signalExtracted}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Sentiment Confidence: 94.6%</span>
            <span className="text-blue-700 font-semibold">Ready for Next Action</span>
          </div>
        </div>
      </div>
    </div>
  );
};
