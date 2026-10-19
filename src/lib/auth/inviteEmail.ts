/** The emails that carry a set-password link. Kept free of server code so they can be tested. */

export const INVITE_DAYS = 7;
/** How long a "Forgot password?" link works. */
export const RESET_HOURS = 1;

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function inviteEmail(to: { name: string; email: string }, link: string, invitedBy: string) {
  const subject = "You've been given access to my247tutor";
  const text = [
    `Hi ${to.name},`,
    "",
    `${invitedBy} has set up a my247tutor account for you, so you now have access to my247tutor, the NSW Maths and English tutor for Years 1 to 8.`,
    "",
    "To get started, set your password here:",
    link,
    "",
    `The link works once and lasts ${INVITE_DAYS} days. After that you log in with ${to.email} and your new password.`,
    "",
    "If you weren't expecting this, you can ignore this email.",
    "",
    "my247tutor",
  ].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1f2933;max-width:520px">
<p>Hi ${escape(to.name)},</p>
<p>${escape(invitedBy)} has set up a my247tutor account for you, so you now have access to my247tutor, the NSW Maths and English tutor for Years 1 to 8.</p>
<p style="margin:28px 0"><a href="${escape(link)}" style="background:#1f7a5a;color:#ffffff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Set your password</a></p>
<p style="font-size:14px;color:#52606d">The link works once and lasts ${INVITE_DAYS} days. After that you log in with ${escape(to.email)} and your new password. If the button doesn't work, copy this into your browser:<br><a href="${escape(link)}" style="color:#1f7a5a;word-break:break-all">${escape(link)}</a></p>
<p style="font-size:14px;color:#52606d">If you weren't expecting this, you can ignore this email.</p>
<p>my247tutor</p>
</div>`;
  return { subject, text, html };
}

/** The email a "Forgot password?" request sends. */
export function resetEmail(to: { name: string; email: string }, link: string) {
  const subject = "Reset your my247tutor password";
  const text = [
    `Hi ${to.name},`,
    "",
    "Someone asked to reset the password for your my247tutor account. To choose a new one, open this link:",
    link,
    "",
    `The link works once and lasts ${RESET_HOURS} hour. Then log in with ${to.email} and your new password.`,
    "",
    "If you didn't ask for this, you can ignore this email. Your password stays the same.",
    "",
    "my247tutor",
  ].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1f2933;max-width:520px">
<p>Hi ${escape(to.name)},</p>
<p>Someone asked to reset the password for your my247tutor account. To choose a new one, use the button below.</p>
<p style="margin:28px 0"><a href="${escape(link)}" style="background:#1f7a5a;color:#ffffff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Choose a new password</a></p>
<p style="font-size:14px;color:#52606d">The link works once and lasts ${RESET_HOURS} hour. Then log in with ${escape(to.email)} and your new password. If the button doesn't work, copy this into your browser:<br><a href="${escape(link)}" style="color:#1f7a5a;word-break:break-all">${escape(link)}</a></p>
<p style="font-size:14px;color:#52606d">If you didn't ask for this, you can ignore this email. Your password stays the same.</p>
<p>my247tutor</p>
</div>`;
  return { subject, text, html };
}
