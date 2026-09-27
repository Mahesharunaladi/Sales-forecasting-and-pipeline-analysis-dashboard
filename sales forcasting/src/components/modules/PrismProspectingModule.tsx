import React, { useState } from 'react';
import { 
  Building2, 
  UserPlus, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Filter, 
  Layers, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { PrismLead } from '../../types/dashboard';

interface PrismProspectingModuleProps {
  leads: PrismLead[];
  onAssignLead: (leadId: string, repName: string) => void;
}

export const PrismProspectingModule: React.FC<PrismProspectingModuleProps> = ({
  leads,
  onAssignLead
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [assigningLeadId, setAssigningLeadId] = useState<string | null>(null);
  const [selectedRep, setSelectedRep] = useState<string>('Sarah Chen');

  const clusters = [
    'all',
    'SaaS Enterprise >$50M ARR',
    'Fintech Series B/C',
    'HealthTech HIPAA Compliance',
    'GovCloud Infrastructure',
    'Global Supply Chain'
  ];

  const availableReps = [
    { name: 'Sarah Chen', tier: 'Strategic Global AE', matchScore: '96% Fit' },
    { name: 'Marcus Vance', tier: 'Enterprise AE', matchScore: '92% Fit' },
    { name: 'Elena Rostova', tier: 'Fintech Specialist AE', matchScore: '98% Fit' },
    { name: 'Devon Wright', tier: 'Mid-Market Lead', matchScore: '84% Fit' }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesCluster = selectedCluster === 'all' || lead.firmographicCluster === selectedCluster;
    const matchesSearch = lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCluster && matchesSearch;
  });

  const handleAssignSubmit = (leadId: string) => {
    onAssignLead(leadId, selectedRep);
    setAssigningLeadId(null);
  };

  const getClusterBadgeColor = (cluster: string) => {
    switch (cluster) {
      case 'SaaS Enterprise >$50M ARR':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Fintech Series B/C':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'HealthTech HIPAA Compliance':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      case 'GovCloud Infrastructure':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  return (
    <div className="rounded-2xl bg-[#0f172a]/90 border border-slate-800 backdrop-blur-md shadow-glass overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white tracking-tight font-['Outfit']">
              Module 2: Two-Stage PRISM Cold-Start Prospecting View
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-slate-800 text-emerald-400 border border-slate-700">
              Pre-Interaction Bayesian Priors
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cold-start lead conversion propensities derived from firmographic cluster topologies, tech stack compatibility, and hiring velocity prior to rep contact.
          </p>
        </div>

        {/* Search & Cluster Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Search company or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-48 lg:w-56"
            />
          </div>

          {/* Cluster filter */}
          <div className="flex items-center space-x-1">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Clusters ({leads.length})</option>
              {clusters.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Prospecting Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <th className="py-3 px-4">B2B Target Company</th>
              <th className="py-3 px-4">Firmographic Cluster</th>
              <th className="py-3 px-4">ARR & Headcount</th>
              <th className="py-3 px-4">Tech Stack Signature</th>
              <th className="py-3 px-4 text-center">PRISM Conversion Prior</th>
              <th className="py-3 px-4">Status & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id}
                className="hover:bg-slate-850/60 transition-colors group"
              >
                {/* Company Name & Logo */}
                <td className="py-3.5 px-4 font-medium text-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-700 flex items-center justify-center font-bold text-sm text-cyan-300 font-['Outfit'] shadow-sm">
                      {lead.logoInitial}
                    </div>
                    <div>
                      <div className="text-white font-semibold flex items-center gap-1.5">
                        {lead.companyName}
                        {lead.urgency === 'Immediate' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="High Urgency Outbound"></span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">ID: {lead.id}</span>
                    </div>
                  </div>
                </td>

                {/* Firmographic Cluster */}
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getClusterBadgeColor(lead.firmographicCluster)}`}>
                    {lead.firmographicCluster}
                  </span>
                </td>

                {/* ARR & Scale */}
                <td className="py-3.5 px-4">
                  <div className="text-slate-300 font-mono font-medium">{lead.estimatedArr}</div>
                  <div className="text-[10px] text-slate-500">{lead.employees} FTEs</div>
                </td>

                {/* Tech Stack Signature */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {lead.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>

                {/* PRISM Conversion Prior Score */}
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-extrabold text-emerald-400 font-['Outfit']">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {lead.prismPropensityScore}%
                    </div>
                    {/* Mini Fit breakdown */}
                    <div className="w-24 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                        style={{ width: `${lead.prismPropensityScore}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5 font-mono">Stage-1 Prior Fit</span>
                  </div>
                </td>

                {/* Status & CTA Action */}
                <td className="py-3.5 px-4">
                  {lead.status === 'Assigned' ? (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        {lead.assignedRep}
                      </span>
                    </div>
                  ) : assigningLeadId === lead.id ? (
                    <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-lg border border-blue-500/50 shadow-lg">
                      <select
                        value={selectedRep}
                        onChange={(e) => setSelectedRep(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-200 text-[11px] rounded px-2 py-1 focus:outline-none"
                      >
                        {availableReps.map(r => (
                          <option key={r.name} value={r.name}>{r.name} ({r.matchScore})</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssignSubmit(lead.id)}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setAssigningLeadId(null)}
                        className="px-1.5 py-1 text-slate-400 hover:text-white text-[10px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAssigningLeadId(lead.id)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Assign Rep</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-950/40 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>Stage 1 PRISM Model trained on 12,400+ Enterprise firmographic conversion graph edges</span>
        </div>
        <div className="text-slate-400 font-mono">
          Showing {filteredLeads.length} of {leads.length} Uncontacted Targets
        </div>
      </div>
    </div>
  );
};
