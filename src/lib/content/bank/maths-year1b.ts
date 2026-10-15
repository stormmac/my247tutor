/**
 * Year 1 Mathematics (Stage 1): measurement and space. Two sets of 15 questions for each Stage 1
 * standard (NESA outcome), three at each level from very easy to very hard. The `_2` sets are new
 * questions on the same standard. Year 1 measures with informal units (hand spans, paper clips,
 * cups, scoops, blocks) and reads o'clock and half past.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** Every square in a block `cols` wide and `rows` high, starting at row `y0` on the left. */
function block(cols: number, rows: number, y0 = 0): [number, number][] {
  const out: [number, number][] = [];
  for (let y = y0; y < y0 + rows; y++) for (let x = 0; x < cols; x++) out.push([x, y]);
  return out;
}

/** Strips of squares, one per row from the bottom, for comparing lengths. Rows are numbered on the side. */
function strips(columns: number, lengths: number[]): Picture {
  return { kind: "grid", columns, rows: lengths.length, map: true, cells: lengths.flatMap((len, y) => block(len, 1, y)) };
}

/** Labels in a row of squares, left to right, for position questions. */
function line(...labels: string[]): Picture {
  return { kind: "grid", columns: labels.length, rows: 1, map: true, points: labels.map((label, x) => ({ x, y: 0, label })) };
}

/** Pictures-of-cups style graph with one picture for each unit. */
function graph(title: string, thing: string, rows: [string, number][]): Picture {
  return { kind: "picture_graph", title, thing, each: 1, rows: rows.map(([label, count]) => ({ label, count })) };
}

/** MA1-GM-02: measuring, comparing and estimating lengths with uniform informal units. */
export const LENGTH = levels(1050101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which is longer?",
        ["a pencil", "a paper clip", "They are the same"],
        0,
        "A pencil is much longer than a paper clip. You could fit lots of paper clips along a pencil.",
      ),
    (n) =>
      pic(
        strips(8, [3, 6]),
        trueFalse(
          n,
          "Look at the two strips. The top strip is longer than the bottom strip.",
          true,
          "Both strips start at the same end. The top strip has 6 squares and the bottom strip has 3, so the top one is longer.",
        ),
      ),
    (n) =>
      pic(
        strips(8, [5]),
        typed(
          "short_answer",
          n,
          "Each square is one block. How many blocks long is the ribbon?",
          "5",
          "Count the shaded squares: 1, 2, 3, 4, 5.",
        ),
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which word is the opposite of taller?",
        ["shorter", "longer", "heavier", "wider"],
        0,
        "Taller means more height. Shorter means less height.",
      ),
    (n) =>
      ordering(
        n,
        "Put these from shortest to longest.",
        ["a ladybird", "a crayon", "a skipping rope", "a cricket pitch"],
        "A ladybird is tiny. A crayon is a bit longer. A skipping rope is longer again. A cricket pitch is the longest.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Sam's desk is 8 hand spans long. Mia's desk is 6 hand spans long. Sam's desk is ___ hand spans longer.",
        "2",
        "Count on from 6 to 8: 7, 8. That is 2 more hand spans.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which units are good for measuring a book? Choose all that are right.",
        ["paper clips", "small blocks", "footsteps", "buses"],
        [0, 1],
        "A book is small, so use small units like paper clips or blocks. Footsteps and buses are far too big.",
      ),
    (n) =>
      trueFalse(
        n,
        "When you measure with paper clips, you should leave gaps between them.",
        false,
        "Put the paper clips end to end with no gaps and no overlaps. Gaps make the count wrong.",
      ),
    (n) =>
      pic(
        strips(8, [4, 7]),
        typed(
          "short_answer",
          n,
          "Look at the grid. Each square is one block. How many blocks longer is the ribbon in row 2 than the ribbon in row 1?",
          "3",
          "Row 2 has 7 blocks and row 1 has 4 blocks. Count on from 4 to 7: 5, 6, 7. That is 3 more.",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Kai measures a rug and gets 10 hand spans. His teacher measures the same rug and gets 7 hand spans. Why are the numbers different?",
        ["The teacher's hands are bigger", "The rug got shorter", "The teacher's hands are smaller", "Hand spans are always the same size"],
        0,
        "Bigger units fit fewer times. The teacher's hands are bigger than Kai's, so she needs fewer hand spans.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ruby's ribbon is 9 blocks long. She cuts off 4 blocks. How many blocks long is her ribbon now?",
        "5",
        "Take 4 away from 9. Count back: 8, 7, 6, 5. The ribbon is 5 blocks long.",
      ),
    (n) =>
      multi(
        n,
        "Leo is taller than Mia. Mia is taller than Zoe. Choose all that are true.",
        ["Leo is the tallest", "Zoe is the shortest", "Mia is the shortest", "Zoe is taller than Leo"],
        [0, 1],
        "Leo is taller than Mia, and Mia is taller than Zoe. So Leo is the tallest and Zoe is the shortest.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A toy snake is 4 pencils long. Each pencil is as long as 3 paper clips. How many paper clips long is the snake?",
        "12",
        "Each pencil is 3 paper clips. 4 pencils is 3 + 3 + 3 + 3 = 12 paper clips.",
      ),
    (n) =>
      choice(
        n,
        "Isla measures a table with big blocks. Jack measures the same table with small blocks. Who needs more blocks?",
        ["Jack", "Isla", "They need the same number"],
        0,
        "Small blocks fit more times along the table, so Jack needs more of them.",
      ),
    (n) =>
      pic(
        strips(10, [6, 9, 4]),
        ordering(
          n,
          "Look at the grid. Put the ribbons in order from shortest to longest.",
          ["Row 3", "Row 1", "Row 2"],
          "Count the squares. Row 3 has 4, row 1 has 6 and row 2 has 9. So the order is row 3, row 1, row 2.",
        ),
      ),
  ],
});

