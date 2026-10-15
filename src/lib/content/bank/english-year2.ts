/**
 * Year 2 English: two sets of 15 questions for each Stage 1 standard (NESA outcome), three at each
 * level from very easy to very hard. The second set of each standard (the `_2` export) asks different
 * questions. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN1-PHOKW-01: vowel digraphs and trigraphs, blending and segmenting sounds, and syllables. */
export const PHONICS = levels(2110101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word has the 'ai' sound, like in 'rain'?",
        ["tail", "tell", "tall", "till"],
        0,
        "Tail has 'ai' in the middle. It says the long a sound, just like rain.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Boat' and 'coat' both have the 'oa' sound.",
        true,
        "Both words have 'oa' in the middle. It says the long o sound: b-oa-t, c-oa-t.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Blend the sounds: s - ee - d. The word is ___.",
        "seed",
        "Say the sounds fast: s-ee-d. Together they make 'seed'.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which words have the 'ee' sound, like in 'tree'? Choose all that are right.",
        ["green", "bread", "leaf", "bed", "sheep"],
        [0, 2, 4],
        "Green, leaf and sheep all say ee. 'Bread' has 'ea' but it says a short e, like in 'bed'.",
      ),
    (n) =>
      choice(
        n,
        "Which letters make the long 'i' sound in 'night'?",
        ["igh", "ni", "gh", "ht"],
        0,
        "The three letters 'igh' work together to say the long i sound: n-igh-t.",
      ),
    (n) =>
      typed("short_answer", n, "How many syllables are in 'rabbit'?", ["2", "two"], "Clap it: rab-bit. That is 2 claps, so 2 syllables."),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put the sounds in order to make the word 'star'.",
        ["s", "t", "ar"],
        "Say it slowly: s-t-ar. The letters 'ar' work together to make one sound.",
      ),
    (n) =>
      choice(
        n,
        "Which word has the same 'ow' sound as 'cow'?",
        ["snow", "clown", "grow", "bowl"],
        1,
        "'Ow' can say two sounds. In 'cow' and 'clown' it says ow, like when you get hurt. In snow, grow and bowl it says a long o.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write 'ai' or 'ay' to finish the word: We go out to pl___ at lunch.",
        "ay",
        "We often use 'ay' at the end of a word (play, day, stay) and 'ai' in the middle (rain, tail).",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which words have the same vowel sound as 'bird'? Choose all that are right.",
        ["fern", "burn", "barn", "girl", "born"],
        [0, 1, 3],
        "'Er', 'ir' and 'ur' can all make the same sound: fern, bird, burn, girl. Barn has 'ar' and born has 'or'.",
      ),
    (n) =>
      choice(n, "How many syllables are in 'kangaroo'?", ["2", "3", "4", "1"], 1, "Clap it: kan-ga-roo. That is 3 claps, so 3 syllables."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Say the word 'sheep' slowly. How many sounds does it have?",
        ["3", "three"],
        "Sheep has 3 sounds: sh-ee-p. 'Sh' is one sound and 'ee' is one sound.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word does NOT have the long 'o' sound?",
        ["boat", "snow", "home", "shout"],
        3,
        "Boat, snow and home all say a long o. 'Shout' has 'ou', which says ow, like in 'out'.",
      ),
    (n) =>
      ordering(
        n,
        "Put the syllables in order to make the word 'umbrella'.",
        ["um", "brel", "la"],
        "Clap the word as you say it: um-brel-la. Put the parts in the order you hear them.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Head' and 'bead' have the same vowel sound.",
        false,
        "Both have 'ea', but it says different sounds. In 'head' it says a short e. In 'bead' it says ee.",
      ),
  ],
});

/** EN1-PHOKW-01: vowel digraphs and trigraphs, blending and segmenting sounds, and syllables. */
export const PHONICS_2 = levels(2110116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word has the 'oa' sound, like in 'road'?",
        ["goat", "got", "gate", "get"],
        0,
        "Goat has 'oa' in the middle. It says the long o sound, just like road.",
      ),
    (n) =>
      trueFalse(n, "'Light' and 'night' both have 'igh' in them.", true, "L-igh-t and n-igh-t both use 'igh' to make the long i sound."),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Blend the sounds: r - ai - n. The word is ___.",
        "rain",
        "Say the sounds fast: r-ai-n. Together they make 'rain'.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word has the 'ar' sound, like in 'car'?",
        ["farm", "form", "fern", "firm"],
        0,
        "Farm has 'ar' in the middle: f-ar-m. Form has 'or', fern has 'er' and firm has 'ir'.",
      ),
    (n) =>
      multi(
        n,
        "Which words have the long 'a' sound, like in 'day'? Choose all that are right.",
        ["snail", "sad", "tray", "cap", "paint"],
        [0, 2, 4],
        "Snail, tray and paint all say a long a. Sad and cap have a short a.",
      ),
    (n) =>
      typed("short_answer", n, "How many syllables are in 'sunset'?", ["2", "two"], "Clap it: sun-set. That is 2 claps, so 2 syllables."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which letters are missing? 'cl _ _ d' is a fluffy white thing in the sky.",
        ["ou", "ow", "oa", "oo"],
        0,
        "The word is 'cloud'. It uses 'ou' to make the ow sound: cl-ou-d.",
      ),
    (n) =>
      ordering(
        n,
        "Put the sounds in order to make the word 'spoon'.",
        ["s", "p", "oo", "n"],
        "Say it slowly: s-p-oo-n. The letters 'oo' work together to make one sound.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Her', 'fur' and 'sir' all have the same vowel sound.",
        true,
        "'Er', 'ur' and 'ir' can all make the same sound, so her, fur and sir sound alike at the end.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many syllables are in 'elephant'?",
        ["3", "three"],
        "Clap it: el-e-phant. That is 3 claps, so 3 syllables.",
      ),
    (n) =>
      multi(
        n,
        "Which words have the 'ow' sound, like in 'owl'? Choose all that are right.",
        ["house", "shout", "show", "town", "slow"],
        [0, 1, 3],
        "House and shout use 'ou', and town uses 'ow', to say ow. In show and slow, 'ow' says a long o.",
      ),
    (n) =>
      choice(
        n,
        "Which word has the same 'ea' sound as 'bread'?",
        ["head", "seat", "team", "beach"],
        0,
        "In 'bread' and 'head', 'ea' says a short e. In seat, team and beach it says ee.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Say the word 'string' slowly. How many sounds does it have?",
        ["5", "five"],
        "String has 5 sounds: s-t-r-i-ng. The letters 'ng' make just one sound.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Start with 'cart'. Change 'ar' to 'ur'. Then change 'c' to 'h'. What word do you make?",
        "hurt",
        "Cart becomes curt when ar changes to ur. Then c changes to h, and you get 'hurt'.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from fewest to most syllables.",
        ["frog", "rocket", "banana", "watermelon"],
        "Clap each word: frog (1), rock-et (2), ba-na-na (3), wa-ter-mel-on (4).",
      ),
  ],
});

