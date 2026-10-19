/**
 * Year 7 English: Stage 4 (NSW English 7–10 syllabus). Two sets of 15 questions for each
 * standard (NESA outcome), three at each level from very easy to very hard. Covers vocabulary,
 * grammar and punctuation, spelling, and the craft of writing. Passages are original.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

const BOATSHED = {
  title: "The Old Boatshed",
  text:
    "Every summer, Grandpa Theo promised to fix the boatshed at the bottom of the garden, and every summer he found a reason not to. By the time Mia turned twelve, the building was completely dilapidated: the roof sagged, two windows were smashed and the door hung from a single rusty hinge.\n\n" +
    '"This year will be different," Mia announced on the first day of the holidays. Grandpa raised an eyebrow but reluctantly agreed to help, muttering that his knees were far too old for ladders.\n\n' +
    "Their supplies were meagre. They had half a tin of green paint, a box of bent nails and a saw so blunt it barely scratched the timber. Mia spent her own pocket money at the hardware store in Kiama on new hinges and a sheet of corrugated iron.\n\n" +
    "For a week they worked from breakfast until the light faded. Grandpa scrutinised every board Mia nailed, running his thumb along the edges and pointing out each gap. At first his comments annoyed her, but slowly she realised he was teaching her, not criticising her.\n\n" +
    "On the final afternoon, they stood back to admire the shed. It was not perfect. The paint was patchy and the door still stuck in wet weather. But it was sturdy, and it was theirs.\n\n" +
    'Grandpa wiped his hands on his overalls. "Next summer," he said, "we build the boat."',
};

const PLATYPUS = {
  title: "The Elusive Platypus",
  text:
    "Few Australian animals are as elusive as the platypus. Many people who live beside rivers in the Blue Mountains or on the New England Tablelands have never seen one, even after years of looking. The platypus is mostly nocturnal, feeding at dawn, at dusk and through the night, and it spends the hot part of the day resting in a burrow dug into the riverbank.\n\n" +
    "When it dives, the platypus closes its eyes, ears and nostrils. Instead of sight, it relies on its bill, which is covered in thousands of tiny sensors that pick up the faint electric signals given off by shrimp, insect larvae and worms. In a single night, a platypus can eat food equal to about a fifth of its own body weight.\n\n" +
    "Sadly, platypuses are vulnerable to many threats. Droughts dry out the pools they depend on, dams change the flow of rivers, and bushfires strip away the plants that hold riverbanks together. Litter is another danger: a platypus can become tangled in a discarded hair tie or fishing line and be unable to free itself.\n\n" +
    "There is good news, though. Volunteers across NSW are replanting creek banks, removing rubbish and reporting sightings to scientists. After heavy rain helps to replenish dry rivers, some groups have even been able to return rescued platypuses to the wild.\n\n" +
    "If you are lucky enough to spot one, stay quiet, keep your distance and enjoy the moment.",
};

const VEGIE_GARDEN = {
  title: "Draft: Every School Needs a Vegie Garden",
  text:
    "Imagine walking past your classroom and picking a ripe tomato for lunch. Wouldn't that be better than another soggy sandwich? Every school in NSW should have its own vegetable garden, and our school should be the first in Tamworth to start one.\n\n" +
    "Firstly, a garden would help students eat better. Experts say that children who grow their own vegetables are far more likely to eat them. At the moment, many students throw away the carrot sticks their parents pack. If they had planted those carrots themselves, they would be proud to eat them.\n\n" +
    "In addition, a garden is an outdoor classroom. Students could measure garden beds in maths, test soil in science and write procedures in English. Learning would become hands-on, practical and fun.\n\n" +
    "Some people argue that a garden costs too much. However, local hardware stores often donate seeds and tools, and the canteen could sell the extra produce at the school fete to raise money. The garden could pay for itself within a year.\n\n" +
    "Our school has a sunny, empty corner beside the oval that is doing nothing. Let's turn it into something that feeds us, teaches us and brings us together. Plant a garden today, and our whole school will reap the rewards tomorrow.",
};

const POOL_LETTER = {
  title: "Letter to the Editor: Save Our Pool",
  text:
    "Dear Editor,\n\n" +
    "I am writing to express my concern about the council's plan to close the Riverside Pool at the end of this season.\n\n" +
    "For more than sixty years, the pool has been the heart of our town in summer. Families cool off there on scorching afternoons, primary school students take their first swimming lessons there, and older residents swim laps every morning to stay healthy. Closing it would take away one of the few places where people of all ages can spend time together.\n\n" +
    "The council claims the pool is too expensive to repair. I understand that money is tight. However, a community fundraiser and a grant from the state government could cover much of the cost. Other country towns have saved their pools in exactly this way.\n\n" +
    "Most importantly, the pool keeps children safe. Learning to swim is an essential skill in a country with so many rivers, dams and beaches. My cousin has a trampoline in her backyard. Without a local pool, many families would have to drive over an hour for lessons, and some simply could not afford to.\n\n" +
    "I urge the council to reconsider its decision and to meet with residents before it is too late. Our pool is worth saving.\n\n" +
    "Yours sincerely,\n\nAva Nguyen, Year 7",
};

/** EN4-URA-01: word meanings from context, Latin and Greek roots, prefixes and suffixes, synonyms, antonyms and register. */
export const VOCABULARY = levels(7120101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "In the sentence 'The hikers were famished after the long walk, so they ate everything in the hut', what does 'famished' mean?",
        ["very hungry", "very tired", "very lost", "very cold"],
        0,
        "The clue is that they 'ate everything in the hut'. People eat everything when they are very hungry, so famished means very hungry.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Ancient' and 'modern' are antonyms.",
        true,
        "Antonyms are words with opposite meanings. Ancient means very old and modern means new, so they are opposites.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 'un-' means not, so 'unlikely' means ___ likely.",
        "not",
        "un- at the start of a word means 'not': unlikely = not likely, unhappy = not happy.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "The Greek root 'auto' means self and 'graph' means write. Which word means a signature that a famous person writes themselves?",
        ["autograph", "photograph", "paragraph", "geography"],
        0,
        "auto (self) + graph (write) = autograph, something written by the person themselves.",
      ),
    (n) =>
      multi(
        n,
        "Which words are synonyms for 'brave'? Choose all that are right.",
        ["courageous", "fearless", "timid", "valiant", "cautious"],
        [0, 1, 3],
        "Synonyms have similar meanings. Courageous, fearless and valiant all mean brave. Timid means shy and easily scared, and cautious means careful.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The suffix '-less' means without. Write the one word that means 'without fear'.",
        "fearless",
        "fear + less (without) = fearless.",
      ),
  ],
  medium: [
    (n) =>
      read(
        BOATSHED,
        choice(
          n,
          "In the first paragraph, what does 'dilapidated' most likely mean?",
          ["falling apart from age and neglect", "freshly painted", "very large", "hidden from view"],
          0,
          "The clues come straight after the colon: the roof sagged, the windows were smashed and the door hung from one rusty hinge. The shed was falling apart.",
        ),
      ),
    (n) =>
      read(
        BOATSHED,
        choice(
          n,
          "In the fourth paragraph, what does 'scrutinised' mean?",
          ["looked at very closely and carefully", "threw away", "quickly ignored", "praised loudly"],
          0,
          "Grandpa ran his thumb along the edges and pointed out each gap, so he was examining every board closely.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which sentence is written in a formal register?",
        [
          "We request that all students arrive by 8:30 am.",
          "Hey guys, get here by half eight, yeah?",
          "Don't be late or you'll be in big trouble!",
          "Rock up early, legends.",
        ],
        0,
        "Formal language is polite and impersonal, with no slang. 'We request that...' is formal. 'Hey guys', 'yeah', 'rock up' and 'legends' are informal.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "The Latin root 'port' means carry. In which words does 'port' have this meaning? Choose all that are right.",
        ["transport", "portable", "import", "portrait", "export"],
        [0, 1, 2, 4],
        "Transport (carry across), portable (able to be carried), import (carry in) and export (carry out) all use 'port' meaning carry. A portrait is a picture of a person, so it does not mean carry.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from coldest to hottest.",
        ["freezing", "lukewarm", "hot", "scorching"],
        "These words show shades of meaning. Freezing is extremely cold, lukewarm is slightly warm, hot is very warm and scorching is extremely hot.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The Greek root 'chron' means time. When events are listed in the order they happened in time, they are in ___ order.",
        ["chronological", "chronologic"],
        "chron (time) + logical = chronological, meaning arranged in time order, like a timeline.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which is the most formal way to rewrite: 'Heaps of kids reckon the canteen food is pretty ordinary.'?",
        [
          "Many students believe the canteen food is of poor quality.",
          "Lots of kids think the canteen food is bad.",
          "Heaps of students reckon canteen food is ordinary.",
          "Many students believe the canteen food is pretty ordinary.",
        ],
        0,
        "A formal version replaces every piece of slang: 'heaps' becomes 'many', 'kids' becomes 'students', 'reckon' becomes 'believe' and 'pretty ordinary' becomes 'of poor quality'. Only the first option changes all of them.",
      ),
    (n) =>
      choice(
        n,
        "'Thrifty' and 'stingy' both describe someone who spends little money. Why would a writer praising their grandmother choose 'thrifty'?",
        [
          "'Thrifty' has a positive connotation (careful and sensible), while 'stingy' sounds mean.",
          "'Thrifty' is a longer word, so it sounds smarter.",
          "'Stingy' is only used for animals.",
          "The two words mean exactly the same thing, so it does not matter.",
        ],
        0,
        "Synonyms can carry different feelings, called connotations. 'Thrifty' suggests someone wise with money; 'stingy' suggests someone selfish who won't share.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The Latin root 'bene' means good and 'mal' means bad. 'Benevolent' means kind and wishing good to others. Write its antonym, built with 'mal'.",
        "malevolent",
        "Swap bene (good) for mal (bad): malevolent means wishing harm to others, the opposite of benevolent.",
      ),
  ],
});

