import type { RoundtableDocument } from '../../types/document'

export const partIII: RoundtableDocument = {
  id: 'part-iii',
  slug: 'getting-right',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Discovery · Progress · Real-World Impact · 2024–2026',
    titleLines: [
      [{ text: 'The AI Reckoning:' }],
      [{ text: "What It's Actually Getting Right", em: true }],
    ],
    subtitle:
      'The same five voices — this time examining the concrete, documented, peer-reviewed positive outcomes of AI research, access, and application. No hype. No speculation. Just what is actually working.',
    dateLine: 'May 2026 · Third in the AI Reckoning series',
    accentColor: 'green',
  },
  companion: {
    text: 'Part III of the AI Reckoning Series — Read alongside Parts I & II for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'Two documents have examined the costs and the responses. This one examines what is genuinely working — outcomes that are documented, peer-reviewed, or otherwise verifiable. The panel holds the same critical standard it applied to the problems. Optimism without evidence is still just marketing.',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — Biology & Scientific Discovery
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'Biology & Scientific Discovery' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'AlphaFold database',
                value: '214M+',
                size: 'large',
                description:
                  'Protein structures predicted — nearly every known protein sequence on Earth',
                claimId: 's-iii-alphafold-214m',
              },
              {
                variant: 'teal',
                labelTop: 'Nobel Prize',
                value: 'Chemistry 2024',
                size: 'medium',
                description:
                  "Awarded to AlphaFold creators — the first AI-driven tool to win science's highest honor",
                claimId: 's-iii-nobel-chemistry-2024',
              },
              {
                variant: 'blue',
                labelTop: 'Antibiotic candidates',
                value: '36M+',
                size: 'large',
                description:
                  'Molecular possibilities screened by AI at MIT/McMaster to find new MRSA-killing compounds',
                claimId: 's-iii-antibiotic-36m',
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
                      "We've spent two whole conversations talking about what AI costs and what people are doing about it. I want to actually know what's good. Not what might be good someday. What is good right now, that's real?",
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
                      "Let me start with what I consider the most significant scientific achievement in AI history. AlphaFold — developed by Google DeepMind — solved a problem that had stumped biologists for fifty years: how to predict a protein's three-dimensional shape from its sequence of amino acids. Proteins are the molecular machinery of life, and understanding their structure is the foundation of drug development, understanding disease, and developing new therapies. For decades, determining one protein structure experimentally could take a research team years. AlphaFold does it in minutes.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The AlphaFold database now contains over 214 million predicted protein structures — essentially every known protein sequence on Earth, made freely available to any researcher anywhere.',
                  },
                  { type: 'cite', claimId: 'c-iii-alphafold-214m' },
                  {
                    type: 'text',
                    value:
                      " This work won the 2024 Nobel Prize in Chemistry — the first time an AI-driven tool has earned science's highest honor.",
                  },
                  { type: 'cite', claimId: 'c-iii-nobel-2024' },
                  {
                    type: 'text',
                    value:
                      ' By 2024–2025, approximately 40% of new protein structures deposited into the global Protein Data Bank used AI techniques in their determination.',
                  },
                  { type: 'cite', claimId: 'c-iii-pdb-40pct' },
                  {
                    type: 'text',
                    value:
                      ' That is not a projection. That is the current state of structural biology.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Building on that foundation, researchers at MIT and McMaster University trained a generative AI model to design entirely new antibiotic structures to fight drug-resistant bacteria. The model screened more than 36 million molecular possibilities. From that screen, it found a small set of promising compounds. Two candidates eliminated MRSA — methicillin-resistant Staphylococcus aureus — in mouse models, and one showed activity against several other drug-resistant bacteria.',
                  },
                  { type: 'cite', claimId: 'c-iii-mit-antibiotic' },
                  {
                    type: 'text',
                    value:
                      ' These are structurally distinct from any existing antibiotic class, opening genuinely new strategies against antimicrobial resistance, which kills over a million people per year.',
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
                      'I want to add something from a different angle. In 2024, Google partnered with the Lichtman Lab at Harvard to map a tiny cubic millimeter of human brain tissue — at a resolution and level of cellular detail never previously achieved. The project revealed never-before-seen structures within the human brain and made the complete dataset, including AI-generated annotations for every cell, freely available to the scientific community.',
                  },
                  { type: 'cite', claimId: 'c-iii-brain-mapping' },
                  {
                    type: 'text',
                    value:
                      " That kind of foundational contribution — mapping what is actually there rather than theorizing — doesn't get the headlines drug discoveries do, but it may matter more for the long-term understanding of neurological disease.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "And separately, Google DeepMind's AI identified a previously unknown protein interaction critical to the survival of certain cancer cells — molecular dependencies that are difficult to detect through conventional laboratory methods, pointing toward a potential new class of drug targets that could selectively disrupt cancer growth while sparing healthy tissue.",
                  },
                  { type: 'cite', claimId: 'c-iii-cancer-protein' },
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
                      'Something worth noting about AlphaFold specifically: the decision to make the database freely available was not commercially required. Releasing 214 million protein structures as open access to every researcher on Earth regardless of their institution or country is a policy choice about who benefits from scientific infrastructure. Research published in 2025 found that before AlphaFold, the top 10% of universities published 55% of protein research articles and secured 50% of research grants — the field was heavily concentrated.',
                  },
                  { type: 'cite', claimId: 'c-iii-biorxiv-concentration' },
                  {
                    type: 'text',
                    value:
                      ' Open access to the database is measurably reducing that concentration. That is a distributional outcome that deserves acknowledgment alongside the scientific one.',
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
                      "The antibiotic thing is the one that really lands for me. I've heard about antibiotic resistance my whole life — that eventually the bacteria will outsmart all our medicines and we'll be in serious trouble. Are they saying AI actually found new ones?",
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
                      "In mouse models, yes — and structurally novel ones, which is the critical point. Bacteria develop resistance by evolving defenses against specific molecular structures. When a new drug has a structure bacteria have never encountered, resistance takes much longer to emerge. The AI didn't just find another version of a drug we already have. It found molecules from a part of chemical space that human researchers, working manually, would not have reached.",
                  },
                  { type: 'cite', claimId: 'c-iii-alation-chemical-space' },
                  {
                    type: 'text',
                    value:
                      " These are early-stage findings that still need to advance through human trials. But the discovery step itself — which historically has been the hardest part — happened. That's the real news.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"By releasing protein structure predictions in a free database, scientists around the world can accelerate progress in areas like developing new medicines, fighting antibiotic resistance, and tackling plastic pollution."',
            attribution: '— Google AI Science, 2024',
          },
        },
      ],
    },
    // ─────────────────────────────────────────────────────────
    // ROUND II — Medicine, Health & Early Detection
    // ─────────────────────────────────────────────────────────
    {
      header: {
        roundLabel: 'Round II',
        title: 'Medicine, Health & Early Detection',
      },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Drug cost reduction',
                value: '$700M',
                size: 'large',
                description:
                  'Average savings per drug reported by pharma companies using AI in development',
                claimId: 's-iii-drug-cost-700m',
              },
              {
                variant: 'teal',
                labelTop: 'Preclinical timeline',
                value: '4 yrs → 18 mo',
                size: 'medium',
                description:
                  'AI shortens preclinical testing by catching failed candidates earlier',
                claimId: 's-iii-preclinical-timeline',
              },
              {
                variant: 'blue',
                labelTop: 'Early cancer detection savings',
                value: '$150K',
                size: 'large',
                description:
                  'Average per-patient treatment cost savings when AI screening catches cancer earlier',
                claimId: 's-iii-cancer-detection-150k',
              },
            ],
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
                      'Drug development has historically been one of the least efficient processes in human civilization. The average approved medicine costs $2.6 billion to develop and takes more than a decade. Most of that cost comes from failure — compounds that look promising early but turn out to be toxic or ineffective much later, after enormous resources have been spent. AI is attacking that failure rate at the source.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'AI systems can now predict which protein targets are most likely to be "druggable" before anyone steps foot in a lab. They predict toxicity profiles across different organ systems, how quickly the body absorbs and eliminates a drug, and potential off-target effects that cause side effects — all before synthesis.',
                  },
                  { type: 'cite', claimId: 'c-iii-lifebit-druggable' },
                  {
                    type: 'text',
                    value:
                      ' Pharmaceutical companies using AI report average cost savings of $700 million per drug, and preclinical testing timelines are being compressed from four years to eighteen months.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-700m' },
                  {
                    type: 'text',
                    value:
                      ' Failed candidates are being caught 70% earlier in development.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-70pct' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In diagnostics, AI medical imaging analysis reads X-rays, MRIs, and CT scans at speeds and consistency that human radiologists cannot match alone — not as replacement, but as a second reader that catches what fatigue or distraction might miss. Early cancer detection through AI screening is saving an estimated $150,000 per patient in treatment costs by catching disease in stages that are far cheaper to treat.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-150k' },
                  {
                    type: 'text',
                    value:
                      ' Hospitals using AI diagnostics report 18% lower imaging costs through faster analysis and reduced need for repeat scans.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-18pct' },
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
                      "I want to engage with this seriously because the healthcare case is genuinely compelling — but I also want to be clear-eyed about distribution. When AI cuts $700 million from drug development costs, does that reduce the price of the drug for patients, or does it increase the profit margin for the manufacturer? The technology's benefit to human health depends entirely on who captures the efficiency gains. A cheaper-to-develop drug that still costs $100,000 per year in treatment is not a story about democratizing medicine.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "That said — the point about early detection is different and I think the distribution question is easier there. Catching cancer in Stage I rather than Stage III does save lives regardless of the healthcare system structure. And for that specific application, I'm genuinely glad this technology exists.",
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
                      'Also worth flagging: total healthcare AI investment in 2025 reached $9.8 billion, up 67% from 2024.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-98b' },
                  {
                    type: 'text',
                    value:
                      ' That capital is flowing disproportionately toward profitable disease areas in wealthy markets. The WHO estimates that antimicrobial resistance disproportionately kills people in low- and middle-income countries — the same countries with the least access to AI-developed treatments. The discovery of new antibiotics via AI is genuinely important. Whether those antibiotics reach the populations who need them most depends on decisions that have nothing to do with the AI itself.',
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
                      'So the technology is real, but whether regular people benefit from it is a separate question that depends on other things. That feels like a pattern in these conversations.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'verdict',
          data: {
            label: 'The Bottom Line',
            paragraphs: [
              [
                {
                  type: 'text',
                  value:
                    "The healthcare and drug discovery evidence is among the strongest in the AI positive case — compressed timelines, lower failure rates, and measurably earlier disease detection are documented and peer-reviewed. Whether the financial gains flow back to patients or to shareholders is a distribution question that the technology itself doesn't answer.",
                },
              ],
            ],
          },
        },
      ],
    },
    // ─────────────────────────────────────────────────────────
    // ROUND III — Climate, Weather & Disaster Preparedness
    // ─────────────────────────────────────────────────────────
    {
      header: {
        roundLabel: 'Round III',
        title: 'Climate, Weather & Disaster Preparedness',
      },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Flood forecasting reach',
                value: '2B+',
                size: 'large',
                description:
                  "People in 150 countries now covered by Google's AI flood forecasting system",
                claimId: 's-iii-flood-2b',
              },
              {
                variant: 'teal',
                labelTop: 'Cyclone prediction window',
                value: 'Up to 15 days',
                size: 'medium',
                description:
                  'AI now predicts cyclone paths further in advance than any previous method',
                claimId: 's-iii-cyclone-15-days',
              },
              {
                variant: 'blue',
                labelTop: 'WeatherNext 2 speed',
                value: '8×',
                size: 'large',
                description:
                  'Faster than prior forecasting models, at up to 1-hour resolution',
                claimId: 's-iii-weathernext-8x',
              },
            ],
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
                      'This is the section where I get to say: yes, this is genuinely good, and it connects directly to the climate problems we discussed in our first conversation.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Google's Flood Forecasting System began as a pilot in India's Patna region in 2018. It has since expanded to cover flood forecasting in more than 80 countries, protecting more than 500 million people — and as of 2025, the system now covers over two billion people in 150 countries for severe riverine flood events.",
                  },
                  { type: 'cite', claimId: 'c-iii-flood-2b' },
                  {
                    type: 'text',
                    value:
                      " This replaced traditional local data models that required physical gauge stations and local infrastructure. AI-based forecasting works in ungauged watersheds — rivers with no measurement infrastructure at all — which is where most of the world's flood-vulnerable communities live. A 2024 paper in Nature documented the first global prediction system for extreme floods in ungauged watersheds.",
                  },
                  { type: 'cite', claimId: 'c-iii-nature-ungauged' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Google DeepMind partnered with weather agencies to develop experimental cyclone prediction models using stochastic neural networks — these can predict a cyclone's path up to 15 days in advance, far beyond what any previous system could do.",
                  },
                  { type: 'cite', claimId: 'c-iii-cyclone-15-days' },
                  {
                    type: 'text',
                    value:
                      ' WeatherNext 2, their most advanced forecasting model, generates forecasts 8 times faster than prior models at up to 1-hour resolution, and is now available to developers worldwide.',
                  },
                  { type: 'cite', claimId: 'c-iii-weathernext-8x' },
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
                      "Two billion people getting flood warnings they didn't have before. That's not abstract. That's villages having time to move people before the water comes.",
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
                      'Exactly. And to be precise: warnings that give people 24–72 hours are qualitatively different from warnings that give them 2 hours. You can evacuate livestock, move elderly family members, retrieve documents. The difference between a warning and a useful warning is measured in hours of lead time, and AI is extending that lead time in places that have never had reliable forecasting infrastructure.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'In agriculture, AI precision farming systems are producing documented results: 15–20% increases in crop yields compared to conventional methods, up to 30% reduction in water usage through optimized irrigation, and 25% reduction in overall input costs including fertilizers and pesticides.',
                  },
                  { type: 'cite', claimId: 'c-iii-farmonaut-yields' },
                  {
                    type: 'text',
                    value:
                      ' In regions facing climate-driven yield volatility, those numbers are not efficiency statistics — they are food security statistics. For a farmer in a drought-stressed region, 20% more yield from the same land is the difference between feeding a family and not.',
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
                      'On agriculture I want to add an honest note. The 15–20% yield increase figures come primarily from large-scale farms in developed countries with existing digital infrastructure. Over 70% of large-scale farms in developed countries are estimated to use some form of AI-driven technology.',
                  },
                  { type: 'cite', claimId: 'c-iii-farmonaut-70pct' },
                  {
                    type: 'text',
                    value:
                      " Adoption in smallholder farming — which is where most of the world's food insecurity lives — is much lower, driven by cost and connectivity barriers. The technology works where it's been deployed. Deploying it where it's most needed is the unsolved problem.",
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
                      "The flood forecasting story is actually a strong argument for public-interest AI development. Google's Flood Hub is a free public service covering the most vulnerable populations on Earth. It was built because someone decided to build it that way — it wasn't required by market forces. Two billion people don't generate the same revenue signal as two hundred million premium subscribers. The distributional outcomes we keep coming back to as the gap between AI's potential and AI's delivery are often a question of who chooses to build what, for whom.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"AI-driven flood forecasting now covers more than two billion people in 150 countries for severe riverine floods — replacing traditional models that required physical infrastructure most flood-vulnerable communities never had."',
            attribution: '— Google Research Year in Review, 2025',
          },
        },
      ],
    },
    // ─────────────────────────────────────────────────────────
    // ROUND IV — Education, Accessibility & Daily Life
    // ─────────────────────────────────────────────────────────
    {
      header: {
        roundLabel: 'Round IV',
        title: 'Education, Accessibility & Daily Life',
      },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Harvard RCT — 2025',
                value: '0.73–1.3 SD',
                size: 'medium',
                description:
                  'Effect size of AI tutoring over in-class active learning — 194 undergraduate physics students',
                claimId: 's-iii-harvard-effect-size',
              },
              {
                variant: 'teal',
                labelTop: 'Microsoft Seeing AI',
                value: 'Free, iOS & Android',
                size: 'medium',
                description:
                  'Describes scenes, reads text aloud, and recognizes objects in real time for blind users',
                claimId: 's-iii-seeing-ai',
              },
              {
                variant: 'blue',
                labelTop: "Denver Int'l Airport",
                value: 'Free Aira Access',
                size: 'medium',
                description:
                  'AI visual interpreting service offered at no cost — blind travelers navigate independently',
                claimId: 's-iii-aira-denver',
              },
            ],
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
                      'In June 2025, Harvard researchers published a randomized controlled trial in Scientific Reports — one of the most rigorous study designs in education research. One hundred and ninety-four undergraduate physics students were divided between conventional in-class active learning with experienced instructors and at-home sessions with a purpose-built AI tutor. Students using the AI tutor achieved median post-test scores of 4.5 compared to 3.5 for those in active learning classrooms. The effect size — 0.73 to 1.3 standard deviations — is, in educational research, considered large.',
                  },
                  { type: 'cite', claimId: 'c-iii-harvard-rct' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'This isn\'t a marginal improvement. The authors note that the difference was statistically significant at a probability below one in one hundred million. And crucially, the AI tutor was designed according to research-based pedagogical principles — it was not simply a chatbot but a deliberately engineered learning system. The implication is that when AI tutoring is built carefully, it can deliver one-on-one tutoring quality at any scale. For a student in an under-resourced school with 35 people in the class and an overwhelmed teacher, that access to personalized instruction has never existed before. Brookings Institute research in 2026 identified AI tutoring as particularly valuable for novice teachers assigned to challenging environments and for under-resourced schools where human support is scarce.',
                  },
                  { type: 'cite', claimId: 'c-iii-brookings' },
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
                      'I want to put an honest counterweight on the education evidence, because the research is genuinely mixed. A systematic literature review by Zhai et al. found that regular use of AI tutoring systems was associated in some studies with a decline in cognitive abilities, diminished information retention, and increased cognitive offloading — students accepting AI-generated answers rather than wrestling with the material themselves.',
                  },
                  { type: 'cite', claimId: 'c-iii-nhsjs-zhai' },
                  {
                    type: 'text',
                    value:
                      ' And a 2026 survey found 95% of college faculty reported fear of student over-reliance on AI and diminished critical thinking.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "The Harvard RCT result is compelling — but it's one well-designed study. The picture across the broader literature is that AI tutoring works well when deliberately engineered and when students use it actively, not passively. Implementation quality matters enormously. A poorly designed AI tutor handed to a struggling student may make things worse, not better. The technology is not a substitute for thinking about how to use it.",
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
                      "What about for people with disabilities? I have a neighbor who is losing her sight and she's been talking about some of these tools. I didn't know much about them.",
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
                      'This is an area where AI has produced concrete, real-world independence improvements for real people — not theoretical future benefits.',
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Microsoft's Seeing AI is a free mobile app on both iOS and Android. Using the phone's camera and AI-driven vision, it describes scenes, reads text aloud, identifies objects, and recognizes people in real time for blind or low-vision users.",
                  },
                  { type: 'cite', claimId: 'c-iii-seeing-ai' },
                  {
                    type: 'text',
                    value:
                      ' Be My Eyes — originally a volunteer-based service — now includes an AI feature that handles object recognition, text reading, and navigation assistance without requiring a live human connection.',
                  },
                  { type: 'cite', claimId: 'c-iii-be-my-eyes' },
                  {
                    type: 'text',
                    value:
                      " Google's Live Transcribe converts spoken conversations to text in real time, supporting people who are deaf or hard of hearing in one-on-one conversations, group settings, and public environments.",
                  },
                  { type: 'cite', claimId: 'c-iii-live-transcribe' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Aira — an AI-powered visual interpreting service — is now available for free at many airports including Denver International, allowing a blind traveler to navigate independently from check-in through security to the gate without relying on staff escorts.',
                  },
                  { type: 'cite', claimId: 'c-iii-aira-denver' },
                  {
                    type: 'text',
                    value:
                      ' These are not features that will exist someday. They exist today, they are free or low-cost, and they are providing a form of independence that has no prior equivalent. For someone losing their sight, the world looks meaningfully different with these tools than it did five years ago.',
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
                      'Worth noting the regulatory context: in 2024, the U.S. Department of Justice finalized new digital accessibility rules under Title II of the Americans with Disabilities Act, requiring all state and local government websites and apps to meet accessibility standards.',
                  },
                  { type: 'cite', claimId: 'c-iii-doj-ada' },
                  {
                    type: 'text',
                    value:
                      ' The European Accessibility Act came into effect in late 2025, setting similar requirements for a wide range of products and services across EU member states.',
                  },
                  { type: 'cite', claimId: 'c-iii-eaa' },
                  {
                    type: 'text',
                    value:
                      ' These legal frameworks are creating structural demand for AI-powered accessibility tools rather than leaving it to voluntary corporate good will. The combination of available technology and legal mandate is a more durable path than either alone.',
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
                      "I'm going to tell her about the Seeing AI app. That's exactly the kind of thing she would want to know about and I didn't know to tell her.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"Students using the AI tutor achieved learning gains more than double those of the control group relative to baseline knowledge, with an effect size between 0.73 and 1.3 standard deviations — in educational research, considered large."',
            attribution:
              '— Kestin et al., Scientific Reports, June 2025 (Harvard RCT, 194 undergraduate students)',
          },
        },
      ],
    },
    // ─────────────────────────────────────────────────────────
    // CLOSING — What the Evidence Adds Up To
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Closing', title: 'What the Evidence Adds Up To' },
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
                      "Having now sat through all three of these conversations — I feel like I understand the situation in a way I genuinely didn't before. There are real costs, real efforts to address them, and real benefits. None of those three things cancel each other out. You can hold all of them at the same time.",
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
                      "That's the honest framing. The flood forecasting coverage of two billion people and the antibiotic discoveries don't cancel the energy emissions. They coexist. The question is whether we're making choices that maximize the first category and minimize the second, or whether we're letting both happen without deliberate steering. The things AI is getting right in this conversation mostly happened because someone made a decision to prioritize public benefit — free databases, open access, free apps. That's not automatic. It's a choice, and it's not the default choice in a market-driven industry.",
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
                      "The pattern across every positive example in this conversation: AlphaFold's open database, the flood forecasting system, the free accessibility apps, the Brookings finding that AI tutoring matters most for under-resourced schools — the benefits reach the most people when someone chooses to give them away. The benefits concentrate when someone chooses to monetize them. The technology is neutral on that question. The people deploying it are not.",
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
                      "And that's the policy argument hiding inside the positive case. If the most impactful AI applications are the ones designed as public goods — open databases, free early-warning systems, free assistive tools — then the governance question isn't just about preventing harm. It's about creating conditions that incentivize building more of those things instead of fewer. Right now, the incentive structure mostly doesn't. That's a design problem, and design problems have solutions.",
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
                      "I want to close by saying something I mean: these conversations have been more useful than most I have inside the industry. The positive case for AI is genuinely strong — the Nobel Prize wasn't political theater, the flood forecasting is real, the antibiotic discoveries are real, the Harvard RCT is real. I believe in this work. I also leave these conversations more convinced than I was before that the hardest questions aren't technical. They're about who benefits, who decides, and who pays the costs when we get it wrong. Those questions don't have engineering solutions. They require the kind of deliberate, contested, imperfect political process that people in my field tend to find frustrating. But so does everything worth doing.",
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
                      "I'm going to download that Seeing AI app today and share it with my neighbor. That's a small thing, but it's something I can actually do right now with what I learned here. I think that's the right scale to hold alongside all the bigger questions. The world-scale problems and the neighbor-scale ones are both real.",
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
      id: 'src-oxford-nar',
      title: 'Oxford Academic / Nucleic Acids Research (2024)',
      description:
        'AlphaFold DB: 214M+ protein structures, free global access, integration into PDB, UniProt, and Ensembl.',
    },
    {
      id: 'src-frontiers-ai',
      title: 'Frontiers in Artificial Intelligence (March 2026)',
      description:
        '~40% of new PDB structures in 2024–2025 used AI techniques; AlphaFold 3 impact on structural biology.',
    },
    {
      id: 'src-pnas',
      title: 'PNAS — AlphaFold Two Years On (August 2024)',
      description:
        "Validation of AlphaFold's widespread adoption and impact across structural biology community.",
    },
    {
      id: 'src-biorxiv',
      title: 'biorxiv preprint (February 2025)',
      description:
        'Before AlphaFold, top 10% universities published 55% of protein research; open access measurably reducing concentration.',
    },
    {
      id: 'src-alation',
      title: 'Alation / MIT-McMaster research summary (2025)',
      description:
        'AI screened 36M+ molecular possibilities; two candidates killed MRSA in mouse models; structurally novel antibiotic classes.',
    },
    {
      id: 'src-google-ai-science',
      title: 'Google AI Science / blog.google (2024–2025)',
      description:
        "Human brain mapping with Harvard Lichtman Lab; AlphaFold's antibiotic and plastic pollution research applications.",
    },
    {
      id: 'src-interesting-engineering',
      title: 'Interesting Engineering (January 2026)',
      description:
        'Google DeepMind identified unknown protein interaction critical to cancer cell survival; potential new drug target class.',
    },
    {
      id: 'src-promptbuddy',
      title: 'ThePromptBuddy (November 2025)',
      description:
        '$2.6B average drug development cost; AI saves $700M per drug; 4yr→18mo preclinical compression; $150K early detection savings; 18% imaging cost reduction.',
    },
    {
      id: 'src-lifebit',
      title: 'Lifebit AI (July 2025)',
      description:
        'AI predicts druggability, toxicity, pharmacokinetics, and off-target effects before lab synthesis.',
    },
    {
      id: 'src-google-research',
      title: 'Google Research Year in Review (2025–2026)',
      description:
        'Flood forecasting: 2B+ people, 150 countries. WeatherNext 2: 8× faster, 1-hour resolution. Cyclone prediction: up to 15 days.',
    },
    {
      id: 'src-ecoskills',
      title: 'EcoSkills Academy (September 2025)',
      description:
        'Google Flood Hub history: pilot 2018 India, expanded to 80+ countries, 500M+ people protected.',
    },
    {
      id: 'src-nature-communications',
      title: 'Nature Communications (March 2025)',
      description:
        'Global prediction of extreme floods in ungauged watersheds — first system to operate without physical gauge infrastructure.',
    },
    {
      id: 'src-farmonaut',
      title: 'Farmonaut / Journal of Agriculture and Food Research (2025)',
      description:
        'AI precision farming: 15–20% yield increase, 30% water reduction, 25% input cost reduction on large-scale farms.',
    },
    {
      id: 'src-kestin',
      title: 'Kestin et al., Scientific Reports (June 2025)',
      description:
        'Harvard RCT: 194 undergraduate physics students; AI tutor effect size 0.73–1.3 SD over in-class active learning; p < 10⁻⁸.',
    },
    {
      id: 'src-etc-journal',
      title: 'ET&C Journal (November 2025)',
      description:
        'Review of Harvard RCT: median post-test 4.5 vs. 3.5; learning gains more than double the control group relative to baseline.',
    },
    {
      id: 'src-brookings',
      title: 'Brookings Institution (February 2026)',
      description:
        'AI tutoring most valuable for under-resourced schools and novice teachers; potential to scale expert-level support.',
    },
    {
      id: 'src-nhsjs',
      title: 'NHSJS Literature Review (2025)',
      description:
        'Zhai et al.: some studies link heavy AI tutoring reliance with cognitive offloading and reduced critical thinking. Mixed evidence across literature.',
    },
    {
      id: 'src-level-access',
      title: 'Level Access / AI Assistive Tech (March 2026)',
      description:
        'Microsoft Seeing AI (free, iOS/Android); Be My Eyes AI; Google Live Transcribe: current deployed tools.',
    },
    {
      id: 'src-cpwd',
      title: 'Center for People with Disabilities (August 2025)',
      description:
        'Aira free at Denver International Airport; DOJ ADA Title II digital accessibility rules finalized 2024; European Accessibility Act in effect 2025.',
    },
  ],
  claims: {
    // ── Statistics (stat boxes) ──────────────────────────────
    's-iii-alphafold-214m': {
      id: 's-iii-alphafold-214m',
      kind: 'statistic',
      claimText: '214M+',
      verificationStatus: 'pending',
    },
    's-iii-nobel-chemistry-2024': {
      id: 's-iii-nobel-chemistry-2024',
      kind: 'statistic',
      claimText: 'Chemistry 2024',
      verificationStatus: 'pending',
    },
    's-iii-antibiotic-36m': {
      id: 's-iii-antibiotic-36m',
      kind: 'statistic',
      claimText: '36M+',
      verificationStatus: 'pending',
    },
    's-iii-drug-cost-700m': {
      id: 's-iii-drug-cost-700m',
      kind: 'statistic',
      claimText: '$700M',
      verificationStatus: 'pending',
    },
    's-iii-preclinical-timeline': {
      id: 's-iii-preclinical-timeline',
      kind: 'statistic',
      claimText: '4 yrs → 18 mo',
      verificationStatus: 'pending',
    },
    's-iii-cancer-detection-150k': {
      id: 's-iii-cancer-detection-150k',
      kind: 'statistic',
      claimText: '$150K',
      verificationStatus: 'pending',
    },
    's-iii-flood-2b': {
      id: 's-iii-flood-2b',
      kind: 'statistic',
      claimText: '2B+',
      verificationStatus: 'pending',
    },
    's-iii-cyclone-15-days': {
      id: 's-iii-cyclone-15-days',
      kind: 'statistic',
      claimText: 'Up to 15 days',
      verificationStatus: 'pending',
    },
    's-iii-weathernext-8x': {
      id: 's-iii-weathernext-8x',
      kind: 'statistic',
      claimText: '8×',
      verificationStatus: 'pending',
    },
    's-iii-harvard-effect-size': {
      id: 's-iii-harvard-effect-size',
      kind: 'statistic',
      claimText: '0.73–1.3 SD',
      verificationStatus: 'pending',
    },
    's-iii-seeing-ai': {
      id: 's-iii-seeing-ai',
      kind: 'statistic',
      claimText: 'Free, iOS & Android',
      verificationStatus: 'pending',
    },
    's-iii-aira-denver': {
      id: 's-iii-aira-denver',
      kind: 'statistic',
      claimText: 'Free Aira Access',
      verificationStatus: 'pending',
    },
    // ── Citations ────────────────────────────────────────────
    'c-iii-alphafold-214m': {
      id: 'c-iii-alphafold-214m',
      kind: 'citation',
      claimText: '[Oxford Academic / Nucleic Acids Research, 2024]',
      sourceId: 'src-oxford-nar',
      verificationStatus: 'pending',
    },
    'c-iii-nobel-2024': {
      id: 'c-iii-nobel-2024',
      kind: 'citation',
      claimText: '[PNAS / Frontiers in AI, 2026]',
      sourceId: 'src-pnas',
      verificationStatus: 'pending',
    },
    'c-iii-pdb-40pct': {
      id: 'c-iii-pdb-40pct',
      kind: 'citation',
      claimText: '[Frontiers in AI, March 2026]',
      sourceId: 'src-frontiers-ai',
      verificationStatus: 'pending',
    },
    'c-iii-mit-antibiotic': {
      id: 'c-iii-mit-antibiotic',
      kind: 'citation',
      claimText: '[Alation / MIT research summary, 2025]',
      sourceId: 'src-alation',
      verificationStatus: 'pending',
    },
    'c-iii-brain-mapping': {
      id: 'c-iii-brain-mapping',
      kind: 'citation',
      claimText: '[Google AI Science page, 2024]',
      sourceId: 'src-google-ai-science',
      verificationStatus: 'pending',
    },
    'c-iii-cancer-protein': {
      id: 'c-iii-cancer-protein',
      kind: 'citation',
      claimText: '[Interesting Engineering, January 2026]',
      sourceId: 'src-interesting-engineering',
      verificationStatus: 'pending',
    },
    'c-iii-biorxiv-concentration': {
      id: 'c-iii-biorxiv-concentration',
      kind: 'citation',
      claimText: '[biorxiv preprint, February 2025]',
      sourceId: 'src-biorxiv',
      verificationStatus: 'pending',
    },
    'c-iii-alation-chemical-space': {
      id: 'c-iii-alation-chemical-space',
      kind: 'citation',
      claimText: '[Alation, 2025]',
      sourceId: 'src-alation',
      verificationStatus: 'pending',
    },
    'c-iii-lifebit-druggable': {
      id: 'c-iii-lifebit-druggable',
      kind: 'citation',
      claimText: '[Lifebit AI, 2025]',
      sourceId: 'src-lifebit',
      verificationStatus: 'pending',
    },
    'c-iii-promptbuddy-700m': {
      id: 'c-iii-promptbuddy-700m',
      kind: 'citation',
      claimText: '[ThePromptBuddy / FDA data analysis, 2025]',
      sourceId: 'src-promptbuddy',
      verificationStatus: 'pending',
    },
    'c-iii-promptbuddy-70pct': {
      id: 'c-iii-promptbuddy-70pct',
      kind: 'citation',
      claimText: '[ThePromptBuddy, 2025]',
      sourceId: 'src-promptbuddy',
      verificationStatus: 'pending',
    },
    'c-iii-promptbuddy-150k': {
      id: 'c-iii-promptbuddy-150k',
      kind: 'citation',
      claimText: '[ThePromptBuddy, 2025]',
      sourceId: 'src-promptbuddy',
      verificationStatus: 'pending',
    },
    'c-iii-promptbuddy-18pct': {
      id: 'c-iii-promptbuddy-18pct',
      kind: 'citation',
      claimText: '[ThePromptBuddy, 2025]',
      sourceId: 'src-promptbuddy',
      verificationStatus: 'pending',
    },
    'c-iii-promptbuddy-98b': {
      id: 'c-iii-promptbuddy-98b',
      kind: 'citation',
      claimText: '[ThePromptBuddy, 2025]',
      sourceId: 'src-promptbuddy',
      verificationStatus: 'pending',
    },
    'c-iii-flood-2b': {
      id: 'c-iii-flood-2b',
      kind: 'citation',
      claimText: '[Google Research, 2025; EcoSkills Academy, 2025]',
      sourceId: 'src-google-research',
      verificationStatus: 'pending',
    },
    'c-iii-nature-ungauged': {
      id: 'c-iii-nature-ungauged',
      kind: 'citation',
      claimText: '[Nature Communications, 2025, citing Nearing et al., 2024]',
      sourceId: 'src-nature-communications',
      verificationStatus: 'pending',
    },
    'c-iii-cyclone-15-days': {
      id: 'c-iii-cyclone-15-days',
      kind: 'citation',
      claimText: '[Google Research 2025]',
      sourceId: 'src-google-research',
      verificationStatus: 'pending',
    },
    'c-iii-weathernext-8x': {
      id: 'c-iii-weathernext-8x',
      kind: 'citation',
      claimText: '[Google Research, January 2026]',
      sourceId: 'src-google-research',
      verificationStatus: 'pending',
    },
    'c-iii-farmonaut-yields': {
      id: 'c-iii-farmonaut-yields',
      kind: 'citation',
      claimText:
        '[Farmonaut / Journal of Agriculture and Food Research, 2025]',
      sourceId: 'src-farmonaut',
      verificationStatus: 'pending',
    },
    'c-iii-farmonaut-70pct': {
      id: 'c-iii-farmonaut-70pct',
      kind: 'citation',
      claimText: '[Farmonaut, 2025]',
      sourceId: 'src-farmonaut',
      verificationStatus: 'pending',
    },
    'c-iii-harvard-rct': {
      id: 'c-iii-harvard-rct',
      kind: 'citation',
      claimText:
        '[Kestin et al., Scientific Reports, June 2025; ET&C Journal, November 2025]',
      sourceId: 'src-kestin',
      verificationStatus: 'pending',
    },
    'c-iii-brookings': {
      id: 'c-iii-brookings',
      kind: 'citation',
      claimText: '[Brookings, February 2026]',
      sourceId: 'src-brookings',
      verificationStatus: 'pending',
    },
    'c-iii-nhsjs-zhai': {
      id: 'c-iii-nhsjs-zhai',
      kind: 'citation',
      claimText: '[NHSJS literature review, 2025]',
      sourceId: 'src-nhsjs',
      verificationStatus: 'pending',
    },
    'c-iii-seeing-ai': {
      id: 'c-iii-seeing-ai',
      kind: 'citation',
      claimText: '[Level Access / AI Assistive Tech, March 2026]',
      sourceId: 'src-level-access',
      verificationStatus: 'pending',
    },
    'c-iii-be-my-eyes': {
      id: 'c-iii-be-my-eyes',
      kind: 'citation',
      claimText: '[Level Access, 2026]',
      sourceId: 'src-level-access',
      verificationStatus: 'pending',
    },
    'c-iii-live-transcribe': {
      id: 'c-iii-live-transcribe',
      kind: 'citation',
      claimText: '[Level Access, 2026]',
      sourceId: 'src-level-access',
      verificationStatus: 'pending',
    },
    'c-iii-aira-denver': {
      id: 'c-iii-aira-denver',
      kind: 'citation',
      claimText: '[Center for People with Disabilities, August 2025]',
      sourceId: 'src-cpwd',
      verificationStatus: 'pending',
    },
    'c-iii-doj-ada': {
      id: 'c-iii-doj-ada',
      kind: 'citation',
      claimText: '[Center for People with Disabilities, 2025]',
      sourceId: 'src-cpwd',
      verificationStatus: 'pending',
    },
    'c-iii-eaa': {
      id: 'c-iii-eaa',
      kind: 'citation',
      claimText: '[Center for People with Disabilities, 2025]',
      sourceId: 'src-cpwd',
      verificationStatus: 'pending',
    },
  },
}
