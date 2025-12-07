"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface CartNotificationProps {
  show: boolean
  productName: string
}

export function CartNotification({ show, productName }: CartNotificationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
      <div className="flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg max-w-sm">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <div className="text-sm">
          <p className="font-medium">{productName}</p>
          <p className="text-primary-foreground/90">foi adicionado ao carrinho</p>
        </div>
      </div>
    </div>
  )
}
