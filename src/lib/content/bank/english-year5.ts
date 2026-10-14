/**
 * Year 5 English: 15 questions for each Stage 3 standard (NESA outcome), three at each
 * level from very easy to very hard. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN3-SPELL-01: prefixes, suffixes, Greek and Latin roots, silent letters, tricky plurals and homophones. */
export const SPELLING = levels(5110101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["becaus", "because", "becose", "beacuse"],
        1,
        "'Because' is spelt b-e-c-a-u-s-e. A trick to remember it: Big Elephants Can Always Understand Small Elephants.",
      ),
    (n) =>
      trueFalse(
        n,
        "The word 'knife' has a silent k.",
        true,
        "We write the k in 'knife' but we don't say it. It starts with an 'n' sound, just like 'knee' and 'know'.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Add the prefix un- to 'happy' to make a new word: ___",
        "unhappy",
        "A prefix goes on the front and the base word stays the same: un + happy = unhappy.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "What is the plural of 'baby'?",
        ["babys", "babies", "babyes", "babyies"],
        1,
        "When a word ends in a consonant then y, change the y to i and add -es: baby becomes babies.",
      ),
    (n) =>
      multi(
        n,
        "Which of these words have a silent letter? Choose all that are right.",
        ["thumb", "write", "plant", "listen", "bring"],
        [0, 1, 3],
        "The b in 'thumb', the w in 'write' and the t in 'listen' are silent. Every letter in 'plant' and 'bring' is sounded.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ful to 'hope'. Write the new word.",
        "hopeful",
        "The suffix -ful starts with a consonant, so we keep the e: hope + ful = hopeful.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'From the hill we could see ___ house.'",
        ["there", "their", "they're", "thier"],
        1,
        "'Their' means belonging to them, like their house. 'There' is a place and 'they're' is short for 'they are'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'leaf'.",
        "leaves",
        "Many words ending in f change the f to v and add -es: leaf becomes leaves, just like wolf becomes wolves.",
      ),
    (n) =>
      choice(
        n,
        "Which is the correct spelling of 'make' + -ing?",
        ["makeing", "making", "makking", "makin"],
        1,
        "When a word ends in a silent e and the suffix starts with a vowel, drop the e: make + ing = making.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "The Greek root 'graph' means write, and 'auto' means self. Which word means a person's name written by themselves?",
        ["paragraph", "autograph", "photograph", "biography"],
        1,
        "auto (self) + graph (write) = autograph, a name you write yourself. A cricketer signs autographs for fans.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'potato' is spelt 'potatos'.",
        false,
        "Some words ending in o add -es: potato becomes potatoes, and tomato becomes tomatoes.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'unhelpfully'.",
        ["un", "help", "ful", "ly"],
        "Start with the prefix un-, then the base word help, then the suffixes -ful and -ly: un + help + ful + ly.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these words are spelt correctly? Choose all that are right.",
        ["necessary", "seperate", "definitely", "accomodate", "rhythm"],
        [0, 2, 4],
        "'Necessary' has one c and double s, 'definitely' has the word 'finite' inside it, and 'rhythm' has no vowels except y. 'Separate' has 'a rat' in it, and 'accommodate' has double c and double m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ness to 'happy' to make a noun. Write the new word.",
        "happiness",
        "'Happy' ends in a consonant then y, so change the y to i before adding the suffix: happy + ness = happiness.",
      ),
    (n) =>
      choice(
        n,
        "Why is 'hopping' spelt with double p, but 'hoping' with one p?",
        [
          "'Hop' has a short vowel and ends in one consonant, so the p doubles; 'hope' ends in e, so the e is dropped",
          "Both words could be spelt either way",
          "Words about jumping always have a double letter",
          "'Hoping' is short for 'hopeful'",
        ],
        0,
        "hop (short o) + ing doubles the last consonant: hopping. hope (long o, ends in e) drops the e: hoping. The double p keeps the vowel short.",
      ),
  ],
});

