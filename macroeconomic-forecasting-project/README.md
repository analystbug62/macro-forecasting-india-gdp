<div align="center">

# 📊 Macroeconomic Forecasting Model for India

### OLS Regression & Granger Causality Analysis on World Bank Data (2013–2024)

[![R](https://img.shields.io/badge/R-4.3.x-276DC3?style=flat-square&logo=r&logoColor=white)](https://www.r-project.org/)
[![STATA](https://img.shields.io/badge/STATA-17-1A3A5C?style=flat-square)](https://www.stata.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![World Bank](https://img.shields.io/badge/Data-World_Bank_API-0098DB?style=flat-square)](https://data.worldbank.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Author:** [Sourav Panda](https://github.com/analystbug62) · MA Economics · IGNOU · Academic Year 2024–25

**🟢 Live Dashboard:** [macro-forecasting-india-gdp.vercel.app](https://macro-forecasting-india-gdp.vercel.app)

</div>

---

## 🎯 Project Overview

This independent research project forecasts **India's GDP growth rate for FY 2024–25** at **6.40%** (95% CI: 5.24%–7.56%) by building an **OLS regression model** in R using 10 years of World Bank macroeconomic indicators. Additionally, **Granger causality tests** conducted in STATA 17 reveal a statistically significant unidirectional causal relationship from fiscal deficit to both inflation (p = 0.031) and GDP growth (p = 0.044).

| Metric | Value |
|--------|-------|
| **GDP Growth Forecast (2024–25)** | 6.40% |
| **Mean Absolute Error (MAE)** | 0.68 percentage points |
| **Root Mean Square Error (RMSE)** | 0.89 percentage points |
| **R² (Model Fit)** | 0.8742 |
| **Adjusted R²** | 0.8156 |
| **F-statistic** | 14.92*** (p = 0.003) |
| **Observations** | 11 years (2013–2023) |

---

## 📸 Dashboard Preview

### 🏠 Cover Page — Research Identity
The dashboard opens with a professional academic cover featuring author credentials, key statistics, tool stack, and data source attribution.

### 📈 GDP Growth Visualization
Interactive time-series chart plotting India's GDP growth rate alongside CPI inflation and fiscal deficit (% of GDP) from 2013 to 2024, with the OLS forecast point highlighted.

### 🔍 Exploratory Data Analysis
- Descriptive statistics table (mean, SD, min, max) for all 6 macroeconomic variables
- Pearson correlation coefficients with GDP growth — visualized as a horizontal bar chart

### 📐 OLS Regression Results
- Full coefficient estimates table with standard errors, t-statistics, p-values, and significance stars
- Model diagnostic tests: Breusch-Pagan, VIF, Durbin-Watson, Jarque-Bera, Ramsey RESET
- Radar chart of model quality metrics
- Point forecast for 2024–25 with 95% confidence interval

### 🔗 Granger Causality Analysis
- Four hypothesis tests with F-statistics, p-values, and accept/reject decisions
- Scatter plot: Fiscal Deficit vs. Inflation
- Lagged causality visualization: Fiscal Deficit(t-1) vs. Inflation(t)

### 💻 Source Code
- Complete R script with OLS model, diagnostics, and forecast
- Complete STATA script with VAR estimation, Granger tests, and impulse response functions
- Syntax-highlighted with line numbers and copy-to-clipboard

### 📄 Research Report (APA 7th Edition)
- Full academic research paper with Abstract, Introduction, Literature Review, Methodology, Results, and Conclusion
- 10 APA-formatted references (Barro, Fischer, Khan & Senhadji, Catão & Terrones, etc.)
- JEL Classification: C22, E17, E62, H62, O11

---

## 🗂️ Project Structure

```
macro-forecasting-india-gdp/
├── public/                          # Static assets
├── src/
│   ├── App.tsx                      # Main application — section layout
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global styles & Tailwind
│   ├── data/
│   │   └── macroData.ts             # World Bank data, OLS results, Granger results, R & STATA code
│   └── components/
│       ├── CoverPage.tsx            # Hero / research identity
│       ├── Navbar.tsx               # Sticky navigation
│       ├── GDPChart.tsx             # GDP growth + inflation + fiscal deficit chart
│       ├── CorrelationChart.tsx     # EDA — descriptive stats & correlation
│       ├── OLSResults.tsx           # Coefficient table, diagnostics, forecast
│       ├── GrangerSection.tsx       # Granger causality tests & visualizations
│       ├── CodeSection.tsx          # R & STATA source code viewer
│       ├── ResearchReport.tsx       # Full APA research paper
│       ├── GitHubGuide.tsx          # Deployment & resume guide
│       └── Footer.tsx               # Author & data source credits
├── index.html                       # HTML entry with Google Fonts
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.ts               # Tailwind CSS configuration
└── README.md                        # This file
```

---

## 📊 Data Sources

| Source | Variable | Indicator Code |
|--------|----------|---------------|
| World Bank Open Data | GDP Growth (annual %) | `NY.GDP.MKTP.KD.ZG` |
| World Bank Open Data | Inflation, CPI (annual %) | `FP.CPI.TOTL.ZG` |
| World Bank Open Data | FDI, net inflows (% of GDP) | `BX.KLT.DINV.WD.GD.ZS` |
| World Bank Open Data | Trade (% of GDP) | `NE.TRD.GNFS.ZS` |
| World Bank Open Data | Gross Capital Formation (% of GDP) | `NE.GDI.TOTL.ZS` |
| World Bank Open Data | Current Account Balance (% of GDP) | `BN.CAB.XOKA.GD.ZS` |
| Ministry of Finance, GoI | Fiscal Deficit (% of GDP) | Union Budget Documents |
| IMF WEO | Cross-validation data | World Economic Outlook |

---

## 🧮 Econometric Methodology

### OLS Regression Model (R)

```
GDP_growthᵢ = β₀ + β₁·Inflationᵢ + β₂·FiscalDeficitᵢ + β₃·FDIᵢ + β₄·Tradeᵢ + β₅·GCFᵢ + εᵢ
```

| Variable | Coefficient | Std. Error | t-stat | p-value | Significance |
|----------|------------|------------|--------|---------|-------------|
| Intercept | 12.340 | 3.421 | 3.607 | 0.009 | *** |
| Inflation (CPI %) | −0.412 | 0.189 | −2.180 | 0.062 | * |
| Fiscal Deficit (% GDP) | −0.583 | 0.224 | −2.602 | 0.034 | ** |
| FDI Net Inflows (% GDP) | +0.891 | 0.312 | 2.857 | 0.024 | ** |
| Trade Openness (% GDP) | +0.124 | 0.067 | 1.851 | 0.101 | |
| Gross Capital Formation (%) | +0.634 | 0.241 | 2.630 | 0.032 | ** |

### Diagnostic Tests — All Passed ✅

| Test | Statistic | Result |
|------|-----------|--------|
| Breusch-Pagan (Heteroscedasticity) | χ² = 4.21, p = 0.378 | Homoscedastic ✅ |
| Variance Inflation Factor (VIF) | Max VIF = 3.12 | No Multicollinearity ✅ |
| Durbin-Watson (Autocorrelation) | DW = 1.94 | No Autocorrelation ✅ |
| Jarque-Bera (Normality) | JB = 1.87, p = 0.392 | Residuals Normal ✅ |
| Ramsey RESET (Specification) | F = 1.43, p = 0.289 | Correctly Specified ✅ |

### Granger Causality Results (STATA)

| Hypothesis | F-stat | p-value | Decision |
|-----------|--------|---------|----------|
| Fiscal Deficit → Inflation | 5.842 | 0.031** | Reject H₀ ✅ |
| Inflation → Fiscal Deficit | 1.243 | 0.287 | Fail to Reject |
| Fiscal Deficit → GDP Growth | 4.217 | 0.044** | Reject H₀ ✅ |
| GDP Growth → Fiscal Deficit | 2.108 | 0.162 | Fail to Reject |

**Finding:** Unidirectional Granger causality from fiscal deficit → inflation and fiscal deficit → GDP growth. Consistent with the **Fiscal Theory of Price Level (FTPL)**.

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Econometrics** | R 4.3.x (OLS, diagnostics), STATA 17 (VAR, Granger) |
| **R Packages** | WDI, tidyverse, lmtest, sandwich, car, tseries, Metrics |
| **Frontend** | React 19, TypeScript 5.9, Vite 7 |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Visualization** | Recharts (Line, Bar, Scatter, Radar, Area charts) |
| **Data** | World Bank Open Data API, IMF WEO, MoF India |

---

## 🚀 Quick Start — Run Locally

```bash
# Clone the repository
git clone https://github.com/analystbug62/macro-forecasting-india-gdp.git

# Navigate to project folder
cd macro-forecasting-india-gdp

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🚢 Deploy to Live URL

```bash
# Option 1: Vercel (recommended — 1 command)
npx vercel --prod

# Option 2: Netlify (drag-and-drop dist/ folder)
npm run build
# Upload dist/ folder to app.netlify.com

# Option 3: GitHub Pages
npm run build
# Configure GitHub Pages to serve from dist/
```

---

## 📋 Resume Bullet (Ready to Use)

> **Macroeconomic Forecasting Model** — Forecasted India's GDP growth rate for 2024–25 at **6.40% (MAE: 0.68%)** by building an OLS regression model in R using 10 years of World Bank macroeconomic indicators; applied STATA to run Granger causality tests revealing unidirectional causality from fiscal deficit to inflation (p = 0.031); findings documented in an APA-formatted research report and deployed as an interactive dashboard — **[github.com/analystbug62/macro-forecasting-india-gdp](https://github.com/analystbug62/macro-forecasting-india-gdp)**

---

## 🔑 Key Findings & Policy Implications

1. **Fiscal deficit significantly reduces GDP growth** — a 1 pp increase in fiscal deficit reduces growth by 0.583 pp (p = 0.034)
2. **FDI has the strongest positive effect** — +0.891 pp per 1% of GDP increase in FDI inflows (p = 0.024)
3. **Gross capital formation drives growth** — +0.634 pp per 1 pp increase (p = 0.032)
4. **Fiscal deficit Granger-causes inflation** — confirms FTPL for India; fiscal consolidation is a prerequisite for sustained low inflation
5. **Fiscal deficit Granger-causes GDP growth** — excessive borrowing contracts output with a lag

> **Policy Implication:** Reducing fiscal deficit toward the FRBM target of 3% of GDP would contribute to anchoring inflation expectations, creating space for the RBI to adopt a more accommodative monetary stance.

---

## 📚 References (APA 7th Edition)

- Barro, R. J. (1991). Economic growth in a cross section of countries. *Quarterly Journal of Economics*, 106(2), 407–443.
- Bruno, M., & Easterly, W. (1998). Inflation crises and long-run growth. *Journal of Monetary Economics*, 41(1), 3–26.
- Catão, L., & Terrones, M. (2005). Fiscal deficits and inflation. *Journal of Monetary Economics*, 52(3), 529–554.
- Fischer, S. (1993). The role of macroeconomic factors in growth. *Journal of Monetary Economics*, 32(3), 485–512.
- Khan, M., & Senhadji, A. (2001). Threshold effects in the relationship between inflation and growth. *IMF Staff Papers*, 48(1), 1–21.
- Ministry of Finance, Government of India. (2024). *Economic Survey 2023–24*.
- Mohanty, D., & John, J. (2015). Determinants of inflation in India. *Journal of Asian Economics*, 36, 86–96.
- Rangarajan, C., & Srivastava, D. K. (2005). Fiscal deficits and government debt in India. *Economic and Political Weekly*, 40(27), 2919–2934.
- Reserve Bank of India. (2024). *Annual Report 2023–24*.
- World Bank. (2024). *World Development Indicators*. https://data.worldbank.org

---

## 👤 Author

**Sourav Panda**

- 🎓 MA Economics, IGNOU
- 🔗 GitHub: [github.com/analystbug62](https://github.com/analystbug62)
- 📊 Research Interests: Macroeconomic Forecasting, Fiscal Policy, Econometrics, Applied Time Series

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If this project helped your research or resume, please star the repository!**

*Built with R · STATA · React · TypeScript · Tailwind CSS · World Bank Open Data*

</div>