/** EN1-SPELL-01: spelling patterns, plurals, -ing and -ed, compound words and tricky words. */
export const SPELLING = levels(2110201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["sed", "said", "siad", "sayd"],
        1,
        "'Said' is a tricky word: s-a-i-d. It does not sound the way it looks, so we learn it by heart.",
      ),
    (n) =>
      trueFalse(n, "The plural of 'dog' is 'dogs'.", true, "For most words, you just add -s to show more than one: one dog, two dogs."),
    (n) => typed("fill_blank", n, "jump + ed = ___", "jumped", "'Jump' ends in two consonants, so you just add -ed: jumped."),
  ],
  easy: [
    (n) => typed("short_answer", n, "Write the plural of 'bus'.", "buses", "Words that end in s, x, sh or ch add -es: one bus, two buses."),
    (n) =>
      choice(
        n,
        "Which two words make the compound word 'sunflower'?",
        ["sun + flower", "sunf + lower", "su + nflower", "sunfl + ower"],
        0,
        "A compound word is two whole words joined together: sun + flower = sunflower.",
      ),
    (n) => typed("fill_blank", n, "play + ing = ___", "playing", "Just add -ing to 'play'. Nothing else changes: playing."),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ing' to the word 'run'.",
        "running",
        "'Run' has a short vowel and ends in one consonant, so double the n before adding -ing: running.",
      ),
    (n) =>
      multi(
        n,
        "Which plurals are spelt correctly? Choose all that are right.",
        ["foxes", "dishs", "cups", "churchs", "wishes"],
        [0, 2, 4],
        "Words ending in x, sh or ch add -es: foxes, dishes, churches, wishes. 'Cup' just adds -s.",
      ),
    (n) =>
      choice(
        n,
        "Which tricky word is spelt correctly?",
        ["frend", "freind", "friend", "friennd"],
        2,
        "'Friend' is spelt f-r-i-e-n-d. A trick to remember it: a friend is there to the 'end'.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "stop + ed = ___",
        "stopped",
        "'Stop' has a short vowel and ends in one consonant, so double the p before adding -ed: stopped.",
      ),
    (n) =>
      ordering(
        n,
        "Put the word parts in order to make the word 'unhelpful'.",
        ["un", "help", "ful"],
        "The base word is 'help'. 'Un' goes at the front and 'ful' goes at the end: un-help-ful.",
      ),
    (n) =>
      choice(
        n,
        "Which word is NOT a compound word?",
        ["rainbow", "toothbrush", "garden", "playground"],
        2,
        "Rain + bow, tooth + brush and play + ground are two words joined. 'Garden' cannot be split into two words.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Add 'ing' to 'make'. Which spelling is right?",
        ["makeing", "making", "makking", "makng"],
        1,
        "When a word ends in a silent e, drop the e before adding -ing: make → making.",
      ),
    (n) =>
      multi(
        n,
        "Which words double the last letter when you add 'ing'? Choose all that are right.",
        ["sit", "jump", "swim", "read", "clap"],
        [0, 2, 4],
        "Sit, swim and clap have a short vowel and one last consonant, so they double: sitting, swimming, clapping. Jumping and reading do not.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Tom wrote: 'I hopped you liked it.' He meant the word 'hope'. Write the word he should have used.",
        "hoped",
        "'Hope' ends in e, so you just add d: hoped. 'Hopped' comes from 'hop', like a kangaroo.",
      ),
  ],
});

/** EN1-SPELL-01: spelling patterns, plurals, -ing and -ed, compound words and tricky words. */
export const SPELLING_2 = levels(2110216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["hav", "have", "haf", "haev"],
        1,
        "'Have' is a tricky word. It ends with a silent e: h-a-v-e.",
      ),
    (n) => trueFalse(n, "The plural of 'hat' is 'hates'.", false, "Just add -s to 'hat': one hat, two hats. 'Hates' is a different word."),
    (n) => typed("fill_blank", n, "look + ing = ___", "looking", "Just add -ing to 'look'. Nothing else changes: looking."),
  ],
  easy: [
    (n) => typed("short_answer", n, "Write the plural of 'dish'.", "dishes", "Words that end in sh add -es: one dish, two dishes."),
    (n) => typed("fill_blank", n, "rain + bow = ___", "rainbow", "Join the two words together to make a compound word: rainbow."),
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["peeple", "pepole", "people", "poeple"],
        2,
        "'People' is a tricky word: p-e-o-p-l-e. Say 'pe-o-ple' in your head to help you spell it.",
      ),
  ],
  medium: [
    (n) =>
      typed("fill_blank", n, "hop + ing = ___", "hopping", "'Hop' has a short vowel and ends in one consonant, so double the p: hopping."),
    (n) =>
      multi(
        n,
        "Which words are compound words? Choose all that are right.",
        ["bedroom", "window", "sandcastle", "basket", "lunchbox"],
        [0, 2, 4],
        "Bed + room, sand + castle and lunch + box are two words joined. Window and basket cannot be split into two words.",
      ),
    (n) =>
      choice(
        n,
        "What is the plural of 'beach'?",
        ["beachs", "beaches", "beachies", "beach"],
        1,
        "Words that end in ch add -es: one beach, two beaches.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ed' to the word 'clap'.",
        "clapped",
        "'Clap' has a short vowel and ends in one consonant, so double the p before adding -ed: clapped.",
      ),
    (n) =>
      trueFalse(
        n,
        "When you add 'ing' to 'ride', you write 'riding'.",
        true,
        "'Ride' ends in a silent e. Drop the e, then add -ing: riding.",
      ),
    (n) =>
      ordering(
        n,
        "Put the word parts in order to make the word 'grasshopper'.",
        ["grass", "hop", "per"],
        "Say it slowly: grass-hop-per. Grass comes first, then hop, then per.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence is spelt correctly?",
        [
          "We were swiming and jumpping.",
          "We were swimming and jumping.",
          "We were swimming and jumpping.",
          "We were swiming and jumping.",
        ],
        1,
        "Swim has a short vowel and one last consonant, so double the m: swimming. Jump already ends in two consonants, so just add -ing: jumping.",
      ),
    (n) =>
      multi(
        n,
        "Which plurals are spelt correctly? Choose all that are right.",
        ["boxes", "glasses", "foxs", "kisses", "dresss"],
        [0, 1, 3],
        "Words ending in x or s add -es: boxes, glasses, kisses, foxes, dresses. 'Foxs' and 'dresss' are wrong.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word can go after both 'sun' and 'star' to make two compound words? Hint: it shines.",
        "light",
        "Sun + light = sunlight, and star + light = starlight. Both are compound words.",
      ),
  ],
});

