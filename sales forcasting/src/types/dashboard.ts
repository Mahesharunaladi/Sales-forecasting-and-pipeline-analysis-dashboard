export interface ExecutiveKpis {
  forecastedRevenue: {
    base: number; // in Millions, e.g. 14.2
    confidenceInterval: number; // e.g. 0.8 ($800k)
    lowerBound: number;
    upperBound: number;
    growthPercentage: number;
  };
  weightedWinPropensity: {
    current: number; // e.g. 68.4
    historicalAvg: number;
    trend: number[];
  };
  dealVelocity: {
    avgDays: number; // e.g. 34
    deltaDays: number; // e.g. -5.2
    industryBenchmark: number; // 48
  };
  capacityUtilization: {
    percentage: number; // e.g. 85
    activeReps: number;
    totalReps: number;
    burnoutRiskCount: number;
  };
}

export type InteractionEventType = 
  | 'email_sent' 
  | 'email_opened' 
  | 'portal_login' 
  | 'quote_modified' 
  | 'executive_call' 
  | 'security_review' 
  | 'contract_redline';

export interface HawkesStreamPoint {
  timestamp: string; // e.g. '09:00', '11:30'
  dayIndex: number;
  intensity: number; // lambda(t)
  baselineDecay: number;
  winPropensityDecay: number; // %
  eventCount: number;
  keyEvent?: string;
  eventType?: InteractionEventType;
}

export interface TouchpointEvent {
  id: string;
  accountName: string;
  dealSize: number;
  eventType: InteractionEventType;
  title: string;
  timestamp: string;
  timeAgo: string;
  excitementScore: number; // S_hawkes score (0-100)
  rep: string;
  intensityBurst: number; // +delta
}

export interface PrismLead {
  id: string;
  companyName: string;
  logoInitial: string;
  firmographicCluster: 'SaaS Enterprise >$50M ARR' | 'Fintech Series B/C' | 'HealthTech HIPAA Compliance' | 'GovCloud Infrastructure' | 'Global Supply Chain';
  estimatedArr: string;
  employees: string;
  techStack: string[];
  prismPropensityScore: number; // 0-100% conversion prior
  fitFactors: {
    techFit: number;
    hiringGrowth: number;
    executiveSignals: number;
  };
  status: 'Uncontacted' | 'Assigned' | 'Contacted';
  assignedRep?: string;
  urgency: 'Immediate' | 'High' | 'Medium';
}

export interface ShapFactor {
  id: string;
  featureName: string;
  category: 'Engagement' | 'Pricing' | 'Process' | 'Competitor' | 'Stakeholder';
  impactPercentage: number; // positive or negative
  direction: 'positive' | 'negative';
  description: string;
}

export interface OpportunityScenario {
  id: string;
  name: string;
  amount: number;
  baseWinRate: number; // e.g. 58%
  currentQuoteLatency: number; // days (e.g. 9)
  currentSponsorMeetings: number; // count (e.g. 2)
  currentDiscount: number; // % (e.g. 12)
  currentResponseTimeHours: number; // hrs (e.g. 18)
  stage: string;
  leadOwner: string;
  shapFactors: ShapFactor[];
}

export interface KawasRep {
  id: string;
  name: string;
  avatar: string;
  role: string;
  tier: 'Enterprise AE' | 'Strategic Global AE' | 'Mid-Market Lead';
  capacityPct: number; // e.g. 85
  assignedDealsCount: number;
  pipelineValue: number; // in $
  optimalMaxDeals: number;
  status: 'Optimal' | 'Near Capacity' | 'Underutilized' | 'Overloaded';
  assignedOpportunities: {
    dealId: string;
    dealName: string;
    amount: number;
    winFitScore: number;
    recommendedAction: string;
  }[];
}

export interface MacroIndicator {
  id: string;
  name: string;
  value: string;
  change: number; // e.g. +2.4%
  impactDirection: 'positive' | 'neutral' | 'negative';
  category: string;
}

export interface CallSentimentSnippet {
  id: string;
  accountName: string;
  dealAmount: number;
  timestamp: string;
  overallSentiment: 'Positive' | 'Neutral' | 'At-Risk';
  sentimentScore: number; // -1.0 to 1.0
  speaker: string;
  speakerRole: 'Economic Buyer' | 'Technical Champion' | 'Procurement Lead' | 'Legal Counsel';
  quote: string;
  signalExtracted: string;
  riskSeverity?: 'Low' | 'Medium' | 'Critical';
}
