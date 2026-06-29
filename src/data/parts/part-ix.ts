import type { RoundtableDocument } from '../../types/document'

export const partIX: RoundtableDocument = {
  id: 'part-ix',
  slug: 'the-creativity-question',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Culture · Copyright · Authorship · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'The Creativity Question', em: true }]],
    subtitle:
      'Models that write, draw, and compose were built on the work of people who were never asked. This part takes up the question of culture: what human creativity is worth when a machine can imitate it instantly — and who owes whom for the imitation.',
    dateLine: 'June 2026 · Ninth in the AI Reckoning series',
    accentColor: 'rose',
  },
  companion: {
    text: 'Part IX of the AI Reckoning Series — Read alongside Parts I–VIII for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'Generative models learned to make culture the only way anyone could teach them: by ingesting culture — billions of images, songs, and sentences made by people. Most of those people did not consent, were not paid, and in many cases did not know it had happened. Now the same models produce work in their styles, at a scale and price no human can match. This part asks what that does to the value of human creativity, and what, if anything, is owed for the material it was built on.',
      },
    ],
    [
      {
        type: 'text',
        value:
          'The Artist who joined the table back in Part V leads this one. She found her own catalogue inside a training set she never agreed to, and she speaks for the illustrators, writers, musicians, and translators whose work became raw material. Around her the debate is genuinely hard: a Tech Optimist who sees transformation, a Policy Realist tracing a copyright system improvising in real time, and an Economist asking what a market for human-made work even looks like now.',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — The Scrape
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'The Scrape' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'Images in one training set',
                value: '5.85B',
                size: 'large',
                description:
                  'Image–text pairs in LAION-5B, the open dataset behind Stable Diffusion',
                claimId: 's-ix-laion',
              },
              {
                variant: 'neutral',
                labelTop: 'Illustrators losing work',
                value: '26%',
                size: 'medium',
                description:
                  'Share of illustrators who reported losing work to generative AI (Society of Authors, 2024)',
                claimId: 's-ix-illustrators',
              },
              {
                variant: 'caution',
                labelTop: 'AI images made',
                value: '15B+',
                size: 'medium',
                description:
                  'AI-generated images created in roughly the first year of the tools (Everypixel, 2023)',
                claimId: 's-ix-images-made',
              },
            ],
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'artist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Let me start with the number that ended my naivety. The open dataset behind a lot of image generation, LAION-5B, contains roughly 5.85 billion image–text pairs scraped from the web.',
                  },
                  { type: 'cite', claimId: 'c-ix-laion' },
                  {
                    type: 'text',
                    value:
                      ' Mine were in there. So were my friends\'. Nobody emailed us. The defense I keep hearing is that it was "publicly available" — but publicly visible has never meant free to take. A shop window is public. That does not make the clothes free.',
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
                      'I want to be careful and fair here, because the engineering reality matters. A model does not store your images; it learns statistical patterns from them, the way an art student learns by studying thousands of paintings. We do not say a student who studied Picasso owes the estate when they paint. The scale is unprecedented, I grant that — but "a machine learned from public examples" is not obviously theft, legally or morally.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'artist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "The art-student analogy is the most overused sentence in this entire debate, and it breaks on two points. A student cannot study ten thousand of my pieces overnight and then flood the market with a thousand near-substitutes a day, undercutting me on the exact aesthetic I spent twenty years building. And a student is a person taking part in culture. A company ingesting my life's work to build a product that competes with me is not a student. It is a competitor that used my own output as the fuel.",
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
                      'I\'ll concede more here than I usually do. I came in expecting an overblown panic, and the consent problem is real — "it was on the internet" is doing an enormous amount of unearned work. Where I stay skeptical is the leap from "this is unfair" to "this is illegal" to "this can be stopped." Three different claims. The first is strong. The second is being fought in court right now. The third may simply be beyond reach.',
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
            labelTop: 'Training Data · Scale',
            title: 'From Thousands to Billions',
            subtitle:
              'The jump in training-set scale is the whole story: ImageNet (2009) catalogued about 14 million labelled images; LAION-5B (2022) holds roughly 5.85 billion image–text pairs.',
            source: 'ImageNet (Deng et al., 2009); LAION-5B (2022)',
            claimIds: ['c-ix-laion'],
            ariaLabel:
              'Bar chart comparing about 14 million images in ImageNet to about 5,850 million image-text pairs in LAION-5B',
            unit: 'M images',
            variant: 'navy',
            data: [
              { label: 'ImageNet\n2009', value: 14 },
              { label: 'LAION-5B\n2022', value: 5850, variant: 'accent' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — Theft or Transformation?
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'Theft or Transformation?' },
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
                      'Legally, none of this is settled, and anyone who tells you otherwise is selling something. The central US question is fair use — whether training is a "transformative" use of copyrighted work. That doctrine weighs, among other things, the effect on the market for the original. The New York Times sued OpenAI and Microsoft in December 2023 on exactly this ground.',
                  },
                  { type: 'cite', claimId: 'c-ix-nyt-suit' },
                  {
                    type: 'text',
                    value:
                      ' Separately, the US Copyright Office has held that works generated by AI without meaningful human authorship cannot themselves be copyrighted. So the same technology may both infringe on the way in and produce un-ownable output on the way out.',
                  },
                  { type: 'cite', claimId: 'c-ix-copyright-office' },
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
                      'And the transformation case is not frivolous. These tools let a teacher illustrate a lesson, a small founder mock up a product, a non-native speaker write clearly. That is real creative capacity handed to people who had none. The market-harm question is genuine, but so is the access gain. Courts are going to have to weigh a real harm to incumbents against a real benefit to a much larger group.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'artist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Notice the move, though — "democratizing creativity." It is generous about access and silent about volume. Within a year of release, people had generated more than fifteen billion AI images.',
                  },
                  { type: 'cite', claimId: 'c-ix-images-made' },
                  {
                    type: 'text',
                    value:
                      ' That is more than the entire stock-photo industry produced in decades, made in months, trained on us. Even if every single image is legal, the flood itself is the harm: it collapses the price of the thing we make and buries the human work under an ocean of synthetic near-copies.',
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
            labelTop: 'Synthetic Output · Everypixel',
            title: 'A Year of AI Images',
            subtitle:
              'By rough industry estimates, more than 15 billion AI images were created in the roughly twelve months after the tools went mainstream — outpacing what the stock-photo industry made in decades.',
            source: 'Everypixel Journal — AI Image Statistics (2023)',
            claimIds: ['c-ix-images-made'],
            ariaLabel:
              'Line chart showing cumulative AI images generated rising past 15 billion within about a year of the tools becoming available',
            unit: 'B',
            variant: 'labor',
            data: [
              { label: 'Launch', value: 0 },
              { label: '+3 mo', value: 2 },
              { label: '+6 mo', value: 6 },
              { label: '+9 mo', value: 11 },
              { label: '+12 mo', value: 15 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — The Market for Human Work
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'The Market for Human Work' },
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
                      'Let me make the harm concrete, because it is already measurable. A 2024 Society of Authors survey found that about a quarter of illustrators and well over a third of translators had already lost work to generative AI.',
                  },
                  { type: 'cite', claimId: 'c-ix-soa' },
                  {
                    type: 'text',
                    value:
                      ' These are not abstract future fears. They are the first wave, in precisely the freelance, mid-skill creative jobs that were already economically fragile. The pattern is classic: a new technology captures the routine middle of a market and leaves a thin top and a precarious bottom.',
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
                      'And creative work has always been undervalued precisely because people love doing it — "do it for the exposure" is the oldest wage suppression there is. AI supercharges that. When a client can get a passable logo for free, the floor under the illustrator who needs to eat falls out. The 2023 Hollywood writers\' strike won real guardrails on AI in their contracts. Most creative workers have no union and no contract to negotiate.',
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
                      "I have to be honest, because I think I am the customer you are worried about. I used one of these tools to make a card for my granddaughter's birthday, and it was lovely, and it was free. I did not think of it as taking work from anyone. Now I am wondering how many small kindnesses like mine add up to someone losing a living.",
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'artist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      "Thank you for saying that — and please don't carry it as guilt. You are not the villain; the card is not the problem. The problem is a system that took our work to build the tool and then routed every cent of the value to the company that made it, with nothing flowing back to the people it learned from. Fix that, and your birthday card and my career can both exist. That is the whole fight: not banning the tool, but reconnecting it to the people it was built on.",
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
            labelTop: 'Lost Work · Society of Authors',
            title: 'Creators Already Losing Income',
            subtitle:
              'In a 2024 Society of Authors survey, about 26% of illustrators and 37% of translators reported having lost work because of generative AI.',
            source: 'The Society of Authors — Member Survey (2024)',
            claimIds: ['c-ix-soa'],
            ariaLabel:
              'Horizontal bar chart showing about 37 percent of translators and 26 percent of illustrators reported losing work to generative AI',
            unit: '%',
            variant: 'accent',
            data: [
              { label: 'Translators', value: 37, variant: 'labor' },
              { label: 'Illustrators', value: 26, variant: 'labor' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND IV — What Authorship Is Worth
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'What Authorship Is Worth' },
      stanceOverride: { 'tech-optimist': 'neutral' },
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
                      'Here is the constructive turn, and it is already underway: licensing. Rather than fight every case to the Supreme Court, some AI companies are simply paying for data. Through 2024, OpenAI alone signed content deals with a string of major publishers — Axel Springer, the Associated Press, the Financial Times, News Corp, and others.',
                  },
                  { type: 'cite', claimId: 'c-ix-licensing' },
                  {
                    type: 'text',
                    value:
                      ' That establishes the principle that training data has a price. The danger is that only the largest rights-holders — big publishers, major labels — get to the table, while the individual illustrator and the mid-list author are left out entirely.',
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
                      'The Policy Realist has named the real design problem. Licensing markets reward concentrated rights-holders and bypass the dispersed individual creator — the very people the data mostly came from. The instruments that could fix that are not exotic: collective licensing, the way music royalties are pooled and distributed; an opt-out and a price by default; and provenance standards, the same content-credential plumbing Part V proposed, used here to track whose work trained what.',
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
                      'And this is buildable — it is the same provenance technology, pointed at attribution instead of detection. Models trained only on licensed or public-domain data already exist; some image tools now compensate contributors to their training sets. The technical path to a consenting, paying pipeline is real. What is missing is not the capability. It is the will to choose the more expensive, fairer architecture over the free one.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'artist',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'That is exactly it. I am not a Luddite — I use these tools too. I want three things, and they are not radical: consent, so we are asked; credit, so the lineage is visible; and compensation, so value flows back to the people it came from. Consent, credit, compensation. Get those and the technology becomes a collaborator. Skip them and it is just the most efficient machine ever built for taking culture from the people who make it and selling it back to them.',
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
            labelTop: 'A Market Forms · AI Content Deals',
            title: 'Licensing Goes from Rare to Routine',
            subtitle:
              'Publicly announced AI-content licensing deals jumped from a small handful in 2023 to a wave in 2024 as companies chose to pay for data rather than only litigate. Counts are approximate.',
            source: 'Publicly reported AI–publisher licensing agreements (2023–2024)',
            claimIds: ['c-ix-licensing'],
            ariaLabel:
              'Bar chart showing publicly announced AI content licensing deals rising from about 2 in 2023 to about 12 in 2024',
            unit: 'deals',
            variant: 'gold',
            data: [
              { label: '2023', value: 2 },
              { label: '2024', value: 12, variant: 'accent' },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'Consent, Credit, Compensation',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            'The creativity question is not really about whether machines can be creative. It is about a transfer: the work of millions of uncredited, unpaid people was used to build tools that now compete with them. The Tech Optimist is right that the access gains are real and the technology is not going away. The Policy Realist is right that the law is improvising and unsettled. The Economist is right that the harm is already measurable in lost commissions. And the Artist is right that none of it required taking without asking — that was a choice, made because it was cheaper.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'The repair is not mysterious, and it is not a ban. It is consent, credit, and compensation — built with the same provenance plumbing this series has now invoked three times, for truth, for ownership, and here for authorship. Collective licensing so individual creators reach the table; opt-out and a price by default; attribution that travels with the work. The expensive, fairer architecture exists. Choosing it is the only open question.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'And so the series closes where it began: not with a verdict on the machines, but with a set of choices about us. Across nine conversations the same shape kept appearing — a genuine benefit, a real and unevenly distributed cost, and a coordination problem that no single actor can solve alone. Energy, labor, regulation, benefit, race, truth, safety, intimacy, ownership, and culture. The technology will keep advancing. Whether it advances as something done to us or something built with us is, as it always was, a decision — and the decision is still ours to make.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-laion',
      title: 'LAION-5B — A Large-Scale Dataset for Training Image-Text Models (2022)',
      description:
        'Open dataset of ~5.85 billion CLIP-filtered image–text pairs scraped from the web; the training base for Stable Diffusion and other image models.',
      url: 'https://laion.ai/blog/laion-5b/',
    },
    {
      id: 'src-soa',
      title: 'The Society of Authors — Member Survey on AI (2024)',
      description:
        'UK survey of creative professionals reporting lost work and income due to generative AI, including illustrators and translators.',
      url: 'https://societyofauthors.org/2024/04/11/new-survey-of-authors-and-illustrators-on-ai/',
    },
    {
      id: 'src-everypixel',
      title: 'Everypixel Journal — AI Image Statistics (2023)',
      description:
        'Industry analysis estimating that more than 15 billion AI images were generated within roughly a year of the tools becoming widely available.',
      url: 'https://journal.everypixel.com/ai-image-statistics',
    },
    {
      id: 'src-nyt-openai',
      title: 'The New York Times Company v. OpenAI and Microsoft (Dec 2023)',
      description:
        'Copyright lawsuit alleging unauthorized use of millions of Times articles to train AI models; a leading test of the fair-use question.',
      url: 'https://www.nytimes.com/2023/12/27/business/media/new-york-times-open-ai-microsoft-lawsuit.html',
    },
    {
      id: 'src-copyright-office',
      title: 'U.S. Copyright Office — Works Containing AI-Generated Material',
      description:
        'Copyright Office guidance and decisions holding that material produced by AI without meaningful human authorship is not copyrightable.',
      url: 'https://www.copyright.gov/ai/',
    },
    {
      id: 'src-openai-licensing',
      title: 'OpenAI publisher content partnerships (2023–2024)',
      description:
        'Publicly announced licensing agreements between OpenAI and publishers including Axel Springer, the Associated Press, the Financial Times, and News Corp.',
      url: 'https://openai.com/index/',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-ix-laion': {
      id: 's-ix-laion',
      kind: 'statistic',
      claimText: '5.85B',
      sourceId: 'src-laion',
      verificationStatus: 'verified',
      verifiedUrl: 'https://laion.ai/blog/laion-5b/',
      note: 'LAION-5B comprises ~5.85 billion CLIP-filtered image–text pairs scraped from Common Crawl web data — the open training base for Stable Diffusion and related models.',
      lastCheckedISO: '2026-06-27',
    },
    's-ix-illustrators': {
      id: 's-ix-illustrators',
      kind: 'statistic',
      claimText: '26%',
      sourceId: 'src-soa',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://societyofauthors.org/2024/04/11/new-survey-of-authors-and-illustrators-on-ai/',
      note: "The Society of Authors' 2024 survey reported that roughly a quarter (~26%) of illustrators said they had lost work due to generative AI; about 37% of translators reported the same.",
      lastCheckedISO: '2026-06-27',
    },
    's-ix-images-made': {
      id: 's-ix-images-made',
      kind: 'statistic',
      claimText: '15B+',
      sourceId: 'src-everypixel',
      verificationStatus: 'verified',
      verifiedUrl: 'https://journal.everypixel.com/ai-image-statistics',
      note: 'Everypixel Journal (2023) estimated that more than 15 billion images had been created with AI tools in roughly the first year of their wide availability. An industry estimate of cumulative output, not a precise count.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Chart / inline citation claims ──────────────────────────────────
    'c-ix-laion': {
      id: 'c-ix-laion',
      kind: 'citation',
      claimText: 'ImageNet ~14M images (2009) vs LAION-5B ~5.85B pairs (2022)',
      sourceId: 'src-laion',
      verificationStatus: 'verified',
      verifiedUrl: 'https://laion.ai/blog/laion-5b/',
      note: 'ImageNet (Deng et al., 2009) catalogued ~14 million labelled images; LAION-5B (2022) holds ~5.85 billion image–text pairs. Bar contrasts the two to show the scale jump (values in millions of images).',
      lastCheckedISO: '2026-06-27',
    },
    'c-ix-images-made': {
      id: 'c-ix-images-made',
      kind: 'citation',
      claimText: '15B+ AI images generated within ~a year (Everypixel, 2023)',
      sourceId: 'src-everypixel',
      verificationStatus: 'verified',
      verifiedUrl: 'https://journal.everypixel.com/ai-image-statistics',
      note: 'Everypixel 2023 estimate of >15 billion AI images in ~12 months. The plotted curve is an illustrative ramp to that endpoint, not measured monthly totals — labelled approximate.',
      lastCheckedISO: '2026-06-27',
    },
    'c-ix-soa': {
      id: 'c-ix-soa',
      kind: 'citation',
      claimText: 'SoA 2024: ~26% of illustrators and ~37% of translators lost work to AI',
      sourceId: 'src-soa',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://societyofauthors.org/2024/04/11/new-survey-of-authors-and-illustrators-on-ai/',
      note: 'Society of Authors 2024 survey: ~26% of illustrators and ~37% of translators reported losing work due to generative AI. Bar shows both figures.',
      lastCheckedISO: '2026-06-27',
    },
    'c-ix-licensing': {
      id: 'c-ix-licensing',
      kind: 'citation',
      claimText: 'AI–publisher licensing deals rose sharply from 2023 to 2024',
      sourceId: 'src-openai-licensing',
      verificationStatus: 'verified',
      verifiedUrl: 'https://openai.com/index/',
      note: 'OpenAI publicly announced publisher licensing deals beginning in 2023 (Axel Springer, AP) and a wave through 2024 (Financial Times, News Corp, Le Monde, Vox Media, The Atlantic, Condé Nast, and others). Chart counts (2023 ~2, 2024 ~12) are approximate tallies of publicly reported deals, illustrating the trend.',
      lastCheckedISO: '2026-06-27',
    },
    'c-ix-nyt-suit': {
      id: 'c-ix-nyt-suit',
      kind: 'citation',
      claimText: 'NYT sued OpenAI and Microsoft over training data (Dec 2023)',
      sourceId: 'src-nyt-openai',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.nytimes.com/2023/12/27/business/media/new-york-times-open-ai-microsoft-lawsuit.html',
      note: 'The New York Times filed suit against OpenAI and Microsoft on 27 December 2023, alleging unauthorized use of its articles to train AI models — a leading fair-use test case.',
      lastCheckedISO: '2026-06-27',
    },
    'c-ix-copyright-office': {
      id: 'c-ix-copyright-office',
      kind: 'citation',
      claimText: 'US Copyright Office: AI-only output is not copyrightable',
      sourceId: 'src-copyright-office',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.copyright.gov/ai/',
      note: 'The US Copyright Office has held (e.g., the 2023 "Zarya of the Dawn" decision and subsequent guidance) that material generated by AI without meaningful human authorship is not eligible for copyright protection.',
      lastCheckedISO: '2026-06-27',
    },
  },
}
