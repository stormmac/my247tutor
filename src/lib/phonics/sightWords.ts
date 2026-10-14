/**
 * Sight words: the common words children learn to read on sight, many of which can't be sounded
 * out (said, was, could). In levels from the first words read in Kindergarten to the trickier ones
 * of Year 2. Each word has a short sentence with a gap for it, used to practise reading it in context.
 */

export interface SightWord {
  word: string;
  /** A sentence with ___ where the word goes. */
  gap: string;
}

export interface SightLevel {
  id: string;
  title: string;
  words: SightWord[];
  /** A sentence that uses this level's words, to read aloud. */
  sentence: string;
}

const sw = (word: string, gap: string): SightWord => ({ word, gap });

export const SIGHT_LEVELS: SightLevel[] = [
  {
    id: "sight-1",
    title: "Level 1",
    words: [
      sw("I", "___ can run."),
      sw("a", "I have ___ cat."),
      sw("the", "Look at ___ sun."),
      sw("to", "We go ___ school."),
      sw("is", "The dog ___ big."),
      sw("it", "Can you see ___?"),
      sw("in", "The fish is ___ the pond."),
      sw("and", "Mum ___ Dad are here."),
    ],
    sentence: "I can see a cat and it is in the box.",
  },
  {
    id: "sight-2",
    title: "Level 2",
    words: [
      sw("he", "Sam said ___ is hot."),
      sw("she", "Mia said ___ can swim."),
      sw("we", "Can ___ play now?"),
      sw("me", "Give it to ___."),
      sw("be", "I will ___ good."),
      sw("was", "The cat ___ on the mat."),
      sw("my", "This is ___ hat."),
      sw("you", "I like ___."),
    ],
    sentence: "She said you can be with me and my dog.",
  },
  {
    id: "sight-3",
    title: "Level 3",
    words: [
      sw("said", '"Hello," ___ Mum.'),
      sw("are", "We ___ at the park."),
      sw("of", "I had a cup ___ milk."),
      sw("they", "Look, ___ are here!"),
      sw("all", "We ate ___ the cake."),
      sw("her", "That is ___ bag."),
      sw("his", "Tom lost ___ hat."),
      sw("have", "I ___ a red bike."),
    ],
    sentence: "They said all of us have a hat.",
  },
  {
    id: "sight-4",
    title: "Level 4",
    words: [
      sw("like", "I ___ to sing."),
      sw("so", "I am ___ happy!"),
      sw("do", "What can we ___?"),
      sw("some", "Can I have ___ jam?"),
      sw("come", "Please ___ to my house."),
      sw("were", "We ___ at the beach."),
      sw("there", "The cat is over ___."),
      sw("little", "The ___ duck swam."),
    ],
    sentence: "Come and see the little dog over there.",
  },
  {
    id: "sight-5",
    title: "Level 5",
    words: [
      sw("one", "I have ___ nose."),
      sw("when", "___ can we go?"),
      sw("out", "Let's go ___ to play."),
      sw("what", "___ is your name?"),
      sw("who", "___ is at the door?"),
      sw("where", "___ is my shoe?"),
      sw("here", "Come over ___."),
      sw("your", "Is this ___ book?"),
    ],
    sentence: "Who is here, and what is in your bag?",
  },
  {
    id: "sight-6",
    title: "Level 6",
    words: [
      sw("put", "___ the cup on the table."),
      sw("could", "I ___ see the moon."),
      sw("should", "We ___ go to bed."),
      sw("would", "I ___ like a drink."),
      sw("want", "I ___ to play."),
      sw("very", "It is ___ cold today."),
      sw("any", "Do you have ___ pets?"),
      sw("many", "How ___ cats are there?"),
    ],
    sentence: "I would like to put very many books away.",
  },
  {
    id: "sight-7",
    title: "Level 7",
    words: [
      sw("because", "I am happy ___ it is my birthday."),
      sw("people", "Lots of ___ came to the party."),
      sw("again", "Can we play that ___?"),
      sw("does", "Where ___ the bus stop?"),
      sw("friend", "Ava is my best ___."),
      sw("school", "We walk to ___."),
      sw("once", "___ upon a time, there was a king."),
      sw("laugh", "Jokes make me ___."),
    ],
    sentence: "My friend and I laugh again at school.",
  },
  {
    id: "sight-8",
    title: "Level 8",
    words: [
      sw("after", "We play ___ lunch."),
      sw("every", "I read ___ night."),
      sw("other", "Where is my ___ sock?"),
      sw("mother", "My ___ is kind."),
      sw("father", "My ___ cooks dinner."),
      sw("brother", "My little ___ is two."),
      sw("water", "Fish live in ___."),
      sw("about", "This book is ___ a dragon."),
    ],
    sentence: "After school my brother and I drink water.",
  },
];

export function getSightLevel(id: string): SightLevel | undefined {
  return SIGHT_LEVELS.find((l) => l.id === id);
}

/** Every sight word up to and including this level. */
export function sightWordsUpTo(levelId: string): SightWord[] {
  const end = SIGHT_LEVELS.findIndex((l) => l.id === levelId);
  return SIGHT_LEVELS.slice(0, end + 1).flatMap((l) => l.words);
}
