/**
 * Year 8 English: Stage 4 (English 7–10, 2022). Two sets of 15 questions for each standard (NESA outcome),
 * three at each level from very easy to very hard. Covers vocabulary, grammar (including active and
 * passive voice and modality), spelling, and the craft of writing (thesis statements, rhetorical devices,
 * cohesion and editing). Reading questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

const LAST_FERRY = {
  title: "The Last Ferry",
  text: "Mia had always been meticulous about time. She checked the ferry timetable twice, set two alarms and still arrived at Circular Quay twenty minutes early. Tonight, though, a cancelled train had left her stranded at Central, and now she sprinted across the wharf as the last ferry to Manly began to pull away.\n\nThe deckhand, a weathered man with a grey beard, saw her coming. For a moment his expression was inscrutable; Mia could not tell whether he would wait or simply shrug. Then he raised a hand, and the engines dropped to a low murmur. It was a brief reprieve, but it was enough.\n\n'You're lucky,' he said gruffly as she leapt aboard, her chest heaving. 'Skipper's usually not so lenient.'\n\nMia collapsed onto a bench by the window. Outside, the harbour was turning an ominous shade of slate. Thick clouds had smothered the last of the sunset, and a cold wind whipped spray across the deck. Somewhere behind the Opera House, thunder rumbled.\n\nBy the time the ferry crossed the open water near the Heads, the swell had grown relentless. The boat lurched and rolled, and several passengers clutched their seats. Mia, however, felt oddly calm. She had nearly missed this journey, and after the chaos of the afternoon, even a storm felt like a kind of welcome.\n\nWhen the ferry finally nudged against Manly Wharf, she thanked the deckhand. He only grunted, but she was almost certain she saw him smile.",
};

const HONEYEATER = {
  title: "The Honeyeater's Last Song?",
  text: "Fifty years ago, the regent honeyeater was a common sight in the box-ironbark forests of New South Wales and Victoria. Flocks of hundreds of these striking black-and-gold birds would descend on flowering eucalypts, filling the bush with their chatter. Today, only a few hundred are thought to survive in the wild.\n\nWhy has their number dwindled so dramatically? The main cause is the loss of habitat. Over the past century, much of the woodland the birds depend on has been cleared for farms, roads and housing. Without enough flowering trees, the honeyeaters cannot find the nectar they need, and the few birds that remain are spread so thinly that young males struggle to hear older birds sing. Scientists have discovered that some young honeyeaters are now copying the songs of other species, because they have never heard their own.\n\nThe situation is precarious, but it is not hopeless. Zoo keepers breed honeyeaters and release them into protected forests. Volunteers plant thousands of seedlings each year to replenish lost woodland. Landholders who protect old trees on their properties play a vital role too.\n\nEvery one of us can help. Supporting local tree-planting days, donating to conservation groups and telling others about the honeyeater's plight all make a difference. If we act now, these remarkable birds may flourish once more, and their song will again ring through the forests.",
};

const GARDEN_DRAFT = {
  title: "Draft: Our School Needs a Vegetable Garden",
  text: "Every day, students at Riverbank High throw away bags of uneaten, plastic-wrapped food. It is time for a change. Our school should build a vegetable garden because it would teach valuable skills, improve our health and bring the whole community together.\n\nFirstly, a garden is a living classroom. Students could measure garden beds in maths, study soil and insects in science and write about the changing seasons in English. Learning by doing is far more memorable than copying notes from a whiteboard.\n\nSecondly, fresh vegetables are good for us. Imagine biting into a crisp, sweet carrot you grew yourself. Its far tastier than anything sold in the canteen, and it costs almost nothing. Nutritionists agree that young people who eat more vegetables have more energy and concentrate better in class.\n\nFinally, a garden would bring people together. Grandparents could share their gardening knowledge, local businesses could donate tools, and students from every year group could work side by side.\n\nSome people argue that a garden would take too much time to look after. However, a roster of student volunteers, with each class caring for the garden for one week a term, would share the load fairly.\n\nSurely we all want a healthier, greener and more connected school. Let's dig in and start planting today!",
};

const POOL_LETTER = {
  title: "Letter to the Editor: Save Our Pool",
  text: "To the Editor,\n\nI am writing to urge Wattle Creek Council to reverse its plan to close our public pool. The pool is far more than a place to cool off; it is a lifeline for our town.\n\nFirst, the pool keeps children safe. Every summer, more than 400 local children learn to swim there. Without lessons, these children are more likely to get into trouble in rivers, dams and at the beach. Can we really put a price on a child's life?\n\nIn addition, the pool is a meeting place for the whole community. Older residents attend aqua-aerobics classes, teenagers has somewhere to go in the school holidays and families gather on the lawns for birthday parties. Closing it would leave a hole in the heart of our town.\n\nThe council claims that repairs would cost too much. However, a recent survey found that 87 per cent of residents would happily pay a small yearly fee to keep the pool open. Surely the council should listen to the people who elected it.\n\nOur parents swam in this pool, and our children deserve the same chance. I urge every reader to sign the petition at the library and to attend next Tuesday's council meeting. Together, we can save our pool.\n\nYours sincerely,\nEllie Nguyen, Year 8",
};

/** EN4-URA-01: word meanings from context, Latin and Greek roots, prefixes and suffixes, synonyms, antonyms and register. */
export const VOCABULARY = levels(8120101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "'The ancient pottery was so fragile that visitors were not allowed to touch it.' What does 'fragile' mean?",
        ["easily broken", "very heavy", "brightly coloured", "extremely valuable"],
        0,
        "The clue is that visitors could not touch it: something fragile breaks easily, like glass or a thin eggshell.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Benevolent' and 'malevolent' are antonyms.",
        true,
        "The Latin root 'bene' means good and 'male' means bad. Benevolent means kind and wishing good; malevolent means wishing harm. They are opposites.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the prefix in the word 'impossible' that means 'not'.",
        ["im", "im-"],
        "Impossible = im (not) + possible. The prefix im- is used before words starting with p, b or m: impatient, imbalance, immature.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word is an antonym of 'scarce'?",
        ["abundant", "rare", "limited", "sparse"],
        0,
        "Scarce means there is not enough of something. Abundant means there is plenty, so it is the opposite. Rare, limited and sparse are synonyms of scarce.",
      ),
    (n) =>
      multi(
        n,
        "The Latin root 'port' means carry. Which words contain this root? Choose all that are right.",
        ["transport", "portable", "export", "porcupine", "porridge"],
        [0, 1, 2],
        "Transport (carry across), portable (able to be carried) and export (carry out of a country) all come from 'port'. Porcupine and porridge just happen to start with the same letters.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The suffix -ology means 'the study of' and the Greek root 'bio' means life, so the study of living things is ___.",
        "biology",
        "bio (life) + ology (the study of) = biology. The same pattern gives geology (earth) and zoology (animals).",
      ),
  ],
  medium: [
    (n) =>
      read(
        LAST_FERRY,
        choice(
          n,
          "In the first paragraph, what does 'meticulous' most likely mean?",
          ["very careful about details", "often late", "easily frightened", "relaxed and carefree"],
          0,
          "The next sentence is the clue: Mia checks the timetable twice, sets two alarms and arrives early. Meticulous means very careful about every detail.",
        ),
      ),
    (n) =>
      read(
        LAST_FERRY,
        typed(
          "short_answer",
          n,
          "Find the word in paragraph 2 that means 'a short break or rescue from something bad'.",
          "reprieve",
          "The deckhand holds the ferry for a moment, saving Mia from being left behind. 'It was a brief reprieve' means a short rescue from a bad situation.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these requests in order from most informal to most formal register.",
        ["Hey, gimme a sec.", "Hang on a minute.", "Please wait a moment.", "We kindly request your patience."],
        "Slang like 'gimme' is the most casual. 'Hang on' is everyday speech, 'Please wait' is polite, and 'We kindly request your patience' is the formal language of official notices.",
      ),
  ],
  hard: [
    (n) =>
      read(
        LAST_FERRY,
        choice(
          n,
          "The writer says the harbour was turning 'an ominous shade of slate'. Why choose the word 'ominous'?",
          [
            "It suggests that something bad, the storm, is about to happen.",
            "It shows the water is calm and peaceful.",
            "It means the harbour is very large.",
            "It shows Mia is happy to be on the ferry.",
          ],
          0,
          "Ominous means giving a warning that something bad is coming. The next sentences describe thick clouds, cold wind and thunder, so the word builds tension before the storm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "The Greek prefix 'ana-' can mean against and 'chron' means time. A mobile phone in a story set in 1850 is an 'anachronism'. What is an anachronism?",
        ["something placed in the wrong time period", "a story told in time order", "a very old object", "a clock that runs backwards"],
        0,
        "ana (against) + chron (time): something that goes against its time. Mobile phones did not exist in 1850, so the phone is out of place in time.",
      ),
    (n) =>
      multi(
        n,
        "Each word describes someone careful with money. Which have a negative connotation? Choose all that are right.",
        ["stingy", "miserly", "thrifty", "frugal", "tight-fisted"],
        [0, 1, 4],
        "Stingy, miserly and tight-fisted suggest someone mean who will not share. Thrifty and frugal are positive: they suggest someone sensible who avoids waste.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 'intra-' means within and 'inter-' means between. A debating competition held between different schools is an ___ competition.",
        ["interschool", "inter-school"],
        "The competition is between schools, so it takes inter-: interschool. An intraschool competition would be held within one school, such as between houses.",
      ),
    (n) =>
      choice(
        n,
        "A student is writing to the local council. Which sentence is the best formal version of 'Heaps of kids reckon the skate park is pretty dodgy'?",
        [
          "Many young people believe the skate park is unsafe.",
          "Lots of kids think the skate park is kinda dangerous.",
          "Heaps of young people reckon the skate park is unsafe.",
          "The skate park is dodgy, according to many kids.",
        ],
        0,
        "Formal register replaces slang: 'heaps' becomes 'many', 'kids' becomes 'young people', 'reckon' becomes 'believe' and 'dodgy' becomes 'unsafe'. Every other option keeps at least one informal word.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The Greek root 'pseudo' means false and 'nym' means name. Write the word for a false name an author writes under.",
        "pseudonym",
        "pseudo (false) + nym (name) = pseudonym. The p is silent. 'Nym' also appears in synonym (same name) and antonym (opposite name).",
      ),
  ],
});