/** EN4-URA-01: word meanings from context, Latin and Greek roots, prefixes and suffixes, synonyms, antonyms and register. */
export const VOCABULARY_2 = levels(7120116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is a synonym for 'enormous'?",
        ["huge", "tiny", "quick", "noisy"],
        0,
        "Enormous means very big. Huge also means very big, so they are synonyms. Tiny is an antonym.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 'pre-' means before, so to preview a film is to view it ___ it is released.",
        "before",
        "pre- means before: preview = view before, prepare = get ready before, prehistoric = before written history.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Hey, what's up?' is an example of informal language.",
        true,
        "'Hey' and 'what's up' are casual words we use with friends, so this is informal. A formal greeting would be 'Good morning, how are you?'",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "The Latin root 'aqua' means water. Which word names a glass tank where fish are kept?",
        ["aquarium", "auditorium", "planetarium", "gymnasium"],
        0,
        "aqua (water) + -arium (a place for) = aquarium, a place for water and the animals that live in it.",
      ),
    (n) =>
      multi(
        n,
        "Which pairs of words are antonyms? Choose all that are right.",
        ["generous – selfish", "rapid – swift", "victory – defeat", "timid – shy", "expand – shrink"],
        [0, 2, 4],
        "Antonyms are opposites: generous/selfish, victory/defeat and expand/shrink. Rapid and swift both mean fast, and timid and shy are similar, so those pairs are synonyms.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The suffix '-ful' means full of. Write the one word that means 'full of hope'.",
        "hopeful",
        "hope + ful (full of) = hopeful. Notice the suffix has only one l.",
      ),
  ],
  medium: [
    (n) =>
      read(
        PLATYPUS,
        choice(
          n,
          "In the first paragraph, what does 'elusive' mean?",
          ["hard to find or catch", "dangerous to touch", "very common", "brightly coloured"],
          0,
          "The next sentence is the clue: many people have never seen one, even after years of looking. So elusive means hard to find.",
        ),
      ),
    (n) =>
      read(
        PLATYPUS,
        choice(
          n,
          "The passage says the platypus is 'mostly nocturnal'. What does 'nocturnal' mean?",
          ["active mainly at night", "able to swim underwater", "living alone", "eating only plants"],
          0,
          "The passage says it feeds at dawn, at dusk and through the night, and rests during the day. Nocturnal comes from the Latin 'nox', meaning night.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The Greek root 'tele' means far and 'scope' means look. A ___ is an instrument for looking at things that are far away, such as stars.",
        ["telescope", "telescopes"],
        "tele (far) + scope (look) = telescope.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these greetings in order from most informal to most formal.",
        ["Hey!", "Hi there,", "Good morning,", "Dear Sir or Madam,"],
        "'Hey!' is for close friends, 'Hi there' is friendly, 'Good morning' is polite, and 'Dear Sir or Madam' is used in formal letters to people you don't know.",
      ),
    (n) =>
      read(
        PLATYPUS,
        choice(
          n,
          "In the fourth paragraph, 'heavy rain helps to replenish dry rivers'. What does 'replenish' mean here?",
          ["fill up again", "wash away", "dry out", "make dirty"],
          0,
          "The prefix re- means again, and the rivers were dry, so rain fills them up again. That is why rescued platypuses could be returned.",
        ),
      ),
    (n) =>
      multi(
        n,
        "The Latin root 'spect' means look. Which words contain this root? Choose all that are right.",
        ["inspect", "spectator", "spectacles", "spend", "spear"],
        [0, 1, 2],
        "To inspect is to look into something, a spectator looks on, and spectacles help you look. 'Spend' and 'spear' just happen to start with sp-; they have no 'spect' root.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The council's decision was met with a cacophony of car horns, shouting and whistles.' What does 'cacophony' mean?",
        ["a harsh mix of loud sounds", "a quiet agreement", "a beautiful melody", "a long silence"],
        0,
        "The context lists car horns, shouting and whistles, which are loud and unpleasant together. The Greek parts help too: 'kakos' means bad and 'phone' means sound.",
      ),
    (n) =>
      choice(
        n,
        "A student is writing to the local member of parliament asking for a new skate park. Which sentence best suits the purpose and audience?",
        [
          "I am writing to ask you to consider funding a skate park for young people in our suburb.",
          "Yo, we really need a skate park, it'd be sick.",
          "Give us a skate park now or else!",
          "Skate parks are cool and you should totally build one.",
        ],
        0,
        "The audience is an important adult the writer doesn't know, so the language should be formal and polite. The other options use slang ('yo', 'sick', 'totally') or sound rude.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "'Legible' means clear enough to read. Add a prefix to write its antonym.",
        "illegible",
        "The prefix 'in-' (not) changes to 'il-' before a word starting with l: il + legible = illegible, with a double l. Compare illegal and illogical.",
      ),
  ],
});

/** EN4-ECA-01: word classes, phrases and clauses, sentence types, and punctuation. */
export const GRAMMAR = levels(7120201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "In 'The tired players walked slowly to the bus', which word is an adverb?",
        ["slowly", "tired", "players", "walked"],
        0,
        "An adverb tells us how, when or where an action happens. 'Slowly' tells us how they walked. 'Tired' is an adjective, 'players' is a noun and 'walked' is a verb.",
      ),
    (n) =>
      trueFalse(
        n,
        "'The kookaburra laughed.' is a simple sentence.",
        true,
        "A simple sentence has one clause: one subject (the kookaburra) and one verb (laughed).",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses an apostrophe correctly?",
        ["It's raining in Bathurst today.", "Its raining in Bathurst today.", "The cat licked it's paw.", "The apple's are ripe."],
        0,
        "'It's' is short for 'it is', so 'It's raining' is correct. 'Its paw' (belonging to it) has no apostrophe, and plain plurals like 'apples' never need one.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which words are nouns in 'Our team won the trophy at the carnival in Dubbo'? Choose all that are right.",
        ["team", "trophy", "carnival", "Dubbo", "won", "our"],
        [0, 1, 2, 3],
        "Nouns name people, places, things or groups: team, trophy, carnival and Dubbo (a proper noun). 'Won' is a verb and 'our' is a possessive word.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "In 'Jai ran to the canteen because he was hungry', the conjunction is ___.",
        "because",
        "A conjunction joins clauses. 'Because' joins 'Jai ran to the canteen' and 'he was hungry' and gives the reason.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is a compound sentence?",
        [
          "I wanted to swim, but the pool was closed.",
          "Because the pool was closed, I went home.",
          "The pool was closed.",
          "Closed for repairs until Monday.",
        ],
        0,
        "A compound sentence joins two main clauses with a coordinating conjunction such as and, but or so. Both 'I wanted to swim' and 'the pool was closed' make sense on their own.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which group of words is a phrase, not a clause?",
        ["under the old gum tree", "the bus arrived", "when the bell rang", "she smiled"],
        0,
        "A clause has a verb (and a subject). 'Under the old gum tree' has no verb, so it is a phrase. The others contain verbs: arrived, rang, smiled.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          '"Hurry up," said Mum, "or we\'ll miss the train."',
          '"Hurry up" said Mum, "or we\'ll miss the train".',
          '"Hurry up," said Mum "or we\'ll miss the train."',
          'Hurry up, said Mum, "or we\'ll miss the train."',
        ],
        0,
        "The spoken words go inside quotation marks, with the comma inside before 'said Mum', another comma after 'Mum', and the full stop inside the closing marks.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 'The students' lockers were painted blue', the apostrophe shows that the lockers belong to more than one student.",
        true,
        "The apostrophe comes after the s in 'students', so it shows plural possession: the lockers of the students.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "In 'Although the forecast was for rain, the cricket match went ahead', which part is the subordinate (dependent) clause?",
        ["Although the forecast was for rain", "the cricket match went ahead", "the forecast", "went ahead"],
        0,
        "A subordinate clause can't stand alone. 'Although the forecast was for rain' leaves us waiting for more. 'The cricket match went ahead' is the main clause.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses a colon correctly?",
        [
          "Pack three things: a hat, a water bottle and sunscreen.",
          "Pack: a hat, a water bottle and sunscreen.",
          "Pack three things a hat: a water bottle and sunscreen.",
          "Pack three: things a hat, a water bottle and sunscreen.",
        ],
        0,
        "A colon comes after a complete idea to introduce a list. 'Pack three things' is complete, so the colon goes after it. Don't put a colon straight after a verb like 'Pack'.",
      ),
    (n) =>
      ordering(
        n,
        "Put these parts in order to make a complex sentence that begins with its subordinate clause.",
        ["When the siren sounded,", "the swimmers", "raced back", "to the beach."],
        "The subordinate clause 'When the siren sounded,' comes first, followed by a comma, then the main clause 'the swimmers raced back to the beach.'",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses a semicolon correctly?",
        [
          "The storm knocked out the power; we ate dinner by torchlight.",
          "The storm knocked out the power; and we ate dinner by torchlight.",
          "Because the storm knocked out the power; we ate dinner by torchlight.",
          "The storm; knocked out the power and we ate dinner by torchlight.",
        ],
        0,
        "A semicolon joins two closely linked main clauses that could each be a sentence. It replaces the conjunction, so we don't add 'and', and it can't follow a subordinate clause starting with 'Because'.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are complex sentences? Choose all that are right.",
        [
          "The koala slept while the tourists took photos.",
          "The koala slept, and the tourists took photos.",
          "If you finish early, you can read quietly.",
          "The tourists who visited the sanctuary loved the koalas.",
          "The koala and the wombat slept all day.",
        ],
        [0, 2, 3],
        "A complex sentence has a main clause plus a subordinate clause: 'while the tourists took photos', 'If you finish early' and 'who visited the sanctuary'. The second sentence is compound (joined by 'and') and the last is simple.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In the sentence 'The fast ended at sunset', what word class is 'fast'?",
        ["noun", "a noun", "common noun"],
        "The same word can belong to different classes. Here 'the fast' is a thing (a time without eating) and it is the subject of 'ended', so it is a noun, not an adjective.",
      ),
  ],
});

/** EN4-ECA-01: word classes, phrases and clauses, sentence types, and punctuation. */
export const GRAMMAR_2 = levels(7120216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is a verb in 'The wombat dug a deep burrow'?",
        ["dug", "wombat", "deep", "burrow"],
        0,
        "A verb is an action or doing word. 'Dug' is what the wombat did.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A word that describes a noun, such as 'gigantic' or 'muddy', is called an ___.",
        ["adjective", "adjectives"],
        "Adjectives describe nouns: a gigantic wave, a muddy paddock.",
      ),
    (n) =>
      trueFalse(
        n,
        "'We're' is a contraction of 'we are'.",
        true,
        "In a contraction the apostrophe shows where letters are left out. We're = we are, with the a left out.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word is a pronoun in 'Lena gave them the tickets'?",
        ["them", "gave", "tickets", "Lena"],
        0,
        "A pronoun takes the place of a noun. 'Them' stands in for the people Lena gave the tickets to.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences use commas correctly in a list? Choose all that are right.",
        [
          "We saw emus, kangaroos and wallabies.",
          "We saw, emus kangaroos and wallabies.",
          "Bring a pen, a ruler, a calculator and a protractor.",
          "Bring a pen a ruler, a calculator, and, a protractor.",
        ],
        [0, 2],
        "Commas separate the items in a list, and the last two items are usually joined with 'and'. A comma doesn't go straight after 'saw' or after 'and'.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is a simple sentence?",
        [
          "The wind howled all night.",
          "The wind howled, so we stayed inside.",
          "Because the wind howled, we stayed inside.",
          "The wind howled and the rain fell, but we slept.",
        ],
        0,
        "A simple sentence has just one clause (one verb group). 'The wind howled all night' has only one verb, 'howled'. The others have two or more clauses.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the contraction for 'will not'.",
        ["won't", "won’t"],
        "'Will not' is an unusual contraction: it becomes won't, with the apostrophe where the o of 'not' was left out.",
      ),
    (n) =>
      choice(
        n,
        "In 'The lizard hid beneath the rock', which word is a preposition?",
        ["beneath", "hid", "lizard", "rock"],
        0,
        "A preposition shows the position or relationship of one thing to another. 'Beneath' tells us where the lizard hid in relation to the rock.",
      ),
    (n) =>
      choice(
        n,
        "Which correctly shows the uniforms belonging to several girls?",
        ["the girls' uniforms", "the girl's uniforms", "the girls uniform's", "the girls's uniforms"],
        0,
        "For a plural ending in s, add the apostrophe after the s: girls'. 'The girl's uniforms' would mean only one girl.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "In 'A huge, hairy huntsman spider crept across the ceiling', which noun group is the subject of the sentence?",
        ["A huge, hairy huntsman spider", "crept across", "across the ceiling", "huge, hairy"],
        0,
        "The subject is who or what does the action. The noun group 'A huge, hairy huntsman spider' did the creeping. 'Across the ceiling' is a prepositional phrase saying where.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences use a colon correctly? Choose all that are right.",
        [
          "There was only one thing left to do: run.",
          "The recipe needs: flour, eggs and milk.",
          "Coach gave us one rule: never give up.",
          "My favourite: subject is maths.",
        ],
        [0, 2],
        "A colon follows a complete idea and introduces what comes next. 'There was only one thing left to do' and 'Coach gave us one rule' are complete, so the colons work. 'The recipe needs' is not complete on its own.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order: simple sentence first, then compound, then complex.",
        ["The bell rang.", "The bell rang, and we went inside.", "When the bell rang, we went inside."],
        "Simple has one clause. Compound joins two main clauses with 'and'. Complex has a subordinate clause, 'When the bell rang', plus a main clause.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses semicolons correctly to separate list items that already contain commas?",
        [
          "The team visited Orange, NSW; Ballarat, Victoria; and Mount Gambier, SA.",
          "The team visited Orange; NSW, Ballarat; Victoria, and Mount Gambier; SA.",
          "The team visited; Orange, NSW, Ballarat, Victoria, and Mount Gambier, SA.",
          "The team visited Orange, NSW, Ballarat, Victoria; and Mount Gambier, SA.",
        ],
        0,
        "When each list item contains a comma (town, state), semicolons separate the items so the reader can tell where each one ends: Orange, NSW; Ballarat, Victoria; and Mount Gambier, SA.",
      ),
    (n) =>
      choice(
        n,
        "'The bus was late, we missed the start of the film.' This is a comma splice. Which is NOT a correct way to fix it?",
        [
          "The bus was late, we missed, the start of the film.",
          "The bus was late; we missed the start of the film.",
          "The bus was late, so we missed the start of the film.",
          "Because the bus was late, we missed the start of the film.",
        ],
        0,
        "A comma alone can't join two main clauses. A semicolon, a conjunction like 'so', or turning one part into a subordinate clause all fix it. Adding another comma just makes it worse.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many clauses are in this sentence? 'When the rain stopped, the kids who had waited inside ran to the oval.'",
        ["3", "three"],
        "Count the verbs: 'When the rain stopped' (1), 'who had waited inside' (2) and the main clause 'the kids ran to the oval' (3).",
      ),
  ],
});

