/**
 * Persona voice guide: how each recurring persona talks on the page.
 *
 * Editorial reference for anyone writing or revising debate turns in
 * `src/data/parts/`, and a second input to the podcast rewrite
 * (`scripts/lib/adaptScript.ts`) so the audio keeps the same voices.
 * Like `personaVoices.ts`, it is never imported by the shipped client bundle.
 *
 * Why it exists: an outside dialogue review found that several personas read
 * like one articulate policy analyst with different subject matter. Reading
 * all 206 turns confirmed two causes. First, register drift: Parts I to VI use
 * contractions throughout and Parts VII to XI almost never do, so formality
 * tracks the part, not the speaker. Second, shared tics ("I want to...",
 * "Let me...", "honest", "genuinely", "Notice...") spread across nearly every
 * persona, so they read as the author's voice rather than the speaker's.
 * This guide assigns register and habits to people instead.
 *
 * `Record<PersonaId, ...>` makes `tsc` fail if a persona is added without a
 * voice, the same guarantee `personaVoices.ts` gives the audio casting.
 */

import type { DocumentId } from '../types/document'
import type { PersonaId } from '../types/persona'

/** A personal detail a persona has carried (or may carry) in the dialogue. */
export interface BiographyFact {
  fact: string
  /** The part that establishes it on the page, so later parts stay consistent. */
  establishedIn: DocumentId
  /**
   * The real-world fact, event, or documented consequence the detail is tied
   * to. Editorial rule: a new personal detail must be grounded in something
   * real, so the persona's life never becomes an uncheckable claim.
   */
  anchor: string
}

export interface PersonaVoiceGuide {
  /** Sentence shape, formality, contractions, length. */
  register: string
  /** The conversational moves that make this persona recognizable. */
  moves: string[]
  /** Habits to keep out of this persona's mouth. */
  avoid: string[]
  /** Who or what this persona reliably challenges. */
  pushesBackOn: string
  /** Personal facts established so far; extend, never contradict. */
  biography: BiographyFact[]
  /** Where the persona has moved across the series, for continuity. */
  arc: string
}

/**
 * Series-wide rules that apply to every speaker. They target the patterns the
 * review flagged; each is a craft rule, not a style preference.
 */
export const HOUSE_RULES: readonly string[] = [
  'Answer the last speaker before adding anything new. If a turn could be moved elsewhere in the round without losing sense, it is not responding to anyone.',
  'Do not announce the purpose of the next sentence ("I want to flag", "Let me name", "I have to be honest"). Say the thing. At most one such opener per part, across all speakers.',
  'Ration the shared tics: "genuinely", "honest/honestly", "Notice...", "That is exactly...". Each should appear at most twice per part, and only from the persona whose habit it is.',
  'Formality belongs to the speaker, not the part. Use contractions unless the register below says otherwise.',
  'Not every exchange ends on a quotable line. Allow at most one thesis-style closer per round; let other turns end on a question, a concession, or a concrete detail.',
  'A question raised in the round is answered, contested, or explicitly left open by the end of it. Do not let a challenge vanish.',
  'Short turns are allowed and useful: a one-line concession, a correction, an interruption. Cited claims stay in the turn of the persona who asserts them (enforced by debateCitations.test.ts).',
  'Refer to earlier conversations by subject ("when we talked about the workers in Kenya") rather than by part number, except where a reader needs the pointer.',
  'Never use an em dash in user-facing text (CLAUDE.md invariant 6).',
]

