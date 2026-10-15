/**
 * Year 3 English, second set: another 15 questions for each Stage 2 standard (NESA outcome),
 * three at each level from very easy to very hard. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN2-SPELL-01: spelling generalisations: correct spellings, plurals, prefixes, suffixes and homophones. */
export const SPELLING = levels(3110116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["frend", "friend", "freind", "frind"],
        1,
        "'Friend' is a tricky word: f-r-i-e-n-d. A trick to remember it: a friend is there to the 'end'.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'dish' is 'dishes'.",
        true,
        "Words that end in sh add -es to make the plural, because 'dishs' is hard to say: one dish, two dishes.",
      ),
    (n) =>
      typed("fill_blank", n, "play + ed = ___", "played", "'Play' ends in a vowel then y, so you keep the y and just add -ed: played."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'lunch'.",
        "lunches",
        "Words that end in ch add -es to make the plural: one lunch, two lunches.",
      ),
    (n) =>
      choice(
        n,
        "Which word correctly finishes the sentence? 'I ate ___ apples at recess.'",
        ["to", "two", "too", "tow"],
        1,
        "'Two' is the number 2. 'To' shows where something goes, and 'too' means also or very.",
      ),
    (n) =>
      ordering(
        n,
        "Put these syllables in order to spell 'kangaroo'.",
        ["kan", "ga", "roo"],
        "Clap the word as you say it: kan-ga-roo. Spell one syllable at a time.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ed' to the word 'stop'.",
        "stopped",
        "'Stop' has a short vowel and ends in one consonant, so you double the p before adding -ed: stopped.",
      ),
    (n) =>
      choice(
        n,
        "What is the plural of 'pony'?",
        ["ponys", "ponies", "ponyes", "poneys"],
        1,
        "'Pony' ends in a consonant then y, so change the y to i and add -es: ponies.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 're' means 'again'. re + write = ___",
        "rewrite",
        "A prefix goes at the front and the base word stays the same: re + write = rewrite, which means write again.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses 'your' and 'you're' correctly?",
        [
          "You're going to need your raincoat today.",
          "Your going to need you're raincoat today.",
          "You're going to need you're raincoat today.",
          "Your going to need your raincoat today.",
        ],
        0,
        "'You're' is short for 'you are' (you are going). 'Your' means belonging to you (your raincoat).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'est' to the word 'big'.",
        "biggest",
        "'Big' has a short vowel and ends in one consonant, so double the g before adding -est: biggest.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'wolf' is 'wolves'.",
        true,
        "Many words ending in f change the f to v and add -es: one wolf, a pack of wolves.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "What is the plural of 'child'?",
        ["childs", "children", "childrens", "childes"],
        1,
        "Some plurals don't follow the rules and must be learnt. One child, many children. 'Childrens' is never right.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "beauty + ful = ___",
        "beautiful",
        "'Beauty' ends in a consonant then y, so change the y to i before adding -ful (with one l): beautiful.",
      ),
    (n) =>
      multi(
        n,
        "Which plurals are spelt correctly? Choose all that are right.",
        ["cherries", "monkeys", "boxs", "foxes", "ladys"],
        [0, 1, 3],
        "Consonant + y changes to -ies (cherries, ladies). Vowel + y just adds -s (monkeys). Words ending in x add -es (boxes, foxes).",
      ),
  ],
});

