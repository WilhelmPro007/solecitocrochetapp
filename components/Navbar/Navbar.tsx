import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left section: Nav Links */}
          <div className="flex items-center gap-4 flex-1">
            <button className="p-2 text-foreground hover:bg-secondary/50 rounded-full transition-colors lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex gap-6 font-display font-bold text-sm text-foreground/80 tracking-wide uppercase">
              <Link href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all">New</Link>
              <Link href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all">Collabs</Link>
              <Link href="#" className="hover:text-secondary hover:-translate-y-0.5 transition-all">Plush & Toys</Link>
              <Link href="#" className="text-secondary hover:text-primary hover:-translate-y-0.5 transition-all">Kawaii Spring</Link>
            </div>
          </div>

          {/* Center section: Logo */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight group flex items-center gap-2">
              <span className="text-primary group-hover:rotate-12 transition-transform duration-300">🌞</span> 
              Solecito<span className="text-secondary">Crochet</span>
            </Link>
          </div>

          {/* Right section: Search & Actions */}
          <div className="flex items-center justify-end gap-2 flex-1">
            <div className="hidden xl:flex relative group">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="pl-4 pr-10 py-2 w-72 bg-surface border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all font-sans"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-foreground">
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <button className="p-2 text-foreground hover:bg-secondary/50 rounded-full transition-colors relative group ml-2">
              <Heart className="w-6 h-6 group-hover:scale-110 group-hover:fill-secondary/30 transition-all" />
            </button>
            
            <button className="p-2 text-foreground hover:bg-secondary/50 rounded-full transition-colors relative group">
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 group-hover:fill-secondary/30 transition-all" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-[11px] font-bold text-foreground flex items-center justify-center rounded-full border border-surface shadow-sm">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
