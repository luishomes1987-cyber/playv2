import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { PackageX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-muted mx-auto">
            <PackageX className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold">Produto não encontrado</h1>
          <p className="text-muted-foreground text-pretty">
            Desculpe, não conseguimos encontrar o produto que você está procurando. Ele pode ter sido removido ou o link
            está incorreto.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/loja">
              <Button>Ver Todos os Jogos</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Voltar para Home</Button>
            </Link>
          </div>
        </div>
      </main>

      <FiveMFooter />
    </div>
  )
}
