// lib/storage.ts
// Abstração de storage que funciona com window.storage (Claude.ai) ou localStorage (Next.js)

interface StorageResult {
  key: string
  value: string
  shared?: boolean
}

interface ListResult {
  keys: string[]
  prefix?: string
  shared?: boolean
}

class UniversalStorage {
  private isWindowStorageAvailable(): boolean {
    return typeof window !== 'undefined' && 
           'storage' in window && 
           typeof (window as any).storage === 'object'
  }

  async set(key: string, value: string, shared?: boolean): Promise<StorageResult | null> {
    try {
      if (this.isWindowStorageAvailable()) {
        // Usa window.storage (Claude.ai)
        return await (window as any).storage.set(key, value, shared)
      } else {
        // Fallback para localStorage (Next.js)
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, value)
          return { key, value, shared }
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
    return null
  }

  async get(key: string, shared?: boolean): Promise<StorageResult | null> {
    try {
      if (this.isWindowStorageAvailable()) {
        // Usa window.storage (Claude.ai)
        return await (window as any).storage.get(key, shared)
      } else {
        // Fallback para localStorage (Next.js)
        if (typeof window !== 'undefined') {
          const value = localStorage.getItem(key)
          if (value !== null) {
            return { key, value, shared }
          }
        }
      }
    } catch (error) {
      // Chave não encontrada ou outro erro
      console.log('Chave não encontrada:', key)
    }
    return null
  }

  async delete(key: string, shared?: boolean): Promise<{ key: string; deleted: boolean; shared?: boolean } | null> {
    try {
      if (this.isWindowStorageAvailable()) {
        // Usa window.storage (Claude.ai)
        return await (window as any).storage.delete(key, shared)
      } else {
        // Fallback para localStorage (Next.js)
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key)
          return { key, deleted: true, shared }
        }
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
    return null
  }

  async list(prefix?: string, shared?: boolean): Promise<ListResult | null> {
    try {
      if (this.isWindowStorageAvailable()) {
        // Usa window.storage (Claude.ai)
        return await (window as any).storage.list(prefix, shared)
      } else {
        // Fallback para localStorage (Next.js)
        if (typeof window !== 'undefined') {
          const keys: string[] = []
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key && (!prefix || key.startsWith(prefix))) {
              keys.push(key)
            }
          }
          return { keys, prefix, shared }
        }
      }
    } catch (error) {
      console.error('Erro ao listar:', error)
    }
    return null
  }
}

// Exporta uma instância única
export const storage = new UniversalStorage()
