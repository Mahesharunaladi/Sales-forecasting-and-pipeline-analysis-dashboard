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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Positive (+{(activeSnippet.sentimentScore * 100).toFixed(0)}%)
          </span>
        );
      case 'At-Risk':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse">
            <ShieldAlert className="w-3 h-3" />
            At-Risk ({(activeSnippet.sentimentScore * 100).toFixed(0)}%)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircle className="w-3 h-3" />
            Neutral
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-[#0f172a]/90 border border-slate-800 backdrop-blur-md shadow-glass overflow-hidden flex flex-col">
      {/* Module Header */}
      <div className="p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Headphones className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight font-['Outfit']">
              Module 5: Multimodal Sentiment & Macroeconomic Ticker
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-800 text-amber-400 border border-slate-700">
              Whisper V3 + FinBERT Multi-Modal Embeddings
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time conversational tone extraction from executive sales transcripts synchronized with macroeconomic sector multipliers.
          </p>
        </div>

        {/* Global Multiplier Pill */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Macro Forecast Multiplier: <strong className="text-emerald-400 font-mono">1.048x</strong></span>
          </div>
        </div>
      </div>

      {/* 1. Macroeconomic Ticker Strip */}
      <div className="bg-slate-950/70 border-b border-slate-800/80 px-5 py-3 overflow-x-auto">
        <div className="flex items-center space-x-4 min-w-max">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            Live Macro Feed:
          </span>

          {macroIndicators.map((macro) => (
            <div 
              key={macro.id}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs hover:border-slate-700 transition-colors"
            >
              <span className="text-slate-300 font-medium">{macro.name}</span>
              <span className="font-mono text-white font-bold">{macro.value}</span>
              <span className={`flex items-center text-[10px] font-mono font-bold ${
                macro.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
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
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>Recent Transcript Ingestion</span>
            <span className="text-[10px] text-slate-500 font-normal">Select call to inspect</span>
          </h3>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {callSnippets.map((snippet, idx) => (
              <div
                key={snippet.id}
                onClick={() => setActiveSnippetIndex(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeSnippetIndex === idx
                    ? 'bg-slate-850 border-blue-500/60 shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">
                    {snippet.accountName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ${(snippet.dealAmount / 1000).toFixed(0)}k • {snippet.timestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Mic className="w-3 h-3 text-cyan-400" />
                    {snippet.speaker} ({snippet.speakerRole})
                  </span>
                  {snippet.overallSentiment === 'Positive' ? (
                    <span className="text-emerald-400 font-semibold font-mono text-[10px]">Positive</span>
                  ) : snippet.overallSentiment === 'At-Risk' ? (
                    <span className="text-rose-400 font-semibold font-mono text-[10px]">At-Risk ⚠️</span>
                  ) : (
                    <span className="text-amber-400 font-semibold font-mono text-[10px]">Neutral</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Selected Call Deep Dive & Signal Extraction (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/60 rounded-xl border border-slate-800 p-4.5 flex flex-col justify-between">
          <div>
            {/* Call Detail Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white">
                    {activeSnippet.accountName}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400">
                    (${(activeSnippet.dealAmount / 1000).toFixed(0)}k Pipeline)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Speaker: <strong className="text-slate-200">{activeSnippet.speaker}</strong> ({activeSnippet.speakerRole})
                </div>
              </div>

              <div>
                {getSentimentBadge(activeSnippet.overallSentiment)}
              </div>
            </div>

            {/* Audio Wave Visual representation */}
            <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-850 mb-3 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="flex-1 flex items-center space-x-1 h-6">
                {[12, 24, 18, 36, 48, 20, 60, 42, 28, 55, 75, 45, 30, 65, 80, 50, 35, 70, 40, 25, 60, 45, 30, 20, 10].map((h, i) => (
                  <span 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-300 ${
                      activeSnippet.overallSentiment === 'Positive'
                        ? 'bg-emerald-500/80'
                        : activeSnippet.overallSentiment === 'At-Risk'
                        ? 'bg-rose-500/80'
                        : 'bg-amber-500/80'
                    }`}
                    style={{ height: `${(h / 80) * 100}%` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">04:18 / 32:40</span>
            </div>

            {/* Verbatim Excerpt */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs italic text-slate-200 mb-3 leading-relaxed relative">
              <span className="text-2xl text-slate-600 absolute -top-2 left-2">“</span>
              <p className="pl-4">{activeSnippet.quote}</p>
            </div>

            {/* Extracted Neural Signal */}
            <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 text-xs">
              <div className="flex items-center space-x-1.5 text-cyan-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Extracted Deal Signal & Causal Implication</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activeSnippet.signalExtracted}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between font-mono">
            <span>FinBERT Polarity: {activeSnippet.sentimentScore > 0 ? `+${activeSnippet.sentimentScore}` : activeSnippet.sentimentScore}</span>
            <span className="text-cyan-400">Confidence: 94.6%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
