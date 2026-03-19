'use client';

import { useEffect, useRef, Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar';
// import CategoryHero from '@/components/CategoryHero/CategoryHero';
import Sidebar from '@/components/Sidebar/Sidebar';
import ProductCard from '@/components/ProductCard/ProductCard';
import MainFooter from '@/components/Footer/MainFooter';
import { useInfiniteProducts, useCategories } from '@/hooks/use-catalog';
import { Loader2, ChevronDown, ArrowUp, ArrowDown, Filter, X } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, Category } from '@/types/api';
import { useState } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category') || undefined;
  const searchQuery = searchParams.get('q') || undefined;
  const activeSort = searchParams.get('sort') || 'createdAt:desc';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const { data: categories } = useCategories();

  const {
    products: rawProducts,
    loading,
    error,
    hasMore,
    loadMore,
    total
  } = useInfiniteProducts(8, activeCategory, searchQuery, activeSort);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Ensure unique products by ID to avoid key duplication warnings
  const products = rawProducts.filter((p, index, self) =>
    index === self.findIndex((t) => t.id === p.id)
  );

  useEffect(() => {
    // Only observe if we have products (prevent loop on empty state) and no menus are open
    if (isCategoryDropdownOpen || isSortDropdownOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && products.length > 0) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Added rootMargin for smoother loading
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore, products.length, isCategoryDropdownOpen, isSortDropdownOpen]);


  const handleCategorySelect = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
    setIsSidebarOpen(false); // Close sidebar on selection
    setIsCategoryDropdownOpen(false); // Close mobile dropdown
    setIsSortDropdownOpen(false);
  };

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortValue);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  const sortOptions = [
    { label: 'Más Recientes', value: 'createdAt:desc', icon: <ArrowDown className="w-3 h-3" /> },
    { label: 'Más Antiguos', value: 'createdAt:asc', icon: <ArrowUp className="w-3 h-3" /> },
    { label: 'Precio: Menor a Mayor', value: 'price:asc', icon: <ArrowUp className="w-3 h-3" /> },
    { label: 'Precio: Mayor a Menor', value: 'price:desc', icon: <ArrowDown className="w-3 h-3" /> },
  ];

  const currentSort = sortOptions.find(opt => opt.value === activeSort) || sortOptions[0];

  const getPageTitle = () => {
    if (searchQuery) return `Resultados para: "${searchQuery}"`;
    if (activeCategory) {
      const category = categories?.find((c: Category) => c.slug === activeCategory);
      return `Categoría: ${category?.name || 'Cargando...'}`;
    }
    return 'Catálogo Solecito';
  };

  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Search Bar - Stylized (Desktop only, mobile is in Navbar) */}
      
      {/* Shop Info Header - Mobile Optimized Redesign */}
      <div className="mb-10 pl-1 border-b border-border pb-8">
        {/* Desktop Header Layout */}
        <div className="hidden md:flex justify-between items-end">
          <div>
            <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-[#111111]">
              {getPageTitle()}
            </h2>
            <p className="font-sans text-muted text-xs font-bold tracking-widest uppercase mt-2">
              {total} Artículos **Hechos a Mano**
            </p>
          </div>

          <div className="relative group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#111111] cursor-pointer">
            <span className="opacity-50">Ordenar Por:</span>
            <div className="flex items-center gap-1 border-b-2 border-primary pb-1 transition-colors hover:text-primary">
              <span>{currentSort.label}</span>
              <ChevronDown className="w-3 h-3" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`px-4 py-3 flex items-center justify-between hover:bg-[#fdf2f8] transition-colors ${activeSort === option.value ? 'text-primary' : 'text-[#111111]'
                    }`}
                >
                  <span className="text-[10px] font-black tracking-widest uppercase">{option.label}</span>
                  {option.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Header Layout */}
        <div className="md:hidden flex flex-col items-center text-center space-y-6">
          <div className="space-y-1">
            <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-[#111111]">
              {getPageTitle()}
            </h2>
            <p className="font-sans text-muted text-[10px] font-black tracking-[0.2em] uppercase">
              {total} Artículos
            </p>
          </div>

          <div className="w-full flex gap-3 relative">
            {/* Category Toggle */}
            <div className="flex-1">
              <button 
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsSortDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isCategoryDropdownOpen ? 'bg-primary text-white shadow-lg scale-95' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                Filtrar por
              </button>
            </div>

            {/* Sort Toggle */}
            <div className="flex-1">
              <button 
                onClick={() => {
                  setIsSortDropdownOpen(!isSortDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isSortDropdownOpen ? 'bg-[#111111] text-white shadow-lg scale-95' : 'bg-gray-100 text-[#111111] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                Ordenar
              </button>
            </div>

            {/* Downward Dropdowns */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] p-4 max-h-[60vh] overflow-y-auto animate-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCategorySelect('')}
                    className={`px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-left transition-colors ${!activeCategory ? 'bg-primary text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    Todo
                  </button>
                  {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-left transition-colors ${activeCategory === cat.slug ? 'bg-primary text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSortDropdownOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in slide-in-from-top-2 duration-300">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      handleSortChange(option.value);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full px-5 py-4 flex items-center justify-between text-left border-b border-gray-50 last:border-0 transition-colors ${activeSort === option.value ? 'bg-primary/5 text-primary' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="text-[10px] font-black tracking-widest uppercase">{option.label}</span>
                    {option.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Overlay (Mobile) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[100] md:hidden animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Drawer (Mobile) / Sidebar Column (Desktop) */}
        <div className={`
          fixed md:relative top-0 left-0 h-full md:h-auto w-[80%] md:w-64 bg-white z-[101] md:z-0
          transition-transform duration-300 transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          p-6 md:p-0 border-r border-border md:border-none shadow-2xl md:shadow-none
        `}>
          <div className="flex justify-between items-center mb-10 md:hidden">
            <span className="text-[10px] font-black uppercase tracking-widest">Filtros</span>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <Sidebar
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 w-full relative">
          {error ? (
            <div className="py-20 text-center">
              <p className="text-red-500 font-bold text-xs uppercase tracking-widest">Error al cargar los productos. Por favor, intenta de nuevo.</p>
            </div>
          ) : (
            <>
              {/* Grid content */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

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
              {!loading && products.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl w-full">
                  <p className="font-bold uppercase tracking-widest text-gray-400">No se encontraron productos.</p>
                </div>
              )}
            </>
          )}


          {/* No More Items Indicator */}
          {!hasMore && products.length > 0 && (
            <div className="mt-16 text-center pt-8 border-t border-border flex items-center justify-center font-display font-bold text-xs tracking-[0.2em] uppercase text-muted md:pb-0">
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
      {/* <CategoryHero /> */}

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