/** EN4-URA-01: word meanings from context, Latin and Greek roots, prefixes and suffixes, synonyms, antonyms and register. */
export const VOCABULARY_2 = levels(8120116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is closest in meaning to 'commence'?",
        ["begin", "finish", "comment", "combine"],
        0,
        "Commence is a formal word for begin: 'The ceremony will commence at 10 am.' Finish is its antonym.",
      ),
    (n) =>
      trueFalse(
        n,
        "The prefix 'sub-' means under, so a submarine travels under the sea.",
        true,
        "sub (under) + marine (of the sea) = submarine. The same prefix is in subway and submerge.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "An antonym of 'ancient' is ___.",
        ["modern", "new", "recent", "contemporary"],
        "Ancient means very old, so its opposite is modern or new.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "The Greek root 'graph' means write or draw. Which words contain this root? Choose all that are right.",
        ["autograph", "paragraph", "photograph", "giraffe", "grapefruit"],
        [0, 1, 2],
        "An autograph is a name written by yourself, a paragraph is a block of writing, and a photograph is 'drawn with light'. Giraffe and grapefruit only look similar.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is written in an informal register?",
        [
          "No way, the excursion's off!",
          "The excursion has been postponed until further notice.",
          "Students must bring a hat and water bottle.",
          "Parents are advised to collect children at 3 pm.",
        ],
        0,
        "'No way' and the contraction 'excursion's' sound like casual speech between friends. The other sentences use the formal language of a school notice.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add a suffix to the verb 'employ' to make the word for the person who is given a job.",
        "employee",
        "The suffix -ee names the person something is done to: an employee is employed. The suffix -er names the person who does it: the employer gives the job.",
      ),
  ],
  medium: [
    (n) =>
      read(
        HONEYEATER,
        choice(
          n,
          "'Why has their number dwindled so dramatically?' What does 'dwindled' mean?",
          ["become smaller bit by bit", "grown suddenly", "stayed the same", "moved to a new place"],
          0,
          "The passage says there used to be flocks of hundreds and now only a few hundred birds survive at all. Dwindled means gradually became smaller.",
        ),
      ),
    (n) =>
      read(
        HONEYEATER,
        multi(
          n,
          "'Landholders who protect old trees on their properties play a vital role too.' Which words could replace 'vital' without changing the meaning? Choose all that are right.",
          ["essential", "crucial", "optional", "lively"],
          [0, 1],
          "Here vital means extremely important, so essential and crucial fit. Optional is the opposite. 'Lively' is another meaning of vital (a vital person), but it does not fit this sentence.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from the mildest to the strongest feeling of happiness.",
        ["content", "pleased", "delighted", "ecstatic"],
        "Content is quietly satisfied, pleased is a little happier, delighted is very happy, and ecstatic is overwhelmingly, jump-up-and-down happy.",
      ),
  ],
  hard: [
    (n) =>
      read(
        HONEYEATER,
        choice(
          n,
          "'The situation is precarious, but it is not hopeless.' What does 'precarious' mean here?",
          ["unstable and at risk of getting worse", "completely safe", "over and finished", "easy to fix"],
          0,
          "The word 'but' sets up a contrast: the situation is dangerous and could collapse, yet there is still hope. Precarious means insecure and risky.",
        ),
      ),
    (n) =>
      choice(
        n,
        "The Latin root 'dict' means say or speak. Which word means 'to say what will happen before it happens'?",
        ["predict", "contradict", "dictate", "verdict"],
        0,
        "pre (before) + dict (say) = predict. Contradict means speak against, dictate means say aloud for someone to write, and a verdict is a jury's decision.",
      ),
    (n) =>
      trueFalse(
        n,
        "In formal English, 'disinterested' and 'uninterested' mean exactly the same thing.",
        false,
        "A disinterested judge is fair because they gain nothing from the result. An uninterested person is simply bored. The prefixes dis- and un- give different meanings.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        HONEYEATER,
        choice(
          n,
          "In the last paragraph the writer mentions 'the honeyeater's plight' instead of 'the honeyeater's situation'. What is the effect of 'plight'?",
          [
            "It suggests serious, unfair trouble, which stirs the reader's sympathy and urge to help.",
            "It makes the text sound more scientific and neutral.",
            "It tells the reader that the birds are migrating.",
            "It makes the problem sound small and easy to solve.",
          ],
          0,
          "'Situation' is neutral, but 'plight' means a dangerous or sad situation. Its emotional connotation helps persuade readers to act in the very next sentences.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A student is writing to their Member of Parliament. Which sentence uses the most suitable formal register?",
        [
          "I am concerned that the closure of the bus route will make it difficult for students to reach school.",
          "I'm pretty worried the bus thing is gonna wreck everyone's mornings.",
          "Seriously, cutting the bus route is the worst idea ever!!",
          "The bus route closure is a total disaster, to be honest.",
        ],
        0,
        "Formal writing avoids slang (gonna, pretty), exaggeration, double exclamation marks and chatty phrases like 'to be honest'. It states the concern clearly and politely.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The Latin prefix 'circum-' means around and 'navigate' means sail. To sail all the way around the world is to ___ it.",
        "circumnavigate",
        "circum (around) + navigate (sail) = circumnavigate. The same prefix is in circumference, the distance around a circle.",
      ),
  ],
});

