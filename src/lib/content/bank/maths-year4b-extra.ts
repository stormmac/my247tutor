/**
 * Year 4 Mathematics (later Stage 2), extra sets: a second 15 questions for each Stage 2
 * standard in maths-year4b.ts (geometry, measurement, data and chance), three at each level from
 * very easy to very hard, with different numbers and contexts from the first sets.
 * Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** A park map shared by the position questions. North is at the top. */
const PARK_MAP: Picture = {
  kind: "grid",
  columns: 6,
  rows: 5,
  map: true,
  points: [
    { x: 0, y: 0, label: "Gate" },
    { x: 3, y: 0, label: "BBQ" },
    { x: 4, y: 1, label: "Playground" },
    { x: 1, y: 2, label: "Toilets" },
    { x: 3, y: 3, label: "Kiosk" },
    { x: 5, y: 4, label: "Café" },
  ],
};

/** Results of picking counters from a bag, shared by two chance questions. */
const PICK_TABLE: Picture = {
  kind: "table",
  headings: ["Colour", "Times picked"],
  rows: [
    ["red", 4],
    ["blue", 10],
    ["yellow", 6],
  ],
};

/** MA2-2DS-01: comparing two-dimensional shapes and describing their features. */
export const SHAPES_2D = levels(4030116, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [4, 0],
            [7, 0],
            [9, 2],
            [9, 5],
            [7, 7],
            [4, 7],
            [2, 5],
            [2, 2],
          ],
        },
        choice(
          n,
          "What is this shape called?",
          ["hexagon", "pentagon", "octagon", "decagon"],
          2,
          "Count the sides: there are 8. A shape with 8 sides is an octagon, like a stop sign.",
        ),
      ),
    (n) => trueFalse(n, "A pentagon has 6 sides.", false, "A pentagon has 5 sides. A shape with 6 sides is a hexagon."),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [7, 5],
            [3, 5],
          ],
        },
        typed(
          "fill_blank",
          n,
          "This shape has 4 straight sides. Any shape with 4 straight sides is called a ___.",
          ["quadrilateral"],
          "'Quad' means four. A quadrilateral is any closed shape with 4 straight sides, like squares, rectangles and trapeziums.",
        ),
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which triangle has all three sides the same length?",
        ["equilateral", "isosceles", "scalene", "right-angled"],
        0,
        "'Equi' means equal. An equilateral triangle has 3 equal sides.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [2, 6],
          ],
          sideLabels: ["8 cm", "9 cm", "6 cm"],
        },
        choice(
          n,
          "Look at the side lengths. What kind of triangle is this?",
          ["equilateral", "isosceles", "scalene"],
          2,
          "The sides are 8 cm, 9 cm and 6 cm, all different. A triangle with no equal sides is scalene.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes always have at least one right angle? Choose all that are right.",
        ["square", "rectangle", "equilateral triangle", "regular hexagon", "right-angled triangle"],
        [0, 1, 4],
        "Squares and rectangles have 4 right angles, and a right-angled triangle has 1. An equilateral triangle and a regular hexagon have none.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [5, 0],
            [8, 4],
            [5, 6],
            [2, 4],
          ],
          sideLabels: ["10 cm", "7 cm", "7 cm", "10 cm"],
        },
        choice(
          n,
          "What is this shape called?",
          ["kite", "rhombus", "trapezium", "parallelogram"],
          0,
          "It has two pairs of equal sides that are next to each other (10 cm and 10 cm, 7 cm and 7 cm), and no parallel sides. That makes it a kite.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Every rectangle is also a square.",
        false,
        "A square needs 4 equal sides. Many rectangles are longer than they are wide, so they are not squares. (But every square is a rectangle.)",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Lines that stay the same distance apart and never meet are called ___ lines.",
        ["parallel"],
        "Parallel lines never meet, like train tracks. Lines that meet at a right angle are perpendicular.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [4, 7],
          ],
          sideLabels: ["8 cm", "8 cm", "8 cm"],
        },
        multi(
          n,
          "Which of these describe this triangle? Choose all that are right.",
          ["equilateral", "scalene", "right-angled", "all 3 angles are equal"],
          [0, 3],
          "All three sides are 8 cm, so it is equilateral, and an equilateral triangle has 3 equal angles. It is not scalene, and none of its angles are right angles.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from most sides to fewest sides.",
        ["octagon", "heptagon", "hexagon", "pentagon", "quadrilateral"],
        "An octagon has 8 sides, a heptagon 7, a hexagon 6, a pentagon 5 and a quadrilateral 4.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [5, 5],
            [0, 5],
          ],
        },
        choice(
          n,
          "How many right angles does this shape have?",
          ["0", "1", "2", "4"],
          2,
          "The two corners on the left are square corners, so they are right angles. The bottom right corner is narrower (acute) and the top right corner is wider (obtuse). That is 2 right angles.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these are true for every rectangle? Choose all that are right.",
        ["It has 4 right angles", "Opposite sides are equal", "All 4 sides are equal", "Opposite sides are parallel"],
        [0, 1, 3],
        "Every rectangle has 4 right angles, and its opposite sides are equal and parallel. Only some rectangles (squares) have all 4 sides equal.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 2],
            [6, 2],
            [6, 0],
            [10, 4],
            [6, 8],
            [6, 6],
            [0, 6],
          ],
        },
        choice(
          n,
          "This arrow is a flat shape. What is it called?",
          ["heptagon", "hexagon", "octagon", "pentagon"],
          0,
          "Count every straight side around the outside: there are 7. Any shape with 7 sides is a heptagon, even when it doesn't look regular.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Mia says, 'A shape with 4 right angles must be a square.' Which shape shows that Mia is wrong?",
        ["a rectangle that is longer than it is wide", "a rhombus", "a kite", "a trapezium"],
        0,
        "A long rectangle has 4 right angles, but its sides are not all equal, so it is not a square.",
      ),
  ],
});

