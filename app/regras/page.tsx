import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { RulesAccordion } from "@/components/rules-accordion"
import { ChampionshipRules } from "@/components/championship-rules"

export default function RegrasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-card/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Regras do Servidor
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Leia atentamente todas as regras antes de começar a jogar. O desconhecimento das regras não isenta
              punições.
            </p>
          </div>
        </section>

        {/* Regras da Comunidade */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">Regras da Comunidade</h2>
            <RulesAccordion />
          </div>
        </section>

        {/* Regras do Campeonato */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">Regras do Campeonato</h2>
            <ChampionshipRules />
          </div>
        </section>
      </main>

      <FiveMFooter />
    </div>
  )
}
