import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  Search, 
  TrendingUp, 
  Navigation, 
  FileText as FileContract, 
  BarChart3, 
  AlertTriangle, 
  MessageSquare,
  Menu,
  X,
  Bell,
  Settings,
  User
} from 'lucide-react'
import { useAgentStore } from '../stores/agentStore'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'AI Agents', href: '/agents', icon: Bot },
  { name: 'RFP Management', href: '/rfp', icon: FileText },
  { name: 'Capacity Discovery', href: '/capacity', icon: Search },
  { name: 'Market Intelligence', href: '/market', icon: TrendingUp },
  { name: 'Load Optimization', href: '/optimization', icon: Navigation },
  { name: 'Contract Negotiation', href: '/contracts', icon: FileContract },
  { name: 'Performance Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Exception Management', href: '/exceptions', icon: AlertTriangle },
  { name: 'Conversational BI', href: '/chat', icon: MessageSquare },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { agents, messages } = useAgentStore()

  // Get active agent count
  const activeAgentCount = Object.values(agents).filter(agent => agent.status === 'active').length
  const thinkingAgentCount = Object.values(agents).filter(agent => agent.status === 'thinking').length
  const recentMessageCount = messages.filter(msg => 
    new Date().getTime() - msg.timestamp.getTime() < 5 * 60 * 1000 // Last 5 minutes
  ).length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm bg-white border-r border-slate-200 shadow-xl">
            <div className="flex items-center justify-between px-4 py-4">
              <h1 className="text-xl font-bold text-slate-900">AI-Native TMS</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 px-4 pb-4 overflow-y-auto">
              <MobileNavigation />
            </div>
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-slate-200">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 px-6 border-b border-slate-200">
            <Bot className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-xl font-bold text-slate-900">AI-Native TMS</h1>
          </div>
          
          {/* Agent Status Panel */}
          <div className="p-4 border-b border-slate-200">
            <div className="text-xs font-medium text-slate-500 mb-2">AGENT STATUS</div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-emerald-600">{activeAgentCount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Thinking</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium text-amber-600">{thinkingAgentCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 overflow-y-auto">
            <DesktopNavigation />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white border-b border-slate-200 lg:border-b-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="lg:hidden ml-2">
                <h1 className="text-lg font-semibold text-slate-900">AI-Native TMS</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notification indicator */}
              <button className="relative p-2 text-slate-400 hover:text-slate-500">
                <Bell className="h-6 w-6" />
                {recentMessageCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {recentMessageCount > 9 ? '9+' : recentMessageCount}
                    </span>
                  </div>
                )}
              </button>

              <button className="p-2 text-slate-400 hover:text-slate-500">
                <Settings className="h-6 w-6" />
              </button>

              <button className="p-2 text-slate-400 hover:text-slate-500">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  )

  function DesktopNavigation() {
    return (
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }
              `}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    )
  }

  function MobileNavigation() {
    return (
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }
              `}
            >
              <item.icon className={`mr-4 h-6 w-6 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    )
  }
}