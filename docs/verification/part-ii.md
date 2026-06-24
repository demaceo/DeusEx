# Verification report — Part II: "What's Actually Being Done"

**Checked:** 2026-06-24 · **Method:** parallel web research (primary sources where possible)
**Scope:** all 44 claims (12 statistics + 32 citations) and 21 sources in Part II.

## Summary

| Status        | Count  | Meaning                                                                             |
| ------------- | ------ | ----------------------------------------------------------------------------------- |
| ✅ Verified   | **41** | A credible source corroborates the specific figure (minor rounding/labeling noted). |
| ⚠️ Disputed   | **3**  | The figure is real but misattributed, or sources materially conflict.               |
| ❔ Unverified | **0**  | —                                                                                   |

Part II holds up extremely well. The nuclear deals, the cooling technology, the labor
litigation, and the regulatory timeline all check out against primary sources (company press
releases, FERC, court rulings, the EU AI Act text, state bills). The only problems are two
dollar figures that appear to be transcription errors and one mischaracterized court ruling —
the underlying facts in all three are real.

## ⚠️ Disputed (3)

- **`c-ii-introl-commonfund-2025`** — Microsoft's Three Mile Island / Crane Clean Energy Center
  restart is real (835 MW, 20-year Constellation PPA, targeting 2028), but the investment is
  **~$1.6 billion, not "$16 billion"** — almost certainly a decimal error.
  Source: [Constellation Energy](https://www.constellationenergy.com/news/2024/Constellation-to-Launch-Crane-Clean-Energy-Center-Restoring-Jobs-and-Carbon-Free-Power-to-The-Grid.html)
- **`c-ii-enkiai-commonfund-2025`** — Amazon's 1.92 GW Susquehanna PPA with Talen (through 2042)
  is confirmed, but it is a **~$18 billion** deal, not "over $20 billion." Capacity and term are
  correct; the dollar figure is overstated.
  Source: [Talen Energy IR](https://ir.talenenergy.com/news-releases/news-release-details/talen-energy-expands-nuclear-energy-relationship-amazon)
- **`c-ii-stackcyber-2026`** — The vendor-liability point is sound (in _Mobley v. Workday_ the
  court held AI providers can be directly liable as employers' "agents"), but the document's
  "class action certified … for discriminatory outcomes" overstates it: the May 2025 ruling was a
  **conditional ADEA collective-action certification** (age), not a Rule 23 class certification.
  Source: [Seyfarth analysis](https://www.seyfarth.com/news-insights/mobley-v-workday-court-holds-ai-service-providers-could-be-directly-liable-for-employment-discrimination-under-agent-theory.html)

## ✅ Verified (41) — highlights

- **Energy:** renewables 58% of data-centre power in 2025 (up from 50%) ([S&P Global](https://www.spglobal.com/market-intelligence/en/news-insights/articles/2026/6/s-p-webinar-data-center-power-demand-to-more-than-double-by-2030-102727689));
  10+ GW of Big Tech nuclear contracted in 2024–2025 (Amazon–Talen, Meta–Constellation/Vistra,
  Google–Kairos, Microsoft–Constellation); Meta–Clinton 1.1 GW restart; the FERC rejection of
  Amazon's expanded Susquehanna co-location ([Utility Dive](https://www.utilitydive.com/news/google-kairos-power-advanced-nuclear-reactor-data-center-electricity-demand-ai/729876/));
  Deloitte's "~10% of demand growth by 2035"; Big Tech = 43% of global clean-energy PPAs in 2024
  ([Brookings](https://www.brookings.edu/articles/global-energy-demands-within-the-ai-regulatory-landscape/));
  and every Fortune emissions figure (Google ~50%, Amazon 33%, Microsoft >23%, Meta >60%) plus
  the Uptime Institute 12% drop ([Fortune](https://fortune.com/2026/03/29/big-tech-climate-change-goals-data-centers-ai-fossil-fuels/)).
- **Water:** Microsoft's zero-water closed-loop cooling (>125M litres/yr/facility, WUE 0.30 vs
  0.49, Phoenix & Mt. Pleasant pilots, all new designs from Aug 2024) — confirmed by Microsoft's
  own [Cloud Blog](https://www.microsoft.com/en-us/microsoft-cloud/blog/2024/12/09/sustainable-by-design-next-generation-datacenters-consume-zero-water-for-cooling/);
  Vertiv/Chindata X-Cooling (1.2M tons/100 MW); Edged's Chicago-area zero-water facility (Feb
  2025); Crusoe $1.4B and Firmus $327M raises; Google's 24,227 ML in 2023; and Nixon Peabody's
  thin-disclosure finding.
- **Labor:** the Nairobi High Court 180+ Meta ruling and the 2023 mental-health-care order
  ([Computer Weekly](https://www.computerweekly.com/feature/Kenyan-workers-win-High-Court-appeal-to-take-Meta-to-trial));
  Teleperformance Colombia's 40,000-worker unionisation agreement; the Data Labelers Association
  (339 members); Ruto's move to shield outsourcers ([TIME](https://time.com/7201516/kenya-president-meta-lawsuits/));
  the March 2026 Meta AI-glasses class action ([TechCrunch](https://techcrunch.com/2026/03/05/meta-sued-over-ai-smartglasses-privacy-concerns-after-workers-reviewed-nudity-sex-and-other-footage/));
  and SOMO's "30+ intermediaries" report.
- **Regulation:** EU AI Act Article 5 prohibitions in force 2 Feb 2025 and the €35M/7% fine cap
  ([AI Act text](https://artificialintelligenceact.eu/article/99/)); GPAI obligations from 2 Aug
  2025; the Aug 2026 → Dec 2027 high-risk deferral and the 28 April Omnibus trilogue collapse
  ([IAPP](https://iapp.org/news/a/ai-act-omnibus-what-just-happened-and-what-comes-next));
  Colorado SB24-205 ($20k/violation, 30 Jun 2026), California SB 53 (TFAIA), Texas TRAIGA,
  Illinois HB 3773, NYC LL144; and EO 14365 naming the Colorado law.

## Notes worth flagging (not status-changing)

- The Deloitte "10%" is **10% of the projected demand _increase_** by 2035, not 10% of total
  data-centre demand — the prose slightly broadens the scope.
- The FERC rejection's stated rationale was grid-cost / ratepayer fairness rather than "unfair
  advantage" per se, and the rejected expansion was 300 → 480 MW.
- The Teleperformance-Colombia agreement was signed **April 2023**; Vertiv X-Cooling was first
  announced **July 2022**; the Edged facility is in **Aurora, IL**. The figures hold; only the
  "what's new in 2025–26" framing is loose.
- Colorado's AI Act, described here as originally passed, was subsequently amended by SB 26-189.

## Methodology

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-ii.ts` (each
  `Claim`'s `verificationStatus` / `verifiedUrl` / `note` / `lastCheckedISO`). The UI colors
  citations and stat boxes by status, the banner shows the per-document tally, and verified
  sources link out.
- Prose was **not** edited — the two dollar-figure errors and the Workday mischaracterization are
  flagged in `note`, not changed, since the text is a transcript of the source documents.
- "Verified" means a credible source corroborates the specific figure; aggregator citations
  (Introl, Enkiai, Commonfund, ThePromptBuddy) were checked against the underlying primary
  sources, which are the URLs recorded.
