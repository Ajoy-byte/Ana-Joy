import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const products = [
  {
    id: '1',
    name: 'Architectural Overcoat',
    price: 890,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
    description: 'A structured, double-breasted overcoat crafted from high-density wool.'
  },
  {
    id: '2',
    name: 'Raw Silk Trousers',
    price: 450,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
    description: 'Fluid trousers in hand-loomed raw silk with a natural grain.'
  },
  {
    id: '3',
    name: 'Structured Midi Dress',
    price: 620,
    category: 'women',
    image: 'https://images.unsplash.com/photo-1539109132332-629ee721e83a?q=80&w=1974&auto=format&fit=crop',
    description: 'An architectural midi dress with clean lines and a subtle sculptural waist.'
  },
  {
    id: '4',
    name: 'Sculptural Earrings',
    price: 280,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop',
    description: 'Hand-cast sterling silver earrings inspired by brutalist forms.'
  },
  {
    id: '5',
    name: 'Cashmere Knit Tunic',
    price: 380,
    category: 'women',
    image: 'https://images.unsplash.com/photo-1574231164645-d6fcae85535c?q=80&w=2024&auto=format&fit=crop',
    description: 'Ultra-fine cashmere tunic with a dramatic side slit.'
  },
  {
    id: '6',
    name: 'Minimalist Leather Tote',
    price: 520,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop',
    description: 'Full-grain vachetta leather tote with hidden seams.'
  }
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = categoryFilter 
    ? products.filter(p => p.category === categoryFilter)
    : products;

  return (
    <div className="bg-brand-bg min-h-screen pt-40 pb-24 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <nav className="flex gap-4 text-[9px] uppercase tracking-[0.3em] text-brand-text/30 mb-6">
              <Link to="/" className="hover:text-brand-text transition-colors">Home</Link>
              <span className="opacity-20">/</span>
              <span className="text-brand-text/60">Collection</span>
            </nav>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter uppercase leading-none">
              {categoryFilter || 'All Objects'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="group flex items-center gap-4 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-white hover:text-black transition-all duration-500"
            >
              <SlidersHorizontal size={14} className="opacity-60 group-hover:opacity-100" />
              Filter
            </button>
            <div className="relative">
              <button className="flex items-center gap-4 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-medium hover:text-brand-accent transition-colors">
                Sort: {sortBy}
                <ChevronDown size={14} className="opacity-40" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group border border-white/5 p-4 hover:border-white/20 transition-colors duration-700"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[3/4] bg-white/[0.02] overflow-hidden mb-8 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-brand-accent font-bold px-2 py-1 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    In Stock
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-1 opacity-60 group-hover:opacity-100 transition-opacity">{product.name}</h3>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">{product.category}</p>
                  </div>
                  <p className="text-sm font-serif italic text-brand-accent">${product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-neutral-400 italic">No pieces found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
