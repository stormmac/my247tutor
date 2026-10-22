/**
 * A short story for each unit of sounds, read at the end of a weekly Learn to Read lesson. Each
 * one uses only the sounds taught by then and the sight words at that reading age, so the child
 * can read every word. Five questions check they understood it, and a picture of the story is
 * there to colour in.
 */
import {
  bike,
  boat,
  box,
  bun,
  bus,
  cake,
  cap,
  car,
  cat,
  chair,
  chips,
  cloud,
  coin,
  cow,
  crown,
  dish,
  dog,
  duck,
  fish,
  fox,
  gate,
  goat,
  ground,
  hat,
  hen,
  hill,
  house,
  lightning,
  mat,
  owl,
  person,
  pond,
  pup,
  rain,
  sheep,
  sitter,
  sky,
  snake,
  star,
  sun,
  tap,
  tree,
  van,
  bee,
  type Region,
} from "./pictures";

export interface StoryQuestion {
  question: string;
  /** The right answer first; they're shuffled on screen. */
  options: [string, string, string];
}

export interface Story {
  /** The unit of sounds it goes with. */
  unitId: string;
  title: string;
  /** The story, a sentence at a time. */
  sentences: string[];
  questions: StoryQuestion[];
  picture: Region[];
}

export const STORIES: Story[] = [
  {
    unitId: "satp",
    title: "Pat and the Tap",
    sentences: ["Pat sat.", "Tap, tap, tap!", "It is the tap.", "Pat pats the tap.", "Pat sat and sat."],
    questions: [
      { question: "Who sat?", options: ["Pat", "Sam", "Tom"] },
      { question: "What went tap, tap, tap?", options: ["The tap", "A cat", "A dog"] },
      { question: "What did Pat pat?", options: ["The tap", "A hat", "A dog"] },
      { question: "What sound did the tap make?", options: ["Tap, tap, tap", "Moo, moo", "Quack, quack"] },
      { question: "What did Pat do at the end?", options: ["Sat and sat", "Ran home", "Sang a song"] },
    ],
    picture: [...sky(), ...sun(270, 40), ...ground(), ...tap(150, 90), ...sitter("pat", 90, 190)],
  },
  {
    unitId: "inmd",
    title: "Sam and Dad",
    sentences: ["Sam is sad.", "Dad sits in the sand.", "Dad pats Sam.", "Sam and Dad sit in the sand.", "Sam and Dad nap."],
    questions: [
      { question: "Who was sad?", options: ["Sam", "Dad", "Pat"] },
      { question: "Where did Dad sit?", options: ["In the sand", "On a bus", "In a tree"] },
      { question: "What did Dad do to make Sam feel better?", options: ["He patted Sam", "He hid from Sam", "He ran away"] },
      { question: "How did Sam feel at the start?", options: ["Sad", "Happy", "Silly"] },
      { question: "What did Sam and Dad do at the end?", options: ["Had a nap", "Went to school", "Ate a cake"] },
    ],
    picture: [
      ...sky(),
      ...sun(40, 40),
      rect("sea", 0, 150, 320, 25),
      ...ground(170, "sand"),
      ...sitter("dad", 110, 195),
      ...sitter("sam", 190, 195),
    ],
  },
  {
    unitId: "gock",
    title: "The Cat and the Dog",
    sentences: [
      "A cat sat on a mat.",
      "A dog got the cap.",
      "The cat is mad.",
      "The dog digs and digs.",
      "The cat and the dog nap on the mat.",
    ],
    questions: [
      { question: "What sat on the mat?", options: ["A cat", "A pig", "A hen"] },
      { question: "What did the dog get?", options: ["The cap", "A pot", "A pan"] },
      { question: "How did the cat feel?", options: ["Mad", "Sleepy", "Hungry"] },
      { question: "What did the dog do?", options: ["Dug and dug", "Sang a song", "Went for a swim"] },
      { question: "Where did they nap?", options: ["On the mat", "In a pot", "On a bus"] },
    ],
    picture: [
      ...sky(),
      ...ground(),
      ...house(230, 186),
      ...mat(40, 188),
      ...cat("cat", 70, 182),
      ...dog("dog", 160, 186),
      ...cap(200, 140),
    ],
  },
  {
    unitId: "ckeur",
    title: "Get Up, Duck!",
    sentences: [
      "A duck is in the mud.",
      "The sun is up.",
      "Ken runs to the duck.",
      '"Get up, duck!" said Ken.',
      "The duck gets up and runs to the pond.",
    ],
    questions: [
      { question: "Where was the duck?", options: ["In the mud", "On a rock", "In a cup"] },
      { question: "What was up in the sky?", options: ["The sun", "The moon", "A kite"] },
      { question: "Who ran to the duck?", options: ["Ken", "Meg", "Sam"] },
      { question: "What did Ken say?", options: ["Get up, duck!", "Go to bed!", "Quack, quack!"] },
      { question: "Where did the duck go?", options: ["To the pond", "To the shop", "Up a tree"] },
    ],
    picture: [
      ...sky(),
      ...sun(50, 40),
      ...ground(),
      ...pond(250, 196),
      ellipse("mud", 110, 196, 46, 10),
      ...duck("duck", 100, 196),
      ...person("ken", 190, 196),
    ],
  },
  {
    unitId: "hbfl",
    title: "The Hen on the Bus",
    sentences: [
      "A big hen has a red hat.",
      "The hen gets on a bus.",
      "On the bus, the hen sits on a bed.",
      "A pup hugs the hen.",
      "The hen has lots of fun.",
    ],
    questions: [
      { question: "What was the hen wearing?", options: ["A red hat", "A blue coat", "Big boots"] },
      { question: "What did the hen get on?", options: ["A bus", "A boat", "A bike"] },
      { question: "Where did the hen sit?", options: ["On a bed", "On a log", "On a rock"] },
      { question: "Who hugged the hen?", options: ["A pup", "A cat", "A fox"] },
      { question: "Did the hen have fun?", options: ["Yes, lots of fun", "No, it was sad", "It fell asleep"] },
    ],
    picture: [
      ...sky(),
      ...cloud("cloud", 30, 50),
      ...ground(),
      ...bus(20, 196),
      ...hen("hen", 210, 196),
      ...hat("hat", 228, 142),
      ...pup("pup", 270, 196),
    ],
  },
  {
    unitId: "ffllssjvw",
    title: "Jess and the Red Van",
    sentences: [
      "Jess has a red van.",
      "The van went up a big hill.",
      "Jess had a jam bun in the van.",
      "The jam fell off the bun!",
      "What a mess! Jess will lick it up.",
    ],
    questions: [
      { question: "What colour was the van?", options: ["Red", "Blue", "Green"] },
      { question: "Where did the van go?", options: ["Up a big hill", "Into the sea", "To the zoo"] },
      { question: "What did Jess have to eat?", options: ["A jam bun", "An apple", "A pie"] },
      { question: "What fell off the bun?", options: ["The jam", "A hat", "A bell"] },
      { question: "What was it when the jam fell?", options: ["A mess", "A present", "A game"] },
    ],
    picture: [
      ...sky(),
      ...sun(280, 36),
      ...hill("hill", -20, 190, 260, 60),
      ...ground(186),
      ...van(70, 150),
      ...person("jess", 250, 200),
      ...bun(288, 172),
    ],
  },
  {
    unitId: "xyzqu",
    title: "The Fox in the Box",
    sentences: [
      "Max has a big box.",
      "What is in the box?",
      "A fox! The fox jumps out.",
      "A bug went buzz.",
      'The fox ran up the hill. "Come back, fox!" yells Max.',
    ],
    questions: [
      { question: "What did Max have?", options: ["A big box", "A red bike", "A little cup"] },
      { question: "What was in the box?", options: ["A fox", "A yak", "A duck"] },
      { question: "What went buzz?", options: ["A bug", "A cat", "The bus"] },
      { question: "Where did the fox run?", options: ["Up the hill", "Into the pond", "Up a tree"] },
      { question: "What did Max yell?", options: ["Come back, fox!", "Good night!", "Hello, bug!"] },
    ],
    picture: [
      ...sky(),
      ...hill("hill", 160, 190, 200, 50),
      ...ground(),
      ...box(40, 196),
      ...person("max", 140, 196),
      ...fox("fox", 220, 170),
      ...bee("bug", 270, 50),
    ],
  },
  {
    unitId: "chshthng",
    title: "The King and the Fish",
    sentences: [
      "The king has a fish in a dish.",
      "The fish can sing!",
      "The king sings with the fish.",
      "Then the king gets chips from the shop.",
      "The fish gets a chip as well.",
    ],
    questions: [
      { question: "Who had a fish?", options: ["The king", "A chick", "A sailor"] },
      { question: "What could the fish do?", options: ["Sing", "Fly", "Run"] },
      { question: "Where was the fish?", options: ["In a dish", "In a shell", "In the bath"] },
      { question: "Where did the king get chips?", options: ["From the shop", "From a ship", "From a tree"] },
      { question: "What did the fish get?", options: ["A chip", "A ring", "A shell"] },
    ],
    picture: [
      ...sky(),
      ...ground(),
      ...person("king", 90, 196, 1.1),
      ...crown(90, 112),
      ...dish(200, 196),
      ...fish("fish", 200, 176),
      ...chips(260, 196),
    ],
  },
  {
    unitId: "aieeighoa",
    title: "The Goat in the Rain",
    sentences: [
      "A goat sat in the rain.",
      "The goat had wet feet.",
      'A sheep said, "Get in my boat!"',
      "The goat and the sheep sail off in the boat.",
      "At night the rain stops, and they sleep in the boat.",
    ],
    questions: [
      { question: "Where did the goat sit?", options: ["In the rain", "In the sun", "In a car"] },
      { question: "What was wet?", options: ["The goat's feet", "The sheep's hat", "A book"] },
      { question: "Who had a boat?", options: ["The sheep", "The goat", "A snail"] },
      { question: "What happened at night?", options: ["The rain stopped", "It snowed", "The boat sank"] },
      { question: "Where did they sleep?", options: ["In the boat", "In a tree", "On a road"] },
    ],
    picture: [
      ...sky(),
      ...cloud("cloud", 40, 50),
      ...cloud("cloud-2", 200, 40),
      ...rain(60, 70, 8),
      rect("sea", 0, 175, 320, 45),
      ...boat(10, 182),
      ...sheep("sheep", 105, 164),
      ...goat("goat", 180, 164),
    ],
  },
  {
    unitId: "ooaror",
    title: "The Car in the Park",
    sentences: [
      "Mark has a red car.",
      "He parks the car in the park.",
      "Mark looks at a book.",
      "Then a storm starts! Mark runs to his car.",
      "When the storm stops, Mark can see a star.",
    ],
    questions: [
      { question: "What did Mark have?", options: ["A red car", "A blue bike", "A big boat"] },
      { question: "Where did he park the car?", options: ["In the park", "At the farm", "At the zoo"] },
      { question: "What did Mark look at?", options: ["A book", "A map", "A fish"] },
      { question: "What started?", options: ["A storm", "A race", "A game"] },
      { question: "What did he see at the end?", options: ["A star", "A cow", "The sun"] },
    ],
    picture: [
      ...sky(),
      ...star("star", 270, 30),
      ...cloud("cloud", 60, 56),
      ...lightning(100, 60),
      ...ground(),
      ...tree("tree", 260, 190),
      ...car(40, 196),
      ...person("mark", 180, 196),
    ],
  },
  {
    unitId: "urowoiearairer",
    title: "The Owl in Town",
    sentences: [
      "I can hear an owl in the town.",
      "The owl sits on a chair near a farm.",
      "A cow looks up at the owl.",
      '"Hoot!" said the owl. The owl turns to the cow.',
      "The cow has a coin. The cow gives the coin to the owl.",
    ],
    questions: [
      { question: "What could you hear in the town?", options: ["An owl", "A car", "A bell"] },
      { question: "Where did the owl sit?", options: ["On a chair", "On a ladder", "On a boat"] },
      { question: "Who looked up at the owl?", options: ["A cow", "A goat", "A hen"] },
      { question: "What did the owl say?", options: ["Hoot!", "Moo!", "Quack!"] },
      { question: "What did the cow give the owl?", options: ["A coin", "A letter", "A hammer"] },
    ],
    picture: [
      ...sky(),
      ...ground(),
      ...house(230, 186),
      ...chair(40, 196),
      ...owl("owl", 64, 160),
      ...cow("cow", 160, 196),
      ...coin(212, 160),
    ],
  },
  {
    unitId: "splitvowels",
    title: "Mike's Bike Ride",
    sentences: [
      "Mike likes to ride his bike.",
      "He rides to the gate.",
      "A snake is at the gate!",
      "Mike rides home fast. His mother has made a cake.",
      "Mike has five bites of cake.",
    ],
    questions: [
      { question: "What does Mike like to do?", options: ["Ride his bike", "Fly a kite", "Swim"] },
      { question: "Where did Mike ride to?", options: ["The gate", "The shop", "The beach"] },
      { question: "What was at the gate?", options: ["A snake", "A dog", "A kite"] },
      { question: "Who made a cake?", options: ["His mother", "His father", "Mike"] },
      { question: "How many bites of cake did Mike have?", options: ["Five", "Two", "Ten"] },
    ],
    picture: [
      ...sky(),
      ...sun(40, 36),
      ...ground(),
      ...gate(220, 186),
      ...snake(196, 210),
      ...bike(40, 192),
      ...person("mike", 130, 190),
      ...cake(240, 120),
    ],
  },
];

export function storyFor(unitId: string): Story | undefined {
  return STORIES.find((s) => s.unitId === unitId);
}

function rect(id: string, x: number, y: number, width: number, height: number): Region {
  return { id, shape: { el: "rect", x, y, width, height } };
}

function ellipse(id: string, cx: number, cy: number, rx: number, ry: number): Region {
  return { id, shape: { el: "ellipse", cx, cy, rx, ry } };
}
