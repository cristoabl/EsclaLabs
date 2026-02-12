"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Cpu, TrendingUp, ShieldCheck, Zap, Globe, BarChart3, Mail } from 'lucide-react';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] animate-pulse rounded-full" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
              <Cpu className="text-black w-6 h-6" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">EsclaLabs</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Servicios', 'Filosofía', 'Nosotros'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white/50 hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full" />
              </a>
            ))}
            <button className="relative group px-6 py-2.5 overflow-hidden rounded-full bg-white text-black font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
              <span className="relative z-10">Agendar Consultoría</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center z-10 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10"
          >
            <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">Siguiente generación de agencias</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-10 leading-[0.9]"
          >
            Finanzas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
              Potenciadas por IA.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed"
          >
            EsclaLabs liquida la ineficiencia. Fusionamos la precisión contable con la potencia de la Inteligencia Artificial para escalar tu rentabilidad.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group relative px-10 py-5 bg-cyan-500 text-black rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]">
              Quiero Resultados Reales
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-md">
              Explorar Lab
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Abstract Element */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-32 max-w-6xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md p-8 overflow-hidden aspect-[21/9] flex items-center justify-center shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-shimmer" />
            <Bot className="w-32 h-32 text-cyan-500 group-hover:scale-125 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-10 flex gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "AI Business Agents",
                desc: "Desplegamos agentes inteligentes que manejan tu atención al cliente, ventas y back-office. Automatización total.",
                icon: <Bot className="w-12 h-12" />,
                color: "text-cyan-400"
              },
              {
                title: "Crypto Ecosystems",
                desc: "Estrategias de tesorería en stablecoins, integración de pagos Web3 y consultoría DeFi de alto nivel.",
                icon: <Globe className="w-12 h-12" />,
                color: "text-blue-500"
              },
              {
                title: "Predictive Finance",
                desc: "No miramos el pasado. Usamos modelos de Machine Learning para predecir tus flujos y optimizar impuestos.",
                icon: <BarChart3 className="w-12 h-12" />,
                color: "text-purple-500"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -20, scale: 1.02 }}
                className="group p-10 rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent hover:border-cyan-500/30 transition-all duration-500"
              >
                <div className={`mb-8 p-4 rounded-2xl bg-white/5 inline-block ${service.color} group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="filosofía" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold mb-10 tracking-tight"
            >
              Maña + <br /> 
              Ingeniería.
            </motion.h2>
            <p className="text-white/50 text-xl leading-relaxed mb-8">
              En Córdoba le decimos "maña" a la capacidad de resolver lo que sea con lo que hay. En EsclaLabs, elevamos la maña a nivel de ingeniería.
            </p>
            <ul className="space-y-6">
              {[
                "Resolutivos por naturaleza.",
                "Sin burocracia, solo código y ejecución.",
                "Obsesionados con el ROI de nuestros clientes."
              ].map((text, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white/80 font-medium"
                >
                  <ShieldCheck className="text-cyan-500 w-6 h-6" />
                  {text}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px]" />
            <motion.div 
              whileHover={{ rotateY: 20 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-2 aspect-square flex items-center justify-center overflow-hidden"
            >
              <Bot className="w-64 h-64 text-white/10" />
              <h4 className="absolute text-8xl font-black text-white/5 select-none">RESOLVE</h4>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-r from-cyan-600 to-blue-700 p-16 text-center shadow-[0_0_100px_rgba(6,182,212,0.2)]"
        >
          <h2 className="text-4xl md:text-6xl font-black text-black mb-8">¿Listo para el siguiente nivel?</h2>
          <p className="text-black/70 text-xl mb-12 font-bold max-w-2xl mx-auto">
            Estamos tomando solo 2 nuevos proyectos para este trimestre. Asegurá tu lugar ahora.
          </p>
          <button className="px-12 py-6 bg-black text-white rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4 mx-auto">
            Hablemos hoy <Mail className="w-8 h-8" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Cpu className="text-black w-5 h-5" />
            </div>
            EsclaLabs
          </div>
          <p className="text-white/30 text-sm">© 2026 EsclaLabs. Un laboratorio de Juan Cristóbal Asís. Hecho con 🧉 y Esclabot.</p>
          <div className="flex gap-6">
             <a href="#" className="text-white/50 hover:text-white transition-colors underline decoration-cyan-500/30">LinkedIn</a>
             <a href="#" className="text-white/50 hover:text-white transition-colors underline decoration-blue-500/30">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
