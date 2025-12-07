"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Plus, Trash2, Edit2, Save, X, CreditCard, Bell, Package } from "lucide-react"
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
      const text = await response.text()
      
      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error("Erro ao fazer parse do JSON:", parseError)
        data = []
      }
      
      if (Array.isArray(data)) {
        setUpdatesList(data)
      } else {
        console.warn("API não retornou um array, usando array vazio")
        setUpdatesList([])
      }
    } catch (error) {
      console.error("Erro ao carregar updates:", error)
      setUpdatesList([])
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
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent animate-pulse-scale" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.3)] animate-gradient" style={{ backgroundSize: '200% auto' }}>
              Painel de Updates
            </h1>
            <p className="text-yellow-200/70 mt-2 text-lg">Olá, <span className="font-semibold text-yellow-400">{adminName}</span></p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="flex gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105">
            <Bell className="h-4 w-4 mr-2" />
            Updates
          </Button>
          <Link href="/admin/produtos">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <Package className="h-4 w-4 mr-2" />
              Produtos
            </Button>
          </Link>
          <Link href="/admin/pagamentos">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Pagamentos
            </Button>
          </Link>
        </div>

        {isEditing ? (
          <Card className="mb-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-yellow-500/30 backdrop-blur-xl shadow-2xl shadow-yellow-500/10 animate-scale-in overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {editingId ? "Editar Update" : "Novo Update"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-yellow-400">Título</label>
                <Input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Digite o título do update"
                  className="bg-slate-700/70 border-yellow-500/30 text-white placeholder:text-yellow-200/40 focus:border-yellow-500 transition-all duration-300 h-12"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-yellow-400">Descrição</label>
                <Textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Digite a descrição do update"
                  rows={5}
                  className="bg-slate-700/70 border-yellow-500/30 text-white placeholder:text-yellow-200/40 focus:border-yellow-500 transition-all duration-300 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-yellow-400">Tipo</label>
                <Select value={formCategory} onValueChange={(value: UpdateType) => setFormCategory(value)}>
                  <SelectTrigger className="bg-slate-700/70 border-yellow-500/30 text-white h-12 focus:border-yellow-500 transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-yellow-500/30">
                    <SelectItem value="novidade" className="hover:bg-yellow-500/10">Novidade</SelectItem>
                    <SelectItem value="patch" className="hover:bg-yellow-500/10">Patch</SelectItem>
                    <SelectItem value="evento" className="hover:bg-yellow-500/10">Evento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105 h-12"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Salvar
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 hover:scale-105 h-12"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105 h-12 px-6"
            >
              <Plus className="h-5 w-5 mr-2" />
              Novo Update
            </Button>
          </div>
        )}

        {isLoading ? (
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-yellow-500/30 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full border-4 border-yellow-500/20 border-t-yellow-500 animate-spin" />
                <p className="text-yellow-200/60 text-lg">Carregando updates...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {updatesList.map((update, index) => (
              <Card 
                key={update.id} 
                className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-yellow-500/30 backdrop-blur-xl hover:border-yellow-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {update.title}
                        </h3>
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md">
                          {categoryLabels[update.category]}
                        </span>
                      </div>
                      <p className="text-yellow-200/70 mb-3 leading-relaxed group-hover:text-yellow-200/90 transition-colors">
                        {update.description}
                      </p>
                      <p className="text-xs text-yellow-200/50 font-medium">
                        📅 {new Date(update.date).toLocaleDateString("pt-BR", { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(update)}
                        size="icon"
                        variant="ghost"
                        className="text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 hover:scale-110 h-10 w-10"
                      >
                        <Edit2 className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(update.id, update.title)}
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-110 h-10 w-10"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && updatesList.length === 0 && (
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-yellow-500/30 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Bell className="h-10 w-10 text-yellow-500/50" />
                </div>
                <p className="text-yellow-200/60 text-lg">Nenhum update cadastrado ainda</p>
                <p className="text-yellow-200/40 text-sm">Clique em "Novo Update" para começar</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={deleteModal.open} onOpenChange={(open) => !open && cancelDelete()}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-yellow-500/30 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-yellow-400">Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-yellow-200/70 text-base leading-relaxed pt-2">
              Tem certeza que deseja deletar o update{" "}
              <span className="font-bold text-white">"{deleteModal.updateTitle}"</span>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-3 pt-4">
            <Button
              onClick={cancelDelete}
              variant="outline"
              className="flex-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent hover:border-yellow-500 transition-all duration-300 h-11"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 transition-all duration-300 h-11"
            >
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
