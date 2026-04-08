import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AgentOrchestration from './pages/AgentOrchestration'
import RFPManagement from './pages/RFPManagement'
import CapacityDiscovery from './pages/CapacityDiscovery'
import MarketIntelligence from './pages/MarketIntelligence'
import LoadOptimization from './pages/LoadOptimization'
import ContractNegotiation from './pages/ContractNegotiation'
import PerformanceAnalytics from './pages/PerformanceAnalytics'
import ExceptionManagement from './pages/ExceptionManagement'
import ConversationalBI from './pages/ConversationalBI'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agents" element={<AgentOrchestration />} />
          <Route path="/rfp" element={<RFPManagement />} />
          <Route path="/capacity" element={<CapacityDiscovery />} />
          <Route path="/market" element={<MarketIntelligence />} />
          <Route path="/optimization" element={<LoadOptimization />} />
          <Route path="/contracts" element={<ContractNegotiation />} />
          <Route path="/analytics" element={<PerformanceAnalytics />} />
          <Route path="/exceptions" element={<ExceptionManagement />} />
          <Route path="/chat" element={<ConversationalBI />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'text-sm',
        }}
      />
    </div>
  )
}

export default App