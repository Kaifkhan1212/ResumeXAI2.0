import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';

const MetricCard = ({ title, value, type, suffix = "%", label = "", index = 0 }) => {
    const isAI = type === 'ai';
    const [displayValue, setDisplayValue] = useState("0.00");
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            delay: 0.8 + index * 0.1,
            ease: "circOut",
            onUpdate: (latest) => setDisplayValue(latest.toFixed(2))
        });
        return () => controls.stop();
    }, [value, index]);
    
    const getThemeColor = () => {
        // AI Metric Logic
        if (isAI) {
            // Clicked state takes precedence
            if (isClicked) return { primary: '#ef4444', secondary: '#991b1b' };
            
            // Priority 1: Label-based (User expectation)
            if (label && label.toUpperCase() === 'HIGH') return { primary: '#ef4444', secondary: '#f87171' };
            
            // Priority 2: Value-based thresholds
            if (value < 20) return { primary: '#10b981', secondary: '#34d399' }; // Emerald for Human
            if (value < 40) return { primary: '#f59e0b', secondary: '#fbbf24' }; // Yellow for Caution
            return { primary: '#ef4444', secondary: '#f87171' }; // Red for High AI Content
        }
        
        // Standard Metric Logic (Match Score & Selection Probability)
        // Keep these Blue/Indigo as they were "according to their" identity
        return { primary: '#3b82f6', secondary: '#818cf8' };
    };

    const colors = getThemeColor();
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const gradientId = `grad-${title.replace(/\s+/g, '-').toLowerCase()}`;

    const [intPart, decPart] = displayValue.split('.');

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => isAI && setIsClicked(!isClicked)}
            transition={{ delay: index * 0.1, duration: 1, type: "spring", bounce: 0.3 }}
            className={`group relative p-8 rounded-[3rem] bg-white/[0.03] border backdrop-blur-md transition-all duration-500 overflow-hidden shadow-2xl cursor-pointer ${
                isAI && isClicked ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:bg-white/[0.05] hover:border-white/20'
            }`}
        >
            {/* Dynamic Glow */}
            <div 
                className="absolute -inset-24 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-[60px] pointer-events-none pdf-hide"
                style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}
            />

            {/* Clicked Red Glow Overlay */}
            <AnimatePresence>
                {isAI && isClicked && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-500/5 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="space-y-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] block transition-colors ${
                        isAI && isClicked ? 'text-red-400' : 'text-slate-500'
                    }`}>{title}</span>
                    <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto" />
                </div>

                <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform overflow-visible">
                        <defs>
                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={colors.primary} />
                                <stop offset="100%" stopColor={colors.secondary} />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="72"
                            cy="72"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-white/[0.04]"
                        />
                        <motion.circle
                            cx="72"
                            cy="72"
                            r={radius}
                            stroke={`url(#${gradientId})`}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 2, ease: "circOut" }}
                            strokeLinecap="round"
                            style={{ 
                                filter: `drop-shadow(0 0 12px ${colors.primary}${isAI && isClicked ? '80' : '40'})` 
                            }}
                        />
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="flex items-baseline text-white">
                            <span className="text-4xl font-black tracking-tighter">{intPart}</span>
                            <span className={`text-xl font-bold transition-opacity ${isAI && isClicked ? 'opacity-60 text-red-100' : 'opacity-30'}`}>.{decPart}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold absolute top-10 right-10">{suffix}</span>
                    </div>
                </div>

                {label && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="px-5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-lg backdrop-blur-xl transition-colors"
                        style={{ 
                            backgroundColor: `${colors.primary}15`, 
                            borderColor: `${colors.primary}30`,
                            color: colors.primary,
                            boxShadow: `0 8px 20px -10px ${colors.primary}40`
                        }}
                    >
                        {label}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default MetricCard;
