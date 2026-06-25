import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/8 bg-[#0a0f1e]"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Author */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm font-['Playfair_Display']">
                SP
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Sourav Panda</div>
                <div className="text-white/40 text-xs">MA Economics · IGNOU</div>
              </div>
            </div>
            <p className="text-white/30 text-xs leading-relaxed">
              Independent research in macroeconomic forecasting, econometrics, and fiscal policy
              analysis for the Indian economy.
            </p>
          </div>

          {/* Project Details */}
          <div>
            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">
              Project Details
            </h4>
            <div className="space-y-2 text-white/30 text-xs">
              <div>📘 Program: MA Economics, IGNOU</div>
              <div>📅 Academic Year: 2024–25</div>
              <div>🛠️ Tools: R 4.3.x · STATA 17 · World Bank API</div>
              <div>📐 Methods: OLS Regression · Granger Causality · VAR</div>
              <div>📋 Citation: APA 7th Edition</div>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">
              Data Sources
            </h4>
            <div className="space-y-2 text-white/30 text-xs">
              <div>🌐 World Bank Open Data API</div>
              <div>🏛️ Ministry of Finance, Govt. of India</div>
              <div>💹 IMF World Economic Outlook (WEO)</div>
              <div>🏦 Reserve Bank of India Annual Report</div>
              <div>📊 National Statistical Office (NSO), India</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs text-center sm:text-left">
            © 2024–25 Sourav Panda · Macroeconomic Forecasting Research Project · IGNOU MA Economics
          </p>
          <div className="flex items-center gap-4 text-white/20 text-[11px]">
            <span>OLS + Granger Causality</span>
            <span>·</span>
            <span>India GDP Forecasting</span>
            <span>·</span>
            <span>World Bank Data</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
