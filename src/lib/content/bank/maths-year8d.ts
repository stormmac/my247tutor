/**
 * Year 8 Mathematics: Stage 4 (NESA outcomes), two sets of 15 questions for each standard, three at
 * each level from very easy to very hard. Year 8 works at the later Stage 4 level, harder than
 * Year 7 on the same focus area: congruence, data analysis and probability.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-GEO-C-01: congruent figures, the triangle congruence tests and properties of special quadrilaterals. */
export const CONGRUENCE = levels(8040101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Two shapes are congruent when they…",
        ["are exactly the same shape and size", "are the same shape but different sizes", "have the same area", "have the same perimeter"],
        0,
        "Congruent means identical in shape and size, so one could sit exactly on top of the other. Same area or perimeter alone is not enough.",
      ),
    (n) =>
      trueFalse(
        n,
        "If you reflect (flip) a triangle, the new triangle is congruent to the original.",
        true,
        "A reflection does not change any side lengths or angles, so the image is the same shape and size: it is congruent.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The symbol ≅ means 'is ___ to'.",
        "congruent",
        "△ABC ≅ △PQR is read 'triangle ABC is congruent to triangle PQR'.",
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
            [0, 3],
          ],
          sideLabels: ["4 cm", "5 cm", "3 cm"],
          cornerLabels: ["A", "B", "C"],
        },
        typed(
          "short_answer",
          n,
          "Look at triangle ABC. △ABC ≅ △PQR, with the letters matching in order. How long is side PQ?",
          ["4", "4 cm"],
          "The letters match in order: A with P, B with Q, C with R. So PQ matches AB, which is 4 cm.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are tests that prove two triangles are congruent? Choose all that are right.",
        ["SSS", "SAS", "AAS", "RHS", "AAA"],
        [0, 1, 2, 3],
        "The four congruence tests are SSS, SAS, AAS and RHS. AAA only shows the triangles are the same shape; one could be bigger than the other.",
      ),
    (n) =>
      choice(
        n,
        "A quadrilateral has all four sides equal, but its angles are not right angles. What is it?",
        ["Rhombus", "Square", "Rectangle", "Kite"],
        0,
        "Four equal sides makes it a rhombus. A square also has four equal sides, but its angles are all 90°.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "In △XYZ, XY = 6 cm, YZ = 8 cm and ∠XYZ = 50°. In △LMN, LM = 6 cm, MN = 8 cm and ∠LMN = 50°. Which test shows the triangles are congruent?",
        ["SAS", "SSS", "AAS", "RHS"],
        0,
        "Two pairs of sides are equal, and the 50° angle sits between them in both triangles (at Y and at M). That is Side, Angle, Side: SAS.",
      ),
    (n) =>
      trueFalse(
        n,
        "The diagonals of a rectangle are equal in length.",
        true,
        "Each diagonal is the hypotenuse of a right-angled triangle with the same two side lengths, so the two diagonals are equal.",
      ),
    (n) =>
      ordering(
        n,
        "Put these from the most general to the most special. Each one is a special type of the one before it.",
        ["Quadrilateral", "Parallelogram", "Rectangle", "Square"],
        "Every square is a rectangle (with equal sides), every rectangle is a parallelogram (with right angles), and every parallelogram is a quadrilateral.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [12, 0],
            [0, 5],
          ],
          sideLabels: ["12 cm", "13 cm", "5 cm"],
          cornerLabels: ["A", "B", "C"],
        },
        choice(
          n,
          "Look at right-angled triangle ABC. Triangle PQR also has a right angle, a hypotenuse of 13 cm and one other side of 5 cm. Which is true?",
          ["They are congruent by RHS", "They are congruent by SAS", "They are not necessarily congruent", "They are congruent by AAA"],
          0,
          "Both have a Right angle, the same Hypotenuse (13 cm) and another equal Side (5 cm). That is the RHS test, so they are congruent.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "△ABC ≅ △DEF, with the letters matching in order. ∠A = 40° and ∠B = 75°. What is the size of ∠F?",
        ["65", "65°"],
        "∠F matches ∠C. The angles in a triangle add to 180°, so ∠C = 180° − 40° − 75° = 65°. So ∠F = 65°.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [5, 0],
            [8, 4],
            [3, 4],
          ],
          sideLabels: ["5 cm", "5 cm", "5 cm", "5 cm"],
          cornerLabels: ["A", "B", "C", "D"],
        },
        multi(
          n,
          "Look at rhombus ABCD. Which of these are true for every rhombus? Choose all that are right.",
          [
            "All four sides are equal",
            "The diagonals cross at right angles",
            "The diagonals are equal in length",
            "Opposite angles are equal",
            "All angles are 90°",
          ],
          [0, 1, 3],
          "A rhombus has four equal sides, opposite angles equal, and diagonals that cross at right angles. Its diagonals are only equal (and its angles 90°) when it is a square.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "In △ABC and △DEF, AB = DE, BC = EF and ∠A = ∠D. Why can't you say the triangles are congruent from this?",
        [
          "The equal angle is not between the two equal sides, so no test fits",
          "You always need three equal sides",
          "You always need two equal angles",
          "They are congruent by SAS, so you can",
        ],
        0,
        "SAS needs the angle between the two sides. The angle between AB and BC is ∠B, not ∠A. Two sides and a non-included angle can make two different triangles, so it is not a test.",
      ),
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
          cornerLabels: ["A", "B", "C", "D"],
        },
        choice(
          n,
          "ABCD is a parallelogram. The diagonal AC splits it into △ABC and △CDA. Which test proves these triangles are congruent?",
          ["SSS", "RHS", "AAA", "They are not congruent"],
          0,
          "Opposite sides of a parallelogram are equal, so AB = CD and BC = DA. The diagonal AC is shared by both triangles. Three pairs of equal sides: SSS.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 6],
            [0, 0],
            [8, 0],
          ],
          cornerLabels: ["A", "B", "C"],
        },
        typed(
          "short_answer",
          n,
          "In △ABC, AB = AC. M is the midpoint of BC, and AM is drawn. △ABM ≅ △ACM by SSS. What is the size of ∠AMB?",
          ["90", "90°"],
          "Because the triangles are congruent, ∠AMB = ∠AMC. These two angles sit on the straight line BC, so they add to 180°. Each one is 180° ÷ 2 = 90°.",
        ),
      ),
  ],
});