/** MA1-GM-02: measuring, comparing and estimating lengths with uniform informal units. */
export const LENGTH_2 = levels(1050116, {
  very_easy: [
    (n) =>
      pic(
        strips(9, [7]),
        typed(
          "short_answer",
          n,
          "Each square is one cube. How many cubes long is the worm?",
          "7",
          "Count the shaded squares: 1, 2, 3, 4, 5, 6, 7.",
        ),
      ),
    (n) => trueFalse(n, "A giraffe is taller than a cat.", true, "A giraffe is one of the tallest animals. A cat is much shorter."),
    (n) =>
      choice(
        n,
        "Which is the shortest?",
        ["a bus", "a door", "a spoon"],
        2,
        "A spoon fits in your hand. A door and a bus are much longer.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        strips(9, [8, 3]),
        choice(
          n,
          "Look at the two strips. Which strip is longer?",
          ["the top strip", "the bottom strip", "They are the same"],
          1,
          "The bottom strip has 8 squares. The top strip has only 3 squares. So the bottom strip is longer.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Grace's pencil is 5 paper clips long. Ethan's pencil is 5 paper clips long too. The pencils are the ___ length.",
        "same",
        "Both pencils measure 5 paper clips, so they are the same length.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Noah walks 6 steps to the door. Then he walks 3 more steps to the tap. How many steps did he walk?",
        "9",
        "Start at 6 and count on 3: 7, 8, 9. Noah walked 9 steps.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Ava is taller than Tom. Tom is taller than Mei. Put them in order from shortest to tallest.",
        ["Mei", "Tom", "Ava"],
        "Mei is shorter than Tom, and Tom is shorter than Ava. So the order is Mei, Tom, Ava.",
      ),
    (n) =>
      choice(
        n,
        "Lucas wants to measure the length of the classroom. Which unit is best?",
        ["footsteps", "paper clips", "grains of rice", "buttons"],
        0,
        "A classroom is long. Footsteps are a big unit, so he won't need to count too many.",
      ),
    (n) =>
      pic(
        strips(7, [5, 5]),
        trueFalse(
          n,
          "Look at the grid. The ribbon in row 1 is the same length as the ribbon in row 2.",
          true,
          "Both ribbons start at the same end and both are 5 squares long, so they are the same length.",
        ),
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Chloe measures her book with paper clips. What should she do? Choose all that are right.",
        [
          "start at the very end of the book",
          "put the clips end to end",
          "leave gaps between the clips",
          "use clips that are all the same size",
        ],
        [0, 1, 3],
        "Start right at the end, put the clips end to end with no gaps, and use clips that are all the same size.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Aisha's scarf is 12 hand spans long. Liam's scarf is 8 hand spans long. How many hand spans longer is Aisha's scarf?",
        "4",
        "Count on from 8 to 12: 9, 10, 11, 12. That is 4 hand spans.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Harper's foot is 3 blocks long. Her dad's foot is 2 blocks longer. Dad's foot is ___ blocks long.",
        "5",
        "2 blocks longer than 3 means 3 + 2 = 5 blocks.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Zoe's ribbon is 10 blocks long. She cuts it into 2 pieces that are the same length. How many blocks long is each piece?",
        "5",
        "Share 10 into 2 equal parts. 5 + 5 = 10, so each piece is 5 blocks long.",
      ),
    (n) =>
      choice(
        n,
        "Arjun measures a mat with long sticks and gets 4. Mei measures the same mat with short sticks. What number might Mei get?",
        ["2", "4", "9", "1"],
        2,
        "Short sticks fit more times than long sticks, so Mei must get more than 4. Only 9 is more than 4.",
      ),
    (n) =>
      pic(
        strips(10, [8, 3, 6]),
        choice(
          n,
          "Look at the grid. Which ribbon is 2 blocks longer than the ribbon in row 3?",
          ["row 1", "row 2", "row 3"],
          0,
          "Row 3 has 6 blocks. 6 + 2 = 8, and row 1 has 8 blocks.",
        ),
      ),
  ],
});

/** MA1-2DS-02: comparing areas using uniform informal units in rows and columns. */
export const AREA = levels(1050201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 4, rows: 3, cells: block(3, 2) },
        typed("short_answer", n, "How many squares are shaded?", "6", "There are 2 rows of 3 shaded squares. 3 + 3 = 6."),
      ),
    (n) =>
      choice(
        n,
        "Which covers more of the table?",
        ["a placemat", "a stamp", "They cover the same"],
        0,
        "A placemat is much bigger than a stamp, so it covers more of the table.",
      ),
    (n) =>
      trueFalse(
        n,
        "Area is how much space a flat surface covers.",
        true,
        "Area tells us how much space the top of something covers, like a page or a floor.",
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
        choice(
          n,
          "How many squares cover this rectangle?",
          ["6", "8", "10", "4"],
          1,
          "There are 2 rows with 4 squares in each row. 4 + 4 = 8.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Mia covers her book with 10 sticky notes. Jack covers his book with 7 of the same sticky notes. Mia's book has the ___ area.",
        ["bigger", "larger", "greater"],
        "Mia needed more sticky notes, so her book covers more space. It has the bigger area.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 3, cells: block(5, 2) },
        typed(
          "short_answer",
          n,
          "Look at the shaded squares. How many shaded squares are in each row?",
          "5",
          "Count along one shaded row: 1, 2, 3, 4, 5. Each row has 5 shaded squares.",
        ),
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these could cover a desk with no gaps? Choose all that are right.",
        ["square sticky notes", "playing cards", "round coasters", "circle counters"],
        [0, 1],
        "Squares and rectangles fit together with no gaps. Circles always leave gaps between them.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 5, rows: 4, cells: block(4, 3) },
        choice(
          n,
          "There are 3 rows of shaded squares with 4 in each row. How many shaded squares are there?",
          ["7", "10", "12", "16"],
          2,
          "Add the rows: 4 + 4 + 4 = 12.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "When you cover a shape with tiles, the tiles can overlap.",
        false,
        "Tiles must not overlap and must not leave gaps. Otherwise the count is wrong.",
      ),
  ],
  hard: [
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
            [0, 2],
          ],
        },
        typed("short_answer", n, "How many squares are shaded?", "5", "3 squares along the bottom and 2 more going up. 3 + 2 = 5."),
      ),
    (n) =>
      choice(
        n,
        "Ava's rug is covered by 9 tiles. Leo's rug is covered by 12 tiles. The tiles are all the same size. Whose rug is bigger?",
        ["Leo's rug", "Ava's rug", "They are the same"],
        0,
        "Leo's rug needs more tiles of the same size, so it covers more space.",
      ),
    (n) =>
      ordering(
        n,
        "Put these from smallest area to largest area.",
        ["a stamp", "a playing card", "a beach towel", "a netball court"],
        "A stamp covers the least space. Then a playing card, then a beach towel. A netball court covers the most.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A path has 3 rows of tiles. There are 5 tiles in each row. How many tiles are there?",
        "15",
        "Add the rows: 5 + 5 + 5 = 15 tiles.",
      ),
    (n) =>
      choice(
        n,
        "Tom covers a page with 6 big squares. Zoe covers the same page with small squares. How many small squares might she use?",
        ["3", "6", "14", "1"],
        2,
        "Small squares cover less each, so Zoe needs more than 6. Only 14 is more than 6.",
      ),
    (n) =>
      pic(
        { kind: "grid", columns: 4, rows: 3, cells: [...block(4, 1), ...block(3, 1, 1)] },
        typed(
          "short_answer",
          n,
          "Kai wants to cover the whole grid. Some squares are shaded already. How many more squares does he need to shade?",
          "5",
          "The grid has 3 rows of 4, which is 12 squares. 7 are shaded. 12 − 7 = 5 more.",
        ),
      ),
  ],
});

/** MA1-2DS-02: comparing areas using uniform informal units in rows and columns. */
export const AREA_2 = levels(1050216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "grid", columns: 3, rows: 3, cells: block(2, 2) },
        typed("short_answer", n, "How many squares are shaded?", "4", "There are 2 rows of 2 shaded squares. 2 + 2 = 4."),
      ),
    (n) => trueFalse(n, "A door has a bigger area than a book.", true, "A door covers much more space than a book does."),
    (n) =>
      choice(
        n,
        "Which would you measure by covering it with squares?",
        ["the top of a table", "how heavy a bag is", "how long a hose is", "how much a cup holds"],
        0,
        "Covering with squares measures area. The top of a table is a flat surface, so it has an area.",
      ),
  ],
  easy: [
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
          "How many small squares cover this shape?",
          "9",
          "There are 3 rows with 3 squares in each. 3 + 3 + 3 = 9.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Isla covers a mat with 8 tiles. Noah covers another mat with 5 tiles of the same size. Which mat is smaller?",
        ["Noah's mat", "Isla's mat", "They are the same"],
        0,
        "Noah's mat needs fewer tiles of the same size, so it covers less space.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Grace makes 4 rows of tiles. Each row has 2 tiles. That is ___ tiles.",
        "8",
        "Add the rows: 2 + 2 + 2 + 2 = 8 tiles.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "grid", columns: 6, rows: 2, cells: block(6, 2) },
        choice(n, "How many squares are shaded?", ["8", "10", "12", "6"], 2, "There are 2 rows of 6 squares. 6 + 6 = 12."),
      ),
    (n) =>
      multi(
        n,
        "Which of these leave gaps when you use them to cover a page? Choose all that are right.",
        ["coins", "round buttons", "square tiles", "rectangle cards"],
        [0, 1],
        "Round things leave gaps between them. Square tiles and rectangle cards fit together with no gaps.",
      ),
    (n) =>
      trueFalse(
        n,
        "Two shapes can look different but still have the same area.",
        true,
        "A long thin shape made of 6 squares and a short fat shape made of 6 squares look different, but both cover 6 squares.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [4, 0],
            [4, 2],
            [2, 2],
            [2, 3],
            [0, 3],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "How many small squares cover this shape?",
          "10",
          "The bottom part is 2 rows of 4, which is 8. The top part has 2 more. 8 + 2 = 10.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Mia, Liam and Chloe cover their mats with the same tiles. Mia uses 7, Liam uses 11 and Chloe uses 4. Put the mats in order from smallest to largest.",
        ["Chloe's mat", "Mia's mat", "Liam's mat"],
        "Fewer tiles means a smaller mat. 4 is less than 7, and 7 is less than 11.",
      ),
    (n) =>
      choice(
        n,
        "Ethan covers his book with 6 sticky notes. Ruby covers her book with 6 playing cards. Playing cards are bigger than sticky notes. Whose book has the bigger area?",
        ["Ruby's book", "Ethan's book", "They are the same"],
        0,
        "They both used 6, but Ruby's cards are bigger. 6 big cards cover more space than 6 small notes.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        { kind: "grid", columns: 5, rows: 4, cells: block(5, 1) },
        typed(
          "short_answer",
          n,
          "Look at the grid. The bottom row is shaded. How many squares are not shaded?",
          "15",
          "There are 3 rows that are not shaded, with 5 squares in each. 5 + 5 + 5 = 15.",
        ),
      ),
    (n) => typed("fill_blank", n, "A wall has 2 rows of 10 tiles. That is ___ tiles.", "20", "Add the rows: 10 + 10 = 20 tiles."),
    (n) =>
      choice(
        n,
        "Shape A is 2 rows of 4 squares. Shape B is 3 rows of 3 squares. The squares are the same size. Which shape has the bigger area?",
        ["Shape B", "Shape A", "They are the same"],
        0,
        "Shape A is 4 + 4 = 8 squares. Shape B is 3 + 3 + 3 = 9 squares. 9 is more, so Shape B is bigger.",
      ),
  ],
});

/** MA1-3DS-02: comparing capacities and volumes with informal units. */
export const CAPACITY = levels(1050301, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which holds more water?",
        ["a bucket", "a cup", "They hold the same"],
        0,
        "A bucket is much bigger inside than a cup, so it holds more water.",
      ),
    (n) =>
      trueFalse(
        n,
        "A full bath holds more water than a full teacup.",
        true,
        "A bath holds lots and lots of water. A teacup holds only a little.",
      ),
    (n) =>
      pic(
        graph("Cups of water each container holds", "cups", [
          ["Jug", 4],
          ["Bowl", 2],
        ]),
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many cups does the jug hold?",
          "4",
          "Count the pictures next to Jug: 1, 2, 3, 4.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        graph("Cups of water each container holds", "cups", [
          ["Bottle", 3],
          ["Vase", 6],
          ["Mug", 1],
        ]),
        choice(
          n,
          "Look at the picture graph. Which container holds the most?",
          ["Vase", "Bottle", "Mug"],
          0,
          "The vase has 6 pictures, more than any other, so it holds the most cups.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Aisha fills a jar with 5 scoops of rice. Tom fills another jar with 8 scoops. Tom's jar holds ___ more scoops.",
        "3",
        "Count on from 5 to 8: 6, 7, 8. That is 3 more scoops.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 1 },
        typed("short_answer", n, "How many blocks are in this model?", "6", "There are 2 rows of 3 blocks. 3 + 3 = 6."),
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these from holds the least to holds the most.",
        ["a spoon", "a cup", "a bucket", "a swimming pool"],
        "A spoon holds a tiny bit. A cup holds more, a bucket more again, and a swimming pool holds the most.",
      ),
    (n) =>
      multi(
        n,
        "Mei fills a pot using cups of water. What should she do? Choose all that are right.",
        ["use the same cup each time", "fill the cup to the top each time", "spill some water each time", "use a different cup each time"],
        [0, 1],
        "To measure fairly, use the same cup each time and fill it to the top every time.",
      ),
    (n) =>
      trueFalse(
        n,
        "A tall glass always holds more than a short, wide bowl.",
        false,
        "Tall does not always mean more. The bowl is wide, so it might hold more. Fill one and pour it into the other to check.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        graph("Cups of water each container holds", "cups", [
          ["Teapot", 5],
          ["Jug", 7],
          ["Bottle", 5],
        ]),
        multi(
          n,
          "Look at the picture graph. Which two hold the same amount? Choose both.",
          ["Teapot", "Jug", "Bottle"],
          [0, 2],
          "The teapot and the bottle both have 5 pictures, so they hold the same. The jug holds 7.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Leo pours a full jug of water into an empty bowl. The water spills over the top. Which is true?",
        ["The jug holds more than the bowl", "The bowl holds more than the jug", "They hold the same"],
        0,
        "The bowl could not fit all the water from the jug, so the jug holds more.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 2, width: 2, height: 2 },
        choice(
          n,
          "How many blocks make this model?",
          ["4", "6", "8", "10"],
          2,
          "There are 2 layers. Each layer has 4 blocks. 4 + 4 = 8. Some blocks are hidden at the back.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bucket holds 10 cups of water. Ruby has poured in 6 cups. How many more cups does she need to fill it?",
        "4",
        "Count on from 6 to 10: 7, 8, 9, 10. She needs 4 more cups.",
      ),
    (n) =>
      choice(
        n,
        "Jack fills a tub with 5 big scoops of sand. Ella fills the same tub with small scoops. How many small scoops might she need?",
        ["3", "5", "9", "2"],
        2,
        "Small scoops hold less, so Ella needs more than 5. Only 9 is more than 5.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A jug holds 3 cups of water. Sam pours 3 full jugs into a tank to fill it. How many cups does the tank hold?",
        "9",
        "Each jug is 3 cups. 3 + 3 + 3 = 9 cups.",
      ),
  ],
});

/** MA1-3DS-02: comparing capacities and volumes with informal units. */
export const CAPACITY_2 = levels(1050316, {
  very_easy: [
    (n) => trueFalse(n, "A teaspoon holds less than a bucket.", true, "A teaspoon holds only a tiny bit. A bucket holds much more."),
    (n) =>
      pic(
        graph("Scoops of sand each pail holds", "scoops", [
          ["Red pail", 3],
          ["Blue pail", 5],
        ]),
        choice(
          n,
          "Look at the picture graph. Which pail holds more sand?",
          ["Blue pail", "Red pail", "They hold the same"],
          0,
          "The blue pail has 5 pictures and the red pail has 3. 5 is more.",
        ),
      ),
    (n) =>
      choice(
        n,
        "What does capacity tell us?",
        ["how much a container holds", "how long a thing is", "how heavy a thing is", "what time it is"],
        0,
        "Capacity is how much a container can hold, like how many cups of water fit in a jug.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 1, height: 1 },
        typed("short_answer", n, "How many blocks are in this model?", "4", "Count the blocks in the row: 1, 2, 3, 4."),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A cup holds less than a jug. So a jug holds ___ than a cup.",
        "more",
        "If the cup holds less, then the jug holds more.",
      ),
    (n) =>
      ordering(
        n,
        "Noah fills three boxes with blocks. Box A holds 9, Box B holds 4 and Box C holds 6. Put them from holds the least to holds the most.",
        ["Box B", "Box C", "Box A"],
        "4 is the smallest, then 6, then 9. So the order is Box B, Box C, Box A.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        graph("Cups of water each container holds", "cups", [
          ["Kettle", 6],
          ["Mug", 2],
          ["Pot", 9],
        ]),
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more cups does the pot hold than the kettle?",
          "3",
          "The pot holds 9 cups and the kettle holds 6. Count on from 6 to 9: 7, 8, 9. That is 3 more.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these hold more than a cup? Choose all that are right.",
        ["a bucket", "a bath", "a thimble", "an egg cup"],
        [0, 1],
        "A bucket and a bath hold lots of cups of water. A thimble and an egg cup hold less than a cup.",
      ),
    (n) =>
      choice(
        n,
        "Chloe fills a bottle with 7 cups of water. Harper fills a vase with 7 of the same cups. Which is true?",
        ["The bottle and the vase hold the same", "The bottle holds more", "The vase holds more"],
        0,
        "Both took 7 of the same cups, so they hold the same amount.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 3, height: 1 },
        typed("short_answer", n, "How many blocks are in this model?", "9", "There are 3 rows of 3 blocks. 3 + 3 + 3 = 9."),
      ),
    (n) =>
      trueFalse(
        n,
        "Liam fills a bowl with 6 small scoops. If he uses a big scoop instead, he will need more than 6 scoops.",
        false,
        "A big scoop holds more each time, so he will need fewer than 6 big scoops.",
      ),
    (n) =>
      choice(
        n,
        "Two jars look different. How can you find out which one holds more?",
        ["Fill one with water and pour it into the other", "See which one is taller", "See which one is a nicer colour", "Count the lids"],
        0,
        "Pouring tells you for sure. If the water spills over, the first jar holds more. Tall does not always mean more.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        graph("Cups of water each container holds", "cups", [
          ["Tank", 10],
          ["Bucket", 5],
          ["Jug", 2],
        ]),
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many full buckets of water would fill the tank?",
          "2",
          "The bucket holds 5 cups and the tank holds 10. 5 + 5 = 10, so 2 buckets fill the tank.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "Isla builds this model with blocks. Then she takes away 3 blocks. How many blocks are left?",
          "5",
          "The model has 2 rows of 4 blocks, which is 8. 8 − 3 = 5.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A jug holds 4 cups. A bucket holds as much as 3 jugs. The bucket holds ___ cups.",
        "12",
        "3 jugs of 4 cups is 4 + 4 + 4 = 12 cups.",
      ),
  ],
});

/** MA1-NSM-01: comparing masses (heavier, lighter, balance scales, informal units). */
export const MASS = levels(1050401, {
  very_easy: [
    (n) =>
      choice(n, "Which is heavier?", ["a brick", "a feather", "They are the same"], 0, "A brick is hard to lift. A feather is very light."),
    (n) =>
      trueFalse(n, "A balloon is lighter than a watermelon.", true, "A balloon is full of air and floats easily. A watermelon is heavy."),
    (n) =>
      choice(
        n,
        "On a balance scale, which side goes down?",
        ["the heavier side", "the lighter side", "the bigger side", "neither side"],
        0,
        "The heavier side pushes down more, so it goes down. The lighter side goes up.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        graph("Blocks needed to balance each toy", "blocks", [
          ["Teddy", 6],
          ["Car", 3],
        ]),
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many blocks balance the teddy?",
          "6",
          "Count the pictures next to Teddy: 1, 2, 3, 4, 5, 6.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these from lightest to heaviest.",
        ["a leaf", "an apple", "a school bag", "a car"],
        "A leaf is the lightest. An apple is heavier, a full school bag heavier again, and a car is the heaviest.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "When a balance scale is level, both sides have the ___ mass.",
        "same",
        "If neither side goes down, the two sides are just as heavy as each other.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        graph("Blocks needed to balance each thing", "blocks", [
          ["Ball", 4],
          ["Book", 7],
          ["Shoe", 5],
        ]),
        choice(
          n,
          "Look at the picture graph. Which is the heaviest?",
          ["Book", "Shoe", "Ball"],
          0,
          "The book needs 7 blocks to balance it. That is the most blocks, so the book is the heaviest.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Ella puts a rock on one side of a balance and a sponge on the other. The rock side goes down. Choose all that are true.",
        [
          "The rock is heavier than the sponge",
          "The sponge is lighter than the rock",
          "The sponge is heavier than the rock",
          "They have the same mass",
        ],
        [0, 1],
        "The side that goes down is heavier. So the rock is heavier and the sponge is lighter.",
      ),
    (n) =>
      trueFalse(
        n,
        "A big object is always heavier than a small object.",
        false,
        "A big beach ball is lighter than a small rock. Size does not tell you the mass.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        graph("Blocks needed to balance each thing", "blocks", [
          ["Ball", 4],
          ["Book", 7],
          ["Shoe", 5],
        ]),
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many more blocks does the book need than the ball?",
          "3",
          "The book needs 7 and the ball needs 4. Count on from 4 to 7: 5, 6, 7. That is 3 more.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ava holds a box in each hand. One feels a bit heavier. What is the best way to check?",
        ["Use a balance scale", "See which is a nicer colour", "See which is bigger", "See which is newer"],
        0,
        "Hands can be tricked. A balance scale shows which box is heavier, because that side goes down.",
      ),
    (n) =>
      ordering(
        n,
        "The cat is heavier than the rabbit. The dog is heavier than the cat. Put them from lightest to heaviest.",
        ["rabbit", "cat", "dog"],
        "The rabbit is lighter than the cat, and the cat is lighter than the dog.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "One apple balances 5 blocks. How many blocks balance 2 of the same apples?",
        "10",
        "Each apple is 5 blocks. 5 + 5 = 10 blocks.",
      ),
    (n) =>
      choice(
        n,
        "Kai balances a toy with 6 big blocks. Mia balances the same toy with small blocks. How many small blocks might she need?",
        ["4", "6", "10", "3"],
        2,
        "Small blocks are lighter, so Mia needs more than 6. Only 10 is more than 6.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Fruit", "Marbles to balance"],
          rows: [
            ["Banana", 4],
            ["Pear", 6],
            ["Lemon", 3],
          ],
        },
        multi(
          n,
          "Look at the table. Which fruit are lighter than the pear? Choose all that are right.",
          ["Banana", "Lemon", "Pear"],
          [0, 1],
          "The pear needs 6 marbles. The banana needs 4 and the lemon needs 3. Both are fewer, so both are lighter.",
        ),
      ),
  ],
});

