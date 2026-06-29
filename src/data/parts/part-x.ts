import type { RoundtableDocument } from '../../types/document'

export const partX: RoundtableDocument = {
  id: 'part-x',
  slug: 'pattern-and-prejudice',
  seriesLabel: 'The AI Reckoning',
  masthead: {
    overline: 'Bias · Fairness · Civil Rights · 2024–2026',
    titleLines: [[{ text: 'The AI Reckoning:' }], [{ text: 'Pattern and Prejudice', em: true }]],
    subtitle:
      'A model learns the world from data, and the data is a record of the world as it has been — including its discrimination. This part asks what happens when systems trained on an unequal past are handed decisions about faces, freedom, health, and money.',
    dateLine: 'June 2026 · Tenth in the AI Reckoning series',
    accentColor: 'violet',
  },
  companion: {
    text: 'Part X of the AI Reckoning Series — Read alongside Parts I–IX for full context',
  },
  intro: [
    [
      {
        type: 'text',
        value:
          'A mirror shows the room. That is all it does — and that is the problem. The data these systems were trained on is a faithful record of a world already sorted by race, gender, class, and history. The model did not introduce the bias. It learned it, optimized for it, and now delivers it at a scale and speed that exceeds anything a biased human could manage alone. The question is what we do with a mirror that faithfully reflects a past we said we were trying to leave behind.',
      },
    ],
    [
      {
        type: 'text',
        value:
          'A new voice leads this conversation: the Equity Researcher who audits these systems for the discrimination they encode and the communities they leave behind. The debate around her is not whether bias exists — that is measured and documented. It is whether bias is a bug that can be patched, or a feature of any system trained on a world that was never fair — and who gets to decide which it is.',
      },
    ],
  ],
  sections: [
    // ─────────────────────────────────────────────────────────
    // ROUND I — Whose Face Counts
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round I', title: 'Whose Face Counts' },
      blocks: [
        {
          type: 'statGrid',
          data: {
            stats: [
              {
                variant: 'caution',
                labelTop: 'Facial analysis error',
                value: '34.7%',
                size: 'large',
                description:
                  'Error rate for darker-skinned women in commercial gender classification — versus 0.8% for lighter-skinned men (Gender Shades, 2018)',
                claimId: 's-x-gendershades',
              },
              {
                variant: 'caution',
                labelTop: 'Criminal-risk scoring',
                value: '2×',
                size: 'medium',
                description:
                  'Black defendants who did not reoffend were about twice as likely to be wrongly flagged high-risk (ProPublica, 2016)',
                claimId: 's-x-compas',
              },
              {
                variant: 'neutral',
                labelTop: 'Mortgage denial',
                value: '80%',
                size: 'medium',
                description:
                  'How much more likely lenders were to deny Black applicants than similar white ones (The Markup, 2021)',
                claimId: 's-x-lending',
              },
            ],
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'equity-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Let me begin with the study that changed the field, because it is concrete. In 2018, an audit of commercial facial-analysis systems found error rates of up to 34.7% for darker-skinned women, while the error rate for lighter-skinned men was under 1%.',
                  },
                  { type: 'cite', claimId: 'c-x-gendershades' },
                  {
                    type: 'text',
                    value:
                      ' Same product, same task. The systems worked nearly flawlessly for the people who built and tested them, and failed badly for everyone else. That is not a glitch. It is what happens when the training data and the test data both reflect a narrow slice of humanity.',
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
                      'I had always assumed a camera just sees what is there. It did not occur to me that it could be better at recognizing some faces than others. When you say it failed for darker-skinned women — what does failing actually do to a real person?',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'equity-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'It gets someone arrested for a crime they did not commit. There are already documented cases of people — all of them Black men, so far — wrongfully arrested because a facial-recognition match was treated as evidence. The error rate stops being a statistic the moment a system that is worst at recognizing a group is pointed at that group by police.',
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
                      'And here is the part that should give us some hope: that 2018 result existed because someone measured it. Once the gap was named, vendors retrained on more representative data and the disparities on those benchmarks narrowed sharply. Bias in these systems is detectable and, on the narrow technical metric, improvable. That is genuinely different from human bias, which hides.',
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
                      'Improving the benchmark is not the same as fixing the harm, and I want to keep those separate. A more accurate facial-recognition system pointed at the same over-policed neighborhoods is a better tool for the same biased policy. Sometimes the fair fix is a more accurate model. Sometimes it is not building the system at all. The engineers keep answering a measurement question when the real question is a power question.',
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
            labelTop: 'Facial Analysis · Gender Shades',
            title: 'Same Product, Very Different Accuracy',
            subtitle:
              'The 2018 Gender Shades audit found commercial gender-classification error rates of up to 34.7% for darker-skinned women, against 0.8% for lighter-skinned men.',
            source: 'Buolamwini & Gebru — Gender Shades (2018)',
            claimIds: ['c-x-gendershades'],
            ariaLabel:
              'Bar chart showing 0.8 percent error for lighter-skinned men versus 34.7 percent error for darker-skinned women in commercial facial analysis',
            unit: '%',
            variant: 'navy',
            data: [
              { label: 'Lighter men', value: 0.8 },
              { label: 'Darker women', value: 34.7, variant: 'accent' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND II — Risk Scores
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round II', title: 'Risk Scores and Real Lives' },
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
                      'Move from cameras to courtrooms and the stakes get heavier. Risk-assessment tools score defendants for the likelihood of reoffending, and judges use those scores in bail and sentencing. In 2016, ProPublica analyzed one widely used tool and found that Black defendants who did not go on to reoffend were nearly twice as likely as comparable white defendants to have been labeled high-risk.',
                  },
                  { type: 'cite', claimId: 'c-x-compas' },
                  {
                    type: 'text',
                    value:
                      ' White defendants who did reoffend were more likely to have been rated low-risk. The errors were not random; they ran in one direction.',
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
                      'I have to complicate this, because it is the most important technical point in the whole subject. The company that made the tool fired back, and they were not simply lying: the tool was roughly equally accurate for both groups, and within each risk score it predicted reoffending at similar rates. It turns out you cannot satisfy every definition of fairness at once — calibrated scores and equal error rates are mathematically incompatible when base rates differ. That is a genuine impossibility theorem, not a dodge.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'equity-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'You are right that the theorem is real, and that is exactly why this cannot be left to engineers to optimize. When fairness definitions conflict, choosing among them is a moral and political decision about which errors we are willing to tolerate and who bears them. Hiding that choice inside a proprietary risk score does not make it neutral. It just removes it from democratic view and hands it to a vendor.',
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
                      'Which is why the law is starting to treat these as high-stakes decisions rather than software features. The EU AI Act classes uses like this as high-risk, demanding transparency and human oversight. Several US jurisdictions have restricted algorithmic tools in pretrial decisions. The principle is the same one we reached in earlier parts: when a system exercises power over a person, accountability has to scale with it.',
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
            labelTop: 'Criminal Risk Scoring · ProPublica',
            title: 'Wrongly Labeled High-Risk',
            subtitle:
              'Among defendants who did not reoffend, ProPublica found Black defendants were flagged as high-risk far more often than white defendants — about 45% versus 23%.',
            source: 'ProPublica — Machine Bias (2016)',
            claimIds: ['c-x-compas'],
            ariaLabel:
              'Bar chart showing 45 percent of non-reoffending Black defendants wrongly flagged high-risk versus 23 percent of white defendants',
            unit: '%',
            variant: 'policy',
            data: [
              { label: 'Black defendants', value: 45, variant: 'accent' },
              { label: 'White defendants', value: 23 },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND III — Sick Enough to Count
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round III', title: 'Sick Enough to Count' },
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
                      'The example that haunts me is from my own field, because the bias was invisible and the intent was good. A risk algorithm used on millions of patients to flag who needed extra care used health-care spending as a proxy for health need. But because less money is historically spent on Black patients at the same level of illness, the algorithm concluded they were healthier than they were.',
                  },
                  { type: 'cite', claimId: 'c-x-obermeyer' },
                  {
                    type: 'text',
                    value:
                      ' Correcting that single proxy would have more than doubled the share of Black patients flagged for additional help — from about 18% to 46%.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'equity-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'And notice there was no malicious variable. Nobody put race into the model. The bias entered through a proxy — spending — that carried the imprint of an unequal system. This is the thing people miss: you can delete race from the inputs and still build a racist outcome, because the world is full of variables that stand in for it. Zip code, spending, arrest records. The model launders history through correlation.',
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
                      'I want to hold onto the hopeful end of that same story, though. The healthcare bias was found by researchers who got access to the model and the outcomes, and once found, it was fixable by changing the target variable from cost to actual health. Audited, published, corrected. The same scale that makes a biased model dangerous makes a corrected one powerful — a single fix reaches every patient at once. The lever cuts both ways.',
                  },
                ],
              ],
            },
          },
        },
        {
          type: 'debate',
          data: {
            personaId: 'equity-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'It does cut both ways — when there is access. That study happened because the researchers got the data, which almost never happens; most of these systems are proprietary black boxes. The optimistic version requires something the market does not provide by default: the right to look inside. Mandatory auditing is the precondition for every hopeful fix you are describing.',
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
            labelTop: 'Healthcare Algorithm · Science (2019)',
            title: 'How Many Black Patients the Model Saw',
            subtitle:
              'A widely used care-management algorithm flagged 17.7% of Black patients for extra help; correcting its biased cost-based target would have raised that to 46.5%.',
            source: 'Obermeyer et al. — Science (2019)',
            claimIds: ['c-x-obermeyer'],
            ariaLabel:
              'Bar chart showing 17.7 percent of Black patients flagged for extra care by the biased algorithm versus 46.5 percent after correcting the bias',
            unit: '%',
            variant: 'gold',
            data: [
              { label: 'Biased\nalgorithm', value: 17.7 },
              { label: 'Bias-\ncorrected', value: 46.5, variant: 'accent' },
            ],
          },
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // ROUND IV — Debiasing and Its Limits
    // ─────────────────────────────────────────────────────────
    {
      header: { roundLabel: 'Round IV', title: 'Debiasing and Its Limits' },
      stanceOverride: { 'equity-researcher': 'neutral' },
      dividerBefore: true,
      blocks: [
        {
          type: 'debate',
          data: {
            personaId: 'equity-researcher',
            bubble: {
              paragraphs: [
                [
                  {
                    type: 'text',
                    value:
                      'Before anyone calls this a solved engineering problem, look at how wide it runs. Outside the courtroom and the clinic, an analysis of more than two million mortgage applications found lenders were 80% more likely to deny Black applicants, and 40% more likely to deny Latino applicants, than similar white ones.',
                  },
                  { type: 'cite', claimId: 'c-x-lending' },
                  {
                    type: 'text',
                    value:
                      ' Faces, freedom, health, money — the same pattern in every domain, because it is the same history in all the data.',
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
                      'I will be honest: part of me wants to believe a computer is at least fairer than a prejudiced loan officer having a bad day. Are you telling me it is not even that?',
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
                      'It can be either, and that is the honest answer. A well-audited model can be more consistent and more correctable than a thousand individual humans — you can fix one algorithm; you cannot retrain every loan officer overnight. But an unaudited one scales a single bias to everyone at once and wraps it in false objectivity. The technology is not inherently fairer or less fair. It is a multiplier. What it multiplies is whatever we feed it and whether we bother to check.',
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
                      'So the agenda writes itself, and none of it is exotic. Mandatory bias audits for consequential systems, by independent parties with real access. Documentation of training data and intended use. A right to an explanation and to contest a decision. And for some uses — like live facial recognition in public — the recognition that the fair amount of deployment may be none. Civil-rights law already forbids discrimination in lending, housing, and employment. The task is making sure an algorithm cannot be used to do what a person is not allowed to do.',
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
                      "I will end closer to the Equity Researcher than I started, with one caution to my own side. Audits can become theater — a fairness certificate that lets a harmful system keep running with a clean conscience. The measure that matters is not whether a model passed a test. It is whether the people it acts on are better off, and whether they have any power to say no. Keep that as the metric and I am with you. Lose it and 'debiasing' becomes the most sophisticated alibi ever built.",
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
            labelTop: 'Lending · The Markup',
            title: 'More Likely to Be Denied',
            subtitle:
              'Controlling for applicant finances, a 2021 analysis of over two million mortgage applications found lenders more likely to deny applicants of color than comparable white applicants.',
            source: 'The Markup — The Secret Bias Hidden in Mortgage-Approval Algorithms (2021)',
            claimIds: ['c-x-lending'],
            ariaLabel:
              'Horizontal bar chart showing Black applicants 80 percent and Latino applicants 40 percent more likely to be denied a mortgage than similar white applicants',
            unit: '%',
            variant: 'labor',
            data: [
              { label: 'Black applicants', value: 80, variant: 'accent' },
              { label: 'Latino applicants', value: 40 },
            ],
          },
        },
      ],
    },
  ],

  closing: {
    label: 'The Inheritance',
    paragraphs: [
      [
        {
          type: 'text',
          value:
            'Algorithmic bias is not a story about evil engineers or sentient prejudice. It is a story about inheritance: models trained on the record of an unequal society reproduce that inequality, then hand it back to us with the authority of mathematics. The Equity Researcher is right that deleting race from the inputs does not delete it from the outcome — the proxies carry it. The Skeptic is right that a better benchmark can mask a worse policy, and that an audit can become a costume. The Tech Optimist is right that, unlike human bias, this kind can be measured, published, and corrected at scale — when someone is allowed to look.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'That last clause is the whole fight. The difference between AI that entrenches discrimination and AI that helps expose it is access: independent audits, documented data, a right to an explanation and to contest, and the humility to not build some systems at all. Fairness is not a property you can compile into a model and forget. It is a contested, political choice about which errors a society will tolerate and who has to live with them.',
        },
      ],
      [
        {
          type: 'text',
          value:
            'Across ten parts the through-line has only sharpened. The costs are real, the responses partial, the benefits genuine, the race relentless, the truth contested, the tail risk irreversible, the intimacy double-edged, the ownership concentrated, the culture taken — and now the prejudice inherited. A mirror held up to a society reflects its face exactly. The work is not to blame the mirror. It is to change what it is pointed at, and to make sure the people in the reflection have a say in how they are seen.',
        },
      ],
    ],
  },

  sources: [
    {
      id: 'src-gender-shades',
      title: 'Buolamwini & Gebru — Gender Shades (2018)',
      description:
        'MIT Media Lab / PMLR study auditing commercial gender-classification systems, finding error rates up to 34.7% for darker-skinned women versus under 1% for lighter-skinned men.',
      url: 'https://proceedings.mlr.press/v81/buolamwini18a.html',
    },
    {
      id: 'src-propublica-compas',
      title: 'ProPublica — Machine Bias (2016)',
      description:
        'Investigation of the COMPAS recidivism risk tool, finding Black defendants who did not reoffend were far more likely than white defendants to be labeled high-risk.',
      url: 'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing',
    },
    {
      id: 'src-obermeyer',
      title: 'Obermeyer et al. — Science (2019)',
      description:
        'Study of a widely used health care-management algorithm showing racial bias from using cost as a proxy for need; correcting it would raise Black patients flagged for extra care from 17.7% to 46.5%.',
      url: 'https://www.science.org/doi/10.1126/science.aax2342',
    },
    {
      id: 'src-markup-lending',
      title: 'The Markup — Mortgage-Approval Bias (2021)',
      description:
        'Analysis of over two million conventional mortgage applications finding lenders more likely to deny applicants of color than similar white applicants.',
      url: 'https://themarkup.org/denied/2021/08/25/the-secret-bias-hidden-in-mortgage-approval-algorithms',
    },
  ],

  claims: {
    // ── Stat box claims ────────────────────────────────────────────────
    's-x-gendershades': {
      id: 's-x-gendershades',
      kind: 'statistic',
      claimText: '34.7%',
      sourceId: 'src-gender-shades',
      verificationStatus: 'verified',
      verifiedUrl: 'https://proceedings.mlr.press/v81/buolamwini18a.html',
      note: 'Gender Shades (Buolamwini & Gebru, 2018) found commercial gender-classification error rates up to 34.7% for darker-skinned women, versus 0.8% for lighter-skinned men — the maximum intersectional gap across the audited products.',
      lastCheckedISO: '2026-06-27',
    },
    's-x-compas': {
      id: 's-x-compas',
      kind: 'statistic',
      claimText: '2×',
      sourceId: 'src-propublica-compas',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing',
      note: 'ProPublica (2016): among defendants who did not reoffend, Black defendants were about twice as likely as white defendants to have been misclassified as high-risk by COMPAS (~45% vs ~23% false-positive rates).',
      lastCheckedISO: '2026-06-27',
    },
    's-x-lending': {
      id: 's-x-lending',
      kind: 'statistic',
      claimText: '80%',
      sourceId: 'src-markup-lending',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://themarkup.org/denied/2021/08/25/the-secret-bias-hidden-in-mortgage-approval-algorithms',
      note: 'The Markup (2021), controlling for financial factors, found lenders were 80% more likely to deny Black applicants (and 40% more likely to deny Latino applicants) than comparable white applicants nationally.',
      lastCheckedISO: '2026-06-27',
    },

    // ── Chart / inline citation claims ──────────────────────────────────
    'c-x-gendershades': {
      id: 'c-x-gendershades',
      kind: 'citation',
      claimText: 'Facial-analysis error: 0.8% lighter men vs 34.7% darker women (Gender Shades)',
      sourceId: 'src-gender-shades',
      verificationStatus: 'verified',
      verifiedUrl: 'https://proceedings.mlr.press/v81/buolamwini18a.html',
      note: 'Gender Shades 2018 intersectional error rates: lighter-skinned men ≤0.8%, darker-skinned women up to 34.7%, across commercial systems from major vendors.',
      lastCheckedISO: '2026-06-27',
    },
    'c-x-compas': {
      id: 'c-x-compas',
      kind: 'citation',
      claimText: 'COMPAS false-positive rate: ~45% Black vs ~23% white (ProPublica)',
      sourceId: 'src-propublica-compas',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing',
      note: 'ProPublica 2016: of defendants who did not reoffend, ~45% of Black defendants were labeled high-risk vs ~23% of white defendants. Northpointe disputed the analysis, citing equal calibration — the documented fairness-impossibility tension noted in-text.',
      lastCheckedISO: '2026-06-27',
    },
    'c-x-obermeyer': {
      id: 'c-x-obermeyer',
      kind: 'citation',
      claimText: 'Healthcare algorithm: Black patients flagged 17.7% biased vs 46.5% corrected',
      sourceId: 'src-obermeyer',
      verificationStatus: 'verified',
      verifiedUrl: 'https://www.science.org/doi/10.1126/science.aax2342',
      note: "Obermeyer et al., Science (2019): correcting the algorithm's cost-based proxy would raise the share of Black patients identified for extra care from 17.7% to 46.5%. The model used ~200 million people-years of data.",
      lastCheckedISO: '2026-06-27',
    },
    'c-x-lending': {
      id: 'c-x-lending',
      kind: 'citation',
      claimText:
        'Mortgage denial: Black +80%, Latino +40% vs similar white applicants (The Markup)',
      sourceId: 'src-markup-lending',
      verificationStatus: 'verified',
      verifiedUrl:
        'https://themarkup.org/denied/2021/08/25/the-secret-bias-hidden-in-mortgage-approval-algorithms',
      note: 'The Markup (2021) analysis of 2M+ applications, holding financial factors constant: lenders 80% more likely to deny Black applicants and 40% more likely to deny Latino applicants than comparable white applicants.',
      lastCheckedISO: '2026-06-27',
    },
  },
}
