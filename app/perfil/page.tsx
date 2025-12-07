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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent animate-pulse-scale" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full border-4 border-yellow-500/20 border-t-yellow-500 animate-spin" />
          <p className="text-yellow-400 font-semibold text-lg">Carregando perfil...</p>
        </div>
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
    mitica: "border-pink-500 bg-pink-500/10",
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-slate-950 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500/5 blur-3xl"
            style={{
              width: Math.random() * 200 + 100 + 'px',
              height: Math.random() * 200 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 15 + 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <FiveMHeader />

      <main className="flex-1 container mx-auto px-4 py-12 relative z-10">
        <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl shadow-yellow-500/10 mb-10 overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent" />
          
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={getAvatarUrl(user) || "/placeholder.svg"}
                  alt={user.username}
                  className="relative w-28 h-28 rounded-full ring-4 ring-yellow-500/50 group-hover:ring-yellow-500 transition-all duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-3 animate-gradient" style={{ backgroundSize: '200% auto' }}>
                  {user.username}
                </h1>
                {user.email && (
                  <p className="text-yellow-200/70 mb-4 text-lg">{user.email}</p>
                )}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg shadow-yellow-500/30 px-4 py-2 text-sm hover:scale-105 transition-transform">
                    <Package className="h-4 w-4 mr-2" />
                    {inventory.length} itens no inventário
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/30 px-4 py-2 text-sm hover:scale-105 transition-transform">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {purchases.length} compras
                  </Badge>
                </div>
              </div>
              
              <Button
                onClick={logout}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/20 bg-transparent hover:border-red-500 transition-all duration-300 hover:scale-105 h-12 px-6"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="inventory" className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <TabsList className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-yellow-500/30 p-2 h-auto backdrop-blur-xl rounded-2xl">
            <TabsTrigger 
              value="inventory" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 px-6 py-3 rounded-xl transition-all duration-300 hover:bg-yellow-500/10"
            >
              <Package className="h-5 w-5 mr-2" />
              Seu Inventário
            </TabsTrigger>
            <TabsTrigger 
              value="purchases" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 px-6 py-3 rounded-xl transition-all duration-300 hover:bg-yellow-500/10"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Compras Realizadas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory">
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent" />
              
              <CardHeader className="flex flex-row items-center justify-between p-8 relative z-10">
                <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Seu Inventário
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadUserData}
                  disabled={loading}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105 h-10 px-4"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Atualizar
                </Button>
              </CardHeader>
              
              <CardContent className="p-8 relative z-10">
                {inventory.length === 0 ? (
                  <div className="text-center py-20 animate-fade-in-up">
                    <div className="inline-flex flex-col items-center gap-4">
                      <div className="h-32 w-32 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Package className="h-16 w-16 text-yellow-500/50" />
                      </div>
                      <p className="text-yellow-200/70 text-xl font-semibold">Seu inventário está vazio</p>
                      <p className="text-yellow-200/50 text-sm max-w-md">
                        Compre produtos na loja para recebê-los aqui após aprovação
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {inventory.map((product, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        className={`group relative rounded-2xl border-2 p-5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scale-in overflow-hidden ${product.rarity ? rarityColors[product.rarity] : "border-gray-500 bg-gray-500/10"}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-700/50 group-hover:scale-105 transition-transform duration-500">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <h3 className="font-display font-bold text-white truncate mb-3 text-lg group-hover:text-yellow-400 transition-colors duration-300">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          {product.rarity && (
                            <Badge className="text-xs capitalize font-semibold bg-white/10 backdrop-blur-sm">
                              {product.rarity}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs capitalize border-yellow-500/30">
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

          <TabsContent value="purchases">
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent" />
              
              <CardHeader className="flex flex-row items-center justify-between p-8 relative z-10">
                <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Compras Realizadas
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={loadUserData}
                  disabled={loading}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105 h-10 px-4"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Atualizar
                </Button>
              </CardHeader>
              
              <CardContent className="p-8 relative z-10">
                {purchases.length === 0 ? (
                  <div className="text-center py-20 animate-fade-in-up">
                    <div className="inline-flex flex-col items-center gap-4">
                      <div className="h-32 w-32 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <ShoppingBag className="h-16 w-16 text-yellow-500/50" />
                      </div>
                      <p className="text-yellow-200/70 text-xl font-semibold">Nenhuma compra realizada</p>
                      <p className="text-yellow-200/50 text-sm">Visite a loja para fazer sua primeira compra</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {purchases.map((purchase, index) => (
                      <div
                        key={purchase.id}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-1 animate-fade-in-up"
                      >
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-white text-lg mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                            {purchase.productName}
                          </h4>
                          <p className="text-sm text-yellow-200/60 font-medium">
                            📅 {new Date(purchase.createdAt).toLocaleDateString("pt-BR", {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <Badge
                          className={`px-4 py-2 text-sm font-bold ${
                            purchase.status === "approved"
                              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                              : purchase.status === "refused"
                                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/30"
                          }`}
                        >
                          {purchase.status === "approved"
                            ? "✓ Aprovado"
                            : purchase.status === "refused"
                              ? "✗ Recusado"
                              : "⏳ Pendente"}
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
