/**
 * Year 6 English, second sets: 15 more questions for each Stage 3 standard (NESA outcome), three at
 * each level from very easy to very hard. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN3-SPELL-01: prefixes, suffixes, Greek and Latin roots, silent letters, tricky plurals and homophones. */
export const SPELLING = levels(6130116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["enviroment", "environment", "envirnment", "enviornment"],
        1,
        "'Environment' is the word 'environ' plus the suffix -ment. Say it slowly, en-vi-ron-ment, so you don't lose the n.",
      ),
    (n) =>
      trueFalse(
        n,
        "The h in 'honest' is silent.",
        true,
        "We say 'onest', so the h is silent, just like in 'hour' and 'honour'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'thief'.",
        "thieves",
        "Many words ending in f change the f to v and add -es: thief becomes thieves, like shelf becomes shelves.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'Please ___ my apology.'",
        ["except", "accept", "acept", "exept"],
        1,
        "'Accept' means to receive or agree to something. 'Except' means not including: everyone except Sam.",
      ),
    (n) =>
      multi(
        n,
        "Which words keep the final e of the base word when -ment is added? Choose all that are right.",
        ["excitement", "amazement", "argument", "management"],
        [0, 1, 3],
        "-ment starts with a consonant, so excite, amaze and manage keep their e. 'Argument' is a well-known exception: argue drops its e.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Adding the prefix dis- to 'satisfied' makes the word ___.",
        "dissatisfied",
        "A prefix doesn't change the base word, so dis + satisfied keeps both s's: dissatisfied.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "What is the plural of 'larva' (a young insect)?",
        ["larvas", "larvae", "larvies", "larvi"],
        1,
        "Some words from Latin ending in -a change to -ae in the plural: larva becomes larvae, like antenna becomes antennae.",
      ),
    (n) =>
      choice(
        n,
        "The Greek root 'chron' means time. Which word means 'arranged in the order that things happened in time'?",
        ["chronological", "chorus", "chlorine", "character"],
        0,
        "chron (time) + logical = chronological. A timeline is in chronological order. The other words only look similar.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ous to 'fame'. Write the new word.",
        "famous",
        "The suffix -ous starts with a vowel, so drop the e from 'fame': fame + ous = famous.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'The car remained ___ at the red light.'",
        ["stationary", "stationery", "stationairy", "stashionary"],
        0,
        "'Stationary' with an a means not moving. 'Stationery' with an e means paper and pens. Tip: e for envelopes.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'internationally'.",
        ["inter", "nation", "al", "ly"],
        "Prefix first, then the base word, then the suffixes: inter (between) + nation + al + ly.",
      ),
    (n) =>
      trueFalse(
        n,
        "The word 'weird' follows the rule 'i before e except after c'.",
        false,
        "'Weird' has e before i with no c in front, so it breaks the rule. Other exceptions include 'their', 'seize' and 'protein'.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these words are spelt correctly? Choose all that are right.",
        ["conscientious", "guarantee", "queue", "occassion", "parliament"],
        [0, 1, 2, 4],
        "Conscientious has 'science' inside it, guarantee has a silent u, queue has 'ueue', and parliament has a hidden i. The correct spelling is 'occasion', with two c's and one s.",
      ),
    (n) =>
      choice(
        n,
        "Why does 'courageous' keep the e from 'courage' before adding -ous?",
        [
          "The e keeps the g soft, so it still sounds like j.",
          "Every word ending in -ous keeps an e.",
          "It is a mistake; it should be 'couragous'.",
          "Words with three syllables always keep the e.",
        ],
        0,
        "Without the e, 'gou' would make a hard g sound, as in 'gout'. Keeping the e keeps the soft j sound, like 'outrageous' and 'gorgeous'.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The Latin root 'manu' means hand and 'script' means write. A document written by hand is a ___.",
        "manuscript",
        "manu (hand) + script (write) = manuscript. The same 'manu' is in manual, meaning done by hand.",
      ),
  ],
});

