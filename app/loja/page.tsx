"use client"

import { useState } from "react"
import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card-fivem"
import { products } from "@/lib/products-data"
import { Package, Box, Shirt, Car, Flame, PocketKnife as Knife, Target, Zap } from "lucide-react"

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
  const [activeTab, setActiveTab] = useState("all")
  const [skinSubcategory, setSkinSubcategory] = useState("todas")

  const getProducts = (category: string) => {
    if (category === "all") return products

    if (category === "skins" && skinSubcategory !== "todas") {
      return products.filter((p) => p.category === category && p.subcategory === skinSubcategory)
    }

    return products.filter((p) => p.category === category)
  }

  const currentProducts = getProducts(activeTab)

  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-card/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Loja do Servidor
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Adquira itens exclusivos, veículos premium e muito mais para melhorar sua experiência no servidor
            </p>
          </div>
        </section>

        {/* Tabs e Produtos */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value)
                if (value === "skins") setSkinSubcategory("todas")
              }}
              className="space-y-8"
            >
              {/* Tab List */}
              <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-card/50 border border-border">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center space-x-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="font-display font-semibold">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {activeTab === "skins" && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {skinSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSkinSubcategory(sub.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                        skinSubcategory === sub.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card/50 text-muted-foreground hover:bg-card border border-border"
                      }`}
                    >
                      {sub.icon && <sub.icon className="h-4 w-4" />}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Tab Content */}
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      {currentProducts.length} {currentProducts.length === 1 ? "item" : "itens"} encontrado
                      {currentProducts.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  {currentProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-xl text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
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
