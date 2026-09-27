import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { ExecutiveKpiBar } from './components/layout/ExecutiveKpiBar';
import { HawkesStreamModule } from './components/modules/HawkesStreamModule';
import { PrismProspectingModule } from './components/modules/PrismProspectingModule';
import { CausalXaiWorkspace } from './components/modules/CausalXaiWorkspace';
import { KawasSolverWidget } from './components/modules/KawasSolverWidget';
import { MultimodalTickerModule } from './components/modules/MultimodalTickerModule';
import { 
  executiveKpiData, 
  hawkesTimeSeriesData, 
  recentTouchpoints, 
  prismProspects, 
  opportunityScenarios, 
  kawasRepsData, 
  macroIndicators, 
  callSentimentSnippets 
} from './data/mockData';
import { 
  LayoutDashboard, 
  Zap, 
  Sparkles, 
  BrainCircuit, 
  Scale, 
  Headphones, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [leadsList, setLeadsList] = useState(prismProspects);
  const [isSimulating, setIsSimulating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleAssignLead = (leadId: string, repName: string) => {
    setLeadsList(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: 'Assigned',
          assignedRep: repName
        };
      }
      return lead;
    }));

    showToast(`Lead successfully assigned to ${repName}! PRISM prior prioritized in outbound queue.`);
    
    // Trigger small confetti
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 }
    });
  };

  const handleSyncAI = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      showToast('Neural Hawkes intensity kernels & Causal SHAP graphs recalibrated across all 142 deals.');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-18 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md animate-bounce text-xs font-medium text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <Header onRefresh={handleSyncAI} isSimulating={isSimulating} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Navigation Bar / Module Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0f172a]/60 p-2 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Full Executive Suite</span>
            </button>

            <button
              onClick={() => setActiveTab('hawkes')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'hawkes'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>M1: Continuous Hawkes</span>
            </button>

            <button
              onClick={() => setActiveTab('prism')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'prism'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>M2: PRISM Cold-Start</span>
            </button>

            <button
              onClick={() => setActiveTab('causal')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'causal'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5 text-violet-400" />
              <span>M3: Causal XAI What-If</span>
            </button>

            <button
              onClick={() => setActiveTab('kawas')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'kawas'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>M4: Kawas Allocation</span>
            </button>

            <button
              onClick={() => setActiveTab('multimodal')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'multimodal'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>M5: Multimodal & Macro</span>
            </button>
          </div>

          {/* Horizon Period Selector */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 self-end sm:self-auto px-2">
            <span>Forecast Horizon:</span>
            <span className="font-mono font-semibold text-white px-2 py-1 rounded bg-slate-900 border border-slate-800">
              Q4 Continuous (Rolling 90d)
            </span>
          </div>
        </div>

        {/* Top Executive KPI Bar */}
        <ExecutiveKpiBar data={executiveKpiData} />

        {/* Dashboard Modules Grid */}
        <div className="space-y-6">
          {/* Module 1: Continuous Neural Hawkes Interaction Stream */}
          {(activeTab === 'all' || activeTab === 'hawkes') && (
            <HawkesStreamModule 
              timeSeriesData={hawkesTimeSeriesData} 
              touchpointEvents={recentTouchpoints} 
            />
          )}

          {/* Module 3: Causal XAI & Counterfactual "What-If" Workspace */}
          {(activeTab === 'all' || activeTab === 'causal') && (
            <CausalXaiWorkspace 
              scenarios={opportunityScenarios} 
            />
          )}

          {/* Module 2: Two-Stage PRISM Cold-Start Prospecting View */}
          {(activeTab === 'all' || activeTab === 'prism') && (
            <PrismProspectingModule 
              leads={leadsList} 
              onAssignLead={handleAssignLead} 
            />
          )}

          {/* Module 4: Prescriptive Salesforce Resource Allocation (Kawas Solver Widget) */}
          {(activeTab === 'all' || activeTab === 'kawas') && (
            <KawasSolverWidget 
              reps={kawasRepsData} 
              onRebalance={() => showToast('MILP Simplex Solver converged: Rep workloads balanced within target 85% capacity threshold.')}
            />
          )}

          {/* Module 5: Multimodal Sentiment & Macroeconomic Ticker */}
          {(activeTab === 'all' || activeTab === 'multimodal') && (
            <MultimodalTickerModule 
              macroIndicators={macroIndicators} 
              callSnippets={callSentimentSnippets} 
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="font-semibold text-slate-400">AURA-CRO Enterprise Engine</span>
            <span>• Continuous Hawkes Intensity + Pearl Causal Inference + Mixed-Integer Linear Solver</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono">
            <span>Latency: 18ms</span>
            <span>•</span>
            <span>Hawkes Kernel: Exponential α=1.48</span>
            <span>•</span>
            <span>SHAP Explainer: TreeSHAP v0.44</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