/** MA4-GEO-C-01: congruent figures, the triangle congruence tests and properties of special quadrilaterals. */
export const CONGRUENCE_2 = levels(8040116, {
  very_easy: [
    (n) =>
      multi(
        n,
        "Which of these moves always give a shape congruent to the original? Choose all that are right.",
        ["Translating (sliding) it", "Rotating (turning) it", "Reflecting (flipping) it", "Enlarging it"],
        [0, 1, 2],
        "Sliding, turning and flipping keep every side and angle the same. Enlarging changes the size, so the new shape is not congruent.",
      ),
    (n) =>
      choice(
        n,
        "What does RHS stand for in the congruence tests?",
        ["Right angle, Hypotenuse, Side", "Right angle, Height, Side", "Rotation, Hypotenuse, Size", "Right angle, Half, Side"],
        0,
        "RHS means two right-angled triangles have equal hypotenuses and one other pair of equal sides.",
      ),
    (n) =>
      trueFalse(
        n,
        "Any two squares with sides of 7 cm are congruent.",
        true,
        "Both squares have four 7 cm sides and four 90° angles, so they are exactly the same shape and size.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 9, height: 4, top: "9 cm", side: "4 cm" },
        typed(
          "short_answer",
          n,
          "Look at rectangle ABCD. It is congruent to rectangle EFGH. What is the perimeter of EFGH?",
          ["26", "26 cm"],
          "Congruent shapes have the same side lengths, so EFGH is also 9 cm by 4 cm. Perimeter = 9 + 4 + 9 + 4 = 26 cm.",
        ),
      ),
    (n) =>
      choice(
        n,
        "△ABC ≅ △XYZ, with the letters matching in order. Which side matches side BC?",
        ["YZ", "XY", "XZ", "AC"],
        0,
        "B matches Y and C matches Z, so side BC matches side YZ.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A quadrilateral with exactly one pair of parallel sides is called a ___.",
        ["trapezium", "trapezoid"],
        "A trapezium has exactly one pair of parallel sides. A parallelogram has two pairs.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "△ABC has ∠A = 35°, ∠B = 80° and BC = 7 cm. △DEF has ∠D = 35°, ∠E = 80° and EF = 7 cm. Which test shows they are congruent?",
        ["AAS", "SAS", "RHS", "SSS"],
        0,
        "Two pairs of matching angles are equal, and a matching pair of sides (BC and EF) is equal. That is Angle, Angle, Side: AAS.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 0],
            [7, 5],
            [4, 7],
            [1, 5],
          ],
        },
        trueFalse(
          n,
          "The shape is a kite. The diagonals of a kite cross at right angles.",
          true,
          "A kite has two pairs of equal sides next to each other. Its diagonals always meet at 90°.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for proving two triangles congruent in order.",
        [
          "Match up the corresponding vertices",
          "List the pairs of equal sides and angles",
          "Choose the test that fits (SSS, SAS, AAS or RHS)",
          "Write the congruence statement, such as △ABC ≅ △PQR",
        ],
        "First decide which corners match, then list the equal parts, then name the test they fit, and finish with the congruence statement written in matching order.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "△PQR ≅ △STU, with the letters matching in order. PQ = 11 cm, QR = 7 cm and SU = 9 cm. What is the perimeter of △PQR?",
        ["27", "27 cm"],
        "SU matches PR, so PR = 9 cm. Perimeter = 11 + 7 + 9 = 27 cm.",
      ),
    (n) =>
      multi(
        n,
        "In which of these quadrilaterals do the diagonals always bisect each other (cut each other in half)? Choose all that are right.",
        ["Parallelogram", "Rectangle", "Rhombus", "Square", "Kite"],
        [0, 1, 2, 3],
        "The diagonals of every parallelogram bisect each other, and rectangles, rhombuses and squares are all parallelograms. In a kite only one diagonal is cut in half.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [7, 0],
            [9, 4],
            [2, 4],
          ],
          cornerLabels: ["A", "B", "C", "D"],
        },
        typed(
          "short_answer",
          n,
          "In parallelogram ABCD, ∠ABC = 115°. What is the size of ∠BCD?",
          ["65", "65°"],
          "AB is parallel to DC, so ∠ABC and ∠BCD are co-interior angles that add to 180°. ∠BCD = 180° − 115° = 65°.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 5],
            [0, 5],
          ],
          cornerLabels: ["A", "B", "C", "D"],
        },
        multi(
          n,
          "In rectangle ABCD, the diagonal AC is drawn. Which statements are true? Choose all that are right.",
          ["△ABC ≅ △CDA", "The triangles are congruent by SSS", "The triangles are congruent by RHS", "△ABC ≅ △ACD"],
          [0, 1, 2],
          "AB = CD, BC = DA and AC is shared, so SSS works. ∠B = ∠D = 90° with the shared hypotenuse AC and AB = CD, so RHS works too. A matches C, B matches D and C matches A, so the statement is △ABC ≅ △CDA. Writing △ACD puts the letters in the wrong order.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 4],
            [4, 7],
            [10, 4],
            [4, 1],
          ],
          cornerLabels: ["A", "B", "C", "D"],
        },
        typed(
          "short_answer",
          n,
          "In kite ABCD, AB = AD and CB = CD, so △ABC ≅ △ADC by SSS. If ∠BAD = 70° and ∠BCD = 50°, what is the size of ∠ABC?",
          ["120", "120°"],
          "The triangles are congruent, so ∠ABC = ∠ADC. The angles of a quadrilateral add to 360°, so these two share 360° − 70° − 50° = 240°. Each is 240° ÷ 2 = 120°.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The diagonals of square ABCD meet at O. △AOB, △BOC, △COD and △DOA are all congruent, so ∠AOB = ___°.",
        ["90", "90°"],
        "The four triangles are congruent, so the four angles at O are equal. Together they make a full turn of 360°, so each is 360° ÷ 4 = 90°.",
      ),
  ],
});

