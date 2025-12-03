import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { UpdatesTimeline } from "@/components/updates-timeline"

export default function UpdatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Atualizações do Servidor
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fique por dentro de todas as novidades, eventos e melhorias
            </p>
          </div>

          <UpdatesTimeline />
        </div>
      </main>

      <FiveMFooter />
    </div>
  )
}
