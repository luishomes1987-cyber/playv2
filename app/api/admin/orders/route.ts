import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")

    return NextResponse.json({
      success: true,
      orders: existingOrders,
      total: existingOrders.length,
      stats: {
        pending: existingOrders.filter((o: any) => o.status === "pending").length,
        paid: existingOrders.filter((o: any) => o.status === "paid").length,
        delivered: existingOrders.filter((o: any) => o.status === "delivered").length,
      },
    })
  } catch (error) {
    console.error("Error fetching admin orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
