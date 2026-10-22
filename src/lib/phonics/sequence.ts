/**
 * The Learn to Read program: synthetic phonics in the order NSW schools teach it in Kindergarten
 * to Year 2. Single letter sounds first, then two- and three-letter sounds, then vowel teams and
 * split vowels. Every word in a unit uses only sounds taught by then (plus a few common tricky
 * words in the sentences), so children can sound out everything they're asked to read.
 */

export interface Sound {
  /** How it's written: "s", "sh", "igh", or "a_e" for a split vowel like the a…e in cake. */
  grapheme: string;
  /**
   * The sound alone, spelled for a device's voice, which reads a lone letter as its name ("ay" for
   * a). Stops get a short "uh" (tuh, puh), as teachers say them, since they can't be held.
   */
  say: string;
  /** The sound in IPA, for the cloud voice, which can say exactly that sound. */
  ipa: string;
  /** A word that starts with or clearly has the sound, and its picture. */
  example: string;
  emoji: string;
}

export interface PhonicsWord {
  word: string;
  /** A picture for the word, when there's a clear one. Words without one are practised by listening instead. */
  emoji?: string;
}

export interface Unit {
  id: string;
  /** Shown to children: the sounds, like "s a t p". */
  title: string;
  /** Shown to grown-ups: where this sits in the sequence. */
  group: string;
  sounds: Sound[];
  words: PhonicsWord[];
  /** A short sentence to read aloud. */
  sentence: string;
}

const s = (grapheme: string, say: string, ipa: string, example: string, emoji: string): Sound => ({ grapheme, say, ipa, example, emoji });
const w = (word: string, emoji?: string): PhonicsWord => (emoji ? { word, emoji } : { word });

