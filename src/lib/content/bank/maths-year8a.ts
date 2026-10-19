/**
 * Year 8 Mathematics: Stage 4 (NSW Mathematics K–10, 2022). Two sets of 15 questions for each
 * Stage 4 standard (NESA outcome), three at each level from very easy to very hard. Year 8 works
 * at the later Stage 4 level, harder than Year 7 on the same focus area.
 */
import { choice, levels, multi, ordering, pic, trueFalse, typed } from "../spec";

/** MA4-FIN-C-01: percentage increase and decrease, discounts, GST, profit and loss, finding the original price. */
export const FINANCE = levels(8010101, {
  very_easy: [
    (n) =>
      choice(
        n,
        "A $80 jacket goes up in price by 10%. What is the new price?",
        ["$88", "$90", "$8", "$72"],
        0,
        "10% of $80 is $8 (divide by 10). The price goes up, so add it on: $80 + $8 = $88.",
      ),
    (n) =>
      trueFalse(
        n,
        "To find the 10% GST on a price, you can divide the price by 10.",
        true,
        "10% means 10 out of 100, which is one tenth. Dividing by 10 gives one tenth of the price.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Item", "Price"],
          rows: [
            ["Cost price", "$40"],
            ["Selling price", "$55"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. How much profit is made?",
          ["$15", "15", "15.00", "$15.00"],
          "Profit = selling price − cost price = $55 − $40 = $15.",
        ),
      ),
  ],
  easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "A $60 pair of runners is 25% off. The sale price is $___.",
        ["45", "45.00"],
        "25% is one quarter. A quarter of $60 is $15. Take it off: $60 − $15 = $45.",
      ),
    (n) =>
      multi(
        n,
        "Which of these increase an amount by 20%? Choose all that are right.",
        ["Multiply it by 1.2", "Find 0.2 of it and add that on", "Multiply it by 0.8", "Add 20 to it"],
        [0, 1],
        "Increasing by 20% gives 100% + 20% = 120% of the amount, which is × 1.2. Finding 20% and adding it on does the same thing. × 0.8 is a 20% decrease, and adding 20 is not a percentage at all.",
      ),
    (n) =>
      choice(
        n,
        "The school canteen buys pies for $3.50 each and sells them for $3.00 each. What happens on each pie?",
        ["A loss of 50c", "A profit of 50c", "A loss of $3.00", "A profit of $6.50"],
        0,
        "The canteen sells for less than it paid, so it is a loss. $3.50 − $3.00 = 50c.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A cricket bat costs $150 before GST. What is its price including 10% GST?",
        ["$165", "165", "165.00", "$165.00"],
        "GST is 10% of $150, which is $15. Add it on: $150 + $15 = $165.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Price of a bike ($)",
          columns: [
            { label: "Before sale", value: 500 },
            { label: "During sale", value: 400 },
          ],
          step: 100,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. By what percentage was the price of the bike decreased?",
          ["20%", "20"],
          "The price fell by $500 − $400 = $100. As a percentage of the original price: 100 ÷ 500 × 100% = 20%.",
        ),
      ),
    (n) =>
      ordering(
        n,
        "Put these steps in order to find the sale price of a $90 item with 30% off.",
        ["Find 10% of $90, which is $9", "Find 30%: 3 × $9 = $27", "Subtract: $90 − $27 = $63"],
        "First find 10%, then build up to 30%, then take the discount away from the original price.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A phone costs $440 including GST. What was its price before GST was added?",
        ["$400", "400", "400.00", "$400.00"],
        "The price with GST is 110% of the price before GST, so divide by 1.1: $440 ÷ 1.1 = $400. Check: 10% of $400 is $40, and $400 + $40 = $440.",
      ),
    (n) =>
      choice(
        n,
        "Mia bought a surfboard for $250 and sold it for $300. What was her percentage profit?",
        ["20%", "50%", "16.7%", "25%"],
        0,
        "Profit = $300 − $250 = $50. Percentage profit is compared with what she paid: 50 ÷ 250 × 100% = 20%.",
      ),
    (n) =>
      trueFalse(
        n,
        "Increasing a price by 10% and then decreasing the new price by 10% brings it back to the original price.",
        false,
        "Try $100. Up 10% gives $110. Down 10% of $110 is $11 off, giving $99, not $100. The second 10% is taken from a bigger amount.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "After a 20% discount, a tent costs $96. What was the original price?",
        ["$120", "120", "120.00", "$120.00"],
        "After 20% off you pay 80% of the original price. So 80% is $96, 1% is $1.20 and 100% is $120. Or: $96 ÷ 0.8 = $120.",
      ),
    (n) =>
      multi(
        n,
        "A shop buys a lamp for $50, marks the price up by 40%, then later sells it at 25% off the marked price. Which statements are true? Choose all that are right.",
        ["The marked price is $70", "The sale price is $52.50", "The shop makes a loss", "The profit is 5% of what the shop paid"],
        [0, 1, 3],
        "40% of $50 is $20, so the marked price is $70. 25% of $70 is $17.50, so the sale price is $52.50. That is $2.50 more than $50, a profit, and 2.50 ÷ 50 × 100% = 5%.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Month", "Members"],
          rows: [
            ["January", 250],
            ["June", 300],
            ["December", 240],
          ],
        },
        typed(
          "short_answer",
          n,
          "The table shows how many members a netball club had. By what percentage did membership fall from June to December?",
          ["20%", "20"],
          "From June to December it fell by 300 − 240 = 60 members. Compare with June: 60 ÷ 300 × 100% = 20%.",
        ),
      ),
  ],
});

/** MA4-FIN-C-01: percentage increase and decrease, discounts, GST, profit and loss, finding the original price. */
export const FINANCE_2 = levels(8010116, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A cap costs $30 before GST. How much is the 10% GST?",
        ["$3", "3", "3.00", "$3.00"],
        "10% is one tenth. One tenth of $30 is $30 ÷ 10 = $3.",
      ),
    (n) =>
      choice(
        n,
        "A $40 shirt is 50% off. What is the sale price?",
        ["$20", "$35", "$10", "$4"],
        0,
        "50% is half. Half of $40 is $20 off, so you pay $40 − $20 = $20.",
      ),
    (n) =>
      trueFalse(
        n,
        "If you sell something for less than you paid for it, you make a loss.",
        true,
        "A loss means you got back less money than you spent. A profit means you got back more.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Skateboard", "Amount"],
          rows: [
            ["Original price", "$120"],
            ["Discount", "15%"],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the table. What is the sale price of the skateboard?",
          ["$102", "102", "102.00", "$102.00"],
          "10% of $120 is $12 and 5% is $6, so 15% is $18. The sale price is $120 − $18 = $102.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Increasing $70 by 30% gives $___.",
        ["91", "91.00"],
        "10% of $70 is $7, so 30% is $21. Add it on: $70 + $21 = $91. Or: $70 × 1.3 = $91.",
      ),
    (n) =>
      ordering(
        n,
        "Put these deals in order of final price, from cheapest to dearest.",
        ["$100 with 30% off", "$80 with 10% off", "$75 with no discount", "$90 with 5% off"],
        "Work out each final price: $100 − $30 = $70, $80 − $8 = $72, $75, and $90 − $4.50 = $85.50.",
      ),
  ],
  medium: [
    (n) =>
      choice(
        n,
        "A school sausage sizzle spent $180 on supplies and took in $261. What was the percentage profit?",
        ["45%", "31%", "81%", "55%"],
        0,
        "Profit = $261 − $180 = $81. Compare it with the cost: 81 ÷ 180 × 100% = 45%.",
      ),
    (n) =>
      multi(
        n,
        "A beach umbrella costs $70 before GST. Which of these give its price including 10% GST? Choose all that are right.",
        ["$70 × 1.1", "$70 + $7", "$70 × 0.1", "$70 ÷ 1.1"],
        [0, 1],
        "The GST is 10% of $70, which is $7, so the price is $70 + $7 = $77. Multiplying by 1.1 (110%) gives the same answer. $70 × 0.1 is only the GST, and dividing by 1.1 takes GST off.",
      ),
    (n) =>
      pic(
        { kind: "number_line", from: 0, to: 200, jumps: 10, dotAt: 7 },
        typed(
          "short_answer",
          n,
          "A $200 scooter is on sale. The dot on the number line shows its sale price. What percentage discount is this?",
          ["30%", "30"],
          "Each jump is 200 ÷ 10 = 20, so the dot is at 7 × 20 = 140. The discount is $200 − $140 = $60, and 60 ÷ 200 × 100% = 30%.",
        ),
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A car bought for $24 000 is sold two years later for $18 000. What is the percentage loss?",
        ["25%", "25"],
        "The loss is $24 000 − $18 000 = $6000. Compare it with the buying price: 6000 ÷ 24 000 × 100% = 25%.",
      ),
    (n) =>
      trueFalse(
        n,
        "A 25% discount followed by another 20% discount is the same as a 45% discount.",
        false,
        "Try $100. 25% off gives $75. 20% off $75 is $15 off, giving $60. That is 40% off in total, not 45%.",
      ),
    (n) =>
      choice(
        n,
        "The price of a concert ticket rose from $80 to $92. What was the percentage increase?",
        ["15%", "12%", "13%", "87%"],
        0,
        "The increase is $92 − $80 = $12. Compare it with the old price: 12 ÷ 80 × 100% = 15%.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A bookshop sells a novel for $33 including GST and pays the 10% GST to the government. The shop paid $20 for the book. How much profit does it make?",
        ["$10", "10", "10.00", "$10.00"],
        "The price before GST is $33 ÷ 1.1 = $30 (the other $3 is GST). Profit = $30 − $20 = $10.",
      ),
    (n) =>
      pic(
        {
          kind: "column_graph",
          title: "Koalas counted in a reserve",
          columns: [
            { label: "2024", value: 80 },
            { label: "2026", value: 100 },
          ],
          step: 20,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. What was the percentage increase in koalas from 2024 to 2026?",
          ["25%", "25"],
          "The number went up by 100 − 80 = 20. Compare with the starting number: 20 ÷ 80 × 100% = 25%.",
        ),
      ),
    (n) =>
      choice(
        n,
        "After a 15% pay rise, Jack earns $920 a week. What did he earn before the rise?",
        ["$800", "$782", "$1058", "$905"],
        0,
        "After the rise he earns 115% of his old pay. So $920 ÷ 1.15 = $800. Check: 15% of $800 is $120, and $800 + $120 = $920.",
      ),
  ],
});

