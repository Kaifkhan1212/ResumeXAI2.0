import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ChevronDown, CheckCircle2, AlertTriangle, Info, ListChecks, Maximize2, Minimize2, Sparkles } from 'lucide-react';

const analyzeFeedback = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('gap') || lowerText.includes('missing') || lowerText.includes('lack') || lowerText.includes('noticeable')) {
        return { 
            title: 'Skill Gaps Detected', 
            icon: AlertTriangle, 
            severity: 'Critical', 
            color: 'rose',
            borderClass: 'border-rose-500/50',
            bgClass: 'bg-rose-500/10',
            textClass: 'text-rose-400',
            shadowClass: 'shadow-[0_0_15px_-3px_rgba(244,63,94,0.4)]',
            fix: 'Acquire missing skills through courses or projects. Update resume to reflect them clearly.'
        };
    }
    if (lowerText.includes('strength') || lowerText.includes('robust') || lowerText.includes('excellent') || lowerText.includes('good') || lowerText.includes('laudable') || lowerText.includes('strong') || lowerText.includes('well-structured')) {
        return { 
            title: 'Technical Strengths', 
            icon: CheckCircle2, 
            severity: 'Positive', 
            color: 'emerald',
            borderClass: 'border-emerald-500/50',
            bgClass: 'bg-emerald-500/10',
            textClass: 'text-emerald-400',
            shadowClass: 'shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]',
            fix: null
        };
    }
    if (lowerText.includes('improve') || lowerText.includes('enhance') || lowerText.includes('could benefit') || lowerText.includes('prioritize') || lowerText.includes('bridge') || lowerText.includes('addition')) {
        return { 
            title: 'Gap Analysis & Improvement', 
            icon: Sparkles, 
            severity: 'Recommended', 
            color: 'amber',
            borderClass: 'border-amber-500/50',
            bgClass: 'bg-amber-500/10',
            textClass: 'text-amber-400',
            shadowClass: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]',
            fix: 'Consider adding explicit real-world scenarios or project details to back up these claims.'
        };
    }
    if (lowerText.includes('format') || lowerText.includes('structure') || lowerText.includes('typo') || lowerText.includes('clearer') || lowerText.includes('connections')) {
        return { 
            title: 'Formatting Improvements', 
            icon: ListChecks, 
            severity: 'Moderate', 
            color: 'blue',
            borderClass: 'border-blue-500/50',
            bgClass: 'bg-blue-500/10',
            textClass: 'text-blue-400',
            shadowClass: 'shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)]',
            fix: 'Restructure sentences for clarity and ensure direct connection to job requirements.'
        };
    }
    return { 
        title: 'General Insight', 
        icon: Info, 
        severity: 'Note', 
        color: 'indigo',
        borderClass: 'border-indigo-500/50',
        bgClass: 'bg-indigo-500/10',
        textClass: 'text-indigo-400',
        shadowClass: 'shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]',
        fix: null
    };
};

const ResumeFeedbackAccordion = ({ feedbackData }) => {
    const points = useMemo(() => {
        const rawPoints = Array.isArray(feedbackData) 
            ? feedbackData 
            : (feedbackData || '').split(/\.(?=\s|$)/).filter(s => s.trim().length > 0).map(s => s.trim() + '.');
        
        return rawPoints.map((point, index) => ({
            id: `fb-${index}`,
            text: point,
            index: index + 1,
            ...analyzeFeedback(point)
        }));
    }, [feedbackData]);

    const [expandedIds, setExpandedIds] = useState(new Set([points[0]?.id]));

    const toggleExpand = (id) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    const toggleAll = () => {
        if (expandedIds.size === points.length) {
            setExpandedIds(new Set());
        } else {
            setExpandedIds(new Set(points.map(p => p.id)));
        }
    };

    const criticalCount = points.filter(p => p.severity === 'Critical').length;
    const allExpanded = expandedIds.size === points.length && points.length > 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 p-6 sm:p-10 rounded-[2.5rem] bg-[#0a0d14]/80 backdrop-blur-xl border border-white/[0.08] relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-rose-500/5 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white shadow-lg backdrop-blur-md">
                        <AlertCircle size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">Resume Feedback</h3>
                        <div className="flex items-center gap-3">
                            <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">AI Deep Dive</span>
                            {criticalCount > 0 && (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">{criticalCount} Critical</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button 
                    onClick={toggleAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.15] text-slate-300 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                    {allExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    {allExpanded ? 'Collapse All' : 'Expand All'}
                </button>
            </div>

            <div className="space-y-4 relative z-10">
                {points.map((point) => {
                    const isExpanded = expandedIds.has(point.id);
                    const Icon = point.icon;

                    return (
                        <motion.div
                            key={point.id}
                            layout
                            className={`group relative rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                                isExpanded 
                                    ? 'bg-white/[0.03] border-white/10 shadow-lg' 
                                    : 'bg-black/20 border-white/[0.05] hover:bg-white/[0.02] hover:border-white/10'
                            }`}
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-colors duration-500 ${point.bgClass} group-hover:${point.bgClass.replace('/10', '/30')}`}>
                                <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-1/3 ${point.bgClass.replace('/10', '')} blur-sm opacity-50`} />
                            </div>

                            <button
                                onClick={() => toggleExpand(point.id)}
                                className="w-full flex items-center gap-4 sm:gap-6 p-5 sm:p-6 text-left outline-none"
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${point.bgClass} ${point.textClass} ${isExpanded ? point.shadowClass : ''} transition-all duration-300`}>
                                    <Icon size={20} className={isExpanded ? 'animate-pulse' : ''} />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-wider">
                                            Insight {String(point.index).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-slate-200 truncate pr-4">
                                        {point.title}
                                    </h4>
                                </div>

                                <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-white/10 rotate-180 text-white' : 'bg-transparent text-slate-500 group-hover:text-slate-300 group-hover:bg-white/5'}`}>
                                    <ChevronDown size={18} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-0 pl-[4.5rem] sm:pl-[5.5rem]">
                                            <div className="space-y-4">
                                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                                    {point.text}
                                                </p>
                                                
                                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                                    <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-lg border ${point.bgClass} ${point.borderClass} ${point.textClass}`}>
                                                        {point.severity}
                                                    </span>
                                                    
                                                    {point.fix && (
                                                        <div className="flex-1 min-w-[200px] flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                                                            <Sparkles size={14} className="text-amber-400 mt-0.5 shrink-0" />
                                                            <span className="text-xs text-slate-400 leading-relaxed">
                                                                <strong className="text-slate-300">Suggested Action:</strong> {point.fix}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ResumeFeedbackAccordion;
