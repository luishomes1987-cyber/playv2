"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { useDiscordAuth } from "@/lib/discord-auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, LogOut, RefreshCw } from "lucide-react"
import { storage } from "@/lib/storage"
import { getProductById } from "@/lib/products-data"
import type { Product } from "@/lib/types"

interface UserPurchase {
  id: string
  userId: string
  discordUsername: string
  productId: string
  productName: string
  status: "pending" | "approved" | "refused"
  createdAt: string
}

export default function PerfilPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, getAvatarUrl } = useDiscordAuth()
  const [inventory, setInventory] = useState<Product[]>([])
  const [purchases, setPurchases] = useState<UserPurchase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/loja")
    }
  }, [isAuthenticated, isLoading, router])

  const loadUserData = async () => {
    if (!user) return

    try {
      setLoading(true)
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

        const allPurchases = (await Promise.all(purchasePromises)).filter(Boolean) as UserPurchase[]

        // Filtrar apenas as compras deste usuário
        const userPurchases = allPurchases.filter((p) => p.userId === user.id)
        setPurchases(userPurchases)

        // Carregar inventário (produtos aprovados)
        const approvedProducts = userPurchases
          .filter((p) => p.status === "approved")
          .map((p) => getProductById(p.productId))
          .filter(Boolean) as Product[]

        setInventory(approvedProducts)
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-slate-900">
        <RefreshCw className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const rarityColors = {
    comum: "border-gray-500 bg-gray-500/10",
    raro: "border-blue-500 bg-blue-500/10",
    epico: "border-purple-500 bg-purple-500/10",
    lendario: "border-yellow-500 bg-yellow-500/10",
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-slate-900">
      <FiveMHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Perfil Header */}
        <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={getAvatarUrl(user) || "/placeholder.svg"}
                alt={user.username}
                className="w-24 h-24 rounded-full ring-4 ring-yellow-500/50"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                {user.email && <p className="text-yellow-200/60">{user.email}</p>}
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Package className="h-3 w-3 mr-1" />
                    {inventory.length} itens no inventário
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <ShoppingBag className="h-3 w-3 mr-1" />
                    {purchases.length} compras
                  </Badge>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-yellow-500/20">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Seu Inventário
            </TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Compras Realizadas
            </TabsTrigger>
          </TabsList>

          {/* Inventário */}
          <TabsContent value="inventory">
            <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-yellow-400">Seu Inventário</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadUserData}
                  disabled={loading}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Atualizar
                </Button>
              </CardHeader>
              <CardContent>
                {inventory.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-yellow-500/30 mx-auto mb-4" />
                    <p className="text-yellow-200/60 text-lg">Seu inventário está vazio</p>
                    <p className="text-yellow-200/40 text-sm mt-2">
                      Compre produtos na loja para recebê-los aqui após aprovação
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {inventory.map((product, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        className={`rounded-xl border-2 p-4 ${product.rarity ? rarityColors[product.rarity] : "border-gray-500"}`}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-slate-700/50">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-white truncate">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          {product.rarity && <Badge className="text-xs capitalize">{product.rarity}</Badge>}
                          <Badge variant="outline" className="text-xs capitalize">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compras */}
          <TabsContent value="purchases">
            <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-yellow-400">Compras Realizadas</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadUserData}
                  disabled={loading}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Atualizar
                </Button>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-yellow-500/30 mx-auto mb-4" />
                    <p className="text-yellow-200/60 text-lg">Nenhuma compra realizada</p>
                    <p className="text-yellow-200/40 text-sm mt-2">Visite a loja para fazer sua primeira compra</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-yellow-500/10"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{purchase.productName}</h4>
                          <p className="text-sm text-yellow-200/50">
                            {new Date(purchase.createdAt).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
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
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <FiveMFooter />
    </div>
  )
}
