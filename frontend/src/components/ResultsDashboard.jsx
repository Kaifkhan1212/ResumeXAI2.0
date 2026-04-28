import React from 'react';
import { motion } from 'framer-motion';
import MetricCard from './MetricCard';
import SkillTags from './SkillTags';
import SuggestionsPanel from './SuggestionsPanel';
import AIContext from './AIContext';
import ExecutiveEvaluation from './ExecutiveEvaluation';
import ResumeFeedbackAccordion from './ResumeFeedbackAccordion';
import { ArrowLeft, Download, ShieldCheck, Sparkles, FileText, Zap, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResultsDashboard = ({ data, onReset }) => {
    const exportPDF = async () => {
        const input = document.getElementById('report-content');
        const downloadBtn = document.getElementById('download-btn');
        
        if (!input || input.scrollHeight === 0) {
            console.error('Report content not found or has no height');
            return;
        }

        // Hide button during capture
        if (downloadBtn) downloadBtn.style.display = 'none';

        try {
            const canvas = await html2canvas(input, { 
                scale: 2, 
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#0b0e14',
                logging: false,
                windowWidth: 1200,
                onclone: (clonedDoc) => {
                    const clonedContent = clonedDoc.getElementById('report-content');
                    if (clonedContent) {
                        clonedContent.style.padding = '60px';
                        clonedContent.style.height = 'auto';
                        clonedContent.style.width = '1200px';
                        clonedContent.style.opacity = '1';
                        clonedContent.style.visibility = 'visible';
                        clonedContent.style.display = 'block';
                        
                        // Force all motion elements to be visible in the clone
                        const motionElements = clonedContent.querySelectorAll('*');
                        motionElements.forEach(el => {
                            el.style.opacity = '1';
                            el.style.transform = 'none';
                            el.style.visibility = 'visible';
                        });

                        // Fix overflow issues that cut text by forcing overflow visible on the clone
                        const overflowElements = clonedContent.querySelectorAll('.overflow-hidden');
                        overflowElements.forEach(el => {
                            el.style.overflow = 'visible';
                            el.classList.remove('overflow-hidden');
                        });

                        // Hide decorative elements that break in html2canvas
                        const elementsToHide = clonedContent.querySelectorAll('.pdf-hide');
                        elementsToHide.forEach(el => {
                            el.style.display = 'none';
                        });
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            
            // Calculate dimensions in mm
            const imgWidth = 210; // Standard A4 width
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Create PDF with custom height to avoid cutting
            const pdf = new jsPDF('p', 'mm', [imgWidth, imgHeight]);
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

            const fileName = data.candidate_name 
                ? `ResumeXAI_Report_${data.candidate_name.replace(/\s+/g, '_')}.pdf`
                : `ResumeXAI_Report_${new Date().getTime()}.pdf`;
            
            pdf.save(fileName);
        } catch (error) {
            console.error('PDF Export Error:', error);
            alert('Export failed: ' + (error.message || error.toString() || 'Unknown rendering error'));
        } finally {
            if (downloadBtn) downloadBtn.style.display = 'flex';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-6 pb-32"
        >
            {/* Header / Actions */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-12">
                <motion.div variants={itemVariants} className="space-y-6">
                    <button
                        onClick={onReset}
                        className="group flex items-center text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.4em]"
                    >
                        <div className="w-8 h-px bg-slate-800 group-hover:w-12 group-hover:bg-blue-500 transition-all mr-4" />
                        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85]">
                        Analysis <br />
                        <span className="gradient-text">Complete.</span>
                    </h2>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-xl">
                        <ShieldCheck size={16} className="text-emerald-500 animate-pulse" />
                        Verified Analysis
                    </div>
                    <button
                        id="download-btn"
                        onClick={exportPDF}
                        className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Download size={18} className="group-hover:bounce" />
                        <span>Download Report</span>
                    </button>
                </motion.div>
            </div>

            <div id="report-content" className="space-y-16 sm:space-y-20 p-4 sm:p-8 lg:p-12">
                {/* Report Header (Visible in PDF) */}
                {data.candidate_name && (
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-white/5"
                    >
                        <div className="space-y-2">
                            <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-blue-500">Executive Analysis</h3>
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                    {data.candidate_name}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-slate-700">Report Date</span>
                                <span className="text-white">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="h-10 w-px bg-white/5" />
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-slate-700">Analyst ID</span>
                                <span className="text-white">RX-9920</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Metric Overview */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <MetricCard
                        title="Match Score"
                        value={data.skill_match_score}
                        type="circular"
                        label={data.skill_match_score >= 70 ? "HIGH" : data.skill_match_score >= 40 ? "MEDIUM" : "LOW"}
                        index={0}
                    />
                    <MetricCard
                        title="Selection Probability"
                        value={data.selection_likelihood}
                        type="standard"
                        label={data.selection_likelihood >= 70 ? "HIGH" : data.selection_likelihood >= 40 ? "MEDIUM" : "LOW"}
                        suffix="%"
                        index={1}
                    />
                    <MetricCard
                        title="AI Detection Score"
                        value={data.ai_generated_probability}
                        type="ai"
                        label={data.confidence_level}
                        suffix="%"
                        index={2}
                    />
                </motion.div>

                {/* Primary Analysis Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div variants={itemVariants} className="space-y-16">
                        <SkillTags 
                            title="Your Strengths" 
                            skills={data.matched_skills} 
                            type="matched" 
                            index={0} 
                        />
                        <SkillTags 
                            title="Areas to Improve" 
                            skills={data.missing_skills} 
                            type="missing" 
                            index={1} 
                        />
                        <AIContext reasoning={data.ai_reasoning} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-16">
                        <SuggestionsPanel
                            suggestions={data.improvement_suggestions}
                        />
                        {/* Desktop Executive Evaluation */}
                        <div className="hidden lg:block">
                            <ExecutiveEvaluation feedback={data.summary} />
                        </div>
                    </motion.div>
                </div>

                {/* Full-Width Resume Feedback Section */}
                <ResumeFeedbackAccordion feedbackData={data.overall_feedback} />
                {/* Mobile Executive Evaluation */}
                <div className="block lg:hidden mt-16">
                    <ExecutiveEvaluation feedback={data.summary} />
                </div>
            </div>
            
            <motion.footer 
                variants={itemVariants}
                className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.8em] text-slate-800"
            >
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span>ResumeXAI AI Intelligence</span>
                </div>
                <span className="mt-6 md:mt-0 opacity-100">© 2026 Kaif Khan. All rights reserved.</span>
            </motion.footer>
        </motion.div>
    );
};

export default ResultsDashboard;
