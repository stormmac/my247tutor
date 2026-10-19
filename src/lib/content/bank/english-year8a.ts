/**
 * Year 8 English: Stage 4 (English 7–10, 2022). Two sets of 15 questions for each standard (NESA outcome),
 * three at each level from very easy to very hard. Reading, imagery and perspective questions use original
 * passages; Year 8 adds active and passive voice, modality, representation, thesis statements and rhetorical devices.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

const TIDE_LINE = {
  title: "Tide Line",
  text:
    "Every Saturday for as long as Mia could remember, Pop had driven them to the end of the breakwall at Swansea before sunrise. He was always first out of the car, rods over one shoulder, whistling something from the seventies.\n\n" +
    "This Saturday, Mia was first out of the car.\n\n" +
    "Pop sat behind the wheel for a long moment, frowning at the dashboard as if someone had rearranged it overnight. When he finally joined her on the rocks, he had forgotten the bait bucket. Mia said nothing. She walked back and fetched it herself.\n\n" +
    "They fished in silence for an hour. The sky turned from grey to apricot, and a pelican landed on a nearby post to supervise. Twice Pop cast out a hook with no bait on it at all.\n\n" +
    "'Your mum used to love this spot, Jenny,' he said suddenly, smiling at her.\n\n" +
    "Mia's line went slack in her hands. Jenny was her mother's name.\n\n" +
    "She opened her mouth to correct him, then closed it again. Instead she pointed at the pelican. 'Do you think he wants a fish?'\n\n" +
    "Pop laughed, the same big laugh as always, and for a moment everything was ordinary. He told her the story about the stingray that had stolen his sandwich in 1983. She had heard it a hundred times. She listened as if it were the first.\n\n" +
    "On the drive home, Mia wrote a message to her mum. She typed it three times before she was happy with the words. Then she put the phone face down on her knee and watched the lake slide past the window.",
};

const SEAGRASS = {
  title: "The Ocean's Hidden Meadows",
  text:
    "Ask most people to name an important marine habitat and they will mention coral reefs. Few will think of seagrass. Yet the underwater meadows that grow in sheltered bays and estuaries along the New South Wales coast are among the most productive ecosystems on Earth.\n\n" +
    "Seagrasses are not seaweeds. They are flowering plants, with roots, leaves and tiny flowers, whose ancestors lived on land millions of years ago before returning to the sea. Like plants on land, they need sunlight to grow, which is why they are found only in clear, shallow water.\n\n" +
    "These meadows act as nurseries. Young bream, whiting and snapper shelter among the blades, safe from larger predators, until they are big enough to move into open water. Seahorses, pipefish and cuttlefish live there too. In northern Australia, dugongs and green turtles graze on seagrass the way cattle graze on pasture.\n\n" +
    "Seagrass also helps fight climate change. Its roots trap carbon in the mud of the seafloor, and a healthy meadow can store carbon far faster than the same area of forest.\n\n" +
    "However, seagrass meadows are disappearing. Run-off from farms and cities clouds the water and blocks sunlight. Boat anchors and moorings tear up plants, leaving bare patches that can take decades to recover.\n\n" +
    "Simple changes can help. Boaters can use seagrass-friendly moorings, and communities can reduce fertiliser run-off. Protecting these hidden meadows protects the fish we catch, the animals we love and the climate we all share.",
};

const LIBRARY_LETTER = {
  title: "Letter to the Editor: Keep Our Library Open",
  text:
    "To the Editor,\n\n" +
    "The Council's plan to close Riverbend Library at 5 pm on weeknights, instead of 8 pm, may save $40 000 a year. But it will cost our community far more than that.\n\n" +
    "For many students, the library is not a luxury; it is the only quiet place they have. Not every teenager has a desk at home, a reliable internet connection or a room without younger siblings in it. After 5 pm, when parents are still at work and homes are at their noisiest, those students will have nowhere to go.\n\n" +
    "The library is also a lifeline for adults. Every Tuesday and Thursday evening, volunteers run free English conversation classes and help older residents fill in online forms. Surely a council that claims to value 'inclusion' should be protecting these services, not cutting them.\n\n" +
    "Some will argue that everything is online now, so libraries matter less. Yet the library recorded more than 30 000 evening visits last year. Those visitors were not imaginary. They were real people who chose to come through the doors.\n\n" +
    "Forty thousand dollars is less than the Council spent on new signage last year. If the Council can afford new signs, it can afford to keep the lights on.\n\n" +
    "I urge every reader to attend the Council meeting on 14 March and to tell our councillors, clearly and politely, that Riverbend Library must stay open until 8 pm.\n\n" +
    "Yours sincerely,\nHannah Okafor, Year 8 student",
};

const DROUGHT_YEAR = {
  title: "Drought Year",
  text:
    "The dam is a cracked brown plate,\nlicked clean by a sun that will not leave.\nDad walks the fence line every evening,\ncounting what is left.\n\n" +
    "The sheep come to the trough before we call them,\ntheir ribs like the rungs of a ladder.\nMy brother names the thinnest one Hope\nand feeds her from his hand.\n\n" +
    "The radio talks of rain in other towns,\nof storms that turned around at Dubbo.\nMum stops listening halfway through\nand starts the washing-up again,\nscrubbing the same clean plate\nuntil the news is over.\n\n" +
    "In town the shop windows say CLOSING DOWN\nin letters the colour of dust.\nThe footy club has cancelled training;\nthe oval is too hard to fall on.\n\n" +
    "At school we write about the sea.\nI write about the sound of rain on the tin roof,\nlike a crowd that has come back\nto cheer for us.\n\n" +
    "Tonight a single cloud drifts over,\nfat and grey and full of nothing.\nDad watches it the whole way past.\nNobody says a word.\n\n" +
    "But in the morning, on the kitchen window,\nthere is a fog of breath and something else:\nthree small drops, running.\nMum leaves them there all day.",
};

/** EN4-RVL-01: close reading for main idea, inference, purpose and audience across narrative, information, persuasive and poetic texts. */
export const COMPREHENSION = levels(8110101, {
  very_easy: [
    (n) =>
      read(
        SEAGRASS,
        trueFalse(
          n,
          "According to the text, seagrasses are a type of seaweed.",
          false,
          "The second paragraph says 'Seagrasses are not seaweeds. They are flowering plants, with roots, leaves and tiny flowers.'",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The sentence 'The fence was painted by Leo' is in the passive voice. Who did the painting?",
        ["Leo"],
        "In a passive sentence the doer comes after 'by'. 'By Leo' tells us Leo did the painting. The active version is 'Leo painted the fence.'",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "In the sentence 'Students must wear a hat at lunch', the word 'must' shows ___ modality.",
        ["high", "strong"],
        "Modality is how certain or forceful a word is. 'Must' leaves no choice, so it is high modality. 'Should' is medium and 'might' is low.",
      ),
  ],
  easy: [
    (n) =>
      read(
        SEAGRASS,
        choice(
          n,
          "Which sentence best states the main idea of the text?",
          [
            "Seagrass meadows are valuable to sea life and the climate, but they are under threat and need protecting.",
            "Dugongs and green turtles eat seagrass.",
            "Coral reefs are the most important marine habitat.",
            "Boat anchors can damage the seafloor.",
          ],
          0,
          "The main idea covers the whole text: why seagrass matters (nursery, carbon) and why it needs protecting. The other options are small details or something the text argues against.",
        ),
      ),
    (n) =>
      read(
        LIBRARY_LETTER,
        choice(
          n,
          "What is the main purpose of this letter?",
          [
            "To persuade readers to oppose the Council's plan to shorten the library's hours",
            "To inform readers about the history of Riverbend Library",
            "To entertain readers with a story about studying",
            "To complain about the Council's new signs",
          ],
          0,
          "The letter argues against closing at 5 pm and ends by urging readers to tell councillors the library must stay open until 8 pm. That is persuasion. The signs are only one piece of evidence.",
        ),
      ),
    (n) =>
      read(
        TIDE_LINE,
        ordering(
          n,
          "Put these events from the story in the order they happen.",
          [
            "Pop joins Mia on the rocks without the bait bucket.",
            "Pop calls Mia by her mother's name.",
            "Pop tells the story about the stingray and his sandwich.",
            "Mia writes a message to her mum on the drive home.",
          ],
          "Follow the story through the morning: the forgotten bucket, then 'Jenny', then the stingray story, and finally the drive home.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        TIDE_LINE,
        choice(
          n,
          "What can you infer about Pop from the details in the story?",
          [
            "His memory is failing, and he is becoming confused.",
            "He is tired of fishing and wants to stop going.",
            "He is angry with Mia for being first out of the car.",
            "He is playing a joke by calling Mia 'Jenny'.",
          ],
          0,
          "The writer never says it directly, but the clues add up: he stares at the dashboard, forgets the bait, casts empty hooks and calls Mia by her mother's name. These are signs of memory loss.",
        ),
      ),
    (n) =>
      read(
        LIBRARY_LETTER,
        multi(
          n,
          "Which persuasive techniques does the writer use? Choose all that are right.",
          [
            "Statistics, such as 30 000 evening visits",
            "Rebutting an opposing view ('Some will argue...')",
            "A call to action at the end",
            "A quote from a famous expert",
            "A rhetorical question in the final paragraph",
          ],
          [0, 1, 2],
          "The letter uses numbers ($40 000, 30 000 visits), answers the claim that 'everything is online now', and ends by urging readers to attend the meeting. There is no expert quote, and the last paragraph is a statement, not a question.",
        ),
      ),
    (n) =>
      read(
        DROUGHT_YEAR,
        choice(
          n,
          "Which word best describes the mood of most of the poem?",
          ["weary and anxious", "joyful and excited", "angry and violent", "calm and carefree"],
          0,
          "The cracked dam, the thin sheep, Mum turning away from the radio and the silence when the cloud passes all create a tired, worried mood as the family waits for rain.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        SEAGRASS,
        choice(
          n,
          "Why does the writer begin the text by mentioning coral reefs?",
          [
            "To contrast seagrass with a famous habitat and show that seagrass is often overlooked",
            "Because the whole text is about coral reefs",
            "To prove that coral reefs are disappearing faster than seagrass",
            "To tell readers that seagrass grows on coral reefs",
          ],
          0,
          "The writer starts with what readers already know ('they will mention coral reefs') and then says 'Few will think of seagrass'. The contrast hooks the reader and sets up the idea that seagrass deserves more attention.",
        ),
      ),
    (n) =>
      read(
        DROUGHT_YEAR,
        choice(
          n,
          "The cloud is 'fat and grey and full of nothing'. What does this description suggest?",
          [
            "The cloud looks as if it will bring rain but brings none, which deepens the family's disappointment.",
            "The cloud is about to cause a dangerous storm.",
            "The speaker thinks clouds are boring to look at.",
            "The cloud is full of smoke from a bushfire.",
          ],
          0,
          "'Fat and grey' makes the cloud look heavy with rain, but 'full of nothing' tells us it is empty. Dad watching it pass in silence shows how let down the family feels.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the strongest thesis statement for an essay on whether NSW high schools should start at 9:30 am?",
        [
          "High schools should start at 9:30 am because later starts suit teenagers' sleep patterns, improve concentration and reduce lateness.",
          "This essay will talk about school start times.",
          "Some people like a later start and some people don't.",
          "I think 9:30 am is good.",
        ],
        0,
        "A strong thesis takes a clear position and previews the reasons that will be argued. The others only announce the topic, sit on the fence, or give a vague opinion with no reasons.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        TIDE_LINE,
        multi(
          n,
          "Which details suggest that Mia is worried and upset, even though she never says so? Choose all that are right.",
          [
            "Her line goes slack in her hands when Pop calls her Jenny.",
            "She types the message to her mum three times.",
            "She puts the phone face down on her knee.",
            "A pelican lands on a nearby post.",
            "The sky turns from grey to apricot.",
          ],
          [0, 1, 2],
          "The writer shows Mia's feelings through her actions: she freezes, chooses her words very carefully, and hides the phone as if she doesn't want to think about it. The pelican and the sky are setting details.",
        ),
      ),
    (n) =>
      read(
        LIBRARY_LETTER,
        choice(
          n,
          "Why does the writer put quotation marks around the word 'inclusion'?",
          [
            "To suggest the Council says it values inclusion but its plan does the opposite",
            "Because 'inclusion' is the name of a library program",
            "To show that she is quoting a dictionary definition",
            "Because 'inclusion' is a word she has made up",
          ],
          0,
          "The quotation marks point to the Council's own word and question it. Cutting classes for migrants and help for older residents doesn't match a claim to value inclusion, so the marks make the claim sound hollow.",
        ),
      ),
    (n) =>
      read(
        DROUGHT_YEAR,
        choice(
          n,
          "How does the final stanza change the poem?",
          [
            "'But' signals a turn from hopelessness to a fragile hope, shown by the drops Mum leaves on the window.",
            "It proves the drought is over and the farm is saved.",
            "It repeats the sadness of the earlier stanzas with no change.",
            "It moves the setting from the farm to the sea.",
          ],
          0,
          "The stanza opens with 'But', marking a shift. Three small drops are not the end of the drought, yet Mum keeping them 'all day' shows how much a tiny sign of rain means: hope, not rescue.",
        ),
      ),
  ],
});

const SPARE_KEY = {
  title: "The Spare Key",
  text:
    "For two years, Arlo had looked after Mrs Petrakis's garden every Sunday. She paid him ten dollars and a slice of whatever she had baked, and she always stood at the back door telling him which tomatoes were ready, as if he hadn't learnt that long ago.\n\n" +
    "This Sunday, the back door was closed. The spare key was under the pot of basil, where it always was, but a note was taped beside it: Arlo, take whatever you like from the garden. Love, E.\n\n" +
    "He picked the tomatoes anyway, then the beans. Through the kitchen window he could see cardboard boxes stacked on the table, each labelled in her careful capitals: KITCHEN, BOOKS, GIVE AWAY. The calendar on the fridge, usually crowded with appointments, had been taken down.\n\n" +
    "When he came round the side of the house, a man in a blue suit was hammering a sign into the front lawn. Arlo didn't need to read it. He had seen the same sign go up on three other houses in the street.\n\n" +
    "That evening his mum told him that Mrs Petrakis's daughter was taking her to live near her in Wagga, somewhere with nurses and a lift. 'She asked if you would keep the basil,' Mum said. 'She said you were the only one who ever listened to her about tomatoes.'\n\n" +
    "Arlo carried the pot home on his bike, one-handed, very slowly. He put it on his windowsill, where it would get the morning sun, and he watered it before he did anything else.",
};

const SNOWY_SCHEME = {
  title: "The Snowy Mountains Scheme",
  text:
    "High in the Australian Alps, beneath some of the coldest and steepest country on the continent, lies one of the largest engineering projects ever completed in Australia: the Snowy Mountains Hydro-electric Scheme.\n\n" +
    "The Scheme was built between 1949 and 1974. Its purpose was to capture water from the Snowy River and other rivers that flowed east to the sea, and send it west through the mountains. On the way, the falling water would spin turbines to produce electricity. Once it reached the other side, it could be released into the Murray and Murrumbidgee rivers to irrigate farms.\n\n" +
    "To do this, workers built large dams, power stations deep underground, and many kilometres of tunnels blasted through solid rock. They worked through winter blizzards in remote camps far from any town.\n\n" +
    "The Scheme was not only an engineering achievement. More than 100 000 people from over 30 countries worked on it. Many had arrived in Australia after the Second World War, having lost their homes in Europe. Men who had been on opposite sides of the war now worked side by side in the same tunnels. Towns such as Cooma, once small and quiet, filled with new languages, foods and customs.\n\n" +
    "The work came at a cost. More than a hundred workers lost their lives during construction.\n\n" +
    "Today, the Scheme still produces renewable electricity and supplies water to farms. Many historians also see it as a turning point that helped shape the multicultural nation Australia has become.",
};

const SWIM_SPEECH = {
  title: "Swim Safe: A Speech to Assembly",
  text:
    "Good morning, everyone.\n\n" +
    "Picture this. It's January. The sun is blazing, the sand is burning your feet, and the water at Shellharbour looks perfect. You run straight in. Ten seconds later, the bottom disappears and a current starts pulling you away from shore. Do you know what to do?\n\n" +
    "If you hesitated, you are not alone. Many Australian teenagers have never been taught how to spot a rip, how to float or how to signal for help. That is why I believe every student at Lakeside High should complete a free water-safety course before the end of Year 8.\n\n" +
    "First, it saves lives. Rips are among the most dangerous hazards on Australian beaches, and many people caught in them are confident swimmers who simply did not recognise the danger.\n\n" +
    "Second, it is fair. Not every family can afford private lessons or lives near a pool. A course run through school means nobody misses out because of money or postcode.\n\n" +
    "Third, it builds confidence. Students who know how to stay calm in the water are more likely to join in at the beach, at school carnivals and on camps.\n\n" +
    "Some people say this is the job of parents, not schools. But schools already teach us to cross roads safely and to stay safe online. Why should the ocean be any different?\n\n" +
    "We live in a country surrounded by surf. Let's make sure every one of us knows how to come home from the beach. Sign the petition at the canteen this week. Thank you.",
};

const WESTERN_LINE = {
  title: "Western Line",
  text:
    "Six-ten from Penrith, still dark,\nthe carriage hums like a held breath.\nTradies with eyes closed,\na nurse in blue, her shoes in a bag,\na boy my age with a cello\ntaller than his mother.\n\n" +
    "I know the rules of this carriage:\nno eye contact, no small talk,\nearbuds in, bag on your knees,\nwatch the window, not the faces.\nI have kept those rules for a whole year,\nsince the morning I started at my new school.\n\n" +
    "Nobody speaks. We are a library\ntravelling at a hundred kilometres an hour,\neach of us a closed book\nwith our titles turned to the wall.\n\n" +
    "At Blacktown the sun comes up\nlike someone switching on the house lights,\nand suddenly we can see each other:\nthe tiredness, the lunch boxes,\nthe hands holding on.\n\n" +
    "Somewhere past Parramatta\nthe cello case tips and falls.\nThree strangers catch it at once.\nThe boy says sorry, sorry, thank you,\nand the nurse laughs, and the tradie laughs,\nand for one stop\nwe are not a library at all.\n\n" +
    "At Central we spill out\nonto the platform, into the city,\nback into our separate stories.\nBut I carry the laugh with me\nup the stairs, into the day,\nlike a coin found in a coat pocket.",
};

/** EN4-RVL-01: close reading for main idea, inference, purpose and audience across narrative, information, persuasive and poetic texts. */
export const COMPREHENSION_2 = levels(8110116, {
  very_easy: [
    (n) =>
      read(
        SNOWY_SCHEME,
        trueFalse(
          n,
          "According to the text, all of the workers on the Snowy Mountains Scheme were born in Australia.",
          false,
          "The text says more than 100 000 people from over 30 countries worked on it, and many had come from Europe after the Second World War.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which sentence is written in the active voice?",
        [
          "Jaxon kicked the ball over the fence.",
          "The ball was kicked over the fence by Jaxon.",
          "The ball was kicked over the fence.",
          "The goal was scored in the last minute.",
        ],
        0,
        "In the active voice the doer comes first and does the action: Jaxon (doer) kicked (action) the ball. The others use 'was kicked' or 'was scored', which is passive.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Perhaps', 'might' and 'could' are examples of low modality words.",
        true,
        "These words show that something is possible but not certain, so they are low modality. Words like 'must', 'definitely' and 'always' are high modality.",
      ),
  ],
  easy: [
    (n) =>
      read(
        SWIM_SPEECH,
        choice(
          n,
          "Who is the intended audience of this speech?",
          [
            "Students at Lakeside High's assembly",
            "Lifeguards at Shellharbour beach",
            "Members of the NSW Parliament",
            "Tourists visiting Australia",
          ],
          0,
          "The title says it is a speech to assembly, and the speaker talks about 'every student at Lakeside High' and asks listeners to sign a petition at the canteen.",
        ),
      ),
    (n) =>
      read(
        SPARE_KEY,
        ordering(
          n,
          "Put these events from the story in the order they happen.",
          [
            "Arlo finds a note taped beside the spare key.",
            "Arlo sees boxes stacked on the kitchen table.",
            "A man hammers a sign into the front lawn.",
            "Arlo's mum tells him Mrs Petrakis is moving to Wagga.",
            "Arlo carries the basil home on his bike.",
          ],
          "The story follows Arlo's Sunday: the note at the back door, the boxes through the window, the sign out the front, then that evening's news and the trip home with the basil.",
        ),
      ),
    (n) =>
      read(
        WESTERN_LINE,
        choice(
          n,
          "Where is the poem set?",
          [
            "On an early morning train travelling from Penrith to Central",
            "On a school bus at the end of the day",
            "In a library in the city",
            "At a cello concert",
          ],
          0,
          "The poem begins 'Six-ten from Penrith, still dark' in a 'carriage', passes Blacktown and Parramatta, and ends 'At Central'. The library is only a metaphor for the quiet passengers.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        SPARE_KEY,
        choice(
          n,
          "What can the reader infer from the boxes, the missing calendar and the sign on the lawn?",
          [
            "Mrs Petrakis is moving out and her house is being sold.",
            "Mrs Petrakis is having her kitchen renovated.",
            "Mrs Petrakis has gone on a short holiday.",
            "Mrs Petrakis is angry with Arlo.",
          ],
          0,
          "Packed boxes labelled GIVE AWAY, a calendar taken down and a sign like the ones on other houses in the street all point to a move and a sale, which his mum confirms that evening.",
        ),
      ),
    (n) =>
      read(
        SWIM_SPEECH,
        multi(
          n,
          "Which rhetorical devices does the speaker use? Choose all that are right.",
          [
            "Rhetorical questions, such as 'Why should the ocean be any different?'",
            "Inclusive language, such as 'Let's' and 'every one of us'",
            "Rebutting an opposing view about whose job it is",
            "A quote from a famous Olympic swimmer",
            "An exact statistic about the number of drownings",
          ],
          [0, 1, 2],
          "The speaker asks questions that don't need answers, uses 'us' and 'Let's' to include the audience, and answers the claim that it is parents' job. There is no expert quote and no exact drowning figure.",
        ),
      ),
    (n) =>
      read(
        SNOWY_SCHEME,
        choice(
          n,
          "Why does the writer include the detail that men from opposite sides of the war worked side by side?",
          [
            "To show that the Scheme also brought people together and helped change Australian society",
            "To explain how the tunnels were blasted through rock",
            "To prove that the war was still going on in the mountains",
            "To show that the workers did not get along",
          ],
          0,
          "This detail sits in the paragraph that begins 'The Scheme was not only an engineering achievement'. It shows the Scheme's human side: former enemies working together, and towns like Cooma becoming multicultural.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        WESTERN_LINE,
        choice(
          n,
          "What does the poet mean by 'each of us a closed book / with our titles turned to the wall'?",
          [
            "The passengers keep to themselves and don't let others know who they are.",
            "The passengers are all reading books on the train.",
            "The passengers have forgotten their own names.",
            "The train is carrying books to a library in the city.",
          ],
          0,
          "This extends the library metaphor. A closed book with its title hidden can't be 'read' by anyone, just as the silent passengers hide their lives from each other.",
        ),
      ),
    (n) =>
      read(
        SWIM_SPEECH,
        choice(
          n,
          "Which sentence from the speech is its thesis statement?",
          [
            "That is why I believe every student at Lakeside High should complete a free water-safety course before the end of Year 8.",
            "Picture this.",
            "Second, it is fair.",
            "We live in a country surrounded by surf.",
          ],
          0,
          "The thesis is the speaker's main position, which the rest of the speech argues for. 'First', 'Second' and 'Third' are reasons supporting it; 'Picture this' is the hook.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which revision changes 'The council will close the pool' from high to low modality, while keeping the council as the doer?",
        [
          "The council might close the pool.",
          "The pool will be closed by the council.",
          "The council must close the pool.",
          "The council closed the pool.",
        ],
        0,
        "'Might' lowers the certainty. 'Will be closed by' changes the voice to passive, not the modality; 'must' is still high; and 'closed' just changes the tense.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        SPARE_KEY,
        choice(
          n,
          "At the start, Mrs Petrakis tells Arlo about the tomatoes 'as if he hadn't learnt that long ago'. Why is her message that he was 'the only one who ever listened to her about tomatoes' important by the end?",
          [
            "It reveals that his patient listening, which seemed small to him, meant a great deal to her, and he honours that by caring for the basil.",
            "It shows she thought Arlo knew nothing about gardening.",
            "It proves Arlo never really listened to her.",
            "It explains why she paid him only ten dollars.",
          ],
          0,
          "The early detail hints Arlo already knew everything she told him, yet he kept listening. The ending shows she noticed and valued that kindness, and Arlo watering the basil 'before he did anything else' shows he values her too.",
        ),
      ),
    (n) =>
      read(
        WESTERN_LINE,
        multi(
          n,
          "Which ideas does the poem suggest? Choose all that are right.",
          [
            "Small, shared moments can break through the loneliness of city life.",
            "The speaker treasures the shared laugh as something small but valuable.",
            "The speaker may have felt lonely since starting at a new school.",
            "The speaker is annoyed by the boy with the cello.",
            "The poem warns that trains are dangerous.",
          ],
          [0, 1, 2],
          "The falling cello makes strangers laugh together, and the speaker keeps the laugh 'like a coin found in a coat pocket', a small lucky treasure. Keeping the silent rules 'for a whole year' since a new school hints at loneliness. Nothing suggests annoyance or danger.",
        ),
      ),
    (n) =>
      read(
        SNOWY_SCHEME,
        choice(
          n,
          "Why does the writer place the short paragraph 'The work came at a cost...' just before the final paragraph?",
          [
            "To balance the praise by acknowledging the human cost, giving a fuller and fairer picture before the conclusion",
            "To change the topic to a completely different project",
            "To argue that the Scheme should never have been built",
            "To give instructions for visiting the Snowy Mountains",
          ],
          0,
          "Most of the text celebrates the Scheme. A short, separate paragraph about the workers who died makes the reader pause, so the conclusion feels balanced rather than one-sided, without arguing against the Scheme.",
        ),
      ),
  ],
});

const SOUTHERLY = {
  title: "The Southerly",
  text:
    "All afternoon the heat had pressed down on Kiama like a hot iron. The bitumen shimmered. Dogs lay flat in the shade of parked cars, and the sea lay flat too, a sheet of tired blue glass.\n\n" +
    "Then, just after five, the southerly arrived.\n\n" +
    "It came first as a smudge on the horizon, a bruise-coloured line of cloud swallowing the headland. The gulls noticed before the people did. They rose from the beach in a single shriek and wheeled inland.\n\n" +
    "The first gust slammed into the town like a door. Beach umbrellas cartwheeled down the sand. A boy's hat leapt from his head and raced him to the water. The Norfolk pines bent and groaned, shaking their heavy arms at the sky as if they were furious at being woken.\n\n" +
    "And the temperature fell. In ten minutes it dropped from thirty-eight degrees to twenty-two. People who had been hiding indoors spilled out onto their verandahs, faces turned up, eyes closed, drinking in the cool air.\n\n" +
    "Rain followed: fat, warm drops that hissed on the hot footpath and released that smell, the smell of dust and eucalyptus and relief, that every Australian child knows by heart.\n\n" +
    "My grandmother stood beside me at the window. 'There it is,' she whispered, the way some people speak in church. 'The cool change.'\n\n" +
    "Outside, the whole town seemed to breathe out.",
};

const OLD_GUM = {
  title: "The Old Gum",
  text:
    "In the middle of the school oval\nstands the gum tree no one planted,\nolder than the classrooms,\nolder than the road.\n\n" +
    "Its bark peels off in long grey ribbons\nlike pages torn from a diary,\nand underneath, the new skin glows\npink and cream, as soft as a promise.\n\n" +
    "Every recess it holds out its arms\nto whoever needs the shade:\nthe kids with no one to sit with,\nthe kids who need to cry in secret,\nthe kids who just want to read,\nthe kids who run rings round its trunk\nuntil the bell drags them inside.\n\n" +
    "It has heard every secret in this school\nand has never told a single one.\n\n" +
    "Last spring the council came with orange paint\nand drew a cross upon its trunk.\nToo old, they said. Too dangerous.\nA branch might fall.\n\n" +
    "We signed petitions. We wrote letters.\nA Year 7 girl tied a yellow ribbon\nround its waist, and then another girl,\nand then the whole school.\n\n" +
    "Now the tree wears a hundred ribbons\nthat flicker in the wind like little flames,\nand the orange cross is fading,\nand the gum tree is still standing,\nolder than the classrooms,\nolder than the road,\nholding out its arms.",
};

const MARKET = {
  title: "Saturday at the Market",
  text:
    "By seven o'clock, the Saturday market is wide awake.\n\n" +
    "Roller doors clatter up. Trolleys rattle across the concrete. Somewhere a forklift beeps its way backwards, and the fruit sellers begin their morning song: 'Mangoes, mangoes, five for ten! Sweet as sugar, five for ten!'\n\n" +
    "At the bakery stall, crusty loaves are stacked like golden bricks, still breathing out warmth. Next door, a woman in a striped apron flips gozleme on a hot plate. The pastry sizzles and spits, and the smell of spinach, cheese and butter drifts down the aisle, tapping people on the shoulder and turning their heads.\n\n" +
    "Pyramids of purple plums, polished red apples and plump pale peaches crowd the tables. Mr Tran, who has run the herb stall for twenty years, crushes a leaf of Thai basil between his fingers and holds it out for me to smell. It is sharp and sweet and green, like summer squeezed into a single leaf.\n\n" +
    "Children dart between the legs of shoppers. A busker plays the violin beside the exit, her case open at her feet, and coins clink into it like small applause.\n\n" +
    "By eleven, the crowd thins. Stallholders pack away the leftovers and sweep up the squashed grapes and fallen lettuce leaves. The roller doors clang shut one by one.\n\n" +
    "The market goes quiet, but only until next Saturday, when the whole noisy, delicious show begins again.",
};

/** EN4-URB-01: figurative language, imagery, symbolism and connotation, and the effects they create. */
export const IMAGERY = levels(8110201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence uses a simile?",
        [
          "The classroom was as noisy as a zoo.",
          "The classroom was a zoo.",
          "The noisy classroom buzzed all day.",
          "The classroom was very noisy.",
        ],
        0,
        "A simile compares two things using 'like' or 'as': as noisy as a zoo. 'The classroom was a zoo' says it IS a zoo, which is a metaphor.",
      ),
    (n) =>
      trueFalse(
        n,
        "In 'The wind howled through the empty streets', the wind is personified.",
        true,
        "Howling is something a living creature does. Giving the wind this action is personification, and it makes the wind sound wild and lonely.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Words that imitate the sounds they describe, such as 'buzz', 'crackle' and 'thud', are examples of ___.",
        ["onomatopoeia"],
        "Onomatopoeia is when a word sounds like the noise it names. Say 'crackle' aloud and you can almost hear a fire.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "Put the steps of a TEE paragraph about language in the correct order.",
        ["Name the technique the writer uses", "Quote an example from the text", "Explain the effect on the reader"],
        "TEE stands for Technique, Example, Effect. You name the technique, back it up with a quote, then explain what it makes the reader see or feel.",
      ),
    (n) =>
      read(
        SOUTHERLY,
        choice(
          n,
          "'The first gust slammed into the town like a door.' Which technique is used here?",
          ["simile", "metaphor", "alliteration", "onomatopoeia"],
          0,
          "The gust is compared to a slamming door using 'like', so it is a simile. It makes the wind feel sudden and forceful.",
        ),
      ),
    (n) =>
      read(
        MARKET,
        typed(
          "short_answer",
          n,
          "Write one example of onomatopoeia from the second paragraph (beginning 'Roller doors').",
          ["clatter", "rattle", "beeps", "beep"],
          "The second paragraph has three sound words: doors 'clatter', trolleys 'rattle' and a forklift 'beeps'. Each word sounds like the noise it describes.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        SOUTHERLY,
        choice(
          n,
          "The storm is described as 'a bruise-coloured line of cloud'. What does 'bruise-coloured' suggest?",
          [
            "The cloud is dark purple and grey, and threatening, as if the storm could hurt.",
            "The cloud is bright and cheerful.",
            "Someone in the town has been injured.",
            "The cloud is the same colour as the sea.",
          ],
          0,
          "A bruise is dark purple-blue and comes from being hurt. The word paints the colour and also gives the storm a sense of danger and violence.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "What does the orange cross painted on the trunk symbolise?",
          ["The decision to cut the tree down", "A prize for the oldest tree", "A target for a school game", "The way to the classroom"],
          0,
          "The council paints the cross because the tree is 'too old' and 'too dangerous'. Marking it with a cross signals that it is going to be removed, so the cross stands for the threat to the tree.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which word has the most negative connotation when describing a thin person?",
        ["scrawny", "slim", "slender", "lean"],
        0,
        "All four words mean thin, but 'scrawny' suggests weak and unhealthy. 'Slim' and 'slender' sound attractive, and 'lean' suggests fit and strong.",
      ),
  ],
  hard: [
    (n) =>
      read(
        MARKET,
        multi(
          n,
          "Which techniques appear in the fourth paragraph (beginning 'Pyramids of purple plums')? Choose all that are right.",
          ["alliteration", "simile", "onomatopoeia", "rhetorical question"],
          [0, 1],
          "'Purple plums', 'polished' and 'plump pale peaches' repeat the p sound (alliteration), and 'like summer squeezed into a single leaf' is a simile. There are no sound words or questions in that paragraph.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "The tree 'holds out its arms' and 'has heard every secret... and has never told a single one'. What is the effect of this personification?",
          [
            "It makes the tree seem like a kind, trustworthy friend, so losing it would feel like losing a person.",
            "It makes the tree seem frightening and dangerous.",
            "It shows the tree is too old and should be cut down.",
            "It explains how gum trees grow.",
          ],
          0,
          "Holding out arms is a welcoming gesture, and keeping secrets is what a loyal friend does. Giving the tree these human qualities makes readers care about it and support the students' protest.",
        ),
      ),
    (n) =>
      choice(
        n,
        "'My little brother is a tornado. He spins through the lounge room, flattens the cushions and leaves a trail of wreckage wherever he goes.' Which technique is this?",
        ["extended metaphor", "simile", "onomatopoeia", "alliteration"],
        0,
        "The brother is called a tornado (a metaphor), and the comparison keeps going with 'spins', 'flattens' and 'trail of wreckage'. A metaphor carried over several sentences is an extended metaphor.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        SOUTHERLY,
        choice(
          n,
          "How does the imagery change across the passage, and why?",
          [
            "It moves from heavy, still images of heat to violent movement and finally relief, matching the shift from oppressive heat to the cool change.",
            "It stays calm and peaceful throughout to show nothing changes.",
            "It moves from happy images to sad ones to show the town has been destroyed.",
            "It only describes sounds, so readers can't picture the setting.",
          ],
          0,
          "The opening uses heavy, flat images (hot iron, tired blue glass). The storm brings movement (slammed, cartwheeled, raced), and the ending brings relief ('drinking in the cool air', 'breathe out'). The imagery tracks the town's experience.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        multi(
          n,
          "Which of these are reasonable readings of symbols in the poem? Choose all that are right.",
          [
            "The yellow ribbons represent the students' care and their united protest.",
            "The new pink and cream bark represents renewal and hope.",
            "The fading orange cross suggests the threat to the tree is passing.",
            "The road represents the students' journey to university.",
            "The diary pages represent the tree's homework.",
          ],
          [0, 1, 2],
          "The ribbons spread from one girl to 'the whole school', showing unity. The fresh bark 'as soft as a promise' hints at new life, and a fading cross suggests the decision is losing its force. The road and diary readings have no support in the poem.",
        ),
      ),
    (n) =>
      read(
        MARKET,
        choice(
          n,
          "'coins clink into it like small applause' combines onomatopoeia and a simile. What effect does this create?",
          [
            "It turns the sound of money into praise, suggesting passers-by enjoy and appreciate the busker's music.",
            "It suggests the busker is rich and doesn't need the money.",
            "It shows the crowd is booing the busker.",
            "It means the coins are too loud and annoying.",
          ],
          0,
          "'Clink' lets us hear each coin, and comparing the sound to applause gives it meaning: every coin is like a small clap for her playing. Together they show the crowd's appreciation.",
        ),
      ),
  ],
});

const FOG_RIDGE = {
  title: "Fog on the Ridge",
  text:
    "We set out from Wentworth Falls at dawn, and for the first hour the valley lay below us in perfect, crystal sunlight. The cliffs glowed orange. A lyrebird somewhere in the gully was running through its whole repertoire: whipbird, kookaburra, car alarm.\n\n" +
    "Then the fog came.\n\n" +
    "It did not roll in the way fog does in films. It simply rose out of the valley, soft and silent, like breath on a mirror. Within minutes the cliffs were gone. Then the trees beside the track were gone. Then Dad, three steps ahead of me, became a grey shape, then a voice, then nothing at all.\n\n" +
    "'Stay close,' his voice said from somewhere.\n\n" +
    "The fog wrapped around us like a damp grey blanket. It beaded on my eyelashes and the hairs on my arms. Every sound was swallowed. Even the lyrebird had stopped, as if it too was holding its breath.\n\n" +
    "I put my hand on the cold sandstone wall beside the track and followed it, step by step, the way you might follow a handrail in the dark. My heart was a drum.\n\n" +
    "We walked like that for twenty minutes, though it felt like a year. And then, as quickly as it had come, the fog thinned. A gum tree appeared, then a railing, then Dad, grinning, his beanie sparkling with tiny drops of water.\n\n" +
    "'Well,' he said. 'That was an adventure.'\n\n" +
    "I didn't tell him I had been counting my steps the whole way, just to hear a number that wasn't silence.",
};

const POPS_UTE = {
  title: "Pop's Ute",
  text:
    "It sits in the shed now,\na rusted red beetle\nasleep on four flat tyres,\ndreaming of the Hume.\n\n" +
    "Pop drove it for forty years,\nto the sale yards, to the coast,\nto the hospital the night my mum was born,\none hand on the wheel, one arm out the window,\nbrowned like a saddle in the sun.\n\n" +
    "The seats still smell of him:\ndiesel and wool and peppermints.\nThe radio is stuck forever\non the cricket station,\ncrackling with the ghosts of summers.\n\n" +
    "In the glovebox: a road map of New South Wales\nfolded soft as cloth,\na pencil, a fuel receipt from 1991,\nand a photo of Nan, laughing,\nher hair blown sideways by the wind.\n\n" +
    "Dad says we should sell it.\nIt's only scrap, he says.\nIt's only taking up room.\n\n" +
    "But on Sundays, when no one is watching,\nI climb into the driver's seat\nand put my hands where Pop's hands were,\non the wheel worn smooth as a river stone.\n\n" +
    "I can't reach the pedals yet.\nI don't know where I'm going.\nBut the key is in my pocket,\nwarm from my hand,\nand one day, I tell the ute,\none day we'll take the long way home.",
};

const BROKEN_HILL = {
  title: "Broken Hill: Where the Sky Never Ends",
  text:
    "Leave the traffic behind. Leave the noise behind. Out here, on the edge of the great red outback, you'll find a city like no other.\n\n" +
    "Wake to a sunrise that sets the desert on fire, painting the plains in crimson and gold. Wander wide streets lined with grand old buildings from the silver-mining boom, their stone walls glowing like honey in the afternoon light.\n\n" +
    "Explore galleries bursting with colour, created by artists who have fallen in love with this wild, untamed land. Drive half an hour to Silverton, a ghost town frozen in time, where the old hotel has starred in more films than most actors.\n\n" +
    "At dusk, climb to the Living Desert Sculptures and watch the sun sink behind the stone giants as the sky melts from orange to violet. Then, as darkness falls, look up. Far from city lights, the stars don't twinkle. They blaze. Millions of them, scattered like spilled sugar across a black tablecloth.\n\n" +
    "Here, the air is clean, the people are warm, and time moves at the pace of a lazy kangaroo. Share a yarn at a country pub, taste a dusty-red sunset from a camp chair, and remember what quiet sounds like.\n\n" +
    "Broken Hill. Come for the sky. Stay for the stories.\n\n" +
    "Book your outback escape today at the Visitor Information Centre.",
};

/** EN4-URB-01: figurative language, imagery, symbolism and connotation, and the effects they create. */
export const IMAGERY_2 = levels(8110216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence uses a metaphor?",
        ["Her smile was sunshine.", "Her smile was like sunshine.", "She smiled brightly.", "She smiled seven times."],
        0,
        "A metaphor says one thing IS another: her smile was sunshine. Using 'like' would make it a simile.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Repeating the same first sound in nearby words, as in 'sizzling sausages sold on Saturday', is called ___.",
        ["alliteration"],
        "Alliteration repeats a beginning sound, here the s sound. It makes a phrase catchy and easy to remember.",
      ),
    (n) =>
      trueFalse(
        n,
        "'I've told you a million times to hang up your towel!' is an example of hyperbole.",
        true,
        "Nobody has really said it a million times. Hyperbole is deliberate exaggeration used for effect, here to show frustration.",
      ),
  ],
  easy: [
    (n) =>
      read(
        FOG_RIDGE,
        choice(
          n,
          "'My heart was a drum.' Which technique is this?",
          ["metaphor", "simile", "onomatopoeia", "hyperbole"],
          0,
          "The heart is said to BE a drum, with no 'like' or 'as', so it is a metaphor. It suggests a loud, pounding heartbeat from fear.",
        ),
      ),
    (n) =>
      read(
        BROKEN_HILL,
        multi(
          n,
          "Which phrases from the ad are similes? Choose all that are right.",
          [
            "glowing like honey in the afternoon light",
            "scattered like spilled sugar across a black tablecloth",
            "a sunrise that sets the desert on fire",
            "the sky melts from orange to violet",
            "Leave the traffic behind",
          ],
          [0, 1],
          "Only the first two compare using 'like'. 'Sets the desert on fire' and 'the sky melts' are metaphors, and 'Leave the traffic behind' is a command, not a comparison.",
        ),
      ),
    (n) =>
      choice(
        n,
        "In many stories, what does a white dove usually symbolise?",
        ["peace", "danger", "greed", "anger"],
        0,
        "The white dove has long been used as a symbol of peace, so writers can use it to suggest calm or the end of a conflict.",
      ),
  ],
  medium: [
    (n) =>
      read(
        POPS_UTE,
        choice(
          n,
          "'a rusted red beetle / asleep on four flat tyres, / dreaming of the Hume'. Which two techniques are used?",
          ["metaphor and personification", "simile and onomatopoeia", "hyperbole and simile", "onomatopoeia and rhetorical question"],
          0,
          "The ute is called a beetle without 'like' (metaphor), and it is 'asleep' and 'dreaming', which are human actions (personification). Together they make the ute seem alive but waiting.",
        ),
      ),
    (n) =>
      read(
        FOG_RIDGE,
        typed(
          "fill_blank",
          n,
          "In the fifth paragraph, the fog wraps around them like a damp grey ___.",
          ["blanket"],
          "The simile 'like a damp grey blanket' helps us feel the fog: thick, close and wet against the skin.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from the weakest to the strongest meaning.",
        ["damp", "wet", "soaked"],
        "Damp is slightly wet, wet is fully wet, and soaked means wet right through. Choosing the right strength of word makes writing precise.",
      ),
  ],
  hard: [
    (n) =>
      read(
        BROKEN_HILL,
        choice(
          n,
          "The ad describes the land as 'wild, untamed'. Why did the writer choose 'untamed' rather than 'empty'?",
          [
            "'Untamed' suggests exciting, natural beauty, while 'empty' suggests there is nothing to see.",
            "'Untamed' is shorter than 'empty'.",
            "'Untamed' warns tourists that the outback is dangerous.",
            "The two words have exactly the same connotation.",
          ],
          0,
          "Both could describe a place with few people, but their connotations differ. An ad wants readers to visit, so it uses 'untamed', which sounds adventurous, not 'empty', which sounds dull.",
        ),
      ),
    (n) =>
      read(
        POPS_UTE,
        choice(
          n,
          "What does the key in the speaker's pocket most likely symbolise?",
          [
            "The speaker's connection to Pop and the hope of carrying his memory into the future",
            "The speaker's plan to sell the ute",
            "The speaker's fear of driving",
            "A key to Pop's house",
          ],
          0,
          "The key is 'warm from my hand' and linked to the promise 'one day we'll take the long way home'. It stands for keeping Pop's ute, and Pop's memory, alive.",
        ),
      ),
    (n) =>
      read(
        FOG_RIDGE,
        choice(
          n,
          "'Then Dad, three steps ahead of me, became a grey shape, then a voice, then nothing at all.' What is the effect of this sentence's structure?",
          [
            "The step-by-step list mirrors Dad slowly disappearing, building the narrator's fear.",
            "It shows that Dad is walking too fast.",
            "It lists the different animals the narrator hears.",
            "It slows the story down because nothing important happens.",
          ],
          0,
          "Each 'then' takes away more of Dad, from a shape to a sound to nothing. The reader experiences the loss in stages, just as the narrator does, which increases the tension.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        POPS_UTE,
        multi(
          n,
          "Dad calls the ute 'only scrap'. What does the contrast between Dad's words and the speaker's imagery suggest? Choose all that are right.",
          [
            "To Dad the ute is an object, but to the speaker it holds memories of Pop.",
            "The smells and sounds in the ute make Pop still feel present.",
            "The speaker is not ready to let go of Pop.",
            "The speaker agrees that the ute should be sold.",
            "Dad never knew Pop.",
          ],
          [0, 1, 2],
          "Dad's flat, repeated 'It's only...' contrasts with rich sensory imagery: Pop's smell, the crackling radio, the worn wheel. The speaker secretly sits in the ute on Sundays, showing they want to hold on. Nothing suggests agreement or that Dad never knew Pop.",
        ),
      ),
    (n) =>
      read(
        BROKEN_HILL,
        choice(
          n,
          "How does the ad mainly use imagery to achieve its purpose?",
          [
            "Vivid colour, light and sky imagery helps readers picture being there, persuading them to book a trip.",
            "It uses neutral facts and figures so readers can compare holiday prices.",
            "It tells a story about a family to entertain readers.",
            "It describes dangers to warn readers away from the outback.",
          ],
          0,
          "Crimson and gold sunrises, honey-coloured walls and blazing stars appeal to the senses so readers imagine the experience. The ad ends with 'Book your outback escape today', showing that the imagery serves persuasion.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which revision of 'It was a hot day' creates the most vivid imagery and avoids cliché?",
        [
          "The heat pressed against the classroom windows, and the asphalt outside softened like chewing gum.",
          "It was as hot as an oven.",
          "It was a really, really hot day.",
          "It was the hottest day in the history of the universe.",
        ],
        0,
        "'As hot as an oven' is a cliché, 'really, really' adds no picture, and the last is tired hyperbole. The first uses fresh, specific images we can see and feel: heat pressing on windows and asphalt going soft.",
      ),
  ],
});

const TRIAL_DAY = {
  title: "Trial Day",
  text:
    "I knew Coach Barnes didn't rate me the moment she called the names for the A team and mine wasn't one of them.\n\n" +
    "I'd been the best goal shooter at my old club in Orange. Everyone said so. But here in Bathurst, it was as if none of that counted. For three weeks I'd turned up early, stayed late and shot until my arms ached, and still Coach watched me with that same small frown.\n\n" +
    "At Saturday's trial game I went up for a rebound and landed badly. My ankle twisted, but I didn't say anything. I wasn't going to give her another reason to drop me. I played the whole second half, limping only when I was sure she wasn't looking.\n\n" +
    "Afterwards she called me over. I was certain this was it.\n\n" +
    "'How's the ankle?' she asked.\n\n" +
    "'Fine,' I said.\n\n" +
    "She looked at me for a long moment. 'I've had my eye on you since your first training session,' she said. 'You've got the best shooting technique in this club. But you've been training with that left knee strapped for three weeks, and now this. I'm not putting you on court until a physio clears you.'\n\n" +
    "I opened my mouth, then shut it.\n\n" +
    "'The A team is set for the first round,' she added. 'Not for the season.'\n\n" +
    "I walked home very slowly, and it wasn't only because of my ankle.",
};

const SKATE_PARK = {
  title: "Skate Park Plan Sparks Outrage",
  text:
    "Residents of quiet Elm Street are furious after Hillvale Council revealed plans to build a skate park on the much-loved Jacaranda Reserve.\n\n" +
    "The $600 000 project, approved at Tuesday night's council meeting, will replace the reserve's lawn and picnic tables with concrete ramps, rails and a bowl.\n\n" +
    "Elm Street has long been one of Hillvale's most desirable addresses, with tidy gardens and tree-lined footpaths that residents have worked hard to maintain.\n\n" +
    "Long-time resident Margaret Hill, 72, who has lived opposite the reserve for 40 years, said she was 'devastated'.\n\n" +
    "'This is a peaceful place for families and older people,' she said. 'Now we'll have noise, graffiti and gangs of teenagers hanging around at all hours.'\n\n" +
    "Fellow resident Doug Pearce agreed. 'Nobody asked us,' he said. 'The council has simply ignored the people who actually pay the rates.'\n\n" +
    "Local business owner Craig Dunn warned that property values in the street could plummet.\n\n" +
    "The council claims the skate park will provide 'a safe space for young people'. However, residents fear the reserve will become a magnet for trouble.\n\n" +
    "A petition against the plan has already attracted more than 300 signatures. Residents will protest outside the council chambers on Friday, and many say they will keep fighting until the plan is scrapped.",
};

const GOLD_LETTER = {
  title: "A Letter from the Turon, 1851",
  text:
    "Sofala, Turon River\n14th July, 1851\n\n" +
    "My dear Mother,\n\n" +
    "I write to you by candlelight from a tent no bigger than our kitchen table, with my fingers so cold I can scarcely hold the pen. Do not be alarmed. I am well, and in better spirits than I have been in my life.\n\n" +
    "You will have read in the Sydney papers of the gold found on the Turon. Believe me, Mother, the papers do not tell the half of it. Every day more men arrive, clerks and sailors and shopkeepers, all with the same fever in their eyes. Yesterday a man not twenty yards from my claim washed out a nugget the size of a pigeon's egg.\n\n" +
    "I have not yet been so fortunate. Tom Jenkins and I have dug and washed from first light until dark these three weeks, and have only a little dust to show for it. But we are certain our luck will turn. This is a land made for men who are willing to work, and it is empty and waiting for us.\n\n" +
    "The prices here are a scandal. Flour costs four times what it does in Sydney, and the storekeepers grow fat while honest diggers go hungry. Still, I would not trade places with any clerk in George Street.\n\n" +
    "Please tell Father I have not forgotten my promise. When I have made enough, I shall come home and set up the shop as we planned.\n\n" +
    "Your loving son,\nWilliam",
};

/** EN4-URC-01: point of view, narrator perspective, fact and opinion, bias, representation, and how context and purpose shape a text. */
export const PERSPECTIVE = levels(8110301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is written in the first person?",
        [
          "I grabbed my towel and ran to the pool.",
          "She grabbed her towel and ran to the pool.",
          "You grab your towel and run to the pool.",
          "They grabbed their towels and ran to the pool.",
        ],
        0,
        "First person uses 'I', 'me' and 'my'. 'She' and 'they' are third person, and 'you' is second person.",
      ),
    (n) =>
      trueFalse(
        n,
        "'Mount Kosciuszko is the highest mountain on mainland Australia' is a statement of fact.",
        true,
        "A fact can be checked and proven. You can look up the heights of mountains, so this is a fact, not an opinion.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A text that speaks directly to the reader using 'you', as in 'You open the door and step inside', is written in the ___ person.",
        ["second", "2nd"],
        "First person is 'I', second person is 'you', and third person is 'he', 'she' or 'they'. Second person puts the reader inside the action.",
      ),
  ],
  easy: [
    (n) =>
      read(
        TRIAL_DAY,
        choice(
          n,
          "From which point of view is this story told?",
          ["first person, by the player", "first person, by Coach Barnes", "second person", "third-person omniscient"],
          0,
          "The narrator uses 'I' and 'me' and is the goal shooter who hurts her ankle, so it is first person from the player's point of view.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these sentences are opinions? Choose all that are right.",
        [
          "Netball is the best sport in the world.",
          "Winter is a miserable season.",
          "Our canteen sells the tastiest pies in Newcastle.",
          "Sydney is the capital of New South Wales.",
          "The Murray is Australia's longest river.",
        ],
        [0, 1, 2],
        "'Best', 'miserable' and 'tastiest' are judgements people can disagree about, so those are opinions. The capital city and the longest river can be checked, so they are facts.",
      ),
    (n) =>
      read(
        SKATE_PARK,
        choice(
          n,
          "Which side does this news report mostly favour?",
          [
            "The residents who oppose the skate park",
            "The council that approved the skate park",
            "The young people who want the skate park",
            "It treats every side equally.",
          ],
          0,
          "Every person quoted is against the plan, the opening calls residents 'furious', and the council's view is given only one line beginning 'The council claims'. The report leans toward the residents.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        TRIAL_DAY,
        choice(
          n,
          "What does the reader learn by the end that the narrator misunderstood at the start?",
          [
            "Coach Barnes rated her highly and was worried about her injuries, not doubting her talent.",
            "Coach Barnes really did think she was a poor player.",
            "The narrator had never played netball before.",
            "The A team had already been picked for the whole season.",
          ],
          0,
          "The narrator reads Coach's frown as disapproval, but Coach says she has 'the best shooting technique in this club' and is protecting her strapped knee and ankle. A first-person narrator only knows what she thinks, so she can get things wrong.",
        ),
      ),
    (n) =>
      read(
        SKATE_PARK,
        multi(
          n,
          "Which words or phrases are loaded language, chosen to make readers feel a certain way? Choose all that are right.",
          [
            "furious",
            "much-loved",
            "a magnet for trouble",
            "approved at Tuesday night's council meeting",
            "concrete ramps, rails and a bowl",
          ],
          [0, 1, 2],
          "'Furious', 'much-loved' and 'magnet for trouble' carry strong feelings that push readers against the skate park. The meeting and the list of equipment are neutral, factual details.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these sentences in order from most objective to most biased.",
        [
          "The train arrived 15 minutes late.",
          "The train was late again, which was frustrating.",
          "The train company is a hopeless joke run by clowns.",
        ],
        "The first is a checkable fact. The second adds a mild opinion ('frustrating'). The third uses insulting, exaggerated language and gives no evidence, so it is the most biased.",
      ),
  ],
  hard: [
    (n) =>
      read(
        SKATE_PARK,
        choice(
          n,
          "Whose perspective is missing from the report, making it one-sided?",
          [
            "The young people who would use the skate park",
            "Long-time Elm Street residents",
            "Local business owners",
            "People who signed the petition",
          ],
          0,
          "The report quotes older residents and a business owner, but no young person is asked. Teenagers are only described as 'gangs' by others, so they are represented without being given a voice.",
        ),
      ),
    (n) =>
      read(
        GOLD_LETTER,
        choice(
          n,
          "William writes that the land is 'empty and waiting for us'. How might a reader today view this differently?",
          [
            "Today we recognise it was Wiradjuri Country, already home to Aboriginal people, and that his view reflects colonial attitudes of his time.",
            "Today we know there was never any gold on the Turon River.",
            "Today we know the land really was empty in 1851.",
            "A modern reader would agree that the land was made only for diggers.",
          ],
          0,
          "Writers are shaped by their context. In 1851 many settlers described the land as empty, ignoring the Aboriginal people who lived there. A modern reader, in a different context, notices whose presence is left out.",
        ),
      ),
    (n) =>
      read(
        TRIAL_DAY,
        choice(
          n,
          "How would the story change if it were told by a third-person omniscient narrator?",
          [
            "Readers would know Coach's real reasons from the start, so the surprise at the end would be lost.",
            "The story would have to be set in a different town.",
            "The narrator would have to use 'you' throughout.",
            "Readers would know less about the player's feelings than before.",
          ],
          0,
          "An omniscient narrator can see into every character's mind, including Coach Barnes's. The twist works because we only see the player's mistaken view; knowing everything would remove that.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        GOLD_LETTER,
        multi(
          n,
          "Which features of the letter are shaped by its context (who wrote it, when, and why)? Choose all that are right.",
          [
            "He reassures his mother ('Do not be alarmed') because he is writing to worried family far away.",
            "He mentions the Sydney papers because news of the gold rush travelled through newspapers in 1851.",
            "His complaint about flour prices reflects the real hardships of life on the goldfields.",
            "He writes formally because the letter is a school essay.",
            "He describes the gold as worthless because nobody wanted it.",
          ],
          [0, 1, 2],
          "His audience (his mother), his time (news by newspaper in 1851) and his situation (expensive supplies on the diggings) all shape what he writes. The letter is not a school essay, and he clearly values gold.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A TV news story about teenagers shows only footage of graffiti and fights, and interviews only adults who complain about young people. What is the main problem with how teenagers are represented?",
        [
          "It shows a whole group in a narrow, negative way and leaves out positive stories and teenagers' own voices.",
          "It is too short to be a news story.",
          "It interviews too many teenagers.",
          "It is a fact, so it cannot be biased.",
        ],
        0,
        "Representation is how a text shows a group of people. By choosing only negative footage and only adult critics, the story suggests all teenagers are trouble, which is unfair and one-sided.",
      ),
    (n) =>
      choice(
        n,
        "A company statement says, 'Mistakes were made.' Why might the writer have chosen the passive voice here?",
        [
          "It hides who made the mistakes, so nobody has to take responsibility.",
          "It makes the sentence longer and more detailed.",
          "It names exactly who made each mistake.",
          "It is the only correct way to write about mistakes.",
        ],
        0,
        "The active version would be 'We made mistakes' or 'The manager made mistakes'. The passive leaves out the doer, which is a subtle way to avoid blame and shape how readers see the company.",
      ),
  ],
});

const TWO_ACCOUNTS = {
  title: "Two Accounts of the Final",
  text:
    "Account A: Priya, Year 8 striker\n\n" +
    "We were drawing 1–1 with two minutes left when I broke through. Their defender came sliding in from behind and took my legs clean out. Everybody heard the crack of his boot on my shin. I hit the ground hard and lay there, waiting for the whistle. It never came. The referee just waved play on, and thirty seconds later they scored at the other end. Coach was furious. Half our parents were on their feet. I still have the bruise. Honestly, I don't know what game he was watching, but it wasn't ours.\n\n" +
    "Account B: Referee's match report, Mr D. Lowe\n\n" +
    "In the 58th minute, with the score at 1–1, the home striker (No. 9) entered the penalty area at speed. The defender (No. 4) made a sliding challenge from the side and clearly played the ball first, after which the players' legs made contact. The striker fell. From my position approximately ten metres away, with a clear line of sight, I judged the challenge to be fair and allowed play to continue. The opposing team scored from the resulting counter-attack. The home coach approached me after the match to dispute the decision; the discussion was respectful.",
};

const RESORT_RELEASE = {
  title: "Media Release: Seabreeze Resort",
  text:
    "EXCITING NEW RESORT TO BRING JOBS AND GROWTH TO PORT AMBER\n\n" +
    "Bluewater Developments is proud to announce Seabreeze Resort, a world-class holiday destination on the northern shores of Port Amber.\n\n" +
    "The resort will feature 200 luxury rooms, three restaurants, a day spa and a championship golf course. Construction will begin in March next year and is expected to take two years.\n\n" +
    "Bluewater estimates the project will create 350 construction jobs and 120 permanent positions, giving local young people the chance to build careers without leaving home.\n\n" +
    "'Port Amber deserves to be on the map,' said Bluewater's managing director, Grant Fowler. 'This resort will bring visitors, money and pride back to a town that has been overlooked for far too long.'\n\n" +
    "The resort will be built on 40 hectares of currently unused land beside Amber Creek. Bluewater has committed to planting native gardens throughout the site and will sponsor the local surf club for five years. Guests will enjoy uninterrupted ocean views, private beach access and a lagoon-style pool surrounded by palms.\n\n" +
    "Community information sessions will be held at the Port Amber Bowling Club throughout May. Bluewater looks forward to welcoming everyone to this exciting new chapter in the town's history.",
};

const DEPRESSION_LETTER = {
  title: "A Letter Home, 1931",
  text:
    "Wattle Flat, via Bathurst\n3rd June, 1931\n\n" +
    "Dear Jack,\n\n" +
    "Your letter came on Tuesday, and your mother read it aloud three times at the table. We are glad you have found work at the docks, even if it is only two days a week. Two days is better than none, and there are men in this district who have not had a day's paid work since Christmas.\n\n" +
    "I will not pretend things are easy here. Wool fetched less than half of what it did two years ago, and the bank manager came out again last week. He was polite enough, but we both knew what he meant. We have sold the good horse and the piano. Your mother says she does not miss the piano, but I notice she still dusts the place where it stood.\n\n" +
    "Still, we are luckier than many. The garden gives us potatoes and cabbages, the hens are laying, and Mrs Doyle next door swaps us milk for eggs. Nobody round here has money, but nobody goes hungry while a neighbour has food. That is the country way.\n\n" +
    "Do not send money home, son. Keep it for yourself and put a little aside. Times will get better. They must.\n\n" +
    "Your sister sends her love and asks if Sydney is as grand as they say.\n\n" +
    "Your loving father,\nTom Walsh",
};

/** EN4-URC-01: point of view, narrator perspective, fact and opinion, bias, representation, and how context and purpose shape a text. */
export const PERSPECTIVE_2 = levels(8110316, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which sentence is written in the third person?",
        ["He packed his bag for camp.", "I packed my bag for camp.", "You pack your bag for camp.", "We packed our bags for camp."],
        0,
        "Third person uses 'he', 'she', 'it' or 'they'. 'I' and 'we' are first person, and 'you' is second person.",
      ),
    (n) =>
      trueFalse(
        n,
        "An opinion is a statement that can be proven true or false.",
        false,
        "That describes a fact. An opinion is a belief or judgement, like 'Pizza is the best food', which people can disagree with but cannot prove.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A narrator who is a character in the story and uses 'I' and 'me' is called a ___ person narrator.",
        ["first", "1st"],
        "When the storyteller is inside the story saying 'I', it is a first person narrator. We only see what that character sees and thinks.",
      ),
  ],
  easy: [
    (n) =>
      read(
        TWO_ACCOUNTS,
        choice(
          n,
          "Which account uses more emotive language?",
          ["Account A, by Priya", "Account B, by the referee", "Both use the same amount", "Neither uses any emotive language"],
          0,
          "Priya uses words like 'took my legs clean out', 'crack', 'furious' and 'I don't know what game he was watching'. The referee uses calm, precise, formal language.",
        ),
      ),
    (n) =>
      read(
        RESORT_RELEASE,
        multi(
          n,
          "Which statements from the release are facts that could be checked? Choose all that are right.",
          [
            "The resort will feature 200 luxury rooms.",
            "Community information sessions will be held at the Port Amber Bowling Club.",
            "Port Amber deserves to be on the map.",
            "Seabreeze is a world-class holiday destination.",
            "This is an exciting new chapter in the town's history.",
          ],
          [0, 1],
          "The number of rooms and the place of the sessions can be checked. 'Deserves', 'world-class' and 'exciting' are judgements, so they are opinions.",
        ),
      ),
    (n) =>
      read(
        RESORT_RELEASE,
        choice(
          n,
          "What is the main purpose of this media release?",
          [
            "To promote the resort and win the community's support",
            "To give a balanced report of the resort's benefits and problems",
            "To warn residents about environmental damage",
            "To advertise jobs at the surf club",
          ],
          0,
          "It is written by the company building the resort, uses positive words like 'exciting' and 'world-class', and only mentions benefits. Its purpose is to make people feel good about the project.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        TWO_ACCOUNTS,
        choice(
          n,
          "Why do the two accounts of the tackle differ so much?",
          [
            "Each writer's position and purpose shape what they notice: Priya felt the hit and wanted a penalty, while the referee must explain and justify his decision.",
            "One of them was not at the match.",
            "They are describing two different matches.",
            "The referee could not see the tackle at all.",
          ],
          0,
          "Priya writes from the ground, hurt and upset. Mr Lowe writes an official report that explains why he allowed play to continue. Same event, different perspectives and purposes.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these modal words in order from lowest to highest modality.",
        ["might", "should", "must"],
        "'Might' only suggests a possibility, 'should' gives advice or expectation, and 'must' shows certainty or obligation. Writers choose modality to sound more or less forceful.",
      ),
    (n) =>
      read(
        DEPRESSION_LETTER,
        choice(
          n,
          "What does the letter suggest about life in country NSW in 1931?",
          [
            "Times were very hard, with low wool prices, little work and debt, but neighbours supported each other.",
            "Farmers were becoming rich from high wool prices.",
            "Everyone in the country had moved to Sydney.",
            "Life was easy because there was plenty of paid work.",
          ],
          0,
          "The letter was written during the Great Depression. It mentions men without work since Christmas, wool at less than half its price and a visit from the bank, but also swapping milk for eggs: 'nobody goes hungry while a neighbour has food'.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        RESORT_RELEASE,
        choice(
          n,
          "The release calls the site 'currently unused land beside Amber Creek'. What might this wording leave out?",
          [
            "The land may be bushland or wetland used by wildlife and locals; calling it 'unused' makes it sound worthless.",
            "The exact number of hotel rooms.",
            "The name of the company's managing director.",
            "The date of the information sessions.",
          ],
          0,
          "Bias can come from what is left out. Land beside a creek is rarely truly 'unused', but the release never mentions the environment, so readers don't think about what might be lost.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Read: 'Ella smiled at the new girl, though inside she was annoyed. Across the room, Mr Chen wondered why Ella was being so kind, while the new girl secretly hoped Ella would be her friend.' Which point of view is used?",
        ["third-person omniscient", "third-person limited", "first person", "second person"],
        0,
        "The narrator uses 'she' and 'he' (third person) and reveals the private thoughts of three different characters. A narrator who knows everyone's thoughts is omniscient.",
      ),
    (n) =>
      read(
        DEPRESSION_LETTER,
        choice(
          n,
          "The father writes, 'Times will get better. They must.' What does adding 'They must' reveal?",
          [
            "He is less certain than he sounds, and 'must' reads more like a hope or a plea than a prediction.",
            "He has secret information that the Depression is ending.",
            "He is ordering Jack to make things better.",
            "He thinks things are already better.",
          ],
          0,
          "'Will' sounds confident, but the extra 'They must' suggests he needs it to be true. It is high modality used to hold on to hope, hinting at worry he is trying not to show his son.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        TWO_ACCOUNTS,
        multi(
          n,
          "Which statements are reasonable conclusions about the two accounts? Choose all that are right.",
          [
            "Neither account should be treated as the whole truth on its own.",
            "Account B's precise details make it sound objective, but the referee is also defending his own decision.",
            "Priya's claim that 'everybody heard the crack' cannot be checked and reflects her strong feelings.",
            "Account B proves the tackle was definitely fair.",
            "Priya is lying about being tackled.",
          ],
          [0, 1, 2],
          "Both writers have a stake in the event. Formal detail can make a text seem neutral, but the referee is still justifying himself, and Priya's version is shaped by pain and frustration. Neither proves the other wrong, and nothing suggests she is lying.",
        ),
      ),
    (n) =>
      read(
        DEPRESSION_LETTER,
        choice(
          n,
          "'The bank manager came out again last week... we both knew what he meant.' What is the father hinting at, and why doesn't he say it directly?",
          [
            "The family might lose the farm because of debt; he hints rather than says it so he doesn't worry Jack or make him send money.",
            "The bank manager is a family friend who visits often; he leaves out details because they are boring.",
            "The bank is giving the family a loan; he keeps it secret as a surprise.",
            "The bank manager wants to buy the piano; he doesn't mention it because it was already sold.",
          ],
          0,
          "In the Depression, banks often took farms from families who couldn't repay loans. The father's purpose is to reassure his son ('Do not send money home'), so he hints at the danger without spelling it out.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Two headlines report the same event. A: 'Police officer injures teenager during arrest'. B: 'Teenager injured during arrest'. What does headline B do?",
        [
          "It uses the passive voice and leaves out who caused the injury, softening the police role.",
          "It gives more detail about who was responsible.",
          "It blames the teenager for the injury.",
          "It reports a completely different event.",
        ],
        0,
        "Headline A names the doer (the officer) in the active voice. Headline B is passive and drops the doer, so readers don't learn who caused the injury. A small grammar choice changes how the event is represented.",
      ),
  ],
});