/** EN1-VOCAB-01: word meanings, synonyms and antonyms, words from context and topic words. */
export const VOCAB = levels(2120101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'small'?",
        ["little", "huge", "tall", "fast"],
        0,
        "'Little' and 'small' are synonyms: they mean the same thing.",
      ),
    (n) =>
      choice(
        n,
        "What is the opposite of 'up'?",
        ["over", "down", "in", "top"],
        1,
        "An antonym is a word with the opposite meaning. The opposite of up is down.",
      ),
    (n) =>
      trueFalse(n, "'Fast' and 'quick' mean almost the same thing.", true, "'Fast' and 'quick' are synonyms. Both mean moving with speed."),
  ],
  easy: [
    (n) =>
      typed("fill_blank", n, "The opposite of 'wet' is ___.", "dry", "If something is not wet, it is dry. 'Wet' and 'dry' are antonyms."),
    (n) =>
      multi(
        n,
        "Which words are fruits? Choose all that are right.",
        ["apple", "carrot", "banana", "mango", "potato"],
        [0, 2, 3],
        "Apples, bananas and mangoes are fruits. Carrots and potatoes are vegetables.",
      ),
    (n) =>
      choice(
        n,
        "'Lily was so hungry that she gobbled her lunch.' What does 'gobbled' mean?",
        ["ate quickly", "threw away", "shared", "dropped"],
        0,
        "Lily was very hungry, so she ate fast. 'Gobbled' means ate quickly.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from quietest to loudest.",
        ["whisper", "talk", "shout"],
        "A whisper is very soft. Talking is in the middle. A shout is the loudest.",
      ),
    (n) =>
      choice(
        n,
        "What do we call a baby kangaroo?",
        ["cub", "joey", "kitten", "calf"],
        1,
        "A baby kangaroo is a joey. A cub is a baby bear or lion, and a calf is a baby cow.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word is the opposite of 'empty': 'full' or 'clean'?",
        "full",
        "An empty cup has nothing in it. A full cup has no room left. So the opposite is 'full'.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "'The path was so narrow that only one person could walk on it.' What does 'narrow' mean?",
        ["not wide", "very long", "muddy", "steep"],
        0,
        "Only one person could fit on the path, so it was not wide. 'Narrow' means not wide.",
      ),
    (n) =>
      multi(
        n,
        "Which words describe the weather? Choose all that are right.",
        ["sunny", "stormy", "hungry", "windy", "sleepy"],
        [0, 1, 3],
        "Sunny, stormy and windy tell us about the weather. Hungry and sleepy tell us how a person feels.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Begin' and 'finish' mean the same thing.",
        false,
        "'Begin' means start and 'finish' means end. They are opposites, not synonyms.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The soup was scorching, so Dad blew on it before he ate.' What does 'scorching' mean?",
        ["very hot", "very cold", "very salty", "very yummy"],
        0,
        "Dad blew on the soup to cool it down, so it must have been very hot.",
      ),
    (n) =>
      choice(
        n,
        "The word 'bat' has more than one meaning. Which sentence uses 'bat' to mean an animal?",
        [
          "The bat flew out of the cave at night.",
          "Jack hit the ball with his bat.",
          "It is my turn to bat.",
          "She dropped the cricket bat.",
        ],
        0,
        "Only an animal can fly out of a cave at night. In the other sentences, 'bat' is to do with cricket.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from slowest to fastest.",
        ["crawl", "walk", "jog", "sprint"],
        "Crawling is the slowest. Walking is faster, jogging is faster again, and sprinting is running as fast as you can.",
      ),
  ],
});

/** EN1-VOCAB-01: word meanings, synonyms and antonyms, words from context and topic words. */
export const VOCAB_2 = levels(2120116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'happy'?",
        ["glad", "sad", "cross", "tired"],
        0,
        "'Glad' and 'happy' are synonyms. Both mean feeling good.",
      ),
    (n) =>
      choice(
        n,
        "What is the opposite of 'open'?",
        ["shut", "wide", "door", "big"],
        0,
        "If a door is not open, it is shut. 'Open' and 'shut' are antonyms.",
      ),
    (n) => trueFalse(n, "'Big' is the opposite of 'large'.", false, "'Big' and 'large' mean the same thing. The opposite of big is small."),
  ],
  easy: [
    (n) =>
      typed("fill_blank", n, "The opposite of 'night' is ___.", "day", "Night is dark and day is light. 'Night' and 'day' are antonyms."),
    (n) =>
      choice(
        n,
        "What do we call a home for bees?",
        ["nest", "hive", "burrow", "den"],
        1,
        "Bees live in a hive. Birds live in a nest and wombats live in a burrow.",
      ),
    (n) =>
      multi(
        n,
        "Which animals live in the sea? Choose all that are right.",
        ["shark", "whale", "koala", "octopus", "emu"],
        [0, 1, 3],
        "Sharks, whales and octopuses live in the sea. Koalas live in trees and emus live on land.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "'The cat crept up to the bird without making a sound.' What does 'crept' mean?",
        ["moved slowly and quietly", "ran very fast", "jumped high", "sang loudly"],
        0,
        "The cat made no sound, so it must have moved slowly and quietly. That is what 'crept' means.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word means the same as 'shout': 'yell' or 'whisper'?",
        "yell",
        "To shout and to yell both mean to say something very loudly. A whisper is very soft.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from smallest to biggest.",
        ["pebble", "rock", "boulder"],
        "A pebble is a tiny stone. A rock is bigger. A boulder is a huge rock.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which words mean 'very good'? Choose all that are right.",
        ["great", "terrible", "excellent", "awful", "wonderful"],
        [0, 2, 4],
        "Great, excellent and wonderful all mean very good. Terrible and awful mean very bad.",
      ),
    (n) =>
      choice(
        n,
        "'The puppy was soaked after it ran through the sprinkler.' What does 'soaked' mean?",
        ["very wet", "very dirty", "very hot", "very fast"],
        0,
        "A sprinkler sprays water, so the puppy got very wet. 'Soaked' means very wet.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Brave' and 'afraid' are opposites.",
        true,
        "A brave person is not scared. An afraid person is scared. So they are opposites.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses 'light' to mean 'not heavy'?",
        ["My school bag is light today.", "Turn on the light.", "The sun gives us light.", "Please light the candle."],
        0,
        "A light bag is easy to carry because it is not heavy. In the other sentences, 'light' is about seeing or fire.",
      ),
    (n) =>
      choice(
        n,
        "'The kitten was timid. It hid under the bed when visitors came.' What does 'timid' mean?",
        ["shy and easily scared", "very sleepy", "naughty", "hungry"],
        0,
        "The kitten hid from visitors, so it was shy and easily scared. That is what 'timid' means.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from a little bit wet to very wet.",
        ["damp", "wet", "soaking"],
        "Damp means a little wet. Wet is in the middle. Soaking means very, very wet.",
      ),
  ],
});

