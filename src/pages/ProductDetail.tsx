import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowLeft, Sparkles, ChevronRight, Share2, Heart } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../lib/AuthContext';
import { useCart } from '../lib/CartContext';

const products = [
  {
    id: '1',
    name: 'Architectural Overcoat',
    price: 890,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
    description: 'A structured, double-breasted overcoat crafted from high-density Italian wool. Features hidden button placket, sculptural shoulders, and a dramatic back vent. Designed for longevity and architectural presence.',
    details: [
      '100% Virgin Wool',
      'Cupro Lining',
      'Internal wallet pocket',
      'Dry clean only',
      'Made in Portugal'
    ],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Raw Silk Trousers',
    price: 450,
    category: 'men',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
    description: 'Fluid trousers in hand-loomed raw silk with a natural grain. A high-waisted silhouette with deep front pleats and a wide, architectural leg.',
    details: [
      '100% Raw Silk',
      'Eco-friendly dyes',
      'Relaxed architectural fit',
      'Hand wash recommended'
    ],
    sizes: ['28', '30', '32', '34']
  },
  {
    id: '3',
    name: 'Structured Midi Dress',
    price: 620,
    category: 'women',
    image: 'https://images.unsplash.com/photo-1539109132332-629ee721e83a?q=80&w=1974&auto=format&fit=crop',
    description: 'An architectural midi dress with clean lines and a subtle sculptural waist. Crafted from a technical cotton-stretch blend that maintains its form throughout the day.',
    details: [
      'Technical Cotton Blend',
      'Concealed back zipper',
      'Side seam pockets',
      'Architectural silhouette'
    ],
    sizes: ['XS', 'S', 'M', 'L']
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);
  const [stylingAdvice, setStylingAdvice] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    setProduct(found);
    if (found) {
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleAddToBag = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAdding(true);
    await addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize
    });
    setIsAdding(false);
    navigate('/cart');
  };

  const fetchStylingAdvice = async () => {
    if (!product) return;
    setIsAdviceLoading(true);
    try {
      const response = await fetch('/api/gemini/styling-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productDescription: product.description
        }),
      });
      const data = await response.json();
      setStylingAdvice(data.advice);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdviceLoading(false);
    }
  };

  if (!product) return <div className="pt-32 text-center text-brand-text/40 animate-pulse">Consulting Archive...</div>;

  return (
    <div className="bg-brand-bg min-h-screen pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/shop" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-brand-text/30 hover:text-brand-text mb-16 transition-all duration-500 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Archive / {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="aspect-[3/4] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-16">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-brand-accent font-bold">Item {product.id.padStart(2, '0')}</span>
                <span className="font-serif italic text-2xl text-brand-accent">${product.price}</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif italic tracking-tighter leading-none mb-8">{product.name}</h1>
              <p className="max-w-md text-sm leading-relaxed text-brand-text/60 mb-12 font-light">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-text/40">Scale / Proportion</h4>
                <button className="text-[9px] uppercase tracking-[0.3em] text-brand-accent hover:underline decoration-brand-accent/30 underline-offset-4 transition-all">Size Metric</button>
              </div>
              <div className="flex gap-4">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-14 h-14 flex items-center justify-center border text-[10px] tracking-widest transition-all duration-500",
                      selectedSize === size 
                        ? "border-brand-accent bg-brand-accent text-black font-bold" 
                        : "border-white/10 hover:border-brand-accent/50 text-brand-text/40"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-6 mb-20">
              <button 
                onClick={handleAddToBag}
                disabled={isAdding}
                className="w-full py-6 bg-brand-text text-brand-bg text-[10px] uppercase tracking-[0.5em] font-bold flex items-center justify-center gap-4 hover:bg-brand-accent hover:text-black transition-all duration-500 disabled:bg-white/10 disabled:text-white/20"
              >
                {isAdding ? 'Processing...' : 'Acquire Piece'}
                <ShoppingBag size={14} />
              </button>
              <div className="grid grid-cols-2 gap-6">
                <button className="py-5 border border-white/10 text-[9px] uppercase tracking-[0.4em] font-medium flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
                  <Heart size={14} className="opacity-40" />
                  Reserve
                </button>
                <button className="py-5 border border-white/10 text-[9px] uppercase tracking-[0.4em] font-medium flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
                  <Share2 size={14} className="opacity-40" />
                  Transmit
                </button>
              </div>
            </div>

            {/* AI Styling Advice */}
            <div className="p-10 bg-white/[0.02] border border-white/10 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles size={16} className="text-brand-accent" />
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-text/60">Architectural Perspective</h4>
                </div>
                
                {!stylingAdvice && !isAdviceLoading ? (
                  <button 
                    onClick={fetchStylingAdvice}
                    className="text-xs font-serif italic text-brand-text/80 hover:text-brand-accent transition-colors flex items-center gap-4 group/btn"
                  >
                    Request curated styling insights from AI Advisor
                    <ChevronRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                ) : isAdviceLoading ? (
                  <div className="flex items-center gap-4 text-brand-accent/40">
                    <div className="w-4 h-4 border-2 border-brand-accent/10 border-t-brand-accent rounded-full animate-spin" />
                    <p className="text-[10px] italic uppercase tracking-[0.3em]">Synthesizing perspective...</p>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none text-brand-text/60 leading-relaxed font-light">
                    <Markdown>{stylingAdvice}</Markdown>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000">
                <Sparkles size={160} />
              </div>
            </div>

            {/* Details Accordion */}
            <div className="mt-16 space-y-6">
              <div className="pt-6 border-t border-neutral-100">
                <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Composition & Care</h4>
                <ul className="grid grid-cols-2 gap-y-2">
                  {product.details.map((detail: string, i: number) => (
                    <li key={i} className="text-[11px] text-neutral-500 flex items-center gap-2">
                      <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
