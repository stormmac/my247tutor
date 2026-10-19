import type { Picture } from "../content/picture";
import type { ContentQuestion } from "../content/types";
import { UK_SKILL_STANDARDS } from "../content/uk";
import { US_SKILL_STANDARDS } from "../content/us";
import type { Question } from "../practice/types";
import type { Subject, YearLevel } from "./types";

/**
 * The curricula a child can learn. NSW is the original tree. US Common Core and England's
 * National Curriculum reuse the NSW questions under their own topics (see content/us.ts and
 * content/uk.ts), turned into US or UK English here.
 */
export const CURRICULA = ["nsw", "us", "uk"] as const;
export type Curriculum = (typeof CURRICULA)[number];
export const DEFAULT_CURRICULUM: Curriculum = "nsw";

export const CURRICULUM_NAMES: Record<Curriculum, string> = {
  nsw: "NSW Australia",
  us: "US Common Core",
  uk: "UK National Curriculum",
};

export function isCurriculum(value: unknown): value is Curriculum {
  return typeof value === "string" && (CURRICULA as readonly string[]).includes(value);
}

/** A stored value as a curriculum: anything missing or unknown is NSW. */
export function curriculumOf(value: unknown): Curriculum {
  return isCurriculum(value) ? value : DEFAULT_CURRICULUM;
}

/** "year" in NSW and the UK, "grade" in the US. */
export function yearWord(curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  return curriculum === "us" ? "grade" : "year";
}

/** "Year 3" in NSW and the UK, "Grade 3" in the US. */
export function yearName(year: YearLevel | number, curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  return `${curriculum === "us" ? "Grade" : "Year"} ${year}`;
}

/** "Maths" in NSW and the UK, "Math" in the US. */
export function subjectName(subject: Subject, curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  if (subject === "english") return "English";
  return curriculum === "us" ? "Math" : "Maths";
}

/** What one of the curriculum's codes is called. */
export function standardName(curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  return { nsw: "NESA outcome", us: "Common Core standard", uk: "National Curriculum" }[curriculum];
}

/** The curriculum's name in a sentence, such as "topics from the Common Core". */
export function frameworkName(curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  return { nsw: "NSW syllabus", us: "Common Core", uk: "National Curriculum" }[curriculum];
}

/** What a report measures a child against. */
export function outcomesName(curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  return {
    nsw: "NSW (NESA) syllabus outcomes",
    us: "US Common Core standards",
    uk: "National Curriculum in England",
  }[curriculum];
}

/** Dates are written the local way: 3/14/2026 in the US. */
export function localeOf(curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  return { nsw: "en-AU", us: "en-US", uk: "en-GB" }[curriculum];
}

/** A practice skill's code outside NSW, for pages that don't load the question bank. */
export function skillStandard(skillId: string, curriculum: Curriculum): string | undefined {
  if (curriculum === "us") return US_SKILL_STANDARDS[skillId];
  if (curriculum === "uk") return UK_SKILL_STANDARDS[skillId];
  return undefined;
}

// ---------- Australian English to US English ----------

/** Whole words, with their endings. Case is kept: "Colour" becomes "Color". */
const WORDS: [string, string][] = [
  ["maths", "math"],
  ["colour", "color"],
  ["colours", "colors"],
  ["coloured", "colored"],
  ["colourful", "colorful"],
  ["colouring", "coloring"],
  ["favourite", "favorite"],
  ["favourites", "favorites"],
  ["neighbour", "neighbor"],
  ["neighbours", "neighbors"],
  ["neighbourhood", "neighborhood"],
  ["behaviour", "behavior"],
  ["honour", "honor"],
  ["flavour", "flavor"],
  ["flavours", "flavors"],
  ["humour", "humor"],
  ["rumour", "rumor"],
  ["harbour", "harbor"],
  ["labour", "labor"],
  ["odour", "odor"],
  ["armour", "armor"],
  ["grey", "gray"],
  ["mum", "mom"],
  ["mums", "moms"],
  ["mummy", "mommy"],
  ["spelt", "spelled"],
  ["learnt", "learned"],
  ["jewellery", "jewelry"],
  ["aluminium", "aluminum"],
  ["tyre", "tire"],
  ["tyres", "tires"],
  ["practise", "practice"],
  ["practised", "practiced"],
  ["practising", "practicing"],
  ["licence", "license"],
  ["defence", "defense"],
  ["catalogue", "catalog"],
  ["programme", "program"],
  ["anticlockwise", "counterclockwise"],
  ["travelled", "traveled"],
  ["travelling", "traveling"],
  ["traveller", "traveler"],
  ["cancelled", "canceled"],
  ["modelled", "modeled"],
  ["labelled", "labeled"],
  ["labelling", "labeling"],
  ["fuelled", "fueled"],
  ["jewelled", "jeweled"],
  ["theatre", "theater"],
  ["fibre", "fiber"],
  ["centre", "center"],
  ["centres", "centers"],
  ["lolly", "candy"],
  ["lollies", "candies"],
  ["footy", "football"],
  ["canteen", "cafeteria"],
  ["rubbish", "trash"],
  ["biscuit", "cookie"],
  ["biscuits", "cookies"],
  ["ute", "pickup truck"],
  ["utes", "pickup trucks"],
  ["petrol", "gas"],
  ["footpath", "sidewalk"],
  ["torch", "flashlight"],
  ["paddock", "field"],
  ["paddocks", "fields"],
];

