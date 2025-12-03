"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useDiscordAuth } from "@/lib/discord-auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Início", href: "/" },
  { name: "Updates", href: "/updates" },
  { name: "Como Jogar", href: "/como-jogar" },
  { name: "Regras", href: "/regras" },
  { name: "Loja", href: "/loja" },
]

export function FiveMHeader() {
  const pathname = usePathname()
  const { user, isLoading, loginWithDiscord, logout, isAuthenticated, getAvatarUrl } = useDiscordAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-gradient-to-r from-black to-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg overflow-hidden">
              <img
                src="https://cdn.discordapp.com/icons/1441876137050374347/a989b8b8a4fb2aaa25d1e4ab58e91fb2.webp?size=1024"
                alt="Play Cup logo"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="hidden sm:inline-block font-display text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
              Play Cup
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions - Removed cart */}
          <div className="flex items-center space-x-2">
            {/* User Menu Desktop */}
            {isLoading ? (
              <Button disabled variant="ghost" className="hidden sm:flex">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
              </Button>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden sm:flex items-center gap-2 hover:bg-yellow-500/10">
                    <img
                      src={getAvatarUrl(user) || "/placeholder.svg"}
                      alt={user.username}
                      className="h-8 w-8 rounded-full ring-2 ring-yellow-500/50"
                    />
                    <span className="text-sm font-medium text-gray-300">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900/95 border-yellow-500/20">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-white">{user.username}</p>
                      {user.email && <p className="text-xs text-gray-400">{user.email}</p>}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-yellow-500/20" />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer text-gray-300 hover:text-yellow-400">
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-yellow-500/20" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={loginWithDiscord}
                className="hidden sm:flex glow-primary bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Entrar
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-yellow-500/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* User Section Mobile */}
            <div className="pt-4 border-t border-yellow-500/20">
              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
                </div>
              ) : isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2 bg-yellow-500/10 rounded-lg">
                    <img
                      src={getAvatarUrl(user) || "/placeholder.svg"}
                      alt={user.username}
                      className="h-10 w-10 rounded-full ring-2 ring-yellow-500/50"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{user.username}</p>
                      {user.email && <p className="text-xs text-gray-400">{user.email}</p>}
                    </div>
                  </div>
                  <Link
                    href="/perfil"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <User className="h-4 w-4" />
                    Meu Perfil
                  </Link>
                  <Button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    loginWithDiscord()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full glow-primary bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Entrar com Discord
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
