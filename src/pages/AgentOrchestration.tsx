import React, { useState } from 'react'
import { 
  Bot, 
  Activity, 
  MessageSquare, 
  Settings, 
  Zap, 
  Brain,
  Eye,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp
} from 'lucide-react'
import { useAgentStore } from '../stores/agentStore'
import { AgentType } from '../types/agents'

const AgentOrchestration = () => {
  const { agents, messages, communications, updateAgentStatus, addMessage, startTask, completeTask } = useAgentStore()
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>('rfp-orchestrator')
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'communications' | 'performance'>('overview')

  const agentTypeOrder: AgentType[] = [
    'rfp-orchestrator',
    'capacity-discovery', 
    'market-intelligence',
    'load-optimization',
    'contract-negotiation',
    'performance-analytics',
    'exception-management'
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'thinking':
        return <Clock className="h-4 w-4 text-amber-500 animate-spin" />
      case 'idle':
        return <Pause className="h-4 w-4 text-slate-400" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Bot className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'thinking':
        return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
      case 'idle':
        return 'bg-slate-50 text-slate-700 border-slate-200'
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const simulateTask = (agentType: AgentType) => {
    const taskDescriptions = {
      'rfp-orchestrator': 'Creating multi-round RFP for Q2 freight procurement',
      'capacity-discovery': 'Scanning 3,247 carriers across DAT, Truckstop, and FMCSA databases',
      'market-intelligence': 'Analyzing fuel price impacts on Chicago-Miami lane pricing',
      'load-optimization': 'Optimizing 47 loads across 12 routes for maximum efficiency',
      'contract-negotiation': 'Negotiating contract terms with top 5 RFP bidders',
      'performance-analytics': 'Running predictive analysis on Q2 delivery performance',
      'exception-management': 'Monitoring 156 active shipments for potential delays'
    }

    startTask(agentType, taskDescriptions[agentType])
    
    // Simulate completion after random time
    setTimeout(() => {
      completeTask(agentType, Math.random() > 0.1) // 90% success rate
    }, Math.random() * 5000 + 2000)
  }

  const selectedAgentData = selectedAgent ? agents[selectedAgent] : null
  const agentMessages = messages.filter(msg => 
    selectedAgentData && msg.agentId === selectedAgentData.id
  ).slice(-10)

  const agentCommunications = communications.filter(comm => 
    selectedAgent && (comm.fromAgent === selectedAgent || comm.toAgent === selectedAgent)
  ).slice(-10)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Agent Orchestration</h1>
        <p className="text-slate-600">Monitor and control 7 specialized AI agents working in harmony</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">AI Agents</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  {Object.values(agents).filter(a => a.status === 'active').length} Active
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {agentTypeOrder.map((agentType) => {
                const agent = agents[agentType]
                const isSelected = selectedAgent === agentType
                
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agentType)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Bot className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="font-medium text-slate-900">{agent.name}</span>
                      </div>
                      {getStatusIcon(agent.status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Success Rate</div>
                        <div className="text-sm font-medium text-emerald-600">{agent.performance.successRate.toFixed(1)}%</div>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          simulateTask(agentType)
                        }}
                        className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                        disabled={agent.status === 'thinking'}
                      >
                        <Play className="h-3 w-3 inline mr-1" />
                        Start Task
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          updateAgentStatus(agentType, agent.status === 'active' ? 'idle' : 'active')
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded border border-slate-200 hover:bg-slate-100 transition-colors"
                      >
                        <Settings className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2">
          {selectedAgentData ? (
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{selectedAgentData.name}</h2>
                    <p className="text-slate-600">{selectedAgentData.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedAgentData.status)}`}>
                    {getStatusIcon(selectedAgentData.status)}
                    <span className="ml-2">{selectedAgentData.status}</span>
                  </span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-slate-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', name: 'Overview', icon: Eye },
                    { id: 'messages', name: 'Messages', icon: MessageSquare },
                    { id: 'communications', name: 'Agent Comms', icon: Zap },
                    { id: 'performance', name: 'Performance', icon: TrendingUp }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Capabilities */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-3">Core Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgentData.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="inline-flex px-3 py-1 text-sm text-slate-700 bg-slate-100 rounded-full"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{selectedAgentData.performance.tasksCompleted}</div>
                      <div className="text-sm text-slate-600">Tasks Completed</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">{selectedAgentData.performance.successRate.toFixed(1)}%</div>
                      <div className="text-sm text-slate-600">Success Rate</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedAgentData.performance.avgResponseTime.toFixed(1)}s</div>
                      <div className="text-sm text-slate-600">Avg Response</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-4">
                  {agentMessages.length > 0 ? (
                    agentMessages.map((message) => (
                      <div key={message.id} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            message.type === 'success' ? 'bg-emerald-100 text-emerald-700' :
                            message.type === 'error' ? 'bg-red-100 text-red-700' :
                            message.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {message.type}
                          </span>
                          <span className="text-xs text-slate-500">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{message.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No recent messages from this agent</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'communications' && (
                <div className="space-y-4">
                  {agentCommunications.length > 0 ? (
                    agentCommunications.map((comm, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-900">
                              {agents[comm.fromAgent].name}
                            </span>
                            <span className="text-slate-400">→</span>
                            <span className="text-sm font-medium text-slate-900">
                              {agents[comm.toAgent].name}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {comm.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700">{comm.message}</p>
                        {comm.priority !== 'normal' && (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                            comm.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                            comm.priority === 'high' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {comm.priority} priority
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Zap className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No recent inter-agent communications</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 mb-3">Performance Trends</h4>
                      <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                          <p className="text-slate-500">Performance chart placeholder</p>
                          <p className="text-xs text-slate-400">Real charts would show success rate, response time trends</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 mb-3">Recent Tasks</h4>
                      <div className="space-y-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded">
                            <span className="text-sm text-slate-600">Task #{i + 1}</span>
                            <span className={`text-xs font-medium ${Math.random() > 0.1 ? 'text-emerald-600' : 'text-red-600'}`}>
                              {Math.random() > 0.1 ? '✓ Success' : '✗ Failed'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="dashboard-card">
              <div className="text-center py-12">
                <Bot className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Select an AI Agent</h3>
                <p className="text-slate-600">Choose an agent from the left panel to view detailed information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentOrchestration