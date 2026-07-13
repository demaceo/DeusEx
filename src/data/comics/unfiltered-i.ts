import type { ComicDocument } from '../../types/comic'

/**
 * Episode I: "Good Faith Not Found".
 *
 * Source material: a screenshot of a doctoral researcher's account of posting
 * on BlueSky about anti-AI sentiment and self image, and the hostile replies
 * that followed. The Chorus quotes are verbatim (claims store the real text;
 * grawlix is a rendering treatment only). The panel discussion is original
 * writing in the voices of the recurring personas.
 */
export const unfilteredI: ComicDocument = {
  id: 'unfiltered-i',
  slug: 'good-faith-not-found',
  seriesLabel: 'Roundtable Reckoning · Episode I',
  cover: {
    overline: 'Unfiltered Conversations · Episode I',
    titleLines: ['Roundtable', 'Reckoning'],
    subtitle:
      'One researcher, one post, two hundred replies, and the question nobody in the thread would answer.',
    dateLine: 'July 2026 · First in the Unfiltered series',
  },
  guests: ['skeptic', 'artist', 'systems-humanist'],
  scenes: [
    {
      id: 'scene-1',
      kicker: 'Scene 1',
      title: 'The Post',
      layout: 'grid-2',
      panels: [
        {
          frame: 'sketch',
          background: 'flat',
          ariaLabel: 'A caption introduces the researcher, who shares her work online.',
          blocks: [
            {
              type: 'caption',
              data: {
                text: 'Somewhere in year four of a PhD on why people reject AI, a researcher does the one thing her field says you should do: share the thinking in public.',
              },
            },
            {
              type: 'speech',
              data: {
                speaker: { kind: 'cast', castId: 'the-researcher' },
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'It is a genuinely interesting empirical question: is anti-AI sentiment partly about self image? What could go wrong?',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          frame: 'clean',
          background: 'halftone',
          ariaLabel: 'The BlueSky post at the center of the episode.',
          blocks: [
            {
              type: 'embeddedPost',
              data: {
                author: 'The Researcher',
                handle: '@the-researcher',
                text: 'New thought from my doctoral research on the rejection of AI: what if anti-AI sentiment is partly entangled with self image? The strength of a reaction to a tool says something about the story we tell about ourselves. Genuinely curious what people think.',
                meta: 'Posted to BlueSky · The replies below arrived from non-followers',
                claimId: 'c-uf1-post',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'scene-2',
      kicker: 'Scene 2',
      title: 'The Pile-On',
      layout: 'mosaic',
      panels: [
        {
          frame: 'jagged',
          background: 'paper',
          span: 3,
          ariaLabel:
            'A swarm of jagged, hostile reply bubbles piles onto the post, with comic sound effects landing between them.',
          blocks: [
            {
              type: 'caption',
              data: {
                text: 'The quote-boxes below are real replies, word for word. The symbols are ours. The venom is theirs.',
              },
            },
            { type: 'sfx', data: { text: 'POW!', style: 'starburst', size: 'lg' } },
            {
              type: 'chorusSwarm',
              data: {
                bubbles: [
                  {
                    text: "If you use ai, i don't just assume, i know you're a racist, that's clear as day to me. And that's all I need to know about you.",
                    claimId: 'c-uf1-r1',
                    tilt: -2,
                  },
                  {
                    grawlixParts: [
                      { t: 'grawlix', v: '#$%@' },
                      { t: 'text', v: ' AI and ' },
                      { t: 'grawlix', v: '#$%@' },
                      {
                        t: 'text',
                        v: ' your data centers and actually try to be creative for once in your life you waste of human meat',
                      },
                    ],
                    claimId: 'c-uf1-r2',
                    tilt: 3,
                    weight: 'heavy',
                  },
                  {
                    grawlixParts: [
                      { t: 'text', v: 'maybe if you gave a single solitary ' },
                      { t: 'grawlix', v: '#$%@' },
                      {
                        t: 'text',
                        v: ' about anything other than your own hedonistic destructive indulgence you wouls understand that AI sucks ',
                      },
                      { t: 'grawlix', v: '$#!%' },
                    ],
                    claimId: 'c-uf1-r3',
                    tilt: -4,
                  },
                  {
                    text: "The use of AI at ALL is an expression of a lack of creativity. Plus IP theft, enriching billionaires to screw everyone else, dumbing down everyone, ... it's trash.",
                    claimId: 'c-uf1-r4',
                    tilt: 2,
                  },
                  {
                    text: 'Look at this scab. She thinks punching search optimized tags into a random number generator is her own work and creativity not billionaires pulling the largest, most environmentally destructive and deeply racist labor and wage heist in history.',
                    claimId: 'c-uf1-r5',
                    tilt: -1,
                  },
                  {
                    text: 'Seriously hobbyless loser ass opinion! Hahaha. Like shockingly dumb. Maybe ChatGPT told them to say that.',
                    claimId: 'c-uf1-r6',
                    tilt: 4,
                  },
                  {
                    grawlixParts: [
                      { t: 'grawlix', v: '#$%@' },
                      {
                        t: 'text',
                        v: " AI, I can't wait for it to die when all of the companies investing in it realize they're losing tons of money on planet raping calculators",
                      },
                    ],
                    claimId: 'c-uf1-r7',
                    tilt: -3,
                  },
                ],
              },
            },
            { type: 'sfx', data: { text: 'KRAK!', style: 'grawlix', size: 'md' } },
            {
              type: 'caption',
              data: {
                placement: 'bottom-right',
                text: 'Final score. Reply guys: 7. Engagement with the actual research question: 0.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'scene-3',
      kicker: 'Scene 3',
      title: 'Enter the Panel',
      layout: 'grid-3',
      panels: [
        {
          frame: 'sketch',
          background: 'flat',
          ariaLabel: 'The Skeptic weighs the replies for actual arguments.',
          blocks: [
            {
              type: 'caption',
              data: { text: 'So we did what the thread would not. We convened.' },
            },
            {
              type: 'speech',
              data: {
                speaker: { kind: 'persona', personaId: 'skeptic' },
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'Strip out the venom and a few of these replies contain real arguments: IP, energy, market concentration. The rage is doing those arguments no favors. A claim shouted at a stranger persuades exactly one person, and it is the shouter.',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          frame: 'sketch',
          background: 'flat',
          ariaLabel: 'The Artist speaks to the anger behind the replies.',
          blocks: [
            {
              type: 'speech',
              data: {
                speaker: { kind: 'persona', personaId: 'artist' },
                tailDirection: 'right',
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'I know that anger from the inside. When your livelihood feels hunted, nuance reads as betrayal, and anyone curious about the predator looks like its accomplice. The grief is real. Calling a stranger meat is still a choice.',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          frame: 'sketch',
          background: 'flat',
          ariaLabel: 'The Systems Humanist reframes the pile-on as an incentive problem.',
          blocks: [
            {
              type: 'speech',
              data: {
                speaker: { kind: 'persona', personaId: 'systems-humanist' },
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'Watch the system, not just the people. Platforms pay out attention for outrage, per word, per dunk. A pile-on is not two hundred moral failures; it is the rational product of that payout table. Change the incentives and the same humans behave differently.',
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: 'scene-4',
      kicker: 'Scene 4',
      title: 'The Unpacking',
      layout: 'grid-2',
      panels: [
        {
          frame: 'sketch',
          background: 'flat',
          ariaLabel: 'The Researcher asks why disagreement arrived as moral condemnation.',
          blocks: [
            {
              type: 'speech',
              data: {
                speaker: { kind: 'cast', castId: 'the-researcher' },
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'Here is what fascinates me. Nobody disputed the hypothesis. They skipped straight to the verdict: racist, scab, waste of meat. Why does disagreement about a tool arrive as a ruling about a soul?',
                    },
                  ],
                ],
              },
            },
            {
              type: 'speech',
              data: {
                speaker: { kind: 'persona', personaId: 'skeptic' },
                tailDirection: 'right',
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'Because for some of the thread, the belief is not a conclusion, it is a badge. You do not fact-check a badge. You defend it. Evidence against it feels like an attack on the wearer, so the wearer attacks back.',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          frame: 'sketch',
          background: 'flat',
          ariaLabel:
            'The Artist and the Systems Humanist close the loop while a final hostile reply is framed out of the panel.',
          blocks: [
            {
              type: 'speech',
              data: {
                speaker: { kind: 'persona', personaId: 'artist' },
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'And be careful with that diagnosis, because it cuts both ways. If we write the whole thread off as broken people, we are doing to them what they did to her. Some of that fury is displaced grief for work, wages, and a web that felt more human.',
                    },
                  ],
                ],
              },
            },
            {
              type: 'speech',
              data: {
                speaker: { kind: 'persona', personaId: 'systems-humanist' },
                tailDirection: 'right',
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'So here is the trap in one sentence: once a tool is coded as a moral test, curiosity about it becomes contamination. Which is how a researcher who studies the rejection of AI ends up as its newest data point.',
                    },
                  ],
                ],
              },
            },
            {
              type: 'chorusSwarm',
              data: {
                bubbles: [
                  {
                    text: 'Typical shill panel. Blocked.',
                    tilt: 5,
                  },
                ],
              },
            },
            {
              type: 'caption',
              data: {
                placement: 'bottom-right',
                text: 'The panel elected not to chase that one out of the frame.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'scene-5',
      kicker: 'Scene 5',
      title: 'The Verdict',
      layout: 'splash',
      panels: [
        {
          frame: 'clean',
          background: 'burst',
          ariaLabel: 'The Researcher delivers her closing line under a sunburst.',
          blocks: [
            {
              type: 'speech',
              data: {
                speaker: { kind: 'cast', castId: 'the-researcher' },
                paragraphs: [
                  [
                    {
                      type: 'text',
                      value:
                        'Good-faith engagement in that thread is probably impossible. Good-faith engagement about it is not.',
                    },
                    { type: 'cite', claimId: 'c-uf1-conclusion', label: '1' },
                  ],
                  [
                    {
                      type: 'text',
                      value:
                        'There is so much to unpack about the responsible deployment and adoption of powerful technologies. None of it fits in a reply guy bubble. Most of it fits in a comic, apparently.',
                    },
                  ],
                ],
              },
            },
            {
              type: 'caption',
              data: {
                placement: 'bottom-right',
                text: 'Next episode: another thread, another reckoning.',
              },
            },
          ],
        },
      ],
    },
  ],
  closing: {
    label: 'The Reckoning',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            'The swarm proved her hypothesis better than her survey data ever could: the loudest rejection of AI in that thread was not about the technology, it was about who the repliers needed to be. And still, buried under the fury, the real questions were all there: energy, labor, ownership, creativity, dignity.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'Those questions deserve better messengers than rage, and better venues than a quote-tweet. That is what this series is for. Unfiltered means we show you the thread as it was. It does not mean we stop thinking.',
        },
      ],
    ],
  },
  sources: [
    {
      id: 'bsky-thread',
      title: 'BlueSky reply thread, screenshot, 2026',
      description:
        "Screenshot of a doctoral researcher's account of posting about anti-AI sentiment and self image, with verbatim replies from non-followers. Handles withheld.",
    },
  ],
  claims: {
    'c-uf1-post': {
      id: 'c-uf1-post',
      kind: 'citation',
      claimText:
        'My doctoral research around rejection of AI continues to be fascinating. I shared a thought about linking anti-AI sentiment and self image on BlueSky and here were a few of the replies from non-followers.',
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
    },
    'c-uf1-r1': {
      id: 'c-uf1-r1',
      kind: 'citation',
      claimText:
        "If you use ai, i don't just assume, i know you're a racist, that's clear as day to me. And that's all I need to know about you.",
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
    },
    'c-uf1-r2': {
      id: 'c-uf1-r2',
      kind: 'citation',
      claimText:
        'fuck AI and fuck your data centers and actually try to be creative for once in your life you waste of human meat',
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
      note: 'Rendered with grawlix in the comic; the quote is stored verbatim here.',
    },
    'c-uf1-r3': {
      id: 'c-uf1-r3',
      kind: 'citation',
      claimText:
        'maybe if you gave a single solitary fuck about anything other than your own hedonistic destructive indulgence you wouls understand that AI sucks shit',
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
      note: 'Rendered with grawlix in the comic; the quote is stored verbatim here, including the original typo.',
    },
    'c-uf1-r4': {
      id: 'c-uf1-r4',
      kind: 'citation',
      claimText:
        "The use of AI at ALL is an expression of a lack of creativity. Plus IP theft, enriching billionaires to screw everyone else, dumbing down everyone, ... it's trash.",
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
    },
    'c-uf1-r5': {
      id: 'c-uf1-r5',
      kind: 'citation',
      claimText:
        'Look at this scab. She thinks punching search optimized tags into a random number generator is her own work and creativity not billionaires pulling the largest, most environmentally destructive and deeply racist labor and wage heist in history.',
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
    },
    'c-uf1-r6': {
      id: 'c-uf1-r6',
      kind: 'citation',
      claimText:
        'Seriously hobbyless loser ass opinion! Hahaha. Like shockingly dumb. Maybe ChatGPT told them to say that.',
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
    },
    'c-uf1-r7': {
      id: 'c-uf1-r7',
      kind: 'citation',
      claimText:
        "fuck AI, I can't wait for it to die when all of the companies investing in it realize they're losing tons of money on planet raping calculators",
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
      note: 'Rendered with grawlix in the comic; the quote is stored verbatim here.',
    },
    'c-uf1-conclusion': {
      id: 'c-uf1-conclusion',
      kind: 'citation',
      claimText:
        "As much as I'd like to, it's probably impossible to engage in good faith with these kinds of posts. But wow, so much to explore and unpack about the responsible deployment and adoption of powerful technologies, eh?",
      sourceId: 'bsky-thread',
      verificationStatus: 'verified',
    },
  },
}
