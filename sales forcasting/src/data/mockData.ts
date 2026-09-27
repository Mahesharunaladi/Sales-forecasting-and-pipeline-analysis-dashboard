import { 
  ExecutiveKpis, 
  HawkesStreamPoint, 
  TouchpointEvent, 
  PrismLead, 
  OpportunityScenario, 
  KawasRep, 
  MacroIndicator, 
  CallSentimentSnippet 
} from '../types/dashboard';

export const executiveKpiData: ExecutiveKpis = {
  forecastedRevenue: {
    base: 14.2,
    confidenceInterval: 0.8,
    lowerBound: 13.4,
    upperBound: 15.0,
    growthPercentage: 12.4
  },
  weightedWinPropensity: {
    current: 68.4,
    historicalAvg: 54.2,
    trend: [62.1, 63.5, 65.0, 64.2, 66.8, 67.5, 68.4]
  },
  dealVelocity: {
    avgDays: 34,
    deltaDays: -5.2,
    industryBenchmark: 48
  },
  capacityUtilization: {
    percentage: 85,
    activeReps: 24,
    totalReps: 28,
    burnoutRiskCount: 3
  }
};

export const hawkesTimeSeriesData: HawkesStreamPoint[] = [
  { timestamp: '09:00', dayIndex: 1, intensity: 12, baselineDecay: 20, winPropensityDecay: 74, eventCount: 2, keyEvent: 'Morning Email Batch', eventType: 'email_sent' },
  { timestamp: '10:30', dayIndex: 1, intensity: 48, baselineDecay: 28, winPropensityDecay: 79, eventCount: 6, keyEvent: 'Exec Portal Access', eventType: 'portal_login' },
  { timestamp: '12:00', dayIndex: 1, intensity: 32, baselineDecay: 25, winPropensityDecay: 76, eventCount: 3 },
  { timestamp: '13:30', dayIndex: 1, intensity: 22, baselineDecay: 21, winPropensityDecay: 72, eventCount: 1 },
  { timestamp: '15:00', dayIndex: 1, intensity: 86, baselineDecay: 35, winPropensityDecay: 88, eventCount: 12, keyEvent: 'Quote Revision v3 Upload', eventType: 'quote_modified' },
  { timestamp: '16:45', dayIndex: 1, intensity: 64, baselineDecay: 31, winPropensityDecay: 83, eventCount: 8, keyEvent: 'CTO Architecture Q&A', eventType: 'executive_call' },
  { timestamp: '18:15', dayIndex: 1, intensity: 40, baselineDecay: 26, winPropensityDecay: 78, eventCount: 4 },
  { timestamp: '20:00', dayIndex: 1, intensity: 18, baselineDecay: 18, winPropensityDecay: 71, eventCount: 1 },
  { timestamp: '22:00', dayIndex: 1, intensity: 8, baselineDecay: 14, winPropensityDecay: 65, eventCount: 0 },
  { timestamp: '06:00', dayIndex: 2, intensity: 15, baselineDecay: 12, winPropensityDecay: 63, eventCount: 1 },
  { timestamp: '08:30', dayIndex: 2, intensity: 52, baselineDecay: 24, winPropensityDecay: 77, eventCount: 7, keyEvent: 'Legal Redline Inbound', eventType: 'contract_redline' },
  { timestamp: '10:15', dayIndex: 2, intensity: 94, baselineDecay: 38, winPropensityDecay: 91, eventCount: 15, keyEvent: 'C-Suite Multi-Seat Demo', eventType: 'executive_call' },
  { timestamp: '11:45', dayIndex: 2, intensity: 78, baselineDecay: 34, winPropensityDecay: 86, eventCount: 9, keyEvent: 'Security SOC2 Validation', eventType: 'security_review' },
  { timestamp: '14:00', dayIndex: 2, intensity: 58, baselineDecay: 29, winPropensityDecay: 81, eventCount: 5 },
  { timestamp: '16:30', dayIndex: 2, intensity: 91, baselineDecay: 37, winPropensityDecay: 89, eventCount: 14, keyEvent: 'Procurement Sign-off Queue', eventType: 'quote_modified' },
  { timestamp: '18:00', dayIndex: 2, intensity: 45, baselineDecay: 25, winPropensityDecay: 79, eventCount: 4 }
];

