/**
 * Year 1 English: two sets of 15 questions for each Stage 1 standard (NESA outcome), three at each
 * level from very easy to very hard. Reading and literature questions use short original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN1-PHOKW-01: sounds and letters, blending, digraphs, rhyming and syllables. */
export const PHONICS = levels(1110101, {
  very_easy: [
    (n) => choice(n, "What sound does 'cat' start with?", ["c", "t", "a", "d"], 0, "Say it slowly: c-a-t. The first sound is c."),
    (n) => trueFalse(n, "'Sun' and 'sock' start with the same sound.", true, "Say them: s-un, s-ock. Both start with the s sound."),
    (n) => typed("fill_blank", n, "c + a + t = ___", "cat", "Say each sound, then push them together: c-a-t, cat."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word rhymes with 'hat'?",
        ["hot", "mat", "hit", "ham"],
        1,
        "Rhyming words end the same way. Hat and mat both end in -at.",
      ),
    (n) =>
      typed("short_answer", n, "What is the last sound in 'dog'? Write the letter.", "g", "Say it slowly: d-o-g. The last sound is g."),
    (n) =>
      multi(
        n,
        "Which words start with 'sh'? Choose all that are right.",
        ["ship", "shop", "chip", "sun", "shell"],
        [0, 1, 4],
        "Ship, shop and shell start with sh. Chip starts with ch and sun starts with s.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word has the 'ee' sound, like in 'tree'?",
        ["bed", "feet", "fit", "fat"],
        1,
        "Feet has ee in the middle: f-ee-t. It sounds like the ee in tree.",
      ),
    (n) => typed("fill_blank", n, "ch + i + p = ___", "chip", "The two letters ch make one sound. Blend it: ch-i-p, chip."),
    (n) =>
      ordering(n, "Put the sounds in order to make 'fish'.", ["f", "i", "sh"], "Say it slowly: f-i-sh. The sh makes one sound at the end."),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "How many syllables (claps) are in 'rabbit'?",
        ["1", "2", "3", "4"],
        1,
        "Clap it as you say it: rab-bit. That is two claps, so two syllables.",
      ),
    (n) =>
      multi(
        n,
        "Which words rhyme with 'cake'? Choose all that are right.",
        ["lake", "make", "cook", "bake", "back"],
        [0, 1, 3],
        "Lake, make and bake all end in -ake, like cake. Cook and back end differently.",
      ),
    (n) => trueFalse(n, "The word 'duck' ends with the letters 'ck'.", true, "Duck is spelt d-u-c-k. The c and k together make one sound."),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word has three syllables?",
        ["dog", "kitten", "kangaroo", "apple"],
        2,
        "Clap each word. Kan-ga-roo has three claps. Kit-ten and ap-ple have two. Dog has one.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Change the 'sh' in 'shop' to 'ch'. What word do you make?",
        "chop",
        "Take away sh and put ch at the start: ch-o-p, chop.",
      ),
    (n) =>
      multi(
        n,
        "Which words have the same middle sound as 'rain'? Choose all that are right.",
        ["train", "pain", "ran", "snail", "rat"],
        [0, 1, 3],
        "Train, pain and snail have the ai sound, like rain. Ran and rat have a short a sound.",
      ),
  ],
});

/** EN1-PHOKW-01: sounds and letters, blending, digraphs, rhyming and syllables. */
export const PHONICS_2 = levels(1110116, {
  very_easy: [
    (n) => choice(n, "Which letter does 'pig' start with?", ["b", "p", "g", "d"], 1, "Say it slowly: p-i-g. The first sound is p."),
    (n) => typed("fill_blank", n, "m + o + p = ___", "mop", "Say each sound, then push them together: m-o-p, mop."),
    (n) => trueFalse(n, "'Bat' and 'cat' rhyme.", true, "Bat and cat both end in -at, so they rhyme."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word starts with 'th'?",
        ["thin", "tin", "fin", "chin"],
        0,
        "Thin starts with th. Tin starts with t, fin with f and chin with ch.",
      ),
    (n) =>
      typed("short_answer", n, "What is the first sound in 'moon'? Write the letter.", "m", "Say it slowly: m-oo-n. The first sound is m."),
    (n) =>
      multi(
        n,
        "Which words rhyme with 'pig'? Choose all that are right.",
        ["dig", "big", "peg", "wig", "pin"],
        [0, 1, 3],
        "Dig, big and wig all end in -ig, like pig. Peg and pin end differently.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word has the 'oo' sound, like in 'moon'?",
        ["spoon", "sun", "pan", "pen"],
        0,
        "Spoon has oo in the middle: sp-oo-n. It sounds like the oo in moon.",
      ),
    (n) =>
      ordering(
        n,
        "Put the sounds in order to make 'chick'.",
        ["ch", "i", "ck"],
        "Say it slowly: ch-i-ck. Ch makes the first sound and ck makes the last sound.",
      ),
    (n) => trueFalse(n, "'Ship' starts with the 'ch' sound.", false, "Ship starts with sh: sh-i-p. Chip starts with ch."),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "How many syllables (claps) are in 'butterfly'?",
        ["1", "2", "3", "4"],
        2,
        "Clap it as you say it: but-ter-fly. That is three claps.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Fill in the missing sound. A farm animal that says baa is a sh___p.",
        "ee",
        "The animal is a sheep: sh-ee-p. The missing sound is ee.",
      ),
    (n) =>
      multi(
        n,
        "Which words have 'th' in them? Choose all that are right.",
        ["bath", "bat", "three", "tree", "moth"],
        [0, 2, 4],
        "Bath, three and moth all have th. Bat and tree only have a t.",
      ),
  ],
  very_hard: [
    (n) =>
      typed("short_answer", n, "Take the 'p' off 'pink'. What word is left?", "ink", "Pink is p-ink. Take away the p and you have ink."),
    (n) =>
      choice(
        n,
        "Which word has a different middle sound from the others?",
        ["feet", "seen", "bed", "green"],
        2,
        "Feet, seen and green all have the ee sound. Bed has a short e sound, so it is different.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from fewest to most syllables.",
        ["cat", "tiger", "kangaroo"],
        "Clap each word. Cat has one clap, ti-ger has two and kan-ga-roo has three.",
      ),
  ],
});

