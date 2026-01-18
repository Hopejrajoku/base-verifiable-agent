"use client";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ShieldCheck, Cpu, ArrowRight, Zap, Database, CheckCircle2, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import SpaceBackground from "@/components/SpaceBackground";

// Text Scramble Component for that "ZK Decrypting" look
const ScrambleText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+[]{}>?<";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((letter, index) => {
        if(index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  
  return <span>{display}</span>;
};

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 20;
    const yPct = (mouseY / height - 0.5) * -20;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <div ref={targetRef} className="relative min-h-screen bg-[#000] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <SpaceBackground />
      <Header />
      
      {/* 1. HERO SECTION WITH 3D TILT */}
      <section className="relative pt-52 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#0052FF_0%,transparent_50%)]" />

        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8"
          >
            <Sparkles size={12} className="animate-spin" /> Verifiable Autonomy Engine
          </motion.div>

          <h1 className="text-6xl md:text-[130px] font-black leading-[0.8] tracking-tighter uppercase mb-8">
            <ScrambleText text="SENTINEL" /><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400">
              STARK-POWERED.
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-gray-500 text-xl max-w-2xl mx-auto font-medium mb-12"
          >
            The first AI Agent on Base that proves its own logic. 
            No trust required—just pure, verifiable mathematics via SP1 ZK-VM.
          </motion.p>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX: mouseYSpring, rotateY: mouseXSpring, transformStyle: "preserve-3d" }}
            className="relative cursor-pointer group"
          >
            <div className="glass-card rounded-[3rem] p-1 border-white/10 bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_100px_-20px_rgba(0,82,255,0.5)]">
              <div className="bg-black/90 rounded-[2.9rem] p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="text-left space-y-4">
                    <div className="flex gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <p className="font-mono text-emerald-400 text-sm">{">"} RUNNING PROVER_V1...</p>
                    <p className="font-mono text-white text-xs opacity-50"># Calculating constraints for Base L2</p>
                    <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: [-192, 192] }} 
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                      />
                    </div>
                  </div>
                  <div className="h-24 w-[1px] bg-white/10 hidden md:block" />
                  <Link href="/dashboard" className="bg-white text-black font-black px-12 py-6 rounded-2xl text-2xl hover:bg-blue-500 hover:text-white transition-all transform group-hover:scale-110 shadow-xl">
                    LAUNCH APP
                  </Link>
                </div>
              </div>
            </div>
            {/* 3D Floating Elements */}
            <motion.div style={{ translateZ: 50 }} className="absolute -top-10 -right-10 glass-card p-4 rounded-2xl border-blue-500/50 hidden md:block">
              <ShieldCheck className="text-blue-500" size={32} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. SCROLL REVEAL BENTO GRID */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <motion.h2 
          whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -50 }}
          className="text-4xl font-bold mb-16 tracking-tighter uppercase"
        >
          Infrastructure for <span className="text-blue-500 font-mono italic">Funding Ready</span> Agents.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <BentoCard 
            span="md:col-span-8"
            title="Succinct SP1"
            icon={<Cpu className="text-emerald-500" />}
            desc="We use the world's fastest ZK-VM to prove Rust code. This allows for complex AI logic that is as secure as a simple transfer."
          />
          <BentoCard 
            span="md:col-span-4"
            title="Non-Custodial"
            icon={<Lock className="text-blue-500" />}
            desc="Your private keys never touch the agent. It only sends proofs to the smart contract."
          />
          <BentoCard 
            span="md:col-span-4"
            title="Base Native"
            icon={<Zap className="text-yellow-500" />}
            desc="Designed specifically for the Base ecosystem to leverage sub-cent fees."
          />
          <BentoCard 
            span="md:col-span-8"
            title="Verifiable Intent"
            icon={<CheckCircle2 className="text-blue-500" />}
            desc="Transparency is the default. Every move the agent makes is recorded on-chain with its corresponding ZK-proof."
          />
        </div>
      </section>
    </div>
  );
}

function BentoCard({ span, title, icon, desc }: any) {
  return (
    <motion.div 
      whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }} viewport={{ once: true }}
      className={`${span} glass-card rounded-[2.5rem] p-10 border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden relative`}
    >
      <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">{title}</h3>
      <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}

      {/* TECH STACK FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black font-mono mb-2">PROVER</span>
            <span className="text-sm font-bold">RUST / SP1</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black font-mono mb-2">NETWORK</span>
            <span className="text-sm font-bold">BASE L2</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black font-mono mb-2">INTERFACE</span>
            <span className="text-sm font-bold">NEXT.JS 15</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase">
            Built for the Base Ecosystem
          </p>
        </div>
      </footer>