/** EN4-ECA-01: word classes, phrases and clauses, sentence types, active and passive voice, modality and punctuation. */
export const GRAMMAR = levels(8120201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "In 'The exhausted players trudged slowly off the oval', which word is an adverb?",
        ["slowly", "exhausted", "trudged", "oval"],
        0,
        "An adverb tells how, when or where an action happens. 'Slowly' tells how the players trudged. 'Exhausted' is an adjective, 'trudged' is a verb and 'oval' is a noun.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Although it rained, the match continued.' is a complex sentence.",
        true,
        "It has a main clause ('the match continued') and a dependent clause starting with the subordinating conjunction 'although'. That makes it complex.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the contraction of 'they are' to complete the sentence: '___ going to the athletics carnival on Friday.'",
        ["They're", "they're"],
        "They + are = they're, with an apostrophe where the a is left out. Don't confuse it with 'their' (belonging to them) or 'there' (a place).",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence is written in the passive voice?",
        [
          "The window was broken by the cricket ball.",
          "The cricket ball broke the window.",
          "Sam hit the ball over the fence.",
          "The ball flew towards the classroom.",
        ],
        0,
        "In the passive voice, the thing receiving the action comes first and the verb uses a form of 'to be' (was broken). The doer, the cricket ball, comes after 'by'.",
      ),
    (n) =>
      multi(
        n,
        "Which words show high modality (strong certainty or obligation)? Choose all that are right.",
        ["must", "certainly", "might", "definitely", "perhaps"],
        [0, 1, 3],
        "Must, certainly and definitely express no doubt. Might and perhaps are low modality: they show something is only possible.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses a semicolon correctly?",
        [
          "The bus was late; we missed the start of the film.",
          "The bus was late; because of the traffic.",
          "We bought; apples, pears and bananas.",
          "Although the bus was late; we arrived on time.",
        ],
        0,
        "A semicolon joins two closely linked main clauses that could each stand alone. 'The bus was late' and 'we missed the start of the film' are both complete sentences.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the subordinating conjunction in this sentence: 'We stayed inside because the storm was severe.'",
        "because",
        "'Because' begins the dependent clause 'because the storm was severe' and links it to the main clause 'We stayed inside'.",
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from lowest to highest modality.",
        ["perhaps", "probably", "almost certainly", "definitely"],
        "Perhaps shows only a chance, probably shows it is likely, almost certainly is very likely, and definitely shows complete certainty.",
      ),
    (n) =>
      choice(
        n,
        "The change rooms belong to all the girls in the team. Which word correctly fills the gap? 'The ___ change rooms were flooded.'",
        ["girls'", "girl's", "girls", "girls's"],
        0,
        "For a plural noun ending in s, add only an apostrophe after the s to show ownership: the girls' change rooms. 'Girl's' would mean one girl.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "'The council will repair the footpath.' Which is the correct passive voice version?",
        [
          "The footpath will be repaired by the council.",
          "The footpath will repair the council.",
          "The council will be repaired by the footpath.",
          "The footpath was repaired by the council.",
        ],
        0,
        "Move the receiver (the footpath) to the front, use 'will be' plus the past participle 'repaired' to keep the future tense, and put the doer after 'by'. The last option wrongly changes the tense to past.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are complex sentences? Choose all that are right.",
        [
          "When the siren sounded, everyone left the pool.",
          "I wanted to go, but I was sick.",
          "The girl who won the race is my cousin.",
          "We ate lunch and then played handball.",
          "Unless you hurry, you'll miss the bus.",
        ],
        [0, 2, 4],
        "Complex sentences have a dependent clause: 'When the siren sounded', 'who won the race' and 'Unless you hurry'. The other two join main clauses or verbs with 'but' and 'and'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Name the punctuation mark that belongs in the gap: 'You will need three things_ a torch, a map and plenty of water.'",
        ["colon", ":"],
        "A colon introduces a list after a complete clause. 'You will need three things' is complete, and the list explains what the things are.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A politician says, 'Mistakes were made, and the money was lost.' Why might they choose the passive voice?",
        [
          "It avoids saying who made the mistakes and lost the money.",
          "It makes the sentence shorter and more exciting.",
          "It is the only correct way to talk about the past.",
          "It shows the politician is taking full responsibility.",
        ],
        0,
        "The passive voice lets a speaker leave out the doer. 'Mistakes were made' hides who made them, which can be used to dodge blame. 'I made mistakes' would take responsibility.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          "“We need to leave now,” said Ms Tran, “or we'll miss the train.”",
          "“We need to leave now” said Ms Tran, “or we'll miss the train”.",
          "“We need to leave now,” said Ms Tran. “or we'll miss the train.”",
          "“We need to leave now, said Ms Tran, or we'll miss the train.”",
        ],
        0,
        "The comma goes inside the first closing quotation mark, another comma follows 'Ms Tran' because the sentence continues, the second part starts with a lower-case 'or', and the full stop sits inside the final quotation mark.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many clauses are in this sentence? 'Although the forecast predicted rain, we packed a picnic because we were optimistic.'",
        ["3", "three"],
        "Each clause has its own verb: 'Although the forecast predicted rain' (predicted), 'we packed a picnic' (packed) and 'because we were optimistic' (were). That is 3 clauses: one main and two dependent.",
      ),
  ],
});

