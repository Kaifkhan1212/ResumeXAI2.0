import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, googleLogin } from '../api';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (response) => {
        setError('');
        setLoading(true);
        try {
            const data = await googleLogin(response.credential);
            localStorage.setItem('token', data.access_token);
            navigate('/dashboard');
        } catch (err) {
            console.error("Google login failed:", err);
            setError(err.response?.data?.detail || 'Google login failed.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        /* global google */
        if (window.google) {
            const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleSuccess
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleButton"),
                {
                    theme: "outline",
                    size: "large",
                    width: "360",
                    shape: "rectangular",
                    logo_alignment: "left"
                }
            );
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30 overflow-hidden relative">
            {/* Background Accents */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-glow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-[420px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] mb-8 transition-transform hover:scale-105 duration-300">
                        <span className="text-3xl font-black tracking-tighter">RX</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-3 gradient-text">Welcome back</h1>
                    <p className="text-slate-400 text-sm font-medium">Step into the future of professional storytelling.</p>
                </div>

                {/* Login Form Container */}
                <div className="glass-morphism p-8 rounded-[2rem]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-all duration-300" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white/[0.03] border border-white/[0.05] focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 rounded-xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-slate-600 text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">
                                    Password
                                </label>
                                <button type="button" className="text-[10px] uppercase tracking-wider font-black text-blue-500 hover:text-blue-400 transition-colors">
                                    Forgot?
                                </button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-all duration-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/[0.03] border border-white/[0.05] focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 rounded-xl py-4 pl-12 pr-12 outline-none transition-all placeholder:text-slate-600 text-sm font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] overflow-hidden"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        {/* Divider */}
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/[0.05]"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black text-slate-600">
                                <span className="bg-[#12161b] px-4">Secure Gateway</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="flex justify-center">
                            <div id="googleButton" className="w-full rounded-xl overflow-hidden transition-all hover:scale-[1.02]"></div>
                        </div>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="mt-10 text-center text-sm text-slate-500 font-medium">
                    New to ResumeXAI?{' '}
                    <Link to="/register" className="text-white font-bold hover:text-blue-500 transition-colors underline underline-offset-4 decoration-white/10 decoration-2">
                        Create instance
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

export default Login;
