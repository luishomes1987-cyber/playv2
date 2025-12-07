import { type NextRequest, NextResponse } from "next/server"

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/loja?error=no_code", request.url))
  }

  try {
    // Trocar código por access token
    const tokenResponse = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID || "",
        client_secret: DISCORD_CLIENT_SECRET || "",
        code,
        grant_type: "authorization_code",
        redirect_uri: `${request.nextUrl.origin}/api/discord/callback`,
        scope: "identify email",
      }).toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}))
      console.error("Token response error:", errorData)
      throw new Error("Failed to get access token")
    }

    const tokenData = await tokenResponse.json()

    // Buscar dados do usuário
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      console.error("User response error:", await userResponse.text())
      throw new Error("Failed to get user data")
    }

    const userData = await userResponse.json()

    const userParam = encodeURIComponent(
      JSON.stringify({
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
        email: userData.email,
      }),
    )

    return NextResponse.redirect(new URL(`/perfil?user=${userParam}`, request.url))
  } catch (error) {
    console.error("Discord auth error:", error)
    return NextResponse.redirect(new URL("/loja?error=auth_failed", request.url))
  }
}
