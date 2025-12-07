"use client"

import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, LogOut, Check, CheckCheck, RefreshCw, MessageCircle } from "lucide-react"
import { storage } from "@/lib/storage"

interface Message {
  id: string
  orderId: string
  sender: "user" | "admin"
  text: string
  timestamp: string
  isRead: boolean
}

interface Order {
  id: string
  userId: string
  username: string
  items: any[]
  totalPrice: number
  status: string
  createdAt: string
}

export default function AdminMensagensPage() {
  const router = useRouter()
  const { isAdmin, adminName, logout } = useAdmin()
  const [inputValue, setInputValue] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login")
    }
  }, [isAdmin, router])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Carregar pedidos
  const loadOrders = async () => {
    try {
      const result = await storage.list('order:')
      
      if (result && result.keys) {
        const orderPromises = result.keys.map(async (key) => {
          try {
            const orderData = await storage.get(key)
            if (orderData) {
              return JSON.parse(orderData.value)
            }
          } catch (err) {
            console.error(`Erro ao carregar pedido ${key}:`, err)
          }
          return null
        })
        
        const loadedOrders = (await Promise.all(orderPromises)).filter(Boolean) as Order[]
        setOrders(loadedOrders)
        
        // Selecionar primeiro pedido se nenhum estiver selecionado
        if (loadedOrders.length > 0 && !selectedOrderId) {
          setSelectedOrderId(loadedOrders[0].id)
        }
      }
    } catch (error) {
      console.log("Nenhum pedido encontrado")
    }
  }

  // Carregar mensagens
  const loadMessages = async () => {
    try {
      setRefreshing(true)
      const result = await storage.list('message:')
      
      if (result && result.keys) {
        const messagePromises = result.keys.map(async (key) => {
          try {
            const messageData = await storage.get(key)
            if (messageData) {
              return JSON.parse(messageData.value)
            }
          } catch (err) {
            console.error(`Erro ao carregar mensagem ${key}:`, err)
          }
          return null
        })
        
        const allMessages = (await Promise.all(messagePromises)).filter(Boolean) as Message[]
        
        // Ordenar por timestamp
        allMessages.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
        
        setMessages(allMessages)
      }
    } catch (error) {
      console.log("Nenhuma mensagem encontrada")
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadOrders()
    loadMessages()
  }, [])

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      loadMessages()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedOrderId) return

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      orderId: selectedOrderId,
      sender: "admin",
      text: inputValue,
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    try {
      await storage.set(`message:${newMessage.id}`, JSON.stringify(newMessage))
      
      // Marcar mensagens do usuário como lidas
      const userMessages = messages.filter(
        msg => msg.orderId === selectedOrderId && msg.sender === "user" && !msg.isRead
      )
      
      for (const msg of userMessages) {
        msg.isRead = true
        await storage.set(`message:${msg.id}`, JSON.stringify(msg))
      }
      
      setMessages(prev => [...prev, newMessage])
      setInputValue("")
      
      await loadMessages()
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const orderMessages = messages.filter((msg) => msg.orderId === selectedOrderId)
  
  // Obter pedidos únicos que têm mensagens
  const ordersWithMessages = orders.filter(order => 
    messages.some(msg => msg.orderId === order.id)
  )

  // Contar mensagens não lidas por pedido
  const getUnreadCount = (orderId: string) => {
    return messages.filter(
      msg => msg.orderId === orderId && msg.sender === "user" && !msg.isRead
    ).length
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Painel de Mensagens
            </h1>
            <p className="text-yellow-200/60 mt-1">Olá, {adminName}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                loadOrders()
                loadMessages()
              }}
              disabled={refreshing}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Lista de Pedidos */}
          <div className="md:col-span-1">
            <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="text-yellow-400">Pedidos</CardTitle>
                <CardDescription className="text-yellow-200/60">
                  {ordersWithMessages.length} com mensagens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {ordersWithMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-yellow-400/30 mx-auto mb-3" />
                    <p className="text-sm text-yellow-200/50">Nenhuma conversa ainda</p>
                  </div>
                ) : (
                  ordersWithMessages.map((order) => {
                    const lastMsg = messages
                      .filter((m) => m.orderId === order.id)
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
                    const unreadCount = getUnreadCount(order.id)
                    
                    return (
                      <button
                        key={order.id}
                        onClick={() => setSelectedOrderId(order.id)}
                        className={`w-full text-left p-3 rounded-lg transition ${
                          selectedOrderId === order.id
                            ? "bg-yellow-500/20 border border-yellow-500/50"
                            : "bg-slate-700/30 hover:bg-slate-700/50 border border-yellow-500/10"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-sm font-medium text-white truncate">
                            {order.username}
                          </p>
                          {unreadCount > 0 && (
                            <span className="inline-block px-2 py-0.5 bg-yellow-500 text-black text-xs rounded-full font-semibold ml-2">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-yellow-200/50 mb-1">
                          Pedido #{order.id.slice(-6)}
                        </p>
                        {lastMsg && (
                          <p className="text-xs text-yellow-200/40 truncate">
                            {lastMsg.text}
                          </p>
                        )}
                      </button>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat */}
          {selectedOrderId ? (
            <div className="md:col-span-3">
              <Card className="flex flex-col h-[600px] bg-slate-800/50 border-yellow-500/20 backdrop-blur">
                <CardHeader className="border-b border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-yellow-400">
                        {orders.find(o => o.id === selectedOrderId)?.username || 'Cliente'}
                      </CardTitle>
                      <CardDescription className="text-yellow-200/60">
                        Pedido #{selectedOrderId.slice(-8).toUpperCase()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {orderMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-yellow-200/50">
                      <p>Nenhuma mensagem nesta conversa</p>
                    </div>
                  ) : (
                    orderMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === "user"
                              ? "bg-slate-700/50 text-yellow-100 border border-yellow-500/20"
                              : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <p className="text-xs opacity-70">
                              {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {msg.sender === "admin" && (
                              <>
                                {msg.isRead ? (
                                  <CheckCheck className="h-3 w-3 text-yellow-300" />
                                ) : (
                                  <Check className="h-3 w-3 opacity-70" />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>
                <div className="border-t border-yellow-500/20 p-4 bg-slate-700/30">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 bg-slate-700/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="md:col-span-3">
              <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur h-[600px] flex items-center justify-center">
                <div className="text-center text-yellow-200/50">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Selecione um pedido para ver as mensagens</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
