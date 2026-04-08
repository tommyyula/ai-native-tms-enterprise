import React from 'react'
import { FileText as FileContract, Users, DollarSign, CheckCircle } from 'lucide-react'

const ContractNegotiation = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contract Negotiation</h1>
        <p className="text-slate-600">Automated bid evaluation and contract terms negotiation</p>
      </div>

      <div className="dashboard-card">
        <div className="text-center py-12">
          <FileContract className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Contract Negotiation Agent</h3>
          <p className="text-slate-600 mb-4">AI-powered contract analysis, bid evaluation, and automated negotiation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileContract className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Contract Analysis</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Users className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Bid Evaluation</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-amber-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Terms Negotiation</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Digital Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractNegotiation