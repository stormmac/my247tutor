/**
 * Year 2 Mathematics (part B): measurement, time, shapes, objects and position. Two sets of 15
 * questions for each Stage 1 standard (NESA outcome), three at each level from very easy to very
 * hard. The `_2` set of each standard asks different questions from the first.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** A town map for POSITION. */
const TOWN: Picture = {
  kind: "grid",
  columns: 6,
  rows: 5,
  map: true,
  points: [
    { x: 0, y: 0, label: "Home" },
    { x: 0, y: 3, label: "Pool" },
    { x: 2, y: 3, label: "Park" },
    { x: 4, y: 1, label: "Shop" },
    { x: 4, y: 4, label: "School" },
  ],
};

/** A camping ground map for POSITION_2. */
const CAMP: Picture = {
  kind: "grid",
  columns: 6,
  rows: 5,
  map: true,
  points: [
    { x: 0, y: 1, label: "Tent" },
    { x: 3, y: 1, label: "BBQ" },
    { x: 3, y: 4, label: "Lake" },
    { x: 1, y: 3, label: "Swings" },
    { x: 5, y: 0, label: "Toilets" },
  ],
};

/** MA1-GM-02: lengths in uniform informal units, metres and centimetres. */
export const LENGTH = levels(2050101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 6, object: "pencil" },
        typed("short_answer", n, "How long is the pencil?", ["6", "6 cm"], "The pencil starts at 0 and ends at 6, so it is 6 cm long."),
      ),
    (n) =>
      choice(
        n,
        "Which unit is best for measuring the length of the classroom?",
        ["metres", "centimetres", "kilograms", "litres"],
        0,
        "A classroom is long, so metres are best. Centimetres are for small things.",
      ),
    (n) => trueFalse(n, "A metre is longer than a centimetre.", true, "A metre is 100 centimetres, so it is much longer."),
  ],
  easy: [
    (n) => typed("fill_blank", n, "1 metre = ___ centimetres", "100", "There are 100 centimetres in 1 metre."),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 9, object: "ribbon" },
        choice(
          n,
          "How long is the ribbon?",
          ["9 cm", "10 cm", "8 cm", "12 cm"],
          0,
          "The ribbon starts at 0 and ends at 9, so it is 9 cm long.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ava measures her desk with paper clips. Then she measures it with pencils. Which gives the bigger number?",
        ["paper clips", "pencils", "They give the same number"],
        0,
        "Paper clips are shorter than pencils, so it takes more of them to cover the desk.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these lengths in order from shortest to longest.",
        ["8 cm", "30 cm", "1 m", "2 m"],
        "1 m is 100 cm and 2 m is 200 cm. So the order is 8 cm, 30 cm, 1 m, 2 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack's pencil is 14 cm long. Mia's pencil is 9 cm long. How much longer is Jack's pencil?",
        ["5", "5 cm"],
        "Find the difference: 14 − 9 = 5. Jack's pencil is 5 cm longer.",
      ),
    (n) =>
      multi(
        n,
        "Which things are longer than 1 metre? Choose all that are right.",
        ["a car", "a netball court", "an eraser", "a teaspoon", "a school bus"],
        [0, 1, 4],
        "A car, a netball court and a school bus are all longer than a big step. An eraser and a teaspoon are short.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 13, object: "pencil" },
        typed(
          "short_answer",
          n,
          "Look at the pencil. Sam's crayon is 5 cm shorter. How long is Sam's crayon?",
          ["8", "8 cm"],
          "The pencil is 13 cm long. 13 − 5 = 8, so the crayon is 8 cm long.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A skipping rope is 2 metres long. How many centimetres is that?",
        ["200", "20", "2", "102"],
        0,
        "1 metre is 100 cm, so 2 metres is 100 + 100 = 200 cm.",
      ),
    (n) =>
      trueFalse(
        n,
        "Lily measures a table and gets 8 hand spans. Her dad gets 5 hand spans. So the table is shorter for her dad.",
        false,
        "It is the same table. Dad's hand span is bigger, so he needs fewer. That is why we use units that are all the same size.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A ribbon is 1 metre long. Ella cuts off 35 cm. How many centimetres are left?",
        ["65", "65 cm"],
        "1 metre is 100 cm. 100 − 35 = 65, so 65 cm is left.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A wombat walks 20 m to a log. It walks 20 m back. Then it walks 15 m to its burrow. How far does it walk altogether?",
        ["55", "55 m"],
        "Add the three parts: 20 + 20 = 40, and 40 + 15 = 55. It walks 55 m.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mel puts 4 rulers end to end along a bench. Each ruler is 30 cm long. How many centimetres long is the bench?",
        ["120", "120 cm"],
        "Count by 30s: 30, 60, 90, 120. The bench is 120 cm long.",
      ),
  ],
});

/** MA1-GM-02: lengths in uniform informal units, metres and centimetres (second set). */
export const LENGTH_2 = levels(2050116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "ruler", cm: 10, length: 4, object: "pencil" },
        choice(
          n,
          "How long is the pencil?",
          ["4 cm", "5 cm", "3 cm", "10 cm"],
          0,
          "The pencil starts at 0 and ends at 4, so it is 4 cm long.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "When we measure with paper clips, we put them end to end with no gaps.",
        true,
        "Gaps or overlaps make the answer wrong, so the paper clips must touch end to end.",
      ),
    (n) =>
      choice(
        n,
        "Which is longer?",
        ["1 metre", "30 centimetres", "They are the same"],
        0,
        "1 metre is 100 centimetres, and 100 is more than 30.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A stick is 7 paper clips long. A rope is 12 paper clips long. How many paper clips longer is the rope?",
        "5",
        "12 − 7 = 5, so the rope is 5 paper clips longer.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 15, length: 11, object: "ribbon" },
        typed(
          "short_answer",
          n,
          "How many centimetres long is the ribbon?",
          ["11", "11 cm"],
          "The ribbon starts at 0 and ends at 11, so it is 11 cm long.",
        ),
      ),
    (n) => typed("fill_blank", n, "100 centimetres = ___ metre", "1", "100 centimetres make 1 metre."),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Which is the best estimate for the length of a teaspoon?",
        ["15 cm", "15 m", "1 m", "1 cm"],
        0,
        "A teaspoon is a bit longer than your hand is wide, about 15 cm. 1 cm is tiny and 1 m is as long as a big step.",
      ),
    (n) =>
      multi(
        n,
        "Which would you measure in metres? Choose all that are right.",
        ["a swimming pool", "a gum tree's height", "an ant", "a cricket pitch", "a fingernail"],
        [0, 1, 3],
        "Big things like a pool, a gum tree and a cricket pitch are measured in metres. An ant and a fingernail are tiny, so we use centimetres.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from longest to shortest.",
        ["a school hall", "a kangaroo's tail", "a crayon", "a grain of rice"],
        "A hall is many metres long, a kangaroo's tail is about 1 metre, a crayon is a few centimetres and a grain of rice is tiny.",
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "Zac measures a rug with pencils but leaves gaps between them. His answer will be too small.",
        true,
        "The gaps are not counted, so he counts fewer pencils than the rug really needs. His number is too small.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ruby's block tower is 46 cm tall. Ben's tower is 29 cm tall. How much taller is Ruby's tower?",
        ["17", "17 cm"],
        "Find the difference: 46 − 29 = 17. Ruby's tower is 17 cm taller.",
      ),
    (n) =>
      pic(
        { kind: "ruler", cm: 12, length: 7, object: "pencil" },
        choice(
          n,
          "Look at the pencil. How many more centimetres would make it 10 cm long?",
          ["3 cm", "7 cm", "10 cm", "17 cm"],
          0,
          "The pencil is 7 cm long. Count on from 7 to 10: that is 3 more centimetres.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A python is 2 m long. A brown snake is 85 cm long. How many centimetres longer is the python?",
        ["115", "115 cm"],
        "2 m is 200 cm. 200 − 85 = 115, so the python is 115 cm longer.",
      ),
    (n) =>
      choice(
        n,
        "Each of Kai's steps is about 50 cm long. He takes 4 steps. About how far does he walk?",
        ["2 m", "4 m", "50 cm", "54 cm"],
        0,
        "4 steps of 50 cm is 50 + 50 + 50 + 50 = 200 cm, and 200 cm is 2 m.",
      ),
    (n) => typed("fill_blank", n, "1 m and 40 cm = ___ cm", "140", "1 m is 100 cm. 100 + 40 = 140 cm."),
  ],
});

