// app/api/updates/route.ts
import { type NextRequest, NextResponse } from "next/server"

type UpdateType = "novidade" | "patch" | "evento"

let updates: Array<{
  id: string
  title: string
  description: string
  type: UpdateType
  date: string
  image?: string
}> = []

export async function GET() {
  const sorted = [...updates].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return NextResponse.json(sorted)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.title || !body.description || !body.type) {
      return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 })
    }

    const newUpdate = {
      id: Date.now().toString(),
      title: body.title.trim(),
      description: body.description.trim(),
      type: body.type as UpdateType,
      date: new Date().toISOString().split("T")[0],
      image: body.image?.trim() || undefined,
    }

    updates.push(newUpdate)
    return NextResponse.json(newUpdate, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Erro ao criar" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const index = updates.findIndex(u => u.id === body.id)
    if (index === -1) return NextResponse.json({ error: "Não encontrado" }, { status: 404 })

    updates[index] = {
      ...updates[index],
      title: body.title?.trim() || updates[index].title,
      description: body.description?.trim() || updates[index].description,
      type: body.type || updates[index].type,
      image: body.image?.trim() || updates[index].image,
    }

    return NextResponse.json(updates[index])
  } catch {
    return NextResponse.json({ error: "Erro ao editar" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 })

    updates = updates.filter(u => u.id !== id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 })
  }
}
