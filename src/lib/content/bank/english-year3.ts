/**
 * Year 3 English: 15 questions for each Stage 2 standard (NESA outcome), three at each
 * level from very easy to very hard. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN2-SPELL-01: spelling generalisations: correct spellings, plurals, prefixes, suffixes and homophones. */
export const SPELLING = levels(3110101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["becaus", "because", "becuz", "becoz"],
        1,
        "'Because' is a tricky word to remember: b-e-c-a-u-s-e. It has 'cause' at the end.",
      ),
    (n) => trueFalse(n, "The plural of 'cat' is 'cats'.", true, "For most words, you just add -s to show more than one: one cat, two cats."),
    (n) => typed("fill_blank", n, "jump + ing = ___", "jumping", "'Jump' ends in two consonants, so you just add -ing: jumping."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'box'.",
        "boxes",
        "Words that end in x, s, sh or ch add -es to make the plural: one box, two boxes.",
      ),
    (n) =>
      choice(
        n,
        "Which word correctly finishes the sentence? 'I can ___ the birds singing.'",
        ["here", "hear", "hair", "heer"],
        1,
        "'Hear' is what you do with your ear. Notice 'ear' is inside 'hear'. 'Here' means a place.",
      ),
    (n) =>
      ordering(
        n,
        "Put these syllables in order to spell 'butterfly'.",
        ["but", "ter", "fly"],
        "Clap the word as you say it: but-ter-fly. Breaking a long word into syllables helps you spell it.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ing' to the word 'hop'.",
        "hopping",
        "'Hop' has a short vowel and ends in one consonant, so you double the p before adding -ing: hopping.",
      ),
    (n) =>
      choice(
        n,
        "What is the plural of 'baby'?",
        ["babys", "babies", "babyes", "babeys"],
        1,
        "When a word ends in a consonant then y, change the y to i and add -es: baby becomes babies.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 'un' means 'not'. un + happy = ___",
        "unhappy",
        "A prefix goes at the front of a word and the base word does not change: un + happy = unhappy.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses 'they're', 'their' and 'there' correctly?",
        [
          "They're going to leave their bags over there.",
          "There going to leave they're bags over their.",
          "Their going to leave there bags over they're.",
          "They're going to leave there bags over their.",
        ],
        0,
        "'They're' means 'they are'. 'Their' means belonging to them. 'There' is a place (it has 'here' inside it).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ed' to the word 'carry'.",
        "carried",
        "'Carry' ends in a consonant then y, so change the y to i before adding -ed: carried.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'leaf' is 'leafs'.",
        false,
        "Many words ending in f change the f to v and add -es: one leaf, two leaves.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word means 'full of care' and is spelt correctly?",
        ["carefull", "careful", "carfull", "carful"],
        1,
        "The suffix -ful has only one l. Keep the whole base word 'care' and add -ful: careful.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "happy + ly = ___",
        "happily",
        "'Happy' ends in a consonant then y, so change the y to i before adding -ly: happily.",
      ),
    (n) =>
      multi(
        n,
        "Each word has a suffix added. Which ones are spelt correctly? Choose all that are right.",
        ["hoping", "hopeing", "running", "runing", "smiled"],
        [0, 2, 4],
        "Drop the silent e before -ing or -ed (hope → hoping, smile → smiled). Double the last letter after a short vowel (run → running).",
      ),
  ],
});

