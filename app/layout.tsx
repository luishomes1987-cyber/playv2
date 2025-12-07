import type React from "react"
import type { Metadata } from "next"
import { Inter, Rajdhani } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminProvider } from "@/lib/admin-context"
import { DiscordAuthProvider } from "@/lib/discord-auth-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Play Cup - Servidor FiveM",
  description:
    "Entre agora no melhor servidor de campeonato atualmente me portugal conheça a Play Cup",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${rajdhani.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <DiscordAuthProvider>
            <AdminProvider>{children}</AdminProvider>
          </DiscordAuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
