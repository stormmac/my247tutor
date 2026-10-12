import type { Question } from "./types";
import { Rng } from "./rng";
import { clean, formatDecimal, formatMoney, formatNumber as f, simplify } from "./format";

type Draft = Omit<Question, "id" | "skillId">;
type Generator = (rng: Rng) => Draft;

const PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands", "millions"];

function choiceDraft(prompt: string, correct: string, wrong: string[], rng: Rng, hints: string[], solution: string): Draft {
  const choices = rng.shuffle([correct, ...wrong]);
  return { prompt, choices, answer: { kind: "choice", index: choices.indexOf(correct) }, hints, solution };
}

/** Builds two- or three-digit times-table style working for a written multiplication. */
function partialProducts(a: number, b: number): string {
  const tens = Math.floor(b / 10) * 10;
  const ones = b % 10;
  if (tens === 0) return `${f(a)} × ${b} = ${f(a * b)}`;
  return `${f(a)} × ${tens} = ${f(a * tens)}, ${f(a)} × ${ones} = ${f(a * ones)}, and ${f(a * tens)} + ${f(a * ones)} = ${f(a * b)}`;
}

export const MATHS_GENERATORS: Record<string, Generator> = {
  "ma2-place-value": (rng) => {
    const variant = rng.int(0, 2);
    if (variant === 0) {
      // Value of a digit that appears exactly once, so the question is unambiguous.
      for (;;) {
        const n = rng.int(1000, 99999);
        const digits = String(n).split("");
        const unique = digits
          .map((d, i) => ({ d, place: digits.length - 1 - i }))
          .filter(({ d }) => d !== "0" && digits.filter((x) => x === d).length === 1);
        if (!unique.length) continue;
        const { d, place } = rng.pick(unique);
        const value = Number(d) * 10 ** place;
        return {
          prompt: `What is the value of the ${d} in ${f(n)}?`,
          answer: { kind: "number", value },
          hints: [
            `Find the ${d}. Count places from the right, starting with ones.`,
            `The ${d} is in the ${PLACE_NAMES[place]} place.`,
            `${d} ${PLACE_NAMES[place]} is ${d} × ${f(10 ** place)}.`,
          ],
          solution: `The ${d} is in the ${PLACE_NAMES[place]} place, so its value is ${d} × ${f(10 ** place)} = ${f(value)}.`,
        };
      }
    }
    if (variant === 1) {
      const parts = [rng.int(1, 9), rng.int(0, 9), rng.int(0, 9), rng.int(0, 9), rng.int(0, 9)];
      const value = parts.reduce((acc, d) => acc * 10 + d, 0);
      const words = parts.map((d, i) => `${d} ${PLACE_NAMES[4 - i]}`);
      return {
        prompt: `What number has ${words.slice(0, -1).join(", ")} and ${words.at(-1)}?`,
        answer: { kind: "number", value },
        hints: [
          "Write one digit for each place, starting with ten thousands.",
          "A place with 0 still needs a 0 written in it.",
          `Start with ${parts[0]} in the ten thousands place, then ${parts[1]} in the thousands place.`,
        ],
        solution: `Writing the digits in order of place gives ${f(value)}.`,
      };
    }
    const n = rng.int(1000, 89999);
    const step = rng.pick([10, 100, 1000]);
    const more = rng.next() < 0.5;
    const value = more ? n + step : n - step;
    return {
      prompt: `What is ${f(step)} ${more ? "more" : "less"} than ${f(n)}?`,
      answer: { kind: "number", value },
      hints: [
        `Which place changes when you ${more ? "add" : "take away"} ${f(step)}?`,
        `Only the ${PLACE_NAMES[Math.log10(step)]} digit changes, unless it has to ${more ? "carry" : "trade"}.`,
        `${f(n)} ${more ? "+" : "−"} ${f(step)}`,
      ],
      solution: `${f(n)} ${more ? "+" : "−"} ${f(step)} = ${f(value)}.`,
    };
  },

  "ma2-add-sub": (rng) => {
    if (rng.next() < 0.5) {
      const a = rng.int(120, 4999);
      const b = rng.int(110, 4999);
      return {
        prompt: `${f(a)} + ${f(b)} = ?`,
        answer: { kind: "number", value: a + b },
        hints: [
          "Line the numbers up by place value.",
          "Add the ones first, then tens, hundreds and thousands. Carry when a column is 10 or more.",
          `Try ${f(a)} + ${f(Math.floor(b / 100) * 100)} first, then add ${b % 100}.`,
        ],
        solution: `${f(a)} + ${f(b)} = ${f(a + b)}.`,
      };
    }
    const a = rng.int(500, 9999);
    const b = rng.int(100, a - 50);
    return {
      prompt: `${f(a)} − ${f(b)} = ?`,
      answer: { kind: "number", value: a - b },
      hints: [
        "Line the numbers up by place value.",
        "Subtract the ones first. Trade from the next place if the top digit is smaller.",
        `You could count up from ${f(b)} to ${f(a)}.`,
      ],
      solution: `${f(a)} − ${f(b)} = ${f(a - b)}.`,
    };
  },

  "ma2-missing-addend": (rng) => {
    const target = rng.int(2, 9) * 100 + rng.pick([0, 0, 50]);
    const known = rng.int(25, target - 25);
    const missing = target - known;
    const variant = rng.int(0, 2);
    if (variant === 0) {
      return {
        prompt: `${f(known)} + ▢ = ${f(target)}. What number goes in the box?`,
        answer: { kind: "number", value: missing },
        hints: [
          "What do you add to the first number to reach the total?",
          "Subtraction undoes addition.",
          `Work out ${f(target)} − ${f(known)}.`,
        ],
        solution: `${f(target)} − ${f(known)} = ${f(missing)}, so ${f(known)} + ${f(missing)} = ${f(target)}.`,
      };
    }
    if (variant === 1) {
      return {
        prompt: `▢ − ${f(known)} = ${f(missing)}. What number goes in the box?`,
        answer: { kind: "number", value: target },
        hints: [
          "The box is the number you started with before taking some away.",
          "Addition undoes subtraction.",
          `Work out ${f(missing)} + ${f(known)}.`,
        ],
        solution: `${f(missing)} + ${f(known)} = ${f(target)}, so ${f(target)} − ${f(known)} = ${f(missing)}.`,
      };
    }
    return {
      prompt: `${f(target)} − ▢ = ${f(known)}. What number goes in the box?`,
      answer: { kind: "number", value: missing },
      hints: [
        "How much was taken away to get from the first number to the answer?",
        "Find the difference between the two numbers you know.",
        `Work out ${f(target)} − ${f(known)}.`,
      ],
      solution: `${f(target)} − ${f(known)} = ${f(missing)}.`,
    };
  },

  "ma2-times-tables": (rng) => {
    const a = rng.int(2, 10);
    const b = rng.int(2, 10);
    return {
      prompt: `${a} × ${b} = ?`,
      answer: { kind: "number", value: a * b },
      hints: [
        `Think of ${a} groups of ${b}.`,
        `Use a fact you know: ${a} × ${b - 1} = ${a * (b - 1)}.`,
        `Add one more group of ${a} to ${a * (b - 1)}.`,
      ],
      solution: `${a} × ${b} = ${a * b}.`,
    };
  },

  "ma2-division-facts": (rng) => {
    const a = rng.int(2, 10);
    const b = rng.int(2, 10);
    return {
      prompt: `${a * b} ÷ ${a} = ?`,
      answer: { kind: "number", value: b },
      hints: [`How many groups of ${a} make ${a * b}?`, `Think: ${a} × ▢ = ${a * b}.`, `Count by ${a}s until you reach ${a * b}.`],
      solution: `${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = ${b}.`,
    };
  },

  "ma2-missing-factor": (rng) => {
    const a = rng.int(2, 10);
    const b = rng.int(2, 10);
    if (rng.next() < 0.5) {
      return {
        prompt: `▢ × ${a} = ${a * b}. What number goes in the box?`,
        answer: { kind: "number", value: b },
        hints: [`How many ${a}s make ${a * b}?`, "Division undoes multiplication.", `Work out ${a * b} ÷ ${a}.`],
        solution: `${a * b} ÷ ${a} = ${b}, so ${b} × ${a} = ${a * b}.`,
      };
    }
    return {
      prompt: `${a * b} ÷ ▢ = ${b}. What number goes in the box?`,
      answer: { kind: "number", value: a },
      hints: [
        `${a * b} is shared into equal groups of ${b}. How many groups?`,
        "Multiplication can check a division.",
        `Think: ▢ × ${b} = ${a * b}.`,
      ],
      solution: `${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = ${b}.`,
    };
  },

  "ma2-equivalent-fractions": (rng) => {
    const families: [number, number][] = [
      [2, 4],
      [2, 8],
      [4, 8],
      [3, 6],
      [5, 10],
      [2, 10],
      [2, 6],
    ];
    const [small, big] = rng.pick(families);
    const scale = big / small;
    const num = rng.int(1, small - 1);
    return {
      prompt: `${num}/${small} = ▢/${big}. What number goes in the box?`,
      answer: { kind: "number", value: num * scale },
      hints: [
        `How many times bigger is ${big} than ${small}?`,
        `The denominator was multiplied by ${scale}.`,
        `Multiply the numerator by ${scale} too.`,
      ],
      solution: `${small} × ${scale} = ${big}, so ${num} × ${scale} = ${num * scale}. ${num}/${small} = ${num * scale}/${big}.`,
    };
  },

  "ma2-decimals": (rng) => {
    const variant = rng.int(0, 2);
    if (variant === 0) {
      const t = rng.int(0, 9);
      const h = rng.int(1, 9);
      const value = clean(t / 10 + h / 100);
      return {
        prompt: `Write ${t} tenths and ${h} hundredths as a decimal.`,
        answer: { kind: "number", value },
        hints: [
          "Tenths go in the first place after the decimal point.",
          "Hundredths go in the second place after the decimal point.",
          `Write 0, a decimal point, then ${t}, then ${h}.`,
        ],
        solution: `${t} tenths and ${h} hundredths is 0.${t}${h}.`,
      };
    }
    if (variant === 1) {
      const n = rng.int(1, 99);
      const value = clean(n / 100);
      return {
        prompt: `Write ${n}/100 as a decimal.`,
        answer: { kind: "number", value },
        hints: [
          "Hundredths fill two places after the decimal point.",
          n < 10
            ? "With fewer than 10 hundredths, the tenths place is 0."
            : "The tens digit becomes tenths and the ones digit becomes hundredths.",
          `${n} hundredths`,
        ],
        solution: `${n}/100 = ${formatDecimal(value)}.`,
      };
    }
    // Classic trap: more digits is not always bigger.
    const tenths = rng.int(2, 8);
    const a = clean(tenths / 10);
    const b = clean((tenths - 1) / 10 + rng.int(1, 9) / 100);
    return choiceDraft(
      `Which is larger: ${formatDecimal(a)} or ${formatDecimal(b)}?`,
      formatDecimal(a),
      [formatDecimal(b)],
      rng,
      [
        "Compare the tenths digits first.",
        `${formatDecimal(a)} is the same as ${a.toFixed(2)}.`,
        `Compare ${a.toFixed(2)} and ${b.toFixed(2)} as hundredths.`,
      ],
      `${formatDecimal(a)} = ${a.toFixed(2)}, which is ${Math.round(a * 100)} hundredths. ${formatDecimal(b)} is ${Math.round(b * 100)} hundredths. So ${formatDecimal(a)} is larger.`,
    );
  },

  "ma3-large-numbers": (rng) => {
    if (rng.next() < 0.6) {
      const n = rng.int(100000, 9999999);
      const place = rng.pick([1000, 10000, 100000]);
      const value = Math.round(n / place) * place;
      return {
        prompt: `Round ${f(n)} to the nearest ${f(place)}.`,
        answer: { kind: "number", value },
        hints: [
          `Find the ${PLACE_NAMES[Math.log10(place)]} digit.`,
          "Look at the digit to its right. 5 or more rounds up.",
          "Every digit to the right of the rounding place becomes 0.",
        ],
        solution: `${f(n)} rounded to the nearest ${f(place)} is ${f(value)}.`,
      };
    }
    const millions = rng.int(1, 9);
    const n = millions * 1_000_000 + rng.int(0, 999_999);
    return {
      prompt: `How many whole thousands are in ${f(n)}?`,
      answer: { kind: "number", value: Math.floor(n / 1000) },
      hints: ["Each thousand is 1000.", "Cover the last three digits.", "The digits left show how many thousands there are."],
      solution: `${f(n)} has ${f(Math.floor(n / 1000))} whole thousands.`,
    };
  },

  "ma3-decimals": (rng) => {
    if (rng.next() < 0.5) {
      const tenths = rng.int(2, 8);
      const options = [clean(tenths / 10), clean((tenths - 1) / 10 + rng.int(80, 99) / 1000), clean(tenths / 10 + rng.int(1, 9) / 100)];
      const largest = Math.max(...options);
      const labels = options.map((o) => formatDecimal(o));
      return choiceDraft(
        `Which is the largest: ${labels.join(", ")}?`,
        formatDecimal(largest),
        labels.filter((l) => l !== formatDecimal(largest)),
        rng,
        [
          "Give every number three decimal places so they are easy to compare.",
          `For example ${labels[0]} = ${options[0].toFixed(3)}.`,
          "Now compare them as thousandths.",
        ],
        `As thousandths: ${options.map((o) => o.toFixed(3)).join(", ")}. The largest is ${formatDecimal(largest)}.`,
      );
    }
    const n = rng.int(1, 999);
    const value = clean(n / 1000);
    return {
      prompt: `Write ${n}/1000 as a decimal.`,
      answer: { kind: "number", value },
      hints: [
        "Thousandths fill three places after the decimal point.",
        n < 100 ? "You may need zeros straight after the decimal point." : "Each digit moves into tenths, hundredths and thousandths.",
        `${n} thousandths`,
      ],
      solution: `${n}/1000 = ${formatDecimal(value)}.`,
    };
  },

  "ma3-add-sub-decimals": (rng) => {
    const a = clean(rng.int(100, 2000) / 100);
    const b = clean(rng.int(10, 200) / 10);
    if (rng.next() < 0.5) {
      const value = clean(a + b);
      return {
        prompt: `${formatDecimal(a)} + ${formatDecimal(b)} = ?`,
        answer: { kind: "number", value },
        hints: [
          "Line up the decimal points.",
          `Write ${formatDecimal(b)} as ${b.toFixed(2)} so both have two decimal places.`,
          "Add from the right, carrying as usual.",
        ],
        solution: `${a.toFixed(2)} + ${b.toFixed(2)} = ${formatDecimal(value)}.`,
      };
    }
    const [big, small] = a >= b ? [a, b] : [b, a];
    const value = clean(big - small);
    return {
      prompt: `${formatDecimal(big)} − ${formatDecimal(small)} = ?`,
      answer: { kind: "number", value },
      hints: [
        "Line up the decimal points.",
        "Give both numbers two decimal places by adding zeros.",
        "Subtract from the right, trading when you need to.",
      ],
      solution: `${big.toFixed(2)} − ${small.toFixed(2)} = ${formatDecimal(value)}.`,
    };
  },

  "ma3-multiply": (rng) => {
    const [a, b] = rng.next() < 0.5 ? [rng.int(12, 99), rng.int(12, 49)] : [rng.int(102, 999), rng.int(3, 9)];
    return {
      prompt: `${f(a)} × ${b} = ?`,
      answer: { kind: "number", value: a * b },
      hints: [
        `Split ${b} into tens and ones, or ${f(a)} into hundreds, tens and ones.`,
        "Multiply each part, then add the parts.",
        b >= 10 ? `Start with ${f(a)} × ${Math.floor(b / 10) * 10}.` : `Start with ${Math.floor(a / 100) * 100} × ${b}.`,
      ],
      solution: partialProducts(a, b) + ".",
    };
  },

  "ma3-divide-remainders": (rng) => {
    const divisor = rng.int(3, 9);
    const dividend = rng.int(100, 999);
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return {
      prompt: `${f(dividend)} ÷ ${divisor} = ? Write any remainder like 45 r 3.`,
      answer: { kind: "remainder", quotient, remainder },
      hints: [
        `How many groups of ${divisor} fit into ${f(dividend)}?`,
        "Divide one place at a time: hundreds, then tens, then ones.",
        `Start with the hundreds: how many ${divisor}s go into ${Math.floor(dividend / 100) * 100}?`,
      ],
      solution: `${divisor} × ${quotient} = ${f(divisor * quotient)}, and ${f(dividend)} − ${f(divisor * quotient)} = ${remainder}. So ${f(dividend)} ÷ ${divisor} = ${quotient}${remainder ? ` r ${remainder}` : ""}.`,
    };
  },

  "ma3-order-of-operations": (rng) => {
    const variant = rng.int(0, 3);
    const a = rng.int(2, 12);
    const b = rng.int(2, 9);
    const c = rng.int(2, 9);
    const hints = ["Do anything in brackets first.", "Then do × and ÷ from left to right.", "Do + and − last, from left to right."];
    if (variant === 0) {
      return {
        prompt: `${a} + ${b} × ${c} = ?`,
        answer: { kind: "number", value: a + b * c },
        hints,
        solution: `${b} × ${c} = ${b * c} first, then ${a} + ${b * c} = ${a + b * c}.`,
      };
    }
    if (variant === 1) {
      return {
        prompt: `(${a} + ${b}) × ${c} = ?`,
        answer: { kind: "number", value: (a + b) * c },
        hints,
        solution: `${a} + ${b} = ${a + b} first, then ${a + b} × ${c} = ${(a + b) * c}.`,
      };
    }
    if (variant === 2) {
      const d = rng.int(2, 6);
      const total = b * c * d;
      return {
        prompt: `${a * 10} − ${total} ÷ ${d} = ?`,
        answer: { kind: "number", value: a * 10 - total / d },
        hints,
        solution: `${total} ÷ ${d} = ${total / d} first, then ${a * 10} − ${total / d} = ${a * 10 - total / d}.`,
      };
    }
    return {
      prompt: `${a} × ${b} − ${c} × 2 = ?`,
      answer: { kind: "number", value: a * b - c * 2 },
      hints,
      solution: `${a} × ${b} = ${a * b} and ${c} × 2 = ${c * 2}, then ${a * b} − ${c * 2} = ${a * b - c * 2}.`,
    };
  },

  "ma3-add-fractions": (rng) => {
    if (rng.next() < 0.5) {
      const den = rng.pick([5, 6, 7, 8, 9, 10, 12]);
      const x = rng.int(1, den - 1);
      const y = rng.int(1, den - 1);
      const add = rng.next() < 0.6;
      const [p, q] = add || x >= y ? [x, y] : [y, x];
      const num = add ? p + q : p - q;
      if (num === 0) return MATHS_GENERATORS["ma3-add-fractions"](rng);
      return {
        prompt: `${p}/${den} ${add ? "+" : "−"} ${q}/${den} = ? Write your answer as a fraction.`,
        answer: { kind: "fraction", num, den },
        hints: [
          "The denominators are the same, so the size of each part is the same.",
          `Only the numerators change: ${p} ${add ? "+" : "−"} ${q}.`,
          `Keep the denominator ${den}.`,
        ],
        solution: `${p}/${den} ${add ? "+" : "−"} ${q}/${den} = ${num}/${den}${num > den ? `, which is also ${Math.floor(num / den)} ${num % den}/${den}` : ""}.`,
      };
    }
    const [small, big] = rng.pick<[number, number]>([
      [2, 4],
      [2, 8],
      [4, 8],
      [3, 6],
      [5, 10],
      [2, 6],
      [3, 12],
      [4, 12],
    ]);
    const scale = big / small;
    const a = rng.int(1, small - 1);
    const b = rng.int(1, big - 1);
    const num = a * scale + b;
    const [sn, sd] = simplify(num, big);
    return {
      prompt: `${a}/${small} + ${b}/${big} = ? Write your answer as a fraction.`,
      answer: { kind: "fraction", num, den: big },
      hints: [
        "The denominators are different. Make them the same first.",
        `${small} × ${scale} = ${big}, so change ${a}/${small} into ${big}ths.`,
        `${a}/${small} = ${a * scale}/${big}.`,
      ],
      solution: `${a}/${small} = ${a * scale}/${big}, and ${a * scale}/${big} + ${b}/${big} = ${num}/${big}${sn !== num ? ` (= ${sn}/${sd})` : ""}.`,
    };
  },

  "ma3-fraction-of-quantity": (rng) => {
    const den = rng.pick([2, 3, 4, 5, 6, 8, 10]);
    const num = rng.int(1, den - 1);
    const whole = den * rng.int(2, 12);
    const unit = whole / den;
    return {
      prompt: `What is ${num}/${den} of ${whole}?`,
      answer: { kind: "number", value: unit * num },
      hints: [`First find 1/${den} of ${whole}.`, `${whole} ÷ ${den} = ${unit}.`, `Now you need ${num} of those parts.`],
      solution: `1/${den} of ${whole} is ${unit}, so ${num}/${den} of ${whole} is ${unit} × ${num} = ${unit * num}.`,
    };
  },

  "ma3-percentages": (rng) => {
    const pct = rng.pick([10, 25, 50, 75, 20, 5]);
    const amount = pct === 25 || pct === 75 ? rng.int(2, 30) * 4 : rng.int(2, 40) * 5;
    const value = clean((amount * pct) / 100);
    const asFraction: Record<number, string> = { 10: "1/10", 25: "1/4", 50: "1/2", 75: "3/4", 20: "1/5", 5: "1/20" };
    return {
      prompt: `A jacket costs ${formatMoney(amount)}. It is ${pct}% off. How much money is taken off?`,
      answer: { kind: "number", value },
      hints: [
        `${pct}% is the same as ${asFraction[pct]}.`,
        pct === 5
          ? "Find 10% first, then halve it."
          : pct === 20
            ? "Find 10% first, then double it."
            : `Find ${asFraction[pct]} of ${formatMoney(amount)}.`,
        "Write the amount in dollars.",
      ],
      solution: `${pct}% of ${formatMoney(amount)} = ${asFraction[pct]} of ${formatMoney(amount)} = ${formatMoney(value)}.`,
    };
  },
};

export function hasMathsGenerator(skillId: string): boolean {
  return skillId in MATHS_GENERATORS;
}

export function generateMathsQuestion(skillId: string, seed: number): Question {
  const generator = MATHS_GENERATORS[skillId];
  if (!generator) throw new Error(`No maths generator for ${skillId}`);
  return { id: `${skillId}:${seed}`, skillId, ...generator(new Rng(seed)) };
}
