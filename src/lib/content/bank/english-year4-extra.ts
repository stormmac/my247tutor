/**
 * Year 4 English, second set: another 15 questions for each Stage 2 standard (NESA outcome),
 * three at each level from very easy to very hard. Harder than Year 3 on the same outcomes.
 * Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN2-SPELL-01: spelling generalisations: tricky words, plurals, prefixes, suffixes and homophones. */
export const SPELLING = levels(4130116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["Wednesday", "Wensday", "Wednesdy", "Wendsday"],
        0,
        "'Wednesday' has a silent d: W-e-d-n-e-s-d-a-y. Saying it slowly as 'Wed-nes-day' helps you remember.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'church' is 'churches'.",
        true,
        "Words that end in ch add -es to make the plural: one church, two churches.",
      ),
    (n) => typed("fill_blank", n, "kind + ness = ___", "kindness", "Keep the base word 'kind' and add the suffix -ness: kindness."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'city'.",
        "cities",
        "'City' ends in a consonant then y, so change the y to i and add -es: cities.",
      ),
    (n) =>
      choice(
        n,
        "Which word correctly finishes the sentence? 'The wind ___ the leaves off the tree.'",
        ["blue", "blew", "bloo", "blewe"],
        1,
        "'Blew' is the past tense of 'blow'. 'Blue' sounds the same but is a colour.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to make the word 'unkindly'.",
        ["un", "kind", "ly"],
        "The prefix 'un' goes at the front, then the base word 'kind', then the suffix 'ly' at the end.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ing' to the word 'forget'.",
        "forgetting",
        "The last part of 'forget' is stressed and has a short vowel before one consonant, so double the t: forgetting.",
      ),
    (n) =>
      choice(
        n,
        "What is the plural of 'half'?",
        ["halfs", "halves", "halfes", "halvs"],
        1,
        "Many words ending in f change the f to v and add -es: one half, two halves.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Add a prefix to make a word that means 'not possible': ___possible",
        "im",
        "The prefix 'im' means 'not'. Impossible means not possible. We use 'im' before many words starting with p.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses the homophones correctly?",
        [
          "We could see the sea from our hotel.",
          "We could sea the see from our hotel.",
          "We could see the see from our hotel.",
          "We could sea the sea from our hotel.",
        ],
        0,
        "'See' is what you do with your eyes (it has two e's, like two eyes). 'Sea' is the ocean.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add 'ly' to the word 'busy'.",
        "busily",
        "'Busy' ends in a consonant then y, so change the y to i before adding -ly: busily.",
      ),
    (n) =>
      multi(
        n,
        "Which words are spelt correctly? Choose all that are right.",
        ["believe", "beleive", "library", "libary", "different"],
        [0, 2, 4],
        "Believe has 'lie' in the middle. Library has an r after the b (li-brar-y). Different has two f's and 'er' in the middle.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word correctly completes the sentence? 'The library was so ___ that you could hear a pin drop.'",
        ["quiet", "quite", "quit", "quiete"],
        0,
        "'Quiet' (i-e-t) means with little noise. 'Quite' (i-t-e) means fairly or very, and 'quit' means stop.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "argue + ment = ___",
        "argument",
        "This word breaks the usual rule: the e at the end of 'argue' is dropped before -ment, so it is argument, not arguement.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'potato' is 'potatoes'.",
        true,
        "Some words ending in o add -es to make the plural: one potato, two potatoes. Tomato and hero work the same way.",
      ),
  ],
});

