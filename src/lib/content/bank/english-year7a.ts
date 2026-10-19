/**
 * Year 7 English: Stage 4 (English 7–10, 2022). Two sets of 15 questions for each standard (NESA outcome),
 * three at each level from very easy to very hard. Reading, figurative language and perspective questions
 * use original passages: narratives, information texts, persuasive texts, poems, diaries and ads.
 */
import { choice, levels, multi, ordering, read, trueFalse, typed } from "../spec";

const FERRY = {
  title: "Missed Ferry",
  text:
    "Jun had promised his mum he would catch the 9:15 ferry home from Circular Quay. At 9:10 he was still in the food court, laughing with his teammates about the penalty he had nearly missed.\n\n" +
    "He ran the whole way down George Street, his soccer bag thumping against his back. When he reached the wharf, the ferry was already pulling away, its wake curling white under the lights. The next one was not for another hour.\n\n" +
    "Jun stared at his phone. Mum was working a night shift. That left Hana. That morning he had told his sister she was the most annoying person in New South Wales, and he had meant it. She had borrowed his headphones without asking, again.\n\n" +
    "He typed three different messages and deleted them all. Finally he sent just two words: 'Missed ferry.'\n\n" +
    "The reply came almost at once. 'Stay where you are. Twenty minutes.'\n\n" +
    "Hana arrived in their mum's old hatchback, the radio playing the kind of music he always complained about. She didn't mention the morning. She didn't mention the time. She just passed him a paper bag with a warm sausage roll inside and turned the music down a little.\n\n" +
    "Halfway across the Harbour Bridge, Jun pulled his headphones out of his bag and held them out to her.\n\n" +
    "'Keep them for a while,' he said.\n\n" +
    "Hana smiled at the road ahead. 'I was going to buy my own,' she said. 'But thanks.'",
};

const MANGROVES = {
  title: "The Hardest-Working Forest",
  text:
    "Along the edges of many NSW estuaries, from the Hawkesbury River to Botany Bay, grows a strange kind of forest. Its trees stand in salty mud that floods twice a day with the tide. These are mangroves, and they do far more work than most people realise.\n\n" +
    "Mangroves have special roots to survive where other trees would die. The grey mangrove, the most common species in NSW, sends up hundreds of pencil-like roots called pneumatophores. These poke out of the mud and take in air, because the waterlogged mud itself holds very little oxygen.\n\n" +
    "The tangle of roots also slows down moving water. As the water slows, mud and sand settle out of it instead of being carried away. In this way, mangroves hold the shoreline together and protect riverbanks from erosion during storms.\n\n" +
    "Mangroves are nurseries, too. Young fish, prawns and crabs shelter among the roots, where larger predators cannot easily reach them. Many of the fish that people catch in NSW, such as bream and mullet, spend part of their lives in estuaries like these.\n\n" +
    "Despite all this, mangroves were once seen as smelly, useless swamps. Many were cleared for ports, rubbish tips and housing. Today, mangroves in NSW are protected by law, and it is illegal to damage them without a permit.\n\n" +
    "So next time you smell that salty, muddy air on a walk by the river, remember: you are standing beside one of the hardest-working ecosystems on the coast.",
};

const SCHOOL_STREET = {
  title: "Let Us Walk: The Case for a Car-Free School Street",
  text:
    "Every school morning, the street outside our school becomes a car park. Engines idle, horns beep and parents double-park while students squeeze between bumpers. I believe it is time our council closed the street to cars for thirty minutes before and after school.\n\n" +
    "Firstly, a car-free street would be safer. Last term alone, our school newsletter reported two near misses at the crossing. Fewer cars means fewer chances for an accident, and no student should have to dodge a reversing four-wheel drive to get to class.\n\n" +
    "Secondly, it would be healthier. When cars cannot drop students at the gate, families are more likely to walk, ride or scoot. Even a ten-minute walk each way adds up to more than an hour and a half of exercise a week.\n\n" +
    "Some people argue that closing the street would be inconvenient for busy parents. That is true, for a few minutes. But parents could park one block away, and the short walk would give them a chance to talk with their children before the day begins. Surely a little inconvenience is worth a lot of safety.\n\n" +
    "Our council should give it a try. Write to your local councillor today, and let's make our street a place for people, not traffic.\n\n" +
    "— Priya Sharma, Year 7 student representative",
};

const DRY_CREEK = {
  title: "Dry Creek",
  text:
    "The creek bed is a cracked old plate\nset out for rain that comes too late.\nThe river gums lean in to see\nwhere all the water used to be.\n\n" +
    "My grandfather walks here each day\nand names the pools that went away:\nthe Deep Hole, where he learnt to swim,\nthe Rocks, where yabbies hid from him.\n\n" +
    "He kicks the dust. He doesn't speak.\nHe looks a long time at the creek,\nthen up, beyond the paddock line,\nat clouds that never give a sign.\n\n" +
    "Mum reads the forecast every night,\nthen folds the paper, lips pressed tight.\nThe dam is mud, the sheep are thin,\nand every week less hay comes in.\n\n" +
    "But last night, long after bed,\nI heard a sound above my head:\na tap, a drum, a rush, a roar,\nand Grandad laughing at the door.\n\n" +
    "This morning, where the cracks had been,\nthe creek runs brown, the hills run green,\nand Grandad stands there, boots and all,\nand lets the rain go on and fall.",
};

