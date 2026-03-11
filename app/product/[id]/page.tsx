'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import MainFooter from '@/components/Footer/MainFooter';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useProduct, useProductsByCategory } from '@/hooks/use-catalog';
import { ChevronRight, Loader2, Share2, Heart, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const { data: product, loading: productLoading } = useProduct(slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mainCategoryId = product?.categories?.[0]?.id;
  const { data: relatedData } = useProductsByCategory(mainCategoryId || '');
  const relatedProducts = Array.isArray(relatedData?.data)
    ? relatedData.data.filter(p => p.id !== product?.id).slice(0, 4)
    : [];

  const handleWhatsApp = () => {
    if (!product) return;
    const message = encodeURIComponent(`¡Hola! Me interesa este producto hecho a mano:\n\n*${product.name}*\nPrecio: $${parseFloat(product.price).toFixed(2)}\nLink: ${window.location.href}`);
    window.open(`https://wa.me/521234567890?text=${message}`, '_blank');
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
        <h1 className="text-2xl font-black mb-4 uppercase text-[#111111]">Producto no encontrado</h1>
        <Link href="/shop" className="text-primary font-bold uppercase tracking-widest border-b-2 border-primary">Volver a la tienda</Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [{ url: 'https://placehold.co/800x800/f7f7f7/cccccc?text=Sin+Imagen', isPrimary: true }];
  const currentImage = images[selectedImageIndex] || images[0];
  const price = parseFloat(product.price);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#111111]/40 mb-10">
          <Link href="/" className="hover:text-primary">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-primary">Tienda</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111111]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square bg-[#f9f9f9] border-2 border-[#111111] overflow-hidden group">
               <Image 
                 src={currentImage.url} 
                 alt={currentImage.altText || product?.name || 'Imagen del producto'}
                 fill
                 className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                 priority
               />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative aspect-square border-2 transition-all ${
                    selectedImageIndex === i ? 'border-primary shadow-[4px_4px_0px_#ff5ebc]' : 'border-[#111111] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt={`Thumbnail ${i}`} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#111111] mb-2 leading-tight uppercase tracking-tight">
                {product.name}
              </h1>
              <div className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-wider">
                SKU: {product.sku || 'N/A'}
              </div>
              <div className="text-xl font-bold text-[#111111] mb-8">
                ${!isNaN(price) ? price.toFixed(2) : product.price}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                 <div className="flex border border-[#111111] overflow-hidden">
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-[#111111] font-bold">-</button>
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-sm">1</div>
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-[#111111] font-bold">+</button>
                 </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleWhatsApp}
                className="w-full py-4 bg-[#111111] text-white font-black text-[11px] tracking-[0.2em] uppercase hover:bg-primary transition-all mb-4 border border-[#111111]"
              >
                Comprar por WhatsApp
              </button>

              <div className="flex items-center justify-center py-4 border-b border-gray-100 mb-8">
                 <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Garantía Solecito Crochet</span>
                 </div>
              </div>
              
              <div className="text-[11px] leading-relaxed text-[#111111] space-y-4 font-medium max-w-sm uppercase tracking-tight">
                <div dangerouslySetInnerHTML={{ __html: product.description || 'Sin descripción disponible.' }} />
                <div className="space-y-1">
                  <p>• Categoría: {product.categories?.[0]?.name || 'Hecho a mano'}</p>
                  <p>• Stock: {product.quantity || 0} unidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Tabs */}
        <div className="mt-24 border-2 border-[#111111]">
           <div className="flex border-b-2 border-[#111111]">
              <button className="px-8 py-4 bg-[#111111] text-white text-xs font-black uppercase tracking-widest">Descripción</button>
              <button className="px-8 py-4 bg-white text-[#111111] text-xs font-black uppercase tracking-widest border-r-2 border-[#111111] hover:bg-primary/10 transition-colors">Cuidados</button>
              <button className="px-8 py-4 bg-white text-[#111111] text-xs font-black uppercase tracking-widest hover:bg-primary/10 transition-colors">Envío</button>
           </div>
           <div className="p-8 lg:p-12">
              <h4 className="font-display font-black text-xl mb-6 uppercase tracking-tighter">Detalles del Tesoro</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="prose prose-sm font-medium text-[#111111]/70 leading-relaxed uppercase tracking-tight">
                   <p className="mb-4">Este artículo no es solo un producto, es un compañero creado con dedicación. Cada puntada ha sido revisada para asegurar la mayor calidad y ternura posible.</p>
                   <ul className="list-disc pl-5 space-y-2">
                     <li>Materiales de alta calidad</li>
                     <li>Relleno hipoalergénico</li>
                     <li>Lavable a mano con cuidado</li>
                     <li>Diseño 100% exclusivo</li>
                   </ul>
                 </div>
                 <div className="bg-[#fdf2f8] p-6 border-2 border-primary/20 flex flex-col items-center justify-center">
                    <p className="text-center font-display font-black text-primary uppercase text-sm leading-relaxed mb-2">
                       "Cada puntada cuenta una historia de paciencia y amor."
                    </p>
                    <div className="w-8 h-1 bg-primary/20 rounded-full" />
                 </div>
              </div>
           </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
             <div className="flex items-end justify-between mb-12 border-b-2 border-[#111111] pb-6">
                <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter">También te podría Gustar</h3>
                <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest text-[#111111] border-b-2 border-primary pb-1 hover:text-primary transition-colors">Ver Todo</Link>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
             </div>
          </section>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
