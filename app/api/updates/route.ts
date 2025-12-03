// app/api/updates/route.ts
import { type NextRequest, NextResponse } from "next/server"

// Armazenamento em memória (perfeito para começar – depois troca por banco)
let updates: Array<{
  id: string
  title: string
  description: string
  type: "novidade" | "patch" | "evento"
  date: string
  image?: string
}> = []

// GET – sempre retorna ordenado por data (mais recente primeiro)
export async function GET() {
  const sorted = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return NextResponse.json(sorted)
}

// POST – criar novo update
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.title || !body.description || !body.type) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const newUpdate = {
      id: Date.now().toString(),
      title: body.title.trim(),
      description: body.description.trim(),
      type: body.type as "novidade" | "patch" | "evento",
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      image: body.image?.trim() || undefined,
    }

    updates.push(newUpdate)
    return NextResponse.json(newUpdate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar update" }, { status: 500 })
  }
}

// PUT – editar update existente
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    const index = updates.findIndex((u) => u.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: "Update não encontrado" }, { status: 404 })
    }

    updates[index] = {
      ...updates[index],
      title: body.title?.trim() || updates[index].title,
      description: body.description?.trim() || updates[index].description,
      type: (body.type as any) || updates[index].type,
      image: body.image?.trim() || updates[index].image,
    }

    return NextResponse.json(updates[index])
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 })
  }
}

// DELETE – remover update
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 })
    }

    const initialLength = updates.length
    updates = updates.filter((u) => u.id !== id)

    if (updates.length === initialLength) {
      return NextResponse.json({ error: "Update não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 })
  }
}
