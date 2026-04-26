import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await registerUser(name, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Try a different email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30 overflow-hidden relative">
            {/* Background Accents */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-glow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-glow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-[420px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] mb-8 transition-transform hover:scale-105 duration-300">
                        <span className="text-3xl font-black tracking-tighter">RX</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-3 gradient-text">Create Account</h1>
                    <p className="text-slate-400 text-sm font-medium">Join the next generation of professional analysis.</p>
                </div>

                {/* Register Form Container */}
                <div className="glass-morphism p-8 rounded-[2rem]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-1">
                                Full Name
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-all duration-300" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-white/[0.03] border border-white/[0.05] focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 rounded-xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-slate-600 text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-all duration-300" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white/[0.03] border border-white/[0.05] focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 rounded-xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-slate-600 text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-all duration-300" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/[0.03] border border-white/[0.05] focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 rounded-xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-slate-600 text-sm font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] active:scale-[0.98] overflow-hidden"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Get Started
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="mt-10 text-center text-sm text-slate-500 font-medium">
                    Already registered?{' '}
                    <Link to="/login" className="text-white font-bold hover:text-indigo-500 transition-colors underline underline-offset-4 decoration-white/10 decoration-2">
                        Sign In
                    </Link>
                </p>

                {/* Legal Footer */}
                <div className="mt-20 flex justify-center gap-8 text-[10px] uppercase tracking-[0.2em] font-black text-slate-700">
                    <a href="#" className="hover:text-slate-400 transition-colors">Terminals</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">Nodes</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
