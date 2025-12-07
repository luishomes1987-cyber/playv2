// src/lib/fetchUpdates.ts
export interface Update {
  id: string
  title: string
  description: string
  type: "novidade" | "patch" | "evento"
  date: string
  image?: string
}

export async function getUpdates(): Promise<Update[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/updates`, {
    cache: "no-store", // sempre pega os dados atualizados
  })

  if (!res.ok) {
    console.error("Erro ao carregar updates")
    return []
  }

  return res.json()
}