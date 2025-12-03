"use client"

import { useEffect, useState } from "react"
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
  date: string
  category: UpdateType
}

const categoryLabels: Record<UpdateType, string> = {
  novidade: "Novidade",
  patch: "Patch",
  evento: "Evento",
}

export default function AdminPage() {
  const router = useRouter()
  const { isAdmin, adminName, logout } = useAdmin()
  const [updatesList, setUpdatesList] = useState<Update[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; updateId: string | null; updateTitle: string }>({
    open: false,
    updateId: null,
    updateTitle: "",
  })

  // Form state
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formCategory, setFormCategory] = useState<UpdateType>("novidade")

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login")
    } else {
      fetchUpdates()
    }
  }, [isAdmin, router])

  const fetchUpdates = async () => {
    try {
      const response = await fetch("/api/updates")
      const data = await response.json()
      setUpdatesList(data)
    } catch (error) {
      console.error("Erro ao carregar updates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const handleAddNew = () => {
    setIsEditing(true)
    setEditingId(null)
    setFormTitle("")
    setFormDescription("")
    setFormCategory("novidade")
  }

  const handleEdit = (update: Update) => {
    setIsEditing(true)
    setEditingId(update.id)
    setFormTitle(update.title)
    setFormDescription(update.description)
    setFormCategory(update.category)
  }

  const handleSave = async () => {
    if (!formTitle.trim() || !formDescription.trim()) return

    try {
      if (editingId) {
        await fetch("/api/updates", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            title: formTitle,
            description: formDescription,
            category: formCategory,
          }),
        })
      } else {
        await fetch("/api/updates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            description: formDescription,
            category: formCategory,
          }),
        })
      }

      await fetchUpdates()
      handleCancel()
    } catch (error) {
      console.error("Erro ao salvar update:", error)
      alert("Erro ao salvar update. Tente novamente.")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormTitle("")
    setFormDescription("")
    setFormCategory("novidade")
  }

  const handleDelete = (id: string, title: string) => {
    setDeleteModal({ open: true, updateId: id, updateTitle: title })
  }

  const confirmDelete = async () => {
    if (!deleteModal.updateId) return

    try {
      await fetch(`/api/updates?id=${deleteModal.updateId}`, {
        method: "DELETE",
      })

      await fetchUpdates()
      setDeleteModal({ open: false, updateId: null, updateTitle: "" })
    } catch (error) {
      console.error("Erro ao deletar update:", error)
      alert("Erro ao deletar update. Tente novamente.")
    }
  }

  const cancelDelete = () => {
    setDeleteModal({ open: false, updateId: null, updateTitle: "" })
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Painel de Updates
            </h1>
            <p className="text-yellow-200/60 mt-1">Olá, {adminName}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <Bell className="h-4 w-4 mr-2" />
            Updates
          </Button>
          <Link href="/admin/pagamentos">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pagamentos
            </Button>
          </Link>
        </div>

        {/* Form de Adicionar/Editar */}
        {isEditing ? (
          <Card className="mb-8 bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-yellow-400">{editingId ? "Editar Update" : "Novo Update"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-200">Título</label>
                <Input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Digite o título do update"
                  className="bg-slate-700/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-200">Descrição</label>
                <Textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Digite a descrição do update"
                  rows={4}
                  className="bg-slate-700/50 border-yellow-500/20 text-white placeholder:text-yellow-200/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-200">Tipo</label>
                <Select value={formCategory} onValueChange={(value: UpdateType) => setFormCategory(value)}>
                  <SelectTrigger className="bg-slate-700/50 border-yellow-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-yellow-500/20">
                    <SelectItem value="novidade">Novidade</SelectItem>
                    <SelectItem value="patch">Patch</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-8">
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Update
            </Button>
          </div>
        )}

        {/* Lista de Updates */}
        {isLoading ? (
          <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardContent className="p-12 text-center">
              <p className="text-yellow-200/50">Carregando updates...</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {updatesList.map((update) => (
              <Card key={update.id} className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{update.title}</h3>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          {categoryLabels[update.category]}
                        </span>
                      </div>
                      <p className="text-yellow-200/70 mb-2">{update.description}</p>
                      <p className="text-xs text-yellow-200/40">{new Date(update.date).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => handleEdit(update)}
                        size="icon"
                        variant="ghost"
                        className="text-yellow-400 hover:bg-yellow-500/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(update.id, update.title)}
                        size="icon"
                        variant="ghost"
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

        {!isLoading && updatesList.length === 0 && (
          <Card className="bg-slate-800/50 border-yellow-500/20 backdrop-blur">
            <CardContent className="p-12 text-center">
              <p className="text-yellow-200/50">Nenhum update cadastrado ainda</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={deleteModal.open} onOpenChange={(open) => !open && cancelDelete()}>
        <DialogContent className="bg-slate-800 border-yellow-500/30">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-yellow-200/70">
              Tem certeza que deseja deletar o update{" "}
              <span className="font-semibold text-white">"{deleteModal.updateTitle}"</span>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              onClick={cancelDelete}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
