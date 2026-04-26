import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadForm from '../components/UploadForm';
import ResultsDashboard from '../components/ResultsDashboard';
import AnalyzingSkeleton from '../components/AnalyzingSkeleton';
import { analyzeResume } from '../api';
import { Terminal, LogOut, Github, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAnalyze = async (file, jd) => {
        setLoading(true);
        setError(null);
        try {
            const data = await analyzeResume(file, jd);
            setResults(data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Connection Error: Unable to reach the analysis service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetAll = () => {
        setResults(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[#0b0e14] text-[#dce5fd] selection:bg-blue-500/30 overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full animate-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full animate-glow" style={{ animationDelay: '2s' }} />
            </div>

            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 w-full bg-[#0b0e14]/60 backdrop-blur-xl border-b border-white/[0.05] transition-all">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg">
                            <Terminal size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">ResumeXAI</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a 
                            href="https://github.com/Kaifkhan1212/-AI-Resume-Analyzer" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
                        >
                            <Github size={14} className="mr-2" />
                            Repository
                        </a>
                        <div className="h-4 w-px bg-white/[0.05] hidden md:block" />
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/login');
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all text-xs font-bold"
                        >
                            <LogOut size={14} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative">
                <AnimatePresence mode="wait">
                    {loading && !results ? (
                        <motion.div
                            key="analyzing-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pt-20"
                        >
                            <AnalyzingSkeleton />
                        </motion.div>
                    ) : !results ? (
                        <motion.div
                            key="dashboard-home"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="pt-20 pb-32"
                        >
                            <header className="max-w-4xl mx-auto text-center px-6 mb-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] uppercase tracking-widest font-bold text-blue-400 mb-8"
                                >
                                    <Sparkles size={10} className="animate-pulse" />
                                    System Status: Online
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter gradient-text"
                                >
                                    AI-Powered Resume <br />
                                    Analysis.
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-[#a2abc1] text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
                                >
                                    Get instant AI-driven insights on how well your resume matches the job requirements and optimize your application for success.
                                </motion.p>
                            </header>

                            <section className="max-w-6xl mx-auto px-6">
                                <UploadForm onAnalyze={handleAnalyze} isLoading={loading} />
                                
                                <AnimatePresence>
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-12 bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex items-center gap-4 text-red-400 max-w-2xl mx-auto"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                                                <Terminal size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-black mb-1">System Error</h4>
                                                <p className="text-sm font-medium">{error}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard-results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="py-12"
                        >
                            <ResultsDashboard data={results} onReset={resetAll} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default Dashboard;