/** MA1-2DS-02: areas measured with uniform informal units in rows and columns. */
export const AREA = levels(2050201, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 4,
          rows: 3,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
          ],
        },
        typed("short_answer", n, "How many squares are shaded?", "6", "There are 2 rows of 3 shaded squares. 3 + 3 = 6."),
      ),
    (n) => trueFalse(n, "Area is how much surface a shape covers.", true, "Area tells us how much space the top of a shape covers."),
    (n) =>
      choice(
        n,
        "Which has the bigger area?",
        ["a beach towel", "a postage stamp"],
        0,
        "A beach towel covers much more space than a tiny stamp.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [4, 2],
            [0, 2],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "This rectangle is covered with squares. What is its area in squares?",
          ["8", "8 squares"],
          "There are 2 rows with 4 squares in each row. 4 + 4 = 8 squares.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is best for measuring the area of a desk?",
        ["sticky notes", "a piece of string", "a cup", "a ruler"],
        0,
        "Sticky notes are all the same size and can cover the desk with no gaps.",
      ),
    (n) =>
      multi(
        n,
        "When we measure area, what should the units do? Choose all that are right.",
        ["be all the same size", "cover the shape with no gaps", "overlap each other", "be different sizes"],
        [0, 1],
        "Units must be the same size and cover the shape with no gaps and no overlaps.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "A rug is covered by 3 rows of tiles. There are 5 tiles in each row. How many tiles are there?",
        ["15", "8", "35", "10"],
        0,
        "Count 3 rows of 5: 5, 10, 15. There are 15 tiles.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 5,
          rows: 4,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
            [0, 1],
            [0, 2],
            [0, 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "What is the area of the shaded shape in squares?",
          ["7", "7 squares"],
          "There are 4 squares along the bottom and 3 more going up the side. 4 + 3 = 7.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these from smallest area to largest area.",
        ["a stamp", "a playing card", "a pillow", "a tennis court"],
        "A stamp is tiny, a playing card is a bit bigger, a pillow is bigger again and a tennis court is huge.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Ollie covers a book with 12 sticky notes. Grace covers the same book with 6 cards. Why are the numbers different?",
        ["The cards are bigger, so fewer are needed", "Grace's book is smaller", "Ollie's book is bigger", "The sticky notes are bigger"],
        0,
        "It is the same book. Bigger units cover more each, so Grace needs fewer cards.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [5, 3],
            [0, 3],
          ],
          grid: true,
        },
        choice(
          n,
          "Which way finds the area of this rectangle?",
          ["3 rows of 5 = 15", "3 + 5 = 8", "5 rows of 5 = 25", "3 rows of 3 = 9"],
          0,
          "There are 3 rows with 5 squares in each row. 5, 10, 15. The area is 15 squares.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A shape with 2 rows of 6 squares has the same area as a shape with 3 rows of 4 squares.",
        true,
        "2 rows of 6 is 12 squares. 3 rows of 4 is also 12 squares. So the areas are the same.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A garden path has 4 rows of pavers with 5 in each row. Dad takes away 1 row. How many pavers are left?",
        "15",
        "After taking 1 row away, 3 rows are left. 3 rows of 5 is 5, 10, 15.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 4,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [0, 2],
            [1, 2],
            [2, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "Mia wants to shade the whole grid. How many more squares does she need to shade?",
          "15",
          "The grid has 4 rows of 6, which is 24 squares. 9 are shaded. 24 − 9 = 15 more.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which shapes have an area of 12 squares? Choose all that are right.",
        ["3 rows of 4 squares", "2 rows of 6 squares", "5 rows of 2 squares", "4 rows of 4 squares", "6 rows of 2 squares"],
        [0, 1, 4],
        "3 rows of 4, 2 rows of 6 and 6 rows of 2 all make 12. 5 rows of 2 is 10 and 4 rows of 4 is 16.",
      ),
  ],
});

/** MA1-2DS-02: areas measured with uniform informal units in rows and columns (second set). */
export const AREA_2 = levels(2050216, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [3, 0],
            [3, 3],
            [0, 3],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Count the squares. What is the area of this shape?",
          ["9", "9 squares"],
          "There are 3 rows of 3 squares. 3, 6, 9.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which covers the biggest area?",
        ["a netball court", "a beach towel", "a book cover"],
        0,
        "A netball court covers far more ground than a towel or a book.",
      ),
    (n) =>
      trueFalse(
        n,
        "When we measure area, it is fine to leave gaps between the units.",
        false,
        "Gaps are not counted, so the answer would be too small. Units must cover the shape with no gaps.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 5,
          rows: 3,
          cells: [
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
          ],
        },
        choice(
          n,
          "How many squares are shaded?",
          ["5", "4", "6", "15"],
          0,
          "There are 4 shaded squares in the row and 1 on top. 4 + 1 = 5.",
        ),
      ),
    (n) => typed("fill_blank", n, "2 rows of 5 squares make ___ squares.", "10", "5 + 5 = 10, so 2 rows of 5 make 10 squares."),
    (n) =>
      choice(
        n,
        "Jy's rug is covered by 9 tiles. Ana's rug is covered by 14 of the same tiles. Whose rug has the bigger area?",
        ["Ana's", "Jy's", "They are the same"],
        0,
        "The tiles are the same size, and Ana's rug needs more of them. So Ana's rug is bigger.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 2],
            [0, 2],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "What is the area of this rectangle in squares?",
          ["12", "12 squares"],
          "There are 2 rows with 6 squares in each row. 6 + 6 = 12.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from smallest area to largest area.",
        ["a coin", "an envelope", "a door", "a basketball court"],
        "A coin is tiny, then an envelope, then a door, and a basketball court is the biggest.",
      ),
    (n) =>
      multi(
        n,
        "Which are good units for measuring the area of a table? Choose all that are right.",
        ["sticky notes", "playing cards", "pencils", "exercise books", "string"],
        [0, 1, 3],
        "Sticky notes, playing cards and exercise books are flat and cover the table. Pencils and string measure length, not area.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A tile pattern has 4 rows. Each row has 6 tiles. How many tiles are there altogether?",
        "24",
        "Count 4 rows of 6: 6, 12, 18, 24.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 7,
          rows: 4,
          cells: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
            [4, 0],
            [5, 0],
            [4, 1],
            [5, 1],
            [4, 2],
            [5, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "Two shapes are shaded. How many more squares does the right shape have than the left shape?",
          "2",
          "The left shape has 4 squares. The right shape has 3 rows of 2, which is 6. 6 − 4 = 2.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Two shapes can look different but still have the same area.",
        true,
        "A row of 4 squares and a 2 by 2 square look different, but both cover 4 squares.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Jo covers a poster with 8 big cards. Each big card is the same as 2 small cards. How many small cards would cover the poster?",
        ["16", "10", "4", "6"],
        0,
        "Each big card needs 2 small cards. 8 lots of 2 is 16.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [4, 2],
            [2, 2],
            [2, 4],
            [0, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "What is the area of this shape in squares?",
          ["12", "12 squares"],
          "The bottom part is 2 rows of 4, which is 8. The top part is 2 rows of 2, which is 4. 8 + 4 = 12.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Leo has 18 tiles. He makes a rectangle with 3 rows that are all the same. How many tiles are in each row?",
        "6",
        "Share 18 into 3 equal rows: 6 + 6 + 6 = 18. Each row has 6 tiles.",
      ),
  ],
});

/** MA1-3DS-02: capacities and volumes measured with uniform informal units. */
export const CAPACITY = levels(2050301, {
  very_easy: [
    (n) =>
      choice(n, "Which holds more water?", ["a bucket", "a teacup"], 0, "A bucket is much bigger inside than a teacup, so it holds more."),
    (n) => trueFalse(n, "Capacity is how much a container can hold.", true, "Capacity tells us how much fits inside a container."),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 1, height: 1 },
        typed("short_answer", n, "How many cubes make this model?", "4", "Count the cubes in the row: 1, 2, 3, 4."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cups of water to fill each container",
          columns: [
            { label: "Vase", value: 5 },
            { label: "Bottle", value: 3 },
            { label: "Bowl", value: 7 },
          ],
          step: 1,
        },
        choice(
          n,
          "Look at the graph. Which container holds the most?",
          ["the bowl", "the vase", "the bottle"],
          0,
          "The bowl has the tallest column. It takes 7 cups, more than the others.",
        ),
      ),
    (n) => typed("fill_blank", n, "A jug holds 6 cups. 2 jugs hold ___ cups.", "12", "6 + 6 = 12, so 2 jugs hold 12 cups."),
    (n) =>
      ordering(
        n,
        "Put these in order from holds the least to holds the most.",
        ["a teaspoon", "a mug", "a bucket", "a bath"],
        "A teaspoon holds a tiny bit, a mug holds more, a bucket more again, and a bath holds the most.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cups of water to fill each container",
          columns: [
            { label: "Vase", value: 5 },
            { label: "Bottle", value: 3 },
            { label: "Bowl", value: 7 },
          ],
          step: 1,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many more cups does the bowl hold than the bottle?",
          ["4", "4 cups"],
          "The bowl holds 7 cups and the bottle holds 3. 7 − 3 = 4.",
        ),
      ),
    (n) =>
      multi(
        n,
        "We compare containers by filling them with cups of water. What should we do? Choose all that are right.",
        ["use the same size cup each time", "fill each cup to the top", "use a different cup for each container", "spill some water"],
        [0, 1],
        "To be fair, use the same cup every time and fill it to the top each time.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 1 },
        typed("short_answer", n, "How many cubes are in this model?", "6", "There are 2 rows of 3 cubes. 3 + 3 = 6."),
      ),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "Ned fills a bottle with 8 small cups. Kim fills the same bottle with 4 big cups. So the bottle holds more for Ned.",
        false,
        "It is the same bottle, so it holds the same amount. Ned's cups are smaller, so he needs more of them.",
      ),
    (n) =>
      choice(
        n,
        "A bucket holds 10 cups of water. Amir has poured in 4 cups. How many more cups will fill it?",
        ["6", "14", "4", "10"],
        0,
        "Count on from 4 to 10: that is 6 more cups. Or 10 − 4 = 6.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 2, width: 2, height: 2 },
        choice(
          n,
          "How many cubes are in this model?",
          ["8", "4", "6", "12"],
          0,
          "There are 2 layers. Each layer has 2 rows of 2, which is 4. 4 + 4 = 8. Some cubes are hidden at the back.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A water bottle holds 3 cups. How many cups do 5 bottles hold?",
        ["15", "15 cups"],
        "Count by 3s five times: 3, 6, 9, 12, 15.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Container", "Scoops of sand"],
          rows: [
            ["Bucket", 12],
            ["Pot", 7],
            ["Tub", 15],
          ],
        },
        choice(
          n,
          "Look at the table. How many scoops do the pot and the bucket hold together?",
          ["19", "22", "27", "5"],
          0,
          "The bucket holds 12 and the pot holds 7. 12 + 7 = 19.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Container A holds 9 cups. Container B holds 3 cups less than A. Container C holds 2 cups more than B. Which holds the most?",
        ["Container A", "Container B", "Container C"],
        0,
        "B holds 9 − 3 = 6 cups. C holds 6 + 2 = 8 cups. A holds 9, which is the most.",
      ),
  ],
});

/** MA1-3DS-02: capacities and volumes measured with uniform informal units (second set). */
export const CAPACITY_2 = levels(2050316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 1, height: 1 },
        choice(n, "How many cubes long is this model?", ["5", "4", "6", "1"], 0, "Count the cubes along the row: 1, 2, 3, 4, 5."),
      ),
    (n) =>
      choice(
        n,
        "Which holds the least?",
        ["an egg cup", "a saucepan", "a wheelie bin"],
        0,
        "An egg cup is very small inside, so it holds the least.",
      ),
    (n) => trueFalse(n, "A full bath holds more water than a full glass.", true, "A bath is much bigger inside than a glass."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Cups to fill each bottle",
          thing: "cups",
          each: 1,
          rows: [
            { label: "Red bottle", count: 4 },
            { label: "Blue bottle", count: 6 },
            { label: "Green bottle", count: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many cups does the blue bottle hold?",
          ["6", "6 cups"],
          "Count the stars for the blue bottle: 6.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Cups to fill each bottle",
          thing: "cups",
          each: 1,
          rows: [
            { label: "Red bottle", count: 4 },
            { label: "Blue bottle", count: 6 },
            { label: "Green bottle", count: 3 },
          ],
        },
        choice(
          n,
          "Look at the graph. Which bottle holds the least?",
          ["the green bottle", "the red bottle", "the blue bottle"],
          0,
          "The green bottle has the fewest stars, only 3 cups.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A pot holds 9 cups. It has 5 cups in it. It needs ___ more cups to be full.",
        "4",
        "Count on from 5 to 9: 6, 7, 8, 9. That is 4 more cups.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 2, height: 1 },
        typed("short_answer", n, "How many cubes are in this model?", "8", "There are 2 rows of 4 cubes. 4 + 4 = 8."),
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from holds the most to holds the least.",
        ["a swimming pool", "a bath", "a bucket", "a cup"],
        "A pool holds the most, then a bath, then a bucket, and a cup holds the least.",
      ),
    (n) =>
      multi(
        n,
        "Which are good units for measuring how much a container holds? Choose all that are right.",
        ["cups", "spoons", "scoops", "rulers", "paper clips"],
        [0, 1, 2],
        "Cups, spoons and scoops can be filled and poured. Rulers and paper clips measure length.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A full rainwater tank holds 20 buckets of water. 7 buckets are used on the garden. How many buckets are left?",
        ["13", "13 buckets"],
        "20 − 7 = 13. There are 13 buckets of water left.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 2 },
        choice(
          n,
          "How many cubes are in this model?",
          ["12", "7", "10", "6"],
          0,
          "Each layer has 2 rows of 3, which is 6. There are 2 layers. 6 + 6 = 12.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Using the same cup, a jar holds 5 cups and a vase holds 5 cups. So they hold the same amount.",
        true,
        "Both were filled with the same cup and both took 5, so they hold the same amount.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "One jug fills 3 glasses. How many jugs are needed to fill 12 glasses?",
        ["4", "3", "9", "36"],
        0,
        "Count by 3s until you reach 12: 3, 6, 9, 12. That is 4 jugs.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Scoops of rice to fill each jar",
          columns: [
            { label: "Jar A", value: 8 },
            { label: "Jar B", value: 12 },
            { label: "Jar C", value: 6 },
          ],
          step: 2,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many scoops do all three jars hold together?",
          ["26", "26 scoops"],
          "Jar A holds 8, Jar B holds 12 and Jar C holds 6. 8 + 12 = 20, and 20 + 6 = 26.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ivy builds a model with 3 layers of cubes. Each layer has 4 cubes. She takes off the top layer. How many cubes are left?",
        "8",
        "Taking off 1 layer leaves 2 layers. 2 layers of 4 is 4 + 4 = 8.",
      ),
  ],
});

/** MA1-NSM-01: masses compared with uniform informal units and balance scales. */
export const MASS = levels(2050401, {
  very_easy: [
    (n) =>
      choice(
        n,
        "A balance scale tips down on one side. Which side is heavier?",
        ["the side that goes down", "the side that goes up"],
        0,
        "The heavier side pushes down, so the side that goes down is heavier.",
      ),
    (n) => trueFalse(n, "A brick is heavier than a feather.", true, "A brick is very heavy and a feather is very light."),
    (n) => choice(n, "Which is the lightest?", ["a leaf", "a watermelon", "a school bag"], 0, "A leaf is so light it can blow away."),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A teddy balances 9 blocks. A ball balances 6 of the same blocks. How many more blocks does the teddy balance?",
        "3",
        "9 − 6 = 3. The teddy balances 3 more blocks.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Fruit", "Marbles to balance"],
          rows: [
            ["Apple", 12],
            ["Orange", 15],
            ["Lemon", 9],
          ],
        },
        choice(
          n,
          "Look at the table. Which fruit is the heaviest?",
          ["the orange", "the apple", "the lemon"],
          0,
          "The orange needs the most marbles to balance it, 15, so it is the heaviest.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "When both sides of a balance scale are level, the two things have the ___ mass.",
        ["same", "equal"],
        "Level means neither side is heavier, so the masses are the same.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Fruit", "Marbles to balance"],
          rows: [
            ["Apple", 12],
            ["Orange", 15],
            ["Lemon", 9],
          ],
        },
        ordering(
          n,
          "Look at the table. Put the fruit in order from lightest to heaviest.",
          ["lemon", "apple", "orange"],
          "The lemon needs 9 marbles, the apple 12 and the orange 15. Fewer marbles means lighter.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which are good units to use on a balance scale? Choose all that are right.",
        [
          "marbles that are all the same",
          "blocks that are all the same",
          "a mix of rocks",
          "pegs that are all the same",
          "toys of all sizes",
        ],
        [0, 1, 3],
        "Units must all be the same mass. Same marbles, same blocks and same pegs work. Mixed rocks and toys do not.",
      ),
    (n) =>
      trueFalse(n, "A big object is always heavier than a small object.", false, "Not always. A big balloon is lighter than a small rock."),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A pencil case balances 14 cubes. A lunchbox balances 20 cubes. How many more cubes does the lunchbox balance?",
        "6",
        "20 − 14 = 6. The lunchbox balances 6 more cubes.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Pegs to balance each toy",
          columns: [
            { label: "Car", value: 8 },
            { label: "Doll", value: 12 },
            { label: "Ball", value: 6 },
            { label: "Truck", value: 14 },
          ],
          step: 2,
        },
        choice(
          n,
          "Look at the graph. Which two toys together balance the truck?",
          ["the car and the ball", "the doll and the ball", "the car and the doll"],
          0,
          "The truck balances 14 pegs. The car is 8 and the ball is 6, and 8 + 6 = 14.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ella balances a book with 30 marbles. Sam balances the same book with 10 blocks. Which is heavier?",
        ["one block", "one marble", "They are the same"],
        0,
        "Sam needed fewer blocks than Ella needed marbles, so each block must be heavier than each marble.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "One apple balances 3 plums. How many plums balance 4 apples?",
        ["12", "12 plums"],
        "Each apple needs 3 plums. Count by 3s four times: 3, 6, 9, 12.",
      ),
    (n) =>
      trueFalse(
        n,
        "A box balances 10 blocks. Then 2 blocks are taken off. Now the box side goes down.",
        true,
        "The box is the same as 10 blocks. Only 8 blocks are left on the other side, so the box is heavier and goes down.",
      ),
    (n) =>
      choice(
        n,
        "The kangaroo toy is heavier than the koala toy. The koala toy is heavier than the possum toy. Which toy is the lightest?",
        ["the possum toy", "the koala toy", "the kangaroo toy"],
        0,
        "The kangaroo is heavier than the koala, and the koala is heavier than the possum. So the possum is the lightest.",
      ),
  ],
});

/** MA1-NSM-01: masses compared with uniform informal units and balance scales (second set). */
export const MASS_2 = levels(2050416, {
  very_easy: [
    (n) => trueFalse(n, "On a balance scale, the lighter side goes up.", true, "The heavier side goes down, so the lighter side goes up."),
    (n) => choice(n, "Which is heavier?", ["a bag of potatoes", "a balloon"], 0, "A bag of potatoes is heavy. A balloon is very light."),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Blocks to balance each toy",
          thing: "blocks",
          each: 1,
          rows: [
            { label: "Ted", count: 7 },
            { label: "Dino", count: 4 },
            { label: "Bunny", count: 9 },
          ],
        },
        typed("short_answer", n, "Look at the graph. How many blocks balance Dino?", ["4", "4 blocks"], "Count the stars next to Dino: 4."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Blocks to balance each toy",
          thing: "blocks",
          each: 1,
          rows: [
            { label: "Ted", count: 7 },
            { label: "Dino", count: 4 },
            { label: "Bunny", count: 9 },
          ],
        },
        choice(
          n,
          "Look at the graph. Which toy is the heaviest?",
          ["Bunny", "Ted", "Dino"],
          0,
          "Bunny needs the most blocks, 9, so Bunny is heaviest.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A cup balances 8 pegs. A spoon balances 3 pegs. The cup is ___ pegs heavier.",
        "5",
        "8 − 3 = 5, so the cup is 5 pegs heavier.",
      ),
    (n) =>
      ordering(
        n,
        "Put these in order from lightest to heaviest.",
        ["a feather", "an apple", "a pumpkin", "a car"],
        "A feather is the lightest, then an apple, then a pumpkin, and a car is the heaviest.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which things are heavier than a school book? Choose all that are right.",
        ["a bike", "a big watermelon", "a paper clip", "a sheet of paper", "a fridge"],
        [0, 1, 4],
        "A bike, a big watermelon and a fridge are all heavier than a book. A paper clip and a sheet of paper are lighter.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A shoe balances 15 cubes. A hat balances 7 cubes. How many cubes balance the shoe and the hat together?",
        ["22", "22 cubes"],
        "15 + 7 = 22 cubes.",
      ),
    (n) =>
      choice(
        n,
        "Why should we use marbles that are all the same to weigh things?",
        ["So we can compare the results fairly", "So the scale looks nice", "Because marbles are heavy", "So the answer is always 10"],
        0,
        "If every marble has the same mass, we can fairly compare how many each thing needs.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Object", "Pegs to balance"],
          rows: [
            ["Shell", 13],
            ["Rock", 21],
            ["Pine cone", 8],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. How many more pegs does the rock need than the shell?",
          ["8", "8 pegs"],
          "The rock needs 21 and the shell needs 13. 21 − 13 = 8.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A pillow is bigger than a tin of beans, so the pillow must be heavier.",
        false,
        "A pillow is big but soft and light. The small tin of beans is heavier. Size does not tell us mass.",
      ),
    (n) =>
      choice(
        n,
        "Two pears balance 1 mango. The mango balances 10 cubes. How many cubes balance 1 pear?",
        ["5", "10", "20", "2"],
        0,
        "Two pears together are 10 cubes. Share 10 into 2 equal parts: 5 cubes for each pear.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A melon balances 4 oranges. Each orange balances 5 blocks. How many blocks balance the melon?",
        ["20", "20 blocks"],
        "4 oranges of 5 blocks each: 5, 10, 15, 20. The melon balances 20 blocks.",
      ),
    (n) =>
      ordering(
        n,
        "Box A is heavier than Box B. Box C is heavier than Box A. Put the boxes in order from heaviest to lightest.",
        ["Box C", "Box A", "Box B"],
        "C is heavier than A, and A is heavier than B. So the order is C, A, B.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Toy", "Blocks to balance"],
          rows: [
            ["Robot", 18],
            ["Train", 11],
            ["Kite", 7],
          ],
        },
        choice(
          n,
          "Look at the table. What would balance the robot?",
          ["the train and the kite", "two kites", "two trains", "the kite and 7 blocks"],
          0,
          "The train and kite together are 11 + 7 = 18 blocks, the same as the robot. Two kites are 14 and two trains are 22.",
        ),
      ),
  ],
});

