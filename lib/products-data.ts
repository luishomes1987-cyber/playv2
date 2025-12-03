import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Inscriçao Play",
    description: "Inscriçao para participar nos campeonatos pagos",
    price: 0,
    image: "/images/Inscricao.png",
    category: "produtos",
    rarity: "lendario",
    inStock: true,
    featured: true,
  },
  {
    id: "prod-2",
    name: "Play Premium",
    description: "Adquira nosso Play Premium durante 30 dias",
    price: 10.00,
    image: "/images/Premium.png",
    category: "produtos",
    rarity: "lendario",
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Shop",
    description: "Adquira nosso Shop durante 30 dias",
    price: 3.00,
    image: "/images/Shop.png",
    category: "produtos",
    rarity: "epico",
    inStock: true,
    featured: true,
  },
  {
    id: "prod-4",
    name: "Mulher",
    description: "Adquira nosso personagem mulher durante 30 dias",
    price: 2.50,
    image: "/images/Mulher.png",
    category: "produtos",
    rarity: "epico",
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Tuning",
    description: "Adquira para tunar o seu carro",
    price: 4.50,
    image: "/images/Tuning.png",
    category: "produtos",
    rarity: "epico",
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Token Troca",
    description: "Adquira para trocar itens no inventário",
    price: 1.50,
    image: "/images/Token.png",
    category: "produtos",
    rarity: "lendario",
    inStock: true,
  },

  // Caixas
  {
    id: "box-1",
    name: "Caixa Play Cup",
    description: "Caixa com todas as nossas Skins do Servidor",
    price: 5.00,
    image: "/images/box.png",
    category: "caixas",
    rarity: "lendario",
    inStock: true,
  },

  // Veículos
  {
    id: "vei-1",
    name: "Kuruma Personalizado",
    description: "Kuruma Personalziado com a Logotipo da sua Tropa e do seu jeito",
    price: 15,
    image: "/images/Carro.png",
    category: "veiculos",
    rarity: "lendario",
    inStock: true,
    featured: true,
  },
]

export const getProductById = (id: string) => products.find((p) => p.id === id)
export const getProductsByCategory = (category: Product["category"]) => products.filter((p) => p.category === category)
export const getFeaturedProducts = () => products.filter((p) => p.featured)
