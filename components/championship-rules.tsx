"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, AlertTriangle, Trophy, Video, Shirt, Repeat2 } from "lucide-react"

const championshipRulesData = [
  { id: "gerais", label: "Regras Gerais", icon: Shield, content: [
      "Proibido reiniciar o computador após o início do campeonato, exceto se autorizado por um membro da equipe.",
      "A equipe será desclassificada caso haja qualquer tentativa de burlar o Modo Puro (Pure Mode).",
      "Proibido o uso de programas ou scripts (.bat) para exclusão ou limpeza de arquivos durante o campeonato.",
      "Remova qualquer tarefa agendada (Task Scheduler) antes do evento.",
      "Todos os participantes serão verificados por scanner.",
      "A gravação da partida pode ser solicitada pela staff.",
    ],
  },
  { id: "comportamento", label: "Comportamento", icon: Users, content: [
      "Ghosting em lives = desclassificação.",
      "Cross Teaming = punição imediata.",
      "Uso de bugs = -15 pontos.",
      "Empate é decidido por número de kills.",
      "Crash ou bug deve ser comprovado com print ou vídeo.",
    ],
  },
  { id: "pontuacao", label: "Pontuação", icon: Trophy, content: [
      "Vitória: +15 pontos",
      "2º Lugar: +7 pontos",
      "Cada Kill: +1 ponto",
      "Empate: 10 pontos por time",
    ],
  },
  { id: "pontos-importantes", label: "Importante", icon: AlertTriangle, content: [
      "Jogar fora das configurações recomendadas = desclassificação.",
      "Cancelamentos próximos ao horário não têm reembolso.",
      "Descumprimento de regras = punição severa.",
    ],
  },
  { id: "safe", label: "Safe", icon: Shield, content: [
      "Proibido se matar longe do gás para ganhar colocação.",
      "Caso aconteça, os pontos não serão válidos.",
    ],
  },
  { id: "rr", label: "RR", icon: Repeat2, content: [
      "RR apenas se a equipe desclassificada tiver +15 pontos.",
      "Uso de cheat = RR em todas as quedas.",
      "Preconceito = desclassificação imediata, sem RR.",
    ],
  },
  { id: "clipe", label: "Clipe", icon: Video, content: [
      "É necessário clipar 15 segundos antes da kill ou morte.",
      "Clipagem de call somente da própria morte.",
    ],
  },
  { id: "roupas", label: "Roupas", icon: Shirt, content: [
      "Proibido usar máscaras, capacetes ou mãos sem visual.",
      "Considerado bug visual = -10 pontos.",
    ],
  },
  { id: "times", label: "Times", icon: Users, content: [
      "Entrou em time errado? Relogue imediatamente.",
      "Se não relogar e aparecer info de outro time: -15 pontos.",
    ],
  },
]

export function ChampionshipRules() {
  const [activeTab, setActiveTab] = useState("gerais")

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Cleaner Tabs */}
        <TabsList className="flex gap-2 bg-transparent p-0 mb-4 overflow-x-auto whitespace-nowrap">
          {championshipRulesData.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all
                data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Content */}
        {championshipRulesData.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                {category.label}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {category.content.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-relaxed">
                    <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Aviso Final */}
      <div className="p-6 rounded-xl bg-destructive/10 border border-destructive/50">
        <h3 className="font-bold text-lg mb-2 text-destructive">Importante</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          O não cumprimento de qualquer regra poderá resultar em advertências, perda de pontos ou desclassificação.
        </p>
      </div>
    </div>
  )
}
