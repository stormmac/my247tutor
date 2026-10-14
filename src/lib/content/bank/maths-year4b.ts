/**
 * Year 4 Mathematics (later Stage 2): 15 questions for each Stage 2 standard (NESA outcome) in
 * geometry, measurement, data and chance, three at each level from very easy to very hard.
 * Arithmetic answers are checked by the content tests.
 */
import type { Picture } from "../picture";
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** A street map shared by the position questions. North is at the top. */
const TOWN_MAP: Picture = {
  kind: "grid",
  columns: 6,
  rows: 4,
  map: true,
  points: [
    { x: 0, y: 0, label: "Pool" },
    { x: 3, y: 0, label: "School" },
    { x: 2, y: 1, label: "Library" },
    { x: 1, y: 2, label: "Park" },
    { x: 4, y: 3, label: "Shop" },
  ],
};

/** Results of spinning a spinner, shared by two chance questions. */
const SPIN_TABLE: Picture = {
  kind: "table",
  headings: ["Colour", "Times landed"],
  rows: [
    ["red", 9],
    ["blue", 3],
    ["green", 4],
  ],
};

/** MA2-2DS-01: comparing two-dimensional shapes and describing their features. */
export const SHAPES_2D = levels(4030101, {
  very_easy: [
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
        choice(
          n,
          "What is this shape called?",
          ["pentagon", "hexagon", "octagon", "heptagon"],
          1,
          "Count the sides: there are 6. A shape with 6 sides is a hexagon.",
        ),
      ),
    (n) => trueFalse(n, "An octagon has 8 sides.", true, "'Octa' means eight, like an octopus with 8 arms. An octagon has 8 sides."),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [2, 0],
            [6, 0],
            [7, 4],
            [4, 7],
            [1, 4],
          ],
        },
        typed(
          "short_answer",
          n,
          "How many sides does this shape have?",
          ["5", "five"],
          "Count each straight side as you go around: 5 sides. It is a pentagon.",
        ),
      ),
  ],
  easy: [
    (n) =>
      choice(
        n,
        "Which quadrilateral has exactly one pair of parallel sides?",
        ["trapezium", "rhombus", "rectangle", "square"],
        0,
        "A trapezium has just one pair of parallel sides. A rhombus, rectangle and square each have two pairs.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [3, 7],
          ],
          sideLabels: ["6 cm", "8 cm", "8 cm"],
        },
        choice(
          n,
          "Look at the side lengths. What kind of triangle is this?",
          ["equilateral", "isosceles", "scalene", "right-angled"],
          1,
          "Two sides are 8 cm and one is 6 cm. A triangle with exactly two equal sides is isosceles.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes have 4 sides? Choose all that are right.",
        ["square", "kite", "pentagon", "rhombus", "triangle"],
        [0, 1, 3],
        "Squares, kites and rhombuses are all quadrilaterals, with 4 sides. A pentagon has 5 and a triangle has 3.",
      ),
  ],
  medium: [
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
        },
        choice(
          n,
          "What is this shape called?",
          ["rectangle", "rhombus", "trapezium", "kite"],
          1,
          "All 4 sides are equal, opposite sides are parallel, and it has no right angles. That makes it a rhombus.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Every square is also a rectangle.",
        true,
        "A rectangle has 4 right angles and opposite sides equal. A square has all of that, so every square is a special rectangle.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Two lines that meet at a right angle are called ___ lines.",
        ["perpendicular"],
        "Lines that cross or meet at a right angle are perpendicular. Lines that never meet are parallel.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [0, 6],
            [8, 0],
          ],
          sideLabels: ["6 cm", "10 cm", "8 cm"],
        },
        multi(
          n,
          "Which words describe this triangle? Choose all that are right.",
          ["right-angled", "scalene", "isosceles", "equilateral"],
          [0, 1],
          "It has a right angle in the bottom corner, and all three sides are different lengths (6, 8 and 10 cm), so it is right-angled and scalene.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these shapes in order from fewest sides to most sides.",
        ["trapezium", "pentagon", "hexagon", "octagon"],
        "A trapezium has 4 sides, a pentagon 5, a hexagon 6 and an octagon 8.",
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
        },
        choice(
          n,
          "How many pairs of parallel sides does this shape have?",
          ["0", "1", "2", "4"],
          2,
          "The top and bottom are parallel, and the two slanting sides lean the same way, so they are parallel too. That is 2 pairs. It is a parallelogram.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      multi(
        n,
        "Which of these are true for every rhombus? Choose all that are right.",
        ["All 4 sides are equal", "Opposite sides are parallel", "All its angles are right angles", "It is a quadrilateral"],
        [0, 1, 3],
        "A rhombus is a quadrilateral with 4 equal sides and opposite sides parallel. Only some rhombuses (squares) have right angles.",
      ),
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
          "How many right angles are inside this shape?",
          ["3", "4", "5", "6"],
          2,
          "Five corners are right angles. The corner that points inwards is bigger than a straight angle, so it is a reflex angle, not a right angle.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Sam says, 'A shape with 4 equal sides must be a square.' Which shape shows that Sam is wrong?",
        ["a rhombus with no right angles", "a rectangle", "a kite", "a trapezium"],
        0,
        "A rhombus also has 4 equal sides, but its angles don't have to be right angles, so it isn't always a square.",
      ),
  ],
});

/** MA2-2DS-02: flips, slides, turns, symmetry, tessellation, and combining and splitting shapes. */
export const TRANSFORM = levels(4030201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Moving a shape in a straight line, without flipping or turning it, is called a…",
        ["slide", "flip", "turn"],
        0,
        "A slide (also called a translation) moves the shape along. It still faces the same way.",
      ),
    (n) =>
      trueFalse(
        n,
        "When you flip a shape over a line, you get its mirror image.",
        true,
        "A flip (also called a reflection) is like looking in a mirror: the shape is reversed.",
      ),
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
        },
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this square have?",
          ["4", "four"],
          "A square folds exactly in half across the middle both ways and along both diagonals: 4 lines of symmetry.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many quarter turns make one full turn?",
        ["4", "four"],
        "Each quarter turn goes a quarter of the way round, so 4 quarter turns take you all the way round.",
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
        choice(
          n,
          "How many lines of symmetry does this rectangle have?",
          ["0", "1", "2", "4"],
          2,
          "It folds in half across the middle going across and going up and down. The diagonals don't work, because the halves don't match. So 2 lines.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these shapes tessellate on their own (fit together with no gaps or overlaps)? Choose all that are right.",
        ["square", "equilateral triangle", "regular hexagon", "circle"],
        [0, 1, 2],
        "Squares, equilateral triangles and regular hexagons fit together with no gaps, like tiles. Circles always leave gaps.",
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these turns in order from smallest to largest.",
        ["quarter turn", "half turn", "three-quarter turn", "full turn"],
        "A quarter turn is 1 quarter, a half turn is 2 quarters, a three-quarter turn is 3 quarters and a full turn is 4 quarters.",
      ),
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
        typed(
          "short_answer",
          n,
          "Cut straight down from the two top corners of this trapezium. You get one rectangle and how many triangles?",
          ["2", "two"],
          "Cutting straight down from each top corner leaves a rectangle in the middle and a right-angled triangle at each end: 2 triangles.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A regular pentagon has 5 lines of symmetry.",
        true,
        "A regular shape has as many lines of symmetry as it has sides. A regular pentagon has 5 sides, so 5 lines.",
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
            { x: 1, y: 1, label: "P" },
            { x: 5, y: 4, label: "A" },
            { x: 4, y: 5, label: "B" },
            { x: 5, y: 3, label: "C" },
          ],
        },
        choice(
          n,
          "Point P slides 4 units to the right and 3 units up. Which point does it land on?",
          ["A", "B", "C"],
          0,
          "P is at 1 across and 1 up. 4 to the right makes 5 across, and 3 up makes 4 up. That is point A.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "The minute hand of a clock points to 12. It makes a three-quarter turn clockwise. Which number does it point to now?",
        ["9", "nine"],
        "A quarter turn from 12 reaches 3, a half turn reaches 6, and a three-quarter turn reaches 9.",
      ),
    (n) =>
      multi(
        n,
        "Which of these capital letters have a line of symmetry going straight up and down? Choose all that are right.",
        ["A", "M", "T", "F", "S"],
        [0, 1, 2],
        "A, M and T match on both sides of a line down the middle. F and S don't match when folded that way.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "An arrow points to the right. It is turned a quarter turn anticlockwise, then a half turn clockwise. Which way does it point now?",
        ["up", "down", "left", "right"],
        1,
        "A quarter turn anticlockwise from right makes it point up. A half turn from up makes it point down.",
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
        typed(
          "short_answer",
          n,
          "How many lines of symmetry does this kite have?",
          ["1", "one"],
          "Only the line from the top point to the bottom point splits the kite into matching halves. Folding it across the other way doesn't match. So 1 line.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Grace tiles a floor with regular hexagons, with no gaps. How many hexagons meet at each corner point?",
        ["3", "three"],
        "Each corner of a regular hexagon is bigger than a right angle. Exactly 3 of them fit together around a point to make a full turn, like a honeycomb.",
      ),
  ],
});

/** MA2-3DS-01: prisms and pyramids, their faces, edges and vertices, and their nets. */
export const OBJECTS_3D = levels(4030301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        choice(
          n,
          "What is this object called?",
          ["square pyramid", "triangular prism", "cube", "cone"],
          0,
          "It has a square base and triangle faces that meet at a point at the top, so it is a square pyramid.",
        ),
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "cylinder" },
        trueFalse(n, "This object has a curved surface.", true, "A cylinder has two flat circle faces and a curved surface around the side."),
      ),
    (n) => typed("short_answer", n, "How many faces does a cube have?", ["6", "six"], "A cube has a top, a bottom and 4 sides: 6 square faces."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_prism" },
        typed(
          "short_answer",
          n,
          "How many faces does this triangular prism have?",
          ["5", "five"],
          "It has 2 triangle faces at the ends and 3 rectangle faces joining them: 2 + 3 = 5.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are prisms? Choose all that are right.",
        ["cube", "rectangular prism", "triangular prism", "square pyramid", "cone"],
        [0, 1, 2],
        "A prism has two matching ends joined by rectangles. A cube is a prism too. Pyramids come to a point, and a cone has a curved surface.",
      ),
    (n) =>
      trueFalse(
        n,
        "The point at the top of a pyramid is called the apex.",
        true,
        "All the triangle faces of a pyramid meet at one point, called the apex.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "solid", shape: "rectangular_prism" },
        typed(
          "short_answer",
          n,
          "How many edges does this rectangular prism have?",
          ["12", "twelve"],
          "There are 4 edges around the top, 4 around the bottom and 4 going up the sides: 4 + 4 + 4 = 12.",
        ),
      ),
    (n) =>
      choice(
        n,
        "A net is made of 1 square and 4 triangles. What object does it fold into?",
        ["square pyramid", "triangular prism", "cube", "triangular pyramid"],
        0,
        "The square is the base, and the 4 triangles fold up to meet at a point. That is a square pyramid.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "triangular_pyramid" },
        typed(
          "fill_blank",
          n,
          "This triangular pyramid has ___ vertices (corners).",
          ["4", "four"],
          "There are 3 corners around the triangle base and 1 at the apex: 3 + 1 = 4.",
        ),
      ),
  ],
  hard: [
    (n) =>
      ordering(
        n,
        "Put these objects in order from fewest faces to most faces.",
        ["triangular pyramid", "square pyramid", "rectangular prism", "hexagonal prism"],
        "Triangular pyramid: 4 faces. Square pyramid: 5. Rectangular prism: 6. Hexagonal prism: 2 ends + 6 sides = 8.",
      ),
    (n) =>
      pic(
        { kind: "solid", shape: "square_pyramid" },
        multi(
          n,
          "Which of these are true about this square pyramid? Choose all that are right.",
          ["It has 5 faces", "It has 8 edges", "It has 5 vertices", "All its faces are triangles"],
          [0, 1, 2],
          "1 square + 4 triangles = 5 faces. 4 base edges + 4 slanting edges = 8 edges. 4 base corners + the apex = 5 vertices. The base is a square, not a triangle.",
        ),
      ),
    (n) =>
      choice(
        n,
        "You look at a cylinder standing up, from straight in front at eye level. What shape do you see?",
        ["circle", "rectangle", "triangle", "square with round corners"],
        1,
        "From the side you see its height and its width, with straight edges, so it looks like a rectangle. From above you would see a circle.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A prism has 7 faces. What shape are its two ends?",
        ["pentagon", "pentagons", "a pentagon"],
        "Take away the 2 ends: 7 − 2 = 5 rectangle faces around the sides. So each end has 5 sides, which is a pentagon.",
      ),
    (n) =>
      choice(
        n,
        "How many edges does a hexagonal pyramid have?",
        ["6", "7", "12", "18"],
        2,
        "The hexagon base has 6 edges, and 6 more edges slant up to the apex: 6 + 6 = 12.",
      ),
    (n) =>
      trueFalse(
        n,
        "Every pyramid has one more face than the number of sides on its base.",
        true,
        "There is one triangle face for each side of the base, plus the base itself. So a pyramid with a 5-sided base has 5 + 1 = 6 faces.",
      ),
  ],
});

/** MA2-GM-03: identifying angles and classifying them by comparing to a right angle. */
export const ANGLES = levels(4030401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 90 },
        choice(
          n,
          "What kind of angle is this?",
          ["right angle", "acute angle", "obtuse angle", "straight angle"],
          0,
          "The square mark in the corner shows a right angle, like the corner of a book.",
        ),
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 40 },
        trueFalse(
          n,
          "This angle is smaller than a right angle.",
          true,
          "The arms are closer together than the corner of a square, so it is smaller than a right angle.",
        ),
      ),
    (n) =>
      typed("short_answer", n, "How many right angles does a square have?", ["4", "four"], "Every corner of a square is a right angle: 4."),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "angle", degrees: 130 },
        choice(
          n,
          "What kind of angle is this?",
          ["acute angle", "right angle", "obtuse angle", "reflex angle"],
          2,
          "It is bigger than a right angle but smaller than a straight line, so it is obtuse.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "An angle that is smaller than a right angle is called an ___ angle.",
        ["acute"],
        "Small angles, less than a right angle, are acute angles.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 180 },
        typed(
          "short_answer",
          n,
          "This is a straight angle. How many right angles fit into it?",
          ["2", "two"],
          "A straight angle is a half turn, and a right angle is a quarter turn. 2 quarters make a half.",
        ),
      ),
  ],
  medium: [
    (n) =>
      ordering(
        n,
        "Put these angles in order from smallest to largest.",
        ["acute angle", "right angle", "obtuse angle", "straight angle"],
        "Acute is less than a right angle, obtuse is between a right angle and a straight angle.",
      ),
    (n) =>
      pic(
        { kind: "angle", degrees: 250 },
        choice(
          n,
          "What kind of angle is marked?",
          ["obtuse angle", "straight angle", "reflex angle", "acute angle"],
          2,
          "The marked angle is bigger than a straight angle but less than a full turn, so it is a reflex angle.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these angles are bigger than a right angle? Choose all that are right.",
        ["obtuse angle", "reflex angle", "acute angle", "straight angle"],
        [0, 1, 3],
        "Obtuse, straight and reflex angles are all bigger than a right angle. Acute angles are smaller.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "How many right angles make a full turn (a revolution)?",
        ["4", "four"],
        "A right angle is a quarter turn, and 4 quarter turns make a full turn.",
      ),
    (n) =>
      trueFalse(
        n,
        "Angle A has longer arms than angle B, so angle A must be the bigger angle.",
        false,
        "The size of an angle is how far apart the arms open, not how long they are. Short arms can make a big angle.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [8, 0],
            [10, 4],
          ],
          cornerLabels: ["A", "B", "C"],
        },
        choice(
          n,
          "Which corner of this triangle has an obtuse angle?",
          ["A", "B", "C"],
          1,
          "At corner B the sides open wider than a right angle, so it is obtuse. The angles at A and C are narrow, so they are acute.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "The minute hand of a clock turns clockwise from 12 to 9. What kind of angle has it turned through?",
        ["acute angle", "right angle", "obtuse angle", "reflex angle"],
        3,
        "From 12 to 9 clockwise is three quarter turns. That is more than a straight angle but less than a full turn, so it is reflex.",
      ),
    (n) =>
      pic(
        { kind: "clock", hour: 4, minute: 0 },
        choice(
          n,
          "Look at the smaller angle between the hands of this clock. What kind of angle is it?",
          ["acute angle", "right angle", "obtuse angle", "straight angle"],
          2,
          "At 3:00 the hands make a right angle and at 6:00 a straight angle. At 4:00 they are in between, so the angle is obtuse.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ella faces the door. She turns a half turn, then a quarter turn. How many right angles has she turned through altogether?",
        ["3", "three"],
        "A half turn is 2 right angles and a quarter turn is 1 right angle: 2 + 1 = 3.",
      ),
  ],
});