/** EN2-VOCAB-01: synonyms, antonyms, meaning from context, word families and shades of meaning. */
export const VOCAB = levels(3120101, {
  very_easy: [
    (n) =>
      choice(n, "Which word means the same as 'big'?", ["tiny", "large", "short", "slow"], 1, "'Large' and 'big' are synonyms: they mean the same thing."),
    (n) =>
      choice(n, "What is the opposite of 'hot'?", ["warm", "cold", "sunny", "wet"], 1, "An antonym is a word with the opposite meaning. The opposite of hot is cold."),
    (n) => trueFalse(n, "'Happy' and 'glad' mean almost the same thing.", true, "'Happy' and 'glad' are synonyms. Both describe feeling good."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "The opposite of 'early' is ___.", "late", "If you are not early, you are late. 'Early' and 'late' are antonyms."),
    (n) =>
      choice(
        n,
        "'The kookaburra perched on a branch high in the gum tree.' What does 'perched' mean?",
        ["sat or rested", "flew away", "sang loudly", "fell down"],
        0,
        "The bird is on a branch, so it must be sitting there. 'Perched' means sat or rested on something.",
      ),
    (n) =>
      multi(
        n,
        "Which words belong to the same word family as 'play'? Choose all that are right.",
        ["player", "playful", "plate", "replay", "plan"],
        [0, 1, 3],
        "Player, playful and replay all have the base word 'play'. 'Plate' and 'plan' only start with the same letters.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from smallest to biggest.",
        ["tiny", "small", "large", "enormous"],
        "Tiny is smaller than small. Large is big, and enormous is very, very big.",
      ),
    (n) =>
      choice(
        n,
        "'The puppy was exhausted after the long walk and fell asleep on the mat.' What does 'exhausted' mean?",
        ["very tired", "very hungry", "excited", "lost"],
        0,
        "After a long walk the puppy fell asleep, so 'exhausted' must mean very tired.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word is the opposite of 'ancient': 'old' or 'modern'?",
        "modern",
        "'Ancient' means very old, so its opposite is 'modern', which means new or from today.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word describes someone who is never afraid?",
        ["fearless", "fearful", "careless", "helpless"],
        0,
        "The suffix -less means 'without'. Fearless means without fear. Fearful means full of fear.",
      ),
    (n) =>
      multi(
        n,
        "Which words could you use instead of 'said'? Choose all that are right.",
        ["whispered", "shouted", "walked", "replied", "jumped"],
        [0, 1, 3],
        "Whispered, shouted and replied are all ways of saying something. Walked and jumped are ways of moving.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Furious' is a stronger word than 'cross'.",
        true,
        "Both words mean angry, but 'cross' is a little angry and 'furious' is very angry.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "In science, what do we call an animal that eats only plants?",
        ["carnivore", "herbivore", "omnivore", "predator"],
        1,
        "A herbivore eats plants (think of 'herbs'). A carnivore eats meat and an omnivore eats both.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from coldest to hottest.",
        ["freezing", "cool", "warm", "boiling"],
        "Freezing is colder than cool. Warm is a bit hot, and boiling is the hottest.",
      ),
    (n) =>
      choice(
        n,
        "'Mia was reluctant to jump into the cold pool, so she dipped one toe in first.' What does 'reluctant' mean?",
        ["not keen", "very happy", "in a hurry", "too tall"],
        0,
        "Mia only dipped one toe in, so she did not really want to jump. 'Reluctant' means not keen.",
      ),
  ],
});

const LOST_HAT = {
  title: "The Lost Hat",
  text:
    "Sam had a red hat. He wore it to the beach every day.\n\n" +
    "One windy morning, a big gust blew the hat off his head. It rolled across the sand and into the water. Sam ran after it, but the waves carried it away.\n\n" +
    "That afternoon, Sam's dog, Biscuit, trotted up the beach. In his mouth was a soggy red hat. Sam laughed and gave Biscuit a big hug.",
};

const ECHIDNAS = {
  title: "Echidnas",
  text:
    "Echidnas are small Australian animals covered in sharp spines. They have a long, thin snout and a sticky tongue.\n\n" +
    "Echidnas eat ants and termites. They use their strong claws to dig into ant nests, then catch the insects with their tongue. Echidnas do not have teeth.\n\n" +
    "An echidna is a mammal that lays eggs. A baby echidna is called a puggle. It lives in a pouch on its mother's belly until its spines start to grow.",
};

const CAKE_SALE = {
  title: "The Cake Sale",
  text:
    "Ava and her dad got up at six o'clock on Saturday. They baked three trays of lamingtons for the school cake sale.\n\n" +
    "When they arrived at the school hall, people were already waiting in a long line. By ten o'clock, every lamington was gone.\n\n" +
    "“We should have made more,” said Ava, counting the money in the tin. Dad smiled. “Next year we'll bake six trays.”\n\n" +
    "The money they raised would help buy new books for the library.",
};

const GRANDPA_GARDEN = {
  title: "Grandpa's Garden",
  text:
    "Every afternoon, Grandpa wheeled his chair to the window and looked out at the vegetable garden. The tomato plants were drooping, and weeds poked up between the carrots.\n\n" +
    "On Saturday, Leo arrived with gloves, a trowel and a watering can. He pulled out the weeds and gave every plant a long drink. Grandpa watched from the window, pointing and calling out tips.\n\n" +
    "When Leo came inside, muddy and sweaty, Grandpa's eyes were shining. “It looks just like it used to,” he said softly.",
};

