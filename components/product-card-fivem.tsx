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

  return (
    <Link href={`/produto/${product.id}`}>
      <div
        className={`group relative overflow-hidden rounded-xl bg-card border-2 ${
          product.rarity ? rarityColors[product.rarity] : "border-border"
        } hover:border-opacity-100 transition-all hover:shadow-xl ${product.rarity ? rarityGlow[product.rarity] : ""}`}
      >
        {/* Badge de Raridade */}
        {product.rarity && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-bold uppercase">
            {product.rarity}
          </div>
        )}

        <div className="relative aspect-square overflow-hidden bg-muted/50">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Informações */}
        <div className="p-4 space-y-3">
          <h3 className="font-display font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-display font-bold text-primary">Eur {product.price.toFixed(2)}</span>
            <Button size="sm" onClick={handlePurchase} className="glow-primary">
              <ExternalLink className="h-4 w-4 mr-1" />
              Adquirir
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