/** EN4-ECA-01: spelling rules and patterns, commonly misspelt words, homophones, plurals and suffix rules. */
export const SPELLING = levels(7120301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["necessary", "neccessary", "necesary", "neccesary"],
        0,
        "Necessary has one c and two s's. A tip: a shirt has one collar (c) and two sleeves (ss).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'potato'.",
        "potatoes",
        "Some words ending in o add -es in the plural: potato becomes potatoes, tomato becomes tomatoes.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Their', 'there' and 'they're' are homophones.",
        true,
        "Homophones sound the same but have different spellings and meanings: their (belonging to them), there (a place) and they're (they are).",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'We need to ___ our bags at the airport.'",
        ["weigh", "way", "whey", "wey"],
        0,
        "'Weigh' means to measure how heavy something is. 'Way' is a path or method, and 'whey' is part of milk.",
      ),
    (n) =>
      multi(
        n,
        "Which plurals are spelt correctly? Choose all that are right.",
        ["churches", "babys", "boxes", "monkeys", "ladys"],
        [0, 2, 3],
        "Words ending in ch or x add -es (churches, boxes). A vowel before y means just add s (monkeys). A consonant before y means change y to i and add -es: babies, ladies.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Adding -ing to 'hope' gives ___.",
        "hoping",
        "When a word ends in a silent e, drop the e before adding a suffix that starts with a vowel: hope → hoping.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["receive", "recieve", "receeve", "resieve"],
        0,
        "Remember 'i before e except after c' when the sound is ee: receive, ceiling, deceive.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add -ed to 'travel'. Write the word using Australian spelling.",
        "travelled",
        "In Australian English, a word ending in a single l after a single vowel doubles the l before -ed or -ing: travel → travelled.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'chief' is 'chieves'.",
        false,
        "Not every word ending in f changes to v. Chief just adds s: chiefs. Others like this are roofs, beliefs and chefs.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The ___ of the story is that honesty matters most.'",
        ["moral", "morale", "morral", "moralle"],
        0,
        "A moral is the lesson of a story. Morale (with an e) means the confidence or spirit of a group, as in 'team morale'.",
      ),
    (n) =>
      multi(
        n,
        "Which of these commonly misspelt words are spelt correctly? Choose all that are right.",
        ["separate", "rhythm", "government", "tommorrow", "beginning"],
        [0, 1, 2, 4],
        "Separate has 'a rat' in it, rhythm has no vowels except y, and government has 'govern' + ment. Tomorrow has one m and two r's.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'unbelievably'.",
        ["un", "believe", "able", "ly"],
        "Prefix first, then base word, then suffixes: un + believe + able + ly. The e of believe drops before -able, and -able + ly becomes -ably: unbelievably.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Why does 'beginning' have a double n, while 'opening' has a single n?",
        [
          "In be-GIN the stress is on the last syllable, so the n doubles; in O-pen the stress is on the first syllable, so it doesn't.",
          "Longer words always double their last letter.",
          "Words starting with a vowel never double letters.",
          "There is no rule; both spellings are guesses.",
        ],
        0,
        "Double the final consonant before a vowel suffix when the word ends in one vowel + one consonant and the last syllable is stressed: be-GIN → beginning, but O-pen → opening.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'phenomenon'.",
        "phenomena",
        "Phenomenon comes from Greek, and Greek words ending in -on often change to -a in the plural: phenomenon → phenomena, criterion → criteria.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses 'compliment' and 'complement' correctly?",
        [
          "Her compliment about my scarf was kind, and its colour is a perfect complement to my coat.",
          "Her complement about my scarf was kind, and its colour is a perfect compliment to my coat.",
          "Her compliment about my scarf was kind, and its colour is a perfect compliment to my coat.",
          "Her complement about my scarf was kind, and its colour is a perfect complement to my coat.",
        ],
        0,
        "A compliment (with i) is praise: think 'I like your scarf'. A complement (with e) completes or goes well with something else.",
      ),
  ],
});

