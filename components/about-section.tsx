import { Shield, Users, Zap, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Campeonato Premium",
    description: "Sistema competitivo profundo com mecânicas balanceadas e jogabilidade fluida",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "100+ jogadores ativos em tempo real competindo e se divertindo",
  },
  {
    icon: Zap,
    title: "Atualizações Semanais",
    description: "Novos conteúdos, mapas e eventos toda semana mantendo o jogo fresco",
  },
  {
    icon: Award,
    title: "Servidor Premium",
    description: "Infraestrutura de elite com 99.9% uptime e performance máxima",
  },
]

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Por Que Escolher Play Cup?</h2>
          <p className="text-xl text-yellow-400/80 max-w-2xl mx-auto leading-relaxed">
            A melhor experiência de Campeonato no Brasil, campeonatos profissionais e
            comunidade premiada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/20">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
