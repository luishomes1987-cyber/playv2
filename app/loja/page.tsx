"use client"

import { useState } from "react"
import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card-fivem"
import { products as baseProducts } from "@/lib/products-data"
import { useProductDiscounts } from "@/lib/use-product-discounts"
import { Package, Box, Shirt, Car, Flame, PocketKnife as Knife, Target, Zap, Search, TrendingUp, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "all", label: "Todos", icon: Package },
  { id: "produtos", label: "Produtos", icon: Package },
  { id: "caixas", label: "Caixas", icon: Box },
  { id: "skins", label: "Skins", icon: Shirt },
  { id: "veiculos", label: "Veículos", icon: Car },
]

const skinSubcategories = [
  { id: "todas", label: "Todas as Skins" },
  { id: "g3", label: "G3", icon: Flame },
  { id: "facas", label: "Facas", icon: Knife },
  { id: "mtar", label: "Mtar", icon: Target },
  { id: "pistolas", label: "Pistolas", icon: Zap },
]

export default function LojaPage() {
  const products = useProductDiscounts(baseProducts)
  const [activeTab, setActiveTab] = useState("all")
  const [skinSubcategory, setSkinSubcategory] = useState("todas")
  const [searchTerm, setSearchTerm] = useState("")

  const getProducts = (category: string) => {
    let filtered = category === "all" ? products : products.filter((p) => p.category === category)

    if (category === "skins" && skinSubcategory !== "todas") {
      filtered = filtered.filter((p) => p.subcategory === skinSubcategory)
    }

    if (searchTerm) {
      filtered = filtered.filter((p) => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const currentProducts = getProducts(activeTab)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-slate-950 to-black">
      <FiveMHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        
        <section className="py-24 relative z-10 overflow-hidden">
          {/* Animated spotlight effects */}
          <div className="absolute inset-0">
            <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse-scale" style={{ left: '20%', top: '10%' }} />
            <div className="absolute w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[100px] animate-pulse-scale" style={{ right: '20%', bottom: '20%', animationDelay: '1s' }} />
            
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-yellow-500/5 blur-3xl"
                style={{
                  width: Math.random() * 250 + 100 + 'px',
                  height: Math.random() * 250 + 100 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `float ${Math.random() * 12 + 6}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center space-x-2 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/15 to-yellow-600/10 border border-yellow-500/30 backdrop-blur-md shadow-lg shadow-yellow-500/20 animate-fade-in-up group hover:scale-105 transition-transform duration-300">
              <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse" />
              <Package className="h-5 w-5 text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-yellow-400 font-bold uppercase tracking-widest text-sm">Loja Oficial Play Cup</span>
              <Star className="h-4 w-4 text-yellow-400 animate-bounce-slow" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_40px_rgba(250,204,21,0.4)] animate-fade-in-up" style={{ backgroundSize: '200% auto', animationDelay: '0.1s' }}>
              Loja Premium
            </h1>
            
            <p className="text-xl md:text-2xl text-yellow-200/80 max-w-4xl mx-auto leading-relaxed drop-shadow-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Explore nossa coleção exclusiva de itens, skins raras, veículos de luxo e muito mais
            </p>
            
            <div className="flex items-center gap-6 justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm border-0 shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
                <TrendingUp className="h-4 w-4 mr-2" />
                {products.length}+ Produtos
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 text-sm border-0 shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform">
                <Star className="h-4 w-4 mr-2" />
                Itens Exclusivos
              </Badge>
            </div>
          </div>
        </section>

        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value)
                if (value === "skins") setSkinSubcategory("todas")
                setSearchTerm("")
              }}
              className="space-y-12"
            >
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto animate-fade-in-up">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-30 blur group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative flex items-center">
                    <Search className="absolute left-5 h-5 w-5 text-yellow-400 z-10" />
                    <Input
                      type="text"
                      placeholder="Buscar produtos, skins, veículos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-14 pl-14 pr-6 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-yellow-500/30 text-white placeholder:text-yellow-200/40 focus:border-yellow-500 transition-all duration-300 rounded-2xl text-lg backdrop-blur-xl shadow-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Categories Tabs */}
              <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
                <TabsList className="relative w-full justify-start overflow-x-auto h-auto p-3 bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-yellow-500/40 backdrop-blur-xl rounded-2xl shadow-2xl">
                  {categories.map((category, index) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      className="relative flex items-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-yellow-500/60 hover:bg-yellow-500/10 hover:scale-105 animate-scale-in overflow-hidden group/tab"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/tab:opacity-100 group-hover/tab:animate-shimmer transition-opacity" style={{ backgroundSize: '200% 100%' }} />
                      <category.icon className="h-6 w-6 relative z-10 group-hover/tab:rotate-12 transition-transform duration-300" />
                      <span className="font-display font-bold text-base relative z-10">{category.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {activeTab === "skins" && (
                <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
                  {skinSubcategories.map((sub, index) => (
                    <button
                      key={sub.id}
                      onClick={() => setSkinSubcategory(sub.id)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      className={`group relative flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden animate-scale-in ${
                        skinSubcategory === sub.id
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-2xl shadow-yellow-500/60 scale-110"
                          : "bg-gradient-to-br from-slate-800/80 to-slate-700/80 text-yellow-400 hover:bg-slate-800 border-2 border-yellow-500/30 hover:border-yellow-500/60 hover:scale-110 shadow-xl"
                      }`}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                      
                      {/* Glow on active */}
                      {skinSubcategory === sub.id && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl opacity-50 blur-lg" />
                      )}
                      
                      {sub.icon && <sub.icon className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />}
                      <span className="relative z-10 text-base">{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-10">
                  {/* Stats Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/80 to-slate-800/80 border-2 border-yellow-500/20 backdrop-blur-xl shadow-xl animate-fade-in-up">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/40">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-yellow-400/90 font-bold text-lg">
                          {currentProducts.length} {currentProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
                        </p>
                        {searchTerm && (
                          <p className="text-yellow-400/60 text-sm">Busca: "{searchTerm}"</p>
                        )}
                      </div>
                    </div>
                    
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 hover:scale-105 font-semibold text-sm"
                      >
                        Limpar Busca
                      </button>
                    )}
                  </div>

                  {currentProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                      {currentProducts.map((product, index) => (
                        <div 
                          key={product.id}
                          style={{ animationDelay: `${index * 0.03}s` }}
                          className="animate-scale-in"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-32 animate-fade-in-up">
                      <div className="inline-flex flex-col items-center gap-6 max-w-md mx-auto">
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl" />
                          <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 flex items-center justify-center border-2 border-yellow-500/30">
                            <Package className="h-16 w-16 text-yellow-500/60" />
                          </div>
                        </div>
                        <div>
                          <p className="text-2xl font-display font-bold text-yellow-200/80 mb-2">
                            Nenhum produto encontrado
                          </p>
                          <p className="text-yellow-200/50">
                            {searchTerm 
                              ? `Não encontramos produtos com "${searchTerm}". Tente outra busca.`
                              : "Nenhum produto disponível nesta categoria no momento."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>

      <FiveMFooter />
    </div>
  )
}
