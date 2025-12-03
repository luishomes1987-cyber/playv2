import type { Product } from "./types"

export const products: Product[] = [
  // Produtos
  {
    id: "prod-1",
    name: "Inscriçao Play",
    description: "Inscriçao para participar nos campeonatos pagos",
    price: 0,
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445546058435399710/Inscricao.png?ex=6930bd2d&is=692f6bad&hm=dc7a4a14a36b40c153798a6c0d33293b9b4a63e94df4a9dcf1c54aff10beade3&=&format=webp&quality=lossless",
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
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445546059345428580/Premium.png?ex=6930bd2d&is=692f6bad&hm=3ae216e004ce0cb5f171c575c673c1eb26f15929054240d8e744f1a0d7e4bbfd&=&format=webp&quality=lossless",
    category: "produtos",
    rarity: "lendario",
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Shop",
    description: "Adquira nosso Shop durante 30 dias",
    price: 3.00,
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445546059802611814/Shop.png?ex=6930bd2d&is=692f6bad&hm=23f2d9870488e2199d95f2915469ec4e128c1a00bf70c19a8be933bca8207167&=&format=webp&quality=lossless",
    category: "produtos",
    rarity: "epico",
    inStock: true,
    featured: true,
  },
  {
    id: "prod-3",
    name: "Mulher",
    description: "Adquira nosso personagem mulher durante 30 dias",
    price: 2.50,
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445546058779459817/Mulher.png?ex=6930bd2d&is=692f6bad&hm=5e75e31bb5d3bc06a2177bb90dc5dd6956348c486891c5cb790040d424e196ab&=&format=webp&quality=lossless",
    category: "produtos",
    rarity: "epico",
    inStock: true,
  },
    {
    id: "prod-5",
    name: "Tuning",
    description: "Adquira para tunar o seu carro",
    price: 4.50,
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445546057806381246/Tuning.png?ex=6930bd2d&is=692f6bad&hm=e56a2e54fccf66355ccb820cbc3b8b69a7d8b90fad89b97b27223f5fc112696d&=&format=webp&quality=lossless",
    category: "produtos",
    rarity: "epico",
    inStock: true,
  },
    {
    id: "prod-6",
    name: "Token Troca",
    description: "Adquira para trocar itens no inventário",
    price: 1.50,
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445546057508589771/Token.png?ex=6930bd2d&is=692f6bad&hm=f22be7fc17b7253e1c0f1d3d3eff5eab9e16ebb24cdde71024d6426c416d1188&=&format=webp&quality=lossless",
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
    image: "https://media.discordapp.net/attachments/1441918069114146886/1445550377364623410/prado_1.png?ex=6930c132&is=692f6fb2&hm=65131fff8f84fa17d55822c62500e1d07cc8aa5534c4101040aa80ab9b61c35a&=&format=webp&quality=lossless&width=519&height=930",
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
    image: "https://cdn.discordapp.com/attachments/1441918069114146886/1445498202915733576/Carro.png?ex=6930909b&is=692f3f1b&hm=e4de1b9ffd02659bff017d4c88fd612e748d298ac3029cb8a82547daf5287015&",
    category: "veiculos",
    rarity: "lendario",
    inStock: true,
    featured: true,
  },
]

export const getProductById = (id: string) => products.find((p) => p.id === id)
export const getProductsByCategory = (category: Product["category"]) => products.filter((p) => p.category === category)
export const getFeaturedProducts = () => products.filter((p) => p.featured)