/** MA4-DAT-C-02: mean, median, mode, range, outliers, comparing data sets, and reading dot plots, stem-and-leaf plots and histograms. */
export const DATA_ANALYSIS = levels(8050101, {
  very_easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "The mean of 4, 7, 9 and 12 is ___.",
        "8",
        "Add the numbers: 4 + 7 + 9 + 12 = 32. There are 4 numbers, so the mean is 32 ÷ 4 = 8.",
      ),
    (n) => choice(n, "What is the range of 15, 3, 22, 9, 11?", ["19", "22", "11", "7"], 0, "Range = highest − lowest = 22 − 3 = 19."),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Goals scored per game",
          columns: [
            { label: "1", count: 2 },
            { label: "2", count: 4 },
            { label: "3", count: 1 },
            { label: "4", count: 3 },
            { label: "5", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. What is the mode?",
          ["2", "2 goals"],
          "The mode is the value with the most dots. 2 goals has 4 dots, more than any other, so the mode is 2.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Find the median of 13, 8, 21, 5, 17, 10.",
        "11.5",
        "In order: 5, 8, 10, 13, 17, 21. There are 6 numbers, so the median is halfway between the 3rd and 4th: (10 + 13) ÷ 2 = 11.5.",
      ),
    (n) =>
      trueFalse(
        n,
        "An outlier of 95 is added to the scores 10, 12, 11, 13. This changes the mean much more than the median.",
        true,
        "Before: mean = 46 ÷ 4 = 11.5 and median = 11.5. After: mean = 141 ÷ 5 = 28.2, but the median is only 12. Outliers pull the mean a long way.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["2", "1 4 7"],
            ["3", "0 2 5 5 6"],
            ["4", "3 8"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows the ages of volunteers at a sausage sizzle (2 | 1 means 21). What is the mode?",
          ["35", "35 years"],
          "The leaves give the ages 21, 24, 27, 30, 32, 35, 35, 36, 43, 48. Only 35 appears twice, so the mode is 35.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["2", "1 4 7"],
            ["3", "0 2 5 5 6"],
            ["4", "3 8"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows the ages of volunteers at a sausage sizzle (2 | 1 means 21). What is the median age?",
          ["33.5", "33.5 years"],
          "The 10 ages in order are 21, 24, 27, 30, 32, 35, 35, 36, 43, 48. The median is halfway between the 5th and 6th: (32 + 35) ÷ 2 = 33.5.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Heights of Year 8 students (cm)",
          columns: [
            { label: "140–149", value: 3 },
            { label: "150–159", value: 7 },
            { label: "160–169", value: 9 },
            { label: "170–179", value: 4 },
            { label: "180–189", value: 2 },
          ],
        },
        choice(
          n,
          "Look at the histogram. Which class interval is the modal class?",
          ["160–169", "150–159", "140–149", "180–189"],
          0,
          "The modal class is the interval with the tallest column. 160–169 cm has 9 students, the most of any interval.",
        ),
      ),
    (n) =>
      choice(
        n,
        "In a Sydney suburb, most houses sold for about $1 200 000, but one mansion sold for $9 000 000. Which measure best describes a typical sale price?",
        ["Median", "Mean", "Range", "Highest price"],
        0,
        "The mansion is an outlier that drags the mean up. The median is the middle price, so it is hardly affected and better shows a typical sale.",
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "For the data 1, 3, 3, 5, 6, 12, put the mode, median, mean and range in order from smallest to largest.",
        ["Mode", "Median", "Mean", "Range"],
        "Mode = 3 (it appears twice). Median = (3 + 5) ÷ 2 = 4. Mean = 30 ÷ 6 = 5. Range = 12 − 1 = 11. So 3, 4, 5, 11.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Heights of Year 8 students (cm)",
          columns: [
            { label: "140–149", value: 3 },
            { label: "150–159", value: 7 },
            { label: "160–169", value: 9 },
            { label: "170–179", value: 4 },
            { label: "180–189", value: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the histogram. How many students are 160 cm or taller?",
          ["15", "15 students"],
          "Add the columns from 160 cm up: 9 + 4 + 2 = 15 students.",
        ),
      ),
    (n) =>
      multi(
        n,
        "In a maths test, 8A had a mean of 72 and a range of 10. 8B had a mean of 72 and a range of 40. Which statements are true? Choose all that are right.",
        [
          "On average, both classes did equally well",
          "8B's scores are more spread out",
          "8A's scores are more consistent",
          "8B had the highest single score",
        ],
        [0, 1, 2],
        "Equal means show the same average. A bigger range means more spread, so 8B is more spread out and 8A more consistent. The range does not tell you who got the top score.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A cricketer's mean score after 6 innings is 32 runs. After his 7th innings, his mean is 35 runs. How many runs did he score in the 7th innings?",
        ["53", "53 runs"],
        "Total after 6 innings = 6 × 32 = 192. Total after 7 innings = 7 × 35 = 245. So the 7th innings was 245 − 192 = 53 runs.",
      ),
    (n) =>
      multi(
        n,
        "The scores 48, 52, 55, 55, 60 and 2 are recorded. The 2 is removed as an outlier. Which statements are true? Choose all that are right.",
        ["The mean goes up", "The median goes up", "The mode stays the same", "The range stays the same"],
        [0, 1, 2],
        "Before: mean = 272 ÷ 6 ≈ 45.3, median = 53.5, mode = 55, range = 58. After: mean = 270 ÷ 5 = 54, median = 55, mode = 55, range = 12. So the range changes a lot.",
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Days absent in Term 2",
          columns: [
            { label: "0", count: 5 },
            { label: "1", count: 3 },
            { label: "2", count: 4 },
            { label: "3", count: 2 },
            { label: "4", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. What is the mean number of days absent?",
          ["1.4", "1.4 days"],
          "There are 5 + 3 + 4 + 2 + 1 = 15 students. Total days = 0 × 5 + 1 × 3 + 2 × 4 + 3 × 2 + 4 × 1 = 21. Mean = 21 ÷ 15 = 1.4 days.",
        ),
      ),
  ],
});

/** MA4-DAT-C-02: mean, median, mode, range, outliers, comparing data sets, and reading dot plots, stem-and-leaf plots and histograms. */
export const DATA_ANALYSIS_2 = levels(8050116, {
  very_easy: [
    (n) =>
      typed("short_answer", n, "What is the median of 7, 3, 12, 9, 5?", "7", "Put them in order: 3, 5, 7, 9, 12. The middle number is 7."),
    (n) =>
      multi(
        n,
        "Which of these data sets have a mode of 4? Choose all that are right.",
        ["4, 4, 5, 6", "1, 4, 4, 4, 9", "2, 3, 4, 5", "4, 6, 6, 8"],
        [0, 1],
        "The mode is the value that appears most often. In the first two sets, 4 appears most. In 2, 3, 4, 5 nothing repeats, and in 4, 6, 6, 8 the mode is 6.",
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Pets owned by each student",
          columns: [
            { label: "0", count: 3 },
            { label: "1", count: 6 },
            { label: "2", count: 4 },
            { label: "3", count: 2 },
            { label: "4", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. What is the range of the number of pets?",
          "4",
          "The most pets anyone has is 4 and the fewest is 0. Range = 4 − 0 = 4.",
        ),
      ),
  ],
  easy: [
    (n) =>
      trueFalse(
        n,
        "The mean of 2, 4, 6, 8, 10 is equal to its median.",
        true,
        "Mean = 30 ÷ 5 = 6. The middle number is also 6. The data is evenly spread, so they match.",
      ),
    (n) =>
      choice(
        n,
        "Which value is an outlier in 23, 25, 21, 24, 58, 22?",
        ["58", "21", "25", "23"],
        0,
        "Most values are between 21 and 25. 58 is far away from the rest, so it is the outlier.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "The five scores 15, 18, 20, 23 and ___ have a mean of 20.",
        "24",
        "A mean of 20 for 5 scores means a total of 5 × 20 = 100. The four known scores add to 76, so the last is 100 − 76 = 24.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["1", "5 8"],
            ["2", "0 3 3 7 9"],
            ["3", "1 9"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows how many minutes students took to walk to school (1 | 5 means 15 minutes). What is the range?",
          ["24", "24 minutes"],
          "The smallest value is 15 (stem 1, leaf 5) and the largest is 39 (stem 3, leaf 9). Range = 39 − 15 = 24 minutes.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Kaitlyn's last five 100 m times were 14.2, 13.8, 14.0, 13.9 and 14.1 seconds. What was her mean time in seconds?",
        ["14", "14.0", "14 seconds"],
        "Add the times: 14.2 + 13.8 + 14.0 + 13.9 + 14.1 = 70.0. Divide by 5: 70.0 ÷ 5 = 14.0 seconds.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Runs scored per innings",
          columns: [
            { label: "0–9", value: 2 },
            { label: "10–19", value: 5 },
            { label: "20–29", value: 8 },
            { label: "30–39", value: 3 },
            { label: "40–49", value: 2 },
          ],
        },
        choice(
          n,
          "Look at the histogram. In how many innings did the batter score fewer than 20 runs?",
          ["7", "5", "15", "8"],
          0,
          "Fewer than 20 means the 0–9 and 10–19 columns: 2 + 5 = 7 innings.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Stem", "Leaf"],
          rows: [
            ["1", "5 8"],
            ["2", "0 3 3 7 9"],
            ["3", "1 9"],
          ],
        },
        typed(
          "short_answer",
          n,
          "This stem-and-leaf plot shows how many minutes students took to walk to school (1 | 5 means 15 minutes). What is the mean time?",
          ["25", "25 minutes"],
          "The times are 15, 18, 20, 23, 23, 27, 29, 31, 39. They add to 225. There are 9 times, so the mean is 225 ÷ 9 = 25 minutes.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A data set has a mean of 40 and a median of 30. What is most likely true?",
        [
          "A few very high values are pulling the mean up",
          "A few very low values are pulling the mean down",
          "The data is spread evenly on both sides of the middle",
          "The mode must be 35",
        ],
        0,
        "The mean is much bigger than the median. The median ignores how big the top values are, but the mean does not, so some very high values must be dragging the mean up.",
      ),
    (n) =>
      ordering(
        n,
        "For the data 8, 2, 9, 5, 2, 10, put the mode, mean, median and range in order from smallest to largest.",
        ["Mode", "Mean", "Median", "Range"],
        "In order: 2, 2, 5, 8, 9, 10. Mode = 2. Mean = 36 ÷ 6 = 6. Median = (5 + 8) ÷ 2 = 6.5. Range = 10 − 2 = 8. So 2, 6, 6.5, 8.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "The mean of 8 numbers is 15. One number is removed and the mean of the other 7 is 14. What number was removed?",
        "22",
        "Total of 8 numbers = 8 × 15 = 120. Total of 7 numbers = 7 × 14 = 98. The removed number is 120 − 98 = 22.",
      ),
    (n) =>
      multi(
        n,
        "Two Year 8 classes sat the same test. 8C: mean 68, median 70, range 45. 8D: mean 68, median 66, range 20. Which statements are true? Choose all that are right.",
        [
          "8D's results are more consistent than 8C's",
          "At least half of 8C scored 70 or more",
          "If the classes are the same size, their total scores are equal",
          "8D had the highest single score",
        ],
        [0, 1, 2],
        "8D's smaller range means less spread. A median of 70 means at least half of 8C scored 70 or more. Equal means and equal class sizes give equal totals. The ranges don't say who had the top score.",
      ),
    (n) =>
      pic(
        {
          kind: "dot_plot",
          title: "Number of siblings",
          columns: [
            { label: "0", count: 2 },
            { label: "1", count: 5 },
            { label: "2", count: 3 },
            { label: "3", count: 1 },
            { label: "4", count: 1 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the dot plot. How much bigger is the mean than the median?",
          "0.5",
          "There are 12 students. Total = 0 × 2 + 1 × 5 + 2 × 3 + 3 × 1 + 4 × 1 = 18, so the mean is 18 ÷ 12 = 1.5. The 6th and 7th values are both 1, so the median is 1. 1.5 − 1 = 0.5.",
        ),
      ),
  ],
});

/** MA4-PRO-C-01: two-step experiments with tables and tree diagrams, complementary events, 'or' and 'and', and expected frequency. */
export const PROBABILITY = levels(8050201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "A fair coin is tossed twice. How many outcomes are in the sample space?",
        ["4", "2", "3", "6"],
        0,
        "The outcomes are HH, HT, TH and TT. That is 2 × 2 = 4 outcomes.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "yellow"] },
        typed(
          "short_answer",
          n,
          "Look at the spinner. What is the probability of NOT landing on red?",
          ["3/4", "0.75", "75%"],
          "P(red) = 1/4. Not landing on red is the complement, so P(not red) = 1 − 1/4 = 3/4.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "The probability of an event and the probability of its complement always add to 1.",
        true,
        "An event either happens or it doesn't, so between them they cover every outcome. P(A) + P(not A) = 1.",
      ),
  ],
  easy: [
    (n) =>
      ordering(
        n,
        "A fair die is rolled. Put these events in order from least likely to most likely.",
        ["Rolling a 7", "Rolling a 6", "Rolling an even number", "Rolling a number less than 7"],
        "Rolling a 7 is impossible (0). Rolling a 6 is 1/6. Rolling an even number is 3/6 = 1/2. Every number on a die is less than 7, so that is certain (1).",
      ),
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
        choice(
          n,
          "One counter is taken from the bag without looking. What is the probability it is blue or green?",
          ["7/10", "1/2", "1/5", "3/10"],
          0,
          "There are 3 + 5 + 2 = 10 counters. 5 blue and 2 green make 7 that are blue or green, so P = 7/10.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The probability of a spinner landing on yellow is 0.15. If it is spun 200 times, how many yellows would you expect?",
        "30",
        "Expected frequency = probability × number of trials = 0.15 × 200 = 30.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A coin is tossed and a six-sided die is rolled. How many outcomes are in the sample space?",
        "12",
        "The coin has 2 outcomes and the die has 6. In a table with 2 rows and 6 columns there are 2 × 6 = 12 outcomes, from H1 to T6.",
      ),
    (n) =>
      choice(
        n,
        "Two fair coins are tossed. What is the probability of getting one head and one tail?",
        ["1/2", "1/4", "1/3", "3/4"],
        0,
        "The outcomes are HH, HT, TH, TT. Two of the four (HT and TH) have one head and one tail, so P = 2/4 = 1/2.",
      ),
    (n) =>
      multi(
        n,
        "A die is rolled. Event A is 'rolling an even number'. Which of these describe the complement of A? Choose all that are right.",
        ["Rolling an odd number", "Rolling a 1, 3 or 5", "Rolling a number less than 4", "Not rolling an even number"],
        [0, 1, 3],
        "The complement is every outcome not in A: 1, 3 and 5. That is 'odd', '1, 3 or 5' and 'not even'. 'Less than 4' includes 2, which is even.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Two fair dice are rolled and the numbers are added. What is the probability of a total of 7?",
        ["1/6", "6/36"],
        "A 6 × 6 table has 36 outcomes. A total of 7 comes from 1+6, 2+5, 3+4, 4+3, 5+2 and 6+1: 6 outcomes. P = 6/36 = 1/6.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "blue", "green"] },
        choice(
          n,
          "Look at the spinner. It is spun twice. What is the probability of blue, then blue again?",
          ["1/4", "1/2", "1", "1/8"],
          0,
          "Half the spinner is blue, so P(blue) = 1/2 each spin. On a tree diagram, multiply along the blue–blue path: 1/2 × 1/2 = 1/4.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 4 },
            { colour: "yellow", count: 6 },
          ],
        },
        typed(
          "fill_blank",
          n,
          "A counter is taken from the bag, put back, and a second counter is taken. P(red, then red) = ___",
          ["4/25", "16/100", "0.16"],
          "P(red) = 4/10 each time because the counter goes back. Multiply along the path: 4/10 × 4/10 = 16/100 = 4/25.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Two fair coins are tossed together 80 times. How many times would you expect to get two heads?",
        ["20", "40", "10", "60"],
        0,
        "P(HH) = 1/2 × 1/2 = 1/4. Expected frequency = 1/4 × 80 = 20.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A fair die is rolled twice. What is the probability of getting at least one 6?",
        "11/36",
        "Use the complement. P(no 6 on a roll) = 5/6, so P(no 6 on either roll) = 5/6 × 5/6 = 25/36. P(at least one 6) = 1 − 25/36 = 11/36.",
      ),
    (n) =>
      multi(
        n,
        "A card is picked at random from ten cards numbered 1 to 10. Which statements are true? Choose all that are right.",
        [
          "P(even or greater than 8) = 3/5",
          "P(even and greater than 8) = 1/10",
          "P(even or odd) = 1",
          "P(even) + P(greater than 8) = P(even or greater than 8)",
        ],
        [0, 1, 2],
        "Even or greater than 8: 2, 4, 6, 8, 9, 10, which is 6/10 = 3/5. Even and greater than 8: only 10, so 1/10. Every card is even or odd, so 1. But P(even) + P(greater than 8) = 5/10 + 2/10 = 7/10, which counts the 10 twice, so the last one is false.",
      ),
  ],
});

/** MA4-PRO-C-01: two-step experiments with tables and tree diagrams, complementary events, 'or' and 'and', and expected frequency. */
export const PROBABILITY_2 = levels(8050216, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "The probability that it rains in Katoomba tomorrow is 0.3. What is the probability that it does not rain?",
        ["0.7", "7/10", "70%"],
        "Not raining is the complement of raining. P(no rain) = 1 − 0.3 = 0.7.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "blue", "red"] },
        choice(
          n,
          "Look at the spinner. What is the probability of landing on blue?",
          ["2/3", "1/3", "1/2", "3/2"],
          0,
          "The spinner has 3 equal parts and 2 of them are blue, so P(blue) = 2/3.",
        ),
      ),
    (n) =>
      multi(
        n,
        "A die is rolled. Which outcomes are in the event 'rolling a prime number'? Choose all that are right.",
        ["2", "3", "5", "1", "4"],
        [0, 1, 2],
        "The prime numbers on a die are 2, 3 and 5. 1 is not prime, and 4 = 2 × 2 is composite.",
      ),
  ],
  easy: [
    (n) =>
      trueFalse(
        n,
        "When a coin is tossed and a die is rolled, there are 8 possible outcomes.",
        false,
        "There are 2 coin outcomes and 6 die outcomes, so 2 × 6 = 12 outcomes, not 2 + 6 = 8.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "orange", count: 3 },
            { colour: "purple", count: 5 },
            { colour: "green", count: 4 },
          ],
        },
        typed(
          "short_answer",
          n,
          "A counter is taken from the bag and put back, 60 times. How many times would you expect to get green?",
          "20",
          "There are 12 counters and 4 are green, so P(green) = 4/12 = 1/3. Expected frequency = 1/3 × 60 = 20.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "If the probability of an event is 2/9, the probability of its complement is ___.",
        "7/9",
        "An event and its complement add to 1. 1 − 2/9 = 9/9 − 2/9 = 7/9.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "Two fair coins are tossed. What is the probability of getting at least one tail?",
        ["3/4", "1/2", "1/4", "2/3"],
        0,
        "The outcomes are HH, HT, TH, TT. Only HH has no tail, so 3 of the 4 have at least one tail: P = 3/4.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps for using a tree diagram to find probabilities for two coin tosses in order.",
        [
          "Draw two branches for the first toss, H and T",
          "From the end of each branch, draw two branches for the second toss",
          "Write the outcome at the end of each path: HH, HT, TH, TT",
          "Multiply the probabilities along each path",
        ],
        "A tree diagram is built one stage at a time: first toss, then second toss from each branch. Then list each path's outcome and multiply along the path to get its probability.",
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "yellow"] },
        typed(
          "short_answer",
          n,
          "The spinner is spun and a coin is tossed. What is the probability of blue and a head?",
          ["1/6"],
          "P(blue) = 1/3 and P(head) = 1/2. For 'and' with two separate steps, multiply: 1/3 × 1/2 = 1/6.",
        ),
      ),
  ],
  hard: [
    (n) =>
      multi(
        n,
        "A card is picked at random from twelve cards numbered 1 to 12. Which statements are true? Choose all that are right.",
        [
          "P(multiple of 3) = 1/3",
          "P(multiple of 3 or multiple of 4) = 1/2",
          "P(multiple of 3 and multiple of 4) = 1/12",
          "P(not a multiple of 4) = 1/4",
        ],
        [0, 1, 2],
        "Multiples of 3: 3, 6, 9, 12 (4/12 = 1/3). Multiples of 3 or 4: 3, 4, 6, 8, 9, 12 (6/12 = 1/2). Both: only 12 (1/12). Multiples of 4 are 4, 8, 12, so P(not) = 9/12 = 3/4.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Two dice are rolled and the numbers are added, 180 times. How many times would you expect a total of 6?",
        "25",
        "A total of 6 comes from 1+5, 2+4, 3+3, 4+2 and 5+1: 5 of the 36 outcomes. Expected frequency = 5/36 × 180 = 25.",
      ),
    (n) =>
      choice(
        n,
        "A netball goal shooter scores 0.8 of her shots. She takes two shots, and each shot does not affect the other. What is the probability she scores both?",
        ["0.64", "1.6", "0.8", "0.16"],
        0,
        "On a tree diagram, follow the score–score path and multiply: 0.8 × 0.8 = 0.64.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A school bus is late on 0.1 of mornings, and each morning is separate. What is the probability it is late on at least one of two mornings?",
        ["0.19", "19/100", "19%"],
        "Use the complement. P(on time both days) = 0.9 × 0.9 = 0.81. P(late at least once) = 1 − 0.81 = 0.19.",
      ),
    (n) =>
      choice(
        n,
        "A fair die is rolled twice. What is the probability that the first roll is higher than the second?",
        ["5/12", "1/2", "1/6", "7/12"],
        0,
        "There are 36 outcomes. 6 are doubles. The other 30 split evenly: first higher in 15, second higher in 15. P = 15/36 = 5/12.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 2 },
            { colour: "blue", count: 3 },
          ],
        },
        typed(
          "fill_blank",
          n,
          "A counter is taken from the bag, put back, and a second is taken. P(one red and one blue, in either order) = ___",
          ["12/25", "0.48", "48/100"],
          "P(red, blue) = 2/5 × 3/5 = 6/25 and P(blue, red) = 3/5 × 2/5 = 6/25. 'Or' adds the two paths: 6/25 + 6/25 = 12/25.",
        ),
      ),
  ],
});