/** EN4-ECA-01: spelling rules and patterns, commonly misspelt words, homophones, plurals and suffix rules. */
export const SPELLING_2 = levels(7120316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["friend", "freind", "frend", "freynd"],
        0,
        "A tip for friend: you are a friend to the end. The word ends in -end, with i before it: fr-i-end.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'mouse' is 'mice'.",
        true,
        "Mouse has an irregular plural: mice. Others like it are goose → geese and foot → feet.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'bus'.",
        "buses",
        "Words ending in s, ss, sh, ch or x add -es in the plural, so bus becomes buses.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'I ___ the ball over the fence by accident.'",
        ["threw", "through", "thorough", "though"],
        0,
        "'Threw' is the past tense of throw. 'Through' means in one side and out the other, 'thorough' means careful and complete, and 'though' means however.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ly to 'happy'. Write the new word.",
        "happily",
        "When a word ends in a consonant + y, change the y to i before adding a suffix: happy → happily.",
      ),
    (n) =>
      multi(
        n,
        "Which words keep the final e of the base word when -ment is added? Choose all that are right.",
        ["achievement", "excitement", "argument", "movement"],
        [0, 1, 3],
        "-ment starts with a consonant, so the e usually stays: achieve → achievement, excite → excitement, move → movement. 'Argument' is a well-known exception: argue drops its e.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["environment", "enviroment", "envirenment", "enviromnent"],
        0,
        "Environment has 'iron' hiding in the middle: env-iron-ment. Many people forget the n before -ment.",
      ),
    (n) => typed("short_answer", n, "Write the plural of 'echo'.", "echoes", "Like potato and hero, echo adds -es in the plural: echoes."),
    (n) =>
      trueFalse(
        n,
        "'Disappear' is spelt with one s and two p's.",
        true,
        "Disappear is the prefix dis- + appear. The prefix has one s and appear has two p's, so: dis + appear = disappear.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which sentences use 'lose' or 'loose' correctly? Choose all that are right.",
        [
          "Don't lose your hat at the beach.",
          "My shoelace is loose.",
          "We might loose the grand final.",
          "The dog got lose from its lead.",
        ],
        [0, 1],
        "Lose (one o) is a verb meaning to misplace or be beaten. Loose (two o's) means not tight or free. So 'we might lose the final' and 'the dog got loose'.",
      ),
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["responsible", "responsable", "resposible", "responsibel"],
        0,
        "Responsible ends in -ible. A useful guide: if the part before the ending is not a whole word (respons), the ending is often -ible; if it is a whole word (depend), it is often -able.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ence to 'refer'. Write the new word.",
        "reference",
        "In re-FER the stress is at the end, but in REF-er-ence it moves to the start, so the r does not double: reference. Compare referred, where the stress stays on FER.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these words are spelt correctly? Choose all that are right.",
        ["conscious", "occasionally", "acommodate", "guarantee", "harrass"],
        [0, 1, 3],
        "Conscious, occasionally (two c's, one s) and guarantee are correct. The right spellings are accommodate (double c, double m) and harass (one r, double s).",
      ),
    (n) =>
      choice(
        n,
        "Why is the plural of 'valley' spelt 'valleys', but the plural of 'city' spelt 'cities'?",
        [
          "When y follows a vowel, just add s; when y follows a consonant, change y to i and add -es.",
          "Words with two l's always add s.",
          "Longer words always change y to i.",
          "There is no rule; you just have to guess.",
        ],
        0,
        "In valley, e (a vowel) comes before y, so add s: valleys. In city, t (a consonant) comes before y, so change y to i and add -es: cities.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'irresponsibility'.",
        ["ir", "respons", "ibil", "ity"],
        "ir- (not) goes first and doubles the r because the base starts with r. Then respons, then -ible changes to -ibil before the suffix -ity: irresponsibility.",
      ),
  ],
});

