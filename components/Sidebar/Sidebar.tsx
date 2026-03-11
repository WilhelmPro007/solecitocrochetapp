import { ChevronDown, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/use-catalog';

interface SidebarProps {
  activeCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function Sidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  const { data: categories, loading } = useCategories();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-28">
        
        {/* Filter Section */}
        <div className="space-y-8">
          {/* Category */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] mb-5 pb-2 border-b border-border flex justify-between items-center">
              Categoría
              <ChevronDown className="w-3 h-3" />
            </h3>
            <ul className="space-y-3.5">
              {loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-300" />
                </div>
              ) : (
                Array.isArray(categories) && categories.map((cat) => (
                  <li 
                    key={cat.id} 
                    onClick={() => onSelectCategory?.(cat.id)}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className={`w-4 h-4 border-2 transition-colors flex items-center justify-center ${
                      activeCategory === cat.id ? 'border-primary' : 'border-border group-hover:border-primary'
                    }`}>
                      <div className={`w-2 h-2 bg-primary transition-transform ${
                        activeCategory === cat.id ? 'scale-100' : 'scale-0 group-hover:scale-100'
                      }`}></div>
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      activeCategory === cat.id ? 'text-[#111111]' : 'text-[#111111]/70 group-hover:text-[#111111]'
                    }`}>
                      {cat.name}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Character */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] mb-5 pb-2 border-b border-border flex justify-between items-center">
              Personaje
              <ChevronDown className="w-3 h-3 text-[#111111]/30" />
            </h3>
            <ul className="space-y-3.5">
              {['Personajes', 'Inspiración', 'Originales'].map((char) => (
                <li key={char} className="flex items-center gap-3 group cursor-pointer">
                   <div className="w-4 h-4 border-2 border-border rounded-none group-hover:border-primary transition-colors"></div>
                   <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/70 group-hover:text-[#111111]">
                    {char}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          onClick={() => onSelectCategory?.('')}
          className="w-full py-3 bg-white border-2 border-[#111111] text-[10px] font-black tracking-widest uppercase hover:bg-[#111111] hover:text-white transition-all rounded-none mt-10"
        >
          Limpiar Filtros
        </button>
      </div>
    </aside>
  );
}
