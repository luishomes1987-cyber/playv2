import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const storedMessages = localStorage.getItem("admin_messages")
    const messages = storedMessages ? JSON.parse(storedMessages) : []

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error syncing messages:", error)
    return NextResponse.json({ error: "Failed to sync messages" }, { status: 500 })
  }
}