/** MA1-NSM-01: comparing masses (heavier, lighter, balance scales, informal units). */
export const MASS_2 = levels(1050416, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Which is the lightest?",
        ["a sheet of paper", "a bag of potatoes", "a bike"],
        0,
        "A sheet of paper is very easy to lift. Potatoes and a bike are much heavier.",
      ),
    (n) => trueFalse(n, "An elephant is heavier than a mouse.", true, "An elephant is huge and very heavy. A mouse is tiny and light."),
    (n) =>
      pic(
        graph("Marbles needed to balance each toy", "marbles", [
          ["Duck", 2],
          ["Robot", 5],
        ]),
        choice(
          n,
          "Look at the picture graph. Which toy is heavier?",
          ["Robot", "Duck", "They are the same"],
          0,
          "The robot needs 5 marbles and the duck needs 2. More marbles means heavier.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "A kangaroo is heavier than a possum. So a possum is ___ than a kangaroo.",
        "lighter",
        "If the kangaroo is heavier, then the possum must be lighter.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A pencil case balances 7 cubes. A ruler balances 2 cubes. How many more cubes does the pencil case need?",
        "5",
        "7 − 2 = 5. The pencil case needs 5 more cubes.",
      ),
    (n) =>
      trueFalse(n, "When you put a heavy book on one side of a balance, that side goes up.", false, "The heavy side goes down, not up."),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Toy", "Blocks to balance"],
          rows: [
            ["Bear", 8],
            ["Truck", 5],
            ["Doll", 6],
          ],
        },
        ordering(
          n,
          "Look at the table. Put the toys in order from lightest to heaviest.",
          ["Truck", "Doll", "Bear"],
          "Fewer blocks means lighter. 5 is less than 6, and 6 is less than 8.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are heavier than a school bag? Choose all that are right.",
        ["a fridge", "a horse", "a pencil", "a leaf"],
        [0, 1],
        "A fridge and a horse are much heavier than a school bag. A pencil and a leaf are lighter.",
      ),
    (n) =>
      choice(
        n,
        "Tom puts a lunchbox on one side of a balance and a ball on the other. The lunchbox side goes down. Which is lighter?",
        ["the ball", "the lunchbox", "They are the same"],
        0,
        "The heavier side goes down, so the lunchbox is heavier and the ball is lighter.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        graph("Marbles needed to balance each fruit", "marbles", [
          ["Peach", 4],
          ["Plum", 3],
        ]),
        typed(
          "short_answer",
          n,
          "Look at the picture graph. How many marbles balance the peach and the plum together?",
          "7",
          "The peach needs 4 marbles and the plum needs 3. 4 + 3 = 7.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A box is big but very light. What could be inside?",
        ["feathers", "rocks", "bricks", "sand"],
        0,
        "Feathers are very light, so a big box of feathers is still light. Rocks, bricks and sand are heavy.",
      ),
    (n) =>
      trueFalse(
        n,
        "Grace needs 9 small cubes to balance her shoe. With bigger, heavier cubes she would need fewer than 9.",
        true,
        "Each big cube is heavier, so it takes fewer of them to balance the same shoe.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        graph("Marbles needed to balance each fruit", "marbles", [
          ["Mango", 6],
          ["Kiwi fruit", 2],
          ["Peach", 4],
          ["Plum", 3],
        ]),
        multi(
          n,
          "Look at the picture graph. Which two fruit together have the same mass as the mango? Choose both.",
          ["Kiwi fruit", "Peach", "Plum"],
          [0, 1],
          "The mango needs 6 marbles. Kiwi fruit and peach: 2 + 4 = 6. The others do not make 6.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "One tin balances 3 blocks. How many blocks balance 3 of the same tins?",
        "9",
        "Each tin is 3 blocks. 3 + 3 + 3 = 9 blocks.",
      ),
    (n) =>
      ordering(
        n,
        "The melon is heavier than the pumpkin. The apple is lighter than the pumpkin. Put them in order from heaviest to lightest.",
        ["melon", "pumpkin", "apple"],
        "The melon is heavier than the pumpkin, and the pumpkin is heavier than the apple.",
      ),
  ],
});

/** MA1-NSM-02: durations of events, days of the week, months, o'clock and half past. */
export const TIME = levels(1060101, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 3, minute: 0 },
        choice(
          n,
          "What time does the clock show?",
          ["3 o'clock", "half past 3", "4 o'clock", "12 o'clock"],
          0,
          "The long hand points to 12 and the short hand points to 3. That is 3 o'clock.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "What day comes after Monday?",
        "Tuesday",
        "The days go Monday, Tuesday, Wednesday. Tuesday comes after Monday.",
      ),
    (n) =>
      trueFalse(n, "There are 7 days in a week.", true, "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. That is 7 days."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 6, minute: 30 },
        typed(
          "short_answer",
          n,
          "What time does the clock show?",
          ["half past 6", "half past six", "6:30"],
          "The long hand points to 6, so it is half past. The short hand is between 6 and 7, so it is half past 6.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these days in order, starting with Monday.",
        ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "The school week goes Monday, Tuesday, Wednesday, Thursday, then Friday.",
      ),
    (n) =>
      choice(
        n,
        "Which takes the longest time?",
        ["a school day", "brushing your teeth", "clapping once"],
        0,
        "Clapping takes a moment and brushing teeth takes a few minutes. A school day takes many hours.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "clock", hour: 9, minute: 30 },
        multi(
          n,
          "Which of these mean the time on this clock? Choose all that are right.",
          ["half past 9", "9:30", "9 o'clock", "half past 10"],
          [0, 1],
          "The long hand points to 6 and the short hand is between 9 and 10. That is half past 9, which we can also write as 9:30.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The day before Friday is ___.",
        "Thursday",
        "The days go Wednesday, Thursday, Friday. Thursday comes just before Friday.",
      ),
    (n) =>
      trueFalse(
        n,
        "At half past 4, the long hand points to the 6.",
        true,
        "At half past, the long hand has gone halfway around the clock. It points straight down at the 6.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these months in order, starting with the first month of the year.",
        ["January", "February", "March", "April"],
        "The year starts with January, then February, March and April.",
      ),
    (n) =>
      choice(
        n,
        "Today is Saturday. What day was it yesterday?",
        ["Friday", "Sunday", "Thursday", "Monday"],
        0,
        "Yesterday is the day before today. The day before Saturday is Friday.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 11, minute: 0 },
        typed(
          "short_answer",
          n,
          "Look at the clock. What time will it be in 1 hour?",
          ["12 o'clock", "12:00", "12"],
          "The clock shows 11 o'clock. One hour later the short hand moves to 12, so it will be 12 o'clock.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "December is the last month of the year. What month comes after December?",
        "January",
        "After December a new year starts, and the first month is January.",
      ),
    (n) =>
      choice(
        n,
        "School starts at 9 o'clock. Lunch is at half past 12. Recess is after school starts and before lunch. What time could recess be?",
        ["11 o'clock", "8 o'clock", "1 o'clock", "half past 1"],
        0,
        "Recess must be after 9 o'clock and before half past 12. Only 11 o'clock is between them.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 30 },
        typed(
          "short_answer",
          n,
          "Ella's swimming lesson starts at the time on the clock. It lasts half an hour. What time does it finish?",
          ["3 o'clock", "3:00", "3"],
          "The clock shows half past 2. Half an hour later, the long hand goes round to 12 and it is 3 o'clock.",
        ),
      ),
  ],
});

/** MA1-NSM-02: durations of events, days of the week, months, o'clock and half past. */
export const TIME_2 = levels(1060116, {
  very_easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 8, minute: 0 },
        typed(
          "short_answer",
          n,
          "What time does the clock show?",
          ["8 o'clock", "eight o'clock", "8:00", "8"],
          "The long hand points to 12 and the short hand points to 8. That is 8 o'clock.",
        ),
      ),
    (n) =>
      choice(n, "Which day is part of the weekend?", ["Sunday", "Monday", "Wednesday", "Friday"], 0, "The weekend is Saturday and Sunday."),
    (n) =>
      trueFalse(
        n,
        "At 5 o'clock, the long hand points to the 12.",
        true,
        "At any o'clock time, the long hand points straight up to the 12.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "clock", hour: 1, minute: 30 },
        choice(
          n,
          "What time does the clock show?",
          ["half past 1", "half past 6", "1 o'clock", "half past 2"],
          0,
          "The long hand points to 6, so it is half past. The short hand is between 1 and 2, so it is half past 1.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The day after Wednesday is ___.",
        "Thursday",
        "The days go Tuesday, Wednesday, Thursday. Thursday comes after Wednesday.",
      ),
    (n) =>
      ordering(
        n,
        "Put these from the shortest time to the longest time.",
        ["blinking", "tying your shoes", "watching a movie", "a week of school"],
        "A blink is very quick. Tying shoes takes a little while. A movie takes a couple of hours. A school week takes 5 days.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which of these are months? Choose all that are right.",
        ["July", "Monday", "October", "Sunday"],
        [0, 2],
        "July and October are months of the year. Monday and Sunday are days of the week.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 10, minute: 0 },
        choice(
          n,
          "Look at the clock. What time was it 1 hour ago?",
          ["9 o'clock", "11 o'clock", "half past 9", "10 o'clock"],
          0,
          "The clock shows 10 o'clock. One hour before 10 o'clock is 9 o'clock.",
        ),
      ),
    (n) => typed("short_answer", n, "How many days are in the weekend?", "2", "The weekend is Saturday and Sunday. That is 2 days."),
  ],
  hard: [
    (n) =>
      trueFalse(
        n,
        "At half past 7, the short hand points straight at the 7.",
        false,
        "At half past 7 the short hand has moved halfway from the 7 to the 8, so it is between them.",
      ),
    (n) =>
      choice(
        n,
        "Which month comes just before June?",
        ["May", "July", "April", "March"],
        0,
        "The months go April, May, June. May is just before June.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 30 },
        typed(
          "fill_blank",
          n,
          "This clock shows half past ___.",
          ["4", "four"],
          "The long hand points to 6, so it is half past. The short hand is between 4 and 5, so it is half past 4.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      ordering(
        n,
        "Put these months in order, starting with the earliest in the year.",
        ["March", "June", "September", "December"],
        "March comes early in the year. Then June, then September. December is the last month.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Today is Thursday. What day will it be in 2 days?",
        "Saturday",
        "Count on 2 days from Thursday: Friday, Saturday.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 7, minute: 30 },
        choice(
          n,
          "A movie started at 7 o'clock. The clock shows when it finished. How long was the movie?",
          ["half an hour", "1 hour", "2 hours", "7 hours"],
          0,
          "The clock shows half past 7. From 7 o'clock to half past 7 is half an hour.",
        ),
      ),
  ],
});

/** MA1-2DS-01: recognising and describing 2D shapes (sides and corners). */
export const SHAPES_2D = levels(1070101, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [7, 1],
            [4, 6],
          ],
        },
        choice(
          n,
          "What is the name of this shape?",
          ["triangle", "square", "circle", "rectangle"],
          0,
          "It has 3 straight sides and 3 corners, so it is a triangle.",
        ),
      ),
    (n) => trueFalse(n, "A circle has no corners.", true, "A circle is round all the way around. It has no straight sides and no corners."),
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
        typed("short_answer", n, "How many sides does this shape have?", "4", "Count the straight sides as you go around: 1, 2, 3, 4."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 2],
            [11, 2],
            [11, 6],
            [1, 6],
          ],
        },
        choice(
          n,
          "What is the name of this shape?",
          ["rectangle", "square", "triangle", "circle"],
          0,
          "It has 4 sides and 4 corners. Two sides are long and two are short, so it is a rectangle.",
        ),
      ),
    (n) => typed("fill_blank", n, "A triangle has ___ corners.", ["3", "three"], "A triangle has 3 sides and 3 corners."),
    (n) =>
      multi(
        n,
        "Which shapes have 4 sides? Choose all that are right.",
        ["square", "rectangle", "triangle", "circle"],
        [0, 1],
        "Squares and rectangles have 4 sides. A triangle has 3 sides and a circle has none.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 1],
            [7, 1],
            [9, 4],
            [7, 7],
            [3, 7],
            [1, 4],
          ],
        },
        typed("short_answer", n, "How many corners does this shape have?", "6", "Count the corners as you go around: 1, 2, 3, 4, 5, 6."),
      ),
    (n) =>
      choice(n, "Which shape has 5 sides?", ["pentagon", "hexagon", "triangle", "square"], 0, "A pentagon has 5 sides. A hexagon has 6."),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 1],
            [8, 1],
            [9, 5],
            [6, 7],
            [3, 5],
          ],
        },
        trueFalse(
          n,
          "This shape is a hexagon.",
          false,
          "Count the sides: 1, 2, 3, 4, 5. It has 5 sides, so it is a pentagon. A hexagon has 6 sides.",
        ),
      ),
  ],
  hard: [
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
            [5, 1],
            [8, 4],
            [5, 7],
            [2, 4],
          ],
        },
        trueFalse(
          n,
          "This shape is a square that has been turned. It is still a square.",
          true,
          "It still has 4 sides that are all the same length and 4 square corners. Turning a shape does not change what it is.",
        ),
      ),
    (n) => typed("short_answer", n, "How many corners do 2 triangles have altogether?", "6", "Each triangle has 3 corners. 3 + 3 = 6."),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these are true about a square? Choose all that are right.",
        ["It has 4 sides", "All its sides are the same length", "It has 4 corners", "It has 3 corners"],
        [0, 1, 2],
        "A square has 4 sides that are all the same length, and 4 corners.",
      ),
    (n) =>
      choice(
        n,
        "I have 4 sides. Two sides are long and two sides are short. What am I?",
        ["rectangle", "square", "triangle", "hexagon"],
        0,
        "A square has 4 sides all the same length. A shape with 2 long sides and 2 short sides is a rectangle.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [9, 1],
            [9, 3],
            [4, 3],
            [4, 7],
            [1, 7],
          ],
        },
        choice(
          n,
          "How many corners does this shape have?",
          ["4", "5", "6", "8"],
          2,
          "Go around the shape and count each corner carefully: 1, 2, 3, 4, 5, 6. Don't miss the corner on the inside.",
        ),
      ),
  ],
});

/** MA1-2DS-01: recognising and describing 2D shapes (sides and corners). */
export const SHAPES_2D_2 = levels(1070116, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [11, 1],
            [11, 5],
            [1, 5],
          ],
        },
        typed("short_answer", n, "How many corners does this shape have?", "4", "Count the corners as you go around: 1, 2, 3, 4."),
      ),
    (n) =>
      choice(
        n,
        "Which shape is round?",
        ["circle", "square", "triangle", "rectangle"],
        0,
        "A circle is round. The other shapes have straight sides and corners.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 1],
            [10, 1],
            [2, 7],
          ],
        },
        trueFalse(n, "This shape is a triangle.", true, "It has 3 straight sides and 3 corners, so it is a triangle."),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 1],
            [9, 1],
            [9, 7],
            [3, 7],
          ],
        },
        choice(
          n,
          "What is the name of this shape?",
          ["square", "triangle", "pentagon", "circle"],
          0,
          "It has 4 sides that are all the same length and 4 corners, so it is a square.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "How many sides does a rectangle have?", ["4", "four"], "A rectangle has 4 straight sides and 4 corners."),
    (n) => trueFalse(n, "A triangle has 4 sides.", false, "A triangle has 3 sides. The word starts with 'tri', which means three."),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 1],
            [8, 1],
            [10, 4],
            [8, 7],
            [4, 7],
            [2, 4],
          ],
        },
        choice(
          n,
          "What is the name of this shape?",
          ["hexagon", "pentagon", "rectangle", "square"],
          0,
          "Count the sides: 1, 2, 3, 4, 5, 6. A shape with 6 sides is a hexagon.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "All the sides of a square are the same length. A square has ___ sides.",
        ["4", "four"],
        "A square has 4 sides, and they are all the same length.",
      ),
    (n) =>
      multi(
        n,
        "Which shapes have straight sides? Choose all that are right.",
        ["triangle", "hexagon", "circle", "oval"],
        [0, 1],
        "Triangles and hexagons have straight sides. Circles and ovals have one curved edge.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 1],
            [9, 1],
            [10, 5],
            [6, 7],
            [2, 5],
          ],
        },
        typed("short_answer", n, "How many sides does this shape have?", ["5", "five"], "Count the sides as you go around: 1, 2, 3, 4, 5."),
      ),
    (n) =>
      choice(
        n,
        "Which shape has the most corners?",
        ["hexagon", "pentagon", "square", "triangle"],
        0,
        "A hexagon has 6 corners, a pentagon 5, a square 4 and a triangle 3. 6 is the most.",
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from most corners to fewest corners.",
        ["hexagon", "pentagon", "rectangle", "triangle"],
        "A hexagon has 6 corners, a pentagon 5, a rectangle 4 and a triangle 3.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 1],
            [12, 1],
            [1, 3],
          ],
        },
        trueFalse(
          n,
          "This shape is long and thin, but it is still a triangle.",
          true,
          "It has 3 straight sides and 3 corners. Any shape like that is a triangle, even a long thin one.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ava has 3 squares. How many corners do they have altogether?",
        "12",
        "Each square has 4 corners. 4 + 4 + 4 = 12.",
      ),
    (n) =>
      choice(
        n,
        "I have 6 sides and 6 corners. What am I?",
        ["hexagon", "pentagon", "rectangle", "triangle"],
        0,
        "A shape with 6 sides and 6 corners is a hexagon.",
      ),
  ],
});

