"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface DiscordUser {
  id: string
  username: string
  avatar: string
  email?: string
}

interface DiscordAuthContextType {
  user: DiscordUser | null
  isLoading: boolean
  loginWithDiscord: () => void
  logout: () => void
  isAuthenticated: boolean
  getAvatarUrl: (user: DiscordUser) => string
}

const DiscordAuthContext = createContext<DiscordAuthContextType | undefined>(undefined)

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID

export function DiscordAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false)
      return
    }

    const checkAuth = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const userParam = urlParams.get("user")

        if (userParam) {
          const userData = JSON.parse(decodeURIComponent(userParam))
          window.localStorage.setItem("discord-user", JSON.stringify(userData))
          setUser(userData)
          window.history.replaceState({}, document.title, window.location.pathname)
        } else {
          const savedUser = window.localStorage.getItem("discord-user")
          if (savedUser) {
            setUser(JSON.parse(savedUser))
          }
        }
      } catch (e) {
        console.error("Erro ao carregar usuário:", e)
        window.localStorage.removeItem("discord-user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const loginWithDiscord = () => {
    if (typeof window === "undefined") return

    if (!DISCORD_CLIENT_ID) {
      console.error("Discord Client ID não configurado")
      alert("Discord Client ID não configurado. Adicione NEXT_PUBLIC_DISCORD_CLIENT_ID nas variáveis de ambiente.")
      return
    }

    const redirectUri = `${window.location.origin}/api/discord/callback`
    const scope = "identify email"
    const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`

    window.location.href = discordUrl
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("discord-user")
      window.localStorage.removeItem("discord-token")
    }
  }

  const getAvatarUrl = (user: DiscordUser): string => {
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    }
    const defaultAvatarNumber = Number(BigInt(user.id) >> BigInt(22)) % 6
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }

  return (
    <DiscordAuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithDiscord,
        logout,
        isAuthenticated: !!user,
        getAvatarUrl,
      }}
    >
      {children}
    </DiscordAuthContext.Provider>
  )
}

export function useDiscordAuth() {
  const context = useContext(DiscordAuthContext)
  if (context === undefined) {
    throw new Error("useDiscordAuth deve ser usado dentro de DiscordAuthProvider")
  }
  return context
}
