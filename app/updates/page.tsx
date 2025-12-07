import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { UpdatesTimeline } from "@/components/updates-timeline"
import { Bell } from "lucide-react"

export default function UpdatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-slate-950 to-black">
      <FiveMHeader />

      <main className="flex-1 py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm">
              <Bell className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">Novidades</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]" style={{ backgroundSize: '200% auto' }}>
              Atualizações do Servidor
            </h1>
            <p className="text-xl md:text-2xl text-yellow-200/70 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Fique por dentro de todas as novidades, eventos e melhorias
            </p>
          </div>

          <UpdatesTimeline />
        </div>
      </main>

      <FiveMFooter />
    </div>
  )
}