const PET_DAY = {
  title: "Pet Day",
  text:
    "On Friday it was Pet Day at Lily's school. Lily put her rabbit, Snowy, in a basket and walked to school with Mum.\n\n" +
    "The classroom was full of pets. Jack brought a goldfish in a bowl. Ava brought a green frog. Snowy sat on Lily's lap and ate a carrot.\n\n" +
    "At the end of the day, the teacher gave every pet a sticker. Snowy's sticker said 'Softest Pet'. Lily was very proud.",
};

const KOALAS = {
  title: "Koalas",
  text:
    "Koalas live in gum trees in the east of Australia. They eat gum leaves, and they hardly ever drink water. The leaves give them most of the water they need.\n\n" +
    "Koalas sleep for up to 20 hours a day. They wake up at night to eat.\n\n" +
    "A baby koala is called a joey. It lives in its mother's pouch for about six months. Then it rides on her back.",
};

const GRANDMA_LETTER = {
  title: "A Letter from Grandma",
  text:
    "Dear Max,\n\n" +
    "Thank you for your drawing of the beach. I put it on my fridge so I can see it every day.\n\n" +
    "The farm is very busy. Our cow had a calf last week. The calf is brown with a white spot on her nose. I have not given her a name yet. Can you think of a good one?\n\n" +
    "I will come to visit you in the school holidays.\n\n" +
    "Love,\nGrandma",
};

const STORM = {
  title: "The Storm",
  text:
    "Dark clouds rolled over the hill. Zara and her little brother Ollie were playing cricket in the backyard.\n\n" +
    "“Quick, bring in the washing!” called Mum. Zara grabbed the towels off the line. Ollie picked up the bat and ball.\n\n" +
    "Just as they ran inside, big drops began to fall. Thunder boomed. Ollie hid under a blanket on the couch. Zara sat beside him and read him a story until the storm was over.",
};

const BEAN = {
  title: "How to Grow a Bean",
  text:
    "You will need: a clear jar, cotton wool, a bean seed and water.\n\n" +
    "1. Fill the jar with cotton wool.\n" +
    "2. Push the bean seed between the cotton wool and the side of the jar, so you can see it.\n" +
    "3. Add a little water to make the cotton wool damp, not soaking.\n" +
    "4. Put the jar in a sunny spot.\n\n" +
    "In about a week, a root will grow down and a shoot will grow up.",
};

