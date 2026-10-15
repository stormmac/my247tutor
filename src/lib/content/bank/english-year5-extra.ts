/**
 * Year 5 English, second sets: 15 more questions for each Stage 3 standard (NESA outcome), three at
 * each level from very easy to very hard. Reading and literature questions use original passages.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

/** EN3-SPELL-01: prefixes, suffixes, Greek and Latin roots, silent letters, tricky plurals and homophones. */
export const SPELLING = levels(5110116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is spelt correctly?",
        ["frend", "freind", "friend", "frind"],
        2,
        "'Friend' is spelt f-r-i-e-n-d. A trick to remember it: you are my friend to the END.",
      ),
    (n) =>
      trueFalse(
        n,
        "The word 'gnome' has a silent g.",
        true,
        "We write the g in 'gnome' but we start the word with an 'n' sound, just like 'gnaw' and 'gnat'.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Add the prefix re- to 'build' to make a word that means build again: ___",
        "rebuild",
        "The prefix re- means again. It goes on the front and the base word stays the same: re + build = rebuild.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "What is the plural of 'church'?",
        ["churchs", "churches", "churchies", "churchez"],
        1,
        "Words ending in ch, sh, s, x or z add -es so we can say the extra sound: church becomes churches.",
      ),
    (n) =>
      multi(
        n,
        "Which pairs are homophones (they sound the same but are spelt differently and mean different things)? Choose all that are right.",
        ["bare / bear", "flour / flower", "cat / cot", "week / weak", "ship / shop"],
        [0, 1, 3],
        "Bare and bear, flour and flower, and week and weak sound exactly the same. Cat and cot, and ship and shop, have different vowel sounds.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -ment to 'enjoy'. Write the new word.",
        "enjoyment",
        "The suffix -ment starts with a consonant and 'enjoy' has a vowel before the y, so nothing changes: enjoy + ment = enjoyment.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which word correctly fills the gap? 'We ate ___ much cake at the party.'",
        ["to", "too", "two", "tow"],
        1,
        "'Too' with two o's means more than enough, or also. 'To' shows direction and 'two' is the number 2.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Write the plural of 'half'.",
        "halves",
        "Like many words ending in f, change the f to v and add -es: half becomes halves, just like calf becomes calves.",
      ),
    (n) =>
      choice(
        n,
        "Which is the correct spelling of 'swim' + -ing?",
        ["swiming", "swimming", "swimeing", "swimmming"],
        1,
        "'Swim' has a short vowel and ends in one consonant, so double the m before -ing: swim + m + ing = swimming.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "The Greek root 'tele' means far and 'scope' means look. Which word names a tool for looking at things far away?",
        ["telephone", "telescope", "microscope", "television"],
        1,
        "tele (far) + scope (look) = telescope, which lets you look at faraway stars and planets. A microscope looks at tiny things up close.",
      ),
    (n) =>
      trueFalse(
        n,
        "The plural of 'piano' is spelt 'pianoes'.",
        false,
        "Not every word ending in o adds -es. 'Piano' just adds s: pianos, like photos and kangaroos.",
      ),
    (n) =>
      ordering(
        n,
        "Put these word parts in order to build the word 'reappearance'.",
        ["re", "appear", "ance"],
        "Start with the prefix re- (again), then the base word appear, then the suffix -ance: re + appear + ance.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these words are spelt correctly? Choose all that are right.",
        ["government", "Febuary", "library", "surprise", "probaly"],
        [0, 2, 3],
        "'Government' has the n from 'govern', 'library' has two r's and 'surprise' starts with 'sur'. The correct spellings are 'February' and 'probably'.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Add the suffix -er to 'begin' to name a person who is just starting. Write the new word.",
        "beginner",
        "Say be-GIN: the stress is on the last part, and it ends in one vowel and one consonant, so double the n: begin + n + er = beginner.",
      ),
    (n) =>
      choice(
        n,
        "Why does 'enjoyed' keep its y, but 'cried' changes the y to i?",
        [
          "'Enjoy' has a vowel before the y, so the y stays; 'cry' has a consonant before the y, so it changes to i",
          "'Enjoyed' is a longer word, so it keeps all its letters",
          "Words about feelings always keep the y",
          "Both words could be spelt either way",
        ],
        0,
        "Look at the letter before the y. A vowel before y (enjoy, play, stay) keeps the y. A consonant before y (cry, try, carry) changes it to i: cried, tried, carried.",
      ),
  ],
});