/** MA1-NSM-02: durations, calendars, half past, quarter past and quarter to. */
export const TIME = levels(2060101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 3, minute: 30 },
        choice(
          n,
          "What time does the clock show?",
          ["half past 3", "3 o'clock", "half past 6", "quarter past 3"],
          0,
          "The long hand points to 6, so it is half past. The short hand is between 3 and 4, so it is half past 3.",
        ),
      ),
    (n) => typed("short_answer", n, "How many days are in a week?", "7", "Monday to Sunday is 7 days."),
    (n) => trueFalse(n, "There are 12 months in a year.", true, "January to December is 12 months."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 15 },
        choice(
          n,
          "What time does the clock show?",
          ["quarter past 9", "quarter to 9", "half past 9", "9 o'clock"],
          0,
          "The long hand points to 3, a quarter of the way round. The short hand is just past 9. So it is quarter past 9.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these months in order.",
        ["May", "June", "July", "August"],
        "In the calendar, May comes first, then June, July and August.",
      ),
    (n) => typed("fill_blank", n, "1 hour = ___ minutes", "60", "There are 60 minutes in 1 hour."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 45 },
        choice(
          n,
          "What time does the clock show?",
          ["quarter to 5", "quarter to 4", "quarter past 4", "quarter past 9"],
          0,
          "The long hand points to 9, so it is quarter to. The short hand is nearly at 5, so it is quarter to 5.",
        ),
      ),
    (n) => typed("short_answer", n, "Write quarter past 7 as a digital time.", ["7:15"], "Quarter past is 15 minutes past, so it is 7:15."),
    (n) =>
      choice(
        n,
        "School starts at 9 o'clock and finishes at 3 o'clock. How many hours long is the school day?",
        ["6", "3", "12", "9"],
        0,
        "Count the hours from 9: 10, 11, 12, 1, 2, 3. That is 6 hours.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which months have 31 days? Choose all that are right.",
        ["January", "February", "March", "April", "December"],
        [0, 2, 4],
        "January, March and December have 31 days. April has 30 days and February has 28 or 29.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 0 },
        choice(
          n,
          "What time will it be in half an hour?",
          ["half past 2", "half past 3", "quarter past 2", "3 o'clock"],
          0,
          "The clock shows 2 o'clock. Half an hour later the long hand is on 6, so it is half past 2.",
        ),
      ),
    (n) => trueFalse(n, "Quarter to 6 is the same as 5:45.", true, "Quarter to 6 is 15 minutes before 6, which is 5:45."),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Today is Monday. What day will it be in 9 days?",
        ["Wednesday", "Wed"],
        "In 7 days it is Monday again. 2 more days is Tuesday, then Wednesday.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 10, minute: 45 },
        choice(
          n,
          "Netball starts at the time on the clock. The game goes for 30 minutes. What time does it finish?",
          ["quarter past 11", "quarter to 11", "11 o'clock", "half past 11"],
          0,
          "The clock shows quarter to 11. 15 minutes later is 11 o'clock, and 15 more minutes is quarter past 11.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "It is 7 June. The school holidays start on 21 June. How many weeks away are the holidays?",
        ["2", "2 weeks"],
        "From 7 June to 21 June is 14 days. 7 days is a week, so 14 days is 2 weeks.",
      ),
  ],
});

/** MA1-NSM-02: durations, calendars, half past, quarter past and quarter to (second set). */
export const TIME_2 = levels(2060116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 6, minute: 0 },
        typed(
          "short_answer",
          n,
          "What time does the clock show?",
          ["6 o'clock", "6:00", "6", "six o'clock"],
          "The long hand points to 12 and the short hand points to 6. It is 6 o'clock.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which day comes after Friday?",
        ["Saturday", "Thursday", "Sunday", "Monday"],
        0,
        "The days go Thursday, Friday, Saturday.",
      ),
    (n) => trueFalse(n, "Half past 8 is the same as 8:30.", true, "Half past means 30 minutes past, so half past 8 is 8:30."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 11, minute: 15 },
        choice(
          n,
          "What time does the clock show?",
          ["quarter past 11", "quarter to 11", "quarter past 3", "half past 11"],
          0,
          "The long hand points to 3, so it is quarter past. The short hand is just past 11. So it is quarter past 11.",
        ),
      ),
    (n) => typed("fill_blank", n, "2 weeks = ___ days", "14", "1 week is 7 days, so 2 weeks is 7 + 7 = 14 days."),
    (n) =>
      ordering(
        n,
        "Put these in order from shortest time to longest time.",
        ["1 minute", "1 hour", "1 day", "1 week"],
        "A minute is short, an hour is 60 minutes, a day is 24 hours and a week is 7 days.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "clock", hour: 1, minute: 45 },
        choice(
          n,
          "What time does the clock show?",
          ["quarter to 2", "quarter to 1", "quarter past 1", "half past 1"],
          0,
          "The long hand points to 9, so it is quarter to. The short hand is nearly at 2. So it is quarter to 2.",
        ),
      ),
    (n) =>
      choice(n, "Which season comes after winter?", ["spring", "summer", "autumn"], 0, "The seasons go summer, autumn, winter, spring."),
    (n) => typed("short_answer", n, "Write half past 4 as a digital time.", ["4:30"], "Half past is 30 minutes past, so it is 4:30."),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which are the same time as quarter to 9? Choose all that are right.",
        ["8:45", "9:45", "15 minutes before 9 o'clock", "9:15"],
        [0, 2],
        "Quarter to 9 is 15 minutes before 9 o'clock. That is 8:45.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 5, minute: 30 },
        choice(
          n,
          "Dinner is in a quarter of an hour. What time will dinner be?",
          ["quarter to 6", "quarter past 5", "quarter to 5", "6 o'clock"],
          0,
          "The clock shows half past 5. A quarter of an hour is 15 minutes. 5:30 + 15 minutes is 5:45, which is quarter to 6.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A movie goes from 3 o'clock to half past 4. It is 1 and a half hours long.",
        true,
        "From 3 o'clock to 4 o'clock is 1 hour. From 4 o'clock to half past 4 is half an hour. So it is 1 and a half hours.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A sausage sizzle starts at quarter past 11. It goes for 2 hours. What time does it finish?",
        ["1:15", "quarter past 1", "1:15 pm", "1:15pm"],
        "Count on 2 hours from quarter past 11: quarter past 12, then quarter past 1.",
      ),
    (n) =>
      choice(
        n,
        "Ruby's birthday is 3 weeks after 2 March. What date is her birthday?",
        ["23 March", "5 March", "9 March", "16 March"],
        0,
        "3 weeks is 21 days. Count on a week at a time: 9 March, 16 March, 23 March.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 8, minute: 45 },
        typed(
          "short_answer",
          n,
          "The clock shows when Tom started reading. He read until 9:30. How many minutes did he read?",
          ["45", "45 minutes"],
          "The clock shows 8:45. From 8:45 to 9:00 is 15 minutes. From 9:00 to 9:30 is 30 minutes. 15 + 30 = 45.",
        ),
      ),
  ],
});

