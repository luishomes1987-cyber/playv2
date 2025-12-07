import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { Button } from "@/components/ui/button"
import { Download, MessageCircle, BookOpen, Play } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: Download,
    title: "1. Instale o FiveM",
    description: "Baixe e instale o FiveM no seu computador. É rápido e gratuito!",
    link: "https://fivem.net",
    linkText: "Baixar FiveM",
  },
  {
    icon: MessageCircle,
    title: "2. Entre no Discord",
    description: "Junte-se ao nosso servidor do Discord para se conectar com a comunidade.",
    link: "https://discord.gg/dzMfnd8x6k",
    linkText: "Entrar no Discord",
  },
  {
    icon: BookOpen,
    title: "3. Leia as Regras",
    description: "Familiarize-se com nossas regras para garantir uma boa experiência de RP.",
    link: "/regras",
    linkText: "Ver Regras",
  },
  {
    icon: Play,
    title: "4. Conecte ao Servidor",
    description: "Abra o FiveM e pegue o seu time para começar a jogar!",
    link: "https://discord.gg/dzMfnd8x6k",
    linkText: "Conectar Agora",
  },
]

export default function ComoJogarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-slate-950 to-black">
      <FiveMHeader />

      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4 text-center animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm">
              <Play className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">Comece Agora</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]" style={{ backgroundSize: '200% auto' }}>
              Como Jogar
            </h1>
            <p className="text-xl md:text-2xl text-yellow-200/70 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Siga estes passos simples para começar sua jornada no nosso servidor
            </p>
          </div>
        </section>

        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="group p-10 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-yellow-500/30 hover:border-yellow-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-3 animate-fade-in-up overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-yellow-500/50">
                      <step.icon className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-yellow-200/70 leading-relaxed mb-6 group-hover:text-yellow-200/90 transition-colors duration-300">
                        {step.description}
                      </p>
                      <Link href={step.link}>
                        <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105 relative overflow-hidden group/btn">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover/btn:opacity-100" style={{ backgroundSize: '200% 100%' }} />
                          <span className="relative z-10">{step.linkText}</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-fade-in-up">
                Regras Básicas
              </h2>
              <div className="space-y-5">
                {[
                  { title: "Respeite A Staff", desc: "Sempre mantenha o respeito pela equipa de Staff." },
                  { title: "Sem Trapaças", desc: "Não use trapaças na Play Cup." },
                  { title: "Seja Respeitoso", desc: "Trate todos os jogadores com respeito, independente da situação no jogo." }
                ].map((rule, index) => (
                  <div 
                    key={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-1 animate-fade-in-up"
                  >
                    <h3 className="font-display font-bold text-xl mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {rule.title}
                    </h3>
                    <p className="text-yellow-200/70 leading-relaxed group-hover:text-yellow-200/90 transition-colors duration-300">
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link href="/regras">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105 px-8 h-14 text-base"
                  >
                    Ver Todas as Regras
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FiveMFooter />
    </div>
  )
}
