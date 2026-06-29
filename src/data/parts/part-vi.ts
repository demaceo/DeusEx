import type { RoundtableDocument } from '../../types/document'

export const partVI: RoundtableDocument = {
  id: 'part-vi',
  slug: 'the-tail-risk',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Safety · Alignment · Existential Risk · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'The Tail Risk', em: true }]],
    subtitle:
      'Five parts argued about costs, responses, benefits, the race, and the truth. This one takes up the question the series kept circling and never asked directly: could this go catastrophically wrong — and how should we act under that much uncertainty?',
    dateLine: 'June 2026 · Sixth in the AI Reckoning series',
    accentColor: 'indigo',
  },
  companion: {
    text: 'Part VI of the AI Reckoning Series — Read alongside Parts I–V for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'There is a conversation the previous five parts kept gesturing toward and then stepping around: the possibility that advanced AI could fail not in the ordinary way — a biased model, a lost job, a polluted information stream — but catastrophically, at a scale that is hard to undo. It is the hardest topic in the field because the evidence is, by nature, about something that has not happened.',
      },
    ],
    [
      {
        type: 'text',
        value:
          'Two new voices sharpen the disagreement. An Accelerationist who believes the real danger is moving too slowly — that every year of caution is a year of cures and discovery forgone. And a Safety Researcher who works on keeping advanced systems controllable, and who argues that a small chance of an irreversible mistake deserves serious weight. This is not a debate between doom and denial. It is a debate about how to act when reasonable, informed people put very different numbers on the same unknown.',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — What a Tail Risk Is
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'What a Tail Risk Is' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'Median researcher estimate',
                value: '5%',
                size: 'large',
                description:
                  'Median probability AI researchers gave to an extremely bad long-run outcome, such as human extinction (2023 expert survey)',
                claimId: 's-vi-median-5',
              },
              {
                variant: 'neutral',
                labelTop: 'Aggregate timeline',
                value: '2047',
                size: 'medium',
                description:
                  'Year researchers collectively give a 50% chance of high-level machine intelligence — 13 years earlier than the same survey a year before',
                claimId: 's-vi-hlmi-2047',
              },
              {
                variant: 'neutral',
                labelTop: 'Survey scale',
                value: '2,778',
                size: 'medium',
                description: 'AI researchers surveyed in the 2023 Expert Survey on Progress in AI',
                claimId: 's-vi-survey-n',
              },
            ],
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'systems-humanist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Let me define the term precisely, because it is constantly misused. A "tail risk" is not a prediction that something will happen. It is a low-probability, high-consequence event in the tail of a distribution. The thing that makes it matter is not its likelihood but the product of likelihood and stakes — and, crucially, whether the outcome is reversible. We buy insurance and wear seatbelts for exactly this shape of risk.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'everyday-person',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'When people say AI could end the world, I honestly tune out. It sounds like science fiction. So tell me plainly: is this a fringe idea, or do serious people actually believe it?',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'safety-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'It is not fringe, and that is the uncomfortable part. When thousands of published AI researchers were surveyed in 2023, the median estimate for an extremely bad outcome — on the order of human extinction — was around 5%.',
                  },
                  { type: 'cite', claimId: 'c-vi-median-estimate' },
                  {
                    type: 'text',
                    value:
                      ' Nearly half of respondents in a closely related survey gave it at least a 10% chance. These are not activists. They are the people building the systems. You do not have to share their estimate to notice that a 5% chance of an irreversible catastrophe is not a number a sane society ignores.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'skeptic',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I want to put a thumb on the scale of caution here — against the caution. People are notoriously terrible at estimating probabilities for events with no base rate. "5%" sounds rigorous, but it is a vibe wearing a number\'s clothing. Ask the same people next year and you will get a different figure. I take the survey seriously as evidence that experts are worried. I do not take it seriously as a measurement of actual risk, because no such measurement exists.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'donut',
            labelTop: 'Expert Opinion · 2022 Survey',
            title: 'How Many Researchers Take the Tail Seriously?',
            subtitle:
              'In the 2022 Expert Survey on Progress in AI, 48% of respondents gave at least a 10% chance to an extremely bad outcome from advanced AI. It is a distribution of opinion, not a measurement of risk.',
            source: 'AI Impacts — Expert Survey on Progress in AI (2022)',
            claimIds: ['c-vi-survey-tenpct'],
            ariaLabel:
              'Donut chart showing 48 percent of surveyed AI researchers gave at least a 10 percent chance of an extremely bad outcome and 52 percent did not',
            unit: '%',
            data: [
              { label: 'Gave ≥10% chance', value: 48, variant: 'accent' },
              { label: 'Gave less than 10%', value: 52, variant: 'navy' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — The Case for Speed
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'The Case for Speed' },
      stanceOverride: { 'policy-realist': 'critic' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'accelerationist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Here is what the safety framing leaves out: the cost of delay is real, large, and invisible. Every year we slow down is a year of drugs not discovered, diagnoses missed, materials not invented. Part III of this series documented AlphaFold and the medical breakthroughs. Those came from racing forward, not from a precautionary pause. The bodies on the side of caution are real too — they are just statistical, so no one counts them.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'tech-optimist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I am more cautious than the Accelerationist, but the underlying point about capability is just true. The compute used to train frontier models has roughly doubled every six months for over a decade.',
                  },
                  { type: 'cite', claimId: 'c-vi-compute-trend' },
                  {
                    type: 'text',
                    value:
                      ' That curve is why timelines keep getting shorter — and it is also why "just pause" is harder than it sounds. The capability gains are coupled to the same scaling that produces the benefits. You cannot cleanly keep one and stop the other.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'accelerationist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'And notice the asymmetry in how risk gets treated. A speculative catastrophe gets a respectful hearing and an international summit. A concrete delay — a cancer drug that arrives in 2032 instead of 2028 — gets nothing, because it has no face. I am not saying ignore safety. I am saying weigh both tails. There is a tail where we move too slowly and people who could have been saved are not.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'policy-realist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'That is a fair challenge, and the honest answer is that good policy has to price both tails. But there is a difference the Accelerationist glosses over: a delayed drug is a recoverable loss — we get it later. An irreversible catastrophe is not recoverable at all. When one side of the ledger is "slower" and the other is "permanent," precaution is not irrational. It is how you treat asymmetric, one-way risks.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'bar',
            orientation: 'vertical',
            labelTop: 'Capability Scaling · Epoch AI',
            title: 'Training Compute of Notable Models (log scale)',
            subtitle:
              'Training compute for frontier models has grown by roughly four to five times per year — a doubling about every six months. Bars show order of magnitude (log₁₀ of training FLOP) for representative systems.',
            source: 'Epoch AI — Parameter, Compute and Data Trends in Machine Learning',
            claimIds: ['c-vi-compute-trend'],
            ariaLabel:
              'Bar chart showing the log of training compute rising from about 17 for AlexNet in 2012 to about 25 for GPT-4 in 2023',
            unit: 'log₁₀ FLOP',
            variant: 'navy',
            data: [
              { label: 'AlexNet\n2012', value: 17 },
              { label: 'GPT-2\n2019', value: 21 },
              { label: 'GPT-3\n2020', value: 23 },
              { label: 'GPT-4\n2023', value: 25, variant: 'accent' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — The Case for Caution
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'The Case for Caution' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'safety-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'The strongest argument for caution is not a movie plot. It is that we are deploying systems we cannot fully interpret, faster than we can understand them, and the timelines are compressing. In the 2023 survey, the aggregate forecast for a 50% chance of high-level machine intelligence jumped to 2047 — thirteen years earlier than the same researchers said just one year before.',
                  },
                  { type: 'cite', claimId: 'c-vi-hlmi-shift' },
                  {
                    type: 'text',
                    value:
                      ' When the people closest to the work keep revising their timelines toward sooner, that is data about our uncertainty, and uncertainty cuts toward caution, not away from it.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'safety-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'In 2023, hundreds of scientists and lab leaders — including Turing Award winners and the heads of the major labs — signed a single sentence: that mitigating the risk of extinction from AI should be a global priority alongside pandemics and nuclear war.',
                  },
                  { type: 'cite', claimId: 'c-vi-cais-statement' },
                  {
                    type: 'text',
                    value:
                      " You can think they are wrong. You cannot call it a fringe view when the field's most cited researchers and the CEOs racing to build it put their names to it.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'accelerationist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "I will note the obvious conflict of interest, since no one else will: a statement that 'this technology is so powerful it could end the world' is also the greatest marketing copy ever written for a product, and a moat dug by incumbents who would love regulation that only they can afford. Sincere fear and convenient fear look identical from the outside.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'systems-humanist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "Both things can be true. The incentive to overstate risk for regulatory capture is real — and so is the underlying hazard. The way out of that trap is not to pick a side on motives. It is to build independent capacity to evaluate the systems, so we do not have to trust the labs' framing in either direction. The nuclear field did not run on the goodwill of weapons states. It ran on inspectors.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'line',
            labelTop: 'Shortening Timelines · Expert Surveys',
            title: 'When Will Machines Reach Human-Level Ability?',
            subtitle:
              'The year researchers collectively assign a 50% chance of high-level machine intelligence has moved sharply earlier — from 2061 in 2016 to 2047 in the 2023 survey.',
            source: 'AI Impacts — Expert Surveys on Progress in AI (2016, 2022, 2023)',
            claimIds: ['c-vi-hlmi-shift'],
            ariaLabel:
              'Line chart showing the aggregate 50 percent year for high-level machine intelligence falling from 2061 in the 2016 survey to 2059 in 2022 to 2047 in 2023',
            unit: '',
            variant: 'policy',
            data: [
              { label: '2016 survey', value: 2061 },
              { label: '2022 survey', value: 2059 },
              { label: '2023 survey', value: 2047 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND IV — Reasonable Precaution
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'Reasonable Precaution' },
      stanceOverride: { accelerationist: 'neutral' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'everyday-person',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I follow both of you, and I am stuck. One says hurry, people are dying for lack of progress. The other says slow down, we might not get a second chance. They both sound right. What does a normal person actually want here?',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'systems-humanist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'What you want is the boring middle that neither extreme sells: proportional precaution. Keep developing the medicine and the materials. Also build the things that cost almost nothing in speed but buy a lot of safety — evaluations before deployment, the ability to shut a system down, independent auditors, incident reporting. Most researchers already want this. In the 2023 survey, around 70% said AI safety research should be prioritized more than it currently is.',
                  },
                  { type: 'cite', claimId: 'c-vi-prioritize-safety' },
                  {
                    type: 'text',
                    value: ' That is not a doom cult. That is the field asking for a seatbelt.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'skeptic',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I can live with that framing, and I will say why it persuades me where doom did not. Evaluations, shutdown switches, audits — those are good ideas even if the probability of catastrophe is basically zero, because they also catch the boring failures we already know happen. A precaution that pays off in every scenario is just competent engineering. That is a very different thing from betting the policy on a number nobody can defend.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'accelerationist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "If the deal is 'keep shipping, add real evaluations and an off-switch, and don't let incumbents weaponize safety into a licensing moat' — I am in. My fight was never against safety. It was against using a speculative tail to justify handing a few companies a monopoly on the future. Cheap, universal safeguards I can defend. Permission slips for progress I cannot.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'bar',
            orientation: 'horizontal',
            labelTop: 'What Researchers Want · 2023 Survey',
            title: 'Should AI Safety Be Prioritized More?',
            subtitle:
              'In the 2023 Expert Survey on Progress in AI, about 70% of respondents said society should prioritize AI safety research more than it currently does.',
            source: 'AI Impacts — Expert Survey on Progress in AI (2023)',
            claimIds: ['c-vi-prioritize-safety'],
            ariaLabel:
              'Horizontal bar chart showing about 70 percent of researchers want more priority on AI safety research, versus 30 percent who do not',
            unit: '%',
            variant: 'gold',
            data: [
              { label: 'More priority', value: 70, variant: 'accent' },
              { label: 'Same or less', value: 30 },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'The Wager',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            "The tail risk debate is not, at its core, a disagreement about facts — it is a disagreement about how to act under deep uncertainty. The Accelerationist is right that delay has real, uncounted costs, and right to be suspicious of fear that conveniently favors incumbents. The Safety Researcher is right that an irreversible loss is categorically different from a recoverable one, and that the field's own experts are not calm about this.",
        },
      ],
      [
        {
          type: 'text',
          value:
            'The resolution both could live with is not a number on the apocalypse. It is a portfolio of precautions that look sensible across the whole range of estimates: pre-deployment evaluations, the ability to halt a system, independent audits, incident reporting — measures that cost little in speed and pay off whether the true risk is 0.1% or 10%. When a safeguard is worth taking at almost any probability, you do not need to win the argument about the probability.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'That is the quiet thread running through all six parts. The harms are real, the responses partial, the benefits genuine, the race relentless, the truth contested — and now the stakes possibly irreversible. None of it resolves into certainty. What it resolves into is a discipline: act on the asymmetries you can see, build the capacity to course-correct, and do not bet the things you cannot get back on the confidence of any single forecast.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-espai-2023',
      title: 'AI Impacts — 2023 Expert Survey on Progress in AI',
      description:
        '"Thousands of AI Authors on the Future of AI" (Grace et al., 2024): survey of 2,778 published AI researchers on timelines, risks, and priorities.',
      url: 'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
    },
    {
      id: 'src-espai-2022',
      title: 'AI Impacts — 2022 Expert Survey on Progress in AI',
      description:
        'Survey of AI researchers in which 48% of respondents gave at least a 10% chance to an extremely bad outcome from advanced AI.',
      url: 'https://aiimpacts.org/2022-expert-survey-on-progress-in-ai/',
    },
    {
      id: 'src-cais-statement',
      title: 'Center for AI Safety — Statement on AI Risk (2023)',
      description:
        'One-sentence statement that mitigating the risk of extinction from AI should be a global priority, signed by hundreds of AI scientists and lab leaders.',
      url: 'https://www.safe.ai/work/statement-on-ai-risk',
    },
    {
      id: 'src-epoch-compute',
      title: 'Epoch AI — Compute Trends in Machine Learning',
      description:
        'Analysis finding that training compute for notable ML models has grown roughly 4–5× per year (doubling about every six months) over the past decade.',
      url: 'https://epoch.ai/trends',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-vi-median-5': {
      id: 's-vi-median-5',
      kind: 'statistic',
      claimText: '5%',
      sourceId: 'src-espai-2023',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
      note: 'The 2023 Expert Survey on Progress in AI reports a median respondent estimate of 5% for an extremely bad outcome (e.g., human extinction). This is a median of opinion, not a measurement of risk — a distinction the Skeptic raises in-text.',
      lastCheckedISO: '2026-06-27',
    },
    's-vi-hlmi-2047': {
      id: 's-vi-hlmi-2047',
      kind: 'statistic',
      claimText: '2047',
      sourceId: 'src-espai-2023',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
      note: 'The 2023 survey aggregate gives a 50% chance of high-level machine intelligence by 2047 — reported as 13 years earlier than the equivalent estimate from the 2022 survey (2060).',
      lastCheckedISO: '2026-06-27',
    },
    's-vi-survey-n': {
      id: 's-vi-survey-n',
      kind: 'statistic',
      claimText: '2,778',
      sourceId: 'src-espai-2023',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
      note: 'The 2023 ESPAI surveyed 2,778 researchers who had published in top-tier AI venues — the largest such survey to date.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Chart claims ────────────────────────────────────────────────────
    'c-vi-survey-tenpct': {
      id: 'c-vi-survey-tenpct',
      kind: 'citation',
      claimText: '48% of researchers gave ≥10% chance of an extremely bad outcome (2022 survey)',
      sourceId: 'src-espai-2022',
      verificationStatus: 'verified',
      verifiedUrl: 'https://aiimpacts.org/2022-expert-survey-on-progress-in-ai/',
      note: 'In the 2022 ESPAI, 48% of respondents gave at least a 10% probability to an "extremely bad (e.g. human extinction)" long-run outcome. Donut split: 48% vs 52%.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vi-compute-trend': {
      id: 'c-vi-compute-trend',
      kind: 'citation',
      claimText: 'Training compute of notable models, log₁₀ FLOP (Epoch AI)',
      sourceId: 'src-epoch-compute',
      verificationStatus: 'verified',
      verifiedUrl: 'https://epoch.ai/trends',
      note: 'Epoch AI documents ~4–5× annual growth in training compute (doubling ~every 6 months). Bar values are approximate orders of magnitude (log₁₀ training FLOP) for representative models: AlexNet ~1e17, GPT-2 ~1e21, GPT-3 ~3e23, GPT-4 ~2e25. Plotted on a log scale as labeled.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vi-hlmi-shift': {
      id: 'c-vi-hlmi-shift',
      kind: 'citation',
      claimText: 'Aggregate 50% HLMI year: 2061 (2016) → 2059 (2022) → 2047 (2023)',
      sourceId: 'src-espai-2023',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
      note: 'AI Impacts expert surveys: the aggregate year for a 50% chance of high-level machine intelligence was 2061 in 2016 and 2047 in 2023 (reported as ~13 years earlier than 2022). The 2022 point (~2059/2060) is shown as the intermediate value.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vi-prioritize-safety': {
      id: 'c-vi-prioritize-safety',
      kind: 'citation',
      claimText: '~70% of researchers want AI safety prioritized more (2023 survey)',
      sourceId: 'src-espai-2023',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
      note: 'The 2023 ESPAI reports that around 70% of respondents believed AI safety research should be prioritized more than it currently is. Bar split: 70% vs 30%.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Debate inline citations ─────────────────────────────────────────
    'c-vi-median-estimate': {
      id: 'c-vi-median-estimate',
      kind: 'citation',
      claimText: 'Median 2023-survey estimate of an extremely bad outcome was ~5%',
      sourceId: 'src-espai-2023',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://aiimpacts.org/wp-content/uploads/2023/04/Thousands_of_AI_authors_on_the_future_of_AI.pdf',
      note: 'Supports the Safety Researcher: the 2023 ESPAI median for an extremely bad outcome was ~5%, and a related survey item had nearly half of respondents at ≥10%.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vi-cais-statement': {
      id: 'c-vi-cais-statement',
      kind: 'citation',
      claimText:
        'CAIS Statement on AI Risk (2023), signed by hundreds of scientists and lab leaders',
      sourceId: 'src-cais-statement',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.safe.ai/work/statement-on-ai-risk',
      note: 'The Center for AI Safety\'s May 2023 statement reads: "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war." Signatories include Geoffrey Hinton, Yoshua Bengio, and the CEOs of OpenAI, Google DeepMind, and Anthropic.',
      lastCheckedISO: '2026-06-27',
    },
  },
}
