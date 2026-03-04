import { CATEGORIES } from '@/lib/filters';

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-28 font-sans">
        
        {/* Filter Header */}
        <div className="pb-4 mb-6 border-b border-border">
          <h2 className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
            Filter By:
          </h2>
        </div>

        {/* Product Type Filter */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 cursor-pointer group">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">
              Category
            </h3>
            <span className="text-muted group-hover:text-secondary transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </span>
          </div>
          
          <ul className="space-y-3">
            {CATEGORIES.map((cat) => (
              <li key={cat} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center group-hover:border-secondary transition-colors">
                </div>
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clear All Button */}
        <button className="w-full py-2 bg-surface border border-border text-xs font-bold tracking-widest uppercase hover:bg-secondary/20 hover:border-secondary transition-all rounded-sm text-foreground mt-4">
          Clear All
        </button>
      </div>
    </aside>
  );
}