/** EN3-VOCAB-01: Tier 2 and Tier 3 words, word parts and precise meanings in context. */
export const VOCAB = levels(5120116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word means the same as 'rapid'?",
        ["slow", "fast", "loud", "rough"],
        1,
        "'Rapid' means very quick, like rapids in a river where the water rushes fast. The closest word is 'fast'.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Fragile' means easily broken.",
        true,
        "Boxes with glasses inside often say FRAGILE so people handle them gently, because they break easily.",
      ),
    (n) =>
      choice(
        n,
        "Which word means the opposite of 'brave'?",
        ["fearless", "cowardly", "bold", "strong"],
        1,
        "A brave person faces danger. The opposite is someone who runs away from danger: cowardly. Fearless and bold mean nearly the same as brave.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "'The puppy was so curious that it sniffed every corner of the new house.' What does 'curious' mean?",
        ["wanting to know or explore", "very sleepy", "scared", "naughty"],
        0,
        "The puppy sniffed every corner because it wanted to find out about the new house. Curious means wanting to know or explore.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The prefix 're-' means again. To reread a book is to read it ___.",
        "again",
        "re- means again, so to reread is to read again, and to replay is to play again.",
      ),
    (n) =>
      multi(
        n,
        "Which words mean 'very small'? Choose all that are right.",
        ["tiny", "minute", "gigantic", "miniature", "massive"],
        [0, 1, 3],
        "Tiny, minute (said my-NEWT) and miniature all mean very small. Gigantic and massive mean very big.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these words in order from least hot to most hot.",
        ["warm", "hot", "scorching"],
        "Warm is a little hot, hot is in the middle, and scorching is so hot it could burn, like a 45 degree day in Bourke.",
      ),
    (n) =>
      choice(
        n,
        "In science, what is a 'predator'?",
        [
          "an animal that hunts and eats other animals",
          "an animal that is hunted by others",
          "a plant that grows in the shade",
          "an animal that sleeps all winter",
        ],
        0,
        "A predator hunts other animals for food, like a wedge-tailed eagle hunting a rabbit. The animal being hunted is called the prey.",
      ),
    (n) =>
      choice(
        n,
        "In which sentence does 'bat' mean a flying animal?",
        [
          "Pass me the cricket bat.",
          "A bat hung upside down in the cave.",
          "It's your turn to bat.",
          "She didn't bat an eyelid when the alarm went off.",
        ],
        1,
        "Only the cave sentence is about an animal hanging upside down. The others are about cricket or a saying that means not reacting.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "'Geo' means earth and '-graphy' means writing about or describing. What is geography?",
        [
          "the study of the earth, its places and its people",
          "the study of numbers",
          "writing the story of your own life",
          "the study of dinosaur bones",
        ],
        0,
        "Put the parts together: geo (earth) + graphy (describing) = describing the earth. In geography you learn about places, landforms and people.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The suffix '-ful' means full of. Write one word that means 'full of colour'.",
        ["colourful", "colorful"],
        "colour + ful = colourful. In Australia we spell 'colour' with ou, and the suffix -ful has only one l.",
      ),
    (n) =>
      choice(
        n,
        "Which word best describes how the mouse moved, rushing along with quick, tiny steps so the cat wouldn't hear?",
        ["scurried", "stomped", "marched", "waddled"],
        0,
        "'Scurried' means moved quickly with short, light steps. Stomped and marched are loud and heavy, and waddled is slow and wobbly.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "'The two classes reached a compromise: each would use the oval for half of lunchtime.' What does 'compromise' mean here?",
        [
          "an agreement where each side gives up a little",
          "a fight that nobody wins",
          "a competition to decide a winner",
          "a promise never to share",
        ],
        0,
        "Neither class gets the whole oval, but both get some time. When each side gives up a little to agree, that is a compromise.",
      ),
    (n) =>
      multi(
        n,
        "The Latin root 'aqua' means water. In which words does it carry that meaning? Choose all that are right.",
        ["aquarium", "aquatic", "aqueduct", "acquire", "acrobat"],
        [0, 1, 2],
        "An aquarium is a water tank, aquatic means living in water, and an aqueduct carries water. Acquire (to get) and acrobat are not about water.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'Possible' means able to happen. Something that cannot happen is ___.",
        "impossible",
        "The prefix in- (meaning not) changes to im- before a p, so it is easier to say: im + possible = impossible.",
      ),
  ],
});

const LOST_AT_SHOW = {
  title: "Lost at the Show",
  text:
    "The Royal Easter Show was so crowded that Sam could barely see the rides over people's heads. Mum had given him one job: hold Ruby's hand and don't let go.\n\n" +
    "He let go for three seconds, just long enough to pay for a dagwood dog. When he turned around, his little sister had vanished.\n\n" +
    "Sam's heart thudded. He pushed past prams and showbag stalls, calling her name. Every small girl in a yellow raincoat made him spin around, but none of them was Ruby.\n\n" +
    "Then he remembered how she had talked about the baby animals all week. He ran to the animal nursery. There, sitting in the straw, was Ruby, with a lamb asleep across her lap.\n\n" +
    '"Sam!" she beamed. "His name is Biscuit."\n\n' +
    "Sam sat down beside her and decided the dagwood dog could wait.",
};

const LYREBIRDS = {
  title: "The Superb Lyrebird",
  text:
    "The superb lyrebird lives in the damp forests of south-eastern Australia, including the Blue Mountains and Royal National Park. It is famous for being one of the best copycats in the animal world.\n\n" +
    "A male lyrebird can copy the calls of more than twenty other birds, such as kookaburras, whipbirds and currawongs. Some lyrebirds that live near people have even copied car alarms, camera shutters and chainsaws.\n\n" +
    "The male uses these sounds to attract a female. In winter, he builds a small mound of earth on the forest floor. He stands on it, spreads his long, lacy tail feathers over his head and sings his mixed-up song.\n\n" +
    "Lyrebirds also help the forest. As they scratch for worms and insects, they turn over huge amounts of fallen leaves, which helps them break down into rich soil.",
};