/** EN3-VOCAB-01: Tier 2 and Tier 3 words, word parts and precise meanings in context. */
export const VOCAB = levels(5120101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'enormous'?",
        ["tiny", "huge", "noisy", "heavy"],
        1,
        "'Enormous' means very big, so the closest word is 'huge'.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Ancient' means very old.",
        true,
        "Something ancient comes from a very long time ago, like ancient rock art or ancient Egypt.",
      ),
    (n) =>
      choice(
        n,
        "Which word means the opposite of 'generous'?",
        ["kind", "selfish", "giving", "rich"],
        1,
        "A generous person shares freely. The opposite is someone who keeps things for themselves: selfish.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "'The hikers were exhausted after climbing the mountain all day.' What does 'exhausted' mean?",
        ["very tired", "very excited", "lost", "hungry"],
        0,
        "After climbing all day, they would be worn out. 'Exhausted' means very tired.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 'pre-' means before. A preview is a look at something ___ it happens.",
        "before",
        "pre- means before, so a preview is a look before the real thing, like a movie trailer.",
      ),
    (n) =>
      multi(
        n,
        "Which words mean 'very happy'? Choose all that are right.",
        ["delighted", "miserable", "overjoyed", "thrilled", "furious"],
        [0, 2, 3],
        "Delighted, overjoyed and thrilled all mean very happy. Miserable means very sad and furious means very angry.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from least wet to most wet.",
        ["damp", "wet", "drenched"],
        "Damp is a little wet, wet is in the middle, and drenched means soaked right through.",
      ),
    (n) =>
      choice(
        n,
        "In science, what does 'evaporate' mean?",
        ["turn from a liquid into a gas", "turn from a gas into a liquid", "freeze into a solid", "sink to the bottom"],
        0,
        "When a puddle dries up in the sun, the water evaporates: it turns from a liquid into a gas called water vapour.",
      ),
    (n) =>
      choice(
        n,
        "In which sentence does 'bark' mean the outer covering of a tree?",
        [
          "The dog's bark woke the baby.",
          "Koalas grip the rough bark of the gum tree.",
          "I heard a fox bark in the night.",
          "The coach began to bark orders at the team.",
        ],
        1,
        "Only the koala sentence is about a tree. In the others, 'bark' is a sound or a sharp way of speaking.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "'Bio' means life and '-logy' means the study of. What is biology?",
        ["the study of living things", "the study of rocks", "the study of the stars", "a book about someone's life"],
        0,
        "Put the parts together: bio (life) + logy (study of) = the study of life, or living things.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The suffix '-less' means without. Write one word that means 'without fear'.",
        "fearless",
        "fear + less = fearless, which means without fear.",
      ),
    (n) =>
      choice(
        n,
        "Which word best describes how the tired soldier walked, slowly dragging his heavy boots through the mud?",
        ["trudged", "skipped", "sprinted", "strolled"],
        0,
        "'Trudged' means walked slowly and heavily because you are tired. Skipped and sprinted are fast, and strolled is relaxed.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The council's plan to cut down the old fig tree was controversial. Some residents cheered, while others wrote angry letters.' What does 'controversial' mean here?",
        ["causing strong disagreement", "very expensive", "popular with everyone", "decided very quickly"],
        0,
        "Some people cheered and others were angry, so people disagreed strongly. That is what 'controversial' means.",
      ),
    (n) =>
      multi(
        n,
        "The Latin root 'port' means carry. In which words does 'port' mean carry? Choose all that are right.",
        ["transport", "portable", "export", "porridge", "portrait"],
        [0, 1, 2],
        "Transport carries things across, portable means able to be carried, and export means to carry goods out of a country. Porridge and portrait just happen to share the letters.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'Visible' means able to be seen. Something that cannot be seen is ___.",
        "invisible",
        "The prefix in- means not, so in + visible = invisible, not able to be seen.",
      ),
  ],
});

const LOST_HAT = {
  title: "The Lost Hat",
  text:
    "Mia's grandfather had worn the same faded green hat to every cricket match for forty years. So when a gust of wind snatched it off his head at the Bathurst oval, Mia did not stop to think. She leapt over the fence and raced across the grass.\n\n" +
    "The hat tumbled past the boundary rope, past the scoreboard and towards the creek. Mia dived. Her fingers closed around the brim just before it reached the water.\n\n" +
    'When she trotted back, muddy from knee to elbow, the whole crowd clapped. Grandad put the hat back on his head and grinned. "Best catch of the day," he said.',
};

const ECHIDNAS = {
  title: "Echidnas",
  text:
    "The echidna is one of only a few mammals in the world that lay eggs. It is found all over Australia, from snowy mountains to hot deserts.\n\n" +
    "An echidna is covered in sharp spines, which protect it from predators. When it is frightened, it curls into a ball or digs quickly into the soil until only its spines show.\n\n" +
    "Echidnas have no teeth. Instead, they use a long, sticky tongue to catch ants and termites. A female lays a single soft egg and keeps it in a pouch on her belly. After about ten days, a tiny baby called a puggle hatches.",
};