/** MA2-2DS-02: flips, slides, turns, symmetry, tessellation, and combining and splitting shapes. */
export const TRANSFORM = levels(4030216, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Moving a shape around a point, like the hands of a clock, is called a…",
        ["slide", "turn", "flip"],
        1,
        "A turn (also called a rotation) moves a shape around a point.",
      ),
    (n) =>
      trueFalse(
        n,
        "When you slide a shape, it gets bigger.",
        false,
        "A slide only moves the shape to a new place. Its size and shape stay the same.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 4],
            [0, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "This rectangle is longer than it is wide. How many lines of symmetry does it have?",
          ["2", "two"],
          "It folds in half from top to bottom and from side to side. Folding it corner to corner doesn't match, so it has 2 lines.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many half turns make one full turn?",
        ["2", "two"],
        "Each half turn goes halfway round, so 2 half turns go all the way round.",
      ),
    (n) =>
      choice(
        n,
        "Which capital letter has a line of symmetry going across the middle, from left to right?",
        ["D", "N", "F", "L"],
        0,
        "Fold D along a line across its middle and the top half matches the bottom half. N, F and L don't match that way.",
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes tessellate on their own (fit together with no gaps or overlaps)? Choose all that are right.",
        ["rectangle", "regular pentagon", "regular octagon", "equilateral triangle"],
        [0, 3],
        "Rectangles fit together like bricks, and equilateral triangles fit together point to side. Regular pentagons and octagons always leave gaps.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest lines of symmetry to most.",
        ["isosceles triangle", "rectangle", "equilateral triangle", "square"],
        "An isosceles triangle has 1 line, a rectangle 2, an equilateral triangle 3 and a square 4.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [3, 0],
            [7, 0],
            [9, 3],
            [7, 6],
            [3, 6],
            [1, 3],
          ],
        },
        typed(
          "short_answer",
          n,
          "Draw a line from each corner of this hexagon to its centre. How many triangles do you make?",
          ["6", "six"],
          "The hexagon has 6 sides. Each side becomes the base of one triangle that points to the centre, so there are 6 triangles.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A circle has exactly 2 lines of symmetry.",
        false,
        "Any straight line through the centre of a circle folds it into matching halves, so it has more lines of symmetry than you can count.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 8,
          rows: 6,
          axes: true,
          points: [
            { x: 6, y: 5, label: "Q" },
            { x: 4, y: 2, label: "A" },
            { x: 3, y: 3, label: "B" },
            { x: 2, y: 3, label: "C" },
          ],
        },
        choice(
          n,
          "Point Q slides 3 units to the left and 2 units down. Which point does it land on?",
          ["A", "B", "C"],
          1,
          "Q is at 6 across and 5 up. 3 to the left makes 3 across, and 2 down makes 3 up. That is point B.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The minute hand of a clock points to 2. It makes a quarter turn anticlockwise. Which number does it point to now?",
        ["11", "eleven"],
        "A quarter turn moves the minute hand 15 minutes, which is 3 numbers. Going backwards from 2: 1, 12, 11.",
      ),
    (n) =>
      multi(
        n,
        "Which of these capital letters look exactly the same after a half turn? Choose all that are right.",
        ["M", "S", "T", "N", "Z"],
        [1, 3, 4],
        "Turn each letter upside down. S, N and Z still look the same. M becomes a W and T ends up upside down.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "A triangle points up. It is flipped over a line going across (left to right), then given a half turn. Which way does it point now?",
        ["up", "down", "left", "right"],
        0,
        "Flipping it top to bottom makes it point down. A half turn then makes it point the opposite way: up again.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [10, 0],
            [7, 5],
            [3, 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "This trapezium has two equal slanting sides. How many lines of symmetry does it have?",
          ["1", "one"],
          "Only the line straight down through the middle folds it into matching halves. Folding it from top to bottom doesn't match, because the top is shorter than the bottom.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Tom tiles a floor with equilateral triangles, with no gaps. How many triangles meet at each corner point?",
        ["6", "six"],
        "Six equilateral triangles fit together around a point with no gaps, like the slices of a hexagon cut from its centre. So 6 triangles meet at each corner point.",
      ),
  ],
});