/** EN2-VOCAB-01: synonyms, antonyms, context clues, word parts, subject words and shades of meaning. */
export const VOCAB = levels(4140116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'begin'?",
        ["start", "finish", "stop", "wait"],
        0,
        "'Begin' and 'start' are synonyms: they mean the same thing.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Gigantic' and 'enormous' are synonyms.",
        true,
        "Synonyms mean the same. Gigantic and enormous both mean very, very big.",
      ),
    (n) =>
      choice(
        n,
        "What is the opposite of 'arrive'?",
        ["depart", "come", "reach", "enter"],
        0,
        "To arrive is to get to a place. To depart is to leave it, so 'depart' is the opposite.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "'The magpie swooped at the cyclists, so they ducked and pedalled faster.' What does 'swooped' mean?",
        ["flew down suddenly", "sang sweetly", "built a nest", "sat still"],
        0,
        "The cyclists ducked, so the magpie must have come down at them fast. 'Swooped' means flew down suddenly.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The opposite of 'visible' is ___.",
        "invisible",
        "Visible means able to be seen. The prefix in- means 'not', so invisible means not able to be seen.",
      ),
    (n) =>
      multi(
        n,
        "Which words belong to the same word family as 'act'? Choose all that are right.",
        ["action", "actor", "react", "acorn", "attack"],
        [0, 1, 2],
        "Action, actor and react all have the base word 'act' and are about doing. 'Acorn' and 'attack' just share some letters.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from driest to wettest.",
        ["dry", "damp", "wet", "soaked"],
        "Dry has no water. Damp is a little wet, wet has more water, and soaked means completely full of water.",
      ),
    (n) =>
      choice(
        n,
        "'The ancient pots were fragile, so visitors were asked not to touch them.' What does 'fragile' mean?",
        ["easily broken", "very heavy", "brightly coloured", "brand new"],
        0,
        "Visitors were told not to touch them, which is a clue they could break. 'Fragile' means easily broken.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What word starting with 'i' means 'the person who draws the pictures for a book'?",
        "illustrator",
        "The author writes the words and the illustrator draws the pictures (the illustrations).",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "In science, what is a 'predator'?",
        [
          "an animal that hunts other animals for food",
          "an animal that eats only plants",
          "a baby animal",
          "an animal that sleeps all winter",
        ],
        0,
        "A predator hunts and eats other animals, like a dingo or an eagle. The animal it hunts is called its prey.",
      ),
    (n) =>
      multi(
        n,
        "Which words could replace 'nice' to make this sentence more precise? 'We had a nice day at the beach.' Choose all that are right.",
        ["relaxing", "sunny", "wonderful", "quickly", "chair"],
        [0, 1, 2],
        "Relaxing, sunny and wonderful are describing words that tell exactly what kind of day it was. 'Quickly' and 'chair' don't fit.",
      ),
    (n) =>
      choice(
        n,
        "The prefix 'tri' means 'three'. What is a 'tripod'?",
        ["a stand with three legs", "a stand with two legs", "a kind of boat", "a large tree"],
        0,
        "'Tri' means three and 'pod' means foot, so a tripod stands on three legs, like the stand for a camera.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which word best fits? 'The bushwalkers were ___ when the rescue helicopter finally found them after two cold nights.'",
        ["relieved", "annoyed", "bored", "jealous"],
        0,
        "After two cold nights lost, being found would take away all their worry. 'Relieved' means glad that something bad is over.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest to largest.",
        ["puddle", "pond", "lake", "ocean"],
        "A puddle is tiny, a pond is small, a lake is much bigger, and an ocean is the largest body of water of all.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "'Tele' means 'far' and 'scope' means 'look'. Which word names a tool for looking at faraway things: 'telescope' or 'microscope'?",
        "telescope",
        "Tele (far) + scope (look) makes telescope, used to look at stars. 'Micro' means small, so a microscope looks at tiny things.",
      ),
  ],
});

const MARKETS = {
  title: "Market Day",
  text:
    "Every second Saturday, Hamid and his grandmother caught the train to the Parramatta markets. Grandma always brought her green shopping trolley with one squeaky wheel.\n\n" +
    "First they bought mangoes and bananas from Mr Tran's fruit stall. Then they stopped at the bakery van for a warm cheese roll each. Hamid's favourite stall sold old comic books, and he was always allowed to choose one.\n\n" +
    "On the train home, the trolley was so heavy that Hamid had to help Grandma push it up the ramp. “Next time,” Grandma laughed, “we buy fewer mangoes!”",
};

const FLYING_FOXES = {
  title: "Flying Foxes",
  text:
    "Flying foxes are large bats that live in Australia. They are also called fruit bats. Unlike many small bats, flying foxes do not use echoes to find their way. Instead, they use their big eyes and strong sense of smell.\n\n" +
    "Flying foxes sleep during the day, hanging upside down in trees. Large groups, called camps, can have thousands of bats. At dusk they fly out to feed on nectar, pollen and fruit.\n\n" +
    "Flying foxes are important for the bush. As they travel from tree to tree, they carry pollen and seeds, which helps new trees to grow.",
};

const SPELLING_BEE = {
  title: "The Spelling Bee",
  text:
    "Amira had practised her spelling list every night for a month. Her little sister even held up flash cards at breakfast.\n\n" +
    "At the school spelling bee, Amira got through round after round. Soon only she and a Year 6 boy named Harrison were left on the stage. Her knees were shaking.\n\n" +
    "“Your word is 'rhythm',” said the principal. Amira closed her eyes and pictured the flash card. “R-h-y-t-h-m,” she said slowly.\n\n" +
    "The hall burst into applause. Harrison smiled and shook her hand. Amira couldn't stop grinning all the way home.",
};

const CAMP_EMAIL = {
  title: "An Email from Camp",
  text:
    "Hi Mum and Dad,\n\n" +
    "Camp at Myall Lakes is going well. Yesterday we went kayaking. Will and I shared a kayak, and we tipped over twice! The water was freezing, but by the end we could paddle in a straight line.\n\n" +
    "The food is not as good as yours, Dad. Last night's spaghetti tasted like cardboard. Still, I ate two bowls because I was so hungry after the bushwalk.\n\n" +
    "Tonight is the talent show. I'm doing my magic tricks, so I've been practising with the cards you packed. Wish me luck!\n\n" +
    "See you Friday,\nSami",
};

