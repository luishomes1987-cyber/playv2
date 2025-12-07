export interface User {
  id: string
  discordId: string
  username: string
  avatar: string
  email?: string
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: "produtos" | "caixas" | "skins" | "veiculos"
  subcategory?: "g3" | "facas" | "mtar" | "pistolas"
  rarity?: "comum" | "raro" | "epico" | "lendario" | "mitica"
  inStock: boolean
  featured?: boolean
}

export interface Order {
  id: string
  userId: string
  items: { productId: string; quantity: number }[]
  total: number
  status: "pendente" | "pago" | "entregue" | "cancelado"
  message?: string
  createdAt: Date
  updatedAt: Date
}

export interface Purchase {
  id: string
  userId: string
  discordUsername: string
  productId: string
  productName: string
  status: "pending" | "approved" | "refused"
  createdAt: string
}

export interface Update {
  id: string
  title: string
  description: string
  date: Date
  category: "patch" | "evento" | "manutencao" | "novidade"
}
