/**
 * English practice content for Years 3–6. Every passage and item here is original
 * to my247tutor, so it can be used freely. Items should be reviewed by a NSW teacher
 * before launch.
 */

export interface WordItem {
  prompt: string;
  correct: string;
  wrong: string[];
  explanation: string;
}

export interface Passage {
  title: string;
  text: string;
  questions: {
    prompt: string;
    correct: string;
    wrong: string[];
    type: "literal" | "inferential" | "vocabulary" | "purpose";
    explanation: string;
  }[];
}

export interface WritingTask {
  prompt: string;
  /** What a strong response does, written from the outcome. Used by the marker. */
  criteria: string[];
}

const spelling = (word: string, wrong: string[], explanation: string): WordItem => ({
  prompt: "Which word is spelt correctly?",
  correct: word,
  wrong,
  explanation,
});

export const WORDWORK: Record<string, WordItem[]> = {
  "en2-spelling": [
    spelling("because", ["becuase", "becos"], '"because" has the tricky "au" in the middle: be-c-au-se.'),
    spelling("friend", ["freind", "frend"], 'In "friend", i comes before e.'),
    spelling("knock", ["nock", "knok"], '"knock" starts with a silent k and ends with ck after a short vowel.'),
    spelling("hoping", ["hopping", "hopeing"], 'Drop the e from "hope" before adding -ing: hope → hoping.'),
    spelling("stopped", ["stoped", "stopt"], "Double the last consonant after a short vowel: stop → stopped."),
    spelling("beach", ["beech", "bech"], 'The sea-side word uses "ea": beach. "beech" is a kind of tree.'),
    spelling("night", ["nite", "nigt"], '"igh" makes the long i sound in night, light and bright.'),
    spelling("happily", ["happyly", "hapily"], "Change y to i before adding -ly: happy → happily."),
    spelling("write", ["rite", "wright"], '"write" (to put words on paper) starts with a silent w.'),
    spelling("boats", ["boates", "botes"], '"oa" makes the long o sound; add s for more than one.'),
  ],
  "en3-spelling": [
    spelling("necessary", ["neccessary", "necesary"], "One collar, two sleeves: one c, double s."),
    spelling("disappear", ["dissappear", "disapear"], "The prefix dis- joins appear: dis + appear."),
    spelling("unnecessary", ["unecessary", "unnecesary"], "un + necessary keeps both n's."),
    spelling("beautiful", ["beautifull", "beutiful"], "The suffix -ful has only one l."),
    spelling("government", ["goverment", "govenment"], "govern + -ment: keep the n."),
    spelling("separate", ["seperate", "seprate"], 'There\'s "a rat" in sep-a-rat-e.'),
    spelling("argument", ["arguement", "argumant"], "Drop the e from argue before adding -ment."),
    spelling("recommend", ["reccommend", "recomend"], "One c, double m: re + commend."),
    spelling("environment", ["enviroment", "envirnment"], "environ + -ment: don't drop the n."),
    spelling("immediately", ["immediatly", "imediately"], "Double m, and keep the e before -ly: immediate + ly."),
  ],
  "en2-vocabulary": [
    {
      prompt: 'Which word means the same as "tiny"?',
      correct: "small",
      wrong: ["huge", "quick"],
      explanation: "Tiny and small are synonyms: they mean nearly the same thing.",
    },
    {
      prompt: 'Which word is the opposite of "ancient"?',
      correct: "modern",
      wrong: ["old", "broken"],
      explanation: "Ancient means very old, so its antonym is modern.",
    },
    {
      prompt: 'Which word means the same as "glad"?',
      correct: "happy",
      wrong: ["angry", "tired"],
      explanation: "Glad and happy are synonyms.",
    },
    {
      prompt: 'Which word is the opposite of "brave"?',
      correct: "afraid",
      wrong: ["strong", "bold"],
      explanation: "Brave means facing fear, so afraid is the opposite.",
    },
    {
      prompt: '"The puppy was exhausted after the long walk." What does exhausted mean?',
      correct: "very tired",
      wrong: ["very hungry", "very excited"],
      explanation: "After a long walk, a puppy would be very tired.",
    },
    {
      prompt: 'Which word means the same as "shout"?',
      correct: "yell",
      wrong: ["whisper", "sing"],
      explanation: "Shout and yell both mean to speak very loudly.",
    },
    {
      prompt: 'Which word is the opposite of "generous"?',
      correct: "selfish",
      wrong: ["kind", "helpful"],
      explanation: "A generous person shares; a selfish person doesn't.",
    },
    {
      prompt: '"Mia peered through the foggy window." What does peered mean?',
      correct: "looked closely",
      wrong: ["knocked", "ran past"],
      explanation: "Peering is looking hard, which you'd do through fog.",
    },
  ],
  "en3-vocabulary": [
    {
      prompt: '"The volunteers were reluctant to leave the animals." What does reluctant mean?',
      correct: "unwilling",
      wrong: ["eager", "unable"],
      explanation: "Reluctant means not wanting to do something.",
    },
    {
      prompt: 'Which word best replaces "said" to show anger?',
      correct: "snapped",
      wrong: ["murmured", "giggled"],
      explanation: "Snapped shows a short, angry way of speaking.",
    },
    {
      prompt: '"The classroom was a zoo after lunch." What kind of language is this?',
      correct: "a metaphor",
      wrong: ["a simile", "a fact"],
      explanation: "It says the classroom IS a zoo without using like or as, so it's a metaphor.",
    },
    {
      prompt: 'Which word means "to make something less severe"?',
      correct: "reduce",
      wrong: ["increase", "repeat"],
      explanation: "Reduce means to make smaller or less.",
    },
    {
      prompt: '"Her voice was as cold as ice." What does this simile suggest?',
      correct: "She was unfriendly",
      wrong: ["She was sick", "She was outside"],
      explanation: "Cold as ice describes an unfriendly tone, not temperature.",
    },
    {
      prompt: "Which word is the most precise for a very large amount of water rushing over land?",
      correct: "flood",
      wrong: ["puddle", "drizzle"],
      explanation: "A flood is a large amount of water covering land.",
    },
    {
      prompt: '"The evidence was conclusive." What does conclusive mean?',
      correct: "settling the question",
      wrong: ["missing", "confusing"],
      explanation: "Conclusive evidence leaves no doubt.",
    },
    {
      prompt: 'Which prefix makes "possible" mean "not possible"?',
      correct: "im-",
      wrong: ["un-", "dis-"],
      explanation: "Before p, b and m we often use im-: impossible.",
    },
  ],
};