/** EN4-ECA-01: word classes, phrases and clauses, sentence types, active and passive voice, modality and punctuation. */
export const GRAMMAR_2 = levels(8120216, {
  very_easy: [
    (n) =>
      multi(
        n,
        "Which words are nouns in this sentence? 'Courage helped the swimmer cross the river.' Choose all that are right.",
        ["Courage", "swimmer", "river", "helped", "cross"],
        [0, 1, 2],
        "Nouns name people, places, things or ideas. 'Swimmer' and 'river' are common nouns, and 'courage' is an abstract noun (an idea). 'Helped' and 'cross' are verbs.",
      ),
    (n) =>
      choice(
        n,
        "Which of these is a compound sentence?",
        [
          "I like netball, and my brother likes rugby league.",
          "Because it was hot, we went swimming.",
          "Running for the bus in the rain.",
          "The dog that barked all night.",
        ],
        0,
        "A compound sentence joins two main clauses with a coordinating conjunction such as and, but or so. Both 'I like netball' and 'my brother likes rugby league' make sense alone.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 'The children's books were on the shelf', the apostrophe is in the right place.",
        true,
        "'Children' is already plural and does not end in s, so we add 's to show ownership: the children's books.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word has the lowest modality?",
        ["may", "will", "must", "definitely"],
        0,
        "'May' only suggests something is possible. 'Will', 'must' and 'definitely' all show strong certainty or obligation.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Complete this passive sentence in the past tense: 'The trophy ___ presented by the principal.'",
        "was",
        "The passive voice uses a form of 'to be' plus the past participle. One trophy in the past needs 'was': the trophy was presented.",
      ),
    (n) =>
      choice(
        n,
        "In 'The koala in the gum tree was asleep', what is 'in the gum tree'?",
        ["a prepositional phrase that describes the koala", "a main clause", "a dependent clause", "a verb group"],
        0,
        "It starts with the preposition 'in' and has no verb of its own, so it is a phrase, not a clause. It tells us which koala.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these sentences in order: simple, then compound, then complex.",
        ["The dog barked.", "The dog barked, and the cat ran away.", "When the dog barked, the cat ran away."],
        "A simple sentence has one clause. A compound sentence joins two main clauses with 'and'. A complex sentence has a dependent clause starting with 'When'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In the passive sentence 'The essay was written by Priya', who is doing the action? Write the name.",
        "Priya",
        "In a passive sentence the doer comes after 'by'. Priya did the writing. The active version is 'Priya wrote the essay.'",
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses commas correctly?",
        [
          "Mr Lee, our science teacher, ran the marathon.",
          "Mr Lee our science teacher, ran the marathon.",
          "Mr Lee, our science teacher ran the marathon.",
          "Mr, Lee our science teacher ran the marathon.",
        ],
        0,
        "'Our science teacher' is extra information about Mr Lee, so it needs a comma on both sides, like a pair of brackets.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses semicolons correctly in a list?",
        [
          "We visited Dubbo, NSW; Bendigo, Victoria; and Mildura, Victoria.",
          "We visited Dubbo; NSW, Bendigo; Victoria, and Mildura; Victoria.",
          "We visited; Dubbo, NSW, Bendigo, Victoria and Mildura, Victoria.",
          "We visited Dubbo, NSW, Bendigo, Victoria, and Mildura, Victoria;",
        ],
        0,
        "When the items in a list already contain commas, semicolons separate the items so the reader can tell where each one ends: Dubbo, NSW; Bendigo, Victoria; Mildura, Victoria.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences are in the passive voice? Choose all that are right.",
        [
          "The results were announced at assembly.",
          "The cake was eaten before lunch.",
          "The team celebrated its win.",
          "The poem has been read aloud.",
          "The kookaburra was laughing.",
        ],
        [0, 1, 3],
        "In each passive sentence the subject receives the action: results were announced, cake was eaten, poem has been read. 'The kookaburra was laughing' is active: the kookaburra is doing the laughing.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the relative pronoun in this sentence: 'The student whose bag was stolen reported it to the office.'",
        "whose",
        "'Whose' begins the relative clause 'whose bag was stolen', which adds information about the student. Other relative pronouns are who, whom, which and that.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A school newsletter says: 'Students must wear hats at lunch. Sun damage could lead to skin cancer.' Why does the writer use 'must' rather than 'should'?",
        [
          "High modality makes it a firm rule that students have no choice about.",
          "'Must' is softer and more polite than 'should'.",
          "'Should' is grammatically wrong in a newsletter.",
          "'Must' shows the writer is unsure about the rule.",
        ],
        0,
        "'Must' is high modality and shows obligation. 'Should' is medium modality and sounds like advice. The writer wants students to know the rule is not optional.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Running late for the bus, my lunch fell out of my bag.' is correct because it contains a main clause.",
        false,
        "This is a dangling modifier: the opening phrase describes the person running late, but the subject is 'my lunch', so it says the lunch was running late. Fix: 'Running late for the bus, I dropped my lunch.'",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "In the noun group 'the quiet student in the back row', the head noun (the main noun) is ___.",
        "student",
        "Everything else in the group adds detail about the student: 'the' and 'quiet' come before it, and the phrase 'in the back row' comes after it. 'Row' belongs to the phrase, not the head.",
      ),
  ],
});