/** MA1-3DS-01: recognising and describing 3D objects (faces; roll, slide, stack). */
export const OBJECTS_3D = levels(1070201, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "sphere" },
        choice(
          n,
          "What is this object?",
          ["sphere", "cube", "cone", "cylinder"],
          0,
          "It is round all over like a ball, so it is a sphere.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        typed(
          "short_answer",
          n,
          "What is the name of this object?",
          "cube",
          "It has flat square faces that are all the same size, so it is a cube.",
        ),
      ),
    (n) => trueFalse(n, "A ball can roll.", true, "A ball is round all over, so it rolls easily."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        choice(
          n,
          "This object is a cylinder. Which thing has the same shape?",
          ["a can of soup", "a dice", "an ice-cream cone", "a tennis ball"],
          0,
          "A can of soup has two flat round ends and a curved side, just like a cylinder.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which objects can roll? Choose all that are right.",
        ["sphere", "cylinder", "cube", "rectangular prism"],
        [0, 1],
        "Spheres and cylinders have curved surfaces, so they roll. Cubes and prisms have only flat faces, so they slide.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A cube has ___ flat faces.",
        ["6", "six"],
        "A cube has 6 square faces: top, bottom, front, back and two sides.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "cone" },
        trueFalse(n, "This object is a cone.", true, "It has one flat round face and comes to a point, like a party hat. That is a cone."),
      ),
    (n) =>
      choice(
        n,
        "Which object can roll and can also be stacked?",
        ["cylinder", "sphere", "cube", "cone"],
        0,
        "A cylinder rolls on its curved side and stacks on its flat ends. A sphere rolls but won't stack. A cube stacks but won't roll.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        choice(
          n,
          "What is this object?",
          ["pyramid", "cube", "cone", "cylinder"],
          0,
          "It has a square face on the bottom and triangle faces that meet at a point. That is a pyramid.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        choice(
          n,
          "Which thing has the same shape as this object?",
          ["a cereal box", "a ball", "a party hat", "a tin can"],
          0,
          "This is a rectangular prism. It has 6 flat rectangle faces, just like a cereal box.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many flat faces does a cylinder have?",
        ["2", "two"],
        "A cylinder has a flat round face at each end. That is 2. Its side is curved, not flat.",
      ),
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest flat faces to most flat faces.",
        ["sphere", "cone", "cylinder", "cube"],
        "A sphere has 0 flat faces, a cone 1, a cylinder 2 and a cube 6.",
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which objects have only flat faces? Choose all that are right.",
        ["cube", "rectangular prism", "cylinder", "cone"],
        [0, 1],
        "Cubes and rectangular prisms have only flat faces. Cylinders and cones also have a curved surface.",
      ),
    (n) =>
      choice(
        n,
        "Mia's object has 1 flat face that is a circle. It also has a curved surface and a point. What is it?",
        ["cone", "cylinder", "sphere", "cube"],
        0,
        "A cone has one flat circle face, a curved surface and a point at the top.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "sphere" },
        trueFalse(
          n,
          "You could easily build a tall tower by stacking these objects.",
          false,
          "This is a sphere. It has no flat faces, so it rolls off and won't stack.",
        ),
      ),
  ],
});

/** MA1-3DS-01: recognising and describing 3D objects (faces; roll, slide, stack). */
export const OBJECTS_3D_2 = levels(1070216, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cone" },
        choice(
          n,
          "What is this object?",
          ["cone", "cylinder", "pyramid", "sphere"],
          0,
          "It has a round flat face and a point, like an ice-cream cone. It is a cone.",
        ),
      ),
    (n) => trueFalse(n, "A cereal box can slide along a table.", true, "A cereal box has flat faces, so it slides when you push it."),
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        typed(
          "short_answer",
          n,
          "What is the name of this object?",
          "cylinder",
          "It has two flat round ends and a curved side, like a tin can. It is a cylinder.",
        ),
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which thing has the shape of a sphere?",
        ["an orange", "a book", "a dice", "a tin can"],
        0,
        "An orange is round all over, like a ball. That is a sphere.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        multi(
          n,
          "Which are true about this object? Choose all that are right.",
          ["It has flat faces", "It can be stacked", "It rolls easily", "It has a point at the top"],
          [0, 1],
          "This is a cube. It has 6 flat faces, so it stacks and slides. It does not roll and has no point.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many flat faces does a sphere have?",
        ["0", "none", "zero", "no faces"],
        "A sphere is curved all over. It has no flat faces at all.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "fill_blank",
          n,
          "This object has ___ flat faces.",
          ["6", "six"],
          "A rectangular prism has a top, a bottom, a front, a back and two sides. That is 6 flat faces.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which object has exactly 1 flat face?",
        ["cone", "cube", "cylinder", "rectangular prism"],
        0,
        "A cone has 1 flat circle face. A cylinder has 2, and a cube and a rectangular prism have 6.",
      ),
    (n) =>
      trueFalse(
        n,
        "A cylinder can roll and it can also stack.",
        true,
        "A cylinder rolls on its curved side. It stacks on its flat ends, like a pile of tins.",
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "Which objects can slide on a flat face? Choose all that are right.",
        ["cube", "cylinder", "cone", "sphere"],
        [0, 1, 2],
        "A cube, a cylinder and a cone all have at least one flat face to slide on. A sphere has no flat face, so it rolls.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "sphere" },
        choice(
          n,
          "Why is it hard to stack these objects?",
          ["They have no flat faces", "They are too heavy", "They have too many corners", "They are too small"],
          0,
          "This is a sphere. It is curved all over with no flat faces, so it rolls off.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        typed(
          "short_answer",
          n,
          "How many flat faces does this pyramid have?",
          ["5", "five"],
          "It has 1 square face on the bottom and 4 triangle faces on the sides. 1 + 4 = 5.",
        ),
      ),
  ],
  very_hard: [
    (n) => typed("short_answer", n, "How many flat faces do 2 cubes have altogether?", "12", "Each cube has 6 flat faces. 6 + 6 = 12."),
    (n) =>
      choice(
        n,
        "Isla's object has 2 flat faces that are circles. It can roll. What is it?",
        ["cylinder", "cone", "sphere", "cube"],
        0,
        "A cylinder has a flat circle at each end and a curved side that rolls.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        choice(
          n,
          "Which thing has the same shape as this object?",
          ["a tent", "a ball", "a tin can", "an ice-cream cone"],
          0,
          "This is a triangular prism. It has a triangle at each end, like a tent.",
        ),
      ),
  ],
});

