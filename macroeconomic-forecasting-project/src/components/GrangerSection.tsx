import { motion } from "framer-motion";
import { grangerResults, macroData } from "../data/macroData";
import { GitMerge, ArrowRight, ArrowRightLeft, XCircle } from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const scatterData = macroData.slice(0, 11).map((d) => ({
  x: d.fiscalDeficit,
  y: d.inflation,
  year: d.year,
}));

const lagData = macroData.slice(1).map((d, i) => ({
  year: d.year,
  "Fiscal Deficit (t-1)": macroData[i].fiscalDeficit,
  "Inflation (t)": d.inflation,
}));

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1424] border border-white/10 rounded-xl p-3 text-xs">
        <div className="text-white font-semibold mb-1">{payload[0]?.payload?.year}</div>
        <div className="text-purple-400">Fiscal Deficit: {payload[0]?.value?.toFixed(2)}% GDP</div>
        <div className="text-orange-400">Inflation: {payload[1]?.value?.toFixed(2)}%</div>
      </div>
    );
  }
  return null;
};

export default function GrangerSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <GitMerge size={20} className="text-purple-400" />
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold">Granger Causality Analysis</h2>
          <p className="text-white/40 text-sm">STATA 17 · VAR Model · Fiscal Deficit ↔ Inflation ↔ GDP Growth</p>
        </div>
      </div>

      {/* Theory box */}
      <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">What is Granger Causality?</h4>
            <p className="text-white/45 text-xs leading-relaxed max-w-4xl">
              Granger causality tests whether past values of variable X help predict future values of
              variable Y, beyond what Y's own past values can explain. It does not imply true
              causation but establishes a statistically significant predictive relationship. The null
              hypothesis (H₀) is: "X does NOT Granger-cause Y." We reject H₀ when F-statistic p-value
              &lt; 0.05, indicating predictive power.
            </p>
          </div>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {grangerResults.map((result, i) => {
          const rejected = result.decision.startsWith("Reject");
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-5 ${
                rejected
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white/[0.02] border-white/8"
              }`}
            >
              {/* Hypothesis arrow */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  rejected
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-white/40"
                }`}>
                  H{i + 1}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {result.hypothesis.split("→").map((part, j, arr) => (
                    <span key={j} className="flex items-center gap-1.5">
                      <span className={`text-sm font-semibold ${j === 0 ? "text-purple-300" : "text-orange-300"}`}>
                        {part.trim()}
                      </span>
                      {j < arr.length - 1 && (
                        <ArrowRight size={14} className={rejected ? "text-emerald-400" : "text-white/20"} />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/[0.03] rounded-lg p-2.5 text-center">
                  <div className="text-white/30 text-[10px] mb-1">F-Stat</div>
                  <div className="text-white text-sm font-bold font-mono">{result.fStat}</div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2.5 text-center">
                  <div className="text-white/30 text-[10px] mb-1">p-value</div>
                  <div className={`text-sm font-bold font-mono ${
                    result.pValue < 0.05 ? "text-amber-400" : "text-white/50"
                  }`}>{result.pValue}</div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2.5 text-center">
                  <div className="text-white/30 text-[10px] mb-1">Lags</div>
                  <div className="text-white text-sm font-bold font-mono">{result.lags}</div>
                </div>
              </div>

              {/* Decision */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                rejected ? "bg-emerald-500/10" : "bg-white/[0.03]"
              }`}>
                {rejected ? (
                  <ArrowRight size={14} className="text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle size={14} className="text-white/30 flex-shrink-0" />
                )}
                <span className={`text-[11px] leading-relaxed ${
                  rejected ? "text-emerald-400" : "text-white/40"
                }`}>
                  <span className="font-bold">{result.decision}:</span> {result.interpretation}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Scatter: Fiscal Deficit vs Inflation */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6">
          <h4 className="text-white font-semibold text-sm mb-1">Figure 2: Fiscal Deficit vs. Inflation</h4>
          <p className="text-white/30 text-xs mb-5">Scatter plot — 2013–2023 annual data</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="x"
                  name="Fiscal Deficit"
                  unit="%"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: "Fiscal Deficit (% GDP)", fill: "rgba(255,255,255,0.3)", fontSize: 10, position: "insideBottom", offset: -2 }}
                />
                <YAxis
                  dataKey="y"
                  name="Inflation"
                  unit="%"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomScatterTooltip />} />
                <Scatter data={scatterData} fill="#a855f7" fillOpacity={0.8} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line: Lagged Fiscal Deficit vs Current Inflation */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6">
          <h4 className="text-white font-semibold text-sm mb-1">Figure 3: Lagged Causality Pattern</h4>
          <p className="text-white/30 text-xs mb-5">Fiscal Deficit(t-1) vs Inflation(t) — confirms Granger causality</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lagData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0d1424",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "white" }}
                  formatter={(v: any) => [`${Number(v).toFixed(2)}%`]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px", fontSize: "11px" }}
                  formatter={(value) => (
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{value}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="Fiscal Deficit (t-1)"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: "#a855f7", r: 3, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="Inflation (t)"
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  dot={{ fill: "#f97316", r: 3, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
        <div className="flex items-start gap-3">
          <ArrowRightLeft size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-semibold text-sm mb-2">Summary of Granger Causality Findings</h4>
            <p className="text-white/50 text-xs leading-relaxed max-w-4xl">
              The analysis reveals a statistically significant <strong className="text-purple-300">unidirectional</strong> Granger 
              causality running from fiscal deficit to inflation (F = 5.842, p = 0.031) and from fiscal deficit 
              to GDP growth (F = 4.217, p = 0.044). The reverse causality in both cases is not statistically 
              significant. This finding aligns with the <strong className="text-purple-300">Fiscal Theory of Price Level (FTPL)</strong> — 
              excessive government borrowing eventually transmits to price pressures in the Indian economy, with 
              a one-period lag. Policy implication: Fiscal consolidation is a necessary precondition for 
              sustained low inflation in India.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
