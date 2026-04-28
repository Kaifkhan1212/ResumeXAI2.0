import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowUpRight, Cloud, Terminal, Code2, Database, Shield, Box, LayoutDashboard, Zap } from 'lucide-react';

const getSuggestionMetadata = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('aws') || lower.includes('cloud') || lower.includes('azure') || lower.includes('gcp')) return { icon: Cloud, badge: 'Cloud Infrastructure' };
    if (lower.includes('docker') || lower.includes('kubernetes') || lower.includes('container')) return { icon: Box, badge: 'Containerization' };
    if (lower.includes('ci/cd') || lower.includes('pipeline') || lower.includes('action') || lower.includes('github') || lower.includes('git')) return { icon: Terminal, badge: 'DevOps & CI/CD' };
    if (lower.includes('database') || lower.includes('sql') || lower.includes('postgres') || lower.includes('mongo')) return { icon: Database, badge: 'Database' };
    if (lower.includes('python') || lower.includes('javascript') || lower.includes('react') || lower.includes('code') || lower.includes('api') || lower.includes('django') || lower.includes('fastapi')) return { icon: Code2, badge: 'Software Engineering' };
    if (lower.includes('security') || lower.includes('auth')) return { icon: Shield, badge: 'Security' };
    return { icon: Zap, badge: 'High Impact' };
};

const SuggestionsPanel = ({ suggestions }) => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                    <Lightbulb size={24} className="relative z-10 animate-pulse" />
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">Improvement Plan</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-emerald-500/80">Actionable Roadmap</p>
                    </div>
                </div>
            </div>

            <div className="relative pt-2 pb-4">
                {/* Animated Vertical Progress Rail */}
                <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 overflow-hidden rounded-full hidden sm:block">
                    <motion.div 
                        animate={{ top: ["-10%", "110%"] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                        className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-70 shadow-[0_0_15px_2px_rgba(52,211,153,0.8)]" 
                    />
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {suggestions.map((suggestion, i) => {
                        const meta = getSuggestionMetadata(suggestion);
                        const Icon = meta.icon;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="relative flex flex-col sm:flex-row items-stretch gap-4 sm:gap-8 group"
                            >
                                {/* Step Marker */}
                                <div className="relative z-10 flex flex-col items-center shrink-0 pl-0 sm:pl-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-2xl bg-[#0a0d14]/80 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_-5px_rgba(16,185,129,0.1)] group-hover:border-emerald-500/60 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] group-hover:bg-emerald-950/40 transition-all duration-500 backdrop-blur-md relative overflow-hidden">
                                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <span className="text-xl sm:text-2xl font-black text-emerald-500/50 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,1)] transition-all duration-500 relative z-10">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                {/* Suggestion Card */}
                                <div className="flex-1 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 backdrop-blur-xl group-hover:-translate-y-1 group-hover:bg-white/[0.04] group-hover:border-emerald-500/30 transition-all duration-500 shadow-lg shadow-black/20 group-hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.15)] relative overflow-hidden">
                                    {/* Inner subtle gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-colors duration-500">
                                                <Icon size={14} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">{meta.badge}</span>
                                            </div>
                                            
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.05] group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500 group-hover:rotate-45">
                                                <ArrowUpRight className="text-slate-600 group-hover:text-emerald-400 transition-colors" size={16} />
                                            </div>
                                        </div>
                                        
                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                                            {suggestion}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SuggestionsPanel;