/** MA4-RAT-C-01: simplifying ratios, dividing in a ratio, rates and unit rates, best buys, speed, distance and time. */
export const RATIOS = levels(8010201, {
  very_easy: [
    (n) =>
      choice(
        n,
        "Simplify the ratio 12 : 18.",
        ["2 : 3", "3 : 2", "6 : 9", "4 : 6"],
        0,
        "The highest common factor of 12 and 18 is 6. 12 ÷ 6 = 2 and 18 ÷ 6 = 3, so 12 : 18 = 2 : 3.",
      ),
    (n) =>
      pic(
        { kind: "fraction", shape: "bar", parts: 5, shaded: 2 },
        choice(
          n,
          "Look at the bar. What is the ratio of shaded parts to unshaded parts?",
          ["2 : 3", "2 : 5", "3 : 2", "3 : 5"],
          0,
          "There are 2 shaded parts and 5 − 2 = 3 unshaded parts. Shaded to unshaded is 2 : 3.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "A speed of 60 km/h means travelling 60 km in one hour.",
        true,
        "km/h means kilometres per hour, so 60 km/h is 60 kilometres every hour.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A car travels 240 km in 3 hours. What is its average speed in km/h?",
        ["80", "80 km/h"],
        "Speed = distance ÷ time = 240 ÷ 3 = 80 km/h.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Share $40 in the ratio 3 : 5. The larger share is $___.",
        ["25", "25.00"],
        "There are 3 + 5 = 8 parts. One part is $40 ÷ 8 = $5. The larger share is 5 parts: 5 × $5 = $25.",
      ),
    (n) =>
      multi(
        n,
        "Which ratios are equivalent to 4 : 6? Choose all that are right.",
        ["2 : 3", "8 : 12", "6 : 4", "10 : 15", "4 : 9"],
        [0, 1, 3],
        "4 : 6 simplifies to 2 : 3. 8 : 12 and 10 : 15 also simplify to 2 : 3. 6 : 4 is the other way round, and 4 : 9 is different.",
      ),
  ],
  medium: [
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Bag of rice", "Price"],
          rows: [
            ["500 g", "$4.00"],
            ["750 g", "$5.40"],
            ["1 kg", "$7.50"],
          ],
        },
        choice(
          n,
          "Look at the table of rice prices. Which bag is the best buy?",
          ["500 g", "750 g", "1 kg"],
          1,
          "Find the price of 100 g in each: $4.00 ÷ 5 = 80c, $5.40 ÷ 7.5 = 72c and $7.50 ÷ 10 = 75c. The 750 g bag is cheapest per 100 g.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Simplify the ratio 2.5 : 4.",
        ["5 : 8", "5:8"],
        "Multiply both parts by 2 to remove the decimal: 5 : 8. 5 and 8 have no common factor, so it is fully simplified.",
      ),
    (n) =>
      ordering(
        n,
        "Put these speeds in order from slowest to fastest.",
        ["15 km/h", "5 m/s", "20 km/h", "400 m/min"],
        "Change them all to km/h. 5 m/s is 5 × 3600 = 18 000 m per hour, or 18 km/h. 400 m/min is 400 × 60 = 24 000 m per hour, or 24 km/h. So 15, 18, 20, 24.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Simplify the ratio 45 minutes : 2 hours.",
        ["3 : 8", "3:8"],
        "Use the same units first: 2 hours = 120 minutes. 45 : 120, then divide both by 15 to get 3 : 8.",
      ),
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Distance ridden by a cyclist (km)",
          points: [
            { label: "0 h", value: 0 },
            { label: "1 h", value: 15 },
            { label: "2 h", value: 30 },
            { label: "3 h", value: 45 },
          ],
          step: 15,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph. At the same speed, how many hours would it take the cyclist to ride 75 km?",
          ["5", "5 hours", "5 h"],
          "The graph goes up 15 km every hour, so the speed is 15 km/h. Time = distance ÷ speed = 75 ÷ 15 = 5 hours.",
        ),
      ),
    (n) =>
      choice(
        n,
        "Ava and Ben share 56 lamingtons in the ratio 3 : 4. How many more lamingtons does Ben get than Ava?",
        ["8", "1", "24", "14"],
        0,
        "There are 3 + 4 = 7 parts, so one part is 56 ÷ 7 = 8. Ava gets 24 and Ben gets 32. Ben gets one part more: 8.",
      ),
  ],
  very_hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A train travels at 90 km/h. How many minutes does it take to travel 60 km?",
        ["40", "40 minutes", "40 min"],
        "Time = distance ÷ speed = 60 ÷ 90 = 2/3 of an hour. 2/3 of 60 minutes is 40 minutes.",
      ),
    (n) =>
      choice(
        n,
        "The ratio of boys to girls in a class is 4 : 5. There are 12 boys. How many students are in the class?",
        ["27", "15", "21", "36"],
        0,
        "4 parts are 12 boys, so one part is 3. Girls are 5 parts: 15. The class has 12 + 15 = 27 students.",
      ),
    (n) =>
      multi(
        n,
        "A runner covers 400 m in 50 seconds. Which statements are true? Choose all that are right.",
        ["Her speed is 8 m/s", "Her speed is 28.8 km/h", "At this speed she runs 1 km in 2 min 5 s", "Her speed is 20 km/h"],
        [0, 1, 2],
        "400 ÷ 50 = 8 m/s. In an hour that is 8 × 3600 = 28 800 m, or 28.8 km/h. 1000 m ÷ 8 m/s = 125 s, which is 2 min 5 s.",
      ),
  ],
});