/** EN1-SPELL-01: spelling common words and patterns, plurals with -s, and adding -ing and -ed. */
export const SPELLING = levels(1110201, {
  very_easy: [
    (n) =>
      choice(n, "Which word is spelt right?", ["teh", "the", "hte", "eth"], 1, "'The' is spelt t-h-e. It is a word we use all the time."),
    (n) => typed("fill_blank", n, "One dog, two ___.", ["dogs"], "Add -s to show more than one: one dog, two dogs."),
    (n) => trueFalse(n, "'Cat' is spelt c-a-t.", true, "Say it slowly: c-a-t. Each sound has one letter."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which is the right way to spell 'said'?",
        ["sed", "said", "sayd", "siad"],
        1,
        "'Said' is a tricky word. It is spelt s-a-i-d.",
      ),
    (n) => typed("short_answer", n, "Add -ing to 'jump'.", "jumping", "Just add -ing to the end: jump + ing = jumping."),
    (n) =>
      multi(
        n,
        "Which words are spelt right? Choose all that are right.",
        ["was", "wos", "you", "yoo", "are"],
        [0, 2, 4],
        "Was, you and are are tricky words. Learn them by heart: w-a-s, y-o-u, a-r-e.",
      ),
  ],
  medium: [
    (n) => typed("fill_blank", n, "play + ed = ___", "played", "Just add -ed to the end: play + ed = played."),
    (n) =>
      choice(
        n,
        "Which word fits? 'I can see two ___.'",
        ["bird", "birds", "birdz", "brids"],
        1,
        "There are two, so we need more than one. Add -s: birds.",
      ),
    (n) =>
      ordering(n, "Put the letters in order to spell 'ship'.", ["s", "h", "i", "p"], "Say it slowly: sh-i-p. Sh is spelt with s then h."),
  ],
  hard: [
    (n) => typed("short_answer", n, "Add -ed to 'kick'.", "kicked", "Just add -ed to the end: kick + ed = kicked."),
    (n) =>
      trueFalse(n, "The word 'have' ends with the letter 'e'.", true, "'Have' is spelt h-a-v-e. You cannot hear the e, but it is there."),
    (n) =>
      choice(
        n,
        "Which word fits? 'Yesterday I ___ to my friend.'",
        ["talk", "talked", "talking", "talks"],
        1,
        "Yesterday is in the past, so add -ed: talked.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which words are spelt right? Choose all that are right.",
        ["going", "goeing", "jumped", "jumpt", "looking"],
        [0, 2, 4],
        "Going, jumped and looking just add -ing or -ed to the word. Goeing and jumpt are not right.",
      ),
    (n) => typed("fill_blank", n, "Tom is ___ a book. (read + ing)", "reading", "Just add -ing to read: reading. Tom is reading a book."),
    (n) =>
      choice(
        n,
        "Which word is spelt right?",
        ["frend", "friend", "freind", "frind"],
        1,
        "'Friend' is a tricky word: f-r-i-e-n-d. Remember 'i before e' in friend.",
      ),
  ],
});

/** EN1-SPELL-01: spelling common words and patterns, plurals with -s, and adding -ing and -ed. */
export const SPELLING_2 = levels(1110216, {
  very_easy: [
    (n) => choice(n, "Which word is spelt right?", ["dog", "dgo", "odg", "gdo"], 0, "Say it slowly: d-o-g. The letters go in that order."),
    (n) => typed("fill_blank", n, "One hat, two ___.", ["hats"], "Add -s to show more than one: one hat, two hats."),
    (n) => trueFalse(n, "'Is' is spelt i-z.", false, "'Is' sounds like it ends in z, but it is spelt i-s."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "look + ing = ___", "looking", "Just add -ing to the end: look + ing = looking."),
    (n) => choice(n, "Which is the right way to spell 'when'?", ["wen", "whenn", "when", "wehn"], 2, "'When' starts with wh: w-h-e-n."),
    (n) => trueFalse(n, "More than one 'cup' is 'cups'.", true, "Add -s to show more than one: one cup, two cups."),
  ],
  medium: [
    (n) => typed("short_answer", n, "Add -ed to 'help'.", "helped", "Just add -ed to the end: help + ed = helped."),
    (n) =>
      multi(
        n,
        "Which words mean more than one? Choose all that are right.",
        ["cats", "bed", "pens", "frogs", "sun"],
        [0, 2, 3],
        "Cats, pens and frogs end in -s, so they mean more than one. Bed and sun mean just one.",
      ),
    (n) =>
      ordering(n, "Put the letters in order to spell 'much'.", ["m", "u", "c", "h"], "Say it slowly: m-u-ch. Ch is spelt with c then h."),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the right way to spell 'come'?",
        ["cum", "come", "kom", "coom"],
        1,
        "'Come' is a tricky word: c-o-m-e. It ends with an e.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Yesterday we ___ to the shop. (walk + ed)",
        "walked",
        "It happened yesterday, so add -ed: walk + ed = walked.",
      ),
    (n) =>
      typed("short_answer", n, "Write the word for more than one 'book'.", "books", "Add -s to show more than one: one book, two books."),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which words are spelt right? Choose all that are right.",
        ["they", "thay", "here", "heer", "some"],
        [0, 2, 4],
        "They, here and some are tricky words: t-h-e-y, h-e-r-e, s-o-m-e.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is spelt right?",
        ["I am runing.", "I am running.", "I am rnning.", "I am runeing."],
        1,
        "Run has a short u, so we double the n before -ing: running.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The dogs are ___ in the park. (bark + ing)",
        "barking",
        "Just add -ing to bark: barking. The dogs are barking.",
      ),
  ],
});

