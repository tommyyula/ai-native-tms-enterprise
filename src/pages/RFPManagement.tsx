import React, { useState } from 'react'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  MapPin,
  Truck,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react'

const RFPManagement = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'draft' | 'completed' | 'templates'>('active')
  const [selectedRFP, setSelectedRFP] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock RFP data - in real app this would come from API
  const rfpData = {
    active: [
      {
        id: 'RFP-2024-089',
        title: 'Q2 Chicago-Dallas Freight Lanes',
        status: 'round1_open',
        totalLanes: 12,
        bidders: 23,
        dueDate: '2024-04-15',
        estimatedValue: 2400000,
        category: 'Dry Van',
        progress: 65,
        round: 1,
        bids: 15,
        topBid: 1847.50,
        avgBid: 2023.80
      },
      {
        id: 'RFP-2024-087',
        title: 'West Coast Refrigerated Network',
        status: 'round2_open',
        totalLanes: 8,
        bidders: 18,
        dueDate: '2024-04-12',
        estimatedValue: 1800000,
        category: 'Refrigerated',
        progress: 85,
        round: 2,
        bids: 12,
        topBid: 2234.75,
        avgBid: 2456.20
      },
      {
        id: 'RFP-2024-085',
        title: 'Southeast Flatbed Operations',
        status: 'evaluation',
        totalLanes: 15,
        bidders: 31,
        dueDate: '2024-04-10',
        estimatedValue: 3200000,
        category: 'Flatbed',
        progress: 95,
        round: 1,
        bids: 28,
        topBid: 1654.25,
        avgBid: 1823.45
      }
    ],
    draft: [
      {
        id: 'DRAFT-2024-012',
        title: 'Q3 Cross-Country LTL Network',
        status: 'draft',
        totalLanes: 25,
        bidders: 0,
        dueDate: null,
        estimatedValue: 4500000,
        category: 'LTL',
        progress: 45,
        round: 0,
        bids: 0,
        topBid: null,
        avgBid: null
      }
    ],
    completed: [
      {
        id: 'RFP-2024-082',
        title: 'Q1 Regional Distribution',
        status: 'awarded',
        totalLanes: 18,
        bidders: 27,
        dueDate: '2024-03-15',
        estimatedValue: 2800000,
        category: 'Dry Van',
        progress: 100,
        round: 2,
        bids: 24,
        topBid: 1534.80,
        avgBid: 1687.35
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-slate-100 text-slate-700'
      case 'round1_open':
        return 'bg-blue-100 text-blue-700'
      case 'round2_open':
        return 'bg-purple-100 text-purple-700'
      case 'evaluation':
        return 'bg-amber-100 text-amber-700'
      case 'awarded':
        return 'bg-emerald-100 text-emerald-700'
      case 'completed':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Edit className="h-4 w-4" />
      case 'round1_open':
      case 'round2_open':
        return <Clock className="h-4 w-4" />
      case 'evaluation':
        return <AlertCircle className="h-4 w-4" />
      case 'awarded':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const currentRFPs = rfpData[activeTab] || []

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">RFP Management</h1>
          <p className="text-slate-600">AI-powered Request for Proposal lifecycle management with multi-round bidding</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
            <Upload className="h-4 w-4 mr-2" />
            Import Lanes
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create RFP
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active RFPs</p>
              <p className="text-2xl font-bold text-blue-600">{rfpData.active.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-sm text-blue-600">2 closing this week</div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Value</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(rfpData.active.reduce((sum, rfp) => sum + rfp.estimatedValue, 0))}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="mt-2 text-sm text-emerald-600">+18% vs last month</div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Bidders</p>
              <p className="text-2xl font-bold text-purple-600">
                {rfpData.active.reduce((sum, rfp) => sum + rfp.bidders, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-purple-600">Avg 22 per RFP</div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Savings Rate</p>
              <p className="text-2xl font-bold text-amber-600">12.4%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-500" />
          </div>
          <div className="mt-2 text-sm text-amber-600">vs market rates</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'active', name: `Active (${rfpData.active.length})`, icon: Clock },
            { id: 'draft', name: `Drafts (${rfpData.draft.length})`, icon: Edit },
            { id: 'completed', name: `Completed (${rfpData.completed.length})`, icon: CheckCircle },
            { id: 'templates', name: 'Templates', icon: FileText }
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

      {/* Filters and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search RFPs..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="flex items-center px-3 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
        <div className="text-sm text-slate-600">
          Showing {currentRFPs.length} RFPs
        </div>
      </div>

      {/* RFP List */}
      <div className="space-y-4">
        {currentRFPs.map((rfp) => (
          <div key={rfp.id} className="dashboard-card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-slate-900">{rfp.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rfp.status)}`}>
                      {getStatusIcon(rfp.status)}
                      <span className="ml-1 capitalize">{rfp.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-slate-600">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {rfp.id}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {rfp.totalLanes} lanes
                    </span>
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      {rfp.category}
                    </span>
                    {rfp.dueDate && (
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due {rfp.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">{formatCurrency(rfp.estimatedValue)}</div>
                  <div className="text-sm text-slate-600">Estimated Value</div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Progress and Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">Progress</span>
                  <span className="text-xs text-slate-600">{rfp.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${rfp.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{rfp.bidders}</div>
                <div className="text-xs text-slate-600">Invited Bidders</div>
              </div>

              {rfp.bids > 0 && (
                <>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{rfp.bids}</div>
                    <div className="text-xs text-slate-600">Bids Received</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">${rfp.topBid?.toFixed(2)}</div>
                    <div className="text-xs text-slate-600">Best Bid Rate</div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                {rfp.round > 0 && (
                  <span className="text-sm text-slate-600">Round {rfp.round}</span>
                )}
                {rfp.status === 'round1_open' && (
                  <span className="text-sm text-blue-600">● Bidding Open</span>
                )}
                {rfp.status === 'round2_open' && (
                  <span className="text-sm text-purple-600">● Round 2 Active</span>
                )}
                {rfp.status === 'evaluation' && (
                  <span className="text-sm text-amber-600">● Under Evaluation</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded hover:bg-slate-200">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                {rfp.status !== 'awarded' && rfp.status !== 'completed' && (
                  <button className="flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
                <button className="flex items-center px-3 py-1.5 text-sm text-slate-600 bg-slate-100 rounded hover:bg-slate-200">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'templates' && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">RFP Templates</h3>
          <p className="text-slate-600 mb-4">Create reusable templates to streamline your RFP creation process</p>
          <button className="flex items-center mx-auto px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>
      )}

      {/* Create RFP Modal placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Create New RFP</h2>
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">RFP creation wizard would be implemented here</p>
                <p className="text-sm text-slate-500 mt-2">Including multi-round setup, lane upload, carrier invitation</p>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Create RFP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RFPManagement