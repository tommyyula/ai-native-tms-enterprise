import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  BarChart3, 
  LineChart, 
  PieChart, 
  MapPin, 
  Fuel,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react'

const MarketIntelligence = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('7d')
  const [selectedLane, setSelectedLane] = useState<string | null>('chicago-dallas')
  const [refreshing, setRefreshing] = useState(false)

  // Mock market data
  const marketData = {
    overview: {
      avgSpotRate: 2450.75,
      rateChange: 8.2,
      fuelPrice: 3.89,
      fuelChange: -2.1,
      capacityUtilization: 87.4,
      utilChange: 5.3,
      demandIndex: 142,
      demandChange: 12.7
    },
    lanes: [
      {
        id: 'chicago-dallas',
        name: 'Chicago, IL → Dallas, TX',
        distance: 967,
        avgRate: 2347.50,
        rateChange: 12.3,
        volume: 1847,
        volumeChange: 8.7,
        capacityScore: 'tight',
        trend: 'up',
        confidence: 94
      },
      {
        id: 'la-atlanta',
        name: 'Los Angeles, CA → Atlanta, GA',
        distance: 2175,
        avgRate: 4892.25,
        rateChange: -3.4,
        volume: 2341,
        volumeChange: -2.1,
        capacityScore: 'balanced',
        trend: 'down',
        confidence: 87
      },
      {
        id: 'miami-chicago',
        name: 'Miami, FL → Chicago, IL',
        distance: 1377,
        avgRate: 3124.80,
        rateChange: 15.7,
        volume: 967,
        volumeChange: 23.4,
        capacityScore: 'very_tight',
        trend: 'up',
        confidence: 91
      }
    ],
    pricing: {
      sources: [
        { name: 'DAT Spot Rates', rate: 2347.50, confidence: 'high', lastUpdate: '5 min ago' },
        { name: 'Truckstop Rates', rate: 2398.75, confidence: 'high', lastUpdate: '12 min ago' },
        { name: 'SONAR Market', rate: 2312.90, confidence: 'medium', lastUpdate: '15 min ago' },
        { name: 'Internal History', rate: 2367.25, confidence: 'high', lastUpdate: '2 min ago' },
        { name: 'Broker Network', rate: 2421.60, confidence: 'medium', lastUpdate: '8 min ago' },
        { name: 'Contract Rates', rate: 2298.40, confidence: 'low', lastUpdate: '1 hour ago' }
      ],
      recommendation: {
        suggested: 2389.50,
        range: { min: 2298.40, max: 2456.75 },
        strategy: 'competitive',
        reasoning: 'Market rates trending up due to capacity constraints. Position 3% above market average.'
      }
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const getCapacityColor = (score: string) => {
    switch (score) {
      case 'very_tight': return 'text-red-600 bg-red-50'
      case 'tight': return 'text-amber-600 bg-amber-50'
      case 'balanced': return 'text-emerald-600 bg-emerald-50'
      case 'loose': return 'text-blue-600 bg-blue-50'
      default: return 'text-slate-600 bg-slate-50'
    }
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' || change > 0) {
      return <TrendingUp className="h-4 w-4 text-emerald-500" />
    } else if (trend === 'down' || change < 0) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <Activity className="h-4 w-4 text-slate-400" />
  }

  const selectedLaneData = marketData.lanes.find(lane => lane.id === selectedLane)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Intelligence</h1>
          <p className="text-slate-600">Real-time market analysis with 8-source data fusion and AI-powered insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center px-3 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center px-3 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Spot Rate</p>
              <p className="text-2xl font-bold text-slate-900">${marketData.overview.avgSpotRate.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {getTrendIcon('up', marketData.overview.rateChange)}
            <span className="ml-1 text-sm font-medium text-emerald-600">
              +{marketData.overview.rateChange}% vs last week
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Fuel Price</p>
              <p className="text-2xl font-bold text-slate-900">${marketData.overview.fuelPrice}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-full">
              <Fuel className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {getTrendIcon('down', marketData.overview.fuelChange)}
            <span className="ml-1 text-sm font-medium text-red-600">
              {marketData.overview.fuelChange}% vs last week
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Capacity Utilization</p>
              <p className="text-2xl font-bold text-slate-900">{marketData.overview.capacityUtilization}%</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {getTrendIcon('up', marketData.overview.utilChange)}
            <span className="ml-1 text-sm font-medium text-emerald-600">
              +{marketData.overview.utilChange}% capacity tightening
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Demand Index</p>
              <p className="text-2xl font-bold text-slate-900">{marketData.overview.demandIndex}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {getTrendIcon('up', marketData.overview.demandChange)}
            <span className="ml-1 text-sm font-medium text-emerald-600">
              +{marketData.overview.demandChange}% above baseline
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lane Analysis */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Top Lanes Analysis</h3>
            <div className="flex space-x-2">
              {['1d', '7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period as any)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedTimeframe === period
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {marketData.lanes.map((lane) => (
              <div 
                key={lane.id}
                onClick={() => setSelectedLane(lane.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedLane === lane.id 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900">{lane.name}</h4>
                    <p className="text-sm text-slate-600">{lane.distance} miles</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">
                      ${lane.avgRate.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(lane.trend, lane.rateChange)}
                      <span className={`ml-1 text-sm font-medium ${
                        lane.rateChange > 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {lane.rateChange > 0 ? '+' : ''}{lane.rateChange}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-600">
                      Volume: {lane.volume.toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCapacityColor(lane.capacityScore)}`}>
                      {lane.capacityScore.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    Confidence: {lane.confidence}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Pricing Panel */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Dynamic Pricing Intelligence</h3>
            <Zap className="h-5 w-5 text-blue-600" />
          </div>

          {selectedLaneData && (
            <div className="space-y-6">
              {/* Selected Lane Info */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">{selectedLaneData.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Current Rate:</span>
                    <div className="font-bold text-lg">${selectedLaneData.avgRate.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">7d Change:</span>
                    <div className={`font-medium ${
                      selectedLaneData.rateChange > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {selectedLaneData.rateChange > 0 ? '+' : ''}{selectedLaneData.rateChange}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Sources */}
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Rate Sources</h4>
                <div className="space-y-2">
                  {marketData.pricing.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          source.confidence === 'high' ? 'bg-emerald-500' :
                          source.confidence === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium text-slate-900">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">${source.rate.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{source.lastUpdate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Zap className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-900">AI Pricing Recommendation</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Suggested Rate:</span>
                    <span className="text-xl font-bold text-blue-900">
                      ${marketData.pricing.recommendation.suggested.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Range:</span>
                    <span className="text-blue-900">
                      ${marketData.pricing.recommendation.range.min.toLocaleString()} - 
                      ${marketData.pricing.recommendation.range.max.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Strategy:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {marketData.pricing.recommendation.strategy.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-sm text-blue-700">
                      {marketData.pricing.recommendation.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Apply Recommended Rate
                </button>
                <button className="w-full px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                  Create Rate Alert
                </button>
                <button className="w-full px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                  View Historical Trends
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Market Insights */}
      <div className="mt-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">AI Market Insights</h3>
            <div className="text-sm text-slate-500">Last updated: 2 minutes ago</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <span className="font-medium text-amber-900">Market Alert</span>
              </div>
              <p className="text-sm text-amber-800">
                Capacity tightening detected on West Coast routes. Rates expected to increase 8-12% over next 2 weeks due to port congestion.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="font-medium text-emerald-900">Opportunity</span>
              </div>
              <p className="text-sm text-emerald-800">
                Southeast lanes showing strong demand with 15%+ rate premiums. Consider expanding coverage in Florida-Georgia corridor.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Forecast</span>
              </div>
              <p className="text-sm text-blue-800">
                Q2 demand expected to remain strong. Fuel price stabilization should improve carrier margins and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketIntelligence