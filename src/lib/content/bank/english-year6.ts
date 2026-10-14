/**
 * Year 6 English: 15 questions for each Stage 3 standard (NESA outcome), three at each
 * level from very easy to very hard. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN3-SPELL-01: prefixes, suffixes, Greek and Latin roots, silent letters, tricky plurals and homophones. */
export const SPELLING = levels(6130101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["definately", "definitely", "definitly", "defanitely"],
        1,
        "'Definitely' has the word 'finite' hiding inside it: de-finite-ly.",
      ),
    (n) => trueFalse(n, "The w in 'wrestle' is silent.", true, "We say 'ressle', so the w is silent. The t is silent too."),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'knife'.",
        "knives",
        "Many words ending in f or fe change to v and add -es: knife becomes knives.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The school ___ spoke at assembly.'",
        ["principle", "principal", "principel", "prinsipal"],
        1,
        "The principal is the head of a school. A principle is a rule or belief. Tip: the principal is your pal.",
      ),
    (n) =>
      multi(
        n,
        "Which words drop the final e before adding -able? Choose all that are right.",
        ["lovable", "usable", "noticeable", "adorable"],
        [0, 1, 3],
        "love, use and adore drop the e. 'Noticeable' keeps the e so the c still sounds like s.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Adding the prefix mis- to 'spell' makes the word ___.",
        "misspell",
        "A prefix doesn't change the base word, so mis + spell keeps both s's: misspell.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is the plural of 'crisis'?",
        ["crisises", "crises", "crisis's", "crisi"],
        1,
        "Words ending in -is from Greek change to -es in the plural: crisis becomes crises, like oasis becomes oases.",
      ),
    (n) =>
      choice(
        n,
        "The Latin root 'aud' means hear. Which word means 'able to be heard'?",
        ["audible", "auditorium", "audience", "audition"],
        0,
        "aud (hear) + ible (able to be) = audible. An auditorium is a place, an audience is people, and an audition is a tryout.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ly to 'gentle'. Write the new word.",
        "gently",
        "When a word ends in -le, replace the e with y: gentle becomes gently, like simple becomes simply.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The medicine had no ___ on my cough.'",
        ["effect", "affect", "affeckt", "efect"],
        0,
        "Here we need a noun (the result), which is 'effect'. 'Affect' is usually a verb: the cold can affect you.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'disagreements'.",
        ["dis", "agree", "ment", "s"],
        "Prefix first, then the base word, then the suffixes: dis + agree + ment + s.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 'occurred', the r is doubled because 'occur' ends in one vowel and one consonant, and the stress is on the last syllable.",
        true,
        "Say oc-CUR: the stress is at the end, so the final r doubles before -ed. Compare 'visited', where the stress is at the start.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these words are spelt correctly? Choose all that are right.",
        ["accommodation", "embarrass", "conscience", "privelege", "mischievous"],
        [0, 1, 2, 4],
        "Accommodation has double c and double m, embarrass has double r and double s, and conscience has 'science' in it. The correct spelling is 'privilege'.",
      ),
    (n) =>
      choice(
        n,
        "Why does 'magician' end in -cian instead of -tion?",
        [
          "It names a person with a skill, and the base word 'magic' ends in c.",
          "All words about tricks end in -cian.",
          "It is a mistake; it should be 'magition'.",
          "-cian is used for every word with three syllables.",
        ],
        0,
        "-cian is used for people's jobs or skills when the base word ends in c: magic → magician, music → musician, electric → electrician.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The Latin root 'bene' means good and 'fact' means do. A person who does good by giving money to help others is a ___.",
        "benefactor",
        "bene (good) + fact (do) + or (a person who) = benefactor.",
      ),
  ],
});