export const PASSAGES: Record<string, Passage[]> = {
  "en2-comprehension": [
    {
      title: "The Lost Hat",
      text:
        "Sam's grandpa had worn the same green hat to the beach every summer for twenty years. One windy morning, a gust lifted the hat right off his head and carried it towards the water.\n\n" +
        "Sam dropped his bucket and ran. He splashed through the shallow waves, his eyes fixed on the bobbing green shape. Just as a wave was about to pull it under, Sam grabbed the brim.\n\n" +
        "Grandpa was waiting on the sand. He didn't say anything at first. He just squeezed Sam's shoulder and put the dripping hat back on his head, smiling the whole time.",
      questions: [
        {
          type: "literal",
          prompt: "What colour was Grandpa's hat?",
          correct: "green",
          wrong: ["blue", "brown"],
          explanation: "The first sentence says it was a green hat.",
        },
        {
          type: "literal",
          prompt: "What made the hat fly away?",
          correct: "a gust of wind",
          wrong: ["a wave", "a dog"],
          explanation: '"A gust lifted the hat right off his head."',
        },
        {
          type: "inferential",
          prompt: "How did Grandpa most likely feel at the end?",
          correct: "grateful",
          wrong: ["annoyed", "bored"],
          explanation: "He squeezed Sam's shoulder and kept smiling, which shows he was thankful.",
        },
        {
          type: "vocabulary",
          prompt: 'The hat was "bobbing" in the water. What does bobbing mean?',
          correct: "moving up and down",
          wrong: ["sinking fast", "staying still"],
          explanation: "Things that bob float up and down on the waves.",
        },
      ],
    },
    {
      title: "Why Do Leaves Change Colour?",
      text:
        "In autumn, the leaves on some trees turn red, orange and yellow. This happens because of a green chemical called chlorophyll.\n\n" +
        "Chlorophyll helps leaves use sunlight to make food for the tree. When the days get shorter and colder, the tree stops making chlorophyll. As the green fades, other colours that were hidden in the leaf can be seen.\n\n" +
        "Many Australian native trees, such as gum trees, keep their leaves all year. That is why our bush stays green, even in winter.",
      questions: [
        {
          type: "literal",
          prompt: "What is the green chemical in leaves called?",
          correct: "chlorophyll",
          wrong: ["sunlight", "sap"],
          explanation: "The text names it: chlorophyll.",
        },
        {
          type: "literal",
          prompt: "When does the tree stop making chlorophyll?",
          correct: "when days get shorter and colder",
          wrong: ["when it rains", "in summer"],
          explanation: "The second paragraph explains this.",
        },
        {
          type: "inferential",
          prompt: "Why does the bush stay green in winter?",
          correct: "many native trees keep their leaves",
          wrong: ["it rains more in winter", "the sun is stronger"],
          explanation: "The last paragraph says native trees keep their leaves all year.",
        },
        {
          type: "purpose",
          prompt: "What is the main purpose of this text?",
          correct: "to explain",
          wrong: ["to entertain with a story", "to persuade"],
          explanation: "It gives facts to explain why something happens.",
        },
      ],
    },
  ],
  "en3-comprehension": [
    {
      title: "The Night Shift",
      text:
        "Every evening at six, when the rest of Wattle Street was sitting down to dinner, Ms Okafor pulled on her reflective vest and climbed into the cab of the street sweeper.\n\n" +
        "Most people never saw her. They saw only the results: gutters cleared of leaves, footpaths free of broken glass, a street that looked, each morning, as if it had been quietly reset. Children sometimes waved from their bedroom windows as the machine hummed past, its orange light sweeping across their ceilings.\n\n" +
        '"It\'s not glamorous," she told the local paper once. "But a clean street is a kind of promise. It says somebody cares about this place."',
      questions: [
        {
          type: "literal",
          prompt: "What time does Ms Okafor start work?",
          correct: "six in the evening",
          wrong: ["six in the morning", "midnight"],
          explanation: '"Every evening at six" is in the first sentence.',
        },
        {
          type: "inferential",
          prompt: "Why do most people never see Ms Okafor?",
          correct: "she works while they are inside at night",
          wrong: ["she drives too fast", "she works in another town"],
          explanation: "She starts when people sit down to dinner and works through the night.",
        },
        {
          type: "vocabulary",
          prompt: 'What does "glamorous" mean in this text?',
          correct: "exciting and admired",
          wrong: ["dirty and tiring", "well paid"],
          explanation: "She says her job isn't glamorous, meaning it isn't flashy or admired.",
        },
        {
          type: "purpose",
          prompt: 'What does Ms Okafor mean by "a clean street is a kind of promise"?',
          correct: "it shows someone cares about the community",
          wrong: ["she promised to clean it", "streets must be cleaned by law"],
          explanation: "She explains it herself: it says somebody cares about this place.",
        },
      ],
    },
    {
      title: "Should Schools Have Longer Lunch Breaks?",
      text:
        "Some students argue that lunch breaks should be longer. They say that an extra fifteen minutes would give everyone time to eat properly and still play outside.\n\n" +
        "Research shows that physical activity can help children concentrate in class. Students who have time to run around may return to lessons calmer and more focused.\n\n" +
        "However, a longer lunch break would mean either a longer school day or less class time. Some parents worry that this would make it harder for families who pick children up straight after work.",
      questions: [
        {
          type: "literal",
          prompt: "How much longer do some students want lunch to be?",
          correct: "fifteen minutes",
          wrong: ["thirty minutes", "an hour"],
          explanation: "The first paragraph says an extra fifteen minutes.",
        },
        {
          type: "inferential",
          prompt: "Why does the writer include the third paragraph?",
          correct: "to show the other side of the argument",
          wrong: ["to agree with the students", "to describe lunch food"],
          explanation: '"However" signals a different point of view.',
        },
        {
          type: "vocabulary",
          prompt: 'What does "concentrate" mean?',
          correct: "focus your attention",
          wrong: ["eat quickly", "forget"],
          explanation: "To concentrate is to focus your thinking on something.",
        },
        {
          type: "purpose",
          prompt: "Which best describes this text?",
          correct: "a balanced discussion",
          wrong: ["a narrative", "a set of instructions"],
          explanation: "It presents reasons for and against without telling a story.",
        },
      ],
    },
  ],
};

