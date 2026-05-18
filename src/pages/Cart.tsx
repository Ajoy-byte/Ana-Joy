import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, X, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../lib/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, loading } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-8 h-8 border border-brand-accent/20 border-t-brand-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen pt-40 pb-24 px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-serif italic tracking-tighter uppercase mb-16">Acquisition Bag</h1>

        {cartItems.length > 0 ? (
          <div className="space-y-12">
            <div className="border-t border-white/10">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-12 border-b border-white/5 flex gap-12 group">
                  <div className="w-32 h-44 bg-white/[0.02] border border-white/5 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm uppercase tracking-[0.2em] font-medium mb-2">{item.name}</h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-text/30 font-bold">Scale: {item.size || 'OS'}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-text/20 hover:text-brand-accent transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-6 px-4 py-2 border border-white/10">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-brand-text/40 hover:text-brand-text transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[11px] font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-brand-text/40 hover:text-brand-text transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-lg font-serif italic text-brand-accent">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12 space-y-6">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-brand-text/40">
                <span>Sub-Archive Total</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-brand-text/40">
                <span>Global Transit</span>
                <span className="text-[9px] italic">Complimentary</span>
              </div>
              <div className="flex justify-between text-2xl font-serif italic border-t border-white/10 pt-10 text-brand-accent">
                <span>Final Balance</span>
                <span>${subtotal}</span>
              </div>
            </div>

            <button className="w-full py-6 bg-brand-text text-brand-bg text-[10px] uppercase tracking-[0.5em] font-bold flex items-center justify-center gap-4 hover:bg-brand-accent hover:text-black transition-all duration-500 mt-12">
              Proceed to Transaction
              <ChevronRight size={14} />
            </button>
            <Link to="/shop" className="block text-center text-[9px] uppercase tracking-[0.4em] font-bold text-brand-text/30 hover:text-brand-text transition-colors mt-8">
              Return to Archive
            </Link>
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/10">
            <p className="text-brand-text/30 italic text-sm mb-12">Your acquisition bag is currently unoccupied.</p>
            <Link to="/shop" className="inline-block px-12 py-5 border border-white/20 text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">
              Browse Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
