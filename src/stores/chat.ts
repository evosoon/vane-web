import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

interface ChatStore {
  sessions: ChatSession[]
  currentSessionId: string | null
  addMessage: (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  newSession: () => string
  deleteSession: (sessionId: string) => void
  setCurrentSession: (sessionId: string) => void
  updateSessionTitle: (sessionId: string, title: string) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      addMessage: (sessionId, message) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [
                    ...session.messages,
                    {
                      ...message,
                      id: `${Date.now()}-${Math.random()}`,
                      timestamp: Date.now(),
                    },
                  ],
                  updatedAt: Date.now(),
                }
              : session
          ),
        })),
      newSession: () => {
        const id = `session-${Date.now()}`
        set((state) => ({
          sessions: [
            ...state.sessions,
            {
              id,
              title: '新对话',
              messages: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
          currentSessionId: id,
        }))
        return id
      },
      deleteSession: (sessionId) =>
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== sessionId)
          return {
            sessions: newSessions,
            currentSessionId:
              state.currentSessionId === sessionId
                ? newSessions[0]?.id || null
                : state.currentSessionId,
          }
        }),
      setCurrentSession: (sessionId) => set({ currentSessionId: sessionId }),
      updateSessionTitle: (sessionId, title) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId ? { ...session, title } : session
          ),
        })),
    }),
    {
      name: 'vane-chat',
    }
  )
)
