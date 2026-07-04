# Verification report — Part XI: "The Ground It Comes From"

**Checked:** 2026-07-04 · **Method:** adversarial web research (primary sources where possible)
**Scope:** all 9 claims (3 statistics + 6 citations) and 4 sources in Part XI.

## Summary

| Status        | Count | Meaning                                                          |
| ------------- | ----- | ---------------------------------------------------------------- |
| ✅ Verified   | **7** | A credible primary/authoritative source corroborates the figure. |
| ⚠️ Disputed   | **2** | The figure is real but misattributed to the wrong source.        |
| ❔ Unverified | **0** | —                                                                |

The e-waste tonnages, the cobalt supply-share, the rare-earth processing share, and the DRC
child-labor estimate all hold up against primary/authoritative sources (the cobalt figure is, if
anything, understated versus current USGS data). The one real problem is the lithium-water figure,
which is attributed to the IEA when the number actually comes from NGO/academic sourcing; it
appears twice (a stat box and its inline-citation twin).

## ⚠️ Disputed (2)

- **`s-xi-lithium-water`** and **`c-xi-lithium-water`** — "~2 million litres of water per tonne of
  lithium (brine)," attributed to the IEA. The figure is credible as an order-of-magnitude
  estimate, but it does **not** originate from the cited IEA "Role of Critical Minerals" report;
  it traces to Dr. Ingrid Garcés (Univ. of Antofagasta) via NRDC and similar reporting. The IEA
  discusses lithium-brine water stress qualitatively, in different units. Number defensible; IEA
  attribution wrong. The claims are re-pointed to NRDC and flagged disputed.
  Source: [NRDC](https://www.nrdc.org/bio/amanda-maxwell/lithium-mining-must-not-dry-atacama-desert)

## ✅ Verified (7) — highlights

- **`s-xi-cobalt`** / **`c-xi-cobalt`** — the DRC supplies ~70% of the world's mined cobalt; USGS
  actually reports 74% (2023) to 76% (2024), so "roughly 70%" is conservative. [USGS](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-cobalt.pdf)
- **`c-xi-child-labor`** — UNICEF's ~40,000-children estimate for southern DRC mines (widely
  cited from 2014, including in Amnesty International's 2016 report). [Amnesty](https://www.amnesty.org/en/documents/afr62/3183/2016/en/)
- **`c-xi-rare-earth`** — China refines ~90% of rare earths; the claim correctly specifies
  processing/refining (extraction share is lower). [IEA](https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions/executive-summary)
- **`s-xi-ewaste`** / **`c-xi-ewaste`** — 62 Mt of e-waste generated in 2022, of which ~22.3%
  (~13.8 Mt) was formally recycled. [Global E-waste Monitor 2024](https://ewastemonitor.info/the-global-e-waste-monitor-2024/)
- **`c-xi-ewaste-trend`** — ~44 Mt (2014) → ~54 Mt (2019) → 62 Mt (2022) → ~82 Mt projected
  (2030), all confirmed against the Global E-waste Monitor series.

## Notes

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-xi.ts`.
- Prose was **not** edited. The two disputed claims keep their displayed value (~2M L) but are
  re-pointed to the correct origin in `verifiedUrl` and flagged in `note`; the figures render
  without the "Verified" badge, and the evidence note explains the misattribution.