/** EN4-ECB-01: topic sentences, paragraphing, cohesive connectives, persuasive techniques, revising and editing. */
export const WRITING = levels(7130101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the job of a topic sentence?",
        [
          "It tells the reader the main idea of the paragraph.",
          "It ends the whole essay.",
          "It lists every source the writer used.",
          "It must always be a question.",
        ],
        0,
        "A topic sentence, usually the first sentence of a paragraph, tells the reader what the paragraph is about. The other sentences then support it.",
      ),
    (n) =>
      trueFalse(
        n,
        "You should start a new paragraph when you move to a new idea, time, place or speaker.",
        true,
        "Remember TiPToP: start a new paragraph for a new TIme, PLace, TOpic or Person speaking.",
      ),
    (n) =>
      choice(
        n,
        "Which connective best fills the gap? 'The track was muddy. ___, the race went ahead.'",
        ["However", "Because", "Firstly", "Similarly"],
        0,
        "The second sentence goes against what we'd expect from the first, so we need a contrast connective: However.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which of these are persuasive techniques? Choose all that are right.",
        ["rhetorical question", "emotive language", "repetition", "table of contents", "statistics"],
        [0, 1, 2, 4],
        "Rhetorical questions, emotive language, repetition and statistics are all used to persuade readers. A table of contents just shows where things are in a book.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A word or phrase such as 'therefore', 'in addition' or 'on the other hand' that links ideas is called a ___.",
        ["connective", "connectives", "cohesive connective", "linking word", "transition", "transition word"],
        "Connectives (also called linking words) join ideas so writing flows and the reader can follow how ideas relate.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence has no errors?",
        [
          "Their going to the beach on Saturday.",
          "They're going to the beach on Saturday.",
          "There going to the beach on saturday.",
          "They're going too the beach on Saturday.",
        ],
        1,
        "They're = they are, 'to' shows direction, and days of the week need a capital letter. Only the second sentence gets all of these right.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is the strongest revision of 'The dog was very scared'?",
        [
          "The dog cowered under the table, trembling.",
          "The dog was really, really scared.",
          "The dog was very very scared.",
          "The dog was scared a lot.",
        ],
        0,
        "Show, don't tell: a precise verb (cowered) and a detail (trembling) let the reader picture the fear, instead of just adding 'very' or 'really'.",
      ),
    (n) =>
      read(
        VEGIE_GARDEN,
        choice(
          n,
          "What persuasive techniques does the writer use in the first two sentences?",
          [
            "Asking the reader to imagine a scene, then a rhetorical question",
            "Quoting statistics from a study",
            "Telling a joke",
            "Giving the opposing argument",
          ],
          0,
          "'Imagine walking past your classroom...' puts the reader in the scene, and 'Wouldn't that be better...?' is a rhetorical question: the writer expects you to answer 'yes'.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a well-structured paragraph.",
        [
          "Koalas are in serious trouble in NSW.",
          "Land clearing has destroyed much of the forest they need for food and shelter.",
          "For example, many koalas have lost their homes as new housing estates have spread.",
          "Unless we protect their habitat, koalas could disappear from the wild in NSW.",
        ],
        "Start with the topic sentence (the main idea), then the reason, then an example ('For example' points back to the reason), and finish with a concluding sentence.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which connective shows cause and effect?",
        ["consequently", "meanwhile", "similarly", "for instance"],
        0,
        "'Consequently' means 'as a result', linking a cause to its effect. 'Meanwhile' shows time, 'similarly' compares and 'for instance' gives an example.",
      ),
    (n) =>
      read(
        VEGIE_GARDEN,
        choice(
          n,
          "In the fourth paragraph, what is the job of the connective 'However'?",
          [
            "It signals that the writer is about to argue against the opposing view.",
            "It adds another reason that agrees with the one before.",
            "It shows the order in which things happen.",
            "It introduces an example.",
          ],
          0,
          "The paragraph first gives the other side ('a garden costs too much'), then 'However' turns to the writer's rebuttal: donations and sales could pay for it.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the misspelt word and write it correctly: 'The council should definately build a new skate park.'",
        "definitely",
        "Definitely is spelt with 'finite' inside it: de-finite-ly. Proofreading for spelling is part of editing.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which revision of 'I think that maybe the canteen should possibly sell healthier food' is the most persuasive?",
        [
          "The canteen must sell healthier food.",
          "I think maybe the canteen should sell healthier food.",
          "Maybe the canteen could possibly sell healthier food, I think.",
          "The canteen should sell healthier food, if it wants to, maybe.",
        ],
        0,
        "Words like 'I think', 'maybe' and 'possibly' make the writer sound unsure. High-modality words like 'must' sound confident and convincing.",
      ),
    (n) =>
      read(
        VEGIE_GARDEN,
        choice(
          n,
          "Which sentence in the draft is the weakest evidence, because it needs a source to be convincing?",
          [
            "Experts say that children who grow their own vegetables are far more likely to eat them.",
            "Students could measure garden beds in maths, test soil in science and write procedures in English.",
            "Our school has a sunny, empty corner beside the oval that is doing nothing.",
            "Plant a garden today, and our whole school will reap the rewards tomorrow.",
          ],
          0,
          "'Experts say' doesn't tell us which experts or what study. Naming the source (for example, a university study) would make this evidence much stronger. The other sentences are ideas, a fact the reader can check, or a call to action.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which edit correctly fixes the run-on sentence 'We arrived late the bus had broken down'?",
        [
          "We arrived late because the bus had broken down.",
          "We arrived late, the bus had broken down.",
          "We arrived late the bus, had broken down.",
          "We arrived, late the bus had broken down.",
        ],
        0,
        "Two main clauses can't just run together. Adding the conjunction 'because' joins them correctly. A comma alone makes a comma splice.",
      ),
  ],
});

