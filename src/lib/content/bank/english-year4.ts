/**
 * Year 4 English: 15 questions for each Stage 2 standard (NESA outcome), three at each
 * level from very easy to very hard. Harder than Year 3 on the same outcomes. Reading and
 * literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN2-SPELL-01: spelling generalisations: tricky words, plurals, prefixes, suffixes and homophones. */
export const SPELLING = levels(4130101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["beautiful", "beatiful", "beautifull", "butiful"],
        0,
        "'Beautiful' has 'beau' at the start (b-e-a-u) and the suffix -ful with one l at the end.",
      ),
    (n) => trueFalse(n, "The plural of 'bus' is 'buses'.", true, "Words that end in s add -es to make the plural: one bus, two buses."),
    (n) => typed("fill_blank", n, "help + ful = ___", "helpful", "Keep the base word 'help' and add -ful with one l: helpful."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'party'.",
        "parties",
        "'Party' ends in a consonant then y, so change the y to i and add -es: parties.",
      ),
    (n) =>
      choice(
        n,
        "Which word correctly finishes the sentence? 'Our team ___ the game on Saturday.'",
        ["one", "won", "wun", "wone"],
        1,
        "'Won' is the past tense of 'win'. 'One' sounds the same but is the number 1.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to make the word 'unhelpful'.",
        ["un", "help", "ful"],
        "The prefix 'un' goes at the front, then the base word 'help', then the suffix 'ful' at the end.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ing' to the word 'begin'.",
        "beginning",
        "The last part of 'begin' is stressed and has a short vowel before one consonant, so double the n: beginning.",
      ),
    (n) =>
      choice(
        n,
        "What is the plural of 'knife'?",
        ["knifes", "knives", "knifs", "knivs"],
        1,
        "Many words ending in -fe change to -ves in the plural: one knife, two knives.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Add a prefix to make a word that means 'go out of sight': ___appear",
        "dis",
        "The prefix 'dis' means the opposite of. Disappear is the opposite of appear.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses the homophones correctly?",
        [
          "The knight rode through the night.",
          "The night rode through the knight.",
          "The knight rode threw the night.",
          "The nite rode through the knight.",
        ],
        0,
        "A 'knight' is a soldier on a horse and 'night' is when it is dark. 'Through' means in one side and out the other; 'threw' is the past of 'throw'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'est' to the word 'happy'.",
        "happiest",
        "'Happy' ends in a consonant then y, so change the y to i before adding -est: happiest.",
      ),
    (n) =>
      multi(
        n,
        "Which words are spelt correctly? Choose all that are right.",
        ["necessary", "neccessary", "separate", "seperate", "February"],
        [0, 2, 4],
        "Necessary has one c and two s's. Separate has 'a rat' in the middle. February has an r after the b.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word correctly completes the sentence? 'The lifeguard's ___ was clear: always swim between the flags.'",
        ["advice", "advise", "adviced", "advize"],
        0,
        "'Advice' (with c) is a noun, a thing you give. 'Advise' (with s) is the verb, the action of giving advice.",
      ),
    (n) => typed("fill_blank", n, "gentle + ly = ___", "gently", "When a word ends in -le, drop the e and add -y: gentle becomes gently."),
    (n) =>
      trueFalse(
        n,
        "The word 'disappointed' is spelt with one s and two p's.",
        true,
        "It is the prefix 'dis' (one s) added to 'appoint' (two p's): dis + appointed = disappointed.",
      ),
  ],
});