/** EN1-RECOM-01: understanding stories, information texts and letters. */
export const READING = levels(2130101, {
  very_easy: [
    (n) =>
      read(
        PET_DAY,
        choice(
          n,
          "What kind of pet is Snowy?",
          ["a rabbit", "a goldfish", "a frog", "a dog"],
          0,
          "The story says, 'Lily put her rabbit, Snowy, in a basket.'",
        ),
      ),
    (n) => read(PET_DAY, trueFalse(n, "Jack brought a goldfish to school.", true, "The story says, 'Jack brought a goldfish in a bowl.'")),
    (n) =>
      read(
        PET_DAY,
        typed(
          "short_answer",
          n,
          "What did Snowy eat?",
          ["carrot", "a carrot"],
          "The story says, 'Snowy sat on Lily's lap and ate a carrot.'",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        KOALAS,
        choice(n, "What do koalas eat?", ["gum leaves", "grass", "insects", "fish"], 0, "The text says, 'They eat gum leaves.'"),
      ),
    (n) =>
      read(KOALAS, typed("fill_blank", n, "A baby koala is called a ___.", "joey", "The last part says, 'A baby koala is called a joey.'")),
    (n) =>
      read(
        KOALAS,
        trueFalse(
          n,
          "Koalas drink lots of water every day.",
          false,
          "The text says koalas 'hardly ever drink water' because the leaves give them the water they need.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        GRANDMA_LETTER,
        choice(
          n,
          "Who wrote this letter?",
          ["Grandma", "Max", "Mum", "the farmer next door"],
          0,
          "A letter is signed at the end by the person who wrote it. This one ends with 'Love, Grandma'.",
        ),
      ),
    (n) =>
      read(
        GRANDMA_LETTER,
        choice(
          n,
          "Why did Grandma write to Max?",
          ["to say thank you and share her news", "to ask him for money", "to tell him she is sick", "to sell him a cow"],
          0,
          "Grandma thanks Max for his drawing, then tells him about the new calf.",
        ),
      ),
    (n) =>
      read(
        GRANDMA_LETTER,
        multi(
          n,
          "Which things are true about the calf? Choose all that are right.",
          ["It is brown.", "It has a white spot on its nose.", "It is called Daisy.", "It was born last week."],
          [0, 1, 3],
          "Grandma says the calf came last week and is brown with a white spot. It does not have a name yet.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        STORM,
        choice(
          n,
          "Why did Mum ask them to bring in the washing?",
          ["Rain was coming.", "The washing was dirty.", "It was bedtime.", "The dog took it."],
          0,
          "Dark clouds were rolling in. Mum could tell rain was coming, so she wanted the washing kept dry.",
        ),
      ),
    (n) =>
      read(
        STORM,
        choice(
          n,
          "How do you think Ollie felt about the thunder?",
          ["scared", "bored", "hungry", "proud"],
          0,
          "Ollie hid under a blanket when the thunder boomed. That is a clue he felt scared.",
        ),
      ),
    (n) =>
      read(
        STORM,
        ordering(
          n,
          "Put these events in the order they happened.",
          ["Dark clouds rolled over the hill.", "Zara grabbed the towels.", "Big drops began to fall.", "Zara read Ollie a story."],
          "First the clouds came, then Zara got the towels, then the rain started, and last Zara read to Ollie.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        BEAN,
        choice(
          n,
          "Why should you push the seed against the side of the jar?",
          ["so you can see it grow", "so it stays warm", "so it gets more water", "so it does not fall out"],
          0,
          "Step 2 says to put it by the side of the jar 'so you can see it'. The jar is clear, so you can watch it grow.",
        ),
      ),
    (n) =>
      read(
        BEAN,
        typed(
          "short_answer",
          n,
          "Which part of the bean grows down?",
          ["root", "the root", "a root"],
          "The last line says, 'a root will grow down and a shoot will grow up.'",
        ),
      ),
    (n) =>
      read(
        BEAN,
        trueFalse(
          n,
          "You should fill the jar right up with water.",
          false,
          "Step 3 says to add only a little water, so the cotton wool is damp, not soaking.",
        ),
      ),
  ],
});

const BEACH = {
  title: "At the Beach",
  text:
    "Noah and his dad went to Bondi Beach on Sunday. The sun was hot, so Noah wore his hat and lots of sunscreen.\n\n" +
    "They built a big sandcastle with four towers. Noah put a shell on top of each tower. Then a wave came and washed the sandcastle away.\n\n" +
    "“Let's build another one,” said Dad. Noah grinned and picked up his bucket.",
};

const PENGUINS = {
  title: "Little Penguins",
  text:
    "Little penguins are the smallest penguins in the world. They are only about 30 centimetres tall. They live along the south coast of Australia.\n\n" +
    "Little penguins have blue and white feathers. They swim in the sea all day and catch small fish to eat.\n\n" +
    "When the sun goes down, they waddle up the beach to their burrows. People come to watch them walk home.",
};

const PARTY = {
  title: "Party Invitation",
  text:
    "Dear Jack,\n\n" +
    "Please come to my birthday party! I am turning eight.\n\n" +
    "When: Saturday 3 May at 2 pm\nWhere: 12 Wattle Street, Dubbo\n\n" +
    "We will have a jumping castle and a sausage sizzle. Please bring your swimmers, because we will play under the sprinkler too.\n\n" +
    "Please tell my mum if you can come by Monday.\n\n" +
    "From your friend,\nIsla",
};

const LOST_DOG = {
  title: "Lost Dog",
  text:
    "Mr Lee's dog, Rusty, was missing. Mr Lee looked under the house and in the shed, but Rusty was not there.\n\n" +
    "Maya and her friend Ben made posters. They wrote 'LOST DOG' in big letters and stuck the posters on poles along the street.\n\n" +
    "That night the phone rang. A lady had seen a brown dog asleep on her front step. Mr Lee drove straight over. Rusty wagged his tail and licked Mr Lee's face.",
};

const BUSH_WALK = {
  title: "Bush Walk Day",
  text:
    "On Thursday, Year 2 will go on a bush walk in the national park. We will walk for about two hours and look for birds and lizards.\n\n" +
    "Please bring:\n- a hat\n- a water bottle\n- a packed lunch\n- strong shoes\n\n" +
    "Please do not bring toys or money. If it is very hot, the walk will be moved to the next week.",
};

/** EN1-RECOM-01: understanding stories, information texts and letters. */
export const READING_2 = levels(2130116, {
  very_easy: [
    (n) =>
      read(
        BEACH,
        choice(
          n,
          "Where did Noah and his dad go?",
          ["Bondi Beach", "the zoo", "the park", "school"],
          0,
          "The first sentence says they went to Bondi Beach on Sunday.",
        ),
      ),
    (n) =>
      read(
        BEACH,
        typed(
          "fill_blank",
          n,
          "The sandcastle had ___ towers.",
          ["4", "four"],
          "The story says, 'They built a big sandcastle with four towers.'",
        ),
      ),
    (n) =>
      read(
        BEACH,
        trueFalse(
          n,
          "Noah was upset and went home after the wave.",
          false,
          "Dad said, 'Let's build another one,' and Noah grinned. He was happy to keep building.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        PENGUINS,
        choice(
          n,
          "What colour are little penguins?",
          ["blue and white", "black and orange", "grey", "brown"],
          0,
          "The text says, 'Little penguins have blue and white feathers.'",
        ),
      ),
    (n) =>
      read(
        PENGUINS,
        typed("short_answer", n, "What do little penguins eat?", ["fish", "small fish"], "The text says they 'catch small fish to eat'."),
      ),
    (n) =>
      read(
        PENGUINS,
        choice(
          n,
          "When do the penguins walk to their burrows?",
          ["when the sun goes down", "in the morning", "at lunchtime", "when it rains"],
          0,
          "The text says, 'When the sun goes down, they waddle up the beach to their burrows.'",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        PARTY,
        choice(
          n,
          "Whose birthday party is it?",
          ["Isla's", "Jack's", "Mum's", "Dad's"],
          0,
          "The invitation is signed 'From your friend, Isla', and she says, 'Please come to my birthday party!'",
        ),
      ),
    (n) =>
      read(
        PARTY,
        multi(
          n,
          "Which things will be at the party? Choose all that are right.",
          ["a jumping castle", "a sausage sizzle", "a sprinkler", "a magician", "a pony"],
          [0, 1, 2],
          "Isla says there will be a jumping castle and a sausage sizzle, and they will play under the sprinkler.",
        ),
      ),
    (n) => read(PARTY, typed("short_answer", n, "How old will Isla be?", ["8", "eight"], "Isla says, 'I am turning eight.'")),
  ],
  hard: [
    (n) =>
      read(
        LOST_DOG,
        choice(
          n,
          "Why did Maya and Ben make posters?",
          ["to help find Rusty", "to sell Rusty", "for a school project", "to find a lost cat"],
          0,
          "Rusty was missing. The posters said 'LOST DOG' so people would look out for him.",
        ),
      ),
    (n) =>
      read(
        LOST_DOG,
        choice(
          n,
          "How do you think Mr Lee felt at the end?",
          ["happy", "angry", "bored", "scared"],
          0,
          "Mr Lee got his dog back, and Rusty wagged his tail and licked him. Mr Lee would feel happy.",
        ),
      ),
    (n) =>
      read(
        LOST_DOG,
        ordering(
          n,
          "Put these events in the order they happened.",
          ["Mr Lee looked in the shed.", "Maya and Ben made posters.", "The phone rang.", "Rusty licked Mr Lee's face."],
          "First Mr Lee searched, then the children made posters, then a lady rang, and last Mr Lee found Rusty.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        BUSH_WALK,
        multi(
          n,
          "Which things should children bring? Choose all that are right.",
          ["a hat", "a water bottle", "toys", "strong shoes", "money"],
          [0, 1, 3],
          "The list says to bring a hat, a water bottle, a packed lunch and strong shoes. It says not to bring toys or money.",
        ),
      ),
    (n) =>
      read(
        BUSH_WALK,
        choice(
          n,
          "What will happen if it is very hot?",
          ["The walk will be moved to the next week.", "They will go swimming.", "They will walk faster.", "They will stay all day."],
          0,
          "The last sentence says, 'If it is very hot, the walk will be moved to the next week.'",
        ),
      ),
    (n) =>
      read(
        BUSH_WALK,
        choice(
          n,
          "Why do you think children need strong shoes?",
          ["Bush paths can be rough and rocky.", "Shoes make you look smart.", "It will snow.", "They will play netball."],
          0,
          "The notice does not say why. But a bush walk is two hours on bumpy paths, so strong shoes keep feet safe.",
        ),
      ),
  ],
});

const MY_CAT = {
  title: "My Cat",
  text:
    "My cat is fat,\nShe sleeps on the mat.\nShe dreams of a mouse\nThat runs round the house.\n\n" +
    "She wakes with a yawn\nAnd strolls on the lawn.\nShe sits in the sun\nUntil the day's done.\n\n" +
    "At night by the door,\nShe purrs on the floor.\nShe licks her paw,\nThen naps some more.",
};

const BIG_RACE = {
  title: "The Big Race",
  text:
    "Tia the turtle and Kip the kangaroo had a race around the lake.\n\n" +
    "Kip bounced off fast. “I am the best!” he shouted. He was so far ahead that he stopped to take a nap under a gum tree.\n\n" +
    "Tia kept walking, slow and steady. She did not stop once. When Kip woke up, Tia was already at the finish line. Everyone cheered for Tia.",
};

const RAIN_ROOF = {
  title: "Rain on the Roof",
  text:
    "Pitter, patter, on the roof,\nRain is falling, here's the proof.\nDrip and drop and splish and splash,\nThunder rumbles, CRASH, CRASH, CRASH!\nLittle drops on window glass\nRun in races as they pass.\n\n" +
    "Puddles growing in the street,\nPerfect for my gumboot feet.\nWhen the clouds have gone away,\nOut I'll run to jump and play.",
};

const GRANDPA_BOAT = {
  title: "Grandpa's Boat",
  text:
    "Every summer, Ari went fishing with Grandpa in his little red boat. This summer, Grandpa had a sore leg and could not go.\n\n" +
    "Ari sat on the jetty and kicked at the water. The boat bobbed up and down, empty.\n\n" +
    "Then Ari had an idea. He fetched two fishing rods and a bucket. He helped Grandpa walk to the end of the jetty, and they fished side by side. They caught three fish, and Grandpa laughed all afternoon.",
};

const WIND = {
  title: "The Wind",
  text:
    "The wind is a giant who huffs and who puffs,\nHe pulls at my hat and he tugs at my cuffs.\nHe rattles the windows, he bangs on the door,\nHe sweeps all the leaves from the porch to the floor.\n\n" +
    "But when the night comes and the moon rises high,\nHe sings a soft song as he whispers goodbye.",
};

/** EN1-UARL-01: stories and poems: characters, settings, plot, language choices, rhyme and rhythm. */
export const LITERATURE = levels(2130201, {
  very_easy: [
    (n) =>
      read(
        MY_CAT,
        choice(
          n,
          "Which word rhymes with 'mat'?",
          ["fat", "sun", "mouse", "door"],
          0,
          "'Mat' and 'fat' both end with the same sound: -at.",
        ),
      ),
    (n) =>
      read(
        MY_CAT,
        trueFalse(n, "The cat in the poem likes to sleep.", true, "The poem says she sleeps on the mat and dreams, so she likes to sleep."),
      ),
    (n) =>
      read(
        MY_CAT,
        typed("fill_blank", n, "In the poem, 'mouse' rhymes with ___.", "house", "'Mouse' and 'house' both end with the sound -ouse."),
      ),
  ],
  easy: [
    (n) =>
      read(
        BIG_RACE,
        choice(
          n,
          "Where did the race happen?",
          ["around the lake", "at school", "in the city", "on a boat"],
          0,
          "The first sentence says they 'had a race around the lake'. That is the setting.",
        ),
      ),
    (n) =>
      read(
        BIG_RACE,
        multi(
          n,
          "Which words describe Kip? Choose all that are right.",
          ["fast", "a show-off", "slow", "shy"],
          [0, 1],
          "Kip bounced off fast and shouted 'I am the best!', so he was fast and a show-off.",
        ),
      ),
    (n) =>
      read(
        BIG_RACE,
        choice(
          n,
          "Who won the race?",
          ["Tia", "Kip", "nobody", "a koala"],
          0,
          "Tia was already at the finish line when Kip woke up, so Tia won.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        RAIN_ROOF,
        multi(
          n,
          "Which words sound like rain? Choose all that are right.",
          ["pitter", "patter", "splash", "street", "roof"],
          [0, 1, 2],
          "Pitter, patter and splash copy the sound of rain. Words that sound like their noise make a poem fun to hear.",
        ),
      ),
    (n) =>
      read(
        RAIN_ROOF,
        choice(
          n,
          "Why is 'CRASH' written in capital letters?",
          ["to show it is very loud", "because it is a name", "because it starts a sentence", "to show it is quiet"],
          0,
          "The poet used capital letters so we read 'CRASH' loudly, like thunder.",
        ),
      ),
    (n) =>
      read(
        RAIN_ROOF,
        typed(
          "short_answer",
          n,
          "Which word in the poem rhymes with 'street'?",
          "feet",
          "'Street' and 'feet' both end with the sound -eet.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        GRANDPA_BOAT,
        choice(
          n,
          "What is the problem in the story?",
          ["Grandpa could not go out in the boat.", "The boat sank.", "Ari lost his fishing rod.", "It rained all summer."],
          0,
          "Grandpa had a sore leg, so they could not go fishing in the boat like every summer.",
        ),
      ),
    (n) =>
      read(
        GRANDPA_BOAT,
        choice(
          n,
          "How did Ari feel when he kicked at the water?",
          ["sad and let down", "excited", "scared", "sleepy"],
          0,
          "Ari could not go fishing as usual. Kicking at the water shows he felt sad and let down.",
        ),
      ),
    (n) =>
      read(
        GRANDPA_BOAT,
        ordering(
          n,
          "Put these events in the order they happened.",
          ["Grandpa had a sore leg.", "Ari sat on the jetty.", "Ari fetched the fishing rods.", "They caught three fish."],
          "The story starts with the problem, then Ari feels sad, then he has an idea, and it ends with them catching fish.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        WIND,
        choice(
          n,
          "The poet says the wind is a giant. What does this tell us?",
          ["The wind is strong and loud.", "A real giant lives outside.", "The wind is tiny.", "The wind is hot."],
          0,
          "The wind is not really a giant. The poet compares it to a giant to show it is big, strong and noisy.",
        ),
      ),
    (n) =>
      read(
        WIND,
        choice(
          n,
          "How does the wind change at the end of the poem?",
          ["It becomes soft and quiet.", "It becomes stronger.", "It turns into rain.", "It turns into a bird."],
          0,
          "At night the wind 'sings a soft song' and 'whispers'. These are quiet words, so the wind has calmed down.",
        ),
      ),
    (n) =>
      read(
        WIND,
        multi(
          n,
          "Which pairs of words rhyme in the poem? Choose all that are right.",
          ["puffs / cuffs", "door / floor", "high / goodbye", "wind / giant", "hat / windows"],
          [0, 1, 2],
          "Puffs and cuffs, door and floor, and high and goodbye end with the same sounds. Each pair ends two lines.",
        ),
      ),
  ],
});

const FARM = {
  title: "Down on the Farm",
  text:
    "Down on the farm when the sun comes up,\nThe rooster crows and so does the pup.\nThe cows say moo, the sheep say baa,\nThe ducks all quack, “Ha-ha, ha-ha!”\n\n" +
    "The farmer drives his big red truck,\nHe waves to the pig and he waves to the duck.\nWhen night comes down and the stars are bright,\nThe animals whisper, “Sleep tight, goodnight.”",
};

const TOOTH = {
  title: "Molly's Tooth",
  text:
    "Molly had a wobbly tooth. She wiggled it at breakfast. She wiggled it at lunch.\n\n" +
    "At dinner, Molly bit into a crunchy apple. Out popped the tooth! Molly gasped, then smiled a big gappy smile.\n\n" +
    "That night, she put the tooth under her pillow. In the morning, there was a shiny gold coin and a tiny note. It said, “Thank you for your tooth! From the Tooth Fairy.”",
};

const BILBY = {
  title: "The Shy Bilby",
  text:
    "Bo the bilby was very shy. When the other animals played games, Bo hid in his burrow and watched.\n\n" +
    "One night, Possum lost her way in the dark. She was crying near Bo's burrow. Bo knew every path in the bush, because he went out every night to find food.\n\n" +
    "Bo crept out. “Follow me,” he said softly. He led Possum all the way home. After that, Possum asked Bo to play every night.",
};

const KOOKABURRA = {
  title: "Kookaburra Morning",
  text:
    "Before the sun has climbed the hill,\nWhen all the bush is calm and still,\nA kookaburra on a log\nLaughs loudly through the morning fog.\n\n" +
    "“Koo-koo-koo! Kaa-kaa-kaa!”\nHe wakes the wallabies near and far.\nThe sleepy wombat rolls in bed\nAnd pulls a gum leaf on his head.\n\nThe sun peeps out, the sky turns blue,\nAnd all the bush is laughing too.",
};

const NEW_BIKE = {
  title: "The New Bike",
  text:
    "Sienna wanted a new bike more than anything. Her old bike was too small, and the bell did not ring.\n\n" +
    "She saved her pocket money for weeks. Every Saturday, she put two dollars in her money box.\n\n" +
    "One day her little brother Leo dropped his ice cream and cried. Sienna took two dollars out of her box and bought him a new one.\n\n" +
    "“Now I have to wait longer,” she thought. But when Leo hugged her, she did not mind at all.",
};

/** EN1-UARL-01: stories and poems: characters, settings, plot, language choices, rhyme and rhythm. */
export const LITERATURE_2 = levels(2130216, {
  very_easy: [
    (n) =>
      read(
        FARM,
        choice(
          n,
          "Where is this poem set?",
          ["on a farm", "at the beach", "in a city", "in space"],
          0,
          "The poem is about cows, sheep, ducks and a farmer, and the first line says 'Down on the farm'.",
        ),
      ),
    (n) => read(FARM, typed("fill_blank", n, "In the poem, 'up' rhymes with ___.", "pup", "'Up' and 'pup' both end with the sound -up.")),
    (n) => read(FARM, trueFalse(n, "The farmer drives a big red truck.", true, "The poem says, 'The farmer drives his big red truck.'")),
  ],
  easy: [
    (n) =>
      read(
        TOOTH,
        choice(
          n,
          "Who is the main character in the story?",
          ["Molly", "the Tooth Fairy", "Molly's mum", "the apple"],
          0,
          "The story is all about Molly and her wobbly tooth, so Molly is the main character.",
        ),
      ),
    (n) =>
      read(
        TOOTH,
        ordering(
          n,
          "Put these events in the order they happened.",
          [
            "Molly wiggled her tooth at breakfast.",
            "Molly bit into an apple.",
            "Molly put the tooth under her pillow.",
            "Molly found a gold coin.",
          ],
          "Breakfast comes first, then dinner when the tooth came out, then bedtime, then the morning.",
        ),
      ),
    (n) =>
      read(
        TOOTH,
        typed(
          "short_answer",
          n,
          "What did Molly bite into when her tooth came out?",
          ["apple", "an apple", "a crunchy apple", "crunchy apple"],
          "The story says, 'At dinner, Molly bit into a crunchy apple. Out popped the tooth!'",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        BILBY,
        multi(
          n,
          "Which words describe Bo? Choose all that are right.",
          ["shy", "kind", "helpful", "mean", "noisy"],
          [0, 1, 2],
          "Bo hid when others played, so he was shy. He helped Possum get home, so he was kind and helpful.",
        ),
      ),
    (n) =>
      read(
        BILBY,
        choice(
          n,
          "Why did Bo know the way in the dark?",
          ["He went out every night to find food.", "He had a torch.", "Possum told him.", "He had a map."],
          0,
          "The story says Bo knew every path 'because he went out every night to find food'.",
        ),
      ),
    (n) =>
      read(
        BILBY,
        trueFalse(
          n,
          "At the end of the story, Bo and Possum become friends.",
          true,
          "After Bo helped her, Possum asked him to play every night. That shows they became friends.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        KOOKABURRA,
        choice(
          n,
          "Which word in the poem tells us the bush is quiet?",
          ["still", "laughs", "loudly", "wakes"],
          0,
          "'Calm and still' means quiet with nothing moving. Laughs, loudly and wakes are about noise.",
        ),
      ),
    (n) =>
      read(
        KOOKABURRA,
        typed("short_answer", n, "Which word in the poem rhymes with 'log'?", "fog", "'Log' and 'fog' both end with the sound -og."),
      ),
    (n) =>
      read(
        KOOKABURRA,
        choice(
          n,
          "Why did the poet write 'Koo-koo-koo! Kaa-kaa-kaa!'?",
          ["to show the sound the kookaburra makes", "to name the wombat", "to tell us it is night", "to count the birds"],
          0,
          "These words copy the kookaburra's laugh, so we can hear it as we read.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        NEW_BIKE,
        choice(
          n,
          "What is the big message of this story?",
          [
            "Being kind can matter more than getting things.",
            "Ice cream is the best food.",
            "Bikes cost too much.",
            "Little brothers are naughty.",
          ],
          0,
          "Sienna gave up some of her bike money to help Leo, and she was glad she did. Being kind mattered more to her.",
        ),
      ),
    (n) =>
      read(
        NEW_BIKE,
        choice(
          n,
          "'She did not mind at all.' What does this tell us about Sienna?",
          ["She was happy she helped Leo.", "She was cross with Leo.", "She forgot about the bike.", "She did not like ice cream."],
          0,
          "Leo's hug made Sienna feel good. Waiting longer for her bike did not upset her.",
        ),
      ),
    (n) =>
      read(
        NEW_BIKE,
        trueFalse(
          n,
          "At the end, Sienna was sorry she helped Leo.",
          false,
          "When Leo hugged her, 'she did not mind at all'. She was not sorry. She was glad she helped.",
        ),
      ),
  ],
});

/** EN1-CWT-01: sentences: punctuation, joining words, nouns, verbs and adjectives, past tense and word order. */
export const SENTENCES = levels(2140101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which mark goes at the end of a question?",
        ["?", ".", "!", ","],
        0,
        "A question ends with a question mark (?). For example: 'Where is my hat?'",
      ),
    (n) =>
      trueFalse(
        n,
        "A sentence starts with a capital letter.",
        true,
        "Every sentence starts with a capital letter, like the T in 'The sun is hot.'",
      ),
    (n) =>
      choice(
        n,
        "'The dog runs.' Which word is the verb (the doing word)?",
        ["The", "dog", "runs"],
        2,
        "A verb tells us what someone or something does. The dog runs, so 'runs' is the verb.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write 'and' or 'but': I like apples ___ I like pears.",
        "and",
        "Use 'and' to add one more idea that goes the same way: I like apples and I like pears.",
      ),
    (n) =>
      multi(
        n,
        "Which words are nouns (naming words)? Choose all that are right.",
        ["cat", "jump", "tree", "happy", "school"],
        [0, 2, 4],
        "A noun names a person, place or thing. Cat, tree and school are nouns. Jump is a verb and happy is an adjective.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        ["my dog is brown.", "My dog is brown.", "My dog is brown", "my Dog is brown"],
        1,
        "A sentence needs a capital letter at the start and a full stop at the end: 'My dog is brown.'",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Today I walk to school. Yesterday I ___ to school.",
        "walked",
        "'Yesterday' means the past. Add -ed to 'walk' to make it past tense: walked.",
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["The", "bird", "sang", "a", "song."],
        "'The' has a capital letter, so it goes first. 'Song.' has the full stop, so it goes last: The bird sang a song.",
      ),
    (n) =>
      choice(
        n,
        "'The red kite flew high.' Which word is an adjective (a describing word)?",
        ["red", "kite", "flew", "The"],
        0,
        "An adjective describes a noun. 'Red' tells us what the kite looks like.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write 'because' or 'so': I wore my hat ___ it was sunny.",
        "because",
        "'Because' gives the reason. Why did I wear my hat? Because it was sunny.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is in the past tense?",
        ["We play cricket.", "We played cricket.", "We will play cricket.", "We are playing cricket."],
        1,
        "'Played' ends in -ed and tells us it already happened, so it is past tense.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences need a question mark? Choose all that are right.",
        ["Where is my bag", "I like pizza", "Can you swim", "What time is it", "The sun is hot"],
        [0, 2, 3],
        "Questions ask something. 'Where is my bag?', 'Can you swim?' and 'What time is it?' are questions. The others tell us something.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "What is the best way to join these sentences? 'It was raining. We stayed inside.'",
        [
          "It was raining so we stayed inside.",
          "It was raining but we stayed inside.",
          "It was raining because we stayed inside.",
          "It was raining or we stayed inside.",
        ],
        0,
        "The rain made us stay inside. 'So' tells us what happened because of the rain.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Today I go to the beach. Yesterday I ___ to the beach.",
        "went",
        "'Go' is a tricky verb. We do not say 'goed'. The past tense of go is 'went'.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence has the right capital letters and punctuation?",
        [
          "on monday, sam went to sydney.",
          "On Monday, Sam went to Sydney.",
          "On monday, Sam went to sydney.",
          "on Monday sam went to Sydney",
        ],
        1,
        "The first word, days of the week, names of people and names of places all need capital letters. The sentence ends with a full stop.",
      ),
  ],
});

/** EN1-CWT-01: sentences: punctuation, joining words, nouns, verbs and adjectives, past tense and word order. */
export const SENTENCES_2 = levels(2140116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which mark goes at the end of a telling sentence?",
        [".", "?", ",", "'"],
        0,
        "A telling sentence ends with a full stop (.). For example: 'I have a cat.'",
      ),
    (n) =>
      trueFalse(
        n,
        "'Ella' needs a capital letter because it is a name.",
        true,
        "Names of people always start with a capital letter, wherever they are in a sentence.",
      ),
    (n) =>
      choice(
        n,
        "Which word is a noun (a naming word)?",
        ["ball", "run", "soft", "quickly"],
        0,
        "A noun names a person, place or thing. A ball is a thing, so 'ball' is a noun.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write 'and' or 'but': I wanted to swim ___ the pool was closed.",
        "but",
        "'But' joins two ideas that do not go the same way. I wanted to swim, but I could not.",
      ),
    (n) =>
      multi(
        n,
        "Which words are verbs (doing words)? Choose all that are right.",
        ["jump", "swim", "chair", "eat", "green"],
        [0, 1, 3],
        "Jump, swim and eat are things you can do. A chair is a thing and green is a colour.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence ends with the right mark?",
        ["What is your name?", "What is your name.", "What is your name,", "What is your name!"],
        0,
        "This sentence asks something, so it is a question. Questions end with a question mark.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Today I jump on the trampoline. Yesterday I ___ on the trampoline.",
        "jumped",
        "'Yesterday' means the past. Add -ed to 'jump' to make it past tense: jumped.",
      ),
    (n) =>
      choice(
        n,
        "'A fluffy dog slept.' Which word is an adjective (a describing word)?",
        ["fluffy", "dog", "slept", "A"],
        0,
        "An adjective describes a noun. 'Fluffy' tells us what the dog is like.",
      ),
    (n) =>
      ordering(
        n,
        "Put the words in order to make a sentence.",
        ["We", "ate", "lunch", "under", "the", "tree."],
        "'We' has a capital letter, so it goes first. 'Tree.' has the full stop, so it goes last: We ate lunch under the tree.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write 'so' or 'because': I was thirsty ___ I drank some water.",
        "so",
        "Being thirsty made me drink. 'So' tells us what happened next because of it.",
      ),
    (n) =>
      multi(
        n,
        "'last friday mia went to perth.' Which words need a capital letter? Choose all that are right.",
        ["last", "friday", "mia", "went", "perth"],
        [0, 1, 2, 4],
        "'Last' starts the sentence. Friday is a day, Mia is a name and Perth is a place, so they all need capitals.",
      ),
    (n) =>
      trueFalse(
        n,
        "This sentence is correct: 'We swimmed at the beach.'",
        false,
        "'Swim' is a tricky verb. We do not say 'swimmed'. The right sentence is 'We swam at the beach.'",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "What is the best way to join these sentences? 'Noah was sad. His kite broke.'",
        [
          "Noah was sad because his kite broke.",
          "Noah was sad so his kite broke.",
          "Noah was sad but his kite broke.",
          "Noah was sad and so his kite.",
        ],
        0,
        "The broken kite is the reason Noah was sad. 'Because' joins a feeling to its reason.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Tonight we see the moon. Last night we ___ the moon.",
        "saw",
        "'See' is a tricky verb. We do not say 'seed'. The past tense of see is 'saw'.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is correct?",
        ["The dogs barks loudly.", "The dog bark loudly.", "The dogs bark loudly.", "The dog barking loudly."],
        2,
        "When there is more than one dog, we say 'the dogs bark'. One dog barks, but many dogs bark.",
      ),
  ],
});