/** EN4-ECA-01: spelling rules and patterns, commonly misspelt words, homophones, plurals and suffix rules. */
export const SPELLING = levels(8120301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["necessary", "neccessary", "necesary", "neccesary"],
        0,
        "Necessary has one c and two s's. A memory trick: a shirt has one collar and two sleeves.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'potato' is 'potatoes'.",
        true,
        "Some words ending in o add -es in the plural: potatoes, tomatoes, heroes, echoes.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'wolf'.",
        "wolves",
        "Many words ending in f change the f to v and add -es: wolf becomes wolves, like half becomes halves.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The team was not ___ to train on the wet oval.'",
        ["allowed", "aloud", "alowed", "alloud"],
        0,
        "'Allowed' means permitted. 'Aloud' is a homophone meaning out loud, as in reading aloud.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Adding -ing to 'begin' gives ___.",
        "beginning",
        "Begin ends in one vowel and one consonant, and the stress is on the last syllable (be-GIN), so double the n before adding -ing.",
      ),
    (n) =>
      multi(
        n,
        "Which words follow the rule 'i before e, except after c'? Choose all that are right.",
        ["receive", "ceiling", "believe", "weird", "science"],
        [0, 1, 2],
        "Receive and ceiling have ei after c, and believe has ie with no c. Weird (ei, no c) and science (ie after c) are exceptions to the rule.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is the plural of 'phenomenon'?",
        ["phenomena", "phenomenas", "phenomenon's", "phenomenies"],
        0,
        "Phenomenon comes from Greek, and Greek words ending in -on often change to -a in the plural: phenomenon becomes phenomena, like criterion becomes criteria.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'disrespectfully'.",
        ["dis", "respect", "ful", "ly"],
        "Start with the prefix dis-, then the base word respect, then the suffixes -ful and -ly: dis + respect + ful + ly.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ful to 'beauty'. Write the new word.",
        "beautiful",
        "When a word ends in a consonant then y, change the y to i before adding the suffix: beauty becomes beautiful, like plenty becomes plentiful.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence uses the correct homophones?",
        [
          "They're leaving their bags over there.",
          "Their leaving there bags over they're.",
          "There leaving their bags over they're.",
          "They're leaving there bags over their.",
        ],
        0,
        "They're = they are, their = belonging to them, and there = a place. 'They are leaving their bags over there.'",
      ),
    (n) =>
      trueFalse(
        n,
        "'Preferred' doubles the r, but 'preference' does not, because in 'preference' the stress moves to the first syllable.",
        true,
        "Say pre-FERRED (stress at the end, so double the r) and PREF-er-ence (stress at the start, so keep one r). The same happens with referred and reference.",
      ),
    (n) =>
      multi(
        n,
        "Which words are spelt correctly? Choose all that are right.",
        ["separate", "rhythm", "occassion", "conscious", "persistant"],
        [0, 1, 3],
        "Separate, rhythm and conscious are correct. The correct spellings of the others are 'occasion' (one s) and 'persistent' (-ent).",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which is the correct Australian spelling?",
        ["manoeuvre", "manouvre", "manuever", "manoevre"],
        0,
        "Australian English uses the British spelling manoeuvre: m-a-n-o-e-u-v-r-e. The American spelling is maneuver.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the Australian spelling (practice or practise) that fits this sentence: 'The netball team will ___ every Tuesday after school.'",
        "practise",
        "In Australian English, practice with a c is the noun (netball practice) and practise with an s is the verb. Here the team will do the action, so it is the verb: practise.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is correct?",
        [
          "The criteria for the award are listed below.",
          "The criteria for the award is listed below.",
          "The criterias for the award are listed below.",
          "The criterion for the award are listed below.",
        ],
        0,
        "Criteria is the plural of criterion, so it needs the plural verb 'are'. 'Criterias' is not a word, and one criterion would need 'is'.",
      ),
  ],
});

