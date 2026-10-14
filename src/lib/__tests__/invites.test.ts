import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { INVITE_DAYS, inviteEmail } from "../auth/inviteEmail";
import { INVITE_SQL } from "../auth/inviteSchema";

describe("welcome email", () => {
  const link = "https://my247tutor.com/set-password?token=abc";
  const email = inviteEmail({ name: "Pat", email: "pat@example.com" }, link, "Storm");

  it("says they have access and links to setting a password", () => {
    expect(email.subject).toBe("You've been given access to my247tutor");
    for (const body of [email.text, email.html]) {
      expect(body).toContain("Pat");
      expect(body).toContain("Storm has set up a my247tutor account for you");
      expect(body).toContain(link);
      expect(body).toContain(`${INVITE_DAYS} days`);
      expect(body).toContain("pat@example.com");
    }
    expect(email.html).toContain(">Set your password</a>");
  });

  it("escapes names in the HTML version", () => {
    const html = inviteEmail({ name: "<b>Pat</b>", email: "pat@example.com" }, link, "A & B").html;
    expect(html).toContain("&lt;b&gt;Pat&lt;/b&gt;");
    expect(html).toContain("A &amp; B");
    expect(html).not.toContain("<b>Pat</b>");
  });
});

describe("invite migration", () => {
  it("is the same SQL the app runs itself", () => {
    expect(readFileSync(join(__dirname, "../../../database/009_my247tutor_invites.sql"), "utf8")).toContain(INVITE_SQL);
  });
});
