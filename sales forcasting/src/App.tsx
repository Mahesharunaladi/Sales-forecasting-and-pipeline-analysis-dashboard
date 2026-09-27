import React, { useState } from 'react';
import { LandingPage } from './components/landing/LandingPage';
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
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Jordan Davis',
    email: 'jordan.davis@salespulse.com',
    role: 'VP of Sales'
  });

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

  const handleLogin = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    showToast(`Welcome back, ${user.name}! Live pipeline metrics loaded.`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#6366f1']
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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

    showToast(`Lead assigned to ${repName}! Prioritized in outbound pipeline.`);
    
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
      showToast('Sales forecast models recalibrated across all 142 deals.');
    }, 1000);
  };

  // If not logged in, render the Landing Page with workflow explanation & login/register
  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-xl bg-white border border-emerald-500 shadow-xl animate-bounce text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <Header 
        onRefresh={handleSyncAI} 
        isSimulating={isSimulating}
        onLogout={handleLogout}
        user={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Navigation Bar / Module Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('hawkes')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'hawkes'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Buyer Engagement</span>
            </button>

            <button
              onClick={() => setActiveTab('causal')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'causal'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
              <span>"What-If" Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('prism')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'prism'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prospecting Prioritization</span>
            </button>

            <button
              onClick={() => setActiveTab('kawas')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'kawas'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              <span>Team Capacity Planner</span>
            </button>

            <button
              onClick={() => setActiveTab('multimodal')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'multimodal'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-amber-600" />
              <span>Call Sentiment & Market</span>
            </button>
          </div>

          {/* Horizon Period Selector */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 self-end sm:self-auto px-2">
            <span>Forecast Horizon:</span>
            <span className="font-semibold text-slate-900 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
              Q4 Continuous (Rolling 90 Days)
            </span>
          </div>
        </div>

        {/* Top Executive KPI Bar */}
        <ExecutiveKpiBar data={executiveKpiData} />

        {/* Dashboard Modules Grid */}
        <div className="space-y-6">
          {/* Module 1: Continuous Buyer Engagement */}
          {(activeTab === 'all' || activeTab === 'hawkes') && (
            <HawkesStreamModule 
              timeSeriesData={hawkesTimeSeriesData} 
              touchpointEvents={recentTouchpoints} 
            />
          )}

          {/* Module 3: Causal XAI & Counterfactual What-If Workspace */}
          {(activeTab === 'all' || activeTab === 'causal') && (
            <CausalXaiWorkspace 
              scenarios={opportunityScenarios} 
            />
          )}

          {/* Module 2: Prospecting Prioritization (PRISM) */}
          {(activeTab === 'all' || activeTab === 'prism') && (
            <PrismProspectingModule 
              leads={leadsList} 
              onAssignLead={handleAssignLead} 
            />
          )}

          {/* Module 4: Sales Team Capacity & Smart Routing */}
          {(activeTab === 'all' || activeTab === 'kawas') && (
            <KawasSolverWidget 
              reps={kawasRepsData} 
              onRebalance={() => showToast('Team capacity balanced: workloads distributed within healthy 85% utilization threshold.')}
            />
          )}

          {/* Module 5: Customer Call Sentiment & Macroeconomic Pulse */}
          {(activeTab === 'all' || activeTab === 'multimodal') && (
            <MultimodalTickerModule 
              macroIndicators={macroIndicators} 
              callSnippets={callSentimentSnippets} 
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500 shadow-soft">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="font-semibold text-slate-700">SalesPulse Platform</span>
            <span>&bull; Continuous Hawkes Event Process + Causal Explainability + Capacity Balancing</span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium text-slate-500">
            <span>Model Latency: 18ms</span>
            <span>•</span>
            <span>Accuracy: 95% CI</span>
            <span>•</span>
            <button 
              onClick={handleLogout}
              className="text-blue-600 hover:underline"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
