"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

const DISCORD_PURCHASE_LINK = "https://discord.gg/playcup"

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleBuy = () => {
    window.open(DISCORD_PURCHASE_LINK, "_blank")
  }

  return (
    <Button size="lg" className="w-full text-base" onClick={handleBuy}>
      <ExternalLink className="h-5 w-5 mr-2" />
      Comprar via Discord
    </Button>
  )
}
