import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Essence',
    label: 'Women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    href: '/shop?category=women'
  },
  {
    name: 'Form',
    label: 'Men',
    image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=2070&auto=format&fit=crop',
    href: '/shop?category=men'
  },
  {
    name: 'Detail',
    label: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop',
    href: '/shop?category=accessories'
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Architectural Overcoat',
    price: 890,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Raw Silk Trousers',
    price: 450,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Structured Midi Dress',
    price: 620,
    image: 'https://images.unsplash.com/photo-1539109132332-629ee721e83a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Sculptural Earrings',
    price: 280,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop',
  }
];

export default function Home() {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero"
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-64 h-[500px] border border-white/20 rotate-12"></div>
          <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full border border-brand-accent/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[11px] uppercase tracking-[0.5em] text-brand-accent mb-6 block font-medium"
          >
            Spring / Summer Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-7xl md:text-[120px] font-serif italic leading-[0.9] mb-12 tracking-tight group"
          >
            The Solstice <br />
            <span className="opacity-30 group-hover:opacity-100 transition-opacity duration-1000">Archive</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link 
              to="/shop"
              className="inline-flex items-center gap-6 px-12 py-5 border border-white/20 text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1 px-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden border border-white/5"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-[9px] uppercase tracking-[0.3em] text-brand-accent mb-2 font-bold">{cat.label}</p>
                <h3 className="text-4xl font-serif italic mb-8 tracking-wide transform group-hover:-translate-y-2 transition-transform duration-700">{cat.name}</h3>
                <Link to={cat.href} className="text-[10px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors flex items-center gap-4">
                  Shop <span className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-500"></span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 md:px-12 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-accent mb-4 font-bold">Selected Pieces</p>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-none tracking-tighter">Essential Elements</h2>
            </div>
            <Link to="/shop" className="text-[10px] uppercase tracking-[0.3em] border-b border-brand-accent/30 pb-2 hover:border-brand-accent transition-colors">
              Discover All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[3/4] bg-white/[0.03] border border-white/5 overflow-hidden mb-6 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xs uppercase tracking-widest font-medium opacity-60 group-hover:opacity-100 transition-opacity">{product.name}</h3>
                       <p className="text-[11px] font-serif italic text-brand-accent">${product.price}</p>
                    </div>
                    <div className="h-px bg-white/5 w-full group-hover:bg-brand-accent/30 transition-colors duration-500"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand Ethos */}
      <section className="py-32 px-6 bg-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-white/20"></div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light italic mb-8 leading-tight">
            "Artistry in every weave, <br className="hidden md:block" />
            silence in every thread."
          </h2>
          <p className="text-white/40 text-sm tracking-wide leading-relaxed uppercase">
            Vellum & Thread creates garments for the modern minimalist. 
            We believe in clothing as architecture—providing 
            structure, protection, and expression 
            without the noise of excess.
          </p>
        </div>
      </section>
    </div>
  );
}
