"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, AlertCircle, Gavel } from "lucide-react"

const ruleCategories = [
  {
    id: "gerais",
    icon: Shield,
    title: "Regras Gerais",
    color: "from-yellow-500 to-yellow-700",
    rules: [
      "Esteja de acordo com os Termos de Serviço do Discord.",
      "SPAM (mensagens repetitivas) é proibido.",
      "Mantenha cordialidade ao interagir com outros membros; evite ofensas, calúnias ou discursos desrespeitosos.",
      "Não promova ou divulgue conteúdos de terceiros ou servidores concorrentes.",
      "Não utilize canais de voz para acessar ou divulgar servidores concorrentes.",
      "Proibido criar contas alternativas para burlar punições ou restrições no Discord.",
      "Proibido usar apelidos para realizar divulgações ou promoções.",
      "Não publique imagens reais de outras pessoas sem consentimento.",
      "Conteúdos pornográficos, racistas, ofensivos, homofóbicos, discriminatórios ou fake news são proibidos. O respeito é fundamental.",
      "Ao ser banido, todos os cargos serão removidos, incluindo VIP. Evite punições desnecessárias!",
    ],
  },
  {
    id: "cheating",
    icon: AlertCircle,
    title: "Termos Cheating",
    color: "from-red-500 to-red-700",
    rules: [
      "Qualquer hack encontrado no seu computador, ou vestígios de hacks (rastros), poderá resultar em banimento permanente.",
      "Limpezas realizadas durante a telagem ou tentativas de burlar o sistema (bypass) serão punidas.",
      "Participação em vários servidores ou comunidades relacionadas a cheating também pode acarretar punições.",
      "Utilizamos o scanner Echo durante as telagens. Se o Echo detectar algo suspeito, não é necessário realizar a telagem manual.",
      "Não adianta tentar justificar: se o sistema acusou, significa que há algo irregular no seu computador.",
    ],
  },
  {
    id: "campeonato",
    icon: Gavel,
    title: "Regras do Campeonato",
    color: "from-blue-500 to-blue-700",
    rules: [
      "Todos os participantes devem respeitar as regras estabelecidas.",
      "Comportamento inadequado durante o campeonato pode resultar em desqualificação.",
      "Cheating, exploits ou qualquer forma de trapaça resultará em punição permanente.",
      "As decisões da staff durante o campeonato são finais.",
    ],
  },
]

export function RulesAccordion() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Accordion type="single" collapsible className="space-y-4">
        {ruleCategories.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary/50 transition-all"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-4">
                <div
                  className={`h-12 w-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-display font-bold text-left">{category.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <ul className="space-y-3">
                {category.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-3 text-muted-foreground leading-relaxed">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Aviso Final */}
      <div className="mt-12 p-6 rounded-xl bg-destructive/10 border border-destructive/50">
        <h3 className="font-display font-bold text-lg mb-2 text-destructive">Importante</h3>
        <p className="text-muted-foreground leading-relaxed">
          Em situações não previstas nestas regras, a decisão final ficará a critério da Administração. O não
          cumprimento resultará em punições que variam de advertências até banimento permanente.
        </p>
      </div>
    </div>
  )
}
