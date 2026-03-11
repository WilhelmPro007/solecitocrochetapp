'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CategoryHero() {
  return (
    <section className="w-full bg-[#ff79c6] text-white overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col items-center relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-4 drop-shadow-sm">
            KUROMI
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed opacity-95">
            Dulzura con un toque rebelde. ¡Explora nuestra colección de 
            crochet **hecho a mano** inspirado en Kuromi y más!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <Link 
            href="#" 
            className="px-8 py-3 bg-[#111111] hover:bg-white hover:text-[#111111] text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
          >
            VER TODO KUROMI
          </Link>
          <Link 
            href="#" 
            className="px-8 py-3 bg-[#111111] hover:bg-white hover:text-[#111111] text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
          >
            LO NUEVO
          </Link>
          <Link 
            href="#" 
            className="px-8 py-3 bg-[#111111] hover:bg-white hover:text-[#111111] text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-full"
          >
            MÁS VENDIDOS
          </Link>
        </div>
      </div>

      {/* Decorative Kuromi-like background illustration placement */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none">
          <span className="text-[200px] leading-none">😈</span>
      </div>
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block opacity-20 pointer-events-none">
          <span className="text-[200px] leading-none">💖</span>
      </div>
    </section>
  );
}
