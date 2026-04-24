"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react"

interface MarketCardProps {
    symbol: string
    name: string
    price: string
    change: string
    changePercent: string
    high: string
    low: string
    open: string
}

export default function MarketCard({ symbol, name, price, change, changePercent, high, low, open }: MarketCardProps) {
    const isPositive = !change.startsWith("-")

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="h-full"
        >
            <div className={`relative overflow-hidden border-2 h-full ${isPositive ? 'border-acid-green/20' : 'border-hyper-pink/20'} bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-acid-green group`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-acid-green opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Background Texture */}
            <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity ${isPositive ? 'text-acid-green' : 'text-hyper-pink'}`}>
                <Activity className="h-16 w-16" />
            </div>

            <div className="relative z-10 font-mono">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1 leading-none">{symbol}::TICKER</h3>
                        <p className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">{name}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#06B6D4]" />
                </div>

                <div className="flex flex-col gap-1 mb-8">
                    <span className="text-4xl font-black tracking-tighter text-white">{price}</span>
                    <span className={`text-[10px] font-black flex items-center tracking-widest ${isPositive ? 'text-acid-green' : 'text-hyper-pink'}`}>
                        {isPositive ? <TrendingUp className="h-3 w-3 mr-2" /> : <TrendingDown className="h-3 w-3 mr-2" />}
                        {change} ({changePercent})
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-y border-primary/10">
                    <div>
                        <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">DATA_HIGH</p>
                        <p className="text-[11px] font-bold text-white/70">{high}</p>
                    </div>
                    <div>
                        <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">DATA_LOW</p>
                        <p className="text-[11px] font-bold text-white/70">{low}</p>
                    </div>
                    <div>
                        <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-1">DATA_OPEN</p>
                        <p className="text-[11px] font-bold text-white/70">{open}</p>
                    </div>
                </div>

                <button className="mt-8 w-full py-3.5 bg-white/5 border border-white/10 text-acid-green text-[10px] font-black uppercase tracking-[0.3em] hover:bg-acid-green hover:text-black transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden">
                   <Zap className="h-3 w-3 group-hover/btn:animate-pulse" />
                   Neural Analysis
                </button>
            </div>
        </div>
        </motion.div>
    )
}
