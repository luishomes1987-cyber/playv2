"use client"

import { useEffect, useState } from "react"
import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, CheckCircle, XCircle, Clock, RefreshCw, Plus, Search, Bell, CreditCard } from "lucide-react"
import { storage } from "@/lib/storage"
import { products } from "@/lib/products-data"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Purchase {
  id: string
  userId: string
  discordUsername: string
  productId: string
  productName: string
  status: "pending" | "approved" | "refused"
  createdAt: string
}

export default function AdminPagamentosPage() {
  const router = useRouter()
  const { isAdmin, adminName, logout } = useAdmin()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Form state for new purchase
  const [newDiscordUser, setNewDiscordUser] = useState("")
  const [newDiscordId, setNewDiscordId] = useState("")
  const [selectedProductId, setSelectedProductId] = useState("")

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login")
    }
  }, [isAdmin, router])

  const loadPurchases = async () => {
    try {
      setRefreshing(true)
      const result = await storage.list("purchase:")

      if (result && result.keys) {
        const purchasePromises = result.keys.map(async (key) => {
          try {
            const data = await storage.get(key)
            if (data) {
              return JSON.parse(data.value)
            }
          } catch (err) {
            console.error(`Erro ao carregar compra ${key}:`, err)
          }
          return null
        })

        const loadedPurchases = (await Promise.all(purchasePromises)).filter(Boolean) as Purchase[]

        // Ordenar por data (mais recentes primeiro)
        loadedPurchases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        setPurchases(loadedPurchases)
      } else {
        setPurchases([])
      }
    } catch (error) {
      console.log("Nenhuma compra encontrada")
      setPurchases([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadPurchases()
  }, [])

  const handleCreatePurchase = async () => {
    if (!newDiscordUser || !newDiscordId || !selectedProductId) {
      alert("Preencha todos os campos!")
      return
    }

    const product = products.find((p) => p.id === selectedProductId)
    if (!product) return

    const newPurchase: Purchase = {
      id: `purchase_${Date.now()}`,
      userId: newDiscordId,
      discordUsername: newDiscordUser,
      productId: product.id,
      productName: product.name,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    try {
      await storage.set(`purchase:${newPurchase.id}`, JSON.stringify(newPurchase))
      await loadPurchases()
      setDialogOpen(false)
      setNewDiscordUser("")
      setNewDiscordId("")
      setSelectedProductId("")
    } catch (error) {
      console.error("Erro ao criar compra:", error)
      alert("Erro ao criar compra. Tente novamente.")
    }
  }

  const handleApprove = async (purchaseId: string) => {
    try {
      const data = await storage.get(`purchase:${purchaseId}`)
      if (data) {
        const purchase = JSON.parse(data.value)
        purchase.status = "approved"
        await storage.set(`purchase:${purchaseId}`, JSON.stringify(purchase))
        await loadPurchases()
      }
    } catch (error) {
      console.error("Erro ao aprovar:", error)
    }
  }

  const handleRefuse = async (purchaseId: string) => {
    try {
      const data = await storage.get(`purchase:${purchaseId}`)
      if (data) {
        const purchase = JSON.parse(data.value)
        purchase.status = "refused"
        await storage.set(`purchase:${purchaseId}`, JSON.stringify(purchase))
        await loadPurchases()
      }
    } catch (error) {
      console.error("Erro ao recusar:", error)
    }
  }

  const handleDelete = async (purchaseId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta compra?")) return

    try {
      await storage.delete(`purchase:${purchaseId}`)
      await loadPurchases()
    } catch (error) {
      console.error("Erro ao excluir:", error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (!isAdmin) return null

  const filteredPurchases = purchases.filter(
    (p) =>
      p.discordUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingCount = purchases.filter((p) => p.status === "pending").length
  const approvedCount = purchases.filter((p) => p.status === "approved").length
  const refusedCount = purchases.filter((p) => p.status === "refused").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Gerenciamento de Pagamentos
            </h1>
            <p className="text-yellow-200/60 mt-1">Olá, {adminName}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={loadPurchases}
              disabled={refreshing}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
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

        <div className="flex gap-2 mb-8">
          <Link href="/admin">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <Bell className="h-4 w-4 mr-2" />
              Updates
            </Button>
          </Link>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamentos
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200/60 text-sm">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200/60 text-sm">Aprovados</p>
                  <p className="text-3xl font-bold text-green-400">{approvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200/60 text-sm">Recusados</p>
                  <p className="text-3xl font-bold text-red-400">{refusedCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-200/50" />
            <Input
              placeholder="Pesquisar por usuário ou produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
            />
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nova Compra
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-yellow-500/20">
              <DialogHeader>
                <DialogTitle className="text-yellow-400">Registrar Nova Compra</DialogTitle>
                <DialogDescription className="text-yellow-200/60">
                  Adicione uma compra para um usuário do Discord
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm text-yellow-200">Discord User</label>
                  <Input
                    placeholder="Nome do usuário Discord"
                    value={newDiscordUser}
                    onChange={(e) => setNewDiscordUser(e.target.value)}
                    className="bg-slate-800/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-yellow-200">Discord ID</label>
                  <Input
                    placeholder="ID do usuário Discord"
                    value={newDiscordId}
                    onChange={(e) => setNewDiscordId(e.target.value)}
                    className="bg-slate-800/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-yellow-200">Produto</label>
                  <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                    <SelectTrigger className="bg-slate-800/50 border-yellow-500/20 text-white">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-yellow-500/20">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id} className="text-white hover:bg-yellow-500/10">
                          {product.name} - R$ {product.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreatePurchase}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
                >
                  Criar Compra
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Purchases List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 animate-spin text-yellow-400 mx-auto mb-4" />
              <p className="text-yellow-200/70">Carregando pagamentos...</p>
            </div>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardContent className="p-12 text-center">
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4 opacity-50" />
              <p className="text-yellow-200/60">Nenhuma compra encontrada</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id} className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            purchase.status === "approved"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : purchase.status === "refused"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {purchase.status === "approved"
                            ? "Aprovado"
                            : purchase.status === "refused"
                              ? "Recusado"
                              : "Pendente"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-yellow-200/50">Discord User: </span>
                          <span className="text-white font-medium">{purchase.discordUsername}</span>
                        </div>
                        <div>
                          <span className="text-yellow-200/50">Produto: </span>
                          <span className="text-white font-medium">{purchase.productName}</span>
                        </div>
                        <div>
                          <span className="text-yellow-200/50">Data: </span>
                          <span className="text-white">{new Date(purchase.createdAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div>
                          <span className="text-yellow-200/50">ID: </span>
                          <span className="text-white font-mono text-xs">{purchase.userId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {purchase.status === "pending" && (
                        <>
                          <Button
                            onClick={() => handleApprove(purchase.id)}
                            size="sm"
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            onClick={() => handleRefuse(purchase.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Recusar
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={() => handleDelete(purchase.id)}
                        size="sm"
                        variant="outline"
                        className="border-slate-500/30 text-slate-400 hover:bg-slate-500/10 bg-transparent"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
