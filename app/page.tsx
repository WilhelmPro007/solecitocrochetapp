'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import MainFooter from '@/components/Footer/MainFooter';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useProducts, useCategories } from '@/hooks/use-catalog';
import { ChevronRight, ArrowRight, Heart, Loader2 } from 'lucide-react';
import ProductSkeleton from '@/components/ProductCard/ProductSkeleton';

export default function LandingPage() {
  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);

  // No default category, show all products initially


  const { data: productsData, loading: productsLoading } = useProducts(5, 0, activeCategorySlug || undefined);

  const allProducts = Array.isArray(productsData?.data) ? productsData.data : [];
  const products = allProducts.filter((p, index, self) =>
    index === self.findIndex((t) => t.id === p.id)
  );

  const allCategories = Array.isArray(categoriesData) ? categoriesData : [];
  const categories = allCategories.filter((c, index, self) =>
    index === self.findIndex((t) => t.id === c.id)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      <section className="relative min-h-[78svh] md:min-h-[82vh] flex items-end md:items-center overflow-hidden bg-[#302a27]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/ramo-tulipanes.jpeg"
            alt="Ramo de tulipanes tejido a mano"
            fill
            className="object-cover object-[62%_center] md:object-center hero-drift"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211d1a]/95 via-[#211d1a]/25 to-transparent md:bg-gradient-to-r md:from-[#211d1a]/90 md:via-[#211d1a]/45 md:to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10 w-full pb-10 md:pb-0">
          <div className="max-w-xl text-left text-white">
            <div className="reveal-up inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 mb-5 md:mb-7">
              <Heart className="w-3 h-3" />
              Piezas para celebrar lo nuestro
            </div>
            <h1 className="reveal-up reveal-delay-1 font-display font-medium text-[2.85rem] md:text-7xl lg:text-[5.4rem] text-white leading-[.88] tracking-[-.045em] mb-6">
              Regalos que dicen<br />
              <span className="italic text-[#e4c3b1]">lo que sientes.</span>
            </h1>
            <p className="reveal-up reveal-delay-2 text-sm md:text-base font-normal text-white/75 max-w-md mb-8 md:mb-10 leading-relaxed">
              Detalles tejidos a mano para aniversarios, fechas especiales y esos pequeños momentos que merecen quedarse para siempre.
            </p>
            <div className="reveal-up reveal-delay-2 flex flex-row gap-3 justify-start">
              <Link
                href="/shop"
                className="px-6 md:px-9 py-3.5 bg-white text-foreground text-[9px] font-semibold uppercase tracking-[0.18em] hover:bg-[#e4c3b1] transition-colors flex items-center justify-center gap-3"
              >
                Ver colección
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-5 md:px-8 py-3.5 text-white text-[9px] font-semibold uppercase tracking-[0.18em] border border-white/35 hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Sobre Nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#2d2926] py-3.5 border-y border-white/10 relative overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee text-[#eee6dd] text-[9px] md:text-[10px] font-medium uppercase tracking-[0.28em] gap-20">
          <span>Tejido a mano &nbsp; · &nbsp; Diseñado para regalar &nbsp; · &nbsp; Piezas con intención &nbsp; · &nbsp; Hecho en Nicaragua &nbsp; · &nbsp;</span>
          <span>Tejido a mano &nbsp; · &nbsp; Diseñado para regalar &nbsp; · &nbsp; Piezas con intención &nbsp; · &nbsp; Hecho en Nicaragua &nbsp; · &nbsp;</span>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[9px] font-semibold uppercase tracking-[0.26em] text-primary">Encuentra su detalle</span>
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-[-.035em] text-foreground mt-3 mb-3">
            Elige cómo <span className="italic text-primary">sorprender</span>
          </h2>
          <p className="text-xs md:text-sm font-normal text-muted">
            Una pieza especial para cada forma de querer.
          </p>
        </div>

        {categoriesLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-14 md:mb-20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategorySlug(activeCategorySlug === cat.slug ? null : cat.slug)}
                className={`group relative aspect-[16/10] md:aspect-[4/3] overflow-hidden transition-all duration-500 ${activeCategorySlug === cat.slug ? 'ring-1 ring-primary ring-offset-4 ring-offset-background' : ''
                  }`}
              >
                <Image
                  src={cat.slug === 'ramos' ? '/images/products/ramo-girasoles.jpeg' : cat.slug === 'hogar' ? '/images/products/manta-ramo.jpeg' : cat.slug === 'personalizados' ? '/images/products/muneco-personalizado.jpeg' : '/images/products/candy-amigurumi.jpeg'}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeCategorySlug === cat.slug ? 'bg-primary/15' : 'bg-gradient-to-t from-black/55 via-transparent to-transparent'
                  }`} />
                <div className="absolute inset-0 flex items-end justify-start p-3 md:p-5 text-left">
                  <h3 className="font-display text-xl md:text-3xl font-semibold text-white leading-none drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Product Row */}
        <div className="relative min-h-[460px]">
          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(5)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
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
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground border-b border-primary pb-1.5 hover:text-primary transition-colors group"
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
          animation: marquee 34s linear infinite;
        }
      `}</style>
    </div>
  );
}
