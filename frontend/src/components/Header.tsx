"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="glass-card flex items-center gap-8 px-8 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
          <span className="text-sm font-black tracking-tighter uppercase text-white">Sentinel</span>
        </Link>

        <div className="h-4 w-[1px] bg-white/10" />

        <div className="flex items-center gap-6">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">App</Link>
          <a href="https://base.org" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">Base</a>
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition-all">
          Launch
        </Link>
      </div>
    </motion.nav>
  );
}
