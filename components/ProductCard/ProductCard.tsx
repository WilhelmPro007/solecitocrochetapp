import Link from 'next/link';
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
        
        {/* Sanrio Style Combined Button/Price */}
        <div className="mt-auto border border-[#111111] flex overflow-hidden">
           <div className="flex-1 px-2 py-2 text-[10px] font-black flex items-center justify-center border-r border-[#111111]">
             ${productPrice.toFixed(2)}
           </div>
           
           <button 
             onClick={handleWhatsApp}
             className="flex-1 py-2 bg-[#25D366] text-[#111111] hover:text-white transition-colors flex items-center justify-center border-r border-[#111111]"
             title="Comprar por WhatsApp"
           >
             <MessageCircle className="w-4 h-4" />
           </button>

           <Link 
             href={`/product/${product.slug}`}
             className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center"
           >
             Ver
           </Link>
        </div>
      </div>
    </div>
  );
}