/** EN2-VOCAB-01: synonyms, antonyms, context clues, word parts, subject words and shades of meaning. */
export const VOCAB = levels(4140101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'quick'?",
        ["fast", "slow", "quiet", "heavy"],
        0,
        "'Quick' and 'fast' are synonyms: they mean the same thing.",
      ),
    (n) =>
      trueFalse(n, "'Ancient' and 'modern' are antonyms.", true, "Antonyms are opposites. Ancient means very old and modern means new."),
    (n) =>
      choice(
        n,
        "What is the opposite of 'generous'?",
        ["selfish", "kind", "giving", "friendly"],
        0,
        "A generous person shares. A selfish person keeps things for themselves, so 'selfish' is the opposite.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "'The thirsty hikers were delighted to find a cool stream.' What does 'delighted' mean?",
        ["very pleased", "very tired", "lost", "angry"],
        0,
        "Thirsty hikers would be happy to find water, so 'delighted' means very pleased.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The opposite of 'include' is ___.",
        ["exclude", "leave out"],
        "To include means to let in. To exclude means to leave out. The prefixes in- and ex- help show the opposite.",
      ),
    (n) =>
      multi(
        n,
        "Which words belong to the same word family as 'friend'? Choose all that are right.",
        ["friendly", "friendship", "unfriendly", "fried", "frighten"],
        [0, 1, 2],
        "Friendly, friendship and unfriendly all have the base word 'friend'. 'Fried' and 'frighten' just look similar.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from quietest to loudest.",
        ["silent", "quiet", "loud", "deafening"],
        "Silent means no sound at all. Quiet is a little sound, loud is a lot, and deafening is so loud it hurts your ears.",
      ),
    (n) =>
      choice(
        n,
        "'The scientist observed the ants for an hour and wrote notes about everything they did.' What does 'observed' mean?",
        ["watched carefully", "stepped on", "fed", "ignored"],
        0,
        "She wrote notes about everything the ants did, so she must have watched them carefully.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What word starting with 'a' means 'the person who wrote a book'?",
        "author",
        "The author is the person who writes a book. Their name is usually on the front cover.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "In geography, what is a 'peninsula'?",
        ["land almost surrounded by water", "a very tall mountain", "a large lake", "a dry desert"],
        0,
        "A peninsula is land with water on most sides but still joined to the mainland, like Cape York in Queensland.",
      ),
    (n) =>
      multi(
        n,
        "Which words could replace 'good' to make this sentence more precise? 'It was a good movie.' Choose all that are right.",
        ["thrilling", "hilarious", "fascinating", "went", "table"],
        [0, 1, 2],
        "Thrilling, hilarious and fascinating are describing words that tell exactly what kind of good. 'Went' and 'table' are not describing words.",
      ),
    (n) =>
      choice(
        n,
        "The prefix 'pre' means 'before'. What does 'preview' mean?",
        ["to see before", "to see again", "to not see", "to see far away"],
        0,
        "'Pre' means before and 'view' means see, so a preview is seeing something before everyone else.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word best fits? 'After losing the grand final by one goal, the netball team felt ___.'",
        ["devastated", "content", "cheerful", "bored"],
        0,
        "Losing a grand final by just one goal would feel terrible. 'Devastated' means extremely upset, which fits best.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from least likely to most likely.",
        ["impossible", "unlikely", "likely", "certain"],
        "Impossible means it can't happen. Unlikely is a small chance, likely is a good chance, and certain means it will happen.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "'Bio' means 'life' and 'graph' means 'write'. Which word means 'the story of a person's life': 'biography' or 'geography'?",
        "biography",
        "Bio (life) + graph (write) makes biography, a written story of someone's life. Geo means earth, so geography is about the Earth.",
      ),
  ],
});

const BUSH_CAMP = {
  title: "Bush Camp",
  text:
    "On the last weekend of the school holidays, the Nguyen family drove to a campsite in the Blue Mountains. Dad set up the tent while Kim and her little brother Tam gathered sticks for the fire.\n\n" +
    "That night, they toasted marshmallows and listened to the bush. A boobook owl called from a tall tree. Tam had never heard an owl before, and he sat very still so he would not scare it away.\n\n" +
    "In the morning, the family walked to a lookout. Mist filled the valley below like a bowl of white soup. Kim took a photo so she could show her class.",
};

const LYREBIRDS = {
  title: "Superb Lyrebirds",
  text:
    "The superb lyrebird lives in the forests of south-eastern Australia. It is famous for being one of the best copycats in the animal world.\n\n" +
    "A male lyrebird can copy the calls of more than twenty other birds. Some lyrebirds have even copied sounds such as camera clicks and car alarms. The male sings loudly in winter to attract a mate. While he sings, he spreads his long, lacy tail feathers over his head and dances.\n\n" +
    "Lyrebirds spend most of their time on the ground, scratching through leaves for insects, worms and spiders. They can fly, but only for short distances.",
};

const SCIENCE_FAIR = {
  title: "The Science Fair",
  text:
    "Oscar had spent three weeks building a volcano for the science fair. He had painted it brown and green and practised the eruption five times in the backyard.\n\n" +
    "On the morning of the fair, Oscar tripped on the classroom step. The volcano slipped out of his arms and cracked down the middle. His face went pale.\n\n" +
    "Ms Rossi knelt beside him. “We have tape, glue and twenty minutes,” she said. Oscar took a deep breath and nodded.\n\n" +
    "When the judges arrived, a jagged crack still ran down the volcano's side. But when the red foam bubbled out of the top, the crowd cheered. Later, Oscar pinned a second-place ribbon to his shirt.",
};

const RUBY_LETTER = {
  title: "A Letter to Aunty Jo",
  text:
    "Dear Aunty Jo,\n\n" +
    "Thank you for the binoculars! I took them to Lake Macquarie on Sunday with Dad. We sat on the jetty for nearly two hours. My legs went numb, but it was worth it.\n\n" +
    "First we saw pelicans gliding over the water. Then Dad pointed at a big bird sitting on top of a dead tree. Through the binoculars I could see its white head and its sharp, hooked beak. Suddenly it dived into the lake and came up with a fish in its claws!\n\n" +
    "I have started a notebook where I write down every bird I see. So far I have nineteen. Next holidays, can you come with us?\n\n" +
    "Love,\nRuby",
};

