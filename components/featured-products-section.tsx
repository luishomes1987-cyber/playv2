import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card-fivem"
import { ArrowRight } from "lucide-react"

export function FeaturedProductsSection() {
  const featuredProducts = getFeaturedProducts()

  return (
    <section className="py-24 bg-gradient-to-b from-black/40 to-black/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500/5 blur-3xl"
            style={{
              width: Math.random() * 200 + 100 + 'px',
              height: Math.random() * 200 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 12 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '200% auto' }}>
              Destaques da Loja
            </h2>
            <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full" />
            <p className="text-muted-foreground text-lg mt-2">Confira os itens mais populares e ofertas especiais</p>
          </div>
          <Link href="/loja">
            <Button variant="outline" className="hidden sm:flex bg-transparent border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300">
              Ver Tudo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-scale-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/loja">
            <Button variant="outline" className="border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/10">
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
