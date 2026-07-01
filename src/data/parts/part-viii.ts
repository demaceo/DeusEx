import type { RoundtableDocument } from '../../types/document'

export const partVIII: RoundtableDocument = {
  id: 'part-viii',
  slug: 'whose-intelligence',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Power · Compute · Capital · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'Whose Intelligence?', em: true }]],
    subtitle:
      'The series has asked what AI does. This part asks who owns the means to build it (the chips, the capital, the data) and who captures the gains when intelligence itself becomes the most concentrated industry on earth.',
    dateLine: 'June 2026 · Eighth in the AI Reckoning series',
    accentColor: 'bronze',
  },
  companion: {
    text: 'Part VIII of the AI Reckoning Series: Read alongside Parts I–VII for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'Every transformative technology ends up a monopoly, or close to one: steam, oil, steel, bandwidth, all consolidated before anyone built the institutions to govern them. Intelligence now feeds every other decision we make. So ask the question that came too late for every technology before it: who owns this, and what happens to the rest of us?',
      },
    ],
    [
      {
        type: 'text',
        value:
          "The Economist leads this round, tracking compute, capital, and data flows. Her argument: the deciding question isn't what AI can do, but who can afford to make it do anything. The risk isn't a rogue machine; it's older and more familiar. A technology powerful enough to reshape every economy ends up owned by a very few people, and stays that way.",
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — The Chokepoint
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'The Chokepoint' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'Advanced chip supply',
                value: '~90%',
                size: 'large',
                description:
                  "Share of the world's most advanced chips manufactured by a single company, TSMC (industry estimates)",
                claimId: 's-viii-tsmc-90',
              },
              {
                variant: 'neutral',
                labelTop: 'US private AI investment',
                value: '$67B',
                size: 'medium',
                description: 'United States private AI investment in 2023 (Stanford AI Index 2024)',
                claimId: 's-viii-us-invest',
              },
              {
                variant: 'caution',
                labelTop: 'Frontier training cost',
                value: '$191M',
                size: 'medium',
                description:
                  "Estimated compute cost to train Google's Gemini Ultra (Stanford AI Index 2024)",
                claimId: 's-viii-gemini-cost',
              },
            ],
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'economist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "Let me start where the power actually sits, which is not where people look. Everyone debates the models. The leverage is in the supply chain beneath them. The most advanced chips that train frontier AI are manufactured, in practice, by one company in one country: TSMC in Taiwan makes on the order of 90% of the world's leading-edge semiconductors.",
                  },
                  { type: 'cite', claimId: 'c-viii-tsmc' },
                  {
                    type: 'text',
                    value:
                      ' The designs come from largely one firm, Nvidia. The lithography machines that make the chips possible come from exactly one firm, ASML. That is not a market. That is a series of chokepoints.',
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
                      'I genuinely did not know any of that. I assumed something this important was made all over the place, by lots of companies. You are telling me the whole thing runs through a couple of factories?',
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
                      "It runs through a few extraordinary ones, yes, and that's because making a leading-edge chip is arguably the hardest thing humans manufacture. The concentration reflects genuine difficulty, not just market power. But I'll grant the Economist the real point: a supply chain this narrow is fragile, and fragility plus strategic importance is exactly what invites both disruption and political control.",
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
                      "And before we declare it permanent: concentration like this has a history of cracking. Memory chips, solar panels, displays: all were once choke-pointed and then diffused. I'd bet the same pressure is already building here, with the US, China, and the EU all pouring subsidies into domestic fabs. The chokepoint is real today. Whether it holds for a decade is a much weaker claim than the dramatic version implies.",
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
            labelTop: 'Semiconductors · Leading-Edge Capacity',
            title: 'One Company, Most of the Advanced Chips',
            subtitle:
              "Industry estimates put TSMC's share of the world's most advanced (leading-edge) chip manufacturing at roughly 90%, the physical bottleneck under all frontier AI.",
            source: 'Industry estimates (SIA / analyst reporting)',
            claimIds: ['c-viii-tsmc'],
            ariaLabel:
              "Donut chart showing TSMC manufacturing about 90 percent of the world's most advanced chips and all other foundries about 10 percent",
            unit: '%',
            data: [
              { label: 'TSMC', value: 90, variant: 'accent' },
              { label: 'All other foundries', value: 10, variant: 'navy' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — The Price of Admission
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'The Price of Admission' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'economist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'The second concentrating force is cost. Training a frontier model has gone from a graduate-student budget to a sovereign-wealth one. The Stanford AI Index estimated the compute to train GPT-4 at around $78 million, and Gemini Ultra at roughly $191 million.',
                  },
                  { type: 'cite', claimId: 'c-viii-training-cost' },
                  {
                    type: 'text',
                    value:
                      ' That is just the final training run: not the research, the failed runs, the talent, or the data. When the entry ticket is hundreds of millions of dollars, the set of organizations that can sit at the frontier is, by definition, tiny.',
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
                      "I'll push on the framing. Costs at the frontier are high, but the cost of a given level of capability collapses every year: what cost $191 million to train becomes a cheap open model eighteen months later. The frontier is expensive; the diffusion behind it is breathtakingly cheap. Focusing only on the frontier price tag tells a concentration story while ignoring the democratization happening right behind it.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'economist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'That is the most important disagreement in the whole field, and it is genuinely unresolved. You are right that capability diffuses. But the frontier keeps moving, and whoever holds it captures the highest-margin work, sets the standards, and earns the returns that fund the next frontier. Cheap last-generation models are real, and so is a flywheel where the same few players keep paying for the next ticket because they are the only ones who can.',
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
                      "Both can hold. Open-weight models (Llama, Mistral, and others) have genuinely put strong capability in the hands of startups, researchers, and governments that could never train from scratch. The base layer is more open than the doom narrative admits. The question is whether the frontier layer stays a private club, and on that I'm less sure than I used to be.",
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
            labelTop: 'Training Cost · Stanford AI Index',
            title: 'The Rising Price of a Frontier Model',
            subtitle:
              'Estimated compute cost of the final training run has climbed into the hundreds of millions: GPT-4 ~$78M, Gemini Ultra ~$191M.',
            source: 'Stanford HAI: AI Index Report 2024',
            claimIds: ['c-viii-training-cost'],
            ariaLabel:
              'Bar chart showing estimated training compute cost of about 78 million dollars for GPT-4 and 191 million dollars for Gemini Ultra',
            unit: '$M',
            variant: 'gold',
            data: [
              { label: 'GPT-4\n2023', value: 78 },
              { label: 'Gemini Ultra\n2023', value: 191, variant: 'accent' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — Whose Gains?
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'Whose Gains?' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'economist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Now follow the money geographically. In 2023, private AI investment was overwhelmingly concentrated in the United States (about $67 billion), with China a distant second near $8 billion and the United Kingdom third under $4 billion.',
                  },
                  { type: 'cite', claimId: 'c-viii-investment-geo' },
                  {
                    type: 'text',
                    value:
                      ' Most of the planet does not appear on this chart at all. The Global Majority supplies data, labor, and increasingly the energy and water we documented in Part I. But the capital, the models, and the returns accrue somewhere else.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'labor-advocate',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'This is the thread back to everything we said about labor. The data annotators in Nairobi, the content moderators in Manila, the cobalt, and the cooling water are all real inputs from the Global South. What comes back is a subscription product priced for the Global North. It is an old pattern wearing a new technology: the value is extracted in one place and captured in another.',
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
                      'And this is where concentration stops being an economic curiosity and becomes a governance problem. When a technology that can reshape every economy is owned by a handful of firms in a handful of countries, the rest of the world faces a choice between dependence and exclusion. That is precisely the dynamic (power without matching accountability) that Part IV called one of the two bad attractors. Concentrated capability is how you slide toward it.',
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
                      "I'll add the necessary caution to my own side's story: investment concentration is not the same as benefit concentration. A farmer in Kenya using a free translation model or a crop-disease classifier is capturing real value that shows up in no investment chart. The ledger of who pays is genuinely lopsided. The ledger of who benefits is messier, and more hopeful, than the capital flows alone suggest.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'lollipop',
            orientation: 'horizontal',
            labelTop: 'Private AI Investment · 2023',
            title: 'Where the Capital Is',
            subtitle:
              'Private AI investment in 2023 was concentrated in the United States (~$67B), far ahead of China (~$8B) and the United Kingdom (~$4B).',
            source: 'Stanford HAI: AI Index Report 2024',
            claimIds: ['c-viii-investment-geo'],
            ariaLabel:
              'Lollipop chart of 2023 private AI investment: United States about 67 billion dollars, China about 8 billion, United Kingdom about 4 billion',
            unit: '$B',
            variant: 'navy',
            data: [
              { label: 'United States', value: 67.2, variant: 'accent' },
              { label: 'China', value: 7.8 },
              { label: 'United Kingdom', value: 3.8 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND IV — Concentration or Diffusion
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'Concentration or Diffusion' },
      dividerBefore: true,
      blocks: [
        {
          type: 'incentiveAudit',
          data: {
            race: "Whoever controls compute, capital, and frontier talent captures the standards, the margins, and the political leverage of the defining technology of the era. The prize for concentration is enormous, and it compounds: this year's lead funds next year's lead.",
            trap: 'No single firm or country can unilaterally share its advantage without ceding ground to rivals who will not. Antitrust stops at the border; export controls invite retaliation; and the actors with the power to redistribute access are the ones who benefit most from hoarding it.',
            intervention:
              'Treat frontier compute like other concentrated critical infrastructure: public compute for researchers, interoperability and open-weight floors, competition enforcement, and multilateral access guarantees so capability does not equal control.',
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
                      'There are real levers here, and some are already moving. Competition regulators on both sides of the Atlantic are scrutinizing the cloud-and-model partnerships that tie frontier labs to a few hyperscalers. Public-compute initiatives (national AI research resources) aim to give universities and startups access they cannot buy. And open-weight models function as a kind of antitrust by other means: a capable free floor under the market.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'economist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "Those are the right instruments. I'd add one measurement that should worry us: who actually builds the frontier models. In 2023, industry produced the overwhelming majority of notable AI models: on the order of 51, against roughly 15 from academia.",
                  },
                  { type: 'cite', claimId: 'c-viii-industry-academia' },
                  {
                    type: 'text',
                    value:
                      ' A decade ago that ratio ran the other way. When the public and academic sphere can no longer afford to build at the frontier, it loses the ability to independently understand, audit, or check what the frontier is doing. That is the concentration that frightens me most.',
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
                      'Then fund the public side rather than only fearing the private one. The fix for academia falling behind is public compute and open models, not pretending the private investment did not also produce the breakthroughs Part III documented. Concentration and progress came from the same engine. The task is to keep the progress while widening the ownership, not to choose between them.',
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
                      "So the thing I should worry about is not the robots; it is that a handful of companies could end up owning the most important tool of my grandchildren's lifetime, and nobody outside them really knows how it works. When you put it that way, it sounds less like science fiction and more like every other time a few people cornered something that mattered.",
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
            labelTop: 'Who Builds the Frontier · 2023',
            title: 'Notable AI Models: Industry vs Academia',
            subtitle:
              "In 2023 industry produced roughly 51 notable machine-learning models to academia's ~15, a reversal of the field's earlier balance, and a shift in who can independently check the frontier.",
            source: 'Stanford HAI: AI Index Report 2024',
            claimIds: ['c-viii-industry-academia'],
            ariaLabel:
              'Bar chart showing about 51 notable AI models from industry and about 15 from academia in 2023',
            unit: 'models',
            variant: 'policy',
            data: [
              { label: 'Industry', value: 51, variant: 'accent' },
              { label: 'Academia', value: 15 },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'The Ownership Question',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            'The deepest fact about artificial intelligence may be the least technical one: it is extraordinarily concentrated. The chips trace back to a single fab; the frontier models to a handful of firms with sovereign-scale budgets; the capital to two countries. The Economist is right that this is the oldest political-economy question in a new costume: who owns the means of production when the means of production is intelligence itself. The Accelerationist is right that capability diffuses cheaply behind the frontier, and the Skeptic is right that chokepoints have cracked before.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'What makes this case different from past concentrations is reach. A dominant railroad or oil trust shaped an economy; a dominant intelligence shapes every economy, including the capacity to govern it. That is why the levers that matter are the unglamorous ones: public compute, open-weight floors, competition enforcement, and multilateral access (the institutional plumbing that decides whether capability becomes control).',
        },
      ],
      [
        {
          type: 'text',
          value:
            'Across eight parts the through-line holds. The costs are real, the responses partial, the benefits genuine, the race relentless, the truth contested, the tail risk irreversible, the intimacy double-edged — and the ownership concentrated. None of it resolves into a verdict on the technology. It resolves into a verdict on us: whether we build the institutions to spread a transformative power, or let it pool, as power usually does, in the hands already holding it.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-ai-index-2024',
      title: 'Stanford HAI — Artificial Intelligence Index Report 2024',
      description:
        'Stanford Institute for Human-Centered AI annual report tracking AI investment, training costs, model production, and global trends.',
      url: 'https://aiindex.stanford.edu/report/',
    },
    {
      id: 'src-chip-concentration',
      title: 'Semiconductor supply concentration — industry estimates',
      description:
        "Analyst and Semiconductor Industry Association estimates of TSMC's share of the world's leading-edge chip manufacturing capacity.",
      url: 'https://www.semiconductors.org/',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-viii-tsmc-90': {
      id: 's-viii-tsmc-90',
      kind: 'statistic',
      claimText: '~90%',
      sourceId: 'src-chip-concentration',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.semiconductors.org/',
      note: "Widely cited industry estimate that TSMC produces roughly 90% of the world's most advanced (leading-edge, sub-7nm) chips. The exact share varies by node and year; this is an order-of-magnitude figure, not a precise market-share statistic, as the Skeptic notes in-text.",
      lastCheckedISO: '2026-06-27',
    },
    's-viii-us-invest': {
      id: 's-viii-us-invest',
      kind: 'statistic',
      claimText: '$67B',
      sourceId: 'src-ai-index-2024',
      verificationStatus: 'verified',
      verifiedUrl: 'https://aiindex.stanford.edu/report/',
      note: 'Stanford AI Index 2024 reports US private AI investment of about $67.2 billion in 2023 — far ahead of any other country.',
      lastCheckedISO: '2026-06-27',
    },
    's-viii-gemini-cost': {
      id: 's-viii-gemini-cost',
      kind: 'statistic',
      claimText: '$191M',
      sourceId: 'src-ai-index-2024',
      verificationStatus: 'verified',
      verifiedUrl: 'https://aiindex.stanford.edu/report/',
      note: 'Stanford AI Index 2024 estimated the compute cost of the final training run for Google Gemini Ultra at roughly $191 million (GPT-4 ~$78 million). These are estimates of training compute, not total development cost.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Chart / inline citation claims ──────────────────────────────────
    'c-viii-tsmc': {
      id: 'c-viii-tsmc',
      kind: 'citation',
      claimText: "TSMC makes ~90% of the world's most advanced chips",
      sourceId: 'src-chip-concentration',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.semiconductors.org/',
      note: "Industry estimate of TSMC's ~90% share of leading-edge logic manufacturing. Donut is illustrative (90/10). Nvidia (design) and ASML (lithography) are the other commonly cited single-firm chokepoints in the frontier-AI supply chain.",
      lastCheckedISO: '2026-06-27',
    },
    'c-viii-training-cost': {
      id: 'c-viii-training-cost',
      kind: 'citation',
      claimText: 'GPT-4 ~$78M and Gemini Ultra ~$191M training compute (AI Index 2024)',
      sourceId: 'src-ai-index-2024',
      verificationStatus: 'verified',
      verifiedUrl: 'https://aiindex.stanford.edu/report/',
      note: 'Stanford AI Index 2024 estimates of final-training-run compute cost: GPT-4 ~$78M, Gemini Ultra ~$191M. Estimates, not disclosed figures.',
      lastCheckedISO: '2026-06-27',
    },
    'c-viii-investment-geo': {
      id: 'c-viii-investment-geo',
      kind: 'citation',
      claimText: '2023 private AI investment: US ~$67B, China ~$8B, UK ~$4B',
      sourceId: 'src-ai-index-2024',
      verificationStatus: 'verified',
      verifiedUrl: 'https://aiindex.stanford.edu/report/',
      note: "Stanford AI Index 2024: 2023 private AI investment ~$67.2B (US), ~$7.8B (China), ~$3.8B (UK). The US lead is the report's headline geographic finding.",
      lastCheckedISO: '2026-06-27',
    },
    'c-viii-industry-academia': {
      id: 'c-viii-industry-academia',
      kind: 'citation',
      claimText: '2023 notable models: ~51 from industry vs ~15 from academia (AI Index 2024)',
      sourceId: 'src-ai-index-2024',
      verificationStatus: 'verified',
      verifiedUrl: 'https://aiindex.stanford.edu/report/',
      note: 'Stanford AI Index 2024: in 2023 industry produced 51 notable machine-learning models and academia 15 (with several industry-academia collaborations) — a reversal of the earlier academic lead.',
      lastCheckedISO: '2026-06-27',
    },
  },
}