/** EN3-VOCAB-01: Tier 2 and Tier 3 words, word parts and precise meanings in context. */
export const VOCAB = levels(6140101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'reluctant'?",
        ["unwilling", "eager", "angry", "quick"],
        0,
        "If you are reluctant to do something, you don't really want to: you are unwilling.",
      ),
    (n) =>
      trueFalse(
        n,
        "Something 'transparent' can be seen through.",
        true,
        "Glass and clear plastic are transparent: light passes through them so you can see what's behind.",
      ),
    (n) =>
      choice(
        n,
        "Which word means the opposite of 'temporary'?",
        ["permanent", "short", "brief", "quick"],
        0,
        "Temporary means lasting only a short time. Its opposite is permanent, lasting for ever.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "'The evidence was conclusive, so the case was closed.' What does 'conclusive' mean?",
        ["proving something without doubt", "confusing", "missing", "very old"],
        0,
        "The case was closed because the evidence settled it. Conclusive means it proves something so there is no doubt left.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The prefix 'anti-' means against. Write the word that means 'against bacteria'.",
        ["antibacterial", "anti-bacterial"],
        "anti (against) + bacterial = antibacterial, like antibacterial hand wash.",
      ),
    (n) =>
      multi(
        n,
        "Which words mean 'to make something smaller or less'? Choose all that are right.",
        ["diminish", "reduce", "amplify", "lessen", "expand"],
        [0, 1, 3],
        "Diminish, reduce and lessen all mean make smaller. Amplify and expand mean make bigger.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from least angry to most angry.",
        ["irritated", "angry", "furious", "livid"],
        "Irritated is a little cross, angry is stronger, furious is very angry, and livid is so angry you might shake.",
      ),
    (n) =>
      choice(
        n,
        "In geography, what does 'erosion' mean?",
        [
          "the wearing away of land by water, wind or ice",
          "the building of new mountains",
          "the planting of trees on bare land",
          "a sudden shaking of the ground",
        ],
        0,
        "Erosion is when water, wind or ice slowly wear away soil and rock, like waves wearing away a cliff.",
      ),
    (n) =>
      choice(
        n,
        "In which sentence does 'current' mean a flow of water?",
        [
          "The swimmer was pulled out by a strong current.",
          "Read the current issue of the magazine.",
          "Our current teacher is Mr Jones.",
          "Check the current time.",
        ],
        0,
        "Only the swimming sentence is about moving water. In the others, 'current' means happening now.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "'Photo' means light and 'synthesis' means putting together. What is photosynthesis?",
        [
          "how plants use light to make their own food",
          "taking photographs of plants",
          "how animals see in the dark",
          "the way light bounces off water",
        ],
        0,
        "photo (light) + synthesis (putting together): plants use light energy to put together food from water and carbon dioxide.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'Legible' means able to be read. Handwriting that cannot be read is ___.",
        "illegible",
        "The prefix in- (meaning not) becomes il- before an l: il + legible = illegible.",
      ),
    (n) =>
      choice(
        n,
        "Which word most precisely describes a scientist who checks every tiny detail very carefully?",
        ["meticulous", "careless", "nice", "busy"],
        0,
        "Meticulous means showing great care and attention to detail. 'Nice' and 'busy' are too vague.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The mayor's answer was ambiguous; reporters could not tell whether she supported the plan.' What does 'ambiguous' mean here?",
        ["able to be understood in more than one way", "very angry", "completely clear", "very long"],
        0,
        "The reporters couldn't tell what she meant, so her answer could be read more than one way. That is ambiguous.",
      ),
    (n) =>
      multi(
        n,
        "The Latin root 'spect' means look. In which words does it carry that meaning? Choose all that are right.",
        ["inspect", "spectator", "spectacles", "speckled", "special"],
        [0, 1, 2],
        "To inspect is to look closely, a spectator looks on, and spectacles help you look. Speckled and special just share some letters.",
      ),
    (n) =>
      choice(
        n,
        "'Humpback whales migrate north each winter.' Which is the most precise meaning of 'migrate' here?",
        [
          "travel from one region to another at a particular time of year",
          "swim fast",
          "move house permanently",
          "go somewhere once by accident",
        ],
        0,
        "The whales go north 'each winter', so the move is seasonal and repeated. That is what migrate means for animals.",
      ),
  ],
});

const SUPPLY_BOAT = {
  title: "Good Eyes",
  text:
    "Nobody on Montague Island could remember the last time the supply boat had been late. So when it failed to appear on Friday morning, Kirra's father paced the jetty, checking his watch every few minutes.\n\n" +
    "By afternoon, the wind had swung to the south and the sea had turned the colour of slate. Kirra watched her father climb the lighthouse stairs two at a time. She knew what he was thinking, though he would never say it aloud in front of her.\n\n" +
    "Just after six, as the light began its slow sweep across the water, Kirra spotted something: a tiny orange flare, low on the horizon, then another.\n\n" +
    '"Dad!" she shouted up the stairwell. "Flares! North-east!"\n\n' +
    "Her father was already reaching for the radio. Within an hour, the rescue boat from Narooma had found the supply boat drifting with a broken engine, its crew cold, soaked and very relieved.\n\n" +
    'That night, Kirra\'s father made her a hot chocolate and said only, "Good eyes." But he kept his hand on her shoulder for a long time.',
};

const MICROBATS = {
  title: "Small Bats, Big Help",
  text:
    "When most people picture an Australian bat, they imagine a large flying-fox hanging in a fig tree. Yet most of Australia's bat species are microbats, tiny creatures that can weigh less than a twenty-cent coin.\n\n" +
    "Microbats hunt at night using echolocation. A microbat sends out high-pitched calls, too high for humans to hear, and listens for the echoes that bounce back. From these echoes it can work out the size, shape and distance of an insect, even in total darkness.\n\n" +
    "This skill makes microbats valuable to farmers and city dwellers alike. A single microbat can eat hundreds of mosquitoes and moths in one night, reducing pests without chemicals.\n\n" +
    "Unfortunately, many microbat species are under threat. Old trees with hollows, where microbats roost during the day, are often cleared for housing and farming. Some councils now encourage residents to put up bat boxes, which act as artificial hollows.\n\n" +
    "Protecting microbats, then, is not just good for bats. It is good for anyone who would rather not be bitten by a mosquito.",
};

