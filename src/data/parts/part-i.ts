import type { RoundtableDocument } from '../../types/document'

export const partI: RoundtableDocument = {
  id: 'part-i',
  slug: 'real-costs',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Ethics · Technology · Society · 2025–2026',
    titleLines: [
      [{ text: 'The ' }, { text: 'AI Reckoning:', em: true }],
      [{ text: 'A Roundtable on Real Costs' }],
    ],
    subtitle:
      'Five voices examine the energy, water, labor, and accountability crises behind artificial intelligence — grounded in fact, not fiction.',
    dateLine: 'Updated May 2026 · All data sourced from primary publications',
    accentColor: 'accent',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          "This document stages a structured, evidence-based conversation among five distinct voices — each representing a real and legitimate perspective on AI's present-day ethical dilemmas. Every factual claim is cited. No science fiction. No speculation. Just the messy, consequential present.",
      },
    ],
  ],
  sections: [
    {
      header: { roundLabel: 'The Participants' },
      blocks: [
        {
          type: 'summaryList',
          data: {
            heading: "Who's at the table",
            items: [
              {
                lead: 'The Tech Optimist',
                text: "— a senior engineer at a major AI lab who believes the technology's benefits outweigh its costs and that innovation will solve the problems it creates.",
              },
              {
                lead: 'The Environmentalist',
                text: '— a climate researcher and policy advocate focused on the concrete, measurable environmental damage being done right now.',
              },
              {
                lead: 'The Labor Advocate',
                text: '— a researcher and organizer who documents the hidden human cost of AI supply chains, particularly in the Global South.',
              },
              {
                lead: 'The Policy Realist',
                text: '— a former regulatory attorney who follows the law closely and believes structural governance reform is the only real solution.',
              },
              {
                lead: 'The Everyday Person',
                text: '— a retired schoolteacher in her late 60s. She uses a smartphone and watches the news, but AI has never been part of her daily vocabulary — until lately.',
              },
            ],
          },
        },
      ],
    },
    {
      header: { roundLabel: 'Round I', title: 'Energy Consumption' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                value: '460 TWh',
                description: 'Global data center electricity, 2025',
                claimId: 's-i-dc-electricity-2025',
              },
              {
                value: '945 TWh',
                description: 'IEA projected demand by 2030',
                claimId: 's-i-iea-projected-2030',
              },
              {
                value: '552 tons',
                description: 'CO₂ est. from training one large LLM (GPT-3 era baseline)',
                claimId: 's-i-co2-training-llm',
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
                      "I saw something on the news about AI using as much electricity as a whole country. Is that actually true? I use my phone to ask questions sometimes — I didn't think there was anything wrong with that. Am I part of the problem?",
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
                      'That framing is a bit misleading. Yes, the numbers are large in absolute terms, but context matters. Global data centers consumed roughly 460 terawatt-hours in 2025 — about 1.8% of total world electricity.',
                  },
                  { type: 'cite', claimId: 'c-i-iea-dc-electricity' },
                  {
                    type: 'text',
                    value:
                      ' That is significant, but so is what it enables: climate modeling, drug discovery, real-time translation, accessibility tools for people with disabilities.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'And individual queries are not the issue. The real energy intensity sits in model training. A single GPT-4-scale training run uses about 50 gigawatt-hours.',
                  },
                  { type: 'cite', claimId: 'c-i-mit-training-gwh' },
                  {
                    type: 'text',
                    value:
                      " But that's a one-time cost spread across billions of daily uses. The renewable energy transition in the tech sector is also accelerating faster than almost any other industry. Microsoft, Google, and Amazon have made prominent public pledges toward 100% renewable energy — and the industry is investing billions to back them up.",
                  },
                ],
              ],
            },
          },
        },
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
                      'Let me push back on "pledges." Google, Microsoft, and Amazon have made those promises — and they\'ve simultaneously seen their emissions rise. Microsoft reported a 34% increase in water consumption between 2022 and 2024.',
                  },
                  { type: 'cite', claimId: 'c-i-microsoft-water-increase' },
                  {
                    type: 'text',
                    value:
                      ' Their carbon emissions have gone up, not down, since they pledged net zero. Pledges without enforcement mechanisms are marketing. The infrastructure buildout is outpacing the clean energy transition by a wide margin.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'And the 1.8% figure is a snapshot. The IEA projects data center electricity demand will more than double to 945 TWh by 2030.',
                  },
                  { type: 'cite', claimId: 'c-i-iea-projection-2030' },
                  {
                    type: 'text',
                    value:
                      " Training a single large-scale model generates an estimated 552 tons of CO₂ — equivalent to the annual carbon footprint of 121 American households — and that figure dates to the GPT-3 generation. Modern frontier models are believed to be considerably higher, though companies don't disclose it.",
                  },
                  { type: 'cite', claimId: 'c-i-wef-co2-training' },
                  {
                    type: 'text',
                    value:
                      " We are building an industry whose carbon costs rival small nations, and we're doing it with fossil-heavy grids in many regions.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Data centers draw from electricity grids whose carbon intensity runs significantly higher than the U.S. average — because many are sited in regions where coal and gas still dominate the local mix.',
                  },
                  { type: 'cite', claimId: 'c-i-aimultiple-grid-carbon' },
                  {
                    type: 'text',
                    value:
                      " Where you build matters enormously. And most companies are not being transparent about where they're building or what energy mix they're drawing from.",
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
                      "The reason we're having this debate at all is that there are no binding disclosure requirements. Most major AI providers do not publish enough information for independent researchers to verify their energy use or carbon footprint.",
                  },
                  { type: 'cite', claimId: 'c-i-mit-disclosure-gap' },
                  {
                    type: 'text',
                    value: " We're debating estimates — and that's by design.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The EU AI Act, adopted in March 2024, begins to address transparency for high-risk AI systems — but its energy provisions are limited.',
                  },
                  { type: 'cite', claimId: 'c-i-eu-act-transparency' },
                  {
                    type: 'text',
                    value:
                      ' In the U.S., President Trump\'s December 2025 executive order moved in the opposite direction, declaring that "U.S. AI companies must be free to innovate without cumbersome regulation," and actively working to preempt state-level AI laws.',
                  },
                  { type: 'cite', claimId: 'c-i-eo-14365-innovate' },
                  {
                    type: 'text',
                    value:
                      ' The regulatory environment is fragmenting precisely when we need coordination.',
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
                      'So my electricity bill might actually go up because of all this? I read something about that. In Virginia, they said energy prices jumped some enormous amount because of all the data centers there.',
                  },
                ],
              ],
            },
          },
        },
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
                      "Yes — that's correct, and it's one of the most concrete and immediate harms for ordinary people. Northern Virginia, known as \"Data Center Alley,\" has the world's highest concentration of these facilities. The surge in data center energy demand caused an 800% spike in energy prices during the 2024 capacity auction for the regional grid.",
                  },
                  { type: 'cite', claimId: 'c-i-ansi-price-surge' },
                  {
                    type: 'text',
                    value:
                      ' That is expected to raise residential electricity rates across 13 states by 20% in summer 2026, and by 30%–60% by 2030.',
                  },
                  { type: 'cite', claimId: 'c-i-ansi-rate-increase' },
                  {
                    type: 'text',
                    value: ' This is not abstract. This is your utility bill.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"In 2024, data centers accounted for almost 40 percent of all electricity used in Virginia."',
            attribution: '— Consumer Reports, March 2026, citing Data Center Map & Bloomberg',
          },
        },
      ],
    },
    {
      header: { roundLabel: 'Round II', title: 'Water Usage' },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                value: '228B gal',
                description: 'U.S. data center water use annually',
                claimId: 's-i-us-water-annual',
              },
              {
                value: '300K gal',
                description: 'Used per average data center per day',
                claimId: 's-i-water-per-day',
              },
              {
                value: '560B liters',
                description: 'Global data center water use, 2023 (IEA)',
                claimId: 's-i-global-water-2023',
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
                      "Water? I hadn't even thought about water. Like — these buildings are using drinking water? Why?",
                  },
                ],
              ],
            },
          },
        },
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
                      'Servers generate enormous heat, and most facilities use water-based cooling systems to prevent them from overheating — often drawing from local municipal water supplies, sometimes potable water. The average data center uses 300,000 gallons of water per day.',
                  },
                  { type: 'cite', claimId: 'c-i-wef-water-per-day' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In the United States, data centers now consume 228 billion gallons of water per year. That figure is expected to double by 2028.',
                  },
                  { type: 'cite', claimId: 'c-i-pew-us-water' },
                  {
                    type: 'text',
                    value:
                      ' That is six times the annual water use of the city of Seattle. And many of these facilities are being built in the American West — where we already have severe, worsening droughts. Stanford University researchers in April 2025 documented data centers actively competing with communities for scarce water resources across Nevada, Arizona, and California.',
                  },
                  { type: 'cite', claimId: 'c-i-stanford-water-competition' },
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
                      "There's a real tension here that deserves honest acknowledgment. Water-based cooling is more energy efficient than air-based cooling — so reducing water use can increase electricity use, and vice versa. Cooling systems account for 20%–40% of total data center energy.",
                  },
                  { type: 'cite', claimId: 'c-i-msci-cooling-energy' },
                  {
                    type: 'text',
                    value:
                      ' The industry is actively developing closed-loop cooling and direct liquid cooling systems — technologies that can reduce cooling energy consumption by up to 50% compared to conventional approaches, according to peer-reviewed environmental impact research.',
                  },
                  { type: 'cite', claimId: 'c-i-arxiv-cooling-reduction' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The solutions exist — but I'll admit adoption is slower than it should be, and the buildout is currently outpacing the efficiency improvements.",
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
                      "The solutions existing and the solutions being deployed are different things. Nixon Peabody's September 2025 legal analysis found that companies face almost no binding legal obligations around water disclosure or usage limits for data centers.",
                  },
                  { type: 'cite', claimId: 'c-i-nixon-peabody-water' },
                  {
                    type: 'text',
                    value:
                      " MSCI's analysis of water scarcity risk found that data centers are increasingly sited in regions projected to experience 15 to 35 more days of water scarcity annually by 2050 — and the companies are not legally required to factor that in.",
                  },
                  { type: 'cite', claimId: 'c-i-msci-water-scarcity' },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"Water and energy efficiency goals often pull in opposite directions: water-based cooling can be more energy efficient but increases water consumption, while air-based cooling systems conserve water but require more electricity. The optimal balance is highly location specific."',
            attribution: '— MSCI Sustainability & Climate Research, 2025',
          },
        },
      ],
    },
    {
      header: { roundLabel: 'Round III', title: 'Labor & the Human Cost of AI' },
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
                      'I thought AI was made by, like, engineers and programmers. Are there a lot of regular people involved in building it?',
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
                      "Hundreds of thousands of them. Before any AI model can learn, humans have to label the data it trains on — categorizing images, flagging harmful content, rating responses, teaching the machine what's appropriate. This is called data annotation and content moderation, and it's largely invisible labor concentrated in the Global South.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In Kenya, data workers earning as little as $2 an hour are labeling content for companies as large as OpenAI — sometimes spending eight-hour days reviewing graphic violence, child abuse imagery, and other traumatic material.',
                  },
                  { type: 'cite', claimId: 'c-i-kenya-2-dollars' },
                  {
                    type: 'text',
                    value:
                      ' In their own words, in a 2024 open letter to President Biden: "Our work involves watching murder and beheadings, child abuse and rape, pornography and bestiality, often for more than 8 hours a day."',
                  },
                  { type: 'cite', claimId: 'c-i-nairobi-open-letter' },
                  {
                    type: 'text',
                    value: ' For less than $2 an hour. Without adequate mental health support.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In the Philippines, workers employed by Scale AI — which provides data labeling for Google — were found in 2025 to be paid below the legal minimum wage with no health insurance or paid leave.',
                  },
                  { type: 'cite', claimId: 'c-i-philippines-scale-ai' },
                  {
                    type: 'text',
                    value:
                      ' Meanwhile, a U.S.-based annotator doing the same work earns $10–$25 an hour.',
                  },
                  { type: 'cite', claimId: 'c-i-us-annotator-wage' },
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
                      "That's... I didn't know that at all. So when I use one of these AI tools, someone somewhere had to sit and watch terrible things to help train it? That feels wrong.",
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
                      "I don't want to minimize this, because the labor conditions described are genuinely unacceptable. But the solution is worker protection and fair pay — not halting the technology. In Kenya, youth unemployment is over 12%.",
                  },
                  { type: 'cite', claimId: 'c-i-qhala-unemployment' },
                  {
                    type: 'text',
                    value:
                      ' Digital labor platforms represent one of the only growing employment sectors accessible to young Kenyans. What those workers deserve is legal protections, fair wages, and real mental health support — not for the jobs to disappear.',
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
                      "Agreed — and I'd add that Amazon, Google, Meta, Microsoft, and Nvidia collectively use at least 30 intermediary companies to insulate themselves from direct accountability for how these workers are treated.",
                  },
                  { type: 'cite', claimId: 'c-i-somo-intermediaries' },
                  {
                    type: 'text',
                    value:
                      ' The "we didn\'t directly employ them" defense is legal cover. When Remotasks — one of these intermediary platforms — shut down its Kenya operations in March 2024, it sent workers a few hours\' notice via email. No severance. No transition. Just gone.',
                  },
                  { type: 'cite', claimId: 'c-i-remotasks-shutdown' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In February 2025, Kenyan data workers formed the Data Labelers Association specifically to challenge what they call "systemic injustices." 339 members joined in its first week.',
                  },
                  { type: 'cite', claimId: 'c-i-data-labelers-association' },
                  {
                    type: 'text',
                    value:
                      ' These workers are organizing because no law protects them and no corporation is volunteering accountability.',
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    {
      header: { roundLabel: 'Round IV', title: 'Power, Accountability & Regulation' },
      dividerBefore: true,
      blocks: [
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
                      'All of the problems discussed — energy opacity, water exploitation, labor abuse — share one root cause: the absence of binding rules with real enforcement. Let me lay out where the law actually stands.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The EU AI Act, adopted March 2024, is the world's most comprehensive binding AI law. It classifies AI systems by risk level and imposes transparency requirements, third-party audits, and human oversight mandates for high-risk systems.",
                  },
                  { type: 'cite', claimId: 'c-i-eu-act-comprehensive' },
                  {
                    type: 'text',
                    value: ' It does apply to non-EU companies deploying AI in Europe.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In the United States, the picture is fragmented. More than 1,000 AI-related bills were introduced across U.S. states in 2024–2025.',
                  },
                  { type: 'cite', claimId: 'c-i-pillsbury-bills' },
                  {
                    type: 'text',
                    value:
                      ' California, Colorado, New York, and Illinois each moved toward their own frameworks. But President Trump\'s December 11, 2025 executive order declared the policy of the administration is "AI dominance through a minimally burdensome national policy framework," and directed federal agencies to challenge state-level AI regulations — even threatening to withhold federal funding from states whose laws "conflict" with the administration\'s approach.',
                  },
                  { type: 'cite', claimId: 'c-i-eo-14365-dominance' },
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
                      "I'm not going to defend every policy decision, but I'll defend the underlying principle: heavy-handed regulation risks exporting AI development to jurisdictions with fewer protections — not more. China is not pausing for ethics reviews. The EU's strict approach, while well-intentioned, may have already slowed European AI competitiveness. The strongest argument for voluntary standards and market incentives isn't that accountability doesn't matter — it's that badly designed mandates can produce compliance theater while the real innovation and the real harms move offshore. What we need is smart, targeted rules — not a regulatory race between Washington and Brussels to see who can write the most requirements.",
                  },
                ],
              ],
            },
          },
        },
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
                      "That argument has been used to delay climate action for forty years. \"Don't regulate us, or the other guy will pollute more\" is not an ethical framework. It's a race to the bottom with a plausible-sounding narrative. The 800% energy price surge in Virginia, the water stress in Nevada, the CO₂ from data centers — those don't pause because of geopolitical competition.",
                  },
                  { type: 'cite', claimId: 'c-i-ansi-stanford-combined' },
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
                      'Canada, Japan, the UK, and Australia are all advancing accountability frameworks that align more closely with the EU than with the current U.S. approach.',
                  },
                  { type: 'cite', claimId: 'c-i-squire-global-frameworks' },
                  {
                    type: 'text',
                    value:
                      ' This divergence creates real risk for companies navigating multiple jurisdictions — but it also means the "innovate without rules" model has limited geographic reach. The question is whether the most powerful AI actors — concentrated in the U.S. — will be subject to meaningful accountability at all.',
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
                      "I keep hearing that AI is going to help us solve big problems. But what I'm understanding from this conversation is that the problems it's causing right now — electricity, water, those workers in Kenya — those are real and happening now. And the people making the decisions aren't the ones paying those costs. That part bothers me the most.",
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
                      "That's exactly it. The costs of this technology are borne by workers in Nairobi making $2 an hour, communities in drought-stricken Nevada watching their water tables drop, and families in Virginia whose electricity bills are climbing — not by the engineers, executives, and investors who profit from it. The ethical questions aren't theoretical. They're about who pays and who doesn't.",
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
                      "I'll close by saying: I think this technology is genuinely transformative and that managed well, it can improve billions of lives. But this conversation has sharpened something for me. \"Managed well\" requires transparency that doesn't currently exist, labor standards that aren't currently enforced, and energy practices that aren't currently mandated. Good intentions from industry leaders aren't enough. The people in this room — including the one who just learned about all this — need to be part of the conversation that shapes what comes next.",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-arxiv',
      title: 'Environmental Impact of AI Servers — arXiv (2025)',
      description:
        'Peer-reviewed analysis of cooling system design, geographic siting, and combined environmental impact of AI data centers.',
    },
    {
      id: 'src-iea',
      title: 'IEA — Energy and AI Report (April 2025)',
      description: 'Global data center electricity projections and AI energy intensity estimates.',
    },
    {
      id: 'src-mit-tech-review',
      title: 'MIT Technology Review (2025)',
      description: 'AI inference as dominant energy driver; transparency gap in reporting.',
    },
    {
      id: 'src-wef',
      title: 'World Economic Forum (December 2025)',
      description: 'Data center demand doubling projections; ChatGPT training CO₂ equivalence.',
    },
    {
      id: 'src-ansi',
      title: 'ANSI Blog (April 2026)',
      description: '800% energy price surge in Virginia; 13-state residential rate increases.',
    },
    {
      id: 'src-consumer-reports',
      title: 'Consumer Reports (March 2026)',
      description: 'Virginia data centers = 40% of state electricity; data center buildout scale.',
    },
    {
      id: 'src-microsoft',
      title: 'Microsoft Sustainability Report (2025)',
      description: '34% increase in water consumption, 2022–2024.',
    },
    {
      id: 'src-msci',
      title: 'MSCI Sustainability & Climate (2025)',
      description: 'Water scarcity projections; cooling energy tradeoffs.',
    },
    {
      id: 'src-stanford',
      title: 'Stanford Bill Lane Center for the American West (April 2025)',
      description: 'AI data centers vs. Western water communities.',
    },
    {
      id: 'src-front-and-centered',
      title: 'Front and Centered / Pew Research (2025)',
      description: 'U.S. data centers: 228 billion gallons/year; projected doubling by 2028.',
    },
    {
      id: 'src-nixon-peabody',
      title: 'Nixon Peabody LLP (September 2025)',
      description: 'Water use legal risks; lack of binding disclosure requirements.',
    },
    {
      id: 'src-privacy-international',
      title: 'Privacy International (2024)',
      description: 'Kenyan annotators earning $2/hour; wage disparity with U.S. workers.',
    },
    {
      id: 'src-somo',
      title: 'SOMO Report (March 2026)',
      description:
        "Big Tech's use of 30+ intermediary labor companies; worker conditions globally.",
    },
    {
      id: 'src-equal-times',
      title: 'Equal Times (2025)',
      description: 'Philippines Scale AI workers — below-minimum wage, no social protection.',
    },
    {
      id: 'src-computer-weekly',
      title: 'Computer Weekly (February 2025)',
      description: 'Kenya Data Labelers Association formation; 339 members in first week.',
    },
    {
      id: 'src-qhala',
      title: 'Qhala Research / Medium (2025)',
      description: 'Remotasks Kenya exit; youth unemployment context.',
    },
    {
      id: 'src-eu-ai-act',
      title: 'EU AI Act (March 2024)',
      description: 'Adopted framework for risk-based AI governance in Europe.',
    },
    {
      id: 'src-white-house-eo',
      title: 'White House Executive Order 14365 (December 11, 2025)',
      description: '"Ensuring a National Policy Framework for Artificial Intelligence."',
    },
    {
      id: 'src-squire-patton-boggs',
      title: 'Squire Patton Boggs / Pillsbury Law (2025)',
      description: 'Comparative global regulatory analysis; U.S. vs. EU divergence.',
    },
  ],
  claims: {
    // Statistics — Round I stat grid
    's-i-dc-electricity-2025': {
      id: 's-i-dc-electricity-2025',
      kind: 'statistic',
      claimText: '460 TWh',
      verificationStatus: 'pending',
    },
    's-i-iea-projected-2030': {
      id: 's-i-iea-projected-2030',
      kind: 'statistic',
      claimText: '945 TWh',
      verificationStatus: 'pending',
    },
    's-i-co2-training-llm': {
      id: 's-i-co2-training-llm',
      kind: 'statistic',
      claimText: '552 tons',
      verificationStatus: 'pending',
    },
    // Statistics — Round II stat grid
    's-i-us-water-annual': {
      id: 's-i-us-water-annual',
      kind: 'statistic',
      claimText: '228B gal',
      verificationStatus: 'pending',
    },
    's-i-water-per-day': {
      id: 's-i-water-per-day',
      kind: 'statistic',
      claimText: '300K gal',
      verificationStatus: 'pending',
    },
    's-i-global-water-2023': {
      id: 's-i-global-water-2023',
      kind: 'statistic',
      claimText: '560B liters',
      verificationStatus: 'pending',
    },
    // Citations — Round I
    'c-i-iea-dc-electricity': {
      id: 'c-i-iea-dc-electricity',
      kind: 'citation',
      claimText: '[IEA / Sustainability Atlas, 2026]',
      sourceId: 'src-iea',
      verificationStatus: 'pending',
    },
    'c-i-mit-training-gwh': {
      id: 'c-i-mit-training-gwh',
      kind: 'citation',
      claimText: '[MIT Technology Review, 2025]',
      sourceId: 'src-mit-tech-review',
      verificationStatus: 'pending',
    },
    'c-i-microsoft-water-increase': {
      id: 'c-i-microsoft-water-increase',
      kind: 'citation',
      claimText: '[Microsoft Sustainability Report, 2025; Sustainability Atlas, 2026]',
      sourceId: 'src-microsoft',
      verificationStatus: 'pending',
    },
    'c-i-iea-projection-2030': {
      id: 'c-i-iea-projection-2030',
      kind: 'citation',
      claimText: '[IEA, 2025]',
      sourceId: 'src-iea',
      verificationStatus: 'pending',
    },
    'c-i-wef-co2-training': {
      id: 'c-i-wef-co2-training',
      kind: 'citation',
      claimText: '[World Economic Forum, 2025]',
      sourceId: 'src-wef',
      verificationStatus: 'pending',
    },
    'c-i-aimultiple-grid-carbon': {
      id: 'c-i-aimultiple-grid-carbon',
      kind: 'citation',
      claimText: '[AI Multiple energy analysis, 2025]',
      verificationStatus: 'pending',
    },
    'c-i-mit-disclosure-gap': {
      id: 'c-i-mit-disclosure-gap',
      kind: 'citation',
      claimText: '[MIT Technology Review, 2025]',
      sourceId: 'src-mit-tech-review',
      verificationStatus: 'pending',
    },
    'c-i-eu-act-transparency': {
      id: 'c-i-eu-act-transparency',
      kind: 'citation',
      claimText: '[EU Parliament, 2024; Squire Patton Boggs analysis, 2025]',
      sourceId: 'src-eu-ai-act',
      verificationStatus: 'pending',
    },
    'c-i-eo-14365-innovate': {
      id: 'c-i-eo-14365-innovate',
      kind: 'citation',
      claimText: '[White House, EO 14365, December 2025]',
      sourceId: 'src-white-house-eo',
      verificationStatus: 'pending',
    },
    'c-i-ansi-price-surge': {
      id: 'c-i-ansi-price-surge',
      kind: 'citation',
      claimText: '[ANSI Blog, April 2026]',
      sourceId: 'src-ansi',
      verificationStatus: 'pending',
    },
    'c-i-ansi-rate-increase': {
      id: 'c-i-ansi-rate-increase',
      kind: 'citation',
      claimText: '[ANSI Blog, April 2026]',
      sourceId: 'src-ansi',
      verificationStatus: 'pending',
    },
    // Citations — Round II
    'c-i-wef-water-per-day': {
      id: 'c-i-wef-water-per-day',
      kind: 'citation',
      claimText: '[World Economic Forum, 2025 citing NPR data]',
      sourceId: 'src-wef',
      verificationStatus: 'pending',
    },
    'c-i-pew-us-water': {
      id: 'c-i-pew-us-water',
      kind: 'citation',
      claimText: '[Front and Centered / Pew Research, 2025]',
      sourceId: 'src-front-and-centered',
      verificationStatus: 'pending',
    },
    'c-i-stanford-water-competition': {
      id: 'c-i-stanford-water-competition',
      kind: 'citation',
      claimText: '[Bill Lane Center for the American West, Stanford, 2025]',
      sourceId: 'src-stanford',
      verificationStatus: 'pending',
    },
    'c-i-msci-cooling-energy': {
      id: 'c-i-msci-cooling-energy',
      kind: 'citation',
      claimText: '[MSCI Sustainability, 2025]',
      sourceId: 'src-msci',
      verificationStatus: 'pending',
    },
    'c-i-arxiv-cooling-reduction': {
      id: 'c-i-arxiv-cooling-reduction',
      kind: 'citation',
      claimText: '[arXiv environmental impact study, 2025]',
      sourceId: 'src-arxiv',
      verificationStatus: 'pending',
    },
    'c-i-nixon-peabody-water': {
      id: 'c-i-nixon-peabody-water',
      kind: 'citation',
      claimText: '[Nixon Peabody LLP, September 2025]',
      sourceId: 'src-nixon-peabody',
      verificationStatus: 'pending',
    },
    'c-i-msci-water-scarcity': {
      id: 'c-i-msci-water-scarcity',
      kind: 'citation',
      claimText: '[MSCI Sustainability & Climate, 2025]',
      sourceId: 'src-msci',
      verificationStatus: 'pending',
    },
    // Citations — Round III
    'c-i-kenya-2-dollars': {
      id: 'c-i-kenya-2-dollars',
      kind: 'citation',
      claimText: '[Privacy International, 2024; AI Base reporting, 2025]',
      sourceId: 'src-privacy-international',
      verificationStatus: 'pending',
    },
    'c-i-nairobi-open-letter': {
      id: 'c-i-nairobi-open-letter',
      kind: 'citation',
      claimText: '[Open letter from 97 Nairobi AI workers, May 2024]',
      verificationStatus: 'pending',
    },
    'c-i-philippines-scale-ai': {
      id: 'c-i-philippines-scale-ai',
      kind: 'citation',
      claimText: '[Equal Times / SOMO Report, 2025]',
      sourceId: 'src-equal-times',
      verificationStatus: 'pending',
    },
    'c-i-us-annotator-wage': {
      id: 'c-i-us-annotator-wage',
      kind: 'citation',
      claimText: '[Privacy International, 2024]',
      sourceId: 'src-privacy-international',
      verificationStatus: 'pending',
    },
    'c-i-qhala-unemployment': {
      id: 'c-i-qhala-unemployment',
      kind: 'citation',
      claimText: '[Qhala Research, 2025]',
      sourceId: 'src-qhala',
      verificationStatus: 'pending',
    },
    'c-i-somo-intermediaries': {
      id: 'c-i-somo-intermediaries',
      kind: 'citation',
      claimText: '[SOMO Report, March 2026]',
      sourceId: 'src-somo',
      verificationStatus: 'pending',
    },
    'c-i-remotasks-shutdown': {
      id: 'c-i-remotasks-shutdown',
      kind: 'citation',
      claimText: '[Kenyan Wall Street / Qhala, 2024–2025]',
      sourceId: 'src-qhala',
      verificationStatus: 'pending',
    },
    'c-i-data-labelers-association': {
      id: 'c-i-data-labelers-association',
      kind: 'citation',
      claimText: '[Computer Weekly, February 2025]',
      sourceId: 'src-computer-weekly',
      verificationStatus: 'pending',
    },
    // Citations — Round IV
    'c-i-eu-act-comprehensive': {
      id: 'c-i-eu-act-comprehensive',
      kind: 'citation',
      claimText: '[EU Parliament, 2024; Squire Patton Boggs, 2025]',
      sourceId: 'src-eu-ai-act',
      verificationStatus: 'pending',
    },
    'c-i-pillsbury-bills': {
      id: 'c-i-pillsbury-bills',
      kind: 'citation',
      claimText: '[Pillsbury Law, December 2025]',
      sourceId: 'src-squire-patton-boggs',
      verificationStatus: 'pending',
    },
    'c-i-eo-14365-dominance': {
      id: 'c-i-eo-14365-dominance',
      kind: 'citation',
      claimText: '[White House, EO 14365, December 2025]',
      sourceId: 'src-white-house-eo',
      verificationStatus: 'pending',
    },
    'c-i-ansi-stanford-combined': {
      id: 'c-i-ansi-stanford-combined',
      kind: 'citation',
      claimText: '[ANSI Blog, 2026; Stanford Bill Lane Center, 2025]',
      sourceId: 'src-ansi',
      verificationStatus: 'pending',
    },
    'c-i-squire-global-frameworks': {
      id: 'c-i-squire-global-frameworks',
      kind: 'citation',
      claimText: '[Squire Patton Boggs analysis, 2025]',
      sourceId: 'src-squire-patton-boggs',
      verificationStatus: 'pending',
    },
  },
}