export const recentTouchpoints: TouchpointEvent[] = [
  {
    id: 'tp-101',
    accountName: 'CloudScale Global Inc.',
    dealSize: 450000,
    eventType: 'quote_modified',
    title: 'Quote Rev v4.2 viewed by 3 Decision Makers',
    timestamp: '14 mins ago',
    timeAgo: '14m',
    excitementScore: 94.2,
    rep: 'Sarah Chen',
    intensityBurst: 18.5
  },
  {
    id: 'tp-102',
    accountName: 'Nexus Cyber Defense',
    dealSize: 720000,
    eventType: 'executive_call',
    title: 'CTO & CISO 45-min Deep Dive Completed',
    timestamp: '38 mins ago',
    timeAgo: '38m',
    excitementScore: 88.6,
    rep: 'Marcus Vance',
    intensityBurst: 24.1
  },
  {
    id: 'tp-103',
    accountName: 'BioHealth Analytics',
    dealSize: 310000,
    eventType: 'security_review',
    title: 'HIPAA & SOC2 Compliance Pack Approved',
    timestamp: '1.2 hrs ago',
    timeAgo: '1h',
    excitementScore: 82.0,
    rep: 'Elena Rostova',
    intensityBurst: 14.8
  },
  {
    id: 'tp-104',
    accountName: 'Apex Capital Partners',
    dealSize: 580000,
    eventType: 'portal_login',
    title: 'Sandbox Admin Role Provisioned for CFO',
    timestamp: '2.5 hrs ago',
    timeAgo: '2h',
    excitementScore: 76.4,
    rep: 'Devon Wright',
    intensityBurst: 9.3
  },
  {
    id: 'tp-105',
    accountName: 'Strata Logistics Corp',
    dealSize: 390000,
    eventType: 'contract_redline',
    title: 'Mutual NDA & Master Services Agreement Returned',
    timestamp: '3.8 hrs ago',
    timeAgo: '3h',
    excitementScore: 91.5,
    rep: 'Sarah Chen',
    intensityBurst: 21.0
  }
];

export const prismProspects: PrismLead[] = [
  {
    id: 'lead-01',
    companyName: 'Starlight Autonomous Inc.',
    logoInitial: 'S',
    firmographicCluster: 'SaaS Enterprise >$50M ARR',
    estimatedArr: '$85M - $120M',
    employees: '1,450+',
    techStack: ['Snowflake', 'Salesforce', 'AWS', 'Kubernetes'],
    prismPropensityScore: 91.4,
    fitFactors: { techFit: 96, hiringGrowth: 88, executiveSignals: 90 },
    status: 'Uncontacted',
    urgency: 'Immediate'
  },
  {
    id: 'lead-02',
    companyName: 'Quantex Ledger Systems',
    logoInitial: 'Q',
    firmographicCluster: 'Fintech Series B/C',
    estimatedArr: '$35M - $50M',
    employees: '480+',
    techStack: ['GCP', 'PostgreSQL', 'Stripe', 'Datadog'],
    prismPropensityScore: 86.8,
    fitFactors: { techFit: 89, hiringGrowth: 92, executiveSignals: 80 },
    status: 'Uncontacted',
    urgency: 'High'
  },
  {
    id: 'lead-03',
    companyName: 'GenomePulse Diagnostics',
    logoInitial: 'G',
    firmographicCluster: 'HealthTech HIPAA Compliance',
    estimatedArr: '$60M - $90M',
    employees: '820+',
    techStack: ['Azure', 'Epic EHR', 'Databricks', 'Okta'],
    prismPropensityScore: 83.2,
    fitFactors: { techFit: 94, hiringGrowth: 75, executiveSignals: 81 },
    status: 'Uncontacted',
    urgency: 'High'
  },
  {
    id: 'lead-04',
    companyName: 'Federal Vector Dynamics',
    logoInitial: 'F',
    firmographicCluster: 'GovCloud Infrastructure',
    estimatedArr: '$110M - $200M',
    employees: '3,200+',
    techStack: ['FedRAMP High', 'AWS GovCloud', 'Oracle'],
    prismPropensityScore: 78.5,
    fitFactors: { techFit: 82, hiringGrowth: 70, executiveSignals: 84 },
    status: 'Uncontacted',
    urgency: 'Medium'
  },
  {
    id: 'lead-05',
    companyName: 'Pacific Freight Neural',
    logoInitial: 'P',
    firmographicCluster: 'Global Supply Chain',
    estimatedArr: '$45M - $70M',
    employees: '650+',
    techStack: ['SAP S/4HANA', 'Kafka', 'Google Cloud'],
    prismPropensityScore: 74.9,
    fitFactors: { techFit: 78, hiringGrowth: 79, executiveSignals: 68 },
    status: 'Uncontacted',
    urgency: 'Medium'
  },
  {
    id: 'lead-06',
    companyName: 'Hyperion Security Systems',
    logoInitial: 'H',
    firmographicCluster: 'SaaS Enterprise >$50M ARR',
    estimatedArr: '$140M+',
    employees: '2,100+',
    techStack: ['CrowdStrike', 'AWS', 'Segment', 'HubSpot'],
    prismPropensityScore: 89.2,
    fitFactors: { techFit: 92, hiringGrowth: 86, executiveSignals: 90 },
    status: 'Assigned',
    assignedRep: 'Sarah Chen',
    urgency: 'Immediate'
  }
];

export const opportunityScenarios: OpportunityScenario[] = [
  {
    id: 'opp-101',
    name: 'Acme Global Holdings ($450k)',
    amount: 450000,
    baseWinRate: 58,
    currentQuoteLatency: 9,
    currentSponsorMeetings: 2,
    currentDiscount: 12,
    currentResponseTimeHours: 18,
    stage: 'Stage 4 - Solution Validation',
    leadOwner: 'Marcus Vance',
    shapFactors: [
      { id: 'sf-1', featureName: 'Executive Sponsor Alignment', category: 'Stakeholder', impactPercentage: 18, direction: 'positive', description: 'Multi-threaded contact with VP Eng & CFO accelerates close rates.' },
      { id: 'sf-2', featureName: 'Quote Revision Latency', category: 'Process', impactPercentage: -22, direction: 'negative', description: 'Turnaround exceeding 5 days reduces momentum and invites competitor intrusion.' },
      { id: 'sf-3', featureName: 'Technical Sandbox Engagement', category: 'Engagement', impactPercentage: 14, direction: 'positive', description: 'Active weekly usage by prospective developers inside evaluation cluster.' },
      { id: 'sf-4', featureName: 'Incumbent Renewal Window', category: 'Competitor', impactPercentage: 9, direction: 'positive', description: 'Legacy vendor contract expires within 60 days creating buyer urgency.' },
      { id: 'sf-5', featureName: 'Legal / Redline Latency', category: 'Process', impactPercentage: -11, direction: 'negative', description: 'Indemnity clause review stalled in procurement queue for 8+ business days.' }
    ]
  },
  {
    id: 'opp-102',
    name: 'Vortex Cyber Defense ($720k)',
    amount: 720000,
    baseWinRate: 64,
    currentQuoteLatency: 6,
    currentSponsorMeetings: 3,
    currentDiscount: 8,
    currentResponseTimeHours: 10,
    stage: 'Stage 5 - Executive Review',
    leadOwner: 'Sarah Chen',
    shapFactors: [
      { id: 'sf-201', featureName: 'CISO Champion Sponsorship', category: 'Stakeholder', impactPercentage: 25, direction: 'positive', description: 'CISO publicly advocated for our solution in the quarterly risk board.' },
      { id: 'sf-202', featureName: 'Competitor Discount Matching', category: 'Pricing', impactPercentage: -16, direction: 'negative', description: 'Competitor offering 30% aggressive price dump on 3-year upfront commitment.' },
      { id: 'sf-203', featureName: 'Rapid Security Questionnaire Pass', category: 'Process', impactPercentage: 15, direction: 'positive', description: 'All 180 SOC2 questions cleared in under 48 hours.' },
      { id: 'sf-204', featureName: 'SLA Escalation Requirement', category: 'Process', impactPercentage: -8, direction: 'negative', description: 'Requesting 99.999% uptime with 15-minute engineer response guarantees.' }
    ]
  },
  {
    id: 'opp-103',
    name: 'FinScale AI Technologies ($310k)',
    amount: 310000,
    baseWinRate: 51,
    currentQuoteLatency: 11,
    currentSponsorMeetings: 1,
    currentDiscount: 15,
    currentResponseTimeHours: 24,
    stage: 'Stage 3 - Technical Proof of Concept',
    leadOwner: 'Elena Rostova',
    shapFactors: [
      { id: 'sf-301', featureName: 'API Throughput Benchmark Win', category: 'Engagement', impactPercentage: 21, direction: 'positive', description: 'Our platform outperformed benchmark competitor by 3.8x lower latency.' },
      { id: 'sf-302', featureName: 'Single-Threaded Sponsor Risk', category: 'Stakeholder', impactPercentage: -26, direction: 'negative', description: 'Only 1 principal architect engaged; lacking VP/Director level buy-in.' },
      { id: 'sf-303', featureName: 'Budget Approval Gate Cycle', category: 'Pricing', impactPercentage: -14, direction: 'negative', description: 'Requires additional sign-off from Head of Infrastructure Finance.' }
    ]
  },
  {
    id: 'opp-104',
    name: 'OmniRetail Omnichannel ($890k)',
    amount: 890000,
    baseWinRate: 72,
    currentQuoteLatency: 4,
    currentSponsorMeetings: 4,
    currentDiscount: 10,
    currentResponseTimeHours: 6,
    stage: 'Stage 5 - Contract Negotiation',
    leadOwner: 'Devon Wright',
    shapFactors: [
      { id: 'sf-401', featureName: 'Executive Team Roadshow Success', category: 'Stakeholder', impactPercentage: 28, direction: 'positive', description: 'On-site briefing with COO, CIO, and VP eCommerce closed key objections.' },
      { id: 'sf-402', featureName: 'Black Friday Deployment Deadline', category: 'Process', impactPercentage: 19, direction: 'positive', description: 'Critical operational hard deadline forces decision within 14 calendar days.' },
      { id: 'sf-403', featureName: 'Payment Terms (Net 90 vs Net 30)', category: 'Pricing', impactPercentage: -9, direction: 'negative', description: 'Customer requests extended payment terms affecting Q4 cash collections.' }
    ]
  }
];

