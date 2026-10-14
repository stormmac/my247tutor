/**
 * The Learn to Read program: synthetic phonics in the order NSW schools teach it in Kindergarten
 * to Year 2. Single letter sounds first, then two- and three-letter sounds, then vowel teams and
 * split vowels. Every word in a unit uses only sounds taught by then (plus a few common tricky
 * words in the sentences), so children can sound out everything they're asked to read.
 */

export interface Sound {
  /** How it's written: "s", "sh", "igh", or "a_e" for a split vowel like the a…e in cake. */
  grapheme: string;
  /** What Suni says for the sound alone. Spelled for the browser's voice, which can't say bare phonemes. */
  say: string;
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

const s = (grapheme: string, say: string, example: string, emoji: string): Sound => ({ grapheme, say, example, emoji });
const w = (word: string, emoji?: string): PhonicsWord => (emoji ? { word, emoji } : { word });

export const UNITS: Unit[] = [
  {
    id: "satp",
    title: "s a t p",
    group: "First letter sounds",
    sounds: [s("s", "sss", "sun", "☀️"), s("a", "a", "ant", "🐜"), s("t", "t", "tent", "⛺"), s("p", "p", "pig", "🐷")],
    words: [w("tap", "🚰"), w("sat"), w("pat"), w("at"), w("as"), w("sap"), w("taps"), w("pats")],
    sentence: "Pat sat.",
  },
  {
    id: "inmd",
    title: "i n m d",
    group: "First letter sounds",
    sounds: [s("i", "i", "insect", "🐛"), s("n", "nnn", "nest", "🪺"), s("m", "mmm", "moon", "🌙"), s("d", "d", "dog", "🐶")],
    words: [w("pin", "📌"), w("map", "🗺️"), w("man", "👨"), w("pan", "🍳"), w("sad", "😢"), w("nap", "😴"), w("sit"), w("dip"), w("tin")],
    sentence: "Sam sat in a pit.",
  },
  {
    id: "gock",
    title: "g o c k",
    group: "First letter sounds",
    sounds: [s("g", "g", "goat", "🐐"), s("o", "o", "octopus", "🐙"), s("c", "c", "cat", "🐱"), s("k", "k", "kite", "🪁")],
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
    sounds: [s("ck", "k", "duck", "🦆"), s("e", "e", "egg", "🥚"), s("u", "u", "umbrella", "☂️"), s("r", "rrr", "rabbit", "🐇")],
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
    sounds: [s("h", "h", "hat", "🎩"), s("b", "b", "bus", "🚌"), s("f", "fff", "fan", "🪭"), s("l", "lll", "leg", "🦵")],
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
      s("ff", "fff", "puff", "💨"),
      s("ll", "lll", "bell", "🔔"),
      s("ss", "sss", "kiss", "💋"),
      s("j", "j", "jam", "🫙"),
      s("v", "vvv", "van", "🚐"),
      s("w", "w", "web", "🕸️"),
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
      s("x", "ks", "fox", "🦊"),
      s("y", "y", "yak", "🐃"),
      s("z", "zzz", "zip", "🤐"),
      s("zz", "zzz", "buzz", "🐝"),
      s("qu", "kw", "queen", "👸"),
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
    sounds: [s("ch", "ch", "chick", "🐥"), s("sh", "shhh", "ship", "🚢"), s("th", "th", "thumb", "👍"), s("ng", "ng", "ring", "💍")],
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
    sounds: [s("ai", "ay", "rain", "🌧️"), s("ee", "ee", "bee", "🐝"), s("igh", "eye", "light", "💡"), s("oa", "oh", "boat", "⛵")],
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
    sounds: [s("oo", "oo", "moon", "🌙"), s("oo", "oo, as in book", "book", "📖"), s("ar", "ar", "car", "🚗"), s("or", "or", "fork", "🍴")],
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
      s("ur", "er", "turn", "↩️"),
      s("ow", "ow", "cow", "🐄"),
      s("oi", "oy", "coin", "🪙"),
      s("ear", "ear", "ear", "👂"),
      s("air", "air", "chair", "🪑"),
      s("er", "er", "hammer", "🔨"),
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
      s("a_e", "ay", "cake", "🎂"),
      s("i_e", "eye", "kite", "🪁"),
      s("o_e", "oh", "bone", "🦴"),
      s("u_e", "you", "cube", "🧊"),
      s("e_e", "ee", "these", "👉"),
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

/** The sound a letter group makes in this word: a split vowel's first letter says its name (the a in cake). */
export function soundFor(word: string, index: number, parts = graphemesOf(word)): string {
  const g = parts[index];
  const split = /^[aeiou]$/.test(g) && index + 2 === parts.length - 1 && parts[index + 2] === "e" && parts.length > 2;
  const all = UNITS.flatMap((u) => u.sounds);
  if (split) return all.find((x) => x.grapheme === `${g}_e`)?.say ?? g;
  // The e at the end of a split vowel is silent.
  if (g === "e" && index === parts.length - 1 && parts.length > 2 && /^[aeiou]$/.test(parts[index - 2] ?? "")) return "";
  return all.find((x) => x.grapheme === g)?.say ?? g;
}
