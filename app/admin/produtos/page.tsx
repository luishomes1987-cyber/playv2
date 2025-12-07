"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Package, Percent, Save, X, CreditCard, Bell } from "lucide-react"
import { products as allProducts } from "@/lib/products-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ProductDiscount {
  productId: string
  discount: number
}

export default function AdminProdutosPage() {
  const router = useRouter()
  const { isAdmin, adminName, logout } = useAdmin()
  const [discounts, setDiscounts] = useState<Record<string, number>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login")
    } else {
      loadDiscounts()
    }
  }, [isAdmin, router])

  const loadDiscounts = () => {
    const saved = localStorage.getItem("product_discounts")
    if (saved) {
      setDiscounts(JSON.parse(saved))
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const handleEdit = (productId: string, currentDiscount: number) => {
    setEditingId(productId)
    setEditValue(currentDiscount.toString())
  }

  const handleSave = (productId: string) => {
    const value = parseFloat(editValue) || 0
    if (value < 0 || value > 100) {
      alert("O desconto deve estar entre 0% e 100%")
      return
    }

    const newDiscounts = { ...discounts }
    if (value === 0) {
      delete newDiscounts[productId]
    } else {
      newDiscounts[productId] = value
    }

    setDiscounts(newDiscounts)
    localStorage.setItem("product_discounts", JSON.stringify(newDiscounts))
    setEditingId(null)
    setEditValue("")
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleRemoveDiscount = (productId: string) => {
    const newDiscounts = { ...discounts }
    delete newDiscounts[productId]
    setDiscounts(newDiscounts)
    localStorage.setItem("product_discounts", JSON.stringify(newDiscounts))
  }

  if (!isAdmin) return null

  const productsWithDiscounts = allProducts.map(p => ({
    ...p,
    discount: discounts[p.id] || 0
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent animate-pulse-scale" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.3)] animate-gradient" style={{ backgroundSize: '200% auto' }}>
              Gerenciar Produtos
            </h1>
            <p className="text-yellow-200/70 mt-2 text-lg">Olá, <span className="font-semibold text-yellow-400">{adminName}</span></p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent hover:border-red-500 transition-all duration-300 hover:scale-105"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="flex gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Link href="/admin">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <Bell className="h-4 w-4 mr-2" />
              Updates
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105">
            <Package className="h-4 w-4 mr-2" />
            Produtos
          </Button>
          <Link href="/admin/pagamentos">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pagamentos
            </Button>
          </Link>
        </div>

        <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-yellow-500/30 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent" />
          
          <CardHeader className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                  <Percent className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display font-bold text-white mb-1">
                    Descontos dos Produtos
                  </CardTitle>
                  <p className="text-yellow-400/70">Configure descontos para cada produto individualmente</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 border-0 shadow-lg">
                {Object.keys(discounts).length} produtos com desconto
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsWithDiscounts.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 0.02}s` }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-1 animate-scale-in overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-700/50 flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-white mb-1 truncate group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-yellow-400/70 mb-3">
                        {product.price.toFixed(2)} Eur
                      </p>

                      {editingId === product.id ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="0"
                              className="flex-1 bg-slate-700/70 border-yellow-500/30 text-white h-10"
                            />
                            <span className="text-yellow-400 font-bold">%</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSave(product.id)}
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-9"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Salvar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 h-9"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          {product.discount > 0 ? (
                            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg px-3 py-1">
                              -{product.discount}% OFF
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-700/50 text-yellow-400/60 border border-yellow-500/20 px-3 py-1">
                              Sem desconto
                            </Badge>
                          )}
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleEdit(product.id, product.discount)}
                              className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 h-8 px-3"
                            >
                              <Percent className="h-4 w-4" />
                            </Button>
                            {product.discount > 0 && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveDiscount(product.id)}
                                className="text-red-400 hover:bg-red-500/10 h-8 px-3"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
