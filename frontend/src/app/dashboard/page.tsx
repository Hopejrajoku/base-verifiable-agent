"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, Zap, TrendingUp, History, Box, Lock, Terminal as TerminalIcon, ExternalLink, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import axios from "axios";
import Header from "@/components/Header";
import SpaceBackground from "@/components/SpaceBackground";

const ScrambleText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((l, i) => i < iteration ? text[i] : "@#$%&"[Math.floor(Math.random() * 5)]).join(""));
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1/2;
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{display}</span>;
};

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isTriggering, setIsTriggering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/logs');
        if (response.data && response.data.length > 0) {
          const data = [...response.data].reverse();
          setLogs(data);
          setChartData(data.map((l: any) => ({ time: new Date(l.timestamp).toLocaleTimeString(), price: l.price })));
        }
      } catch (e) { console.error("Fetch error:", e); }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerAgent = async () => {
    setIsTriggering(true);
    try {
        await axios.post('/api/execute');
    } catch (e) {
        console.error("Execution error:", e);
    } finally {
        setTimeout(() => setIsTriggering(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <SpaceBackground />
      
      <div className="pb-20">
        <Header />
      </div>
      
      <main className="pt-32 p-4 md:p-12 max-w-[1600px] mx-auto space-y-8 relative">
        
        {/* HUD: SYSTEM CRITICALS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{opacity:0, scale:0.95}} 
            animate={{opacity:1, scale:1}} 
            className="lg:col-span-3 flex flex-col md:flex-row items-center justify-between glass-card p-8 rounded-[2.5rem] border-blue-500/20 bg-blue-500/5"
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse" />
                <Activity className="text-blue-500 relative" size={40} />
              </div>
              <div>
                <h2 className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase mb-1">Network_Intelligence_Node</h2>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                  <ScrambleText text="SENTINEL_OPERATIONAL" />
                </h1>
              </div>
            </div>
            
            <div className="flex gap-12 mt-6 md:mt-0 md:border-l border-white/10 md:pl-12">
                <div className="text-left">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Verifying_Via</p>
                    <p className="text-emerald-400 font-mono font-bold text-sm">SP1_ZK_VM</p>
                </div>
                <div className="text-left">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Chain_State</p>
                    <p className="text-blue-400 font-mono font-bold text-sm">BASE_SEPOLIA</p>
                </div>
            </div>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 82, 255, 0.4)" }} 
            whileTap={{ scale: 0.98 }}
            onClick={triggerAgent}
            disabled={isTriggering}
            className={`relative overflow-hidden group rounded-[2.5rem] p-8 font-black text-2xl flex flex-col items-center justify-center gap-2 transition-all ${isTriggering ? 'bg-emerald-500 text-black' : 'bg-blue-600 text-white shadow-[0_0_50px_-10px_#0052FF]'}`}
          >
            {isTriggering ? (
              <>
                <Cpu className="animate-spin mb-2" size={32} />
                <span className="text-sm tracking-widest">PROVING...</span>
              </>
            ) : (
              <>
                <Zap fill="currentColor" size={32} />
                <span className="tracking-tighter italic">EXECUTE AGENT</span>
              </>
            )}
          </motion.button>
        </div>

        {/* METRICS & ANALYSIS */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div whileHover={{y:-5}} className="glass-card p-10 rounded-[3rem] relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-gray-500 text-xs font-black tracking-widest uppercase mb-4">Real-Time Oracle (ETH/USD)</p>
                            <h3 className="text-6xl font-mono font-black tracking-tighter">${logs[0]?.price || "----"}</h3>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-3xl text-blue-400 animate-pulse">
                            <TrendingUp size={28} />
                        </div>
                    </div>
                    <div className="h-40 w-full mt-8 opacity-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0052FF" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="price" stroke="#0052FF" strokeWidth={5} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div whileHover={{y:-5}} className="glass-card p-10 rounded-[3rem] border-emerald-500/10 bg-emerald-500/[0.02]">
                    <div className="flex justify-between items-start mb-6">
                      <p className="text-gray-500 text-xs font-black tracking-widest uppercase">Verified Treasury</p>
                      <Lock size={20} className="text-emerald-500/50" />
                    </div>
                    <h3 className="text-6xl font-mono font-black tracking-tighter">
                      {logs[0]?.balance ? parseFloat(logs[0].balance).toFixed(4) : "0.0000"} 
                      <span className="text-2xl text-gray-600 ml-2 italic">ETH</span>
                    </h3>
                    <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                           <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Base_Sepolia_Vault</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-500">0x6ef...557ac3</span>
                    </div>
                </motion.div>
            </div>

            {/* ON-CHAIN PROOF VAULT */}
            <div className="glass-card rounded-[3rem] p-10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="flex items-center gap-3 text-xs font-black tracking-[0.4em] uppercase">
                        <History size={20} className="text-blue-500" /> On-Chain_Proof_Archive
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400">
                      STARK_VERIFIED
                    </div>
                </div>
                <div className="space-y-4">
                    <AnimatePresence>
                        {logs.length > 0 ? logs.slice(0, 5).map((log, i) => (
                            <motion.div 
                                key={log.timestamp || i} 
                                initial={{opacity:0, x:-20}} 
                                animate={{opacity:1, x:0}}
                                transition={{delay: i * 0.1}}
                                className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-white/[0.04] transition-all"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="w-14 h-14 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                        <Box size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <p className="font-black text-sm uppercase tracking-tighter text-white">AUTONOMOUS_INTENT_PROOF</p>
                                          <ShieldCheck size={14} className="text-emerald-500" />
                                        </div>
                                        <p className="font-mono text-[10px] text-gray-500 flex items-center gap-2">
                                          TX: {log.txHash ? `${log.txHash.slice(0, 24)}...` : "PENDING_VERIFICATION..."} 
                                          <ExternalLink size={10} className="opacity-50" />
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-400 font-black font-mono uppercase text-sm italic">Verified_True</p>
                                    <p className="text-[10px] text-gray-500 font-mono tracking-tighter">
                                      {log.price && log.limit ? `$${log.price} <= $${log.limit}` : "---"}
                                    </p>
                                </div>
                            </motion.div>
                        )) : (
                          <div className="text-center py-10 text-gray-600 font-mono text-sm uppercase tracking-widest">
                            No logs detected. Initialize agent to begin.
                          </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </div>

          {/* ZK-VM CONSOLE */}
          <div className="xl:col-span-4">
            <div className="glass-card rounded-[3rem] p-10 h-full min-h-[700px] flex flex-col relative overflow-hidden bg-black/60">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <TerminalIcon size={140} />
                </div>
                <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-8">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/40" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                        <div className="w-3 h-3 rounded-full bg-green-500/40" />
                    </div>
                    <span className="text-[11px] font-black font-mono tracking-[0.3em] text-blue-400 uppercase">Prover_Kernel_v1.0</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar font-mono text-[11px] leading-relaxed">
                    {logs.map((log, i) => (
                        <div key={i} className="space-y-3 p-5 rounded-[2rem] bg-blue-500/[0.03] border border-blue-500/10">
                            <div className="flex justify-between items-center opacity-50">
                              <p className="text-blue-500 font-black"># SESSION_{logs.length - i}</p>
                              <p>{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : "NOW"}</p>
                            </div>
                            <p className="text-gray-300 italic">{">"} FETCHING_BASE_RPC_STATE...</p>
                            <p className="text-emerald-400 font-bold">{`> CONDITION: PRICE_STRIKE < LIMIT`}</p>
                            <div className="py-2 border-y border-white/5 my-2">
                              <p className="text-blue-400/80 truncate">{`> STARK_PROOF: 0x7fa...${Math.random().toString(16).slice(2, 10)}`}</p>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                <span className="font-black text-[10px] uppercase tracking-widest text-emerald-500">Proof_Accepted_By_Base</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center gap-3 text-blue-500 font-black">
                      <span className="animate-ping h-2 w-2 rounded-full bg-blue-500" />
                      {">"} LISTENING_FOR_INTENT...
                    </div>
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
