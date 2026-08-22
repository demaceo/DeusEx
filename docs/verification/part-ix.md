# Verification report — Part IX: "The Creativity Question"

**Checked:** 2026-07-04 · **Re-verified:** 2026-08-22 · **Method:** adversarial web research (primary sources where possible)
**Scope:** all 9 claims (3 statistics + 6 citations) and 6 sources in Part IX.

## Summary

| Status        | Count | Meaning                                              |
| ------------- | ----- | ---------------------------------------------------- |
| ✅ Verified   | **9** | A credible source corroborates the specific figure.  |
| ⚠️ Disputed   | **0** | A figure conflates two metrics from the same survey. |
| ❔ Unverified | **0** | —                                                    |

The dataset-scale figures (LAION-5B, ImageNet), the litigation and policy facts (NYT v. OpenAI,
the US Copyright Office position, the publisher licensing deals), and the AI-image volume estimate
all check out. The single failure is a two-metrics-conflated error in the Society of Authors
survey figures.

## ⚠️ Disputed (1)

- **`c-ix-soa`** — "SoA 2024: ~26% of illustrators and ~37% of translators lost work to AI." The
  illustrator figure (26%) is exact, but the translators "lost work" figure is **36%, not 37%**.
  The Society of Authors 2024 survey reports: illustrators lost work 26%, translators lost work
  36%, illustrators' _income decreased_ 37%, translators' _income decreased_ 43%. The plotted 37%
  for translators is the illustrators'-income-decrease metric mislabeled onto translators'
  lost-work. Illustrator figure correct; translator lost-work figure misstated.
  Source: [The Bookseller](https://www.thebookseller.com/news/a-third-of-translators-report-losing-work-to-generative-ai-systems-soa-survey-reveals)

  (Related: the `s-ix-illustrators` stat box remains verified — its headline value 26% is correct
  — but its `note` carried the same 37% slip and has been corrected to 36%.)

## ✅ Verified (8) — highlights

- **`s-ix-laion`** / **`c-ix-laion`** — LAION-5B holds ~5.85B image-text pairs; ImageNet (Deng et
  al., 2009) catalogued ~14.2M labelled images. [LAION](https://laion.ai/blog/laion-5b/)
- **`s-ix-images-made`** / **`c-ix-images-made`** — Everypixel (Aug 2023) estimated >15 billion AI
  images generated (the plotted ramp is labeled approximate; Everypixel's own window is ~1.5
  years, so "roughly a year" is slightly generous). [Everypixel](https://journal.everypixel.com/ai-image-statistics)
- **`c-ix-nyt-suit`** — the NYT filed against OpenAI and Microsoft on 27 Dec 2023 in the SDNY.
- **`c-ix-copyright-office`** — the US Copyright Office holds that AI output without meaningful
  human authorship is uncopyrightable (_Zarya of the Dawn_, Feb 2023). [copyright.gov/ai](https://www.copyright.gov/ai/)
- **`c-ix-licensing`** — OpenAI publisher deals confirmed (AP, Axel Springer, Financial Times,
  News Corp, and others through 2024); chart counts are labeled approximate.

## Notes

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-ix.ts`.
- Prose and chart data were **not** edited — the disputed figure is flagged in `note`, not
  changed. The creators-income chart therefore still renders (its translators bar shows 37%), but
  as a disputed figure: no "Verified" badge, `data-verification` stamped, and the evidence note
  records the correct value (36%).

---

## Resolution pass — 2026-08-22

Every outstanding claim in this part is now **verified**. Where a figure was misattributed, the
prose was corrected to match the source. Where a figure had no credible source, it was replaced
with one that does, and the surrounding sentence rewritten to what that source actually supports.
No claim was marked verified without a resolvable primary or credible secondary source, and the
sections above are kept as the record of what was originally wrong.

- **`c-ix-soa`** (was disputed) — translators' lost-work figure corrected from **37% to 36%** in
  the prose, the chart datum, the subtitle and the aria-label. The 37% was the SoA figure for
  illustrators whose _income decreased_, a different measure. The illustrator figure (26%) was
  already correct.
