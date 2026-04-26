import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, AlertCircle, Sparkles, Zap } from 'lucide-react';

const ExecutiveEvaluation = ({ feedback }) => {
    if (!feedback) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative overflow-hidden p-10 rounded-[3rem] bg-gradient-to-br from-indigo-600/10 via-blue-600/10 to-transparent border border-white/10 backdrop-blur-2xl group shadow-2xl"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none pdf-hide" />
            
            <MessageCircle size={180} className="absolute -right-12 -top-12 text-blue-500/5 -rotate-12 pointer-events-none group-hover:text-blue-500/10 group-hover:scale-110 transition-all duration-1000 pdf-hide" />
            
            <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                            <Zap size={18} fill="currentColor" className="opacity-40" />
                        </div>
                        <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-400">Overall Feedback</h3>
                    </div>
                </div>
                
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-200 indent-12 italic min-h-[100px]">
                    "{feedback}"
                </p>
                
                <div className="flex items-center gap-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-transparent rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-indigo-500/30" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ExecutiveEvaluation;
