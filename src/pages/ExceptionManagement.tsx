import React from 'react'
import { AlertTriangle, Shield, Zap, Bell } from 'lucide-react'

const ExceptionManagement = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Exception Management</h1>
        <p className="text-slate-600">Proactive issue detection and automated resolution</p>
      </div>

      <div className="dashboard-card">
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Exception Management Agent</h3>
          <p className="text-slate-600 mb-4">24/7 monitoring, predictive alerts, and automated resolution strategies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Monitoring</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Bell className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Alerts</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Exception Detection</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Auto Resolution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExceptionManagement