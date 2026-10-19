/**
 * Year 7 Mathematics: Stage 4 data and probability. Two sets of 15 questions for each standard
 * (NESA outcome), three at each level from very easy to very hard. Year 7 works at the early
 * Stage 4 level, a step beyond Year 6 on the same focus area.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-DAT-C-01: types of data, census and sample, dot plots, stem-and-leaf plots, column and sector graphs. */
export const DATA = levels(7070101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which of these is categorical data?",
        ["Favourite sport", "Height in centimetres", "Number of siblings", "Time to run 100 m"],
        0,
        "Categorical data is sorted into groups or names, not measured or counted. Favourite sport gives answers like 'cricket' or 'netball', so it is categorical. The others are numbers.",
      ),
    (n) =>
      trueFalse(
        n,
        "The number of goals scored in a netball game is discrete numerical data.",
        true,
        "Goals are counted in whole numbers (you can't score 12.5 goals), so the data is discrete.",
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Pets owned by students in 7B",
          columns: [
            { label: "0", count: 3 },
            { label: "1", count: 5 },
            { label: "2", count: 4 },
            { label: "3", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. How many students own exactly 2 pets?",
          "4",
          "Each dot is one student. There are 4 dots above the 2, so 4 students own exactly 2 pets.",
        ),
      ),
  ],
  easy: [
    (n) =>
      multi(
        n,
        "Which of these are continuous numerical data? Choose all that are right.",
        [
          "Mass of a newborn joey",
          "Number of cars in a car park",
          "Temperature at noon in Dubbo",
          "Brand of shoe",
          "Time taken to swim 50 m",
        ],
        [0, 2, 4],
        "Continuous data is measured and can take any value in a range, like 2.35 kg or 31.4 seconds. Mass, temperature and time are measured. Number of cars is counted (discrete) and shoe brand is categorical.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["1", "2 5 8"],
            ["2", "0 3 3 7"],
            ["3", "1 4"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows quiz scores, where 1 | 2 means 12. What is the highest score?",
          "34",
          "The highest score is on the last stem with the biggest leaf. Stem 3 and leaf 4 make 34.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A school asks every one of its 820 students which sport they play. Is this a census or a sample?",
        ["Census", "Sample", "Neither", "Both"],
        0,
        "A census collects data from every member of the group. All 820 students were asked, so it is a census.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "How students travel to school",
          columns: [
            { label: "Bus", value: 12 },
            { label: "Car", value: 8 },
            { label: "Walk", value: 6 },
            { label: "Bike", value: 4 },
          ],
          step: 2,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. How many students were surveyed altogether?",
          "30",
          "Add the heights of all the columns: 12 + 8 + 6 + 4 = 30 students.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "In a sector graph of 40 students, the sector for cricket has an angle of 90°. The number of students who chose cricket is ___.",
        "10",
        "A full circle is 360°. 90° is 90/360 = 1/4 of the circle, so 1/4 of 40 students = 10 students.",
      ),
    (n) =>
      ordering(
        n,
        "Put these steps for building a stem-and-leaf plot in order.",
        [
          "Find the smallest and largest values",
          "Write the stems (tens digits) in a column",
          "Write each leaf (ones digit) next to its stem",
          "Rewrite the leaves in order from smallest to largest",
        ],
        "First see what range the stems must cover, then list the stems, then add every leaf, and finally sort the leaves on each stem so the plot is ordered.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Books read in Term 3",
          columns: [
            { label: "1", count: 2 },
            { label: "2", count: 4 },
            { label: "3", count: 6 },
            { label: "4", count: 3 },
            { label: "5", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. What percentage of the students read 4 or more books?",
          ["25%", "25"],
          "Count all the dots: 2 + 4 + 6 + 3 + 1 = 16 students. 4 or more books: 3 + 1 = 4 students. 4/16 = 1/4 = 25%.",
        ),
      ),
    (n) =>
      choice(
        n,
        "In a survey of 60 students, 15 chose swimming. What angle should the swimming sector have in a sector graph?",
        ["15°", "90°", "60°", "25°"],
        1,
        "Swimming is 15/60 = 1/4 of the students. A quarter of 360° is 90°.",
      ),
    (n) =>
      trueFalse(
        n,
        "Asking 50 people at Central Station whether they like catching trains gives a fair sample of what all Sydney residents think.",
        false,
        "People at a train station are more likely to use trains, so the sample is biased. A fair sample should be chosen at random from all Sydney residents.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["4", "1 5 8"],
            ["5", "0 2 2 6 9"],
            ["6", "3 7"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows test marks, where 4 | 1 means 41. What percentage of the marks are greater than 50?",
          ["60%", "60"],
          "There are 3 + 5 + 2 = 10 marks. Greater than 50: 52, 52, 56, 59, 63, 67, which is 6 marks (50 itself is not greater than 50). 6/10 = 60%.",
        ),
      ),
    (n) =>
      multi(
        n,
        "72 students chose their favourite sport. In a sector graph, the angles are Netball 120°, Cricket 90°, Soccer 100° and Other 50°. Choose all that are true.",
        [
          "24 students chose netball",
          "Cricket was chosen by a quarter of the students",
          "20 students chose soccer",
          "Other was chosen by 12 students",
          "More students chose soccer than netball",
        ],
        [0, 1, 2],
        "Each degree stands for 72 ÷ 360 = 0.2 students. Netball 120 × 0.2 = 24, cricket 90 × 0.2 = 18 (90° is a quarter), soccer 100 × 0.2 = 20, other 50 × 0.2 = 10. Netball (24) beats soccer (20).",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "In a survey, 18 students caught the bus, which was 30% of everyone surveyed. In a sector graph of the results, the bus sector has an angle of ___°.",
        "108",
        "The bus sector is 30% of the circle, no matter how many were surveyed. 30% of 360° = 0.3 × 360° = 108°. (There were 60 students, and 18/60 × 360° = 108° too.)",
      ),
  ],
});

