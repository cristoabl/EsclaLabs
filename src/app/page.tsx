'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Bot, BarChart3, Globe, Linkedin, Zap, ChevronRight, X, Send, CheckCircle2 } from 'lucide-react';

// --- Optimized Custom Cursor ---
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerpCursor = 0.1;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpCursor;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpCursor;

      const lerpDot = 0.3;
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * lerpDot;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * lerpDot;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference" />
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-500 rounded-full pointer-events-none z-[9999] hidden md:block" />
    </>
  );
};

// --- Contact Modal ---
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    
    // Usamos FormSubmit para mayor confiabilidad inicial
    const response = await fetch('https://formsubmit.co/ajax/cristobaldefy@gmail.com', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } else {
      alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-neutral-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            {status === 'success' ? (
              <div className="py-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 rounded-full bg-cyan-500/10 text-cyan-500 mb-6">
                  <CheckCircle2 className="w-16 h-16" />
                </motion.div>
                <h3 className="text-3xl font-black italic uppercase mb-4">¡Recibido!</h3>
                <p className="text-white/50 text-lg">Nos ponemos en contacto con vos en breve. 🧉</p>
              </div>
            ) : (
              <>
                <h3 className="text-4xl font-black italic uppercase mb-2">Hablemos de negocios.</h3>
                <p className="text-white/40 mb-8 font-medium italic">Contanos qué problema de ingeniería o finanzas querés liquidar.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Nombre Completo</label>
                    <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all text-white font-medium" placeholder="Tu nombre..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">Email de Contacto</label>
                    <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all text-white font-medium" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-2">¿En qué podemos ayudarte?</label>
                    <textarea required name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all text-white font-medium resize-none" placeholder="IA, Web3, Finanzas..." />
                  </div>
                  <button 
                    disabled={status === 'sending'}
                    className="w-full py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                  >
                    {status === 'sending' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'} <Send className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Navbar ---
const Navbar = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/10' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-180 transition-transform duration-500">
              <Cpu className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">EsclaLabs</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-white/50">
            <button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors">Servicios</button>
            <button onClick={() => scrollTo('nosotros')} className="hover:text-white transition-colors">Nosotros</button>
            <button onClick={onOpenContact} className="px-6 py-2.5 bg-white text-black rounded-xl font-black hover:bg-cyan-400 transition-all shadow-lg">HABLEMOS</button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default function LandingPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black md:cursor-none overflow-x-hidden font-sans antialiased">
      <CustomCursor />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* STATIC HIGH-END BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
           <div className="max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-10 shadow-2xl backdrop-blur-md"
              >
                <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Engineering the new economy</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-[9.5rem] font-black leading-[0.8] tracking-tightest uppercase italic text-white mb-12"
              >
                FINANZAS <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  + IA.
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/50 text-xl md:text-3xl max-w-3xl mx-auto mb-16 leading-tight italic font-medium"
              >
                EsclaLabs liquida la ineficiencia. <br /> Unimos precisión contable con inteligencia artificial.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <button onClick={() => setIsContactOpen(true)} className="px-16 py-8 bg-cyan-500 text-black rounded-3xl font-black text-3xl hover:scale-105 transition-all shadow-[0_0_60px_rgba(6,182,212,0.4)] italic uppercase flex items-center gap-6">
                  Iniciar Integración <ArrowRight className="w-8 h-8" />
                </button>
              </motion.div>
           </div>
        </section>

        {/* BENTO GRID SERVICES */}
        <section id="servicios" className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
                <span className="text-cyan-500 font-black uppercase tracking-[0.4em] text-sm block mb-4">Servicios de Élite</span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tightest uppercase italic">Soluciones <span className="text-white/20">Reales.</span></h2>
            </div>
            
            <div className="grid md:grid-cols-12 gap-8">
              <motion.div 
                whileHover={{ y: -10 }}
                className="md:col-span-8 group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl transition-all hover:border-cyan-500/30 text-left"
              >
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105 grayscale" alt="AI" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="relative h-full p-12 flex flex-col justify-end">
                   <Bot className="w-12 h-12 text-cyan-500 mb-6" />
                   <h3 className="text-5xl font-black mb-4 uppercase italic">AI Orchestration</h3>
                   <p className="text-white/50 text-xl max-w-xl leading-snug">Desplegamos agentes autónomos que liquidan tus tareas operativas 24/7. Atención al cliente, ventas y back-office automatizado al 100%.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="md:col-span-4 group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl transition-all hover:border-blue-500/30 text-left"
              >
                <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105 grayscale" alt="Crypto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="relative h-full p-12 flex flex-col justify-end">
                   <Globe className="w-12 h-12 text-blue-500 mb-6" />
                   <h3 className="text-4xl font-black mb-4 uppercase italic leading-none">Web3 Hub</h3>
                   <p className="text-white/50 text-lg leading-snug text-left block">Estrategias on-chain para empresas que buscan soberanía financiera.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="md:col-span-4 group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl transition-all hover:border-purple-500/30 text-left"
              >
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-105 grayscale" alt="Finance" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="relative h-full p-12 flex flex-col justify-end text-left">
                   <BarChart3 className="w-12 h-12 text-purple-500 mb-6" />
                   <h3 className="text-4xl font-black mb-4 uppercase italic">Digital CFO</h3>
                   <p className="text-white/50 text-lg leading-snug">Machine Learning aplicado a proyecciones y rentabilidad radical.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="md:col-span-8 flex items-center justify-center p-12 rounded-[3rem] border border-white/5 bg-white/[0.02] shadow-2xl text-center"
              >
                 <div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-6">Cambiamos Horas Culo por Algoritmos.</h3>
                    <p className="text-white/30 text-xl font-medium">No vendemos software, vendemos el final de la burocracia.</p>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section id="nosotros" className="py-40 px-6 relative bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all" />
              <div className="relative max-w-sm mx-auto aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-black">
                <img src="/founder.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="J.C. Asís" />
                <div className="absolute bottom-8 left-8 text-left text-white">
                  <p className="text-4xl font-black italic uppercase leading-none mb-1">J.C. ASÍS</p>
                  <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-xs italic">Founder & Architect</p>
                </div>
              </div>
            </div>
            <div className="text-left text-white font-sans">
              <span className="text-white/20 font-black uppercase tracking-[0.5em] text-xs block mb-8 underline decoration-white/10 underline-offset-8">Biografía</span>
              <h2 className="text-6xl md:text-8xl font-black mb-10 italic uppercase leading-[0.9]">Maña + <br /> <span className="text-cyan-500">Ingeniería.</span></h2>
              <p className="text-white/60 text-2xl leading-relaxed mb-10 italic font-medium">
                Juan Cristóbal Asís es Contador Público con ADN tecnológico. Resolutivo por naturaleza, navega el ecosistema Cripto desde 2017 y lidera el desarrollo de IA aplicada a la rentabilidad.
              </p>
              <div className="flex items-center gap-10 border-t border-white/10 pt-12 mb-12">
                 <div>
                    <p className="text-5xl font-black italic mb-1">2017</p>
                    <p className="text-white/20 uppercase text-xs font-bold tracking-widest">On-chain</p>
                 </div>
                 <div>
                    <p className="text-5xl font-black italic mb-1">1k+</p>
                    <p className="text-white/20 uppercase text-xs font-bold tracking-widest">Lotes Gestionados</p>
                 </div>
              </div>
              <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-cyan-500 transition-all group shadow-xl">
                 <Linkedin className="w-8 h-8 text-white group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-32 px-6 border-t border-white/5 text-center bg-black relative z-10 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="text-6xl font-black italic uppercase mb-12 tracking-tightest">EsclaLabs</div>
          <div className="w-32 h-1 bg-cyan-500 mx-auto mb-12 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
          <p className="text-white/30 text-sm max-w-md mx-auto mb-16 leading-relaxed italic font-medium uppercase tracking-[0.2em]">
            Architecting the frontier of digital finance.
          </p>
          <p className="text-white/5 text-[10px] font-black uppercase tracking-[0.8em] italic">© 2026 EsclaLabs. Todos los derechos reservados. 🧉</p>
        </div>
      </footer>

      <style jsx global>{`
        .tracking-tightest { letter-spacing: -0.06em; }
        .text-gradient { background: linear-gradient(to right, #06b6d4, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>
    </div>
  );
}
