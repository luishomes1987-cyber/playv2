import { type NextRequest, NextResponse } from "next/server"

interface CreateOrderRequest {
  userId: string
  username: string
  items: any[]
  totalPrice: number
  pixKey?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()

    const order = {
      id: `order_${body.userId}_${Date.now()}`,
      userId: body.userId,
      username: body.username,
      items: body.items,
      totalPrice: body.totalPrice,
      status: "pending",
      pixKey: body.pixKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    existingOrders.push(order)
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
