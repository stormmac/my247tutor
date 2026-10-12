/**
 * Child-safety checks run on every message before it reaches the model.
 * These are deliberately simple, conservative patterns: a false positive shows a
 * caring message and a helpline, which is far better than missing a real concern.
 * They are a first layer only, not a replacement for a reviewed safeguarding policy.
 */

const WELLBEING_PATTERNS: RegExp[] = [
  /\b(kill|hurt|harm|cut)\s*(my ?self|me)\b/i,
  /\bsuicid/i,
  /\bself[- ]?harm/i,
  /\bwant(s|ed)? to die\b/i,
  /\b(don'?t|do not) want to (live|be alive|be here)\b/i,
  /\b(no ?one|nobody) (loves|cares about|likes) me\b/i,
  /\b(i'?m|i am|being|get|getting) bullied\b/i,
  /\bbully(ing)? me\b/i,
  /\b(hits|hurts|kicks|touches|touched) me\b/i,
  /\bscared (to go )?home\b/i,
  /\brun(ning)? away from home\b/i,
];

const PERSONAL_INFO_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "phone number", pattern: /(\+?61|0)[2-478](?:[ -]?\d){8}\b/g },
  { label: "email address", pattern: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  {
    label: "street address",
    pattern: /\b\d{1,4}\s+[A-Za-z]+(?:\s+[A-Za-z]+)?\s+(street|st|road|rd|avenue|ave|drive|dr|place|pl|court|ct|lane|ln|crescent|cres)\b/gi,
  },
];

export const MAX_MESSAGE_LENGTH = 1000;

export const KIDS_HELPLINE = "Kids Helpline on 1800 55 1800";

export const WELLBEING_REPLY =
  "Thank you for telling me. That sounds really hard, and you deserve to feel safe and cared for. " +
  "I'm a learning helper, so the best thing is to talk to a grown-up you trust, like a parent, a teacher or the school counsellor. " +
  `You can also call ${KIDS_HELPLINE}. It's free, any time, day or night, and they're kind people who help kids every day. ` +
  "If you are in danger right now, call 000.";

export function hasWellbeingConcern(text: string): boolean {
  return WELLBEING_PATTERNS.some((p) => p.test(text));
}

/** Replaces personal details with a placeholder and reports what was found. */
export function redactPersonalInfo(text: string): { text: string; found: string[] } {
  const found: string[] = [];
  let out = text;
  for (const { label, pattern } of PERSONAL_INFO_PATTERNS) {
    if (out.match(pattern)) {
      found.push(label);
      out = out.replace(pattern, `[${label} removed]`);
    }
  }
  return { text: out, found };
}

export function personalInfoReminder(found: string[]): string {
  return `Quick reminder: please don't share your ${found.join(" or ")} here. I've hidden it to keep you safe.`;
}
