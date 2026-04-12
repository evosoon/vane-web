'use client'

import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useState, useRef, useEffect } from 'react'
import { Send, Plus, Sparkles, History, X } from 'lucide-react'
import { simulateAIResponse } from '@/lib/ai-mock'
import { useChatStore } from '@/stores/chat'
import { cn } from '@/lib/utils'

const QUICK_QUESTIONS = [
  '今日市场情绪如何？',
  '涨停板有哪些特征？',
  '主力资金流向哪些板块？',
  '贵州茅台技术面分析',
]

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { sessions, currentSessionId, addMessage, newSession, setCurrentSession } = useChatStore()
  const currentSession = sessions.find((s) => s.id === currentSessionId)

  useEffect(() => {
    if (sessions.length === 0) newSession()
  }, [sessions.length, newSession])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession?.messages])

  const handleSend = async () => {
    if (!input.trim() || !currentSessionId || isLoading) return
    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    addMessage(currentSessionId, { role: 'user', content: userMessage })
    addMessage(currentSessionId, { role: 'assistant', content: '' })

    await simulateAIResponse(userMessage, (chunk) => {
      useChatStore.setState((state) => ({
        sessions: state.sessions.map((s) =>
          s.id === currentSessionId
            ? { ...s, messages: s.messages.map((m, idx) => idx === s.messages.length - 1 ? { ...m, content: chunk } : m) }
            : s
        ),
      }))
    })
    setIsLoading(false)
  }

  return (
    <main className="h-screen flex flex-col pb-20">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[800px] mx-auto space-y-4">
          {!currentSession?.messages.length && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 text-brand-blue mx-auto mb-4" />
              <h2 className="text-lg font-bold text-text-1 mb-2">AI 问股助手</h2>
              <p className="text-xs text-text-3 mb-6">询问市场情绪、个股分析、资金流向等问题</p>
              <div className="grid grid-cols-2 gap-2 max-w-[400px] mx-auto">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="px-3 py-2 text-[11px] text-text-2 bg-bg-1 border border-border-1 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentSession?.messages.map((message) => (
            <div key={message.id} className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
              {message.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-blue to-[#4F46E5] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <Card className={cn('max-w-[80%]', message.role === 'user' ? 'bg-brand-blue-light border-brand-blue' : '')} hover={false}>
                <CardBody className="py-2">
                  <div className={cn('text-xs leading-relaxed whitespace-pre-wrap', message.role === 'user' ? 'text-brand-blue' : 'text-text-1')}>
                    {message.content}
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="p-4">
        <div className="max-w-[800px] mx-auto flex gap-2 items-center">
          {/* History button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg text-text-3 hover:text-text-1 hover:bg-bg-2 transition-all"
            title="历史对话"
          >
            <History className="w-4 h-4" strokeWidth={1.8} />
          </button>

          {/* New chat button */}
          <button
            onClick={() => newSession()}
            className="p-2 rounded-lg text-text-3 hover:text-text-1 hover:bg-bg-2 transition-all"
            title="新建对话"
          >
            <Plus className="w-4 h-4" strokeWidth={1.8} />
          </button>

          {/* Input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="输入问题，按 Enter 发送..."
            className="flex-1 px-3 py-2 border border-border-1 rounded-lg text-xs bg-bg-1 text-text-1 outline-none placeholder:text-text-4 focus:border-brand-blue"
            disabled={isLoading}
          />

          {/* Send button */}
          <Button variant="primary" onClick={handleSend} disabled={!input.trim() || isLoading} className="px-4">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* History drawer */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setDrawerOpen(false)} />

          {/* Drawer */}
          <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-bg-1 border-r border-border-1 shadow-sl z-50 flex flex-col animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-1">
              <h3 className="text-sm font-semibold text-text-1">历史对话</h3>
              <button onClick={() => setDrawerOpen(false)} className="p-1 rounded-lg text-text-3 hover:text-text-1 hover:bg-bg-2 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sessions list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    setCurrentSession(session.id)
                    setDrawerOpen(false)
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg text-[11px] transition-colors hover:bg-bg-2',
                    currentSessionId === session.id ? 'bg-brand-blue-light text-brand-blue font-semibold border border-brand-blue' : 'text-text-2 border border-transparent'
                  )}
                >
                  <div className="truncate font-medium">{session.title}</div>
                  <div className="text-[9px] text-text-4 mt-1">
                    {new Date(session.updatedAt).toLocaleString('zh-CN', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </main>
  )
}
