import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })

  // Clear any auth cookies
  response.cookies.delete("discord-token")
  response.cookies.delete("discord-user")

  return response
}