/** EN3-VOCAB-01: Tier 2 and Tier 3 words, word parts and precise meanings in context. */
export const VOCAB = levels(6140116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'abundant'?",
        ["plentiful", "scarce", "tiny", "empty"],
        0,
        "If something is abundant, there is lots of it, like an abundant harvest. The closest word is plentiful.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Hostile' means friendly and welcoming.",
        false,
        "'Hostile' means unfriendly or aggressive, like a hostile crowd booing the umpire.",
      ),
    (n) =>
      choice(
        n,
        "Which word means the opposite of 'optimistic'?",
        ["pessimistic", "hopeful", "cheerful", "positive"],
        0,
        "An optimistic person expects good things to happen. A pessimistic person expects the worst.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "'The bushwalkers were cautious near the cliff edge, testing each step before trusting it.' What does 'cautious' mean?",
        ["careful to avoid danger", "careless", "in a hurry", "excited"],
        0,
        "Testing each step near a cliff shows they were being careful. Cautious means taking care to avoid danger.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The prefix 'inter-' means between. Write the word that means 'between nations'.",
        "international",
        "inter (between) + national = international, like an international cricket match between Australia and India.",
      ),
    (n) =>
      multi(
        n,
        "Which words mean 'very clever'? Choose all that are right.",
        ["brilliant", "ingenious", "dull", "gifted", "clumsy"],
        [0, 1, 3],
        "Brilliant, ingenious and gifted all describe great cleverness or talent. Dull and clumsy do not.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from quietest to loudest.",
        ["silent", "murmuring", "loud", "deafening"],
        "Silent has no sound, murmuring is a soft low sound, loud is easy to hear, and deafening is so loud it could hurt your ears.",
      ),
    (n) =>
      choice(
        n,
        "In science, what does 'habitat' mean?",
        [
          "the natural home where a plant or animal lives",
          "the food an animal eats",
          "a group of the same kind of animal",
          "the way an animal moves",
        ],
        0,
        "A habitat is the place that gives a living thing what it needs to survive, like a tree hollow and forest for a sugar glider.",
      ),
    (n) =>
      choice(
        n,
        "In which sentence does 'pitch' mean the strip of ground in the middle of a cricket field?",
        [
          "The groundskeeper rolled the pitch flat before the match.",
          "She can sing every note at the right pitch.",
          "We helped Dad pitch the tent.",
          "The night was pitch black.",
        ],
        0,
        "Only the groundskeeper sentence is about cricket ground. In the others, pitch means how high a sound is, to set up, or completely.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "'Omni' means all and '-vore' means eater. What is an omnivore?",
        [
          "an animal that eats both plants and meat",
          "an animal that eats only plants",
          "an animal that eats only meat",
          "an animal that eats only insects",
        ],
        0,
        "omni (all) + vore (eater): an omnivore eats all kinds of food, plants and meat. Humans and possums are omnivores.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'Responsible' means able to be trusted to do the right thing. A person who cannot be trusted to act sensibly is ___.",
        "irresponsible",
        "The prefix in- (meaning not) becomes ir- before an r: ir + responsible = irresponsible, with a double r.",
      ),
    (n) =>
      choice(
        n,
        "Which word most precisely describes a speaker who expresses ideas clearly and fluently?",
        ["articulate", "loud", "talkative", "nice"],
        0,
        "Articulate means able to put ideas into clear, well-chosen words. A loud or talkative person isn't always clear.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'Despite losing their captain to injury, the team remained resilient and won their next three games.' What does 'resilient' mean here?",
        ["able to recover quickly from difficulties", "very tall and strong", "unwilling to play", "easily upset"],
        0,
        "The team had a setback but bounced back to win. Being able to recover quickly from difficulties is being resilient.",
      ),
    (n) =>
      multi(
        n,
        "The Latin root 'struct' means build. In which words does it carry that meaning? Choose all that are right.",
        ["construct", "structure", "destruction", "strict", "struggle"],
        [0, 1, 2],
        "To construct is to build, a structure is something built, and destruction is un-building or wrecking. Strict and struggle only share some letters.",
      ),
    (n) =>
      choice(
        n,
        "'The drought had a profound effect on the town; many families left and the school lost half its students.' What does 'profound' mean here?",
        ["very great and far-reaching", "small and unimportant", "funny and surprising", "short and quick"],
        0,
        "Families leaving and the school halving show a huge, deep change. Profound means very great or intense.",
      ),
  ],
});

const LAST_OVER = {
  title: "The Last Over",
  text:
    "Six runs. That was all Kurrajong needed to win the final. They had one wicket left, and Amira had the ball.\n\n" +
    "She walked back to her mark slowly, rubbing the ball on her trousers until one side shone. Behind the stumps, her brother Zaid crouched low and banged his gloves together. The crowd at the Wagga oval had gone strangely quiet.\n\n" +
    "Her first ball was a full toss. The batter swung and missed. Her second was smashed straight back past her for four.\n\n" +
    "Two runs needed. Four balls left.\n\n" +
    "Amira could feel every eye on her. She thought about Coach Davies telling her last season that she was 'too small to bowl at the end'. She thought about the hours in the nets after school, with Zaid fetching ball after ball without complaining.\n\n" +
    "She ran in and bowled. It was slower than anything she had bowled all day. The batter, expecting pace, swung far too early. The ball floated past the bat and clipped the top of the off stump.\n\n" +
    "Zaid was the first to reach her. He didn't cheer. He just lifted her right off the ground.",
};

const CORAL = {
  title: "Coral Bleaching",
  text:
    "Coral reefs look like colourful rocks, but they are built by millions of tiny animals called polyps. Each polyp has a partner: microscopic algae that live inside its body. The algae use sunlight to make food, and they share it with the coral. In return, the coral gives the algae shelter. The algae also give the coral most of its colour.\n\n" +
    "When the ocean becomes too warm for too long, this partnership breaks down. The stressed coral pushes the algae out, and its white skeleton shows through its clear flesh. This is called coral bleaching.\n\n" +
    "A bleached coral is not dead, but it is starving. If the water cools within a few weeks, the algae can return and the coral may recover. If the heat lasts, the coral is likely to die.\n\n" +
    "The Great Barrier Reef has suffered several major bleaching events since 1998. Scientists warn that as ocean temperatures rise, bleaching may happen more often, giving reefs less time to recover in between.\n\n" +
    "The good news is that some corals are tougher than others, and researchers are studying them closely. What they learn may help the reef survive in a warmer world.",
};

const TURTLE = {
  title: "Students Help Rescue Tangled Turtle",
  text:
    "A green sea turtle is recovering at a wildlife hospital after two Year 6 students from Yamba spotted it caught in fishing line on Tuesday afternoon.\n\n" +
    "Liam Carter and Isla Reeve, both 11, were walking along Main Beach after school when they noticed the turtle struggling in the shallows. Its front flipper was wrapped tightly in a tangle of old fishing line.\n\n" +
    '"At first we thought it was a rock," Isla said. "Then it moved, and we could see it was in trouble."\n\n' +
    "Instead of trying to free the turtle themselves, the students called a wildlife rescue hotline and stayed with the animal until volunteers arrived about half an hour later.\n\n" +
    'Volunteer coordinator Pam Walsh said the students had done exactly the right thing. "Turtles can bite, and pulling on the line can cut deeper into the flipper," she said. "By calling us and keeping watch, these two gave the turtle its best chance."\n\n' +
    "Vets expect the turtle to be released within a month. The rescue group is now urging people who fish to take all their line home with them.",
};

