import { saveCheckout, saveSubscription } from "@/lib/billing/stripe";
import { verifyStripeSignature } from "@/lib/billing/webhook";

/** Stripe tells us here when a checkout finishes and when a subscription starts, changes or ends. */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  const body = await request.text();
  if (!verifyStripeSignature(body, request.headers.get("stripe-signature"), secret)) {
    return Response.json({ error: "Bad signature." }, { status: 400 });
  }
  const event = JSON.parse(body) as { type: string; data: { object: { id: string } & Record<string, unknown> } };
  const object = event.data.object;
  switch (event.type) {
    case "checkout.session.completed":
      // Read back from Stripe rather than trusting the event's copy.
      await saveCheckout(object.id);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await saveSubscription(object as unknown as Parameters<typeof saveSubscription>[0]);
      break;
  }
  return Response.json({ received: true });
}
