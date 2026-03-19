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
    <div className="group bg-white flex flex-col h-full transition-all duration-300 relative border border-transparent hover:border-gray-100">
      {/* Image Container - Sanrio style gray box */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#f7f7f7] block">
        <Image 
          src={imageSrc} 
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
        
        {/* Sanrio Style Combined Action Bar */}
        <div className="mt-auto flex border border-[#111111] bg-white overflow-hidden rounded-sm transition-all shadow-sm hover:shadow-md">
           <div className="flex-[0.7] px-3 py-2.5 text-[11px] font-black flex items-center justify-center border-r border-[#111111] tracking-tighter">
             ${productPrice.toFixed(2)}
           </div>
           
           <button 
             onClick={handleWhatsApp}
             className="flex-1 py-2.5 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 group/wa active:scale-[0.98]"
             title="Pedir por WhatsApp"
           >
             <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
             <span className="text-[9px] font-black uppercase tracking-widest leading-none">WhatsApp</span>
           </button>
        </div>
      </div>
    </div>
  );
}
