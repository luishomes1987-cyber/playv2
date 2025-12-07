import { type NextRequest, NextResponse } from "next/server"

// Simulated storage for payments (in production, use a database)
let pagamentos: Array<{
  id: string
  discordUser: string
  productId: string
  productName: string
  status: "pendente" | "aprovado" | "recusado"
  date: string
}> = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const discordUser = searchParams.get("discordUser")

  if (discordUser) {
    // Return only approved payments for a specific user
    const userPayments = pagamentos.filter((p) => p.discordUser === discordUser && p.status === "aprovado")
    return NextResponse.json(userPayments)
  }

  return NextResponse.json(pagamentos)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newPagamento = {
      id: Date.now().toString(),
      discordUser: body.discordUser,
      productId: body.productId,
      productName: body.productName,
      status: body.status || "pendente",
      date: new Date().toISOString().split("T")[0],
    }
    pagamentos.push(newPagamento)
    return NextResponse.json(newPagamento, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const index = pagamentos.findIndex((p) => p.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }
    pagamentos[index] = { ...pagamentos[index], ...body }
    return NextResponse.json(pagamentos[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }
    pagamentos = pagamentos.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
