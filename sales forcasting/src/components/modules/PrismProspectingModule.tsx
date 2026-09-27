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
    { name: 'Sarah Chen', tier: 'Enterprise Specialist', matchScore: '96% Fit' },
    { name: 'Marcus Vance', tier: 'Strategic AE', matchScore: '92% Fit' },
    { name: 'Elena Rostova', tier: 'Fintech Specialist', matchScore: '98% Fit' },
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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Fintech Series B/C':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'HealthTech HIPAA Compliance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'GovCloud Infrastructure':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-soft overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/50">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Uncontacted Leads & Cold-Start Prioritization (PRISM)
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100/70 text-emerald-800">
              AI Conversion Priors
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Scores uncontacted accounts based on company size, tech stack compatibility, and hiring velocity before any sales rep outreach.
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
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-48 lg:w-56 shadow-sm"
            />
          </div>

          {/* Cluster filter */}
          <div className="flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="all">All Segments ({leads.length})</option>
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
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
              <th className="py-3.5 px-4">Target Company</th>
              <th className="py-3.5 px-4">Industry Segment</th>
              <th className="py-3.5 px-4">ARR & Team Size</th>
              <th className="py-3.5 px-4">Tech Stack</th>
              <th className="py-3.5 px-4 text-center">Predicted Fit</th>
              <th className="py-3.5 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                {/* Company Name & Logo */}
                <td className="py-3.5 px-4 font-medium text-slate-900">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-sm text-blue-700 shadow-sm">
                      {lead.logoInitial}
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold flex items-center gap-1.5">
                        {lead.companyName}
                        {lead.urgency === 'Immediate' && (
                          <span className="w-2 h-2 rounded-full bg-rose-500" title="High Urgency Outbound"></span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">ID: {lead.id}</span>
                    </div>
                  </div>
                </td>

                {/* Firmographic Cluster */}
                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getClusterBadgeColor(lead.firmographicCluster)}`}>
                    {lead.firmographicCluster}
                  </span>
                </td>

                {/* ARR & Scale */}
                <td className="py-3.5 px-4">
                  <div className="text-slate-800 font-semibold">{lead.estimatedArr}</div>
                  <div className="text-[11px] text-slate-500">{lead.employees} employees</div>
                </td>

                {/* Tech Stack Signature */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {lead.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>

                {/* PRISM Conversion Prior Score */}
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className="flex items-center gap-1 text-sm font-extrabold text-emerald-700">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      {lead.prismPropensityScore}%
                    </div>
                    {/* Mini Fit breakdown */}
                    <div className="w-20 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${lead.prismPropensityScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">High Fit</span>
                  </div>
                </td>

                {/* Status & CTA Action */}
                <td className="py-3.5 px-4">
                  {lead.status === 'Assigned' ? (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Assigned to {lead.assignedRep}
                      </span>
                    </div>
                  ) : assigningLeadId === lead.id ? (
                    <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-xl border border-blue-400 shadow-md">
                      <select
                        value={selectedRep}
                        onChange={(e) => setSelectedRep(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2 py-1 focus:outline-none"
                      >
                        {availableReps.map(r => (
                          <option key={r.name} value={r.name}>{r.name} ({r.matchScore})</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssignSubmit(lead.id)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => setAssigningLeadId(null)}
                        className="px-2 py-1 text-slate-500 hover:text-slate-700 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAssigningLeadId(lead.id)}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Assign Lead</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Prior conversion models trained on 12,000+ historical B2B enterprise sales cycles</span>
        </div>
        <div className="text-slate-600 font-medium">
          Showing {filteredLeads.length} of {leads.length} uncontacted target accounts
        </div>
      </div>
    </div>
  );
};
