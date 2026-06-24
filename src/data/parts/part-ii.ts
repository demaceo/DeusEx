import type { RoundtableDocument } from '../../types/document'

export const partII: RoundtableDocument = {
  id: 'part-ii',
  slug: 'whats-being-done',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Response · Action · Accountability · 2025–2026',
    titleLines: [
      [{ text: 'The AI Reckoning:' }],
      [{ text: "What's Actually Being Done", em: true }],
    ],
    subtitle:
      "The same five voices return — examining real-world responses to AI's energy, water, labor, and regulatory crises. Progress is happening. So are the gaps.",
    dateLine: 'May 2026 · Companion to "The AI Reckoning: A Roundtable on Real Costs"',
    accentColor: 'gold',
  },
  companion: {
    text: 'Companion Document — Read alongside "The AI Reckoning: A Roundtable on Real Costs" for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          "The problems are documented. The question now is: what's happening in response? This conversation examines concrete actions — legislation that has actually passed, technologies actively deployed, lawsuits that have advanced, and deals already signed. Where the response falls short, the panel says so directly.",
      },
    ],
  ],
  sections: [
    // ─── ROUND I — ENERGY ───────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: "Energy: What's Actually Changing" },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Renewables share',
                value: '58%',
                size: 'large',
                description: 'Data center power from renewables in 2025 — up from 50% in 2024',
                claimId: 's-ii-renewables-share',
              },
              {
                variant: 'positive',
                labelTop: 'Nuclear contracted',
                value: '10+ GW',
                size: 'large',
                description: 'New nuclear capacity contracted by Big Tech in 2024–2025',
                claimId: 's-ii-nuclear-contracted',
              },
              {
                variant: 'caution',
                labelTop: 'Emissions since pledge',
                value: '+50%',
                size: 'large',
                description: "Google's emissions increase since pledging net zero",
                claimId: 's-ii-emissions-since-pledge',
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
                      "After our last conversation I started paying more attention. I've been hearing things about nuclear power and AI. Isn't that what Microsoft did with Three Mile Island? That name scared me a little, honestly.",
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
                      "Yes — and it's one of the most significant energy deals in recent memory. Microsoft signed a 20-year power purchase agreement with Constellation Energy to restart the Crane Clean Energy Center — formerly Three Mile Island Unit 1 — targeting 2028. The deal is worth approximately $16 billion and will direct 835 megawatts of carbon-free power exclusively to Microsoft's data centers.",
                  },
                  { type: 'cite', claimId: 'c-ii-introl-commonfund-2025' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "It's not an isolated move. Big Tech companies contracted more than 10 gigawatts of new nuclear capacity in 2024–2025 combined.",
                  },
                  { type: 'cite', claimId: 'c-ii-introl-dec-2025' },
                  {
                    type: 'text',
                    value:
                      " Amazon secured a 1.92 gigawatt PPA with Talen Energy's Susquehanna plant through 2042 and invested over $20 billion converting the site into a nuclear-powered AI campus.",
                  },
                  { type: 'cite', claimId: 'c-ii-enkiai-commonfund-2025' },
                  {
                    type: 'text',
                    value:
                      ' Google contracted 500 megawatts of small modular reactors from Kairos Power, targeting first deployment by 2030.',
                  },
                  { type: 'cite', claimId: 'c-ii-ieee-spectrum-2024' },
                  {
                    type: 'text',
                    value:
                      ' Meta signed a 20-year deal for 1.1 gigawatts from the Clinton Clean Energy Center in Illinois — a plant previously slated to retire in 2027.',
                  },
                  { type: 'cite', claimId: 'c-ii-commonfund-2025' },
                  {
                    type: 'text',
                    value:
                      ' In January 2026, Meta and Vistra signed an additional agreement with an option for a new 300-megawatt SMR.',
                  },
                  { type: 'cite', claimId: 'c-ii-enkiai-2026' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Renewables are also accelerating. The share of data center power sourced from renewables rose from 50% in 2024 to 58% in 2025.',
                  },
                  { type: 'cite', claimId: 'c-ii-sp-global-apr-2026' },
                  {
                    type: 'text',
                    value:
                      ' The IEA projects renewables will cover nearly half of all additional data center demand growth through 2030, growing at 22% per year.',
                  },
                  { type: 'cite', claimId: 'c-ii-ttms-iea-2025' },
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
                      'I want to be fair — the nuclear deals are genuinely meaningful. Restarting a plant slated for retirement is not the same as building new fossil fuel infrastructure. And the renewable procurement numbers are real.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'But I have to put those numbers in direct tension with the others. Tech companies bought record amounts of clean energy in 2024 and 2025. Their total emissions went up anyway.',
                  },
                  { type: 'cite', claimId: 'c-ii-fortune-mar-2026' },
                  {
                    type: 'text',
                    value:
                      " Google's emissions jumped nearly 50%. Amazon's rose 33%. Microsoft's more than 23%. Meta's more than 60% — all during the same period these companies were making headline clean energy commitments.",
                  },
                  { type: 'cite', claimId: 'c-ii-fortune-mar-2026' },
                  {
                    type: 'text',
                    value:
                      " You can buy more solar and still emit more carbon if you're building ten times faster than you're cleaning up.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The Three Mile Island deal doesn't come online until 2028. The SMRs won't produce power until 2030 at the earliest. A Deloitte analysis projects nuclear could meet up to 10% of data center electricity demand by 2035.",
                  },
                  { type: 'cite', claimId: 'c-ii-trellis-2025' },
                  {
                    type: 'text',
                    value: " That's a decade away and only one-tenth of the need.",
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
                      "There's also a regulatory wrinkle worth noting. When Amazon tried to expand its nuclear access beyond the initial 300 megawatts at Susquehanna, federal regulators rejected it — citing concerns that large tech companies securing direct-access deals creates unfair advantages over other grid users who can't negotiate the same terms.",
                  },
                  { type: 'cite', claimId: 'c-ii-ieee-spectrum-2024' },
                  {
                    type: 'text',
                    value:
                      " These deals are setting infrastructure precedents that regulators haven't fully caught up to.",
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
                      "So the technology companies are the biggest clean energy buyers in the world... but their emissions are still going up. That's a hard thing to hold in my head at the same time.",
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
                      "That's exactly the tension. In 2024, Big Tech accounted for 43% of all clean energy power purchase agreements signed globally.",
                  },
                  { type: 'cite', claimId: 'c-ii-brookings-apr-2026' },
                  {
                    type: 'text',
                    value:
                      ' And yet total emissions are climbing. This is what "outpacing" means in practice: you\'re running toward the finish line, but the finish line is moving faster than you are. The 2025 Uptime Institute survey found a 12% drop in the number of data center operators who believed they\'d meet their carbon-neutral goals by 2030.',
                  },
                  { type: 'cite', claimId: 'c-ii-fortune-mar-2026' },
                  { type: 'text', value: ' The industry knows it.' },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"Tech companies are allowing — implicitly or explicitly — an enormous increase in fossil fuel dependence under their watch and because of their actions."',
            attribution: '— Researcher quoted in Fortune, March 2026',
          },
        },
      ],
    },
    // ─── ROUND II — WATER ───────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'Water: New Technologies Being Deployed' },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Annual savings per facility',
                value: '125M+ litres',
                size: 'medium',
                description: "Microsoft's closed-loop cooling system, deployed from Aug 2024",
                claimId: 's-ii-water-savings-per-facility',
              },
              {
                variant: 'positive',
                labelTop: 'Microsoft WUE in 2024',
                value: '0.30',
                size: 'large',
                description: 'L/kWh — down from 0.49 in 2021; a 39% efficiency gain',
                claimId: 's-ii-microsoft-wue',
              },
              {
                variant: 'caution',
                labelTop: 'Google 2023 consumption',
                value: '24,227 ML',
                size: 'medium',
                description: 'Megalitres — highest among major hyperscalers',
                claimId: 's-ii-google-2023-consumption',
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
                      'Last time we talked about data centers using enormous amounts of drinking water for cooling. Is anything being done about that specifically?',
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
                      'This is an area where I can point to concrete, deployed technology — not just plans. In August 2024, Microsoft began deploying a closed-loop, chip-level liquid cooling system that virtually eliminates evaporative water use. Once filled during construction, it recirculates coolant without drawing additional water from external sources, saving more than 125 million liters per data center annually.',
                  },
                  { type: 'cite', claimId: 'c-ii-sustainability-dcm-jul-2025' },
                  {
                    type: 'text',
                    value:
                      ' Pilot sites are operating in Phoenix, Arizona and Mt. Pleasant, Wisconsin, and all new Microsoft data center projects have used this zero-water design from August 2024 onward.',
                  },
                  { type: 'cite', claimId: 'c-ii-sustainability-mag-2025' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "In Hebei Province, China, Vertiv's X-Cooling system — built with Bridge Data Centres and Chindata — is projected to save 1.2 million tons of water per 100 megawatts of capacity annually.",
                  },
                  { type: 'cite', claimId: 'c-ii-data-centre-magazine-2025' },
                  {
                    type: 'text',
                    value:
                      ' Edged Data Centers opened a zero-water-cooling facility in Chicago in February 2025.',
                  },
                  { type: 'cite', claimId: 'c-ii-data-centre-magazine-2026' },
                  {
                    type: 'text',
                    value:
                      ' Investment is scaling: Crusoe raised $1.4 billion in October 2025 to build closed-loop AI infrastructure, and Firmus raised $327 million in November 2025 for a 1.6-gigawatt zero-water-cooling buildout by 2028.',
                  },
                  { type: 'cite', claimId: 'c-ii-net-zero-insights-2025' },
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
                      "The technology is real and the Microsoft deployment is significant. My concern is pace and coverage. Microsoft's new system applies to new facilities. What about the existing ones? Google consumed 24,227 megalitres of water in 2023 — the highest among major hyperscalers.",
                  },
                  { type: 'cite', claimId: 'c-ii-introl-2026' },
                  {
                    type: 'text',
                    value:
                      " The retrofit challenge is enormous and there's no binding timeline for existing facilities to adopt these systems.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "There's also the physics tradeoff: cooling systems that eliminate water often use more electricity. The most efficient water-free cooling for high-density AI — two-phase direct-to-chip immersion — is still expensive and not yet deployed at hyperscale. We're in a transitional period where the solutions exist in pilot form but growth is outrunning adoption.",
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
                      "And there's still no legal obligation to use any of this. Nixon Peabody's 2025 analysis found companies face almost no binding water disclosure or usage requirements for data centers.",
                  },
                  { type: 'cite', claimId: 'c-ii-nixon-peabody-sep-2025' },
                  {
                    type: 'text',
                    value:
                      " Microsoft's progress is voluntary. The question is whether second and third-tier operators building AI infrastructure right now are adopting any of this — and the answer, based on available data, is inconsistently at best.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'verdict',
          data: {
            label: 'Assessment',
            paragraphs: [
              [
                {
                  type: 'text',
                  value:
                    "Zero-water and closed-loop cooling technologies are real, deployed, and demonstrably effective. Microsoft's rollout represents genuine progress. But adoption across the industry is voluntary and uneven, retrofit of existing facilities is largely unaddressed, and no binding requirements exist to compel the broader operator market to follow. Progress is real; universality is not.",
                },
              ],
            ],
          },
        },
      ],
    },
    // ─── ROUND III — LABOR ──────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'Labor: Courts, Unions & Lawsuits' },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Nairobi High Court',
                value: '180+',
                size: 'large',
                description: 'Kenyan workers cleared to take Meta to trial — landmark jurisdictional ruling',
                claimId: 's-ii-nairobi-high-court',
              },
              {
                variant: 'positive',
                labelTop: 'Teleperformance Colombia',
                value: '40,000',
                size: 'large',
                description: 'Workers granted union rights after government investigation',
                claimId: 's-ii-teleperformance-colombia',
              },
              {
                variant: 'caution',
                labelTop: 'Countermovement',
                value: '2024–25',
                size: 'medium',
                description: "Kenya's president signaled legislation to restrict lawsuits against foreign outsourcers",
                claimId: 's-ii-countermovement',
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
                      'What happened with those workers in Kenya we talked about? The ones reviewing horrible content for a couple of dollars an hour. Did anything change for them?',
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
                    value: 'Quite a lot has moved — and some of it in opposite directions at once.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The most significant legal development: the Nairobi High Court ruled that Meta must face more than 180 content moderators and data labelers in court over poor working conditions, negative mental health impacts, and withheld pay — despite Meta arguing Kenyan courts have no jurisdiction over an American company.',
                  },
                  { type: 'cite', claimId: 'c-ii-computer-weekly' },
                  {
                    type: 'text',
                    value:
                      ' If the workers prevail, this could establish that Big Tech companies — not just their subcontractors — are legally liable for conditions inside their data annotation supply chains. That would be a structural shift.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'It builds on a 2023 victory where the same community won a ruling ordering Meta to provide "proper medical, psychiatric and psychological care" for workers exposed to traumatic content.',
                  },
                  { type: 'cite', claimId: 'c-ii-computer-weekly' },
                  {
                    type: 'text',
                    value:
                      " The African Content Moderators Union formed from those efforts — one of its organizers, Richard Mathenge, was named among TIME's 100 most influential people in AI. In Colombia, Teleperformance signed a historic agreement granting 40,000 TikTok data workers the right to form a union, following a government investigation into their conditions.",
                  },
                  { type: 'cite', claimId: 'c-ii-computer-weekly' },
                  {
                    type: 'text',
                    value:
                      ' And in February 2025, the Kenya Data Labelers Association formed and gained 339 members in its first week.',
                  },
                  { type: 'cite', claimId: 'c-ii-computer-weekly-feb-2025' },
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
                    value: 'That sounds like real progress. So things are getting better?',
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
                      'Workers are fighting back and winning in specific cases — which matters enormously for the people involved. But the structural situation is more complicated.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Kenya's president William Ruto, responding to the Meta lawsuits, indicated he was preparing to sign legislation that would prevent foreign outsourcing companies from being sued in Kenya — which would strip away the very legal mechanism that enabled these High Court victories.",
                  },
                  { type: 'cite', claimId: 'c-ii-time-dec-2024' },
                  {
                    type: 'text',
                    value:
                      " Workers' legal leverage could be legislated away at the exact moment they're using it.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Meanwhile, in March 2026 a U.S. class-action lawsuit was filed against Meta after it emerged that footage from its AI smart glasses — including intimate personal content — was being reviewed without users' knowledge by contractors in Nairobi.",
                  },
                  { type: 'cite', claimId: 'c-ii-classaction-mar-2026' },
                  {
                    type: 'text',
                    value:
                      ' The same workers. The same supply chain. The same dynamic — now with a privacy violation layered on top. We\'re winning individual battles while the system generating the problem continues to scale.',
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
                      "The Meta glasses situation is serious and I don't want to minimize it. But it's also being litigated, investigated by regulators in Sweden and the UK, and generating the kind of public attention that historically does change corporate behavior. SOMO's March 2026 report naming Amazon, Google, Meta, Microsoft, and Nvidia specifically, documenting their use of 30-plus intermediary companies, is exactly the transparency pressure that eventually moves behavior.",
                  },
                  { type: 'cite', claimId: 'c-ii-somo-mar-2026' },
                  {
                    type: 'text',
                    value:
                      ' The Workday class action — certified against an AI resume screening system for discriminatory outcomes — established that vendors, not just employers, face liability for discriminatory AI.',
                  },
                  { type: 'cite', claimId: 'c-ii-stackcyber-2026' },
                  { type: 'text', value: ' These precedents accumulate.' },
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
                      'They do. But court cases move on timescales of years, and workers need protection on timescales of paychecks. The Teleperformance-Colombia agreement is meaningful precisely because it didn\'t wait for a court — it was a negotiated settlement driven by a government investigation. That model — regulatory investigation leading to binding agreement — is faster than litigation and more durable than voluntary pledges. The problem is it requires governments with both the will and the jurisdiction to act, and in most countries where this labor is concentrated, that combination is inconsistent.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"Until we treat content moderation as real digital work that is needed and not easily automated, we will fail to value or see these workers."',
            attribution: '— Researcher, quoted in Computer Weekly',
          },
        },
      ],
    },
    // ─── ROUND IV — REGULATION ──────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'Regulation: What Has Actually Passed' },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'EU AI Act — in force',
                value: 'Feb 2025',
                size: 'medium',
                description: 'Prohibited uses now enforceable: social scoring, manipulative AI, real-time public biometrics',
                claimId: 's-ii-eu-ai-act-in-force',
              },
              {
                variant: 'positive',
                labelTop: 'Max fine — worst violations',
                value: '€35M',
                size: 'large',
                description: 'Or percentage of global annual turnover, whichever is higher',
                claimId: 's-ii-max-fine',
              },
              {
                variant: 'caution',
                labelTop: 'High-risk AI deadline',
                value: 'Aug 2026',
                size: 'medium',
                description: 'May slip to Dec 2027 under EU Digital Omnibus — trilogue failed April 28',
                claimId: 's-ii-high-risk-deadline',
              },
            ],
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
                      "Let me give an honest accounting of where regulation actually stands — there's real progress and real friction simultaneously.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The EU AI Act is the most significant AI law in existence, and it is moving in stages. Since February 2, 2025, the most dangerous AI applications are outright prohibited across all EU member states: AI systems that manipulate people subliminally, social scoring systems, and real-time biometric surveillance in public spaces are now illegal in Europe — in force today, not on a roadmap.',
                  },
                  { type: 'cite', claimId: 'c-ii-secure-privacy-2026' },
                  {
                    type: 'text',
                    value:
                      ' Since August 2, 2025, providers of general-purpose AI models — the large foundation models behind most commercial AI — have been subject to transparency and documentation obligations.',
                  },
                  { type: 'cite', claimId: 'c-ii-eu-ai-act-enforcement-2026' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The next major milestone — binding requirements for high-risk AI in employment, credit, healthcare, and education — is set for August 2, 2026. However, the EU's Digital Omnibus proposal would push that to December 2027, citing delays including the fact that the EU's standardization bodies, CEN and CENELEC, have not finalized the technical standards companies need to comply against.",
                  },
                  { type: 'cite', claimId: 'c-ii-dla-piper-genie-2026' },
                  {
                    type: 'text',
                    value:
                      ' As of late April 2026, trilogue negotiations on the Omnibus collapsed and a follow-up was scheduled for May 13.',
                  },
                  { type: 'cite', claimId: 'c-ii-iapp-may-2026' },
                  { type: 'text', value: ' The high-risk deadline remains uncertain.' },
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
                      'In the United States, states have become the primary movers. Colorado passed the most comprehensive state AI law in the country — the Colorado AI Act — requiring impact assessments, consumer disclosures, and discrimination prevention for high-risk AI, with penalties up to $20,000 per violation, effective June 30, 2026.',
                  },
                  { type: 'cite', claimId: 'c-ii-baker-botts-jan-2026' },
                  {
                    type: 'text',
                    value:
                      ' California signed the Transparency in Frontier AI Act in September 2025, effective January 1, 2026.',
                  },
                  { type: 'cite', claimId: 'c-ii-troutman-pepper-2025' },
                  {
                    type: 'text',
                    value:
                      ' Texas passed its own framework effective January 1, 2026. Illinois banned discriminatory employer use of AI in hiring, also effective January 1, 2026.',
                  },
                  { type: 'cite', claimId: 'c-ii-drata-baker-botts-2026' },
                  {
                    type: 'text',
                    value:
                      " New York City's Local Law 144, requiring bias audits for AI hiring tools, has been in effect since 2023.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The complication: the December 2025 federal executive order explicitly named the Colorado AI Act as an example of excessive regulation and directed agencies to evaluate and potentially challenge state laws conflicting with the administration\'s deregulatory posture.',
                  },
                  { type: 'cite', claimId: 'c-ii-king-spalding-jan-2026' },
                  {
                    type: 'text',
                    value:
                      ' Courts will ultimately determine whether the order can preempt state statutes, since executive orders alone typically cannot. But it creates genuine compliance uncertainty.',
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
                      "I'll say something that might be surprising: the EU AI Act prohibitions currently in force are reasonable. Banning real-time public biometric surveillance and social scoring isn't anti-innovation — those are genuinely harmful applications with minimal legitimate use cases. My concern with the U.S. patchwork isn't that accountability is wrong. It's that 50 different compliance frameworks with different standards disproportionately burden smaller AI developers who don't have the legal resources of Microsoft or Google. A single clear national standard with meaningful protections — not just deregulation — would actually be preferable to the current situation for everyone.",
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
                      'Worth noting that none of the passed U.S. legislation addresses energy or water at all. Colorado, California, Texas, Illinois — all of it focuses on algorithmic discrimination and transparency in automated decision-making. The environmental costs of AI have no binding regulatory framework in the United States. No mandatory energy disclosure. No water usage limits. The EU AI Act\'s environmental provisions are also limited. We have more legal structure around whether an AI hiring tool discriminates than around whether the data center running it is depleting an aquifer.',
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
                      'So we have real laws in Europe and real laws in some states. That\'s more than I expected. But none of it covers the electricity and water problems?',
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
                      'Correct. The legislative response to AI has been almost entirely focused on how AI makes decisions affecting people — hiring, credit, healthcare, criminal justice. Appropriate and important. But the physical infrastructure that runs AI — the energy it consumes, the water it uses, the communities it displaces — exists in a separate regulatory world of utility law, water rights, and zoning that was not designed with data centers in mind. Those two regulatory worlds have not yet been connected by any binding legal framework in the United States.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"With federal legislation stalled, states have become the primary drivers of binding AI regulation. The pace picked up in 2025 and 2026 — but coverage of AI\'s environmental costs remains almost entirely absent."',
            attribution: '— VerifyWise AI Governance Analysis, May 2026',
          },
        },
      ],
    },
    // ─── CLOSING ────────────────────────────────────────────────
    {
      header: { roundLabel: 'Closing', title: 'Where Things Actually Stand' },
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
                      "I want to make sure I understand what I've heard. There are real things happening — nuclear deals, better cooling systems, court wins for workers, actual laws. But none of it is keeping pace with how fast AI is growing?",
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
                      "That's a fair summary. I'll be honest: the emissions numbers are worse than I'd like, and the gap between what's being built and what's being cleaned up is real. What I hold onto is that the investment in solutions is also at a scale we've never seen — billions into nuclear, billions into cooling innovation, renewable procurement that is genuinely moving the needle on the share of clean power, even if not yet total emissions. The direction is right. The speed is the problem.",
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
                      "The speed is everything in environmental problems. We don't get to go back and un-emit the carbon or refill the aquifer. The nuclear deals are promising but won't deliver power until 2028 or later. The cooling technologies are proven but not mandated. The renewable share is growing but total emissions are rising anyway. Progress without proportionality isn't progress — it's losing more slowly.",
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
                      "For workers, this has been a period of real firsts — the first major court victories, the first union agreements, the first organized associations. Those firsts matter. But they're happening against a backdrop where the industry continues to scale, the supply chain continues to extend into lower-wage countries, and the companies with the most power are still using intermediary structures that let them profit from the labor while distancing themselves from legal accountability. The Meta glasses lawsuit makes this concrete: a product sold to seven million people, generating intimate surveillance footage, routed to Nairobi for annotation, with workers receiving no meaningful protection and users receiving no meaningful disclosure. The scale of what's being built has outrun the ethics of how it was built.",
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
                      'The regulatory picture is more developed than most people realize, and less comprehensive than it needs to be. The EU AI Act is real law with real fines and a real timeline, even if slipping. More than a dozen U.S. states have enacted binding AI rules in two years. Courts are establishing precedents through litigation that legislation hasn\'t reached. None of it is coordinated. None of it covers environmental costs. And the most powerful AI actors operate in the jurisdiction — the United States — that is currently the most actively resistant to binding accountability. That\'s the honest position of where governance stands in May 2026.',
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
                      "I came into both of these conversations not knowing very much. I leave knowing that things are happening — real things, not just talk. I also leave knowing that most of it is voluntary, most of it is slower than the problem, and none of it addresses the electricity and water issues that felt most immediate and real to me when we first talked. I guess what I'm wondering is: who decides when enough is being done? Because it doesn't sound like it's the people paying the costs.",
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
      id: 'src-sp-global',
      title: 'S&P Global — 2026 Data Center Trends (April 2026)',
      description: 'Renewable energy share: 58% in 2025, up from 50% in 2024.',
    },
    {
      id: 'src-ttms-iea',
      title: 'TTMS / IEA Analysis (May 2026)',
      description: 'Renewables at 22%/yr growth; projected to cover ~half of additional demand by 2030.',
    },
    {
      id: 'src-fortune',
      title: 'Fortune (March 2026)',
      description:
        'Big Tech emissions rose despite record clean energy purchases: Google +50%, Amazon +33%, Microsoft +23%, Meta +60%.',
    },
    {
      id: 'src-brookings',
      title: 'Brookings — Global Energy Demands (April 2026)',
      description: 'Big Tech = 43% of all clean energy PPAs signed globally in 2024.',
    },
    {
      id: 'src-introl-commonfund',
      title: 'Introl / Commonfund (2025)',
      description: 'Microsoft–Constellation 20-year PPA, $16B, 835 MW Three Mile Island restart targeting 2028.',
    },
    {
      id: 'src-enkiai-commonfund',
      title: 'Enkiai / Commonfund (2025–2026)',
      description: 'Amazon $20B+ Susquehanna campus; Meta–Vistra January 2026 agreement with SMR option.',
    },
    {
      id: 'src-ieee-spectrum',
      title: 'IEEE Spectrum (December 2024)',
      description: 'Amazon regulator rejection on expanded nuclear access; Google–Kairos Power SMR deal.',
    },
    {
      id: 'src-trellis',
      title: 'Trellis (June 2025)',
      description: 'Deloitte: nuclear could meet up to 10% of data center demand by 2035.',
    },
    {
      id: 'src-sustainability-magazine',
      title: 'Sustainability Magazine / Data Centre Magazine (July 2025)',
      description: 'Microsoft zero-water cooling: 125M+ litres saved/facility; WUE 0.30 from 0.49.',
    },
    {
      id: 'src-data-centre-magazine',
      title: 'Data Centre Magazine (February 2026)',
      description: 'Edged Data Centers Chicago: zero-water facility opened February 2025.',
    },
    {
      id: 'src-net-zero-insights',
      title: 'Net Zero Insights (November 2025)',
      description: 'Crusoe $1.4B; Firmus $327M for 1.6 GW zero-water buildout by 2028.',
    },
    {
      id: 'src-introl-2026',
      title: 'Introl (2026)',
      description: 'Google 2023 water: 24,227 megalitres — highest among major hyperscalers.',
    },
    {
      id: 'src-nixon-peabody',
      title: 'Nixon Peabody LLP (September 2025)',
      description: 'No binding water disclosure or usage requirements for data centers.',
    },
    {
      id: 'src-computer-weekly',
      title: 'Computer Weekly',
      description:
        'Nairobi High Court ruling; 2023 mental health care order; African Content Moderators Union; Teleperformance Colombia union agreement.',
    },
    {
      id: 'src-time',
      title: 'TIME (December 2024)',
      description: 'Kenya President Ruto signaling legislation to restrict outsourcer lawsuits.',
    },
    {
      id: 'src-classaction',
      title: 'ClassAction.org / Business & Human Rights Centre (March 2026)',
      description: 'U.S. class action against Meta — AI glasses footage reviewed by Kenyan workers.',
    },
    {
      id: 'src-somo',
      title: 'SOMO (March 2026)',
      description: "Big Tech's 30+ intermediary companies; accountability gaps in AI labor supply chains.",
    },
    {
      id: 'src-secure-privacy',
      title: 'Secure Privacy / Legal Nodes (2026)',
      description: 'EU AI Act: prohibited uses Feb 2025; GPAI obligations Aug 2025; high-risk deadline Aug 2026.',
    },
    {
      id: 'src-dla-piper-iapp',
      title: 'DLA Piper GENIE / IAPP (April–May 2026)',
      description: 'EU Digital Omnibus; April 28 trilogue failure; possible delay to December 2027.',
    },
    {
      id: 'src-baker-botts-king-spalding',
      title: 'Baker Botts / King & Spalding (January 2026)',
      description:
        'Colorado AI Act (June 30, 2026); California TFAIA; Texas RAIGA; Illinois HB 3773; Trump EO targeting Colorado law.',
    },
    {
      id: 'src-stackcyber',
      title: 'StackCyber AI Laws Tracker (2026)',
      description: 'Workday class action certified; vendor liability for discriminatory AI established.',
    },
  ],
  claims: {
    // ─── Statistics ───────────────────────────────────────────
    's-ii-renewables-share': {
      id: 's-ii-renewables-share',
      kind: 'statistic',
      claimText: '58%',
      sourceId: 'src-sp-global',
      verificationStatus: 'pending',
    },
    's-ii-nuclear-contracted': {
      id: 's-ii-nuclear-contracted',
      kind: 'statistic',
      claimText: '10+ GW',
      verificationStatus: 'pending',
    },
    's-ii-emissions-since-pledge': {
      id: 's-ii-emissions-since-pledge',
      kind: 'statistic',
      claimText: '+50%',
      sourceId: 'src-fortune',
      verificationStatus: 'pending',
    },
    's-ii-water-savings-per-facility': {
      id: 's-ii-water-savings-per-facility',
      kind: 'statistic',
      claimText: '125M+ litres',
      sourceId: 'src-sustainability-magazine',
      verificationStatus: 'pending',
    },
    's-ii-microsoft-wue': {
      id: 's-ii-microsoft-wue',
      kind: 'statistic',
      claimText: '0.30',
      sourceId: 'src-sustainability-magazine',
      verificationStatus: 'pending',
    },
    's-ii-google-2023-consumption': {
      id: 's-ii-google-2023-consumption',
      kind: 'statistic',
      claimText: '24,227 ML',
      sourceId: 'src-introl-2026',
      verificationStatus: 'pending',
    },
    's-ii-nairobi-high-court': {
      id: 's-ii-nairobi-high-court',
      kind: 'statistic',
      claimText: '180+',
      sourceId: 'src-computer-weekly',
      verificationStatus: 'pending',
    },
    's-ii-teleperformance-colombia': {
      id: 's-ii-teleperformance-colombia',
      kind: 'statistic',
      claimText: '40,000',
      sourceId: 'src-computer-weekly',
      verificationStatus: 'pending',
    },
    's-ii-countermovement': {
      id: 's-ii-countermovement',
      kind: 'statistic',
      claimText: '2024–25',
      sourceId: 'src-time',
      verificationStatus: 'pending',
    },
    's-ii-eu-ai-act-in-force': {
      id: 's-ii-eu-ai-act-in-force',
      kind: 'statistic',
      claimText: 'Feb 2025',
      sourceId: 'src-secure-privacy',
      verificationStatus: 'pending',
    },
    's-ii-max-fine': {
      id: 's-ii-max-fine',
      kind: 'statistic',
      claimText: '€35M',
      verificationStatus: 'pending',
    },
    's-ii-high-risk-deadline': {
      id: 's-ii-high-risk-deadline',
      kind: 'statistic',
      claimText: 'Aug 2026',
      sourceId: 'src-dla-piper-iapp',
      verificationStatus: 'pending',
    },
    // ─── Citations ────────────────────────────────────────────
    'c-ii-introl-commonfund-2025': {
      id: 'c-ii-introl-commonfund-2025',
      kind: 'citation',
      claimText: '[Introl / Commonfund, 2025]',
      sourceId: 'src-introl-commonfund',
      verificationStatus: 'pending',
    },
    'c-ii-introl-dec-2025': {
      id: 'c-ii-introl-dec-2025',
      kind: 'citation',
      claimText: '[Introl, December 2025]',
      sourceId: 'src-introl-commonfund',
      verificationStatus: 'pending',
    },
    'c-ii-enkiai-commonfund-2025': {
      id: 'c-ii-enkiai-commonfund-2025',
      kind: 'citation',
      claimText: '[Enkiai / Commonfund, 2025]',
      sourceId: 'src-enkiai-commonfund',
      verificationStatus: 'pending',
    },
    'c-ii-ieee-spectrum-2024': {
      id: 'c-ii-ieee-spectrum-2024',
      kind: 'citation',
      claimText: '[IEEE Spectrum, 2024]',
      sourceId: 'src-ieee-spectrum',
      verificationStatus: 'pending',
    },
    'c-ii-commonfund-2025': {
      id: 'c-ii-commonfund-2025',
      kind: 'citation',
      claimText: '[Commonfund, 2025]',
      sourceId: 'src-enkiai-commonfund',
      verificationStatus: 'pending',
    },
    'c-ii-enkiai-2026': {
      id: 'c-ii-enkiai-2026',
      kind: 'citation',
      claimText: '[Enkiai, 2026]',
      sourceId: 'src-enkiai-commonfund',
      verificationStatus: 'pending',
    },
    'c-ii-sp-global-apr-2026': {
      id: 'c-ii-sp-global-apr-2026',
      kind: 'citation',
      claimText: '[S&P Global, April 2026]',
      sourceId: 'src-sp-global',
      verificationStatus: 'pending',
    },
    'c-ii-ttms-iea-2025': {
      id: 'c-ii-ttms-iea-2025',
      kind: 'citation',
      claimText: '[TTMS / IEA, 2025]',
      sourceId: 'src-ttms-iea',
      verificationStatus: 'pending',
    },
    'c-ii-fortune-mar-2026': {
      id: 'c-ii-fortune-mar-2026',
      kind: 'citation',
      claimText: '[Fortune, March 2026]',
      sourceId: 'src-fortune',
      verificationStatus: 'pending',
    },
    'c-ii-trellis-2025': {
      id: 'c-ii-trellis-2025',
      kind: 'citation',
      claimText: '[Trellis, 2025]',
      sourceId: 'src-trellis',
      verificationStatus: 'pending',
    },
    'c-ii-brookings-apr-2026': {
      id: 'c-ii-brookings-apr-2026',
      kind: 'citation',
      claimText: '[Brookings, April 2026]',
      sourceId: 'src-brookings',
      verificationStatus: 'pending',
    },
    'c-ii-sustainability-dcm-jul-2025': {
      id: 'c-ii-sustainability-dcm-jul-2025',
      kind: 'citation',
      claimText: '[Sustainability Magazine / Data Centre Magazine, July 2025]',
      sourceId: 'src-sustainability-magazine',
      verificationStatus: 'pending',
    },
    'c-ii-sustainability-mag-2025': {
      id: 'c-ii-sustainability-mag-2025',
      kind: 'citation',
      claimText: '[Sustainability Magazine, 2025]',
      sourceId: 'src-sustainability-magazine',
      verificationStatus: 'pending',
    },
    'c-ii-data-centre-magazine-2025': {
      id: 'c-ii-data-centre-magazine-2025',
      kind: 'citation',
      claimText: '[Data Centre Magazine, 2025]',
      sourceId: 'src-sustainability-magazine',
      verificationStatus: 'pending',
    },
    'c-ii-data-centre-magazine-2026': {
      id: 'c-ii-data-centre-magazine-2026',
      kind: 'citation',
      claimText: '[Data Centre Magazine, 2026]',
      sourceId: 'src-data-centre-magazine',
      verificationStatus: 'pending',
    },
    'c-ii-net-zero-insights-2025': {
      id: 'c-ii-net-zero-insights-2025',
      kind: 'citation',
      claimText: '[Net Zero Insights, 2025]',
      sourceId: 'src-net-zero-insights',
      verificationStatus: 'pending',
    },
    'c-ii-introl-2026': {
      id: 'c-ii-introl-2026',
      kind: 'citation',
      claimText: '[Introl, 2026]',
      sourceId: 'src-introl-2026',
      verificationStatus: 'pending',
    },
    'c-ii-nixon-peabody-sep-2025': {
      id: 'c-ii-nixon-peabody-sep-2025',
      kind: 'citation',
      claimText: '[Nixon Peabody, September 2025]',
      sourceId: 'src-nixon-peabody',
      verificationStatus: 'pending',
    },
    'c-ii-computer-weekly': {
      id: 'c-ii-computer-weekly',
      kind: 'citation',
      claimText: '[Computer Weekly]',
      sourceId: 'src-computer-weekly',
      verificationStatus: 'pending',
    },
    'c-ii-computer-weekly-feb-2025': {
      id: 'c-ii-computer-weekly-feb-2025',
      kind: 'citation',
      claimText: '[Computer Weekly, February 2025]',
      sourceId: 'src-computer-weekly',
      verificationStatus: 'pending',
    },
    'c-ii-time-dec-2024': {
      id: 'c-ii-time-dec-2024',
      kind: 'citation',
      claimText: '[TIME, December 2024]',
      sourceId: 'src-time',
      verificationStatus: 'pending',
    },
    'c-ii-classaction-mar-2026': {
      id: 'c-ii-classaction-mar-2026',
      kind: 'citation',
      claimText: '[ClassAction.org, March 2026]',
      sourceId: 'src-classaction',
      verificationStatus: 'pending',
    },
    'c-ii-somo-mar-2026': {
      id: 'c-ii-somo-mar-2026',
      kind: 'citation',
      claimText: '[SOMO, March 2026]',
      sourceId: 'src-somo',
      verificationStatus: 'pending',
    },
    'c-ii-stackcyber-2026': {
      id: 'c-ii-stackcyber-2026',
      kind: 'citation',
      claimText: '[StackCyber, 2026]',
      sourceId: 'src-stackcyber',
      verificationStatus: 'pending',
    },
    'c-ii-secure-privacy-2026': {
      id: 'c-ii-secure-privacy-2026',
      kind: 'citation',
      claimText: '[Secure Privacy / Legal Nodes, 2026]',
      sourceId: 'src-secure-privacy',
      verificationStatus: 'pending',
    },
    'c-ii-eu-ai-act-enforcement-2026': {
      id: 'c-ii-eu-ai-act-enforcement-2026',
      kind: 'citation',
      claimText: '[EU AI Act enforcement overview, 2026]',
      sourceId: 'src-secure-privacy',
      verificationStatus: 'pending',
    },
    'c-ii-dla-piper-genie-2026': {
      id: 'c-ii-dla-piper-genie-2026',
      kind: 'citation',
      claimText: '[DLA Piper GENIE / EU AI Act site, 2026]',
      sourceId: 'src-dla-piper-iapp',
      verificationStatus: 'pending',
    },
    'c-ii-iapp-may-2026': {
      id: 'c-ii-iapp-may-2026',
      kind: 'citation',
      claimText: '[IAPP, May 2026]',
      sourceId: 'src-dla-piper-iapp',
      verificationStatus: 'pending',
    },
    'c-ii-baker-botts-jan-2026': {
      id: 'c-ii-baker-botts-jan-2026',
      kind: 'citation',
      claimText: '[Baker Botts, January 2026]',
      sourceId: 'src-baker-botts-king-spalding',
      verificationStatus: 'pending',
    },
    'c-ii-troutman-pepper-2025': {
      id: 'c-ii-troutman-pepper-2025',
      kind: 'citation',
      claimText: '[Troutman Pepper, 2025]',
      verificationStatus: 'pending',
    },
    'c-ii-drata-baker-botts-2026': {
      id: 'c-ii-drata-baker-botts-2026',
      kind: 'citation',
      claimText: '[Drata / Baker Botts, 2026]',
      sourceId: 'src-baker-botts-king-spalding',
      verificationStatus: 'pending',
    },
    'c-ii-king-spalding-jan-2026': {
      id: 'c-ii-king-spalding-jan-2026',
      kind: 'citation',
      claimText: '[King & Spalding, January 2026]',
      sourceId: 'src-baker-botts-king-spalding',
      verificationStatus: 'pending',
    },
  },
}
