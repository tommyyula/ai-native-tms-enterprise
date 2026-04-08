import React from 'react'
import { Navigation, MapPin, Truck, Clock, TrendingUp } from 'lucide-react'

const LoadOptimization = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Load Optimization</h1>
        <p className="text-slate-600">AI-powered route optimization and load consolidation</p>
      </div>

      <div className="dashboard-card">
        <div className="text-center py-12">
          <Navigation className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Load Optimization Agent</h3>
          <p className="text-slate-600 mb-4">Advanced route planning, multi-stop optimization, and delivery scheduling</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Navigation className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Route Planning</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Truck className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Load Consolidation</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Scheduling</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadOptimization