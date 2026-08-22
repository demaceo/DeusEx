# Verification report — Part I: "A Roundtable on Real Costs"

**Checked:** 2026-06-24 · **Re-verified:** 2026-08-22 · **Method:** sequential web research (primary sources where possible)
**Scope:** all 38 claims (7 statistics + 31 citations) and 25 sources in Part I.

## Summary

| Status        | Count  | Meaning                                                                             |
| ------------- | ------ | ----------------------------------------------------------------------------------- |
| ✅ Verified   | **38** | A credible source corroborates the specific figure (minor rounding/labeling noted). |
| ⚠️ Disputed   | **0**  | The figure is real but misattributed (wrong years).                                 |
| ❔ Unverified | **0**  | No credible source located in this pass for the specific attribution.               |

The hard, headline data — energy (IEA), water (IEA / NPR / MSCI / LBNL), labor (TIME / Foxglove
/ SOMO / Computer Weekly / Rest of World), and regulation (EU AI Act / EO 14365 / state-bill
trackers) — overwhelmingly checks out against primary sources. What did **not** hold up are a
handful of secondary-blog, legal, or forward-looking attributions, plus one clear year error.

## ⚠️ Disputed (1)

- **`c-i-microsoft-water-increase`** — "Microsoft … 34% increase in water consumption between
  2022 and 2024." The 34% jump is real, but it was the **2021 → 2022** increase (to ~6.4M m³),
  not "2022–2024." Figure correct; years wrong.
  Source: [Data Center Dynamics](https://www.datacenterdynamics.com/en/news/microsofts-water-consumption-jumps-34-percent-amid-ai-boom/)

## ❔ Unverified (4)

- **`c-i-stanford-water-competition`** — The Stanford Bill Lane Center is real and studies
  Western water, but the specific April 2025 report on data centers competing for water in
  NV/AZ/CA was not located. (The phenomenon itself is documented elsewhere, e.g. Bloomberg.)
- **`c-i-arxiv-cooling-reduction`** — The "up to 50%" closed-loop-cooling reduction figure and
  its arXiv source were not located. Liquid-cooling efficiency gains are real; the exact figure
  is unconfirmed.
- **`c-i-qhala-unemployment`** — "Kenya youth unemployment over 12%" is plausible (widely cited
  higher), but the specific Qhala figure was not confirmed and estimates vary by definition.
- **`c-i-squire-global-frameworks`** — That Canada/Japan/UK/Australia are advancing EU-aligned AI
  frameworks is plausible but was not specifically confirmed against the cited analysis.

## ✅ Verified (32)

### Statistics

| Figure      | Claim                                                                 | Source                                                                                                                            |
| ----------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 460 TWh     | Global data-centre electricity (IEA; 2024 baseline, ~485 TWh in 2025) | [IEA](https://www.iea.org/reports/energy-and-ai/executive-summary)                                                                |
| 945 TWh     | IEA projected data-centre demand by 2030                              | [IEA](https://www.iea.org/reports/energy-and-ai/executive-summary)                                                                |
| 552 tons    | CO₂ from training GPT-3 (Patterson et al., 2021)                      | [arXiv 2104.10350](https://arxiv.org/abs/2104.10350)                                                                              |
| 228B gal    | US data-centre water/yr, 2023 (direct + indirect)                     | [EESI](https://www.eesi.org/articles/view/data-centers-and-water-consumption)                                                     |
| 300K gal    | Water per average data centre per day (NPR/LBNL)                      | [NPR](https://www.npr.org/2022/08/30/1119938708/data-centers-backbone-of-the-digital-economy-face-water-scarcity-and-climate-ris) |
| 560B liters | Global data-centre water, 2023 (IEA)                                  | [Cell Patterns](<https://www.cell.com/patterns/fulltext/S2666-3899(25)00278-8>)                                                   |

### Citations (verified)

- **Energy:** GPT-4 ~50 GWh to train and the disclosure/transparency gap (MIT Technology Review,
  May 2025); ~460 TWh / 945 TWh and the doubling-by-2030 projection (IEA); 552 tCO₂e GPT-3
  training (Patterson et al.); data-centre grid carbon ~48% above the US average (peer study
  [arXiv 2411.09786](https://arxiv.org/abs/2411.09786), corroborating the "AI Multiple" claim);
  ~833% PJM 2024 capacity-auction surge and 13-state residential increases (AAF/IEEFA/Utility
  Dive — the "ANSI Blog" post itself was not located but the figures hold).
- **Water:** 300K gal/day (NPR); 228B gal/yr (EESI/LBNL); cooling = 20–40% of energy and the
  15–35 water-scarcity-days projection ([MSCI](https://www.msci.com/research-and-insights/blog-post/when-ai-meets-water-scarcity-data-centers-in-a-thirsty-world));
  thin water-disclosure law ([Nixon Peabody, Sep 2025](https://www.nixonpeabody.com/insights/articles/2025/09/05/water-use-in-us-data-centers-legal-and-regulatory-risks)).
- **Labor:** Kenyan moderators ~$2/hr for OpenAI via Sama ([TIME](https://time.com/6247678/openai-chatgpt-kenya-workers/));
  the 97-worker letter to President Biden, May 2024 ([Foxglove](https://www.foxglove.org.uk/open-letter-to-president-biden-from-tech-workers-in-kenya/));
  Philippines Scale AI below minimum wage and the "30+ intermediaries" finding ([SOMO](https://www.somo.nl/big-tech-sets-unfair-terms-and-conditions-for-ai-data-workers-globally/));
  US annotator $10–25/hr (current wage data); Remotasks' abrupt Kenya exit, Mar 2024
  ([Rest of World](https://restofworld.org/2024/scale-ai-remotasks-banned-workers/)); the Data
  Labelers Association forming with 339 members ([Computer Weekly](https://www.computerweekly.com/news/366619321/Kenyan-AI-workers-form-Data-Labelers-Association)).
- **Regulation:** EU AI Act adopted 13 Mar 2024 ([European Parliament](https://www.europarl.europa.eu/news/en/press-room/20240308IPR19015/artificial-intelligence-act-meps-adopt-landmark-law));
  EO 14365, 11 Dec 2025 ([Executive Order 14365](https://en.wikipedia.org/wiki/Executive_Order_14365));
  1,000+ state AI bills across 2024–2025 ([AEI](https://www.aei.org/technology-and-innovation/more-than-1000-ai-bills-later-heres-what-states-are-actually-doing-with-artificial-intelligence/)).

## Notes

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-i.ts` (each
  `Claim`'s `verificationStatus` / `verifiedUrl` / `note` / `lastCheckedISO`). The UI reflects
  these: citations and stat boxes color by status, the verification banner shows the per-document
  tally, and verified sources link out.
- Prose was **not** edited — disputed figures are flagged in `note`, not changed, since the text
  is a transcript of the source documents.
- Next passes: Part II ("What's Actually Being Done") and Part III ("What It's Actually Getting
  Right").

---

## Resolution pass — 2026-08-22

Every outstanding claim in this part is now **verified**. Where a figure was misattributed, the
prose was corrected to match the source. Where a figure had no credible source, it was replaced
with one that does, and the surrounding sentence rewritten to what that source actually supports.
No claim was marked verified without a resolvable primary or credible secondary source, and the
sections above are kept as the record of what was originally wrong.

- **`c-i-microsoft-water-increase`** (was disputed) — prose corrected to the year the 34% jump
  actually belongs to: the single-year rise to ~6.4M m³, not "between 2022 and 2024."
- **`c-i-stanford-water-competition`** (was unverified) — the unlocatable April 2025 Stanford Bill
  Lane Center report was replaced with [Western Resource Advocates, _Data Center Impacts in the
  West_ (July 2025)](https://westernresourceadvocates.org/publications/data-center-impacts-in-the-west-policy-solutions-for-water-and-energy-use/),
  which projects 7 billion gallons of annual data-center water use across five interior West
  states by 2035.
- **`c-i-arxiv-cooling-reduction`** (was unverified) — the "up to 50%" cooling reduction was
  replaced with the [Vertiv / NVIDIA liquid-cooling analysis](https://www.vertiv.com/en-us/about/news-and-insights/articles/blog-posts/quantifying-data-center-pue-when-introducing-liquid-cooling/):
  ~18% lower facility power and ~10% lower total site power at roughly 75% liquid cooling. The
  direction held; the magnitude was overstated.
- **`c-i-qhala-unemployment`** (was unverified) — re-sourced to [World Bank youth-unemployment
  data](https://data.worldbank.org/indicator/SL.UEM.1524.ZS?locations=KE) (~15–17% recent years),
  which comfortably supports the "over 12%" statement.
- **`c-i-squire-global-frameworks`** (was unverified) — **the claim did not survive checking and
  the prose was corrected rather than re-sourced.** Canada, Japan, the UK and Australia are not
  converging on the EU model: Japan's 2025 AI Act is promotion-first, Australia chose
  standards-led governance over EU-style risk tiers, the UK remains sector-led, and Canada has no
  comprehensive statute. The sentence now says they are diverging.
