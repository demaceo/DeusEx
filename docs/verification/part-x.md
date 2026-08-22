# Verification report — Part X: "Pattern and Prejudice"

**Checked:** 2026-07-04 · **Re-verified:** 2026-08-22 · **Method:** adversarial web research (primary sources where possible)
**Scope:** all 7 claims (3 statistics + 4 citations) and 4 sources in Part X.

## Summary

| Status        | Count | Meaning                                                              |
| ------------- | ----- | -------------------------------------------------------------------- |
| ✅ Verified   | **7** | A credible primary source corroborates the specific figure.          |
| ⚠️ Disputed   | **0** | The headline statistic is correct, but an added descriptor is wrong. |
| ❔ Unverified | **0** | —                                                                    |

The landmark algorithmic-bias figures — Gender Shades, COMPAS/ProPublica, and The Markup's lending
investigation — are precisely correct, with no slightly-off numbers or misattribution (these
figures are widely misquoted, so each was checked against the primary source). One claim carries a
correct headline statistic but a fabricated data-scale descriptor.

## ⚠️ Disputed (1)

- **`c-x-obermeyer`** — "Healthcare algorithm: Black patients flagged 17.7% biased vs 46.5%
  corrected." The headline figure (17.7% → 46.5%) is correct and verified against Obermeyer et al.,
  _Science_ (2019). The problem is the added descriptor (in the claim note and the chart subtitle)
  that the model was "trained on about 200 million people-years of data." That ~200M is the number
  of people such commercial risk algorithms are applied to per year across the US (deployment
  scale), **not** this study's training data — the study analyzed ~49,618 patients from one
  academic medical center. Core statistic correct; data-volume descriptor misattributed.
  Source: [UC Berkeley coverage](https://news.berkeley.edu/2019/10/24/widely-used-health-care-prediction-algorithm-biased-against-black-people/) ·
  [PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/31649194/)

## ✅ Verified (6) — highlights

- **`s-x-gendershades`** / **`c-x-gendershades`** — Gender Shades (Buolamwini & Gebru, PMLR 2018):
  max darker-female error 34.7% (IBM) vs max lighter-male error 0.8%; framed as the maximum
  intersectional gap. [PMLR](https://proceedings.mlr.press/v81/buolamwini18a.html)
- **`s-x-compas`** / **`c-x-compas`** — ProPublica "Machine Bias" (2016): false-positive rate
  44.9% Black vs 23.5% white ("almost twice as likely"). [ProPublica](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing)
- **`s-x-lending`** / **`c-x-lending`** — The Markup (Aug 2021), 2M+ conventional mortgage
  applications: 80% more likely to deny Black and 40% more likely to deny Latino applicants vs
  comparable white applicants. [The Markup](https://themarkup.org/denied/2021/08/25/the-secret-bias-hidden-in-mortgage-approval-algorithms)

## Notes

- Per-claim status, source URL, and reviewer note live in `src/data/parts/part-x.ts`.
- Prose and chart data were **not** edited — the disputed claim's core numbers (17.7 → 46.5) are
  correct and still plotted; the erroneous "200 million people-years" descriptor is flagged in
  `note`, not removed from the subtitle. The chart renders without the "Verified" badge and the
  evidence note explains the descriptor error.

---

## Resolution pass — 2026-08-22

Every outstanding claim in this part is now **verified**. Where a figure was misattributed, the
prose was corrected to match the source. Where a figure had no credible source, it was replaced
with one that does, and the surrounding sentence rewritten to what that source actually supports.
No claim was marked verified without a resolvable primary or credible secondary source, and the
sections above are kept as the record of what was originally wrong.

- **`c-x-obermeyer`** (was disputed) — the headline statistic (17.7% → 46.5%) was already correct
  and is unchanged. The chart's data descriptor was wrong: **~200 million people a year is the
  deployment scale** of this class of commercial risk algorithms across the US, not the study's
  training set. The study itself analysed ~49,618 patients at one academic medical centre. The
  subtitle now says so.
