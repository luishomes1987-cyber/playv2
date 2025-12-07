"use client"

import { useState, useEffect } from "react"
import { Product } from "./types"

export function useProductDiscounts(baseProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(baseProducts)

  useEffect(() => {
    const loadDiscounts = () => {
      if (typeof window === "undefined") return

      const saved = localStorage.getItem("product_discounts")
      if (saved) {
        try {
          const discounts = JSON.parse(saved) as Record<string, number>
          
          const updatedProducts = baseProducts.map(product => ({
            ...product,
            discount: discounts[product.id] || 0,
          }))
          
          setProducts(updatedProducts)
        } catch (error) {
          console.error("Error loading discounts:", error)
          setProducts(baseProducts)
        }
      } else {
        setProducts(baseProducts)
      }
    }

    loadDiscounts()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "product_discounts") {
        loadDiscounts()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    
    const interval = setInterval(loadDiscounts, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [baseProducts])

  return products
}