export const kawasRepsData: KawasRep[] = [
  {
    id: 'rep-1',
    name: 'Sarah Chen',
    avatar: 'SC',
    role: 'Strategic Global AE',
    tier: 'Strategic Global AE',
    capacityPct: 92,
    assignedDealsCount: 7,
    pipelineValue: 3450000,
    optimalMaxDeals: 8,
    status: 'Near Capacity',
    assignedOpportunities: [
      { dealId: 'deal-101', dealName: 'Vortex Cyber Defense ($720k)', amount: 720000, winFitScore: 94, recommendedAction: 'Maintain lead focus; high domain affinity' },
      { dealId: 'deal-102', dealName: 'Strata Logistics Corp ($390k)', amount: 390000, winFitScore: 89, recommendedAction: 'Schedule legal sign-off call' },
      { dealId: 'deal-103', dealName: 'Hyperion Security Systems ($540k)', amount: 540000, winFitScore: 91, recommendedAction: 'Deliver customized ROI deck' }
    ]
  },
  {
    id: 'rep-2',
    name: 'Marcus Vance',
    avatar: 'MV',
    role: 'Enterprise AE',
    tier: 'Enterprise AE',
    capacityPct: 65,
    assignedDealsCount: 5,
    pipelineValue: 2100000,
    optimalMaxDeals: 8,
    status: 'Optimal',
    assignedOpportunities: [
      { dealId: 'deal-201', dealName: 'Acme Global Holdings ($450k)', amount: 450000, winFitScore: 87, recommendedAction: 'Accelerate quote revision turnaround to <4 days' },
      { dealId: 'deal-202', dealName: 'Titan Health Core ($380k)', amount: 380000, winFitScore: 82, recommendedAction: 'Engage clinical compliance sponsor' }
    ]
  },
  {
    id: 'rep-3',
    name: 'Elena Rostova',
    avatar: 'ER',
    role: 'Enterprise AE (Fintech Specialist)',
    tier: 'Enterprise AE',
    capacityPct: 88,
    assignedDealsCount: 7,
    pipelineValue: 2890000,
    optimalMaxDeals: 8,
    status: 'Near Capacity',
    assignedOpportunities: [
      { dealId: 'deal-301', dealName: 'BioHealth Analytics ($310k)', amount: 310000, winFitScore: 88, recommendedAction: 'Push for fast-track SOC2 addendum' },
      { dealId: 'deal-302', dealName: 'Quantex Cloud ($410k)', amount: 410000, winFitScore: 85, recommendedAction: 'Schedule technical deep dive' }
    ]
  },
  {
    id: 'rep-4',
    name: 'Devon Wright',
    avatar: 'DW',
    role: 'Mid-Market Lead',
    tier: 'Mid-Market Lead',
    capacityPct: 45,
    assignedDealsCount: 3,
    pipelineValue: 1470000,
    optimalMaxDeals: 7,
    status: 'Underutilized',
    assignedOpportunities: [
      { dealId: 'deal-401', dealName: 'OmniRetail Omnichannel ($890k)', amount: 890000, winFitScore: 78, recommendedAction: 'Pair with solutions architect on redlines' },
      { dealId: 'deal-402', dealName: 'Apex Capital Partners ($580k)', amount: 580000, winFitScore: 81, recommendedAction: 'Deliver CFO financial model' }
    ]
  }
];