const BUDDY_BENCH = {
  title: "A Letter to the Principal",
  text:
    "Dear Mrs Rossi,\n\n" +
    "I am writing to ask if our school could put a buddy bench in the playground.\n\n" +
    "A buddy bench is a seat where students can sit if they feel lonely or have no one to play with. When other students see someone on the bench, they go over and invite them to join in.\n\n" +
    "Last term, a new girl in my class spent every lunchtime walking along the fence by herself. Nobody noticed until she told our teacher she wanted to change schools. A buddy bench could have helped her much sooner.\n\n" +
    "The bench would not cost much. Our class could raise the money with a cake stall, and Mr Tran has offered to paint it.\n\n" +
    "Please think about it. No one at Hillview should ever feel invisible.\n\n" +
    "Yours sincerely,\nOliver Burke, Year 5",
};

const THE_KITE = {
  title: "The Kite",
  text:
    'Hamish wanted to build the kite by himself. When Pop offered to help, Hamish shook his head. "I watched a video," he said. "I know what I\'m doing."\n\n' +
    "He taped two sticks into a cross, stretched a garbage bag over them and tied on a long string. It looked perfect.\n\n" +
    "At Bondi Beach, the wind was strong and steady. Hamish ran along the sand, and the kite leapt into the air, wobbled, spun twice and smashed nose-first into the sand. One stick had snapped clean in half.\n\n" +
    "Hamish kicked the sand. Pop didn't say anything. He just sat down, pulled a roll of tape from his pocket and held out his hand for the broken stick.\n\n" +
    "This time, Hamish passed it to him.\n\n" +
    "By the afternoon, a patched-up kite with a tail made from Pop's old tie was dancing high above the waves.",
};

const WORM_FARM = {
  title: "How to Set Up a Worm Farm",
  text:
    "Goal: to turn food scraps into rich compost for the garden.\n\n" +
    "You will need:\n- a worm farm with stacking trays and a lid\n- a bucket of coconut fibre bedding\n- 1000 compost worms\n- a sheet of damp newspaper\n\n" +
    "Steps:\n1. Place the worm farm in a shady spot, out of the hot afternoon sun.\n2. Soak the coconut fibre in water until it is damp, then spread it in the top tray.\n3. Gently tip the worms onto the bedding.\n4. Cover them with the damp newspaper to keep them dark and moist.\n5. Wait one week, then add small amounts of fruit and vegetable scraps.\n\n" +
    "Tip: Do not feed your worms onion, citrus or meat. Worms dislike these foods, and meat will attract flies.",
};