const CROSSING_LETTER = {
  title: "A Letter to the Editor",
  text:
    "Dear Editor,\n\n" +
    "Every afternoon, hundreds of children cross Pacific Street to get to Seaview Public School. There is no pedestrian crossing, and cars often speed down the hill.\n\n" +
    "Last week my younger brother had to jump back onto the footpath when a ute came around the corner too fast. He was lucky. Next time, someone might not be.\n\n" +
    "A crossing with a lollipop person would cost far less than a hospital visit. Parents, teachers and students all agree it is needed. I urge the council to act before the end of Term 4, not after an accident.\n\n" +
    "Yours sincerely,\nAva Nguyen, Year 5",
};

const CARNIVAL = {
  title: "The Swimming Carnival",
  text:
    "Jayden had been dreading the swimming carnival for weeks. While the other kids talked about ribbons and races, he stared at his lunchbox and said nothing.\n\n" +
    "On the day, he sat at the very back of the stand with his towel around his shoulders, even though the sun was blazing. When his name was called for the 50 metre freestyle, his stomach dropped.\n\n" +
    "He stood on the block. The water looked a long way down. Then he spotted Ms Patel at the end of the lane, giving him a thumbs-up.\n\n" +
    'Jayden came last, a whole lap behind. But when he climbed out, his friend Leo was waiting with a high five. "You finished," Leo said. "Last year you didn\'t even get in."\n\n' +
    "Jayden looked at the water, then at Leo, and for the first time all day he smiled.",
};

const WATER_CYCLE = {
  title: "The Water Cycle",
  text:
    "Water on Earth is always moving in a giant loop called the water cycle.\n\n" +
    "First, the sun heats water in oceans, rivers and lakes. The water evaporates, which means it turns into an invisible gas called water vapour and rises into the air.\n\n" +
    "As the water vapour rises, it cools. The cooling makes it condense into tiny droplets, and millions of these droplets gather together to form clouds.\n\n" +
    "When the droplets join and become too heavy, they fall as rain, hail or snow. This is called precipitation.\n\n" +
    "Finally, the water flows across the land and into creeks, rivers and the ocean, where the sun warms it again. The cycle never stops, so the water you drink today might once have fallen on a dinosaur.",
};

