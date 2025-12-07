"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface ChatMessage {
  id: string
  sender: "user" | "admin"
  text: string
  timestamp: Date
  isRead: boolean
  orderId: string
}

export interface AdminContextType {
  isAdmin: boolean
  adminName: string | null
  messages: ChatMessage[]
  login: (username: string, password: string) => boolean
  logout: () => void
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void
  markAsRead: (messageId: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminName, setAdminName] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin_user")
    const storedMessages = localStorage.getItem("admin_messages")
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin)
      setIsAdmin(true)
      setAdminName(admin.username)
    }
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages)
      const messagesWithDates = parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))
      setMessages(messagesWithDates)
    }
  }, [])

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const storedMessages = localStorage.getItem("admin_messages")
        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages)
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
          setMessages(messagesWithDates)
        }
      } catch (error) {
        console.error("Error polling messages:", error)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(pollInterval)
  }, [])

  const login = (username: string, password: string) => {
    // Credenciais padrão para demo
    if (username === "admin" && password === "admin123") {
      const admin = { username, loginTime: new Date().toISOString() }
      localStorage.setItem("admin_user", JSON.stringify(admin))
      setIsAdmin(true)
      setAdminName(username)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_user")
    setIsAdmin(false)
    setAdminName(null)
  }

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    const messagesToStore = updatedMessages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }))
    localStorage.setItem("admin_messages", JSON.stringify(messagesToStore))
  }

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg))
    setMessages(updatedMessages)
    const messagesToStore = updatedMessages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }))
    localStorage.setItem("admin_messages", JSON.stringify(messagesToStore))
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminName,
        messages,
        login,
        logout,
        addMessage,
        markAsRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
