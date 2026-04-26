import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb } from 'lucide-react';

const SuggestionsPanel = ({ suggestions }) => {
    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
            >
                {/* Background Decoration */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-1000 pdf-hide" />
                
                <div className="flex items-center gap-5 mb-12 relative z-10">
                    <div className="p-3.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10">
                        <Sparkles size={28} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight text-white">Improvement Suggestions</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
                            <p className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-600">Guidance</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 relative z-10">
                    {suggestions.map((suggestion, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                            transition={{ delay: 0.6 + (i * 0.1), type: "spring", stiffness: 100 }}
                            className="group/item p-6 bg-white/[0.01] border border-white/[0.03] rounded-[2rem] flex items-start gap-6 hover:border-blue-500/20 transition-all duration-300"
                        >
                            <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-[11px] font-black group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:shadow-lg group-hover/item:shadow-blue-500/40 transition-all duration-500">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="space-y-1 flex-1">
                                <p className="text-[#a2abc1] font-medium leading-relaxed group-hover/item:text-white transition-colors duration-300">{suggestion}</p>
                                <div className="h-0.5 w-0 group-hover/item:w-12 bg-blue-500/30 transition-all duration-500 rounded-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SuggestionsPanel;
