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
    <section id="servidor" className="py-24 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Animated spotlight */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-scale" style={{ left: '20%', top: '10%' }} />
        <div className="absolute w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse-scale" style={{ right: '20%', bottom: '10%', animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm hover:border-yellow-500/50 hover:bg-yellow-500/15 transition-all duration-300 group">
            <Zap className="h-5 w-5 text-yellow-500 animate-bounce-slow drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm drop-shadow-lg">
              Informações do Servidor
            </span>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
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
              style={{ animationDelay: `${index * 0.15}s` }}
              className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 hover:border-yellow-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/40 hover:-translate-y-4 animate-fade-in-up"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-yellow-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
              </div>
              
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div
                  className={`relative h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/60`}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <feature.icon className="h-8 w-8 text-white drop-shadow-lg relative z-10" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-yellow-400/70 leading-relaxed group-hover:text-yellow-400/95 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-lg shadow-yellow-500/50" />
              
              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