/** EN3-RECOM-01: reading for main idea, inference, author's purpose and text structure. */
export const READING = levels(5130101, {
  very_easy: [
    (n) =>
      read(
        LOST_HAT,
        choice(
          n,
          "What did the wind blow away?",
          ["Grandad's hat", "Mia's shoe", "the scoreboard", "a cricket ball"],
          0,
          "The first paragraph says a gust of wind snatched the hat off Grandad's head.",
        ),
      ),
    (n) =>
      read(
        LOST_HAT,
        trueFalse(
          n,
          "Mia caught the hat before it reached the water.",
          true,
          "The text says her fingers closed around the brim 'just before it reached the water'.",
        ),
      ),
    (n) =>
      read(
        ECHIDNAS,
        typed("short_answer", n, "What is a baby echidna called?", "puggle", "The last sentence says the tiny baby is called a puggle."),
      ),
  ],
  easy: [
    (n) =>
      read(
        LOST_HAT,
        choice(
          n,
          "Why did the crowd clap?",
          ["Mia had saved the hat with a great dive", "a batter hit a six", "Grandad won the match", "the rain had stopped"],
          0,
          "The crowd clapped when Mia came back muddy with the hat. Grandad calls it the 'best catch of the day', so they were cheering her dive.",
        ),
      ),
    (n) =>
      read(
        ECHIDNAS,
        choice(
          n,
          "What is the main idea of the second paragraph?",
          ["how echidnas protect themselves", "what echidnas eat", "where echidnas live", "how baby echidnas hatch"],
          0,
          "The second paragraph is all about spines, curling into a ball and digging in: ways echidnas stay safe from predators.",
        ),
      ),
    (n) =>
      read(
        CROSSING_LETTER,
        choice(
          n,
          "What is Ava's main purpose in writing this letter?",
          [
            "to persuade the council to build a crossing",
            "to tell a funny story about her brother",
            "to explain how to cross a road",
            "to describe Seaview Public School",
          ],
          0,
          "Ava gives reasons and ends with 'I urge the council to act'. She wants to persuade the council to put in a crossing.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        ECHIDNAS,
        multi(
          n,
          "Which facts are stated in the text? Choose all that are right.",
          [
            "Echidnas lay eggs.",
            "Echidnas eat ants and termites.",
            "Echidnas live only in deserts.",
            "Echidnas have sharp teeth.",
            "A puggle hatches after about ten days.",
          ],
          [0, 1, 4],
          "The text says echidnas lay eggs, eat ants and termites, and a puggle hatches after about ten days. It says they live in mountains and deserts, and that they have no teeth.",
        ),
      ),
    (n) =>
      read(
        CROSSING_LETTER,
        choice(
          n,
          "Why does Ava include the story about her younger brother?",
          [
            "to show that the danger is real",
            "to show that her brother is a fast runner",
            "to complain about utes",
            "to fill up space in the letter",
          ],
          0,
          "A true story about a near miss proves that speeding cars really are a danger, which makes her argument stronger.",
        ),
      ),
    (n) =>
      read(
        CARNIVAL,
        choice(
          n,
          "How does Jayden feel at the start of the story?",
          ["worried", "excited", "bored", "angry"],
          0,
          "He had been 'dreading' the carnival and said nothing while others talked about it. Dreading means feeling worried about something coming up.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        CROSSING_LETTER,
        choice(
          n,
          "'He was lucky. Next time, someone might not be.' What effect do these short sentences have?",
          [
            "They make the warning feel serious and a little scary.",
            "They make the letter sound funny.",
            "They explain how the crossing would work.",
            "They show that Ava is unsure what happened.",
          ],
          0,
          "Short sentences make the reader stop and think. Saying someone 'might not be' lucky next time hints that a child could be hurt.",
        ),
      ),
    (n) =>
      read(
        CARNIVAL,
        choice(
          n,
          "Jayden kept his towel around his shoulders 'even though the sun was blazing'. What does this suggest?",
          [
            "He was hiding because he felt nervous, not because he was cold.",
            "He had forgotten to bring sunscreen.",
            "The pool water was freezing.",
            "He wanted to dry his hair.",
          ],
          0,
          "It was hot, so he didn't need the towel for warmth. Wrapping himself up at the back of the stand shows he wanted to hide.",
        ),
      ),
    (n) =>
      read(
        WATER_CYCLE,
        ordering(
          n,
          "Put these stages in the order they happen in the text.",
          [
            "Water evaporates.",
            "Water vapour condenses into clouds.",
            "Rain, hail or snow falls.",
            "Water flows back to the ocean.",
          ],
          "The signal words help: First the water evaporates, then it cools and condenses, then precipitation falls, and Finally it flows back to the sea.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        CARNIVAL,
        choice(
          n,
          "Why does Jayden smile at the end, even though he came last?",
          [
            "He realises that just finishing the race was a big step for him.",
            "He thinks he will get a ribbon.",
            "He is glad the carnival is over.",
            "He thinks Leo is teasing him.",
          ],
          0,
          "Leo reminds him that last year he 'didn't even get in'. Jayden sees that finishing was a real achievement for him.",
        ),
      ),
    (n) =>
      read(
        WATER_CYCLE,
        choice(
          n,
          "How is this text mainly organised?",
          [
            "as a sequence of stages in a cycle",
            "as a problem and its solution",
            "as a comparison of two things",
            "as a list of opinions",
          ],
          0,
          "Words like First, As, When and Finally take us through each stage in order, and the last stage leads back to the first.",
        ),
      ),
    (n) =>
      read(
        WATER_CYCLE,
        choice(
          n,
          "Why does the author end with the idea that your drinking water might once have fallen on a dinosaur?",
          [
            "to show in an interesting way that the same water has been recycled for millions of years",
            "to prove that dinosaurs drank rainwater",
            "to warn readers not to drink tap water",
            "to start a new story about dinosaurs",
          ],
          0,
          "The cycle 'never stops', so water is used again and again. The dinosaur idea is a surprising way to make readers picture how long that has been going on.",
        ),
      ),
  ],
});

const STORM_POEM = {
  title: "Storm Over the Paddock",
  text:
    "The sky pulled on its blackest coat\nand growled across the hill.\nThe gum trees bowed their heads in fear,\nthe magpies sat stock-still.\n\n" +
    "Then lightning cracked its silver whip,\nthe rain came marching through,\nand drummed upon the iron roof\nuntil the world was new.",
};

const OLD_KEY = {
  title: "The Old Key",
  text:
    "Ellie found the key at the bottom of Nana's sewing tin, wrapped in a faded hanky. It was heavy and brown with rust, and it did not fit any door in the house.\n\n" +
    '"That was the key to our farmhouse at Gundagai," Nana said softly, turning it over in her wrinkled hands. "We had to sell the farm in the drought. I kept the key so I\'d never forget where I came from."\n\n' +
    "Ellie watched Nana's eyes go far away, as if she could see the paddocks and the windmill again.\n\n" +
    "That night, Ellie threaded the key onto a ribbon and hung it beside Nana's bed. In the morning, Nana touched it and smiled.",
};

const NIGHT_MARKET = {
  title: "The Night Market",
  text:
    "Mum gripped my hand as we squeezed into the night market. Lanterns swung above us like tiny red moons. Smoke curled from the satay stalls, and the air smelt of peanuts, chilli and burnt sugar.\n\n" +
    "A man flipped noodles so high they almost touched the lanterns. Someone's baby wailed. Somewhere, a drum thumped like a giant heartbeat.\n\n" +
    "I bit into a hot dumpling and the juice burned my tongue, but I didn't care. For the first time since we had moved to Cabramatta, the noise didn't scare me. It felt like a party that had been waiting for us to arrive.",
};

/** EN3-UARL-01: narrative, character, imagery, symbol and connotation in literature. */
export const LITERATURE = levels(5130201, {
  very_easy: [
    (n) =>
      read(
        STORM_POEM,
        choice(
          n,
          "In the poem, the sky 'growled across the hill'. What is the sky being made to sound like?",
          ["an angry animal", "a happy child", "a quiet river", "a ringing bell"],
          0,
          "Animals like dogs growl when they are angry, so the poet makes the stormy sky sound fierce and angry.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'Slim' and 'skinny' mean nearly the same thing, but 'slim' usually sounds more positive.",
        true,
        "Words can have the same meaning but a different feeling, called connotation. 'Slim' sounds like a compliment; 'skinny' can sound like too thin.",
      ),
    (n) =>
      read(
        NIGHT_MARKET,
        typed(
          "short_answer",
          n,
          "'Lanterns swung above us like tiny red moons.' What kind of figurative language is this?",
          ["simile", "a simile"],
          "It compares the lanterns to moons using the word 'like', so it is a simile.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        STORM_POEM,
        multi(
          n,
          "Which phrases give the weather the actions of a person or animal? Choose all that are right.",
          ["The sky pulled on its blackest coat", "growled across the hill", "the rain came marching through", "upon the iron roof"],
          [0, 1, 2],
          "Pulling on a coat, growling and marching are things people or animals do. This is personification. 'Upon the iron roof' just tells us where.",
        ),
      ),
    (n) =>
      read(
        OLD_KEY,
        choice(
          n,
          "What does the key stand for, or symbolise, for Nana?",
          ["her memories of the farm and her old home", "a lost treasure chest", "a new house she will buy", "her sewing hobby"],
          0,
          "Nana says she kept it 'so I'd never forget where I came from'. The key doesn't open anything now; it stands for her memories of home.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these parts of a narrative in the usual order.",
        ["orientation", "complication", "climax", "resolution"],
        "A narrative introduces the characters and setting (orientation), then a problem appears (complication), builds to the most exciting point (climax), and is sorted out (resolution).",
      ),
  ],
  medium: [
    (n) =>
      read(
        STORM_POEM,
        choice(
          n,
          "What mood does the last line, 'until the world was new', create?",
          ["fresh and hopeful", "angry and frightening", "sad and lonely", "bored and sleepy"],
          0,
          "After all the growling and cracking, the storm ends with the world feeling washed clean and 'new', which is fresh and hopeful.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'The wind whispered through the trees' gives the wind a human action. This technique is called ___.",
        "personification",
        "Whispering is something people do. Giving a non-human thing a human action is personification.",
      ),
    (n) =>
      read(
        NIGHT_MARKET,
        choice(
          n,
          "'Somewhere, a drum thumped like a giant heartbeat.' What does this image suggest about the market?",
          ["It feels alive and full of energy.", "It is quiet and empty.", "Someone is sick.", "The music is too soft to hear."],
          0,
          "A heartbeat is the sign of something living. Comparing the drum to a giant heartbeat makes the whole market seem alive.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        OLD_KEY,
        choice(
          n,
          "Ellie hangs the key on a ribbon beside Nana's bed. What does this action show about Ellie?",
          [
            "She is caring and understands how much the key means to Nana.",
            "She wants to keep the key for herself.",
            "She thinks the key is worth a lot of money.",
            "She is bored and looking for something to do.",
        ],
          0,
          "Writers show character through actions. Ellie puts the key where Nana can see it every day, which shows she cares and understands.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which word gives the most positive feeling about someone who is careful with money?",
        ["thrifty", "stingy", "mean", "tight-fisted"],
        0,
        "All four words describe someone who doesn't spend much, but 'thrifty' sounds sensible and good. The others sound unkind.",
      ),
    (n) =>
      multi(
        n,
        "A writer wants readers to feel that the bush at night is scary. Which words would help? Choose all that are right.",
        ["looming", "gnarled", "shadowy", "sunny", "cheerful"],
        [0, 1, 2],
        "Looming, gnarled and shadowy all have dark, uneasy connotations. Sunny and cheerful would make the bush feel friendly.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        NIGHT_MARKET,
        choice(
          n,
          "How has the narrator changed by the end of the story?",
          [
            "At first the noise of the new place scared them, but now it feels welcoming.",
            "They started off happy but end up scared.",
            "They have learnt how to cook dumplings.",
            "They want to move away from Cabramatta.",
          ],
          0,
          "'For the first time' the noise didn't scare them, so it used to. Now it feels like a party 'waiting for us', which shows they feel welcome.",
        ),
      ),
    (n) =>
      read(
        OLD_KEY,
        choice(
          n,
          "Why might the writer have made the key rusty and not able to fit any door?",
          [
            "to show that the farm is gone, but Nana's memories of it remain",
            "to show that Nana is careless with her things",
            "to make the story about a mystery door",
            "to show that keys are hard to look after",
          ],
          0,
          "The key can't open anything now because the farm was sold long ago, yet Nana still treasures it. That makes it a symbol of the past living on in her memory.",
        ),
      ),
    (n) =>
      read(
        OLD_KEY,
        choice(
          n,
          "You are rewriting 'The Old Key' from Nana's point of view. Which opening sentence fits best?",
          [
            "When my granddaughter found the old key in my sewing tin, I could almost smell the paddocks again.",
            "Ellie found a key and gave it to her nana.",
            "Once upon a time there was a magic key that opened every door.",
            "Keys are made of metal and can rust if they get wet.",
          ],
          0,
          "Nana's point of view needs 'I' and 'my', and it should keep the same idea of the key bringing back memories of the farm.",
        ),
      ),
  ],
});

const KOOKABURRA_FABLE = {
  title: "The Kookaburra and the Emu",
  text:
    'Kookaburra loved to laugh at the other animals. "Look at Emu," he cackled from his branch. "Such long legs, and she can\'t even fly!"\n\n' +
    "Emu said nothing. She kept walking, day after day, searching for water as the dry season dragged on.\n\n" +
    "Weeks later, the creek beside Kookaburra's tree dried up. He flew in circles, thirsty and lost, until he spotted Emu striding across the plain. He followed her all the way to a hidden waterhole.\n\n" +
    "As he drank, Kookaburra did not laugh at all.",
};

const SKATE_PARK = {
  title: "Two Views of the Skate Park",
  text:
    "Leo, aged 11: The new skate park is the best thing to happen to Tamworth in years. Before, we skated in the shopping centre car park and got told off. Now we have a safe place to practise, and kids from all over town are making new friends.\n\n" +
    "Mrs Barker, neighbour: Since the skate park opened beside my house, I cannot sit in my garden in peace. The clatter of boards goes on until dark, and rubbish blows into my yard. I am not against young people having fun, but it should have been built away from homes.",
};

const LANDCARE_AD = {
  title: "Join the Junior Landcare Club!",
  text:
    "Do you love the bush? Do you want to make a real difference? Join the Junior Landcare Club!\n\n" +
    "Every second Saturday we plant native trees along Wollombi Creek. Last year our members planted over 2000 seedlings, and platypus have now been seen in the creek for the first time in ten years.\n\n" +
    "According to local ranger Sam Ellis, 'Young volunteers have done more for this creek than anyone expected.'\n\n" +
    "Bring a hat, a water bottle and your friends. The bush needs you!",
};

/** EN3-UARL-02: genre, theme, perspective and context, argument and authority. */
export const GENRE_THEME = levels(5130301, {
  very_easy: [
    (n) =>
      read(
        KOOKABURRA_FABLE,
        choice(
          n,
          "What kind of story is this most like?",
          ["a fable", "a news report", "a recipe", "a diary entry"],
          0,
          "A fable is a short story with talking animals that teaches a lesson, just like this one.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A recount usually tells events in the order they happened.",
        true,
        "Recounts retell what happened, so they go in time order, often with words like first, next and later.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A story set in the future with robots and spaceships belongs to which genre?",
        ["science fiction", "sci-fi", "scifi", "sci fi"],
        "Stories about the future, space travel and imagined technology are science fiction.",
      ),
  ],
  easy: [
    (n) =>
      read(
        KOOKABURRA_FABLE,
        choice(
          n,
          "What is the theme, or message, of this fable?",
          [
            "Don't make fun of others, because everyone has their own strengths.",
            "Birds are better than emus.",
            "Always fly when you are thirsty.",
            "Creeks dry up in summer.",
          ],
          0,
          "Kookaburra mocks Emu for not flying, but Emu's long walking legs are what save him. The lesson is not to make fun of others.",
        ),
      ),
    (n) =>
      read(
        SKATE_PARK,
        multi(
          n,
          "Which reasons does Leo give for liking the skate park? Choose all that are right.",
          ["It gives kids a safe place to skate.", "Kids are making new friends.", "It is very quiet.", "It keeps rubbish out of yards."],
          [0, 1],
          "Leo says it is a safe place to practise and kids are making new friends. The other two are not his points (Mrs Barker says the opposite).",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of a persuasive text in the usual order.",
        ["a statement of your opinion", "arguments with evidence", "a conclusion that restates your opinion"],
        "A persuasive text states the writer's position, backs it up with arguments, then sums up by repeating the position strongly.",
      ),
  ],
  medium: [
    (n) =>
      read(
        KOOKABURRA_FABLE,
        choice(
          n,
          "Why does the story end with 'Kookaburra did not laugh at all'?",
          [
            "to show that Kookaburra has learnt his lesson",
            "to show that Kookaburra has a sore throat",
            "to show that the water tasted bad",
            "to show that Emu told a joke",
          ],
          0,
          "Kookaburra laughed at Emu at the start. Not laughing at the end shows he now respects her and has learnt the fable's lesson.",
        ),
      ),
    (n) =>
      read(
        SKATE_PARK,
        choice(
          n,
          "Why do Leo and Mrs Barker see the skate park so differently?",
          [
            "Leo uses the park, while Mrs Barker lives right next to it and has to put up with the noise.",
            "Leo is telling the truth and Mrs Barker is not.",
            "They are talking about two different skate parks.",
            "Mrs Barker has never seen the skate park.",
        ],
          0,
          "A person's perspective depends on their situation. Leo gains a safe place to skate; Mrs Barker loses her peace and quiet.",
        ),
      ),
    (n) =>
      read(
        LANDCARE_AD,
        choice(
          n,
          "Why does the writer include the words of ranger Sam Ellis?",
          [
            "A ranger is an expert, so his words make the club sound more believable.",
            "Sam Ellis wrote the whole advertisement.",
            "to tell readers where to buy a hat",
            "to make the ad longer",
          ],
          0,
          "Quoting someone with authority, like a ranger who works in the bush, makes readers trust the claims more.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        SKATE_PARK,
        trueFalse(
          n,
          "Mrs Barker says young people should not be allowed to have fun.",
          false,
          "She says 'I am not against young people having fun'. Her complaint is about where the park was built, not about fun.",
        ),
      ),
    (n) =>
      read(
        LANDCARE_AD,
        multi(
          n,
          "Which persuasive techniques does the advertisement use? Choose all that are right.",
          ["rhetorical questions", "a quote from an expert", "facts and figures", "a funny joke"],
          [0, 1, 2],
          "It opens with questions ('Do you love the bush?'), quotes a ranger, and gives figures like 2000 seedlings. There is no joke.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You are writing a report about how many koalas live in NSW. Which source would be most reliable?",
        [
          "a NSW Government wildlife survey",
          "a comment on a social media post",
          "a picture book about a koala",
          "an advertisement for a koala toy",
        ],
        0,
        "A government survey is written by experts who count koalas carefully. The others are opinions, stories or ads trying to sell something.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        LANDCARE_AD,
        choice(
          n,
          "Which sentence from the advertisement is a fact that could be checked, rather than an opinion?",
          [
            "Last year our members planted over 2000 seedlings.",
            "The bush needs you!",
            "Do you want to make a real difference?",
            "Bring a hat, a water bottle and your friends.",
          ],
          0,
          "You could check the club's records to see how many seedlings were planted. The others are a feeling, a question and an instruction.",
        ),
      ),
    (n) =>
      read(
        KOOKABURRA_FABLE,
        choice(
          n,
          "You want to retell this fable as a modern story set at school, with the same theme. Which plot fits best?",
          [
            "A girl teases a classmate for being slow at running, then needs his help when she can't solve a maths problem.",
            "Two friends go to the beach and build a sandcastle.",
            "A boy finds a lost dog and returns it to its owner.",
            "A class goes on an excursion to a museum.",
          ],
          0,
          "The theme is not to mock others because everyone has strengths. Only the first plot has someone teasing another person, then needing that person's strength.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A story about the First Fleet arriving at Sydney Cove in 1788 is told by a Gadigal boy watching from the shore. How would it most likely differ from the same event told by a British sailor?",
        [
          "It would show strangers arriving uninvited on his people's land.",
          "It would describe the long voyage from England.",
          "It would be exactly the same.",
          "It would only list the names of the ships.",
        ],
        0,
        "Perspective depends on who is telling. The Gadigal people already lived at Sydney Cove, so for the boy this was strangers arriving on his Country, not the end of a voyage.",
      ),
  ],
});

/** EN3-CWT-01: text features, complex sentences, clauses, modal verbs, apostrophes, speech and cohesion. */
export const WRITING = levels(5150101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is the conjunction in this sentence? 'I was hungry, so I made a sandwich.'",
        ["hungry", "so", "made", "sandwich"],
        1,
        "A conjunction joins two ideas. 'So' joins 'I was hungry' and 'I made a sandwich'.",
      ),
    (n) => trueFalse(n, "'It's' is short for 'it is'.", true, "The apostrophe in 'it's' shows a letter is missing: it is becomes it's."),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The dog belongs to Sam. It is ___ dog.",
        ["Sam's", "Sam’s"],
        "To show something belongs to one person, add an apostrophe and s: Sam's dog.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          '"Let\'s go to the beach," said Dad.',
          '"Let\'s go to the beach" said Dad.',
          "Let's go to the beach, said Dad.",
          '"Let\'s go to the beach," said Dad',
        ],
        0,
        "Speech marks go around the words spoken, a comma goes before the closing speech mark, and the sentence ends with a full stop.",
      ),
    (n) =>
      choice(
        n,
        "Which word is the modal verb in this sentence? 'You must wear a hat at recess.'",
        ["wear", "must", "hat", "recess"],
        1,
        "Modal verbs show how certain or necessary something is, like must, should, could and might. Here it is 'must'.",
      ),
    (n) =>
      choice(
        n,
        "Which feature belongs in an information report rather than a narrative?",
        ["subheadings and facts", "a complication and resolution", "a main character's feelings", "a 'once upon a time' opening"],
        0,
        "Information reports give facts and are organised with subheadings. The other features belong in stories.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "The bags belong to three girls. Which is correct?",
        ["the girl's bags", "the girls' bags", "the girls bags", "the girls's bags"],
        1,
        "'Girls' is a plural ending in s, so just add an apostrophe after the s: the girls' bags.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a paragraph.",
        [
          "Kangaroos are well suited to life in the Australian outback.",
          "Their powerful back legs let them hop long distances using little energy.",
          "They can also go for a long time without drinking water.",
          "These features help kangaroos survive in a hot, dry land.",
        ],
        "A paragraph starts with a topic sentence, adds supporting details (also is a clue it comes later), and ends by summing up.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Change the verb to past tense: 'Yesterday she ___ to the bus stop.' (run)",
        "ran",
        "'Run' is an irregular verb. Its past tense is 'ran', not 'runned'.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which are complex sentences (they have a main clause and a dependent clause)? Choose all that are right.",
        [
          "Because it was raining, we stayed inside.",
          "We stayed inside.",
          "The dog barked when the postie arrived.",
          "I like apples and pears.",
        ],
        [0, 2],
        "'Because it was raining' and 'when the postie arrived' are dependent clauses that can't stand alone, so those sentences are complex.",
      ),
    (n) =>
      choice(
        n,
        "Tom said, \"I am tired.\" Which sentence reports this correctly?",
        ["Tom said that he was tired.", "Tom said that I am tired.", 'Tom said that "he was tired."', "Tom said, he is tired."],
        0,
        "Reported speech has no speech marks, changes 'I' to 'he', and usually moves the verb back in time: am becomes was.",
      ),
    (n) =>
      choice(
        n,
        "Which connective best fills the gap? 'Koalas eat eucalyptus leaves. ___, these leaves give them very little energy, so they sleep for up to 20 hours a day.'",
        ["However", "For example", "Firstly", "Meanwhile"],
        0,
        "The second sentence turns to a problem with the leaves, so a contrast word is needed: However.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these modal verbs in order from least certain to most certain.",
        ["might", "should", "must"],
        "'Might' means it is possible, 'should' means it is expected, and 'must' means it is certain or required.",
      ),
    (n) =>
      choice(
        n,
        "In 'Although the bus was late, Priya made it to school on time,' which part is the main clause?",
        ["Although the bus was late", "Priya made it to school on time", "the bus was late", "Although"],
        1,
        "The main clause makes sense on its own: 'Priya made it to school on time.' 'Although the bus was late' needs the rest of the sentence.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          '"Have you seen the twins\' bikes?" asked Mr Lee.',
          '"Have you seen the twin\'s bikes"? asked Mr Lee.',
          '"Have you seen the twins bikes?" asked Mr Lee.',
          '"Have you seen the twins\' bikes," asked Mr Lee?',
        ],
        0,
        "The bikes belong to two twins, so the apostrophe goes after the s (twins'). The question mark belongs inside the speech marks because the spoken words are the question.",
      ),
  ],
});
