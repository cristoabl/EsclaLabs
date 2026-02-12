'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Cpu, TrendingUp, ShieldCheck, Globe, Zap, BarChart3, ChevronRight, Github, Twitter, Linkedin, ExternalLink, Play, Mail } from 'lucide-react';

// --- Optimized Custom Cursor ---

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerpCursor = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpCursor;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpCursor;

      const lerpDot = 0.4;
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * lerpDot;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * lerpDot;

      if (cursorRef.current) {
        cursorRef.current.style.setProperty('--cursor-x', `${cursorPos.current.x - 16}px`);
        cursorRef.current.style.setProperty('--cursor-y', `${cursorPos.current.y - 16}px`);
      }
      if (dotRef.current) {
        dotRef.current.style.setProperty('--dot-x', `${dotPos.current.x - 3}px`);
        dotRef.current.style.setProperty('--dot-y', `${dotPos.current.y - 3}px`);
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
    </>
  );
};

// --- Custom Components ---

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
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between glass-morphism rounded-2xl px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-cyan-500/10' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <Cpu className="text-black w-6 h-6" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors uppercase">
              EsclaLabs
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => scrollTo('servicios')} className="relative text-white/50 hover:text-white transition-colors group">
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
            </button>
            <button onClick={() => scrollTo('filosofia')} className="relative text-white/50 hover:text-white transition-colors group">
              Filosofía
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
            </button>
            <button onClick={() => scrollTo('nosotros')} className="relative text-white/50 hover:text-white transition-colors group">
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
            </button>
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="relative group px-6 py-2.5 overflow-hidden rounded-xl bg-white text-black font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5">
              <span className="relative z-10 flex items-center gap-2 text-black text-sm uppercase font-black tracking-widest leading-none">
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

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black text-center">
      {/* Premium Background (Improved Video handling) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30 grayscale contrast-125 scale-110"
        >
          <source src="https://cdn.pixabay.com/video/2020/09/25/51214-464871404_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_95%)]" />
        
        {/* CSS Animated Grid (Fallback/Overlay) */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)',
               backgroundSize: '40px 40px' 
             }} 
        />
      </div>
      
      {/* Animated Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" 
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 glass mb-10 premium-border shadow-xl shadow-cyan-500/5"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Próxima Generación de Ingeniería Financiera</span>
        </motion.div>

        <h1 className="text-6xl md:text-[9.5rem] font-black tracking-tightest mb-10 leading-[0.85] text-white uppercase italic">
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block"
          >
            Finanzas
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-gradient"
          >
            + IA.
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white/60 text-xl md:text-3xl max-w-4xl mx-auto mb-14 leading-tight font-medium"
        >
          Arquitectamos sistemas de alta escala uniendo la <span className="text-white font-bold italic underline decoration-cyan-500/50">Precisión Contable</span> con el poder de la <span className="text-white font-bold italic underline decoration-blue-500/50">Inteligencia Artificial</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="group relative px-12 py-6 bg-white text-black rounded-2xl font-black text-2xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 uppercase tracking-tighter italic">
            <span className="relative z-10 flex items-center gap-3 text-black">
              Quiero mi Consultoría <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          
          <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 py-6 glass rounded-2xl font-black text-2xl hover:bg-white/10 transition-all border border-white/10 active:scale-95 uppercase tracking-tighter italic text-white/70">
            Ver Soluciones
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ServiceCard = ({ title, desc, icon: Icon, color, delay, image }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group relative h-[550px] rounded-[3.5rem] overflow-hidden bg-neutral-950 border border-white/5 premium-border shadow-2xl"
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
      
      <div className="relative h-full p-10 flex flex-col justify-end">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 glass border-white/10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500 shadow-xl shadow-black/50 shadow-inner`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase italic text-white leading-none">
          {title}
        </h3>
        
        <p className="text-white/40 text-lg leading-snug mb-8 group-hover:text-white/70 transition-colors">
          {desc}
        </p>

        <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="flex items-center gap-3 text-cyan-400 font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          Activar Protocolo <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="servicios" className="py-40 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 text-right md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-500 font-black uppercase tracking-[0.4em] text-sm block mb-4">Capacidades Centrales</span>
            <h2 className="text-6xl md:text-[6.5rem] font-black leading-[0.8] tracking-tightest uppercase italic">
              Soluciones <br />
              <span className="text-white/20">Modulares.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-xl max-w-md md:text-right font-medium"
          >
            Desplegamos infraestructura de nivel institucional diseñada para la velocidad y la soberanía algorítmica de tu negocio.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="AI Orchestration" 
            desc="Desplegamos agentes inteligentes que manejan tu atención al cliente, ventas y back-office. Automatización total."
            icon={Bot}
            image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
            delay={0.1}
          />
          <ServiceCard 
            title="CFO Digital" 
            desc="Modelos de Machine Learning para predecir tus flujos de caja, optimizar impuestos y análisis de inversión."
            icon={BarChart3}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
            delay={0.2}
          />
          <ServiceCard 
            title="Web3 Hub" 
            desc="Estrategias de tesorería en stablecoins, integración de pagos cripto y onboarding seguro al ecosistema DeFi."
            icon={Globe}
            image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

const Founder = () => {
  return (
    <section id="nosotros" className="py-40 px-6 relative overflow-hidden bg-neutral-950">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full group-hover:bg-cyan-500/30 transition-all duration-700" />
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 premium-border shadow-2xl">
            <img 
              src="/founder.jpg" 
              alt="Juan Cristóbal Asís" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute bottom-12 left-12">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '100%' }}
                 className="h-1 bg-cyan-500 mb-6" 
               />
               <p className="text-5xl font-black italic tracking-tighter uppercase text-white mb-2 leading-none">J.C. ASÍS</p>
               <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm">Founder & Architect</p>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white/20 font-black uppercase tracking-[0.5em] text-xs block mb-8 underline decoration-white/20 underline-offset-8">El Factor Humano</span>
            <h2 className="text-6xl md:text-[5.5rem] font-black mb-10 italic leading-[0.8] tracking-tightest uppercase">
              Maña + <br />
              <span className="text-cyan-500">Ingeniería.</span>
            </h2>
            <p className="text-white/50 text-2xl leading-relaxed mb-14 font-medium italic">
              "No estamos construyendo solo software, estamos diseñando la infraestructura de la próxima década donde la IA y el capital son indistinguibles."
            </p>
            
            <p className="text-white/40 text-lg mb-14 leading-relaxed">
              Juan Cristóbal Asís es Contador Público (2015) con un ADN puramente tecnológico. Resolutivo por naturaleza, navega el ecosistema Cripto desde 2017 y hoy lidera el desarrollo de agentes de IA aplicados a la rentabilidad empresarial.
            </p>

            <div className="grid grid-cols-2 gap-10 mb-14 border-t border-white/5 pt-10">
              <div>
                <p className="text-4xl font-black text-white mb-2 italic tracking-tighter">2017</p>
                <p className="text-white/30 uppercase text-[10px] tracking-widest font-bold">Incepción On-chain</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-2 italic tracking-tighter">1k+</p>
                <p className="text-white/30 uppercase text-[10px] tracking-widest font-bold">Lotes Gestionados</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" 
                target="_blank"
                className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-white/5 transition-all shadow-lg"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </motion.a>
              <div className="w-px h-10 bg-white/10 mx-2" />
              <span className="text-white/20 text-xs font-bold uppercase tracking-[0.3em] italic">Redes Verificadas</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Ticker Infinito */}
        <div className="py-12 border-y border-white/5 bg-black relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-20 mx-10">
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Maña</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Eficiencia</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest text-cyan-500/10">EsclaLabs</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest text-white/5">Resolución</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Soberanía</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Escalabilidad</span>
              </div>
            ))}
          </div>
        </div>

        <Services />
        
        {/* Filosofía / Middle Section */}
        <section id="filosofia" className="py-40 px-6 bg-white/[0.01] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
             <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mb-10 inline-block p-4 rounded-3xl bg-cyan-500/5 border border-cyan-500/20 shadow-inner shadow-cyan-500/10"
             >
                <Bot className="w-16 h-16 text-cyan-500" />
             </motion.div>
             <h2 className="text-4xl md:text-[5.5rem] font-black mb-10 uppercase italic tracking-tighter leading-none">
                Cambiamos <span className="text-cyan-500">Horas Culo</span> <br /> por <span className="text-white">Algoritmos.</span>
             </h2>
             <p className="text-white/40 text-xl md:text-2xl leading-relaxed font-medium">
                No vendemos software, vendemos el final de la burocracia. Si un bot puede hacerlo mejor, más rápido y sin quejarse, EsclaLabs lo construye.
             </p>
          </div>
        </section>

        <Founder />

        {/* Call to Action */}
        <section className="py-40 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[100px]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="text-7xl md:text-[9rem] font-black mb-12 italic tracking-tightest uppercase leading-[0.8] tracking-tighter">
              ¿Listo para <br /> <span className="text-gradient">Ascender?</span>
            </h2>
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="px-16 py-8 bg-cyan-500 text-black rounded-3xl font-black text-3xl hover:scale-105 transition-all shadow-[0_0_60px_rgba(6,182,212,0.3)] italic uppercase flex items-center gap-6 mx-auto w-fit leading-none">
              Iniciar Integración <ArrowRight className="w-8 h-8" />
            </a>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 text-center relative bg-neutral-950 font-sans">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-5xl font-black tracking-tightest mb-10 italic uppercase">EsclaLabs</div>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-10" />
          <p className="text-white/40 mb-14 max-w-md mx-auto text-lg font-medium">
            Arquitectando la frontera de las finanzas digitales y la inteligencia autónoma.
          </p>
          <div className="flex justify-center gap-10 text-white/30 font-bold uppercase tracking-widest text-xs mb-14">
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <span className="opacity-20 cursor-default line-through">Github</span>
            <span className="opacity-20 cursor-default line-through">Contacto</span>
          </div>
          <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">
            © 2026 EsclaLabs. Todos los derechos reservados. Diseñado para el futuro. 🧉
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .text-gradient {
          background: linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .premium-border {
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
        }
        .glass-morphism {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(6, 182, 212, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate3d(var(--cursor-x), var(--cursor-y), 0);
          transition: width 0.3s, height 0.3s, background-color 0.3s;
          mix-blend-mode: difference;
        }
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background-color: #06b6d4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate3d(var(--dot-x), var(--dot-y), 0);
        }
        h1, h2, h3, button, a {
          letter-spacing: -0.05em !important;
        }
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
