import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal,
    Upload,
    FileText,
    Sparkles,
    CheckCircle2,
    Loader2,
    Search,
    Zap,
    Plus,
    FileCode,
    XCircle
} from "lucide-react";

const UploadForm = ({ onAnalyze, isLoading }) => {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file && jd) onAnalyze(file, jd);
    };

    return (
        <div className="max-w-6xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                className="relative p-1 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl backdrop-blur-3xl overflow-hidden group/container"
            >
                {/* Decorative Background Elements */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none group-hover/container:bg-blue-500/20 transition-colors duration-1000" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none group-hover/container:bg-indigo-500/20 transition-colors duration-1000" />

                <div className="p-8 md:p-12 bg-[#0b0e14]/80 rounded-[2.9rem] relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* File Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <label className="flex items-center text-[10px] uppercase tracking-[0.4em] font-black text-slate-500">
                                        <FileCode className="w-4 h-4 mr-2 text-blue-500" />
                                        Upload Your Resume
                                    </label>
                                    <AnimatePresence>
                                        {file && (
                                            <motion.button 
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                type="button" 
                                                onClick={() => setFile(null)}
                                                className="text-[9px] uppercase tracking-wider font-black text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-1.5"
                                            >
                                                <span>Remove File</span>
                                                <XCircle size={12} />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                                
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
                                    }}
                                    className={`h-[340px] relative cursor-pointer border-2 border-dashed rounded-[2.5rem] transition-all duration-700 flex flex-col items-center justify-center p-8 text-center group/drop ${isDragging
                                        ? 'border-blue-500 bg-blue-500/10 scale-[1.02] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]'
                                        : 'border-white/5 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        accept=".pdf,.docx"
                                    />
                                    
                                    {/* Scanline Animation during Drag */}
                                    <AnimatePresence>
                                        {isDragging && (
                                            <motion.div 
                                                initial={{ top: '0%' }}
                                                animate={{ top: '100%' }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-[2px] z-10 pointer-events-none"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 shadow-2xl relative ${file 
                                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rotate-6 scale-110 shadow-blue-500/40' 
                                        : 'bg-white/[0.02] text-slate-600 group-hover/drop:text-slate-300 group-hover/drop:scale-110'
                                    }`}>
                                        {file ? <FileText size={48} /> : <Upload size={48} className="group-hover/drop:-translate-y-2 transition-transform duration-500" />}
                                        
                                        {/* Status Glow */}
                                        <div className={`absolute -inset-4 blur-2xl opacity-20 transition-colors duration-700 ${file ? 'bg-blue-500' : 'bg-transparent'}`} />
                                    </div>

                                    <div className="space-y-3 relative z-20">
                                        <motion.h3 
                                            key={file ? 'staged' : 'empty'}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-2xl font-black tracking-tight text-white"
                                        >
                                            {file ? file.name : 'Select Resume'}
                                        </motion.h3>
                                        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em]">
                                            {file ? `${(file.size / 1024).toFixed(1)} KB • Ready for analysis` : 'Drag and drop PDF or DOCX'}
                                        </p>
                                    </div>

                                    <AnimatePresence>
                                        {file && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute top-6 right-6"
                                            >
                                                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] uppercase tracking-widest font-black text-emerald-400 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
                                                    <CheckCircle2 size={14} className="animate-pulse" />
                                                    File Staged
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* JD Section */}
                            <div className="space-y-6">
                                <label className="flex items-center text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 px-2">
                                    <Search className="w-4 h-4 mr-2 text-indigo-500" />
                                    Job Description
                                </label>
                                <div className="h-[340px] relative group/textarea">
                                    <textarea
                                        value={jd}
                                        onChange={(e) => setJd(e.target.value)}
                                        placeholder="Paste the Job Description here..."
                                        className="w-full h-full p-10 pb-24 rounded-[2.5rem] bg-white/[0.01] border-2 border-white/5 focus:border-indigo-500/30 focus:bg-indigo-500/[0.02] outline-none transition-all resize-none text-slate-300 font-medium placeholder:text-slate-700 leading-relaxed tracking-tight"
                                    ></textarea>
                                    
                                    <div className="absolute bottom-10 right-10 pointer-events-none opacity-[0.03] group-focus-within/textarea:opacity-[0.08] transition-opacity duration-700">
                                        <Terminal size={80} />
                                    </div>

                                    <div className="absolute bottom-10 left-10">
                                        <motion.div 
                                            animate={{ opacity: jd.length > 0 ? 1 : 0.4 }}
                                            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] backdrop-blur-xl"
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${jd.length > 0 ? 'bg-indigo-500' : 'bg-slate-700'} animate-pulse`} />
                                            {jd.length > 0 ? `${jd.split(/\s+/).filter(w => w).length} Details Found` : 'No Description Yet'}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <motion.button
                                type="submit"
                                disabled={!file || !jd || isLoading}
                                whileHover={!file || !jd || isLoading ? {} : { scale: 1.02, y: -4 }}
                                whileTap={!file || !jd || isLoading ? {} : { scale: 0.98 }}
                                className={`w-full max-w-xl relative group/btn overflow-hidden py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.5em] transition-all duration-700 shadow-2xl disabled:shadow-none ${!file || !jd || isLoading
                                    ? 'bg-white/[0.02] border border-white/5 text-slate-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-blue-500/20'
                                    }`}
                            >
                                {/* Button Shine */}
                                <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                
                                <div className="relative z-10 flex items-center justify-center gap-6">
                                    {isLoading ? (
                                        <>
                                            <div className="relative">
                                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                                                <div className="absolute inset-0 blur-md bg-white opacity-40 animate-pulse" />
                                            </div>
                                            <span className="animate-pulse">Analyzing Resume...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Analyze Resume</span>
                                            <Zap className={`w-5 h-5 ${!file || !jd ? 'text-slate-700' : 'fill-white animate-pulse'}`} />
                                        </>
                                    )}
                                </div>
                                
                                {/* Background glow on hover */}
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 blur-2xl" />
                            </motion.button>
                            
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12 text-[10px] uppercase tracking-[0.4em] font-black text-slate-800 flex items-center gap-4 py-2 px-6 rounded-full border border-white/[0.02]"
                            >
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-1 h-1 rounded-full bg-blue-500/20" />
                                    ))}
                                </div>
                                <span className="flex items-center gap-2">
                                    <Sparkles size={12} className="text-blue-600" />
                                    AI Analysis Ready
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-1 h-1 rounded-full bg-blue-500/20" />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default UploadForm;