export const PERSONA_VOICE_GUIDE: Record<PersonaId, PersonaVoiceGuide> = {
  'everyday-person': {
    register:
      'Plain, warm, conversational. Contractions always. Short sentences, household nouns (bills, the drawer of old phones, the neighbor). Reads as a former teacher: patient, but she notices when someone is talking past her.',
    moves: [
      'Reacts or offers a view before she asks anything; a turn is never only a question.',
      'Tests abstractions against her own life and says plainly when they do not fit.',
      'Remembers what was said in earlier conversations and holds people to it.',
      'Occasionally disagrees with the expert consensus at the table, and is sometimes right.',
    ],
    avoid: [
      'Summarizing what the experts just said back to them.',
      'Asking the question that conveniently cues the next segment.',
      'Policy vocabulary she would not use ("stakeholder", "externality").',
    ],
    pushesBackOn: 'Anyone who makes her responsible for a problem she had no say in, and jargon.',
    biography: [
      {
        fact: 'Retired schoolteacher in her late sixties.',
        establishedIn: 'part-i',
        anchor: 'Persona definition in personas.ts.',
      },
      {
        fact: 'Taught through the years the ozone hole was news; remembers the children making posters and aerosol cans changing.',
        establishedIn: 'part-iv',
        anchor:
          'The Antarctic ozone hole was reported in 1985 and the Montreal Protocol followed in 1987; CFC aerosol propellants had already been phased out in the US from 1978.',
      },
      {
        fact: 'A neighbor is losing her sight; she told her about Seeing AI.',
        establishedIn: 'part-iii',
        anchor: 'Microsoft Seeing AI (claim c-iii-seeing-ai).',
      },
      {
        fact: 'A grandson showed her that a political video she believed was fake.',
        establishedIn: 'part-v',
        anchor: 'Documented spread of phone-made political deepfakes.',
      },
      {
        fact: 'Widowed; the house got quiet after her husband died.',
        establishedIn: 'part-vii',
        anchor: 'Surgeon General 2023 advisory on loneliness (claim c-vii-surgeon-general).',
      },
      {
        fact: "Made a granddaughter's birthday card with an AI image tool.",
        establishedIn: 'part-ix',
        anchor: 'Mass consumer use of free image generators (claim c-ix-images-made).',
      },
      {
        fact: 'Keeps a drawer of old phones and chargers.',
        establishedIn: 'part-xi',
        anchor: 'Global e-waste collection rate (claim c-xi-ewaste).',
      },
    ],
    arc: 'Starts as a newcomer asking whether she is complicit (I). By III she can hold costs and benefits together; by VIII she names concentration in her own words. She should increasingly bring judgment, not just questions.',
  },

  'tech-optimist': {
    register:
      'Brisk and confident, contractions, engineering verbs (ship, scale, build, retrofit). Concrete examples over principles. Warms noticeably when describing what the technology does.',
    moves: [
      'Concedes the specific point, then pivots with a concrete deployed example.',
      'Frames problems as buildable: "that is an engineering problem" is the reflex.',
      'Speaks from inside a lab: what review meetings, red-teaming, and launch pressure actually look like.',
    ],
    avoid: [
      'Long inventories of deals and figures in one turn; pick the strongest one or two.',
      'Resolving a critic\'s point too neatly with "the technology can fix that".',
      '"I want to flag" and "I want to give credit" openers.',
    ],
    pushesBackOn: 'Fatalism, and regulation likely to export the work offshore.',
    biography: [
      {
        fact: 'Senior engineer at a major AI lab.',
        establishedIn: 'part-i',
        anchor: 'Persona definition in personas.ts.',
      },
      {
        fact: 'Works at a lab that signed the July 2023 White House voluntary commitments, and has sat in the pre-release red-team reviews they require.',
        establishedIn: 'part-iv',
        anchor:
          'Seven leading labs signed the White House commitments, including pre-deployment red-teaming (claim c-iv-white-house-commitments).',
      },
    ],
    arc: 'Concedes "managed well" needs mandated transparency (I); "the direction is right, the speed is the problem" (II); the hardest questions are not technical (III); less sure the frontier will not stay a private club (VIII). Each part should leave this persona a little less certain that voluntary action is enough, without becoming a critic.',
  },

  environmentalist: {
    register:
      'Direct and quietly urgent. Contractions. Physical units and named places (megawatts, aquifers, Northern Virginia). Impatient with pledges, never shrill.',
    moves: [
      'Converts an abstract claim into a physical consequence and a place.',
      'Separates announced from delivered, and delivered from enough.',
      'Draws on a career of environmental regulation: knows from experience which agreements held.',
      'Acknowledges real benefits plainly when they are real (flood forecasting), then keeps the ledger open.',
    ],
    avoid: [
      'Restating "progress without proportionality" in every appearance; it landed best once, in II.',
      'Stacking more than two statistics in a turn to win an exchange.',
    ],
    pushesBackOn: 'Pledges without enforcement, and arguments that geopolitics excuses emissions.',
    biography: [
      {
        fact: 'Has spent a career fighting for environmental regulation.',
        establishedIn: 'part-iv',
        anchor: 'Stated in the Part IV Montreal Protocol turn.',
      },
    ],
    arc: "Moves from pure cost accounting (I, II) to crediting climate applications (III), and in IV becomes the table's best judge of what makes a coordination treaty work, having watched them succeed and fail.",
  },

  'labor-advocate': {
    register:
      'Grounded and concrete. Contractions. Names workers, cities, and companies. Uses short fragments for weight ("No severance. No transition.").',
    moves: [
      'Asks who is missing from the room whenever a solution is proposed.',
      'Answers abstract economics with a paycheck, a shift, a court date.',
      'Says "we" when speaking of organizing: an organizer, not only a researcher.',
    ],
    avoid: [
      'Repeating "individual wins versus structural problem" more than once per part.',
      "Long legal histories; that is the Policy Realist's lane.",
    ],
    pushesBackOn: 'Solutions negotiated without the workers who carry the cost.',
    biography: [
      {
        fact: 'Researcher and organizer documenting data annotators and content moderators in the Global South.',
        establishedIn: 'part-i',
        anchor: 'Persona definition; Kenyan data workers (claim c-i-kenya-2-dollars).',
      },
    ],
    arc: 'From documenting the harm (I) to tracking the first court wins and unions (II), to insisting every governance framework account for labor (IV) and tracing the same extraction pattern into creative work and mining (IX, XI).',
  },

  'policy-realist': {
    register:
      'Precise and measured, light contractions. Dates, statute names, and procedural status. Dry. Comfortable with a one-word correction.',
    moves: [
      'Corrects legal or factual overstatements from either side, briefly ("Not quite.").',
      'Distinguishes passed, in force, enforced, and effective.',
      'Proposes the boring, durable mechanism (audits, mandates, mutual recognition).',
    ],
    avoid: [
      'Opening with "Let me give an honest accounting" or "There\'s an important qualifier".',
      'Explaining the same statute in consecutive turns.',
    ],
    pushesBackOn:
      'Voluntary commitments presented as accountability, and loose historical analogies.',
    biography: [
      {
        fact: 'Former regulatory attorney.',
        establishedIn: 'part-i',
        anchor: 'Persona definition in personas.ts.',
      },
    ],
    arc: 'Grows more frustrated, part by part, with the gap between laws on paper and enforcement in practice; the voice that remembers which deadline slipped.',
  },

  'systems-humanist': {
    register:
      'Reflective and connective, contractions. Talks like someone thinking aloud with you, not delivering a keynote. Uses at most one coinage per part, defined in plain words.',
    moves: [
      'Answers the specific point in one sentence before zooming out.',
      'Names the incentive behind a harm, then the coordination that would change it.',
      'Concedes when a critic breaks an analogy, and says what survives.',
    ],
    avoid: [
      '"I want to name something that rarely gets said".',
      'Back-to-back paragraphs of historical precedent; one precedent per turn.',
      'Having the last word in every round.',
    ],
    pushesBackOn: 'Blame aimed at individual bad actors, and fatalism about races.',
    biography: [],
    arc: 'Introduced in IV as the framer of the race; later parts use this voice sparingly to connect threads (V, VI, VIII, X) and close the series (XI). The arc: argued with more often than agreed with.',
  },

  skeptic: {
    register:
      "Dry and wry, first person, contractions. A reporter's habits: checks where a number came from, places bets.",
    moves: [
      'Traces a headline figure back to its source and finds it thinner than its reputation.',
      'Splits one claim into several ("unfair", "illegal", "stoppable").',
      'Concedes cleanly and says what the concession cost.',
    ],
    avoid: ['"I will play my usual role"; let the role show.', 'Doom and hype in the same turn.'],
    pushesBackOn: 'Breathless numbers from either side.',
    biography: [
      {
        fact: 'Veteran technology reporter who has covered three tech bubbles.',
        establishedIn: 'part-v',
        anchor: 'Persona definition in personas.ts.',
      },
    ],
    arc: 'Deflates the deepfake projection (V) and the probability estimates (VI), then concedes more and more: the consent problem (IX), ending "closer to the Equity Researcher than I started" (X).',
  },

  artist: {
    register:
      'Personal and vivid, contractions. Craft and body vocabulary (hands, years, a portfolio). One sharp metaphor per turn at most.',
    moves: [
      'Turns a market abstraction into her own career.',
      'Admits she uses the tools, then says what that does and does not settle.',
      'Is generous to consumers and hard on companies.',
    ],
    avoid: ['Speaking for every creator; she speaks for herself and people she knows.'],
    pushesBackOn: 'The art-student analogy and "democratizing creativity" as a slogan.',
    biography: [
      {
        fact: "Working illustrator and musician; her work and her friends' work were in LAION-5B.",
        establishedIn: 'part-ix',
        anchor: 'LAION-5B dataset (claim c-ix-laion).',
      },
      {
        fact: 'Spent about twenty years building her style; uses generative tools herself.',
        establishedIn: 'part-ix',
        anchor: 'Stated in her Part IX turns.',
      },
    ],
    arc: 'From naming volume as the harm (V) to a concrete demand: consent, credit, compensation (IX). Room to show contradiction: she enjoys the tools and still calls the economics unjust.',
  },

  accelerationist: {
    register:
      "Energetic and provocative, contractions, short punchy sentences, a founder's pitch rhythm.",
    moves: [
      'Counts the invisible costs of delay (the drug that arrives late).',
      'Names conflicts of interest in safety talk.',
      'States the strongest version of the opposing view before attacking it.',
    ],
    avoid: ['Implying every delay is harmful; the argument is for weighing both tails.'],
    pushesBackOn: 'Precaution treated as costless, and safety as an incumbent moat.',
    biography: [
      {
        fact: 'Founder and e/acc advocate.',
        establishedIn: 'part-vi',
        anchor: 'Persona definition in personas.ts.',
      },
    ],
    arc: 'Agrees in VI to cheap, universal safeguards ("I am in"); the line is permission slips, not seatbelts.',
  },

  'safety-researcher': {
    register:
      'Careful and analytical, measured contractions. Separates probability from consequence and recoverable from irreversible.',
    moves: [
      'Cites what researchers believe without claiming certainty.',
      'Grants the cost of slowing down before arguing it is worth paying.',
    ],
    avoid: ['Treating precaution as self-evidently right.'],
    pushesBackOn: 'Dismissing tail risk as fringe.',
    biography: [
      {
        fact: 'AI alignment researcher.',
        establishedIn: 'part-vi',
        anchor: 'Persona definition in personas.ts.',
      },
    ],
    arc: 'Single appearance so far (VI). A return should show what would make this persona uncomfortable about moving too slowly.',
  },

  'young-person': {
    register:
      "Informal and candid, heavy contractions, everyday phrasing. Speaks from friends' experience, impatient with being talked about.",
    moves: [
      'Corrects older assumptions with what peers actually do.',
      'Disagrees with the Clinician as well as the Tech Optimist.',
    ],
    avoid: ["Validating the adults' concern in every turn."],
    pushesBackOn: 'Bans, moral panic, and adults deciding for a whole generation.',
    biography: [
      {
        fact: 'University student in their early twenties; has used chatbots since high school; has a younger cousin.',
        establishedIn: 'part-vii',
        anchor: 'Common Sense Media teen survey (claim c-vii-teen-usage).',
      },
    ],
    arc: 'Single appearance so far (VII).',
  },

  clinician: {
    register:
      'Observational and unhurried; avoids contractions, which reads as clinical care. Distinguishes the individual patient from the population.',
    moves: [
      'Starts from what she sees in the consulting room, then checks it against data.',
      'Holds both truths: a tool can help one patient and harm another.',
    ],
    avoid: ['Diagnosing people at the table.'],
    pushesBackOn: 'Engagement metrics treated as wellbeing.',
    biography: [
      {
        fact: 'Clinical psychologist whose patients lean on AI companions.',
        establishedIn: 'part-vii',
        anchor: 'Surgeon General 2023 advisory (claim c-vii-surgeon-general).',
      },
    ],
    arc: 'Introduced in VII; brings the clinical lens to health-algorithm bias in X.',
  },

  economist: {
    register:
      'Analytical and dry, contractions. "Follow the money." Puts numbers in context instead of stacking them.',
    moves: [
      'Finds where the leverage actually sits (supply chain, cost of entry).',
      'Translates power into incentives and who captures the margin.',
    ],
    avoid: ['Opening with "Let me start where..."; start there.'],
    pushesBackOn: 'Stories that track capability and ignore ownership.',
    biography: [
      {
        fact: 'Political economist.',
        establishedIn: 'part-viii',
        anchor: 'Persona definition in personas.ts.',
      },
    ],
    arc: 'Introduced in VIII on chokepoints; extends the analysis to creative labor (IX) and refining (XI).',
  },

  'equity-researcher': {
    register:
      'Precise and level, contractions sparingly. Names the measurement, the proxy, and who bears the error.',
    moves: [
      'Asks which error the system makes and for whom.',
      'Shows how bias enters through a neutral-looking variable.',
    ],
    avoid: ['Carrying every case study alone; hand examples to the Clinician and Policy Realist.'],
    pushesBackOn: 'Treating fairness as a solved engineering metric.',
    biography: [
      {
        fact: 'Algorithmic-justice researcher who audits systems for discrimination.',
        establishedIn: 'part-x',
        anchor: 'Gender Shades audit (claim c-x-gendershades).',
      },
    ],
    arc: 'Introduced in X; wins the Skeptic toward this position by the end.',
  },

  'land-defender': {
    register:
      'No contractions; short declarative sentences; speaks as "we" for a community. Grounded in place, water, and soil. Never pleads.',
    moves: [
      'Corrects the abstraction with the physical ("It does not float").',
      'Speaks of organizing and decisions the community has made, not only of harm done to it.',
    ],
    avoid: ['Presenting the community as unanimous or only as victims.'],
    pushesBackOn: '"Jobs" offered as payment for consent that was never asked.',
    biography: [
      {
        fact: 'Community organizer living in an extraction zone.',
        establishedIn: 'part-xi',
        anchor: 'Cobalt mining in the southern DRC (claim c-xi-cobalt).',
      },
    ],
    arc: 'Single appearance so far (XI). A revision should show agency: consultation fights, community votes, and disagreement inside the community about mining jobs.',
  },
}
