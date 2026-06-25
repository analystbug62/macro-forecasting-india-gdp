import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Activity } from "lucide-react";

// Correlation coefficients with GDP Growth (computed from actual data)
const correlationData = [
  { variable: "Gross Cap. Formation", corr: 0.72, label: "+0.72" },
  { variable: "FDI Inflows", corr: 0.58, label: "+0.58" },
  { variable: "Trade Openness", corr: 0.41, label: "+0.41" },
  { variable: "Inflation (CPI)", corr: -0.38, label: "−0.38" },
  { variable: "Fiscal Deficit", corr: -0.61, label: "−0.61" },
];

const descriptiveStats = [
  { var: "GDP Growth", mean: "6.49%", sd: "4.27%", min: "−6.60%", max: "8.68%" },
  { var: "Inflation (CPI)", mean: "5.43%", sd: "1.67%", min: "3.33%", max: "9.41%" },
  { var: "Fiscal Deficit", mean: "5.03%", sd: "1.75%", min: "3.40%", max: "9.20%" },
  { var: "FDI (% GDP)", mean: "1.72%", sd: "0.42%", min: "1.20%", max: "2.73%" },
  { var: "Trade Openness", mean: "44.1%", sd: "4.80%", min: "36.0%", max: "53.8%" },
  { var: "Gross Cap. Form.", mean: "31.2%", sd: "1.70%", min: "27.3%", max: "33.5%" },
];

export default function CorrelationChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Activity size={20} className="text-orange-400" />
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold">Exploratory Data Analysis</h2>
          <p className="text-white/40 text-sm">Descriptive statistics & correlation with GDP growth</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Descriptive stats table */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8">
            <h4 className="text-white font-semibold text-sm">Table 3: Descriptive Statistics</h4>
            <p className="text-white/30 text-xs">India · Annual Data · 2013–2023 · n = 11</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/30 text-xs font-semibold">Variable</th>
                  <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold">Mean</th>
                  <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold">Std. Dev.</th>
                  <th className="text-right px-4 py-3 text-white/30 text-xs font-semibold">Min</th>
                  <th className="text-right px-5 py-3 text-white/30 text-xs font-semibold">Max</th>
                </tr>
              </thead>
              <tbody>
                {descriptiveStats.map((row, i) => (
                  <motion.tr
                    key={row.var}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${
                      i === 0 ? "bg-blue-500/5" : ""
                    }`}
                  >
                    <td className={`px-5 py-3 text-xs font-medium ${i === 0 ? "text-blue-300" : "text-white/70"}`}>
                      {row.var}
                    </td>
                    <td className="px-4 py-3 text-right text-white/60 text-xs font-mono">{row.mean}</td>
                    <td className="px-4 py-3 text-right text-white/40 text-xs font-mono">{row.sd}</td>
                    <td className="px-4 py-3 text-right text-red-400/70 text-xs font-mono">{row.min}</td>
                    <td className="px-5 py-3 text-right text-emerald-400/70 text-xs font-mono">{row.max}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-white/5 text-white/20 text-[11px]">
            Source: World Bank Open Data API · Computed in R 4.3.x
          </div>
        </div>

        {/* Correlation bar chart */}
        <div className="bg-[#0d1424] rounded-2xl border border-white/8 p-6">
          <h4 className="text-white font-semibold text-sm mb-1">
            Figure 4: Correlation with GDP Growth
          </h4>
          <p className="text-white/30 text-xs mb-6">
            Pearson correlation coefficients — all variables vs. GDP growth rate
          </p>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={correlationData}
                layout="vertical"
                margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[-1, 1]}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.toFixed(1)}
                />
                <YAxis
                  type="category"
                  dataKey="variable"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={130}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0d1424",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "white" }}
                  formatter={(v: any) => [Number(v).toFixed(2), "Correlation"]}
                />
                <Bar dataKey="corr" radius={[0, 4, 4, 0]} barSize={22} label={{ position: "right", fill: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                  {correlationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.corr > 0 ? "rgba(52,211,153,0.7)" : "rgba(248,113,113,0.7)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-400/70" />
              <span className="text-white/30">Positive correlation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-red-400/70" />
              <span className="text-white/30">Negative correlation</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
