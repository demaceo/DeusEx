# Verification report — Part III: "What It's Actually Getting Right"

**Checked:** 2026-06-24 · **Method:** parallel web research (primary sources where possible)
**Scope:** all 41 claims (12 statistics + 29 citations) and 19 sources in Part III.

## Summary

| Status        | Count  | Meaning                                                                       |
| ------------- | ------ | ----------------------------------------------------------------------------- |
| ✅ Verified   | **28** | A credible source corroborates the specific figure (minor labeling noted).    |
| ⚠️ Disputed   | **6**  | The figure is real but misattributed, or the source says something different. |
| ❔ Unverified | **7**  | No credible source located for the specific figure this pass.                 |

The "flagship" science holds up cleanly — AlphaFold, the 2024 Nobel, the MIT antibiotic work,
the brain map, the flood/weather systems, the Harvard tutoring RCT, and the accessibility tools
are all confirmed against primary sources. What does **not** hold up is concentrated in two
places: a cluster of medical-economics figures sourced only to a marketing blog
("ThePromptBuddy"), and a pair of agriculture figures sourced only to a vendor's own blog
(Farmonaut). Several real numbers are also attached to the wrong actor or the wrong metric.

## ⚠️ Disputed (6)

- **`c-iii-pdb-40pct`** — the "~40% of new PDB structures used AI" figure in the cited Frontiers
  in AI article actually refers to **cryo-EM**, not AI techniques. Misattributed.
- **`c-iii-mit-antibiotic`** — the antibiotic study (36M+ compounds, DN1 clears MRSA in mice) is
  real and structurally novel, but it is **MIT / Broad / Phare Bio (Collins lab, _Cell_, Aug
  2025), not McMaster** — the McMaster attribution appears conflated with the earlier
  Stokes/halicin (2020) work.
- **`s-iii-cancer-detection-150k`** and **`c-iii-promptbuddy-150k`** — the $150,000 is real but
  it is the **cost per lung cancer _detected_ without AI** (falling to ~$300 with AI) in
  Gebremeskel et al. 2024, not an average per-patient _treatment_ saving across early detection.
- **`c-iii-promptbuddy-98b`** — the "$9.8B, +67%" healthcare-AI investment figure conflicts with
  credible data (Crunchbase: ~$10.7B in 2025, +24% over $8.6B in 2024). Neither the amount nor
  the growth rate matches.
- **`c-iii-nhsjs-zhai`** — the Zhai-et-al. cognitive-offloading point is genuinely in the NHSJS
  review, but the "**95% of college faculty**" figure is **not** — it comes from a separate Jan
  2026 Elon University / AAC&U survey, so the claim conflates two sources.

## ❔ Unverified (7)

- **`c-iii-cancer-protein`** — no primary source supports "Google DeepMind identified a
  previously unknown protein interaction critical to cancer-cell survival" per the cited Jan 2026
  article. Nearby real-but-different work exists (C2S-Scale, Isomorphic IsoDDE, Insilico
  MYC–WDR5); none matches the claim as stated.
- **`s-iii-drug-cost-700m`** / **`c-iii-promptbuddy-700m`** — the "$700M average savings per drug"
  figure is asserted only by ThePromptBuddy blog; no primary/industry source corroborates a
  per-drug average (industry estimates exist only as aggregate, e.g. McKinsey's $60–110B/yr).
- **`c-iii-promptbuddy-70pct`** — no credible source for "failed candidates caught 70% earlier."
- **`c-iii-promptbuddy-18pct`** — no credible source for a generalizable "18% lower imaging costs."
- **`c-iii-farmonaut-yields`** / **`c-iii-farmonaut-70pct`** — the 15–20% yield / 30% water / 25%
  input-cost figures and the "70% of large-scale farms use AI" estimate trace only to Farmonaut's
  own marketing/statistics blogs, with no independent or peer-reviewed citation.

"Unverified" means _not substantiated in this pass_, not necessarily false — but note that the
ThePromptBuddy and Farmonaut figures are the weakest-sourced material in the entire series.

## ✅ Verified (28) — highlights

- **Biology:** AlphaFold DB's 214M+ structures ([Nucleic Acids Research](https://academic.oup.com/nar/article/52/D1/D368/7337620));
  the 2024 Nobel Prize in Chemistry ([NobelPrize.org](https://www.nobelprize.org/prizes/chemistry/2024/press-release/));
  the 36M-compound generative-AI antibiotic screen and its structural novelty ([MIT News](https://news.mit.edu/2025/using-generative-ai-researchers-design-compounds-kill-drug-resistant-bacteria-0814));
  the Harvard/Google cubic-mm brain map in _Science_ ([Science](https://www.science.org/doi/10.1126/science.adk4858));
  and the 55%/50% research-concentration figures ([bioRxiv](https://www.biorxiv.org/content/10.1101/2025.02.11.637417v2.full)).
- **Medicine:** the 4yr→18mo preclinical compression and the AI druggability/toxicity/PK
  capability description (with the ~$2.6B Tufts cost-to-develop as context) — the parts of the
  health section that rest on real research, as opposed to the blog's dollar figures.
- **Climate:** flood forecasting for 2B+ people in 150 countries ([Google Research](https://sites.research.google/gr/floodforecasting/));
  the ungauged-watershed system in _Nature_ ([Nearing et al. 2024](https://www.nature.com/articles/s41586-024-07145-1));
  DeepMind's 15-day cyclone model; and WeatherNext 2's 8× speedup ([Google](https://blog.google/technology/google-deepmind/weathernext-2/)).
- **Education & accessibility:** the Harvard tutoring RCT (0.73–1.3 SD, p < 10⁻⁸) ([Scientific Reports](https://www.nature.com/articles/s41598-025-97652-6));
  Brookings on AI tutoring for under-resourced schools; Microsoft Seeing AI, Be My Eyes (Be My
  AI), Google Live Transcribe, and Aira at Denver International; the 2024 DOJ ADA Title II rule
  ([Federal Register](https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state));
  and the European Accessibility Act (in effect 28 Jun 2025).

## Notes worth flagging (not status-changing)

- The Nearing et al. flood paper appeared in **_Nature_ (2024)**, not "Nature Communications
  2025" as the citation label says — the paper itself is genuine.
- "First AI-driven tool to win a Nobel" is widely-repeated framing, not an official Nobel
  designation; the prize facts are correct.
- AMR mortality (">1M/yr") checks out — the Lancet GRAM study puts bacterial AMR at ~1.27M
  attributable deaths in 2019.

## Methodology

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-iii.ts` (each
  `Claim`'s `verificationStatus` / `verifiedUrl` / `note` / `lastCheckedISO`). The UI colors
  citations and stat boxes by status, the banner shows the per-document tally, and verified
  sources link out.
- Prose was **not** edited — disputed/unverified figures are flagged in `note`, not changed,
  since the text is a transcript of the source documents.
- Blog-only citations (ThePromptBuddy, Farmonaut) were checked against credible primary/industry
  sources; where none corroborated the specific figure, the claim is marked unverified or
  disputed and the reason recorded.
