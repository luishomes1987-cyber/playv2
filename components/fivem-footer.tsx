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
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-2xl font-display font-bold">RP</span>
              </div>
              <span className="font-display text-xl font-bold">FiveM RP</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O melhor servidor de roleplay brasileiro. Junte-se à nossa comunidade e viva histórias incríveis.
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

          {/* Suporte */}
          <div>
            <h3 className="font-display font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/politica"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-display font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-3">
              <a
                href="https://discord.gg/seuservidor"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-all flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/seuservidor"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-all flex items-center justify-center"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@seuservidor"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-all flex items-center justify-center"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/seuservidor"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-all flex items-center justify-center"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 FiveM RP. Todos os direitos reservados. Este servidor não é afiliado com Rockstar Games ou Take-Two
            Interactive.
          </p>
        </div>
      </div>
    </footer>
  )
}