/** EN4-ECA-01: spelling rules and patterns, commonly misspelt words, homophones, plurals and suffix rules. */
export const SPELLING_2 = levels(8120316, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "You can remember how to spell 'separate' because there is 'a rat' in the middle: sep-a-rat-e.",
        true,
        "Separate is often misspelt 'seperate'. Spotting 'a rat' in the middle reminds you that the second vowel is an a.",
      ),
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'I would like a ___ of cake, please.'",
        ["piece", "peace", "peice", "pease"],
        0,
        "A piece is a part of something: a piece of pie. Peace means calm or no war.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'baby'.",
        "babies",
        "When a word ends in a consonant then y, change the y to i and add -es: baby becomes babies.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["environment", "enviroment", "envirnment", "envronment"],
        0,
        "Environment has 'iron' hiding inside it: env-iron-ment. People often leave out the n before -ment.",
      ),
    (n) =>
      multi(
        n,
        "Which plurals are spelt correctly? Choose all that are right.",
        ["heroes", "pianos", "tomatos", "echoes", "radioes"],
        [0, 1, 3],
        "Heroes and echoes add -es. Pianos and radios just add -s (musical words and words with a vowel before the o usually do). So 'tomatos' should be tomatoes and 'radioes' should be radios.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Adding the suffix -ness to 'happy' gives ___.",
        "happiness",
        "Change the y to i before adding the suffix, because happy ends in a consonant then y: happy becomes happiness.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The red scarf ___ her outfit perfectly.'",
        ["complements", "compliments", "complimints", "complaments"],
        0,
        "Complement (with an e) means completes or goes well with. A compliment (with an i) is something nice you say. Tip: complEment completes.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ly to 'basic'. Write the new word.",
        "basically",
        "When a word ends in -ic, add -ally, not just -ly: basic becomes basically, like tragic becomes tragically. 'Publicly' is the main exception.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'misunderstanding'.",
        ["mis", "under", "stand", "ing"],
        "The prefix mis- comes first, then the compound base word under + stand, then the suffix -ing.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The ___ of the story is that honesty matters.'",
        ["moral", "morale", "morall", "moralle"],
        0,
        "A moral is the lesson of a story. Morale (with an e) means the confidence or spirit of a group: 'Team morale was high.'",
      ),
    (n) =>
      trueFalse(
        n,
        "When you add -able to 'manage', you drop the e to make 'managable'.",
        false,
        "The correct spelling is manageable. The e stays so the g keeps its soft 'j' sound, just like in noticeable, where the e keeps the c soft.",
      ),
    (n) =>
      multi(
        n,
        "Which words are spelt correctly? Choose all that are right.",
        ["guarantee", "mischievious", "February", "embarassment", "questionnaire"],
        [0, 2, 4],
        "Guarantee, February and questionnaire are correct. The correct spellings of the others are 'mischievous' (no i before -ous) and 'embarrassment' (double r and double s).",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Adding the suffix -ence to 'occur' gives ___.",
        "occurrence",
        "Occur is stressed on the last syllable (oc-CUR) and ends in one vowel and one consonant, so double the r: occurrence. It keeps double c and double r.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence has every word spelt correctly?",
        [
          "The government's committee will receive the questionnaires on Wednesday.",
          "The goverment's committee will recieve the questionnaires on Wednesday.",
          "The government's commitee will receive the questionnaires on Wednesday.",
          "The government's committee will receive the questionaires on Wensday.",
        ],
        0,
        "Watch for government (the n before -ment), receive (ei after c), committee (double m, double t, double e), questionnaire (double n) and Wednesday (silent d).",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The Greek root 'psych' means mind. Write the word for a person who studies the mind and behaviour (it begins with a silent p).",
        "psychologist",
        "psych (mind) + ology (study of) + ist (a person who) = psychologist. Remember the silent p and the ch that sounds like k.",
      ),
  ],
});

