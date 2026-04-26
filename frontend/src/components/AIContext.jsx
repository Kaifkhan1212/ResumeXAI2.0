import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Cpu } from 'lucide-react';

const AIContext = ({ reasoning }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl overflow-hidden group shadow-2xl"
        >
            {/* Animated Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 opacity-30 pointer-events-none pdf-hide" />
            
            <Brain className="absolute -right-16 -bottom-16 w-64 h-64 text-blue-500/5 -rotate-12 pointer-events-none group-hover:text-blue-500/10 group-hover:scale-110 transition-all duration-1000 pdf-hide" />
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full animate-pulse" />
                            <div className="relative p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                                <Cpu size={20} className="animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-500/80">Analysis Detail</h4>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600">AI Reasoning</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                        <span className="text-[9px] font-black text-blue-400/80 uppercase tracking-widest">Insights</span>
                    </div>
                </div>
                
                <div className="relative">
                    <Sparkles className="absolute -top-6 -left-6 text-blue-500/20 w-12 h-12 rotate-12" />
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-200 indent-12 italic min-h-[100px]">
                        "{reasoning}"
                    </p>
                </div>
                
                <div className="mt-12 flex items-center gap-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-blue-500/20" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AIContext;