/** -ise verbs spelt -ize in the US. A list, because surprise, exercise and advise keep their s. */
const IZE = [
  "organis",
  "realis",
  "recognis",
  "apologis",
  "memoris",
  "summaris",
  "emphasis",
  "criticis",
  "finalis",
  "categoris",
  "symbolis",
  "prioritis",
  "visualis",
  "sympathis",
  "personalis",
  "standardis",
  "familiaris",
  "harmonis",
  "minimis",
  "maximis",
  "agonis",
  "energis",
  "itemis",
  "authoris",
  "civilis",
  "colonis",
  "fertilis",
  "hospitalis",
  "magnetis",
  "modernis",
  "normalis",
  "specialis",
  "utilis",
];

/** Australian places used only as a setting, swapped for US places about as far apart. */
const PLACES: [string, string][] = [
  ["Bondi Beach", "Miami Beach"],
  ["Sydney", "New York"],
  ["Newcastle", "Philadelphia"],
  ["Wollongong", "Trenton"],
  ["Dubbo", "Albany"],
  ["Melbourne", "Boston"],
  ["Brisbane", "Atlanta"],
  ["Perth", "Denver"],
  ["Canberra", "Washington"],
  ["Hobart", "Portland"],
];

const PHRASES: [RegExp, string][] = [
  [/\bfull stops\b/g, "periods"],
  [/\bfull stop\b/g, "period"],
  [/\bFull stops\b/g, "Periods"],
  [/\bFull stop\b/g, "Period"],
  [/\b(the )?(SCG|Sydney Cricket Ground)\b/g, "the stadium"],
  [/\b([Aa])n icy pole\b/g, "$1 popsicle"],
  [/\bicy poles\b/gi, "popsicles"],
  [/\bicy pole\b/gi, "popsicle"],
  [/\bsausage sizzle\b/gi, "bake sale"],
  [/\bcar park\b/gi, "parking lot"],
  [/\bmobile phone/gi, "cell phone"],
  [/\bYears (\d)/g, "Grades $1"],
  [/\bYear (\d)/g, "Grade $1"],
  [/\bYear (One|Two|Three|Four|Five|Six)\b/g, "Grade $1"],
  // metre, centimetre, millilitre…
  [/metre/g, "meter"],
  [/Metre/g, "Meter"],
  [/litre/g, "liter"],
  [/Litre/g, "Liter"],
  [/\banalys(e|ed|es|ing)\b/g, "analyz$1"],
  // Mr Ng → Mr. Ng
  [/\b(Mr|Mrs|Ms|Dr)(?= [A-Z])/g, "$1."],
  // 12 480 → 12,480 (NSW groups digits with a space from five digits up).
  [/\b\d{1,3}(?:[  ]\d{3})+\b/g, "#NUMBER#"],
];

const WORD_MAP = new Map([...WORDS, ...PLACES].map(([from, to]) => [from.toLowerCase(), to]));
const WORD_RE = new RegExp(`\\b(${[...PLACES, ...WORDS].map(([w]) => w).join("|")})\\b`, "gi");
const IZE_RE = new RegExp(`\\b(${IZE.join("|")})(e|es|ed|ing|ation|ations)\\b`, "gi");

