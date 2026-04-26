import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, ShieldCheck, Zap, Brain } from 'lucide-react';

const AnalyzingSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="space-y-4">
                    <div className="h-4 w-24 bg-white/5 rounded-full" />
                    <div className="h-16 w-64 bg-white/10 rounded-2xl" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-10 w-40 bg-white/5 rounded-xl" />
                    <div className="h-14 w-48 bg-white/20 rounded-2xl" />
                </div>
            </div>

            {/* Metrics Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 rounded-[3rem] bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center space-y-6">
                        <div className="h-3 w-32 bg-white/5 rounded-full" />
                        <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/5" />
                        </div>
                        <div className="h-6 w-16 bg-white/10 rounded-lg" />
                    </div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-12">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-80 rounded-[3rem] bg-white/[0.02] border border-white/5" />
                    ))}
                </div>
                <div className="space-y-12">
                    <div className="h-[500px] rounded-[3rem] bg-white/[0.02] border border-white/5" />
                    <div className="h-40 rounded-[3rem] bg-white/[0.02] border border-white/5" />
                </div>
            </div>

            {/* Centered Analyzing Overlay */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 rounded-[4rem] bg-[#0b0e14]/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)] flex flex-col items-center gap-8 relative overflow-hidden"
                >
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                    <Brain className="absolute -top-12 -right-12 w-48 h-48 text-blue-500/10 -rotate-12" />
                    
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)]">
                            <Loader2 size={48} className="text-white animate-spin" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center border-4 border-[#0b0e14] shadow-lg animate-bounce">
                            <Sparkles size={14} className="text-white" />
                        </div>
                    </div>
                    
                    <div className="text-center space-y-3 relative">
                        <h2 className="text-3xl font-black tracking-tighter text-white">Analyzing Resume</h2>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    animate={{ left: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                                />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500">AI Engine Active</span>
                        </div>
                        <p className="text-slate-500 text-xs font-medium max-w-xs mx-auto leading-relaxed">
                            Matching your skills and experience with the job requirements...
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AnalyzingSkeleton;
