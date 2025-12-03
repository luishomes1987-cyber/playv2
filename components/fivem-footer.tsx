import Link from "next/link"
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"

export function FiveMFooter() {
  return (
    <footer className="border-t border-border/40 bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.discordapp.com/attachments/1441918069114146886/1445922515804491776/Perfil-Play-Cup.png?ex=69321bc7&is=6930ca47&hm=9eddf4bdd22faba581440aee90da8f45c75c09d8b72a4399079736ba96eb7699&"
                alt="Play Cup Logo"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-display text-xl font-bold">Play Cup</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              O melhor campeonato de Portugal da atualidade. Competição, emoção e o mais alto nível do cenário nacional.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-display font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/como-jogar"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Como Jogar
                </Link>
              </li>
              <li>
                <Link href="/regras" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Regras
                </Link>
              </li>
              <li>
                <Link href="/loja" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Loja
                </Link>
              </li>
            </ul>
          </div>

        </div> {/* <-- Fechamento do grid */}

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Play Cup. Todos os direitos reservados. Este servidor não é afiliado com Rockstar Games ou Take-Two
            Interactive.
          </p>
        </div>
      </div>
    </footer>
  )
}
