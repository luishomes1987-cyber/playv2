import { type NextRequest, NextResponse } from "next/server"

// Simulated storage for updates (in production, use a database)
let updates: Array<{
  id: string
  title: string
  description: string
  type: "novidade" | "patch" | "evento"
  date: string
  image?: string
}> = []

export async function GET() {
  return NextResponse.json(updates)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newUpdate = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      type: body.type,
      date: new Date().toISOString().split("T")[0],
      image: body.image,
    }
    updates.push(newUpdate)
    return NextResponse.json(newUpdate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const index = updates.findIndex((u) => u.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 })
    }
    updates[index] = { ...updates[index], ...body }
    return NextResponse.json(updates[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }
    updates = updates.filter((u) => u.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