export const UNITS: Unit[] = [
  {
    id: "satp",
    title: "s a t p",
    group: "First letter sounds",
    sounds: [
      s("s", "sss", "s", "sun", "☀️"),
      s("a", "ah", "æ", "ant", "🐜"),
      s("t", "tuh", "tə", "tent", "⛺"),
      s("p", "puh", "pə", "pig", "🐷"),
    ],
    words: [w("tap", "🚰"), w("sat"), w("pat"), w("at"), w("as"), w("sap"), w("taps"), w("pats")],
    sentence: "Pat sat.",
  },
  {
    id: "inmd",
    title: "i n m d",
    group: "First letter sounds",
    sounds: [
      s("i", "ih", "ɪ", "insect", "🐛"),
      s("n", "nnn", "n", "nest", "🪺"),
      s("m", "mmm", "m", "moon", "🌙"),
      s("d", "duh", "də", "dog", "🐶"),
    ],
    words: [w("pin", "📌"), w("map", "🗺️"), w("man", "👨"), w("pan", "🍳"), w("sad", "😢"), w("nap", "😴"), w("sit"), w("dip"), w("tin")],
    sentence: "Sam sat in a pit.",
  },
  {
    id: "gock",
    title: "g o c k",
    group: "First letter sounds",
    sounds: [
      s("g", "guh", "ɡə", "goat", "🐐"),
      s("o", "aw", "ɒ", "octopus", "🐙"),
      s("c", "kuh", "kə", "cat", "🐱"),
      s("k", "kuh", "kə", "kite", "🪁"),
    ],
    words: [
      w("cat", "🐱"),
      w("dog", "🐶"),
      w("pig", "🐷"),
      w("cap", "🧢"),
      w("mop", "🧹"),
      w("dig", "⛏️"),
      w("kid", "🧒"),
      w("pot", "🍲"),
      w("got"),
      w("can"),
    ],
    sentence: "The cat sat on a mat.",
  },
  {
    id: "ckeur",
    title: "ck e u r",
    group: "More letter sounds",
    sounds: [
      s("ck", "kuh", "kə", "duck", "🦆"),
      s("e", "eh", "e", "egg", "🥚"),
      s("u", "uh", "ʌ", "umbrella", "☂️"),
      s("r", "rrr", "ɹ", "rabbit", "🐇"),
    ],
    words: [
      w("duck", "🦆"),
      w("sock", "🧦"),
      w("rock", "🪨"),
      w("net", "🥅"),
      w("sun", "☀️"),
      w("cup", "🥤"),
      w("nut", "🥜"),
      w("run", "🏃"),
      w("ten", "🔟"),
      w("red"),
      w("rug"),
    ],
    sentence: "A duck is in the mud.",
  },
  {
    id: "hbfl",
    title: "h b f l",
    group: "More letter sounds",
    sounds: [
      s("h", "huh", "hə", "hat", "🎩"),
      s("b", "buh", "bə", "bus", "🚌"),
      s("f", "fff", "f", "fan", "🪭"),
      s("l", "lll", "l", "leg", "🦵"),
    ],
    words: [
      w("hat", "🎩"),
      w("bus", "🚌"),
      w("bed", "🛏️"),
      w("bat", "🦇"),
      w("hen", "🐔"),
      w("hug", "🤗"),
      w("log", "🪵"),
      w("leg", "🦵"),
      w("lips", "👄"),
      w("fun"),
      w("lid"),
    ],
    sentence: "The hen is on the bed.",
  },
  {
    id: "ffllssjvw",
    title: "ff ll ss j v w",
    group: "More letter sounds",
    sounds: [
      s("ff", "fff", "f", "puff", "💨"),
      s("ll", "lll", "l", "bell", "🔔"),
      s("ss", "sss", "s", "kiss", "💋"),
      s("j", "juh", "dʒə", "jam", "🫙"),
      s("v", "vvv", "v", "van", "🚐"),
      s("w", "wuh", "wə", "web", "🕸️"),
    ],
    words: [
      w("bell", "🔔"),
      w("doll", "🪆"),
      w("hill", "⛰️"),
      w("kiss", "💋"),
      w("jam", "🫙"),
      w("jet", "✈️"),
      w("van", "🚐"),
      w("web", "🕸️"),
      w("puff", "💨"),
      w("mess"),
      w("wig"),
    ],
    sentence: "Jess has a red van.",
  },
  {
    id: "xyzqu",
    title: "x y z zz qu",
    group: "More letter sounds",
    sounds: [
      s("x", "ks", "ks", "fox", "🦊"),
      s("y", "yuh", "jə", "yak", "🐃"),
      s("z", "zzz", "z", "zip", "🤐"),
      s("zz", "zzz", "z", "buzz", "🐝"),
      s("qu", "kwuh", "kwə", "queen", "👸"),
    ],
    words: [
      w("fox", "🦊"),
      w("box", "📦"),
      w("six", "6️⃣"),
      w("yak", "🐃"),
      w("zip", "🤐"),
      w("buzz", "🐝"),
      w("yes", "✅"),
      w("quiz", "❓"),
      w("wax"),
      w("quack"),
    ],
    sentence: "The fox is in a box.",
  },
  {
    id: "chshthng",
    title: "ch sh th ng",
    group: "Two letters, one sound",
    sounds: [
      s("ch", "chuh", "tʃə", "chick", "🐥"),
      s("sh", "shhh", "ʃ", "ship", "🚢"),
      s("th", "thuh", "θ", "thumb", "👍"),
      s("ng", "nng", "ŋ", "ring", "💍"),
    ],
    words: [
      w("chick", "🐥"),
      w("chips", "🍟"),
      w("ship", "🚢"),
      w("fish", "🐟"),
      w("shell", "🐚"),
      w("bath", "🛁"),
      w("ring", "💍"),
      w("king", "🤴"),
      w("wing", "🪽"),
      w("thin"),
      w("much"),
      w("long"),
    ],
    sentence: "The fish is in the dish.",
  },
  {
    id: "aieeighoa",
    title: "ai ee igh oa",
    group: "Vowel teams",
    sounds: [
      s("ai", "ay", "eɪ", "rain", "🌧️"),
      s("ee", "ee", "iː", "bee", "🐝"),
      s("igh", "eye", "aɪ", "light", "💡"),
      s("oa", "oh", "oʊ", "boat", "⛵"),
    ],
    words: [
      w("rain", "🌧️"),
      w("snail", "🐌"),
      w("bee", "🐝"),
      w("tree", "🌳"),
      w("sheep", "🐑"),
      w("feet", "🦶"),
      w("light", "💡"),
      w("night", "🌃"),
      w("boat", "⛵"),
      w("goat", "🐐"),
      w("coat", "🧥"),
      w("soap", "🧼"),
      w("tail"),
      w("high"),
    ],
    sentence: "A goat sat in the rain.",
  },
  {
    id: "ooaror",
    title: "oo ar or",
    group: "Vowel teams",
    sounds: [
      s("oo", "oo", "uː", "moon", "🌙"),
      s("oo", "oo", "ʊ", "book", "📖"),
      s("ar", "ar", "ɑː", "car", "🚗"),
      s("or", "or", "ɔː", "fork", "🍴"),
    ],
    words: [
      w("moon", "🌙"),
      w("spoon", "🥄"),
      w("book", "📖"),
      w("hook", "🪝"),
      w("car", "🚗"),
      w("star", "⭐"),
      w("farm", "🚜"),
      w("fork", "🍴"),
      w("corn", "🌽"),
      w("storm", "⛈️"),
      w("zoo"),
      w("park"),
    ],
    sentence: "The car is in the park.",
  },
  {
    id: "urowoiearairer",
    title: "ur ow oi ear air er",
    group: "Vowel teams",
    sounds: [
      s("ur", "er", "ɜː", "turn", "↩️"),
      s("ow", "ow", "aʊ", "cow", "🐄"),
      s("oi", "oy", "ɔɪ", "coin", "🪙"),
      s("ear", "ear", "ɪə", "ear", "👂"),
      s("air", "air", "eə", "chair", "🪑"),
      s("er", "er", "ə", "hammer", "🔨"),
    ],
    words: [
      w("cow", "🐄"),
      w("owl", "🦉"),
      w("coin", "🪙"),
      w("oil", "🛢️"),
      w("ear", "👂"),
      w("beard", "🧔"),
      w("chair", "🪑"),
      w("hair", "💇"),
      w("hammer", "🔨"),
      w("ladder", "🪜"),
      w("letter", "✉️"),
      w("burn", "🔥"),
      w("town"),
      w("near"),
    ],
    sentence: "I can hear an owl in the town.",
  },
  {
    id: "splitvowels",
    title: "a_e i_e o_e u_e e_e",
    group: "Split vowels",
    sounds: [
      s("a_e", "ay", "eɪ", "cake", "🎂"),
      s("i_e", "eye", "aɪ", "kite", "🪁"),
      s("o_e", "oh", "oʊ", "bone", "🦴"),
      s("u_e", "you", "juː", "cube", "🧊"),
      s("e_e", "ee", "iː", "these", "👉"),
    ],
    words: [
      w("cake", "🎂"),
      w("snake", "🐍"),
      w("gate"),
      w("kite", "🪁"),
      w("bike", "🚲"),
      w("five", "5️⃣"),
      w("bone", "🦴"),
      w("rose", "🌹"),
      w("home", "🏠"),
      w("cube", "🧊"),
      w("tube"),
      w("these"),
    ],
    sentence: "I ride my bike home.",
  },
];

