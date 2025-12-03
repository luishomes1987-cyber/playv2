import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card-fivem"
import { ArrowRight } from "lucide-react"

export function FeaturedProductsSection() {
  const featuredProducts = getFeaturedProducts()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2">Destaques da Loja</h2>
            <p className="text-muted-foreground">Confira os itens mais populares e ofertas especiais</p>
          </div>
          <Link href="/loja">
            <Button variant="outline" className="hidden sm:flex bg-transparent">
              Ver Tudo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/loja">
            <Button variant="outline">
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
