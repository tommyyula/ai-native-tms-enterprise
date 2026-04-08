// AI Agents Type Definitions for Enterprise TMS

export interface AIAgent {
  id: string
  name: string
  description: string
  status: 'active' | 'thinking' | 'idle' | 'error'
  capabilities: string[]
  lastActivity?: Date
  performance: {
    tasksCompleted: number
    successRate: number
    avgResponseTime: number
  }
}

export interface AgentMessage {
  id: string
  agentId: string
  content: string
  timestamp: Date
  type: 'info' | 'warning' | 'error' | 'success'
  metadata?: Record<string, any>
}

// RFP Orchestrator Agent Types
export interface RFPOrchestratorAgent extends AIAgent {
  type: 'rfp-orchestrator'
  currentRFPs: RFP[]
  bidAnalytics: BidAnalytics
}

export interface RFP {
  id: string
  title: string
  status: 'draft' | 'open' | 'round1_closed' | 'round2_open' | 'round2_closed' | 'awarded' | 'completed'
  biddingRounds: BiddingRound[]
  lanes: Lane[]
  invitedCarriers: string[]
  createdAt: Date
  expiresAt: Date
}

export interface BiddingRound {
  roundNumber: number
  status: 'open' | 'closed' | 'evaluating'
  startDate: Date
  endDate: Date
  bids: Bid[]
}

export interface Bid {
  id: string
  carrierId: string
  laneId: string
  rate: number
  transitTime: number
  submittedAt: Date
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected'
  competitivenessScore: 'excellent' | 'good' | 'poor'
}

// Capacity Discovery Agent Types
export interface CapacityDiscoveryAgent extends AIAgent {
  type: 'capacity-discovery'
  carrierDatabase: CarrierProfile[]
  matchingAlgorithm: MatchingConfig
  searchHistory: SearchQuery[]
}

export interface CarrierProfile {
  id: string
  mcNumber: string
  dotNumber: string
  companyName: string
  equipmentTypes: EquipmentType[]
  safetyRating: SafetyRating
  serviceLevel: 'gold' | 'silver' | 'bronze'
  verificationStatus: 'verified' | 'pending' | 'unverified'
  performanceMetrics: CarrierPerformance
  preferredLanes: Lane[]
  capacity: CapacityInfo
}

export interface CarrierPerformance {
  onTimePickup: number
  onTimeDelivery: number
  responseTime: number
  communicationScore: number
  damageRate: number
  overallScore: number
}

export interface MatchingResult {
  carrierId: string
  matchScore: number
  factors: {
    geography: number
    capacity: number
    performance: number
    safety: number
    pricing: number
  }
  reasons: string[]
}

// Market Intelligence Agent Types
export interface MarketIntelligenceAgent extends AIAgent {
  type: 'market-intelligence'
  marketData: MarketData
  pricingEngine: PricingEngine
  forecasts: MarketForecast[]
}

export interface MarketData {
  spotRates: SpotRateData[]
  fuelPrices: FuelPriceData[]
  capacityUtilization: CapacityData[]
  demandIndicators: DemandData[]
  lastUpdated: Date
}

export interface PricingRecommendation {
  laneId: string
  recommendedRate: number
  confidence: number
  marketPosition: 'competitive' | 'aggressive' | 'premium'
  factors: PricingFactor[]
}

// Load Optimization Agent Types
export interface LoadOptimizationAgent extends AIAgent {
  type: 'load-optimization'
  activeOptimizations: OptimizationTask[]
  routingEngine: RoutingEngine
  consolidationEngine: ConsolidationEngine
}

export interface OptimizationTask {
  id: string
  type: 'routing' | 'consolidation' | 'scheduling'
  status: 'running' | 'completed' | 'failed'
  input: OptimizationInput
  result?: OptimizationResult
  progress: number
}

// Contract Negotiation Agent Types
export interface ContractNegotiationAgent extends AIAgent {
  type: 'contract-negotiation'
  activeNegotiations: Negotiation[]
  contractTemplates: ContractTemplate[]
  negotiationStrategy: NegotiationStrategy
}

export interface Negotiation {
  id: string
  rfpId: string
  carrierId: string
  currentTerms: ContractTerms
  proposedChanges: TermsChange[]
  status: 'in_progress' | 'completed' | 'failed'
  rounds: NegotiationRound[]
}

// Performance Analytics Agent Types
export interface PerformanceAnalyticsAgent extends AIAgent {
  type: 'performance-analytics'
  analytics: PerformanceAnalytics
  predictions: PerformancePrediction[]
  reports: AnalyticsReport[]
}

export interface PerformanceAnalytics {
  kpis: KPI[]
  trends: TrendAnalysis[]
  benchmarks: Benchmark[]
  alerts: PerformanceAlert[]
}

// Exception Management Agent Types
export interface ExceptionManagementAgent extends AIAgent {
  type: 'exception-management'
  activeExceptions: Exception[]
  predictionModel: ExceptionPredictionModel
  resolutionStrategies: ResolutionStrategy[]
}

export interface Exception {
  id: string
  type: 'delivery_delay' | 'carrier_no_show' | 'load_damage' | 'weather_delay' | 'equipment_failure'
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'detected' | 'investigating' | 'resolving' | 'resolved'
  loadId: string
  carrierId: string
  predictedAt?: Date
  detectedAt: Date
  resolvedAt?: Date
  impact: ExceptionImpact
  resolutionActions: ResolutionAction[]
}

// Shared Types
export interface Lane {
  id: string
  origin: Location
  destination: Location
  distance: number
  equipmentType: EquipmentType
  avgVolume: number
  frequency: 'daily' | 'weekly' | 'monthly'
  seasonality: SeasonalityPattern[]
}

export interface Location {
  city: string
  state: string
  zipCode: string
  latitude: number
  longitude: number
}

export type EquipmentType = 'dry_van' | 'refrigerated' | 'flatbed' | 'step_deck' | 'lowboy' | 'tanker' | 'container'

export interface SafetyRating {
  rating: string
  score: number
  violations: Violation[]
  lastInspection: Date
}

export interface Violation {
  type: string
  severity: 'minor' | 'major' | 'critical'
  date: Date
  description: string
}

// Additional utility types
export type AgentType = 'rfp-orchestrator' | 'capacity-discovery' | 'market-intelligence' | 
  'load-optimization' | 'contract-negotiation' | 'performance-analytics' | 'exception-management'

export interface AgentCommunication {
  fromAgent: AgentType
  toAgent: AgentType
  message: string
  data?: any
  timestamp: Date
  priority: 'low' | 'normal' | 'high' | 'urgent'
}