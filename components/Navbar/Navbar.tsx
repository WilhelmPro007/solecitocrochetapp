'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/use-catalog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

function NavbarContent() {
  const { data: categories, loading } = useCategories();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchQuery, 600);
  const router = useRouter();

  // Update searchQuery if query params change externally
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Navigate on debounced search
  useEffect(() => {
    // Only navigate if the user actually typed something or cleared an existing search
    if (debouncedSearch !== initialSearch) {
      if (debouncedSearch.trim()) {
        router.push(`/shop?q=${encodeURIComponent(debouncedSearch.trim())}`);
      } else if (initialSearch) {
        // If they cleared the box, remove the 'q' parameter by just going to /shop
        router.push('/shop');
      }
    }
  }, [debouncedSearch, initialSearch, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      
      {/* Main Nav */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center py-6">
           {/* Logo - Sanrio Style */}
           <Link href="/" className="mb-6">
              <span className="font-display font-black text-3xl tracking-tighter uppercase text-[#111111]">
                 Solecito<span className="text-primary italic">Crochet</span>
              </span>
           </Link>

           {/* Navigation Links */}
           <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 font-black text-[10px] text-[#111111] tracking-[0.2em] uppercase">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-300" />
              ) : (
                <>
                  {Array.isArray(categories) && categories.map((cat: any) => (
                    <Link 
                      key={cat.id} 
                      href={`/shop?category=${cat.slug}`} 
                      scroll={false}
                      className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </>
              )}
              <Link href="/about" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">Sobre Nosotros</Link>
              
              <form onSubmit={handleSearch} className="relative flex items-center ml-4">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="¿Qué estás buscando?" 
                   className="bg-[#f0f9ff] border border-gray-200 pl-4 pr-10 py-1.5 text-[9px] font-bold w-[250px] focus:outline-none"
                 />
                 <button type="submit" className="absolute right-3">
                   <Search className="w-4 h-4 text-gray-400" />
                 </button>
              </form>
           </div>
        </div>
      </div>
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