const CANE_TOADS = {
  title: "Cane Toads",
  text:
    "Cane toads were brought to Queensland in 1935. Farmers hoped the toads would eat the beetles that were damaging their sugar cane. The plan did not work. The beetles lived high up on the cane stalks, and cane toads cannot climb.\n\n" +
    "With no natural enemies to stop them, the toads spread quickly. A female can lay up to 30 000 eggs at a time. Today, cane toads are found across northern Australia and into New South Wales.\n\n" +
    "Cane toads are poisonous. When a quoll, goanna or snake tries to eat one, it can die. Scientists are now teaching some quolls to avoid toads by feeding them toad sausages that make them feel sick but do not harm them.",
};

/** EN2-RECOM-01: literal and inferential comprehension of stories, letters and information texts. */
export const READING = levels(4150101, {
  very_easy: [
    (n) =>
      read(
        BUSH_CAMP,
        choice(
          n,
          "Where did the Nguyen family go camping?",
          ["the Blue Mountains", "the beach", "their backyard", "the desert"],
          0,
          "The first sentence says they drove to a campsite in the Blue Mountains.",
        ),
      ),
    (n) =>
      read(BUSH_CAMP, trueFalse(n, "Tam had heard an owl many times before.", false, "The text says Tam had never heard an owl before.")),
    (n) =>
      read(
        BUSH_CAMP,
        typed(
          "short_answer",
          n,
          "What did the family toast over the fire?",
          ["marshmallows", "marshmallow"],
          "The second paragraph says, 'That night, they toasted marshmallows.'",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        LYREBIRDS,
        choice(
          n,
          "What is the superb lyrebird famous for?",
          ["copying other sounds", "flying long distances", "building nests in the sea", "eating fish"],
          0,
          "The text says it is one of the best copycats in the animal world. It copies calls and other sounds.",
        ),
      ),
    (n) =>
      read(
        LYREBIRDS,
        typed(
          "fill_blank",
          n,
          "A male lyrebird sings loudly in ___ to attract a mate.",
          "winter",
          "The second paragraph says, 'The male sings loudly in winter to attract a mate.'",
        ),
      ),
    (n) =>
      read(
        LYREBIRDS,
        multi(
          n,
          "Which foods do lyrebirds eat, according to the text? Choose all that are right.",
          ["insects", "worms", "spiders", "seeds", "fish"],
          [0, 1, 2],
          "The last paragraph says they scratch through leaves for insects, worms and spiders. Seeds and fish are not mentioned.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        SCIENCE_FAIR,
        choice(
          n,
          "What does 'His face went pale' tell you about how Oscar felt?",
          ["shocked and upset", "bored", "proud", "sleepy"],
          0,
          "People's faces can go pale when they get a nasty shock. Oscar had just broken the volcano he worked on for weeks.",
        ),
      ),
    (n) =>
      read(
        SCIENCE_FAIR,
        ordering(
          n,
          "Put these events in the order they happened.",
          [
            "Oscar practised the eruption in the backyard.",
            "Oscar tripped on the classroom step.",
            "Oscar and Ms Rossi fixed the volcano.",
            "The red foam bubbled out of the top.",
            "Oscar pinned on a second-place ribbon.",
          ],
          "Follow the time clues: practising came before the fair, the trip happened that morning, then the repair, the eruption, and 'Later' the ribbon.",
        ),
      ),
    (n) =>
      read(
        SCIENCE_FAIR,
        trueFalse(n, "Oscar's volcano won first prize.", false, "Oscar pinned a second-place ribbon to his shirt, so he came second."),
      ),
  ],
  hard: [
    (n) =>
      read(
        RUBY_LETTER,
        choice(
          n,
          "What is the main reason Ruby wrote this letter?",
          [
            "to thank Aunty Jo and tell her how she used the binoculars",
            "to ask Aunty Jo for money",
            "to complain about her sore legs",
            "to explain how to catch fish",
          ],
          0,
          "Ruby starts by saying thank you, then describes the birds she saw with the binoculars Aunty Jo gave her.",
        ),
      ),
    (n) =>
      read(
        RUBY_LETTER,
        choice(
          n,
          "'My legs went numb, but it was worth it.' What does Ruby mean?",
          [
            "Sitting still so long was uncomfortable, but seeing the birds made it worthwhile.",
            "She hurt her legs and wanted to go home.",
            "The jetty was broken.",
            "She did not enjoy watching the birds.",
          ],
          0,
          "'Numb' means she couldn't feel her legs from sitting so long. 'Worth it' means what she saw was better than the discomfort.",
        ),
      ),
    (n) =>
      read(
        RUBY_LETTER,
        multi(
          n,
          "What can you tell about Ruby from her letter? Choose all that are right.",
          ["She is patient.", "She is interested in birds.", "She is grateful to Aunty Jo.", "She dislikes being outdoors."],
          [0, 1, 2],
          "She waited nearly two hours (patient), keeps a bird notebook (interested) and says thank you (grateful). She enjoyed being outside.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        CANE_TOADS,
        choice(
          n,
          "What is the main idea of this text?",
          [
            "Cane toads were brought in to help farmers, but they became a serious problem.",
            "Cane toads are very good climbers.",
            "Quolls love eating sausages.",
            "Sugar cane grows in New South Wales.",
          ],
          0,
          "The text explains why cane toads were brought in, why the plan failed, and the harm they now cause. That is the big idea.",
        ),
      ),
    (n) =>
      read(
        CANE_TOADS,
        typed(
          "fill_blank",
          n,
          "The toads could not eat the beetles because cane toads cannot ___.",
          ["climb", "climb up"],
          "The beetles lived high up on the cane stalks, and the text says cane toads cannot climb, so they could not reach them.",
        ),
      ),
    (n) =>
      read(
        CANE_TOADS,
        choice(
          n,
          "Why would scientists want quolls to feel sick after eating a toad sausage?",
          [
            "So the quolls learn to stay away from real cane toads.",
            "So the quolls grow bigger.",
            "To stop the quolls eating beetles.",
            "Because the sausages are deadly poison.",
          ],
          0,
          "If a quoll feels sick after tasting toad, it learns not to eat toads. That could save its life when it meets a real, poisonous toad.",
        ),
      ),
  ],
});

const BEACH_POEM = {
  title: "Summer Beach",
  text:
    "Seagulls squabble, waves roll in,\nSalty spray upon my skin,\nSandcastles with moats so wide,\nWaiting for the rising tide.\n\n" +
    "Flags are flapping, red and gold,\nLifesavers are brave and bold,\nSwimmers stay between the two,\nUnder skies of brightest blue.\n\n" +
    "Ice-cream dribbles down my hand,\nFootprints wander through the sand,\nSun goes down in orange light.\nGoodbye, beach, and goodnight!",
};

const CORNER_SHOP = {
  title: "The Corner Shop",
  text:
    "Every Saturday, Jarrah helped Mr Patel at the corner shop. He stacked the shelves, swept the floor and always said hello to the customers by name.\n\n" +
    "One afternoon, an old man counted his coins at the counter and frowned. He was twenty cents short for his loaf of bread. Before Mr Patel could speak, Jarrah slipped a coin from his own pocket onto the counter.\n\n" +
    "“Must have rolled under the till,” Jarrah said with a wink.\n\n" +
    "The old man's eyes crinkled. “Thank you, young man,” he said quietly.",
};

const STORM = {
  title: "The Storm",
  text:
    "The sky over the paddock turned the colour of a bruise. Dry grass hissed as the wind raced through it, and the old windmill groaned on its rusty legs.\n\n" +
    "Then the first fat drops hit the tin roof like a handful of stones. Within minutes, the rain was roaring. Water gushed from the gutters, and the thirsty red dirt drank it in.\n\n" +
    "On the verandah, Grandad held out his wrinkled hands and let the rain fill them. After two years of drought, he was laughing.",
};

const TWO_VIEWS = {
  title: "The New Captain",
  text:
    "Maddie: I couldn't believe it when Coach picked Ellie as captain. I had been to every training session all season. Ellie missed three! I kicked my boots across the change room.\n\n" +
    "Ellie: When Coach said my name, my stomach flipped. I had missed three training sessions while Mum was in hospital, and I thought Coach had forgotten about me. I wanted to tell Maddie how nervous I was, but she wouldn't even look at me.",
};

const RIVER_POEM = {
  title: "The River's Song",
  text:
    "I start as a trickle where mountain mist lies,\nI tumble down rocks under wide open skies,\nI wind through the valleys past cattle and sheep,\nI slow in the lowlands, grown wide and grown deep.\n\n" +
    "I carry the rain and I carry the mud,\nI'm gentle in summer, I'm wild in a flood.\nAnd when I am tired from travelling far,\nI rest in the ocean beneath the first star.",
};

/** EN2-UARL-01: character, setting, figurative language, rhyme and rhythm, point of view and theme in literature. */
export const LITERATURE = levels(4150201, {
  very_easy: [
    (n) =>
      read(
        BEACH_POEM,
        choice(
          n,
          "Where is this poem set?",
          ["at the beach", "in a forest", "at school", "in the snow"],
          0,
          "Seagulls, waves, sandcastles and lifesavers all tell us the poem is set at the beach.",
        ),
      ),
    (n) =>
      read(
        BEACH_POEM,
        typed(
          "short_answer",
          n,
          "Which word in the poem rhymes with 'hand'?",
          "sand",
          "'Hand' and 'sand' both end with the sound -and. They are a rhyming pair in the last stanza.",
        ),
      ),
    (n) =>
      read(
        BEACH_POEM,
        trueFalse(
          n,
          "The poem ends as the sun is going down.",
          true,
          "The last stanza says, 'Sun goes down in orange light' and then 'goodnight'.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        CORNER_SHOP,
        choice(
          n,
          "Which word best describes Jarrah?",
          ["generous", "greedy", "lazy", "rude"],
          0,
          "Jarrah used his own money to help the old man, so he is generous.",
        ),
      ),
    (n) =>
      read(
        CORNER_SHOP,
        choice(
          n,
          "Why did Jarrah say the coin 'must have rolled under the till'?",
          [
            "So the old man would not feel embarrassed",
            "Because he really found it on the floor",
            "Because Mr Patel told him to",
            "To trick Mr Patel",
          ],
          0,
          "The coin came from Jarrah's own pocket. Pretending it was found let the old man accept help without feeling embarrassed. The wink is a clue.",
        ),
      ),
    (n) =>
      read(
        CORNER_SHOP,
        multi(
          n,
          "Which details show that Jarrah is a hard worker? Choose all that are right.",
          ["He stacked the shelves.", "He swept the floor.", "He winked.", "He helped every Saturday.", "The old man frowned."],
          [0, 1, 3],
          "Stacking shelves, sweeping and helping every Saturday show hard work. A wink and the old man's frown are not about work.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        STORM,
        choice(
          n,
          "'The sky … turned the colour of a bruise.' What colour is the writer describing?",
          ["dark purple and grey", "bright blue", "sunny yellow", "pure white"],
          0,
          "A bruise is dark purple and grey, like heavy storm clouds. The writer compares the sky to a bruise.",
        ),
      ),
    (n) =>
      read(
        STORM,
        multi(
          n,
          "Which words help you hear the storm? Choose all that are right.",
          ["hissed", "groaned", "roaring", "wrinkled", "red"],
          [0, 1, 2],
          "Hissed, groaned and roaring are sound words. 'Wrinkled' and 'red' describe how things look.",
        ),
      ),
    (n) =>
      read(
        STORM,
        choice(
          n,
          "Why was Grandad laughing at the end?",
          [
            "He was happy that rain had finally come after the drought.",
            "He thought the bruise was funny.",
            "He was laughing at the windmill.",
            "He was cold and wet.",
          ],
          0,
          "The last sentence says there had been two years of drought. The rain meant the dry land would finally get water.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        TWO_VIEWS,
        choice(
          n,
          "How does Maddie feel about Ellie being made captain?",
          ["jealous and upset", "proud of Ellie", "relieved", "scared"],
          0,
          "Maddie couldn't believe it and kicked her boots, which shows she was upset and felt she deserved it more.",
        ),
      ),
    (n) =>
      read(
        TWO_VIEWS,
        choice(
          n,
          "Which information do we learn only from Ellie's point of view?",
          [
            "Ellie missed training because her mum was in hospital.",
            "Ellie missed three training sessions.",
            "Coach picked Ellie as captain.",
            "Maddie went to every training session.",
          ],
          0,
          "Maddie knows Ellie missed training, but only Ellie tells us why: her mum was in hospital.",
        ),
      ),
    (n) =>
      read(
        TWO_VIEWS,
        trueFalse(
          n,
          "Both parts of this text are written in the first person.",
          true,
          "Maddie and Ellie each tell their own part using 'I' and 'my', so both are first person.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        RIVER_POEM,
        multi(
          n,
          "Which features does this poem use? Choose all that are right.",
          ["pairs of rhyming lines", "a regular, bouncy rhythm", "a first-person voice ('I')", "speech marks for dialogue"],
          [0, 1, 2],
          "Lines rhyme in pairs (lies/skies, mud/flood), the beat repeats in every line, and the river speaks as 'I'. There is no dialogue.",
        ),
      ),
    (n) =>
      read(
        RIVER_POEM,
        ordering(
          n,
          "Put the river's journey in the order it is told in the poem.",
          [
            "a trickle in the mountains",
            "tumbling down rocks",
            "winding through valleys",
            "slowing in the lowlands",
            "resting in the ocean",
          ],
          "The poem follows the river from where it starts in the mountains, downhill through the valleys and lowlands, to the ocean.",
        ),
      ),
    (n) =>
      read(
        RIVER_POEM,
        choice(
          n,
          "'I'm gentle in summer, I'm wild in a flood.' Why does the poet use two opposite words here?",
          [
            "To show the river can change from calm to dangerous",
            "To show the river is confused",
            "Because floods only happen in summer",
            "To make the poem shorter",
          ],
          0,
          "Putting 'gentle' and 'wild' side by side shows the contrast: the same river can be calm or powerful and dangerous.",
        ),
      ),
  ],
});

/** EN2-CWT-01: imaginative texts: structure, dialogue, adjectives, noun groups, verbs, tense and capitals. */
export const STORIES = levels(4110301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is the verb in this sentence? 'The kookaburra laughed loudly.'",
        ["kookaburra", "laughed", "loudly", "the"],
        1,
        "The verb is the action. The kookaburra 'laughed'. 'Loudly' tells how it laughed.",
      ),
    (n) =>
      trueFalse(
        n,
        "The names of people and places need capital letters.",
        true,
        "Names like Ellie, Perth and Bondi Beach are proper nouns, so they start with capital letters.",
      ),
    (n) =>
      choice(
        n,
        "Which part of a story introduces the characters and the setting?",
        ["orientation", "complication", "resolution", "title"],
        0,
        "The orientation comes first. It tells the reader who, where and when.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose the stronger verb, 'stomped' or 'went': The angry giant ___ across the valley.",
        "stomped",
        "'Stomped' shows how the giant moved, heavy and angry. 'Went' doesn't help the reader picture it.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          "“I found a fossil!” shouted Amir.",
          "“I found a fossil! shouted Amir.”",
          "I found a fossil! “shouted Amir”.",
          "“I found a fossil” shouted Amir!",
        ],
        0,
        "Only the spoken words go inside the speech marks, and the exclamation mark belongs to them, so it goes inside too.",
      ),
    (n) =>
      multi(
        n,
        "Which words are adjectives in this sentence? 'The tiny, frightened possum hid in the hollow log.' Choose all that are right.",
        ["tiny", "frightened", "hollow", "hid", "possum"],
        [0, 1, 2],
        "Adjectives describe nouns. Tiny and frightened describe the possum, and hollow describes the log. 'Hid' is a verb and 'possum' is a noun.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a story.",
        [
          "Ned and Luca paddled their canoe out onto the lake.",
          "Halfway across, dark clouds rolled in and the wind picked up.",
          "They paddled hard and steered towards a small island.",
          "Safe on the shore, they waited for the storm to pass.",
        ],
        "The story goes from orientation (paddling out) to complication (the storm) to resolution (reaching safety). 'Halfway across' and 'Safe on the shore' are clues.",
      ),
    (n) =>
      choice(
        n,
        "Which noun group gives the reader the clearest picture?",
        ["a rusty old bike with a squeaky bell", "a bike", "the bike thing", "some bike"],
        0,
        "Adding adjectives (rusty, old) and a phrase (with a squeaky bell) to the noun 'bike' helps the reader see it.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the past tense of 'blow': Last night, the wind ___ the gate open.",
        "blew",
        "'Last night' means the past. 'Blow' is an irregular verb: its past tense is 'blew', not 'blowed'.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "When a different character starts speaking in a story, what should the writer do?",
        ["Start a new line", "Leave out the speech marks", "Write it in capital letters", "Use a full stop instead of speech marks"],
        0,
        "Each time a new person speaks, start a new line. This helps the reader keep track of who is talking.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are punctuated correctly? Choose all that are right.",
        [
          "“Where are you going?” asked Gran.",
          "Dad said, “Dinner is ready.”",
          "“I can't find my shoes”, said Leo.",
          "“hurry up!” called Tess.",
        ],
        [0, 1],
        "Gran's and Dad's are correct. Leo's comma should go inside the speech marks, and Tess's spoken words need a capital H.",
      ),
    (n) =>
      trueFalse(
        n,
        "A good complication creates a problem that the characters must deal with.",
        true,
        "The complication is the problem in the middle of the story. It gives the characters something to solve in the resolution.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence SHOWS that a character is scared, instead of just telling us?",
        [
          "Mia's hands trembled as she reached for the door handle.",
          "Mia was scared.",
          "Mia felt very, very scared.",
          "Mia was a girl who was scared.",
        ],
        0,
        "Trembling hands let the reader work out that Mia is scared. The other sentences just tell us.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best way to improve this sentence? 'The dog went down the road.'",
        [
          "The scruffy dog bolted down the dusty road.",
          "The dog went down the road fast.",
          "Dog went road.",
          "The dog went down the road and went down the road.",
        ],
        0,
        "A stronger verb (bolted) and adjectives (scruffy, dusty) make a much clearer picture for the reader.",
      ),
    (n) =>
      multi(
        n,
        "Which words need a capital letter? 'last easter, jack and i went to the show in sydney.' Choose all that are right.",
        ["last", "jack", "i", "sydney", "went", "show"],
        [0, 1, 2, 3],
        "'Last' starts the sentence, Jack is a name, 'I' is always a capital, and Sydney is a place. (Easter needs one too!) 'Went' and 'show' do not.",
      ),
  ],
});

/** EN2-CWT-02: informative texts: facts, headings, procedures, reports, conjunctions and commas. */
export const INFORMATIVE = levels(4110401, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is a fact?",
        [
          "The Murray River is in Australia.",
          "The Murray River is the prettiest river.",
          "Rivers are boring.",
          "Everyone should swim in rivers.",
        ],
        0,
        "A fact can be checked. You can look at a map to see the Murray River is in Australia. The others are opinions.",
      ),
    (n) =>
      trueFalse(
        n,
        "A procedure has steps written in order.",
        true,
        "A procedure tells you how to do something, so the steps must be in the order you do them.",
      ),
    (n) =>
      choice(
        n,
        "What is the job of a heading?",
        ["to tell the reader what a section is about", "to end the text", "to tell a joke", "to list the materials"],
        0,
        "A heading sits above a section and tells you its topic, so you can find information quickly.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence uses commas correctly?",
        [
          "Wombats, koalas and kangaroos are marsupials.",
          "Wombats koalas, and kangaroos are marsupials.",
          "Wombats, koalas, and, kangaroos are marsupials.",
          "Wombats koalas and kangaroos, are marsupials.",
        ],
        0,
        "Put a comma between the items in the list. 'And' joins the last two, so no comma is needed there.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for planting a seed in order.",
        ["Fill a pot with soil.", "Make a small hole with your finger.", "Drop the seed in and cover it.", "Water the soil gently."],
        "You need soil before you can make a hole, the hole before the seed, and you water it at the end.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'so' or 'but': Echidnas have no teeth, ___ they catch food with their sticky tongues.",
        "so",
        "Having no teeth is the reason they use their tongues. 'So' shows a result.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is the best subheading for this paragraph? 'Emus can run at about 50 kilometres per hour. Their long, strong legs help them travel long distances.'",
        ["Speed and Movement", "What Emus Eat", "Emu Eggs", "My Favourite Bird"],
        0,
        "The paragraph is all about how fast and far emus move, so 'Speed and Movement' fits.",
      ),
    (n) =>
      multi(
        n,
        "Which of these belong in an information report about volcanoes? Choose all that are right.",
        [
          "technical words like 'lava' and 'magma'",
          "facts written in the present tense",
          "a diagram with labels",
          "a made-up hero who saves the day",
        ],
        [0, 1, 2],
        "Reports use technical words, present-tense facts and labelled diagrams. Made-up characters belong in stories.",
      ),
    (n) =>
      trueFalse(
        n,
        "In a procedure, steps usually begin with a command verb such as 'cut', 'mix' or 'pour'.",
        true,
        "Command verbs tell the reader exactly what to do, so procedures start their steps with them.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which conjunction best joins these ideas? 'Many frogs are in danger ___ their wetlands are being drained.'",
        ["because", "although", "until", "or"],
        0,
        "The wetlands being drained is the reason frogs are in danger, so 'because' shows cause and effect.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the technical word: When water heats up and turns into vapour, it is called ___.",
        "evaporation",
        "Water turning into vapour (a gas) is called evaporation. It is an important step in the water cycle.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best topic sentence for a paragraph about what koalas eat?",
        ["Koalas eat mostly eucalyptus leaves.", "Koalas are cute.", "I saw a koala at the zoo.", "Koalas sleep a lot."],
        0,
        "A topic sentence tells what the paragraph is about. Only the first sentence is about koala food, and it is a fact.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses commas correctly?",
        [
          "To make a smoothie, you need a banana, milk, yoghurt and honey.",
          "To make a smoothie you need, a banana milk, yoghurt, and honey.",
          "To make, a smoothie you need a banana milk yoghurt, and honey.",
          "To make a smoothie you need a banana milk yoghurt and, honey.",
        ],
        0,
        "A comma goes after the opening phrase 'To make a smoothie', then between each item in the list, with 'and' before the last one.",
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of an information report in order.",
        ["Title", "General opening statement", "Paragraphs of facts with subheadings", "Concluding statement"],
        "A report starts with a title and an opening that says what it is about, then gives facts in sections, and ends with a conclusion.",
      ),
    (n) =>
      multi(
        n,
        "A report on the Great Barrier Reef says: 'The reef is in Queensland. It is made of coral. I went there and it was awesome!' Which changes would improve it? Choose all that are right.",
        ["Remove the personal opinion", "Add a subheading", "Add more facts, like how big it is", "Add a talking dragon"],
        [0, 1, 2],
        "Reports should be factual and organised. Remove 'it was awesome', add subheadings and add more facts. A dragon belongs in a story.",
      ),
  ],
});