function keepCase(original: string, replacement: string): string {
  // Place names keep their capitals, unless the question wrote them in lower case to be corrected.
  if (replacement !== replacement.toLowerCase()) return original === original.toLowerCase() ? replacement.toLowerCase() : replacement;
  if (original === original.toUpperCase() && original.length > 1) return replacement.toUpperCase();
  // Swimming Carnival → Swimming Gala.
  const title = (t: string) => t.replace(/\b\w/g, (c) => c.toUpperCase());
  if (original.includes(" ") && original === title(original)) return title(replacement);
  if (original[0] === original[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

/** Australian English to US English, by a fixed list of words, so the same text always comes out the same. */
export function toUS(text: string): string {
  let out = text.replace(WORD_RE, (w) => keepCase(w, WORD_MAP.get(w.toLowerCase()) ?? w));
  out = out.replace(IZE_RE, (_, stem: string, end: string) => `${stem.slice(0, -1)}z${end}`);
  for (const [re, to] of PHRASES) {
    out = to === "#NUMBER#" ? out.replace(re, (n) => n.replace(/[  ]/g, ",")) : out.replace(re, to);
  }
  return out;
}

// ---------- Australian English to UK English ----------

/** The spelling is the same; money, a few words and places change. */
const UK_WORDS: [string, string][] = [
  ["lolly", "sweet"],
  ["lollies", "sweets"],
  ["footy", "rugby"],
  ["soccer", "football"],
  ["ute", "van"],
  ["utes", "vans"],
  ["footpath", "pavement"],
  ["paddock", "field"],
  ["paddocks", "fields"],
  ["esky", "cool box"],
  ["eskies", "cool boxes"],
  ["thongs", "flip-flops"],
  ["rockmelon", "melon"],
  ["bushwalk", "hike"],
  ["bushwalking", "hiking"],
  ["Kindergarten", "Reception"],
  ["sausage sizzle", "cake sale"],
  ["swimming carnival", "swimming gala"],
  ["athletics carnival", "sports day"],
  ["dollar", "pound"],
  ["dollars", "pounds"],
];

/** Australian places used only as a setting, swapped for UK places. Newcastle is in both. */
const UK_PLACES: [string, string][] = [
  ["Bondi Beach", "Brighton Beach"],
  ["Sydney", "London"],
  ["Wollongong", "Brighton"],
  ["Dubbo", "York"],
  ["Melbourne", "Manchester"],
  ["Brisbane", "Birmingham"],
  ["Perth", "Bristol"],
  ["Canberra", "Edinburgh"],
  ["Hobart", "Cardiff"],
];

const UK_PHRASES: [RegExp, string][] = [
  [/\b(the )?(SCG|Sydney Cricket Ground)\b/g, "the stadium"],
  [/\b([Aa])n icy pole\b/g, "$1n ice lolly"],
  [/\bicy poles\b/gi, "ice lollies"],
  [/\bicy pole\b/gi, "ice lolly"],
  // $3.50 → £3.50, 50c and 50 cents → 50p, a 20-cent coin → a 20p coin.
  [/\$(?=\d)/g, "£"],
  [/\b(\d+)(?:c| cents?|-cent)\b/g, "$1p"],
  [/\b(five|ten|twenty|fifty)-cent\b/gi, "$1-pence"],
  [/\bcents\b/g, "pence"],
  // 12 480 → 12,480 (NSW groups digits with a space from five digits up).
  [/\b\d{1,3}(?:[  ]\d{3})+\b/g, "#NUMBER#"],
];

const UK_WORD_MAP = new Map([...UK_WORDS, ...UK_PLACES].map(([from, to]) => [from.toLowerCase(), to]));
const UK_WORD_RE = new RegExp(`\\b(${[...UK_PLACES, ...UK_WORDS].map(([w]) => w).join("|")})\\b`, "gi");

/** Australian English to UK English, by a fixed list, so the same text always comes out the same. */
export function toUK(text: string): string {
  // Words first, so an icy pole becomes an ice lolly and not an ice sweet.
  let out = text.replace(UK_WORD_RE, (w) => keepCase(w, UK_WORD_MAP.get(w.toLowerCase()) ?? w));
  for (const [re, to] of UK_PHRASES) {
    out = to === "#NUMBER#" ? out.replace(re, (n) => n.replace(/[  ]/g, ",")) : out.replace(re, to);
  }
  return out;
}

/** Text in the curriculum's own English. */
export function localise(text: string, curriculum: Curriculum = DEFAULT_CURRICULUM): string {
  if (curriculum === "us") return toUS(text);
  if (curriculum === "uk") return toUK(text);
  return text;
}

// ---------- Questions that only make sense in Australia ----------

/**
 * History and time zones a child outside Australia couldn't be expected to know. Places that are
 * only a setting become local places (see PLACES); animals and sports stay.
 */
const AUSTRALIA_ONLY =
  /\b(NSW|New South Wales|Adelaide|Darwin|Opera House|Harbour Bridge|Blue Mountains|First Fleet|Federation|Anzac|daylight saving|Uluru|Vegemite)\b/i;
/** Seasons fall in the opposite months in the northern hemisphere. */
const SEASON_MONTHS =
  /\b(December|January|February|June|July|August)\b[^]*\b(winter|summer|autumn|cold|hot|warm|snow)|\b(winter|summer|autumn|cold|hot|warm|snow)\b[^]*\b(December|January|February|June|July|August)\b/i;
/** The US has no 20c, 50c, $1 or $2 coins. The UK has 20p, 50p, £1 and £2 coins. */
const AUSTRALIAN_COINS = /\b(20|50)-cent\b|\b(20|50)c coin|\$[12] coin/;

function questionText(q: ContentQuestion): string {
  return [
    q.question_text,
    q.explanation,
    q.passage?.title,
    q.passage?.text,
    ...(q.answer_options ?? []).map((o) => o.text),
    ...[q.correct_answer].flat(),
  ].join("\n");
}

/**
 * Whether a written question can be used in this curriculum: nothing only an Australian would
 * know, and nothing that stops working in the local English (a spelling question whose choices
 * become the same word, such as colour and color).
 */
export function usableIn(q: ContentQuestion, curriculum: Curriculum = DEFAULT_CURRICULUM): boolean {
  if (curriculum === "nsw") return true;
  const text = questionText(q);
  if (AUSTRALIA_ONLY.test(text) || SEASON_MONTHS.test(text)) return false;
  if (curriculum === "us" && AUSTRALIAN_COINS.test(text)) return false;
  const options = (q.answer_options ?? []).map((o) => o.text);
  if (new Set(options.map((o) => localise(o, curriculum))).size < new Set(options).size) return false;
  return true;
}

export const usableInUS = (q: ContentQuestion) => usableIn(q, "us");
export const usableInUK = (q: ContentQuestion) => usableIn(q, "uk");

/** Keys whose values are drawing settings, not words a student reads ("grey" is a counter colour). */
const PICTURE_SETTINGS = new Set(["kind", "shape", "object", "unit", "colour", "sections"]);

function pictureWords(value: unknown, curriculum: Curriculum, key = ""): unknown {
  if (PICTURE_SETTINGS.has(key)) return value;
  if (typeof value === "string") return localise(value, curriculum);
  if (Array.isArray(value)) return value.map((v) => pictureWords(v, curriculum));
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, pictureWords(v, curriculum, k)]));
  return value;
}

/** A drawing's titles and labels in the curriculum's English, such as a graph of "Favorite sport". */
export function localisePicture(picture: Picture, curriculum: Curriculum = DEFAULT_CURRICULUM): Picture {
  return curriculum === "nsw" ? picture : (pictureWords(picture, curriculum) as Picture);
}

export const pictureToUS = (picture: Picture) => localisePicture(picture, "us");

/** A question as a child on this curriculum sees it, with its answers in the same spelling. */
export function localiseQuestion(q: Question, curriculum: Curriculum): Question {
  if (curriculum === "nsw") return q;
  const local = (text: string) => localise(text, curriculum);
  // Typed answers take either spelling; the local one is shown as the right answer.
  const answer =
    q.answer.kind === "text" ? { ...q.answer, accepted: [...new Set([...q.answer.accepted.map(local), ...q.answer.accepted])] } : q.answer;
  return {
    ...q,
    prompt: local(q.prompt),
    answer,
    choices: q.choices?.map(local),
    hints: q.hints.map(local),
    solution: local(q.solution),
    passage: q.passage && { title: local(q.passage.title), text: local(q.passage.text) },
    picture: q.picture && localisePicture(q.picture, curriculum),
  };
}
