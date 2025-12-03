import Image from "next/image"
import Link from "next/link"
import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card-fivem"
import { getProductById, products } from "@/lib/products-data"
import { Check, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

const rarityColors = {
  comum: "bg-gray-500",
  raro: "bg-blue-500",
  epico: "bg-purple-500",
  lendario: "bg-yellow-500",
}

const rarityLabels = {
  comum: "Comum",
  raro: "Raro",
  epico: "Épico",
  lendario: "Lendário",
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = getProductById(resolvedParams.id)

  if (!product) {
    notFound()
  }

  // Produtos relacionados da mesma categoria
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/loja"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para a loja
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Imagem do Produto */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-border bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.rarity && (
                <Badge className={`absolute top-4 left-4 ${rarityColors[product.rarity]} text-white border-0`}>
                  {rarityLabels[product.rarity]}
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-destructive">Fora de Estoque</span>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 text-balance">{product.name}</h1>

              {/* Category */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                {product.rarity && (
                  <Badge className={`${rarityColors[product.rarity]} text-white border-0`}>
                    {rarityLabels[product.rarity]}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Preço */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-primary">Eur {product.price.toFixed(2)}</span>
                  </div>

                  <AddToCartButton product={product} />

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-display font-semibold mb-3 text-sm">O que você receberá:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Item entregue automaticamente no jogo</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Suporte 24/7 via Discord</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>Pagamento seguro</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aviso */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Importante:</strong> Após a compra, o item será entregue
                  automaticamente na sua conta do servidor. Certifique-se de estar logado com a conta correta.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Produtos Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <FiveMFooter />
    </div>
  )
}
