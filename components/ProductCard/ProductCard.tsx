import { Product } from '@/lib/data';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col items-center bg-surface border border-border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden rounded-sm h-full w-full">
      {/* Badge container */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 w-full pr-6">
        <div className="flex justify-between items-start w-full">
            {product.badge ? (
              <span className="bg-primary text-foreground text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm shadow-sm inline-block">
                {product.badge}
              </span>
            ) : (
                <div />
            )}
            <button className="text-muted hover:text-secondary hover:scale-110 transition-all p-1 z-20">
              <Heart className="w-5 h-5 group-hover:fill-secondary/20 transition-all" />
            </button>
        </div>
      </div>
      
      {/* Image Container with Hover zoom */}
      <div className="relative w-full aspect-[4/5] bg-background mb-4 overflow-hidden border-b border-border">
          <Image 
            src={product.imageUrl.replace('placehold.co', 'placehold.co/800x1000')} // ensure high res request 
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized // Since placehold.co has issues with next/image sometimes
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
      </div>

      {/* Content */}
      <div className="px-4 pb-0 flex flex-col items-center flex-grow w-full text-center">
        <h3 className="font-sans text-sm font-medium text-foreground mb-2 px-2 line-clamp-2">
          {product.title}
        </h3>
      </div>
      
      {/* Price & Action Container (Sanrio style: action appears/slides on hover or is explicit) */}
      <div className="w-full flex justify-between items-center border-t border-border mt-auto">
          <div className="py-3 px-4 w-1/3 border-r border-border text-center">
             <span className="font-bold text-sm text-foreground/90 font-sans tracking-wide">
                ${product.price.toFixed(2)}
             </span>
          </div>
          <button className="w-2/3 py-3 font-display font-bold text-xs tracking-widest uppercase text-foreground bg-surface hover:bg-secondary/20 transition-colors h-full">
            Add to Bag
          </button>
      </div>
    </div>
  );
}
