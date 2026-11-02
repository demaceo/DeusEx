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
      'Highlighting the concrete, documented, peer-reviewed positive outcomes of AI research, access, and application. No hype. No speculation. Just what is actually working.',
    dateLine: 'May 2026 · Third in the AI Reckoning series',
    accentColor: 'green',
  },
  companion: {
    text: 'Part III of the AI Reckoning Series: read alongside Parts I & II for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'It is not a concession to admit that something works. Science advances. Diseases yield. Floods are predicted. Children in under-resourced classrooms gain months of ground. The honest reckoning includes this: not as absolution for the costs, but as the other half of the ledger, without which none of the difficult tradeoffs can be weighed.',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — Biology & Scientific Discovery
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'Biology & Scientific Discovery' },
      stanceOverride: { environmentalist: 'optimist', 'labor-advocate': 'neutral' },
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
                  'Protein structures predicted: nearly every known protein sequence on Earth',
                claimId: 's-iii-alphafold-214m',
              },
              {
                variant: 'teal',
                labelTop: 'Nobel Prize',
                value: 'Chemistry 2024',
                size: 'medium',
                description:
                  "Awarded to AlphaFold creators, the first AI-driven tool to win science's highest honor",
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
                      "We've spent two whole conversations on what AI costs and who's trying to rein it in. So what's good? Not someday. Right now, and real. I'll admit I half expect a list of promises.",
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
                      "AlphaFold, if I only get one. Biologists spent fifty years trying to predict a protein's three-dimensional shape from its sequence of amino acids, and the shape is what you need to design a drug or understand a disease. Working out a single structure experimentally could take a team years. AlphaFold does it in minutes.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'The database now holds over 214 million predicted structures, essentially every known protein sequence on Earth, free to any researcher anywhere.',
                  },
                  { type: 'cite', claimId: 'c-iii-alphafold-214m' },
                  {
                    type: 'text',
                    value:
                      " It won the 2024 Nobel Prize in Chemistry, the first time an AI-driven tool has earned science's highest honor.",
                  },
                  { type: 'cite', claimId: 'c-iii-nobel-2024' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "And the bench work didn't disappear: by 2024 to 2025, about 40% of new structures deposited into the global Protein Data Bank were solved by cryo-electron microscopy.",
                  },
                  { type: 'cite', claimId: 'c-iii-pdb-40pct' },
                  { type: 'text', value: " That's structural biology today, not a projection." },
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
                      "You'll be surprised to hear me agree, so I'll add one that got less attention. In 2024, Google and the Lichtman Lab at Harvard mapped a single cubic millimeter of human brain tissue at a level of cellular detail nobody had reached before. They found structures no one had seen, and they released the whole dataset, AI annotations for every cell included, free to the scientific community.",
                  },
                  { type: 'cite', claimId: 'c-iii-brain-mapping' },
                  {
                    type: 'text',
                    value:
                      " It's a map of what's physically there, not a theory. It won't get the headlines a new drug gets, but for neurological disease it may matter more.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Then there's C2S-Scale, a 27 billion parameter model from Google Research and Yale. It generated a new hypothesis for making 'cold' tumors visible to the immune system: pair the drug silmitasertib with low dose interferon to raise antigen presentation. Lab work on human neuroendocrine cell models confirmed the prediction, with antigen presentation up roughly 50%.",
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
                      'Go back to one word: free. Nothing commercial required releasing 214 million protein structures to every researcher on Earth, whatever their institution or country. That was a policy choice about who gets to use scientific infrastructure. A 2025 preprint found that before AlphaFold, the top 10% of universities published 55% of protein research articles and secured 50% of research grants.',
                  },
                  { type: 'cite', claimId: 'c-iii-biorxiv-concentration' },
                  {
                    type: 'text',
                    value:
                      " Open access is measurably narrowing that. It's a distributional result, and it deserves the same credit as the science.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'stackedBar',
            labelTop: 'Science · Before AlphaFold',
            title: 'A handful of universities once held much of the field',
            subtitle:
              'Share of protein-research output before AlphaFold opened its data; open access is now measurably reducing this concentration.',
            unit: '%',
            claimIds: ['c-iii-biorxiv-concentration'],
            ariaLabel:
              'Stacked bar chart: before AlphaFold, the top 10% of universities published 55% of protein-research articles and held 50% of grants, with all other universities accounting for the remaining 45% and 50%.',
            source: 'bioRxiv preprint, February 2025.',
            series: [
              { key: 'top10', label: 'Top 10% of universities', variant: 'accent' },
              { key: 'rest', label: 'All other universities', variant: 'navy' },
            ],
            data: [
              { label: 'Articles', top10: 55, rest: 45 },
              { label: 'Grants', top10: 50, rest: 50 },
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
                      "The thing I'd actually read about before today was the antibiotics. My whole life I've heard that one day the bacteria will outsmart every medicine we've got. Is it true AI found new ones?",
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
                      'In mice, yes. Researchers at MIT, the Broad Institute and Phare Bio trained a generative model to design entirely new antibiotics against drug-resistant bacteria. It screened more than 36 million molecular possibilities and narrowed them to a small set of promising compounds. Two eliminated MRSA (methicillin-resistant Staphylococcus aureus) in mouse models, and one showed activity against several other drug-resistant bacteria.',
                  },
                  { type: 'cite', claimId: 'c-iii-mit-antibiotic' },
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
                    value: "In mice. I've read a lot of good news that ended in mice.",
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
                      "Fair, and they still have to get through human trials. But look at what kind of molecules they are. Bacteria evolve defenses against specific structures, so a drug with a shape they've never met should take them much longer to beat. The AI didn't find another version of a drug we already have. It reached a part of chemical space that human researchers, working by hand, wouldn't have.",
                  },
                  { type: 'cite', claimId: 'c-iii-alation-chemical-space' },
                  {
                    type: 'text',
                    value:
                      ' Antimicrobial resistance kills over a million people a year. Discovery has historically been the hardest step, and that step happened.',
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
            attribution: 'Google AI Science, 2024',
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
      stanceOverride: { environmentalist: 'optimist', 'labor-advocate': 'neutral' },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Pharma R&D value',
                value: '$60–110B',
                size: 'large',
                description:
                  'Annual value generative AI could unlock across the pharmaceutical and medical products industries',
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
                labelTop: 'Cost per cancer detected',
                value: '$150K',
                size: 'large',
                description:
                  'Cost per lung cancer detected by screening without AI support, falling to about $300 with it',
                claimId: 's-iii-cancer-detection-150k',
              },
            ],
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'bar',
            orientation: 'horizontal',
            variant: 'environ',
            labelTop: 'Medicine · Preclinical testing',
            title: 'AI compresses preclinical testing from years to months',
            subtitle:
              'Time to complete preclinical drug testing: the traditional pipeline vs. AI-assisted (48 vs. 18 months).',
            unit: 'mo',
            claimIds: ['s-iii-preclinical-timeline'],
            ariaLabel:
              'Horizontal bar chart: preclinical drug testing takes about 48 months traditionally, compressed to about 18 months with AI assistance.',
            source: 'Preclinical-timeline research cited in Sources.',
            data: [
              { label: 'Traditional', value: 48, variant: 'navy' },
              { label: 'AI-assisted', value: 18, variant: 'environ' },
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
                      "Drug development is one of the least efficient things we do. An approved medicine costs about $2.6 billion and more than a decade to develop, and most of that is failure: compounds that look great early and turn out toxic or useless after the money's been spent. That's where AI is aimed.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      'Models now predict which protein targets are likely to be "druggable" before anyone sets foot in a lab, along with toxicity across organ systems, how fast the body absorbs and clears a drug, and the off-target effects that become side effects, all before synthesis.',
                  },
                  { type: 'cite', claimId: 'c-iii-lifebit-druggable' },
                  {
                    type: 'text',
                    value:
                      ' The McKinsey Global Institute puts the value generative AI could unlock across the pharmaceutical and medical products industries at $60 billion to $110 billion a year, and preclinical testing timelines are being compressed from four years to eighteen months.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-700m' },
                  {
                    type: 'text',
                    value:
                      ' And the molecules are holding up in the clinic: of the AI-discovered candidates that had completed Phase I trials by the end of 2023, 21 of 24 succeeded, well above the historic industry norm.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-70pct' },
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
                      "Cheaper for whom, though? When AI cuts what it costs to develop a drug, does the price come down for the patient, or does the margin go up for the manufacturer? The health benefit depends on who keeps the savings. A drug that was cheaper to develop and still costs $100,000 a year in treatment isn't a story about democratizing medicine. Same pill. Same price. Bigger margin.",
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
                      "I can't answer that, and I won't pretend the model sets the price. Nobody in my building does. Where I'd point you is diagnostics. AI reads X-rays, MRIs and CT scans as a second reader, not a replacement, catching what fatigue or distraction might miss. In one lung cancer screening analysis, the cost per cancer detected fell from about $150,000 without AI support to roughly $300 with it.",
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-150k' },
                  {
                    type: 'text',
                    value:
                      ' One hospital study of an AI radiology platform put the five-year return on investment at 451%, rising to 791% once radiologist time savings were counted.',
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
                    value: "Return for the hospital. That's my question again in a different coat.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Early detection is different, though, I'll give you that. Catching a cancer at Stage I instead of Stage III saves a life whatever the health system looks like. That one I'm glad exists.",
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
                      'And look where the money is going. Venture funding into AI health tech reached about $10.7 billion in 2025, up roughly 24% from $8.6 billion in 2024.',
                  },
                  { type: 'cite', claimId: 'c-iii-promptbuddy-98b' },
                  {
                    type: 'text',
                    value:
                      " It's heading toward profitable diseases in wealthy markets. The WHO says antimicrobial resistance kills disproportionately in low- and middle-income countries, the same places with the least access to AI-developed treatments. The new antibiotics matter. Whether they reach the people dying of resistant infections gets decided somewhere other than the lab.",
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
                      'That part I recognize. When I was teaching, the new things (the computers, the good textbooks) always seemed to reach the schools across town first. They were real, and they were good, and whether my kids ever saw them was decided by somebody I never met.',
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
                    "The healthcare and drug discovery evidence is among the strongest in the AI positive case: compressed timelines, lower failure rates, and measurably earlier disease detection are documented and peer-reviewed. Whether the financial gains flow back to patients or to shareholders is a distribution question that the technology itself doesn't answer.",
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
      stanceOverride: { environmentalist: 'optimist', 'labor-advocate': 'neutral' },
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
                description: 'Faster than prior forecasting models, at up to 1-hour resolution',
                claimId: 's-iii-weathernext-8x',
              },
            ],
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'line',
            area: true,
            variant: 'optimist',
            labelTop: 'Climate · Flood forecasting reach',
            title: 'From one country to 150 in seven years',
            subtitle:
              "Countries covered by Google's AI flood forecasting, which now protects over 2 billion people after growing from a 2018 pilot in India's Patna region.",
            unit: 'countries',
            claimIds: ['s-iii-flood-2b', 'c-iii-flood-2b'],
            ariaLabel:
              'Area chart: Google AI flood forecasting expanded from a 2018 pilot in one country to about 80 countries, and to 150 countries covering over 2 billion people by 2025.',
            source: 'Google Research, 2025; EcoSkills Academy, 2025.',
            annotations: [
              { at: '2018', text: 'Patna pilot' },
              { at: '~2024', text: '~500M people' },
              { at: '2025', text: '2B+ people' },
            ],
            data: [
              { label: '2018', value: 1 },
              { label: '~2024', value: 80 },
              { label: '2025', value: 150 },
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
                      "Here's one I'm glad to credit, and it ties straight back to the climate damage we started with. Google's flood forecasting began as a pilot in India's Patna region in 2018. It grew to more than 80 countries and around 500 million people, and as of 2025 it covers over two billion people in 150 countries for severe riverine floods.",
                  },
                  { type: 'cite', claimId: 'c-iii-flood-2b' },
                  {
                    type: 'text',
                    value:
                      " The old models needed gauge stations and local infrastructure. This works in ungauged watersheds (rivers nobody measures at all), which is where most of the world's flood-vulnerable communities live. A 2024 paper in Nature documented the first global prediction system for extreme floods in ungauged watersheds.",
                  },
                  { type: 'cite', claimId: 'c-iii-nature-ungauged' },
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
                      "Two billion people getting warnings they didn't get before. That's a village with time to move people before the water comes. How much time, though? An hour's notice isn't much if you're old, or you've got animals.",
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
                      "That's the right question. A warning that comes 24 to 72 hours ahead is a different thing from one that comes two hours ahead. You can move livestock, get elderly relatives out, grab the documents. Lead time is what turns a warning into a useful one, and it's getting longer in places that never had reliable forecasting.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Google DeepMind worked with weather agencies on experimental cyclone models built on stochastic neural networks, which can predict a cyclone's path up to 15 days in advance, further out than earlier systems managed.",
                  },
                  { type: 'cite', claimId: 'c-iii-cyclone-15-days' },
                  {
                    type: 'text',
                    value:
                      ' WeatherNext 2, their most advanced forecasting model, generates forecasts 8 times faster than prior models at up to 1-hour resolution, and developers anywhere can use it.',
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
            personaId: 'policy-realist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "And Flood Hub is free. It covers some of the most vulnerable people on Earth because someone decided to build it that way; no market force required it. Two billion people in flood plains don't send the revenue signal that two hundred million premium subscribers do.",
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
                      'Not all of the good news is charity, though. Farming is where the commercial tools have real numbers: a random effects meta-analysis of AI-driven irrigation studies published between 2018 and 2025 puts water savings at 30% to 50% and yield improvements at 20% to 30%.',
                  },
                  { type: 'cite', claimId: 'c-iii-farmonaut-yields' },
                  {
                    type: 'text',
                    value:
                      " Where drought makes harvests unpredictable, those aren't efficiency figures. They're food security. For a farmer on dry land, 20% more from the same field can be the difference between feeding a family and not.",
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
                      "Which farmer, though? A meta-analysis of 85 studies covering 1,472 farm observations found precision agriculture lifts net profit by about 18.5% on average, but the gains concentrate in large-scale grain farms; they're weaker and less stable on small farms and in developing countries.",
                  },
                  { type: 'cite', claimId: 'c-iii-farmonaut-70pct' },
                  {
                    type: 'text',
                    value:
                      " Smallholders are where most of the world's hunger is, and cost and connectivity keep them out. The technology works where it's been deployed. Getting it where it's needed is the problem nobody's solved.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"AI-driven flood forecasting now covers more than two billion people in 150 countries for severe riverine floods, replacing traditional models that required physical infrastructure most flood-vulnerable communities never had."',
            attribution: 'Google Research Year in Review, 2025',
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
      stanceOverride: { environmentalist: 'optimist', 'labor-advocate': 'neutral' },
      dividerBefore: true,
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'positive',
                labelTop: 'Harvard RCT, 2025',
                value: '0.73–1.3 SD',
                size: 'medium',
                description:
                  'Effect size of AI tutoring over in-class active learning (194 undergraduate physics students)',
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
                  'AI visual interpreting service offered at no cost: blind travelers navigate independently',
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
                      'The education result surprised even me. In June 2025, Harvard researchers published a randomized controlled trial in Scientific Reports, about as rigorous as education research gets. They split 194 undergraduate physics students between in-class active learning with experienced instructors and at-home sessions with a purpose-built AI tutor. The tutored students scored a median of 4.5 on the post-test, against 3.5 in the active learning classrooms. An effect size of 0.73 to 1.3 standard deviations is, in education research, considered large.',
                  },
                  { type: 'cite', claimId: 'c-iii-harvard-rct' },
                ],
              ],
            },
          },
        },
        {
          type: 'chart',
          data: {
            kind: 'bullet',
            variant: 'optimist',
            target: 3.5,
            targetLabel: 'Active-learning class',
            labelTop: 'Education · Harvard RCT (n = 194)',
            title: 'Students learned more with an AI tutor',
            subtitle:
              "Median physics post-test score: AI tutor vs. the in-class active-learning baseline, a learning gain more than double the control group's relative to baseline knowledge. Effect size 0.73–1.3 SD; p < 10⁻⁸.",
            claimIds: ['s-iii-harvard-effect-size', 'c-iii-harvard-rct'],
            ariaLabel:
              'Bullet chart: in a Harvard randomized controlled trial of 194 students, the AI-tutored group scored a median of 4.5 on the post-test, above the active-learning classroom baseline of 3.5.',
            source: 'Kestin et al., Scientific Reports, June 2025.',
            data: [{ label: 'AI tutor', value: 4.5, variant: 'optimist' }],
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
                      "I taught for a long time, and the child I still think about is the one stuck at the back while I'm helping somebody else. Did the tutor help that one? Or the ones who were already doing fine?",
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
                      "The study doesn't split it that way, so I can't tell you. What it does show is a difference that was statistically significant at a probability below one in one hundred million, from a tutor built on research-based teaching principles, not a chatbot with a syllabus. And Brookings research in 2026 identified AI tutoring as particularly valuable for novice teachers assigned to challenging environments and for under-resourced schools where human support is scarce.",
                  },
                  { type: 'cite', claimId: 'c-iii-brookings' },
                  {
                    type: 'text',
                    value: " That's as close to your kid at the back as the evidence gets.",
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
                      'Before we hand it to that kid: the research is mixed. A systematic literature review by Zhai et al. found that regular use of AI tutoring systems was associated in some studies with a decline in cognitive abilities, diminished information retention, and increased cognitive offloading: students accepting AI-generated answers rather than wrestling with the material themselves.',
                  },
                  { type: 'cite', claimId: 'c-iii-nhsjs-zhai' },
                  {
                    type: 'text',
                    value:
                      ' And a January 2026 survey of 1,057 college faculty found 95% expect generative AI to increase student overreliance on it, with 90% expecting a decline in critical thinking.',
                  },
                  { type: 'cite', claimId: 'c-iii-elon-faculty' },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "Harvard is one well-designed study. Across the literature, tutoring works when it's built deliberately and students use it actively. Hand a badly designed tutor to a struggling student and you can make things worse.",
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
                      "That I believe. Give a child the answer and you've taken the problem away, and the problem was the point.",
                  },
                ],
                [
                  {
                    type: 'text',
                    value:
                      "But what I really wanted to ask about today is my neighbor. She's losing her sight, she's been asking me about these tools, and I didn't know what to tell her.",
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
                      "Tell her about Seeing AI. It's a free Microsoft app on both iOS and Android: point the phone's camera and it describes the scene, reads text aloud, identifies objects, and recognizes people in real time.",
                  },
                  { type: 'cite', claimId: 'c-iii-seeing-ai' },
                  {
                    type: 'text',
                    value:
                      ' Be My Eyes started as a volunteer service and now has an AI feature that handles object recognition, text reading and navigation help without needing a live person on the line.',
                  },
                  { type: 'cite', claimId: 'c-iii-be-my-eyes' },
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
                      "Without a person. She'd like that more than you'd think. She hates asking. She's stopped going to the pharmacy on her own because she can't read the boxes on the shelf, and she won't call somebody every time she needs a label read to her.",
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
                      "That's what these tools are for: not having to ask. Aira, an AI-powered visual interpreting service, is now free at many airports including Denver International, so a blind traveler can get from check-in through security to the gate without waiting for a staff escort.",
                  },
                  { type: 'cite', claimId: 'c-iii-aira-denver' },
                  {
                    type: 'text',
                    value:
                      " Google's Live Transcribe does it for hearing, turning spoken conversation into text in real time for people who are deaf or hard of hearing, one on one, in groups, out in public.",
                  },
                  { type: 'cite', claimId: 'c-iii-live-transcribe' },
                  {
                    type: 'text',
                    value:
                      " None of this is someday. It's free or cheap and it's on phones now. For someone losing their sight, the world looks different with these than it did five years ago.",
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
                      'And some of it no longer depends on goodwill. In 2024, the U.S. Department of Justice finalized digital accessibility rules under Title II of the Americans with Disabilities Act, requiring state and local government websites and apps to meet accessibility standards.',
                  },
                  { type: 'cite', claimId: 'c-iii-doj-ada' },
                  {
                    type: 'text',
                    value:
                      ' The European Accessibility Act came into effect in June 2025, setting similar requirements for a wide range of products and services across EU member states.',
                  },
                  { type: 'cite', claimId: 'c-iii-eaa' },
                  {
                    type: 'text',
                    value:
                      ' The law creates the demand and the technology meets it. Either one alone is less durable.',
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
                      "I'm going to show her Seeing AI this week. Forget the airport; it's the pharmacy shelf. If that app reads her the boxes, she gets to go on her own again, and that's what she's actually been missing.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'pullquote',
          data: {
            text: '"Students using the AI tutor achieved learning gains more than double those of the control group relative to baseline knowledge, with an effect size between 0.73 and 1.3 standard deviations, which in educational research is considered large."',
            attribution:
              'Kestin et al., Scientific Reports, June 2025 (Harvard RCT, 194 undergraduate students)',
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
                      "Three of these now. The first time, I mostly wanted to know whether I was part of the problem every time I typed in a question. I still don't have a tidy answer. But I know what's on the other side of the scale now, and it isn't nothing.",
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
                      "It isn't, and it doesn't erase the other side either. Flood warnings for two billion people and the antibiotic candidates don't cancel the emissions we started with. They sit next to them. What strikes me is how much of today's list exists because someone decided to give it away: the open database, the free flood service, the free apps. Nobody made them do it.",
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
                      "This time. The same companies charge for nearly everything else, and a board can reverse a decision in one meeting. When it's given away, it reaches the most people. When it's sold, it pools with whoever can pay.",
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
                      "Then don't leave it to goodwill. Very little in the current incentive structure rewards building a public good. Put open-access conditions on public money; use procurement to buy what the market won't build. It's unglamorous, and it's most of the job.",
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
                      "These conversations have been more useful to me than most I have inside the industry. The positive case is strong: the Nobel wasn't political theater, and the flood forecasts, the antibiotics and the Harvard trial are all real. I believe in this work. But I'm leaving more convinced that the hardest questions aren't technical. Who benefits, who decides, who pays when we get it wrong: I can't ship an answer to those. They need the slow, contested politics people in my field find maddening.",
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
                      "I'm downloading Seeing AI tonight, so I know how it works before I sit down with her. It's a small thing. It's also the one I can do this week.",
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
      url: 'https://academic.oup.com/nar/article/52/D1/D368/7337620',
      title: 'Oxford Academic / Nucleic Acids Research (2024)',
      description:
        'AlphaFold DB: 214M+ protein structures, free global access, integration into PDB, UniProt, and Ensembl.',
    },
    {
      id: 'src-frontiers-ai',
      url: 'https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1739303/full',
      title: 'Frontiers in Artificial Intelligence (March 2026)',
      description:
        '~40% of new PDB structures in 2024–2025 used AI techniques; AlphaFold 3 impact on structural biology.',
    },
    {
      id: 'src-pnas',
      title: 'PNAS: AlphaFold Two Years On (August 2024)',
      description:
        "Validation of AlphaFold's widespread adoption and impact across structural biology community.",
    },
    {
      id: 'src-biorxiv',
      url: 'https://www.biorxiv.org/content/10.1101/2025.02.11.637417v2.full',
      title: 'biorxiv preprint (February 2025)',
      description:
        'Before AlphaFold, top 10% universities published 55% of protein research; open access measurably reducing concentration.',
    },
    {
      id: 'src-alation',
      url: 'https://news.mit.edu/2025/using-generative-ai-researchers-design-compounds-kill-drug-resistant-bacteria-0814',
      title: 'Alation / MIT-McMaster research summary (2025)',
      description:
        'AI screened 36M+ molecular possibilities; two candidates killed MRSA in mouse models; structurally novel antibiotic classes.',
    },
    {
      id: 'src-google-ai-science',
      url: 'https://www.science.org/doi/10.1126/science.adk4858',
      title: 'Google AI Science / blog.google (2024–2025)',
      description:
        "Human brain mapping with Harvard Lichtman Lab; AlphaFold's antibiotic and plastic pollution research applications.",
    },
    {
      id: 'src-mckinsey-pharma',
      url: 'https://www.mckinsey.com/industries/life-sciences/our-insights/generative-ai-in-the-pharmaceutical-industry-moving-from-hype-to-reality',
      title: 'McKinsey Global Institute: Generative AI in the Pharmaceutical Industry (2023)',
      description:
        'Estimates generative AI could unlock $60B to $110B a year in economic value across the pharmaceutical and medical products industries, equal to 2.6% to 4.5% of annual revenues.',
    },
    {
      id: 'src-ddt-ai-clinical',
      url: 'https://www.sciencedirect.com/science/article/pii/S135964462400134X',
      title:
        'Drug Discovery Today: How successful are AI-discovered drugs in clinical trials? (June 2024)',
      description:
        'First analysis of AI-discovered molecules in the clinic: 21 of 24 that completed Phase I succeeded, an 80% to 90% rate against a historic norm of roughly 40% to 65%; Phase II success is about 40% on a small sample.',
    },
    {
      id: 'src-gebremeskel',
      url: 'https://onlinelibrary.wiley.com/doi/10.1002/cso2.70000',
      title: 'Gebremeskel et al., Computational and Systems Oncology (2024)',
      description:
        'Lung cancer screening economics: cost per cancer detected of about $150,000 without AI support, falling to roughly $300 with it.',
    },
    {
      id: 'src-jacr-roi',
      url: 'https://www.jacr.org/article/S1546-1440(24)00292-8/fulltext',
      title:
        'Journal of the American College of Radiology: Quantifying the ROI of Hospital AI (March 2024)',
      description:
        'Analysis of an AI platform in a stroke-accredited hospital radiology workflow: 451% return on investment over five years, rising to 791% once radiologist time savings are counted.',
    },
    {
      id: 'src-crunchbase-health',
      url: 'https://news.crunchbase.com/health-wellness-biotech/ai-healthcare-funding-rises-2025/',
      title: 'Crunchbase News: AI healthcare funding (2025)',
      description:
        'Venture funding into AI health tech of about $10.7B in 2025, up roughly 24% from $8.6B in 2024.',
    },
    {
      id: 'src-google-c2s',
      url: 'https://blog.google/innovation-and-ai/products/google-gemma-ai-cancer-therapy-discovery/',
      title: 'Google: C2S-Scale 27B cancer therapy pathway (October 2025)',
      description:
        'Google Research and Yale 27B-parameter Cell2Sentence model generated a novel immunotherapy hypothesis (silmitasertib plus low-dose interferon), subsequently confirmed in living human cell models.',
    },
    {
      id: 'src-irrigation-meta',
      url: 'https://www.sciencedirect.com/science/article/pii/S2772375525002151',
      title:
        'AI-driven irrigation systems for sustainable water management: systematic review and meta-analysis (2025)',
      description:
        'Random-effects meta-analysis of peer-reviewed studies published 2018 to 2025: water savings of 30% to 50% and yield improvements of 20% to 30%.',
    },
    {
      id: 'src-precision-ag-meta',
      url: 'https://www.mdpi.com/2071-1050/17/24/11223',
      title:
        'Sustainability 17(24): Farm-Level Benefits of Precision Agriculture, a Meta-Analysis (December 2025)',
      description:
        'Meta-analysis of 85 studies and 1,472 farm observations: net profit up 18.5% and ROI up 22.3% on average, with benefits concentrated in large-scale grain farms and weaker on small farms and in developing countries.',
    },
    {
      id: 'src-elon-aacu',
      url: 'https://www.elon.edu/u/news/2026/01/21/elon-aacu-national-survey-95-of-college-faculty-fear-student-overreliance-on-ai/',
      title: 'Elon University / AAC&U national faculty survey (January 2026)',
      description:
        'Survey of 1,057 US college faculty: 95% expect generative AI to increase student overreliance on it, and 90% expect it to decrease critical thinking.',
    },
    {
      id: 'src-lifebit',
      url: 'https://lifebit.ai/blog/ai-driven-drug-discovery/',
      title: 'Lifebit AI (July 2025)',
      description:
        'AI predicts druggability, toxicity, pharmacokinetics, and off-target effects before lab synthesis.',
    },
    {
      id: 'src-google-research',
      url: 'https://sites.research.google/gr/floodforecasting/',
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
      url: 'https://www.nature.com/articles/s41586-024-07145-1',
      title: 'Nature Communications (March 2025)',
      description:
        'Global prediction of extreme floods in ungauged watersheds: first system to operate without physical gauge infrastructure.',
    },
    {
      id: 'src-kestin',
      url: 'https://www.nature.com/articles/s41598-025-97652-6',
      title: 'Kestin et al., Scientific Reports (June 2025)',
      description:
        'Harvard RCT: 194 undergraduate physics students; AI tutor effect size 0.73–1.3 SD over in-class active learning; p < 10⁻⁸.',
    },
    {
      id: 'src-etc-journal',
      url: 'https://etcjournal.com/2025/11/10/review-of-kestin-et-al-s-june-2025-harvard-study-on-ai-tutoring/',
      title: 'ET&C Journal (November 2025)',
      description:
        'Review of Harvard RCT: median post-test 4.5 vs. 3.5; learning gains more than double the control group relative to baseline.',
    },
    {
      id: 'src-brookings',
      url: 'https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring/',
      title: 'Brookings Institution (February 2026)',
      description:
        'AI tutoring most valuable for under-resourced schools and novice teachers; potential to scale expert-level support.',
    },
    {
      id: 'src-nhsjs',
      url: 'https://nhsjs.com/2025/analysing-the-effectiveness-of-different-ai-based-tutoring-systems-and-their-impact-on-education-across-global-contexts-a-literature-review/',
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
      url: 'https://www.cpwd.org/blog/how-ai-is-changing-accessibility-progress-challenges-and-the-path-ahead',
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
      verificationStatus: 'verified',
      verifiedUrl: 'https://academic.oup.com/nar/article/52/D1/D368/7337620',
      note: "Nucleic Acids Research (2024) AlphaFold DB paper confirms 'over 214 million predicted protein structures,' covering nearly all of UniProt, freely available.",
      lastCheckedISO: '2026-06-24',
    },
    's-iii-nobel-chemistry-2024': {
      id: 's-iii-nobel-chemistry-2024',
      kind: 'statistic',
      claimText: 'Chemistry 2024',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.nobelprize.org/prizes/chemistry/2024/press-release/',
      note: 'NobelPrize.org: the 2024 Chemistry Prize went to Demis Hassabis & John Jumper (AlphaFold) and David Baker (protein design). The "first AI-driven tool" framing is commentary, not an official Nobel designation.',
      lastCheckedISO: '2026-06-24',
    },
    's-iii-antibiotic-36m': {
      id: 's-iii-antibiotic-36m',
      kind: 'statistic',
      claimText: '36M+',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://news.mit.edu/2025/using-generative-ai-researchers-design-compounds-kill-drug-resistant-bacteria-0814',
      note: 'MIT News: generative AI designed and screened more than 36 million possible compounds; lead candidate DN1 cleared MRSA in mice (Collins lab, Cell, Aug 2025).',
      lastCheckedISO: '2026-06-24',
    },
    's-iii-drug-cost-700m': {
      id: 's-iii-drug-cost-700m',
      kind: 'statistic',
      claimText: '$60–110B',
      sourceId: 'src-mckinsey-pharma',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.mckinsey.com/industries/life-sciences/our-insights/generative-ai-in-the-pharmaceutical-industry-moving-from-hype-to-reality',
      note: 'Restated to the figure that is actually sourceable. The former $700M average saving per drug traced only to a marketing blog and no primary source corroborated it. The McKinsey Global Institute estimate of $60B to $110B a year in value across the pharmaceutical and medical products industries (2.6% to 4.5% of annual revenues) is the published industry figure.',
      lastCheckedISO: '2026-08-22',
    },
    's-iii-preclinical-timeline': {
      id: 's-iii-preclinical-timeline',
      kind: 'statistic',
      claimText: '4 yrs → 18 mo',
      verificationStatus: 'verified',
      verifiedUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12298131/',
      note: 'Peer-reviewed/industry sources document AI compressing preclinical candidate development to ~13–18 months vs a traditional 3–4 years (e.g. Insilico Medicine advanced an IPF candidate in ~18 months).',
      lastCheckedISO: '2026-06-24',
    },
    's-iii-cancer-detection-150k': {
      id: 's-iii-cancer-detection-150k',
      kind: 'statistic',
      claimText: '$150K',
      sourceId: 'src-gebremeskel',
      verificationStatus: 'verified',
      verifiedUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/cso2.70000',
      note: 'Figure confirmed in Gebremeskel et al. (2024) and the label corrected to match it: $150,000 is the cost per lung cancer detected by screening without AI support, falling to about $300 with it. It was previously presented as an average per-patient treatment saving, which the source does not support.',
      lastCheckedISO: '2026-08-22',
    },
    's-iii-flood-2b': {
      id: 's-iii-flood-2b',
      kind: 'statistic',
      claimText: '2B+',
      verificationStatus: 'verified',
      verifiedUrl: 'https://sites.research.google/gr/floodforecasting/',
      note: "Google Research's Flood Forecasting page states the AI forecasts 'cover 2B people in over 150 countries' for significant flood events.",
      lastCheckedISO: '2026-06-24',
    },
    's-iii-cyclone-15-days': {
      id: 's-iii-cyclone-15-days',
      kind: 'statistic',
      claimText: 'Up to 15 days',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://deepmind.google/blog/how-were-supporting-better-tropical-cyclone-prediction-with-ai/',
      note: "Google DeepMind's Weather Lab cyclone model predicts formation, track, intensity and size up to 15 days ahead via a stochastic neural network (50 scenarios).",
      lastCheckedISO: '2026-06-24',
    },
    's-iii-weathernext-8x': {
      id: 's-iii-weathernext-8x',
      kind: 'statistic',
      claimText: '8×',
      verificationStatus: 'verified',
      verifiedUrl: 'https://blog.google/technology/google-deepmind/weathernext-2/',
      note: 'Google: WeatherNext 2 generates forecasts 8× faster at up to 1-hour resolution, available to developers via Earth Engine, BigQuery and Vertex AI.',
      lastCheckedISO: '2026-06-24',
    },
    's-iii-harvard-effect-size': {
      id: 's-iii-harvard-effect-size',
      kind: 'statistic',
      claimText: '0.73–1.3 SD',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.nature.com/articles/s41598-025-97652-6',
      note: 'Kestin et al. (Scientific Reports, June 2025): effect size 0.73–1.3 SD for AI tutoring over in-class active learning among 194 undergraduate physics students at Harvard.',
      lastCheckedISO: '2026-06-24',
    },
    's-iii-seeing-ai': {
      id: 's-iii-seeing-ai',
      kind: 'statistic',
      claimText: 'Free, iOS & Android',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://blogs.microsoft.com/accessibility/seeing-ai-app-launches-on-android-including-new-and-updated-features-and-new-languages/',
      note: "Microsoft's accessibility blog: Seeing AI is a free app on iOS and Android that describes scenes, reads text, and recognises objects in real time for blind/low-vision users.",
      lastCheckedISO: '2026-06-24',
    },
    's-iii-aira-denver': {
      id: 's-iii-aira-denver',
      kind: 'statistic',
      claimText: 'Free Aira Access',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.flydenver.com/at-the-airport/services-and-amenities/accessibility-services/',
      note: 'Denver International Airport lists Aira as a free on-site AI visual-interpreting service for blind/low-vision travelers.',
      lastCheckedISO: '2026-06-24',
    },
    // ── Citations ────────────────────────────────────────────
    'c-iii-alphafold-214m': {
      id: 'c-iii-alphafold-214m',
      kind: 'citation',
      claimText: '[Oxford Academic / Nucleic Acids Research, 2024]',
      sourceId: 'src-oxford-nar',
      verificationStatus: 'verified',
      verifiedUrl: 'https://academic.oup.com/nar/article/52/D1/D368/7337620',
      note: "Confirmed by the primary source (Nucleic Acids Research 2024, vol. 52, D368): AlphaFold DB holds 'over 214 million predicted protein structures,' freely available.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-nobel-2024': {
      id: 'c-iii-nobel-2024',
      kind: 'citation',
      claimText: '[PNAS / Frontiers in AI, 2026]',
      sourceId: 'src-pnas',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.nobelprize.org/prizes/chemistry/2024/press-release/',
      note: 'Official Nobel press release: 2024 Chemistry Prize for AlphaFold (Hassabis/Jumper) and protein design (Baker). "First AI-driven tool to earn it" is widely repeated framing, not an official Nobel statement.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-pdb-40pct': {
      id: 'c-iii-pdb-40pct',
      kind: 'citation',
      claimText: '[Frontiers in AI, March 2026]',
      sourceId: 'src-frontiers-ai',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1739303/full',
      note: 'Prose corrected to match the source: the ~40% figure is the share of new PDB structures obtained by cryo-electron microscopy, not by AI techniques. The sentence now states the cryo-EM figure the article actually reports.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-mit-antibiotic': {
      id: 'c-iii-mit-antibiotic',
      kind: 'citation',
      claimText: '[MIT / Broad Institute / Phare Bio, 2025]',
      sourceId: 'src-alation',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://news.mit.edu/2025/using-generative-ai-researchers-design-compounds-kill-drug-resistant-bacteria-0814',
      note: 'Attribution corrected. The study (Krishnan et al., Collins lab, Cell, August 2025) confirms 36M+ compounds screened, structurally novel candidates, and DN1 clearing MRSA in mice. It is MIT, the Broad Institute, and Phare Bio; the earlier McMaster attribution was conflated with the 2020 Stokes halicin work and has been removed.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-brain-mapping': {
      id: 'c-iii-brain-mapping',
      kind: 'citation',
      claimText: '[Google AI Science page, 2024]',
      sourceId: 'src-google-ai-science',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.science.org/doi/10.1126/science.adk4858',
      note: 'Harvard Lichtman Lab and Google Research mapped 1 cubic mm of human cortex (~57,000 cells, 150M synapses, 1.4 PB), published in Science (May 2024), with data and AI annotations made freely available.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-cancer-protein': {
      id: 'c-iii-cancer-protein',
      kind: 'citation',
      claimText: '[Google Research / Yale, C2S-Scale, October 2025]',
      sourceId: 'src-google-c2s',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://blog.google/innovation-and-ai/products/google-gemma-ai-cancer-therapy-discovery/',
      note: 'Claim rewritten to the work that actually exists. No source supported the previous assertion that DeepMind identified an unknown protein interaction critical to cancer cell survival. The documented result is C2S-Scale 27B (Google Research and Yale, October 2025) predicting that silmitasertib plus low-dose interferon raises antigen presentation, confirmed afterwards in human neuroendocrine cell models.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-biorxiv-concentration': {
      id: 'c-iii-biorxiv-concentration',
      kind: 'citation',
      claimText: '[biorxiv preprint, February 2025]',
      sourceId: 'src-biorxiv',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.biorxiv.org/content/10.1101/2025.02.11.637417v2.full',
      note: 'The bioRxiv preprint (posted 11 Feb 2025) states verbatim that before AlphaFold, top-10% universities published 55% of articles in leading journals and secured 50% of grants, and documents lower-ranked institutions gaining ground post-release.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-alation-chemical-space': {
      id: 'c-iii-alation-chemical-space',
      kind: 'citation',
      claimText: '[Alation, 2025]',
      sourceId: 'src-alation',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://news.mit.edu/2025/using-generative-ai-researchers-design-compounds-kill-drug-resistant-bacteria-0814',
      note: "Supported by the primary MIT/Cell source: the AI-designed candidates were 'structurally distinct from any existing antibiotics' and worked by novel mechanisms, i.e. from a region of chemical space not reached by conventional manual discovery.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-lifebit-druggable': {
      id: 'c-iii-lifebit-druggable',
      kind: 'citation',
      claimText: '[Lifebit AI, 2025]',
      sourceId: 'src-lifebit',
      verificationStatus: 'verified',
      verifiedUrl: 'https://lifebit.ai/blog/ai-driven-drug-discovery/',
      note: 'Lifebit (Jun 2025) accurately describes a real capability class: predicting druggable targets, toxicity, pharmacokinetics, and off-target effects before synthesis. Context: an approved medicine averages ~$2.6B to develop (Tufts CSDD / DiMasi).',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-promptbuddy-700m': {
      id: 'c-iii-promptbuddy-700m',
      kind: 'citation',
      claimText: '[McKinsey Global Institute, 2023]',
      sourceId: 'src-mckinsey-pharma',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.mckinsey.com/industries/life-sciences/our-insights/generative-ai-in-the-pharmaceutical-industry-moving-from-hype-to-reality',
      note: 'Re-sourced from a marketing blog to the McKinsey Global Institute estimate, and the prose restated to the $60B to $110B annual industry figure. The paired 4yr to 18mo preclinical compression was already independently documented (see s-iii-preclinical-timeline).',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-promptbuddy-70pct': {
      id: 'c-iii-promptbuddy-70pct',
      kind: 'citation',
      claimText: '[Drug Discovery Today, June 2024]',
      sourceId: 'src-ddt-ai-clinical',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.sciencedirect.com/science/article/pii/S135964462400134X',
      note: 'The unsupported "70% of failed candidates caught earlier" figure was replaced with the peer-reviewed finding it was gesturing at: of 24 AI-discovered molecules that completed Phase I by the end of 2023, 21 succeeded, an 80% to 90% rate against a historic norm of roughly 40% to 65%. The authors note the sample is small and Phase II success is about 40%.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-promptbuddy-150k': {
      id: 'c-iii-promptbuddy-150k',
      kind: 'citation',
      claimText: '[Gebremeskel et al., 2024]',
      sourceId: 'src-gebremeskel',
      verificationStatus: 'verified',
      verifiedUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/cso2.70000',
      note: 'Re-sourced to the primary study and the prose corrected: $150,000 is the cost per lung cancer detected by screening without AI support, falling to about $300 with it, not an average per-patient treatment saving.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-promptbuddy-18pct': {
      id: 'c-iii-promptbuddy-18pct',
      kind: 'citation',
      claimText: '[Journal of the American College of Radiology, March 2024]',
      sourceId: 'src-jacr-roi',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.jacr.org/article/S1546-1440(24)00292-8/fulltext',
      note: 'The unsupported generalisation that hospitals see 18% lower imaging costs was replaced with a published hospital-level result: a 451% five-year return on investment for an AI radiology platform, rising to 791% once radiologist time savings are counted. Note this is one stroke-accredited hospital, not an industry average.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-promptbuddy-98b': {
      id: 'c-iii-promptbuddy-98b',
      kind: 'citation',
      claimText: '[Crunchbase News, 2025]',
      sourceId: 'src-crunchbase-health',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://news.crunchbase.com/health-wellness-biotech/ai-healthcare-funding-rises-2025/',
      note: 'Figures corrected to the reported data: about $10.7B into AI health tech in 2025, up roughly 24% from $8.6B in 2024. The previous $9.8B at +67% pairing appeared only in a marketing blog.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-flood-2b': {
      id: 'c-iii-flood-2b',
      kind: 'citation',
      claimText: '[Google Research, 2025; EcoSkills Academy, 2025]',
      sourceId: 'src-google-research',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://blog.google/company-news/outreach-and-initiatives/sustainability/flood-hub-ai-flood-forecasting-more-countries/',
      note: 'Google confirms the 2018 Patna, India pilot, the Flood Hub expansion to 80 countries (~460–500M people), and (current Flood Forecasting page) 2B+ people across 150+ countries for riverine floods.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-nature-ungauged': {
      id: 'c-iii-nature-ungauged',
      kind: 'citation',
      claimText: '[Nature Communications, 2025, citing Nearing et al., 2024]',
      sourceId: 'src-nature-communications',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.nature.com/articles/s41586-024-07145-1',
      note: "Nearing et al., 'Global prediction of extreme floods in ungauged watersheds,' Nature 627, 559–563 (2024). Note it appeared in Nature itself, not 'Nature Communications 2025' as the citation label implies.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-cyclone-15-days': {
      id: 'c-iii-cyclone-15-days',
      kind: 'citation',
      claimText: '[Google Research 2025]',
      sourceId: 'src-google-research',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://deepmind.google/blog/how-were-supporting-better-tropical-cyclone-prediction-with-ai/',
      note: "DeepMind's June 2025 Weather Lab uses a stochastic neural network for cyclone prediction up to 15 days ahead, validated in partnership with the US National Hurricane Center.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-weathernext-8x': {
      id: 'c-iii-weathernext-8x',
      kind: 'citation',
      claimText: '[Google Research, January 2026]',
      sourceId: 'src-google-research',
      verificationStatus: 'verified',
      verifiedUrl: 'https://blog.google/technology/google-deepmind/weathernext-2/',
      note: 'WeatherNext 2 (announced Nov 2025) generates forecasts 8× faster at up to 1-hour resolution via a Functional Generative Network, available to developers on Google Cloud.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-farmonaut-yields': {
      id: 'c-iii-farmonaut-yields',
      kind: 'citation',
      claimText: '[AI-driven irrigation meta-analysis, 2025]',
      sourceId: 'src-irrigation-meta',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.sciencedirect.com/science/article/pii/S2772375525002151',
      note: 'Re-sourced from a vendor marketing blog to a peer-reviewed random-effects meta-analysis of studies published 2018 to 2025, and the figures restated to what it reports: water savings of 30% to 50% and yield improvements of 20% to 30%.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-farmonaut-70pct': {
      id: 'c-iii-farmonaut-70pct',
      kind: 'citation',
      claimText: '[Sustainability 17(24), precision agriculture meta-analysis, 2025]',
      sourceId: 'src-precision-ag-meta',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.mdpi.com/2071-1050/17/24/11223',
      note: 'The vendor-blog estimate that 70% of large-scale farms use AI was replaced with a peer-reviewed meta-analysis of 85 studies and 1,472 farm observations, which supports the same point with sourceable numbers: net profit up about 18.5% on average, with benefits concentrated in large-scale grain farms and weaker on small farms and in developing countries.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-harvard-rct': {
      id: 'c-iii-harvard-rct',
      kind: 'citation',
      claimText: '[Kestin et al., Scientific Reports, June 2025; ET&C Journal, November 2025]',
      sourceId: 'src-kestin',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.nature.com/articles/s41598-025-97652-6',
      note: 'Kestin et al., Scientific Reports (3 June 2025): 194 undergraduate physics students; median post-test 4.5 (AI tutor) vs 3.5 (active learning); effect size 0.73–1.3 SD; p < 1-in-100-million.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-brookings': {
      id: 'c-iii-brookings',
      kind: 'citation',
      claimText: '[Brookings, February 2026]',
      sourceId: 'src-brookings',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring/',
      note: 'Brookings describes generative-AI tutoring as especially valuable for novice teachers in challenging environments and for under-resourced schools.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-nhsjs-zhai': {
      id: 'c-iii-nhsjs-zhai',
      kind: 'citation',
      claimText: '[NHSJS literature review, 2025]',
      sourceId: 'src-nhsjs',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://nhsjs.com/2025/analysing-the-effectiveness-of-different-ai-based-tutoring-systems-and-their-impact-on-education-across-global-contexts-a-literature-review/',
      note: 'The Zhai et al. point is genuinely in the NHSJS review: AI-tutoring links to declining cognitive abilities, diminished retention, and cognitive offloading. The faculty-survey figure that was previously folded into this citation now carries its own claim and source (c-iii-elon-faculty), so the two are no longer conflated.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-elon-faculty': {
      id: 'c-iii-elon-faculty',
      kind: 'citation',
      claimText: '[Elon University / AAC&U faculty survey, January 2026]',
      sourceId: 'src-elon-aacu',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.elon.edu/u/news/2026/01/21/elon-aacu-national-survey-95-of-college-faculty-fear-student-overreliance-on-ai/',
      note: 'Survey of 1,057 US college faculty run 29 October to 26 November 2025 and published January 2026: 95% expect generative AI to increase student overreliance on it, and 90% expect a decline in critical thinking. Previously asserted in the prose with no citation of its own.',
      lastCheckedISO: '2026-08-22',
    },
    'c-iii-seeing-ai': {
      id: 'c-iii-seeing-ai',
      kind: 'citation',
      claimText: '[Level Access / AI Assistive Tech, March 2026]',
      sourceId: 'src-level-access',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://blogs.microsoft.com/accessibility/seeing-ai-app-launches-on-android-including-new-and-updated-features-and-new-languages/',
      note: 'Microsoft: Seeing AI is a free iOS & Android app using the camera + AI vision to describe scenes, read text, identify objects, and recognise people in real time.',
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-be-my-eyes': {
      id: 'c-iii-be-my-eyes',
      kind: 'citation',
      claimText: '[Level Access, 2026]',
      sourceId: 'src-level-access',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://support.bemyeyes.com/hc/en-us/articles/17493302011921-Be-My-AI-image-to-text-assistance',
      note: "Be My Eyes (founded 2012, originally volunteer-based) launched 'Be My AI' in 2023, a GPT-4-powered feature handling object recognition, text reading, and guidance without a live human.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-live-transcribe': {
      id: 'c-iii-live-transcribe',
      kind: 'citation',
      claimText: '[Level Access, 2026]',
      sourceId: 'src-level-access',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.android.com/accessibility/live-transcribe/',
      note: "Google's Android accessibility page describes Live Transcribe as a free app converting speech to text in real time for deaf/hard-of-hearing users.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-aira-denver': {
      id: 'c-iii-aira-denver',
      kind: 'citation',
      claimText: '[Center for People with Disabilities, August 2025]',
      sourceId: 'src-cpwd',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.flydenver.com/at-the-airport/services-and-amenities/accessibility-services/',
      note: "Denver International Airport offers Aira AI-powered visual interpreting free on-site, consistent with Aira's airport access-partner program.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-doj-ada': {
      id: 'c-iii-doj-ada',
      kind: 'citation',
      claimText: '[Center for People with Disabilities, 2025]',
      sourceId: 'src-cpwd',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.federalregister.gov/documents/2024/04/24/2024-07758/nondiscrimination-on-the-basis-of-disability-accessibility-of-web-information-and-services-of-state',
      note: "DOJ's final rule (24 April 2024) under ADA Title II requires state/local government web content and mobile apps to meet WCAG 2.1 Level AA.",
      lastCheckedISO: '2026-06-24',
    },
    'c-iii-eaa': {
      id: 'c-iii-eaa',
      kind: 'citation',
      claimText: '[Center for People with Disabilities, 2025]',
      sourceId: 'src-cpwd',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en',
      note: 'The European Accessibility Act (Directive (EU) 2019/882) came into effect on 28 June 2025, harmonising accessibility requirements across EU member states.',
      lastCheckedISO: '2026-06-24',
    },
  },
}
