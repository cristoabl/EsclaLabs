'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Cpu, TrendingUp, ShieldCheck, Globe, Zap, BarChart3, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';

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
        <div className={`flex items-center justify-between glass-morphism rounded-2xl px-6 py-3 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <Cpu className="text-black w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
              EsclaLabs
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            {['Servicios', 'Impacto', 'Nosotros'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative text-white/70 hover:text-white transition-colors group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button className="relative group px-6 py-2.5 overflow-hidden rounded-full bg-white text-black font-bold transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Consultoría <ChevronRight className="w-4 h-4" />
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dot-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-black" />
      
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, 100, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" 
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">The Future of Finance & AI</span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-bold tracking-tightest mb-8 leading-[0.9] text-white">
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block"
          >
            Evolutionary
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-gradient"
          >
            Intelligence.
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          EsclaLabs fusiona algoritmos de IA avanzada con el ecosistema cripto para potenciar empresas que buscan dominar el próximo ciclo económico.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-10 py-5 bg-cyan-500 text-black rounded-2xl font-black text-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-3">
              EMPEZAR AHORA <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button className="px-10 py-5 glass rounded-2xl font-bold text-xl hover:bg-white/10 transition-all border border-white/10 active:scale-95">
            Ver Lab
          </button>
        </motion.div>
      </motion.div>

      {/* Hero 3D Card / Element */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] perspective-1000 hidden lg:block"
      >
        <motion.div 
          animate={{ 
            rotateX: [15, 20, 15],
            y: [0, -20, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full glass-morphism rounded-t-[4rem] border-t border-x border-white/20 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-t from-black to-white/5"
        >
          <div className="grid grid-cols-3 gap-6 h-full">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ServiceCard = ({ title, desc, icon: Icon, color, delay }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${color}`} />
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 glass group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-white/40 text-lg leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
        {desc}
      </p>

      <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
        Saber más <ChevronRight className="w-5 h-5 text-cyan-500" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="servicios" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            Engineering <br />
            <span className="text-white/30">The New Economy.</span>
          </motion.h2>
          <div className="w-32 h-1.5 bg-cyan-500 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="AI Orchestration" 
            desc="Sistemas autónomos que gestionan flujos de trabajo, atención al cliente y decisiones operativas en tiempo real."
            icon={Bot}
            color="bg-cyan-500"
            delay={0.1}
          />
          <ServiceCard 
            title="Crypto Yield" 
            desc="Estrategias institucionales de tesorería on-chain para maximizar rendimientos con riesgo controlado."
            icon={TrendingUp}
            color="bg-blue-500"
            delay={0.2}
          />
          <ServiceCard 
            title="FinOps Lab" 
            desc="Auditoría y optimización de costos financieros mediante modelos predictivos de inteligencia artificial."
            icon={BarChart3}
            color="bg-purple-500"
            delay={0.3}
          />
          <ServiceCard 
            title="Web3 Infra" 
            desc="Despliegue de nodos, validadores e infraestructura segura para empresas que operan en blockchain."
            icon={Globe}
            color="bg-green-500"
            delay={0.4}
          />
          <ServiceCard 
            title="Cyber Security" 
            desc="Protección de activos digitales y auditoría de contratos inteligentes para prevenir vulnerabilidades."
            icon={ShieldCheck}
            color="bg-red-500"
            delay={0.5}
          />
          <ServiceCard 
            title="Custom Models" 
            desc="Entrenamiento de LLMs con datos privados de tu empresa para una inteligencia 100% a medida."
            icon={Zap}
            color="bg-yellow-500"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

const Founder = () => {
  return (
    <section id="nosotros" className="py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square max-w-md mx-auto lg:mx-0"
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 glass">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
               <span className="text-8xl font-black text-white/10">JCA</span>
            </div>
            <div className="absolute bottom-8 left-8 z-20">
               <p className="text-2xl font-bold">Juan Cristóbal Asís</p>
               <p className="text-cyan-500 font-medium">Founder & Managing Partner</p>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-8 italic leading-tight">
              "No estamos construyendo solo software, estamos diseñando la infraestructura de la próxima década."
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12">
              Contador de formación, tecnólogo por vocación. Juan Cristóbal combina la precisión del mundo financiero tradicional con la velocidad y disrupción de Crypto e IA. Desde 2017, ha liderado transformaciones digitales que hoy son el estándar de la industria.
            </p>
            
            <div className="flex items-center gap-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -5, color: '#06b6d4' }}
                  href="#" 
                  className="p-4 rounded-2xl glass hover:border-cyan-500 transition-all"
                >
                  <Icon className="w-6 h-6" />
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black cursor-none">
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-cyan-500/30 border border-cyan-500 z-[9999] pointer-events-none mix-blend-difference"
        animate={{ 
          x: mousePos.x - 16, 
          y: mousePos.y - 16,
          scale: 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 z-[9999] pointer-events-none"
        animate={{ 
          x: mousePos.x - 4, 
          y: mousePos.y - 4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.2 }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Founder />
      </main>

      <footer className="py-20 px-6 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-4xl font-bold tracking-tighter mb-10">EsclaLabs</div>
          <p className="text-white/40 mb-10 max-w-md mx-auto">
            Impulsando la frontera tecnológica en finanzas y automatización.
          </p>
          <div className="flex justify-center gap-8 text-white/60 mb-10">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
          </div>
          <p className="text-white/20 text-sm">© 2026 EsclaLabs. Designed for the Future. 🧉</p>
        </div>
      </footer>
    </div>
  );
}
