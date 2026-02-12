import React from 'react';
import * as motion from 'framer-motion/client';
import { ArrowRight, Bot, Cpu, TrendingUp, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Cpu className="text-black w-5 h-5" />
            </div>
            EsclaLabs
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-cyan-400 transition-colors">Nosotros</a>
            <button className="px-5 py-2 bg-white text-black rounded-full hover:bg-cyan-400 transition-all font-bold">
              Consultoría
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold uppercase tracking-widest inline-block mb-6">
              The Finance & AI Lab
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tightest mb-8 leading-tight">
              El puente entre tus finanzas <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                y el futuro digital.
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Dejá de pelear con procesos del siglo pasado. Implementamos IA y soluciones Cripto para que tu negocio rinda al 100% mientras hacés lo que importa.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-cyan-500 text-black rounded-full font-bold text-lg hover:bg-cyan-400 transition-all flex items-center gap-2">
                Quiero mi consultoría
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Ver servicios
              </button>
            </div>
          </motion.div>
        </div>

        {/* Animated Element */}
        <motion.div 
          className="mt-20 max-w-5xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 aspect-video flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40 flex items-center justify-center group">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse" />
             <Bot className="w-24 h-24 text-cyan-500/50 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Orchestration",
                desc: "Automatizamos tus tareas repetitivas con agentes inteligentes. Menos horas culo, más resultados.",
                icon: <Bot className="w-10 h-10 text-cyan-500" />
              },
              {
                title: "Web3 & Crypto",
                desc: "Implementamos pagos cripto, custodia segura y estrategias DeFi para empresas.",
                icon: <ShieldCheck className="w-10 h-10 text-blue-500" />
              },
              {
                title: "Financial Intel",
                desc: "Tableros de control en tiempo real y proyecciones con modelos predictivos de IA.",
                icon: <TrendingUp className="w-10 h-10 text-cyan-400" />
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="mb-6">{s.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-white/50 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Founder */}
      <section id="nosotros" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">El factor humano.</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 italic">
            "Liderado por Juan Cristóbal Asís, un Contador que respira tecnología desde 2015. Con experiencia manejando operaciones de gran escala y navegando el mundo cripto desde 2017, su misión es democratizar el acceso a las herramientas que las empresas del futuro usan hoy."
          </p>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-sm">
        <p>© 2026 EsclaLabs. Hecho por Esclabot. 🧉</p>
      </footer>
    </div>
  );
}
