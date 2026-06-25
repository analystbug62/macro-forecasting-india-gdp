import { motion } from "framer-motion";
import { Terminal, Copy, Check, Rocket, Globe } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Initialize Git Repository",
    desc: "Run this inside your project folder",
    code: `git init\ngit add .\ngit commit -m "feat: macroeconomic forecasting dashboard - Sourav Panda"`,
    color: "blue",
  },
  {
    num: "02",
    title: "Create GitHub Repository",
    desc: "Go to github.com → New Repository",
    code: `# Repository name suggestion:\nmacro-forecasting-india-gdp\n\n# Make it PUBLIC for recruiters to see\n# Do NOT initialize with README (you already have files)`,
    color: "purple",
  },
  {
    num: "03",
    title: "Connect & Push to GitHub",
    desc: "Replace YOUR_USERNAME with your GitHub handle",
    code: `git remote add origin https://github.com/YOUR_USERNAME/macro-forecasting-india-gdp.git\ngit branch -M main\ngit push -u origin main`,
    color: "green",
  },
  {
    num: "04",
    title: "Deploy Live URL (Vercel — Recommended)",
    desc: "Get a live link in 60 seconds — put this on your resume!",
    code: `# Install Vercel CLI (one time)\nnpm install -g vercel\n\n# Deploy (run from project folder)\nvercel --prod\n\n# You'll get: https://macro-forecasting-india-gdp.vercel.app`,
    color: "amber",
  },
];

function CodeBlock({ code }: { code: string; color?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const cleanCode = code.split("\n").filter((l) => !l.startsWith("#")).join("\n").trim();
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-3 rounded-xl overflow-hidden border border-white/8">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1f2e]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-white/30 hover:text-white/60 text-[11px] transition-colors"
        >
          {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="bg-[#0d1117] px-4 py-4 text-xs font-['JetBrains_Mono'] overflow-x-auto">
        {code.split("\n").map((line, i) => (
          <div key={i} className={line.startsWith("#") ? "text-white/25 italic" : "text-cyan-300/90"}>
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}

export default function GitHubGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Terminal size={20} className="text-white/70" />
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold">Push to GitHub & Go Live</h2>
          <p className="text-white/40 text-sm">Step-by-step guide — exact commands to copy-paste</p>
        </div>
      </div>

      {/* Resume tip box */}
      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-3">
          <Rocket size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Resume Bullet After Deployment 🎯</h4>
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              Once deployed, update your resume bullet to include the live URL:
            </p>
            <div className="bg-white/5 rounded-lg p-4 border border-white/8">
              <p className="text-white/70 text-xs leading-relaxed font-mono">
                • Forecasted India's GDP growth rate for 2024–25 at{" "}
                <span className="text-emerald-400 font-bold">6.40% (MAE: 0.68%)</span> by building an
                OLS regression model in R using 10 years of World Bank macroeconomic indicators; results
                visualized in an interactive research dashboard{" "}
                <span className="text-cyan-400">[github.com/sourav-panda/macro-forecasting-india-gdp]</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0d1424] rounded-2xl border border-white/8 p-6"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-${step.color}-500/15 border border-${step.color}-500/30`}>
                <Terminal size={18} className={`text-${step.color}-400`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-${step.color}-400 text-xs font-bold tracking-widest`}>
                    STEP {step.num}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base">{step.title}</h3>
                <p className="text-white/40 text-xs mt-0.5">{step.desc}</p>
                <CodeBlock code={step.code} color={step.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platforms */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            name: "Vercel",
            desc: "Best for React/Vite apps. Auto-deploys on every git push. Free tier.",
            url: "vercel.com",
            icon: "▲",
            recommended: true,
            color: "white",
          },
          {
            name: "GitHub Pages",
            desc: "Free hosting directly from your GitHub repo. Needs build step setup.",
            url: "pages.github.com",
            icon: "⬡",
            recommended: false,
            color: "white",
          },
          {
            name: "Netlify",
            desc: "Drag-and-drop your dist/ folder or connect GitHub. Very easy.",
            url: "netlify.com",
            icon: "◈",
            recommended: false,
            color: "teal",
          },
        ].map((platform) => (
          <div
            key={platform.name}
            className={`p-5 rounded-xl border transition-all ${
              platform.recommended
                ? "bg-white/5 border-white/20"
                : "bg-white/[0.02] border-white/8"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-lg">{platform.icon}</span>
              <span className="text-white font-semibold text-sm">{platform.name}</span>
              {platform.recommended && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  RECOMMENDED
                </span>
              )}
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-3">{platform.desc}</p>
            <div className="flex items-center gap-1 text-white/30 text-[11px]">
              <Globe size={10} />
              <span>{platform.url}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
