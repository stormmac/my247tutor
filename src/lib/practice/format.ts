/**
 * Formats a whole number the way NSW maths texts do: no separator for four digits,
 * a space between groups of three from five digits up (e.g. 4723, 12 450).
 * The space is non-breaking so a number never wraps across two lines.
 */
export function formatNumber(n: number): string {
  if (!Number.isInteger(n)) return formatDecimal(n);
  const sign = n < 0 ? "-" : "";
  const digits = Math.abs(n).toString();
  if (digits.length <= 4) return sign + digits;
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

/** Formats a decimal without floating-point noise (0.1 + 0.2 shows as 0.3). */
export function formatDecimal(n: number, maxPlaces = 3): string {
  const fixed = n.toFixed(maxPlaces).replace(/\.?0+$/, "");
  const [whole, frac] = fixed.split(".");
  const wholeFormatted = formatNumber(Number(whole));
  return frac ? `${wholeFormatted}.${frac}` : wholeFormatted;
}

/** Rounds away floating-point error, e.g. 0.30000000000000004 → 0.3. */
export function clean(n: number, places = 6): number {
  return Number(n.toFixed(places));
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export function simplify(num: number, den: number): [number, number] {
  const g = gcd(num, den) || 1;
  return [num / g, den / g];
}

export function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}
