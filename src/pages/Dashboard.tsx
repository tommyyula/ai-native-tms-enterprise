import React from 'react'
import { 
  TrendingUp, 
  Users, 
  Truck, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Bot,
  Zap
} from 'lucide-react'
import { useAgentStore } from '../stores/agentStore'

const Dashboard = () => {
  const { agents, messages } = useAgentStore()

  // Calculate overall metrics
  const totalTasksCompleted = Object.values(agents).reduce((sum, agent) => sum + agent.performance.tasksCompleted, 0)
  const avgSuccessRate = Object.values(agents).reduce((sum, agent) => sum + agent.performance.successRate, 0) / Object.values(agents).length
  const avgResponseTime = Object.values(agents).reduce((sum, agent) => sum + agent.performance.avgResponseTime, 0) / Object.values(agents).length
  
  const activeAgents = Object.values(agents).filter(agent => agent.status === 'active').length
  const thinkingAgents = Object.values(agents).filter(agent => agent.status === 'thinking').length

  // Mock business metrics (in real app, these would come from real data)
  const businessMetrics = {
    totalRevenue: 2847632,
    totalLoads: 1892,
    avgMargin: 12.8,
    carrierUtilization: 87.4,
    onTimeDelivery: 94.2,
    customerSatisfaction: 4.7,
    fuelEfficiency: 6.8,
    exceptionsResolved: 156
  }

  const recentActivities = [
    { id: 1, agent: 'RFP Orchestrator', action: 'Created RFP #RF-2024-089 for Chicago-Dallas lane', timestamp: '2 minutes ago', type: 'success' },
    { id: 2, agent: 'Capacity Discovery', action: 'Identified 23 qualified carriers for refrigerated loads', timestamp: '5 minutes ago', type: 'info' },
    { id: 3, agent: 'Market Intelligence', action: 'Price alert: LA-NYC rates increased 8% due to capacity shortage', timestamp: '12 minutes ago', type: 'warning' },
    { id: 4, agent: 'Exception Management', action: 'Predicted delivery delay for Load #L-45829, initiated mitigation', timestamp: '18 minutes ago', type: 'warning' },
    { id: 5, agent: 'Contract Negotiation', action: 'Successfully negotiated 12% rate reduction with Carrier MC-789456', timestamp: '25 minutes ago', type: 'success' },
    { id: 6, agent: 'Load Optimization', action: 'Optimized route for 8-stop delivery, saved 247 miles', timestamp: '32 minutes ago', type: 'success' }
  ]

  const topCarriers = [
    { name: 'Premier Logistics', matchScore: 98, loads: 45, onTime: 97.2, rating: '★★★★★' },
    { name: 'Swift Transportation', matchScore: 94, loads: 78, onTime: 94.8, rating: '★★★★☆' },
    { name: 'J.B. Hunt', matchScore: 91, loads: 92, onTime: 96.1, rating: '★★★★★' },
    { name: 'Schneider', matchScore: 89, loads: 67, onTime: 93.5, rating: '★★★★☆' },
    { name: 'XPO Logistics', matchScore: 87, loads: 34, onTime: 91.8, rating: '★★★★☆' }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI-Native TMS Command Center</h1>
        <p className="text-slate-600">Real-time orchestration of 7 AI agents managing your freight operations</p>
      </div>

      {/* AI Agent Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Agents</p>
              <p className="text-2xl font-bold text-emerald-600">{activeAgents}/7</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <Bot className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-slate-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            All systems operational
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Tasks Completed</p>
              <p className="text-2xl font-bold text-blue-600">{totalTasksCompleted.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12% from last week
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Success Rate</p>
              <p className="text-2xl font-bold text-emerald-600">{avgSuccessRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            Above 90% threshold
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Response</p>
              <p className="text-2xl font-bold text-blue-600">{avgResponseTime.toFixed(1)}s</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-slate-500">
            <Clock className="h-4 w-4 mr-1" />
            Under target 5s
          </div>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">${businessMetrics.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="mt-2 text-sm text-emerald-600">+18.2% vs last month</div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Loads</p>
              <p className="text-2xl font-bold text-slate-900">{businessMetrics.totalLoads.toLocaleString()}</p>
            </div>
            <Truck className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-sm text-blue-600">+24 loads this week</div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Margin</p>
              <p className="text-2xl font-bold text-slate-900">{businessMetrics.avgMargin}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-emerald-600">+1.4% margin improvement</div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">On-Time Delivery</p>
              <p className="text-2xl font-bold text-slate-900">{businessMetrics.onTimeDelivery}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="mt-2 text-sm text-emerald-600">Above 94% target</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent AI Agent Activities */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent AI Agent Activities</h3>
            <Bot className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'success' ? 'bg-emerald-500' :
                  activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{activity.agent}</p>
                    <p className="text-xs text-slate-500">{activity.timestamp}</p>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{activity.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Carriers */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Top Performing Carriers</h3>
            <Users className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {topCarriers.map((carrier, index) => (
              <div key={carrier.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      index === 0 ? 'bg-emerald-500' : 
                      index === 1 ? 'bg-blue-500' : 
                      index === 2 ? 'bg-purple-500' : 'bg-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{carrier.name}</p>
                    <p className="text-xs text-slate-500">{carrier.loads} loads • {carrier.onTime}% on-time</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{carrier.matchScore}%</p>
                  <p className="text-xs text-amber-500">{carrier.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard