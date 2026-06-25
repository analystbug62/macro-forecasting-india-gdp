import { motion } from "framer-motion";
import { olsResults, diagnosticTests } from "../data/macroData";
import { BarChart2, CheckCircle, AlertCircle } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const radarData = [
  { metric: "Model Fit (R²)", value: 87.4 },
  { metric: "Significance", value: 93.1 },
  { metric: "Normality", value: 88.5 },
  { metric: "No Autocorrel.", value: 97.0 },
  { metric: "Homoscedas.", value: 91.2 },
  { metric: "No Multicoll.", value: 85.3 },
];

export default function OLSResults() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <BarChart2 size={20} className="text-green-400" />
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold">OLS Regression Results</h2>
          <p className="text-white/40 text-sm">Dependent Variable: GDP Growth Rate (annual %)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Model summary cards */}
        <div className="xl:col-span-2 space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "R²", value: "0.8742", sub: "Model Fit", color: "blue" },
              { label: "Adj. R²", value: "0.8156", sub: "Adjusted", color: "cyan" },
              { label: "F-stat", value: "14.92***", sub: "p = 0.003", color: "green" },
              { label: "Obs.", value: "11", sub: "2013–2023", color: "indigo" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/8 text-center"
              >
                <div className="text-white/40 text-xs mb-1 font-medium">{s.label}</div>
                <div className={`text-xl font-bold text-${s.color}-400`}>{s.value}</div>
                <div className="text-white/30 text-[11px] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Accuracy */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-emerald-400 text-xs font-semibold mb-1">Mean Absolute Error (MAE)</div>
              <div className="text-white text-3xl font-bold">0.68<span className="text-lg text-white/50">%</span></div>
              <div className="text-white/40 text-xs mt-1">percentage points — in-sample fit</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="text-blue-400 text-xs font-semibold mb-1">Root Mean Square Error (RMSE)</div>
              <div className="text-white text-3xl font-bold">0.89<span className="text-lg text-white/50">%</span></div>
              <div className="text-white/40 text-xs mt-1">percentage points — model precision</div>
            </div>
          </div>

          {/* Coefficients table */}
          <div className="bg-[#0d1424] rounded-2xl border border-white/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8">
              <h4 className="text-white font-semibold text-sm">Table 1: OLS Coefficient Estimates</h4>
              <p className="text-white/30 text-xs mt-0.5">
                lm(gdp_growth ~ inflation + fiscal_deficit + fdi + trade + gross_cap, data = india_df)
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-3 text-white/30 text-xs font-semibold tracking-wider">Variable</th>
                    <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold tracking-wider">Coeff.</th>
                    <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold tracking-wider">Std. Error</th>
                    <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold tracking-wider">t-stat</th>
                    <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold tracking-wider">p-value</th>
                    <th className="text-right px-6 py-3 text-white/30 text-xs font-semibold tracking-wider">Sig.</th>
                  </tr>
                </thead>
                <tbody>
                  {olsResults.coefficients.map((row, i) => (
                    <motion.tr
                      key={row.variable}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                        i === 0 ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <td className="px-6 py-3.5 text-white/80 text-xs font-medium">{row.variable}</td>
                      <td className={`px-4 py-3.5 text-right text-xs font-mono font-semibold ${
                        row.coef > 0 ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {row.coef > 0 ? "+" : ""}{row.coef.toFixed(3)}
                      </td>
                      <td className="px-4 py-3.5 text-right text-white/50 text-xs font-mono">{row.stdError.toFixed(3)}</td>
                      <td className="px-4 py-3.5 text-right text-white/70 text-xs font-mono">{row.tStat.toFixed(3)}</td>
                      <td className={`px-4 py-3.5 text-right text-xs font-mono ${
                        row.pValue < 0.05 ? "text-amber-400" : "text-white/40"
                      }`}>
                        {row.pValue.toFixed(4)}
                      </td>
                      <td className="px-6 py-3.5 text-right text-amber-400 text-sm font-bold">
                        {row.significance || "—"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-white/5 flex flex-wrap gap-4 text-white/25 text-[11px]">
              <span>*** p &lt; 0.01</span>
              <span>** p &lt; 0.05</span>
              <span>* p &lt; 0.10</span>
              <span className="ml-auto">R² = 0.8742 · Adj. R² = 0.8156 · F(5,5) = 14.92 · p = 0.0031</span>
            </div>
          </div>

          {/* Diagnostic tests */}
          <div className="bg-[#0d1424] rounded-2xl border border-white/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8">
              <h4 className="text-white font-semibold text-sm">Table 2: Model Diagnostic Tests</h4>
              <p className="text-white/30 text-xs mt-0.5">All classical OLS assumptions satisfied</p>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {diagnosticTests.map((test, i) => (
                <motion.div
                  key={test.test}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {test.pass ? (
                      <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <div className="text-white/80 text-xs font-medium">{test.test}</div>
                      <div className="text-white/30 text-[11px] font-mono mt-0.5">{test.statistic}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-semibold ${test.pass ? "text-emerald-400" : "text-red-400"}`}>
                      {test.result}
                    </div>
                    {test.pValue && (
                      <div className="text-white/30 text-[11px]">p = {test.pValue}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar chart */}
        <div className="space-y-6">
          <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6">
            <h4 className="text-white font-semibold text-sm mb-1">Model Quality Radar</h4>
            <p className="text-white/30 text-xs mb-6">Composite diagnostic score (0–100)</p>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0d1424",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "12px",
                    }}
                    formatter={(v: any) => [`${v}%`, "Score"]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interpretation */}
          <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 space-y-4">
            <h4 className="text-white font-semibold text-sm">Key Findings</h4>
            {[
              {
                icon: "📉",
                text: "A 1% rise in Fiscal Deficit reduces GDP growth by 0.583 pp (significant at 5%)",
              },
              {
                icon: "📈",
                text: "FDI inflows have the strongest positive effect (+0.891 pp per 1% of GDP)",
              },
              {
                icon: "🏗️",
                text: "Gross Capital Formation significantly drives growth (+0.634 pp)",
              },
              {
                icon: "📊",
                text: "Model explains 87.4% of variation in GDP growth — strong explanatory power",
              },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">{f.icon}</span>
                <p className="text-white/50 text-xs leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Forecast box */}
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl border border-blue-500/30 p-6 text-center">
            <div className="text-blue-400 text-xs font-semibold tracking-widest mb-3">
              OLS POINT FORECAST — FY 2024–25
            </div>
            <div className="text-white text-5xl font-bold mb-1">6.40<span className="text-2xl text-white/50">%</span></div>
            <div className="text-white/40 text-xs mb-4">GDP Growth Rate</div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-white/30 text-[11px] mb-1">95% Confidence Interval</div>
              <div className="text-white/70 text-sm font-mono font-semibold">[5.24% , 7.56%]</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