/** EN2-CWT-03: persuasive texts: fact and opinion, structure, evidence, emotive words, connectives and counter-arguments. */
export const PERSUASIVE = levels(4110501, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is an opinion?",
        [
          "Summer is the best season.",
          "Summer comes after spring.",
          "Summer in Australia starts in December.",
          "Summer days are longer than winter days.",
        ],
        0,
        "'Best' is what someone thinks, and others may disagree. The other sentences can be checked, so they are facts.",
      ),
    (n) =>
      trueFalse(
        n,
        "In a persuasive text, the writer gives reasons to support an opinion.",
        true,
        "Reasons explain why the writer's opinion is right, which helps convince the reader.",
      ),
    (n) =>
      choice(
        n,
        "Which word shows the writer feels most strongly?",
        ["must", "might", "could", "maybe"],
        0,
        "'Must' is a strong, certain word. 'Might', 'could' and 'maybe' sound unsure.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which sentences are facts? Choose all that are right.",
        [
          "Cricket is played with a bat and ball.",
          "A cricket team has eleven players.",
          "Cricket is boring to watch.",
          "Cricket is the greatest sport ever.",
        ],
        [0, 1],
        "Facts can be checked: cricket uses a bat and ball and has eleven players in a team. 'Boring' and 'greatest' are opinions.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'Firstly' or 'Finally' to introduce the first reason: Students should walk to school. ___, walking keeps you fit and healthy.",
        "Firstly",
        "This is the first reason after the opinion, so 'Firstly' is the right connective. 'Finally' is for the last reason.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence would make the best opening for a persuasive text?",
        ["I strongly believe our school should have a class pet.", "Rabbits are animals.", "Some schools are big.", "Pets eat food."],
        0,
        "A persuasive text opens by clearly stating the writer's opinion. 'I strongly believe…' does this.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put the parts of a persuasive text in order.",
        ["Statement of opinion", "First reason with evidence", "Second reason with evidence", "Conclusion that restates the opinion"],
        "State your opinion, back it up with reasons and evidence, then sum up by saying your opinion again.",
      ),
    (n) =>
      choice(
        n,
        "Which reason best supports the opinion 'Recess should be longer'?",
        [
          "Students need time to eat, play and rest, and 20 minutes is not enough for all three.",
          "Recess should be longer because I like it.",
          "Recess should be longer because it should.",
          "Recess is recess.",
        ],
        0,
        "A good reason explains why, with detail. The first option gives a clear reason; the others don't explain anything.",
      ),
    (n) =>
      trueFalse(
        n,
        "The connective 'therefore' is used to show a result.",
        true,
        "'Therefore' means 'so' or 'because of this'. It shows what follows from a reason.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the most persuasive sentence?",
        [
          "It is vital that we protect our koalas before it is too late.",
          "Koalas are sort of important.",
          "Maybe we could protect koalas.",
          "Some people like koalas.",
        ],
        0,
        "'Vital' and 'before it is too late' are strong, urgent words that push the reader to act.",
      ),
    (n) =>
      multi(
        n,
        "Which are emotive words (words that stir up feelings) that a persuasive writer might use? Choose all that are right.",
        ["heartbreaking", "cruel", "shocking", "rectangle", "Tuesday"],
        [0, 1, 2],
        "Heartbreaking, cruel and shocking make the reader feel strongly. 'Rectangle' and 'Tuesday' don't create feelings.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'Therefore' or 'However': Plastic straws harm sea life. ___, our canteen should stop selling them.",
        "Therefore",
        "Stopping straws is the result of the harm they cause, so 'Therefore' fits. 'However' would introduce an opposite idea.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence is a rhetorical question used to persuade?",
        [
          "Would you want to live in a world without trees?",
          "What time is it?",
          "Where is the library?",
          "How many legs does a spider have?",
        ],
        0,
        "A rhetorical question isn't asked for an answer. It makes the reader think and agree with the writer.",
      ),
    (n) =>
      choice(
        n,
        "A writer argues that 'Our school should have a longer lunch break.' Which sentence answers someone who disagrees?",
        [
          "Some people say we would lose learning time, but well-rested students learn faster.",
          "Lunch is fun.",
          "I like sandwiches.",
          "Long lunches are long.",
        ],
        0,
        "This sentence names the other side's argument (losing learning time) and then argues back. That makes the writer's case stronger.",
      ),
    (n) =>
      multi(
        n,
        "'Every student should learn to swim. Australia has thousands of beaches, rivers and pools. Swimming is the most fun thing ever. Learning to swim can save lives.' Which sentences are strong reasons for the opinion? Choose all that are right.",
        [
          "Australia has thousands of beaches, rivers and pools.",
          "Learning to swim can save lives.",
          "Swimming is the most fun thing ever.",
        ],
        [0, 1],
        "Being surrounded by water and saving lives are strong reasons. 'The most fun thing ever' is just a personal feeling, so it is weak.",
      ),
  ],
});