/** EN4-ECB-01: topic sentences, paragraphing, cohesive connectives, persuasive techniques, revising and editing. */
export const WRITING_2 = levels(7130116, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "A concluding sentence sums up or rounds off the main idea of a paragraph.",
        true,
        "The topic sentence opens the main idea and the concluding sentence wraps it up, often linking back to the topic sentence.",
      ),
    (n) =>
      choice(
        n,
        "Which verb is the most precise replacement for 'went' in 'The kelpie went across the paddock'?",
        ["raced", "was", "did", "got"],
        0,
        "'Raced' tells us exactly how the kelpie moved: fast. Precise verbs help the reader picture the action.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write a connective that adds another point: 'Swimming is good exercise. ___, it is a vital safety skill.'",
        ["Also", "Furthermore", "Moreover", "In addition", "Additionally", "Besides"],
        "The second sentence adds another reason swimming is good, so an adding connective fits: Also, Furthermore, Moreover or In addition.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence would make the best topic sentence for a paragraph about why teenagers need more sleep?",
        [
          "Most teenagers need more sleep than they get.",
          "I went to bed at ten o'clock last night.",
          "Sleep.",
          "Some people have bunk beds.",
        ],
        0,
        "A topic sentence states the main idea of the whole paragraph. The others are a personal detail, a single word, or off topic.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are examples of emotive language? Choose all that are right.",
        ["heartless cruelty", "a devastating loss", "a green bin", "innocent animals", "a Tuesday meeting"],
        [0, 1, 3],
        "Emotive language makes readers feel something strongly. 'Heartless', 'devastating' and 'innocent' stir up feelings; 'a green bin' and 'a Tuesday meeting' are neutral facts.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is correctly punctuated?",
        [
          "My favourite sports are cricket, netball and swimming.",
          "My favourite sports are, cricket netball and swimming.",
          "my favourite sports are cricket, netball and swimming.",
          "My favourite sports are cricket netball, and, swimming.",
        ],
        0,
        "The sentence needs a capital letter at the start, a comma between list items, and no comma straight after 'are' or after 'and'.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which sentence uses inclusive language to persuade?",
        [
          "We all deserve clean, safe parks in our town.",
          "The park is 2 kilometres from the station.",
          "Parks have grass and trees.",
          "The council meets on Mondays.",
        ],
        0,
        "Inclusive language uses words like 'we', 'us' and 'our' to make readers feel part of the same group as the writer, so they are more likely to agree.",
      ),
    (n) =>
      ordering(
        n,
        "Put these connectives in the order a writer would usually use them to structure an argument.",
        ["Firstly", "Secondly", "Finally", "In conclusion"],
        "Firstly, Secondly and Finally introduce the reasons in order, and 'In conclusion' begins the last paragraph that sums up the argument.",
      ),
    (n) =>
      read(
        POOL_LETTER,
        choice(
          n,
          "What is the topic sentence of the paragraph that begins 'For more than sixty years'?",
          [
            "For more than sixty years, the pool has been the heart of our town in summer.",
            "Families cool off there on scorching afternoons.",
            "Closing it would take away one of the few places where people of all ages can spend time together.",
            "Our pool is worth saving.",
          ],
          0,
          "The first sentence states the paragraph's main idea (the pool is the heart of the town). The examples about families, students and older residents all support it.",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the strongest revision of 'It was a nice day at the beach'?",
        [
          "Sunlight glittered on the waves as gulls wheeled above the sand.",
          "It was a really nice day at the beach.",
          "The day at the beach was nice and good.",
          "It was a very nice, nice day at the beach.",
        ],
        0,
        "'Nice' is vague. The first option uses precise verbs (glittered, wheeled) and sensory details so the reader can see the scene.",
      ),
    (n) =>
      trueFalse(
        n,
        "In a persuasive text, admitting an opposing argument and then rebutting it can make your case stronger.",
        true,
        "Showing that you understand the other side, then explaining why it is wrong, makes you seem fair and leaves the reader with your view.",
      ),
    (n) =>
      read(
        POOL_LETTER,
        choice(
          n,
          "Which phrase best describes the tone of Ava's letter?",
          ["concerned but respectful", "angry and rude", "silly and joking", "bored and uninterested"],
          0,
          "Ava shows concern ('express my concern', 'before it is too late') but stays polite: 'I understand that money is tight' and 'I urge the council to reconsider'.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        POOL_LETTER,
        choice(
          n,
          "Which sentence should Ava delete because it does not support the main idea of its paragraph?",
          [
            "My cousin has a trampoline in her backyard.",
            "Learning to swim is an essential skill in a country with so many rivers, dams and beaches.",
            "I understand that money is tight.",
            "Families cool off there on scorching afternoons.",
          ],
          0,
          "That paragraph is about the pool keeping children safe. A cousin's trampoline has nothing to do with swimming or safety, so it breaks the paragraph's cohesion.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which revision combines these sentences most smoothly? 'The storm hit Coffs Harbour. It brought heavy rain. Many roads flooded.'",
        [
          "The storm that hit Coffs Harbour brought such heavy rain that many roads flooded.",
          "The storm hit Coffs Harbour, it brought heavy rain, many roads flooded.",
          "The storm hit Coffs Harbour and it brought heavy rain and then many roads flooded.",
          "The storm, hit Coffs Harbour bringing heavy rain, and many roads, flooded.",
        ],
        0,
        "The first option joins the ideas with 'that' and 'such... that', showing cause and effect in one clear sentence. The second is a comma splice, the third overuses 'and', and the fourth has commas in the wrong places.",
      ),
    (n) =>
      choice(
        n,
        "Which is the correctly edited version of 'Me and Sam has went to the libary yesterday.'?",
        [
          "Sam and I went to the library yesterday.",
          "Me and Sam went to the library yesterday.",
          "Sam and me has gone to the library yesterday.",
          "Sam and I has went to the libary yesterday.",
        ],
        0,
        "Three fixes: 'Sam and I' (the subject form, with the other person first), 'went' (not 'has went'), and the spelling 'library'.",
      ),
  ],
});