const CAMP_PHONES = {
  title: "Should Students Bring Phones on Camp?",
  text:
    "Each year, Year 6 at Riverside Public School spends three days at a camp in the Blue Mountains. This year, the student council was asked whether students should be allowed to bring phones.\n\n" +
    "Supporters argue that phones help students keep in touch with family, especially students who are nervous about being away from home for the first time. They also point out that phones have cameras, so students can record memories of the trip.\n\n" +
    "Others disagree. Teachers note that the camp has a landline and that staff can contact families at any time. They worry that phones would distract students from the activities, such as abseiling and bushwalking, that make camp special. Some parents are also concerned that expensive devices could be lost or broken.\n\n" +
    "After weighing up both sides, the student council recommended a compromise: students may bring a disposable camera, but phones will stay at home. Families will receive a daily update and photos through the school app.",
};

const NEW_KID = {
  title: "The Sketchbook",
  text:
    "On her first day at Lithgow Public, Sofia wore her old school jumper inside out so nobody would see the crest. It didn't work. By recess, three people had asked her why she'd moved, and she had given three different answers.\n\n" +
    "At lunch she sat on the bench near the library, pretending to read. A boy with paint on his fingers sat down at the other end. He didn't say anything. He just opened a sketchbook and started drawing the gum tree in front of them.\n\n" +
    'After a while, Sofia leaned over. "The branch on the left is wrong," she said. "It bends the other way."\n\n' +
    'The boy looked up at the tree, then at his drawing, and laughed. "You\'re right." He tore out a page and handed it to her with a pencil. "Show me."\n\n' +
    "The bell rang twenty minutes later. Sofia was surprised. She had forgotten to check the time even once.",
};

const HARBOUR_BRIDGE = {
  title: "Building the Harbour Bridge",
  text:
    "The Sydney Harbour Bridge, opened in 1932, is one of the most famous steel arch bridges in the world. Building it was a remarkable feat of engineering.\n\n" +
    "First, workers dug deep foundations on both sides of the harbour and built huge granite-faced pylons. Surprisingly, the pylons are mostly decorative; the real weight of the bridge rests on giant steel pins at the base of the arch.\n\n" +
    "Next, the two halves of the arch were built outwards from each shore at the same time. Because there was nothing underneath to hold them up, each half was held back by strong steel cables fixed into tunnels dug in the rock behind it.\n\n" +
    "As the halves crept closer, engineers checked their measurements every day. Heat from the sun made the steel expand, so the gap between the halves changed size from morning to afternoon. In August 1930, the cables were slowly let out and the two halves met in the middle.\n\n" +
    "Finally, the road deck was hung from the arch, and trains, cars and people could at last cross the harbour without a ferry.",
};

