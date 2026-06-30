import type { RoundtableDocument } from '../../types/document'

export const partXI: RoundtableDocument = {
  id: 'part-xi',
  slug: 'the-ground-it-comes-from',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Extraction · Minerals · Environmental Justice · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'The Ground It Comes From', em: true }]],
    subtitle:
      'Part I weighed the energy and water AI consumes. This part follows the wire back further — to the mines, the refineries, and the scrap heaps, and to the communities whose land and bodies are spent to build the hardware that thinks.',
    dateLine: 'June 2026 · Eleventh in the AI Reckoning series',
    accentColor: 'umber',
  },
  companion: {
    text: 'Part XI of the AI Reckoning Series — Read alongside Parts I–X for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'Before the electricity, before the server, before the chip — there is the mine. There is the refinery. There is the hand that does the separating, and the lung that fills with the dust. The intelligence that arrives cleanly through a browser was assembled, over decades, from the earth up. This conversation follows the wire back to where it starts, and asks what was left behind there.',
      },
    ],
    [
      {
        type: 'text',
        value:
          'A new voice anchors this conversation: the Land Defender, who lives where the minerals come from and speaks first-hand for the communities whose water, soil, and labor are consumed to build the machines — and who see the least of what those machines produce. The question is the oldest one in the language of environmental justice, appearing here in a new form: who bears the cost, and who gets to use the thing it built?',
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
                      ' A large share of it is dug by hand, in unregulated artisanal pits. UNICEF estimated some 40,000 children were working in mines across the southern DRC. Those are not abstractions to the families who live there. They are the first link in your supply chain.',
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
                      'I think most of us simply never picture this. The screen is so clean. I had no idea a child with a shovel might be standing at the far end of it. Is that really still happening, or is it an old story?',
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
                      'It is current, and it is the same pattern we traced in the data-labor parts of this series — the value extracted in the Global South, the profit captured in the Global North. Lithium is the other half of the story. Pulling it from brine in the Atacama and similar basins can take on the order of two million liters of water per tonne, in some of the driest inhabited places on earth, where that water belongs to Indigenous communities and the ecosystems they depend on.',
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
                      "I won't pretend any of that is acceptable, and I won't pretend it is unique to AI either — phones, electric cars, and the whole energy transition pull on the same mines. What I'll add is that it is improvable: traceability schemes, audited supply chains, direct-lithium-extraction methods that use a fraction of the water, and battery chemistries that cut cobalt out entirely are all real and moving. The demand is the problem and also the lever — it is large enough to force the supply chain to change.",
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
              "The Democratic Republic of the Congo accounts for roughly 70% of the world's mined cobalt — a single country at the base of the global battery supply chain.",
            source: 'US Geological Survey — Mineral Commodity Summaries (Cobalt)',
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
                      "Mining is only the first chokepoint. The second is processing, and it is even more concentrated. China refines roughly 90% of the world's rare-earth elements — the materials in the high-performance magnets and components inside this hardware.",
                  },
                  { type: 'cite', claimId: 'c-xi-rare-earth' },
                  {
                    type: 'text',
                    value:
                      ' This is the mirror image of the chip chokepoint from Part VIII. Power over AI is not only about who designs the model. It is about who controls the dirty, toxic, low-margin middle of the supply chain that everyone else would rather not host.',
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
                      'And ask why one country ended up with 90% of it. It is not only cheaper labor. It is a willingness to absorb the poison. Rare-earth refining produces acidic, sometimes radioactive tailings. The places that host it — and the places that host the mines feeding it — carry contamination in their water and soil for generations. "Cheap processing" is a price someone pays. It is just not the person buying the phone.',
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
                      'That concentration is exactly why a dozen governments are now funding alternatives — new refining capacity with modern environmental controls, and a hard push into recycling so the toxicity is contained rather than dumped. It is early and expensive, but the strategic and environmental incentives finally point the same way. A more distributed, cleaner supply chain is buildable; it has simply never been the cheapest option, so no one built it.',
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
                      "Let me temper both the alarm and the optimism. The alarm: AI is a small slice of total demand for most of these minerals — batteries and the broader electrification dwarf it — so blaming the data center alone is too neat. The optimism: I have watched 'clean, distributed supply chain, real soon' be promised for two decades. The honest position is that the harm is real and current, and the fixes are real but slow, and the gap between them is measured in ruined watersheds.",
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
              'China accounts for roughly 90% of global rare-earth processing — the concentrated, toxic middle of the hardware supply chain.',
            source: 'International Energy Agency — critical minerals analysis',
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
                      'Now follow the hardware to the end of its life, because the cycle closes badly. The world generated about 62 million tonnes of electronic waste in 2022, and only around 22% of it was formally collected and recycled.',
                  },
                  { type: 'cite', claimId: 'c-xi-ewaste' },
                  {
                    type: 'text',
                    value:
                      " The rest is landfilled, incinerated, or shipped to informal scrapyards in the Global South, where people — often children again — burn circuit boards over open fires to recover traces of metal, breathing the fumes. The same minerals we fought to extract are then thrown away faster than we reclaim them. And AI's hardware refresh cycle, all those rapidly obsolete accelerators, only speeds the churn.",
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
                      "There is law reaching for this, and it is one of the more hopeful fronts. Extended-producer-responsibility rules make manufacturers pay for end-of-life handling. The EU's right-to-repair and ecodesign rules attack the disposability directly. The Basel Convention restricts shipping hazardous e-waste across borders to dump on poorer countries. None of it is sufficient yet, but the direction — make the producer own the whole lifecycle — is correct.",
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
                      'And yet the recycling number has barely moved in years, while the waste pile grows. I am not against the laws — I am against mistaking a regulation for an outcome. Until recycling a server is cheaper than mining a fresh one, the economics will keep choosing the mine and the landfill. That is the lever that actually matters, and it is mostly still pointing the wrong way.',
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
                      'I have a drawer full of old phones and chargers right now. I always assumed someone, somewhere, was responsibly recycling the ones I did hand in. It is unsettling to learn that "recycled" might mean a child breathing smoke on the other side of the world.',
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
              'Of the 62 million tonnes of e-waste generated in 2022, only about 13.8 million tonnes — roughly 22% — was formally collected and recycled.',
            source: 'UN — Global E-waste Monitor 2024',
            claimIds: ['c-xi-ewaste'],
            ariaLabel:
              'Bar chart showing 62 million tonnes of e-waste generated in 2022 versus about 13.8 million tonnes formally recycled',
            unit: 'Mt',
            variant: 'labor',
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
            race: 'Every buyer wants the cheapest hardware and the newest capability; every producer wants the cheapest inputs and the fastest refresh cycle. Mining virgin material and discarding old devices is cheaper, today, than recovering and reusing them — so the market races toward extraction and disposal.',
            trap: 'No single manufacturer can unilaterally absorb the cost of clean, traceable, recycled supply chains without being undercut by one that does not. The damage lands on distant communities and future device-owners who are not at the negotiating table, so it never shows up on the price tag.',
            intervention:
              'Make the producer own the full lifecycle: extended producer responsibility, right-to-repair and longevity mandates, recycled-content requirements, and binding traceability — so the cost of the harm is priced into the product instead of exported to the mine and the scrapyard.',
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
                      'The Skeptic put the real problem precisely: the loop stays open because virgin extraction is underpriced. It does not pay for the poisoned watershed or the child in the pit — those are externalities, dumped on people with no claim on the boardroom. A circular economy is not mainly a technology problem. It is a pricing problem. Put the true cost of extraction and disposal back onto the product, and recycling and longevity suddenly become the cheap option they should already be.',
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
                      "Agreed, and the technical pieces are ready to meet a corrected price. Urban mining — recovering metals from discarded electronics — already yields far higher concentrations of some metals per tonne than ore does. Hardware that lasts longer, is designed to be repaired, and is built from recycled feedstock is entirely feasible. What has been missing is not the engineering. It is an incentive structure that rewards keeping a material in use instead of pulling a fresh one from someone else's ground.",
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
                      'Then let me say what the people upstream are actually asking for, because it is not pity. It is a seat and a share. Free, prior, and informed consent before a mine opens on our land. A real cut of the value, not a road and a promise. Cleanup that is funded before the first shovel, not after the company leaves. We are not against the future being built. We are against it being built out of us, for someone else, while we are told to be grateful for the jobs.',
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
                      'That is the whole series in one demand. Every part has circled the same structure: a benefit that concentrates, a cost that disperses onto people without a vote, and a market that will not price what it cannot see. Consent, a share, and accountability that scales with the harm — it is the same answer we reached for energy, for labor, for truth, for authorship. The ground it comes from is just the most literal version of the question: who pays, who decides, and who is allowed to say no.',
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
              'Global e-waste rose from about 44 million tonnes in 2014 to 62 million in 2022, and is projected to reach roughly 82 million tonnes by 2030 — far faster than recycling is scaling.',
            source: 'UN — Global E-waste Monitor 2024',
            claimIds: ['c-xi-ewaste-trend'],
            ariaLabel:
              'Line chart showing global e-waste rising from about 44 million tonnes in 2014 to 62 million in 2022 and a projected 82 million tonnes by 2030',
            unit: 'Mt',
            variant: 'navy',
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
            'The repair is the same one every part of this series has arrived at, made physical: price the true cost, make the producer own the full lifecycle, and give the people whose land and bodies sit at the base of the supply chain consent, a share, and the power to refuse. A circular, accountable hardware economy is not a fantasy. It is simply the more expensive, fairer architecture — chosen, or not.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'And so the reckoning comes to rest on solid ground. Across eleven parts the costs proved real, the responses partial, the benefits genuine, the race relentless, the truth contested, the tail risk irreversible, the intimacy double-edged, the ownership concentrated, the culture taken, the prejudice inherited — and the footprint borne by those who chose none of it. The technology will keep advancing. Whether it is built out of people and the planet, or with them, is what it has always been: a decision, and the decision is still ours to make.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-usgs-cobalt',
      title: 'US Geological Survey — Mineral Commodity Summaries: Cobalt',
      description:
        "USGS data on global cobalt mine production, showing the Democratic Republic of the Congo as the source of roughly 70% of the world's mined cobalt.",
      url: 'https://www.usgs.gov/centers/national-minerals-information-center/cobalt-statistics-and-information',
    },
    {
      id: 'src-unicef-cobalt',
      title: 'UNICEF / Amnesty International — Child labour in DRC cobalt mining',
      description:
        'Reporting estimating that tens of thousands of children (UNICEF: ~40,000) worked in artisanal mines across the southern DRC, including cobalt operations.',
      url: 'https://www.unicef.org/drcongo/en',
    },
    {
      id: 'src-iea-minerals',
      title: 'IEA — Critical Minerals and Clean Energy Transitions',
      description:
        'International Energy Agency analysis of mineral supply chains, including the concentration of rare-earth processing (~90% in China) and water use in lithium extraction.',
      url: 'https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions',
    },
    {
      id: 'src-un-ewaste',
      title: 'UN — Global E-waste Monitor 2024',
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
      sourceId: 'src-iea-minerals',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions',
      note: 'Commonly cited estimate that producing one tonne of lithium from brine evaporation uses on the order of ~2 million litres of water. Figures vary widely by site and method (brine vs hard-rock); presented as an order-of-magnitude estimate.',
      lastCheckedISO: '2026-06-27',
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
      note: 'USGS: the DRC accounts for roughly 70% of global mined cobalt. Donut shown as 70/30.',
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
      sourceId: 'src-iea-minerals',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions',
      note: 'Order-of-magnitude estimate of water used per tonne of lithium from brine evaporation, frequently cited in critical-minerals and Atacama water-use reporting. Varies significantly by method and site.',
      lastCheckedISO: '2026-06-27',
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