const CARNIVAL = {
  title: "Swimming Carnival",
  text:
    "Kurrajong Public School Swimming Carnival\n\n" +
    "When: Friday 14 February, 9 am to 2 pm\nWhere: Penrith Pool\n\n" +
    "All students should wear their house colour and bring a hat, sunscreen, a towel and a packed lunch. Students who are not swimming in a race will cheer from the stands.\n\n" +
    "The bus leaves school at 8:30 am. Students who miss the bus must be dropped at the pool by a parent.\n\n" +
    "If it rains, the carnival will be held on the following Friday.",
};

/** EN2-RECOM-01: literal and inferential comprehension of stories, information texts and notices. */
export const READING = levels(3130101, {
  very_easy: [
    (n) =>
      read(
        LOST_HAT,
        choice(n, "What colour was Sam's hat?", ["blue", "red", "green", "yellow"], 1, "The first sentence says, 'Sam had a red hat.'"),
      ),
    (n) =>
      read(
        LOST_HAT,
        trueFalse(n, "Sam's hat blew away on a windy morning.", true, "The text says, 'One windy morning, a big gust blew the hat off his head.'"),
      ),
    (n) =>
      read(
        LOST_HAT,
        typed("short_answer", n, "What was the name of Sam's dog?", "Biscuit", "The text says, 'Sam's dog, Biscuit, trotted up the beach.'"),
      ),
  ],
  easy: [
    (n) =>
      read(
        ECHIDNAS,
        choice(
          n,
          "What do echidnas eat?",
          ["leaves and grass", "ants and termites", "fish", "berries"],
          1,
          "The second paragraph says, 'Echidnas eat ants and termites.'",
        ),
      ),
    (n) =>
      read(
        ECHIDNAS,
        typed("fill_blank", n, "A baby echidna is called a ___.", "puggle", "The last paragraph says, 'A baby echidna is called a puggle.'"),
      ),
    (n) =>
      read(
        ECHIDNAS,
        multi(
          n,
          "Which of these facts are in the text? Choose all that are right.",
          ["Echidnas lay eggs.", "Echidnas have sharp spines.", "Echidnas have big teeth.", "Echidnas live in trees.", "Echidnas have a sticky tongue."],
          [0, 1, 4],
          "The text says echidnas lay eggs, have sharp spines and a sticky tongue. It says they do NOT have teeth, and it never says they live in trees.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        CAKE_SALE,
        ordering(
          n,
          "Put these events in the order they happened.",
          ["Ava and Dad got up at six o'clock.", "They baked lamingtons.", "They arrived at the school hall.", "Every lamington was sold.", "Ava counted the money in the tin."],
          "Follow the story from start to end: getting up, baking, arriving, selling out, then counting the money.",
        ),
      ),
    (n) =>
      read(
        CAKE_SALE,
        choice(
          n,
          "Why did Ava say, “We should have made more”?",
          ["The lamingtons sold out quickly.", "The lamingtons were burnt.", "Nobody came to the sale.", "Dad ate them all."],
          0,
          "Every lamington was gone by ten o'clock and people were still keen to buy, so Ava wished they had more to sell.",
        ),
      ),
    (n) =>
      read(
        CAKE_SALE,
        typed(
          "short_answer",
          n,
          "How many trays of lamingtons did Ava and Dad bake this year?",
          ["3", "three"],
          "The text says they baked three trays. Six trays is what Dad plans for next year.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        GRANDPA_GARDEN,
        choice(
          n,
          "Why do you think Grandpa could not look after the garden himself?",
          ["He uses a wheelchair and finds gardening hard.", "He did not like vegetables.", "He was away on holiday.", "He had lost his gloves."],
          0,
          "The text says Grandpa 'wheeled his chair', which is a clue that he uses a wheelchair, so gardening would be hard for him.",
        ),
      ),
    (n) =>
      read(
        GRANDPA_GARDEN,
        choice(
          n,
          "How did Grandpa feel at the end of the story?",
          ["happy and thankful", "angry", "bored", "scared"],
          0,
          "His 'eyes were shining' and he said the garden looked like it used to. These clues show he was happy and thankful.",
        ),
      ),
    (n) =>
      read(
        GRANDPA_GARDEN,
        trueFalse(
          n,
          "The garden was neat and well cared for before Leo came.",
          false,
          "Before Leo came, the tomato plants were drooping and weeds were growing, so the garden was not well cared for.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        CARNIVAL,
        choice(
          n,
          "What is the main purpose of this text?",
          ["to give families information about the carnival", "to tell a story about a swimmer", "to explain how to swim", "to sell towels"],
          0,
          "The notice tells readers when and where the carnival is, what to bring and how to get there. It gives information.",
        ),
      ),
    (n) =>
      read(
        CARNIVAL,
        typed(
          "short_answer",
          n,
          "It rains on Friday 14 February. On what date will the carnival be held instead?",
          ["21 February", "Friday 21 February", "21st February", "February 21", "21 Feb", "21"],
          "If it rains, the carnival moves to the next Friday. One week after 14 February is 14 + 7 = 21 February.",
        ),
      ),
    (n) =>
      read(
        CARNIVAL,
        multi(
          n,
          "Jack is not swimming in any races. Which things should he still bring? Choose all that are right.",
          ["a hat", "a packed lunch", "a towel", "a skateboard", "a pet"],
          [0, 1, 2],
          "The notice says ALL students bring a hat, sunscreen, a towel and lunch. Jack will still be there cheering from the stands.",
        ),
      ),
  ],
});

const RAIN_POEM = {
  title: "Rainy Day",
  text:
    "Pitter, patter, on the roof,\nRain is falling, here's the proof:\nPuddles growing on the street,\nSplashing under muddy feet.\n\n" +
    "Ducks go waddling, quack, quack, quack,\nWater dripping down their back.\nGrey clouds rumble, thunder rolls,\nFrogs are singing in their holes.\n\n" +
    "When the sun comes out to play,\nRainbows chase the clouds away.",
};

const NEW_GIRL = {
  title: "The New Girl",
  text:
    "On the first day of Term 2, a new girl stood by the classroom door. Her name was Priya. She held her bag tightly and stared at her shoes.\n\n" +
    "At lunch, Priya sat alone under the big fig tree. Mei walked over with her lunchbox. “Do you want to play handball with us?” she asked.\n\n" +
    "Priya looked up and smiled for the first time all day. “Yes, please!” she said.",
};

const OLD_SHED = {
  title: "The Old Shed",
  text:
    "The old shed at the bottom of the paddock leaned to one side like a tired horse. Its tin roof was rusty and full of holes. Spider webs hung in every corner, and the floor creaked with each step.\n\n" +
    "Inside, it smelled of dust and engine oil. A cracked window let in a thin stripe of sunlight. Somewhere in the shadows, something scratched and scurried.",
};

const OLD_GUM = {
  title: "The Old Gum Tree",
  text:
    "I am the oldest gum tree in the park. For a hundred years, I have watched children climb my branches and collect my fallen gumnuts.\n\n" +
    "Today, a man came with a measuring tape and a clipboard. He tied a bright orange ribbon around my trunk. The children's faces looked worried.\n\n" +
    "I do not know what the ribbon means. But I hope I will still be here to give shade next summer.",
};

const WOMBAT_POSSUM = {
  title: "Wombat and Possum",
  text:
    "Wombat dug his burrow deep,\nA cosy place to rest and sleep.\nPossum laughed, “Why work so hard?\nI'll sleep up high in Gran's backyard!”\n\n" +
    "Then came a storm one winter night,\nThe wind blew hard with all its might.\nPossum's branch began to sway,\nIt cracked and crashed and blew away!\n\n" +
    "Wet and cold, he knocked below.\nWombat smiled and said hello.\n“There's room for two,” he said. “Come in!”\nAnd Possum crept in with a grin.",
};

/** EN2-UARL-01: character, setting, feelings, rhyme and rhythm, and point of view in literature. */
export const LITERATURE = levels(3130201, {
  very_easy: [
    (n) =>
      read(
        RAIN_POEM,
        choice(n, "Which word rhymes with 'street' in the poem?", ["feet", "roof", "rain", "play"], 0, "'Street' and 'feet' both end with the same sound: -eet."),
      ),
    (n) =>
      read(
        RAIN_POEM,
        trueFalse(n, "This poem is about a hot, sunny day at the beach.", false, "The poem talks about rain, puddles, clouds and thunder, so it is about a rainy day."),
      ),
    (n) =>
      read(
        RAIN_POEM,
        typed("short_answer", n, "Which word in the last two lines rhymes with 'play'?", "away", "'Play' and 'away' both end with the sound -ay."),
      ),
  ],
  easy: [
    (n) =>
      read(
        NEW_GIRL,
        choice(
          n,
          "How did Priya feel at the start of the story?",
          ["nervous", "angry", "excited", "sleepy"],
          0,
          "Priya held her bag tightly and stared at her shoes. These are clues that she felt nervous.",
        ),
      ),
    (n) =>
      read(
        NEW_GIRL,
        choice(n, "Where does the story take place?", ["at school", "at the beach", "at home", "at the shops"], 0, "The story happens at the classroom door and under a tree at lunch, so it is at school."),
      ),
    (n) =>
      read(
        NEW_GIRL,
        multi(
          n,
          "Which words describe Mei? Choose all that are right.",
          ["kind", "friendly", "mean", "lazy"],
          [0, 1],
          "Mei walked over to someone sitting alone and asked her to play. That is kind and friendly.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        OLD_SHED,
        choice(
          n,
          "What kind of feeling (mood) does the writer create?",
          ["spooky and mysterious", "happy and silly", "calm and sleepy", "angry"],
          0,
          "Spider webs, shadows, creaking and something scurrying make the shed feel spooky and mysterious.",
        ),
      ),
    (n) =>
      read(
        OLD_SHED,
        choice(
          n,
          "The shed 'leaned to one side like a tired horse'. What two things is the writer comparing?",
          ["the shed and a tired horse", "the paddock and a horse", "the roof and a spider", "the window and the sunlight"],
          0,
          "The word 'like' shows a comparison. The leaning shed is compared to a tired horse drooping to one side.",
        ),
      ),
    (n) =>
      read(
        OLD_SHED,
        multi(
          n,
          "Which senses does the writer use to describe the shed? Choose all that are right.",
          ["sight", "smell", "hearing", "taste"],
          [0, 1, 2],
          "Sight: rusty roof and sunlight. Smell: dust and engine oil. Hearing: creaking and scratching. Nothing is tasted.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        OLD_GUM,
        choice(n, "Who is telling this story?", ["a gum tree", "a child", "the man with the clipboard", "a bird"], 0, "The narrator says, 'I am the oldest gum tree in the park.'"),
      ),
    (n) =>
      read(
        OLD_GUM,
        trueFalse(
          n,
          "This story is told in the first person, using words like 'I' and 'my'.",
          true,
          "The tree tells its own story with 'I', 'my' and 'me'. That is called first person.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "Why might the children look worried?",
          ["They think the tree might be cut down.", "They lost their ball.", "It was going to rain.", "They were late for school."],
          0,
          "A man measured the tree and tied a ribbon on it. The children may think this means the tree will be cut down.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        WOMBAT_POSSUM,
        choice(
          n,
          "What lesson does this poem teach?",
          [
            "Planning ahead pays off, and it is good to be kind.",
            "Possums are faster than wombats.",
            "Storms only happen in summer.",
            "Never go outside at night.",
          ],
          0,
          "Wombat's hard work kept him safe in the storm, and he was kind to Possum even after Possum laughed at him.",
        ),
      ),
    (n) =>
      read(
        WOMBAT_POSSUM,
        ordering(
          n,
          "Put these events from the poem in order.",
          ["Wombat dug a deep burrow.", "Possum laughed at Wombat.", "A storm blew Possum's branch away.", "Wombat invited Possum in."],
          "Each stanza tells one part: Wombat digs and Possum laughs, then the storm, then Wombat helps Possum.",
        ),
      ),
    (n) =>
      read(
        WOMBAT_POSSUM,
        choice(
          n,
          "How did Possum's feelings about Wombat change?",
          [
            "At first he laughed at Wombat, but by the end he was grateful.",
            "At first he was grateful, but by the end he was angry.",
            "He was scared of Wombat the whole time.",
            "His feelings did not change at all.",
          ],
          0,
          "In stanza one Possum laughs at Wombat's hard work. At the end he crept in 'with a grin', glad of Wombat's help.",
        ),
      ),
  ],
});

/** EN2-CWT-01: imaginative texts: story structure, dialogue punctuation, describing words, noun groups, verbs and capitals. */
export const STORIES = levels(3150101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is a verb (a doing word)? 'The dog ran across the park.'",
        ["dog", "ran", "park", "the"],
        1,
        "A verb tells what someone or something does. The dog 'ran', so 'ran' is the verb.",
      ),
    (n) => trueFalse(n, "A sentence should start with a capital letter.", true, "Every sentence begins with a capital letter and ends with a full stop, question mark or exclamation mark."),
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        ["my cat is called Tiger.", "My cat is called Tiger.", "My cat is called tiger", "my Cat is called tiger."],
        1,
        "The sentence starts with a capital, the name 'Tiger' has a capital, and it ends with a full stop.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'huge' or 'quietly' to fill the gap: The ___ elephant stomped through the jungle.",
        "huge",
        "We need a describing word for the elephant. 'Huge' describes the elephant. 'Quietly' doesn't fit before a noun.",
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of a story in the right order.",
        ["orientation", "complication", "resolution"],
        "First the orientation introduces who, where and when. Then the complication is the problem. The resolution solves it.",
      ),
    (n) =>
      multi(
        n,
        "Which words always need a capital letter? Choose all that are right.",
        ["Sydney", "Monday", "dog", "Ellie", "table"],
        [0, 1, 3],
        "Names of places, days and people need capitals: Sydney, Monday, Ellie. 'Dog' and 'table' are common nouns.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which sentence has the speech marks in the right place?",
        ["“Let's go to the beach,” said Tom.", "“Let's go to the beach, said Tom.”", "Let's go to the beach, “said Tom.”", "“Let's go” to the beach, said Tom."],
        0,
        "Speech marks go around only the words that are spoken: “Let's go to the beach,”. 'said Tom' is outside them.",
      ),
    (n) =>
      choice(
        n,
        "What usually happens in the orientation of a story?",
        ["The characters and setting are introduced.", "The problem is solved.", "The problem happens.", "The story ends."],
        0,
        "The orientation is the beginning. It tells us who is in the story, where it happens and when.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which verb better shows that someone was very tired: 'trudged' or 'skipped'?",
        "trudged",
        "'Trudged' means walked slowly and heavily, like a tired person. 'Skipped' sounds happy and full of energy.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which noun group best helps the reader picture a scary forest?",
        ["a dark, tangled forest", "a forest", "a nice forest", "forest dark"],
        0,
        "'Dark' and 'tangled' are describing words that make the forest sound scary. 'Nice' doesn't fit a scary story.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are punctuated correctly? Choose all that are right.",
        ["“Watch out!” yelled Jess.", "“Can I come too?” asked Ben.", "“I'm hungry” said Ali.", "“it's raining,” said Mum."],
        [0, 1],
        "Spoken words start with a capital and end with a punctuation mark inside the speech marks. Ali's needs a comma, and Mum's needs a capital I.",
      ),
    (n) =>
      trueFalse(
        n,
        "The complication is the part of the story where the problem is solved.",
        false,
        "The complication is where the problem happens. The problem is solved in the resolution.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Orientation: Kai and his sister are camping in the bush. Complication: In the night they hear a growl, and their torch goes out. Which is the best resolution?",
        [
          "They find a spare battery and see it was only a possum, so they laugh and go back to sleep.",
          "Kai likes camping.",
          "The next day was Tuesday.",
          "They hear a growl.",
        ],
        0,
        "A resolution solves the problem from the complication. Finding light and discovering the noise was a possum fixes both problems.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a short story.",
        [
          "Lily planted a tiny seed in a pot.",
          "Every day she watered it and put it in the sun.",
          "One morning, a green shoot poked out of the soil.",
          "By summer, a bright sunflower stood taller than Lily.",
        ],
        "Look for time clues: planting comes first, then 'Every day', then 'One morning', and 'By summer' is last.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the past tense of 'find': Yesterday, Zara ___ a strange note under her door.",
        "found",
        "'Yesterday' tells us it happened in the past. 'Find' is a tricky verb: its past tense is 'found', not 'finded'.",
      ),
  ],
});

/** EN2-CWT-02: informative texts: facts, headings, procedures, reports, conjunctions and commas in lists. */
export const INFORMATIVE = levels(3150201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which of these is a fact?",
        ["Koalas live in Australia.", "Koalas are the cutest animals.", "Everyone loves koalas.", "Koalas are boring."],
        0,
        "A fact can be checked and proven true. The others are opinions: what someone thinks or feels.",
      ),
    (n) => trueFalse(n, "A heading tells the reader what a part of the text is about.", true, "Headings help readers find information quickly by telling them the topic of each part."),
    (n) =>
      choice(
        n,
        "Which kind of text tells you how to make something?",
        ["a procedure, like a recipe", "a poem", "a fairy tale", "a joke"],
        0,
        "A procedure gives steps in order so you can make or do something, like a recipe for pancakes.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put the steps for brushing your teeth in order.",
        ["Wet your toothbrush.", "Put toothpaste on the brush.", "Brush all your teeth for two minutes.", "Rinse your mouth."],
        "In a procedure the steps must be in order. You need toothpaste on the brush before you can brush, and you rinse at the end.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses commas in a list correctly?",
        [
          "I packed a hat, a towel, sunscreen and a drink.",
          "I packed, a hat a towel sunscreen, and a drink.",
          "I packed a hat a towel sunscreen and a drink.",
          "I, packed a hat, a towel sunscreen and a drink.",
        ],
        0,
        "Put a comma between each thing in a list, and use 'and' before the last thing (no comma needed before 'and').",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'because' or 'but': Frogs need water ___ their skin must stay wet.",
        "because",
        "The second part gives the reason frogs need water, so 'because' is the right joining word.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is the best heading for this paragraph? 'Platypuses eat worms, shrimp and insect larvae. They find their food at the bottom of rivers using their bill.'",
        ["What Platypuses Eat", "Platypus Babies", "Where Platypuses Sleep", "My Holiday"],
        0,
        "Every sentence in the paragraph is about platypus food, so 'What Platypuses Eat' fits best.",
      ),
    (n) =>
      multi(
        n,
        "Steps in a procedure often start with a command verb. Which steps start with a command verb? Choose all that are right.",
        ["Mix the flour and milk.", "The bowl is big.", "Pour the batter into the pan.", "Stir for one minute.", "Pancakes are yummy."],
        [0, 2, 3],
        "Mix, pour and stir tell you what to do. They are command verbs. The other sentences don't tell you to do anything.",
      ),
    (n) =>
      trueFalse(
        n,
        "An information report uses facts, not made-up events.",
        true,
        "An information report teaches the reader about a real topic, so it uses true facts.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which technical word would you expect to find in a report about the water cycle?",
        ["evaporation", "yummy", "awesome", "suddenly"],
        0,
        "'Evaporation' is a science word for water turning into vapour. Reports use exact, technical words like this.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Join the two ideas with a conjunction: Wombats dig burrows ___ they have strong claws.",
        ["because", "as", "since"],
        "The strong claws are the reason wombats can dig, so we use 'because' to show the reason. 'Since' and 'as' also work.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence has the commas in the right places?",
        [
          "Australia has many deserts including the Simpson, the Tanami and the Gibson.",
          "Australia has many deserts including, the Simpson the Tanami, and the Gibson.",
          "Australia has many deserts including the Simpson the Tanami, and, the Gibson.",
          "Australia, has many deserts, including the Simpson the Tanami and the Gibson.",
        ],
        0,
        "The list is the three deserts. Put a comma after the first one, then 'and' joins the last two.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence does NOT belong in an information report about kangaroos?",
        [
          "I think kangaroos are the best animal ever!",
          "Kangaroos are marsupials.",
          "A baby kangaroo is called a joey.",
          "Kangaroos use their strong tails for balance.",
        ],
        0,
        "Reports give facts. 'I think kangaroos are the best animal ever!' is the writer's opinion, so it does not belong.",
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of a procedure in order.",
        ["Goal (what you will make)", "Materials (what you need)", "Method (the steps)"],
        "A procedure first says what you will make, then lists what you need, then gives the steps to follow.",
      ),
    (n) =>
      multi(
        n,
        "Which of these would make a report about Uluru easier to read? Choose all that are right.",
        ["headings", "a labelled photo or diagram", "facts sorted into paragraphs", "a 'Once upon a time' opening"],
        [0, 1, 2],
        "Headings, labelled pictures and paragraphs help readers find facts. 'Once upon a time' is for stories, not reports.",
      ),
  ],
});

