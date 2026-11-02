import type { RoundtableDocument } from '../../types/document'

export const partIV: RoundtableDocument = {
  id: 'part-iv',
  slug: 'the-race',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Incentives · Coordination · Governance · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: "The Race We're In", em: true }]],
    subtitle:
      "Three parts examined what AI costs, what's being done, and what it's getting right. This one asks the harder question: why does the race keep running, and what would it actually take to change the game?",
    dateLine: 'June 2026 · Fourth in the AI Reckoning series',
    accentColor: 'amber',
  },
  companion: {
    text: 'Part IV of the AI Reckoning Series: read alongside Parts I, II & III for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'No one started this race: it emerged from the oldest logic there is, the fear that stopping means losing. Once that calculus locks in, whether to run stops being the question; how fast becomes the only one. This conversation asks whether that logic is as unbreakable as it looks, and what it would cost to test it.',
      },
    ],
    [
      {
        type: 'text',
        value:
          "There's a name for this. Economists call it a prisoner's dilemma, strategists an arms race, historians simply what happens when a transformative technology outruns the institutions meant to govern it. Everyone at this table knows the name, knows the logic, and is running anyway. That might be the most honest thing any of them says.",
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
            race: 'Every major AI lab is racing to deploy more capable models faster than its competitors. Whoever ships first captures the talent, the investment, the customers, and the regulatory goodwill. The prize goes to the first mover; the costs (energy, labor, safety corners) are distributed across society.',
            trap: "Any lab that slows down unilaterally loses market share, talent, and funding to labs that don't. The game punishes caution as a private cost while spreading its benefits across the whole field. No single actor can stop the race by refusing to run it.",
            intervention:
              'A negotiated agreement (across labs, across governments) that changes the incentive itself. Not slower individual runners, but different rules for the track.',
          },
        },
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'AI patents granted',
                value: '122K+',
                size: 'large',
                description:
                  'Granted worldwide in 2023, up from 3,833 in 2010: a 32× increase in thirteen years',
                claimId: 's-iv-wipo-patents-2021',
              },
              {
                variant: 'neutral',
                labelTop: 'Held by China',
                value: '69.7%',
                size: 'medium',
                description: 'Share of all granted AI patents worldwide credited to China in 2023',
                claimId: 's-iv-wipo-countries',
              },
              {
                variant: 'caution',
                labelTop: 'Year-over-year growth',
                value: '29.6%',
                size: 'medium',
                description: 'Growth in granted AI patents worldwide from 2022 to 2023',
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
                      "I've sat through three of these now: the power bills, the water, the workers in Kenya, the laws. Everyone keeps calling it a race. Who decided we're in one? Because from my kitchen table it looks like nobody chose it, and somehow that's worse.",
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
                      "Nobody did, and you've just put your finger on why it's so hard to stop. Charlie Munger had a line: \"Show me the incentives and I'll show you the outcome.\" Investment, talent, users, a friendly regulator: each lab chases them for reasons that make sense on their own, and together they produce a pace no one picked.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Nobody has to be a villain for this to happen. Whoever slows down alone pays the whole price, and everyone else collects the benefit of their restraint.',
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
                      "Careful, though. That same race gave us AlphaFold, the MRSA antibiotic candidates, the diagnostic tools from our conversation about medicine. None of that happens at the pace of the slowest lab. I've watched good work get finished in weeks instead of quarters because a competitor was about to ship.",
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
                      "Fair, and I'll take that. So the job isn't stopping the race; it's sorting the parts worth running from the parts that hurt everyone. The ozone hole didn't come from companies trying to wreck the sky. It came from companies competing to make refrigerants cheaply. The Montreal Protocol didn't shut that industry down. It pointed the competition at substitutes.",
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
                      "I remember that one. The spray cans changed when I was a young woman, and a few years later I was teaching my class about the hole in the ozone. Nobody missed the old hairspray. So what's the hairspray here? What would you actually swap out?",
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
                      "That's exactly where the analogy strains. Montreal worked on a narrow target: named chemicals, a depletion you could measure, substitutes already in the lab. With AI there's no single molecule to swap. Do we restrict compute? Deployment speed? Particular uses? The harder a problem is to define, the harder it is to write into a treaty.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'comparison',
            labelTop: 'AI Patents · Stanford AI Index',
            title: 'The Race in Numbers: AI Patents Granted Worldwide',
            subtitle: 'Granted AI patents rose from 3,833 in 2010 to 122,511 in 2023.',
            source: 'Stanford HAI: AI Index Report 2025, Research and Development',
            claimIds: ['c-iv-wipo-patents'],
            ariaLabel:
              'Comparison chart showing granted AI patents worldwide rising from 3,833 in 2010 to 122,511 in 2023',
            unit: 'K',
            variant: 'accent',
            deltaLabel: '×32',
            data: [
              { label: '2010', value: 3.8 },
              { label: '2023', value: 122.5 },
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
                      "I've spent a career fighting for environmental rules, and the Protocol is the one everyone cites, so let's be precise about why it held. Three things were true at once. Scientists agreed on what was happening; the ozone hole wasn't politically contested. Governments agreed the harm was real and crossed borders. And industry had workable alternatives inside the regulatory window. How many of those hold for AI?",
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
                      "The first holds better than critics admit. Inside the labs, the researchers building these systems keep reporting that they carry serious risks. Whatever you make of those assessments, that's closer to the early ozone fights (contested politically, much less so technically) than to a genuine scientific split.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "But nuclear is the better precedent, because the danger there was about power, not chemistry. The Non-Proliferation Treaty didn't abolish physics. It built a way to check: inspectors from the International Atomic Energy Agency, declared stockpiles, monitored facilities. You don't need to trust a rival's intentions if you can verify what it's doing.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'JFK predicted in 1963 that there would be 15 to 25 nuclear states by 1975.',
                  },
                  {
                    type: 'cite',
                    claimId: 'c-iv-jfk-prediction',
                  },
                  {
                    type: 'text',
                    value:
                      ' There are nine today, after more than fifty years of proliferation risk. Coordination held.',
                  },
                  {
                    type: 'cite',
                    claimId: 'c-iv-nuclear-states-2024',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Tim Fist and Janet Egan make the modern version of this case: the US and China could agree on a narrow set of AI red lines (bioweapons assistance, offensive cyber, recursive self-improvement), but only if verification technology makes compliance checkable, the way it was for nuclear material.',
                  },
                  {
                    type: 'cite',
                    claimId: 'c-iv-ai-red-lines',
                  },
                  {
                    type: 'text',
                    value:
                      ' The obstacle was never political will alone. It was building the instruments that let adversaries trust each other without having to.',
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
                      "That's one of three, and I'll grant it. The second I'd give you half: governments agree the harm crosses borders, but not on which harm, and the two biggest players each think they're winning. The third worries me most. With ozone, the substitute was a different chemical. Nobody at this table has named what the safer substitute product even is.",
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
                      "And both of your precedents were deals between governments over technology a handful of states controlled. AI isn't built like that. It's global, it's spread out, and more of it is open-source every month. You can't sign a treaty with Hugging Face. You can't inspect a model somebody trained on a cluster in their garage.",
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
                      "That's true of the long tail, and the tail is a real problem. But the harms we worry about most (systems acting autonomously at scale, help with biological weapons, attacks on infrastructure) take enormous compute. Compute is physical. It's made in a handful of fabs and shipped across borders. You can track it. Hard to verify is not the same as impossible.",
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
                      "And we're not starting from zero. At Bletchley Park in November 2023, 28 countries, including the US and China, signed a declaration that frontier AI carries serious risks.",
                  },
                  {
                    type: 'cite',
                    claimId: 'c-iv-bletchley-countries',
                  },
                  {
                    type: 'text',
                    value:
                      " As far as I know, that's the first international statement on AI risk both of them have put their names to.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Six months later, at the Seoul summit, the labs themselves committed to publishing the risk thresholds at which they'd stop. None of it is binding, I know. But that's how treaties usually start: with the parties agreeing on what they're afraid of.",
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
            source: 'UNEP Ozone Secretariat: Ozone Depleting Substances Data',
            claimIds: ['c-iv-montreal-ods'],
            ariaLabel:
              'Line chart showing ozone-depleting substance consumption declining from 1100 thousand ODP-tonnes in 1989 to near-zero by 2020 following the Montreal Protocol',
            unit: 'kt ODP',
            variant: 'environ',
            annotations: [{ at: '2020', text: 'Near-elimination' }],
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
              'JFK predicted 15–25 nuclear states by 1975. The NPT (1968) and IAEA inspection regime held the number to nine: a coordination success sustained for over fifty years.',
            source: 'Federation of American Scientists: Status of World Nuclear Forces',
            claimIds: ['c-iv-nuclear-states-history'],
            ariaLabel:
              'Bar chart showing nuclear-armed states growing slowly from 1 in 1945 to 9 in 2024, far below early predictions of 25 states',
            unit: 'states',
            variant: 'navy',
            reference: { value: 15, label: "JFK's 1963 low-end prediction" },
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
            race: 'Governments are also in a race: to be first to regulate in a way that attracts AI investment rather than driving it to lower-regulation jurisdictions. The result is a competition to maintain the appearance of governance while preserving the conditions for rapid development.',
            trap: 'Any jurisdiction that imposes genuinely binding constraints risks capital flight and talent migration to permissive competitors. The race-to-the-bottom logic applies to regulators too, not just companies.',
            intervention:
              "Mutual recognition agreements between jurisdictions, so that compliance with one credible regime counts elsewhere. This removes the arbitrage incentive: there's no lower-standard jurisdiction to flee to.",
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
                      "Here's what I'd watch more closely than voluntary versus binding: where the power ends up. There are two ways this goes badly, not one. One is chaos: ever more capable systems spreading with nobody accountable and anyone able to get anything. The other is lock-in: a few companies or governments using AI to hold power nobody can take back. Lean too hard against the first and you slide into the second. The goal isn't more regulation or less. It's what I'd call the narrow path: power matched with responsibility at every level.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "We've done this before. Nuclear energy comes with the IAEA. Banks come with capital requirements and deposit insurance. When a technology hands someone outsized power, accountability has to grow with it, not disappear and not stop the technology.",
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
                      'With respect, voluntary versus binding is most of it, because only one of them can be enforced. The EU AI Act is the first attempt to do this at scale. It sorts systems by risk: low-risk applications face minimal requirements, high-risk ones face conformity assessments and third-party audits, and a few (social scoring by public authorities, real-time biometric surveillance in public spaces) are banned outright.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value: 'The Act entered into force on 1 August 2024.',
                  },
                  {
                    type: 'cite',
                    claimId: 'c-iv-eu-ai-act',
                  },
                  {
                    type: 'text',
                    value:
                      " Most of its obligations apply from 2026, if Brussels doesn't push the high-risk deadline back, which it's now debating. It covers any company deploying AI in the EU, wherever the system was built, and that reach is what gives it teeth. It's imperfect: what counts as \"high risk\" is contested, and national regulators' capacity to enforce it is uneven. But it's a legal floor, and a floor is more than a declaration.",
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
                      'My own lab was among the companies that signed the White House voluntary commitments in July 2023.',
                  },
                  {
                    type: 'cite',
                    claimId: 'c-iv-white-house-commitments',
                  },
                  {
                    type: 'text',
                    value:
                      " Red-team new systems before release, share safety information with governments and with each other, invest in cybersecurity and insider-threat safeguards. I've sat in those red-team reviews. They're real work, not a press release.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "What I can't tell you is what happens the week a competitor is about to launch and our review isn't finished. Nothing in the commitments answers that.",
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
                      "Then read me the line about the workers. There isn't one. We've spent three conversations on the people labeling data and moderating content, mostly in the Global South, doing traumatic work for wages that don't reflect what they produce. Red-teaming, security, information sharing: the commitments protect the model. They say nothing about the people who made it.",
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
                      "You're right. It isn't in there, and I can't remember anyone in those rooms asking why.",
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
                      "Here's what I keep coming back to. When the ozone hole was in the news, people like me knew what a spray can was, and we could stop buying one. I can't stop buying this. It's already in my phone whether I asked for it or not. So what does someone like me actually do?",
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
                      "On your own? Not much, and I won't pretend otherwise. But the ozone fight wasn't won at the checkout either. It was won when enough people understood the problem that governments had to act. The atmospheric test ban came the same way: citizens in many countries, not just experts, learned what above-ground testing was doing to the air and the water, and insisted their governments stop.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The choices about how AI is built and who controls it are political choices, even when they're made in labs and boardrooms instead of town squares. That hides the public. It doesn't remove you. You're a stakeholder.",
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
                      "In my teaching years, whenever someone from the district called me a stakeholder, the decision had usually already been made. I'd like to be wrong about this one.",
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
              'Labs signing voluntary AI safety commitments grew from 7 at the White House (July 2023) to 16 signing the Frontier AI Safety Commitments at Seoul (May 2024).',
            source:
              'White House Fact Sheet July 2023; UK Government Frontier AI Safety Commitments, AI Seoul Summit May 2024',
            claimIds: ['c-iv-safety-commitments'],
            ariaLabel:
              'Horizontal bar chart showing AI companies signing safety commitments: 7 at the White House in July 2023 and 16 at Seoul in May 2024',
            unit: 'labs',
            variant: 'gold',
            annotations: [
              {
                at: 'Seoul\nMay 2024',
                text: '28 countries signed at Bletchley',
              },
            ],
            data: [
              { label: 'White House\nJul 2023', value: 7 },
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
            'The race is real. The harms documented across this series are not accidents: they are the predictable output of incentive structures that no individual actor designed and no single actor can unilaterally change. The Tech Optimist is right that the race has produced genuine breakthroughs. The Environmentalist is right that it is also consuming water and energy at a pace no planetary accounting would endorse. The Labor Advocate is right that its supply chains rest on invisible, undervalued human work. The Policy Realist is right that binding rules with real enforcement are the only durable answer.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'History offers cautious grounds for hope. Humanity has successfully coordinated against races that felt inevitable: ozone depletion, nuclear proliferation, chemical weapons, germline editing. None of those agreements were easy or complete. All of them were imperfect. Most of them are still under pressure. But they demonstrate that the coordination problem is not insoluble, only hard.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'The narrow path (where power is matched with responsibility, where no single actor accumulates unchecked capability, where verification makes trust possible) is not a utopia. It is simply the alternative to the two dystopias on either side. Getting there requires the same thing it has always required: enough people, across enough institutions, deciding that the race is not worth running without rules.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-ai-index-patents',
      url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development',
      title: 'Stanford HAI: AI Index Report 2025, Research and Development',
      description:
        'Tracks granted AI patents worldwide: 3,833 in 2010 rising to 122,511 in 2023, up 29.6% year over year, with China credited with 69.7% of all grants.',
    },
    {
      id: 'src-wipo-ai',
      title: 'WIPO Technology Trends: Artificial Intelligence (2023)',
      description:
        'World Intellectual Property Organization report tracking global AI patent filings by year, country, and technology domain.',
      url: 'https://www.wipo.int/en/web/artificial-intelligence/ai-and-ip-data',
    },
    {
      id: 'src-unep-ozone',
      title: 'UNEP Ozone Secretariat: ODS Data (2024)',
      description:
        'United Nations Environment Programme data on ozone-depleting substance consumption under the Montreal Protocol.',
      url: 'https://ozone.unep.org/',
    },
    {
      id: 'src-fas-nuclear',
      title: 'Federation of American Scientists: Status of World Nuclear Forces',
      description:
        'FAS tracker of nuclear-armed states, warhead counts, and proliferation history from 1945 to present.',
      url: 'https://fas.org/initiative/status-world-nuclear-forces/',
    },
    {
      id: 'src-bletchley',
      title: 'UK Government: Bletchley Declaration (November 2023)',
      description:
        'Text of and signatories to the Bletchley Declaration on AI Safety, signed at the UK AI Safety Summit by 28 countries.',
      url: 'https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration/',
    },
    {
      id: 'src-white-house-ai',
      title: 'White House: Voluntary AI Commitments (July 2023)',
      description:
        'White House fact sheet on voluntary commitments by leading AI companies to manage AI safety risks.',
      url: 'https://www.whitehouse.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/',
    },
    {
      id: 'src-eu-ai-act',
      title: 'EU AI Act: Official Journal of the European Union (2024)',
      description:
        'Regulation (EU) 2024/1689 of the European Parliament: the first comprehensive binding AI regulatory framework, in force 1 August 2024.',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689',
    },
    {
      id: 'src-seoul-summit',
      title: 'Seoul AI Safety Summit: Ministerial Statement (May 2024)',
      description:
        'Ministerial statement from the Seoul AI Safety Summit on international cooperation on AI safety and frontier AI governance.',
      url: 'https://www.gov.uk/government/publications/seoul-ministerial-statement-for-advancing-ai-safety-international-collaboration-and-capacity-building',
    },
    {
      id: 'src-yua-treaties',
      title: 'Your Undivided Attention: "We Need AI Treaties" (June 2026)',
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
      claimText: '122K+',
      sourceId: 'src-ai-index-patents',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development',
      note: 'Re-sourced and restated. The previous 71,423 applications for 2021 could not be corroborated: the cited WIPO page 404s and the report title it named does not exist. The figure now used is the Stanford AI Index 2025 series for granted AI patents worldwide, 3,833 in 2010 rising to 122,511 in 2023.',
      lastCheckedISO: '2026-08-22',
    },
    's-iv-wipo-countries': {
      id: 's-iv-wipo-countries',
      kind: 'statistic',
      claimText: '69.7%',
      sourceId: 'src-ai-index-patents',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development',
      note: 'The unverifiable "167 countries tracked" figure was replaced with a sourceable measure of the same race: China accounted for 69.7% of all granted AI patents worldwide in 2023, per the Stanford AI Index 2025.',
      lastCheckedISO: '2026-08-22',
    },
    's-iv-wipo-growth-rate': {
      id: 's-iv-wipo-growth-rate',
      kind: 'statistic',
      claimText: '29.6%',
      sourceId: 'src-ai-index-patents',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development',
      note: 'The unsubstantiated ~20% CAGR for 2013 to 2021 was replaced with the published year-over-year figure: granted AI patents worldwide rose 29.6% from 2022 to 2023, per the Stanford AI Index 2025.',
      lastCheckedISO: '2026-08-22',
    },

    // ── Chart claims ────────────────────────────────────────────────────
    'c-iv-wipo-patents': {
      id: 'c-iv-wipo-patents',
      kind: 'citation',
      claimText: 'Granted AI patents worldwide, 2010 and 2023',
      sourceId: 'src-ai-index-patents',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://hai.stanford.edu/ai-index/2025-ai-index-report/research-and-development',
      note: 'The unlocatable WIPO 2015 to 2021 series was replaced with the two published endpoints from the Stanford AI Index 2025: 3,833 granted AI patents in 2010 and 122,511 in 2023. The chart is now a two-point comparison rather than an interpolated series, so no intermediate year is asserted beyond what the source states.',
      lastCheckedISO: '2026-08-22',
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
      claimText: 'AI labs signing voluntary safety commitments, 2023-2024',
      sourceId: 'src-white-house-ai',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024',
      note: 'Corrected. The White House figure (7 companies, July 2023) was right, but the middle data point was misattributed: 16 firms signed the Frontier AI Safety Commitments at the Seoul summit in May 2024, not at Bletchley in November 2023. The Bletchley bar has been removed and the 28-country Declaration now appears as an annotation, so the 7 to 16 growth is shown against the correct venues.',
      lastCheckedISO: '2026-08-22',
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
      note: 'YUA Ep. 136 (18 June 2026): Tim Fist (Institute for Progress) and Janet Egan (CNAS) argue that enforceable AI agreements on red lines (bioweapons, offensive cyber, recursive self-improvement) require verification technology, drawing the explicit parallel to ~60 years of nuclear arms-control verification (warhead, enrichment, and civilian-vs-weapons verification). The episode names verification, not political will alone, as the central obstacle.',
      lastCheckedISO: '2026-06-29',
    },
  },
}
