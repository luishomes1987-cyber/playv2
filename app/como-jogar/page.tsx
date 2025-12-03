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
    link: "https://discord.gg/UFmVzuUA",
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
    link: "https://discord.gg/UFmVzuUA",
    linkText: "Conectar Agora",
  },
]

export default function ComoJogarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-card/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Como Jogar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Siga estes passos simples para começar sua jornada no nosso servidor
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                      <Link href={step.link}>
                        <Button className="glow-primary">{step.linkText}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regras Básicas */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-display font-bold mb-8 text-center">Regras Básicas</h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-lg mb-2">Respeite A Staff</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sempre mantenha o respeito pela equipa de Staff.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-lg mb-2">Sem Trapaças</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Não use trapaças na Play Cup.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-lg mb-2">Seja Respeitoso</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Trate todos os jogadores com respeito, independente da situação no jogo.
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/regras">
                  <Button size="lg" variant="outline">
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
