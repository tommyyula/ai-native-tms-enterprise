import { create } from 'zustand'
import { AIAgent, AgentMessage, AgentCommunication, AgentType } from '../types/agents'

interface AgentStore {
  // Agent states
  agents: Record<AgentType, AIAgent>
  communications: AgentCommunication[]
  messages: AgentMessage[]
  
  // Actions
  updateAgentStatus: (agentType: AgentType, status: AIAgent['status']) => void
  addMessage: (message: Omit<AgentMessage, 'id' | 'timestamp'>) => void
  addCommunication: (communication: Omit<AgentCommunication, 'timestamp'>) => void
  startTask: (agentType: AgentType, taskDescription: string) => void
  completeTask: (agentType: AgentType, success: boolean) => void
}

// Initial agent configurations
const initialAgents: Record<AgentType, AIAgent> = {
  'rfp-orchestrator': {
    id: 'agent-rfp-orch',
    name: 'RFP Orchestrator',
    description: 'Autonomous RFP lifecycle management and multi-round bidding coordination',
    status: 'active',
    capabilities: [
      'Multi-round RFP creation',
      'Automated carrier invitation',
      'Bid evaluation & ranking', 
      'Contract award automation',
      'Performance tracking'
    ],
    performance: {
      tasksCompleted: 247,
      successRate: 94.2,
      avgResponseTime: 1.3
    }
  },
  'capacity-discovery': {
    id: 'agent-capacity',
    name: 'Capacity Discovery',
    description: 'Intelligent carrier sourcing and AI-powered matching from multiple data sources',
    status: 'active',
    capabilities: [
      'Multi-source carrier discovery',
      'AI match scoring (0-100%)',
      'FMCSA safety verification',
      'Performance prediction',
      'Capacity forecasting'
    ],
    performance: {
      tasksCompleted: 1847,
      successRate: 97.8,
      avgResponseTime: 0.8
    }
  },
  'market-intelligence': {
    id: 'agent-market',
    name: 'Market Intelligence', 
    description: 'Real-time pricing analysis and market trend prediction with 8-source data fusion',
    status: 'thinking',
    capabilities: [
      'Dynamic pricing optimization',
      'Market trend analysis',
      'Competitive intelligence',
      'Demand forecasting',
      'Risk assessment'
    ],
    performance: {
      tasksCompleted: 3291,
      successRate: 91.7,
      avgResponseTime: 2.1
    }
  },
  'load-optimization': {
    id: 'agent-load-opt',
    name: 'Load Optimization',
    description: 'Route optimization, load consolidation, and delivery scheduling with AI algorithms',
    status: 'active',
    capabilities: [
      'Route optimization',
      'Load consolidation',
      'Multi-stop planning',
      'Delivery scheduling',
      'Cost minimization'
    ],
    performance: {
      tasksCompleted: 892,
      successRate: 96.1,
      avgResponseTime: 3.7
    }
  },
  'contract-negotiation': {
    id: 'agent-contract',
    name: 'Contract Negotiation',
    description: 'Automated bid evaluation, contract terms negotiation, and digital signature workflow',
    status: 'idle',
    capabilities: [
      'Automated bid evaluation',
      'Contract term optimization',
      'Digital signature workflow',
      'Compliance checking',
      'Performance clauses'
    ],
    performance: {
      tasksCompleted: 156,
      successRate: 88.5,
      avgResponseTime: 12.4
    }
  },
  'performance-analytics': {
    id: 'agent-analytics',
    name: 'Performance Analytics',
    description: 'Predictive performance modeling and business intelligence with ML-driven insights',
    status: 'active',
    capabilities: [
      'Predictive analytics',
      'KPI monitoring',
      'Trend analysis',
      'Performance forecasting',
      'Business intelligence'
    ],
    performance: {
      tasksCompleted: 2134,
      successRate: 93.9,
      avgResponseTime: 5.2
    }
  },
  'exception-management': {
    id: 'agent-exception',
    name: 'Exception Management',
    description: 'Proactive issue detection, exception prediction, and automated resolution strategies',
    status: 'active',
    capabilities: [
      'Exception prediction',
      'Proactive monitoring',
      'Automated resolution',
      'Risk mitigation',
      'Escalation management'
    ],
    performance: {
      tasksCompleted: 743,
      successRate: 89.2,
      avgResponseTime: 4.8
    }
  }
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: initialAgents,
  communications: [],
  messages: [],

  updateAgentStatus: (agentType, status) => {
    set((state) => ({
      agents: {
        ...state.agents,
        [agentType]: {
          ...state.agents[agentType],
          status,
          lastActivity: new Date()
        }
      }
    }))
  },

  addMessage: (messageData) => {
    const message: AgentMessage = {
      ...messageData,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }
    
    set((state) => ({
      messages: [...state.messages, message].slice(-100) // Keep last 100 messages
    }))
  },

  addCommunication: (commData) => {
    const communication: AgentCommunication = {
      ...commData,
      timestamp: new Date()
    }
    
    set((state) => ({
      communications: [...state.communications, communication].slice(-50) // Keep last 50 communications
    }))
  },

  startTask: (agentType, taskDescription) => {
    const { updateAgentStatus, addMessage } = get()
    
    updateAgentStatus(agentType, 'thinking')
    addMessage({
      agentId: initialAgents[agentType].id,
      content: `Starting task: ${taskDescription}`,
      type: 'info'
    })
  },

  completeTask: (agentType, success) => {
    const { updateAgentStatus, addMessage, agents } = get()
    
    updateAgentStatus(agentType, success ? 'active' : 'error')
    
    // Update performance metrics
    set((state) => ({
      agents: {
        ...state.agents,
        [agentType]: {
          ...state.agents[agentType],
          performance: {
            ...state.agents[agentType].performance,
            tasksCompleted: state.agents[agentType].performance.tasksCompleted + 1,
            successRate: success 
              ? Math.min(100, state.agents[agentType].performance.successRate + 0.1)
              : Math.max(0, state.agents[agentType].performance.successRate - 1.5)
          }
        }
      }
    }))

    addMessage({
      agentId: agents[agentType].id,
      content: `Task ${success ? 'completed successfully' : 'failed'}`,
      type: success ? 'success' : 'error'
    })
  }
}))