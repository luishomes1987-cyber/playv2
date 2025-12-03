import { Database, Trophy, Headphones, Zap, Shield } from "lucide-react"

const serverFeatures = [
  {
    icon: Database,
    title: "Base Exclusiva",
    description: "Infraestrutura de servidor premium com a melhor base do Brasil",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Shield,
    title: "Staff Organizada",
    description: "Equipe profissional e dedicada 24/7 para melhor experiência",
    color: "from-yellow-600 to-amber-600",
  },
  {
    icon: Trophy,
    title: "Campeonatos Pagos",
    description: "Competições mensais com prêmios em dinheiro real",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: Headphones,
    title: "Equipe de Atendimento Ativa",
    description: "Suporte presente e responsivo a qualquer momento",
    color: "from-yellow-500 to-amber-500",
  },
]

export function ServerInfoSection() {
  return (
    <section id="servidor" className="py-20 bg-gradient-to-b from-black/40 to-black/60">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">
              Informações do Servidor
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Aqui tem as Informações Do Servidor
          </h2>
          <p className="text-lg text-yellow-400/80 max-w-2xl mx-auto leading-relaxed">
            Descubra por que Play Cup é o melhor servidor Campeonato do Brasil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serverFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-yellow-500/5 to-transparent border border-yellow-500/30 hover:border-yellow-500/60 transition-all hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <div className="relative z-10">
                <div
                  className={`h-14 w-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/30`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-yellow-400/70 leading-relaxed group-hover:text-yellow-400 transition-colors">
                  {feature.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
