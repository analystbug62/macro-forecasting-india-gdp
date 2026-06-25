import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CoverPage from "./components/CoverPage";
import GDPChart from "./components/GDPChart";
import CorrelationChart from "./components/CorrelationChart";
import OLSResults from "./components/OLSResults";
import GrangerSection from "./components/GrangerSection";
import CodeSection from "./components/CodeSection";
import ResearchReport from "./components/ResearchReport";
import GitHubGuide from "./components/GitHubGuide";
import Footer from "./components/Footer";

const SectionWrapper = ({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`relative py-20 px-6 md:px-10 ${className}`}
  >
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const SectionDivider = ({ label }: { label: string }) => (
  <div className="max-w-7xl mx-auto px-6 md:px-10">
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="text-white/20 text-[11px] font-semibold tracking-widest uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] font-['Inter']">
      {/* Navbar */}
      <Navbar />

      {/* Cover / Hero */}
      <CoverPage />

      {/* Section: Data Overview */}
      <SectionDivider label="Section 01 — Data Overview" />
      <SectionWrapper id="overview" className="bg-[#0a0f1e]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* World Bank Data Banner */}
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg">
                  🌐
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">World Bank Open Data</div>
                  <div className="text-white/40 text-xs">api.worldbank.org · Country: IN (India) · Period: 2013–2024</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: "NY.GDP.MKTP.KD.ZG", label: "GDP Growth" },
                  { code: "FP.CPI.TOTL.ZG", label: "CPI Inflation" },
                  { code: "BX.KLT.DINV.WD.GD.ZS", label: "FDI" },
                  { code: "NE.TRD.GNFS.ZS", label: "Trade" },
                  { code: "NE.GDI.TOTL.ZS", label: "Gross Cap." },
                ].map((ind) => (
                  <div key={ind.code} className="px-2 py-1 rounded-lg bg-white/5 border border-white/8">
                    <div className="text-white/60 text-[10px] font-medium">{ind.label}</div>
                    <div className="text-blue-400/60 text-[9px] font-mono">{ind.code}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* GDP Chart */}
        <GDPChart />

        <div className="mt-10">
          <CorrelationChart />
        </div>
      </SectionWrapper>

      {/* Section: OLS Results */}
      <SectionDivider label="Section 02 — OLS Regression Model" />
      <SectionWrapper id="ols" className="bg-[#080c18]">
        <OLSResults />
      </SectionWrapper>

      {/* Section: Granger Causality */}
      <SectionDivider label="Section 03 — Granger Causality Analysis" />
      <SectionWrapper id="granger" className="bg-[#0a0f1e]">
        <GrangerSection />
      </SectionWrapper>

      {/* Section: Code */}
      <SectionDivider label="Section 04 — Source Code & Methodology" />
      <SectionWrapper id="code" className="bg-[#080c18]">
        <CodeSection />
      </SectionWrapper>

      {/* Section: Research Report */}
      <SectionDivider label="Section 05 — Research Report (APA Format)" />
      <SectionWrapper id="report" className="bg-[#0a0f1e]">
        <ResearchReport />
      </SectionWrapper>

      {/* Section: GitHub Guide */}
      <SectionDivider label="Section 06 — Push to GitHub & Deploy" />
      <SectionWrapper id="github" className="bg-[#080c18]">
        <GitHubGuide />
      </SectionWrapper>

      {/* Footer */}
      <Footer />
    </div>
  );
}