/** MA2-GM-01: grid maps, directions and routes. */
export const POSITION = levels(4030501, {
  very_easy: [
    (n) =>
      pic(
        TOWN_MAP,
        choice(
          n,
          "Look at the map. Which square is the park in?",
          ["B3", "C2", "B2", "A3"],
          0,
          "Go along the bottom to find the letter (B), then up the side to find the number (3). The park is in B3.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which direction is opposite to north?",
        ["south", "east", "west"],
        0,
        "North and south are opposite each other on a compass. East and west are opposite each other too.",
      ),
    (n) =>
      trueFalse(
        n,
        "On a compass, east is a quarter turn clockwise from north.",
        true,
        "Going clockwise the compass points are north, east, south, west. East is one quarter turn from north.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        TOWN_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. What is in square D1?",
          ["school", "the school"],
          "Find column D along the bottom and row 1 up the side. The school is in that square.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which direction is halfway between north and east?",
        ["north-east", "south-east", "north-west", "south-west"],
        0,
        "Halfway between north and east is called north-east (NE).",
      ),
    (n) =>
      pic(
        TOWN_MAP,
        choice(
          n,
          "Look at the map. North is at the top. Which place is directly east of the pool?",
          ["park", "school", "shop"],
          1,
          "East is to the right on this map. The school is in the same row as the pool, further to the right.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        TOWN_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. North is at the top. Start at the pool. Go 2 squares east and 1 square north. Where are you?",
          ["library", "the library"],
          "The pool is in A1. 2 squares east takes you to C1, and 1 square north takes you to C2, where the library is.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Start at north and go clockwise. Put these compass directions in order.",
        ["north", "north-east", "east", "south-east", "south"],
        "Clockwise from north you pass north-east, then east, then south-east, then reach south.",
      ),
    (n) =>
      choice(
        n,
        "You are facing west. You make a half turn. Which way are you facing now?",
        ["north", "south", "east", "west"],
        2,
        "A half turn makes you face the opposite way. The opposite of west is east.",
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
            { x: 0, y: 0, label: "Start" },
            { x: 3, y: 3, label: "End" },
          ],
          path: [
            [0, 0],
            [0, 3],
            [3, 3],
          ],
        },
        choice(
          n,
          "The line shows Tom's route. North is at the top. Which description matches his route?",
          [
            "3 squares north, then 3 squares east",
            "3 squares east, then 3 squares north",
            "3 squares south, then 3 squares west",
            "4 squares north, then 4 squares east",
          ],
          0,
          "From A1 the line goes up 3 squares to A4 (north), then right 3 squares to D4 (east).",
        ),
      ),
    (n) =>
      choice(
        n,
        "Sara faces north-east. She makes a half turn. Which way is she facing now?",
        ["south-west", "south-east", "north-west", "south"],
        0,
        "A half turn faces the opposite way. Opposite north is south and opposite east is west, so north-east becomes south-west.",
      ),
    (n) =>
      pic(
        TOWN_MAP,
        multi(
          n,
          "Look at the map. North is at the top. Which places are further north than the library? Choose all that are right.",
          ["park", "shop", "school", "pool"],
          [0, 1],
          "The library is in row 2. The park (row 3) and the shop (row 4) are higher up, so they are further north. The school and pool are in row 1.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        TOWN_MAP,
        typed(
          "short_answer",
          n,
          "Look at the map. North is at the top. Max starts at the school. He walks 3 squares north, then 1 square east. Where is he?",
          ["shop", "the shop"],
          "The school is in D1. 3 squares north takes him to D4, and 1 square east takes him to E4, where the shop is.",
        ),
      ),
    (n) =>
      pic(
        TOWN_MAP,
        choice(
          n,
          "Look at the map. North is at the top. Which route takes Ava from the shop to the pool?",
          [
            "4 squares west, then 3 squares south",
            "3 squares west, then 4 squares south",
            "4 squares east, then 3 squares north",
            "3 squares south, then 3 squares west",
          ],
          0,
          "The shop is in E4 and the pool is in A1. From E to A is 4 squares west, and from row 4 to row 1 is 3 squares south.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Liam faces east. He turns three quarter turns clockwise. Which way is he facing now?",
        ["north", "south", "west", "east"],
        0,
        "Clockwise from east: 1 quarter turn to south, 2 to west, 3 to north.",
      ),
  ],
});

/** MA2-NSM-01: mass in kilograms and grams. */
export const MASS = levels(4060301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "scale", max: 10, value: 4, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "What mass does the scale show, in kilograms?",
          ["4", "4 kg"],
          "The pointer is on the 4, and the scale is in kilograms, so it shows 4 kg.",
        ),
      ),
    (n) => typed("fill_blank", n, "1 kilogram = ___ grams", ["1000"], "There are 1000 grams in 1 kilogram."),
    (n) =>
      trueFalse(
        n,
        "A paperclip has a mass of about 1 gram.",
        true,
        "A paperclip is very light. 1 gram is about the mass of a paperclip.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "scale", max: 1000, value: 700, step: 100, unit: "g" },
        typed(
          "short_answer",
          n,
          "How many grams does the scale show?",
          ["700", "700 g"],
          "The scale counts by 100s, and the pointer is on 700, so it shows 700 g.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is heavier: 1 kg of feathers or 900 g of rocks?",
        ["1 kg of feathers", "900 g of rocks", "They are the same"],
        0,
        "1 kg is 1000 g, which is more than 900 g. It doesn't matter what it's made of, only the mass.",
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the mass of a loaf of bread?",
        ["7 g", "700 g", "7 kg", "70 kg"],
        1,
        "A loaf of bread is lighter than 1 kg but much heavier than a few grams, so about 700 g.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "scale", max: 2, value: 1.5, step: 0.5, unit: "kg" },
        choice(
          n,
          "What mass does the scale show?",
          ["150 g", "1500 g", "15 kg", "1 kg 50 g"],
          1,
          "The pointer is on 1.5 kg, which is 1 kg and half a kilogram. 1000 g + 500 g = 1500 g.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these masses in order from lightest to heaviest.",
        ["350 g", "900 g", "1 kg 200 g", "2 kg"],
        "Change them all to grams: 350 g, 900 g, 1200 g and 2000 g.",
      ),
    (n) => typed("fill_blank", n, "Half a kilogram = ___ grams", ["500"], "1 kilogram is 1000 g, and half of 1000 is 500."),
  ],
  hard: [
    (n) => typed("fill_blank", n, "3 kg 250 g = ___ g", ["3250"], "3 kg is 3000 g. 3000 g + 250 g = 3250 g."),
    (n) =>
      pic(
        { kind: "scale", max: 5, value: 3.5, step: 1, unit: "kg" },
        typed(
          "short_answer",
          n,
          "The scale shows a bag of potatoes. What is its mass in grams?",
          ["3500", "3500 g"],
          "The pointer is halfway between 3 and 4, so it shows 3 and a half kilograms. 3000 g + 500 g = 3500 g.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which of these are equal to 2 kg? Choose all that are right.",
        ["2000 g", "1 kg + 1000 g", "200 g", "1500 g + 500 g"],
        [0, 1, 3],
        "2 kg is 2000 g. 1 kg + 1000 g = 2000 g and 1500 g + 500 g = 2000 g. 200 g is much less.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "4 books that are all the same have a total mass of 2 kg. What is the mass of one book in grams?",
        ["500", "500 g"],
        "2 kg is 2000 g. Share it between 4 books: 2000 ÷ 4 = 500 g.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Nan has a 1 kg bag of flour. She uses 350 g for scones and 275 g for a cake. How many grams are left?",
        ["375", "375 g"],
        "She uses 350 + 275 = 625 g. The bag holds 1000 g, so 1000 − 625 = 375 g are left.",
      ),
    (n) =>
      choice(
        n,
        "Jack's school bag has a mass of 3 kg 400 g. Ruby's has a mass of 2900 g. How much heavier is Jack's bag?",
        ["500 g", "1 kg 500 g", "100 g", "1 kg 100 g"],
        0,
        "Jack's bag is 3400 g. 3400 − 2900 = 500 g heavier.",
      ),
  ],
});

/** MA2-3DS-02: capacity in litres and millilitres, and volume in cubic centimetres. */
export const CAPACITY = levels(4060401, {
  very_easy: [
    (n) =>
      pic(
        { kind: "jug", max: 5, value: 3, step: 1, unit: "L" },
        typed(
          "short_answer",
          n,
          "How many litres of water are in the jug?",
          ["3", "3 L"],
          "The water comes up to the 3 L mark, so there are 3 litres.",
        ),
      ),
    (n) => typed("fill_blank", n, "1 litre = ___ millilitres", ["1000"], "There are 1000 millilitres in 1 litre."),
    (n) =>
      choice(
        n,
        "Which of these holds about 1 litre?",
        ["a carton of milk", "a teaspoon", "a bathtub", "a swimming pool"],
        0,
        "A standard carton of milk holds 1 litre. A teaspoon holds much less, and a bathtub or pool holds much more.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 600, step: 100, unit: "mL" },
        typed(
          "short_answer",
          n,
          "How many millilitres of water are in the jug?",
          ["600", "600 mL"],
          "The jug is marked in 100s, and the water reaches 600 mL.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 2, height: 1 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. What is its volume in cubic centimetres?",
          ["6", "6 cubic centimetres", "6 cm³"],
          "There are 2 rows of 3 cubes: 3 + 3 = 6 cubes, so the volume is 6 cubic centimetres.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A teaspoon holds about 5 millilitres.",
        true,
        "A teaspoon is small. It holds about 5 mL, which is why medicine is often measured in 5 mL doses.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "jug", max: 1000, value: 750, step: 250, unit: "mL" },
        typed(
          "short_answer",
          n,
          "How many more millilitres are needed to fill the jug to 1000 mL?",
          ["250", "250 mL"],
          "The water is at 750 mL. 1000 − 750 = 250 mL more.",
        ),
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 4, width: 2, height: 2 },
        typed(
          "short_answer",
          n,
          "This block is made of 1 cm cubes. What is its volume in cubic centimetres?",
          ["16", "16 cubic centimetres", "16 cm³"],
          "Each layer has 2 rows of 4, which is 8 cubes. There are 2 layers: 8 + 8 = 16 cubic centimetres.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these amounts in order from smallest to largest.",
        ["300 mL", "750 mL", "1 L", "1500 mL"],
        "1 L is 1000 mL, so the order is 300 mL, 750 mL, 1000 mL, 1500 mL.",
      ),
  ],
  hard: [
    (n) => typed("fill_blank", n, "2 L 350 mL = ___ mL", ["2350"], "2 L is 2000 mL. 2000 mL + 350 mL = 2350 mL."),
    (n) =>
      choice(
        n,
        "Which is the best estimate for how much water a kitchen sink holds?",
        ["200 mL", "2 L", "20 L", "2000 L"],
        2,
        "A sink holds many big bottles of water, so 2 L is too small, but 2000 L would fill a small room. About 20 L fits.",
      ),
    (n) =>
      pic(
        { kind: "cubes", length: 3, width: 3, height: 2 },
        multi(
          n,
          "This block is made of 1 cm cubes. Which of these are true? Choose all that are right.",
          ["Each layer has 9 cubes", "There are 2 layers", "Its volume is 18 cubic centimetres", "Its volume is 12 cubic centimetres"],
          [0, 1, 2],
          "Each layer is 3 rows of 3, which is 9 cubes. There are 2 layers, so 9 + 9 = 18 cubic centimetres.",
        ),
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A 2 L bottle of juice is shared equally into 8 cups. How many millilitres go in each cup?",
        ["250", "250 mL"],
        "2 L is 2000 mL. 2000 ÷ 8 = 250 mL in each cup.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Mum fills a 9 L bucket using a 750 mL jug. How many full jugs does she need?",
        ["12", "twelve"],
        "4 jugs is 4 × 750 = 3000 mL, which is 3 L. 9 L is 3 lots of 3 L, so she needs 3 × 4 = 12 jugs.",
      ),
    (n) =>
      choice(
        n,
        "Block A is made of 1 cm cubes: 3 long, 2 wide and 2 high. Block B is 4 long, 3 wide and 1 high. Which has the bigger volume?",
        ["Block A", "Block B", "They have the same volume"],
        2,
        "Block A has 2 layers of 3 × 2 = 6 cubes, so 12. Block B has 1 layer of 4 × 3 = 12 cubes. Both are 12 cubic centimetres.",
      ),
  ],
});

/** MA2-2DS-03: area in square centimetres and square metres. */
export const AREA = levels(4060501, {
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
            [0, 2],
          ],
        },
        typed(
          "short_answer",
          n,
          "Each square is 1 square centimetre. What is the area of the shaded shape in square centimetres?",
          ["5", "5 square centimetres", "5 cm²"],
          "Count the shaded squares: there are 5, so the area is 5 square centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which unit would you use to measure the area of a classroom floor?",
        ["square metres", "square centimetres", "metres", "litres"],
        0,
        "A classroom floor is big, so square metres are best. Metres measure length, not area.",
      ),
    (n) => trueFalse(n, "Area is the amount of surface a shape covers.", true, "Area tells you how much flat space is inside a shape."),
  ],
  easy: [
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
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of the rectangle in square centimetres?",
          ["15", "15 square centimetres", "15 cm²"],
          "There are 3 rows with 5 squares in each: 5 + 5 + 5 = 15 square centimetres.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best estimate for the area of a postage stamp?",
        ["6 square centimetres", "6 square metres", "60 square metres", "600 square centimetres"],
        0,
        "A stamp is tiny, only about 2 cm by 3 cm, so about 6 square centimetres.",
      ),
    (n) =>
      trueFalse(
        n,
        "Two rectangles with different shapes can have the same area.",
        true,
        "A 2 by 6 rectangle and a 3 by 4 rectangle look different, but both cover 12 squares.",
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
            [6, 4],
            [0, 4],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 square centimetre. What is the area of the rectangle?",
          ["10 square centimetres", "20 square centimetres", "24 square centimetres", "28 square centimetres"],
          2,
          "There are 4 rows of 6 squares. 4 × 6 = 24 square centimetres. (20 is the distance around the edge, which is the perimeter.)",
        ),
      ),
    (n) =>
      multi(
        n,
        "Which rectangles have an area of 12 square centimetres? Choose all that are right.",
        ["3 cm by 4 cm", "2 cm by 6 cm", "6 cm by 6 cm", "1 cm by 12 cm", "4 cm by 8 cm"],
        [0, 1, 3],
        "3 × 4 = 12, 2 × 6 = 12 and 1 × 12 = 12. But 6 × 6 = 36 and 4 × 8 = 32.",
      ),
    (n) =>
      ordering(
        n,
        "Put these areas in order from smallest to largest.",
        ["30 square centimetres", "500 square centimetres", "1 square metre", "12 square metres"],
        "A square metre is much bigger than 500 square centimetres (it would take 10 000 square centimetres to cover it).",
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
            [0, 4],
          ],
          grid: true,
        },
        choice(
          n,
          "Each small square is 1 square centimetre. What is the area of the triangle?",
          ["6 square centimetres", "8 square centimetres", "10 square centimetres", "16 square centimetres"],
          1,
          "The triangle is half of a 4 by 4 square. The square has 16 small squares, and half of 16 is 8.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [0, 0],
            [6, 0],
            [6, 2],
            [2, 2],
            [2, 5],
            [0, 5],
          ],
          grid: true,
        },
        typed(
          "short_answer",
          n,
          "Each small square is 1 square centimetre. What is the area of the shaded shape in square centimetres?",
          ["18", "18 square centimetres", "18 cm²"],
          "Split it into two rectangles. The bottom part is 2 rows of 6, which is 12. The part going up is 3 rows of 2, which is 6. 12 + 6 = 18.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A garden path is 4 m long and 2 m wide. How many square paving stones, each 1 m by 1 m, does it take to cover it?",
        ["8", "eight"],
        "Each paving stone covers 1 square metre. There are 2 rows of 4 stones: 2 × 4 = 8.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A rectangle has an area of 24 square centimetres. One side is 3 cm long. How long is the other side in centimetres?",
        ["8", "8 cm"],
        "3 rows of something make 24 squares. 3 × 8 = 24, so the other side is 8 cm.",
      ),
    (n) =>
      choice(
        n,
        "Rectangle A is 5 cm by 4 cm. Rectangle B is 6 cm by 3 cm. Which is true?",
        ["A's area is 2 square centimetres bigger", "B's area is 2 square centimetres bigger", "They have the same area", "A's area is 1 square centimetre bigger"],
        0,
        "A is 5 × 4 = 20 and B is 6 × 3 = 18 square centimetres. 20 − 18 = 2. (They have the same perimeter, 18 cm, but not the same area.)",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ari covers a floor 3 m long and 2 m wide with mats. Each mat is 1 square metre and costs $15. How much do the mats cost in dollars?",
        ["90", "$90", "90 dollars"],
        "The floor is 3 × 2 = 6 square metres, so Ari needs 6 mats. 6 × $15 = $90.",
      ),
  ],
});

