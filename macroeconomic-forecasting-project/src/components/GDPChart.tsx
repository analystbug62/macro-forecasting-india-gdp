import { motion } from "framer-motion";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Area,
} from "recharts";
import { macroData } from "../data/macroData";
import { TrendingUp, Info } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isForecast = macroData.find((d) => d.year === label)?.forecast;
    return (
      <div className="bg-[#0d1424] border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-semibold text-sm">{label}</span>
          {isForecast && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-semibold">
              FORECAST
            </span>
          )}
        </div>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center justify-between gap-6 mb-1.5">
            <span className="text-white/50 text-xs">{entry.name}</span>
            <span className="font-semibold text-sm" style={{ color: entry.color }}>
              {typeof entry.value === "number" ? `${entry.value.toFixed(2)}%` : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function GDPChart() {
  const chartData = macroData.map((d) => ({
    year: d.year,
    "GDP Growth": d.gdpGrowth,
    Inflation: d.inflation,
    "Fiscal Deficit": d.fiscalDeficit,
    forecast: d.forecast,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-[#0d1424] rounded-2xl border border-white/8 p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-blue-400" />
            </div>
            <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
              Figure 1
            </span>
          </div>
          <h3 className="text-white font-semibold text-xl">
            India GDP Growth Rate vs. Key Indicators
          </h3>
          <p className="text-white/40 text-sm mt-1">
            2013–2024 · World Bank Open Data · Annual %
          </p>
        </div>
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 max-w-[220px]">
          <Info size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-amber-400/80 text-[11px] leading-relaxed">
            2024 values represent OLS model forecast. Shaded = forecast period.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="gdpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="year"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-white/60 text-xs">{value}</span>
              )}
            />
            <ReferenceLine x={2024} stroke="rgba(251,191,36,0.3)" strokeDasharray="6 4" strokeWidth={2} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <Area
              type="monotone"
              dataKey="GDP Growth"
              fill="url(#gdpGradient)"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={(props: any) => {
                const isForecast = macroData.find((d) => d.year === props.payload.year)?.forecast;
                return (
                  <circle
                    key={props.key}
                    cx={props.cx}
                    cy={props.cy}
                    r={isForecast ? 6 : 4}
                    fill={isForecast ? "#f59e0b" : "#3b82f6"}
                    stroke={isForecast ? "#fbbf24" : "#1d4ed8"}
                    strokeWidth={2}
                  />
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="Inflation"
              stroke="#f97316"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ fill: "#f97316", r: 3, strokeWidth: 0 }}
            />
            <Bar
              dataKey="Fiscal Deficit"
              fill="rgba(139,92,246,0.25)"
              stroke="rgba(139,92,246,0.6)"
              strokeWidth={1}
              radius={[3, 3, 0, 0]}
              barSize={18}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Key observation */}
      <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/8">
        <p className="text-white/50 text-xs leading-relaxed">
          <span className="text-blue-400 font-semibold">Key Observation:</span> India's GDP growth
          contracted sharply to <span className="text-white/80">−6.60%</span> in 2020 due to COVID-19
          pandemic shock, with a V-shaped recovery to <span className="text-white/80">8.68%</span> in
          2021. Fiscal deficit widened to <span className="text-white/80">9.2% of GDP</span> in 2020,
          consistent with the Granger causality finding that fiscal expansion precedes inflationary
          pressures with a lag of 1 period. The OLS model forecasts GDP growth of{" "}
          <span className="text-amber-400 font-semibold">6.40%</span> for 2024–25.
        </p>
      </div>
    </motion.div>
  );
}
