import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-bg text-brand-text py-32 px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="md:col-span-2">
          <Link to="/" className="text-3xl font-serif tracking-[0.2em] uppercase mb-10 block">
            Vellum<span className="opacity-30 italic">&</span>Thread
          </Link>
          <p className="text-brand-text/30 text-[11px] uppercase tracking-[0.3em] max-w-sm leading-relaxed mb-12 font-medium">
            Minimalist architecture for the human form. Crafted for those who find power in restraint and beauty in the essential.
          </p>
          <div className="flex gap-8">
            <a href="#" className="opacity-30 hover:opacity-100 transition-opacity">
              <Instagram size={18} strokeWidth={1} />
            </a>
            <a href="#" className="opacity-30 hover:opacity-100 transition-opacity">
              <Twitter size={18} strokeWidth={1} />
            </a>
            <a href="#" className="opacity-30 hover:opacity-100 transition-opacity">
              <Facebook size={18} strokeWidth={1} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-brand-accent">Archives</h4>
          <ul className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.3em] text-brand-text/30">
            <li><Link to="/shop?category=men" className="hover:text-brand-text transition-colors">Men's Selection</Link></li>
            <li><Link to="/shop?category=women" className="hover:text-brand-text transition-colors">Women's Selection</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-brand-text transition-colors">Utility / Detail</Link></li>
            <li><Link to="/shop" className="hover:text-brand-text transition-colors">New Release</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-brand-accent">Manifesto</h4>
          <p className="text-[10px] text-brand-text/30 mb-8 leading-relaxed uppercase tracking-[0.2em]">
            Engage with our seasonal perspectives and architectural observations.
          </p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="ELECTRONIC MAIL"
              className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] uppercase tracking-[0.4em] focus:outline-none focus:border-brand-accent transition-colors pr-10 placeholder:text-brand-text/10"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-text/40 hover:text-brand-accent transition-colors">
              <Mail size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-12 text-[9px] uppercase tracking-[0.4em] text-brand-text/20">
          <span>Global Distribution</span>
          <span>Material Standard</span>
          <span>Ethical Construction</span>
        </div>
        <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-brand-text/20">
          <a href="#" className="hover:text-brand-text">Legal</a>
          <a href="#" className="hover:text-brand-text">Protocol</a>
          <a href="#" className="hover:text-brand-text">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