/** MA2-DATA-01: collecting data and constructing graphs using a given scale. */
export const DATA_COLLECT = levels(4070201, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Mel kept a tally. She drew 2 bundles of five and 3 more marks. What number does her tally show?",
        ["13", "thirteen"],
        "Each bundle is 5, so 2 bundles is 10. 10 + 3 = 13.",
      ),
    (n) =>
      trueFalse(
        n,
        "In a picture graph, the key tells you what each picture stands for.",
        true,
        "The key shows how many things one picture means, such as 1 star = 2 children.",
      ),
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Favourite sport",
          thing: "children",
          each: 2,
          rows: [
            { label: "Netball", count: 4 },
            { label: "Cricket", count: 3 },
            { label: "Soccer", count: 5 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many children chose netball?",
          ["8", "eight"],
          "Netball has 4 stars, and each star stands for 2 children. 4 × 2 = 8.",
        ),
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "How we get to school",
          columns: [
            { label: "car", value: 15 },
            { label: "walk", value: 25 },
            { label: "bus", value: 10 },
            { label: "bike", value: 20 },
          ],
          step: 5,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. The scale counts by 5s. How many children walk to school?",
          ["25", "twenty-five"],
          "The walk column reaches the line marked 25.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Which is the best survey question to find out how students travel to school?",
        ["How do you usually get to school?", "Do you like school?", "What time is it?", "Is the bus yellow?"],
        0,
        "The question should ask about exactly what you want to know: how each student gets to school.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Colour", "Votes"],
          rows: [
            ["red", 12],
            ["blue", 8],
            ["green", 6],
          ],
        },
        typed(
          "short_answer",
          n,
          "Kai is drawing a picture graph of these votes. Each picture stands for 2 votes. How many pictures should he draw for red?",
          ["6", "six"],
          "Red got 12 votes. Each picture is 2 votes, so 12 ÷ 2 = 6 pictures.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Kangaroos seen on a bush walk",
          thing: "kangaroos",
          each: 5,
          rows: [
            { label: "Mon", count: 3 },
            { label: "Tue", count: 6 },
            { label: "Wed", count: 2 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many kangaroos were seen altogether?",
          ["55", "fifty-five"],
          "There are 3 + 6 + 2 = 11 stars. Each star is 5 kangaroos, so 11 × 5 = 55.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ella's survey results are 14, 22, 18 and 30. Which scale is best for the side of her column graph?",
        ["0, 1, 2, … up to 10", "0, 5, 10, … up to 30", "0, 100, 200, … up to 1000", "0, 50, 100, … up to 500"],
        1,
        "The biggest result is 30, so the scale must reach 30. Counting by 5s to 30 fits well. Up to 10 is too short, and counting by 50s or 100s makes the columns tiny.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps of a survey in order.",
        ["Decide on a question", "Ask people and tally their answers", "Count the tally marks", "Draw a graph of the results"],
        "First choose the question, then collect the answers with a tally, count them up, and finally show them in a graph.",
      ),
  ],
  hard: [
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Cans collected",
          columns: [
            { label: "4R", value: 40 },
            { label: "4K", value: 70 },
            { label: "4M", value: 55 },
          ],
          step: 10,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. How many cans did class 4M collect?",
          ["55", "fifty-five"],
          "The scale counts by 10s. The 4M column stops halfway between 50 and 60, which is 55.",
        ),
      ),
    (n) =>
      multi(
        n,
        "Sam is drawing a column graph of goals scored. Which of these does a good graph need? Choose all that are right.",
        ["a title", "labels on both axes", "a scale with equal steps", "columns of different widths"],
        [0, 1, 2],
        "A graph needs a title, labelled axes and a scale with equal steps. The columns should all be the same width so they are fair to compare.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a picture graph, each picture stands for 4 children. How many pictures show 18 children?",
        ["4.5", "4 and a half", "four and a half", "4½"],
        "4 pictures show 16 children. 2 more children is half of 4, so draw half a picture: 4 and a half pictures.",
      ),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "picture_graph",
          title: "Pets owned by Year 4",
          thing: "pets",
          each: 4,
          rows: [
            { label: "Dogs", count: 6 },
            { label: "Cats", count: 4 },
            { label: "Fish", count: 3 },
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the key. How many more dogs are there than cats and fish together?",
          ["0", "zero", "none"],
          "Dogs: 6 × 4 = 24. Cats and fish: (4 + 3) × 4 = 28. That is more than 24, so wait: the question asks how many MORE dogs. Cats and fish have more, so there are 0 more dogs.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Ben's column graph counts by 2s. The cricket column stops halfway between the 12 line and the 14 line. How many children chose cricket?",
        ["13", "thirteen"],
        "Halfway between 12 and 14 is 13.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Favourite sport",
          columns: [
            { label: "soccer", value: 18 },
            { label: "netball", value: 12 },
            { label: "cricket", value: 9 },
          ],
          step: 3,
        },
        typed(
          "short_answer",
          n,
          "Jack asked 45 students. His graph shows three sports, but he forgot to draw swimming. How many students chose swimming?",
          ["6", "six"],
          "The graph shows 18 + 12 + 9 = 39 students. 45 − 39 = 6 chose swimming.",
        ),
      ),
  ],
});

