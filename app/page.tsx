'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import MainFooter from '@/components/Footer/MainFooter';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useProducts, useCategories } from '@/hooks/use-catalog';
import { ChevronRight, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export default function LandingPage() {
  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  // Set default category once categories are loaded
  useEffect(() => {
    if (categoriesData && categoriesData.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categoriesData[0].id);
    }
  }, [categoriesData, activeCategoryId]);

  const { data: productsData, loading: productsLoading } = useProducts(5, 0, activeCategoryId || undefined);

  const allProducts = Array.isArray(productsData?.data) ? productsData.data : [];
  const products = allProducts.filter((p, index, self) => 
    index === self.findIndex((t) => t.id === p.id)
  );

  const allCategories = Array.isArray(categoriesData) ? categoriesData : [];
  const categories = allCategories.filter((c, index, self) => 
    index === self.findIndex((t) => t.id === c.id)
  );

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero Section - Sanrio Style */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-[#fdf2f8]">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://placehold.co/1920x1080/fdfdfd/eeeeee?text=Hero+Background+Image" 
             alt="Hero Background"
             fill
             className="object-cover opacity-50"
             priority
           />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full flex justify-start">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] mb-8 shadow-sm">
              <Sparkles className="w-3 h-3 text-primary" />
              ¡Explora lo más Kawaii!
            </div>
            <h1 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-[#111111] leading-tight mb-8">
              Creaciones Únicas <br />
              <span className="font-black text-primary">Hechas a Mano</span>
            </h1>
            <p className="text-base md:text-lg font-medium text-gray-500 max-w-md mb-12 uppercase tracking-widest leading-relaxed">
              Descubre nuestra colección exclusiva de amigurumis y accesorios diseñados con amor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Link 
                href="/shop" 
                className="px-12 py-4 bg-[#111111] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all flex items-center justify-center gap-3 border border-[#111111]"
              >
                Comprar Todo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/about" 
                className="px-12 py-4 bg-white text-[#111111] text-[10px] font-black uppercase tracking-[0.3em] border border-[#111111] hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Sobre Nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-[#111111] py-6 border-y-2 border-[#111111] relative overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee text-white text-xl md:text-2xl font-black uppercase tracking-[0.3em] gap-20">
          <span>Solecito Crochet &nbsp; • &nbsp; Hecho a Mano con Amor &nbsp; • &nbsp; Calidad Premium &nbsp; • &nbsp; Diseños Kawaii &nbsp; • &nbsp; Edición Limitada &nbsp; • &nbsp;</span>
          <span>Solecito Crochet &nbsp; • &nbsp; Hecho a Mano con Amor &nbsp; • &nbsp; Calidad Premium &nbsp; • &nbsp; Diseños Kawaii &nbsp; • &nbsp; Edición Limitada &nbsp; • &nbsp;</span>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter text-[#111111] mb-4">
            Compra por <span className="text-primary">Estilo</span>
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest text-[#111111]/50">
            Selecciona una categoría para ver nuestros favoritos del momento.
          </p>
        </div>

        {categoriesLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategoryId(cat.id)}
                className={`group relative aspect-[16/10] md:aspect-[4/3] overflow-hidden transition-all duration-300 ${
                  activeCategoryId === cat.id ? 'ring-2 ring-primary ring-offset-4 shadow-xl' : 'border border-gray-100'
                }`}
              >
                <Image 
                  src={`https://placehold.co/600x800/f7f7f7/cccccc?text=${cat.name}`} 
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 Mix-blend-multiply"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  activeCategoryId === cat.id ? 'bg-primary/5' : 'bg-black/5 group-hover:bg-black/0'
                }`} />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#111111] uppercase tracking-tighter leading-none mb-2 drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Product Row */}
        <div className="relative min-h-[400px]">
          {productsLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                  <p className="font-bold uppercase tracking-widest text-gray-400">No hay productos en esta categoría por ahora.</p>
                </div>
              )}
            </>
          )}
          
          <div className="mt-16 text-center">
             <Link 
               href="/shop" 
               className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#111111] border-b-2 border-primary pb-1 hover:text-primary transition-colors group"
             >
               Ver toda la tienda
               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      <MainFooter />

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
