// app/admin/page.tsx   (ou app/admin/updates/page.tsx – onde você tiver o painel)

"use client"

import { useEffect, useState } from "react"               // ← corrigido aqui
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Plus, Trash2, Edit2, Save, X, CreditCard, Bell } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

type UpdateType = "novidade" | "patch" | "evento"

interface Update {
  id: string
  title: string
  description: string
  type: UpdateType
  date: string
  image?: string
}

const typeLabels: Record<UpdateType, string> = {
  novidade: "Novidade",
  patch: "Patch",
  evento: "Evento",
}

export default function AdminUpdatesPage() {
  const router = useRouter()
  const { isAdmin, adminName, logout } = useAdmin()

  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Formulário
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<UpdateType>("novidade")
  const [image, setImage] = useState("")

  // Modal delete
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null; title: string }>({
    open: false,
    id: null,
    title: "",
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login")
    } else {
      fetchUpdates()
    }
  }, [isAdmin, router])

  const fetchUpdates = async () => {
    try {
      const res = await fetch("/api/updates", { cache: "no-store" })
      const data = await res.json()
      setUpdates(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (update: Update) => {
    setIsEditing(true)
    setEditingId(update.id)
    setTitle(update.title)
    setDescription(update.description)
    setType(update.type)
    setImage(update.image || "")
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditingId(null)
    setTitle("")
    setDescription("")
    setType("novidade")
    setImage("")
  }

  const saveUpdate = async () => {
    if (!title.trim() || !description.trim()) return

    const payload = {
      title: title.trim(),
      description: description.trim(),
      type,
      image: image.trim() ? image.trim() : undefined,
    }

    try {
      if (editingId) {
        await fetch("/api/updates", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        })
      } else {
        await fetch("/api/updates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }
      fetchUpdates()
      cancelEdit()
    } catch (e) {
      alert("Erro ao salvar update")
      console.error(e)
    }
  }

  const confirmDelete = async () => {
    if (!deleteModal.id) return
    await fetch(`/api/updates?id=${deleteModal.id}`, { method: "DELETE" })
    fetchUpdates()
    setDeleteModal({ open: false, id: null, title: "" })
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Painel Admin – Updates
            </h1>
            <p className="text-yellow-200/60 mt-1">Olá, {adminName}</p>
          </div>
          <Button onClick={logout} variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <Bell className="h-4 w-4 mr-2" />
            Updates
          </Button>
          <Link href="/admin/pagamentos">
            <Button variant="outline" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
              <CreditCard className="h-4 w-4 mr-2" />
              Pagamentos
            </Button>
          </Link>
        </div>

        {/* Formulário */}
        {isEditing ? (
          <Card className="mb-8 bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-yellow-400">
                {editingId ? "Editar Update" : "Novo Update"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Título do update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-700/50 border-yellow-500/20 text-white"
              />
              <Textarea
                placeholder="Descrição detalhada"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-700/50 border-yellow-500/20 text-white"
              />
              <Select value={type} onValueChange={(v: UpdateType) => setType(v)}>
                <SelectTrigger className="bg-slate-700/50 border-yellow-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="novidade">Novidade</SelectItem>
                  <SelectItem value="patch">Patch</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="URL da imagem (opcional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="bg-slate-700/50 border-yellow-500/20 text-white"
              />

              <div className="flex gap-3">
                <Button onClick={saveUpdate} className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button onClick={cancelEdit} variant="outline" className="border-yellow-500/30 text-yellow-400">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-8">
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Update
            </Button>
          </div>
        )}

        {/* Lista de updates */}
        {loading ? (
          <p className="text-center text-yellow-200/50 py-12">Carregando updates...</p>
        ) : updates.length === 0 ? (
          <Card className="text-center py-16 bg-slate-800/50 border-yellow-500/20">
            <p className="text-yellow-200/50">Nenhum update cadastrado ainda</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {updates.map((u) => (
              <Card key={u.id} className="bg-slate-800/50 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{u.title}</h3>
                        <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          {typeLabels[u.type]}
                        </span>
                      </div>
                      <p className="text-yellow-200/70">{u.description}</p>
                      <p className="text-xs text-yellow-200/40 mt-2">
                        {new Date(u.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(u)} className="text-yellow-400 hover:bg-yellow-500/10">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteModal({ open: true, id: u.id, title: u.title })}
                        className="text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      <Dialog open={deleteModal.open} onOpenChange={(o) => !o && setDeleteModal({ ...deleteModal, open: false })}>
        <DialogContent className="bg-slate-800 border-yellow-500/30">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Confirmar exclusão</DialogTitle>
            <DialogDescription className="text-yellow-200/70">
              Tem certeza que quer deletar "<span className="font-bold text-white">{deleteModal.title}</span>"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteModal({ open: false, id: null, title: "" })}
              className="border-yellow-500/30 text-yellow-400">
              Cancelar
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