/** EN4-ECB-01: topic sentences, paragraphing, cohesive connectives, thesis statements, persuasive and rhetorical devices, revising and editing. */
export const WRITING = levels(8130101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "What is the main job of a topic sentence?",
        [
          "to introduce the main idea of the paragraph",
          "to end the essay",
          "to list every piece of evidence",
          "to give the title of the text",
        ],
        0,
        "The topic sentence usually comes first in a paragraph and tells the reader what the paragraph is about. The other sentences support it.",
      ),
    (n) =>
      trueFalse(
        n,
        "'In addition' is a connective used to add another point.",
        true,
        "'In addition', 'furthermore' and 'moreover' all signal that the writer is adding another point to the argument.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A question asked for effect, where the writer does not expect an answer, is called a ___ question.",
        "rhetorical",
        "A rhetorical question like 'Who wants to breathe dirty air?' makes the reader think the answer is obvious, which helps persuade them.",
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which of these are persuasive techniques? Choose all that are right.",
        ["rhetorical question", "emotive language", "inclusive language (we, us, our)", "a table of contents", "a glossary"],
        [0, 1, 2],
        "Rhetorical questions, emotive language and inclusive language all try to win the reader over. A table of contents and a glossary help readers find information but do not persuade.",
      ),
    (n) =>
      choice(
        n,
        "Which is the strongest thesis statement for an essay about school uniforms?",
        [
          "School uniforms should stay compulsory because they build school pride, reduce costs for families and keep students safe on excursions.",
          "This essay is about school uniforms.",
          "Some people like uniforms and some people don't.",
          "I am going to talk about uniforms and what people think.",
        ],
        0,
        "A strong thesis takes a clear position (uniforms should stay compulsory) and previews the reasons the essay will argue. The others only announce the topic.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "'The bushfire season was severe. As a result, many families had to leave their homes.' Write the connective that shows cause and effect.",
        ["As a result", "as a result,"],
        "'As a result' links the cause (a severe bushfire season) to its effect (families leaving their homes). Similar connectives are 'therefore' and 'consequently'.",
      ),
  ],
  medium: [
    (n) =>
      read(
        GARDEN_DRAFT,
        choice(
          n,
          "Which sentence is the thesis statement of this draft?",
          [
            "Our school should build a vegetable garden because it would teach valuable skills, improve our health and bring the whole community together.",
            "It is time for a change.",
            "Firstly, a garden is a living classroom.",
            "Let's dig in and start planting today!",
          ],
          0,
          "The thesis states the writer's position and previews the three arguments. Each body paragraph then develops one of them: skills, health and community.",
        ),
      ),
    (n) =>
      read(
        GARDEN_DRAFT,
        choice(
          n,
          "Which technique is used in 'Imagine biting into a crisp, sweet carrot you grew yourself'?",
          [
            "sensory imagery that invites readers to picture the experience",
            "statistics that prove the point",
            "a rebuttal of the other side",
            "a rhetorical question",
          ],
          0,
          "'Crisp' and 'sweet' appeal to touch and taste, and 'Imagine' asks readers to picture themselves enjoying it, which makes the idea appealing.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a well-structured paragraph.",
        [
          "Regular exercise improves students' concentration.",
          "Students who exercise before class often find it easier to focus on their work.",
          "This is because exercise increases blood flow to the brain.",
          "Therefore, schools should timetable sport in the morning.",
        ],
        "A strong paragraph moves from topic sentence, to evidence, to explanation ('This is because'), to a linking sentence that ties back to the argument ('Therefore').",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the strongest revision of 'The storm was very bad and it was really scary.'?",
        [
          "The storm raged through the night, its howling winds tearing tiles from rooftops.",
          "The storm was extremely bad and very, very scary.",
          "The storm was bad, it was scary.",
          "It was a really bad storm and it was scary and bad.",
        ],
        0,
        "Strong writing shows rather than tells. Precise verbs (raged, tearing) and vivid detail (howling winds, tiles from rooftops) replace vague words like 'very bad' and 'scary'. The third option is also a comma splice.",
      ),
    (n) =>
      read(
        GARDEN_DRAFT,
        choice(
          n,
          "Which correction fixes the error in paragraph 3?",
          [
            "Change 'Its' to 'It's'.",
            "Change 'tastier' to 'more tastier'.",
            "Change 'Nutritionists' to 'Nutritionist's'.",
            "Change 'costs' to 'cost'.",
          ],
          0,
          "'Its far tastier' means 'It is far tastier', so it needs the contraction it's. 'Its' without an apostrophe means belonging to it.",
        ),
      ),
    (n) =>
      multi(
        n,
        "An editor is checking a report. Which sentences contain a grammar error? Choose all that are right.",
        [
          "The team's coach praised their effort.",
          "Between you and I, the test was easy.",
          "Neither of the boys have finished the task.",
          "Each of the students has a laptop.",
          "There's lots of reasons to recycle.",
        ],
        [1, 2, 4],
        "After 'between' we need 'me': between you and me. 'Neither' is singular, so 'neither of the boys has'. 'Reasons' is plural, so 'there are lots of reasons'. The other two are correct.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        GARDEN_DRAFT,
        choice(
          n,
          "Why does the writer include paragraph 5, which begins 'Some people argue...'?",
          [
            "To acknowledge an opposing view and rebut it, which makes the argument more convincing.",
            "To admit that the garden is a bad idea.",
            "To add a new reason why vegetables are healthy.",
            "To give the conclusion before the end.",
          ],
          0,
          "This is a rebuttal. The writer raises a likely objection (the garden takes too much time) and answers it with a solution (a class roster), showing they have thought about both sides.",
        ),
      ),
    (n) =>
      multi(
        n,
        "A speech ends: 'We will plant, we will grow, we will share.' Which rhetorical devices does it use? Choose all that are right.",
        ["repetition", "the rule of three", "simile", "hyperbole"],
        [0, 1],
        "'We will' is repeated at the start of each part, and there are three parts, which makes the line rhythmic and memorable. There is no comparison (simile) or exaggeration (hyperbole).",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type a one-word connective that shows a result to fill the gap: 'Many students arrive at school without breakfast. ___, a school garden could give them fresh food.'",
        ["Therefore", "Consequently", "Thus", "Hence"],
        "The second sentence is a result of the first, so it needs a cause-and-effect connective such as 'Therefore' or 'Consequently'. 'However' would wrongly signal a contrast.",
      ),
  ],
});

