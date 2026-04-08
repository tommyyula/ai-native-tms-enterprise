import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  MapPin, 
  Truck, 
  Star, 
  Shield, 
  Phone, 
  Mail, 
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Zap
} from 'lucide-react'

const CapacityDiscovery = () => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    equipmentType: 'dry_van',
    pickupDate: '',
    dhPickup: 250,
    dhDelivery: 250
  })
  
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'repeated' | 'onboarded'>('all')
  const [selectedCarrier, setSelectedCarrier] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock carrier data with match scores
  const carriers = [
    {
      id: 'MC789456',
      companyName: 'Premier Logistics LLC',
      mcNumber: 'MC-789456',
      dotNumber: 'DOT-2847392',
      matchScore: 98,
      source: 'Onboarded',
      phone: '+1-555-0123',
      email: 'dispatch@premier-logistics.com',
      primaryContact: 'Sarah Johnson',
      origin: 'Chicago, IL',
      verified: true,
      equipmentType: ['Dry Van', 'Refrigerated'],
      loadType: 'FTL',
      pickup: 'Chicago, IL',
      dropoff: 'Dallas, TX',
      weight: '24,500 lbs',
      avgExpenditure: '$2,847',
      trucks: 45,
      drivers: 52,
      serviceLevel: 'Gold',
      okToLoad: true,
      lastHaul: '2024-04-01',
      totalLoads: 287,
      hazmatCapacity: true,
      tankerEndorsement: false,
      inBondCapacity: false,
      liftgate: true,
      totalFatalities: 0,
      outOfService: 'None',
      ratings: 4.8,
      dateOnboarded: '2023-01-15',
      performance: {
        onTimePickup: 97.2,
        onTimeDelivery: 96.8,
        responseTime: 1.2,
        communicationScore: 4.7,
        damageRate: 0.02,
        overallScore: 96.5
      }
    },
    {
      id: 'MC456789',
      companyName: 'Swift Transport Solutions',
      mcNumber: 'MC-456789',
      dotNumber: 'DOT-1928374',
      matchScore: 94,
      source: 'AI Discovery',
      phone: '+1-555-0456',
      email: 'ops@swift-transport.com',
      primaryContact: 'Mike Rodriguez',
      origin: 'Dallas, TX',
      verified: true,
      equipmentType: ['Dry Van', 'Flatbed'],
      loadType: 'FTL',
      pickup: null,
      dropoff: null,
      weight: null,
      avgExpenditure: null,
      trucks: 128,
      drivers: 145,
      serviceLevel: null,
      okToLoad: null,
      lastHaul: '2024-03-28',
      totalLoads: 1247,
      hazmatCapacity: false,
      tankerEndorsement: false,
      inBondCapacity: true,
      liftgate: false,
      totalFatalities: 1,
      outOfService: 'None',
      ratings: null,
      dateOnboarded: null,
      performance: {
        onTimePickup: 94.1,
        onTimeDelivery: 93.8,
        responseTime: 2.1,
        communicationScore: 4.2,
        damageRate: 0.05,
        overallScore: 92.3
      }
    },
    {
      id: 'MC234567',
      companyName: 'Reliable Freight Partners',
      mcNumber: 'MC-234567',
      dotNumber: 'DOT-8374651',
      matchScore: 91,
      source: 'Repeated',
      phone: '+1-555-0789',
      email: 'dispatch@reliable-freight.com',
      primaryContact: 'Jennifer Chen',
      origin: 'Atlanta, GA',
      verified: true,
      equipmentType: ['Dry Van'],
      loadType: 'FTL',
      pickup: 'Chicago, IL',
      dropoff: 'Dallas, TX',
      weight: '22,800 lbs',
      avgExpenditure: '$2,234',
      trucks: 23,
      drivers: 29,
      serviceLevel: 'Silver',
      okToLoad: true,
      lastHaul: '2024-03-15',
      totalLoads: 156,
      hazmatCapacity: false,
      tankerEndorsement: false,
      inBondCapacity: false,
      liftgate: true,
      totalFatalities: 0,
      outOfService: 'None',
      ratings: 4.5,
      dateOnboarded: '2023-08-22',
      performance: {
        onTimePickup: 95.7,
        onTimeDelivery: 94.3,
        responseTime: 1.8,
        communicationScore: 4.4,
        damageRate: 0.03,
        overallScore: 94.1
      }
    },
    {
      id: 'MC345678',
      companyName: 'Express Cargo Services',
      mcNumber: 'MC-345678',
      dotNumber: 'DOT-5647382',
      matchScore: 87,
      source: 'AI Discovery',
      phone: '+1-555-0321',
      email: 'info@express-cargo.com',
      primaryContact: 'David Thompson',
      origin: 'Memphis, TN',
      verified: false,
      equipmentType: ['Dry Van', 'Refrigerated'],
      loadType: 'FTL',
      pickup: null,
      dropoff: null,
      weight: null,
      avgExpenditure: null,
      trucks: 67,
      drivers: 78,
      serviceLevel: null,
      okToLoad: null,
      lastHaul: '2024-04-03',
      totalLoads: 834,
      hazmatCapacity: true,
      tankerEndorsement: true,
      inBondCapacity: false,
      liftgate: false,
      totalFatalities: 0,
      outOfService: '2 violations',
      ratings: null,
      dateOnboarded: null,
      performance: {
        onTimePickup: 89.4,
        onTimeDelivery: 87.2,
        responseTime: 3.2,
        communicationScore: 3.8,
        damageRate: 0.08,
        overallScore: 87.6
      }
    }
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 font-bold'
    if (score >= 80) return 'text-amber-600 font-medium'
    return 'text-red-600 font-normal'
  }

  const getMatchScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 border-emerald-200'
    if (score >= 80) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const filteredCarriers = carriers.filter(carrier => {
    if (activeTab === 'all') return true
    if (activeTab === 'ai') return carrier.source === 'AI Discovery'
    if (activeTab === 'repeated') return carrier.source === 'Repeated'
    if (activeTab === 'onboarded') return carrier.source === 'Onboarded'
    return true
  })

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
    }, 2000)
  }

  const selectedCarrierData = selectedCarrier 
    ? carriers.find(c => c.id === selectedCarrier)
    : null

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Capacity Discovery</h1>
        <p className="text-slate-600">AI-powered carrier search with intelligent matching from multiple data sources</p>
      </div>

      {/* Search Panel */}
      <div className="dashboard-card mb-8">
        <div className="flex items-center mb-6">
          <Zap className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-slate-900">Smart Carrier Search</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchParams.origin}
                onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                placeholder="Enter city, state or ZIP"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchParams.destination}
                onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                placeholder="Enter city, state or ZIP"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Equipment</label>
            <select
              value={searchParams.equipmentType}
              onChange={(e) => setSearchParams({ ...searchParams, equipmentType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="dry_van">Dry Van</option>
              <option value="refrigerated">Refrigerated</option>
              <option value="flatbed">Flatbed</option>
              <option value="step_deck">Step Deck</option>
              <option value="lowboy">Lowboy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Date</label>
            <input
              type="date"
              value={searchParams.pickupDate}
              onChange={(e) => setSearchParams({ ...searchParams, pickupDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">DH Pickup (miles)</label>
            <input
              type="number"
              value={searchParams.dhPickup}
              onChange={(e) => setSearchParams({ ...searchParams, dhPickup: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">DH Delivery (miles)</label>
            <input
              type="number"
              value={searchParams.dhDelivery}
              onChange={(e) => setSearchParams({ ...searchParams, dhDelivery: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <>
                  <Clock className="animate-spin h-4 w-4 mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Carriers
                </>
              )}
            </button>
          </div>
        </div>

        {isSearching && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="animate-spin h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">AI Search in Progress...</span>
            </div>
            <div className="text-xs text-blue-600">
              • Scanning ZUUM network carriers
              <br />
              • Querying DAT load board
              <br />
              • Checking Truckstop database
              <br />
              • Validating FMCSA safety records
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  Send Offer
                </button>
                <button className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                  Invite Carrier
                </button>
                <button className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                  Add to List
                </button>
              </div>
              <div className="text-sm text-slate-600">
                {filteredCarriers.length} carriers found
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-slate-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'all', name: 'All Carriers', count: carriers.length },
                  { id: 'ai', name: 'AI Discovered', count: carriers.filter(c => c.source === 'AI Discovery').length },
                  { id: 'repeated', name: 'Repeated', count: carriers.filter(c => c.source === 'Repeated').length },
                  { id: 'onboarded', name: 'Onboarded', count: carriers.filter(c => c.source === 'Onboarded').length }
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
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            {/* Carrier Results */}
            <div className="space-y-4">
              {filteredCarriers.map((carrier) => (
                <div 
                  key={carrier.id} 
                  onClick={() => setSelectedCarrier(carrier.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedCarrier === carrier.id 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getMatchScoreBackground(carrier.matchScore)} ${getMatchScoreColor(carrier.matchScore)}`}>
                        {carrier.matchScore}%
                      </div>
                      <h4 className="font-semibold text-slate-900">{carrier.companyName}</h4>
                      {carrier.verified && (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                        {carrier.source}
                      </span>
                      {carrier.serviceLevel && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          carrier.serviceLevel === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                          carrier.serviceLevel === 'Silver' ? 'bg-slate-100 text-slate-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {carrier.serviceLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">MC/DOT:</span>
                      <div className="font-medium">{carrier.mcNumber}</div>
                      <div className="text-slate-600">{carrier.dotNumber}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Equipment:</span>
                      <div className="font-medium">{carrier.equipmentType.join(', ')}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Fleet Size:</span>
                      <div className="font-medium">{carrier.trucks} trucks</div>
                      <div className="text-slate-600">{carrier.drivers} drivers</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Performance:</span>
                      <div className="font-medium">{carrier.performance.onTimeDelivery.toFixed(1)}% OTD</div>
                      {carrier.ratings && (
                        <div className="text-amber-500">★ {carrier.ratings}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mt-3 text-xs text-slate-500">
                    <span>Last haul: {carrier.lastHaul}</span>
                    <span>Total loads: {carrier.totalLoads}</span>
                    {carrier.hazmatCapacity && <span className="text-orange-600">HAZMAT</span>}
                    {carrier.liftgate && <span className="text-blue-600">Liftgate</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrier Details Panel */}
        <div className="lg:col-span-1">
          {selectedCarrierData ? (
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Carrier Details</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getMatchScoreBackground(selectedCarrierData.matchScore)} ${getMatchScoreColor(selectedCarrierData.matchScore)}`}>
                  {selectedCarrierData.matchScore}% Match
                </div>
              </div>

              <div className="space-y-4">
                {/* Company Info */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">{selectedCarrierData.companyName}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-slate-400 mr-2" />
                      <a href={`tel:${selectedCarrierData.phone}`} className="text-blue-600 hover:underline">
                        {selectedCarrierData.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-slate-400 mr-2" />
                      <a href={`mailto:${selectedCarrierData.email}`} className="text-blue-600 hover:underline">
                        {selectedCarrierData.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-slate-400 mr-2" />
                      <span className="text-slate-600">{selectedCarrierData.primaryContact}</span>
                    </div>
                  </div>
                </div>

                {/* Safety & Compliance */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Safety & Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Verified Status</span>
                      <div className="flex items-center">
                        {selectedCarrierData.verified ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" />
                            <span className="text-sm text-emerald-600">Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm text-amber-600">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Out of Service</span>
                      <span className="text-sm text-slate-900">{selectedCarrierData.outOfService}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Fatalities</span>
                      <span className="text-sm text-slate-900">{selectedCarrierData.totalFatalities}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Performance</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">On-Time Pickup</span>
                        <span className="text-sm font-medium">{selectedCarrierData.performance.onTimePickup}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className="bg-emerald-500 h-1.5 rounded-full" 
                          style={{ width: `${selectedCarrierData.performance.onTimePickup}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">On-Time Delivery</span>
                        <span className="text-sm font-medium">{selectedCarrierData.performance.onTimeDelivery}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className="bg-emerald-500 h-1.5 rounded-full" 
                          style={{ width: `${selectedCarrierData.performance.onTimeDelivery}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Response Time</span>
                      <span className="text-sm font-medium">{selectedCarrierData.performance.responseTime}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Damage Rate</span>
                      <span className="text-sm font-medium">{selectedCarrierData.performance.damageRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCarrierData.hazmatCapacity && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">HAZMAT</span>
                    )}
                    {selectedCarrierData.tankerEndorsement && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Tanker</span>
                    )}
                    {selectedCarrierData.inBondCapacity && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">In-Bond</span>
                    )}
                    {selectedCarrierData.liftgate && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">Liftgate</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-slate-200">
                  <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Send Load Offer
                  </button>
                  <button className="w-full px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                    Add to Favorites
                  </button>
                  <button className="w-full px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">
                    View Full Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-card">
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Select a Carrier</h3>
                <p className="text-slate-600">Click on a carrier from the search results to view detailed information</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CapacityDiscovery