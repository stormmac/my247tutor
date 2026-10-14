import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BILLING_SQL } from "../auth/billingSchema";
import { accountPlan, newAccountTrialEnd, NewUserSchema } from "../auth/rules";
import { stripeForm, subscriptionFacts, verifyStripeSignature } from "../billing/webhook";

const NOW = Date.UTC(2026, 9, 14, 9);
const parent = { role: "parent" as const, freeAccess: false, trialEndsAt: null, subscriptionStatus: null };

describe("account plan", () => {
  it("lets staff and free-access accounts in without paying", () => {
    expect(accountPlan({ ...parent, role: "admin" }, NOW)).toBe("staff");
    expect(accountPlan({ ...parent, role: "teacher" }, NOW)).toBe("staff");
    expect(accountPlan({ ...parent, freeAccess: true }, NOW)).toBe("free");
  });

  it("lets a parent in during the free trial, then asks them to pay", () => {
    expect(accountPlan({ ...parent, trialEndsAt: NOW + 1 }, NOW)).toBe("trial");
    expect(accountPlan({ ...parent, trialEndsAt: NOW }, NOW)).toBe("unpaid");
    expect(accountPlan(parent, NOW)).toBe("unpaid");
  });

  it("lets paying parents in, including while Stripe retries a failed payment", () => {
    for (const status of ["active", "trialing", "past_due"])
      expect(accountPlan({ ...parent, subscriptionStatus: status }, NOW)).toBe("paying");
    for (const status of ["canceled", "unpaid", "incomplete", "incomplete_expired"])
      expect(accountPlan({ ...parent, subscriptionStatus: status }, NOW)).toBe("unpaid");
  });

  it("carries a new account's trial on from the browser's free hour", () => {
    expect(newAccountTrialEnd(NOW - 5, 60, NOW)).toBe(NOW - 5);
    expect(newAccountTrialEnd(null, 60, NOW)).toBe(NOW + 3_600_000);
  });

  it("checks new accounts admins add", () => {
    expect(NewUserSchema.safeParse({ name: "Sam", email: " Sam@Example.com ", role: "parent", freeAccess: true }).data?.email).toBe(
      "sam@example.com",
    );
    expect(NewUserSchema.safeParse({ name: "Sam", email: "sam@example.com", role: "student", freeAccess: false }).success).toBe(false);
    expect(NewUserSchema.safeParse({ name: "", email: "sam@example.com", role: "parent", freeAccess: false }).success).toBe(false);
  });
});

describe("Stripe webhooks", () => {
  const secret = "whsec_test";
  const body = JSON.stringify({ type: "customer.subscription.updated" });
  const sign = (t: number, payload = body, key = secret) =>
    `t=${t},v1=${createHmac("sha256", key).update(`${t}.${payload}`).digest("hex")}`;
  const t = Math.floor(NOW / 1000);

  it("accepts a genuine, recent signature", () => {
    expect(verifyStripeSignature(body, sign(t), secret, NOW)).toBe(true);
    expect(verifyStripeSignature(body, `${sign(t)},v1=deadbeef`, secret, NOW)).toBe(true);
  });

  it("rejects a forged, altered, old or missing signature", () => {
    expect(verifyStripeSignature(body, sign(t, body, "whsec_other"), secret, NOW)).toBe(false);
    expect(verifyStripeSignature(body + " ", sign(t), secret, NOW)).toBe(false);
    expect(verifyStripeSignature(body, sign(t - 600), secret, NOW)).toBe(false);
    expect(verifyStripeSignature(body, null, secret, NOW)).toBe(false);
    expect(verifyStripeSignature(body, sign(t), "", NOW)).toBe(false);
  });

  it("reads the period end from old and new Stripe API versions", () => {
    expect(subscriptionFacts({ customer: "cus_1", status: "active", current_period_end: 100 })).toEqual({
      customerId: "cus_1",
      status: "active",
      paidUntil: 100_000,
    });
    expect(subscriptionFacts({ customer: { id: "cus_2" }, status: "past_due", items: { data: [{ current_period_end: 200 }] } })).toEqual({
      customerId: "cus_2",
      status: "past_due",
      paidUntil: 200_000,
    });
  });

  it("form-encodes nested parameters the way Stripe expects", () => {
    expect(
      stripeForm({
        mode: "subscription",
        line_items: [{ price: "price_1", quantity: 1 }],
        metadata: { user_id: "u" },
        skip: undefined,
      }).toString(),
    ).toBe("mode=subscription&line_items%5B0%5D%5Bprice%5D=price_1&line_items%5B0%5D%5Bquantity%5D=1&metadata%5Buser_id%5D=u");
  });
});

describe("billing migration", () => {
  it("is the same SQL the app runs itself", () => {
    const file = readFileSync(join(__dirname, "../../../database/008_my247tutor_billing.sql"), "utf8");
    expect(file).toContain(BILLING_SQL);
  });
});
