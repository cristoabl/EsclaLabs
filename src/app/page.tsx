'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Cpu, TrendingUp, ShieldCheck, Globe, BarChart3, ChevronRight, Github, Linkedin, ExternalLink, Play, Mail } from 'lucide-react';

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
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference" />
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-500 rounded-full pointer-events-none z-[9999] hidden md:block" />
    </>
  );
};

// --- Canvas Background (Particles) ---
const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
      draw() {
        ctx!.fillStyle = 'rgba(6, 182, 212, 0.2)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 100 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <CanvasBackground />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Cpu className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter">EsclaLabs</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/50">
            <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Servicios</button>
            <button onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-cyan-400 transition-colors">Nosotros</button>
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="px-6 py-2.5 bg-white text-black rounded-xl font-black hover:bg-cyan-400 transition-all shadow-lg">HABLEMOS</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div style={{ y }} className="max-w-7xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-10 shadow-inner">
            <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Financial Engineering V4.0</span>
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black leading-[0.85] tracking-tightest uppercase italic mb-12">
            Finanzas <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              + IA.
            </span>
          </h1>
          <p className="text-white/40 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed">
            EsclaLabs liquida la ineficiencia. Unimos la <span className="text-white underline decoration-cyan-500">precisión contable</span> con el poder de la <span className="text-white underline decoration-blue-500">Inteligencia Artificial</span> para escalar tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="px-12 py-6 bg-cyan-500 text-black rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] italic uppercase flex items-center gap-4">
              Mi Perfil <ArrowRight className="w-6 h-6" />
            </a>
            <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 py-6 bg-white/5 border border-white/10 rounded-2xl font-black text-2xl hover:bg-white/10 transition-all backdrop-blur-md uppercase italic">
              Ver Soluciones
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
             <div>
                <span className="text-cyan-500 font-black uppercase tracking-[0.4em] text-sm block mb-4">Core Capabilities</span>
                <h2 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tightest uppercase italic">Soluciones <br /> <span className="text-white/20">Modulares.</span></h2>
             </div>
             <p className="text-white/40 text-xl max-w-md md:text-right font-medium leading-relaxed italic">
                Desplegamos infraestructura de nivel institucional diseñada para la velocidad y la soberanía algorítmica.
             </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI Orchestration", desc: "Bots inteligentes que manejan atención al cliente y ventas.", icon: <Bot className="w-8 h-8" />, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
              { title: "CFO Digital", desc: "Modelos predictivos para flujo de caja e impuestos.", icon: <BarChart3 className="w-8 h-8" />, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
              { title: "Web3 Hub", desc: "Gestión de tesorería estable y pagos on-chain.", icon: <Globe className="w-8 h-8" />, img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" }
            ].map((s, i) => (
              <div key={i} className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-950 shadow-2xl transition-all hover:border-cyan-500/30">
                <img src={s.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" alt={s.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="relative h-full p-10 flex flex-col justify-end">
                   <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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

      {/* Philosophy Section */}
      <section className="py-40 px-6 bg-white/[0.01] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
           <h2 className="text-4xl md:text-7xl font-black mb-10 uppercase italic tracking-tighter leading-none">
              Cambiamos <span className="text-cyan-500 font-black italic underline decoration-white/20 underline-offset-8">Horas Culo</span> <br /> por <span className="text-white">Algoritmos.</span>
           </h2>
           <p className="text-white/40 text-xl md:text-2xl leading-relaxed italic">
              En EsclaLabs elevamos la "maña" a nivel de ingeniería. Si un bot puede hacerlo mejor y más rápido, nosotros lo construimos.
           </p>
        </div>
      </section>

      {/* Founder Section */}
      <section id="nosotros" className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all" />
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl shadow-black">
              <img src="/founder.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="J.C. Asís" />
              <div className="absolute bottom-10 left-10">
                <p className="text-5xl font-black italic uppercase leading-none mb-2">J.C. ASÍS</p>
                <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm italic">Founder & Architect</p>
              </div>
            </div>
          </div>
          <div>
            <span className="text-white/20 font-black uppercase tracking-[0.5em] text-xs block mb-8 underline decoration-white/10 underline-offset-8">Biografía</span>
            <h2 className="text-6xl md:text-7xl font-black mb-10 italic uppercase leading-[0.9]">Maña + <br /> <span className="text-cyan-500">Ingeniería.</span></h2>
            <p className="text-white/40 text-xl leading-relaxed mb-10 italic">
              Juan Cristóbal Asís es Contador Público con ADN tecnológico. Resolutivo por naturaleza, navega el ecosistema Cripto desde 2017 y lidera el desarrollo de IA para empresas.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10 mb-10 text-center md:text-left">
              <div><p className="text-4xl font-black italic leading-none mb-2">2017</p><p className="text-white/20 uppercase text-[10px] font-bold tracking-widest leading-none">Incepción On-chain</p></div>
              <div><p className="text-4xl font-black italic leading-none mb-2">1k+</p><p className="text-white/20 uppercase text-[10px] font-bold tracking-widest leading-none">Lotes Gestionados</p></div>
            </div>
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-cyan-500 transition-all shadow-xl group">
               <Linkedin className="w-6 h-6 text-white group-hover:text-black transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center bg-neutral-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-4xl font-black italic uppercase mb-10 tracking-tightest">EsclaLabs</div>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-10 rounded-full" />
          <p className="text-white/30 text-sm max-w-md mx-auto mb-10 leading-relaxed italic">
            Arquitectando la frontera de las finanzas digitales y la inteligencia autónoma. v2.0.1
          </p>
          <div className="flex justify-center gap-10 text-white/20 font-bold uppercase tracking-widest text-[10px] italic">
            <a href="https://www.linkedin.com/in/cristobal-asis-485ab9122/" target="_blank" className="hover:text-cyan-500 transition-colors">LinkedIn</a>
            <span className="opacity-30 cursor-default line-through">Mail</span>
            <span className="opacity-30 cursor-default line-through">GitHub</span>
          </div>
          <p className="text-white/5 text-[9px] font-black uppercase tracking-[0.6em] mt-20 italic">© 2026 EsclaLabs. Todos los derechos reservados. 🧉</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-infinite-scroll { animation: infinite-scroll 30s linear infinite; }
        .tracking-tightest { letter-spacing: -0.06em; }
        .text-gradient { background: linear-gradient(to right, #06b6d4, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass-morphism { background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}</style>
    </div>
  );
}