export function getUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id);
}

/** Every sound taught up to and including this unit. */
export function soundsUpTo(unitId: string): Sound[] {
  const end = UNITS.findIndex((u) => u.id === unitId);
  return UNITS.slice(0, end + 1).flatMap((u) => u.sounds);
}

/** Every grapheme the program teaches, longest first, so "igh" is found before "i". */
const GRAPHEMES = [...new Set(UNITS.flatMap((u) => u.sounds.map((x) => x.grapheme)).filter((g) => !g.includes("_")))].sort(
  (a, b) => b.length - a.length,
);

/** The letters of a word grouped into the sounds a child says, like "ch i ck" for "chick". A split vowel's e stays on its own. */
export function graphemesOf(word: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < word.length) {
    const g = GRAPHEMES.find((x) => word.startsWith(x, i)) ?? word[i];
    out.push(g);
    i += g.length;
  }
  return out;
}

/** Whether this letter group is the silent e at the end of a split vowel, like the e in cake. */
function silentE(parts: string[], index: number): boolean {
  return parts[index] === "e" && index === parts.length - 1 && parts.length > 2 && /^[aeiou]$/.test(parts[index - 2] ?? "");
}

/** The sound a letter group makes in this word: null for a silent e. A split vowel's first letter says its name (the a in cake). */
export function soundAt(word: string, index: number, parts = graphemesOf(word)): Sound | null {
  const g = parts[index];
  const split = /^[aeiou]$/.test(g) && index + 2 === parts.length - 1 && parts[index + 2] === "e" && parts.length > 2;
  if (silentE(parts, index)) return null;
  const all = UNITS.flatMap((u) => u.sounds);
  return all.find((x) => x.grapheme === (split ? `${g}_e` : g)) ?? null;
}

/** What Suni says for the sound a letter group makes in this word: "" for a silent e. */
export function soundFor(word: string, index: number, parts = graphemesOf(word)): string {
  if (silentE(parts, index)) return "";
  return soundAt(word, index, parts)?.say ?? parts[index];
}

/** Whether text is a short run of the IPA letters the program's sounds use, so the speech route takes nothing else. */
export function speakableIpa(ipa: string): boolean {
  return /^[a-zæɪɒʌɹʃθŋʊɑɔɜəʒɡː]{1,8}$/u.test(ipa);
}