const FIRE_PLANTS = {
  title: "Plants and Bushfires",
  text:
    "Many Australian plants have amazing ways of surviving bushfires. Some eucalyptus trees have thick bark that protects them from the heat. After a fire, new green shoots sprout straight from their blackened trunks.\n\n" +
    "Other plants need fire to spread their seeds. Some banksia cones stay tightly shut for years. The heat of a fire opens them, and the seeds fall onto the ash-covered ground. The ash makes the soil rich, and the fire has cleared away taller plants that would block the sunlight.\n\n" +
    "This does not mean fires are always good for the bush. Very hot fires that happen too often can kill young plants before they are old enough to make seeds.",
};

/** EN2-RECOM-01: literal and inferential comprehension of stories, letters and information texts. */
export const READING = levels(4150116, {
  very_easy: [
    (n) =>
      read(
        MARKETS,
        choice(
          n,
          "How did Hamid and his grandmother get to the markets?",
          ["by train", "by car", "by bus", "on foot"],
          0,
          "The first sentence says they 'caught the train to the Parramatta markets'.",
        ),
      ),
    (n) =>
      read(
        MARKETS,
        trueFalse(n, "Grandma's shopping trolley was blue.", false, "The text says Grandma brought her green shopping trolley."),
      ),
    (n) =>
      read(
        MARKETS,
        typed(
          "short_answer",
          n,
          "What did Hamid choose at his favourite stall?",
          ["a comic book", "comic book", "comic", "a comic", "an old comic book", "old comic book", "comics"],
          "The text says his favourite stall sold old comic books, and he was allowed to choose one.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        FLYING_FOXES,
        choice(
          n,
          "How do flying foxes find their way?",
          ["with their big eyes and sense of smell", "by using echoes", "by following the moon", "by listening for other bats"],
          0,
          "The first paragraph says they do not use echoes. Instead, they use their big eyes and strong sense of smell.",
        ),
      ),
    (n) =>
      read(
        FLYING_FOXES,
        typed(
          "fill_blank",
          n,
          "A large group of flying foxes is called a ___.",
          ["camp", "camps"],
          "The second paragraph says, 'Large groups, called camps, can have thousands of bats.'",
        ),
      ),
    (n) =>
      read(
        FLYING_FOXES,
        multi(
          n,
          "Which foods do flying foxes eat, according to the text? Choose all that are right.",
          ["nectar", "pollen", "fruit", "insects", "fish"],
          [0, 1, 2],
          "The text says they feed on nectar, pollen and fruit. Insects and fish are not mentioned.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        SPELLING_BEE,
        choice(
          n,
          "What does 'Her knees were shaking' tell you about how Amira felt?",
          ["nervous", "bored", "cold", "angry"],
          0,
          "Amira was in the final two on a stage in front of everyone. Shaking knees are a clue that she was nervous.",
        ),
      ),
    (n) =>
      read(
        SPELLING_BEE,
        ordering(
          n,
          "Put these events in the order they happened.",
          [
            "Amira practised her list every night.",
            "Amira got through round after round.",
            "Only Amira and Harrison were left.",
            "Amira spelt 'rhythm'.",
            "Harrison shook Amira's hand.",
          ],
          "Practising happened for a month before the bee. Then the rounds, the final two, the last word, and the handshake after the applause.",
        ),
      ),
    (n) =>
      read(
        SPELLING_BEE,
        trueFalse(
          n,
          "Amira's little sister helped her practise.",
          true,
          "The text says her little sister held up flash cards at breakfast, which helped Amira practise.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        CAMP_EMAIL,
        choice(
          n,
          "What is the main reason Sami wrote this email?",
          [
            "to tell Mum and Dad what has been happening at camp",
            "to ask to come home early",
            "to complain about kayaking",
            "to explain how to do magic tricks",
          ],
          0,
          "Sami tells his parents about kayaking, the food and the talent show. He is sharing news from camp.",
        ),
      ),
    (n) =>
      read(
        CAMP_EMAIL,
        choice(
          n,
          "'Last night's spaghetti tasted like cardboard.' What does Sami mean?",
          [
            "The spaghetti had very little flavour.",
            "The spaghetti was served on cardboard plates.",
            "The spaghetti was delicious.",
            "The spaghetti was made from paper.",
          ],
          0,
          "Cardboard has no taste, so Sami is saying the spaghetti was bland. He still ate it because he was hungry.",
        ),
      ),
    (n) =>
      read(
        CAMP_EMAIL,
        multi(
          n,
          "What can you tell about Sami from his email? Choose all that are right.",
          ["He keeps trying when things are hard.", "He has a sense of humour.", "He likes doing magic.", "He refused to eat dinner."],
          [0, 1, 2],
          "He kept paddling after tipping over twice, jokes about the cardboard spaghetti and is doing magic in the talent show. He ate two bowls of dinner.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        FIRE_PLANTS,
        choice(
          n,
          "What is the main idea of this text?",
          [
            "Many Australian plants can survive or even use fire, but fires that are too frequent can still harm them.",
            "Bushfires are always good for the bush.",
            "Banksias are the tallest plants in Australia.",
            "Eucalyptus trees have thin bark.",
          ],
          0,
          "The text explains how plants survive and use fire, then warns that fires happening too often can kill young plants. That is the big idea.",
        ),
      ),
    (n) =>
      read(
        FIRE_PLANTS,
        typed(
          "fill_blank",
          n,
          "Some banksia cones are opened by the ___ of a fire.",
          "heat",
          "The second paragraph says, 'The heat of a fire opens them, and the seeds fall onto the ash-covered ground.'",
        ),
      ),
    (n) =>
      read(
        FIRE_PLANTS,
        choice(
          n,
          "Why can fires that happen too often be harmful, even to plants that need fire?",
          [
            "Young plants are burnt before they are old enough to make seeds.",
            "The ash makes the soil too rich.",
            "The bark becomes too thick.",
            "Banksia cones open too slowly.",
          ],
          0,
          "If another fire comes before young plants make seeds, there are no new seeds to grow. Over time the plants could disappear.",
        ),
      ),
  ],
});

const NIGHT_POEM = {
  title: "Night in the Bush",
  text:
    "The moon climbs high, a silver light,\nThe possums wake to start the night,\nA frog croaks loudly by the creek,\nThe gum trees rustle, branches creak.\n\n" +
    "A wallaby hops past our tent,\nIt sniffs the air to find a scent,\nThe breeze is cool upon my face,\nThe bush at night's a magic place.\n\n" +
    "A boobook calls from somewhere near,\nThe campfire crackles, warm and clear,\nThe stars come out to wink and shine,\nAnd I curl up, all snug and fine.",
};

const CAPTAIN = {
  title: "Tahlia's Choice",
  text:
    "At sport, Ms Kelly asked Tahlia to pick a cricket team. Everyone expected her to choose the fastest bowlers first, like the other captain did.\n\n" +
    "Instead, Tahlia called out, “Zac!” Zac was new and had never played cricket. He stared at her, then jogged over, smiling shyly.\n\n" +
    "Tahlia showed him how to hold the bat. When Zac hit his first four, the whole team cheered louder than they had all term.",
};

const HEATWAVE = {
  title: "The Heatwave",
  text:
    "The afternoon sun was a furnace. Heat shimmered above the road like water, and the bitumen was soft and sticky under our thongs.\n\n" +
    "The cicadas screamed in the trees. Even the magpies had given up, sitting with their beaks wide open in the shade of the gum.\n\n" +
    "Inside, the old fan rattled and whirred, pushing the hot air from one side of the room to the other. Mum filled the paddling pool, and my sister and I lay in it like two lazy seals.",
};

const FENCE = {
  title: "Two Sides of the Fence",
  text:
    "Mr Cobb: Every week, a cricket ball lands in my vegetable patch. Last Tuesday one flattened my best tomato plant. I've kept the last three balls in my shed. Maybe that will teach those kids a lesson.\n\n" +
    "Layla: Our backyard is tiny, so my brother and I have to play cricket right next to the fence. We've lost three balls this month! I made Mr Cobb a card to say sorry, but I'm too scared to knock on his door.",
};

const SEED_POEM = {
  title: "The Seed",
  text:
    "A seed fell down in a crack of stone,\nNo soil, no friends, it was all alone.\nThe wind said, “Give up, you'll never grow!”\nThe seed just whispered, “Wait and know.”\n\n" +
    "It drank the dew and it sipped the rain,\nIt pushed through the dark again and again,\nTill one spring morning, small and bright,\nA flower opened in the light.\n\n" +
    "Now children stop along the way\nTo see the flower that grew that day,\nAnd learn from something just as small:\nThe ones who try can grow up tall.",
};

/** EN2-UARL-01: character, setting, figurative language, rhyme and rhythm, point of view and theme in literature. */
export const LITERATURE = levels(4150216, {
  very_easy: [
    (n) =>
      read(
        NIGHT_POEM,
        choice(
          n,
          "When is this poem set?",
          ["at night", "in the morning", "at lunchtime", "in the afternoon"],
          0,
          "The moon, waking possums, the boobook owl and the stars all show the poem is set at night.",
        ),
      ),
    (n) =>
      read(
        NIGHT_POEM,
        typed(
          "short_answer",
          n,
          "Which word in the poem rhymes with 'light'?",
          "night",
          "'Light' and 'night' both end with the sound -ight. They are the first rhyming pair in the poem.",
        ),
      ),
    (n) =>
      read(
        NIGHT_POEM,
        trueFalse(
          n,
          "In the poem, the stars are described as winking.",
          true,
          "The poem says, 'The stars come out to wink and shine.' Stars can't really wink, which makes the image fun.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        CAPTAIN,
        choice(
          n,
          "Which word best describes Tahlia?",
          ["thoughtful", "selfish", "lazy", "bossy"],
          0,
          "Tahlia picked the new boy first and taught him how to hold the bat. She thought about how Zac would feel.",
        ),
      ),
    (n) =>
      read(
        CAPTAIN,
        choice(
          n,
          "Why do you think Tahlia chose Zac first?",
          [
            "She wanted the new boy to feel welcome.",
            "Zac was the fastest bowler.",
            "Ms Kelly told her to pick Zac.",
            "She wanted to lose the game.",
          ],
          0,
          "Zac was new and had never played. Choosing him first, instead of the best players, would help him feel he belonged.",
        ),
      ),
    (n) =>
      read(
        CAPTAIN,
        multi(
          n,
          "Which details show that Zac was surprised or shy at first? Choose all that are right.",
          ["He stared at Tahlia.", "He smiled shyly.", "He hit a four.", "The team cheered."],
          [0, 1],
          "Staring shows surprise and 'smiling shyly' shows he felt shy. Hitting a four and the cheering happened later.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        HEATWAVE,
        choice(
          n,
          "'The afternoon sun was a furnace.' What does this tell you?",
          ["The day was extremely hot.", "The sun was setting.", "There was a fire in the street.", "It was a cool, cloudy day."],
          0,
          "A furnace is a very hot oven. The writer says the sun WAS a furnace to show how hot the day felt.",
        ),
      ),
    (n) =>
      read(
        HEATWAVE,
        choice(
          n,
          "'My sister and I lay in it like two lazy seals.' What are the children being compared to?",
          ["lazy seals", "magpies", "cicadas", "an old fan"],
          0,
          "The word 'like' shows a comparison. The children lie still in the water, just like seals lazing about.",
        ),
      ),
    (n) =>
      read(
        HEATWAVE,
        multi(
          n,
          "Which details show how hot the day was? Choose all that are right.",
          [
            "Heat shimmered above the road.",
            "The bitumen was soft and sticky.",
            "The magpies sat with their beaks wide open.",
            "The fan rattled and whirred.",
          ],
          [0, 1, 2],
          "Shimmering heat, melting bitumen and panting magpies all show the heat. A rattling, whirring fan is only about the noise it makes.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        FENCE,
        choice(
          n,
          "How does Mr Cobb feel about the cricket balls?",
          ["annoyed", "pleased", "excited", "scared"],
          0,
          "A ball flattened his best tomato plant and he wants to 'teach those kids a lesson'. That shows he is annoyed.",
        ),
      ),
    (n) =>
      read(
        FENCE,
        choice(
          n,
          "Which information do we learn only from Layla's point of view?",
          [
            "Layla made Mr Cobb a card to say sorry.",
            "Cricket balls keep landing in the vegetable patch.",
            "Three balls have gone over the fence.",
            "Mr Cobb grows tomatoes.",
          ],
          0,
          "Only Layla tells us about the sorry card. Mr Cobb doesn't know about it, because she is too scared to knock on his door.",
        ),
      ),
    (n) =>
      read(
        FENCE,
        trueFalse(
          n,
          "Mr Cobb knows that Layla feels sorry.",
          false,
          "Layla made a card but is too scared to give it to him, so Mr Cobb doesn't know she is sorry. Only the reader knows.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        SEED_POEM,
        choice(
          n,
          "What is the main message (theme) of this poem?",
          [
            "If you keep trying, you can succeed even when things are hard.",
            "Seeds should only grow in soil.",
            "The wind is always right.",
            "Flowers only open in summer.",
          ],
          0,
          "The seed was alone with no soil, but it kept pushing 'again and again' until it flowered. The last line says 'The ones who try can grow up tall.'",
        ),
      ),
    (n) =>
      read(
        SEED_POEM,
        multi(
          n,
          "In the poem, which non-human things speak like people? Choose all that are right.",
          ["the wind", "the seed", "the stone", "the dew"],
          [0, 1],
          "The wind says, 'Give up, you'll never grow!' and the seed whispers, 'Wait and know.' Giving things human actions is called personification.",
        ),
      ),
    (n) =>
      read(
        SEED_POEM,
        ordering(
          n,
          "Put these events from the poem in order.",
          [
            "A seed fell into a crack of stone.",
            "The wind told the seed to give up.",
            "The seed pushed through the dark again and again.",
            "A flower opened one spring morning.",
            "Children stopped to see the flower.",
          ],
          "The first stanza is the seed landing and the wind's words, the second is the struggle and the flower, and the third is the children.",
        ),
      ),
  ],
});

/** EN2-CWT-01: imaginative texts: structure, dialogue, adjectives, noun groups, verbs, tense and capitals. */
export const STORIES = levels(4110316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word tells HOW the turtle moved? 'The turtle crawled slowly up the beach.'",
        ["turtle", "crawled", "slowly", "beach"],
        2,
        "'Slowly' is an adverb. It tells how the turtle crawled.",
      ),
    (n) =>
      trueFalse(
        n,
        "The word 'I' is always written as a capital letter.",
        true,
        "When you write about yourself, 'I' is always a capital letter, even in the middle of a sentence.",
      ),
    (n) =>
      choice(
        n,
        "Which part of a story is where the problem happens?",
        ["complication", "orientation", "resolution", "title"],
        0,
        "The complication comes after the orientation. It is where something goes wrong for the characters.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose the stronger verb, 'gobbled' or 'ate': The hungry dog ___ its dinner in seconds.",
        "gobbled",
        "'Gobbled' shows the dog ate fast and greedily. 'Ate' doesn't help the reader picture it.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          "“Can we go to the pool?” asked Hana.",
          "“Can we go to the pool? asked Hana.”",
          "“Can we go to the pool”? asked Hana.",
          "Can we go to the pool? “asked Hana.”",
        ],
        0,
        "Only Hana's words go inside the speech marks, and her question mark belongs to them, so it goes inside too.",
      ),
    (n) =>
      multi(
        n,
        "Which words are nouns in this sentence? 'The farmer drove his tractor across the muddy paddock.' Choose all that are right.",
        ["farmer", "tractor", "paddock", "drove", "muddy"],
        [0, 1, 2],
        "Nouns name people, places and things: farmer, tractor and paddock. 'Drove' is a verb and 'muddy' is an adjective.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a story.",
        [
          "Early one morning, Asha set off on her bike to deliver newspapers.",
          "Halfway down Bell Street, her chain snapped.",
          "Luckily, Mr Ngata from the bike shop saw her and fixed it.",
          "By eight o'clock, every paper was delivered.",
        ],
        "The time clues help: 'Early one morning' starts it, 'Halfway' is the problem, 'Luckily' brings help, and 'By eight o'clock' ends it.",
      ),
    (n) =>
      choice(
        n,
        "Which noun group gives the reader the clearest picture?",
        ["an enormous green crocodile with yellow eyes", "a crocodile", "the croc thing", "some animal"],
        0,
        "Adding adjectives (enormous, green) and a phrase (with yellow eyes) to 'crocodile' helps the reader see it.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the past tense of 'swim': Yesterday, the dolphins ___ beside our boat.",
        "swam",
        "'Yesterday' means the past. 'Swim' is an irregular verb: its past tense is 'swam', not 'swimmed'.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence stays in the past tense the whole way through?",
        [
          "Kara opened the box and gasped.",
          "Kara opens the box and gasped.",
          "Kara opened the box and gasps.",
          "Kara will open the box and gasped.",
        ],
        0,
        "'Opened' and 'gasped' are both past tense. The other sentences mix past with present or future.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are punctuated correctly? Choose all that are right.",
        [
          "Mum asked, “Have you fed the dog?”",
          "“I'm so tired,” yawned Pete.",
          "“Look at that rainbow” said Kim.",
          "“we're late!” cried Sam.",
        ],
        [0, 1],
        "Mum's and Pete's are correct. Kim's needs a comma inside the speech marks, and Sam's spoken words need a capital W.",
      ),
    (n) =>
      trueFalse(
        n,
        "Every story must start with the words 'Once upon a time'.",
        false,
        "Stories can start in many ways, such as with dialogue, a sound or the setting. 'Once upon a time' is mostly used for fairy tales.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence SHOWS that a character is excited, instead of just telling us?",
        [
          "Leo bounced on his toes and couldn't stop grinning.",
          "Leo was excited.",
          "Leo felt really, really excited.",
          "Leo is an excited boy.",
        ],
        0,
        "Bouncing and grinning let the reader work out that Leo is excited. The other sentences just tell us.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses a simile (a comparison using 'like' or 'as')?",
        ["The waves were as tall as houses.", "The waves were tall.", "The waves crashed on the shore.", "There were many waves."],
        0,
        "'As tall as houses' compares the waves to houses using 'as'. That makes it a simile and helps the reader picture them.",
      ),
    (n) =>
      multi(
        n,
        "Which words need a capital letter? 'last christmas, aunty meg took us to lake macquarie.' Choose all that are right.",
        ["last", "christmas", "aunty", "meg", "took", "lake", "macquarie", "us"],
        [0, 1, 2, 3, 5, 6],
        "'Last' starts the sentence, Christmas is a special day, Aunty Meg is a name (with a title), and Lake Macquarie is a place. 'Took' and 'us' do not.",
      ),
  ],
});

/** EN2-CWT-02: informative texts: facts, headings, procedures, reports, conjunctions and commas. */
export const INFORMATIVE = levels(4110416, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is a fact?",
        [
          "Uluru is in the Northern Territory.",
          "Uluru is the most beautiful place on Earth.",
          "Everyone must visit Uluru.",
          "Uluru is boring.",
        ],
        0,
        "A fact can be checked on a map. The others are opinions: what someone thinks or feels.",
      ),
    (n) =>
      trueFalse(
        n,
        "An information report is usually about made-up characters.",
        false,
        "An information report gives facts about a real topic, like an animal or a place. Made-up characters belong in stories.",
      ),
    (n) =>
      choice(
        n,
        "Which part of a non-fiction book explains the meaning of special words?",
        ["the glossary", "the contents page", "the front cover", "the title"],
        0,
        "The glossary is a mini dictionary at the back of a book. It explains the technical words used in the text.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence uses commas correctly?",
        [
          "We packed tents, sleeping bags, torches and food.",
          "We packed tents sleeping bags, torches, and, food.",
          "We packed, tents sleeping bags torches and food.",
          "We packed tents sleeping bags torches, and food.",
        ],
        0,
        "Put a comma between the items in the list. 'And' joins the last two, so no comma is needed there.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for making a paper plane in order.",
        [
          "Fold a sheet of paper in half the long way.",
          "Fold the top corners down to the middle fold.",
          "Fold each side down to make the wings.",
          "Throw the plane gently forward.",
        ],
        "You fold the paper first, then shape the nose, then make the wings. You can only throw it once it is finished.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'because' or 'although': Kangaroos can't walk backwards easily ___ of their big tails and long feet.",
        "because",
        "Their big tails and feet are the reason, so 'because' shows cause. 'Although' would show a contrast.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is the best subheading for this paragraph? 'Wombats dig long burrows with their strong claws. They sleep underground during the heat of the day.'",
        ["Wombat Homes", "What Wombats Eat", "Wombat Babies", "My Pet"],
        0,
        "The paragraph is about burrows and where wombats sleep, so 'Wombat Homes' fits.",
      ),
    (n) =>
      multi(
        n,
        "Which of these belong in a procedure? Choose all that are right.",
        ["a list of materials", "numbered steps", "command verbs like 'cut' and 'stir'", "a villain who causes trouble"],
        [0, 1, 2],
        "Procedures list what you need, number the steps and start them with command verbs. Villains belong in stories.",
      ),
    (n) =>
      trueFalse(
        n,
        "Information reports are usually written in the present tense.",
        true,
        "Reports describe how things are now, for example 'Koalas eat eucalyptus leaves', so they use the present tense.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which conjunction best fills the gap? '___ the platypus lays eggs, it is a mammal.'",
        ["Although", "Because", "So", "Until"],
        0,
        "Most mammals don't lay eggs, so this is a surprising contrast. 'Although' joins two ideas that seem not to fit together.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the technical word: When water vapour cools and turns back into tiny drops, forming clouds, it is called ___.",
        "condensation",
        "Water vapour cooling into drops is called condensation. You can see it on the outside of a cold glass.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best topic sentence for a paragraph about how emu fathers care for their chicks?",
        ["Male emus sit on the eggs and look after the chicks.", "Emus are funny birds.", "I saw an emu once.", "Emus can run fast."],
        0,
        "A topic sentence tells what the paragraph is about. Only the first sentence is about emu fathers and chicks, and it is a fact.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses commas correctly?",
        [
          "Before the storm arrived, we tied down the trampoline, the chairs and the bins.",
          "Before the storm arrived we tied down, the trampoline the chairs, and the bins.",
          "Before, the storm arrived we tied down the trampoline the chairs and, the bins.",
          "Before the storm arrived we tied down the trampoline the chairs and the bins,",
        ],
        0,
        "A comma goes after the opening part 'Before the storm arrived', then between the items in the list, with 'and' before the last one.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to explain how a caterpillar becomes a butterfly.",
        [
          "A butterfly lays eggs on a leaf.",
          "A caterpillar hatches and eats lots of leaves.",
          "The caterpillar makes a chrysalis around itself.",
          "An adult butterfly comes out of the chrysalis.",
        ],
        "A life cycle follows the order things happen: egg, caterpillar, chrysalis, then the adult butterfly.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are written in a formal, factual way that suits an information report about bees? Choose all that are right.",
        [
          "Honey bees live in large groups called colonies.",
          "The queen bee lays all the eggs in the hive.",
          "Bees are super cool and I love them heaps!",
          "Worker bees collect nectar from flowers.",
        ],
        [0, 1, 3],
        "Reports use facts and formal language. 'Super cool' and 'I love them heaps' are chatty opinions, so that sentence doesn't fit.",
      ),
  ],
});

/** EN2-CWT-03: persuasive texts: fact and opinion, structure, evidence, emotive words, connectives and counter-arguments. */
export const PERSUASIVE = levels(4110516, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is an opinion?",
        [
          "Pancakes are the tastiest breakfast.",
          "Pancakes are made with flour.",
          "Pancakes are cooked in a pan.",
          "Pancakes can be eaten with lemon and sugar.",
        ],
        0,
        "'The tastiest' is what someone thinks, and others may disagree. The other sentences can be checked, so they are facts.",
      ),
    (n) =>
      trueFalse(
        n,
        "The conclusion of a persuasive text repeats the writer's opinion.",
        true,
        "The conclusion sums up the argument and states the opinion again so the reader remembers it.",
      ),
    (n) =>
      choice(
        n,
        "Which word sounds the most persuasive?",
        ["essential", "okay", "fine", "alright"],
        0,
        "'Essential' means absolutely needed, so it sounds strong. 'Okay', 'fine' and 'alright' sound weak.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which sentences are opinions? Choose all that are right.",
        [
          "Netball is more exciting than soccer.",
          "A netball team has seven players on the court.",
          "Soccer is a waste of time.",
          "A soccer team has eleven players on the field.",
        ],
        [0, 2],
        "'More exciting' and 'a waste of time' are what someone thinks. The numbers of players can be checked, so they are facts.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'Secondly' or 'In conclusion' to introduce the second reason: Our school should have a vegetable garden. Firstly, it teaches us science. ___, fresh vegetables are good for us.",
        "Secondly",
        "This is the second reason, straight after 'Firstly', so 'Secondly' is the right connective. 'In conclusion' is for the ending.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence would make the best opening for a persuasive text about the school canteen?",
        [
          "I strongly believe our canteen should sell more healthy food.",
          "The canteen is next to the hall.",
          "Some people buy lunch.",
          "Apples are fruit.",
        ],
        0,
        "A persuasive text opens by clearly stating the writer's opinion. 'I strongly believe…' does this.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these connectives in the order they would appear in a persuasive text.",
        ["Firstly", "In addition", "Finally", "In conclusion"],
        "'Firstly' starts the reasons, 'In addition' adds another, 'Finally' gives the last reason and 'In conclusion' begins the ending.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence gives evidence to support the opinion 'Our town needs a skate park'?",
        [
          "Last year, 200 local kids signed a petition asking for one.",
          "Skate parks are cool.",
          "I really want a skate park.",
          "Skating is a sport.",
        ],
        0,
        "Evidence is a fact that backs up the opinion. A petition signed by 200 kids shows real need for a skate park.",
      ),
    (n) =>
      trueFalse(
        n,
        "Using facts and numbers can make a persuasive argument more convincing.",
        true,
        "Facts and numbers show the reader the argument is based on real information, not just feelings.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the most persuasive sentence?",
        [
          "Every single day, rubbish washes onto our beautiful beaches, and we must stop it now.",
          "There is some rubbish on beaches.",
          "Beaches have sand.",
          "Rubbish could maybe be a problem.",
        ],
        0,
        "'Every single day', 'beautiful' and 'we must stop it now' are strong, urgent words that push the reader to act.",
      ),
    (n) =>
      multi(
        n,
        "Which connectives show a result (what happens because of something)? Choose all that are right.",
        ["therefore", "as a result", "so", "however", "meanwhile"],
        [0, 1, 2],
        "Therefore, as a result and so all show a result. 'However' shows a contrast and 'meanwhile' shows time.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Choose 'However' or 'Therefore': Some people think homework is helpful. ___, too much homework leaves no time for sport and family.",
        "However",
        "The second sentence argues the opposite of the first, so 'However' fits. 'Therefore' would show a result.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which rhetorical question would best suit a persuasive text about saving koala habitat?",
        [
          "How would you feel if your home was bulldozed?",
          "How many koalas live in zoos?",
          "When do koalas sleep?",
          "What colour is a koala?",
        ],
        0,
        "A rhetorical question is not asked for an answer. This one makes readers imagine losing their home, just like koalas do.",
      ),
    (n) =>
      choice(
        n,
        "A writer argues that 'Students should be allowed to wear sport uniform every day.' Which sentence answers someone who disagrees?",
        [
          "Some say sport uniforms look less smart, but comfortable clothes help students move and play safely.",
          "Sport uniforms are green.",
          "I like sport.",
          "Uniforms are clothes.",
        ],
        0,
        "This sentence names the other side's argument (looking less smart) and then argues back, which makes the writer's case stronger.",
      ),
    (n) =>
      multi(
        n,
        "A writer believes 'Children should read every night.' Which sentences would make the argument weaker? Choose all that are right.",
        [
          "I suppose it could be okay, maybe.",
          "I'm not really sure this matters.",
          "Reading every night builds a bigger vocabulary.",
          "It is essential that we start tonight.",
        ],
        [0, 1],
        "Unsure words like 'I suppose', 'maybe' and 'not really sure' weaken an argument. A clear reason and strong words make it stronger.",
      ),
  ],
});