/** MA1-2DS-01: two-dimensional shapes, including quadrilaterals and other common polygons. */
export const SHAPES_2D = levels(2070101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 0],
            [7, 0],
            [9, 4],
            [5, 7],
            [1, 4],
          ],
        },
        choice(
          n,
          "What is the name of this shape?",
          ["pentagon", "hexagon", "triangle", "octagon"],
          0,
          "Count the sides: 1, 2, 3, 4, 5. A shape with 5 sides is a pentagon.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "How many sides does a square have?", "4", "A square has 4 straight sides that are all the same length."),
    (n) => trueFalse(n, "A circle has no corners.", true, "A circle has one curved edge and no corners at all."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [6, 0],
            [8, 3],
            [6, 6],
            [2, 6],
            [0, 3],
          ],
        },
        typed("short_answer", n, "How many sides does this shape have?", "6", "Count each straight side: there are 6. It is a hexagon."),
      ),
    (n) =>
      choice(
        n,
        "What do we call any shape with 4 straight sides?",
        ["quadrilateral", "pentagon", "triangle", "hexagon"],
        0,
        "Quad means 4. Any shape with 4 straight sides is a quadrilateral.",
      ),
    (n) =>
      multi(
        n,
        "Which shapes are quadrilaterals? Choose all that are right.",
        ["square", "rectangle", "triangle", "rhombus", "pentagon"],
        [0, 1, 3],
        "A square, a rectangle and a rhombus each have 4 sides. A triangle has 3 and a pentagon has 5.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 0],
            [6, 0],
            [8, 2],
            [8, 5],
            [6, 7],
            [3, 7],
            [1, 5],
            [1, 2],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["octagon", "hexagon", "pentagon", "rectangle"],
          0,
          "It has 8 sides. A shape with 8 sides is an octagon, like a stop sign.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest sides to most sides.",
        ["triangle", "square", "pentagon", "hexagon"],
        "A triangle has 3 sides, a square 4, a pentagon 5 and a hexagon 6.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 0],
            [7, 4],
            [4, 8],
            [1, 4],
          ],
        },
        trueFalse(n, "This shape is a quadrilateral.", true, "It has 4 straight sides, so it is a quadrilateral. It is a rhombus."),
      ),
  ],
  hard: [
    (n) => typed("short_answer", n, "How many corners do 2 triangles have altogether?", "6", "Each triangle has 3 corners. 3 + 3 = 6."),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [8, 4],
            [2, 4],
          ],
        },
        choice(
          n,
          "This shape has 4 sides, but it is not a rectangle. Why not?",
          ["Its corners are not square corners", "It has 5 sides", "It has curved sides", "It has no corners"],
          0,
          "A rectangle has 4 square corners. This shape is leaning over, so its corners are not square.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which shapes have more than 4 corners? Choose all that are right.",
        ["hexagon", "pentagon", "square", "triangle", "octagon"],
        [0, 1, 4],
        "A hexagon has 6 corners, a pentagon 5 and an octagon 8. A square has 4 and a triangle 3.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Jai draws a pentagon and a hexagon. How many sides has he drawn altogether?",
        "11",
        "A pentagon has 5 sides and a hexagon has 6. 5 + 6 = 11.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [8, 1],
            [8, 7],
            [2, 7],
          ],
        },
        choice(
          n,
          "This square is cut in half with a straight line from one corner to the opposite corner. What two shapes do you get?",
          ["2 triangles", "2 squares", "2 rectangles", "2 circles"],
          0,
          "The line goes from corner to corner, so each half has 3 sides and 3 corners. They are 2 triangles.",
        ),
      ),
    (n) =>
      choice(
        n,
        "I have 4 straight sides that are all the same length. My corners are not square corners. What am I?",
        ["rhombus", "square", "rectangle", "trapezium"],
        0,
        "A square also has 4 equal sides, but its corners are square. A shape with 4 equal sides and no square corners is a rhombus.",
      ),
  ],
});

/** MA1-2DS-01: two-dimensional shapes, including quadrilaterals and other common polygons (second set). */
export const SHAPES_2D_2 = levels(2070116, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [7, 1],
            [7, 6],
            [2, 6],
          ],
        },
        choice(
          n,
          "What shape is this?",
          ["square", "triangle", "pentagon", "circle"],
          0,
          "It has 4 sides that are all the same length and 4 square corners. It is a square.",
        ),
      ),
    (n) => trueFalse(n, "A triangle has 3 sides.", true, "Tri means 3. A triangle has 3 sides and 3 corners."),
    (n) => typed("short_answer", n, "How many corners does a rectangle have?", "4", "A rectangle has 4 square corners."),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [6, 4],
            [2, 4],
          ],
        },
        typed("short_answer", n, "How many sides does this shape have?", "4", "Count the straight sides: 1, 2, 3, 4. It is a trapezium."),
      ),
    (n) =>
      choice(
        n,
        "A shape has 8 sides. What is it called?",
        ["octagon", "hexagon", "pentagon", "rectangle"],
        0,
        "Octo means 8, like an octopus with 8 arms.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [8, 1],
            [4, 7],
          ],
        },
        multi(
          n,
          "Which words describe this shape? Choose all that are right.",
          ["has 3 sides", "has 3 corners", "is a quadrilateral", "has curved sides"],
          [0, 1],
          "It is a triangle. It has 3 straight sides and 3 corners. A quadrilateral has 4 sides.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 0],
            [6, 5],
            [4, 7],
            [2, 5],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["kite", "rhombus", "triangle", "hexagon"],
          0,
          "It has 4 sides. The two short sides at the top match, and the two long sides at the bottom match. It is a kite.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from most corners to fewest corners.",
        ["octagon", "hexagon", "pentagon", "square", "triangle"],
        "An octagon has 8 corners, a hexagon 6, a pentagon 5, a square 4 and a triangle 3.",
      ),
    (n) => typed("fill_blank", n, "A pentagon has ___ corners.", "5", "A pentagon has 5 sides and 5 corners."),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 3],
            [3, 3],
            [3, 6],
            [0, 6],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["hexagon", "octagon", "rectangle", "pentagon"],
          0,
          "Count the sides carefully: there are 6. Any shape with 6 straight sides is a hexagon, even if it looks like an L.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which shapes have only straight sides? Choose all that are right.",
        ["triangle", "circle", "hexagon", "oval", "rectangle"],
        [0, 2, 4],
        "Triangles, hexagons and rectangles have straight sides. Circles and ovals are curved.",
      ),
    (n) =>
      trueFalse(
        n,
        "A shape with 5 straight sides always has 5 corners.",
        true,
        "Each corner is where two sides meet. A closed shape with 5 sides has 5 corners.",
      ),
  ],
  very_hard: [
    (n) => typed("short_answer", n, "How many sides do 3 squares have altogether?", "12", "Each square has 4 sides. 4 + 4 + 4 = 12."),
    (n) =>
      choice(
        n,
        "Ari puts 2 same-sized squares side by side with no gap. What shape does he make?",
        ["rectangle", "triangle", "hexagon", "circle"],
        0,
        "Together they make a long shape with 4 square corners and 4 sides. It is a rectangle.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 0],
            [7, 0],
            [7, 4],
            [4, 7],
            [1, 4],
          ],
        },
        choice(
          n,
          "Mia says this house shape is a hexagon. Is she right?",
          ["No, it has 5 sides, so it is a pentagon", "Yes, it has 6 sides", "No, it is a triangle", "Yes, all house shapes are hexagons"],
          0,
          "Count the sides: bottom, right, two roof sides and left. That is 5 sides, so it is a pentagon.",
        ),
      ),
  ],
});

/** MA1-3DS-01: familiar three-dimensional objects and their faces, edges and corners. */
export const OBJECTS_3D = levels(2070201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "sphere" },
        choice(
          n,
          "What is this object called?",
          ["sphere", "cube", "cone", "cylinder"],
          0,
          "It is round all over like a ball. It is a sphere.",
        ),
      ),
    (n) => trueFalse(n, "A tennis ball is shaped like a sphere.", true, "A tennis ball is round all over, so it is a sphere."),
    (n) =>
      choice(
        n,
        "Which thing is shaped like a cylinder?",
        ["a can of soup", "a dice", "a tennis ball", "an ice-cream cone"],
        0,
        "A can has a circle at each end and a curved side. That is a cylinder.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        typed(
          "short_answer",
          n,
          "This is a cube. How many faces does it have?",
          "6",
          "A cube has 6 square faces: top, bottom, front, back, left and right.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which objects can roll? Choose all that are right.",
        ["sphere", "cylinder", "cube", "cone", "rectangular prism"],
        [0, 1, 3],
        "Objects with a curved surface can roll: the sphere, the cylinder and the cone. A cube and a prism have only flat faces.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cone" },
        choice(
          n,
          "What is this object called?",
          ["cone", "square pyramid", "cylinder", "triangle"],
          0,
          "It has a circle face at the bottom and comes to a point. It is a cone.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        choice(
          n,
          "Which everyday thing has this shape?",
          ["a cereal box", "a basketball", "a party hat", "a can"],
          0,
          "This is a rectangular prism. A cereal box has rectangle faces just like it.",
        ),
      ),
    (n) => typed("fill_blank", n, "A cube has ___ corners.", "8", "A cube has 4 corners on top and 4 on the bottom. 4 + 4 = 8."),
    (n) =>
      trueFalse(
        n,
        "A triangle is a 3D object.",
        false,
        "A triangle is a flat 2D shape. A 3D object, like a pyramid, can have triangle faces.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many faces does this object have?",
          "5",
          "This is a square pyramid. It has 1 square face on the bottom and 4 triangle faces. 1 + 4 = 5.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest flat faces to most flat faces.",
        ["sphere", "cone", "cylinder", "cube"],
        "A sphere has no flat faces, a cone has 1, a cylinder has 2 and a cube has 6.",
      ),
    (n) =>
      choice(
        n,
        "Which object has 12 edges?",
        ["cube", "square pyramid", "cone", "cylinder"],
        0,
        "A cube has 4 edges on top, 4 on the bottom and 4 going up the sides. 4 + 4 + 4 = 12.",
      ),
  ],
  very_hard: [
    (n) => typed("short_answer", n, "How many corners do 2 cubes have altogether?", "16", "Each cube has 8 corners. 8 + 8 = 16."),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        choice(
          n,
          "How many faces does this object have?",
          ["5", "6", "3", "9"],
          0,
          "This is a triangular prism. It has 2 triangle faces at the ends and 3 rectangle faces around the side. 2 + 3 = 5.",
        ),
      ),
    (n) =>
      choice(
        n,
        "I have 1 flat face that is a circle. I have 1 curved surface. I come to a point at the top. What am I?",
        ["cone", "cylinder", "sphere", "square pyramid"],
        0,
        "A cylinder has 2 circle faces, a sphere has none and a pyramid has a square face. A cone has 1 circle face and a point.",
      ),
  ],
});

/** MA1-3DS-01: familiar three-dimensional objects and their faces, edges and corners (second set). */
export const OBJECTS_3D_2 = levels(2070216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        choice(
          n,
          "What is this object called?",
          ["cylinder", "cone", "cube", "sphere"],
          0,
          "It has a circle at each end and a curved side. It is a cylinder.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which thing is shaped like a cube?",
        ["a dice", "a ball", "a can", "a party hat"],
        0,
        "A dice has 6 square faces, just like a cube.",
      ),
    (n) => trueFalse(n, "A sphere has no corners.", true, "A sphere is curved all over, so it has no corners."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many faces does this object have?",
          "6",
          "This is a rectangular prism, like a box. It has a top, a bottom, a front, a back and 2 ends. That is 6 faces.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which objects have a curved surface? Choose all that are right.",
        ["cylinder", "cone", "sphere", "cube", "square pyramid"],
        [0, 1, 2],
        "A cylinder, a cone and a sphere all have a curved surface. A cube and a pyramid have only flat faces.",
      ),
    (n) => typed("fill_blank", n, "A cylinder has ___ flat faces.", "2", "A cylinder has a flat circle face at each end, so 2 flat faces."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        choice(
          n,
          "What is this object called?",
          ["square pyramid", "cube", "triangular prism", "cone"],
          0,
          "It has a square face on the bottom and triangle faces that meet at a point. It is a square pyramid.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many edges does a cube have?",
        "12",
        "An edge is where two faces meet. A cube has 4 edges on top, 4 on the bottom and 4 up the sides. That is 12.",
      ),
    (n) =>
      choice(
        n,
        "Which object is best for building a tall tower that will not roll away?",
        ["cube", "sphere", "cone"],
        0,
        "A cube has flat faces, so cubes stack well and do not roll.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "How many corners does this object have?",
          "6",
          "This is a triangular prism. Each triangle end has 3 corners. 3 + 3 = 6.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A cone and a cylinder both have a flat face that is a circle.",
        true,
        "A cone has a circle face on the bottom. A cylinder has a circle face at each end.",
      ),
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest corners to most corners.",
        ["sphere", "cone", "square pyramid", "cube"],
        "A sphere has 0 corners, a cone has 1 point, a square pyramid has 5 corners and a cube has 8.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many edges does this object have?",
          "8",
          "This square pyramid has 4 edges around the square bottom and 4 edges going up to the point. 4 + 4 = 8.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which objects have only flat faces? Choose all that are right.",
        ["cube", "triangular prism", "square pyramid", "cylinder", "cone"],
        [0, 1, 2],
        "A cube, a triangular prism and a square pyramid have only flat faces. A cylinder and a cone have a curved surface too.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        choice(
          n,
          "Zoe traces around every face of this cube. What does she draw?",
          ["6 squares", "6 circles", "4 triangles", "1 square"],
          0,
          "A cube has 6 faces, and every face is a square. So she draws 6 squares.",
        ),
      ),
  ],
});