/** EN2-VOCAB-01: synonyms, antonyms, meaning from context, word families and shades of meaning. */
export const VOCAB = levels(3120116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'small'?",
        ["little", "huge", "loud", "fast"],
        0,
        "'Little' and 'small' are synonyms: they mean the same thing.",
      ),
    (n) =>
      choice(
        n,
        "What is the opposite of 'full'?",
        ["empty", "heavy", "big", "round"],
        0,
        "A full cup has lots in it and an empty cup has nothing. 'Full' and 'empty' are antonyms.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Shout' and 'whisper' mean the same thing.",
        false,
        "To shout is to talk very loudly and to whisper is to talk very softly. They are opposites.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "The opposite of 'wet' is ___.",
        "dry",
        "After a swim you are wet, and a towel makes you dry. 'Wet' and 'dry' are antonyms.",
      ),
    (n) =>
      choice(
        n,
        "'The wombat scurried into its burrow when it heard the dog bark.' What does 'scurried' mean?",
        ["moved quickly", "fell asleep", "ate slowly", "sang"],
        0,
        "The wombat heard a dog and wanted to get away, so 'scurried' must mean moved quickly.",
      ),
    (n) =>
      multi(
        n,
        "Which words belong to the same word family as 'help'? Choose all that are right.",
        ["helpful", "helper", "helmet", "unhelpful", "hello"],
        [0, 1, 3],
        "Helpful, helper and unhelpful all have the base word 'help'. 'Helmet' and 'hello' only start with the same letters.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from slowest to fastest.",
        ["crawl", "walk", "jog", "sprint"],
        "Crawling is slowest. Walking is faster, jogging is faster again, and a sprint is running as fast as you can.",
      ),
    (n) =>
      choice(
        n,
        "'Jai was famished after swimming all morning, so he ate three sandwiches.' What does 'famished' mean?",
        ["very hungry", "very cold", "sleepy", "sad"],
        0,
        "Jai ate three sandwiches, so he must have been very hungry. 'Famished' means very hungry.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word is the opposite of 'brave': 'bold' or 'timid'?",
        "timid",
        "A brave person is not afraid. A timid person is shy and easily scared, so 'timid' is the opposite. 'Bold' means almost the same as brave.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word means 'full of colour'?",
        ["colourful", "colourless", "colouring", "discolour"],
        0,
        "The suffix -ful means 'full of', so colourful means full of colour. The suffix -less means without.",
      ),
    (n) =>
      multi(
        n,
        "Which words could you use instead of 'walked'? Choose all that are right.",
        ["strolled", "marched", "tiptoed", "laughed", "yelled"],
        [0, 1, 2],
        "Strolled, marched and tiptoed are all ways of walking. Laughed and yelled are sounds you make, not ways to walk.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Chilly' is a stronger word than 'freezing'.",
        false,
        "Both words mean cold, but 'chilly' is a little cold and 'freezing' is very cold. 'Freezing' is the stronger word.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "In science, what do we call a mammal that carries its baby in a pouch?",
        ["a marsupial", "a reptile", "an insect", "an amphibian"],
        0,
        "Kangaroos, koalas and wombats carry their babies in a pouch. These animals are called marsupials.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from saddest to happiest.",
        ["miserable", "sad", "happy", "overjoyed"],
        "Miserable is very sad, so it comes first. Then sad, then happy, and overjoyed means extremely happy.",
      ),
    (n) =>
      choice(
        n,
        "'The bush track was so narrow that only one person could walk on it at a time.' What does 'narrow' mean?",
        ["not wide", "very long", "muddy", "steep"],
        0,
        "Only one person could fit on the track at a time, so it must have been thin. 'Narrow' means not wide.",
      ),
  ],
});

const KITE = {
  title: "The Yellow Kite",
  text:
    "Mila got a yellow kite for her birthday. On Sunday she took it to the park with her big brother, Josh.\n\n" +
    "At first the kite would not fly. It kept crashing onto the grass. Josh told Mila to run into the wind. She ran as fast as she could, and the kite rose up, up, up into the sky.\n\n" +
    "“It's flying!” Mila shouted. The kite danced above the trees until the sun went down.",
};

const BLUE_TONGUE = {
  title: "Blue-tongue Lizards",
  text:
    "Blue-tongue lizards live in many backyards in Australia. They have a short, fat body and short legs. Their most famous feature is their bright blue tongue.\n\n" +
    "When a blue-tongue lizard feels scared, it opens its mouth wide, sticks out its blue tongue and hisses. This frightens away birds and other animals.\n\n" +
    "Blue-tongue lizards eat snails, insects, flowers and fruit. Gardeners like them because they eat the snails that damage plants.",
};

const SAUSAGE_SIZZLE = {
  title: "The Sausage Sizzle",
  text:
    "On Saturday morning, Noah and his mum set up a table outside the hardware shop. They were running a sausage sizzle to raise money for the Rural Fire Service.\n\n" +
    "Mum cooked the sausages on the barbecue while Noah put them in bread with sauce. At first only a few people stopped. Then the sky turned dark and it began to rain. Noah thought nobody would come.\n\n" +
    "But wet shoppers hurried under the shop's roof and smelled the sausages. Soon there was a long queue. By lunchtime, they had sold 80 sausages.",
};

const JUMP = {
  title: "The Big Jump",
  text:
    "Zoe stood at the edge of the pool with her toes curled over the side. The water looked very deep. All the other children had already jumped in.\n\n" +
    "“I'll be right here,” said her teacher, holding out her hands.\n\n" +
    "Zoe took a big breath, held her nose and jumped. When she came up, her teacher was holding her arms. Zoe spluttered and wiped her eyes. Then she grinned from ear to ear. “Can I do it again?”",
};

