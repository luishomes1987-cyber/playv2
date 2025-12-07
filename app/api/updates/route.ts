import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const STORAGE_FILE = path.join(process.cwd(), "data", "updates.json")

function ensureDataDir() {
  const dir = path.dirname(STORAGE_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readUpdates(): Array<{
  id: string
  title: string
  description: string
  category: "novidade" | "patch" | "evento"
  date: string
  image?: string
}> {
  try {
    ensureDataDir()
    if (!fs.existsSync(STORAGE_FILE)) {
      return []
    }
    const data = fs.readFileSync(STORAGE_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading updates:", error)
    return []
  }
}

function writeUpdates(updates: any[]) {
  try {
    ensureDataDir()
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(updates, null, 2), "utf-8")
  } catch (error) {
    console.error("Error writing updates:", error)
    throw error
  }
}

export async function GET() {
  const updates = readUpdates()
  return NextResponse.json(updates)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let updates = readUpdates()

    // Ensure updates is always an array
    if (!Array.isArray(updates)) {
      console.warn("updates is not an array, resetting to empty array")
      updates = []
    }

    const newUpdate = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      category: body.category || body.type,
      date: new Date().toISOString().split("T")[0],
      image: body.image,
    }

    updates.unshift(newUpdate)
    writeUpdates(updates)

    return NextResponse.json(newUpdate, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    let updates = readUpdates()

    // Ensure updates is always an array
    if (!Array.isArray(updates)) {
      console.warn("updates is not an array, resetting to empty array")
      updates = []
    }

    const index = updates.findIndex((u) => u.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 })
    }

    updates[index] = {
      ...updates[index],
      title: body.title,
      description: body.description,
      category: body.category || body.type,
      date: updates[index].date,
    }

    writeUpdates(updates)

    return NextResponse.json(updates[index])
  } catch (error) {
    console.error("PUT error:", error)
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

    let updates = readUpdates()

    // Ensure updates is always an array
    if (!Array.isArray(updates)) {
      console.warn("updates is not an array, resetting to empty array")
      updates = []
    }

    const filtered = updates.filter((u) => u.id !== id)

    writeUpdates(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
