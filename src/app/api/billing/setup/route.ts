import type { NextRequest } from "next/server";
import { requireUser } from "@/lib/auth/users";
import { billingEnabled, billingSetup } from "@/lib/billing/stripe";

/** The card-payment setup checklist, for admins. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  return Response.json({ enabled: billingEnabled(), ...(await billingSetup()) });
}
