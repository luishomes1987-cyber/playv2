"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Zap, Flame } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Bem-vindo ao Play Cup",
    subtitle: "Campeonato de Portugal - A Competição Começa",
    cta: "Entrar na Partida",
    ctaLink: "/como-jogar",
    image: "/battle-royale-arena-gameplay.jpg",
  },
  {
    id: 2,
    title: "Informações do Servidor",
    subtitle: "Tudo o que você precisa saber sobre Play Cup",
    cta: "Ver Detalhes",
    ctaLink: "/#servidor",
    image: "/gaming-server-infrastructure.png",
  },
  {
    id: 3,
    title: "Campeonatos Pagos",
    subtitle: "Compete, ganhe prêmios e domine a cidade",
    cta: "Ver Torneios",
    ctaLink: "/loja",
    image: "/esports-tournament-battle.jpg",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-transparent to-transparent" />
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />

          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center md:items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl space-y-8 animate-fade-in">
                {/* Badge */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-1 w-8 bg-gradient-to-r from-yellow-400 to-yellow-600" />
                  <Flame className="h-6 w-6 text-yellow-400 animate-pulse" />
                  <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">
                    Play Cup - Campeonato
                  </span>
                </div>

                {/* Title with animation */}
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-tight tracking-tight">
                    <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg animate-title-glow">
                      {slide.title.split(" ").map((word, i) => (
                        <span key={i} className="inline-block mr-3" style={{ animationDelay: `${i * 0.1}s` }}>
                          {word}
                        </span>
                      ))}
                    </span>
                  </h1>
                </div>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl animate-fade-in-delayed font-light">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href={slide.ctaLink}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-lg h-16 px-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link href="/#regras">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-lg h-16 px-10 bg-white/5 border-2 border-yellow-400/50 text-white hover:bg-white/10 hover:border-yellow-400 font-bold transition-all backdrop-blur hover:scale-105 active:scale-95"
                    >
                      Ver Regras
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 group shadow-lg"
      >
        <ChevronLeft className="h-7 w-7 text-white group-hover:text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 group shadow-lg"
      >
        <ChevronRight className="h-7 w-7 text-white group-hover:text-black" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoPlay(false)
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/50"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-10 right-6 z-30 text-white/60 font-semibold text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  )
}