/** EN2-CWT-03: persuasive texts: opinion and fact, reasons, persuasive words and connectives. */
export const PERSUASIVE = levels(3150301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is an opinion?",
        ["Pizza is the best food in the world.", "Pizza has cheese on it.", "Pizza is cooked in an oven.", "Pizza is often cut into slices."],
        0,
        "'The best food in the world' is what someone thinks. Other people might disagree, so it is an opinion.",
      ),
    (n) => trueFalse(n, "A persuasive text tries to make the reader agree with the writer.", true, "To persuade means to try to get someone to agree with you or do something."),
    (n) =>
      choice(
        n,
        "Which word makes a writer sound sure?",
        ["definitely", "maybe", "perhaps", "sometimes"],
        0,
        "'Definitely' sounds certain. 'Maybe' and 'perhaps' sound unsure, which is not very persuasive.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'because' or 'but': We should have a longer lunch ___ we need more time to play.",
        "because",
        "'Because' joins the opinion to a reason. The second part explains why lunch should be longer.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are facts? Choose all that are right.",
        ["Netball is played with a ball.", "Netball is the most fun sport.", "A netball team has seven players on the court.", "Everyone should love netball."],
        [0, 2],
        "Facts can be checked: netball uses a ball and has seven players on court. 'Most fun' and 'should love' are opinions.",
      ),
    (n) =>
      choice(
        n,
        "'Our school needs a vegetable garden. It would teach us about healthy food.' What is the writer's opinion?",
        ["The school needs a vegetable garden.", "Vegetables are green.", "Gardens need water.", "Lunch is at one o'clock."],
        0,
        "The writer believes the school needs a vegetable garden. Teaching about healthy food is the reason given.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put the parts of a persuasive text in order.",
        ["Introduction: state your opinion", "Reasons with examples", "Conclusion: repeat your opinion"],
        "Start by saying what you think, then give your reasons, then finish by saying your opinion again strongly.",
      ),
    (n) =>
      choice(
        n,
        "Which is the strongest reason to support 'Dogs make great pets'?",
        ["Dogs keep you active because they need a walk every day.", "Dogs are dogs.", "My neighbour has a dog.", "Dogs have four legs."],
        0,
        "A strong reason explains why the opinion is true. Keeping you active is a real benefit of owning a dog.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Firstly' is a good word to start the first reason in a persuasive text.",
        true,
        "'Firstly' tells the reader that your first reason is coming. Then you can use 'Secondly' and 'Finally'.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which connective best fills the gap? 'Plastic bags can hurt sea turtles. ___, we should use reusable bags.'",
        ["Therefore", "Once upon a time", "Meanwhile", "Suddenly"],
        0,
        "'Therefore' means 'so' or 'because of this'. It shows what we should do because of the first sentence.",
      ),
    (n) =>
      multi(
        n,
        "Which words or phrases are persuasive? Choose all that are right.",
        ["must", "everyone knows", "it is essential", "a little bit", "I'm not sure"],
        [0, 1, 2],
        "'Must', 'everyone knows' and 'it is essential' sound strong and certain. 'A little bit' and 'I'm not sure' sound weak.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'must' or 'might' to make this sentence more persuasive: Children ___ wear a hat in the sun.",
        "must",
        "'Must' is a strong word that tells the reader it is important. 'Might' sounds unsure.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'Our school should have a pet chicken. Firstly, chickens lay eggs. Secondly, they eat our food scraps. Finally, ___' Which is the best final reason?",
        [
          "looking after a chicken would teach us to be responsible.",
          "chickens are birds.",
          "I had eggs for breakfast.",
          "my favourite colour is red.",
        ],
        0,
        "A good reason shows why the school should have a chicken. Learning to be responsible is a benefit; the others don't support the opinion.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses a fact to support an opinion?",
        [
          "We should save water because NSW often has droughts.",
          "Water is the best drink ever.",
          "Everyone hates wasting water.",
          "I think water is nice.",
        ],
        0,
        "'NSW often has droughts' is a fact that can be checked, and it gives a reason for the opinion 'We should save water'.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in the order a writer would use them to give three reasons and then finish.",
        ["Firstly", "Secondly", "Finally", "In conclusion"],
        "'Firstly', 'Secondly' and 'Finally' introduce the three reasons. 'In conclusion' starts the ending.",
      ),
  ],
});
