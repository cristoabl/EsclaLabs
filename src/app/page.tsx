'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Bot, BarChart3, Globe, Linkedin, Zap, ChevronDown, ChevronRight } from 'lucide-react';

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

// --- Navbar ---
const Navbar = () => {
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
      <div className="max-w-7xl mx-auto px-6 text-white font-sans">
        <div className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/10' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-180 transition-transform duration-500 text-black">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">
              EsclaLabs
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-white/50">
            <button onClick={() => scrollTo('servicios')} className="hover:text-white transition-colors">Servicios</button>
            <button onClick={() => scrollTo('nosotros')} className="hover:text-white transition-colors">Nosotros</button>
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="relative group px-6 py-2.5 overflow-hidden rounded-xl bg-white text-black font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10">
              <span className="relative z-10 flex items-center gap-2">
                HABLEMOS <ChevronRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  
  const { scrollYProgress } = useScroll();

  // CLEAN NON-OVERLAPPING HERO TRANSITIONS
  // Section 1: Intro [0 -> 0.3]
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  // Section 2: Efficiency [0.35 -> 0.65]
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.65], [100, 0, 0, -100]);
  
  // Section 3: CTA [0.7 -> 1.0]
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.7, 0.8], [100, 0]);
  
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (video.duration && !isNaN(video.duration)) {
        targetTimeRef.current = progress * video.duration;
      }
    });

    const render = () => {
      const diff = targetTimeRef.current - currentTimeRef.current;
      currentTimeRef.current += diff * 0.08; // Slightly slower/smoother
      if (video && !isNaN(currentTimeRef.current)) {
        video.currentTime = currentTimeRef.current;
      }
      requestAnimationFrame(render);
    };

    const animationFrame = requestAnimationFrame(render);
    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrame);
    };
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black md:cursor-none overflow-x-hidden font-sans antialiased">
      <CustomCursor />
      <Navbar />

      {/* FIXED GLOBAL BACKGROUND VIDEO */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover grayscale opacity-80 contrast-125 scale-105"
          src="/bg.mp4"
        />
        {/* Darker overlays only at the very top and very bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>
      
      <main className="relative z-10">
        {/* HERO SECTION - Height adjusted for clear transitions */}
        <section className="relative h-[600vh] flex items-center justify-center">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
            
            {/* Intro Content */}
            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center max-w-5xl pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8 shadow-2xl backdrop-blur-md">
                <Zap className="w-3 h-3 text-cyan-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">EsclaLabs v2.1.5</span>
              </div>
              <h1 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tightest uppercase italic text-white drop-shadow-2xl">
                EL FUTURO <br /> ES <span className="text-cyan-500">ALGORÍTMICO.</span>
              </h1>
              <p className="mt-10 text-white/50 text-xl font-medium uppercase tracking-widest italic">Ingeniería para la nueva economía</p>
            </motion.div>

            {/* Efficiency Content */}
            <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute text-center max-w-4xl pointer-events-none">
              <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-8 drop-shadow-2xl">
                MAÑA <span className="text-cyan-500">+</span> INGENIERÍA.
              </h2>
              <p className="text-white/80 text-xl md:text-3xl font-medium italic leading-tight bg-black/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                Liquidamos la burocracia. <br /> Construimos la infraestructura <br /> que tu rentabilidad merece.
              </p>
            </motion.div>

            {/* CTA Content */}
            <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute text-center max-w-4xl flex flex-col items-center">
              <h2 className="text-6xl md:text-[9rem] font-black uppercase italic tracking-tightest text-white mb-12 leading-none drop-shadow-2xl">
                ¿LISTO PARA <br /> <span className="text-gradient text-glow">ASCENDER?</span>
              </h2>
              <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="pointer-events-auto px-16 py-8 bg-cyan-500 text-black rounded-3xl font-black text-3xl hover:scale-105 transition-all shadow-[0_0_60px_rgba(6,182,212,0.5)] italic uppercase">
                Iniciar Integración
              </a>
            </motion.div>

            <motion.div style={{ opacity: scrollIndicatorOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Deslizá</span>
              <ChevronDown className="w-5 h-5 animate-bounce text-cyan-500" />
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="relative py-40 px-6 bg-black/80 backdrop-blur-2xl border-y border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
               <div className="text-left text-white">
                  <span className="text-cyan-500 font-black uppercase tracking-[0.4em] text-sm block mb-4">Core Capabilities</span>
                  <h2 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tightest uppercase italic">Soluciones <br /> <span className="text-white/10 text-left block">Modulares.</span></h2>
               </div>
               <p className="text-white/40 text-xl max-w-md md:text-right font-medium italic leading-relaxed">
                  Sistemas de nivel institucional para la soberanía algorítmica de tu negocio.
               </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "AI Orchestration", desc: "Agentes autónomos entrenados para liquidar tareas operativas.", icon: <Bot className="w-8 h-8" />, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
                { title: "CFO Digital", desc: "Machine Learning aplicado a proyecciones y optimización de capital.", icon: <BarChart3 className="w-8 h-8" />, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
                { title: "Web3 Hub", desc: "Gestión de tesorería estable y pagos on-chain.", icon: <Globe className="w-8 h-8" />, img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" }
              ].map((s, i) => (
                <div key={i} className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-900 transition-all hover:border-cyan-500/30 text-left shadow-2xl">
                  <img src={s.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110 grayscale" alt={s.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  <div className="relative h-full p-10 flex flex-col justify-end text-white">
                     <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                        {s.icon}
                     </div>
                     <h3 className="text-4xl font-black mb-4 uppercase italic leading-none">{s.title}</h3>
                     <p className="text-white/40 text-lg leading-snug group-hover:text-white/70 transition-colors">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section id="nosotros" className="relative py-40 px-6 bg-black border-b border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all" />
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src="/founder.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="J.C. Asís" />
                <div className="absolute bottom-10 left-10 text-left text-white">
                  <p className="text-5xl font-black italic uppercase leading-none mb-2">J.C. ASÍS</p>
                  <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm italic text-glow">Founder & Architect</p>
                </div>
              </div>
            </div>
            <div className="text-left text-white">
              <span className="text-white/20 font-black uppercase tracking-[0.5em] text-xs block mb-8 underline decoration-white/10 underline-offset-8">Incepción</span>
              <h2 className="text-6xl md:text-7xl font-black mb-10 italic uppercase leading-[0.9]">Maña + <br /> <span className="text-cyan-500 text-glow">Ingeniería.</span></h2>
              <p className="text-white/40 text-xl leading-relaxed mb-10 italic font-medium">
                Juan Cristóbal Asís es Contador Público con ADN tecnológico. Resolutivo por naturaleza, navega el ecosistema Cripto desde 2017 y lidera EsclaLabs.
              </p>
              <div className="flex items-center gap-8 mb-10 border-t border-white/5 pt-10">
                <div className="text-left"><p className="text-4xl font-black italic text-white mb-1 leading-none tracking-tighter">2017</p><p className="text-white/20 uppercase text-[10px] font-bold tracking-widest leading-none">On-chain</p></div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-left"><p className="text-4xl font-black italic text-white mb-1 leading-none tracking-tighter">1k+</p><p className="text-white/20 uppercase text-[10px] font-bold tracking-widest leading-none">Managed Assets</p></div>
              </div>
              <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-cyan-500 transition-all group shadow-xl">
                 <Linkedin className="w-6 h-6 text-white group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-20 py-20 px-6 text-center bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-4xl font-black italic uppercase mb-10 tracking-tightest text-white">EsclaLabs</div>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-10 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          <p className="text-white/30 text-xs max-w-md mx-auto mb-10 leading-relaxed italic font-medium uppercase tracking-widest">
            Architecting the frontier of digital finance. v2.1.5
          </p>
          <p className="text-white/5 text-[8px] font-black uppercase tracking-[0.8em] mt-20 italic">© 2026 EsclaLabs. Todos los derechos reservados. 🧉</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-infinite-scroll { animation: infinite-scroll 30s linear infinite; }
        .tracking-tightest { letter-spacing: -0.06em; }
        .text-gradient { background: linear-gradient(to right, #06b6d4, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass-morphism { background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .italic-shadow { text-shadow: 10px 10px 0px rgba(0, 0, 0, 0.5); }
        .text-glow { text-shadow: 0 0 20px rgba(6, 182, 212, 0.4); }
      `}</style>
    </div>
  );
}