/** EN1-VOCAB-01: word meanings, opposites, words that go together and describing words. */
export const VOCAB = levels(1120101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the opposite of 'big'?",
        ["large", "small", "tall", "fat"],
        1,
        "Big and small are opposites. Large means the same as big.",
      ),
    (n) => trueFalse(n, "A puppy is a baby dog.", true, "A baby dog is called a puppy."),
    (n) =>
      choice(
        n,
        "In 'the red ball', which word is a describing word?",
        ["the", "red", "ball"],
        1,
        "Red tells us what the ball looks like. It is a describing word.",
      ),
  ],
  easy: [
    (n) => typed("fill_blank", n, "The opposite of 'up' is ___.", "down", "If you are not going up, you are going down."),
    (n) =>
      multi(
        n,
        "Which of these are fruits? Choose all that are right.",
        ["apple", "banana", "chair", "pear", "car"],
        [0, 1, 3],
        "Apples, bananas and pears are fruits you can eat. A chair and a car are not.",
      ),
    (n) =>
      choice(
        n,
        "Which word goes with 'knife and ___'?",
        ["fork", "shoe", "tree", "bus"],
        0,
        "We eat with a knife and fork. They go together.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What does 'tiny' mean?",
        ["very small", "very big", "very fast", "very loud"],
        0,
        "Tiny means very, very small, like an ant.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the opposite of 'happy'?",
        ["sad", "unhappy", "upset"],
        "When you are not happy, you are sad. Happy and sad are opposites.",
      ),
    (n) =>
      ordering(
        n,
        "Put these animals in order from smallest to biggest.",
        ["ant", "cat", "horse", "elephant"],
        "An ant is tiny. A cat is bigger. A horse is bigger again. An elephant is the biggest.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which words tell how something feels when you touch it? Choose all that are right.",
        ["soft", "rough", "red", "smooth", "loud"],
        [0, 1, 3],
        "Soft, rough and smooth tell how things feel. Red is a colour and loud is a sound.",
      ),
    (n) =>
      choice(
        n,
        "'The koala was sleepy.' What does 'sleepy' mean?",
        ["tired", "hungry", "angry", "wet"],
        0,
        "Sleepy means you are tired and want to sleep.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Shout' and 'whisper' mean the same thing.",
        false,
        "Shout means speak very loudly. Whisper means speak very quietly. They are opposites.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word does NOT belong?",
        ["red", "blue", "green", "round"],
        3,
        "Red, blue and green are colours. Round is a shape word, so it does not belong.",
      ),
    (n) =>
      choice(
        n,
        "'Mum said the soup was boiling.' What does 'boiling' tell you?",
        ["it was very hot", "it was very cold", "it was very old", "it was very sweet"],
        0,
        "Boiling is when water bubbles because it is so hot. The soup was very hot.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from slowest to fastest.",
        ["snail", "rabbit", "racing car"],
        "A snail is very slow. A rabbit can hop fast. A racing car is the fastest.",
      ),
  ],
});

/** EN1-VOCAB-01: word meanings, opposites, words that go together and describing words. */
export const VOCAB_2 = levels(1120116, {
  very_easy: [
    (n) => choice(n, "What is the opposite of 'hot'?", ["cold", "warm", "sunny", "wet"], 0, "Hot and cold are opposites."),
    (n) => trueFalse(n, "A joey is a baby kangaroo.", true, "A baby kangaroo is called a joey. It lives in its mother's pouch."),
    (n) => typed("fill_blank", n, "The opposite of 'yes' is ___.", "no", "Yes and no are opposites."),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word goes with 'salt and ___'?",
        ["pepper", "sugar", "sand", "milk"],
        0,
        "We often put salt and pepper on food. They go together.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are animals? Choose all that are right.",
        ["wombat", "kite", "emu", "table", "possum"],
        [0, 2, 4],
        "Wombats, emus and possums are Australian animals. A kite and a table are things.",
      ),
    (n) => choice(n, "Which word means the same as 'glad'?", ["happy", "sad", "tired", "cross"], 0, "Glad and happy mean the same thing."),
  ],
  medium: [
    (n) => typed("short_answer", n, "What is the opposite of 'open'?", ["closed", "shut"], "If a door is not open, it is closed or shut."),
    (n) =>
      choice(
        n,
        "'The road was wet and slippery.' What does 'slippery' mean?",
        ["easy to slide on", "very dry", "very long", "very hot"],
        0,
        "A wet road is easy to slip and slide on. That is what slippery means.",
      ),
    (n) =>
      multi(
        n,
        "Which words tell how something sounds? Choose all that are right.",
        ["loud", "quiet", "green", "noisy", "tall"],
        [0, 1, 3],
        "Loud, quiet and noisy tell about sounds. Green is a colour and tall is a size.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to biggest.",
        ["raindrop", "puddle", "pond", "sea"],
        "A raindrop is tiny. A puddle is bigger, a pond is bigger again, and the sea is the biggest.",
      ),
    (n) => choice(n, "Which word means 'very big'?", ["huge", "little", "quick", "thin"], 0, "Huge means very, very big."),
    (n) => trueFalse(n, "'Begin' and 'start' mean the same thing.", true, "When you begin something, you start it. They mean the same."),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'Ben gobbled his lunch and was finished in a minute.' What does 'gobbled' mean?",
        ["ate very fast", "ate very slowly", "threw away", "shared"],
        0,
        "Ben finished in a minute, so he must have eaten very fast. That is what gobbled means.",
      ),
    (n) =>
      choice(
        n,
        "Which word does NOT belong?",
        ["sock", "shoe", "hat", "spoon"],
        3,
        "Socks, shoes and hats are things you wear. A spoon is for eating, so it does not belong.",
      ),
    (n) =>
      multi(
        n,
        "Which words mean almost the same as 'little'? Choose all that are right.",
        ["small", "tiny", "huge", "giant", "heavy"],
        [0, 1],
        "Small and tiny mean little. Huge and giant mean very big. Heavy is about weight.",
      ),
  ],
});

