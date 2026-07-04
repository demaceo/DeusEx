# Verification report — Part IV: "The Race We're In"

**Checked:** 2026-07-04 · **Method:** adversarial web research (primary sources where possible)
**Scope:** all 13 claims (3 statistics + 10 citations) and 8 sources in Part IV.

## Summary

| Status        | Count | Meaning                                                                             |
| ------------- | ----- | ----------------------------------------------------------------------------------- |
| ✅ Verified   | **8** | A credible source corroborates the specific figure (minor rounding/labeling noted). |
| ⚠️ Disputed   | **2** | The figure is real but misattributed, or the source says something different.       |
| ❔ Unverified | **3** | No credible source located in this pass for the specific attribution.               |

The historical and governance material — JFK's proliferation warning, the nuclear-states
timeline, the Montreal Protocol trend, the EU AI Act, and the White House / Bletchley
commitments — holds up cleanly against primary sources. What did **not** hold up is the entire
WIPO AI-patent block (four claims): the cited WIPO page 404s, the referenced report title does
not exist, and a WIPO-citing secondary source gives a materially different 2021 figure. One chart
(voluntary safety commitments) also conflates two different summits.

## ⚠️ Disputed (2)

- **`s-iv-wipo-patents-2021`** — "71K+ AI patent applications filed in 2021 (4.5x rise from
  15,317 in 2015)." The specific **71,423** figure cannot be corroborated: the cited WIPO page
  returns a 404, the referenced "WIPO Technology Trends" report title does not exist (WIPO's AI
  report is the 2019 _Technology Trends_; its AI-patent report is the 2024 _GenAI Patent
  Landscape_), and a WIPO-citing secondary source reports **~62,582** for 2021 instead. The rising
  trend is real; this value and its framing are not confirmed.
  Source: [GreyB AI patent landscape](https://insights.greyb.com/artificial-intelligence-patent-landscape/)
- **`c-iv-safety-commitments`** — the chart plots 7 (White House, Jul 2023), **16 (Bletchley,
  Nov 2023)**, 16 (Seoul, May 2024). The middle point is misattributed: **16 firms signed the
  Frontier AI Safety Commitments at the Seoul summit (May 2024)**, not at Bletchley. At Bletchley
  only the same 7 frontier developers published safety policies. The 7 → 16 growth story is real,
  but the middle bar's venue and date are wrong.
  Source: [gov.uk — Frontier AI Safety Commitments, Seoul 2024](https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024)

## ❔ Unverified (3)

- **`c-iv-wipo-patents`** — the year-by-year series (15,317 in 2015 → 71,423 in 2021) appears in
  no locatable WIPO publication, and the cited URL 404s. WIPO's 2019 report gives different
  metrics and does not extend to 2021. The chart's rising trend is directionally real; the exact
  series is unconfirmed.
- **`s-iv-wipo-countries`** — no WIPO source located stating AI patent data is tracked across
  "167 countries"; the figure traces only to the dead URL.
- **`s-iv-wipo-growth-rate`** — the "~20%" CAGR for 2013–2021 is unsubstantiated and internally
  inconsistent: the site's own 2015–2021 series works out to ~29% CAGR, and WIPO's 2019 data
  implies ~28% for machine-learning patents 2013–2016.

## ✅ Verified (8) — highlights

- **`c-iv-jfk-prediction`** — JFK's 21 March 1963 press conference: "haunted by the feeling" of
  "15 or 20 or 25 nations" with nuclear weapons in the 1970s.
- **`c-iv-nuclear-states-2024`** / **`c-iv-nuclear-states-history`** — nine nuclear-armed states
  (US, Russia, UK, France, China, India, Pakistan, Israel, North Korea); the 1→3→5→6→8→9 timeline
  is internally consistent with FAS acquisition dates. [FAS](https://fas.org/initiative/status-world-nuclear-forces/)
- **`c-iv-bletchley-countries`** — the Bletchley Declaration was signed by 28 countries plus the
  EU, including the US and China. [gov.uk](https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration)
- **`c-iv-eu-ai-act`** — Regulation (EU) 2024/1689, in the OJ 12 Jul 2024, in force 1 Aug 2024,
  most provisions applying from 2 Aug 2026. [EC](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- **`c-iv-white-house-commitments`** — 7 companies (Amazon, Anthropic, Google, Inflection, Meta,
  Microsoft, OpenAI) signed on 21 Jul 2023. [White House archive](https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/)
- **`c-iv-ai-red-lines`** — _Your Undivided Attention_ Ep. 136 (Tim Fist, Janet Egan) makes the
  nuclear-verification-parallel argument described.
- **`c-iv-montreal-ods`** — the Montreal Protocol trend (near-elimination by 2020, recovery
  projected by mid-century) is solidly corroborated; the note already flags the absolute values as
  approximate. [Our World in Data](https://ourworldindata.org/grapher/ozone-depleting-substance-consumption)

## Notes

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-iv.ts` (each
  `Claim`'s `verificationStatus` / `verifiedUrl` / `note` / `lastCheckedISO`). Unverified claims
  carry no `verifiedUrl` (no live link), matching the Parts I–III convention.
- Prose and chart data were **not** edited — disputed/unverified figures are flagged in `note`, not
  changed. The WIPO patents chart (`c-iv-wipo-patents`) therefore still renders, but as an
  unverified figure: `ChartFrame` withholds the "Verified" badge and stamps `data-verification`,
  and the evidence note explains why.
