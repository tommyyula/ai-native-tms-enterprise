import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Truck,
  Clock,
  Zap,
  Brain,
  Mic,
  Image,
  FileText,
  Download
} from 'lucide-react'
import { useAgentStore } from '../stores/agentStore'

interface ChatMessage {
  id: string
  type: 'user' | 'agent' | 'system'
  content: string
  timestamp: Date
  agentType?: string
  attachments?: Array<{
    type: 'chart' | 'table' | 'image' | 'report'
    title: string
    data?: any
  }>
  suggestions?: string[]
}

const ConversationalBI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to Conversational Business Intelligence. I can help you analyze your freight operations, generate reports, and provide insights. Ask me anything about your TMS data!',
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        'Show me our top performing lanes this month',
        'What carriers have the best on-time delivery rates?',
        'Generate a cost analysis report for Q1',
        'Find opportunities to reduce freight costs'
      ]
    },
    {
      id: '2', 
      type: 'user',
      content: 'Show me our top performing lanes this month',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      type: 'agent',
      content: 'Based on your freight data analysis, here are the top 5 performing lanes for March 2024, ranked by volume and profit margin:',
      timestamp: new Date(Date.now() - 235000),
      agentType: 'Performance Analytics',
      attachments: [
        {
          type: 'chart',
          title: 'Top Performing Lanes - March 2024',
          data: {
            type: 'bar',
            lanes: [
              { name: 'Chicago → Dallas', volume: 847, margin: 14.2, revenue: 2847329 },
              { name: 'LA → Atlanta', volume: 623, margin: 12.8, revenue: 3156782 },
              { name: 'Miami → Chicago', volume: 445, margin: 16.1, revenue: 1923456 },
              { name: 'Denver → Phoenix', volume: 389, margin: 11.5, revenue: 1456789 },
              { name: 'Seattle → Portland', volume: 267, margin: 13.9, revenue: 894567 }
            ]
          }
        },
        {
          type: 'table',
          title: 'Detailed Lane Performance Metrics'
        }
      ],
      suggestions: [
        'Why is the Chicago-Dallas lane performing so well?',
        'Show me carrier performance on these lanes',
        'What are the seasonal trends for these routes?'
      ]
    }
  ])
  
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string>('auto')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { agents } = useAgentStore()

  const agentOptions = [
    { id: 'auto', name: 'Auto-Select Best Agent', icon: Brain },
    { id: 'rfp-orchestrator', name: 'RFP Orchestrator', icon: FileText },
    { id: 'capacity-discovery', name: 'Capacity Discovery', icon: Truck },
    { id: 'market-intelligence', name: 'Market Intelligence', icon: TrendingUp },
    { id: 'performance-analytics', name: 'Performance Analytics', icon: BarChart3 },
    { id: 'exception-management', name: 'Exception Management', icon: Clock }
  ]

  const predefinedQuestions = [
    {
      category: 'Performance',
      questions: [
        'What are our top 10 carriers by on-time performance?',
        'Show me lanes with declining performance',
        'Which routes are most profitable this quarter?',
        'Compare our performance vs industry benchmarks'
      ]
    },
    {
      category: 'Market Analysis',
      questions: [
        'What freight rates are trending up in the Southeast?',
        'Show me capacity constraints by region',
        'How do fuel prices impact our margins?',
        'Predict demand for Q2 based on historical data'
      ]
    },
    {
      category: 'Cost Optimization',
      questions: [
        'Find opportunities to reduce transportation costs',
        'Which carriers offer the best value?',
        'Optimize our carrier mix for better margins',
        'Show me deadhead reduction opportunities'
      ]
    },
    {
      category: 'Operations',
      questions: [
        'List all active exceptions requiring attention',
        'Show me real-time shipment status',
        'Generate a weekly operations report',
        'Track KPI progress against targets'
      ]
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateAgentResponse = (userMessage: string) => {
    setIsTyping(true)
    
    // Simulate AI thinking time
    setTimeout(() => {
      let agentResponse: ChatMessage
      
      if (userMessage.toLowerCase().includes('carrier') && userMessage.toLowerCase().includes('performance')) {
        agentResponse = {
          id: Date.now().toString(),
          type: 'agent',
          content: 'Here are our top carriers ranked by on-time delivery performance and overall service quality:',
          timestamp: new Date(),
          agentType: 'Capacity Discovery',
          attachments: [
            {
              type: 'chart',
              title: 'Carrier Performance Rankings',
              data: {
                type: 'ranking',
                carriers: [
                  { name: 'Premier Logistics', score: 97.2, loads: 245, rating: 4.8 },
                  { name: 'Swift Transport', score: 94.8, loads: 378, rating: 4.6 },
                  { name: 'Reliable Freight', score: 93.5, loads: 156, rating: 4.5 },
                  { name: 'Express Cargo', score: 91.2, loads: 189, rating: 4.3 }
                ]
              }
            }
          ],
          suggestions: [
            'Show me detailed metrics for Premier Logistics',
            'Which carriers are underperforming?',
            'Create a carrier scorecard report'
          ]
        }
      } else if (userMessage.toLowerCase().includes('cost') || userMessage.toLowerCase().includes('save')) {
        agentResponse = {
          id: Date.now().toString(),
          type: 'agent',
          content: 'I\'ve identified several cost optimization opportunities based on your freight patterns:',
          timestamp: new Date(),
          agentType: 'Market Intelligence',
          attachments: [
            {
              type: 'report',
              title: 'Cost Optimization Opportunities',
              data: {
                savings: [
                  { opportunity: 'Consolidate LTL shipments on Chicago-Dallas lane', potential: 89000, timeframe: '30 days' },
                  { opportunity: 'Negotiate volume discounts with top 3 carriers', potential: 156000, timeframe: '90 days' },
                  { opportunity: 'Optimize backhaul opportunities', potential: 67000, timeframe: '60 days' },
                  { opportunity: 'Reduce deadhead miles through load planning', potential: 134000, timeframe: '45 days' }
                ]
              }
            }
          ],
          suggestions: [
            'Show me detailed analysis for the biggest opportunity',
            'Create an implementation plan',
            'Calculate ROI for these optimizations'
          ]
        }
      } else {
        agentResponse = {
          id: Date.now().toString(),
          type: 'agent',
          content: `I understand you're asking about "${userMessage}". Let me analyze your data and provide insights. This is a simulated response showing how the AI would interpret and respond to your query with relevant data visualizations and actionable recommendations.`,
          timestamp: new Date(),
          agentType: 'Auto-Selected',
          suggestions: [
            'Tell me more about this analysis',
            'Show me related metrics',
            'Generate a detailed report'
          ]
        }
      }
      
      setMessages(prev => [...prev, agentResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 2000) // Simulate variable thinking time
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    
    // Simulate agent response
    simulateAgentResponse(inputText)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
  }

  const handleQuestionClick = (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    simulateAgentResponse(question)
  }

  const renderAttachment = (attachment: any) => {
    switch (attachment.type) {
      case 'chart':
        return (
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">{attachment.title}</h4>
              <BarChart3 className="h-4 w-4 text-slate-400" />
            </div>
            {attachment.data?.lanes ? (
              <div className="space-y-2">
                {attachment.data.lanes.map((lane: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-white rounded">
                    <span className="text-sm font-medium">{lane.name}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold">{lane.volume} loads</div>
                      <div className="text-xs text-emerald-600">{lane.margin}% margin</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : attachment.data?.carriers ? (
              <div className="space-y-2">
                {attachment.data.carriers.map((carrier: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-white rounded">
                    <span className="text-sm font-medium">{carrier.name}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600">{carrier.score}%</div>
                      <div className="text-xs text-slate-500">{carrier.loads} loads</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                <span className="text-slate-600">📊 Interactive Chart Placeholder</span>
              </div>
            )}
          </div>
        )
      case 'report':
        return (
          <div className="mt-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-emerald-900">{attachment.title}</h4>
              <FileText className="h-4 w-4 text-emerald-600" />
            </div>
            {attachment.data?.savings && (
              <div className="space-y-2">
                {attachment.data.savings.map((item: any, index: number) => (
                  <div key={index} className="p-3 bg-white rounded border border-emerald-100">
                    <div className="font-medium text-slate-900 mb-1">{item.opportunity}</div>
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 font-bold">${item.potential.toLocaleString()} potential savings</span>
                      <span className="text-slate-500">{item.timeframe}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Conversational Business Intelligence</h1>
        <p className="text-slate-600">Ask questions about your freight data in natural language and get AI-powered insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Question Suggestions */}
        <div className="lg:col-span-1">
          <div className="dashboard-card h-fit">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Questions</h3>
            
            <div className="space-y-4">
              {predefinedQuestions.map((category) => (
                <div key={category.category}>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">{category.category}</h4>
                  <div className="space-y-1">
                    {category.questions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full text-left p-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="dashboard-card h-[600px] flex flex-col">
            {/* Agent Selector */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-blue-600" />
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="text-sm border-none bg-transparent focus:ring-0 font-medium text-slate-700"
                >
                  {agentOptions.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-blue-600' 
                          : message.type === 'system'
                          ? 'bg-slate-600'
                          : 'bg-emerald-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      
                      <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                        {message.agentType && (
                          <div className="text-xs text-slate-500 mb-1">
                            {message.agentType}
                          </div>
                        )}
                        
                        <div className={`inline-block p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : message.type === 'system'
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-white border border-slate-200 text-slate-800'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          
                          {message.attachments && (
                            <div className="space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index}>
                                  {renderAttachment(attachment)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full border border-blue-200"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs text-slate-400 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-slate-500">AI is analyzing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <Mic className="h-5 w-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <Image className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about your freight data, carriers, routes, costs, performance..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isTyping}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationalBI