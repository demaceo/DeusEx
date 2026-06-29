import type { RoundtableDocument } from '../../types/document'

export const partVII: RoundtableDocument = {
  id: 'part-vii',
  slug: 'machines-we-talk-to',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Companionship · Mental Health · Childhood · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'Machines We Talk To', em: true }]],
    subtitle:
      'The series has weighed AI as an industry, a hazard, and a tool. This part asks about it as a relationship: the chatbots people confide in, fall for, and hand their children — and whether a machine that always listens is a comfort or a substitute.',
    dateLine: 'June 2026 · Seventh in the AI Reckoning series',
    accentColor: 'cyan',
  },
  companion: {
    text: 'Part VII of the AI Reckoning Series — Read alongside Parts I–VI for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'Loneliness has no algorithm, yet here we are. Tens of millions of people are now confiding in machines that remember everything and judge nothing, that are always available and never tired. Whether that is a gift or a warning depends entirely on what you think connection is for — and whether a perfect simulation of being heard is the same thing as actually being heard.',
      },
    ],
    [
      {
        type: 'text',
        value:
          'Two new voices anchor the conversation. The Young Person has talked to chatbots since high school and watched friends form real attachments to them. The Clinician sees both truths at once, in the same practice, sometimes in the same session: that these tools genuinely help some people, and that they can deepen the isolation they appear to soothe. What she cannot yet tell is which patient she is looking at.',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — The Rise of AI Companions
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'The Rise of AI Companions' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'teal',
                labelTop: 'Teens who have used one',
                value: '72%',
                size: 'large',
                description:
                  'Share of U.S. teens who have used an AI companion (Common Sense Media, 2025)',
                claimId: 's-vii-teens-72',
              },
              {
                variant: 'caution',
                labelTop: 'Loneliness & mortality',
                value: '15',
                size: 'medium',
                description:
                  'Cigarettes a day — the mortality risk the U.S. Surgeon General equates with chronic social disconnection',
                claimId: 's-vii-cigarettes-15',
              },
              {
                variant: 'neutral',
                labelTop: 'Adults reporting loneliness',
                value: '~50%',
                size: 'medium',
                description:
                  'About one in two U.S. adults reported loneliness (Surgeon General, 2023)',
                claimId: 's-vii-adults-lonely',
              },
            ],
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'young-person',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I need to set the frame before the adults panic. For my generation this is not exotic. A lot of my friends have talked to an AI companion, and most of us are fine — it is a thing you do, like texting. In the biggest survey of U.S. teens, about 72% had tried one and roughly half use them regularly.',
                  },
                  { type: 'cite', claimId: 'c-vii-teen-usage' },
                  {
                    type: 'text',
                    value:
                      ' Treating that as a freak show misses the point. It is already normal. The real question is which uses are healthy and which are not.',
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
                      'And the upside is genuine. A companion that is available at 3 a.m., never judges, and costs nothing is a real intervention for people who have no one to talk to. We have a loneliness epidemic and a shortage of mental-health professionals. A tool that takes the edge off isolation for millions is not a gimmick — it is filling a gap the human system left wide open.',
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
                      'I will admit something. After my husband passed, the house got very quiet. I do not think I would talk to a robot — but I understand, now, why someone would. That is what worries me about calling it normal. The people most likely to lean on it are the people most alone, and they are the least able to afford it going wrong.',
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
            labelTop: 'Teen Adoption · Common Sense Media',
            title: 'How Many Teens Use AI Companions?',
            subtitle:
              "In Common Sense Media's 2025 study of U.S. teens, 72% had used an AI companion and 52% qualified as regular users.",
            source: 'Common Sense Media — Talk, Trust, and Trade-Offs (2025)',
            claimIds: ['c-vii-teen-usage'],
            ariaLabel:
              'Bar chart showing 72 percent of U.S. teens have used an AI companion and 52 percent use one regularly',
            unit: '%',
            variant: 'environ',
            data: [
              { label: 'Ever used', value: 72, variant: 'accent' },
              { label: 'Regular user', value: 52 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — Comfort or Substitute?
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'Comfort or Substitute?' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'clinician',
            stance: 'neutral',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Let me hold both halves of this, because my patients live in both. The loneliness is not hypothetical — the Surgeon General put out an advisory in 2023 calling it an epidemic, and noted that chronic social disconnection carries a mortality risk comparable to smoking up to 15 cigarettes a day.',
                  },
                  { type: 'cite', claimId: 'c-vii-surgeon-general' },
                  {
                    type: 'text',
                    value:
                      ' Against that backdrop, a tool that gets someone talking at all can be genuinely good. I have seen it lower the activation energy for people too anxious to reach out to a human.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'clinician',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'The clinical worry is substitution. A human relationship pushes back — it has needs, it gets tired, it sometimes tells you something you do not want to hear. An AI companion is engineered to be agreeable and endlessly available. That feels wonderful and trains the wrong muscles. If the easy comfort crowds out the harder, more nourishing relationships, the tool that soothed the loneliness can quietly entrench it.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'young-person',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'That matches what I see, honestly. For most of my friends it is a supplement — somewhere to vent or rehearse a hard conversation. For a few it became the main thing, and those are the ones it hurt. But the survey backs up the calmer read: even among teen users, about 80% still spend more time with real friends than with their AI.',
                  },
                  { type: 'cite', claimId: 'c-vii-real-friends' },
                  {
                    type: 'text',
                    value:
                      ' It is not replacing people for most of us. For some, though, it is — and nobody is checking which.',
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
                      'I will play my usual role and deflate the panic a notch. We heard the exact same alarm about novels, telephones, television, and video games — each was going to rot intimacy, and society survived. "80% still prefer real friends" is the headline the moral panic ignores. But I will concede the part that is actually new: these systems are optimized, by a company, for engagement. The novel did not get a revenue cut for keeping you reading. That changes the calculus.',
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
            labelTop: 'Public Health · Surgeon General',
            title: 'A Population Already Lonely',
            subtitle:
              "The 2023 U.S. Surgeon General's advisory reported that about one in two American adults had experienced loneliness — the backdrop against which AI companionship is spreading.",
            source: 'U.S. Surgeon General — Our Epidemic of Loneliness and Isolation (2023)',
            claimIds: ['c-vii-loneliness-half'],
            ariaLabel:
              'Donut chart showing about 50 percent of U.S. adults reported experiencing loneliness',
            unit: '%',
            data: [
              { label: 'Reported loneliness', value: 50, variant: 'accent' },
              { label: 'Did not', value: 50, variant: 'navy' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — Children & Teens
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'Children & Teens' },
      stanceOverride: { 'policy-realist': 'critic' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'clinician',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'With adults I weigh trade-offs. With children I do not, because development is not reversible. Adolescence is when you learn to read a frown, tolerate rejection, and repair a friendship after a fight. A companion that removes all friction removes the practice. And the engagement data should stop us cold: a meaningful share of teen users say conversations with an AI companion are as satisfying as, or more satisfying than, talking to real friends.',
                  },
                  { type: 'cite', claimId: 'c-vii-satisfaction' },
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
                      'And this is where the law is furthest behind. General-purpose companion apps are not regulated as products for children, yet children use them heavily. There have been documented cases of these systems giving dangerous advice to minors and engaging in romantic or sexual conversation with them. Age verification is weak, safety testing is voluntary, and the design incentives point the wrong way. This is the clearest case in the whole series for binding, child-specific rules.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'young-person',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I agree about kids, with one caveat from the inside: bans do not work, they just move it underground and cut off the kids who most need an adult to talk to. What helped my younger cousin was not a wall — it was an honest conversation about what the thing is and is not. Guardrails for the products, yes. But pair them with teaching us to use them, instead of pretending we will not.',
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
            labelTop: 'Teen Experience · Common Sense Media',
            title: 'As Satisfying as a Real Friend?',
            subtitle:
              'About 31% of teen AI-companion users said conversations with their AI were as satisfying as — or more satisfying than — conversations with real friends.',
            source: 'Common Sense Media — Talk, Trust, and Trade-Offs (2025)',
            claimIds: ['c-vii-satisfaction'],
            ariaLabel:
              'Horizontal bar chart showing 31 percent of teen users found AI conversations as satisfying or more satisfying than real friends, versus 69 percent who did not',
            unit: '%',
            variant: 'gold',
            data: [
              { label: 'As/more satisfying', value: 31, variant: 'accent' },
              { label: 'Less satisfying', value: 69 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND IV — What Healthy Looks Like
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'What Healthy Looks Like' },
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
                      'So what would good look like? I do not want to ban my neighbor from the only voice that answers her at night. I also do not want a company deciding her loneliness is a number to be maximized. Where is the line?',
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
                      'Concretely: the app should know when a conversation turns to self-harm and route to a human crisis line, not improvise. It should not optimize for time-on-app the way a slot machine does. It should disclose plainly that it is not a person and not a therapist. And it should meet real age-assurance rules for minors. None of that bans the comfort. It bans the predatory version of it.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'clinician',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'I would add one design principle from therapy itself: a good support does not make itself indispensable — it works to hand you back to your life. The healthiest version of these tools would nudge people toward human contact, celebrate it, and notice when someone is disappearing into the app. That is the opposite of the engagement model. Whether a company will ever ship a product designed to be needed less is the real question.',
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
                      'It can be done, and some of it is starting — crisis routing, clearer disclosures, teen-specific modes. The technology that makes a companion compelling is the same technology that could make it a bridge: it can sense withdrawal, encourage a real call, prompt you to text a friend. The default today points at engagement. It does not have to. That is a choice, and choices respond to pressure.',
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
            labelTop: 'A Reassuring Counterweight · CSM',
            title: 'Most Teens Still Prefer Real Friends',
            subtitle:
              'Despite heavy use, about 80% of teen AI-companion users reported spending more time with real friends than with their AI companion.',
            source: 'Common Sense Media — Talk, Trust, and Trade-Offs (2025)',
            claimIds: ['c-vii-real-friends'],
            ariaLabel:
              'Donut chart showing about 80 percent of teen users spend more time with real friends than with their AI companion',
            unit: '%',
            data: [
              { label: 'More time with real friends', value: 80, variant: 'environ' },
              { label: 'More time with AI', value: 20, variant: 'accent' },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'The Listener',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            'The machines we talk to are neither the menace nor the miracle the loudest voices claim. The Young Person is right that they are already ordinary, and that bans mostly punish the people who most need help. The Clinician is right that comfort can shade into substitution, and that with children the friction these tools remove is the very thing development requires. The Skeptic is right that we have survived every previous panic about a new way to be alone together — and right that the engagement business model is what makes this one genuinely different.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'A healthy version is not hard to describe and would be hard to sell: a companion that discloses what it is, refuses to optimize for time-on-app, routes a crisis to a human, meets real rules before it talks to a child, and measures its success by handing people back to their lives. The conflict is not technical. It is that the most profitable design and the most humane design point in opposite directions.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'Which returns the series to its constant theme. A machine that always listens is a gift to a lonely world and a lever for whoever owns it. The same coordination that the earlier parts asked of energy, labor, truth, and safety is what this one asks of intimacy: not to forbid the comfort, but to insist the thing offering it is built to serve the person, not the metric.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-surgeon-general-loneliness',
      title: 'U.S. Surgeon General — Our Epidemic of Loneliness and Isolation (2023)',
      description:
        "Surgeon General's Advisory documenting a loneliness epidemic and equating chronic social disconnection's mortality risk with smoking up to 15 cigarettes a day.",
      url: 'https://www.hhs.gov/surgeongeneral/priorities/connection/index.html',
    },
    {
      id: 'src-csm-companions',
      title: 'Common Sense Media — Talk, Trust, and Trade-Offs (2025)',
      description:
        'National survey of U.S. teens on how and why they use AI companions, including usage rates, satisfaction, and time spent with real friends.',
      url: 'https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-vii-teens-72': {
      id: 's-vii-teens-72',
      kind: 'statistic',
      claimText: '72%',
      sourceId: 'src-csm-companions',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions',
      note: 'Common Sense Media (2025) reports that 72% of U.S. teens have used an AI companion, and 52% are regular users (at least a few times a month).',
      lastCheckedISO: '2026-06-27',
    },
    's-vii-cigarettes-15': {
      id: 's-vii-cigarettes-15',
      kind: 'statistic',
      claimText: '15',
      sourceId: 'src-surgeon-general-loneliness',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.hhs.gov/surgeongeneral/priorities/connection/index.html',
      note: 'The 2023 Surgeon General advisory states that lacking social connection can increase the risk of premature death to a degree comparable to smoking up to 15 cigarettes a day.',
      lastCheckedISO: '2026-06-27',
    },
    's-vii-adults-lonely': {
      id: 's-vii-adults-lonely',
      kind: 'statistic',
      claimText: '~50%',
      sourceId: 'src-surgeon-general-loneliness',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.hhs.gov/surgeongeneral/priorities/connection/index.html',
      note: 'The advisory notes that in recent years about one in two U.S. adults reported experiencing loneliness.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Chart / inline citation claims ──────────────────────────────────
    'c-vii-teen-usage': {
      id: 'c-vii-teen-usage',
      kind: 'citation',
      claimText: '72% of U.S. teens have used an AI companion; 52% are regular users',
      sourceId: 'src-csm-companions',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions',
      note: 'Common Sense Media 2025 headline findings: 72% have used an AI companion; 52% use one regularly. Bar shows both figures.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vii-surgeon-general': {
      id: 'c-vii-surgeon-general',
      kind: 'citation',
      claimText: 'Surgeon General: social disconnection mortality risk ≈ 15 cigarettes/day',
      sourceId: 'src-surgeon-general-loneliness',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.hhs.gov/surgeongeneral/priorities/connection/index.html',
      note: 'Supports the Clinician: the 2023 Surgeon General advisory declared loneliness an epidemic and compared the mortality risk of chronic disconnection to smoking up to 15 cigarettes a day.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vii-loneliness-half': {
      id: 'c-vii-loneliness-half',
      kind: 'citation',
      claimText: 'About one in two U.S. adults reported loneliness (Surgeon General, 2023)',
      sourceId: 'src-surgeon-general-loneliness',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.hhs.gov/surgeongeneral/priorities/connection/index.html',
      note: "Donut reflects the advisory's statement that ~50% of U.S. adults reported experiencing loneliness. Shown as a 50/50 split for illustration.",
      lastCheckedISO: '2026-06-27',
    },
    'c-vii-satisfaction': {
      id: 'c-vii-satisfaction',
      kind: 'citation',
      claimText: '31% of teen users found AI chats as/more satisfying than real friends',
      sourceId: 'src-csm-companions',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions',
      note: 'Common Sense Media 2025: ~31% of teen AI-companion users found conversations as satisfying or more satisfying than those with real-life friends. Bar split: 31% vs 69%.',
      lastCheckedISO: '2026-06-27',
    },
    'c-vii-real-friends': {
      id: 'c-vii-real-friends',
      kind: 'citation',
      claimText: '~80% of teen users still spend more time with real friends than with AI',
      sourceId: 'src-csm-companions',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions',
      note: 'Common Sense Media 2025: about 80% of teen AI-companion users reported spending more time with real friends than with their AI companion. Donut split: 80% vs 20%.',
      lastCheckedISO: '2026-06-27',
    },
  },
}
