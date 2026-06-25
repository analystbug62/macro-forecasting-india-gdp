import { useState } from "react";
import { motion } from "framer-motion";
import { rCode, stataCode } from "../data/macroData";
import { Terminal, Copy, Check, Code2 } from "lucide-react";

export default function CodeSection() {
  const [activeTab, setActiveTab] = useState<"r" | "stata">("r");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === "r" ? rCode : stataCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = activeTab === "r" ? rCode : stataCode;

  const highlightCode = (code: string, lang: "r" | "stata") => {
    const lines = code.split("\n");
    return lines.map((line, i) => {
      // Comment lines
      if (line.trim().startsWith("#") || line.trim().startsWith("*") || line.trim().startsWith("//")) {
        return (
          <div key={i} className="text-white/30 italic">
            {line}
          </div>
        );
      }

      // R keywords
      const rKeywords = ["library", "WDI", "lm", "summary", "predict", "merge", "read.csv", "arrange", "drop_na", "cor", "bptest", "vif", "dwtest", "jarque.bera.test", "resettest", "mae", "rmse", "data.frame", "fitted", "residuals"];
      // STATA keywords
      const stataKeywords = ["import", "tsset", "summarize", "tabstat", "dfuller", "varsoc", "var", "vargranger", "test", "irf", "outreg2", "clear", "delimited"];

      const keywords = lang === "r" ? rKeywords : stataKeywords;

      // Simple syntax highlighting via class assignment
      const isKeyword = keywords.some((kw) => line.includes(kw + "(") || line.startsWith(kw + " "));
      const isString = line.includes('"') || line.includes("'");
      const isAssignment = line.includes("<-") || line.includes("=") || line.includes("///");

      let cls = "text-white/75";
      if (isKeyword) cls = "text-cyan-300";
      else if (isString && !isKeyword) cls = "text-amber-300/80";
      else if (isAssignment) cls = "text-white/85";

      return (
        <div key={i} className={cls}>
          {line || " "}
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Code2 size={20} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold">Source Code & Methodology</h2>
          <p className="text-white/40 text-sm">Reproducible research — complete R and STATA scripts</p>
        </div>
      </div>

      {/* Code terminal */}
      <div className="rounded-2xl overflow-hidden border border-white/8">
        {/* Terminal bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1f2e] border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setActiveTab("r")}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "r"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Terminal size={11} />
                  R Script
                </span>
              </button>
              <button
                onClick={() => setActiveTab("stata")}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === "stata"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Terminal size={11} />
                  STATA Script
                </span>
              </button>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 text-xs transition-all"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Code content */}
        <div className="bg-[#0d1117] p-6 overflow-x-auto max-h-[520px] overflow-y-auto">
          <pre className="font-['JetBrains_Mono'] text-xs leading-6 min-w-max">
            {/* Line numbers + code */}
            <div className="flex">
              <div className="select-none pr-6 text-right text-white/15 leading-6 min-w-[3rem]">
                {code.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1">{highlightCode(code, activeTab)}</div>
            </div>
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#1a1f2e] border-t border-white/8 flex items-center justify-between">
          <span className="text-white/25 text-xs">
            {code.split("\n").length} lines · {activeTab === "r" ? "R 4.3.x" : "STATA 17"} ·{" "}
            Author: Sourav Panda
          </span>
          <span className="text-white/20 text-xs">
            {activeTab === "r" ? "Packages: WDI, tidyverse, lmtest, sandwich, car, tseries, Metrics" : "Commands: varsoc, var, vargranger, dfuller, irf, outreg2"}
          </span>
        </div>
      </div>

      {/* Tools used */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { tool: "R 4.3.x", desc: "OLS Regression, Diagnostics", color: "blue", packages: ["WDI", "tidyverse", "lmtest", "car", "Metrics"] },
          { tool: "STATA 17", desc: "Granger Causality, VAR", color: "purple", packages: ["varsoc", "vargranger", "irf", "outreg2"] },
          { tool: "World Bank API", desc: "Primary Data Source", color: "green", packages: ["GDP", "CPI", "FDI", "Trade", "GCF"] },
          { tool: "APA 7th Edition", desc: "Citation & Reporting", color: "amber", packages: ["In-text refs", "Reference list", "Tables", "Figures"] },
        ].map((t) => (
          <div
            key={t.tool}
            className={`p-4 rounded-xl bg-${t.color}-500/5 border border-${t.color}-500/20`}
          >
            <div className={`text-${t.color}-400 text-xs font-bold mb-1`}>{t.tool}</div>
            <div className="text-white/40 text-[11px] mb-2">{t.desc}</div>
            <div className="flex flex-wrap gap-1">
              {t.packages.map((p) => (
                <span key={p} className="px-1.5 py-0.5 rounded bg-white/5 text-white/30 text-[9px]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
