/**
 * The whiteboard Suni and the student share. Suni writes on it by putting lines between <board> and
 * </board> in a reply; the chat shows the rest, and the board shows those lines.
 */

const BLOCK = /<board>([\s\S]*?)(?:<\/board>|$)/gi;

/** A reply split into what Suni says in the chat and the lines Suni writes on the board. */
export function splitBoard(reply: string): { say: string; board: string[] } {
  const board: string[] = [];
  const say = reply.replace(BLOCK, (_, inner: string) => {
    board.push(
      ...inner
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    );
    return "\n";
  });
  return { say: say.replace(/\n{3,}/g, "\n\n").trim(), board };
}

/** Whether a student's message asks for help, which opens the whiteboard. */
export function wantsHelp(message: string): boolean {
  return /\b(help|stuck|explain|show me|work (it )?out|how (do|does|to|can)|i don'?t (get|understand|know)|confused|what does .* mean)\b/i.test(
    message,
  );
}

/** Sent with a picture when the student presses "Check my answer". */
export const CHECKING_MESSAGE = "Can you check my answer on the whiteboard?";

/** Sent quietly with a picture when the student stops drawing for a moment and "Help as I draw" is on. */
export const STILL_WORKING_MESSAGE = "(I'm still working on the whiteboard. Have a look at what I've done so far.)";

/** The largest picture of the board sent to Suni, as a data URL. */
export const MAX_BOARD_IMAGE = 1_500_000;