/** MA2-3DS-01: prisms and pyramids, their faces, edges and vertices, and their nets. */
export const OBJECTS_3D = levels(4030316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "cone" },
        choice(
          n,
          "What is this object called?",
          ["cone", "cylinder", "square pyramid", "sphere"],
          0,
          "It has one flat circle face, a curved surface and a point at the top, so it is a cone.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "sphere" },
        trueFalse(n, "This object has no flat faces.", true, "A sphere is round all over, like a ball. It has only a curved surface."),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "How many faces does a cube have?",
        ["6", "six"],
        "A cube has a top, a bottom and 4 sides: 1 + 1 + 4 = 6 square faces.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many vertices (corners) does this rectangular prism have?",
          ["8", "eight"],
          "There are 4 corners around the top and 4 around the bottom: 4 + 4 = 8.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are pyramids? Choose all that are right.",
        ["square pyramid", "triangular pyramid", "cube", "cylinder", "hexagonal pyramid"],
        [0, 1, 4],
        "A pyramid has one base and triangle faces that meet at a point. Square, triangular and hexagonal pyramids all do. A cube is a prism, and a cylinder has curved surfaces.",
      ),
    (n) => trueFalse(n, "Every face of a cube is a square.", true, "A cube has 6 faces, and they are all matching squares."),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_pyramid" },
        typed(
          "short_answer",
          n,
          "How many edges does this triangular pyramid have?",
          ["6", "six"],
          "There are 3 edges around the triangle base and 3 edges going up to the apex: 3 + 3 = 6.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net is made of 2 triangles and 3 rectangles. What object does it fold into?",
        ["triangular prism", "triangular pyramid", "square pyramid", "rectangular prism"],
        0,
        "The 2 triangles become the matching ends, and the 3 rectangles fold around to join them. That is a triangular prism.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cube" },
        typed(
          "fill_blank",
          n,
          "This cube has ___ edges.",
          ["12", "twelve"],
          "There are 4 edges around the top, 4 around the bottom and 4 going up the sides: 4 + 4 + 4 = 12.",
        ),
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest vertices (corners) to most.",
        ["triangular pyramid", "square pyramid", "triangular prism", "cube"],
        "Triangular pyramid: 3 + 1 = 4. Square pyramid: 4 + 1 = 5. Triangular prism: 3 + 3 = 6. Cube: 4 + 4 = 8.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        multi(
          n,
          "Which of these are true about this triangular prism? Choose all that are right.",
          ["It has 5 faces", "It has 6 vertices", "It has 9 edges", "It has 3 triangle faces"],
          [0, 1, 2],
          "2 triangles + 3 rectangles = 5 faces. 3 corners on each end = 6 vertices. 3 edges on each end + 3 joining them = 9 edges. Only 2 faces are triangles.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A cone stands on its flat base. You look at it from straight above. What shape is its outline?",
        ["circle", "triangle", "square", "rectangle"],
        0,
        "From above you see the round base, with the point in the middle, so the outline is a circle. From the side it would look like a triangle.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A pyramid has 7 faces. What shape is its base?",
        ["hexagon", "a hexagon", "hexagons"],
        "One face is the base, so 7 − 1 = 6 triangle faces. There is one triangle for each side of the base, so the base has 6 sides: a hexagon.",
      ),
    (n) =>
      choice(
        n,
        "How many vertices (corners) does a pentagonal prism have?",
        ["5", "7", "10", "15"],
        2,
        "Each pentagon end has 5 corners, and there are 2 ends: 5 + 5 = 10.",
      ),
    (n) =>
      trueFalse(
        n,
        "A prism always has 2 more faces than the number of sides on one of its ends.",
        true,
        "There is one rectangle face for each side of the end, plus the 2 ends. A hexagonal prism has 6 + 2 = 8 faces.",
      ),
  ],
});

/** MA2-GM-03: identifying angles and classifying them by comparing to a right angle. */
export const ANGLES = levels(4030416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 30 },
        choice(
          n,
          "What kind of angle is this?",
          ["acute angle", "right angle", "obtuse angle", "straight angle"],
          0,
          "The arms are close together, so the angle is smaller than a right angle. Small angles are acute.",
        ),
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 180 },
        trueFalse(
          n,
          "This is a straight angle.",
          true,
          "The two arms point in opposite directions and make a straight line, so it is a straight angle.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which of these has a right angle?",
        ["the corner of a book", "the tip of a pizza slice", "a round plate", "the point of a pencil"],
        0,
        "The corner of a book is a square corner, which is a right angle. A pizza tip and a pencil point are sharper, and a plate has no corners.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 110 },
        trueFalse(
          n,
          "This angle is bigger than a right angle.",
          true,
          "The arms open wider than the corner of a square, so it is bigger than a right angle. It is an obtuse angle.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "An angle bigger than a right angle but smaller than a straight angle is called an ___ angle.",
        ["obtuse"],
        "Angles between a right angle and a straight angle are obtuse angles.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 3, minute: 0 },
        choice(
          n,
          "What kind of angle do the hands of this clock make?",
          ["right angle", "acute angle", "obtuse angle", "straight angle"],
          0,
          "At 3:00 one hand points up to 12 and the other points across to 3. That is a square corner, a right angle.",
        ),
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these angles in order from largest to smallest.",
        ["full turn", "reflex angle", "straight angle", "right angle", "acute angle"],
        "A full turn is the biggest. Reflex angles are between a straight angle and a full turn. Then come straight, right and acute angles.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 300 },
        choice(
          n,
          "Look at the marked angle. Which is true?",
          [
            "It is bigger than a straight angle, so it is reflex",
            "It is smaller than a straight angle, so it is obtuse",
            "It is bigger than a straight angle, so it is obtuse",
            "It is smaller than a right angle, so it is acute",
          ],
          0,
          "The marked angle goes more than halfway round, so it is bigger than a straight angle. Angles between a straight angle and a full turn are reflex.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these angles are smaller than a straight angle? Choose all that are right.",
        ["acute angle", "right angle", "obtuse angle", "reflex angle"],
        [0, 1, 2],
        "Acute, right and obtuse angles are all less than a straight angle. A reflex angle is bigger.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many right angles are in a three-quarter turn?",
        ["3", "three"],
        "A right angle is a quarter turn, so three quarter turns is 3 right angles.",
      ),
    (n) =>
      trueFalse(
        n,
        "A reflex angle is always bigger than an obtuse angle.",
        true,
        "An obtuse angle is always less than a straight angle, and a reflex angle is always more than a straight angle. So every reflex angle is bigger.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [9, 0],
            [9, 5],
            [3, 5],
          ],
          cornerLabels: ["A", "B", "C", "D"],
        },
        choice(
          n,
          "Which corner of this shape has an obtuse angle?",
          ["A", "B", "C", "D"],
          3,
          "B and C are square corners, so they are right angles. A is narrow, so it is acute. D opens wider than a right angle, so it is obtuse.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "The minute hand of a clock turns clockwise from 12 to 4. What kind of angle has it turned through?",
        ["acute angle", "right angle", "obtuse angle", "reflex angle"],
        2,
        "From 12 to 3 is a right angle and from 12 to 6 is a straight angle. 4 is between 3 and 6, so the turn is obtuse.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 2, minute: 0 },
        choice(
          n,
          "Look at the smaller angle between the hands of this clock. What kind of angle is it?",
          ["acute angle", "right angle", "obtuse angle", "straight angle"],
          0,
          "At 3:00 the hands make a right angle. At 2:00 the hour hand is one number closer to 12, so the angle is smaller than a right angle: acute.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Sam faces north. He turns clockwise until he faces west. How many right angles has he turned through?",
        ["3", "three"],
        "Clockwise from north: 1 right angle to east, 2 to south, 3 to west.",
      ),
  ],
});

