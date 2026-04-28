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
    XCircle,
    PlayCircle,
    ArrowRight
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
                className="relative p-1.5 rounded-[3.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl backdrop-blur-3xl overflow-hidden group/container"
            >
                {/* Decorative Background Elements */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none group-hover/container:bg-blue-500/20 transition-colors duration-1000" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none group-hover/container:bg-indigo-500/20 transition-colors duration-1000" />

                <div className="p-6 sm:p-8 md:p-14 bg-[#0b0e14]/90 rounded-[2rem] md:rounded-[3.2rem] relative z-10 border border-white/[0.05]">
                    <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
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
                                    className={`h-[280px] sm:h-[360px] relative cursor-pointer rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-700 flex flex-col items-center justify-center p-6 sm:p-8 text-center group/drop overflow-hidden border ${isDragging
                                        ? 'border-transparent scale-[1.02] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] bg-blue-500/5'
                                        : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                                        }`}
                                >
                                    {isDragging && (
                                        <div className="absolute inset-0 z-0">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
                                            <div className="absolute inset-[2px] bg-[#0b0e14] rounded-[2.4rem] z-10" />
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
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

                                    <div className={`w-32 h-32 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-700 shadow-2xl relative z-20 ${file 
                                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rotate-6 scale-110 shadow-blue-500/40' 
                                        : 'bg-white/[0.03] border border-white/5 text-slate-500 group-hover/drop:text-blue-400 group-hover/drop:scale-110 group-hover/drop:bg-blue-500/10 group-hover/drop:border-blue-500/20'
                                    }`}>
                                        {file ? <FileText size={48} /> : <Upload size={48} className="group-hover/drop:-translate-y-2 transition-transform duration-500" />}
                                        
                                        {/* Status Glow */}
                                        <div className={`absolute -inset-4 blur-2xl opacity-20 transition-colors duration-700 ${file ? 'bg-blue-500' : 'bg-transparent group-hover/drop:bg-blue-500'}`} />
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
                                        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] group-hover/drop:text-slate-400 transition-colors">
                                            {file ? `${(file.size / 1024).toFixed(1)} KB • Ready for analysis` : 'Drag and drop PDF or DOCX'}
                                        </p>
                                    </div>

                                    <AnimatePresence>
                                        {file && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute top-6 right-6 z-20"
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
                                <div className="h-[280px] sm:h-[360px] relative group/textarea">
                                    <textarea
                                        value={jd}
                                        onChange={(e) => setJd(e.target.value)}
                                        placeholder="e.g. We are looking for a Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and modern state management tools..."
                                        className="w-full h-full p-6 sm:p-10 pb-20 sm:pb-24 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.02] border border-white/5 focus:border-indigo-500/30 focus:bg-indigo-500/[0.02] outline-none transition-all resize-none text-slate-300 font-medium placeholder:text-slate-600 leading-relaxed tracking-tight group-hover/textarea:border-white/10"
                                    ></textarea>
                                    
                                    <div className="absolute bottom-10 right-10 pointer-events-none opacity-[0.02] group-focus-within/textarea:opacity-[0.06] transition-opacity duration-700">
                                        <Terminal size={100} />
                                    </div>

                                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                                        <motion.div 
                                            animate={{ opacity: jd.length > 0 ? 1 : 0.4 }}
                                            className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#0b0e14] border border-white/[0.05] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] shadow-lg"
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${jd.length > 0 ? 'bg-indigo-500' : 'bg-slate-700'} animate-pulse`} />
                                            {jd.length > 0 ? `${jd.split(/\s+/).filter(w => w).length} Details Found` : 'No Description Yet'}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
                                <motion.button
                                    type="submit"
                                    disabled={!file || !jd || isLoading}
                                    whileHover={!file || !jd || isLoading ? {} : { scale: 1.02, y: -2 }}
                                    whileTap={!file || !jd || isLoading ? {} : { scale: 0.98 }}
                                    className={`flex-1 w-full relative group/btn overflow-hidden py-6 sm:py-7 rounded-[2rem] font-black text-[11px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] transition-all duration-700 shadow-2xl disabled:shadow-none ${!file || !jd || isLoading
                                        ? 'bg-white/[0.02] border border-white/5 text-slate-700 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-blue-500/20'
                                        }`}
                                >
                                    {/* Button Shine */}
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                    
                                    <div className="relative z-10 flex items-center justify-center gap-4">
                                        {isLoading ? (
                                            <>
                                                <div className="relative">
                                                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                                                    <div className="absolute inset-0 blur-md bg-white opacity-40 animate-pulse" />
                                                </div>
                                                <span className="animate-pulse">Analyzing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Run Analysis</span>
                                                <Zap className={`w-4 h-4 ${!file || !jd ? 'text-slate-700' : 'fill-white animate-pulse'}`} />
                                            </>
                                        )}
                                    </div>
                                    
                                    {/* Background glow on hover */}
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 blur-2xl" />
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 sm:mt-24 max-w-4xl mx-auto"
            >
                <div className="text-center mb-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">The Process</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">How ResumeXAI Works</h3>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 mt-8 md:mt-16">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                    {/* Step 1 */}
                    <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="w-16 h-16 rounded-3xl bg-[#0b0e14] border border-white/10 flex items-center justify-center mb-6 shadow-xl relative group">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                            <Upload size={24} className="text-blue-400 relative z-10" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">1. Upload Resume</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">Securely upload your PDF or DOCX file and paste the target job description.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="w-16 h-16 rounded-3xl bg-[#0b0e14] border border-white/10 flex items-center justify-center mb-6 shadow-xl relative group">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                            <Sparkles size={24} className="text-indigo-400 relative z-10" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">2. AI Analyzes Skills</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">Our model compares your experience against ATS requirements in seconds.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="w-16 h-16 rounded-3xl bg-[#0b0e14] border border-white/10 flex items-center justify-center mb-6 shadow-xl relative group">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                            <FileCode size={24} className="text-purple-400 relative z-10" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">3. Optimize & Win</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">Get an actionable report highlighting gaps and improvements to secure the interview.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UploadForm;