export const WRITING_TASKS: Record<string, WritingTask[]> = {
  "en2-imaginative": [
    {
      prompt:
        "Write a short story about a day when something unexpected arrives at your school. Give your story a problem and show how it is solved.",
      criteria: [
        "Has a clear beginning, problem, and resolution",
        "Introduces at least one character with a feeling or trait",
        "Uses descriptive words to help the reader picture the setting",
        "Uses correct sentence punctuation (capital letters and full stops)",
        "Groups ideas into paragraphs",
      ],
    },
  ],
  "en2-persuasive": [
    {
      prompt: "Should every class have a pet? Write to persuade your principal. Give your opinion and at least two reasons.",
      criteria: [
        "States a clear opinion at the start",
        "Gives at least two reasons, each in its own paragraph",
        "Supports reasons with an example or explanation",
        "Uses persuasive words such as should, must, clearly",
        "Ends with a conclusion that restates the opinion",
      ],
    },
  ],
  "en3-informative": [
    {
      prompt:
        "Write an informative text about an Australian animal of your choice. Include where it lives, what it eats, and one interesting fact.",
      criteria: [
        "Opens with a general statement that introduces the topic",
        "Uses topic sentences to start each paragraph",
        "Includes accurate, specific facts rather than opinions",
        "Uses subject-specific vocabulary (e.g. habitat, nocturnal)",
        "Uses varied sentence structures and correct punctuation",
      ],
    },
  ],
  "en3-persuasive": [
    {
      prompt: "Should children under 12 have their own mobile phone? Write a persuasive text that argues one side.",
      criteria: [
        "Introduction states a clear position and previews the arguments",
        "Each body paragraph makes one argument with evidence or an example",
        "Addresses and rebuts a likely counter-argument",
        "Uses persuasive devices such as rhetorical questions and modal verbs",
        "Conclusion summarises the arguments and restates the position",
      ],
    },
  ],
};