/** EN3-RECOM-01: reading for main idea, inference, author's purpose and text structure. */
export const READING = levels(5130116, {
  very_easy: [
    (n) =>
      read(
        LOST_AT_SHOW,
        choice(
          n,
          "Where did Sam find Ruby?",
          ["at the animal nursery", "at the dagwood dog stall", "on a ride", "at a showbag stall"],
          0,
          "The fifth paragraph says he ran to the animal nursery, and Ruby was sitting in the straw with a lamb.",
        ),
      ),
    (n) =>
      read(
        LYREBIRDS,
        trueFalse(
          n,
          "Lyrebirds can copy the calls of other birds.",
          true,
          "The second paragraph says a male lyrebird can copy more than twenty other birds, such as kookaburras and whipbirds.",
        ),
      ),
    (n) =>
      read(
        WORM_FARM,
        typed(
          "short_answer",
          n,
          "In step 4, what do you cover the worms with?",
          ["damp newspaper", "newspaper", "wet newspaper", "a sheet of damp newspaper"],
          "Step 4 says to cover the worms with the damp newspaper to keep them dark and moist.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        LOST_AT_SHOW,
        choice(
          n,
          "Why did Sam let go of Ruby's hand?",
          ["to pay for a dagwood dog", "to go on a ride", "to pat a lamb", "to buy a showbag"],
          0,
          "The second paragraph says he let go for three seconds, 'just long enough to pay for a dagwood dog'.",
        ),
      ),
    (n) =>
      read(
        LYREBIRDS,
        choice(
          n,
          "What is the main idea of the third paragraph?",
          [
            "how a male lyrebird attracts a female",
            "where lyrebirds live",
            "what lyrebirds eat",
            "how lyrebirds help the forest",
          ],
          0,
          "The third paragraph begins 'The male uses these sounds to attract a female' and then describes his mound, tail and song.",
        ),
      ),
    (n) =>
      read(
        BUDDY_BENCH,
        choice(
          n,
          "What is Oliver's main purpose in writing this letter?",
          [
            "to persuade the principal to put a buddy bench in the playground",
            "to complain about a new girl in his class",
            "to explain how to run a cake stall",
            "to thank Mr Tran for painting",
          ],
          0,
          "Oliver says 'I am writing to ask if our school could put a buddy bench in the playground', then gives reasons. He wants to persuade Mrs Rossi.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        LYREBIRDS,
        multi(
          n,
          "Which facts are stated in the text? Choose all that are right.",
          [
            "Lyrebirds live in damp forests.",
            "Some lyrebirds have copied car alarms.",
            "Female lyrebirds build mounds of earth.",
            "Lyrebirds eat mainly seeds and fruit.",
            "Lyrebirds help fallen leaves turn into soil.",
          ],
          [0, 1, 4],
          "The text says lyrebirds live in damp forests, have copied car alarms and help leaves break down into soil. It is the male that builds the mound, and they eat worms and insects.",
        ),
      ),
    (n) =>
      read(
        BUDDY_BENCH,
        choice(
          n,
          "Why does Oliver include the story about the new girl?",
          [
            "to show that a real student needed a buddy bench",
            "to tell the principal the girl's name",
            "to show that the fence needs fixing",
            "to make the letter funny",
          ],
          0,
          "A true example of a lonely student who nearly left proves the problem is real. That makes his request stronger.",
        ),
      ),
    (n) =>
      read(
        THE_KITE,
        choice(
          n,
          "Why did Hamish say no when Pop offered to help at the start?",
          [
            "He wanted to prove he could do it on his own.",
            "He didn't like his Pop.",
            "Pop didn't know how to make kites.",
            "He had already bought a kite.",
          ],
          0,
          "Hamish 'wanted to build the kite by himself' and says he knows what he's doing. He wanted to show he didn't need help.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        LOST_AT_SHOW,
        choice(
          n,
          "'Every small girl in a yellow raincoat made him spin around.' What can you work out from this?",
          [
            "Ruby was wearing a yellow raincoat.",
            "Sam was feeling dizzy from the rides.",
            "Yellow raincoats were for sale at the show.",
            "Sam was scared of girls in raincoats.",
          ],
          0,
          "Sam is searching for Ruby, so he spins around whenever he sees someone who looks like her. That tells us Ruby had a yellow raincoat on.",
        ),
      ),
    (n) =>
      read(
        THE_KITE,
        choice(
          n,
          "'This time, Hamish passed it to him.' What does this sentence show?",
          [
            "Hamish is now ready to accept Pop's help.",
            "Hamish wants Pop to throw the stick away.",
            "Hamish has given up on kites for good.",
            "Pop has told Hamish off.",
          ],
          0,
          "'This time' reminds us that before, Hamish refused help. Handing over the broken stick shows he has changed his mind and will let Pop help.",
        ),
      ),
    (n) =>
      read(
        WORM_FARM,
        ordering(
          n,
          "Put these steps in the order the text gives them.",
          [
            "Put the worm farm in the shade.",
            "Spread damp bedding in the top tray.",
            "Tip the worms onto the bedding.",
            "Cover the worms with damp newspaper.",
            "Add small amounts of food scraps.",
          ],
          "The numbered steps 1 to 5 show the order: shade, bedding, worms, newspaper, then food after a week.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        THE_KITE,
        choice(
          n,
          "What is the main message of this story?",
          [
            "Accepting help is not the same as failing, and working together can lead to success.",
            "It is better to buy a kite than to make one.",
            "Bondi Beach is too windy for kites.",
            "You should never watch videos to learn things.",
          ],
          0,
          "Hamish's kite crashes when he works alone, but flies 'high above the waves' once he lets Pop help. The story shows that accepting help can lead to success.",
        ),
      ),
    (n) =>
      read(
        BUDDY_BENCH,
        choice(
          n,
          "Oliver ends with 'No one at Hillview should ever feel invisible.' Why is this a strong ending?",
          [
            "It leaves the reader with a powerful feeling that links back to the lonely new girl.",
            "It tells the principal how much the bench will cost.",
            "It brings in a brand-new argument about painting.",
            "It tells a joke to make the principal laugh.",
          ],
          0,
          "The new girl walked alone and 'nobody noticed', so she was invisible. Ending with this idea makes the principal feel how important the bench is.",
        ),
      ),
    (n) =>
      read(
        WORM_FARM,
        choice(
          n,
          "What type of text is this, and which features show it?",
          [
            "a procedure, because it has a goal, a list of things you need and numbered steps",
            "a narrative, because it has characters and a problem",
            "a persuasive text, because it argues that everyone must buy worms",
            "an information report, because it describes every kind of worm",
          ],
          0,
          "A procedure tells you how to do something. It has a goal, a materials list and numbered steps that start with command verbs like 'Place', 'Soak' and 'Wait'.",
        ),
      ),
  ],
});

const WIND_POEM = {
  title: "The Wind at Night",
  text:
    "The wind came prowling after dark\nand rattled every door.\nIt sniffed along the window frames\nand moaned beneath the floor.\n\n" +
    "It kicked the wheelie bins about\nlike toys it didn't need,\nthen curled up in the jacaranda\nas soft as thistle seed.",
};

const LEMON_TREE = {
  title: "The Lemon Tree",
  text:
    "Dad planted the lemon tree on the day Zara was born. Every birthday, she stood beside it for a photo, and every year it was a little taller than the year before.\n\n" +
    "Now the house was sold. Boxes filled the hallway, and the empty rooms echoed when anyone spoke.\n\n" +
    "On the last morning, Zara walked out to the backyard with Mum's garden scissors. She snipped a small branch with three leaves and a tiny green bud, wrapped the end in wet paper towel and tucked it into her lunchbox.\n\n" +
    '"What\'s that for?" asked Dad.\n\n' +
    '"For the new house," Zara said.\n\n' +
    "Dad was quiet for a moment. Then he went to the shed and came back with a small pot.",
};

const DAWN_CAMP = {
  title: "Dawn at Camp",
  text:
    "I hated the idea of camping. No wi-fi, no fridge, and a toilet that was really just a hole with a seat. On our first night at Myall Lakes I lay in my sleeping bag, listening to every rustle and creak, sure that something with teeth was circling the tent.\n\n" +
    'At dawn, Aunty Jo shook my foot. "Come and see," she whispered.\n\n' +
    "Mist hung over the lake like a grey blanket. The water was so still it looked like glass, and a pelican slid across it without making a ripple. Somewhere a kookaburra started laughing, then another, until the whole bush seemed to be in on the joke.\n\n" +
    "Aunty Jo handed me a mug of hot chocolate. I wrapped my cold fingers around it and didn't say a word. I didn't want to break the spell.",
};

/** EN3-UARL-01: narrative, character, imagery, symbol and connotation in literature. */
export const LITERATURE = levels(5130216, {
  very_easy: [
    (n) =>
      read(
        WIND_POEM,
        choice(
          n,
          "In the poem, the wind 'came prowling after dark'. What is the wind being made to seem like?",
          ["a hunting animal, like a cat", "a sleepy baby", "a gentle stream", "a ringing phone"],
          0,
          "Cats and other hunters prowl, which means move around quietly looking for something. The poet makes the wind seem like a creature on the hunt.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'Chuckle' and 'cackle' both describe laughing, but 'cackle' usually sounds more unpleasant.",
        true,
        "Words can mean nearly the same thing but carry different feelings, called connotation. A chuckle is soft and friendly; a cackle sounds harsh, like a witch.",
      ),
    (n) =>
      read(
        DAWN_CAMP,
        typed(
          "short_answer",
          n,
          "'Mist hung over the lake like a grey blanket.' What kind of figurative language is this?",
          ["simile", "a simile"],
          "It compares the mist to a blanket using the word 'like', so it is a simile.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        WIND_POEM,
        multi(
          n,
          "Which phrases give the wind the actions of a person or animal? Choose all that are right.",
          ["It sniffed along the window frames", "and moaned beneath the floor", "It kicked the wheelie bins about", "in the jacaranda"],
          [0, 1, 2],
          "Sniffing, moaning and kicking are things people or animals do. This is personification. 'In the jacaranda' just tells us where.",
        ),
      ),
    (n) =>
      read(
        LEMON_TREE,
        choice(
          n,
          "Why did Zara take a small branch from the lemon tree?",
          ["to grow a new lemon tree at the new house", "to make lemonade for the trip", "to show her teacher", "because Dad told her to"],
          0,
          "She tells Dad it is 'For the new house', and she keeps the cut end in wet paper towel so it stays alive for planting.",
        ),
      ),
    (n) =>
      read(
        LEMON_TREE,
        ordering(
          n,
          "Put these events from the story in the order they happened.",
          [
            "Dad planted the lemon tree.",
            "Zara had a photo beside the tree each birthday.",
            "The house was sold.",
            "Zara snipped a branch from the tree.",
            "Dad came back from the shed with a pot.",
          ],
          "The tree was planted when Zara was born, photos were taken every birthday, then the house was sold, Zara took a cutting, and Dad fetched a pot.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        WIND_POEM,
        choice(
          n,
          "How does the mood change in the last two lines of the poem?",
          [
            "from wild and noisy to calm and gentle",
            "from calm to angry",
            "from happy to frightening",
            "It does not change at all.",
          ],
          0,
          "The wind rattles, moans and kicks, but then it 'curled up' and became 'as soft as thistle seed'. The mood turns calm and gentle.",
        ),
      ),
    (n) =>
      read(
        DAWN_CAMP,
        choice(
          n,
          "'Somewhere a kookaburra started laughing, then another, until the whole bush seemed to be in on the joke.' What feeling does this create?",
          [
            "The bush feels friendly, cheerful and full of life.",
            "The narrator is being laughed at by the birds.",
            "The kookaburras are angry and dangerous.",
            "The bush is silent and empty.",
          ],
          0,
          "Laughing and sharing a joke are happy, friendly things. Imagining the whole bush laughing together makes it feel warm and alive.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Words like 'buzz', 'crash' and 'sizzle' sound like the noise they describe. What is this technique called?",
        ["onomatopoeia", "alliteration", "simile", "rhyme"],
        0,
        "Onomatopoeia is when a word imitates a sound. Alliteration is repeating the first sound, like 'slippery slimy snake'.",
      ),
  ],
  hard: [
    (n) =>
      read(
        LEMON_TREE,
        choice(
          n,
          "What does the lemon tree most likely stand for, or symbolise, in this story?",
          [
            "Zara's family home and all the years she has grown up there",
            "how much Zara loves cooking",
            "that the new house will be bigger",
            "Mum's garden scissors",
          ],
          0,
          "The tree is as old as Zara and grew with her every year. Taking a piece of it means taking a piece of home and her memories with her.",
        ),
      ),
    (n) =>
      read(
        DAWN_CAMP,
        choice(
          n,
          "On the first night, the narrator was 'sure that something with teeth was circling the tent'. What does this phrase show?",
          [
            "The narrator's fear made ordinary night sounds seem dangerous.",
            "A dingo really was circling the tent.",
            "The narrator loves wild animals.",
            "The tent had a hole in it.",
          ],
          0,
          "The narrator only heard rustles and creaks. Imagining 'something with teeth' shows how nervous they were about sleeping in the bush.",
        ),
      ),
    (n) =>
      multi(
        n,
        "A writer wants a character to seem kind and gentle. Which words would help? Choose all that are right.",
        ["soft-spoken", "warm-hearted", "patient", "snarling", "sly"],
        [0, 1, 2],
        "Soft-spoken, warm-hearted and patient all have kind, gentle connotations. Snarling sounds angry and sly sounds sneaky.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        LEMON_TREE,
        choice(
          n,
          "Dad 'was quiet for a moment' and then came back with a small pot. What does this suggest?",
          [
            "He was moved by Zara's idea and wanted to help her keep the tree's memory alive.",
            "He was annoyed that Zara had cut the tree.",
            "He wanted to plant flowers instead.",
            "He did not hear what Zara said.",
          ],
          0,
          "Dad planted the tree, so it means a lot to him too. His silence shows he is touched, and fetching a pot shows he supports her plan.",
        ),
      ),
    (n) =>
      read(
        DAWN_CAMP,
        choice(
          n,
          "How has the narrator changed by the end of the story?",
          [
            "They go from hating camping to being amazed by the beauty of the bush.",
            "They go from loving camping to wanting to go home.",
            "They go from liking pelicans to being scared of them.",
            "They don't change at all.",
          ],
          0,
          "At first the narrator 'hated the idea of camping'. At dawn they stay silent because they 'didn't want to break the spell', which shows they are now enchanted.",
        ),
      ),
    (n) =>
      read(
        WIND_POEM,
        choice(
          n,
          "The poet could simply have written 'The wind blew hard all night.' Why is the poem more effective?",
          [
            "Turning the wind into a restless creature helps readers see, hear and feel the windy night.",
            "It is shorter and quicker to read.",
            "It gives more scientific facts about the weather.",
            "It tells us exactly how fast the wind blew.",
          ],
          0,
          "Prowling, sniffing, moaning and curling up give the wind a personality. That imagery lets readers picture the night instead of just being told about it.",
        ),
      ),
  ],
});

const GALAH_FABLE = {
  title: "The Galah and the Lyrebird",
  text:
    "Galah thought her pink and grey feathers were plain. Every day she watched Lyrebird dance on his mound, his lacy tail shimmering in the light.\n\n" +
    '"If only I could sing like him," she sighed. So she practised. She tried to copy the kookaburra, the whipbird and the bellbird, but every sound came out as a screech. The other birds covered their ears.\n\n' +
    "One evening a hawk swooped low over the forest. Lyrebird froze, but Galah screeched so loudly that every bird heard the warning and dived for cover.\n\n" +
    'The next morning, the birds gathered around Galah. "Your voice saved us," said Lyrebird. "Never wish it away."',
};

const FIREWORKS = {
  title: "Two Views on Fireworks",
  text:
    "Chloe, aged 10: The fireworks over the river are the best night of the year in Port Macquarie. Families bring picnics, and everyone counts down together. When the sky lights up, even grumpy teenagers say 'wow'. It is one of the few times the whole town comes together.\n\n" +
    "Dr Sara Hassan, local vet: Every New Year's Day, my clinic treats dogs that ran away in fright and were hit by cars. Birds and flying-foxes also panic at the loud bangs. I enjoy celebrations too, but I would like the council to try a quiet drone light show instead.",
};

const BOOK_FAIR = {
  title: "Come to the Wattle Creek Book Fair!",
  text:
    "Are you looking for your next favourite book? Do you want to meet a real author? Then don't miss the Wattle Creek Book Fair!\n\n" +
    "With over 3000 books for sale, there is something for every reader, from comics to chapter books. Award-winning author Mei Lin will read from her new adventure novel at 11 am.\n\n" +
    "\"The fair is the highlight of our school year,\" says librarian Mr Daniel Ortiz.\n\n" +
    "All money raised buys new books for our school library. Grab your friends and your pocket money. Reading has never been so much fun!",
};

/** EN3-UARL-02: genre, theme, perspective and context, argument and authority. */
export const GENRE_THEME = levels(5130316, {
  very_easy: [
    (n) =>
      read(
        GALAH_FABLE,
        choice(
          n,
          "Which features show that this story is a fable?",
          [
            "animals that talk and a lesson at the end",
            "a list of ingredients and a method",
            "dates, facts and a glossary",
            "numbered steps and a diagram",
          ],
          0,
          "Fables are short stories where animals talk and act like people, and they end with a lesson for the reader.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A procedure is a text that tells you how to do or make something.",
        true,
        "Recipes, game rules and instructions for building something are all procedures. They have steps to follow in order.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A story about a detective who solves a crime belongs to which genre?",
        ["mystery", "a mystery", "crime", "detective", "crime fiction"],
        "Stories with clues, suspects and a puzzle to solve are mysteries, also called crime or detective stories.",
      ),
  ],
  easy: [
    (n) =>
      read(
        GALAH_FABLE,
        choice(
          n,
          "What is the theme, or lesson, of this fable?",
          [
            "Be proud of who you are, because your own strengths matter.",
            "Hawks are the most dangerous birds.",
            "Singing is the most important skill.",
            "Pink feathers are better than grey ones.",
          ],
          0,
          "Galah wished she was like Lyrebird, but her own loud voice saved everyone. The lesson is to value who you are.",
        ),
      ),
    (n) =>
      read(
        FIREWORKS,
        multi(
          n,
          "Which reasons does Dr Hassan give against fireworks? Choose all that are right.",
          [
            "Frightened dogs run away and get hit by cars.",
            "Birds and flying-foxes panic at the bangs.",
            "Families bring picnics.",
            "The whole town comes together.",
          ],
          [0, 1],
          "Dr Hassan talks about dogs running away and birds and flying-foxes panicking. Picnics and the town coming together are Chloe's reasons for fireworks.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the parts of an information report in the usual order.",
        ["a general statement introducing the topic", "paragraphs describing different features", "a conclusion that sums up"],
        "An information report opens by saying what the topic is, then each paragraph describes one feature, and it finishes by summing up.",
      ),
  ],
  medium: [
    (n) =>
      read(
        GALAH_FABLE,
        choice(
          n,
          "Why does the writer show Galah's screech first as a problem and then as a strength?",
          [
            "to show that something you dislike about yourself can turn out to be valuable",
            "to prove that singing lessons always work",
            "to make the hawk the hero of the story",
            "to explain how galahs build nests",
          ],
          0,
          "At first the screech makes birds cover their ears; later it saves them. The change carries the fable's message about valuing yourself.",
        ),
      ),
    (n) =>
      read(
        FIREWORKS,
        choice(
          n,
          "Why do Chloe and Dr Hassan see fireworks so differently?",
          [
            "Chloe sees the fun for families, while Dr Hassan sees the harm to animals in her work.",
            "Chloe is telling the truth and Dr Hassan is not.",
            "They are talking about two different towns.",
            "Dr Hassan has never seen fireworks.",
          ],
          0,
          "A person's perspective depends on their experience. Chloe enjoys the night with her town; Dr Hassan treats the hurt animals the next day.",
        ),
      ),
    (n) =>
      read(
        BOOK_FAIR,
        choice(
          n,
          "Why does the ad mention that all money raised buys new books for the school library?",
          [
            "to make readers feel that buying a book also helps their school",
            "to explain how to borrow a library book",
            "to show that the fair is free",
            "to list the price of every book",
          ],
          0,
          "Knowing your money helps the library gives readers an extra good reason to come and spend. It is a persuasive appeal.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        FIREWORKS,
        trueFalse(
          n,
          "Dr Hassan wants to stop all New Year's Eve celebrations.",
          false,
          "She says 'I enjoy celebrations too' and suggests a quiet drone light show instead. She wants a different kind of celebration, not none.",
        ),
      ),
    (n) =>
      read(
        BOOK_FAIR,
        multi(
          n,
          "Which persuasive techniques does the advertisement use? Choose all that are right.",
          ["rhetorical questions", "a number fact", "a quote from someone at the school", "an exclamation to finish", "a scary warning"],
          [0, 1, 2, 3],
          "It opens with questions, says there are over 3000 books, quotes the librarian and ends with 'Reading has never been so much fun!' There is no scary warning.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You are researching how long platypuses live in the wild. Which source would be most reliable?",
        [
          "a book about platypuses written by a university scientist",
          "a cartoon about a talking platypus",
          "a stranger's comment under an online video",
          "a poster selling a platypus soft toy",
        ],
        0,
        "A scientist who studies platypuses has expert knowledge and checks facts. Cartoons are made up, comments may be guesses, and posters are trying to sell.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        BOOK_FAIR,
        choice(
          n,
          "Which sentence from the ad is an opinion, not a fact that could be checked?",
          [
            "Reading has never been so much fun!",
            "Award-winning author Mei Lin will read from her new adventure novel at 11 am.",
            "With over 3000 books for sale, there is something for every reader.",
            "All money raised buys new books for our school library.",
          ],
          0,
          "You could check the time of the reading, count the books or look at where the money goes. Whether reading is 'so much fun' is a feeling, so it is an opinion.",
        ),
      ),
    (n) =>
      read(
        GALAH_FABLE,
        choice(
          n,
          "Which of these story ideas shares the same theme as the fable?",
          [
            "A shy girl who thinks her quiet voice is boring finds she is the best at calming scared Kindergarten kids.",
            "A boy wins a race because he trained every morning.",
            "A family goes on a holiday to the snow.",
            "A dog digs up a bone in the backyard.",
          ],
          0,
          "Like Galah, the shy girl dislikes something about herself and then discovers it is a strength. The race story is about hard work, a different theme.",
        ),
      ),
    (n) =>
      choice(
        n,
        "After a big storm, a farmer writes that it was 'the best day in years' because her dam filled up. A family whose roof blew off calls it 'the worst night of our lives'. Why are their recounts so different?",
        [
          "Each writer's situation shapes how they see the same event.",
          "One of them must be lying.",
          "They must be writing about different storms.",
          "Farmers always like storms.",
        ],
        0,
        "Same storm, different perspectives. The farmer gained water she needed, while the family lost their roof, so each feels very differently about it.",
      ),
  ],
});

/** EN3-CWT-01: text features, complex sentences, clauses, modal verbs, apostrophes, speech and cohesion. */
export const WRITING = levels(5150116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which word is the conjunction in this sentence? 'We could go to the pool or we could stay home.'",
        ["pool", "or", "stay", "home"],
        1,
        "A conjunction joins two ideas. 'Or' joins 'We could go to the pool' and 'we could stay home' and shows a choice.",
      ),
    (n) =>
      trueFalse(
        n,
        "'They're' is short for 'they are'.",
        true,
        "The apostrophe in 'they're' shows where the a of 'are' is missing: they are becomes they're.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The ball belongs to the dog. It is the ___ ball.",
        ["dog's", "dog’s"],
        "To show something belongs to one owner, add an apostrophe and s: the dog's ball.",
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which sentence is punctuated correctly?",
        [
          '"Where are my shoes?" asked Ella.',
          '"Where are my shoes" asked Ella?',
          '"Where are my shoes," asked Ella.',
          "Where are my shoes? asked Ella.",
        ],
        0,
        "The spoken words are a question, so the question mark goes inside the speech marks, and the sentence ends with a full stop.",
      ),
    (n) =>
      multi(
        n,
        "Which words are modal verbs? Choose all that are right.",
        ["could", "should", "jumped", "might", "table"],
        [0, 1, 3],
        "Modal verbs show how likely or necessary something is: could, should and might. 'Jumped' is an action verb and 'table' is a noun.",
      ),
    (n) =>
      choice(
        n,
        "Which feature belongs in a procedure?",
        ["numbered steps and a list of materials", "a complication and resolution", "lines that rhyme", "a character's feelings"],
        0,
        "A procedure tells you how to make or do something, so it lists what you need and gives steps in order.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "The hats belong to the men. Which is correct?",
        ["the men's hats", "the mens' hats", "the mens hats", "the man's hats"],
        0,
        "'Men' is a plural that doesn't end in s, so add an apostrophe and s: the men's hats.",
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order to make a paragraph.",
        [
          "The platypus is one of Australia's most unusual animals.",
          "It has a bill like a duck and a flat tail like a beaver.",
          "It also lays eggs, even though it is a mammal.",
          "All these features make the platypus truly one of a kind.",
        ],
        "Start with the topic sentence, add details ('also' shows it comes after another detail), and finish with a sentence that sums up.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Change the verb to past tense: 'Last week we ___ a koala in the tree.' (see)",
        "saw",
        "'See' is an irregular verb. Its past tense is 'saw', not 'seed' or 'seen'.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which are complex sentences (they have a main clause and a dependent clause)? Choose all that are right.",
        ["After the bell rang, we lined up.", "We lined up.", "I will read to you if you bring the book.", "She sang and he danced."],
        [0, 2],
        "'After the bell rang' and 'if you bring the book' are dependent clauses that can't stand alone. 'She sang and he danced' joins two main clauses, so it is compound.",
      ),
    (n) =>
      choice(
        n,
        'Lily said, "I am going to the library." Which sentence reports this correctly?',
        [
          "Lily said that she was going to the library.",
          "Lily said that I am going to the library.",
          'Lily said that "she was going to the library."',
          "Lily said, she is going to the library.",
        ],
        0,
        "Reported speech has no speech marks, changes 'I' to 'she', and moves the verb back in time: am going becomes was going.",
      ),
    (n) =>
      choice(
        n,
        "Which connective best fills the gap? 'It had not rained for months. ___, the farmers' dams were almost empty.'",
        ["As a result", "For example", "However", "Meanwhile"],
        0,
        "The empty dams are caused by the lack of rain, so we need a cause-and-effect connective: As a result.",
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these sentences in order from least certain to most certain.",
        ["It might rain tomorrow.", "It will probably rain tomorrow.", "It will definitely rain tomorrow."],
        "'Might' means it is only possible, 'probably' means it is likely, and 'definitely' means it is certain.",
      ),
    (n) =>
      choice(
        n,
        "In 'Before the match started, the netball team warmed up on the court,' which part is the main clause?",
        ["Before the match started", "the netball team warmed up on the court", "the match started", "Before"],
        1,
        "The main clause makes sense on its own: 'the netball team warmed up on the court.' 'Before the match started' is a dependent clause that tells when.",
      ),
    (n) =>
      choice(
        n,
        "The esky belongs to the Jackson family. Which sentence is punctuated correctly?",
        [
          '"Don\'t forget the Jacksons\' esky," said Mum.',
          '"Don\'t forget the Jackson\'s esky", said Mum.',
          '"Dont forget the Jacksons\' esky," said Mum.',
          '"Don\'t forget the Jacksons esky" said Mum.',
        ],
        0,
        "'Don't' needs an apostrophe for the missing o. The esky belongs to the whole Jackson family, a plural ending in s, so the apostrophe goes after the s. The comma goes inside the speech marks.",
      ),
  ],
});