/** MA4-RAT-C-01: simplifying ratios, dividing in a ratio, rates and unit rates, best buys, speed, distance and time. */
export const RATIOS_2 = levels(8010216, {
  very_easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "The ratio 10 : 15 in simplest form is 2 : ___.",
        "3",
        "Divide both parts by their highest common factor, 5: 10 ÷ 5 = 2 and 15 ÷ 5 = 3.",
      ),
    (n) =>
      pic(
        {
          kind: "bag",
          counters: [
            { colour: "red", count: 3 },
            { colour: "blue", count: 5 },
          ],
        },
        choice(
          n,
          "Look at the bag. What is the ratio of red counters to blue counters?",
          ["3 : 5", "5 : 3", "3 : 8", "5 : 8"],
          0,
          "There are 3 red and 5 blue counters. Red comes first in the question, so the ratio is 3 : 5.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "A tap fills 60 L in 4 minutes. How many litres does it fill per minute?",
        ["15", "15 L", "15 L/min"],
        "Rate = 60 L ÷ 4 minutes = 15 L per minute.",
      ),
  ],
  easy: [
    (n) =>
      trueFalse(
        n,
        "The ratio 3 : 7 is the same as 7 : 3.",
        false,
        "Order matters in a ratio. 3 : 7 means 3 of the first thing for every 7 of the second; 7 : 3 is the other way round.",
      ),
    (n) =>
      choice(
        n,
        "Divide 72 kg of mulch in the ratio 5 : 3. What is the smaller share?",
        ["27 kg", "45 kg", "24 kg", "9 kg"],
        0,
        "There are 5 + 3 = 8 parts, so one part is 72 ÷ 8 = 9 kg. The smaller share is 3 parts: 3 × 9 = 27 kg.",
      ),
    (n) =>
      pic(
        {
          kind: "grid",
          columns: 5,
          rows: 2,
          cells: [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
          ],
        },
        typed(
          "short_answer",
          n,
          "Look at the grid. What is the ratio of shaded squares to unshaded squares, in simplest form?",
          ["2 : 3", "2:3"],
          "There are 10 squares: 4 shaded and 6 unshaded. 4 : 6, divided by 2, is 2 : 3.",
        ),
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "A cyclist rides at 24 km/h for 2.5 hours. How far does she ride, in kilometres?",
        ["60", "60 km"],
        "Distance = speed × time = 24 × 2.5 = 60 km.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are rates (comparing two different kinds of units)? Choose all that are right.",
        ["$4.50 per kg", "80 km/h", "3 boys to 5 girls", "72 heartbeats per minute", "2 cups of flour to 1 cup of sugar"],
        [0, 1, 3],
        "A rate compares different units: dollars per kilogram, kilometres per hour, beats per minute. Boys to girls and cups to cups compare the same kind of thing, so they are ratios.",
      ),
    (n) =>
      pic(
        {
          kind: "table",
          headings: ["Juice bottle", "Price"],
          rows: [
            ["1 L", "$3.20"],
            ["2 L", "$5.80"],
            ["3 L", "$9.00"],
          ],
        },
        ordering(
          n,
          "Look at the table. Put the bottles in order from best buy to worst buy.",
          ["2 L", "3 L", "1 L"],
          "Find the price of 1 litre in each: 1 L is $3.20, 2 L is $5.80 ÷ 2 = $2.90, 3 L is $9.00 ÷ 3 = $3.00. Cheapest per litre is the best buy.",
        ),
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Simplify the ratio 1.2 m : 80 cm.",
        ["3 : 2", "2 : 3", "12 : 8", "1.2 : 80"],
        0,
        "Use the same units: 1.2 m = 120 cm. 120 : 80, divided by 40, is 3 : 2.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Concrete is made from cement, sand and gravel in the ratio 1 : 2 : 3. How many kilograms of sand are in 300 kg of concrete?",
        ["100", "100 kg"],
        "There are 1 + 2 + 3 = 6 parts, so one part is 300 ÷ 6 = 50 kg. Sand is 2 parts: 2 × 50 = 100 kg.",
      ),
    (n) =>
      trueFalse(n, "Driving at 80 km/h for 45 minutes covers 60 km.", true, "45 minutes is 3/4 of an hour. Distance = 80 × 3/4 = 60 km."),
  ],
  very_hard: [
    (n) =>
      pic(
        {
          kind: "line_graph",
          title: "Distance from Sydney (km)",
          points: [
            { label: "9 am", value: 0 },
            { label: "10 am", value: 90 },
            { label: "11 am", value: 90 },
            { label: "12 pm", value: 210 },
          ],
          step: 30,
        },
        typed(
          "short_answer",
          n,
          "Look at the graph of a family's car trip. What was the average speed for the whole trip from 9 am to 12 pm, in km/h?",
          ["70", "70 km/h"],
          "The family travelled 210 km in 3 hours, including the stop. Average speed = 210 ÷ 3 = 70 km/h.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "In a crate, the ratio of red apples to green apples is 5 : 2. There are 15 more red apples than green apples. How many apples are in the crate?",
        "35",
        "The difference is 5 − 2 = 3 parts, and that is 15 apples, so one part is 5. The crate holds 5 + 2 = 7 parts: 7 × 5 = 35 apples.",
      ),
    (n) =>
      choice(
        n,
        "Which is faster: 15 m/s or 50 km/h?",
        [
          "15 m/s, because it equals 54 km/h",
          "50 km/h, because 50 is bigger than 15",
          "They are the same speed",
          "15 m/s, because it equals 90 km/h",
        ],
        0,
        "15 m/s is 15 × 3600 = 54 000 m in an hour, which is 54 km/h. 54 km/h is faster than 50 km/h.",
      ),
  ],
});