/** MA1-GM-01: positions and simple paths and maps in familiar places, including left and right. */
export const POSITION = levels(2070301, {
  very_easy: [
    (n) => choice(n, "What is the opposite of left?", ["right", "up", "down", "behind"], 0, "Left and right are opposite sides."),
    (n) =>
      trueFalse(
        n,
        "The cat is under the table. So the table is above the cat.",
        true,
        "If the cat is under the table, the table must be over it, or above it.",
      ),
    (n) =>
      pic(
        TOWN,
        choice(
          n,
          "Look at the map. Which place is in the top row?",
          ["the school", "the shop", "home", "the pool"],
          0,
          "The school is in the highest row of the map. The others are lower down.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        TOWN,
        choice(
          n,
          "Look at the map. Start at home. Go 4 squares right and 1 square up. Where are you?",
          ["the shop", "the park", "the pool", "the school"],
          0,
          "From home, count 4 squares to the right, then 1 square up. You land on the shop.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Facing the board, the door is on your left. Facing the back of the room, the door is on your ___.",
        "right",
        "When you turn around to face the other way, left and right swap. So the door is now on your right.",
      ),
    (n) =>
      ordering(
        n,
        "Ava is in front of Kai. Leo is behind Kai. Put them in order from front to back.",
        ["Ava", "Kai", "Leo"],
        "Ava is in front, Kai is in the middle and Leo is behind Kai.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          ...TOWN,
          path: [
            [0, 0],
            [2, 0],
            [2, 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "Follow the path from home to the park. How many squares long is the path?",
          ["5", "5 squares"],
          "The path goes 2 squares right, then 3 squares up. 2 + 3 = 5 squares.",
        ),
      ),
    (n) =>
      pic(
        TOWN,
        multi(
          n,
          "Look at the map. Which places are further right than the pool? Choose all that are right.",
          ["the park", "the shop", "the school", "home"],
          [0, 1, 2],
          "The pool is in the first column on the left. The park, shop and school are all further right. Home is in the same column as the pool.",
        ),
      ),
    (n) =>
      pic(
        TOWN,
        trueFalse(
          n,
          "Look at the map. The school is straight above the shop.",
          true,
          "The shop and the school are in the same column, and the school is higher up. So the school is straight above the shop.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        TOWN,
        choice(
          n,
          "Look at the map. Start at the pool. Go 4 squares right and 1 square up. Where are you?",
          ["the school", "the park", "the shop", "home"],
          0,
          "From the pool, 4 squares right takes you past the park. Then 1 square up lands on the school.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ben and Zara stand facing each other. Ben puts up his right hand. Which side is it on as Zara looks at him?",
        ["on her left", "on her right"],
        0,
        "When two people face each other, their sides are swapped. Ben's right hand is on Zara's left side.",
      ),
    (n) =>
      pic(
        TOWN,
        typed(
          "fill_blank",
          n,
          "Look at the map. To go from the park to the school, go ___ squares right and 1 square up.",
          "2",
          "The school is 2 columns to the right of the park and 1 row higher. So go 2 squares right and 1 up.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        TOWN,
        choice(
          n,
          "Look at the map. Lily starts at home. She goes 4 squares right, then 3 squares up. Which place is 1 square above her?",
          ["the school", "the shop", "the park", "the pool"],
          0,
          "4 right from home is under the shop. 3 up passes the shop and stops just below the school. So the school is 1 square above her.",
        ),
      ),
    (n) =>
      pic(
        TOWN,
        typed(
          "short_answer",
          n,
          "Look at the map. Tom walks from the shop to the pool. He goes left, then up. How many squares does he walk?",
          ["6", "6 squares"],
          "From the shop, go 4 squares left to reach the pool's column. Then go 2 squares up to the pool. 4 + 2 = 6.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ella faces the classroom door. The window is on her left. She turns around to face the other way. Where is the window now?",
        ["on her right", "on her left", "in front of her", "behind her"],
        0,
        "Turning around swaps left and right. The window was on her left, so now it is on her right.",
      ),
  ],
});

/** MA1-GM-01: positions and simple paths and maps in familiar places, including left and right (second set). */
export const POSITION_2 = levels(2070316, {
  very_easy: [
    (n) =>
      trueFalse(
        n,
        "Your left hand and your right hand are on opposite sides of your body.",
        true,
        "One hand is on each side of your body, so left and right are opposite sides.",
      ),
    (n) =>
      choice(
        n,
        "The cup is on top of the book. Where is the book?",
        ["under the cup", "on top of the cup", "beside the cup", "inside the cup"],
        0,
        "If the cup is on top of the book, the book is under the cup.",
      ),
    (n) =>
      pic(
        CAMP,
        choice(
          n,
          "Look at the map of the camping ground. What is straight above the BBQ?",
          ["the lake", "the tent", "the swings", "the toilets"],
          0,
          "Go straight up from the BBQ in the same column. You reach the lake.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        CAMP,
        typed(
          "short_answer",
          n,
          "Look at the map. How many squares do you go right to get from the tent to the BBQ?",
          ["3", "3 squares"],
          "The tent and the BBQ are in the same row. Count the squares to the right: 1, 2, 3.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Ned is on the far left. Pip is on the far right. Ola is in the middle. Put them in order from left to right.",
        ["Ned", "Ola", "Pip"],
        "Ned is on the left, Ola is in the middle and Pip is on the right.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The opposite of in front of is ___.",
        "behind",
        "If something is not in front of you but at your back, it is behind you.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          ...CAMP,
          path: [
            [0, 1],
            [1, 1],
            [1, 3],
          ],
        },
        choice(
          n,
          "Look at the map. Follow the path from the tent. Where does it go?",
          ["to the swings", "to the lake", "to the BBQ", "to the toilets"],
          0,
          "The path goes 1 square right from the tent, then 2 squares up. It ends at the swings.",
        ),
      ),
    (n) =>
      pic(
        CAMP,
        choice(
          n,
          "Look at the map. Start at the BBQ. Go 2 squares right and 1 square down. Where are you?",
          ["the toilets", "the lake", "the tent", "the swings"],
          0,
          "From the BBQ, count 2 squares right, then 1 square down. You reach the toilets.",
        ),
      ),
    (n) =>
      pic(
        CAMP,
        multi(
          n,
          "Look at the map. Which places are higher up than the BBQ? Choose all that are right.",
          ["the lake", "the swings", "the tent", "the toilets"],
          [0, 1],
          "The lake and the swings are in higher rows. The tent is in the same row as the BBQ and the toilets are lower.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        CAMP,
        trueFalse(
          n,
          "Look at the map. The toilets are further right than the BBQ.",
          true,
          "The toilets are in the last column on the right. The BBQ is further left, so the toilets are further right.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Max walks to school and the park is on his right. He walks home along the same road. Where is the park now?",
        ["on his left", "on his right", "in front of him", "behind him"],
        0,
        "Walking back the other way turns him around, so left and right swap. The park is on his left.",
      ),
    (n) =>
      pic(
        CAMP,
        typed(
          "fill_blank",
          n,
          "Look at the map. To go from the tent to the lake, go 3 squares right and ___ squares up.",
          "3",
          "The lake is 3 columns right of the tent and 3 rows higher. So go 3 right and 3 up.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        CAMP,
        typed(
          "short_answer",
          n,
          "Look at the map. Jo walks from the swings to the toilets. She goes right, then down. How many squares does she walk?",
          ["7", "7 squares"],
          "From the swings, go 4 squares right to reach the toilets' column. Then go 3 squares down. 4 + 3 = 7.",
        ),
      ),
    (n) =>
      pic(
        CAMP,
        choice(
          n,
          "Look at the map. Sam starts at the lake. He goes 2 squares left and 1 square down. Then he goes 1 square left and 2 squares down. Where is he?",
          ["the tent", "the swings", "the BBQ", "the toilets"],
          0,
          "2 left and 1 down from the lake takes Sam to the swings. Then 1 left and 2 down takes him to the tent.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Lucy faces the board. The bin is on her right. She turns around to face the back wall. Then she turns around again. Where is the bin now?",
        ["on her right", "on her left", "behind her", "in front of her"],
        0,
        "Turning around once puts the bin on her left. Turning around again puts her back where she started, so the bin is on her right.",
      ),
  ],
});