const BUS_SEAT = {
  title: "The Window Seat",
  text:
    "Every morning, Mr Kowalski caught the 7:40 bus into town, and every morning he sat in the same seat: third row, left side, by the window. Nobody else ever sat there. The regular passengers just seemed to know.\n\n" +
    "Tom had noticed him for months: an old man in a neat grey coat, who nodded to the driver and hummed quietly to himself all the way into town.\n\n" +
    "One Monday, the seat was empty. Tuesday, too. By Friday, Tom found himself staring at it the whole trip.\n\n" +
    "The next week, a woman Tom had never seen before got on at his stop. She had the same sharp grey eyes as Mr Kowalski. She walked to the third row, but she didn't sit by the window. She sat on the aisle side, took a single yellow rose from her bag and laid it gently on the window seat.\n\n" +
    "The bus driver caught Tom's eye in the mirror and gave a small, sad nod. Tom looked down at his shoes. For the rest of the trip, nobody on the bus said a word.",
};

const MAKING_LAWS = {
  title: "How a Federal Law Is Made",
  text:
    "In Australia, new national laws are made by the Federal Parliament in Canberra. Before an idea can become a law, it must pass through several stages.\n\n" +
    "First, a proposed law, called a bill, is introduced into one of the two houses of Parliament, usually the House of Representatives. The members debate the bill and may suggest changes, called amendments, to improve it.\n\n" +
    "Next, the members vote. If most of them vote in favour, the bill passes that house and moves to the other house, the Senate. There, senators debate the bill again and hold their own vote.\n\n" +
    "If the Senate wants changes, the bill is sent back to the first house to consider them. A bill cannot become law until both houses agree on exactly the same version.\n\n" +
    "Finally, the bill goes to the Governor-General, who represents the King. Once the Governor-General signs it, which is called royal assent, the bill becomes an Act of Parliament: a law that everyone in Australia must follow.\n\n" +
    "This process can take weeks or even years. It may seem slow, but it gives many people the chance to examine a law carefully before it affects millions of Australians.",
};