export const macroIndicators: MacroIndicator[] = [
  { id: 'macro-1', name: 'Enterprise Cloud Capex Index', value: '118.4 pts', change: 3.2, impactDirection: 'positive', category: 'Technology' },
  { id: 'macro-2', name: 'Tech Sector Growth (YoY)', value: '+2.4%', change: 2.4, impactDirection: 'positive', category: 'Sector Growth' },
  { id: 'macro-3', name: 'Fed Interest Rate Offset', value: '4.75%', change: -0.5, impactDirection: 'negative', category: 'Monetary Policy' },
  { id: 'macro-4', name: 'B2B Software Budget Velocity', value: '+5.8%', change: 5.8, impactDirection: 'positive', category: 'Spend Trajectory' },
  { id: 'macro-5', name: 'Sales Cycle Expansion Index', value: '-3.1 days', change: 1.8, impactDirection: 'positive', category: 'Market Efficiency' }
];

export const callSentimentSnippets: CallSentimentSnippet[] = [
  {
    id: 'call-1',
    accountName: 'Acme Global Holdings',
    dealAmount: 450000,
    timestamp: 'Today 10:45 AM',
    overallSentiment: 'At-Risk',
    sentimentScore: -0.42,
    speaker: 'Dave Henderson',
    speakerRole: 'Procurement Lead',
    quote: '"If you can\'t turn around the revised indemnity schedule by Thursday morning, our VP is going to freeze evaluation until next fiscal year."',
    signalExtracted: 'Strict SLA deadline on contract indemnity clauses. High risk of stall without expedited turnaround.',
    riskSeverity: 'Critical'
  },
  {
    id: 'call-2',
    accountName: 'Vortex Cyber Defense',
    dealAmount: 720000,
    timestamp: 'Yesterday 3:15 PM',
    overallSentiment: 'Positive',
    sentimentScore: 0.88,
    speaker: 'Dr. Aris Thorne',
    speakerRole: 'Technical Champion',
    quote: '"Your neural pipeline is literally 3 weeks ahead of what our internal data science team planned to build. We are ready to sponsor the full roll-out."',
    signalExtracted: 'Champion enthusiasm is at peak level; strong willingness to advocate at the executive risk board.',
    riskSeverity: 'Low'
  },
  {
    id: 'call-3',
    accountName: 'OmniRetail Omnichannel',
    dealAmount: 890000,
    timestamp: '2 days ago',
    overallSentiment: 'Positive',
    sentimentScore: 0.74,
    speaker: 'Rachel Greene',
    speakerRole: 'Economic Buyer',
    quote: '"We’ve earmarked the budget from the digital transformation reserve. Let\'s get final legal redlines settled so we meet the Q4 launch date."',
    signalExtracted: 'Budget is fully secured; hard deployment milestone drives urgency for contract close.',
    riskSeverity: 'Low'
  },
  {
    id: 'call-4',
    accountName: 'FinScale AI Technologies',
    dealAmount: 310000,
    timestamp: '3 days ago',
    overallSentiment: 'Neutral',
    sentimentScore: 0.05,
    speaker: 'Kenji Sato',
    speakerRole: 'Technical Champion',
    quote: '"The performance metrics look solid, but finance is asking whether we can defer billing to net-60 terms instead of upfront."',
    signalExtracted: 'Technical evaluation passed; minor commercial friction regarding cash flow terms.',
    riskSeverity: 'Medium'
  }
];
