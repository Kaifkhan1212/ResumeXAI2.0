import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const SkillTags = ({ title, skills, type, index }) => {
    const isMatched = type === 'matched';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
            className={`p-8 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-xl ${isMatched ? 'hover:border-emerald-500/20' : 'hover:border-rose-500/20'} transition-all duration-500`}
        >
            {/* Background Accent */}
            <div className={`pdf-hide absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full opacity-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-20 ${isMatched ? 'bg-emerald-500' : 'bg-rose-500'}`} />

            <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className={`p-3 rounded-2xl border ${isMatched 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                    {isMatched ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight text-white">{title}</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isMatched ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                        <p className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-600">
                            {isMatched ? "Verified Skills" : "Improvement Area"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 relative z-10">
                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ delay: 0.4 + (i * 0.05), type: "spring", stiffness: 300 }}
                        className={`px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all border shadow-sm ${isMatched
                                ? 'bg-emerald-500/5 text-emerald-300 border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/30'
                                : 'bg-rose-500/5 text-rose-300 border-rose-500/10 hover:bg-rose-500/10 hover:border-rose-500/30'
                            }`}
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SkillTags;
