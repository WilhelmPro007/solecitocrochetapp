import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/api';
import { Heart, MessageCircle } from 'lucide-react';
import { getProductImageSrc } from '@/lib/image-utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.primaryImage;
  const productPrice = product.price;
  const imageSrc = getProductImageSrc(primaryImage);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50588888888';
    const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.slug}` : '';
    const message = encodeURIComponent(`¡Hola! Me interesa este producto hecho a mano:\n\n*${product.name}*\nPrecio: $${productPrice.toFixed(2)}\nLink: ${productUrl}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <article className="group bg-transparent flex flex-col h-full relative">
      {/* Image Container - Sanrio style gray box */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#eee9e1] block rounded-[2px]">
        <Image 
          src={imageSrc} 
          alt={primaryImage?.altText || product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover group-hover:scale-[1.035] transition-transform duration-700 ease-out"
        />
        
        {/* Heart Icon (Top Right) */}
        <button aria-label={`Guardar ${product.name}`} className="absolute top-3 right-3 z-10 w-9 h-9 grid place-items-center rounded-full bg-white/85 backdrop-blur opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
           <Heart className="w-4 h-4 text-foreground hover:fill-primary hover:text-primary transition-all" />
        </button>
      </Link>

      {/* Info Section */}
      <div className="pt-4 pb-2 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`} className="block mb-3">
          <h3 className="font-display text-lg md:text-xl leading-[1.05] font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 min-h-10">
            {product.name}
          </h3>
        </Link>
        
        {/* Sanrio Style Combined Action Bar */}
        <div className="mt-auto flex border-t border-foreground/20 transition-colors group-hover:border-primary/50">
           <div className="flex-[0.7] px-2 py-3 text-[11px] font-semibold flex items-center justify-start tracking-wide">
             ${productPrice.toFixed(2)}
           </div>
           
           <button 
             onClick={handleWhatsApp}
             className="flex-1 py-3 text-foreground hover:text-primary transition-colors flex items-center justify-end gap-2 group/wa active:scale-[0.98]"
             title="Pedir por WhatsApp"
           >
             <MessageCircle className="w-3.5 h-3.5" />
             <span className="text-[9px] font-semibold uppercase tracking-[0.12em] leading-none">Consultar</span>
           </button>
        </div>
      </div>
    </article>
  );
}
