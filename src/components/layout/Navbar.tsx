import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/lib/AuthContext';
import { useCart } from '@/src/lib/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Men', href: '/shop?category=men' },
    { name: 'Women', href: '/shop?category=women' },
    { name: 'About', href: '/about' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-12 border-b shrink-0',
        isScrolled ? 'bg-brand-bg/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button 
            className="md:hidden text-brand-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/" className="text-2xl font-serif tracking-[0.2em] text-brand-text uppercase">
            Vellum<span className="opacity-30 italic mr-1">&</span>Thread
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-[10px] uppercase tracking-[0.3em] text-brand-text/60 hover:text-brand-text transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 text-brand-text">
          <button className="hidden sm:block opacity-60 hover:opacity-100 transition-opacity">
            <Search size={18} strokeWidth={1.5} />
          </button>
          
          <div className="relative">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">
                    <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <ChevronDown size={12} className={cn("transition-transform", isUserMenuOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-48 bg-brand-bg border border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[9px] uppercase tracking-widest text-brand-text/40 mb-1">Signed in as</p>
                        <p className="text-[11px] font-bold truncate tracking-tight">{user.displayName}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-white/5 rounded-lg transition-colors text-red-400"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium">
                <User size={18} strokeWidth={1.5} />
                <span className="hidden sm:inline">Account</span>
              </Link>
            )}
          </div>

          <Link to="/cart" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-accent"></div>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-widest font-medium">Cart ({totalItems})</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden text-white"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest py-2 border-b border-white/5"
            >
              Sign In
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
