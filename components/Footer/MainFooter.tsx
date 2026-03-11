'use client';

import { Instagram, Twitter, Youtube,  } from 'lucide-react';
import Link from 'next/link';
export default function MainFooter() {
  return (
    <footer className="w-full bg-[#fdfdfd] mt-20">
      

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Column 1 */}
          <div className="col-span-1">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] mb-6 shadow-text">Mundo Solecito</h4>
             <ul className="space-y-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
               <li><Link href="/shop" className="hover:text-primary transition-colors">Tienda</Link></li>
               <li><Link href="#" className="hover:text-primary transition-colors">Personajes</Link></li>
               <li><Link href="#" className="hover:text-primary transition-colors">Favoritos</Link></li>
             </ul>
          </div>
          
          {/* Social Icons Column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start order-first lg:order-none mb-12 lg:mb-0">
             <div className="flex gap-4 mb-6">
                <Instagram className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors" />
                <Youtube className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors" />
             </div>
             <p className="text-[9px] font-bold text-gray-400 text-center lg:text-left tracking-widest uppercase">
               © {new Date().getFullYear()} SOLECITO CROCHET. TODOS LOS DERECHOS RESERVADOS.
             </p>
          </div>
        </div>
      </div>

      
    </footer>
  );
}
