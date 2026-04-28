import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, ChevronRight } from 'lucide-react';

const AIContext = ({ reasoning }) => {
    // Split reasoning into sentences for points
    const points = reasoning
        ? reasoning.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0).map(s => s.trim() + '.')
        : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative p-8 md:p-10 rounded-[3rem] bg-[#0f1219] border border-purple-500/20 shadow-[0_0_40px_-15px_rgba(168,85,247,0.2)] overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-50 pointer-events-none pdf-hide" />
            <Brain className="absolute -right-16 -bottom-16 w-64 h-64 text-purple-500/5 -rotate-12 pointer-events-none group-hover:text-purple-500/10 group-hover:scale-110 transition-all duration-1000 pdf-hide" />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/30 text-purple-400 shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]">
                            <Cpu size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight text-white">Analysis Detail</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-purple-400/80">AI Reasoning</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-3">
                    {points.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-purple-500/[0.05] border border-transparent hover:border-purple-500/20 transition-all duration-300"
                        >
                            <div className="mt-1 flex-shrink-0">
                                <ChevronRight size={18} className="text-purple-400" />
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                                {point}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default AIContext;