const BOOK_WEEK = {
  title: "Book Week Parade",
  text:
    "Wattle Grove Public School Book Week Parade\n\n" +
    "When: Thursday 21 August, 9:30 am\nWhere: School oval (school hall if wet)\n\n" +
    "Students are invited to dress up as their favourite book character. Please bring the book your costume comes from so you can show it to your class.\n\n" +
    "Parents are welcome to watch. Seats will be set out under the trees.\n\n" +
    "The library will be closed all day so the teachers can set up the book fair. It will open again on Friday.",
};

/** EN2-RECOM-01: literal and inferential comprehension of stories, information texts and notices. */
export const READING = levels(3130116, {
  very_easy: [
    (n) =>
      read(
        KITE,
        choice(
          n,
          "What colour was Mila's kite?",
          ["red", "blue", "yellow", "green"],
          2,
          "The first sentence says, 'Mila got a yellow kite for her birthday.'",
        ),
      ),
    (n) =>
      read(
        KITE,
        trueFalse(
          n,
          "The kite flew straight away on the first try.",
          false,
          "The text says, 'At first the kite would not fly. It kept crashing onto the grass.'",
        ),
      ),
    (n) =>
      read(
        KITE,
        typed(
          "short_answer",
          n,
          "Who went to the park with Mila?",
          ["Josh", "her brother", "her big brother", "brother"],
          "The text says she took the kite to the park with her big brother, Josh.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        BLUE_TONGUE,
        choice(
          n,
          "What does a blue-tongue lizard do when it feels scared?",
          ["It sticks out its blue tongue and hisses.", "It climbs a tall tree.", "It changes colour.", "It runs into the water."],
          0,
          "The second paragraph says it opens its mouth wide, sticks out its blue tongue and hisses.",
        ),
      ),
    (n) =>
      read(
        BLUE_TONGUE,
        typed(
          "fill_blank",
          n,
          "Gardeners like blue-tongue lizards because they eat the ___.",
          ["snails", "snail"],
          "The last sentence says gardeners like them because they eat the snails that damage plants.",
        ),
      ),
    (n) =>
      read(
        BLUE_TONGUE,
        multi(
          n,
          "Which foods do blue-tongue lizards eat, according to the text? Choose all that are right.",
          ["snails", "insects", "fruit", "fish", "seeds"],
          [0, 1, 2],
          "The text says they eat snails, insects, flowers and fruit. Fish and seeds are not mentioned.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        SAUSAGE_SIZZLE,
        ordering(
          n,
          "Put these events in the order they happened.",
          [
            "Noah and Mum set up a table.",
            "Only a few people stopped.",
            "It began to rain.",
            "Shoppers queued under the roof.",
            "They had sold 80 sausages.",
          ],
          "Follow the story from start to end: setting up, a slow start, the rain, the queue, then the total by lunchtime.",
        ),
      ),
    (n) =>
      read(
        SAUSAGE_SIZZLE,
        choice(
          n,
          "Why did Noah think nobody would come?",
          ["It started to rain.", "The sausages were burnt.", "The shop was closed.", "They had no bread."],
          0,
          "The text says the sky turned dark and it began to rain. Then 'Noah thought nobody would come.'",
        ),
      ),
    (n) =>
      read(
        SAUSAGE_SIZZLE,
        typed(
          "short_answer",
          n,
          "How many sausages had Noah and Mum sold by lunchtime?",
          ["80", "eighty"],
          "The last sentence says, 'By lunchtime, they had sold 80 sausages.'",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        JUMP,
        choice(
          n,
          "How did Zoe feel at the start of the story?",
          ["scared", "bored", "angry", "sleepy"],
          0,
          "Her toes were curled over the edge, the water looked deep and everyone else had jumped in first. These clues show she was scared.",
        ),
      ),
    (n) =>
      read(
        JUMP,
        choice(
          n,
          "Why did Zoe ask, “Can I do it again?”",
          [
            "She found out jumping in was fun after all.",
            "She wanted to get out of the pool.",
            "She did not jump the first time.",
            "Her teacher told her to say it.",
          ],
          0,
          "Zoe 'grinned from ear to ear' after she jumped. She enjoyed it, so she wanted another turn.",
        ),
      ),
    (n) =>
      read(
        JUMP,
        trueFalse(
          n,
          "Zoe was the first child to jump into the pool.",
          false,
          "The text says, 'All the other children had already jumped in.' Zoe was the last.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        BOOK_WEEK,
        choice(
          n,
          "What is the main purpose of this text?",
          [
            "to tell families about the Book Week parade",
            "to tell a story about a book character",
            "to teach students how to read",
            "to sell costumes",
          ],
          0,
          "The notice says when and where the parade is, what to wear and bring, and who can come. It gives information.",
        ),
      ),
    (n) =>
      read(
        BOOK_WEEK,
        typed(
          "short_answer",
          n,
          "It is raining on Thursday morning. Where will the parade be held?",
          ["the school hall", "school hall", "the hall", "hall", "in the school hall", "in the hall"],
          "The notice says the parade is on the school oval, but in the school hall if it is wet.",
        ),
      ),
    (n) =>
      read(
        BOOK_WEEK,
        multi(
          n,
          "Which of these are true, according to the notice? Choose all that are right.",
          [
            "Students should bring the book their costume comes from.",
            "Parents can come and watch.",
            "Students can borrow library books on Thursday.",
            "The parade starts at 9:30 am.",
            "The parade is on a Friday.",
          ],
          [0, 1, 3],
          "The notice asks students to bring their book, welcomes parents and gives the time as 9:30 am. The library is closed on Thursday, and the parade is on Thursday.",
        ),
      ),
  ],
});

const FARM_POEM = {
  title: "On the Farm",
  text:
    "The rooster crows at break of day,\nThe horses munch their sweet green hay,\nThe pigs roll round in sticky mud,\nThe cow lies down to chew her cud.\n\n" +
    "The ducks go paddling on the dam,\nThe farmer bottle-feeds a lamb,\nThe goats climb up the woodpile high,\nThe swallows swoop across the sky.\n\n" +
    "The sheepdog runs to round up sheep,\nThe kittens curl up fast asleep,\nAnd when the sun sinks in the west,\nThe farm and all its animals rest.",
};

const BROKEN_POT = {
  title: "The Broken Pot",
  text:
    "Tom kicked his soccer ball too hard. It flew over the fence and smashed Mrs Lee's flower pot.\n\n" +
    "Tom wanted to run and hide. Instead, he walked next door and knocked. “I'm sorry, Mrs Lee,” he said in a small voice. “I broke your pot. I'll use my pocket money to buy a new one.”\n\n" +
    "Mrs Lee smiled. “Thank you for being honest, Tom. How about you help me plant the flowers again instead?”",
};

const RAINFOREST = {
  title: "In the Rainforest",
  text:
    "The rainforest was cool and green. Tall trees reached up like giant umbrellas, blocking out the sun. Vines twisted around their trunks like snakes.\n\n" +
    "Water dripped from the leaves, plip, plop, onto the soft, damp ground. A whipbird cracked its call through the trees, and the air smelled of wet earth and moss. A bright blue butterfly drifted past, and far away a creek splashed over the rocks.",
};

const RUSTY = {
  title: "Waiting at the Gate",
  text:
    "I am Rusty, and I am a very good dog. Every afternoon at three o'clock, I sit by the front gate and wait.\n\n" +
    "Today, I waited and waited. The school bus came, but Ella did not get off. My tail stopped wagging. I lay down with my nose on my paws.\n\n" +
    "Then I heard a car door. Ella ran up the path with a sticker on her jumper. “I went to the dentist, Rusty!” she said. I licked her face all over.",
};

const CROW_POEM = {
  title: "Crow's Treasure",
  text:
    "Crow had a shiny bottle cap,\nHe hid it in his nest.\n“I won't share it with anyone,\nMy treasure is the best!”\n\n" +
    "Kookaburra found a juicy worm\nAnd called out to her friends.\nThey laughed and shared a feast together\nTill the day came to its end.\n\n" +
    "Crow sat alone up in his tree,\nHis treasure cold and small.\n“A friend,” he sighed, “to laugh with me\nIs the best treasure of all.”",
};

/** EN2-UARL-01: character, setting, feelings, rhyme and rhythm, and point of view in literature. */
export const LITERATURE = levels(3130216, {
  very_easy: [
    (n) =>
      read(
        FARM_POEM,
        choice(
          n,
          "Which word rhymes with 'day' in the poem?",
          ["hay", "mud", "sheep", "west"],
          0,
          "'Day' and 'hay' both end with the same sound: -ay.",
        ),
      ),
    (n) =>
      read(
        FARM_POEM,
        trueFalse(
          n,
          "This poem is set on a farm.",
          true,
          "The poem talks about a rooster, horses, pigs, a cow and sheep, which all live on a farm.",
        ),
      ),
    (n) =>
      read(
        FARM_POEM,
        typed(
          "short_answer",
          n,
          "Which word in the poem rhymes with 'sheep'?",
          "asleep",
          "'Sheep' and 'asleep' both end with the sound -eep.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        BROKEN_POT,
        choice(
          n,
          "Which word best describes Tom?",
          ["honest", "sneaky", "lazy", "rude"],
          0,
          "Tom owned up to breaking the pot even though he wanted to hide. Mrs Lee even thanks him for being honest.",
        ),
      ),
    (n) =>
      read(
        BROKEN_POT,
        choice(
          n,
          "Where does this story take place?",
          ["at Tom's home and next door", "at school", "at the beach", "at a shop"],
          0,
          "Tom kicks the ball over his fence into Mrs Lee's yard, then walks next door, so the story happens at home.",
        ),
      ),
    (n) =>
      read(
        BROKEN_POT,
        multi(
          n,
          "Which clues show that Tom felt nervous about owning up? Choose all that are right.",
          ["He wanted to run and hide.", "He spoke in a small voice.", "Mrs Lee smiled.", "He kicked the ball."],
          [0, 1],
          "Wanting to hide and speaking in a small voice show he was nervous. Mrs Lee smiling is about her, and kicking the ball happened before.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        RAINFOREST,
        choice(
          n,
          "Which words best describe the feeling (mood) of this place?",
          ["cool and peaceful", "hot and dry", "noisy and busy", "cold and icy"],
          0,
          "The rainforest is 'cool and green' with soft dripping water and birdsong. It feels cool and peaceful.",
        ),
      ),
    (n) =>
      read(
        RAINFOREST,
        choice(
          n,
          "'Tall trees reached up like giant umbrellas.' What are the trees being compared to?",
          ["giant umbrellas", "snakes", "the sun", "moss"],
          0,
          "The word 'like' shows a comparison. The trees spread out over the forest and block the sun, just like umbrellas.",
        ),
      ),
    (n) =>
      read(
        RAINFOREST,
        multi(
          n,
          "Which words from the text are sound words? Choose all that are right.",
          ["plip", "plop", "cracked", "green", "tall"],
          [0, 1, 2],
          "Plip and plop are the sounds of dripping water, and the whipbird 'cracked' its call. Green and tall describe how things look.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        RUSTY,
        choice(
          n,
          "Who is telling this story?",
          ["Rusty the dog", "Ella", "the bus driver", "Ella's mum"],
          0,
          "The narrator says, 'I am Rusty, and I am a very good dog.' The dog tells the story using 'I'.",
        ),
      ),
    (n) =>
      read(
        RUSTY,
        choice(
          n,
          "Why did Rusty's tail stop wagging?",
          [
            "Ella did not get off the bus, so he was sad and worried.",
            "He was tired from running.",
            "He did not like the bus.",
            "Ella told him to stop.",
          ],
          0,
          "Rusty waits for Ella every day. When she wasn't on the bus, he stopped wagging and lay down, which shows he was sad and worried.",
        ),
      ),
    (n) =>
      read(
        RUSTY,
        typed(
          "fill_blank",
          n,
          "Ella was not on the bus because she went to the ___.",
          "dentist",
          "Ella tells Rusty, 'I went to the dentist, Rusty!' Her sticker is another clue.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        CROW_POEM,
        choice(
          n,
          "What lesson does this poem teach?",
          [
            "Friends are worth more than things.",
            "Bottle caps are the best treasure.",
            "Kookaburras do not like worms.",
            "Always hide your things in a nest.",
          ],
          0,
          "Crow kept his treasure but ended up alone. Kookaburra shared and had fun with friends. Crow learns that a friend is the best treasure.",
        ),
      ),
    (n) =>
      read(
        CROW_POEM,
        ordering(
          n,
          "Put these events from the poem in order.",
          [
            "Crow hid his bottle cap in his nest.",
            "Kookaburra called her friends to share a worm.",
            "Crow sat alone in his tree.",
            "Crow sighed that a friend is the best treasure.",
          ],
          "Each stanza tells one part: Crow hides his treasure, Kookaburra shares, then Crow sits alone and learns his lesson.",
        ),
      ),
    (n) =>
      read(
        CROW_POEM,
        choice(
          n,
          "How did Crow's thinking change from the start to the end of the poem?",
          [
            "At first he thought his bottle cap was the best treasure, but at the end he knew a friend was better.",
            "At first he wanted friends, but at the end he only wanted the bottle cap.",
            "He was happy and proud the whole time.",
            "His thinking did not change at all.",
          ],
          0,
          "In stanza one Crow says 'My treasure is the best!' In the last stanza he says a friend 'is the best treasure of all.'",
        ),
      ),
  ],
});

/** EN2-CWT-01: imaginative texts: story structure, dialogue punctuation, describing words, noun groups, verbs and capitals. */
export const STORIES = levels(3150116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is a describing word (an adjective)? 'Ben has a red bike.'",
        ["Ben", "has", "red", "bike"],
        2,
        "A describing word tells us more about a noun. 'Red' tells us what the bike looks like.",
      ),
    (n) =>
      trueFalse(
        n,
        "A sentence that asks a question ends with a question mark.",
        true,
        "Questions end with a question mark, like 'Where is my hat?'",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is written correctly?",
        ["we went to bondi beach.", "We went to Bondi Beach.", "We went to bondi Beach", "we Went to Bondi beach."],
        1,
        "The sentence starts with a capital, the place name Bondi Beach has capitals, and it ends with a full stop.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'loudly' or 'green' to fill the gap: The baby cried ___ all night.",
        "loudly",
        "We need a word that tells HOW the baby cried. 'Loudly' tells how. 'Green' is a colour and doesn't fit.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order to make a sentence.",
        ["The", "cat", "chased", "the", "mouse."],
        "A sentence starts with a capital letter and ends with a full stop: The cat chased the mouse.",
      ),
    (n) =>
      multi(
        n,
        "Which words are verbs (doing words)? Choose all that are right.",
        ["swim", "jump", "chair", "sing", "blue"],
        [0, 1, 3],
        "Swim, jump and sing are things you can do. 'Chair' is a thing (a noun) and 'blue' is a colour.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which sentence has the speech marks in the right place?",
        [
          "“Where is my hat?” asked Lucy.",
          "“Where is my hat? asked Lucy.”",
          "Where is my hat? “asked Lucy.”",
          "“Where is” my hat? asked Lucy.",
        ],
        0,
        "Speech marks go around only the words Lucy says, and the question mark belongs inside them. 'asked Lucy' is outside.",
      ),
    (n) =>
      choice(
        n,
        "What usually happens in the resolution of a story?",
        ["The problem is solved.", "The characters are introduced.", "The problem first happens.", "The title is written."],
        0,
        "The resolution comes at the end. It is where the problem from the complication gets fixed.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which verb better shows someone moving very quietly: 'tiptoed' or 'stomped'?",
        "tiptoed",
        "To tiptoe is to walk softly on your toes so no one hears you. 'Stomped' is loud and heavy.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which noun group best helps the reader picture a happy birthday party?",
        ["a bright, noisy party with balloons", "a party", "a sad, quiet party", "party big"],
        0,
        "'Bright', 'noisy' and 'with balloons' help the reader see and hear a fun party. 'Sad' and 'quiet' don't fit.",
      ),
    (n) =>
      multi(
        n,
        "Which words need a capital letter? 'on friday, mia and i went to dubbo.' Choose all that are right.",
        ["on", "friday", "mia", "i", "went", "dubbo"],
        [0, 1, 2, 3, 5],
        "'On' starts the sentence, Friday is a day, Mia is a name, 'I' is always a capital, and Dubbo is a place. 'Went' does not.",
      ),
    (n) =>
      trueFalse(
        n,
        "The orientation of a story tells the reader who is in it, where it happens and when.",
        true,
        "The orientation is the beginning. It sets up the characters, the setting and the time.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Orientation: Ruby and Sam are at the beach. Complication: A big wave washes away their sandcastle just before the competition ends. Which is the best resolution?",
        [
          "They quickly build a new castle higher up the sand and win a prize for teamwork.",
          "Ruby likes the beach.",
          "A big wave washes their sandcastle away.",
          "It was a sunny day.",
        ],
        0,
        "A resolution fixes the problem. Building a new castle in a safer spot solves the problem the wave caused.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a short story.",
        [
          "On Monday, Finn found a puppy shivering in the rain.",
          "He took it home and dried it with a towel.",
          "The next day, he put up 'Found' posters in his street.",
          "On Friday, the puppy's owner knocked on the door.",
        ],
        "Look for time clues: 'On Monday' starts it, then he takes the puppy home, 'The next day' comes after, and 'On Friday' is last.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the past tense of 'catch': Last week, Jed ___ a huge fish at the lake.",
        "caught",
        "'Last week' tells us it is the past. 'Catch' is a tricky verb: its past tense is 'caught', not 'catched'.",
      ),
  ],
});

/** EN2-CWT-02: informative texts: facts, headings, procedures, reports, conjunctions and commas in lists. */
export const INFORMATIVE = levels(3150216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which of these is a fact?",
        [
          "The sun rises in the morning.",
          "Mornings are the best time of day.",
          "Everyone loves sunrise.",
          "Sunsets are prettier than sunrises.",
        ],
        0,
        "A fact can be checked. You can see the sun rise each morning. The others are what someone thinks or feels.",
      ),
    (n) =>
      trueFalse(
        n,
        "A recipe is a kind of procedure.",
        true,
        "A recipe tells you how to make food, step by step. That makes it a procedure.",
      ),
    (n) =>
      choice(
        n,
        "Which part of an information book lists the topics and the page numbers where they start?",
        ["the contents page", "the front cover", "the title", "a photo"],
        0,
        "The contents page is near the front. It lists each topic and its page number so you can find it quickly.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put the steps for making a cheese sandwich in order.",
        ["Get two slices of bread.", "Spread butter on the bread.", "Put cheese on one slice.", "Put the other slice on top."],
        "You need bread before you can butter it, the cheese goes on next, and the top slice goes on last.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses commas in a list correctly?",
        [
          "At the zoo we saw lions, zebras, giraffes and seals.",
          "At the zoo we saw, lions zebras giraffes, and seals.",
          "At the zoo we saw lions zebras giraffes and seals.",
          "At the zoo, we saw lions zebras, giraffes, and, seals.",
        ],
        0,
        "Put a comma between the animals in the list, and use 'and' before the last one.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'and' or 'but': Penguins are birds, ___ they cannot fly.",
        "but",
        "Most birds can fly, so penguins not flying is a surprise. 'But' joins two ideas that are different.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is the best heading for this paragraph? 'Koalas live in eucalyptus forests in eastern Australia. They spend most of their time high up in the trees.'",
        ["Where Koalas Live", "What Koalas Eat", "Baby Koalas", "A Day at the Zoo"],
        0,
        "Both sentences tell us where koalas live, so 'Where Koalas Live' fits best.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are command verbs you might see at the start of steps in a procedure? Choose all that are right.",
        ["cut", "fold", "glue", "yesterday", "happy"],
        [0, 1, 2],
        "Cut, fold and glue tell you what to do. 'Yesterday' is a time word and 'happy' is a feeling.",
      ),
    (n) =>
      trueFalse(
        n,
        "An information report should include made-up characters.",
        false,
        "An information report gives true facts about a real topic. Made-up characters belong in stories.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which technical word would you expect to find in a report about insects?",
        ["antennae", "yummy", "scary", "wonderful"],
        0,
        "'Antennae' is a science word for the feelers on an insect's head. Reports use exact, technical words like this.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'so' or 'because': It was very hot, ___ we stayed in the shade.",
        "so",
        "Staying in the shade is the result of the heat. 'So' shows what happened because of the first part.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence has the commas in the right places?",
        [
          "The Aboriginal flag is black, red and yellow.",
          "The Aboriginal flag is, black red, and yellow.",
          "The Aboriginal flag, is black red and yellow.",
          "The Aboriginal flag is black red, and, yellow.",
        ],
        0,
        "The list is the three colours. Put a comma after the first colour, then 'and' joins the last two.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence does NOT belong in an information report about the Sydney Harbour Bridge?",
        [
          "The bridge is the most beautiful thing I have ever seen!",
          "The bridge opened in 1932.",
          "Cars, trains and people cross the bridge.",
          "The bridge is made of steel.",
        ],
        0,
        "Reports give facts. 'The most beautiful thing I have ever seen' is the writer's opinion, so it does not belong.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to explain how a frog grows.",
        [
          "A female frog lays eggs in the water.",
          "Tadpoles hatch from the eggs.",
          "The tadpoles grow legs and lose their tails.",
          "The young frogs climb out of the water.",
        ],
        "A life cycle goes in order: eggs first, then tadpoles, then tadpoles change, and finally young frogs leave the water.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences would fit in an information report about platypuses? Choose all that are right.",
        [
          "Platypuses live in rivers and creeks.",
          "A platypus swims using its front feet.",
          "Once upon a time, a platypus got lost.",
          "A female platypus lays eggs.",
        ],
        [0, 1, 3],
        "Reports give true facts written in the present tense. 'Once upon a time' is how a made-up story begins.",
      ),
  ],
});

/** EN2-CWT-03: persuasive texts: opinion and fact, reasons, persuasive words and connectives. */
export const PERSUASIVE = levels(3150316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is an opinion?",
        [
          "Winter is the worst season.",
          "Winter comes after autumn.",
          "Winter days are shorter than summer days.",
          "In Australia, winter starts in June.",
        ],
        0,
        "'The worst season' is what someone thinks. Other people might love winter, so it is an opinion.",
      ),
    (n) =>
      trueFalse(
        n,
        "An opinion is something that can be checked and proven true.",
        false,
        "A fact can be checked and proven. An opinion is what someone thinks or feels, and others might disagree.",
      ),
    (n) =>
      choice(
        n,
        "Which word makes a writer sound unsure?",
        ["perhaps", "certainly", "must", "always"],
        0,
        "'Perhaps' means maybe, so it sounds unsure. 'Certainly', 'must' and 'always' sound sure.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'so' or 'but': Hats protect us from the sun, ___ we should wear them outside.",
        "so",
        "Wearing hats is the result of them protecting us. 'So' joins a reason to what we should do.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are opinions? Choose all that are right.",
        ["Cats are better than dogs.", "Cats have whiskers.", "Cats are the cutest pets.", "Cats can climb trees."],
        [0, 2],
        "'Better than dogs' and 'the cutest' are what someone thinks. Whiskers and climbing can be checked, so they are facts.",
      ),
    (n) =>
      choice(
        n,
        "'Every school should have a big library. Books help children learn new things.' What reason does the writer give?",
        [
          "Books help children learn new things.",
          "Every school should have a big library.",
          "Libraries have shelves.",
          "Children like lunch.",
        ],
        0,
        "The opinion is that schools should have a big library. The reason is why: books help children learn new things.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a short persuasive text.",
        [
          "I believe our class should go on an excursion to the zoo.",
          "Firstly, we would learn about animals.",
          "Secondly, it would be a fun day together.",
          "That is why we must go to the zoo.",
        ],
        "Start with the opinion, then 'Firstly' and 'Secondly' give the reasons, and the last sentence says the opinion again.",
      ),
    (n) =>
      choice(
        n,
        "Which is the strongest reason to support 'We should plant more trees at school'?",
        ["Trees give us shade on hot days and homes for birds.", "Trees are trees.", "I saw a tree yesterday.", "Trees have leaves."],
        0,
        "A strong reason shows why the opinion is a good idea. Shade and homes for birds are real benefits.",
      ),
    (n) =>
      trueFalse(
        n,
        "'In conclusion' is a good way to start the last part of a persuasive text.",
        true,
        "'In conclusion' tells the reader you are finishing and are about to sum up your opinion.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which words best fill the gap? 'Lots of rubbish ends up in the ocean. ___ we must put our litter in the bin.'",
        ["That is why", "Once upon a time", "Last week", "Suddenly"],
        0,
        "'That is why' shows what we should do because of the first sentence. The others are for telling stories.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences sound strong and certain? Choose all that are right.",
        [
          "We must act now.",
          "It is clear that this is important.",
          "I guess maybe it is okay.",
          "Everyone needs to help.",
          "It might be a bit good.",
        ],
        [0, 1, 3],
        "'Must', 'it is clear' and 'everyone needs to' sound sure. 'I guess maybe' and 'might be a bit' sound unsure.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'should' or 'could' to make this sentence more persuasive: Everyone ___ wear a helmet when riding a bike.",
        "should",
        "'Should' tells the reader what is the right thing to do. 'Could' only says it is possible, so it is weaker.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which is the best conclusion for a persuasive text arguing that recess should be longer?",
        [
          "In conclusion, a longer recess would help us play, rest and be ready to learn.",
          "Recess is at eleven o'clock.",
          "I like apples.",
          "Firstly, recess is fun.",
        ],
        0,
        "A conclusion starts with a word like 'In conclusion' and sums up the opinion and reasons. 'Firstly' belongs at the start of the reasons.",
      ),
    (n) =>
      multi(
        n,
        "A writer thinks 'Dogs should be allowed at the beach.' Which sentences are reasons that support this opinion? Choose all that are right.",
        [
          "Dogs need exercise, and running on the sand is great for them.",
          "Families could enjoy the beach with their pets.",
          "Some dogs are brown.",
          "The beach has sand.",
        ],
        [0, 1],
        "Exercise for dogs and family time are reasons why dogs should be allowed. Brown dogs and sand are facts that don't support the opinion.",
      ),
    (n) =>
      choice(
        n,
        "'Children should help with chores at home. Firstly, it teaches them to be responsible. Secondly, ___' Which is the best second reason?",
        ["it gives parents more time to spend with the family.", "my favourite food is pasta.", "chores are jobs.", "I have a sister."],
        0,
        "A good reason explains why children should help. Giving the family more time together is a benefit; the others don't support the opinion.",
      ),
  ],
});
