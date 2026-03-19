'use client';

import { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/use-catalog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { createQueryString } from '@/lib/url-utils';

function NavbarContent() {
  const { data: categories, loading } = useCategories();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchQuery, 600);
  const router = useRouter();
  const isManualChange = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on navigation or outside click
  useEffect(() => {
    setIsMenuOpen(false);
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Update searchQuery if query params change externally
  useEffect(() => {
    const query = searchParams.get('q') || '';
    if (query !== searchQuery) {
      isManualChange.current = false;
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Navigate on debounced search
  useEffect(() => {
    // Only navigate if the user actually typed something in THIS component
    if (isManualChange.current && debouncedSearch !== initialSearch) {
      const queryString = createQueryString(
        { q: debouncedSearch.trim() || null },
        searchParams.toString()
      );

      const url = `/shop${queryString ? `?${queryString}` : ''}`;
      router.push(url, { scroll: false });

      // Reset after push
      isManualChange.current = false;
    }
  }, [debouncedSearch, initialSearch, router, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = createQueryString(
      { q: searchQuery.trim() || null },
      searchParams.toString()
    );

    const url = `/shop${queryString ? `?${queryString}` : ''}`;
    router.push(url, { scroll: false });
    setIsMenuOpen(false); // Close menu on search
    isManualChange.current = false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">

      {/* Main Nav */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center py-4 md:py-6">
          <div className="w-full flex items-center justify-between md:justify-center relative">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-[#111111]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo - Sanrio Style */}
            <Link href="/" className="md:mb-6">
              <span className="font-display font-black text-2xl md:text-3xl tracking-tighter uppercase text-[#111111]">
                Solecito<span className="text-primary italic">Crochet</span>
              </span>
            </Link>

            {/* Mobile Search Icon / Empty Space for Balance */}
            <div className="md:hidden w-10" />
          </div>

          <div className="hidden md:flex flex-wrap justify-center items-center gap-x-8 gap-y-4 font-black text-[10px] text-[#111111] tracking-[0.2em] uppercase">
            <Link href="/" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">Inicio</Link>
            <Link href="/shop" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">Catálogo</Link>
            <Link href="/about" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">Sobre Nosotros</Link>

            <form onSubmit={handleSearch} className="relative flex items-center ml-4 group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  isManualChange.current = true;
                  setSearchQuery(e.target.value);
                }}
                placeholder="¿Qué estás buscando?"
                className="bg-white/80 backdrop-blur-sm border border-gray-200 pl-4 pr-10 py-2 text-[9px] font-bold w-[250px] rounded-full focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm group-hover:shadow-md"
              />
              <button type="submit" className="absolute right-3 p-1 hover:text-primary transition-colors">
                <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary" />
              </button>
            </form>
          </div>

          {/* Persistent Mobile Search (Only on Mobile) */}
          <div className="md:hidden w-full mt-4 px-2">
            <form onSubmit={handleSearch} className="relative flex items-center w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  isManualChange.current = true;
                  setSearchQuery(e.target.value);
                }}
                placeholder="¿Qué estás buscando?"
                className="w-full bg-white border border-gray-100 pl-5 pr-12 py-3.5 text-[11px] font-bold rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-lg shadow-black/5"
              />
              <button type="submit" className="absolute right-3 p-2.5 bg-primary text-white rounded-xl shadow-md active:scale-95 transition-transform">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50 animate-in slide-in-from-top duration-300" ref={menuRef}>
          <div className="flex flex-col p-6 space-y-6">
            <nav className="flex flex-col space-y-6">
              <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] border-b border-gray-50 pb-4">Inicio</Link>
              <Link href="/shop" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] border-b border-gray-50 pb-4">Catálogo</Link>
              <Link href="/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] border-b border-gray-50 pb-4">Sobre Nosotros</Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-32 bg-white w-full shadow-sm" />}>
      <NavbarContent />
    </Suspense>
  );
}
