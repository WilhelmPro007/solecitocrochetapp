import Link from 'next/link';
import { Product } from '@/types/api';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = Array.isArray(product.images) 
    ? (product.images.find(img => img.isPrimary) || product.images[0])
    : undefined;
  const productPrice = parseFloat(product.price);

  return (
    <div className="group bg-white flex flex-col h-full transition-all duration-300 relative border border-transparent hover:border-gray-100">
      {/* Image Container - Sanrio style gray box */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#f7f7f7] block">
        {/* Note: Badge is not in the basic API contract but could be added later or handled via metadata if available */}
        <Image 
          src={primaryImage?.url || 'https://placehold.co/400x500/f7f7f7/cccccc?text=No+Image'} 
          alt={primaryImage?.altText || product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 Mix-blend-multiply"
        />
        
        {/* Heart Icon (Top Right) */}
        <button className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
           <Heart className="w-5 h-5 text-[#111111] hover:fill-primary hover:text-primary transition-all" />
        </button>
      </Link>

      {/* Info Section */}
      <div className="p-3 flex flex-col flex-1 bg-white">
        <Link href={`/product/${product.slug}`} className="block mb-4">
          <h3 className="text-[11px] leading-tight font-medium text-[#111111] hover:text-primary transition-colors line-clamp-2 h-8 uppercase tracking-wider">
            {product.name}
          </h3>
        </Link>
        
        {/* Sanrio Style Combined Button/Price */}
        <div className="mt-auto border border-[#111111] flex overflow-hidden">
           <div className="flex-1 px-3 py-2 text-[11px] font-black flex items-center justify-center border-r border-[#111111]">
             ${!isNaN(productPrice) ? productPrice.toFixed(2) : product.price}
           </div>
           <Link 
             href={`/product/${product.slug}`}
             className="flex-[2] py-2 text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center"
           >
             Ver Detalle
           </Link>
        </div>
      </div>
    </div>
  );
}
