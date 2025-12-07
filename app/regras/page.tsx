import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { RulesAccordion } from "@/components/rules-accordion"
import { ChampionshipRules } from "@/components/championship-rules"

export default function RegrasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-slate-950 to-black">
      <FiveMHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4 text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]" style={{ backgroundSize: '200% auto' }}>
              Regras do Servidor
            </h1>
            <p className="text-xl md:text-2xl text-yellow-200/70 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Leia atentamente todas as regras antes de começar a jogar. O desconhecimento das regras não isenta
              punições.
            </p>
          </div>
        </section>

        <section className="py-20 border-b border-yellow-500/20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-fade-in-up">
              Regras da Comunidade
            </h2>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <RulesAccordion />
            </div>
          </div>
        </section>

        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-fade-in-up">
              Regras do Campeonato
            </h2>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <ChampionshipRules />
            </div>
          </div>
        </section>
      </main>

      <FiveMFooter />
    </div>
  )
}