/** EN4-RVL-01: reading closely for main idea, inference, purpose and audience across a range of texts. */
export const COMPREHENSION = levels(7110101, {
  very_easy: [
    (n) =>
      read(
        FERRY,
        choice(
          n,
          "Why did Jun miss the 9:15 ferry?",
          [
            "He stayed too long at the food court with his teammates.",
            "His soccer game finished late.",
            "The ferry left early.",
            "He went to the wrong wharf.",
          ],
          0,
          "The first paragraph says that at 9:10 he was still in the food court laughing with his teammates, so he was too late.",
        ),
      ),
    (n) =>
      read(
        MANGROVES,
        typed(
          "fill_blank",
          n,
          "The pencil-like roots of the grey mangrove are called ___.",
          ["pneumatophores", "pneumatophore"],
          "The second paragraph names them: 'pencil-like roots called pneumatophores'.",
        ),
      ),
    (n) =>
      read(
        SCHOOL_STREET,
        trueFalse(
          n,
          "Priya wants the street outside her school closed to cars all day.",
          false,
          "She only wants it closed for thirty minutes before and after school, as she says at the end of the first paragraph.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        MANGROVES,
        typed(
          "short_answer",
          n,
          "Which mangrove species does the text say is the most common in NSW?",
          ["grey mangrove", "the grey mangrove", "grey mangroves", "grey"],
          "The second paragraph says 'The grey mangrove, the most common species in NSW'.",
        ),
      ),
    (n) =>
      read(
        SCHOOL_STREET,
        multi(
          n,
          "Which reasons does Priya give for closing the street? Choose all that are right.",
          [
            "It would be safer for students.",
            "Families would walk, ride or scoot more, which is healthier.",
            "It would save the council money.",
            "It would make parking easier for parents.",
          ],
          [0, 1],
          "Her 'Firstly' paragraph is about safety and her 'Secondly' paragraph is about health. She never mentions money, and she admits parking would be less convenient.",
        ),
      ),
    (n) =>
      read(
        DRY_CREEK,
        choice(
          n,
          "In the second stanza, Grandad names the pools that have dried up. What does this show?",
          [
            "He has known and loved the creek since he was young.",
            "He wants to sell the farm.",
            "He has forgotten where the pools were.",
            "He is teaching the speaker to swim.",
          ],
          0,
          "He remembers the Deep Hole where he learnt to swim and the Rocks where yabbies hid. These memories go back to his childhood, so the creek means a lot to him.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        FERRY,
        choice(
          n,
          "Why does Jun type three different messages and delete them all?",
          [
            "He feels awkward asking Hana for help after being rude to her that morning.",
            "His phone battery is almost flat.",
            "He can't remember Hana's number.",
            "He wants to message his mum instead.",
          ],
          0,
          "The paragraph before tells us he called Hana 'the most annoying person in New South Wales' that morning. Asking her for help now feels embarrassing, so he struggles to find the words.",
        ),
      ),
    (n) =>
      read(
        MANGROVES,
        choice(
          n,
          "What is the main idea of 'The Hardest-Working Forest'?",
          [
            "Mangroves are valuable because they protect the coast and shelter young sea creatures.",
            "Mangroves smell bad and should be cleared.",
            "Bream and mullet are the most popular fish in NSW.",
            "The Hawkesbury River is longer than Botany Bay.",
          ],
          0,
          "Every paragraph explains a job mangroves do (surviving in mud, stopping erosion, acting as nurseries), and the title calls them hard-working. The other options are small details or are wrong.",
        ),
      ),
    (n) =>
      read(
        SCHOOL_STREET,
        choice(
          n,
          "Who is Priya mainly writing for?",
          [
            "people in her local community, whom she wants to write to the council",
            "students at a school in another state",
            "the drivers of school buses",
            "people who sell four-wheel drives",
          ],
          0,
          "She ends with 'Write to your local councillor today', so she is speaking to local families and students and asking them to act.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        SCHOOL_STREET,
        choice(
          n,
          "Which sentence shows Priya answering an argument against her view?",
          [
            "Some people argue that closing the street would be inconvenient for busy parents.",
            "Firstly, a car-free street would be safer.",
            "Engines idle, horns beep and parents double-park.",
            "Our council should give it a try.",
          ],
          0,
          "Here she raises the other side's point (it's inconvenient) and then answers it: parents could park a block away. This is called a rebuttal.",
        ),
      ),
    (n) =>
      read(
        DRY_CREEK,
        ordering(
          n,
          "Put these moments from the poem in the order they happen.",
          [
            "Grandad walks the dry creek and names the old pools.",
            "Mum reads the forecast with her lips pressed tight.",
            "The speaker hears rain on the roof at night.",
            "The creek runs brown and the hills turn green.",
          ],
          "The poem moves through the drought (stanzas 1–4), the rain at night (stanza 5) and the next morning (stanza 6).",
        ),
      ),
    (n) =>
      read(
        FERRY,
        choice(
          n,
          "Why does Hana not mention the argument or how late it is?",
          [
            "She wants to help Jun without making him feel worse.",
            "She has forgotten about the argument.",
            "She is too angry to speak to him.",
            "She doesn't know what time it is.",
          ],
          0,
          "She replies at once, brings him a warm sausage roll and turns the music down. These kind actions suggest she is choosing not to make him feel guilty.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        FERRY,
        choice(
          n,
          "What is the main message (theme) of 'Missed Ferry'?",
          [
            "Small acts of kindness can repair a relationship better than words.",
            "You should always catch public transport on time.",
            "Older sisters are always right.",
            "Sport is more important than family.",
          ],
          0,
          "Neither Jun nor Hana says sorry. Instead Hana brings food and Jun offers his headphones. The story shows that actions can mend a fight. The first option is a lesson about the plot, not the deeper theme.",
        ),
      ),
    (n) =>
      read(
        MANGROVES,
        choice(
          n,
          "Why does the writer mention that mangroves were once seen as 'smelly, useless swamps'?",
          [
            "to contrast old attitudes with what we now know, so readers value mangroves more",
            "to prove that mangroves really are useless",
            "to explain how to clear mangroves",
            "to describe the smell of the Hawkesbury River",
          ],
          0,
          "After four paragraphs of benefits, the old view sounds wrong. The contrast shows how much our understanding has changed and persuades readers to protect mangroves.",
        ),
      ),
    (n) =>
      read(
        DRY_CREEK,
        choice(
          n,
          "How does the mood of 'Dry Creek' change, and what causes the change?",
          [
            "It moves from worry and sadness to joy and relief because the drought breaks.",
            "It moves from happiness to anger because the sheep are sold.",
            "It stays calm all the way through because nothing happens.",
            "It moves from fear to boredom because Grandad stops talking.",
          ],
          0,
          "Early stanzas show silence, tight lips and thin sheep. Then the rain comes, Grandad laughs and stands in the rain, so the mood turns joyful and relieved.",
        ),
      ),
  ],
});

const LOOKOUT = {
  title: "Pulpit Rock",
  text:
    "Aisha had wanted to turn back an hour ago. The track to Pulpit Rock was steeper than the sign had promised, and the steps cut into the cliff seemed to go on for ever. Her cousin Leo, who was fifteen and knew everything, kept striding ahead.\n\n" +
    "'Nearly there,' he called, for the fourth time.\n\n" +
    "Aisha stopped to catch her breath and noticed a small grey-brown bird scratching in the leaf litter beside the track. It flicked aside a whole pile of leaves with one foot, then froze and looked at her with a bright black eye. She held her breath. The bird held its ground. For a moment there was nothing in the world but the two of them.\n\n" +
    "'Aisha! Come on!'\n\n" +
    "The bird vanished into the ferns.\n\n" +
    "When she finally reached the lookout, Leo was already taking photos, his phone held high above the railing. Below them, the Grose Valley spread out in every direction, blue and enormous and silent. Leo turned the camera on himself and grinned.\n\n" +
    "'Worth it, right?' he said, already scrolling to see how the picture had turned out.\n\n" +
    "Aisha looked out at the valley. It was beautiful, she had to admit. But she was thinking about a bright black eye in the ferns, and the way the whole forest had seemed to hold its breath with her.\n\n" +
    "'Yeah,' she said. 'It was worth it.'\n\n" +
    "She didn't tell him which part she meant.",
};

const LYREBIRD = {
  title: "The Superb Lyrebird",
  text:
    "Walk through the wet forests of south-eastern Australia and you might hear a kookaburra laughing, a whipbird cracking, a currawong calling and a camera shutter clicking, all within a minute. Look closer, and you may find that every one of those sounds is coming from a single bird: the superb lyrebird.\n\n" +
    "The superb lyrebird is one of the world's best mimics. Males learn the calls of dozens of other species and weave them into long, complicated songs. Some lyrebirds living near people have even been recorded copying chainsaws, car alarms and the beeping of reversing trucks.\n\n" +
    "Why go to so much trouble? The answer is courtship. In winter, each male clears a small patch of ground called a display mound. Standing on it, he throws his long, lacy tail feathers forward over his head like a shimmering silver veil, then sings and dances to attract a female. The more varied and accurate his song, the more impressive he seems.\n\n" +
    "Lyrebirds are also the gardeners of the forest. As they scratch for worms and insects, they turn over huge amounts of leaf litter and soil. Scientists have found that this helps break down fallen leaves, mixes nutrients into the soil and may even reduce the fuel that feeds bushfires.\n\n" +
    "The superb lyrebird appears on the Australian ten-cent coin. Next time you hold one, remember the remarkable bird behind it.",
};

const SURF_CAMP = {
  title: "Saltwater Surf Camp",
  text:
    "Are you aged 11 to 15? Have you always wanted to stand up on a board but never known where to start? Then Saltwater Surf Camp at Port Macquarie is for you!\n\n" +
    "Our five-day January camp runs from Monday to Friday. Each day includes two surf lessons with qualified coaches, beach safety training and fun activities like beach cricket, sandcastle challenges and a sunset barbecue on the final night. On the last afternoon, families are invited down to the beach to watch a mini surf competition, with prizes for the best wave, the biggest wipeout and the most improved surfer.\n\n" +
    "All lessons take place on a patrolled beach in small groups of no more than six surfers per coach. Boards, wetsuits and rash vests are provided, so all you need to bring is sunscreen, a hat and a big smile.\n\n" +
    "'I was scared of the waves before camp, but by Thursday I was catching waves on my own!' — Mia, 13, Tamworth\n\n" +
    "Cost: $495 per camper, including lunch and snacks each day. Book before 1 December and save $50!\n\n" +
    "Spaces are strictly limited. Visit our booth at the Port Macquarie markets, or ask your parents to call us to secure your spot.\n\n" +
    "Saltwater Surf Camp: where every wave is a new adventure.",
};

const NIGHT_SHIFT = {
  title: "Night Shift",
  text:
    "At seven, when the streetlights wake,\nmy mother pins her name badge on,\nties back her hair and finds her keys,\nand checks the clock, and then she's gone.\n\n" +
    "She drives to Westmead through the dark\nwhile Dad and I wash up and dry;\nwe leave the porch light burning bright,\na small gold star against the sky.\n\n" +
    "All night, while I am fast asleep,\nshe checks the drips from bed to bed;\nshe holds a frightened stranger's hand\nand smooths the hair back from his head.\n\n" +
    "At six, the key turns in the lock.\nShe doesn't wake us. Still, I hear\nthe kettle and the kitchen chair,\nthe sigh she lets out, long and clear.\n\n" +
    "I bring her toast before the bus.\nHer eyes are heavy, ringed with grey.\nShe says, 'How did you sleep, my love?'\nas if she'd never been away.",
};

/** EN4-RVL-01: reading closely for main idea, inference, purpose and audience across a range of texts. */
export const COMPREHENSION_2 = levels(7110116, {
  very_easy: [
    (n) =>
      read(
        LYREBIRD,
        choice(
          n,
          "Which Australian coin shows the superb lyrebird?",
          ["the ten-cent coin", "the twenty-cent coin", "the one-dollar coin", "the fifty-cent coin"],
          0,
          "The last paragraph says the lyrebird 'appears on the Australian ten-cent coin'.",
        ),
      ),
    (n) =>
      read(
        SURF_CAMP,
        trueFalse(
          n,
          "Campers need to bring their own surfboard.",
          false,
          "The ad says boards, wetsuits and rash vests are provided. Campers only need sunscreen, a hat and a big smile.",
        ),
      ),
    (n) =>
      read(
        LOOKOUT,
        choice(
          n,
          "Where are Aisha and Leo walking to?",
          ["Pulpit Rock", "the Grose River", "the car park", "a camping ground"],
          0,
          "The first paragraph says they are on the track to Pulpit Rock, a lookout above the Grose Valley.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        SURF_CAMP,
        typed(
          "short_answer",
          n,
          "How much does one camper pay if they book before 1 December? Write the amount in dollars.",
          ["445", "$445", "445 dollars"],
          "The full price is $495 and booking early saves $50: $495 − $50 = $445.",
        ),
      ),
    (n) =>
      read(
        LYREBIRD,
        typed(
          "fill_blank",
          n,
          "In winter, a male lyrebird clears a small patch of ground called a display ___.",
          ["mound", "mounds"],
          "The third paragraph says each male clears 'a small patch of ground called a display mound'.",
        ),
      ),
    (n) =>
      read(
        NIGHT_SHIFT,
        choice(
          n,
          "What is the mother's job most likely to be?",
          ["a nurse in a hospital", "a bus driver", "a teacher", "a shop assistant"],
          0,
          "The poem never says 'nurse', but she wears a name badge, works all night, checks drips 'from bed to bed' and comforts a frightened patient. Westmead has a big hospital.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        LOOKOUT,
        choice(
          n,
          "'Her cousin Leo, who was fifteen and knew everything' — what does this suggest about how Aisha sees Leo?",
          [
            "She finds him a bit of a know-it-all.",
            "She thinks he is the smartest person she has met.",
            "She is scared of him.",
            "She thinks he is younger than her.",
          ],
          0,
          "No one really 'knows everything'. The phrase is gently sarcastic: it tells us Aisha thinks Leo acts as if he knows best, and he keeps calling 'Nearly there'.",
        ),
      ),
    (n) =>
      read(
        LYREBIRD,
        ordering(
          n,
          "Put the steps of the male lyrebird's courtship display in order.",
          [
            "He clears a small patch of ground.",
            "He stands on the display mound.",
            "He throws his tail feathers forward over his head.",
            "He sings and dances to attract a female.",
          ],
          "The third paragraph describes the display in this order: clear the mound, stand on it, throw the tail forward, then sing and dance.",
        ),
      ),
    (n) =>
      read(
        SURF_CAMP,
        multi(
          n,
          "Which details are there to reassure parents that the camp is safe? Choose all that are right.",
          [
            "Lessons are on a patrolled beach.",
            "There are no more than six surfers per coach.",
            "The coaches are qualified.",
            "There is a sunset barbecue on the final night.",
          ],
          [0, 1, 2],
          "A patrolled beach, small groups and qualified coaches all speak to safety. The barbecue is there to make the camp sound fun.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        LYREBIRD,
        choice(
          n,
          "Why does the writer call lyrebirds 'the gardeners of the forest'?",
          [
            "Their scratching turns over soil and leaves, which helps the forest the way a gardener helps a garden.",
            "They plant seeds in neat rows.",
            "They eat the flowers in the forest.",
            "They live in people's gardens.",
          ],
          0,
          "The paragraph explains that their scratching breaks down leaves and mixes nutrients into the soil. That is like a gardener digging and composting.",
        ),
      ),
    (n) =>
      read(
        NIGHT_SHIFT,
        choice(
          n,
          "Why do Dad and the speaker leave the porch light on, 'a small gold star against the sky'?",
          [
            "It welcomes Mum home and shows the family is thinking of her while she is away.",
            "They are scared of the dark.",
            "They forgot to turn it off.",
            "It helps the neighbours find their house.",
          ],
          0,
          "A star guides travellers home and stands for hope. The light shows the family's love and that they are waiting for her.",
        ),
      ),
    (n) =>
      read(
        SURF_CAMP,
        choice(
          n,
          "Why does the ad include Mia's comment?",
          [
            "to show nervous beginners that a real camper went from scared to surfing on her own",
            "to tell readers where Tamworth is",
            "to explain the price of the camp",
            "to warn readers that the waves are dangerous",
          ],
          0,
          "A comment from a happy customer is called a testimonial. Mia admits she was scared, so readers who are nervous can picture themselves succeeding too.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        LOOKOUT,
        choice(
          n,
          "'She didn't tell him which part she meant.' Which part of the walk was most worth it to Aisha?",
          [
            "the quiet moment with the bird, which Leo missed while rushing ahead",
            "the photo Leo took at the lookout",
            "reaching the end of the steep steps",
            "seeing the whole Grose Valley from the railing",
          ],
          0,
          "At the lookout she is still 'thinking about a bright black eye in the ferns'. Leo only cares about the view and his photo, so she keeps her special moment to herself.",
        ),
      ),
    (n) =>
      read(
        LOOKOUT,
        multi(
          n,
          "Which ideas does 'Pulpit Rock' suggest? Choose all that are right.",
          [
            "Rushing towards a goal can mean missing small, special moments.",
            "People can experience the same place in very different ways.",
            "Bushwalking is too dangerous for young people.",
            "Photos are the best way to remember a place.",
          ],
          [0, 1],
          "Leo rushes and photographs the view, while Aisha treasures a quiet moment with a bird. The story questions photos rather than praising them, and it never says walking is dangerous.",
        ),
      ),
    (n) =>
      read(
        NIGHT_SHIFT,
        choice(
          n,
          "What does the last line, 'as if she'd never been away', suggest about the mother?",
          [
            "She hides how tired she is so she can put her child first.",
            "She has forgotten that she went to work.",
            "She did not really go to work that night.",
            "She is cross that the toast is late.",
          ],
          0,
          "Her eyes are heavy and ringed with grey, yet she asks about her child's sleep. Putting her own tiredness aside shows her love and the sacrifices she makes.",
        ),
      ),
  ],
});

const SOUTHERLY = {
  title: "The Southerly Buster",
  text:
    "All afternoon the heat had pressed down on Wollongong like a heavy hand. The air was thick and still. Even the seagulls had given up, slumped on the sand with their beaks open. Lena lay on the verandah, sure she would melt into a puddle before dinner.\n\n" +
    "Then, at five o'clock, the sky to the south turned the colour of a bruise. A long roll of cloud came racing up the coast, swallowing the escarpment as it went. The wind arrived first. It snatched the washing off the line, flung the beach umbrellas into the dunes and whistled through every crack in the old house.\n\n" +
    "Thunder grumbled, low and lazy at first, then cracked overhead so loudly that Lena's dog, Biscuit, shot under the bed. Rain hammered the tin roof, rat-a-tat-tat, and the gutters gurgled and overflowed.\n\n" +
    "Within ten minutes the temperature had dropped by fifteen degrees. Lena stood at the screen door, breathing in the smell of wet bitumen and crushed gum leaves. The storm was a broom, sweeping the whole sticky day out to sea.\n\n" +
    "By seven it was over. The clouds had shuffled off to the north, grumbling to themselves, and the first stars blinked awake in a sky that had been washed clean.",
};

const HARBOUR_DAWN = {
  title: "Harbour at Dawn",
  text:
    "The harbour is a sleeping cat\ncurled grey beneath the sky,\nuntil the sun comes creeping up\nand opens one gold eye.\n\n" +
    "The ferries grumble from their wharves,\ntheir engines churn and chug;\nthe gulls go squabbling, squawking, screeching\nround every fishing tug.\n\n" +
    "The Bridge, a coat-hanger of steel,\nholds up the morning air,\nwhile joggers pound across its back\nwith not a breath to spare.\n\n" +
    "Down at the Quay a busker plays,\nhis guitar case open wide;\nhis song floats out across the water\nand rides the morning tide.\n\n" +
    "By eight the cat is wide awake:\nit purrs and hums and roars,\nten thousand footsteps, horns and bells\nand ferries at the doors.",
};

const JACARANDA = {
  title: "The Jacaranda",
  text:
    "The jacaranda in our backyard was planted the year I was born. Mum dug the hole herself, Dad says, with me asleep in a basket on the grass beside her. For most of the year it is an ordinary tree, a tangle of grey branches and feathery leaves that drop into the gutters.\n\n" +
    "But every November it explodes into purple.\n\n" +
    "Mum used to call it her exam tree. When she was at school in Grafton, she said, the jacarandas bloomed just as the exams began, and students joked that if a flower landed on your head, you would pass.\n\n" +
    "This is the first November without her. When the first buds opened, I couldn't look at them. I kept the blinds in my room closed and walked to the bus stop the long way, so I wouldn't have to pass under the branches.\n\n" +
    "Then, one morning, Dad called me outside. The whole lawn was a purple carpet, and he was standing in the middle of it in his work boots, holding the old basket.\n\n" +
    "'Your mum would have wanted a photo,' he said.\n\n" +
    "I stood under the branches while he fumbled with his phone. A single flower drifted down and landed in my hair. Dad laughed, a real laugh, the first one I'd heard in months.\n\n" +
    "'Well,' he said, 'looks like you'll pass.'",
};

/** EN4-URB-01: figurative language, imagery, symbolism and connotation, and the effects they create. */
export const IMAGERY = levels(7110201, {
  very_easy: [
    (n) =>
      read(
        SOUTHERLY,
        choice(
          n,
          "'the heat had pressed down on Wollongong like a heavy hand' — what kind of figurative language is this?",
          ["simile", "metaphor", "onomatopoeia", "alliteration"],
          0,
          "It compares the heat to a heavy hand using the word 'like', so it is a simile.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'The old car coughed and spluttered up the hill' uses personification.",
        true,
        "Coughing and spluttering are things people do. Giving a car human actions is personification.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Which word in this sentence is onomatopoeia? 'The bees buzzed around the bottlebrush.'",
        ["buzzed", "buzz"],
        "'Buzzed' sounds like the noise bees make, so it is onomatopoeia.",
      ),
  ],
  easy: [
    (n) =>
      read(
        SOUTHERLY,
        typed(
          "short_answer",
          n,
          "'Rain hammered the tin roof, rat-a-tat-tat.' What technique is 'rat-a-tat-tat'?",
          ["onomatopoeia", "onomatopoeic"],
          "'Rat-a-tat-tat' imitates the sound of rain drumming on tin, so it is onomatopoeia.",
        ),
      ),
    (n) =>
      read(
        HARBOUR_DAWN,
        choice(
          n,
          "'the gulls go squabbling, squawking, screeching' — what is the repeated s sound at the start of words called?",
          ["alliteration", "simile", "hyperbole", "metaphor"],
          0,
          "Repeating the same first sound in words close together is alliteration. Here it imitates the harsh noise of the gulls.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses hyperbole?",
        ["My school bag weighs a tonne.", "My school bag is heavy.", "My school bag is blue.", "My school bag is as old as my shoes."],
        0,
        "Hyperbole is deliberate exaggeration. A school bag can't really weigh a tonne (1000 kg); the writer exaggerates to show how heavy it feels.",
      ),
  ],
  medium: [
    (n) =>
      read(
        SOUTHERLY,
        choice(
          n,
          "'The storm was a broom, sweeping the whole sticky day out to sea.' What does this metaphor suggest?",
          [
            "The storm quickly cleared away the heat and discomfort.",
            "The storm left a big mess on the beach.",
            "Lena had to sweep the verandah.",
            "The storm was slow and gentle.",
          ],
          0,
          "A broom sweeps dirt away. The metaphor shows the storm getting rid of the sticky heat, leaving everything fresh.",
        ),
      ),
    (n) =>
      read(
        HARBOUR_DAWN,
        choice(
          n,
          "Why does the poet call the Harbour Bridge 'a coat-hanger of steel'?",
          [
            "Its curved arch and flat deck look like the shape of a coat-hanger.",
            "People hang their coats on it.",
            "It is very small and light.",
            "It is made of wire.",
          ],
          0,
          "The metaphor is based on shape: the arch with the road hanging below looks like a coat-hanger. Sydneysiders even nickname it 'the Coathanger'.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these words in order from the most positive connotation to the most negative.",
        ["slender", "thin", "skinny", "scrawny"],
        "All four mean 'not wide', but 'slender' sounds graceful, 'thin' is neutral, 'skinny' is a bit negative and 'scrawny' suggests weak and unhealthy.",
      ),
  ],
  hard: [
    (n) =>
      read(
        JACARANDA,
        choice(
          n,
          "What does the jacaranda symbolise for the narrator?",
          ["their mother and the memories of her", "the end of the school year", "the hot weather", "the family's new house"],
          0,
          "Mum planted it the year the narrator was born and called it her exam tree. Now that she has died, the tree stands for her.",
        ),
      ),
    (n) =>
      read(
        SOUTHERLY,
        multi(
          n,
          "Which phrases use personification? Choose all that are right.",
          [
            "the clouds had shuffled off to the north, grumbling to themselves",
            "the first stars blinked awake",
            "the sky to the south turned the colour of a bruise",
            "Lena's dog, Biscuit, shot under the bed",
          ],
          [0, 1],
          "Shuffling, grumbling and blinking awake are human actions given to clouds and stars. The bruise is a colour comparison, and a dog running under a bed is just what dogs do.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The feelings and ideas a word suggests, beyond its dictionary meaning, are called its ___.",
        ["connotation", "connotations"],
        "'Home' and 'house' have similar dictionary meanings, but 'home' carries feelings of warmth and belonging. Those extra feelings are its connotations.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        HARBOUR_DAWN,
        multi(
          n,
          "The poem begins with the metaphor 'The harbour is a sleeping cat'. Which other lines continue this same comparison? Choose all that are right.",
          [
            "and opens one gold eye",
            "it purrs and hums and roars",
            "the gulls go squabbling, squawking, screeching",
            "his guitar case open wide",
          ],
          [0, 1],
          "A cat opens its eye when it wakes and purrs when content. These lines extend the cat metaphor through the poem, which is called an extended metaphor. The gulls and busker are not part of it.",
        ),
      ),
    (n) =>
      read(
        JACARANDA,
        choice(
          n,
          "How have the narrator's feelings about the jacaranda changed by the end?",
          [
            "At first it is too painful to look at, but by the end it brings comfort and a link to Mum.",
            "At first they love it, but by the end they want it cut down.",
            "They never notice the tree at all.",
            "They are annoyed that its leaves fill the gutters.",
          ],
          0,
          "The narrator closes the blinds and walks the long way to avoid it. At the end they stand under the branches for a photo while Dad laughs, so the tree now brings comfort.",
        ),
      ),
    (n) =>
      read(
        JACARANDA,
        choice(
          n,
          "Why is the flower landing in the narrator's hair such a powerful ending?",
          [
            "It echoes Mum's exam-tree joke, so she feels present in a moment of shared hope.",
            "It shows the tree is dying.",
            "It means the narrator will fail their exams.",
            "It shows that Dad is bad at taking photos.",
          ],
          0,
          "Mum said a flower landing on your head means you'll pass. When Dad repeats her joke, the flower links the family to Mum, and they laugh together for the first time in months.",
        ),
      ),
  ],
});

const SHOW_DAY = {
  title: "Show Day",
  text:
    "The Easter Show hits you before you even reach the gates. First comes the smell: hot chips, fairy floss and the earthy, grassy scent of the animal pavilions, all mixed together into one big, delicious cloud.\n\n" +
    "Then comes the noise. Sideshow spruikers bellow over the crowd, rides clank and whirr, and somewhere a rooster is crowing as if the whole showground belongs to him. Every few seconds a scream rises from one of the big rides and floats away across the sky.\n\n" +
    "Inside, the crowd is a river, and you are a leaf caught in its current. You are swept past the woodchopping arena, where axes thud into logs, and on past the dog high jump, where a kelpie flies over the bar like a furry rocket.\n\n" +
    "My little brother Theo has spent all his pocket money on a showbag the size of a small car. He clutches it to his chest, sticky with fairy floss, his eyes as round as dinner plates.\n\n" +
    "By late afternoon the sun is sinking, and the Ferris wheel lights flicker on one by one, a necklace of coloured jewels against the darkening sky. My feet ache, my hands are sticky and my ears are ringing. Theo is asleep on Dad's shoulder, still holding his showbag.\n\n" +
    "It is, without any doubt, the best day of the year.",
};

const OLD_GUM = {
  title: "Old Gum",
  text:
    "The old gum stands beside the road,\nher arms held up to pray;\nshe's watched the coaches come and go\nfor a hundred years and a day.\n\n" +
    "Her skin peels off in ribbons, grey\nand cream and salmon-pink;\nshe drops her branches without warning,\nquicker than you'd think.\n\n" +
    "The cockatoos come screeching in\nand gossip in her hair;\nthe wind runs whispering through her leaves\nand leaves its secrets there.\n\n" +
    "They want to widen the old road.\nThe surveyors' pegs are in.\nShe doesn't flinch. She's seen it all:\nthe drought, the flood, the din.\n\n" +
    "But I have hugged her rough, warm trunk\nand felt her heartbeat slow,\nand I will stand beside her, too,\nthe day they say she'll go.",
};

const COTTAGE_AD = {
  title: "For Sale: 14 Banksia Lane, Katoomba",
  text:
    "Escape to the mountains in this charming, cosy cottage, nestled among towering gums just minutes from Katoomba's bustling main street.\n\n" +
    "Bursting with character, this classic 1920s home boasts original timber floors, a quaint kitchen and a sun-drenched reading nook, perfect for lazy Sunday afternoons. The intimate living room centres on a crackling open fireplace, ideal for those crisp mountain winters.\n\n" +
    "Outside, a rambling cottage garden overflows with roses, lavender and hydrangeas, while birdsong drifts from the lush bushland next door. With a little loving care, this hidden gem could become the mountain retreat of your dreams.\n\n" +
    "Inside, generous built-in cupboards keep everything neat and tidy, and a charming claw-foot bath invites you to soak away the stresses of city life after a day exploring the mountains. Opportunities like this are rare. Inspect this Saturday from 10 to 10:30 am, before someone else snaps it up!\n\n" +
    "Just a short stroll from the famous Three Sisters lookout and the bushwalking tracks of the national park, this home offers the best of both worlds: peaceful village living with every convenience close at hand. Whether you are searching for a weekend escape, a first home or a creative studio, this is a property you simply have to see to believe.\n\nContact Gumleaf Realty for details.",
};

/** EN4-URB-01: figurative language, imagery, symbolism and connotation, and the effects they create. */
export const IMAGERY_2 = levels(7110216, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "'Her smile was as bright as the sun' is a metaphor.",
        false,
        "It compares using 'as … as', so it is a simile. A metaphor would say 'Her smile was the sun'.",
      ),
    (n) =>
      read(
        SHOW_DAY,
        choice(
          n,
          "Which sense does the first paragraph mostly appeal to?",
          ["smell", "touch", "hearing", "taste"],
          0,
          "The paragraph begins 'First comes the smell' and lists hot chips, fairy floss and the scent of the animal pavilions.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "'Sizzle', 'crash' and 'hiss' are examples of ___, words that sound like the noise they describe.",
        ["onomatopoeia", "onomatopoeic words"],
        "When a word imitates the sound it names, it is onomatopoeia. Say 'hiss' slowly and it sounds like a snake.",
      ),
  ],
  easy: [
    (n) =>
      read(
        SHOW_DAY,
        typed(
          "short_answer",
          n,
          "'his eyes as round as dinner plates' — what technique compares two things using 'as'?",
          ["simile", "a simile"],
          "A comparison using 'like' or 'as' is a simile. Theo's eyes are compared to dinner plates.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "Which technique is used most throughout the poem 'Old Gum'?",
          ["personification", "onomatopoeia", "rhetorical questions", "alliteration"],
          0,
          "The tree is called 'she', holds up her arms to pray, has skin and hair, doesn't flinch and has a heartbeat. These are all human qualities, so it is personification.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which sentence uses alliteration?",
        [
          "Seven sleepy seals sunbaked on the sand.",
          "The seals lay on the beach in the sun.",
          "The seal was as fat as a pillow.",
          "The seal barked loudly at the boat.",
        ],
        0,
        "Seven, sleepy, seals, sunbaked and sand all begin with s. Repeating the first sound is alliteration.",
      ),
  ],
  medium: [
    (n) =>
      read(
        SHOW_DAY,
        choice(
          n,
          "'the crowd is a river, and you are a leaf caught in its current' — what feeling does this metaphor create?",
          [
            "being swept along with no control over where you go",
            "feeling cool and refreshed",
            "being bored and lonely",
            "being lost in the bush",
          ],
          0,
          "A leaf in a river can't choose its path; it is carried by the current. The metaphor shows how the huge crowd pushes you along.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "'The cockatoos come screeching in / and gossip in her hair.' What is 'her hair'?",
          ["the gum tree's leaves and branches", "the poet's hair", "the cockatoos' feathers", "the long grass by the road"],
          0,
          "The tree is personified as a woman, so her leafy branches at the top become her 'hair', where the cockatoos sit and chatter.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which word gives the most positive impression of a person who won't give up?",
        ["determined", "stubborn", "pig-headed", "obstinate"],
        0,
        "All four describe someone who sticks to something. 'Determined' has a positive connotation (admirable), while the others suggest the person is difficult.",
      ),
  ],
  hard: [
    (n) =>
      read(
        SHOW_DAY,
        multi(
          n,
          "Which phrases use hyperbole? Choose all that are right.",
          ["a showbag the size of a small car", "his eyes as round as dinner plates", "axes thud into logs", "My feet ache"],
          [0, 1],
          "A showbag can't be as big as a car, and eyes can't be as big as plates; these exaggerate for effect. Axes thudding and aching feet are simply true.",
        ),
      ),
    (n) =>
      read(
        COTTAGE_AD,
        multi(
          n,
          "Which words from the ad could be a positive way of saying the rooms are small? Choose all that are right.",
          ["cosy", "intimate", "towering", "rambling"],
          [0, 1],
          "'Cosy' and 'intimate' make small spaces sound warm and friendly. 'Towering' describes the tall gums, and 'rambling' describes a large, spreading garden.",
        ),
      ),
    (n) =>
      choice(
        n,
        "In many stories, a wild storm arrives at an important moment. What does such a storm most often symbolise?",
        ["conflict or trouble", "peace and calm", "wealth", "a holiday"],
        0,
        "Storms are violent and frightening, so writers often use them to stand for conflict, danger or strong emotions in the characters.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "What does the old gum most likely symbolise in the poem?",
          [
            "the long history of the place, which is now threatened by change",
            "the need for wider roads",
            "how dangerous gum trees are",
            "the speed of modern life",
          ],
          0,
          "She has stood for 'a hundred years and a day' through drought and flood, but now surveyors' pegs mark the road widening. She stands for the past and for nature under threat.",
        ),
      ),
    (n) =>
      read(
        COTTAGE_AD,
        choice(
          n,
          "'With a little loving care, this hidden gem could become the mountain retreat of your dreams.' What is the writer most likely hinting?",
          [
            "The house needs repairs, but this is described with positive words.",
            "The house is brand new.",
            "The house is hard to find because it has no street address.",
            "The owners will look after the house for you.",
          ],
          0,
          "'Could become' and 'a little loving care' suggest work is needed. 'Hidden gem' and 'dreams' have positive connotations that make the repairs sound appealing.",
        ),
      ),
    (n) =>
      read(
        OLD_GUM,
        choice(
          n,
          "In the last stanza, the speaker 'felt her heartbeat slow'. What effect does this personification have?",
          [
            "It makes the tree feel like an ageing, living friend, so the reader cares whether it is cut down.",
            "It shows the tree is about to fall on the road.",
            "It explains how trees take in water.",
            "It makes the poem funny.",
          ],
          0,
          "A slow heartbeat belongs to someone old and alive. Feeling it while hugging the tree makes it seem like a person, which builds sympathy before 'the day they say she'll go'.",
        ),
      ),
  ],
});

const MS_KOVAC = {
  title: "Ms Kovac",
  text:
    "I knew Ms Kovac was going to be trouble the moment she walked into 7B. She wore a grey jacket buttoned to the top, she didn't smile, and she wrote her name on the whiteboard in square capital letters, as if she were carving it into stone.\n\n" +
    "'Phones in the tub, please,' she said. 'You'll get them back at the bell.'\n\n" +
    "Everyone groaned. I groaned the loudest, which turned out to be a mistake, because she looked straight at me for a long, slow second.\n\n" +
    "All through maths I kept my head down and doodled in the margin of my book: a dragon, then a dragon eating a calculator. When the bell went for lunch, she said, 'Max, could you stay back a moment?'\n\n" +
    "Here it comes, I thought. Detention on day one. A note home.\n\n" +
    "When the room was empty, Ms Kovac picked up my book and studied the dragon for so long that I started counting the ceiling tiles.\n\n" +
    "'Who taught you to shade like this?' she asked.\n\n" +
    "'Nobody,' I mumbled.\n\n" +
    "She nodded slowly. Then she took a flyer from her folder and slid it across the desk. ART CLUB, it said. TUESDAYS, ROOM 14. TEACHER: MS KOVAC.\n\n" +
    "'We could use someone who draws dragons,' she said. 'Bring your book. And Max? Do the maths first next time.'\n\n" +
    "I walked out into the sunshine still holding the flyer. Maybe she wasn't trouble after all. Or maybe she was just a different kind of trouble.",
};

const SKATE_PARK = {
  title: "Skate Park Plan a Disaster for Hillview",
  text:
    "Hillview Council has voted 6–3 to build a $450 000 skate park in Rosella Reserve, the quiet green space beside the community hall. The park is due to open in March next year.\n\n" +
    "This is, quite simply, the worst decision the council has made in years. Rosella Reserve is the most beautiful park in the district, and it will be ruined by concrete ramps and noisy teenagers. Residents who have enjoyed peaceful picnics there for decades will be driven away.\n\n" +
    "The council claims the skate park will 'give young people somewhere safe to go'. But everyone knows skate parks attract graffiti and rubbish. The money would be far better spent fixing the potholes on Wattle Road. Young people already have the school oval and the youth centre. Why should the rest of the community lose its favourite park for a fad that will be forgotten in five years?\n\n" +
    "Not one resident I spoke to supports the plan. Mrs Joan Pettigrew, who has lived beside the reserve for forty years, said she was 'heartbroken'.\n\n" +
    "Hillview deserves better. Come to the community meeting at the hall on Thursday at 7 pm and tell the council what you really think.\n\n" +
    "— Written by the Friends of Rosella Reserve",
};

const BRIDGE_DIARY = {
  title: "From the Diary of Edie Walsh, aged 12, Balmain, 19 March 1932",
  text:
    "Today they opened the Bridge at last. Dad woke us before sunrise and we walked all the way from Balmain to find a good spot, because we haven't the money for the tram. Mum packed bread and dripping and a bottle of cold tea.\n\n" +
    "There were more people than I have ever seen in my whole life. Some had climbed onto rooftops and some were up in the trees. Dad lifted Tommy onto his shoulders so he could see.\n\n" +
    "Just before the ribbon was cut, a man on a horse rode up and slashed it with a sword! He wore an army uniform. People gasped and the police pulled him off his horse. Dad said he was making a point about who should have opened the Bridge, but I didn't really understand. They tied the ribbon back together and cut it properly after that.\n\n" +
    "Dad was quiet on the walk home. He worked on the Bridge for nearly a year before they put him off, and he hasn't found steady work since. He looked up at the arch for a long time and said, 'I put some of my sweat into that.' Mum squeezed his arm.\n\n" +
    "I think the Bridge is the most beautiful thing in Sydney. Tommy says it looks like a coat-hanger. Tommy is six and doesn't know anything.",
};

/** EN4-URC-01: point of view, narrator perspective, fact and opinion, bias, and how context and purpose shape texts. */
export const PERSPECTIVE = levels(7110301, {
  very_easy: [
    (n) =>
      read(
        MS_KOVAC,
        choice(
          n,
          "From which point of view is 'Ms Kovac' told?",
          ["first person", "second person", "third person", "no point of view"],
          0,
          "Max tells his own story using 'I', 'me' and 'my', so it is first person.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "'Canberra is the best city in Australia' is a fact.",
        false,
        "'Best' is a judgement that people can disagree with, so it is an opinion. 'Canberra is the capital of Australia' would be a fact.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A story told by a narrator outside the story, using 'he', 'she' and 'they', is written in ___ person.",
        ["third", "3rd", "the third"],
        "When the narrator isn't a character and refers to everyone as he, she or they, the story is in third person.",
      ),
  ],
  easy: [
    (n) =>
      read(
        SKATE_PARK,
        choice(
          n,
          "Which sentence from the article is a fact?",
          [
            "Hillview Council has voted 6–3 to build a skate park in Rosella Reserve.",
            "This is the worst decision the council has made in years.",
            "Rosella Reserve is the most beautiful park in the district.",
            "Hillview deserves better.",
          ],
          0,
          "A council vote can be checked in the meeting records, so it is a fact. The others are the writer's judgements.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "'You hear footsteps behind you. You turn around slowly.' Is this written in first, second or third person?",
        ["second", "second person", "2nd", "2nd person"],
        "The writer speaks directly to the reader as 'you', so it is second person. It puts you inside the story.",
      ),
    (n) =>
      read(
        BRIDGE_DIARY,
        choice(
          n,
          "What kind of text is Edie's writing, and who is it mainly written for?",
          [
            "a diary, written mainly for herself",
            "a newspaper report, written for all of Sydney",
            "a speech, written for her class",
            "an advertisement, written for tourists",
          ],
          0,
          "It is dated and records her own day and feelings in the first person. Diaries are private records, so she is mainly writing for herself.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        MS_KOVAC,
        choice(
          n,
          "Why does Max decide that Ms Kovac is 'trouble' at the start?",
          [
            "because of how she looks and acts: the buttoned jacket, no smile and the square letters",
            "because she gives him a detention",
            "because she tears up his drawing",
            "because other students warned him about her",
          ],
          0,
          "He judges her in the first paragraph from her appearance and manner, before she has done anything to him.",
        ),
      ),
    (n) =>
      read(
        SKATE_PARK,
        multi(
          n,
          "Which of these sentences from the article are opinions? Choose all that are right.",
          [
            "This is, quite simply, the worst decision the council has made in years.",
            "Rosella Reserve is the most beautiful park in the district.",
            "The park is due to open in March next year.",
            "Mrs Joan Pettigrew has lived beside the reserve for forty years.",
          ],
          [0, 1],
          "'Worst' and 'most beautiful' are judgements people could disagree with. An opening date and how long someone has lived somewhere can be checked, so they are facts.",
        ),
      ),
    (n) =>
      read(
        BRIDGE_DIARY,
        multi(
          n,
          "Which details show that Edie's family was short of money during the Great Depression? Choose all that are right.",
          [
            "They walked because they didn't have the money for the tram.",
            "Mum packed bread and dripping.",
            "Dad hasn't found steady work since he was put off.",
            "Dad lifted Tommy onto his shoulders.",
          ],
          [0, 1, 2],
          "Walking to save the fare, a cheap meal of bread and dripping, and Dad losing his job all show hard times. Lifting Tommy up shows care, not money troubles.",
        ),
      ),
  ],
  hard: [
    (n) =>
      read(
        SKATE_PARK,
        choice(
          n,
          "Whose point of view is missing from the article?",
          [
            "the young people who would use the skate park",
            "Mrs Joan Pettigrew",
            "residents who have picnics in the reserve",
            "the Friends of Rosella Reserve",
          ],
          0,
          "The article quotes and speaks for residents who oppose the plan, but never asks a single skater or teenager. Leaving out one side is a sign of bias.",
        ),
      ),
    (n) =>
      read(
        MS_KOVAC,
        choice(
          n,
          "Max is sure he is getting a detention, but he is wrong. What does this show about first-person narrators?",
          [
            "We only see events through the narrator's fears and guesses, which can be wrong.",
            "First-person narrators always know what other characters are thinking.",
            "First-person narrators never make mistakes.",
            "The story must be told by the teacher.",
          ],
          0,
          "A first-person narrator can only tell us what they see and think. Max's worry colours his view, so the reader is surprised along with him.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for checking a text for bias in a sensible order.",
        [
          "Find out who wrote the text.",
          "Work out what the writer wants readers to think or do.",
          "Look for views or facts that have been left out.",
          "Decide how far you can trust the text.",
        ],
        "First know the writer, then their purpose. Knowing their purpose helps you spot what is missing, and only then can you judge how reliable the text is.",
      ),
  ],
  very_hard: [
    (n) =>
      read(
        SKATE_PARK,
        choice(
          n,
          "The article was written by the Friends of Rosella Reserve. How does this help explain its bias?",
          [
            "The group exists to protect the reserve, so it only presents arguments against the skate park.",
            "The group is part of the council, so it supports the council's decision.",
            "The group is made up of skaters, so it wants the park built.",
            "The group has no interest in the reserve, so it is completely neutral.",
          ],
          0,
          "A writer's context shapes a text. A group set up to protect the reserve wants to stop the skate park, so it uses strong opinions and leaves out the other side.",
        ),
      ),
    (n) =>
      read(
        BRIDGE_DIARY,
        choice(
          n,
          "How does Edie's family situation shape the way she writes about the Bridge?",
          [
            "Because her dad helped build it and then lost his job, the Bridge stands for both pride and hard times.",
            "Because her family is rich, she sees the Bridge as just another building.",
            "Because she lives far from Sydney, she has never seen the Bridge.",
            "Because she dislikes her brother, she writes only about him.",
          ],
          0,
          "Dad says 'I put some of my sweat into that', yet he was put off and can't find work. Edie's pride in the 'beautiful' Bridge is mixed with the family's struggle.",
        ),
      ),
    (n) =>
      read(
        MS_KOVAC,
        choice(
          n,
          "If the story were retold in third person from Ms Kovac's point of view, what would the reader most likely learn that Max cannot tell us?",
          [
            "what she was thinking when she looked at Max and noticed his drawing",
            "what Max drew in his maths book",
            "which room the art club meets in",
            "what time the lunch bell rings",
          ],
          0,
          "Max can only guess at her thoughts. A narrator inside her head could reveal why she stared at him and what she saw in his dragon. The other details Max already tells us.",
        ),
      ),
  ],
});

const RESCUE = {
  title: "Two Accounts of the Same Rescue",
  text:
    "Account 1: Surf Club Incident Report\n\n" +
    "Date: Sunday 12 January. Location: North Beach, southern end. At approximately 2:15 pm, a male swimmer aged about 14 was observed drifting south of the flags in a rip current. Lifeguard J. Tran entered the water with a rescue board and reached the swimmer at 2:17 pm. The swimmer was conscious and was returned to shore at 2:22 pm. First aid was provided for mild exhaustion. No further treatment was required. Recommendation: increase rip-current signage at the southern end of the beach.\n\n" +
    "Account 2: Posted by Ollie_K\n\n" +
    "Worst. Day. Ever. I honestly thought I was going to die out there. One minute I was bodysurfing with my cousins, the next the beach was getting smaller and smaller and I couldn't swim back no matter how hard I tried. My arms felt like concrete. I was so scared I forgot everything they teach you at school about rips.\n\n" +
    "Then this lifeguard just appeared out of nowhere on a board, like a superhero. She was so calm. She said, 'Grab on, mate, I've got you,' and paddled me back like it was nothing. Everyone on the beach was staring. So embarrassing!\n\n" +
    "Massive thanks to Jess at North Beach. Seriously, swim between the flags, people. And if you get caught, don't panic: float and put your hand up.",
};

const ZAPCHARGE = {
  title: "Why Every Young Athlete Needs ZapCharge",
  text:
    "Saturday sport is tough. Early starts, cold mornings and long matches can leave even the fittest players feeling flat by the final whistle. Whether you're running the wing in rugby league or defending the circle in netball, your body works hard, and it needs the right fuel.\n\n" +
    "That's where ZapCharge comes in. Packed with electrolytes and a burst of fruity flavour, ZapCharge helps young athletes stay at their best from the first whistle to the last. Water is fine, of course, but why settle for fine when you could be fantastic?\n\n" +
    "Top coaches know the difference. 'My players perform better when they're properly hydrated,' says junior football coach Dave Morris.\n\n" +
    "Best of all, ZapCharge comes in five exciting flavours, including Tropical Thunder and Berry Blast, and every bottle contains 30 grams of energy-boosting sugar to keep you going.\n\n" +
    "Players across NSW are already making the switch. 'I drink one before every game and one at half-time,' says Jayden, 12, a winger from Parramatta. 'I feel unstoppable.' Mums and dads love it too, because the bright, resealable bottle fits neatly into any kit bag.\n\nDon't let your team down. Grab a ZapCharge before your next game, available at supermarkets and canteens everywhere.\n\n" +
    "This article is sponsored by ZapCharge Drinks.",
};

const FINAL_QUARTER = {
  title: "The Final Quarter",
  text:
    "With two minutes left in the under-13 netball grand final, the scores were level at 24 all. Ruby stood at goal shooter, her heart thudding so hard she was sure the umpire could hear it. She had missed her last two shots. If the ball came to her again, she thought, she would miss again. She almost hoped it wouldn't.\n\n" +
    "At centre, her older sister Grace was thinking something quite different. Grace had watched Ruby practise in the backyard every night for a month, shooting until it was too dark to see the ring. She knew her sister could do this. She just wasn't sure Ruby knew it.\n\n" +
    "The whistle blew. Grace took the centre pass, spun past her defender and fired the ball down the court. It zipped through the hands of the wing attack and landed in Ruby's.\n\n" +
    "Ruby froze. The crowd went quiet. Then, from somewhere up the court, she heard a single voice: 'Backyard, Rubes! Just like the backyard!' It was Grace, who had somehow found the breath to shout as she ran.\n\n" +
    "Ruby bent her knees, lifted the ball and let it go.\n\n" +
    "Swish.\n\n" +
    "Later, on the drive home, Ruby told everyone it had been the easiest shot of her life. Grace, sitting beside her with the trophy on her lap, said nothing at all. She just smiled out of the window.",
};

/** EN4-URC-01: point of view, narrator perspective, fact and opinion, bias, and how context and purpose shape texts. */
export const PERSPECTIVE_2 = levels(7110316, {
  very_easy: [
    (n) =>
      read(
        FINAL_QUARTER,
        typed(
          "short_answer",
          n,
          "Is 'The Final Quarter' written in first, second or third person?",
          ["third", "third person", "3rd", "3rd person"],
          "The narrator is not a character and calls the girls 'she' and 'her', so the story is in third person.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The pronouns 'I', 'me' and 'we' show that a text is written in ___ person.",
        ["first", "1st", "the first"],
        "When the narrator talks about themselves using I, me, my or we, the text is in first person.",
      ),
    (n) =>
      read(
        ZAPCHARGE,
        choice(
          n,
          "What is the main purpose of the ZapCharge article?",
          [
            "to persuade readers to buy ZapCharge",
            "to explain the rules of netball",
            "to tell a story about a football coach",
            "to warn readers about sugar",
          ],
          0,
          "It praises the drink, tells you where to buy it and is sponsored by the company that makes it. Its purpose is to sell.",
        ),
      ),
  ],
  easy: [
    (n) =>
      read(
        RESCUE,
        choice(
          n,
          "Which account is more objective, sticking to facts without personal feelings?",
          [
            "Account 1, the surf club incident report",
            "Account 2, Ollie's post",
            "Both are equally objective.",
            "Neither gives any facts.",
          ],
          0,
          "The report uses exact times and plain facts and never says how anyone felt. Ollie's post is full of feelings like 'so scared' and 'so embarrassing'.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which sentence is an opinion?",
        [
          "Netball is the most exciting sport to watch.",
          "A netball team has seven players on the court.",
          "The Sydney Opera House opened in 1973.",
          "Cricket is usually played in summer in Australia.",
        ],
        0,
        "'Most exciting' is a personal judgement. The other sentences can be checked, so they are facts.",
      ),
    (n) =>
      read(
        RESCUE,
        multi(
          n,
          "Which sentences show that Account 2 is written from a personal point of view? Choose all that are right.",
          [
            "I honestly thought I was going to die out there.",
            "My arms felt like concrete.",
            "At approximately 2:15 pm, a male swimmer aged about 14 was observed.",
            "First aid was provided for mild exhaustion.",
          ],
          [0, 1],
          "Ollie uses 'I' and 'my' and describes his own fear and tiredness. The other two sentences come from the report, which is impersonal.",
        ),
      ),
  ],
  medium: [
    (n) =>
      read(
        FINAL_QUARTER,
        trueFalse(
          n,
          "The narrator of 'The Final Quarter' tells us what both Ruby and Grace are thinking.",
          true,
          "We learn Ruby fears she will miss and Grace knows her sister can do it. A narrator who can see into several characters' minds is called omniscient.",
        ),
      ),
    (n) =>
      read(
        ZAPCHARGE,
        choice(
          n,
          "Coach Dave Morris says, 'My players perform better when they're properly hydrated.' Why is this weak evidence that ZapCharge works?",
          [
            "He talks about being hydrated, which water can do too. He never mentions ZapCharge.",
            "He is not a real person.",
            "He coaches football, not netball, so he knows nothing about sport.",
            "It is a fact, so it can't be used as evidence.",
          ],
          0,
          "The quote only says hydration helps. The article places it next to ZapCharge so readers assume he means the drink, but he doesn't say so.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these headlines in order from the most neutral to the most biased.",
        [
          "Council approves new bus route",
          "Council finally approves long-awaited bus route",
          "Clueless council's bus route set to be a disaster",
        ],
        "The first just states what happened. 'Finally' and 'long-awaited' add a feeling of approval. 'Clueless' and 'disaster' are strong, one-sided opinions.",
      ),
  ],
  hard: [
    (n) =>
      read(
        RESCUE,
        choice(
          n,
          "Why does the incident report give exact times and avoid words like 'scared'?",
          [
            "It is an official record, so it must be accurate and objective for the surf club.",
            "The lifeguard did not care about the swimmer.",
            "Reports are meant to entertain readers.",
            "The writer forgot how the swimmer felt.",
          ],
          0,
          "A report's purpose is to record what happened so the club can learn from it, such as adding more signs. Feelings would not help that purpose.",
        ),
      ),
    (n) =>
      read(
        ZAPCHARGE,
        choice(
          n,
          "'every bottle contains 30 grams of energy-boosting sugar' — how does this word choice show bias?",
          [
            "It describes a large amount of sugar as a good thing and hides the downside.",
            "It gives an exact number, so it can't be biased.",
            "It warns readers to drink less.",
            "It compares ZapCharge fairly with water.",
          ],
          0,
          "Thirty grams is a lot of sugar for one drink. Calling it 'energy-boosting' gives it a positive connotation, so readers think it is healthy.",
        ),
      ),
    (n) =>
      read(
        FINAL_QUARTER,
        choice(
          n,
          "Why does Ruby 'almost hope' the ball won't come to her?",
          [
            "She is afraid she will miss again and let the team down.",
            "She is tired and wants a rest.",
            "She wants Grace to shoot instead.",
            "She thinks the umpire is unfair.",
          ],
          0,
          "The narrator shows her thoughts: she had missed her last two shots and thought she 'would miss again'. Her fear makes her want to avoid the ball.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      read(
        FINAL_QUARTER,
        choice(
          n,
          "Ruby later says it was 'the easiest shot of her life'. Why does Grace say nothing and just smile?",
          [
            "She knows how scared Ruby really was, but lets her enjoy the moment.",
            "She is angry that Ruby took the winning shot.",
            "She didn't see the shot.",
            "She agrees that the shot was easy.",
          ],
          0,
          "Because the narrator showed us both sisters' thoughts, we know Ruby froze with fear. Grace knows it too but kindly lets Ruby tell her version.",
        ),
      ),
    (n) =>
      read(
        RESCUE,
        choice(
          n,
          "The two accounts agree on what happened, yet they read very differently. What best explains this?",
          [
            "They have different purposes and audiences: an official record versus a personal post to friends.",
            "One of the accounts is about a different rescue.",
            "The lifeguard and Ollie disagree about the facts.",
            "Ollie was not really in the water.",
          ],
          0,
          "The report records facts for the surf club. Ollie writes to his followers to share his feelings, thank Jess and warn others. Purpose and audience shape the language.",
        ),
      ),
    (n) =>
      read(
        ZAPCHARGE,
        multi(
          n,
          "Which information would a balanced article about sports drinks include that this one leaves out? Choose all that are right.",
          [
            "that water is enough for most children playing weekend sport",
            "the health risks of drinking a lot of sugar",
            "the names of the drink's flavours",
            "where you can buy the drink",
          ],
          [0, 1],
          "The sponsored article skips anything that might stop you buying, such as water being enough or sugar being unhealthy. The flavours and shops are already included because they help sell it.",
        ),
      ),
  ],
});
