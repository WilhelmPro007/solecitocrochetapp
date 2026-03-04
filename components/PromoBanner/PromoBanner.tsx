import Image from 'next/image';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function PromoBanner({ title, subtitle, imageUrl }: PromoBannerProps) {
  return (
    <div className="relative group w-full h-full min-h-[400px] flex flex-col justify-end overflow-hidden border border-border rounded-sm shadow-sm cursor-pointer">
      <div className="absolute inset-0 z-0">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            unoptimized
          />
          {/* Subtle gradient overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
      </div>
      
      <div className="relative z-20 p-6 text-center w-full transform group-hover:-translate-y-2 transition-transform duration-300">
        <h2 className="font-display font-bold text-2xl mb-1 text-foreground tracking-tight group-hover:text-secondary transition-colors">
          {title}
        </h2>
        <p className="font-sans text-sm font-semibold tracking-widest uppercase text-foreground/80">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
