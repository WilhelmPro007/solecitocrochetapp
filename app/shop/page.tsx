'use client';

import { useEffect, useRef, Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import CategoryHero from '@/components/CategoryHero/CategoryHero';
import Sidebar from '@/components/Sidebar/Sidebar';
import ProductCard from '@/components/ProductCard/ProductCard';
import MainFooter from '@/components/Footer/MainFooter';
import { useInfiniteProducts, useCategories } from '@/hooks/use-catalog';
import { Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, Category } from '@/types/api';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category') || undefined;
  const searchQuery = searchParams.get('q') || undefined;
  
  const { data: categories } = useCategories();
  
  const { 
    products: rawProducts, 
    loading, 
    error, 
    hasMore, 
    loadMore, 
    total 
  } = useInfiniteProducts(8, activeCategory, searchQuery);
  
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Ensure unique products by ID to avoid key duplication warnings
  const products = rawProducts.filter((p, index, self) => 
    index === self.findIndex((t) => t.id === p.id)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  const handleCategorySelect = (categoryId: string) => {
    if (activeCategory === categoryId) {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?category=${categoryId}`, { scroll: false });
    }
  };

  const getPageTitle = () => {
    if (searchQuery) return `Resultados para: "${searchQuery}"`;
    if (activeCategory) {
      const category = categories?.find((c: Category) => c.id === activeCategory);
      return `Categoría: ${category?.name || 'Cargando...'}`;
    }
    return 'Catálogo Solecito';
  };

  return (
    <main className="max-w-[1500px] mx-auto px-4 md:px-8 py-10">
      {/* Shop Info Header */}
      <div className="mb-10 pl-1 border-b border-border pb-6 flex justify-between items-end">
        <div>
          <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter text-[#111111]">
            {getPageTitle()}
          </h2>
          <p className="font-sans text-muted text-xs font-bold tracking-widest uppercase mt-2">
            {total} Artículos **Hechos a Mano**
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#111111]">
          <span className="opacity-50">Ordenar Por:</span>
          <span className="border-b-2 border-primary pb-1">Más Vendidos</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Area */}
        <Sidebar 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategorySelect} 
        />

        {/* Product Grid Area */}
        <div className="flex-1 w-full relative">
          {error ? (
            <div className="py-20 text-center">
              <p className="text-red-500 font-bold">Error al cargar los productos. Por favor, intenta de nuevo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div 
              ref={loadMoreRef} 
              className="mt-16 text-center pt-8 pb-4 h-24 flex items-center justify-center font-display font-bold text-xs tracking-[0.2em] uppercase text-muted"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Cargando más...</span>
                </div>
              ) : (
                <span>Desliza para ver más</span>
              )}
            </div>
          )}
          
          {/* Loading initial state */}
          {loading && products.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}

          {/* No items state */}
          {!loading && products.length === 0 && !error && (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="font-bold uppercase tracking-widest text-gray-400">No se encontraron productos.</p>
            </div>
          )}
          
          {/* No More Items Indicator */}
          {!hasMore && products.length > 0 && (
            <div className="mt-16 text-center pt-8 border-t border-border flex items-center justify-center font-display font-bold text-xs tracking-[0.2em] uppercase text-muted">
              Has llegado al final del catálogo
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <CategoryHero />
      
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      }>
        <ShopContent />
      </Suspense>

      <MainFooter />
    </div>
  );
}
