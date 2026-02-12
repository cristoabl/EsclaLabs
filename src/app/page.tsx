'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Cpu, TrendingUp, ShieldCheck, Globe, Zap, BarChart3, ChevronRight, Github, Twitter, Linkedin, ExternalLink, Play } from 'lucide-react';

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
      // Smooth interpolation for the large circle
      const lerpCursor = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpCursor;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpCursor;

      // Faster interpolation for the dot
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

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between glass-morphism rounded-2xl px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-3 group cursor-pointer">
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
            {['Servicios', 'Impacto', 'Nosotros'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative text-white/50 hover:text-white transition-colors group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button className="relative group px-6 py-2.5 overflow-hidden rounded-xl bg-white text-black font-black transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                ESTRATEGIA <ChevronRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Premium Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale"
        >
          <source src="https://cdn.pixabay.com/video/2021/04/12/70884-537443187_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 bg-grid-white opacity-10" />
      </div>
      
      {/* Animated Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" 
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 glass mb-10 premium-border"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Next Gen Financial Engineering</span>
        </motion.div>

        <h1 className="text-7xl md:text-[10rem] font-black tracking-tightest mb-10 leading-[0.8] text-white uppercase italic">
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block"
          >
            Extreme
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-gradient"
          >
            Intelligence
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white/60 text-xl md:text-3xl max-w-4xl mx-auto mb-14 leading-tight font-medium"
        >
          We architect hyper-scalable systems at the intersection of <span className="text-white">Neural Networks</span> and <span className="text-white">On-chain Finance</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <button className="group relative px-12 py-6 bg-white text-black rounded-2xl font-black text-2xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 uppercase tracking-tighter italic">
            <span className="relative z-10 flex items-center gap-3">
              Deploy Protocol <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button className="px-12 py-6 glass rounded-2xl font-black text-2xl hover:bg-white/10 transition-all border border-white/10 active:scale-95 uppercase tracking-tighter italic text-white/70">
            View Analytics
          </button>
        </motion.div>
      </motion.div>

      {/* Hero Visual Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-[-20%] w-full h-[600px] bg-gradient-to-t from-cyan-500/20 to-transparent blur-[120px] pointer-events-none"
      />
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
      className="group relative h-[500px] rounded-[3rem] overflow-hidden bg-neutral-950 border border-white/5 premium-border"
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
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 glass border-white/10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase italic text-white">
          {title}
        </h3>
        
        <p className="text-white/40 text-lg leading-snug mb-8 group-hover:text-white/70 transition-colors">
          {desc}
        </p>

        <div className="flex items-center gap-3 text-cyan-400 font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          Init Protocol <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="servicios" className="py-40 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-500 font-black uppercase tracking-[0.4em] text-sm block mb-4">Core Capabilities</span>
            <h2 className="text-6xl md:text-[6rem] font-black leading-[0.8] tracking-tightest uppercase italic">
              Modular <br />
              <span className="text-white/20">Solutions.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-xl max-w-md text-right font-medium"
          >
            Desplegamos infraestructura de nivel institucional diseñada para la velocidad y la soberanía algorítmica.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Neural Nets" 
            desc="Modelos de lenguaje y visión entrenados para automatización radical de flujos empresariales."
            icon={Bot}
            image="https://images.unsplash.com/photo-1620712943543-bcc4628c6757?auto=format&fit=crop&q=80&w=1000"
            delay={0.1}
          />
          <ServiceCard 
            title="Yield Engine" 
            desc="Algoritmos de alta frecuencia para gestión de tesorería y arbitraje en ecosistemas DeFi."
            icon={TrendingUp}
            image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000"
            delay={0.2}
          />
          <ServiceCard 
            title="Quantum Ops" 
            desc="Optimización matemática de procesos financieros reduciendo latencia y costos operativos."
            icon={BarChart3}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
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
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 premium-border">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
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
               <p className="text-5xl font-black italic tracking-tighter uppercase text-white mb-2">J.C. ASÍS</p>
               <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm">Visionary / Founder</p>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white/20 font-black uppercase tracking-[0.5em] text-xs block mb-8">The Philosophy</span>
            <h2 className="text-6xl md:text-7xl font-black mb-10 italic leading-[0.9] tracking-tightest uppercase">
              Beyond <br />
              <span className="text-cyan-500">Automation.</span>
            </h2>
            <p className="text-white/50 text-2xl leading-relaxed mb-14 font-medium italic">
              "No estamos construyendo solo software, estamos diseñando la infraestructura de la próxima década donde la IA y el capital son indistinguibles."
            </p>
            
            <div className="grid grid-cols-2 gap-10 mb-14">
              <div>
                <p className="text-4xl font-black text-white mb-2 italic">2017</p>
                <p className="text-white/30 uppercase text-xs tracking-widest font-bold">Inception on-chain</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-2 italic">40M+</p>
                <p className="text-white/30 uppercase text-xs tracking-widest font-bold">Assets Optimized</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  href="#" 
                  className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-white/5 transition-all"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black cursor-none overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trusted By / Ticker */}
        <div className="py-10 border-y border-white/5 bg-black relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-20 mx-10">
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Scalability</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Efficiency</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Intelligence</span>
                <span className="text-2xl font-black text-white/10 uppercase italic tracking-widest">Sovereignty</span>
              </div>
            ))}
          </div>
        </div>

        <Services />
        <Founder />

        {/* Call to Action */}
        <section className="py-40 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 blur-[100px]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="text-7xl md:text-9xl font-black mb-12 italic tracking-tightest uppercase">
              Ready to <br /> <span className="text-gradient">Ascend?</span>
            </h2>
            <button className="px-16 py-8 bg-cyan-500 text-black rounded-3xl font-black text-3xl hover:scale-105 transition-all shadow-[0_0_60px_rgba(6,182,212,0.3)] italic uppercase">
              Start Integration
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 text-center relative bg-neutral-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-5xl font-black tracking-tightest mb-10 italic uppercase">EsclaLabs</div>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-10" />
          <p className="text-white/40 mb-14 max-w-md mx-auto text-lg font-medium">
            Architecting the frontier of digital finance and autonomous intelligence.
          </p>
          <div className="flex justify-center gap-10 text-white/30 font-bold uppercase tracking-widest text-xs mb-14">
            <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Github</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">
            © 2026 EsclaLabs. All Rights Reserved. Designed for the Future. 🧉
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
      `}</style>
    </div>
  );
}