/** MA4-DAT-C-01: types of data, census and sample, dot plots, stem-and-leaf plots, column and sector graphs. */
export const DATA_2 = levels(7070116, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which of these is numerical data?",
        ["Favourite colour", "Number of pets", "Hair colour", "Favourite AFL team"],
        1,
        "Numerical data is made of numbers that are counted or measured. Number of pets is counted. The others are names or groups, so they are categorical.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite fruit in 7C",
          columns: [
            { label: "Apple", value: 7 },
            { label: "Banana", value: 5 },
            { label: "Mango", value: 9 },
            { label: "Grapes", value: 3 },
          ],
        },
        choice(
          n,
          "Look at the column graph. Which fruit is the most popular?",
          ["Apple", "Banana", "Mango", "Grapes"],
          2,
          "The tallest column shows the most popular choice. Mango has the tallest column, at 9.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Collecting data from every member of a whole group is called a census.",
        true,
        "A census includes everyone in the group. A sample only uses part of the group.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "These entries come from a stem-and-leaf plot, where 3 | 7 means 37. Put them in order from smallest to largest.",
        ["2 | 9", "3 | 2", "3 | 7", "4 | 0"],
        "Turn each entry into a number: 29, 32, 37 and 40. Compare stems first, then leaves.",
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Siblings of students in 7D",
          columns: [
            { label: "0", count: 4 },
            { label: "1", count: 7 },
            { label: "2", count: 5 },
            { label: "3", count: 2 },
            { label: "4", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. How many students have at least 2 siblings?",
          "8",
          "'At least 2' means 2, 3 or 4 siblings. Add those dots: 5 + 2 + 1 = 8 students.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which of these is discrete numerical data?",
        ["Height of a gum tree", "Number of kookaburras in a tree", "Mass of a wombat", "Favourite Australian bird"],
        1,
        "Discrete data is counted in whole numbers. You count kookaburras. Height and mass are measured (continuous), and favourite bird is categorical.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these are better done with a sample than a census? Choose all that are right.",
        [
          "Testing how long batteries from a factory last (testing uses the battery up)",
          "Finding out what all Australians think of a new coin design",
          "Recording the ages of the 25 students in your class",
          "Checking whether each runner in a 4-person relay team has their uniform",
        ],
        [0, 1],
        "A sample is best when the group is huge or testing destroys the item. Testing every battery would leave none to sell, and asking all 27 million Australians is too costly. Your class and a relay team are small, so a census is easy.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["1", "4 6 9"],
            ["2", "1 1 5 8"],
            ["3", "0 2"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows times in seconds to run around the oval, where 2 | 1 means 21. How many runners took less than 20 seconds?",
          "3",
          "Times less than 20 seconds are on stem 1: 14, 16 and 19. That is 3 runners.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A sector graph shows how 120 students get to school. The Walk sector has an angle of 60°, so ___ students walk.",
        "20",
        "60° out of 360° is 60/360 = 1/6 of the circle. 1/6 of 120 students = 20 students.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Of 45 students surveyed, 9 chose basketball. What angle should the basketball sector have in a sector graph?",
        ["9°", "72°", "45°", "20°"],
        1,
        "Basketball is 9/45 = 1/5 of the students. 1/5 of 360° = 72°.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cans collected for recycling",
          columns: [
            { label: "Mon", value: 25 },
            { label: "Tue", value: 15 },
            { label: "Wed", value: 30 },
            { label: "Thu", value: 10 },
            { label: "Fri", value: 20 },
          ],
          step: 5,
        },
        typed(
          "short_answer",
          n,
          "Look at the column graph. What percentage of all the cans were collected on Wednesday?",
          ["30%", "30"],
          "Total cans: 25 + 15 + 30 + 10 + 20 = 100. Wednesday had 30 out of 100, which is 30%.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A dot plot is a good way to show 30 students' exact heights measured to the nearest millimetre.",
        false,
        "Exact heights are continuous and almost every value would be different, so each dot would sit alone above its own label. A stem-and-leaf plot or grouped column graph works better.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Goals per game for the Wollongong under-13s",
          columns: [
            { label: "0", count: 3 },
            { label: "1", count: 5 },
            { label: "2", count: 4 },
            { label: "3", count: 2 },
            { label: "4", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Each dot is one soccer game. How many goals did the team score altogether over the season?",
          "23",
          "Multiply each number of goals by its number of games: 0 × 3 + 1 × 5 + 2 × 4 + 3 × 2 + 4 × 1 = 0 + 5 + 8 + 6 + 4 = 23 goals.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["5", "2 4 4 7"],
            ["6", "0 3 5 5 8"],
            ["7", "1 6"],
            ["8", "4"],
          ],
        },
        multi(
          n,
          "This stem-and-leaf plot shows students' resting heart rates in beats per minute, where 5 | 2 means 52. Choose all that are true.",
          [
            "There are 12 values",
            "The largest value is 78",
            "Five values are in the 60s",
            "Exactly half of the values are less than 62",
            "Two values are 70 or more",
          ],
          [0, 2],
          "The values are 52, 54, 54, 57, 60, 63, 65, 65, 68, 71, 76, 84: that is 12 values. The largest is 84, not 78. The 60s hold 60, 63, 65, 65, 68 (five). Only 5 values are less than 62, not 6. Three values (71, 76, 84) are 70 or more.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A sector graph shows how the 30 students in 7E get to school. The Car sector is 84° and the Bus sector is twice as big. How many more students travel by bus than by car?",
        "7",
        "Each student is 360° ÷ 30 = 12°. Car: 84 ÷ 12 = 7 students. Bus: 168° ÷ 12 = 14 students. 14 − 7 = 7 more students.",
      ),
  ],
});

/** MA4-PRO-C-01: sample spaces, probability as a fraction, decimal and percentage, complementary events, relative frequency. */
export const PROBABILITY = levels(7070201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "yellow"] },
        choice(
          n,
          "What is the sample space for one spin of this spinner?",
          ["{red, blue, green, yellow}", "{red, blue}", "{1, 2, 3, 4}", "{red}"],
          0,
          "The sample space lists every possible outcome. The spinner can land on red, blue, green or yellow.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A fair six-sided die is rolled. What is the probability of rolling a 4? Write it as a fraction.",
        "1/6",
        "There are 6 equally likely outcomes and only one of them is a 4, so P(4) = 1/6.",
      ),
    (n) => trueFalse(n, "A probability of 0.5 is the same as a probability of 50%.", true, "0.5 = 50/100 = 50%. Both mean an even chance."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "blue", count: 5 },
            { colour: "green", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "One counter is taken from this bag without looking. What is the probability it is blue? Write it as a fraction.",
          ["1/2", "5/10"],
          "There are 3 + 5 + 2 = 10 counters and 5 are blue. P(blue) = 5/10 = 1/2.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The probability of rain tomorrow in Bathurst is 0.3. The probability of no rain is ___.",
        "0.7",
        "Rain and no rain are complementary events, so their probabilities add to 1. 1 − 0.3 = 0.7.",
      ),
    (n) =>
      multi(
        n,
        "A card is picked at random from cards numbered 1 to 10. Which events have a probability of 1/2? Choose all that are right.",
        [
          "Picking an even number",
          "Picking an odd number",
          "Picking a number greater than 5",
          "Picking a multiple of 3",
          "Picking a prime number",
        ],
        [0, 1, 2],
        "Even (2, 4, 6, 8, 10), odd (1, 3, 5, 7, 9) and greater than 5 (6 to 10) each have 5 of the 10 cards, so 5/10 = 1/2. Multiples of 3 are 3, 6, 9 (3/10) and primes are 2, 3, 5, 7 (4/10).",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "A normal die is rolled once. Put these events from least likely to most likely.",
        ["Rolling a 7", "Rolling a 6", "Rolling an even number", "Rolling a number less than 6", "Rolling a number from 1 to 6"],
        "The probabilities are 0 (impossible), 1/6, 3/6, 5/6 and 1 (certain).",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Result", "Frequency"],
          rows: [
            ["Heads", 23],
            ["Tails", 27],
          ],
        },
        typed(
          "short_answer",
          n,
          "Jarrah tossed a coin 50 times. What is the relative frequency of heads? Write it as a decimal.",
          ["0.46", "23/50", "46%"],
          "Relative frequency = number of times it happened ÷ number of trials = 23 ÷ 50 = 0.46.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Two coins are tossed together. How many outcomes are in the sample space?",
        ["2", "3", "4", "6"],
        2,
        "List them: HH, HT, TH, TT. Heads-tails and tails-heads are different outcomes, so there are 4.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "red", "red", "blue", "blue", "green", "green", "green"] },
        typed(
          "short_answer",
          n,
          "What is the probability that this spinner does NOT land on blue? Write it as a percentage.",
          ["75%", "75"],
          "2 of the 8 sections are blue, so 6 are not blue. P(not blue) = 6/8 = 3/4 = 75%.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A bag holds only red and green marbles. The probability of picking red is 2/5. There are 12 green marbles. How many red marbles are there?",
        ["8", "12", "20", "5"],
        0,
        "P(green) = 1 − 2/5 = 3/5, so 12 marbles are 3/5 of the bag. 1/5 is 4 marbles, so the bag holds 20. Red = 2/5 of 20 = 8.",
      ),
    (n) =>
      trueFalse(
        n,
        "Luca tossed a coin 10 times and got 7 heads. This proves the coin is unfair.",
        false,
        "With only 10 tosses, results often wander away from half heads by chance. You need many more trials before saying a coin is unfair.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "A die was rolled 60 times and a 6 came up 18 times. Choose all that are true.",
        [
          "The relative frequency of a 6 is 0.3",
          "The theoretical probability of a 6 on a fair die is 1/6",
          "The die must be biased",
          "For a fair die, the relative frequency of a 6 should get closer to 1/6 with many more rolls",
          "The relative frequency of not rolling a 6 is 0.6",
        ],
        [0, 1, 3],
        "18/60 = 0.3. A fair die gives P(6) = 1/6. 60 rolls is not enough to be sure it is biased. More trials bring relative frequency closer to the true probability. Not a 6: 42/60 = 0.7, not 0.6.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A drawing pin landed point up 36 times in 120 throws. Using this result, about how many times would you expect it to land point up in 500 throws?",
        "150",
        "Relative frequency = 36 ÷ 120 = 0.3. Expected number = 0.3 × 500 = 150.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Colour", "Times landed"],
          rows: [
            ["Red", 18],
            ["Blue", 32],
            ["Green", 30],
          ],
        },
        choice(
          n,
          "A spinner with equal sections was spun 80 times. Which spinner most likely gave these results?",
          [
            "1 red, 2 blue and 2 green sections",
            "2 red, 1 blue and 1 green section",
            "1 red, 1 blue and 1 green section",
            "1 red, 3 blue and 1 green section",
          ],
          0,
          "Red came up about 18/80 ≈ 1/5 of the time, and blue and green each about 2/5. A spinner with 1 red, 2 blue and 2 green sections gives 1/5, 2/5, 2/5, which would expect 16, 32 and 32 out of 80.",
        ),
      ),
  ],
});

/** MA4-PRO-C-01: sample spaces, probability as a fraction, decimal and percentage, complementary events, relative frequency. */
export const PROBABILITY_2 = levels(7070216, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many outcomes are in the sample space when you roll a normal six-sided die once?",
        "6",
        "The sample space is {1, 2, 3, 4, 5, 6}, which has 6 outcomes.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "blue", "red", "yellow"] },
        choice(
          n,
          "What is the probability that this spinner lands on blue?",
          ["1/2", "1/4", "2/3", "1/3"],
          0,
          "2 of the 4 equal sections are blue, so P(blue) = 2/4 = 1/2.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which number is the probability of an impossible event?",
        ["0", "1", "0.5", "−1"],
        0,
        "Probabilities go from 0 to 1. An impossible event has probability 0, and a certain event has probability 1.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "yellow", count: 4 },
            { colour: "purple", count: 6 },
            { colour: "orange", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "One counter is picked from this bag without looking. What is the probability it is yellow? Write it as a fraction in simplest form.",
          ["1/3", "4/12"],
          "There are 4 + 6 + 2 = 12 counters and 4 are yellow. P(yellow) = 4/12 = 1/3.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "When a die is rolled, 'rolling an even number' and 'rolling an odd number' are complementary events.",
        true,
        "Every roll is either even or odd, never both, so together they cover the whole sample space. That makes them complementary.",
      ),
    (n) =>
      ordering(
        n,
        "Put these probabilities in order from smallest to largest.",
        ["1/5", "0.25", "30%", "2/5", "0.45"],
        "Write them all as decimals: 1/5 = 0.2, 0.25, 30% = 0.3, 2/5 = 0.4, 0.45.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "The probability that a netball team wins its next game is 35%. The probability that it does not win is ___%.",
        "65",
        "Winning and not winning are complementary, so they add to 100%. 100% − 35% = 65%.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Bus arrival", "Days"],
          rows: [
            ["On time", 28],
            ["Late", 12],
          ],
        },
        typed(
          "short_answer",
          n,
          "Mei recorded her school bus for 40 days. What is the relative frequency of the bus being late? Write it as a fraction in simplest form.",
          ["3/10", "12/40", "0.3", "30%"],
          "The bus was late 12 times in 40 days. 12/40 = 3/10.",
        ),
      ),
    (n) =>
      multi(
        n,
        "One letter is picked at random from the word KANGAROO. Choose all that are true.",
        ["P(A) = 1/4", "P(vowel) = 1/2", "P(K) = 1/7", "P(O) = P(A)", "P(Z) = 1/8"],
        [0, 1, 3],
        "KANGAROO has 8 letters. A appears 2 times (2/8 = 1/4) and O appears 2 times, so P(O) = P(A). Vowels A, A, O, O give 4/8 = 1/2. P(K) = 1/8, and P(Z) = 0.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "A spinner has red, blue and green sections. P(red) = 0.45 and P(blue) = 0.3. What is P(green)?",
        ["0.25", "0.75", "0.15", "0.55"],
        0,
        "All the probabilities add to 1. 0.45 + 0.3 = 0.75, so P(green) = 1 − 0.75 = 0.25.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A coin is tossed and a six-sided die is rolled at the same time. How many outcomes are in the sample space?",
        "12",
        "Each of the 2 coin results (H, T) goes with each of the 6 die results: H1 to H6 and T1 to T6. 2 × 6 = 12 outcomes.",
      ),
    (n) =>
      pic(
        {
          kind: "spinner",
          sections: ["red", "red", "red", "red", "blue", "blue", "blue", "green", "green", "yellow"],
        },
        choice(
          n,
          "This spinner is spun 200 times. About how many times would you expect it to land on yellow?",
          ["20", "10", "40", "1"],
          0,
          "1 of the 10 equal sections is yellow, so P(yellow) = 1/10. Expected number = 1/10 × 200 = 20.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag holds 40 lollies. P(red) = 0.15 and P(green) = 3/8. How many lollies are neither red nor green?",
        "19",
        "Red: 0.15 × 40 = 6. Green: 3/8 × 40 = 15. Neither: 40 − 6 − 15 = 19.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Number rolled", "Frequency"],
          rows: [
            ["1", 6],
            ["2", 9],
            ["3", 8],
            ["4", 10],
            ["5", 7],
            ["6", 10],
          ],
        },
        multi(
          n,
          "Ella rolled a die 50 times. Choose all that are true about her results.",
          [
            "The relative frequency of a 4 is 0.2",
            "The relative frequency of an even number is 0.58",
            "The relative frequency of a 1 is 0.12",
            "These results prove the die is biased",
            "The relative frequency of a 2 is 9%",
          ],
          [0, 1, 2],
          "4: 10/50 = 0.2. Even: (9 + 10 + 10)/50 = 29/50 = 0.58. 1: 6/50 = 0.12. 2: 9/50 = 18%, not 9%. 50 rolls are too few to prove bias.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Mia says: 'When I roll a die I either get a 6 or I don't, so P(6) = 1/2.' What is wrong with her thinking?",
        [
          "The two outcomes are not equally likely: P(6) = 1/6 and P(not 6) = 5/6",
          "Nothing, she is right",
          "P(6) is 1/2 only on a fair die",
          "P(not 6) should be 1/6",
        ],
        0,
        "'6' is 1 outcome and 'not 6' is 5 outcomes out of the 6 equally likely outcomes. Two possible events does not mean each has probability 1/2. P(6) = 1/6, P(not 6) = 5/6.",
      ),
  ],
});
