'use client';

import Navbar from '@/components/Navbar/Navbar';
import MainFooter from '@/components/Footer/MainFooter';
import Image from 'next/image';
import { Heart, Sparkles, Smile, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-[#fdf2f8] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter text-[#111111] leading-none mb-8">
              Puntadas que cuentan <br />
              <span className="text-primary italic">Historias</span>
            </h1>
            <p className="text-xl font-medium text-gray-500 max-w-xl uppercase tracking-widest leading-relaxed">
              En Solecito Crochet, creemos que lo hecho a mano tiene una magia única que conecta corazones.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Story Section */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square bg-[#f7f7f7] overflow-hidden">
             <Image 
               src="https://placehold.co/1000x1000/ffdef1/ffffff?text=%F0%9F%A7%B6" 
               alt="Proceso Artesanal"
               fill
               className="object-cover Mix-blend-multiply p-20"
             />
          </div>
          <div className="space-y-8">
            <div className="inline-block px-3 py-1.5 bg-[#f0f9ff] text-primary text-[10px] font-black uppercase tracking-widest">
               Nuestra Esencia
            </div>
            <h2 className="text-3xl font-bold text-[#111111] leading-tight">
              Diseñamos con amor, <br />tejemos con dedicación.
            </h2>
            <div className="space-y-6 text-base text-gray-600 font-medium leading-relaxed">
              <p>
                Solecito Crochet nació de la pasión por crear piezas que no solo fueran objetos, sino compañeros. Cada amigurumi que sale de nuestras manos lleva consigo horas de trabajo, atención al detalle y, lo más importante, mucho cariño.
              </p>
              <p>
                Utilizamos solo los mejores materiales, enfocándonos en hilos de algodón hipoalergénicos y suaves al tacto, asegurando que cada pieza sea segura y duradera para todas las edades.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
               <div className="flex flex-col gap-3">
                  <Heart className="w-6 h-6 text-primary" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#111111]">100% Hecho a Mano</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sin máquinas, solo talento y paciencia.</p>
               </div>
               <div className="flex flex-col gap-3">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#111111]">Calidad Premium</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Materiales seleccionados cuidadosamente.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#f9f9f9] py-24 px-8">
        <div className="max-w-[1400px] mx-auto text-center mb-16">
           <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-4">Lo que nos impulsa</h3>
           <h2 className="text-4xl font-bold text-[#111111]">Nuestros Valores</h2>
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
           <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 shadow-sm">
                 <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#111111] mb-4 text-center">Creatividad sin límites</h4>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest leading-loose text-center">
                Buscamos siempre innovar en diseños para traerte piezas únicas y maravillosas.
              </p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 shadow-sm">
                 <Smile className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#111111] mb-4 text-center">Felicidad Compartida</h4>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest leading-loose text-center">
                Nuestra meta es que al recibir tu pedido, sientas la misma alegría que nosotros al crearlo.
              </p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white flex items-center justify-center mb-6 shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                 </div>
              </div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#111111] mb-4 text-center">Atención al Detalle</h4>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest leading-loose text-center">
                Cada punto cuenta. Nos obsesionamos con la perfección en cada acabado.
              </p>
           </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
