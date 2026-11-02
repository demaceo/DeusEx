import type { RoundtableDocument } from '../../types/document'

export const partXI: RoundtableDocument = {
  id: 'part-xi',
  slug: 'the-ground-it-comes-from',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Extraction · Minerals · Environmental Justice · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'The Ground It Comes From', em: true }]],
    subtitle:
      'Part I weighed the energy and water AI consumes. This part follows the wire back further: to the mines, the refineries, and the scrap heaps, and to the communities whose land and bodies are spent to build the hardware that thinks.',
    dateLine: 'June 2026 · Eleventh in the AI Reckoning series',
    accentColor: 'umber',
  },
  companion: {
    text: 'Part XI of the AI Reckoning Series. Read alongside Parts I–X for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'Before the electricity, before the server, before the chip, there is the mine: the refinery, the hand doing the separating, the lung filling with dust. The intelligence that arrives cleanly through a browser was built from the earth up. This conversation follows the wire back to its source, and asks what got left behind.',
      },
    ],
    [
      {
        type: 'text',
        value:
          'The Land Defender anchors this conversation. She lives where the minerals come from and speaks first-hand for the communities whose water, soil, and labor build these machines, and who see the least of what they produce. It’s the oldest question in environmental justice, in a new form: who bears the cost, and who gets to use what it built?',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — The Mine
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'The Mine' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'Cobalt supply',
                value: '70%',
                size: 'large',
                description:
                  "Share of the world's mined cobalt that comes from the Democratic Republic of the Congo (USGS)",
                claimId: 's-xi-cobalt',
              },
              {
                variant: 'teal',
                labelTop: 'Water per tonne',
                value: '~2M L',
                size: 'medium',
                description:
                  'Approximate water used to produce one tonne of lithium from brine, often in arid Indigenous regions',
                claimId: 's-xi-lithium-water',
              },
              {
                variant: 'caution',
                labelTop: 'E-waste, 2022',
                value: '62 Mt',
                size: 'medium',
                description:
                  'Electronic waste generated worldwide in 2022, only ~22% formally recycled (UN, 2024)',
                claimId: 's-xi-ewaste',
              },
            ],
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "You talk about the cloud as if it floats. It does not. It begins in a hole in the ground near where people live. The Democratic Republic of the Congo supplies roughly 70% of the world's cobalt, the metal in the batteries that back up your data centers and power your devices.",
                  },
                  { type: 'cite', claimId: 'c-xi-cobalt' },
                  {
                    type: 'text',
                    value:
                      ' Some of it is dug by hand, in unregulated pits. UNICEF estimated some 40,000 children were working in mines across the southern DRC. We know their families. They are the first link in your supply chain.',
                  },
                  { type: 'cite', claimId: 'c-xi-child-labor' },
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
                      "The very first time we sat down, I asked if I was part of the problem just by asking my phone questions. I thought the answer was going to be my electric bill. I never pictured a child with a shovel at the far end of it. The screen's so clean. But that number sounds like something from an old documentary. Is it still happening?",
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
                      "The estimate's old. The practice isn't. And it's the same shape we found with the data workers in Kenya: the value dug out in the Global South, the profit booked in the North, and the people doing the work nowhere near the room where the price gets set. Lithium's the other half. Pulling it from brine in the Atacama and basins like it can take on the order of two million liters of water per tonne, in some of the driest places people live, where that water belongs to Indigenous communities and the ecosystems they depend on.",
                  },
                  { type: 'cite', claimId: 'c-xi-lithium-water' },
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
                      "None of that's acceptable. It isn't unique to AI either: phones, electric cars, the whole energy transition pull on the same mines. But it's fixable, and some of the fix is already shipping. There are battery chemistries in production that cut cobalt out entirely, and buyers are starting to demand audited, traceable supply. The demand's the problem, sure. It's also the lever. It's big enough to force the supply chain to change.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'A lever needs a hand on it. Whose? An auditor visits a mine for a day. We live beside it every day after. So we do not wait for the auditor. We hold our own assemblies before anyone from outside arrives, and when they come, they hear what we decided. It is not always one answer. But it is ours.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'waffle',
            labelTop: 'Cobalt · USGS',
            title: 'Where the Cobalt Comes From',
            subtitle:
              "The Democratic Republic of the Congo, a single country at the base of the global battery supply chain, accounts for roughly 70% of the world's mined cobalt, with USGS estimates ranging from 68% to 74% year to year.",
            source: 'US Geological Survey: Mineral Commodity Summaries (Cobalt)',
            claimIds: ['c-xi-cobalt'],
            ariaLabel:
              'Grid of 100 cells showing the Democratic Republic of the Congo supplying about 70 of every 100 units of mined cobalt and the rest of the world about 30',
            unit: '%',
            data: [
              { label: 'DR Congo', value: 70, variant: 'accent' },
              { label: 'Rest of world', value: 30, variant: 'navy' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — The Refinery
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'The Refinery' },
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
                      "Follow the ore one step further. Mining's the first chokepoint; processing is the second, and it's tighter. China refines roughly 90% of the world's rare-earth elements: the materials in the high-performance magnets and components inside this hardware.",
                  },
                  { type: 'cite', claimId: 'c-xi-rare-earth' },
                  {
                    type: 'text',
                    value:
                      " It's the mirror image of the chip chokepoint we talked about with the fabs. There, the leverage sat in the most advanced, highest-margin step. Here it sits in the dirtiest, lowest-margin one, the step everyone else was happy to hand away.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Happy is the wrong word. Ask why one country ended up with nearly all of it. It is not only cheaper labor. It is a willingness to absorb the poison. Rare-earth refining leaves acidic, sometimes radioactive tailings. The places that host it, and the mines that feed it, carry that in their water and soil for generations. "Cheap processing" is a price. Someone pays it. Not the person buying the phone.',
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
                      "And that concentration is why a dozen governments are now paying for alternatives: new refineries with modern environmental controls, and a real push into recycling so the toxic part is contained instead of dumped. It's early and it's expensive. But for once the strategic incentive and the environmental one point the same way. A cleaner, more spread-out supply chain is buildable. It just was never the cheapest option, so nobody built it.",
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
                      "Two corrections, one in each direction. AI is a small slice of total demand for most of these minerals; batteries and electrification dwarf it, so pinning this on the data center is too neat. And I've been hearing 'clean, distributed supply chain, real soon' for two decades. I've got a whole file of press releases that say so. I'll believe the refinery when I can drive past it.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Small to you. The pit does not know which customer the cobalt is for. A small slice of a deep hole is still dug in our ground.',
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
            labelTop: 'Rare Earths · Processing',
            title: 'Who Refines the Materials',
            subtitle:
              'China accounts for roughly 90% of global rare-earth processing, versus about 60% of mining: refining is the concentrated, toxic middle of the hardware supply chain.',
            source: 'International Energy Agency: critical minerals analysis',
            claimIds: ['c-xi-rare-earth'],
            ariaLabel:
              "Donut chart showing China processing about 90 percent of the world's rare-earth elements and the rest of the world about 10 percent",
            unit: '%',
            data: [
              { label: 'China', value: 90, variant: 'accent' },
              { label: 'Rest of world', value: 10, variant: 'navy' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — The Discard
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'The Discard' },
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
                      "We've been at the front of the pipe. Look at the other end, because that's where it really breaks. The world generated about 62 million tonnes of electronic waste in 2022, and only around 22% of it was formally collected and recycled.",
                  },
                  { type: 'cite', claimId: 'c-xi-ewaste' },
                  {
                    type: 'text',
                    value:
                      " The rest gets landfilled, incinerated, or shipped to informal scrapyards in the Global South, where people, often children again, burn circuit boards over open fires for traces of metal and breathe the smoke. We tear the minerals out of one community's ground and dump them on another's. And AI's refresh cycle, all those accelerators retired for the next generation, only speeds it up.",
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
                      "There's law reaching for this. Extended-producer-responsibility rules make manufacturers pay for end-of-life handling. The EU's right-to-repair and ecodesign rules go after disposability itself. The Basel Convention restricts shipping hazardous e-waste to poorer countries. That's what's on paper. Enforcement is thinner, especially at the ports. Still, the direction is correct: make the producer own the whole lifecycle.",
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
                      "And the recycling number's barely moved in years while the pile grows. I'm not against the laws. I'm against mistaking a regulation for an outcome. Until recycling a server costs less than mining a fresh one, the economics will keep choosing the mine and the landfill.",
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
                      "I've got a drawer full of old phones and chargers right now. The ones I did hand in, I assumed somebody was taking care of. Now \"recycled\" might mean a child breathing smoke on the other side of the world. So here's what I've decided. Before anything else leaves that drawer, I'm calling the company that made it and asking where it actually goes. If nobody can tell me, it stays put. I know that doesn't fix the price. But I'm done handing things over on trust, and I'm not carrying the guilt for a system nobody asked me about.",
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
            labelTop: 'E-Waste · UN Global E-waste Monitor',
            title: 'Generated vs Recycled',
            subtitle:
              'Of the 62 million tonnes of e-waste generated in 2022, only about 13.8 million tonnes (roughly 22%) was formally collected and recycled.',
            source: 'UN: Global E-waste Monitor 2024',
            claimIds: ['c-xi-ewaste'],
            ariaLabel:
              'Bar chart showing 62 million tonnes of e-waste generated in 2022 versus about 13.8 million tonnes formally recycled',
            unit: 'Mt',
            variant: 'labor',
            annotations: [
              { at: 'Generated', text: 'Up from 44 Mt in 2014, projected 82 Mt by 2030' },
            ],
            data: [
              { label: 'Generated', value: 62, variant: 'accent' },
              { label: 'Recycled', value: 13.8, variant: 'optimist' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND IV — Closing the Loop
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'Closing the Loop' },
      stanceOverride: { economist: 'optimist' },
      dividerBefore: true,
      blocks: [
        {
          type: 'incentiveAudit',
          data: {
            race: 'Every buyer wants the cheapest hardware and the newest capability; every producer wants the cheapest inputs and the fastest refresh cycle. Mining virgin material and discarding old devices is cheaper, today, than recovering and reusing them, so the market races toward extraction and disposal.',
            trap: 'No single manufacturer can unilaterally absorb the cost of clean, traceable, recycled supply chains without being undercut by one that does not. The damage lands on distant communities and future device-owners who are not at the negotiating table, so it never shows up on the price tag.',
            intervention:
              'Make the producer own the full lifecycle: extended producer responsibility, right-to-repair and longevity mandates, recycled-content requirements, and binding traceability, so the cost of the harm is priced into the product instead of exported to the mine and the scrapyard.',
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
                      "The Skeptic's put the problem in one line: the loop stays open because fresh extraction is underpriced. The price of new cobalt doesn't include the poisoned watershed or the child in the pit. Those costs land on people with no claim on the boardroom. So this isn't mainly a technology problem; it's a pricing problem. Put the real cost of extraction and disposal back on the product, and recycling and longevity become the cheap option.",
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
                      "And when the price moves, the engineering's ready. Urban mining, pulling metals back out of discarded electronics, already yields far higher concentrations of some metals per tonne than ore does. Hardware built to last and to be repaired is a design choice, not a research problem. What I'm less sure of than I used to be is that anyone corrects the price voluntarily. I've sat in enough planning meetings to know nobody volunteers to pay more for the same chip.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Then here is what we are asking for. It is not pity. It is a seat and a share. Free, prior, and informed consent before a mine opens on our land. A real cut of the value, not a road and a promise. Cleanup that is funded before the first shovel, not after the company leaves.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'We did not write that list in one evening. We argued it in assemblies, and we did not all agree. Some of our neighbors want the mine jobs. They are not wrong to want wages. But a job offer is not the same as asking us. We are not against the future being built. We are against it being built out of us, for someone else.',
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
                      "We've landed on some version of your list in nearly every conversation: give the people who carry the cost a say and a share. I still think that's right. But I've been picturing consent as a switch somebody flips. What you're describing is a room full of neighbors who disagree, and a buyer who only has to find the half that says yes.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Yes. That is why we made a rule. No one signs for the village alone. When a company comes with papers for one family, we send it back to the assembly. Some still sign. The ones who lose the vote are still our neighbors in the morning.',
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
                      "You know what gets me? You've got a whole assembly about the mine. Nobody at my end has ever been asked a thing. The phone just shows up in the store. If I wanted to say no to any of this, I wouldn't even know who to say it to.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'land-defender',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Start with your drawer. You will call and ask where the phones go. Ask also where they came from. We have been waiting a long time for someone at your end to ask that.',
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
            band: true,
            labelTop: 'E-Waste · Trajectory',
            title: 'The Pile Keeps Growing',
            subtitle:
              'Global e-waste rose from about 44 million tonnes in 2014 to 62 million in 2022, and is projected to reach roughly 82 million tonnes by 2030, far faster than recycling is scaling.',
            source: 'UN: Global E-waste Monitor 2024',
            claimIds: ['c-xi-ewaste-trend'],
            ariaLabel:
              'Line chart showing global e-waste rising from about 44 million tonnes in 2014 to 62 million in 2022 and a projected 82 million tonnes by 2030',
            unit: 'Mt',
            variant: 'navy',
            reference: { value: 13.8, label: 'Recycled' },
            annotations: [{ at: '2022', text: 'Only ~22% recycled' }],
            data: [
              { label: '2014', value: 44 },
              { label: '2019', value: 54 },
              { label: '2022', value: 62 },
              { label: '2030', value: 82, projected: true },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'The Footprint',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            "The machine that thinks is made of the earth and of other people's labor, and the bill for both is paid a long way from the screen. The Land Defender is right that the cloud begins in a pit and ends in a scrapyard, with real communities at both ends. The Economist is right that the loop stays open because extraction is underpriced and its harms are externalized. The Tech Optimist is right that cleaner extraction, longer-lived hardware, and urban mining are buildable. And the Skeptic is right that none of it happens until recovering a material costs less than tearing a fresh one out of the ground.",
        },
      ],
      [
        {
          type: 'text',
          value:
            'The repair is the same one every part of this series has arrived at, made physical: price the true cost, make the producer own the full lifecycle, and give the people whose land and bodies sit at the base of the supply chain consent, a share, and the power to refuse. A circular, accountable hardware economy is not a fantasy. It is simply the more expensive, fairer architecture: chosen, or not.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'And so the reckoning comes to rest on solid ground. Across eleven parts the costs proved real, the responses partial, the benefits genuine, the race relentless, the truth contested, the tail risk irreversible, the intimacy double-edged, the ownership concentrated, the culture taken, the prejudice inherited, and the footprint borne by those who chose none of it. The technology will keep advancing. Whether it is built out of people and the planet, or with them, is what it has always been: a decision, and the decision is still ours to make.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-usgs-cobalt',
      title: 'US Geological Survey, Mineral Commodity Summaries: Cobalt',
      description:
        "USGS data on global cobalt mine production, showing the Democratic Republic of the Congo as the source of roughly 70% of the world's mined cobalt.",
      url: 'https://www.usgs.gov/centers/national-minerals-information-center/cobalt-statistics-and-information',
    },
    {
      id: 'src-unicef-cobalt',
      title: 'UNICEF / Amnesty International: Child labour in DRC cobalt mining',
      description:
        'Reporting estimating that tens of thousands of children (UNICEF: ~40,000) worked in artisanal mines across the southern DRC, including cobalt operations.',
      url: 'https://www.unicef.org/drcongo/en',
    },
    {
      id: 'src-iea-minerals',
      title: 'IEA: Critical Minerals and Clean Energy Transitions',
      description:
        'International Energy Agency analysis of mineral supply chains, including the concentration of rare-earth processing (~90% in China) and water use in lithium extraction.',
      url: 'https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions',
    },
    {
      id: 'src-nrdc-lithium',
      url: 'https://www.nrdc.org/bio/amanda-maxwell/lithium-mining-must-not-dry-atacama-desert',
      title: 'NRDC: Lithium Mining Must Not Dry Out the Atacama Desert',
      description:
        'Reports the widely cited estimate, attributed to Dr. Ingrid Garces of the University of Antofagasta, of roughly 2 million litres of water consumed per tonne of lithium produced from brine.',
    },
    {
      id: 'src-un-ewaste',
      title: 'UN: Global E-waste Monitor 2024',
      description:
        'UNITAR/ITU report: 62 million tonnes of e-waste generated in 2022 (only ~22% formally recycled), rising from ~44 Mt in 2014 toward a projected 82 Mt by 2030.',
      url: 'https://ewastemonitor.info/',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-xi-cobalt': {
      id: 's-xi-cobalt',
      kind: 'statistic',
      claimText: '70%',
      sourceId: 'src-usgs-cobalt',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.usgs.gov/centers/national-minerals-information-center/cobalt-statistics-and-information',
      note: 'USGS Mineral Commodity Summaries report the DRC as the source of roughly 70% of world mined cobalt in recent years (share varies year to year, ~68–74%).',
      lastCheckedISO: '2026-06-27',
    },
    's-xi-lithium-water': {
      id: 's-xi-lithium-water',
      kind: 'statistic',
      claimText: '~2M L',
      sourceId: 'src-nrdc-lithium',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.nrdc.org/bio/amanda-maxwell/lithium-mining-must-not-dry-atacama-desert',
      note: 'Figure retained and re-attributed. The roughly 2 million litres per tonne estimate for brine lithium is credible and widely cited, but it does not come from the IEA critical minerals report it was previously credited to; it traces to Dr. Ingrid Garces of the University of Antofagasta, reported via NRDC. Source corrected.',
      lastCheckedISO: '2026-08-22',
    },
    's-xi-ewaste': {
      id: 's-xi-ewaste',
      kind: 'statistic',
      claimText: '62 Mt',
      sourceId: 'src-un-ewaste',
      verificationStatus: 'verified',
      verifiedUrl: 'https://ewastemonitor.info/',
      note: 'UN Global E-waste Monitor 2024: 62 million tonnes of e-waste generated in 2022, of which ~22.3% (about 13.8 Mt) was formally collected and recycled.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Chart / inline citation claims ──────────────────────────────────
    'c-xi-cobalt': {
      id: 'c-xi-cobalt',
      kind: 'citation',
      claimText: "DRC supplies ~70% of the world's mined cobalt (USGS)",
      sourceId: 'src-usgs-cobalt',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.usgs.gov/centers/national-minerals-information-center/cobalt-statistics-and-information',
      note: 'USGS: the DRC accounts for roughly 70% of global mined cobalt. Waffle shown as 70/30.',
      lastCheckedISO: '2026-06-27',
    },
    'c-xi-child-labor': {
      id: 'c-xi-child-labor',
      kind: 'citation',
      claimText: 'UNICEF estimated ~40,000 children working in southern DRC mines',
      sourceId: 'src-unicef-cobalt',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.unicef.org/drcongo/en',
      note: 'UNICEF estimated around 40,000 children worked in mines across the southern DRC (figure widely cited from ~2014, including in Amnesty International reporting on cobalt). A share of DRC cobalt comes from artisanal mining where child labour occurs.',
      lastCheckedISO: '2026-06-27',
    },
    'c-xi-lithium-water': {
      id: 'c-xi-lithium-water',
      kind: 'citation',
      claimText: '~2 million litres of water per tonne of lithium (brine)',
      sourceId: 'src-nrdc-lithium',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.nrdc.org/bio/amanda-maxwell/lithium-mining-must-not-dry-atacama-desert',
      note: 'Re-attributed from the IEA critical minerals report, which does not state this figure, to its actual origin: Dr. Ingrid Garces of the University of Antofagasta, reported via NRDC. The order-of-magnitude estimate itself is well supported.',
      lastCheckedISO: '2026-08-22',
    },
    'c-xi-rare-earth': {
      id: 'c-xi-rare-earth',
      kind: 'citation',
      claimText: "China refines ~90% of the world's rare-earth elements (IEA)",
      sourceId: 'src-iea-minerals',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions',
      note: "IEA and related analyses put China's share of rare-earth processing/refining at roughly 90% (mining share is lower, ~60%). Donut shown as 90/10 for processing.",
      lastCheckedISO: '2026-06-27',
    },
    'c-xi-ewaste': {
      id: 'c-xi-ewaste',
      kind: 'citation',
      claimText: '62 Mt e-waste in 2022, ~13.8 Mt (22%) formally recycled (UN 2024)',
      sourceId: 'src-un-ewaste',
      verificationStatus: 'verified',
      verifiedUrl: 'https://ewastemonitor.info/',
      note: 'UN Global E-waste Monitor 2024: 62 Mt generated in 2022; ~22.3% (≈13.8 Mt) formally collected and recycled. Bar shows generated vs recycled.',
      lastCheckedISO: '2026-06-27',
    },
    'c-xi-ewaste-trend': {
      id: 'c-xi-ewaste-trend',
      kind: 'citation',
      claimText: 'E-waste: ~44 Mt (2014) → 62 Mt (2022) → ~82 Mt projected (2030)',
      sourceId: 'src-un-ewaste',
      verificationStatus: 'verified',
      verifiedUrl: 'https://ewastemonitor.info/',
      note: 'UN Global E-waste Monitor 2024 trajectory: ~44 Mt (2014), ~54 Mt (2019), 62 Mt (2022), projected ~82 Mt by 2030. The 2030 point is a projection.',
      lastCheckedISO: '2026-06-27',
    },
  },
}
