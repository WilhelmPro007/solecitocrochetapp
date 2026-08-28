'use client';

import { Instagram } from 'lucide-react';
import Link from 'next/link';
export default function MainFooter() {
  return (
    <footer className="w-full bg-[#2d2926] text-[#f8f5ef]">


      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Column 1 */}
          <div className="col-span-1">
            <h4 className="font-display text-2xl font-semibold mb-5">Solecito Crochet</h4>
            <ul className="space-y-3 text-[9px] font-medium text-white/55 uppercase tracking-[.16em]">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Tienda</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Personajes</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Favoritos</Link></li>
            </ul>
          </div>

          {/* Social Icons Column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start order-first lg:order-none mb-12 lg:mb-0">
            <div className="flex gap-4 mb-6">
              <Instagram className="w-5 h-5 text-white/60 cursor-pointer hover:text-secondary transition-colors" />
            </div>
            <p className="text-[8px] font-medium text-white/40 text-center lg:text-left tracking-[.14em] uppercase leading-relaxed">
              © {new Date().getFullYear()} SOLECITO CROCHET. TODOS LOS DERECHOS RESERVADOS.
            </p>
          </div>
        </div>
      </div>


    </footer>
  );
}
