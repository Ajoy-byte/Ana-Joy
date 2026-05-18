import { motion } from 'motion/react';
import { LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async () => {
    await signInWithGoogle();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-white/10 mb-12 bg-white/[0.02]">
            <ShieldCheck size={32} className="text-brand-accent/60" />
          </div>
          <h1 className="text-5xl font-serif tracking-[0.2em] text-brand-text uppercase mb-6">
            Vellum<span className="opacity-30 italic">&</span>Thread
          </h1>
          <p className="text-brand-text/30 text-[10px] tracking-[0.4em] uppercase font-bold">
            Secure Entry / Architectural Archive
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/10 p-12"
        >
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-brand-text opacity-60 mb-10 block">Identification Required</h2>
          
          <button
            onClick={handleLogin}
            className="w-full py-5 bg-brand-text text-brand-bg font-bold uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-brand-accent hover:text-black transition-all duration-500 mb-8"
          >
            <LogIn size={16} />
            Continue with Google
          </button>

          <p className="text-[9px] text-brand-text/20 uppercase tracking-[0.2em] leading-loose">
            Authentication is managed via Google secure protocols. 
            By proceeding, you acknowledge our terms of access.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <button 
            onClick={() => navigate('/')}
            className="text-[10px] text-brand-text/30 uppercase tracking-[0.4em] hover:text-brand-accent transition-all flex items-center justify-center gap-4 mx-auto group"
          >
            Back to Public Domain
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
