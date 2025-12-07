"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

const rarityColors = {
  comum: "border-gray-500",
  raro: "border-blue-500",
  epico: "border-purple-500",
  lendario: "border-yellow-500",
  mitica: "border-pink-500",
}

const rarityGlow = {
  comum: "hover:shadow-gray-500/20",
  raro: "hover:shadow-blue-500/20",
  epico: "hover:shadow-purple-500/20",
  lendario: "hover:shadow-yellow-500/20",
  mitica: "hover:shadow-pink-500/20",
}

const DISCORD_PURCHASE_URL = "https://discord.gg/dzMfnd8x6k"

export function ProductCard({ product }: ProductCardProps) {
  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(DISCORD_PURCHASE_URL, "_blank")
  }

  const hasDiscount = product.discount && product.discount > 0
  const discountedPrice = hasDiscount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <Link href={`/produto/${product.id}`}>
      <div
        className={`group relative overflow-hidden rounded-2xl bg-card border-2 ${
          product.rarity ? rarityColors[product.rarity] : "border-border"
        } hover:border-opacity-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${product.rarity ? rarityGlow[product.rarity] : ""}`}
      >
        {/* Outer glow effect */}
        <div className={`absolute -inset-0.5 ${
          product.rarity === "lendario" ? "bg-gradient-to-r from-yellow-500 to-yellow-600" :
          product.rarity === "epico" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
          product.rarity === "raro" ? "bg-gradient-to-r from-blue-500 to-blue-600" :
          "bg-gradient-to-r from-gray-500 to-gray-600"
        } rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
        
        {/* Discount Badge - Top Right */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-black text-sm shadow-xl shadow-red-500/50 animate-pulse border-2 border-white/20">
            -{product.discount}%
          </div>
        )}
        
        {/* Badge de Raridade - Top Left */}
        {product.rarity && (
          <div className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full bg-background/95 backdrop-blur-md text-xs font-bold uppercase shadow-lg border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
            {product.rarity}
          </div>
        )}

        <div className="relative aspect-square overflow-hidden bg-muted/50">
          {/* Shimmer effect */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-115 transition-transform duration-700"
          />
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        </div>

        {/* Informações */}
        <div className="relative p-6 space-y-4 bg-gradient-to-b from-transparent to-background/50">
          <h3 className="font-display font-semibold text-xl line-clamp-1 group-hover:text-yellow-400 transition-colors duration-300">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{product.description}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col gap-1">
              {hasDiscount ? (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.price.toFixed(2)} Eur
                  </span>
                  <span className="text-2xl font-display font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-gradient drop-shadow-lg" style={{ backgroundSize: '200% auto' }}>
                    {discountedPrice.toFixed(2)} Eur
                  </span>
                </>
              ) : (
                <span className="text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-gradient drop-shadow-lg" style={{ backgroundSize: '200% auto' }}>
                  {product.price.toFixed(2)} Eur
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={handlePurchase} 
              className="relative glow-primary bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100" style={{ backgroundSize: '200% 100%' }} />
              <ExternalLink className="h-4 w-4 mr-1 relative z-10" />
              <span className="relative z-10">Adquirir</span>
            </Button>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      </div>
    </Link>
  )
}