const MY_CAT = {
  title: "My Cat",
  text:
    "I have a cat. Her name is Tilly. Tilly is black and white.\n\n" +
    "She likes to sleep on my bed. In the morning she drinks milk. Then she plays with a ball of wool. I love Tilly.",
};

const AT_THE_BEACH = {
  title: "At the Beach",
  text:
    "Jack and Mia went to the beach with Dad. They made a big sandcastle. Mia found a shell. Jack swam in the waves.\n\n" +
    "At lunch they ate fish and chips. A seagull tried to take a chip! Dad shooed it away.",
};

const FROGS = {
  title: "Frogs",
  text:
    "Frogs live near ponds and creeks. They have long back legs for jumping.\n\n" +
    "Frogs eat flies and other bugs. They catch them with a long, sticky tongue.\n\n" +
    "Baby frogs are called tadpoles. Tadpoles live in water and have tails.",
};

const RAINY_DAY = {
  title: "The Rainy Day",
  text:
    "It was raining, so Ella could not play outside. She felt sad.\n\n" +
    "Then Grandma had an idea. They got out paper, glue and paint. Ella made a picture of a rainbow.\n\n" +
    "When the rain stopped, a real rainbow was in the sky! Ella smiled.",
};

const LOST_SHOE = {
  title: "The Lost Shoe",
  text:
    "Leo could not find his school shoe. He looked under his bed. He looked in the bath.\n\n" +
    "“Hurry, Leo, the bus is coming!” called Mum.\n\n" +
    "Then Leo saw Max, his puppy, in the garden. Max was chewing something black.\n\n" +
    "“My shoe!” cried Leo.",
};