/** MA1-GM-01: positions of objects (left, right, above, below, next to, between). */
export const POSITION = levels(1070301, {
  very_easy: [
    (n) =>
      pic(
        line("cat", "dog", "owl"),
        choice(
          n,
          "Look at the picture. Which animal is between the cat and the owl?",
          ["dog", "cat", "owl"],
          0,
          "The dog is in the middle, with the cat on one side and the owl on the other.",
        ),
      ),
    (n) =>
      trueFalse(n, "When you stand up, your head is above your feet.", true, "Your head is at the top and your feet are at the bottom."),
    (n) =>
      choice(
        n,
        "What is the opposite of above?",
        ["below", "left", "next to", "right"],
        0,
        "Above means higher up. Below means lower down.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 1,
          rows: 2,
          map: true,
          points: [
            { x: 0, y: 1, label: "bee" },
            { x: 0, y: 0, label: "ant" },
          ],
        },
        typed(
          "fill_blank",
          n,
          "Look at the picture. The bee is ___ the ant.",
          ["above", "over", "on top of"],
          "The bee is in the top square and the ant is in the bottom square, so the bee is above the ant.",
        ),
      ),
    (n) =>
      pic(
        line("fox", "cat", "dog", "owl"),
        choice(
          n,
          "Look at the picture. Which animal is next to the fox?",
          ["cat", "dog", "owl"],
          0,
          "The cat is in the square right beside the fox.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which words tell us where something is? Choose all that are right.",
        ["under", "beside", "happy", "quickly"],
        [0, 1],
        "Under and beside tell us the position of something. Happy and quickly do not.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        line("dog", "bee", "cat"),
        choice(
          n,
          "Look at the picture. Which animal is furthest to the left?",
          ["dog", "cat", "bee"],
          0,
          "The dog is at the left end of the row.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 2,
          rows: 2,
          map: true,
          points: [
            { x: 1, y: 1, label: "owl" },
            { x: 1, y: 0, label: "cat" },
            { x: 0, y: 0, label: "dog" },
          ],
        },
        trueFalse(n, "Look at the picture. The owl is above the cat.", true, "The owl is in the square straight above the cat."),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Jack, Mia and Ava sit in a row. Mia sits between Jack and Ava. Who is in the middle?",
        "Mia",
        "Between means in the middle, so Mia is in the middle.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 3,
          rows: 3,
          map: true,
          points: [
            { x: 0, y: 2, label: "cat" },
            { x: 1, y: 1, label: "dog" },
            { x: 2, y: 0, label: "owl" },
            { x: 2, y: 2, label: "bee" },
          ],
        },
        multi(
          n,
          "Look at the picture. Which animals are in the top row? Choose all that are right.",
          ["cat", "bee", "dog", "owl"],
          [0, 1],
          "The cat and the bee are in the top row. The dog is in the middle row and the owl is in the bottom row.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Zoe puts a book on the shelf. Then she puts a cup on top of the book. Which one is below?",
        ["the book", "the cup", "neither"],
        0,
        "The cup is on top, so the book is underneath. The book is below the cup.",
      ),
    (n) =>
      ordering(
        n,
        "Grace is first in the line. Tom stands behind Grace. Kai stands behind Tom. Put them in order from the front of the line.",
        ["Grace", "Tom", "Kai"],
        "Grace is at the front. Tom is behind her, and Kai is behind Tom.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        line("owl", "cat", "dog", "fox"),
        typed(
          "short_answer",
          n,
          "Look at the picture. How many animals are between the owl and the fox?",
          "2",
          "The cat and the dog are between the owl and the fox. That is 2 animals.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 3,
          rows: 3,
          map: true,
          points: [
            { x: 1, y: 1, label: "cat" },
            { x: 0, y: 1, label: "dog" },
            { x: 2, y: 1, label: "fox" },
            { x: 1, y: 2, label: "bee" },
            { x: 1, y: 0, label: "ant" },
          ],
        },
        choice(
          n,
          "Look at the picture. The cat is in the middle. Which animal is to the right of the cat?",
          ["fox", "dog", "bee", "ant"],
          0,
          "The fox is in the square on the right of the cat. The dog is on the left, the bee is above and the ant is below.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Noah stands facing you. He holds up his right hand. Which side is it on when you look at him?",
        ["on your left", "on your right", "in the middle"],
        0,
        "When someone faces you, their right hand is on your left side. Try it with a friend!",
      ),
  ],
});

/** MA1-GM-01: positions of objects (left, right, above, below, next to, between). */
export const POSITION_2 = levels(1070316, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 1,
          rows: 2,
          map: true,
          points: [
            { x: 0, y: 1, label: "cat" },
            { x: 0, y: 0, label: "dog" },
          ],
        },
        choice(
          n,
          "Look at the picture. Which animal is at the bottom?",
          ["dog", "cat"],
          0,
          "The dog is in the bottom square. The cat is in the top square.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A bird flying high in the sky is above the trees.",
        true,
        "The sky is higher than the trees, so the bird is above them.",
      ),
    (n) => typed("fill_blank", n, "The opposite of left is ___.", "right", "Left and right are opposites."),
  ],
  easy: [
    (n) =>
      pic(
        line("ant", "owl", "fox"),
        typed(
          "short_answer",
          n,
          "Look at the picture. Which animal is between the ant and the fox?",
          "owl",
          "The owl is in the middle, with the ant on one side and the fox on the other.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ruby's bag is under her desk. Where is the desk?",
        ["above the bag", "below the bag", "inside the bag"],
        0,
        "If the bag is under the desk, then the desk is above the bag.",
      ),
    (n) =>
      pic(
        line("bee", "dog", "cat"),
        trueFalse(n, "Look at the picture. The cat is at the right end of the row.", true, "The cat is in the last square on the right."),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 2,
          rows: 2,
          map: true,
          points: [
            { x: 0, y: 1, label: "owl" },
            { x: 1, y: 1, label: "bee" },
            { x: 0, y: 0, label: "dog" },
            { x: 1, y: 0, label: "cat" },
          ],
        },
        multi(
          n,
          "Look at the picture. Which animals are in the bottom row? Choose all that are right.",
          ["dog", "cat", "owl", "bee"],
          [0, 1],
          "The dog and the cat are in the bottom row. The owl and the bee are in the top row.",
        ),
      ),
    (n) =>
      pic(
        line("fox", "ant", "dog"),
        ordering(
          n,
          "Look at the picture. Put the animals in order from left to right.",
          ["fox", "ant", "dog"],
          "Start at the left end and move along: fox, ant, dog.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Chloe stands in front of Liam. Who is behind?",
        ["Liam", "Chloe", "nobody"],
        0,
        "If Chloe is in front of Liam, then Liam is behind Chloe.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 3,
          rows: 2,
          map: true,
          points: [
            { x: 0, y: 1, label: "cat" },
            { x: 2, y: 1, label: "dog" },
            { x: 1, y: 0, label: "owl" },
          ],
        },
        choice(
          n,
          "Look at the picture. Where is the owl?",
          ["below the cat and the dog", "above the cat and the dog", "to the left of the cat", "on top of the dog"],
          0,
          "The owl is in the bottom row. The cat and the dog are in the top row, so the owl is below them.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Ethan is first in the line. Aisha is second. Aisha is ___ Ethan.",
        ["behind", "after"],
        "Ethan is at the front. Aisha comes next, so she is behind Ethan.",
      ),
    (n) =>
      pic(
        line("cat", "bee", "ant", "dog"),
        typed(
          "short_answer",
          n,
          "Look at the picture. Which animal is second from the left?",
          "bee",
          "Start at the left: the cat is first and the bee is second.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 3,
          rows: 3,
          map: true,
          points: [
            { x: 1, y: 1, label: "owl" },
            { x: 0, y: 2, label: "fox" },
            { x: 2, y: 2, label: "cat" },
            { x: 1, y: 0, label: "dog" },
            { x: 2, y: 0, label: "bee" },
          ],
        },
        multi(
          n,
          "Look at the picture. Which animals are in a higher row than the owl? Choose all that are right.",
          ["fox", "cat", "dog", "bee"],
          [0, 1],
          "The owl is in the middle row. The fox and the cat are in the top row, which is higher. The dog and the bee are lower.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "5 children stand in a row. Sam is in the middle. How many children are to the left of Sam?",
        ["2", "two"],
        "With 5 in a row, the middle one has 2 on each side. 2 + 1 + 2 = 5.",
      ),
    (n) =>
      choice(
        n,
        "Mei turns around to face the other way. The door was on her left. Where is the door now?",
        ["on her right", "on her left", "above her", "below her"],
        0,
        "When you turn around, left and right swap. So the door is now on her right.",
      ),
  ],
});
