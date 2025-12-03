"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAdmin()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Usuário e senha são obrigatórios")
      return
    }

    const success = login(username, password)
    if (success) {
      router.push("/admin")
    } else {
      setError("Usuário ou senha inválidos")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-yellow-500/20 backdrop-blur">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Painel Administrativo
          </CardTitle>
          <CardDescription className="text-yellow-200/60">Play Cup - Sistema de Gerenciamento</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-yellow-200">Usuário</label>
              <Input
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-yellow-200">Senha</label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
              />
            </div>

            <div className="pt-2 space-y-2 text-xs text-yellow-200/50">
              <p>Credenciais de teste:</p>
              <p>
                Usuário: <span className="text-yellow-300">admin</span>
              </p>
              <p>
                Senha: <span className="text-yellow-300">admin123</span>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2"
            >
              Entrar no Painel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