/** EN1-RECOM-01: understanding short stories and information texts. */
export const READING = levels(1130101, {
  very_easy: [
    (n) => read(MY_CAT, choice(n, "What is the cat's name?", ["Max", "Tilly", "Milly", "Tom"], 1, "The text says, 'Her name is Tilly.'")),
    (n) => read(MY_CAT, trueFalse(n, "Tilly is black and white.", true, "The text says, 'Tilly is black and white.'")),
    (n) => read(MY_CAT, typed("fill_blank", n, "Tilly likes to sleep on my ___.", "bed", "The text says, 'She likes to sleep on my bed.'")),
  ],
  easy: [
    (n) =>
      read(
        AT_THE_BEACH,
        choice(
          n,
          "Who went to the beach with Jack and Mia?",
          ["Mum", "Dad", "Grandma", "a friend"],
          1,
          "The first sentence says they went 'with Dad'.",
        ),
      ),
    (n) =>
      read(
        AT_THE_BEACH,
        multi(
          n,
          "What did they do at the beach? Choose all that are right.",
          ["made a sandcastle", "swam in the waves", "flew a kite", "ate fish and chips", "rode bikes"],
          [0, 1, 3],
          "The text tells us they made a sandcastle, Jack swam and they ate fish and chips. It does not say kites or bikes.",
        ),
      ),
    (n) => read(AT_THE_BEACH, typed("short_answer", n, "What did Mia find?", ["shell", "a shell"], "The text says, 'Mia found a shell.'")),
  ],
  medium: [
    (n) =>
      read(
        FROGS,
        choice(
          n,
          "What do frogs use to catch bugs?",
          ["their tongue", "their tail", "their feet", "a net"],
          0,
          "The text says they catch bugs 'with a long, sticky tongue'.",
        ),
      ),
    (n) => read(FROGS, trueFalse(n, "Baby frogs are called tadpoles.", true, "The text says, 'Baby frogs are called tadpoles.'")),
    (n) =>
      read(
        FROGS,
        typed(
          "short_answer",
          n,
          "Frogs have long back legs. What are they good for?",
          ["jumping", "jump", "to jump", "hopping", "hop"],
          "The text says frogs 'have long back legs for jumping'.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        RAINY_DAY,
        choice(
          n,
          "Why could Ella not play outside?",
          ["It was raining.", "It was night.", "She was sick.", "Grandma said no."],
          0,
          "The text says, 'It was raining, so Ella could not play outside.'",
        ),
      ),
    (n) =>
      read(
        RAINY_DAY,
        choice(
          n,
          "How did Ella feel at the end?",
          ["happy", "sad", "angry", "scared"],
          0,
          "At the end Ella smiled. People smile when they are happy.",
        ),
      ),
    (n) =>
      read(
        RAINY_DAY,
        ordering(
          n,
          "Put these in the order they happened.",
          ["It was raining.", "Grandma had an idea.", "Ella made a picture.", "A real rainbow came out."],
          "First it rained. Then Grandma had an idea and Ella made a picture. Last, a real rainbow came out.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        LOST_SHOE,
        choice(
          n,
          "Who took Leo's shoe?",
          ["Mum", "Max the puppy", "Leo's sister", "the bus driver"],
          1,
          "Max was chewing something black, and Leo cried, 'My shoe!' So Max had taken it.",
        ),
      ),
    (n) =>
      read(
        LOST_SHOE,
        choice(
          n,
          "Where was Leo going?",
          ["to school", "to the beach", "to bed", "to the shops"],
          0,
          "He was looking for his school shoe and the bus was coming, so he was going to school.",
        ),
      ),
    (n) =>
      read(
        LOST_SHOE,
        trueFalse(n, "Leo's shoe is black.", true, "Max was chewing something black, and Leo saw it was his shoe. So the shoe is black."),
      ),
  ],
});

const MY_BIKE = {
  title: "My Bike",
  text:
    "Sam has a new bike. It is blue. It has a bell that goes ring, ring!\n\n" +
    "Sam rides his bike to the park with his big sister. He wears a helmet to keep his head safe.",
};

const THE_PICNIC = {
  title: "The Picnic",
  text:
    "On Sunday, Ruby and her family had a picnic in the park. They sat on a big rug under a tree.\n\n" +
    "They ate sandwiches, apples and cake. Ruby's brother kicked a ball. Ruby fed bread to the ducks. Then it was time to go home.",
};

const KANGAROOS = {
  title: "Kangaroos",
  text:
    "Kangaroos live in Australia. They hop on their strong back legs. They use their long tail to help them balance.\n\n" +
    "Kangaroos eat grass. A mother kangaroo carries her baby in a pouch. The baby is called a joey.",
};

const WOBBLY_TOOTH = {
  title: "Ollie's Tooth",
  text:
    "Ollie's front tooth was wobbly. It wiggled when he ate his toast.\n\n" +
    "At lunch, he bit into a crunchy apple. Crack! The tooth came out.\n\n" +
    "Ollie put it in a little box. That night, he put the box under his pillow. In the morning, there was a shiny coin.",
};

const THE_STORM = {
  title: "The Big Storm",
  text:
    "Dark clouds filled the sky. The wind blew the trees. Rain banged on the roof.\n\n" +
    "Nina's dog, Pip, hid under the table and shook. Nina sat next to him and stroked his ears. “It's OK, Pip,” she said softly.\n\n" +
    "Soon the rain stopped and the sun came out. Pip wagged his tail.",
};

/** EN1-RECOM-01: understanding short stories and information texts. */
export const READING_2 = levels(1130116, {
  very_easy: [
    (n) => read(MY_BIKE, choice(n, "What colour is Sam's bike?", ["red", "blue", "green", "pink"], 1, "The text says, 'It is blue.'")),
    (n) =>
      read(
        MY_BIKE,
        typed(
          "fill_blank",
          n,
          "Sam wears a ___ to keep his head safe.",
          "helmet",
          "The text says, 'He wears a helmet to keep his head safe.'",
        ),
      ),
    (n) =>
      read(
        MY_BIKE,
        trueFalse(n, "Sam rides to the park with his big sister.", true, "The text says he rides 'to the park with his big sister'."),
      ),
  ],
  easy: [
    (n) => read(THE_PICNIC, typed("short_answer", n, "What day was the picnic?", "Sunday", "The first words are, 'On Sunday'.")),
    (n) =>
      read(
        THE_PICNIC,
        multi(
          n,
          "What did they eat? Choose all that are right.",
          ["sandwiches", "apples", "pizza", "cake", "ice cream"],
          [0, 1, 3],
          "The text says, 'They ate sandwiches, apples and cake.'",
        ),
      ),
    (n) =>
      read(
        THE_PICNIC,
        choice(
          n,
          "What did Ruby feed to the ducks?",
          ["bread", "cake", "apples", "grass"],
          0,
          "The text says, 'Ruby fed bread to the ducks.'",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(KANGAROOS, choice(n, "What do kangaroos eat?", ["grass", "fish", "bugs", "meat"], 0, "The text says, 'Kangaroos eat grass.'")),
    (n) =>
      read(
        KANGAROOS,
        trueFalse(
          n,
          "Kangaroos use their tail to help them balance.",
          true,
          "The text says they 'use their long tail to help them balance'.",
        ),
      ),
    (n) =>
      read(
        KANGAROOS,
        typed(
          "short_answer",
          n,
          "Where does a mother kangaroo carry her baby?",
          ["pouch", "in a pouch", "in her pouch", "a pouch", "her pouch"],
          "The text says, 'A mother kangaroo carries her baby in a pouch.'",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        WOBBLY_TOOTH,
        choice(
          n,
          "What made Ollie's tooth come out?",
          ["a crunchy apple", "his toast", "his pillow", "a shiny coin"],
          0,
          "He bit into a crunchy apple, then 'Crack! The tooth came out.'",
        ),
      ),
    (n) =>
      read(
        WOBBLY_TOOTH,
        ordering(
          n,
          "Put these in the order they happened.",
          ["The tooth wiggled.", "Ollie bit an apple.", "The tooth came out.", "Ollie found a coin."],
          "First the tooth wiggled. Then he bit the apple and the tooth came out. Last, he found a coin in the morning.",
        ),
      ),
    (n) =>
      read(
        WOBBLY_TOOTH,
        choice(
          n,
          "Why did Ollie put the box under his pillow?",
          ["for the tooth fairy", "to keep it warm", "because he was sad", "to hide it from his dog"],
          0,
          "In the morning there was a coin. The tooth fairy leaves a coin for a tooth under a pillow.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        THE_STORM,
        choice(
          n,
          "How did Pip feel in the storm?",
          ["scared", "happy", "hungry", "sleepy"],
          0,
          "Pip hid under the table and shook. That is what a scared dog does.",
        ),
      ),
    (n) =>
      read(
        THE_STORM,
        multi(
          n,
          "Which things tell you there was a storm? Choose all that are right.",
          ["dark clouds", "the wind blew", "the sun came out", "rain banged on the roof"],
          [0, 1, 3],
          "Dark clouds, wind and heavy rain are signs of a storm. The sun came out after the storm.",
        ),
      ),
    (n) =>
      read(
        THE_STORM,
        trueFalse(n, "At the end, Pip felt happy again.", true, "Pip wagged his tail. Dogs wag their tails when they are happy."),
      ),
  ],
});

const RAIN_POEM = {
  title: "Rain",
  text:
    "Pitter, patter, on the roof,\nRain is falling, here's the proof.\n\n" +
    "Puddles grow along the lane,\nSplish and splash, I love the rain!\n\n" +
    "Boots are on and so's my coat,\nNow I'll sail my paper boat.",
};

const NEW_GIRL = {
  title: "The New Girl",
  text:
    "It was Zara's first day at a new school. She stood by the gate and held Mum's hand tight. Her tummy felt funny.\n\n" +
    "Then a girl with a big smile ran over. “Hi, I'm Lily. Do you want to play?”\n\n" +
    "Zara nodded. By lunch, they were best friends.",
};

const WOMBAT_HOLE = {
  title: "Wombat's Hole",
  text:
    "Wombat dug a hole under the old gum tree. It was cosy and dark.\n\n" +
    "One night, a storm came. Possum was wet and cold. “Can I come in?” asked Possum.\n\n" +
    "“Yes,” said Wombat. “There is room for two.”\n\n" +
    "They slept snug and warm until morning.",
};

const PUPPY_POEM = {
  title: "My Puppy",
  text:
    "My puppy is small,\nMy puppy is brown,\nHe runs round the yard\nAnd he jumps up and down.\n\n" +
    "He chews on my slipper,\nHe licks at my face,\nHe follows me round\nAll over the place.",
};

const BROKEN_KITE = {
  title: "The Kite",
  text:
    "Noah made a kite with Dad. It was red with a long tail. At the park, the wind lifted it high.\n\n" +
    "Then, snap! The string broke. The kite flew over the trees and was gone. Noah's lip wobbled.\n\n" +
    "Dad gave him a hug. “Let's make another one,” he said. “This time, we'll make it even better.”",
};

/** EN1-UARL-01: stories and poems: characters, settings, events, rhyme and feelings. */
export const LITERATURE = levels(1130201, {
  very_easy: [
    (n) =>
      read(
        RAIN_POEM,
        choice(n, "What is the poem about?", ["rain", "snow", "the sun", "a cat"], 0, "The poem talks about rain falling and puddles."),
      ),
    (n) =>
      read(
        RAIN_POEM,
        choice(
          n,
          "Which word rhymes with 'coat' in the poem?",
          ["boots", "boat", "rain", "roof"],
          1,
          "Coat and boat both end in -oat, so they rhyme.",
        ),
      ),
    (n) => read(RAIN_POEM, trueFalse(n, "The child in the poem likes the rain.", true, "The poem says, 'I love the rain!'")),
  ],
  easy: [
    (n) =>
      read(
        NEW_GIRL,
        choice(
          n,
          "Where is the story set?",
          ["at a school", "at the beach", "at home", "at a farm"],
          0,
          "It was Zara's first day at a new school. That is the setting.",
        ),
      ),
    (n) =>
      read(
        NEW_GIRL,
        choice(
          n,
          "How did Zara feel at the start?",
          ["worried", "angry", "silly", "sleepy"],
          0,
          "She held Mum's hand tight and her tummy felt funny. She was worried about her new school.",
        ),
      ),
    (n) => read(NEW_GIRL, typed("short_answer", n, "What is the name of the girl who said hi?", "Lily", "The girl said, 'Hi, I'm Lily.'")),
  ],
  medium: [
    (n) =>
      read(
        WOMBAT_HOLE,
        multi(
          n,
          "Who are the characters in the story? Choose all that are right.",
          ["Wombat", "Possum", "Koala", "Emu"],
          [0, 1],
          "Wombat and Possum are in the story. Koala and Emu are not.",
        ),
      ),
    (n) =>
      read(
        WOMBAT_HOLE,
        choice(
          n,
          "What kind of friend is Wombat?",
          ["kind", "mean", "lazy", "scared"],
          0,
          "Wombat let wet, cold Possum into the hole. That is a kind thing to do.",
        ),
      ),
    (n) =>
      read(
        WOMBAT_HOLE,
        ordering(
          n,
          "Put these in the order they happened.",
          ["Wombat dug a hole.", "A storm came.", "Possum asked to come in.", "They slept until morning."],
          "First Wombat dug a hole. Then the storm came and Possum asked to come in. Last, they slept until morning.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        PUPPY_POEM,
        choice(
          n,
          "Which word rhymes with 'face' in the poem?",
          ["place", "round", "small", "yard"],
          0,
          "Face and place both end in -ace, so they rhyme.",
        ),
      ),
    (n) =>
      read(
        PUPPY_POEM,
        multi(
          n,
          "What does the puppy do? Choose all that are right.",
          ["runs round the yard", "chews a slipper", "sings a song", "licks a face", "reads a book"],
          [0, 1, 3],
          "The poem says he runs round the yard, chews a slipper and licks a face. Puppies cannot sing or read!",
        ),
      ),
    (n) =>
      read(
        PUPPY_POEM,
        trueFalse(n, "The puppy in the poem is big and black.", false, "The poem says, 'My puppy is small, my puppy is brown.'"),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        BROKEN_KITE,
        choice(
          n,
          "What is the problem in the story?",
          ["The string broke and the kite flew away.", "Noah lost his hat.", "It started to rain.", "Dad was sick."],
          0,
          "The problem is what goes wrong. The string broke and the kite was gone.",
        ),
      ),
    (n) =>
      read(
        BROKEN_KITE,
        choice(
          n,
          "Noah's lip wobbled. How did he feel?",
          ["sad", "happy", "excited", "proud"],
          0,
          "When your lip wobbles, you feel like crying. Noah was sad that his kite was gone.",
        ),
      ),
    (n) =>
      read(
        BROKEN_KITE,
        trueFalse(n, "Dad was cross with Noah.", false, "Dad gave Noah a hug and wanted to make a new kite. He was kind, not cross."),
      ),
  ],
});

const MOON_POEM = {
  title: "The Moon",
  text:
    "The moon is round,\nThe moon is bright,\nIt shines on you and me\nAll through the night.\n\n" +
    "The stars come out\nTo say hello,\nThey twinkle, twinkle\nSoft and low.",
};

const TOM_BIRTHDAY = {
  title: "Tom's Birthday",
  text:
    "Today was Tom's birthday. He was six! Mum made a chocolate cake with six candles.\n\n" +
    "All his friends came to the party. They played games in the backyard. Tom blew out the candles and made a wish.\n\n" +
    "It was the best day ever.",
};

const HUNGRY_MAGPIE = {
  title: "The Hungry Magpie",
  text:
    "Maggie the magpie was hungry. She saw a worm in the grass.\n\n" +
    "She swooped down, but a cat was hiding behind the bush! Maggie flew up into the gum tree just in time.\n\n" +
    "The cat looked up and licked its lips. Maggie stayed in the tree until the cat went away.",
};

const FARM_POEM = {
  title: "At the Farm",
  text:
    "The cow says moo,\nThe sheep says baa,\nThe dog barks loud\nAt Grandpa's car.\n\n" +
    "The hen lays eggs\nUp in the shed,\nAnd when it's dark\nWe go to bed.",
};

const AVA_SPIDER = {
  title: "Ava and the Spider",
  text:
    "Ava saw a big, hairy spider on the wall. She screamed and ran to get Dad.\n\n" +
    "Dad caught the spider in a jar. “It won't hurt you,” he said. “It eats flies.”\n\n" +
    "Ava looked closely. The spider had eight long legs. Dad let it go in the garden. Ava waved. “Bye, spider!”",
};

/** EN1-UARL-01: stories and poems: characters, settings, events, rhyme and feelings. */
export const LITERATURE_2 = levels(1130216, {
  very_easy: [
    (n) =>
      read(
        MOON_POEM,
        choice(
          n,
          "Which word rhymes with 'bright'?",
          ["night", "moon", "round", "stars"],
          0,
          "Bright and night both end in -ight, so they rhyme.",
        ),
      ),
    (n) => read(MOON_POEM, trueFalse(n, "The poem is about the sun.", false, "The poem is about the moon and the stars at night.")),
    (n) =>
      read(
        MOON_POEM,
        typed("fill_blank", n, "The moon is round, the moon is ___.", "bright", "The poem says, 'The moon is round, the moon is bright.'"),
      ),
  ],
  easy: [
    (n) => read(TOM_BIRTHDAY, typed("short_answer", n, "How old was Tom?", ["6", "six"], "The story says, 'He was six!'")),
    (n) =>
      read(
        TOM_BIRTHDAY,
        choice(
          n,
          "Where did they play games?",
          ["in the backyard", "at the beach", "at school", "in the car"],
          0,
          "The story says, 'They played games in the backyard.'",
        ),
      ),
    (n) =>
      read(
        TOM_BIRTHDAY,
        choice(
          n,
          "How did Tom feel on his birthday?",
          ["happy", "sad", "scared", "angry"],
          0,
          "Tom said it was the best day ever, so he felt happy.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        HUNGRY_MAGPIE,
        choice(
          n,
          "Who is the main character?",
          ["Maggie the magpie", "the cat", "the worm", "the gum tree"],
          0,
          "The story is mostly about Maggie the magpie and what she does.",
        ),
      ),
    (n) =>
      read(
        HUNGRY_MAGPIE,
        ordering(
          n,
          "Put these in the order they happened.",
          ["Maggie saw a worm.", "Maggie swooped down.", "Maggie flew into the tree.", "The cat went away."],
          "First Maggie saw a worm and swooped down. Then she flew into the tree. Last, the cat went away.",
        ),
      ),
    (n) =>
      read(
        HUNGRY_MAGPIE,
        trueFalse(n, "The cat caught Maggie.", false, "Maggie flew up into the gum tree just in time, so the cat did not catch her."),
      ),
  ],
  hard: [
    (n) =>
      read(
        FARM_POEM,
        multi(
          n,
          "Which animals are in the poem? Choose all that are right.",
          ["cow", "sheep", "horse", "hen", "pig"],
          [0, 1, 3],
          "The poem has a cow, a sheep, a dog and a hen. There is no horse or pig.",
        ),
      ),
    (n) =>
      read(
        FARM_POEM,
        choice(
          n,
          "Where is the poem set?",
          ["on a farm", "at the beach", "in a city", "at school"],
          0,
          "The poem has cows, sheep, hens and a shed. It is set on a farm.",
        ),
      ),
    (n) =>
      read(
        FARM_POEM,
        typed("short_answer", n, "Which word in the poem rhymes with 'shed'?", "bed", "Shed and bed both end in -ed, so they rhyme."),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        AVA_SPIDER,
        choice(
          n,
          "How did Ava's feelings change?",
          ["scared at first, then not scared", "happy at first, then scared", "angry the whole time", "sad at first, then angry"],
          0,
          "At first Ava screamed and ran, so she was scared. At the end she waved goodbye, so she was not scared any more.",
        ),
      ),
    (n) =>
      read(
        AVA_SPIDER,
        trueFalse(n, "Dad hurt the spider.", false, "Dad caught it in a jar and let it go in the garden. He did not hurt it."),
      ),
    (n) =>
      read(
        AVA_SPIDER,
        multi(
          n,
          "Which words describe the spider? Choose all that are right.",
          ["big", "hairy", "tiny", "green"],
          [0, 1],
          "The story says it was a 'big, hairy spider'. It does not say tiny or green.",
        ),
      ),
  ],
});

/** EN1-CWT-01: writing sentences: capital letters, full stops, question marks, joining words and sentence order. */
export const SENTENCES = levels(1140101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence starts with a capital letter?",
        ["the dog ran.", "The dog ran.", "the Dog ran.", "tHe dog ran."],
        1,
        "A sentence starts with a capital letter. 'The' has a capital T.",
      ),
    (n) => trueFalse(n, "A telling sentence ends with a full stop.", true, "A sentence that tells us something ends with a full stop (.)."),
    (n) =>
      choice(
        n,
        "What goes at the end of this sentence? 'I like apples'",
        [".", "?", ","],
        0,
        "It tells us something. It is not a question, so it ends with a full stop.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which one is a question?",
        ["Where is my hat?", "My hat is red.", "I have a hat.", "The hat is big."],
        0,
        "A question asks something and ends with a question mark (?). 'Where is my hat?' asks something.",
      ),
    (n) => typed("fill_blank", n, "Use 'and' or 'but'. I have a cat ___ a dog.", "and", "I have both pets, so we join them with 'and'."),
    (n) =>
      multi(
        n,
        "Which words always need a capital letter? Choose all that are right.",
        ["sydney", "tom", "dog", "monday", "ball"],
        [0, 1, 3],
        "Names of places, people and days need a capital letter: Sydney, Tom, Monday.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["My", "dog", "likes", "bones."],
        "'My' has a capital letter, so it goes first. 'bones.' has the full stop, so it goes last: My dog likes bones.",
      ),
    (n) =>
      choice(
        n,
        "Which joining word fits? 'I wanted to play outside, ___ it was raining.'",
        ["and", "but", "so", "or"],
        1,
        "The second part tells us something that stopped the first. We use 'but' for that.",
      ),
    (n) =>
      trueFalse(
        n,
        "This sentence has its capital letter right: 'i went to the park.'",
        false,
        "The word 'I' is always a capital letter, and a sentence must start with a capital: I went to the park.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        ["we went to bondi beach.", "We went to Bondi Beach.", "We went to bondi beach", "we Went to Bondi beach."],
        1,
        "Start with a capital letter, give the place name capitals (Bondi Beach) and end with a full stop.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Join with 'but'. I am tall. My brother is short. I am tall ___ my brother is short.",
        "but",
        "Tall and short are different, so we join them with 'but'.",
      ),
    (n) =>
      multi(
        n,
        "Which of these need a question mark? Choose all that are right.",
        ["Do you like cake", "I like cake", "Where is Mum", "Who is that", "Mum is home"],
        [0, 2, 3],
        "'Do you like cake', 'Where is Mum' and 'Who is that' ask something, so they need a question mark.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put the words in order to make a question.",
        ["Can", "you", "see", "the", "bird?"],
        "'Can' has a capital letter, so it starts. 'bird?' has the question mark, so it ends: Can you see the bird?",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is fully correct?",
        ["is it time for lunch?", "Is it time for lunch.", "Is it time for lunch?", "is it time for lunch."],
        2,
        "It needs a capital letter at the start. It asks something, so it ends with a question mark.",
      ),
    (n) =>
      choice(
        n,
        "Which is the right way to write this? 'my friend sam likes footy'",
        ["My friend Sam likes footy.", "my friend Sam likes footy.", "My friend sam likes footy", "My Friend Sam Likes Footy."],
        0,
        "Start with a capital (My), give the name a capital (Sam) and end with a full stop.",
      ),
  ],
});

/** EN1-CWT-01: writing sentences: capital letters, full stops, question marks, joining words and sentence order. */
export const SENTENCES_2 = levels(1140116, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "Every sentence starts with a capital letter.",
        true,
        "Yes. The first word of a sentence always starts with a capital letter.",
      ),
    (n) =>
      choice(
        n,
        "Which one is a sentence?",
        ["The sun is hot.", "sun hot the", "is the hot", "hot sun the"],
        0,
        "'The sun is hot.' makes sense, starts with a capital and ends with a full stop.",
      ),
    (n) =>
      choice(
        n,
        "What goes at the end of this question? 'Are you hungry'",
        ["?", ".", ","],
        0,
        "It asks something, so it ends with a question mark.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word needs a capital letter? 'my dog is big.'",
        ["my", "dog", "is", "big"],
        0,
        "'my' is the first word of the sentence, so it needs a capital: My dog is big.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Use 'and' or 'but'. I am hungry ___ there is no food.",
        "but",
        "The second part is a problem for the first part, so we join them with 'but'.",
      ),
    (n) =>
      trueFalse(n, "'Where is the bus?' is a question.", true, "It asks something and ends with a question mark, so it is a question."),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which words always need a capital letter? Choose all that are right.",
        ["emma", "chair", "perth", "friday", "apple"],
        [0, 2, 3],
        "Names of people, places and days need capitals: Emma, Perth, Friday.",
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["We", "play", "at", "school."],
        "'We' has a capital letter, so it goes first. 'school.' has the full stop, so it goes last: We play at school.",
      ),
    (n) =>
      choice(
        n,
        "Which joining word fits? 'I like dogs ___ I like cats.'",
        ["and", "but", "is", "the"],
        0,
        "I like both, so we join them with 'and'.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        ["my nan lives in Dubbo.", "My nan lives in Dubbo.", "My nan lives in dubbo.", "my nan lives in dubbo"],
        1,
        "Start with a capital (My), give the town a capital (Dubbo) and end with a full stop.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Join with 'and'. Ben has a ball. Ben has a bat. Ben has a ball ___ a bat.",
        "and",
        "Ben has both things, so we join them with 'and'.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence has the full stop in the right place?",
        ["I see a. bird", "I see a bird.", ".I see a bird", "I see. a bird"],
        1,
        "The full stop goes at the very end of the sentence: I see a bird.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these sentences in order to tell about the morning.",
        ["I got out of bed.", "I ate my breakfast.", "I went to school."],
        "First you get out of bed. Then you eat breakfast. Last, you go to school.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are written correctly? Choose all that are right.",
        ["Lucy has a red bike.", "lucy has a red bike.", "Can I have a turn?", "can I have a turn.", "My cat is black"],
        [0, 2],
        "Correct sentences start with a capital and end with a full stop or question mark. The others miss one of these.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many sentences are here? 'I have a dog. His name is Rex. He is funny.'",
        ["3", "three"],
        "Count the full stops. Each sentence ends with one, and there are three.",
      ),
  ],
});