/** MA2-GM-01: grid maps, directions and routes. */
export const POSITION = levels(4030516, {
  very_easy: [
    (n) =>
      pic(
        PARK_MAP,
        choice(
          n,
          "Look at the map. Which square are the toilets in?",
          ["B3", "C2", "B2", "C3"],
          0,
          "Go along the bottom to find the letter (B), then up the side to find the number (3). The toilets are in B3.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which direction is opposite to east?",
        ["west", "north", "south"],
        0,
        "East and west are opposite each other on a compass.",
      ),
    (n) =>
      trueFalse(
        n,
        "On a compass, west is a quarter turn anticlockwise from north.",
        true,
        "Going anticlockwise the compass points are north, west, south, east. West is one quarter turn from north.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        PARK_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. What is in square E2?",
          ["playground", "the playground"],
          "Find column E along the bottom and row 2 up the side. The playground is in that square.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which direction is halfway between south and west?",
        ["south-west", "south-east", "north-west", "north-east"],
        0,
        "Halfway between south and west is called south-west (SW).",
      ),
    (n) =>
      pic(
        PARK_MAP,
        choice(
          n,
          "Look at the map. North is at the top. Which place is directly north of the BBQ?",
          ["kiosk", "playground", "café"],
          0,
          "North is up on this map. The kiosk is in column D, the same column as the BBQ, and further up.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        PARK_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. North is at the top. Start at the gate. Go 3 squares east and 3 squares north. Where are you?",
          ["kiosk", "the kiosk"],
          "The gate is in A1. 3 squares east takes you to D1, and 3 squares north takes you to D4, where the kiosk is.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Start at north and go anticlockwise. Put these compass directions in order.",
        ["north", "north-west", "west", "south-west", "south"],
        "Anticlockwise from north you pass north-west, then west, then south-west, then reach south.",
      ),
    (n) =>
      choice(
        n,
        "You are facing south. You make a quarter turn clockwise. Which way are you facing now?",
        ["east", "west", "north", "south"],
        1,
        "Clockwise the directions go north, east, south, west. One quarter turn clockwise from south is west.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 6,
          rows: 4,
          map: true,
          points: [
            { x: 0, y: 3, label: "Start" },
            { x: 4, y: 1, label: "End" },
          ],
          path: [
            [0, 3],
            [4, 3],
            [4, 1],
          ],
        },
        choice(
          n,
          "The line shows Zara's route. North is at the top. Which description matches her route?",
          [
            "4 squares east, then 2 squares south",
            "4 squares east, then 2 squares north",
            "5 squares east, then 3 squares south",
            "4 squares west, then 2 squares south",
          ],
          0,
          "From A4 the line goes right 4 squares to E4 (east), then down 2 squares to E2 (south).",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ben faces south-east. He makes a half turn. Which way is he facing now?",
        ["north-west", "north-east", "south-west", "west"],
        0,
        "A half turn faces the opposite way. Opposite south is north and opposite east is west, so south-east becomes north-west.",
      ),
    (n) =>
      pic(
        PARK_MAP,
        multi(
          n,
          "Look at the map. North is at the top. Which places are further east than the toilets AND further south than the kiosk? Choose all that are right.",
          ["BBQ", "playground", "café", "gate"],
          [0, 1],
          "Further east than the toilets means to the right of column B. Further south than the kiosk means below row 4. The BBQ (D1) and playground (E2) fit both. The café is in row 5, and the gate is in column A.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        PARK_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. North is at the top. Ella starts at the café. She walks 4 squares south, then 2 squares west. Where is she?",
          ["BBQ", "the BBQ", "barbecue", "the barbecue"],
          "The café is in F5. 4 squares south takes her to F1, and 2 squares west takes her to D1, where the BBQ is.",
        ),
      ),
    (n) =>
      pic(
        PARK_MAP,
        choice(
          n,
          "Look at the map. North is at the top. Which route takes Noah from the toilets to the café?",
          [
            "4 squares east, then 2 squares north",
            "2 squares east, then 4 squares north",
            "4 squares west, then 2 squares south",
            "4 squares east, then 2 squares south",
          ],
          0,
          "The toilets are in B3 and the café is in F5. From B to F is 4 squares east, and from row 3 to row 5 is 2 squares north.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ruby faces north-west. She makes a quarter turn clockwise, then a half turn clockwise. Which way is she facing now?",
        ["south-west", "north-east", "south-east", "north"],
        0,
        "A quarter turn clockwise from north-west makes her face north-east. A half turn then makes her face the opposite way: south-west.",
      ),
  ],
});

/** MA2-NSM-01: mass in kilograms and grams. */
export const MASS = levels(4060316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "scale", max: 10, value: 7, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "What mass does the scale show, in kilograms?",
          ["7", "7 kg"],
          "The pointer is on the 7, and the scale is in kilograms, so it shows 7 kg.",
        ),
      ),
    (n) => typed("fill_blank", n, "2 kilograms = ___ grams", ["2000"], "Each kilogram is 1000 grams, so 2 kg is 1000 + 1000 = 2000 g."),
    (n) =>
      trueFalse(
        n,
        "A watermelon has a mass of about 5 grams.",
        false,
        "5 grams is about as heavy as a few paperclips. A watermelon is heavy, more like 5 kilograms.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "scale", max: 500, value: 250, step: 50, unit: "g" },
        typed(
          "short_answer",
          n,
          "How many grams does the scale show?",
          ["250", "250 g"],
          "The scale counts by 50s, and the pointer is on 250, so it shows 250 g.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is lighter: 2 kg of apples or 1800 g of potatoes?",
        ["2 kg of apples", "1800 g of potatoes", "They are the same"],
        1,
        "2 kg is 2000 g. 1800 g is less than 2000 g, so the potatoes are lighter.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the mass of a Year 4 student?",
        ["30 kg", "30 g", "300 kg", "3 kg"],
        0,
        "A Year 4 student is about as heavy as 30 bags of flour, so about 30 kg. 3 kg is like a newborn baby.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "scale", max: 4, value: 2.5, step: 0.5, unit: "kg" },
        choice(
          n,
          "What mass does the scale show?",
          ["2500 g", "250 g", "25 kg", "2 kg 5 g"],
          0,
          "The pointer is on 2.5 kg, which is 2 kg and half a kilogram. 2000 g + 500 g = 2500 g.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these masses in order from heaviest to lightest.",
        ["3 kg", "2 kg 600 g", "2400 g", "950 g"],
        "Change them all to grams: 3000 g, 2600 g, 2400 g and 950 g.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "A quarter of a kilogram = ___ grams",
        ["250"],
        "1 kilogram is 1000 g. Half of 1000 is 500, and half of 500 is 250.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "4 kg 75 g = ___ g",
        ["4075"],
        "4 kg is 4000 g. 4000 g + 75 g = 4075 g. The 0 shows there are no hundreds of grams.",
      ),
    (n) =>
      pic(
        { kind: "scale", max: 2000, value: 1300, step: 200, unit: "g" },
        typed(
          "short_answer",
          n,
          "The scale shows a bag of oranges. What is its mass in grams?",
          ["1300", "1300 g"],
          "The scale counts by 200s. The pointer is halfway between 1200 and 1400, which is 1300 g.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 1 kg 500 g? Choose all that are right.",
        ["1500 g", "1.5 kg", "150 g", "1 kg + 500 g", "15 kg"],
        [0, 1, 3],
        "1 kg 500 g is 1000 g + 500 g = 1500 g, which is one and a half kilograms (1.5 kg). 150 g and 15 kg are not the same.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A box holds 8 muesli bars. Each bar has a mass of 25 g, and the empty box is 50 g. What is the total mass in grams?",
        ["250", "250 g"],
        "8 bars: 8 × 25 = 200 g. Add the box: 200 + 50 = 250 g.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Grandpa buys 2 kg of mince. He uses 650 g for meatballs and 800 g for a lasagne. How many grams are left?",
        ["550", "550 g"],
        "He uses 650 + 800 = 1450 g. 2 kg is 2000 g, so 2000 − 1450 = 550 g are left.",
      ),
    (n) =>
      choice(
        n,
        "A puppy had a mass of 2 kg 800 g. A month later it was 4 kg 100 g. How much mass did it gain?",
        ["1 kg 300 g", "2 kg 300 g", "1 kg 700 g", "300 g"],
        0,
        "Change to grams: 4100 − 2800 = 1300 g, which is 1 kg 300 g.",
      ),
  ],
});

/** MA2-3DS-02: capacity in litres and millilitres, and volume in cubic centimetres. */
export const CAPACITY = levels(4060416, {
  very_easy: [
    (n) =>
      pic(
        { kind: "jug", max: 10, value: 6, step: 1, unit: "L" },
        typed(
          "short_answer",
          n,
          "How many litres of water are in the container?",
          ["6", "6 L"],
          "The water comes up to the 6 L mark, so there are 6 litres.",
        ),
      ),
    (n) => typed("fill_blank", n, "2 litres = ___ millilitres", ["2000"], "Each litre is 1000 millilitres, so 2 L is 2000 mL."),
    (n) =>
      choice(
        n,
        "Which of these holds about 250 mL?",
        ["a cup", "a bathtub", "a teaspoon", "a bucket"],
        0,
        "A cup holds about 250 mL, a quarter of a litre. A teaspoon holds much less, and a bucket or bathtub much more.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "jug", max: 500, value: 300, step: 50, unit: "mL" },
        typed(
          "short_answer",
          n,
          "How many millilitres of water are in the jug?",
          ["300", "300 mL"],
          "The jug is marked in 50s, and the water reaches 300 mL.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "This flat block is one layer of 1 cm cubes. What is its volume in cubic centimetres?",
          ["10", "10 cubic centimetres", "10 cm³"],
          "There are 2 rows of 5 cubes: 5 + 5 = 10 cubes, so the volume is 10 cubic centimetres.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A bucket holds about 10 millilitres.",
        false,
        "10 mL is only two teaspoons. A bucket holds about 10 litres, which is 10 000 mL.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "jug", max: 2, value: 1.5, step: 0.5, unit: "L" },
        typed(
          "short_answer",
          n,
          "How many millilitres of water are in the jug?",
          ["1500", "1500 mL"],
          "The water is at 1.5 L, which is 1 litre and half a litre. 1000 mL + 500 mL = 1500 mL.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 5, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. What is its volume in cubic centimetres?",
          ["20", "20 cubic centimetres", "20 cm³"],
          "Each layer has 2 rows of 5, which is 10 cubes. There are 2 layers: 10 + 10 = 20 cubic centimetres.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from largest to smallest.",
        ["2 L", "1750 mL", "1 L 500 mL", "900 mL"],
        "Change them all to millilitres: 2000 mL, 1750 mL, 1500 mL and 900 mL.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "3 L 80 mL = ___ mL",
        ["3080"],
        "3 L is 3000 mL. 3000 mL + 80 mL = 3080 mL. The 0 shows there are no hundreds of millilitres.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for how much a can of soft drink holds?",
        ["375 mL", "375 L", "37 mL", "3 L"],
        0,
        "A can is less than half a litre, so about 375 mL. 37 mL is only a few spoonfuls, and 3 L is a big bottle.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 3, height: 2 },
        choice(
          n,
          "This block is made of 1 cm cubes. What is its volume?",
          ["24 cubic centimetres", "9 cubic centimetres", "12 cubic centimetres", "26 cubic centimetres"],
          0,
          "Each layer has 3 rows of 4, which is 12 cubes. There are 2 layers: 12 + 12 = 24 cubic centimetres. (9 is just 4 + 3 + 2.)",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 3 L jug of water is poured equally into 6 glasses. How many millilitres go in each glass?",
        ["500", "500 mL"],
        "3 L is 3000 mL. 3000 ÷ 6 = 500 mL in each glass.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Dad fills a 5 L watering can using a 250 mL cup. How many full cups does he need?",
        ["20", "twenty"],
        "4 cups of 250 mL make 1000 mL, which is 1 L. 5 L needs 5 × 4 = 20 cups.",
      ),
    (n) =>
      choice(
        n,
        "Block A is made of 1 cm cubes: 2 long, 2 wide and 3 high. Block B is 3 long, 3 wide and 1 high. Which has the bigger volume?",
        [
          "Block A, by 3 cubic centimetres",
          "Block B, by 3 cubic centimetres",
          "They have the same volume",
          "Block A, by 1 cubic centimetre",
        ],
        0,
        "Block A has 3 layers of 2 × 2 = 4 cubes, so 12. Block B has 1 layer of 3 × 3 = 9 cubes. 12 − 9 = 3, so A is bigger by 3 cubic centimetres.",
      ),
  ],
});

/** MA2-2DS-03: area in square centimetres and square metres. */
export const AREA = levels(4060516, {
  very_easy: [
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 5,
          rows: 3,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [1, 1],
            [2, 1],
            [2, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each square is 1 square centimetre. What is the area of the shaded shape in square centimetres?",
          ["6", "6 square centimetres", "6 cm²"],
          "Count the shaded squares: 3 in the bottom row, 2 in the middle row and 1 at the top. 3 + 2 + 1 = 6 square centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the area of a playing card?",
        ["square centimetres", "square metres", "centimetres", "kilograms"],
        0,
        "A playing card is small, so square centimetres are best. Centimetres measure length, not area.",
      ),
    (n) =>
      trueFalse(
        n,
        "A square centimetre is a square with sides 1 cm long.",
        true,
        "A square centimetre is the area covered by a square that is 1 cm along each side.",
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
            [4, 4],
            [0, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of the square in square centimetres?",
          ["16", "16 square centimetres", "16 cm²"],
          "There are 4 rows with 4 squares in each: 4 + 4 + 4 + 4 = 16 square centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the area of a bedroom floor?",
        ["12 square metres", "12 square centimetres", "1200 square metres", "1 square centimetre"],
        0,
        "A bedroom might be 4 m long and 3 m wide, so about 12 square metres. 12 square centimetres is smaller than your hand.",
      ),
    (n) =>
      trueFalse(
        n,
        "If two rectangles have the same perimeter, they must have the same area.",
        false,
        "A 5 cm by 1 cm rectangle and a 3 cm by 3 cm square both have a perimeter of 12 cm, but their areas are 5 and 9 square centimetres.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [7, 0],
            [7, 3],
            [0, 3],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 square centimetre. What is the area of the rectangle?",
          ["21 square centimetres", "20 square centimetres", "10 square centimetres", "24 square centimetres"],
          0,
          "There are 3 rows of 7 squares. 3 × 7 = 21 square centimetres. (20 is the distance around the edge, the perimeter.)",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 20 square centimetres? Choose all that are right.",
        ["4 cm by 5 cm", "2 cm by 10 cm", "5 cm by 5 cm", "1 cm by 20 cm", "3 cm by 7 cm"],
        [0, 1, 3],
        "4 × 5 = 20, 2 × 10 = 20 and 1 × 20 = 20. But 5 × 5 = 25 and 3 × 7 = 21.",
      ),
    (n) =>
      ordering(
        n,
        "Put these surfaces in order from smallest area to largest area.",
        ["a postage stamp", "a page of a book", "a classroom door", "a classroom floor"],
        "A stamp covers a few square centimetres and a book page a few hundred. A door is about 2 square metres, and a classroom floor is much more.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [4, 0],
            [4, 4],
            [6, 4],
            [6, 6],
            [0, 6],
            [0, 4],
            [2, 4],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of this T shape in square centimetres?",
          ["20", "20 square centimetres", "20 cm²"],
          "Split it into two rectangles. The top bar is 2 rows of 6, which is 12. The stem is 4 rows of 2, which is 8. 12 + 8 = 20.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [8, 4],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 square centimetre. The triangle fits inside an 8 by 4 rectangle. What is the area of the triangle?",
          ["16 square centimetres", "32 square centimetres", "12 square centimetres", "24 square centimetres"],
          0,
          "The triangle is exactly half of the 8 by 4 rectangle. The rectangle has 4 × 8 = 32 small squares, and half of 32 is 16.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A patio is 5 m long and 3 m wide. How many square tiles, each 1 m by 1 m, does it take to cover it?",
        ["15", "fifteen"],
        "Each tile covers 1 square metre. There are 3 rows of 5 tiles: 3 × 5 = 15.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangle has an area of 36 square centimetres. One side is 4 cm long. How long is the other side in centimetres?",
        ["9", "9 cm"],
        "4 rows of something make 36 squares. 4 × 9 = 36, so the other side is 9 cm.",
      ),
    (n) =>
      choice(
        n,
        "Rectangle P is 8 cm by 2 cm. Rectangle Q is 4 cm by 4 cm. Which is true?",
        [
          "They have the same area, but P has a longer perimeter",
          "They have the same area and the same perimeter",
          "Q has the bigger area",
          "P has the bigger area",
        ],
        0,
        "Areas: 8 × 2 = 16 and 4 × 4 = 16 square centimetres, the same. Perimeters: P is 8 + 2 + 8 + 2 = 20 cm and Q is 4 + 4 + 4 + 4 = 16 cm, so P's is longer.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A lawn is 6 m long and 4 m wide. A garden bed 2 m by 2 m is dug in the middle. What area of grass is left, in square metres?",
        ["20", "20 square metres", "20 m²"],
        "The whole lawn is 6 × 4 = 24 square metres. The garden bed is 2 × 2 = 4 square metres. 24 − 4 = 20 square metres of grass.",
      ),
  ],
});

/** MA2-DATA-01: collecting data and constructing graphs using a given scale. */
export const DATA_COLLECT = levels(4070216, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Ollie kept a tally. He drew 3 bundles of five and 2 more marks. What number does his tally show?",
        ["17", "seventeen"],
        "Each bundle is 5, so 3 bundles is 15. 15 + 2 = 17.",
      ),
    (n) =>
      trueFalse(
        n,
        "A column graph should have a title.",
        true,
        "The title tells the reader what the graph is about, so every graph needs one.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite fruit",
          thing: "children",
          each: 2,
          rows: [
            { label: "Apple", count: 3 },
            { label: "Banana", count: 5 },
            { label: "Mango", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many children chose banana?",
          ["10", "ten"],
          "Banana has 5 stars, and each star stands for 2 children. 5 × 2 = 10.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Pets in our class",
          columns: [
            { label: "dog", value: 8 },
            { label: "cat", value: 6 },
            { label: "fish", value: 4 },
            { label: "bird", value: 2 },
          ],
          step: 2,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. The scale counts by 2s. How many children have a cat?",
          ["6", "six"],
          "The cat column reaches the line marked 6.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best survey question to find out the class's favourite fruit?",
        ["What is your favourite fruit?", "Do you eat lunch?", "How old are you?", "Is an apple red?"],
        0,
        "A good survey question asks exactly what you want to know. Here that is each person's favourite fruit.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Animal", "Votes"],
          rows: [
            ["koala", 15],
            ["wombat", 10],
            ["platypus", 5],
          ],
        },
        typed(
          "short_answer",
          n,
          "Lily is drawing a picture graph of these votes. Each picture stands for 5 votes. How many pictures should she draw for koala?",
          ["3", "three"],
          "Koala got 15 votes. Each picture is 5 votes, so 15 ÷ 5 = 3 pictures.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Books read by our class",
          thing: "books",
          each: 4,
          rows: [
            { label: "Mon", count: 2 },
            { label: "Tue", count: 5 },
            { label: "Wed", count: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many books were read altogether?",
          ["40", "forty"],
          "There are 2 + 5 + 3 = 10 stars. Each star is 4 books, so 10 × 4 = 40.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Noah's survey results are 6, 9, 4 and 8. Which scale is best for the side of his column graph?",
        ["0, 1, 2, … up to 10", "0, 10, 20, … up to 100", "0, 5, 10, … up to 50", "0, 100, 200, … up to 1000"],
        0,
        "The biggest result is 9, so a scale counting by 1s up to 10 fits well and shows each number exactly. Bigger steps would make the columns tiny.",
      ),
    (n) =>
      ordering(
        n,
        "Put these tallies in order from smallest to largest.",
        ["1 bundle of five and 4 marks", "2 bundles of five", "2 bundles of five and 3 marks", "3 bundles of five and 1 mark"],
        "Work out each one: 5 + 4 = 9, 5 + 5 = 10, 10 + 3 = 13 and 15 + 1 = 16.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Ice blocks sold at the canteen",
          columns: [
            { label: "Mon", value: 12 },
            { label: "Tue", value: 18 },
            { label: "Wed", value: 8 },
          ],
          step: 4,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many ice blocks were sold on Tuesday?",
          ["18", "eighteen"],
          "The scale counts by 4s. The Tuesday column stops halfway between 16 and 20, which is 18.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Zoe is running a survey on favourite sports. Which of these are good things to do? Choose all that are right.",
        [
          "Ask everyone the same question",
          "Give a list of sports to choose from",
          "Only ask her best friend",
          "Record the answers with a tally",
        ],
        [0, 1, 3],
        "Asking everyone the same question, giving clear choices and keeping a tally make the results fair and easy to count. Asking just one friend doesn't tell you about the class.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each picture stands for 10 people. How many pictures show 35 people?",
        ["3.5", "3 and a half", "three and a half", "3½"],
        "3 pictures show 30 people. 5 more people is half of 10, so draw half a picture: 3 and a half pictures.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Cars passing the school",
          thing: "cars",
          each: 5,
          rows: [
            { label: "8 am", count: 7 },
            { label: "9 am", count: 4 },
            { label: "10 am", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many more cars passed at 8 am than at 9 am and 10 am together?",
          ["5", "five"],
          "8 am: 7 × 5 = 35 cars. 9 am and 10 am: 4 + 2 = 6 stars, and 6 × 5 = 30 cars. 35 − 30 = 5 more cars.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ivy's column graph has a scale that goes up in 5s. One result is 32. Between which two lines will that column stop?",
        ["30 and 35", "35 and 40", "25 and 30", "32 and 37"],
        0,
        "The lines are at 0, 5, 10, … 30, 35. 32 is more than 30 but less than 35, so the column stops between those lines, a bit under halfway.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite pizza",
          columns: [
            { label: "ham", value: 16 },
            { label: "cheese", value: 12 },
            { label: "veggie", value: 8 },
          ],
          step: 4,
        },
        typed(
          "short_answer",
          n,
          "Rosa asked 44 students. Her graph shows three pizzas, but she forgot to draw the column for supreme. How many students chose supreme?",
          ["8", "eight"],
          "The graph shows 16 + 12 + 8 = 36 students. 44 − 36 = 8 chose supreme.",
        ),
      ),
  ],
});

/** MA2-CHAN-01: recording and comparing the results of chance experiments. */
export const CHANCE = levels(4070316, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["yellow", "yellow", "green", "green", "green", "green"] },
        trueFalse(
          n,
          "On this spinner, green is more likely than yellow.",
          true,
          "4 of the 6 parts are green and only 2 are yellow, so green is more likely.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You roll a normal dice numbered 1 to 6. How likely is it that you roll a 7?",
        ["impossible", "unlikely", "likely", "certain"],
        0,
        "A normal dice only has the numbers 1 to 6, so rolling a 7 can't happen. It is impossible.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Harry flipped a coin 20 times. He got heads 11 times. How many times did he get tails?",
        ["9", "nine"],
        "Every flip was heads or tails, so 20 − 11 = 9 tails.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        PICK_TABLE,
        choice(
          n,
          "The table shows the results of picking counters from a bag. Which colour was picked least often?",
          ["red", "blue", "yellow"],
          0,
          "Red was picked 4 times, fewer than blue (10) or yellow (6).",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Something that is likely will always happen.",
        false,
        "Likely means it will probably happen, but not for sure. Only something certain always happens.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 5 },
            { colour: "blue", count: 1 },
          ],
        },
        choice(
          n,
          "You pick one counter from this bag without looking. Which colour are you more likely to get?",
          ["red", "blue", "they are equally likely"],
          0,
          "There are 5 red counters and only 1 blue, so red is much more likely.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["purple", "green"] },
        choice(
          n,
          "You spin this spinner 30 times. About how many times would you expect it to land on purple?",
          ["15", "30", "10", "2"],
          0,
          "Purple is 1 of 2 equal parts, so about half the spins. Half of 30 is 15.",
        ),
      ),
    (n) =>
      pic(
        PICK_TABLE,
        typed(
          "short_answer",
          n,
          "The table shows the results of picking counters from a bag. How many counters were picked altogether?",
          ["20", "twenty"],
          "Add the results: 4 + 10 + 6 = 20 picks.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 6 },
            { colour: "blue", count: 3 },
            { colour: "green", count: 1 },
          ],
        },
        ordering(
          n,
          "Put the colours in this bag in order from least likely to most likely to be picked.",
          ["green", "blue", "red"],
          "Count the counters: green 1, blue 3, red 6. More counters means more likely.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "red", "blue", "green"] },
        choice(
          n,
          "Tim wins if this spinner lands on red, Ali on blue and Zoe on green. Is the game fair?",
          ["Yes, they all have the same chance", "No, Tim is more likely to win", "No, Zoe is more likely to win"],
          0,
          "Each colour has 2 of the 6 equal parts, so all three players have the same chance. The game is fair.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Coin flipped 40 times",
          columns: [
            { label: "heads", value: 24 },
            { label: "tails", value: 16 },
          ],
          step: 4,
        },
        multi(
          n,
          "Look at the results. Which of these are true? Choose all that are right.",
          ["Heads came up more often than tails", "There were 40 flips", "Tails came up 24 times", "Heads came up 8 more times than tails"],
          [0, 1, 3],
          "Heads came up 24 times and tails 16 times. 24 + 16 = 40 flips, and 24 − 16 = 8. Tails came up 16 times, not 24.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 1 red counter and 4 green counters. Sam picks one, records its colour and puts it back. He does this 25 times. About how many times would you expect red?",
        ["5", "five"],
        "Red is 1 of the 5 counters, so expect red about 1 time in every 5 picks. 25 ÷ 5 = 5.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Sophie rolled a dice 12 times and got 4 sixes. Jack rolled a dice 600 times and got 102 sixes. Whose results are closer to what you would expect?",
        ["Sophie's", "Jack's", "They are equally close"],
        1,
        "You expect a six about 1 time in 6. In 12 rolls that is about 2, and Sophie got double that. In 600 rolls it is about 100, and Jack got 102, very close. More rolls usually give results closer to what you expect.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Colour", "Times landed"],
          rows: [
            ["red", 16],
            ["blue", 9],
            ["green", 5],
          ],
        },
        choice(
          n,
          "Mai spun a spinner with 6 equal parts 30 times. The table shows her results. Which spinner did she most likely use?",
          ["3 red, 2 blue, 1 green", "1 red, 2 blue, 3 green", "2 red, 2 blue, 2 green", "1 red, 1 blue, 4 green"],
          0,
          "Red came up most, then blue, then green. The spinner with the most red parts and fewest green parts is 3 red, 2 blue, 1 green. That would give about 15, 10 and 5, close to her results.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Kai flipped a coin and got heads 4 times in a row. This means tails is more likely on the next flip.",
        false,
        "A coin doesn't remember earlier flips. Every flip has the same chance of heads or tails, even after 4 heads in a row.",
      ),
  ],
});
