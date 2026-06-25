import { motion } from "framer-motion";
import { BookOpen, Calendar, Award, ExternalLink, ChevronDown } from "lucide-react";

export default function CoverPage() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0f1e]">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">ME</span>
          </div>
          <span className="text-white/50 text-sm font-medium tracking-widest uppercase">
            Macroeconomic Research
          </span>
        </div>
        <div className="flex items-center gap-6 text-white/30 text-xs tracking-wider">
          <span>IGNOU</span>
          <span>•</span>
          <span>MA Economics</span>
          <span>•</span>
          <span>2024–25</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase"
        >
          <Award size={12} />
          Independent Research Project — OLS + Granger Causality
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-5xl font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Macroeconomic{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Forecasting
          </span>{" "}
          Model for India
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl text-white/50 text-lg md:text-xl leading-relaxed mb-12"
        >
          Forecasting India's GDP Growth Rate for 2024–25 using OLS Regression &amp; Granger Causality Analysis
          on World Bank Macroeconomic Indicators (2013–2023)
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {[
            { label: "MAE", value: "0.68%", desc: "Mean Absolute Error" },
            { label: "R²", value: "87.4%", desc: "Model Fit" },
            { label: "Obs.", value: "11 yrs", desc: "2013–2023" },
            { label: "GDP Forecast", value: "6.40%", desc: "FY 2024–25" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center min-w-[120px]"
            >
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-white/40 text-xs tracking-wider">{stat.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold font-['Playfair_Display']">
            SP
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-lg">Sourav Panda</div>
            <div className="text-white/50 text-sm">MA Economics · IGNOU</div>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-white/30 text-xs">
                <Calendar size={11} />
                Academic Year 2024–25
              </span>
              <span className="flex items-center gap-1.5 text-white/30 text-xs">
                <BookOpen size={11} />
                APA Citation Standards
              </span>
            </div>
          </div>
          <div className="sm:ml-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              R Programming
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              STATA 17
            </div>
          </div>
        </motion.div>

        {/* Data source note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 flex items-center gap-2 text-white/20 text-xs"
        >
          <ExternalLink size={11} />
          Data Source: World Bank Open Data API (api.worldbank.org) · Ministry of Finance, Govt. of India · IMF WEO
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="text-white/20" size={24} />
      </motion.div>
    </section>
  );
}
