"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, Database } from "lucide-react"

const calculators = [
    {
        title: "ANALYSIS_CORE",
        description: "6-LAYER TECHNICAL SCAN: SMA, EMA, RSI, MACD, STOCHASTICS, AND BOLLINGER REGIMES.",
        icon: Activity,
    },
    {
        title: "SIGNAL_ENGINE",
        description: "PROBABILISTIC SCORING MATRIX: AUTONOMOUS GENERATION OF ENTRY/EXIT VECTORS.",
        icon: Cpu,
    },
    {
        title: "OPTIMIZER_LAYER",
        description: "STRIKE SELECTION PROTOCOL: NEURAL OPTIMIZATION OF RISK-REWARD EFFICIENCY RATIOS.",
        icon: Database,
    }
]

export default function TradingCalculators() {
    return (
        <section className="py-32 relative">
            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="mb-24 text-center">
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black italic tracking-tighter sm:text-7xl uppercase text-white mb-6">
                        TRADING_<span className="text-acid-green">ENGINE</span>
                    </h2>
                    <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] font-mono max-w-2xl mx-auto leader-relaxed italic">
                        POWERED_BY // INSTITUTIONAL_GRADE_LOGIC // REAL_TIME_SENTIMENT
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {calculators.map((calc, i) => (
                        <motion.div
                            key={calc.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#0A0A0A] border border-white/5 p-10 group relative hover:border-acid-green/20 transition-all rounded-sm flex flex-col items-center text-center"
                        >
                            <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
                            
                            <div className="mb-8 p-5 bg-acid-green/10 text-acid-green border border-acid-green/20 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                                <calc.icon className="h-8 w-8" />
                            </div>
                            
                            <h3 className="text-[13px] font-black uppercase text-white tracking-[0.3em] mb-4 font-mono group-hover:text-acid-green transition-colors">
                                {calc.title}
                            </h3>
                            
                            <p className="text-[11px] text-white/40 leading-relaxed font-mono uppercase tracking-tight">
                                {calc.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