/** MA2-CHAN-01: recording and comparing the results of chance experiments. */
export const CHANCE = levels(4070301, {
  very_easy: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["blue", "blue", "blue", "orange"] },
        trueFalse(
          n,
          "On this spinner, orange is less likely than blue.",
          true,
          "Only 1 of the 4 parts is orange and 3 are blue, so blue is more likely.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Pick a day of the week. How likely is it that its name ends in 'day'?",
        ["certain", "likely", "unlikely", "impossible"],
        0,
        "Monday, Tuesday … Sunday all end in 'day', so it is certain.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Zara spun a spinner 12 times. It landed on green 5 times and on purple the rest. How many times did it land on purple?",
        ["7", "seven"],
        "Every spin was green or purple, so 12 − 5 = 7 purple.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        SPIN_TABLE,
        choice(
          n,
          "The table shows the results of spinning a spinner. Which colour came up most often?",
          ["red", "blue", "green"],
          0,
          "Red came up 9 times, more than blue (3) or green (4).",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Something that is unlikely can still happen.",
        true,
        "Unlikely means it probably won't happen, but it is not impossible.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 2 },
            { colour: "blue", count: 2 },
            { colour: "green", count: 2 },
          ],
        },
        choice(
          n,
          "You pick one counter from this bag without looking. Which colour are you most likely to get?",
          ["red", "blue", "green", "they are all equally likely"],
          3,
          "There are 2 of each colour, so each colour has the same chance.",
        ),
      ),
  ],
  medium: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "green", "yellow"] },
        choice(
          n,
          "You spin this spinner 40 times. About how many times would you expect it to land on red?",
          ["4", "10", "20", "40"],
          1,
          "Red is 1 of 4 equal parts, so about a quarter of the spins. A quarter of 40 is 10.",
        ),
      ),
    (n) =>
      pic(
        SPIN_TABLE,
        typed(
          "short_answer",
          n,
          "The table shows the results of spinning a spinner. How many spins were there altogether?",
          ["16", "sixteen"],
          "Add the results: 9 + 3 + 4 = 16 spins.",
        ),
      ),
    (n) =>
      pic(
        { kind: "spinner", sections: ["orange", "purple", "orange", "orange", "green", "orange", "purple", "orange"] },
        ordering(
          n,
          "Put the colours on this spinner in order from least likely to most likely.",
          ["green", "purple", "orange"],
          "Count the parts: green 1, purple 2, orange 5. More parts means more likely.",
        ),
      ),
  ],
  hard: [
    (n) =>
      pic(
        { kind: "spinner", sections: ["red", "blue", "red", "red", "blue", "red"] },
        choice(
          n,
          "Tim wins if this spinner lands on red. Ali wins if it lands on blue. Is the game fair?",
          ["Yes, they have the same chance", "No, Tim is more likely to win", "No, Ali is more likely to win"],
          1,
          "4 of the 6 parts are red and only 2 are blue, so Tim is more likely to win. The game is not fair.",
        ),
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Dice rolled 30 times",
          columns: [
            { label: "1", value: 4 },
            { label: "2", value: 6 },
            { label: "3", value: 5 },
            { label: "4", value: 3 },
            { label: "5", value: 7 },
            { label: "6", value: 5 },
          ],
          step: 1,
        },
        multi(
          n,
          "Look at the results. Which of these are true? Choose all that are right.",
          ["5 was rolled most often", "4 was rolled least often", "1 was rolled most often", "Odd numbers came up 16 times"],
          [0, 1, 3],
          "5 has the tallest column (7) and 4 the shortest (3). Odd numbers: 1, 3 and 5 came up 4 + 5 + 7 = 16 times.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A bag has 3 red counters and 1 blue counter. Kim picks one, records its colour and puts it back. She does this 20 times. About how many times would you expect blue?",
        ["5", "five"],
        "Blue is 1 of the 4 counters, so expect blue about a quarter of the time. A quarter of 20 is 5.",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Ava flipped a coin 10 times and got 7 heads. Ben flipped a coin 100 times and got 52 heads. Whose results are closer to what you would expect?",
        ["Ava's", "Ben's", "They are equally close"],
        1,
        "You expect about half to be heads. 52 out of 100 is very close to half (50). 7 out of 10 is further from half (5). More flips usually give results closer to what you expect.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Colour", "Times picked"],
          rows: [
            ["red", 14],
            ["yellow", 5],
            ["blue", 1],
          ],
        },
        choice(
          n,
          "A bag holds 10 counters. Leo picked a counter and put it back, 20 times. The table shows his results. What is most likely in the bag?",
          ["7 red, 2 yellow, 1 blue", "1 red, 2 yellow, 7 blue", "5 red, 5 yellow, 0 blue", "3 red, 3 yellow, 4 blue"],
          0,
          "Red came up most, so most counters are probably red. Blue came up once, so there must be at least 1 blue. Only 7 red, 2 yellow, 1 blue fits.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Lily rolled a normal dice 6 times and never got a 4. This shows the dice can't land on 4.",
        false,
        "Each roll is a new chance. With only 6 rolls, it is quite possible to miss a number. A 4 is still possible on the next roll.",
      ),
  ],
});
