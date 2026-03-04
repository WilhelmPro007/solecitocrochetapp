'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import ProductCard from '@/components/ProductCard/ProductCard';
import { mockProducts } from '@/lib/data';

export default function Home() {
  const [displayedCount, setDisplayedCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < mockProducts.length && !isLoading) {
          setIsLoading(true);
          // Simulate network request
          setTimeout(() => {
            setDisplayedCount((prev) => Math.min(prev + 4, mockProducts.length));
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayedCount, isLoading]);

  const displayedProducts = mockProducts.slice(0, displayedCount);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 pl-1">
          <h1 className="font-display font-bold text-3xl md:text-[40px] leading-tight text-foreground uppercase tracking-tight">
            Shop Solecito
          </h1>
          <p className="font-sans text-muted text-sm font-medium tracking-wide mt-1">
            {mockProducts.length} Results
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Sidebar Area */}
          <Sidebar />

          {/* Product Grid Area */}
          <div className="flex-1 w-full relative">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Infinite Scroll Trigger */}
            {displayedCount < mockProducts.length && (
              <div 
                ref={loadMoreRef} 
                className="mt-16 text-center pt-8 pb-4 h-24 flex items-center justify-center font-display font-bold text-xs tracking-[0.2em] uppercase text-muted"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-secondary border-t-primary rounded-full animate-spin"></div>
                    <span>Loading more...</span>
                  </div>
                ) : (
                  <span>Scroll for more</span>
                )}
              </div>
            )}
            
            {/* No More Items Indicator */}
            {displayedCount >= mockProducts.length && (
              <div className="mt-16 text-center pt-8 border-t border-border flex items-center justify-center font-display font-bold text-xs tracking-[0.2em] uppercase text-muted">
                {/* User requested "y si llega al final pers que no diga nada", so we can just leave it empty or remove the text entirely. I'll just render nothing or an empty div. */}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="mt-12 border-t border-border py-12 text-center flex flex-col items-center gap-4 bg-surface shadow-inner">
        <div className="font-display font-bold text-xl text-foreground flex items-center gap-2 group cursor-pointer">
           <span className="text-2xl group-hover:rotate-180 transition-transform duration-700">🌞</span> 
           Solecito<span className="text-secondary">Crochet</span>
        </div>
        <p className="text-muted font-sans text-xs tracking-wider uppercase font-semibold">
          © {new Date().getFullYear()} Solecito Crochet. Handmade with Love.
        </p>
      </footer>
    </div>
  );
}