/** MA4-ALG-C-01: expanding brackets, factorising by the highest common factor, negative terms, simple algebraic fractions. */
export const ALGEBRA = levels(8020101, {
  very_easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Expand 3(x + 4).",
        ["3x + 12", "3x+12", "12 + 3x"],
        "Multiply each term inside the brackets by 3: 3 × x = 3x and 3 × 4 = 12. So 3(x + 4) = 3x + 12.",
      ),
    (n) => choice(n, "Simplify 5a − 8a.", ["−3a", "3a", "13a", "−13a"], 0, "These are like terms. 5 − 8 = −3, so 5a − 8a = −3a."),
    (n) =>
      trueFalse(
        n,
        "The highest common factor of 6x and 9 is 3.",
        true,
        "The factors of 6 and 9 they share are 1 and 3, so the HCF of the numbers is 3. 9 has no x, so x is not a common factor.",
      ),
  ],
  easy: [
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 4, top: "x + 5", side: "4" },
        choice(
          n,
          "Look at the rectangle. Which expression gives its area?",
          ["4x + 20", "4x + 5", "x + 20", "4x + 9"],
          0,
          "Area = length × width = 4(x + 5). Multiply both terms by 4: 4x + 20.",
        ),
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Factorise: 8y + 12 = 4(2y + ___)",
        "3",
        "The HCF of 8y and 12 is 4. 8y ÷ 4 = 2y and 12 ÷ 4 = 3, so 8y + 12 = 4(2y + 3).",
      ),
    (n) =>
      multi(
        n,
        "Which expressions are equal to −2(x − 5)? Choose all that are right.",
        ["−2x + 10", "10 − 2x", "−2x − 10", "2x − 10"],
        [0, 1],
        "−2 × x = −2x and −2 × −5 = +10, so −2(x − 5) = −2x + 10, which can also be written 10 − 2x.",
      ),
  ],
  medium: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Expand and simplify 2(x + 3) + 5x.",
        ["7x + 6", "7x+6", "6 + 7x"],
        "Expand: 2x + 6 + 5x. Collect the like terms 2x + 5x = 7x. Answer: 7x + 6.",
      ),
    (n) =>
      choice(
        n,
        "Factorise fully: 12ab − 18a",
        ["6a(2b − 3)", "6(2ab − 3a)", "3a(4b − 6)", "6a(2b − 18)"],
        0,
        "The HCF of 12ab and 18a is 6a. 12ab ÷ 6a = 2b and 18a ÷ 6a = 3, so the answer is 6a(2b − 3). 6(2ab − 3a) and 3a(4b − 6) are equal to it, but still have a common factor left inside the brackets.",
      ),
    (n) =>
      ordering(
        n,
        "Put the steps in order to simplify 4(2x − 1) − 3(x − 2).",
        ["Expand the first bracket: 8x − 4", "Expand the second bracket: −3x + 6", "Group like terms: 8x − 3x − 4 + 6", "Simplify: 5x + 2"],
        "Expand each bracket (−3 × −2 = +6), then collect the x terms and the number terms.",
      ),
  ],
  hard: [
    (n) =>
      choice(
        n,
        "Simplify x/3 + x/4.",
        ["7x/12", "2x/7", "x/12", "2x/12"],
        0,
        "Use the common denominator 12: x/3 = 4x/12 and x/4 = 3x/12. Add the tops: 7x/12.",
      ),
    (n) =>
      pic(
        {
          kind: "shape",
          points: [
            [1, 1],
            [11, 1],
            [6, 7],
          ],
          sideLabels: ["3x", "2x + 1", "x − 3"],
        },
        choice(
          n,
          "Look at the triangle. Which expression is its perimeter?",
          ["6x − 2", "6x + 4", "6x − 4", "5x − 2"],
          0,
          "Add the three sides: 3x + (2x + 1) + (x − 3). The x terms make 6x and the numbers make 1 − 3 = −2. Perimeter = 6x − 2.",
        ),
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Expand −x(x − 7).",
        ["−x² + 7x", "-x² + 7x", "−x²+7x", "-x²+7x", "7x − x²", "7x - x²", "7x−x²", "7x-x²"],
        "−x × x = −x² and −x × −7 = +7x. So −x(x − 7) = −x² + 7x.",
      ),
  ],
  very_hard: [
    (n) =>
      trueFalse(
        n,
        "6x²y ÷ 3xy simplifies to 2x.",
        true,
        "Divide the numbers: 6 ÷ 3 = 2. Cancel one x (x² ÷ x = x) and the y (y ÷ y = 1). That leaves 2x.",
      ),
    (n) =>
      multi(
        n,
        "Which of these are correct ways to factorise −4x − 8? Choose all that are right.",
        ["−4(x + 2)", "4(−x − 2)", "−4(x − 2)", "−2(2x + 4)"],
        [0, 1, 3],
        "Expand each to check: −4(x + 2) = −4x − 8, 4(−x − 2) = −4x − 8 and −2(2x + 4) = −4x − 8. But −4(x − 2) = −4x + 8, which is wrong.",
      ),
    (n) =>
      choice(
        n,
        "Simplify 2x/5 − (x − 1)/3.",
        ["(x + 5)/15", "(x − 5)/15", "(x − 1)/15", "(x + 1)/2"],
        0,
        "The common denominator is 15: 2x/5 = 6x/15 and (x − 1)/3 = (5x − 5)/15. Subtract the whole top: 6x − (5x − 5) = 6x − 5x + 5 = x + 5. Answer: (x + 5)/15.",
      ),
  ],
});

