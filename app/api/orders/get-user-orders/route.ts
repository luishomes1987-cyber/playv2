import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const userOrders = existingOrders.filter((o: any) => o.userId === userId)

    return NextResponse.json({
      success: true,
      orders: userOrders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