/** EN4-ECB-01: topic sentences, paragraphing, cohesive connectives, thesis statements, persuasive and rhetorical devices, revising and editing. */
export const WRITING_2 = levels(8130116, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "A writer usually starts a new paragraph when moving to a new idea, time, place or speaker.",
        true,
        "Paragraphs group related sentences. Starting a new one signals a change, which helps the reader follow the text.",
      ),
    (n) =>
      choice(
        n,
        "Which connective shows contrast?",
        ["however", "furthermore", "therefore", "firstly"],
        0,
        "'However' signals that the next idea is different from or opposite to the last one. Furthermore adds, therefore shows a result and firstly shows order.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The sentence that tells the reader the main idea of a paragraph is called the ___ sentence.",
        "topic",
        "The topic sentence states the paragraph's main idea, usually at the very start.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence uses emotive language?",
        [
          "Helpless puppies are being abandoned on our streets every single day.",
          "Some dogs live in animal shelters.",
          "The shelter opens at 9 am.",
          "Dogs need food, water and exercise.",
        ],
        0,
        "Words like 'helpless' and 'abandoned' are chosen to make readers feel sad or angry. The other sentences state facts without trying to stir feelings.",
      ),
    (n) =>
      ordering(
        n,
        "Put these parts of a persuasive essay in order.",
        [
          "a hook to grab attention",
          "the thesis statement",
          "body paragraphs with arguments and evidence",
          "a conclusion that restates the thesis",
        ],
        "An introduction opens with a hook, then states the thesis. Body paragraphs develop the arguments, and the conclusion sums up and restates the position.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What is the name of the persuasive technique where a writer uses 'we', 'us' and 'our' to make readers feel part of a group?",
        ["inclusive language", "inclusive"],
        "Inclusive language puts the writer and reader on the same side: 'We all want a safer town.' It makes readers more likely to agree.",
      ),
  ],
  medium: [
    (n) =>
      read(
        POOL_LETTER,
        choice(
          n,
          "Which sentence states the writer's main contention (thesis)?",
          [
            "I am writing to urge Wattle Creek Council to reverse its plan to close our public pool.",
            "Every summer, more than 400 local children learn to swim there.",
            "The council claims that repairs would cost too much.",
            "Together, we can save our pool.",
          ],
          0,
          "The main contention is the writer's overall position, stated in the first paragraph: the council should not close the pool. The other sentences are evidence, a counterargument or a rallying call.",
        ),
      ),
    (n) =>
      read(
        POOL_LETTER,
        choice(
          n,
          "'Can we really put a price on a child's life?' Which persuasive technique is this?",
          ["rhetorical question", "statistic", "rebuttal", "alliteration"],
          0,
          "The writer does not expect an answer; the obvious answer is 'no'. This rhetorical question also uses emotive language about children's safety.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which connectives add information? Choose all that are right.",
        ["furthermore", "moreover", "in addition", "nevertheless", "consequently"],
        [0, 1, 2],
        "Furthermore, moreover and in addition add another point. Nevertheless shows contrast and consequently shows a result.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which is the strongest, most concise revision of 'In my personal opinion, I think that the canteen should sell healthier food options.'?",
        [
          "The canteen should sell healthier food.",
          "In my opinion, I think the canteen should sell healthier food options.",
          "I personally think, in my opinion, that the canteen should sell healthier food.",
          "Healthier food options, in my personal opinion, I think the canteen should sell.",
        ],
        0,
        "'In my personal opinion' and 'I think' say the same thing twice, and both weaken the claim. Stating the point directly is clearer and more persuasive.",
      ),
    (n) =>
      read(
        POOL_LETTER,
        typed(
          "short_answer",
          n,
          "Paragraph 3 has a subject–verb agreement error. Type the word that should be changed to 'have'.",
          "has",
          "'Teenagers' is plural, so it needs the plural verb: teenagers have somewhere to go. 'Has' goes with a singular subject, such as 'a teenager has'.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'Furthermore' and 'however' can be swapped in a paragraph without changing the meaning, because both are connectives.",
        false,
        "Connectives have different jobs. 'Furthermore' adds a similar point, but 'however' signals a contrast. Swapping them would confuse the reader about how the ideas link.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        POOL_LETTER,
        choice(
          n,
          "How does the writer rebut the council's argument in paragraph 4?",
          [
            "With survey evidence that most residents would pay a fee to keep the pool open, so cost need not close it.",
            "By agreeing that repairs cost too much and the pool should close.",
            "By insulting the council members.",
            "By changing the subject to birthday parties.",
          ],
          0,
          "The writer states the council's claim, then uses 'However' and a statistic (87 per cent of residents would pay) to show there is a way to cover the cost. That is a rebuttal backed by evidence.",
        ),
      ),
    (n) =>
      choice(
        n,
        "'Our parks are the lungs of our city.' Which device is this, and what is its effect?",
        [
          "a metaphor that suggests parks are as essential to the city as lungs are to a body",
          "a simile that compares parks to trees using 'like'",
          "personification that makes parks seem angry",
          "alliteration that makes the sentence sound musical",
        ],
        0,
        "It says parks ARE lungs, without 'like' or 'as', so it is a metaphor. Lungs keep a body alive by bringing in clean air, so the image suggests parks are vital to a city's health.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Type a one-word connective that shows contrast to fill the gap: 'Mobile phones can distract students. ___, they can be useful research tools when teachers set clear rules.'",
        ["However", "Nevertheless", "Nonetheless", "Yet", "Still", "Conversely"],
        "The second sentence gives the other side of the argument, so it needs a contrast connective such as 'However' or 'Nevertheless'. 'Therefore' would wrongly signal a result.",
      ),
  ],
});