/** EN3-RECOM-01: reading for main idea, inference, author's purpose and text structure. */
export const READING = levels(6150116, {
  very_easy: [
    (n) =>
      read(
        LAST_OVER,
        choice(
          n,
          "How many runs did Kurrajong need at the start of the story?",
          ["six", "four", "two", "one"],
          0,
          "The very first words are 'Six runs. That was all Kurrajong needed to win the final.'",
        ),
      ),
    (n) =>
      read(
        TURTLE,
        typed(
          "short_answer",
          n,
          "What was the turtle tangled in?",
          ["fishing line", "line", "old fishing line", "a fishing line"],
          "The first paragraph says the turtle was caught in fishing line, and the second says its flipper was wrapped in it.",
        ),
      ),
    (n) =>
      read(
        CORAL,
        trueFalse(
          n,
          "According to the text, a bleached coral is already dead.",
          false,
          "The third paragraph says 'A bleached coral is not dead, but it is starving.' It can recover if the water cools.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        TURTLE,
        choice(
          n,
          "According to Pam Walsh, why was it right for the students not to free the turtle themselves?",
          [
            "Turtles can bite, and pulling the line can cut deeper into the flipper.",
            "The students were too young to go into the water.",
            "The turtle was too heavy to lift.",
            "It is against the law to touch the beach.",
          ],
          0,
          "Pam Walsh says 'Turtles can bite, and pulling on the line can cut deeper into the flipper.' Calling experts kept both the children and the turtle safe.",
        ),
      ),
    (n) =>
      read(
        CORAL,
        choice(
          n,
          "What is the main idea of the first paragraph?",
          [
            "Coral polyps and algae live together and help each other.",
            "Coral reefs are made of rocks.",
            "The Great Barrier Reef is in danger.",
            "Scientists are studying tough corals.",
          ],
          0,
          "The first paragraph explains the partnership: the algae make food for the coral, and the coral gives the algae shelter.",
        ),
      ),
    (n) =>
      read(
        MAKING_LAWS,
        ordering(
          n,
          "Put these stages in the order they happen.",
          [
            "A bill is introduced into one house.",
            "Members of that house debate and vote on the bill.",
            "The Senate debates and votes on the bill.",
            "The Governor-General gives royal assent.",
          ],
          "The signal words First, Next and Finally show the order: introduced, voted on in the first house, passed to the Senate, then signed by the Governor-General.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        LAST_OVER,
        choice(
          n,
          "Why does the writer put 'Two runs needed. Four balls left.' in a paragraph of its own?",
          [
            "to slow the story down and build tension",
            "to explain the rules of cricket",
            "to show that Amira is bad at maths",
            "to introduce a new character",
          ],
          0,
          "Short, separate sentences make the reader pause, like the crowd holding its breath. It reminds us how close the game is.",
        ),
      ),
    (n) =>
      read(
        BUS_SEAT,
        choice(
          n,
          "Why did nobody else ever sit in Mr Kowalski's seat?",
          [
            "The regular passengers knew it was his seat and left it for him.",
            "The seat was broken.",
            "The driver had put a sign on it.",
            "It was saved for school students.",
          ],
          0,
          "The text says 'The regular passengers just seemed to know.' They had seen him there every day and left it free for him.",
        ),
      ),
    (n) =>
      read(
        TURTLE,
        choice(
          n,
          "This text is a news report. What does the first paragraph do?",
          [
            "It sums up the main event: what happened, to whom, and when.",
            "It gives the opinion of the newspaper editor.",
            "It describes the life cycle of sea turtles.",
            "It tells readers what to do next time.",
          ],
          0,
          "News reports open with a lead paragraph that sums up the whole story. Details and quotes come later.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        LAST_OVER,
        choice(
          n,
          "Why did Amira's last ball work?",
          [
            "The batter expected a fast ball and swung too early.",
            "The ball hit a bump in the pitch.",
            "The batter was not watching.",
            "Zaid caught the ball behind the stumps.",
          ],
          0,
          "The ball was 'slower than anything she had bowled all day'. The batter was 'expecting pace', so swung too early and missed.",
        ),
      ),
    (n) =>
      read(
        BUS_SEAT,
        choice(
          n,
          "What has most likely happened to Mr Kowalski?",
          [
            "He has died, and a relative is honouring him.",
            "He has moved to another city.",
            "He has bought a car.",
            "He is sitting in a different seat on the bus.",
          ],
          0,
          "His seat is empty for a week, a woman with his same eyes leaves a rose there, the driver nods sadly and nobody speaks. These clues suggest he has died.",
        ),
      ),
    (n) =>
      read(
        CORAL,
        multi(
          n,
          "Which statements does the text support? Choose all that are right.",
          [
            "Algae give coral most of its colour.",
            "Bleaching happens when water stays too warm for too long.",
            "A bleached coral may recover if the water cools in time.",
            "All corals are equally tough.",
            "Bleaching has happened only once, in 1998.",
          ],
          [0, 1, 2],
          "The text says algae give the colour, warm water causes bleaching, and coral may recover if it cools. It says some corals are tougher than others and there have been several events since 1998.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        LAST_OVER,
        choice(
          n,
          "Why does the writer remind us that Coach Davies once called Amira 'too small to bowl at the end'?",
          [
            "so that her winning wicket also proves her doubter wrong, making the moment more satisfying",
            "to show that Coach Davies is the main character",
            "to explain why Amira bowled a full toss",
            "to show that Amira is still too small",
          ],
          0,
          "Remembering the coach's doubt raises the stakes. When she bowls the winning ball at the end, she proves him wrong, so the victory means even more.",
        ),
      ),
    (n) =>
      read(
        MAKING_LAWS,
        choice(
          n,
          "The author says the process 'may seem slow'. What is the author's view of this?",
          [
            "The slowness is worthwhile because it lets laws be checked carefully.",
            "The process is a waste of time and should be scrapped.",
            "Only the Senate should vote on laws.",
            "The Governor-General should make laws alone.",
          ],
          0,
          "Straight after 'may seem slow', the author says 'but it gives many people the chance to examine a law carefully'. The word 'but' shows the author thinks it is worth it.",
        ),
      ),
    (n) =>
      read(
        BUS_SEAT,
        choice(
          n,
          "Why does the woman sit on the aisle side and lay the rose on the window seat?",
          [
            "to leave Mr Kowalski's seat for him, as a sign of love and respect",
            "because the window seat was dirty",
            "so she could get off the bus quickly",
            "because she didn't know it was his seat",
          ],
          0,
          "She chooses his row but leaves his exact seat empty, with a rose on it. Like the regular passengers, she keeps his place for him to honour his memory.",
        ),
      ),
  ],
});

const DROUGHT_POEM = {
  title: "Drought",
  text:
    "The paddocks lie like old brown paper,\ncreased and cracked and torn.\nThe dam's a dish of drying mud,\nthe sky's a sheet of scorn.\n\n" +
    "The cattle stand with lowered heads\nand count their ribs for rain.\nThe windmill creaks a rusty prayer\nand turns, and turns again.\n\n" +
    "Then one night on the iron roof,\na tap, a tap, a drum —\nand Dad stands barefoot in the yard\nand laughs, for rain has come.",
};

const SECOND_PLACE = {
  title: "Second Place",
  text:
    "When Mai spelt 'conscientious' perfectly and the judges announced her the winner of the regional spelling bee, the audience clapped. Priya clapped too. Her hands moved, but she could not feel them.\n\n" +
    "She had studied every night for three months. Mai had started two weeks ago, between soccer games.\n\n" +
    "On the bus home, Priya sat at the back and pressed her forehead against the cold window. Her silver medal sat in her pocket like a stone. When Mai turned around and waved, Priya pretended to be asleep.\n\n" +
    "That night, she took out her word list and almost tore it in half. Then she noticed something written in the margin, in Mai's round handwriting: Priya, you're going to win this! I'll quiz you on Thursday.\n\n" +
    "Priya remembered Thursday. Mai had quizzed her for an hour and missed her own soccer training to do it.\n\n" +
    "Priya picked up her phone. Her thumb hovered over the screen for a long time. Then she typed: Congratulations. You earned it. Want to study for the state final together?",
};

const THE_CLOCK = {
  title: "Grandpa's Clock",
  text:
    "Grandpa's clock had stood in the hallway for as long as anyone could remember. It was taller than Dad, made of dark wood, and its brass pendulum swung with a slow, steady tock that you could hear from every room.\n\n" +
    "The week after Grandpa's funeral, the clock stopped.\n\n" +
    "Nobody touched it. Mum walked around it as if it were asleep. Dad said he'd get it fixed, but the weeks became months, and the hallway grew so quiet that I started humming just to fill it.\n\n" +
    "One Saturday, I found a small brass winder in Grandpa's desk drawer, wrapped in a note: Wind me every Sunday, or I'll sulk.\n\n" +
    "I laughed out loud for the first time since winter.\n\n" +
    "The next morning, I opened the little glass door, fitted the winder and turned it, carefully, seven times. For a moment nothing happened. Then the pendulum shivered, swung, and the old sound filled the house again.\n\n" +
    "From the kitchen, Mum called, \"Is that Grandpa's clock?\" Her voice sounded like she was smiling.",
};

/** EN3-UARL-01: narrative, character, imagery, symbol and connotation in literature. */
export const LITERATURE = levels(6150216, {
  very_easy: [
    (n) =>
      read(
        DROUGHT_POEM,
        typed(
          "short_answer",
          n,
          "'The dam's a dish of drying mud' says the dam IS a dish, without using 'like' or 'as'. What kind of figurative language is this?",
          ["metaphor", "a metaphor"],
          "A metaphor says one thing is another. A simile would use 'like' or 'as': the dam is like a dish.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'Confident' and 'arrogant' have the same connotation.",
        false,
        "Both describe someone who believes in themselves, but 'confident' sounds positive, while 'arrogant' suggests they think they are better than others.",
      ),
    (n) =>
      read(
        THE_CLOCK,
        choice(
          n,
          "What happened to the clock the week after Grandpa's funeral?",
          ["It stopped.", "It was sold.", "It fell over.", "It started chiming loudly."],
          0,
          "The second paragraph says, in one short line, 'The week after Grandpa's funeral, the clock stopped.'",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        DROUGHT_POEM,
        multi(
          n,
          "Which lines give an animal or object a human action? Choose all that are right.",
          [
            "The windmill creaks a rusty prayer",
            "and count their ribs for rain",
            "The dam's a dish of drying mud",
            "a tap, a tap, a drum",
          ],
          [0, 1],
          "Praying and counting are things people do, so a praying windmill and cattle counting their ribs are personification. The dam line is a metaphor and 'a tap, a tap' imitates the sound of rain.",
        ),
      ),
    (n) =>
      read(
        SECOND_PLACE,
        choice(
          n,
          "'Her silver medal sat in her pocket like a stone.' What does this simile suggest?",
          [
            "The medal felt heavy and disappointing, not something to celebrate.",
            "The medal was made of rock.",
            "Priya likes collecting stones.",
            "The medal was worth a lot of money.",
          ],
          0,
          "A stone is heavy, cold and dull. Comparing the medal to one shows Priya feels weighed down by coming second.",
        ),
      ),
    (n) =>
      read(
        THE_CLOCK,
        ordering(
          n,
          "Put these events from the story in order.",
          [
            "Grandpa's funeral took place.",
            "The clock stopped.",
            "The narrator found the winder and a note.",
            "The narrator wound the clock.",
            "Mum called out from the kitchen.",
          ],
          "The clock stopped after the funeral, months later the narrator found the winder, wound the clock the next morning, and then Mum heard it.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        DROUGHT_POEM,
        choice(
          n,
          "How does the mood change in the last stanza?",
          [
            "from hopeless and dry to joyful and relieved",
            "from happy to frightened",
            "from calm to angry",
            "It stays sad all the way through.",
          ],
          0,
          "The first two stanzas are full of cracked land, thin cattle and scorn. In the last one rain drums on the roof and Dad laughs, so the mood turns joyful.",
        ),
      ),
    (n) =>
      read(
        SECOND_PLACE,
        choice(
          n,
          "'Her hands moved, but she could not feel them.' What does this show about Priya?",
          [
            "She was so shocked and disappointed that she clapped without really feeling it.",
            "Her hands were frozen from the cold hall.",
            "She was too excited to think.",
            "She wasn't watching the spelling bee.",
          ],
          0,
          "She claps because she should, but she is numb with disappointment. The writer shows her feelings instead of telling us.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'Slim' and 'skinny' mean nearly the same thing, but 'skinny' feels more negative. The feeling a word carries is called its ___.",
        ["connotation", "connotations"],
        "A word's dictionary meaning is its denotation. The feeling or idea it suggests, positive or negative, is its connotation.",
      ),
  ],
  hard: [
    (n) =>
      read(
        THE_CLOCK,
        choice(
          n,
          "What does the clock most likely symbolise in this story?",
          [
            "Grandpa's presence and the heartbeat of the family home",
            "how old-fashioned the house is",
            "the narrator's fear of the dark",
            "the start of the school term",
          ],
          0,
          "The clock stops when Grandpa dies and the house falls silent. When it starts again, life returns to the house, so it stands for Grandpa and the family's life together.",
        ),
      ),
    (n) =>
      read(
        SECOND_PLACE,
        choice(
          n,
          "Why does the writer include the note in Mai's handwriting?",
          [
            "It makes Priya, and the reader, realise that Mai had been a loyal friend all along.",
            "It shows that Mai has neat handwriting.",
            "It proves that Mai cheated.",
            "It explains the rules of the spelling bee.",
          ],
          0,
          "The note shows Mai believed in Priya and gave up training to help her. It turns Priya's jealousy around and is the turning point of the story.",
        ),
      ),
    (n) =>
      multi(
        n,
        "A writer wants to show that a character is angry without using the word 'angry'. Which sentences do this? Choose all that are right.",
        [
          "Her jaw tightened and she slammed the cupboard door.",
          "He was really, really angry.",
          "She stabbed at her dinner with her fork and didn't eat a bite.",
          "He smiled and waved to his friends.",
        ],
        [0, 2],
        "'Show, don't tell': a tight jaw, a slammed door and stabbing at food let readers work out the anger. The second sentence tells us directly, and the last shows happiness.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        DROUGHT_POEM,
        choice(
          n,
          "Why does the poet end with Dad standing barefoot in the yard and laughing?",
          [
            "One person's joyful action captures how much the rain means to the whole family.",
            "It shows that Dad forgot to put on his shoes.",
            "It warns readers about the danger of lightning.",
            "It shows that the drought is still going on.",
          ],
          0,
          "After two stanzas of suffering, a single picture of Dad rushing out barefoot and laughing shows the relief better than any explanation could.",
        ),
      ),
    (n) =>
      read(
        THE_CLOCK,
        choice(
          n,
          "Why is the note 'Wind me every Sunday, or I'll sulk' important to the story?",
          [
            "Grandpa's playful humour lives on in the note, and it helps the narrator begin to heal.",
            "It proves the clock was broken all along.",
            "It shows Grandpa was strict and bossy.",
            "It tells the reader how clocks work.",
          ],
          0,
          "The joke sounds just like Grandpa talking. It makes the narrator laugh 'for the first time since winter', which starts the family's recovery.",
        ),
      ),
    (n) =>
      read(
        SECOND_PLACE,
        choice(
          n,
          "Priya's thumb 'hovered over the screen for a long time'. What does this pause show, and how is her conflict resolved?",
          [
            "She is torn between hurt pride and friendship, and in the end she chooses friendship.",
            "She has forgotten how to spell 'congratulations', so she gives up.",
            "She wants to tell Mai the judges were unfair.",
            "She is too tired to type, so she goes to sleep.",
          ],
          0,
          "The pause shows her inner struggle. Her message, congratulating Mai and offering to study together, shows she has chosen friendship over jealousy.",
        ),
      ),
  ],
});

const WHALES = {
  title: "Whale Watching: Two Texts",
  text:
    "Text A – Tour company brochure\n\n" +
    "See the giants of the deep up close! Every winter, thousands of humpback whales swim past Eden on their journey north. Our fast, modern boats will take you right into the action, so you can feel the spray as a 40-tonne whale leaps from the water beside you. Book today: seats sell out fast!\n\n" +
    "Text B – Article by a marine scientist\n\n" +
    "Whale watching can help people care about the ocean. However, boats that approach too quickly or too closely can stress whales, especially mothers with young calves. In NSW, rules say most boats must stay at least 100 metres from a whale, and even further from a calf. Visitors should choose operators who follow these rules and who treat whales as wild animals, not as a show.",
};

const GOLD_FEVER = {
  title: "Gold Fever",
  text:
    "Near Bathurst, 1851\n\n" +
    "Thomas had never seen so many people in one place. Men in mud-stiff trousers pushed past him, swinging picks and pans. Tents had sprouted along the creek like mushrooms after rain, and the air rang with shouting in a dozen languages.\n\n" +
    '"Stay close," Father said, gripping the handle of their cart. They had walked for nine days from Sydney, and Thomas\'s boots had split at the toes.\n\n' +
    "That afternoon, Father paid thirty shillings for a mining licence. Thomas stared. That was nearly all the money they had left.\n\n" +
    '"What if we don\'t find any gold?" he whispered.\n\n' +
    "Father looked at the crowded creek, then at Thomas, and for a moment his face looked older than Thomas had ever seen it. Then he smiled and handed Thomas a pan.\n\n" +
    '"Then at least we\'ll know we tried," he said. "That\'s worth something too."',
};

const SWIM_LESSONS = {
  title: "Every Child Should Learn to Swim at School",
  text:
    "Australia is surrounded by ocean and dotted with rivers, dams and backyard pools. Yet many children leave primary school unable to swim fifty metres. Swimming lessons should be part of every school year, from Kindergarten to Year 6.\n\n" +
    "The most important reason is safety. Water is part of Australian life, and a child who can swim and float is far more likely to survive a fall into a river or a rip at the beach.\n\n" +
    "In addition, lessons through school reach every child. Private lessons can be expensive, and families who live far from a pool may find it hard to get there each week. School lessons make sure no child misses out because of money or distance.\n\n" +
    "Some people argue that schools are already too busy and that swimming takes time away from maths and English. However, a skill that could save a life deserves a place in the timetable. After all, a child cannot learn fractions if they never get the chance to grow up.\n\n" +
    "If we truly care about children's safety, we must make swimming lessons part of every school year.",
};

/** EN3-UARL-02: genre, theme, perspective and context, argument and authority. */
export const GENRE_THEME = levels(6150316, {
  very_easy: [
    (n) =>
      read(
        GOLD_FEVER,
        choice(
          n,
          "Which genre is 'Gold Fever'?",
          ["historical fiction", "science fiction", "fantasy", "information report"],
          0,
          "It is an invented story with made-up characters, but it is set in a real time and place from the past: the 1851 gold rush. That is historical fiction.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A legend is a traditional story that may be based partly on real people or events.",
        true,
        "Legends, like the stories of Ned Kelly or Robin Hood, mix real people or events with parts that have grown bigger over many retellings.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A persuasive text that argues for one side of an issue, with a thesis, arguments and a conclusion, is called an ___.",
        ["exposition", "exposition text"],
        "An exposition puts forward one point of view and backs it up with arguments. A discussion looks at both sides.",
      ),
  ],
  easy: [
    (n) =>
      read(
        WHALES,
        choice(
          n,
          "What is the main purpose of Text A?",
          [
            "to persuade readers to book a whale-watching tour",
            "to explain the rules about boats and whales",
            "to describe the life cycle of humpback whales",
            "to warn readers that whale watching is dangerous",
          ],
          0,
          "Text A is a brochure that ends with 'Book today: seats sell out fast!' Its purpose is to sell tours.",
        ),
      ),
    (n) =>
      read(
        SWIM_LESSONS,
        choice(
          n,
          "Which sentence is the writer's thesis, the main position the whole text argues for?",
          [
            "Swimming lessons should be part of every school year, from Kindergarten to Year 6.",
            "Australia is surrounded by ocean and dotted with rivers, dams and backyard pools.",
            "Private lessons can be expensive.",
            "Some people argue that schools are already too busy.",
          ],
          0,
          "The thesis comes at the end of the first paragraph and is repeated in the conclusion. The others are background, evidence or the opposing view.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of a news report in the usual order.",
        [
          "a headline",
          "a lead paragraph that sums up who, what, when and where",
          "more details and quotes from people involved",
          "a final paragraph about what will happen next",
        ],
        "A news report grabs attention with a headline, sums up the event in the lead, adds details and quotes, and often ends with what happens next.",
      ),
  ],
  medium: [
    (n) =>
      read(
        WHALES,
        multi(
          n,
          "Which words or phrases in Text A are chosen to excite readers? Choose all that are right.",
          ["giants of the deep", "right into the action", "feel the spray", "at least 100 metres"],
          [0, 1, 2],
          "'Giants of the deep', 'right into the action' and 'feel the spray' make the tour sound thrilling. 'At least 100 metres' comes from Text B and is a rule, not an exciting phrase.",
        ),
      ),
    (n) =>
      read(
        GOLD_FEVER,
        multi(
          n,
          "Which details show that the story is set in the past? Choose all that are right.",
          [
            "the year 1851",
            "paying in shillings for a mining licence",
            "walking nine days from Sydney with a cart",
            "Thomas feels nervous",
          ],
          [0, 1, 2],
          "The date, the old money and walking from Sydney with a cart all belong to the 1850s. Feeling nervous could happen in any time.",
        ),
      ),
    (n) =>
      read(
        SWIM_LESSONS,
        choice(
          n,
          "Which words does the writer use to signal a second, extra argument?",
          ["In addition", "However", "Yet", "After all"],
          0,
          "'In addition' adds another argument. 'However' and 'Yet' signal a contrast, and 'After all' introduces a final reason.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        WHALES,
        choice(
          n,
          "Why is Text B's information about boats and whales more trustworthy than Text A's?",
          [
            "It is written by a marine scientist, it refers to official rules, and the writer isn't selling anything.",
            "It is shorter than Text A.",
            "It uses more exclamation marks.",
            "It mentions the town of Eden.",
          ],
          0,
          "Authority comes from expertise and evidence. A scientist quoting the rules has nothing to gain, while a tour company wants your money.",
        ),
      ),
    (n) =>
      read(
        GOLD_FEVER,
        choice(
          n,
          "Which theme does 'Gold Fever' explore?",
          [
            "taking a brave risk in the hope of a better life",
            "the dangers of the ocean",
            "friendship between animals",
            "how gold is formed underground",
          ],
          0,
          "Father spends nearly all their money on a chance to find gold, and says trying is 'worth something too'. The story is about courage and hope when taking a risk.",
        ),
      ),
    (n) =>
      read(
        SWIM_LESSONS,
        multi(
          n,
          "Which persuasive devices does the writer use? Choose all that are right.",
          [
            "high-modality words such as 'must'",
            "a rebuttal of the opposing view",
            "an emotional appeal about children's safety",
            "quotes from named experts",
          ],
          [0, 1, 2],
          "The writer says 'we must', answers the 'schools are too busy' argument, and appeals to our feelings about children growing up. No experts are quoted.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        WHALES,
        choice(
          n,
          "Text A promises to take you 'right into the action'. After reading Text B, what might a careful reader question?",
          [
            "whether the tour boats keep the required distance from the whales",
            "whether humpback whales really swim past Eden",
            "whether the boats are modern",
            "whether it is cold in winter",
          ],
          0,
          "Text B says boats must stay at least 100 metres away. 'Right into the action' and 'beside you' make you wonder if the tour gets too close.",
        ),
      ),
    (n) =>
      read(
        GOLD_FEVER,
        choice(
          n,
          "How does knowing about the 1851 gold rush help a reader understand Father's choice?",
          [
            "Thousands of people risked everything because finding gold could change a family's life overnight.",
            "Gold was lying on the ground for anyone to pick up.",
            "Mining licences were free in 1851.",
            "Everyone in 1851 was already rich.",
          ],
          0,
          "Context shapes meaning. In the gold rush, a lucky find could make a poor family rich, so many people, like Father, gambled nearly all they had.",
        ),
      ),
    (n) =>
      read(
        SWIM_LESSONS,
        choice(
          n,
          "Which piece of evidence would most strengthen the writer's safety argument?",
          [
            "figures from a water-safety organisation on how many children drown each year",
            "the writer's opinion that swimming is fun",
            "a joke about fish",
            "a photo of the writer's backyard pool",
          ],
          0,
          "Facts from an expert organisation give the argument authority. An opinion, a joke or a photo would not prove that lessons save lives.",
        ),
      ),
  ],
});

/** EN3-CWT-01: text features, complex sentences, clauses, modal verbs, apostrophes, speech and cohesion. */
export const WRITING = levels(6110316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is the subordinating conjunction in this sentence? 'We waited at the gate until the bus arrived.'",
        ["waited", "gate", "until", "arrived"],
        2,
        "'Until' starts a dependent clause that tells us when: until the bus arrived.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Its' and 'it's' mean the same thing.",
        false,
        "'It's' means it is or it has. 'Its' shows belonging, like 'The koala hugged its baby.'",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Write the contraction: they will = ___",
        ["they'll", "they’ll"],
        "Join the words and put an apostrophe where the letters 'wi' are missing: they'll.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "The bike belongs to James. Which is correct?",
        ["James's bike", "Jame's bike", "James bike", "Jameses' bike"],
        0,
        "James is one person, so add an apostrophe and s after his whole name: James's bike. (Some writers use James' bike, which is also accepted.)",
      ),
    (n) =>
      choice(
        n,
        "Which is punctuated correctly?",
        [
          '"Hurry up!" shouted Coach. "The bus is leaving."',
          '"Hurry up!" Shouted Coach. "The bus is leaving."',
          '"Hurry up"! shouted Coach. "The bus is leaving."',
          '"Hurry up!" shouted Coach, "the bus is leaving".',
        ],
        0,
        "The exclamation mark goes inside the speech marks, 'shouted' stays lower case, and 'The bus is leaving' is a new sentence, so it starts with a capital and ends with a full stop inside the speech marks.",
      ),
    (n) =>
      multi(
        n,
        "Which are features of a formal letter? Choose all that are right.",
        [
          "a polite greeting such as 'Dear Mr Lee'",
          "a clear purpose stated early",
          "a formal sign-off such as 'Yours sincerely'",
          "slang like 'heaps good'",
        ],
        [0, 1, 2],
        "Formal letters greet politely, get to the point and sign off formally. Slang belongs in casual writing to friends.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        'Jack said, "We are playing cricket today." Which sentence reports this correctly?',
        [
          "Jack said that they were playing cricket that day.",
          "Jack said that we are playing cricket today.",
          'Jack said that "they were playing cricket."',
          "Jack said, they are playing cricket today.",
        ],
        0,
        "In reported speech, 'we' becomes 'they', 'are' becomes 'were', 'today' becomes 'that day', and there are no speech marks.",
      ),
    (n) =>
      choice(
        n,
        "Which sentence correctly uses 'unless' to join 'You will miss the bus.' and 'You leave now.'?",
        [
          "You will miss the bus unless you leave now.",
          "Unless you will miss the bus, you leave now.",
          "You leave now unless you will miss the bus.",
          "Unless, you leave now you will miss the bus.",
        ],
        0,
        "'Unless' means 'if not'. You will miss the bus if you don't leave now, so 'unless you leave now' is the dependent clause.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a cohesive paragraph.",
        [
          "Uluru is a huge sandstone rock in the Northern Territory.",
          "It is sacred to the Anangu people, the Traditional Owners of the land.",
          "For this reason, climbing Uluru was banned in 2019.",
          "Today, visitors are invited to walk around its base instead.",
        ],
        "Begin with the topic sentence. 'It' refers back to Uluru, 'For this reason' links the ban to its sacred meaning, and 'Today ... instead' follows on from the ban.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Which sentence is written in the passive voice?",
        [
          "The window was broken by the cricket ball.",
          "The cricket ball broke the window.",
          "Sam hit the ball over the fence.",
          "The ball flew high into the air.",
        ],
        0,
        "In the passive voice, the thing affected (the window) comes first and the doer comes after 'by'. In the active voice, the doer comes first: the ball broke the window.",
      ),
    (n) =>
      choice(
        n,
        "'I saw the koala with binoculars.' This could mean the koala had binoculars. Which revision makes it clear that the speaker had them?",
        [
          "Using binoculars, I saw the koala.",
          "I saw the koala that had binoculars.",
          "With binoculars, the koala was seen.",
          "I saw the koala with the binoculars.",
        ],
        0,
        "Putting 'Using binoculars' right next to 'I' shows the speaker was using them. The other versions are still unclear or say the koala had them.",
      ),
    (n) =>
      multi(
        n,
        "Which sentences use apostrophes correctly? Choose all that are right.",
        [
          "The team celebrated its win.",
          "The Joneses' house is next door.",
          "Your's is the blue bag.",
          "Who's coming to the sausage sizzle?",
          "Theirs' is the red tent.",
        ],
        [0, 1, 3],
        "'Its' and possessive pronouns like yours and theirs never take an apostrophe. 'The Joneses' house' belongs to the Jones family, and 'who's' means who is.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "In 'Even though the rain hadn't stopped, the umpires, who were tired of waiting, restarted the match,' which is the main clause?",
        ["the umpires restarted the match", "Even though the rain hadn't stopped", "who were tired of waiting", "the rain hadn't stopped"],
        0,
        "Take away the dependent clause at the start and the relative clause in the middle, and what stands alone is 'the umpires restarted the match'.",
      ),
    (n) =>
      choice(
        n,
        "A Year 6 student is giving a speech to persuade Kindergarten children to put rubbish in the bin. Which sentence best suits this audience?",
        [
          "If we all put our rubbish in the bin, our playground will stay clean and the birds will stay safe!",
          "Litter constitutes a significant environmental hazard requiring immediate action.",
          "Put your stuff in the bin or else.",
          "Rubbish is made of many materials.",
        ],
        0,
        "Five-year-olds need simple words, a friendly tone and a reason they care about. The second is too hard, the third is rude, and the last doesn't persuade.",
      ),
    (n) =>
      choice(
        n,
        'Mum asked, "Where did you leave your hat?" Which sentence reports this correctly?',
        [
          "Mum asked where I had left my hat.",
          "Mum asked where did I leave my hat?",
          "Mum asked, where I had left my hat.",
          "Mum asked where had I left my hat?",
        ],
        0,
        "A reported question becomes a statement: no question mark, normal word order (I had left), 'you' becomes 'I', and 'did leave' moves back to 'had left'.",
      ),
  ],
});
