import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const orderIndex = existingOrders.findIndex((o: any) => o.id === orderId)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    existingOrders[orderIndex].status = "delivered"
    existingOrders[orderIndex].updatedAt = new Date().toISOString()
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    return NextResponse.json({
      success: true,
      order: existingOrders[orderIndex],
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