/** EN3-RECOM-01: reading for main idea, inference, author's purpose and text structure. */
export const READING = levels(6150101, {
  very_easy: [
    (n) =>
      read(
        SUPPLY_BOAT,
        choice(
          n,
          "Why was Kirra's father worried at the start of the story?",
          ["The supply boat was late.", "The lighthouse was broken.", "Kirra was lost.", "It was too hot."],
          0,
          "The first paragraph says the supply boat 'failed to appear', so he paced the jetty checking his watch.",
        ),
      ),
    (n) =>
      read(
        MICROBATS,
        typed(
          "short_answer",
          n,
          "What do microbats use to find insects in the dark?",
          "echolocation",
          "The second paragraph says microbats hunt using echolocation: they listen for the echoes of their calls.",
        ),
      ),
    (n) =>
      read(
        CAMP_PHONES,
        trueFalse(
          n,
          "The student council decided that students could bring their phones on camp.",
          false,
          "The last paragraph says phones will stay at home. Students may bring a disposable camera instead.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        SUPPLY_BOAT,
        choice(
          n,
          "'She knew what he was thinking, though he would never say it aloud in front of her.' What was he most likely thinking?",
          [
            "that the supply boat might be in trouble at sea",
            "that it was time for dinner",
            "that the lighthouse needed painting",
            "that Kirra should do her homework",
          ],
          0,
          "The boat was late and a storm was coming in, so he was probably afraid it was in danger. He didn't say it so Kirra wouldn't worry.",
        ),
      ),
    (n) =>
      read(
        CAMP_PHONES,
        multi(
          n,
          "Which are arguments FOR letting students bring phones? Choose all that are right.",
          [
            "Students can keep in touch with family.",
            "Students can take photos of the trip.",
            "Phones might distract students from activities.",
            "Expensive phones could be lost or broken.",
          ],
          [0, 1],
          "Paragraph two gives the supporters' reasons: keeping in touch and recording memories. The other two are arguments against.",
        ),
      ),
    (n) =>
      read(
        HARBOUR_BRIDGE,
        ordering(
          n,
          "Put these building stages in the order they happened.",
          [
            "Foundations and pylons were built.",
            "Two halves of the arch were built out from each shore.",
            "The two halves of the arch met in the middle.",
            "The road deck was hung from the arch.",
          ],
          "The signal words First, Next, In August 1930 and Finally show the order of the stages.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        MICROBATS,
        choice(
          n,
          "What is the main idea of the third paragraph?",
          [
            "Microbats help people by eating pests.",
            "Microbats are smaller than flying-foxes.",
            "Microbats sleep in tree hollows.",
            "Farmers use chemicals to kill moths.",
          ],
          0,
          "The paragraph says microbats are valuable because one can eat hundreds of mosquitoes and moths a night. That is the main idea.",
        ),
      ),
    (n) =>
      read(
        NEW_KID,
        choice(
          n,
          "Why did Sofia most likely give three different answers about why she moved?",
          [
            "She didn't want to share the real reason with people she didn't know.",
            "She couldn't remember why she moved.",
            "She was trying to be funny.",
            "She had moved three times.",
          ],
          0,
          "She also turned her jumper inside out to hide her old school. She seems to want to keep her past private, so she avoided the real answer.",
        ),
      ),
    (n) =>
      read(
        CAMP_PHONES,
        ordering(
          n,
          "Put the parts of this text in the order they appear.",
          ["background about the camp", "arguments for bringing phones", "arguments against bringing phones", "the council's decision"],
          "This is a discussion text: it sets the scene, gives one side, then the other side, and ends with a recommendation.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        SUPPLY_BOAT,
        choice(
          n,
          "What does the last sentence suggest about Kirra's father?",
          [
            "He is proud and grateful, but shows it through actions more than words.",
            "He is angry that Kirra shouted.",
            "He is too tired to talk.",
            "He doesn't care what Kirra did.",
          ],
          0,
          "He only says 'Good eyes', but keeping his hand on her shoulder 'for a long time' shows deep feelings he doesn't put into words.",
        ),
      ),
    (n) =>
      read(
        NEW_KID,
        choice(
          n,
          "'She had forgotten to check the time even once.' What does this suggest?",
          [
            "She was enjoying herself and no longer felt so alone.",
            "Her watch was broken.",
            "She wanted to be late for class.",
            "She didn't hear the bell.",
          ],
          0,
          "When we are bored or uncomfortable we keep checking the time. Forgetting to shows she was absorbed and happy drawing with the boy.",
        ),
      ),
    (n) =>
      read(
        HARBOUR_BRIDGE,
        choice(
          n,
          "Why did the engineers need to check their measurements every day?",
          [
            "The sun's heat made the steel expand, so the gap kept changing.",
            "The cables kept snapping.",
            "Workers kept losing their rulers.",
            "The harbour water was rising.",
          ],
          0,
          "The text explains that heat made the steel expand, so the gap was a different size in the morning and the afternoon.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        MICROBATS,
        choice(
          n,
          "Which best sums up the author's purpose in this text?",
          [
            "to inform readers about microbats and persuade them that microbats are worth protecting",
            "to entertain readers with a story about a bat",
            "to explain how to build a bat box",
            "to warn readers that bats are dangerous",
          ],
          0,
          "Most of the text gives facts, but the last part argues that protecting microbats is 'good for anyone'. It informs and persuades.",
        ),
      ),
    (n) =>
      read(
        NEW_KID,
        multi(
          n,
          "Which details suggest Sofia was trying to hide or avoid attention at first? Choose all that are right.",
          [
            "She wore her jumper inside out.",
            "She gave three different answers.",
            "She sat pretending to read.",
            "She told the boy his drawing was wrong.",
          ],
          [0, 1, 2],
          "Hiding the crest, dodging questions and pretending to read all keep people away. Speaking up about the drawing is the moment she stops hiding.",
        ),
      ),
    (n) =>
      read(
        HARBOUR_BRIDGE,
        choice(
          n,
          "Which statement would the author agree with?",
          [
            "The pylons look strong, but they do not carry the main weight of the bridge.",
            "The arch was built from one side of the harbour to the other.",
            "The road deck was built before the arch.",
            "The cables held up the bridge after it was finished.",
          ],
          0,
          "Paragraph two says the pylons are 'mostly decorative' and the weight rests on steel pins. The other statements contradict the text.",
        ),
      ),
  ],
});

const OLD_JETTY = {
  title: "The Old Jetty",
  text:
    "The old jetty kneels on splintered legs,\ngrey as a grandfather's beard.\nEach tide that slides beneath its boards\nsteals one more plank, as it feared.\n\n" +
    "The children who once cannonballed here\nare grey themselves, in town.\nThe jetty listens for their shouts\nwhile the river pulls it down.",
};

const THE_DEBATE = {
  title: "The Debate",
  text:
    "Ravi had prepared for the debate for two weeks. He had index cards colour-coded by argument and a joke he'd practised in the mirror. When the teacher called his name, he strode to the front and smiled at the audience.\n\n" +
    "Then he looked down. His cards were gone.\n\n" +
    "For a moment, the hall was silent. Ravi could hear the hum of the ceiling fans and someone's chair creaking. He saw his opponent, Grace, glance at her own neat pile of notes.\n\n" +
    'Ravi took a breath. "I was going to read you my notes," he said, "but I think I\'ll just tell you what I believe." And he did. His voice shook at first, then steadied.\n\n' +
    "Afterwards, Grace found his cards under her chair. She handed them back with a grin. \"You didn't need these,\" she said. Ravi looked at the neat colours and, for the first time, wasn't sure that he ever had.",
};

const BURNT_HILL = {
  title: "Waiting",
  text:
    "After the fires, the hillside behind our house looked like the surface of the moon. Every tree was black. The air tasted of ash for weeks, and Mum stopped opening the curtains on that side of the house.\n\n" +
    "In spring, Dad dragged me up the hill to see something. I didn't want to go. The burnt trunks stood like rows of broken matchsticks, and our shoes sank into grey powder.\n\n" +
    "Then he pointed. Halfway up a scorched blackbutt, a ribbon of bright green leaves had burst straight out of the bark, so green it almost hurt to look at.\n\n" +
    '"Epicormic growth," Dad said, as if he were a scientist. Then, in his normal voice: "It\'s not dead, mate. It was just waiting."\n\n' +
    "That afternoon, Mum opened the curtains.",
};

/** EN3-UARL-01: narrative, character, imagery, symbol and connotation in literature. */
export const LITERATURE = levels(6150201, {
  very_easy: [
    (n) =>
      read(
        OLD_JETTY,
        typed(
          "short_answer",
          n,
          "'grey as a grandfather's beard' — what kind of figurative language is this?",
          ["simile", "a simile"],
          "It compares the jetty to a beard using 'as', so it is a simile.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'Smirk' and 'smile' have the same connotation.",
        false,
        "Both describe a mouth turning up, but 'smirk' suggests someone is smug or mean, while 'smile' feels friendly.",
      ),
    (n) =>
      read(
        BURNT_HILL,
        choice(
          n,
          "What had happened to the hillside before the story begins?",
          ["A bushfire had burnt it.", "A flood had washed it away.", "It had been covered in snow.", "Builders had cleared it."],
          0,
          "The first words are 'After the fires', and the trees are black and the air tastes of ash.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        OLD_JETTY,
        multi(
          n,
          "Which words or phrases make the jetty seem like an old person? Choose all that are right.",
          ["kneels on splintered legs", "grey as a grandfather's beard", "listens for their shouts", "the river", "beneath its boards"],
          [0, 1, 2],
          "Kneeling, having a grey beard and listening are things an old person does. The river and the boards are just parts of the setting.",
        ),
      ),
    (n) =>
      read(
        BURNT_HILL,
        choice(
          n,
          "'The burnt trunks stood like rows of broken matchsticks.' What picture does this create?",
          [
            "thin, blackened trees, snapped and lined up",
            "tall, healthy green trees",
            "trees that are on fire right now",
            "a box of new matches",
          ],
          0,
          "A used matchstick is thin and black at the top. The simile helps us see burnt, broken trunks standing in rows.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these stages of a narrative in order.",
        ["orientation", "rising action", "climax", "falling action", "resolution"],
        "A story sets the scene, builds tension through rising action, reaches the climax, then winds down and ends with a resolution.",
      ),
  ],
  medium: [
    (n) =>
      read(
        THE_DEBATE,
        choice(
          n,
          "How does Ravi change during the story?",
          [
            "He goes from relying on his notes to trusting himself.",
            "He goes from confident to giving up.",
            "He becomes angry with Grace.",
            "He doesn't change at all.",
          ],
          0,
          "At first he depends on his colour-coded cards. Without them, he speaks from what he believes and discovers he can do it.",
        ),
      ),
    (n) =>
      read(
        THE_DEBATE,
        choice(
          n,
          "Why does the writer mention the hum of the ceiling fans and a chair creaking?",
          [
            "to show how silent and tense the hall became",
            "to show that the hall was too hot",
            "to describe the school building",
            "to show that the audience was bored",
          ],
          0,
          "You only hear tiny sounds like a fan humming when everything else is silent. This builds tension at the moment Ravi loses his cards.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which words have a negative connotation? Choose all that are right.",
        ["stubborn", "determined", "nosy", "curious", "scrawny"],
        [0, 2, 4],
        "Stubborn, nosy and scrawny sound like criticisms. Determined and curious describe similar things in a positive way.",
      ),
  ],
  hard: [
    (n) =>
      read(
        OLD_JETTY,
        choice(
          n,
          "What could the old jetty symbolise in this poem?",
          ["the passing of time and memories slowly fading", "a new beginning", "the danger of swimming in rivers", "how to build a jetty"],
          0,
          "The jetty is losing planks with each tide while the children who played there have grown old. It stands for time passing and the past fading.",
        ),
      ),
    (n) =>
      read(
        BURNT_HILL,
        choice(
          n,
          "What do the bright green leaves symbolise?",
          ["hope and recovery after disaster", "danger of another fire", "the coming of winter", "Dad's love of science"],
          0,
          "New life bursting from a burnt tree shows that things can recover. The leaves stand for hope.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A writer wants to show a character is nervous without using the word 'nervous'. Which sentence does this best?",
        [
          "Tom wiped his damp palms on his shorts for the third time.",
          "Tom was very nervous.",
          "Tom felt a bit worried and nervous.",
          "Tom went to the front of the class.",
        ],
        0,
        "'Show, don't tell': sweaty palms and a repeated action let readers work out he's nervous without being told.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        THE_DEBATE,
        choice(
          n,
          "Ravi 'wasn't sure that he ever had' needed the cards. What does he realise?",
          [
            "His real belief mattered more than all his careful preparation.",
            "He should have used more colours.",
            "Grace had stolen his cards on purpose.",
            "He will never prepare for a debate again.",
          ],
          0,
          "Grace says he didn't need the cards today. Ravi goes further: maybe he never needed them, because speaking from belief was his real strength.",
        ),
      ),
    (n) =>
      read(
        BURNT_HILL,
        choice(
          n,
          "Why does the story end with 'That afternoon, Mum opened the curtains'?",
          [
            "It shows the family is ready to face the hillside again, because hope has returned.",
            "It shows Mum wanted more sunlight to dry the washing.",
            "It shows the fire had started again.",
            "It shows Mum didn't care about the trees.",
          ],
          0,
          "Mum closed the curtains so she wouldn't see the burnt hill. Opening them, after the news of new growth, symbolises moving on with hope.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A writer retells 'The Three Little Pigs' so the wolf is a kind character who has been misunderstood. What has the writer changed?",
        ["the perspective and how the character is represented", "only the setting", "only the title", "nothing important"],
        0,
        "The events may be similar, but showing the wolf as kind changes whose side we see and how he is represented to readers.",
      ),
  ],
});

const BYPASS = {
  title: "The Highway Bypass",
  text:
    "Text A – Council media release\n\n" +
    "The new highway bypass will open next month, cutting travel time between the two towns by twenty minutes. Mayor Linda Okafor said the bypass would 'remove heavy trucks from our main street and make it safer for families'. Construction created 300 local jobs.\n\n" +
    "Text B – Letter from a shop owner\n\n" +
    "For thirty-one years my bakery has stood on Main Street. Every holiday, travellers stopped for a pie and a chat. Once the bypass opens, those cars will race past without even seeing our town's name. The council talks about safety, but it hasn't said how small businesses like mine will survive.",
};

const RIVER_VOICE = {
  title: "The River Stones",
  text:
    "The day Wren turned twelve, the river spoke to her.\n\n" +
    "It was not a loud voice. It came up through the soles of her bare feet as she waded across the shallows below Ironbark Falls: a cold, slow whisper that seemed to know her name.\n\n" +
    "'The stones are moving,' it said. 'Go to the old woman on the ridge before the moon is full.'\n\n" +
    "Wren stumbled backwards onto the bank, heart hammering. Behind her, the water ran on as if nothing had happened. But on the flat rock where she had been standing, five smooth river stones now lay in a perfect circle.",
};

const BILBY = {
  title: "Bring Back the Bilby",
  text:
    "Bilbies once lived across most of mainland Australia. Today they survive in only a few small areas. We must act now to bring them back.\n\n" +
    "Firstly, bilbies are ecosystem engineers. As they dig for food, they turn over large amounts of soil, which helps rain soak in and seeds sprout.\n\n" +
    "Secondly, the main threats are known and can be managed. Feral cats and foxes hunt bilbies, so fenced reserves that keep these predators out give bilbies a safe place to breed.\n\n" +
    "Some people say the money would be better spent elsewhere. However, protecting one species also protects the whole habitat it shares with many others.\n\n" +
    "Every Australian who has ever eaten a chocolate Easter Bilby should ask: will the real one still be here for our grandchildren?",
};

/** EN3-UARL-02: genre, theme, perspective and context, argument and authority. */
export const GENRE_THEME = levels(6150301, {
  very_easy: [
    (n) =>
      read(
        RIVER_VOICE,
        choice(
          n,
          "Which genre is this story?",
          ["fantasy", "biography", "information report", "recount"],
          0,
          "A river that talks and stones that move by themselves could not happen in real life. Magic like this belongs to fantasy.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A myth often explains how something in nature or the world came to be.",
        true,
        "Myths are traditional stories that often explain natural things, like why the sun rises or how a mountain was formed.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A true story of a real person's life, written by someone else, is called a ___.",
        ["biography", "a biography"],
        "bio (life) + graphy (writing) = biography. If you write your own life story, it is an autobiography.",
      ),
  ],
  easy: [
    (n) =>
      read(
        BYPASS,
        choice(
          n,
          "In Text B, what is the shop owner worried about?",
          [
            "losing customers when travellers no longer drive through town",
            "trucks crashing into the bakery",
            "the price of flour",
            "the new road being too narrow",
          ],
          0,
          "She says travellers used to stop for a pie, but cars will 'race past'. She fears her business won't survive.",
        ),
      ),
    (n) =>
      read(
        BILBY,
        choice(
          n,
          "What is the writer's position?",
          [
            "We must act now to protect bilbies and bring them back.",
            "Bilbies are not worth saving.",
            "Chocolate bilbies should be banned.",
            "Foxes and cats should be kept as pets.",
          ],
          0,
          "The writer states the position at the end of the first paragraph: 'We must act now to bring them back.'",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of a persuasive exposition in the usual order.",
        [
          "a thesis statement giving the writer's position",
          "first argument with evidence",
          "second argument with evidence",
          "a rebuttal of the other side",
          "a conclusion that restates the position",
        ],
        "An exposition states its thesis, backs it up with arguments, answers the other side, then finishes by restating the position strongly.",
      ),
  ],
  medium: [
    (n) =>
      read(
        BYPASS,
        multi(
          n,
          "Which details in Text A are used to make the bypass sound positive? Choose all that are right.",
          [
            "Travel time is cut by twenty minutes.",
            "Heavy trucks will be removed from the main street.",
            "Construction created 300 local jobs.",
            "Small businesses will survive.",
          ],
          [0, 1, 2],
          "Text A mentions time saved, safer streets and jobs. It says nothing about small businesses; that worry comes from Text B.",
        ),
      ),
    (n) =>
      read(
        RIVER_VOICE,
        multi(
          n,
          "Which features show that this story is fantasy? Choose all that are right.",
          ["a river that speaks", "stones that arrange themselves", "a girl who has a birthday", "bare feet in shallow water"],
          [0, 1],
          "A speaking river and stones forming a circle by magic are impossible in real life. Birthdays and wading happen in everyday stories too.",
        ),
      ),
    (n) =>
      read(
        BILBY,
        choice(
          n,
          "Why does the writer mention that 'some people say the money would be better spent elsewhere'?",
          [
            "to answer an opposing argument and show why it is weaker",
            "because the writer agrees with them",
            "to change the topic to money",
            "to end the text",
          ],
          0,
          "This is a rebuttal. The writer raises the other side, then uses 'However' to argue back, which makes the writer's case stronger.",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A story written in 1890 shows a girl who leaves school at ten to work on the family farm, and the narrator thinks this is normal. Why might a reader today react differently?",
        [
          "Today's readers live in a different context, where all children are expected to finish school.",
          "Today's readers don't know what farms are.",
          "The story must have been written badly.",
          "Readers in 1890 could not read.",
        ],
        0,
        "Context shapes how we read. In 1890 this was common; today, readers expect children to stay at school, so they may feel the girl was treated unfairly.",
      ),
    (n) =>
      read(
        RIVER_VOICE,
        choice(
          n,
          "How does the author create suspense at the end?",
          [
            "by ending with a strange sign that raises questions without answering them",
            "by explaining exactly what will happen next",
            "by describing a happy birthday party",
            "by giving facts about rivers",
          ],
          0,
          "The circle of stones appears with no explanation. Readers want to know who the old woman is and what the stones mean, so they keep reading.",
        ),
      ),
    (n) =>
      read(
        BILBY,
        multi(
          n,
          "Which persuasive devices does the writer use? Choose all that are right.",
          [
            "a rhetorical question",
            "high-modality language such as 'must'",
            "a counter-argument followed by a rebuttal",
            "a personal story from the writer's childhood",
          ],
          [0, 1, 2],
          "It ends with a rhetorical question, says 'We must act now', and answers the money argument. There is no childhood story.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Which source would have the most authority on how many bilbies are left in the wild?",
        [
          "a government environment report based on wildlife surveys",
          "an advertisement for chocolate Easter Bilbies",
          "a social media post with no source",
          "a novel with a bilby as the main character",
        ],
        0,
        "Authority comes from expertise and evidence. A report based on surveys by scientists is far more reliable than an ad, an unsourced post or fiction.",
      ),
    (n) =>
      choice(
        n,
        "One story is about a girl who keeps falling off her surfboard but refuses to give up. Another is about an old farmer who rebuilds his farm after a flood. What theme do they most likely share?",
        ["persistence in the face of difficulty", "the dangers of the ocean", "growing up in the city", "the importance of money"],
        0,
        "Different characters, settings and problems, but both keep going after setbacks. A theme is the big idea a text shares, here persistence.",
      ),
    (n) =>
      read(
        BYPASS,
        trueFalse(
          n,
          "Because Text A was written by the council that built the bypass, readers should consider that it may present mainly the positive side.",
          true,
          "Who writes a text shapes its perspective. The council wants the bypass to look good, so it leaves out problems like the one Text B raises.",
        ),
      ),
  ],
});

/** EN3-CWT-01: text features, complex sentences, clauses, modal verbs, apostrophes, speech and cohesion. */
export const WRITING = levels(6110301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is the subordinating conjunction in this sentence? 'We went inside because it started to hail.'",
        ["went", "inside", "because", "hail"],
        2,
        "'Because' starts a dependent clause that gives a reason: because it started to hail.",
      ),
    (n) =>
      trueFalse(
        n,
        "A paragraph usually begins with a topic sentence that tells what the paragraph is about.",
        true,
        "The topic sentence introduces the main idea, and the sentences after it give details.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the contraction: would not = ___",
        ["wouldn't", "wouldn’t"],
        "Join the words and put an apostrophe where the o of 'not' is missing: wouldn't.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "The toys belong to the children. Which is correct?",
        ["the childrens' toys", "the children's toys", "the childrens toys", "the childs' toys"],
        1,
        "'Children' is a plural that doesn't end in s, so add apostrophe s: the children's toys.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          '"If we hurry," said Noah, "we can still catch the ferry."',
          '"If we hurry," said Noah, "We can still catch the ferry."',
          '"If we hurry" said Noah "we can still catch the ferry."',
          '"If we hurry, said Noah, we can still catch the ferry."',
        ],
        0,
        "When one spoken sentence is split, put commas around 'said Noah' and start the second part with a lower-case letter, because it is the same sentence.",
      ),
    (n) =>
      multi(
        n,
        "Which are features of persuasive writing? Choose all that are right.",
        ["high-modality words like 'must'", "rhetorical questions", "a clear position on an issue", "characters who face a complication"],
        [0, 1, 2],
        "Persuasive texts take a clear position and use strong modal words and rhetorical questions. Characters and complications belong in narratives.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        'Mia said, "I will finish my project tomorrow." Which sentence reports this correctly?',
        [
          "Mia said that she would finish her project the next day.",
          "Mia said that I will finish my project tomorrow.",
          "Mia said, she will finish her project tomorrow.",
          'Mia said that "she would finish her project."',
        ],
        0,
        "In reported speech, 'I' becomes 'she', 'will' becomes 'would', 'tomorrow' becomes 'the next day', and there are no speech marks.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence joins 'It was raining.' and 'We went to the beach.' using 'although', and keeps the meaning?",
        [
          "Although it was raining, we went to the beach.",
          "Although it was raining we, went to the beach.",
          "It was raining although we went to the beach.",
          "Although, it was raining we went to the beach.",
        ],
        0,
        "'Although it was raining' is the dependent clause. When it comes first, put a comma after it, then the main clause.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a cohesive paragraph.",
        [
          "Wombats are surprisingly well built for digging.",
          "Their short, powerful legs and long claws let them shift soil quickly.",
          "In fact, some wombat burrows are longer than a cricket pitch.",
          "These tunnels keep wombats cool during hot Australian days.",
        ],
        "Start with the topic sentence. 'Their' refers back to wombats, 'In fact' adds a stronger detail, and 'These tunnels' refers back to the burrows.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "In 'The girl who won the race is my cousin', which part is the relative clause?",
        ["The girl", "who won the race", "is my cousin", "the race is my cousin"],
        1,
        "A relative clause gives more information about a noun and often starts with who, which or that: 'who won the race' tells us which girl.",
      ),
    (n) =>
      choice(
        n,
        "'Ella told Zara that she had won the prize.' It is unclear who won. Which revision makes it clear that Zara won?",
        [
          'Ella told Zara, "You have won the prize."',
          "Ella told Zara that she won the prize.",
          "She told her that she had won the prize.",
          "Ella told Zara she had won it.",
        ],
        0,
        "'She' could mean Ella or Zara. Direct speech with 'You' makes it clear that Zara is the winner.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences use an apostrophe correctly? Choose all that are right.",
        ["The dog wagged its tail.", "The dog wagged it's tail.", "It's going to rain.", "The Smiths' car is red.", "Pie's are $5 each."],
        [0, 2, 3],
        "'Its' (belonging to it) has no apostrophe, 'it's' means it is, and the Smiths' car belongs to the Smith family. Plain plurals like pies need no apostrophe.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "In 'When the siren sounded, the players who had been arguing finally shook hands,' which part is the main clause?",
        ["the players who had been arguing finally shook hands", "When the siren sounded", "who had been arguing", "the siren sounded"],
        0,
        "The main clause can stand alone: 'the players ... finally shook hands'. 'Who had been arguing' sits inside it to describe the players, and 'When the siren sounded' is a dependent clause.",
      ),
    (n) =>
      choice(
        n,
        "A Year 6 student is writing to the principal to ask for a school vegetable garden. Which sentence best suits this audience and purpose?",
        [
          "A vegetable garden would allow students to learn about science and healthy eating, so I respectfully ask you to consider it.",
          "We totally need a veggie garden, it'd be awesome!",
          "Give us a vegetable garden now.",
          "Vegetables are green and grow in dirt.",
        ],
        0,
        "Writing to a principal needs a polite, formal tone, a clear request and a reason. The others are too casual, too rude or don't persuade.",
      ),
    (n) =>
      choice(
        n,
        "Reported: 'Coach asked whether we had packed our boots.' Which is the direct speech version?",
        [
          'Coach asked, "Have you packed your boots?"',
          'Coach asked, "Whether we had packed our boots?"',
          'Coach asked "have you packed your boots"?',
          "Coach asked, have you packed your boots.",
        ],
        0,
        "'Whether' becomes a question, 'we' becomes 'you', 'had packed' becomes 'have packed', and the question mark goes inside the speech marks.",
      ),
  ],
});