/** MA4-ALG-C-01: expanding brackets, factorising by the highest common factor, negative terms, simple algebraic fractions. */
export const ALGEBRA_2 = levels(8020116, {
  very_easy: [
    (n) =>
      typed(
        "fill_blank",
        n,
        "Expand: 5(y − 2) = 5y − ___",
        "10",
        "Multiply each term by 5: 5 × y = 5y and 5 × 2 = 10. So 5(y − 2) = 5y − 10.",
      ),
    (n) => trueFalse(n, "−4m + 9m = 5m", true, "These are like terms. −4 + 9 = 5, so −4m + 9m = 5m."),
    (n) =>
      choice(
        n,
        "What is the highest common factor of 10p and 15?",
        ["5", "10", "15", "5p"],
        0,
        "The biggest number that divides both 10 and 15 is 5. 15 has no p, so p is not part of the HCF.",
      ),
  ],
  easy: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Expand −2(a + 6).",
        ["−2a − 12", "-2a - 12", "−2a−12", "-2a-12"],
        "−2 × a = −2a and −2 × 6 = −12. So −2(a + 6) = −2a − 12.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 4, height: 7, top: "3", side: "2y − 1" },
        choice(
          n,
          "Look at the rectangle. Which expression is its perimeter?",
          ["4y + 4", "4y + 2", "2y + 2", "6y − 3"],
          0,
          "Perimeter = 2 × 3 + 2 × (2y − 1) = 6 + 4y − 2 = 4y + 4. (6y − 3 is the area, not the perimeter.)",
        ),
      ),
    (n) =>
      ordering(
        n,
        "When x = −2, put these expressions in order from smallest to largest value.",
        ["3x", "x − 1", "−x", "x²"],
        "Substitute x = −2: 3x = −6, x − 1 = −3, −x = 2 and x² = (−2)² = 4.",
      ),
  ],
  medium: [
    (n) =>
      multi(
        n,
        "Which expressions simplify to 3a − 2b? Choose all that are right.",
        ["5a − 2b − 2a", "a − 4b + 2a + 2b", "3a + 2b − 4b", "3a − 2b − b"],
        [0, 1, 2],
        "Collect like terms in each: 5a − 2a = 3a; a + 2a = 3a and −4b + 2b = −2b; 2b − 4b = −2b. The last one is 3a − 3b.",
      ),
    (n) =>
      typed(
        "short_answer",
        n,
        "Factorise 15x − 20.",
        ["5(3x − 4)", "5(3x - 4)", "5(3x-4)", "5(3x−4)"],
        "The HCF of 15x and 20 is 5. 15x ÷ 5 = 3x and 20 ÷ 5 = 4, so 15x − 20 = 5(3x − 4).",
      ),
    (n) =>
      choice(
        n,
        "Simplify 3x/5 + x/5.",
        ["4x/5", "4x/10", "3x²/5", "4x/25"],
        0,
        "The denominators are the same, so add the tops and keep the bottom: 3x + x = 4x, giving 4x/5.",
      ),
  ],
  hard: [
    (n) =>
      typed(
        "short_answer",
        n,
        "Expand and simplify 3(2m − 1) − 2(m − 4).",
        ["4m + 5", "4m+5", "5 + 4m"],
        "Expand: 6m − 3 − 2m + 8 (because −2 × −4 = +8). Collect: 6m − 2m = 4m and −3 + 8 = 5. Answer: 4m + 5.",
      ),
    (n) =>
      pic(
        { kind: "rectangle", width: 8, height: 5, top: "x + 3", side: "2x" },
        choice(
          n,
          "Look at the rectangle. Which expression is its area, expanded?",
          ["2x² + 6x", "2x² + 3x", "2x + 6", "3x² + 6x"],
          0,
          "Area = 2x(x + 3). Multiply both terms by 2x: 2x × x = 2x² and 2x × 3 = 6x. Area = 2x² + 6x.",
        ),
      ),
    (n) =>
      trueFalse(
        n,
        "Factorising 6a² − 9a fully gives 3a(2a − 3).",
        true,
        "The HCF of 6a² and 9a is 3a. 6a² ÷ 3a = 2a and 9a ÷ 3a = 3, so 6a² − 9a = 3a(2a − 3).",
      ),
  ],
  very_hard: [
    (n) =>
      choice(
        n,
        "Simplify (x + 1)/2 + (x − 3)/4.",
        ["(3x − 1)/4", "(2x − 2)/6", "(3x − 5)/4", "(3x + 5)/4"],
        0,
        "Use the denominator 4: (x + 1)/2 = (2x + 2)/4. Add the tops: 2x + 2 + x − 3 = 3x − 1. Answer: (3x − 1)/4.",
      ),
    (n) =>
      typed(
        "fill_blank",
        n,
        "Expand and simplify: −3x(2x − 5) − x(4 − x) = −5x² + ___x",
        "11",
        "−3x(2x − 5) = −6x² + 15x and −x(4 − x) = −4x + x². Collect: −6x² + x² = −5x² and 15x − 4x = 11x.",
      ),
    (n) =>
      multi(
        n,
        "A rectangle has area 8x² − 12x. Which pairs could be its length and width? Choose all that are right.",
        ["4x and 2x − 3", "2x and 4x − 6", "8x and x − 12", "4 and 2x² − 3x"],
        [0, 1, 3],
        "Multiply each pair to check: 4x(2x − 3) = 8x² − 12x, 2x(4x − 6) = 8x² − 12x and 4(2x² − 3x) = 8x² − 12x. But 8x(x − 12) = 8x² − 96x.",
      ),
  ],
});
