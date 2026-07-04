# Verification report — Part VI: "The Tail Risk"

**Checked:** 2026-07-04 · **Method:** adversarial web research (primary sources where possible)
**Scope:** all 9 claims (3 statistics + 6 citations) and 4 sources in Part VI.

## Summary

| Status        | Count | Meaning                                            |
| ------------- | ----- | -------------------------------------------------- |
| ✅ Verified   | **9** | A credible primary source corroborates the figure. |
| ⚠️ Disputed   | **0** | —                                                  |
| ❔ Unverified | **0** | —                                                  |

Part VI is clean, and notably tighter than Parts I–III. Every survey figure traces precisely to
the AI Impacts / Grace et al. expert-survey series, with the correct survey year and metric; the
CAIS statement and the Epoch AI compute trend also check out. Checked adversarially against the
arXiv HTML of Grace et al. (2024), the AI Impacts 2016 and 2022 survey pages, the CAIS statement
page, and Epoch AI's trends dashboard.

## ✅ Verified (9)

- **`s-vi-survey-n`** — 2,778 researchers in the 2023 Expert Survey on Progress in AI (ESPAI).
  [arXiv:2401.02843](https://arxiv.org/abs/2401.02843)
- **`s-vi-median-5`** / **`c-vi-median-estimate`** — median ~5% for an "extremely bad outcome
  (e.g. human extinction)" in the 2023 survey. (A closely related 2023 item scored 10%; the site's
  5% is a legitimately reported median, correctly framed.)
- **`s-vi-hlmi-2047`** — the 2047 aggregate 50% HLMI year, "down thirteen years from 2060 in the
  2022 survey."
- **`c-vi-hlmi-shift`** — 2061 (2016) → 2059 (2022) → 2047 (2023). Each traces to the AI Impacts
  survey for that year. [AI Impacts](https://aiimpacts.org/2022-expert-survey-on-progress-in-ai/)
- **`c-vi-survey-tenpct`** — 48% gave ≥10% chance to an extremely bad outcome, correctly
  attributed to the **2022** survey (not conflated with 2023).
- **`c-vi-prioritize-safety`** — ~70% thought AI safety should be prioritized more (2023,
  Fig. 14).
- **`c-vi-compute-trend`** — Epoch AI: training compute growing ~4–5x/year; the plotted log-FLOP
  values for AlexNet/GPT-2/GPT-3/GPT-4 are reasonable order-of-magnitude approximations, labeled
  approximate. [Epoch AI](https://epoch.ai/trends)
- **`c-vi-cais-statement`** — the CAIS "Statement on AI Risk" (2023), signatories including
  Hinton, Bengio, Hassabis, Sutskever, Altman, and the Amodeis. [CAIS](https://safe.ai/work/statement-on-ai-risk)

## Notes

- Two non-status nuances worth recording: the 2022 HLMI point is plotted as 2059 (matching the
  2022 survey's own "37 years, i.e. 2059"), while Grace et al. 2024 rounds that to 2060 when
  saying 2047 is "thirteen years earlier"; and the 5% median is from the general
  extremely-bad-outcome item (a more specific 2023 extinction item scored 10%). Both are correctly
  sourced; neither is an error.
- No claims changed status; the file was not edited.
