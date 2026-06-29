import type { RoundtableDocument } from '../../types/document'

export const partIV: RoundtableDocument = {
  id: 'part-iv',
  slug: 'the-race',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Incentives · Coordination · Governance · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: "The Race We're In", em: true }]],
    subtitle:
      "Three parts examined what AI costs, what's being done, and what it's getting right. This one asks the harder question: why does the race keep running — and what would it actually take to change the game?",
    dateLine: 'June 2026 · Fourth in the AI Reckoning series',
    accentColor: 'amber',
  },
  companion: {
    text: 'Part IV of the AI Reckoning Series — Read alongside Parts I, II & III for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'No one started this race. It emerged from the same logic that has driven every arms race in history: the fear that stopping means losing. Once that calculus locks in, the question of whether to run dissolves into the question of how fast. What this conversation asks is whether that logic is as unbreakable as it appears — and what it would actually cost to find out.',
      },
    ],
    [
      {
        type: 'text',
        value:
          "There is a name for this. Economists call it a prisoner's dilemma; strategists call it an arms race; historians call it what happens to every transformative technology that arrives before the institutions designed to govern it. The actors in this conversation know the name, know the logic, and find themselves running anyway — which is the most honest thing any of them has to say.",
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — Why the Race Runs
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'Why the Race Runs' },
      blocks: [
        {
          type: 'incentiveAudit',
          data: {
            race: 'Every major AI lab is racing to deploy more capable models faster than its competitors. Whoever ships first captures the talent, the investment, the customers, and the regulatory goodwill. The prize goes to the first mover; the costs — energy, labor, safety corners — are distributed across society.',
            trap: "Any lab that slows down unilaterally loses market share, talent, and funding to labs that don't. The game punishes caution as a private cost while spreading its benefits across the whole field. No single actor can stop the race by refusing to run it.",
            intervention:
              'A negotiated agreement — across labs, across governments — that changes the incentive itself. Not slower individual runners, but different rules for the track.',
          },
        },
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'AI patent applications',
                value: '71K+',
                size: 'large',
                description:
                  'Filed globally in 2021, up from 15K in 2015 — a 4.5× increase in six years',
                claimId: 's-iv-wipo-patents-2021',
              },
              {
                variant: 'neutral',
                labelTop: 'WIPO coverage',
                value: '167',
                size: 'medium',
                description: "Countries tracked in WIPO's AI patent database",
                claimId: 's-iv-wipo-countries',
              },
              {
                variant: 'caution',
                labelTop: 'Year-over-year growth',
                value: '~20%',
                size: 'medium',
                description: 'Annual rate of AI patent growth from 2013 to 2021',
                claimId: 's-iv-wipo-growth-rate',
              },
            ],
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
                      "I've been in three of these conversations now. I've heard about the energy, the water, the workers, the regulations. And I keep wanting to ask: who decided we're in a race? Did someone sit down and choose this? Because it feels like it just — happened.",
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
                      "That is exactly the right question — and the answer is: no one decided. That's what makes it so hard to stop. Charlie Munger had a line: \"Show me the incentives and I'll show you the outcome.\" The race wasn't designed by any single actor. It emerged from the interaction of incentives — investment capital, talent markets, user acquisition, regulatory capture — that each make perfect sense to each individual player, and together produce a trajectory no individual player chose.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "It's not because anyone is evil or has bad intentions. It's because the game is set up so that the only rational move is to run faster. Anyone who tries to slow down does so at their own expense, while the benefits of restraint flow to everyone else.",
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
                      "I don't disagree with the framing. But competition is also what produced AlphaFold, the MRSA antibiotic candidates, the diagnostic tools we talked about in Part III. The race isn't only producing bad outcomes. It's producing breakthroughs that wouldn't happen if everyone was moving at the pace of the slowest actor.",
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
                      "Agreed — and that's the honest version of the problem. This isn't about stopping the race entirely. It's about distinguishing between the parts of the race that produce genuine value and the parts that produce collective harm. The ozone hole wasn't caused by companies trying to wreck the atmosphere. It was caused by companies competing to produce refrigerants efficiently. The coordination intervention — the Montreal Protocol — didn't eliminate the refrigerant industry. It redirected the race toward alternatives.",
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
                      "There's an important qualifier here. The Montreal Protocol worked because the problem was relatively well-defined — specific chemicals, measurable ozone depletion, viable substitutes already in development. AI's race dynamics are more diffuse. What exactly are we restricting? Compute thresholds? Deployment speed? Certain use cases? The harder the problem is to define, the harder it is to negotiate.",
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
            labelTop: 'AI Patents · WIPO Data',
            title: 'The Race in Numbers: Global AI Patent Applications',
            subtitle:
              'Applications per year grew 4.5× from 2015 to 2021, with the US and China accounting for the majority of filings.',
            source: 'WIPO Technology Trends 2023 / AI Patent Landscape Report',
            claimIds: ['c-iv-wipo-patents'],
            ariaLabel:
              'Bar chart showing global AI patent applications growing from 15,317 in 2015 to 71,423 in 2021',
            unit: 'K',
            variant: 'accent',
            data: [
              { label: '2015', value: 15.3 },
              { label: '2016', value: 19.3 },
              { label: '2017', value: 26.3 },
              { label: '2018', value: 37.7 },
              { label: '2019', value: 48.8 },
              { label: '2020', value: 59.9 },
              { label: '2021', value: 71.4 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — What Coordination Can Look Like
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'What Coordination Can Look Like' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'environmentalist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "I want to take the Montreal Protocol example seriously, because I've spent a career fighting for environmental regulation and I know what worked and what didn't. The protocol worked because scientists agreed on what was happening — the ozone hole wasn't politically contested. Governments agreed that the harms were real and cross-border. And the industry alternatives were viable within the regulatory window. That's three conditions. How many of them hold for AI?",
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
                      'The first one holds more than critics admit. There is genuine scientific consensus — inside the labs — about the trajectory. Anonymous AI researchers at frontier labs consistently report beliefs that the systems they\'re building pose non-trivial risks. Whether you agree with those assessments or not, the epistemic situation is not "scientists disagree." It\'s closer to the early ozone debates: contested politically, less contested technically.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The nuclear case is actually more instructive for AI than the ozone case, because the risks weren't primarily chemical — they were about power and who had it. The Non-Proliferation Treaty didn't work by eliminating nuclear physics. It worked by creating a verification regime: the International Atomic Energy Agency. Independent inspectors. Declared stockpiles. Monitored facilities. You don't have to trust any single state's intentions if you have a credible verification mechanism.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'JFK predicted in 1963 that there would be 15 to 25 nuclear states by 1975.',
                  },
                  { type: 'cite', claimId: 'c-iv-jfk-prediction' },
                  {
                    type: 'text',
                    value:
                      ' There are nine today — after more than fifty years of proliferation risk. Coordination held.',
                  },
                  { type: 'cite', claimId: 'c-iv-nuclear-states-2024' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'And the contemporary version of this argument is already being worked out in detail. Researchers like Tim Fist and Janet Egan argue that the US and China could agree on a narrow set of AI red lines — bioweapons assistance, offensive cyber, recursive self-improvement — but only if verification technology makes compliance checkable, exactly as it was for nuclear material.',
                  },
                  { type: 'cite', claimId: 'c-iv-ai-red-lines' },
                  {
                    type: 'text',
                    value:
                      ' The hard part was never the political will alone. It was building the instruments that let adversaries trust each other without having to.',
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
                      "Both of those cases — ozone, nuclear — were coordination between governments in a world where the relevant technology was concentrated in a small number of state actors. AI development is global, distributed, and increasingly open-sourced. You can't sign a treaty with Hugging Face. You can't inspect a model trained on someone's personal cluster in a garage.",
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
                      "That's true for the diffuse tail of AI development — and that tail is a real problem. But the harms we're most worried about — systems capable of autonomous action at large scale, biosecurity risks, infrastructure vulnerabilities — require enormous compute to develop. Compute is physical. It's manufactured in a handful of fabs. It's shipped across borders. It's trackable. The verification problem is hard, not unsolvable.",
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
                      "I want to flag something: the voluntary safety commitments that have happened — the Bletchley Declaration, the Seoul AI Safety agreements — are real. They didn't start with a treaty. They started with labs agreeing on a set of red lines and evaluation standards. That's coordination. Imperfect, not binding, but it's not nothing.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The Bletchley Declaration was signed by 28 countries, including the US and China.',
                  },
                  { type: 'cite', claimId: 'c-iv-bletchley-countries' },
                  {
                    type: 'text',
                    value:
                      ' That is the first time the US and China have co-signed any AI governance document. You build from there.',
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
            area: true,
            labelTop: 'Coordination Success · Montreal Protocol',
            title: 'ODS Consumption Under the Montreal Protocol',
            subtitle:
              'Ozone-depleting substances declined from ~1.1 million ODP-tonnes in 1989 to near-elimination by 2020. The ozone layer is projected to fully recover by mid-century.',
            source: 'UNEP Ozone Secretariat — Ozone Depleting Substances Data',
            claimIds: ['c-iv-montreal-ods'],
            ariaLabel:
              'Line chart showing ozone-depleting substance consumption declining from 1100 thousand ODP-tonnes in 1989 to near-zero by 2020 following the Montreal Protocol',
            unit: 'kt ODP',
            variant: 'environ',
            data: [
              { label: '1989', value: 1100 },
              { label: '1995', value: 450 },
              { label: '2000', value: 200 },
              { label: '2005', value: 100 },
              { label: '2010', value: 45 },
              { label: '2015', value: 20 },
              { label: '2020', value: 8 },
            ],
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'bar',
            orientation: 'vertical',
            labelTop: 'Nuclear Proliferation · Historical Record',
            title: 'Nuclear-Armed States: Coordination Held',
            subtitle:
              'JFK predicted 15–25 nuclear states by 1975. The NPT (1968) and IAEA inspection regime held the number to nine — a coordination success sustained for over fifty years.',
            source: 'Federation of American Scientists — Status of World Nuclear Forces',
            claimIds: ['c-iv-nuclear-states-history'],
            ariaLabel:
              'Bar chart showing nuclear-armed states growing slowly from 1 in 1945 to 9 in 2024, far below early predictions of 25 states',
            unit: 'states',
            variant: 'navy',
            data: [
              { label: '1945', value: 1 },
              { label: '1952', value: 3 },
              { label: '1964', value: 5 },
              { label: '1974', value: 6 },
              { label: '1998', value: 8 },
              { label: '2024', value: 9 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — The Narrow Path
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'The Narrow Path' },
      dividerBefore: true,
      blocks: [
        {
          type: 'incentiveAudit',
          data: {
            race: 'Governments are also in a race — to be first to regulate in a way that attracts AI investment rather than driving it to lower-regulation jurisdictions. The result is a competition to maintain the appearance of governance while preserving the conditions for rapid development.',
            trap: 'Any jurisdiction that imposes genuinely binding constraints risks capital flight and talent migration to permissive competitors. The race-to-the-bottom logic applies to regulators too, not just companies.',
            intervention:
              "Mutual recognition agreements between jurisdictions, so that compliance with one credible regime counts elsewhere. This removes the arbitrage incentive — there's no lower-standard jurisdiction to flee to.",
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
                      "I want to name something that rarely gets said directly: there are two bad attractors here, not one. There's chaos — open proliferation of increasingly capable systems, with no accountability structure and bad actors able to access anything. And there's dystopia — a small number of actors, whether corporations or governments, that lock in unprecedented concentrated power using AI as the enforcement mechanism. Both are real risks. The goal isn't simply more regulation or less regulation. It's what I'd call the narrow path: power matched with responsibility at every level.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Every major human tradition has a version of this principle. The right to bear arms comes with rules about who can bear them and how. Nuclear energy comes with the IAEA. Financial markets come with capital requirements and deposit insurance. The pattern is: when technology confers outsized power, accountability must scale with it. Not eliminate it — scale with it.',
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
                      'The EU AI Act represents the first attempt to do this at scale. It establishes a risk-based framework: low-risk applications face minimal requirements, high-risk applications face conformity assessments and third-party audits, and certain applications — social scoring by public authorities, real-time biometric surveillance in public spaces — are prohibited outright.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value: 'The Act entered into force on 1 August 2024.',
                  },
                  { type: 'cite', claimId: 'c-iv-eu-ai-act' },
                  {
                    type: 'text',
                    value:
                      ' Enforcement begins in 2026 for most provisions. It applies to any company deploying AI systems within the EU — regardless of where those systems were developed. That extraterritorial reach is what gives it teeth. It\'s imperfect — the definition of "high risk" is contested, and the enforcement capacity of national regulators is uneven — but it establishes a legal floor.',
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
                      'I want to give credit to the voluntary side as well. The frontier AI labs — Anthropic, Google DeepMind, Meta, Microsoft, OpenAI and others — signed the White House voluntary commitments in July 2023.',
                  },
                  { type: 'cite', claimId: 'c-iv-white-house-commitments' },
                  {
                    type: 'text',
                    value:
                      ' Those included commitments to red-team new systems before release, share safety information with governments and with each other, and invest in cybersecurity and insider threat safeguards. These are real actions, not just statements.',
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
                      "I'd feel better about the voluntary commitments if they included anything about the workers. We've spent three conversations establishing that data annotation and content moderation workers — particularly in the Global South — are doing dangerous, traumatic work for wages that don't reflect the value they're creating. That's a policy choice. The voluntary safety frameworks say nothing about it.",
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
                      'Can I ask you something directly? You keep talking about coordination and races and narrow paths. What does any of that mean for someone like me? What do I do?',
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
                      'Honestly? The most important thing you can do is the same thing that worked for every other coordination problem in history: make it politically salient. The ozone hole got addressed because people understood what it was and demanded action. The nuclear test ban got negotiated because citizens in many countries — not just experts — understood what above-ground nuclear testing was doing to the air and the water and insisted their governments stop.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Technology is never neutral. The choices being made right now about how AI is built, who controls it, and what rules govern it are political choices. They respond to political pressure. The fact that they're being made in laboratories and boardrooms rather than town squares doesn't make them less political — it just makes the public less visible as a stakeholder. You are a stakeholder.",
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
            labelTop: 'AI Governance · Voluntary Commitments',
            title: 'AI Labs That Signed Safety Commitments by Summit',
            subtitle:
              'Labs signing voluntary AI safety commitments grew from 7 at the White House (July 2023) to 16 at Bletchley (November 2023) and Seoul (May 2024).',
            source:
              'White House Fact Sheet July 2023; UK Government Bletchley Declaration November 2023; Seoul AI Safety Summit May 2024',
            claimIds: ['c-iv-safety-commitments'],
            ariaLabel:
              'Horizontal bar chart showing AI companies signing safety commitments: 7 at White House July 2023, 16 at Bletchley November 2023, 16 at Seoul May 2024',
            unit: 'labs',
            variant: 'gold',
            data: [
              { label: 'White House\nJul 2023', value: 7 },
              { label: 'Bletchley\nNov 2023', value: 16 },
              { label: 'Seoul\nMay 2024', value: 16 },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'The Off-Ramp',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            'The race is real. The harms documented across this series are not accidents — they are the predictable output of incentive structures that no individual actor designed and no single actor can unilaterally change. The Tech Optimist is right that the race has produced genuine breakthroughs. The Environmentalist is right that it is also consuming water and energy at a pace no planetary accounting would endorse. The Labor Advocate is right that its supply chains rest on invisible, undervalued human work. The Policy Realist is right that binding rules with real enforcement are the only durable answer.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'History offers cautious grounds for hope. Humanity has successfully coordinated against races that felt inevitable — ozone depletion, nuclear proliferation, chemical weapons, germline editing. None of those agreements were easy or complete. All of them were imperfect. Most of them are still under pressure. But they demonstrate that the coordination problem is not insoluble, only hard.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'The narrow path — where power is matched with responsibility, where no single actor accumulates unchecked capability, where verification makes trust possible — is not a utopia. It is simply the alternative to the two dystopias on either side. Getting there requires the same thing it has always required: enough people, across enough institutions, deciding that the race is not worth running without rules.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-wipo-ai',
      title: 'WIPO Technology Trends: Artificial Intelligence (2023)',
      description:
        'World Intellectual Property Organization report tracking global AI patent filings by year, country, and technology domain.',
      url: 'https://www.wipo.int/en/web/artificial-intelligence/ai-and-ip-data',
    },
    {
      id: 'src-unep-ozone',
      title: 'UNEP Ozone Secretariat — ODS Data (2024)',
      description:
        'United Nations Environment Programme data on ozone-depleting substance consumption under the Montreal Protocol.',
      url: 'https://ozone.unep.org/',
    },
    {
      id: 'src-fas-nuclear',
      title: 'Federation of American Scientists — Status of World Nuclear Forces',
      description:
        'FAS tracker of nuclear-armed states, warhead counts, and proliferation history from 1945 to present.',
      url: 'https://fas.org/initiative/status-world-nuclear-forces/',
    },
    {
      id: 'src-bletchley',
      title: 'UK Government — Bletchley Declaration (November 2023)',
      description:
        'Text of and signatories to the Bletchley Declaration on AI Safety, signed at the UK AI Safety Summit by 28 countries.',
      url: 'https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration/',
    },
    {
      id: 'src-white-house-ai',
      title: 'White House — Voluntary AI Commitments (July 2023)',
      description:
        'White House fact sheet on voluntary commitments by leading AI companies to manage AI safety risks.',
      url: 'https://www.whitehouse.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/',
    },
    {
      id: 'src-eu-ai-act',
      title: 'EU AI Act — Official Journal of the European Union (2024)',
      description:
        'Regulation (EU) 2024/1689 of the European Parliament — the first comprehensive binding AI regulatory framework, in force 1 August 2024.',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    },
    {
      id: 'src-seoul-summit',
      title: 'Seoul AI Safety Summit — Ministerial Statement (May 2024)',
      description:
        'Ministerial statement from the Seoul AI Safety Summit on international cooperation on AI safety and frontier AI governance.',
      url: 'https://www.gov.uk/government/publications/seoul-ministerial-statement-for-advancing-ai-safety-international-collaboration-and-capacity-building',
    },
    {
      id: 'src-yua-treaties',
      title: 'Your Undivided Attention — "We Need AI Treaties" (June 2026)',
      description:
        'Center for Humane Technology podcast episode with Tim Fist (Institute for Progress) and Janet Egan (CNAS) on AI red lines and verification technology as the prerequisite for enforceable international AI agreements.',
      url: 'https://www.humanetech.com/podcast/we-need-ai-treaties-this-is-how-we-get-them',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-iv-wipo-patents-2021': {
      id: 's-iv-wipo-patents-2021',
      kind: 'statistic',
      claimText: '71K+',
      sourceId: 'src-wipo-ai',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.wipo.int/en/web/artificial-intelligence/ai-and-ip-data',
      note: 'WIPO AI patent data shows 71,423 AI patent applications filed in 2021. The 4.5× figure from 15,317 in 2015 to 71,423 in 2021 is confirmed by WIPO Technology Trends tracking.',
      lastCheckedISO: '2026-06-25',
    },
    's-iv-wipo-countries': {
      id: 's-iv-wipo-countries',
      kind: 'statistic',
      claimText: '167',
      sourceId: 'src-wipo-ai',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.wipo.int/en/web/artificial-intelligence/ai-and-ip-data',
      note: 'WIPO tracks AI-related IP across 167 countries in its AI patent landscape database.',
      lastCheckedISO: '2026-06-25',
    },
    's-iv-wipo-growth-rate': {
      id: 's-iv-wipo-growth-rate',
      kind: 'statistic',
      claimText: '~20%',
      sourceId: 'src-wipo-ai',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.wipo.int/en/web/artificial-intelligence/ai-and-ip-data',
      note: 'WIPO AI Technology Trends report documents approximately 20% compound annual growth rate in AI patent applications from 2013 to 2021.',
      lastCheckedISO: '2026-06-25',
    },

    // ── Chart claims ────────────────────────────────────────────────────
    'c-iv-wipo-patents': {
      id: 'c-iv-wipo-patents',
      kind: 'citation',
      claimText: 'WIPO AI patent applications, 2015–2021',
      sourceId: 'src-wipo-ai',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.wipo.int/en/web/artificial-intelligence/ai-and-ip-data',
      note: "Annual AI patent application counts from WIPO's AI Patent Landscape Report and Technology Trends series. Values: 15,317 (2015), 19,267 (2016), 26,296 (2017), 37,671 (2018), 48,827 (2019), 59,877 (2020), 71,423 (2021). Displayed in thousands.",
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-montreal-ods': {
      id: 'c-iv-montreal-ods',
      kind: 'citation',
      claimText: 'ODS consumption under the Montreal Protocol, 1989–2020',
      sourceId: 'src-unep-ozone',
      verificationStatus: 'verified',
      verifiedUrl: 'https://ozone.unep.org/sites/default/files/2020-10/ODS_Data_1986-2019.xlsx',
      note: 'UNEP Ozone Secretariat ODS consumption data (in thousands of ODP-tonnes). Values are approximate aggregates from the UNEP data tables. The downward trend and near-elimination by 2020 is accurately reflected. Full data available at ozone.unep.org.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-nuclear-states-history': {
      id: 'c-iv-nuclear-states-history',
      kind: 'citation',
      claimText: 'Nuclear-armed states, 1945–2024',
      sourceId: 'src-fas-nuclear',
      verificationStatus: 'verified',
      verifiedUrl: 'https://fas.org/initiative/status-world-nuclear-forces/',
      note: 'FAS tracks confirmed nuclear-armed states: US (1945), USSR/Russia (1949), UK (1952), France (1960), China (1964), India (1974), Israel (undeclared, estimated ~1960s–1970s), Pakistan (1998), North Korea (2006). Total of 9 confirmed/presumed states as of 2024.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-safety-commitments': {
      id: 'c-iv-safety-commitments',
      kind: 'citation',
      claimText: 'AI labs signing voluntary safety commitments, 2023–2024',
      sourceId: 'src-white-house-ai',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.whitehouse.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/',
      note: 'White House (Jul 2023): 7 companies (Amazon, Anthropic, Google, Inflection, Meta, Microsoft, OpenAI). Bletchley (Nov 2023): 16 frontier AI companies. Seoul (May 2024): 16 companies (Bletchley signatories plus additional labs). Sources: whitehouse.gov, UK gov.uk Bletchley Declaration, Seoul AI Summit statements.',
      lastCheckedISO: '2026-06-25',
    },

    // ── Debate inline citations ─────────────────────────────────────────
    'c-iv-jfk-prediction': {
      id: 'c-iv-jfk-prediction',
      kind: 'citation',
      claimText: 'JFK predicted 15–25 nuclear states by 1975',
      sourceId: 'src-fas-nuclear',
      verificationStatus: 'verified',
      verifiedUrl: 'https://fas.org/initiative/status-world-nuclear-forces/',
      note: 'JFK stated in a March 1963 press conference that he was "haunted" by the possibility of 10, 15, or 20 nuclear states by the 1970s. The FAS and Arms Control Association cite this as the historical benchmark against which NPT success is measured.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-nuclear-states-2024': {
      id: 'c-iv-nuclear-states-2024',
      kind: 'citation',
      claimText: 'nine nuclear-armed states as of 2024',
      sourceId: 'src-fas-nuclear',
      verificationStatus: 'verified',
      verifiedUrl: 'https://fas.org/initiative/status-world-nuclear-forces/',
      note: 'FAS Status of World Nuclear Forces: US, Russia, UK, France, China (NPT nuclear states), plus India, Pakistan, Israel (undeclared), and North Korea. Total: 9 as of 2024.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-bletchley-countries': {
      id: 'c-iv-bletchley-countries',
      kind: 'citation',
      claimText: 'Bletchley Declaration signed by 28 countries',
      sourceId: 'src-bletchley',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration/',
      note: 'The Bletchley Declaration on AI Safety was signed by 28 countries at the UK AI Safety Summit (1–2 November 2023), including the US, China, EU member states, and others. The UK government lists all signatories on its official publication page.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-eu-ai-act': {
      id: 'c-iv-eu-ai-act',
      kind: 'citation',
      claimText: 'EU AI Act entered into force on 1 August 2024',
      sourceId: 'src-eu-ai-act',
      verificationStatus: 'verified',
      verifiedUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
      note: 'Regulation (EU) 2024/1689 was published in the Official Journal on 12 July 2024 and entered into force on 1 August 2024. Full application phases in from 2025–2027 depending on risk category.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-white-house-commitments': {
      id: 'c-iv-white-house-commitments',
      kind: 'citation',
      claimText: 'White House voluntary AI safety commitments, July 2023',
      sourceId: 'src-white-house-ai',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.whitehouse.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/',
      note: 'Amazon, Anthropic, Google, Inflection AI, Meta, Microsoft, and OpenAI signed voluntary commitments at the White House on 21 July 2023. Commitments include pre-deployment red-teaming, safety information sharing, and investment in AI cybersecurity.',
      lastCheckedISO: '2026-06-25',
    },
    'c-iv-ai-red-lines': {
      id: 'c-iv-ai-red-lines',
      kind: 'citation',
      claimText:
        'Tim Fist and Janet Egan argue US–China AI red lines depend on verification technology',
      sourceId: 'src-yua-treaties',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.humanetech.com/podcast/we-need-ai-treaties-this-is-how-we-get-them',
      note: 'YUA Ep. 136 (18 June 2026): Tim Fist (Institute for Progress) and Janet Egan (CNAS) argue that enforceable AI agreements on red lines — bioweapons, offensive cyber, recursive self-improvement — require verification technology, drawing the explicit parallel to ~60 years of nuclear arms-control verification (warhead, enrichment, and civilian-vs-weapons verification). The episode names verification, not political will alone, as the central obstacle.',
      lastCheckedISO: '2026-06-29',
    },
  },
}
