import "server-only";
import type { Subject } from "@/lib/curriculum/types";
import { lessonWeeks, type RewardKind, type Rewards } from "@/lib/learner/rewards";
import type { LearnerProfile } from "@/lib/learner/model";
import { ready } from "./db";
import { canSeeLearner, canSetWork } from "./family";
import { audit, type User } from "./users";

/** How many earned rewards, and weeks of lesson points, the page lists. */
const EARNINGS_SHOWN = 30;
const WEEKS_SHOWN = 12;
/** The most points one subject's weekly lesson can earn: far more than its questions give. */
const MAX_LESSON_POINTS = 1000;

/**
 * A child's reward program: what each grown-up offers for finishing a week's lesson, what the child
 * has earned, and their totals. For the child and anyone who can see their work.
 */
export async function rewardsFor(viewer: User, learnerId: string): Promise<Rewards | null> {
  if (!(await canSeeLearner(viewer, learnerId))) return null;
  const pool = await ready();
  const { rows: child } = await pool.query(`SELECT name FROM learners WHERE id = $1`, [learnerId]);
  if (!child[0]) return null;
  const [offers, earnings, totals, weeks, canSet] = await Promise.all([
    pool.query(
      `SELECT o.subject, o.kind, o.amount, o.set_by, u.display_name FROM reward_offers o JOIN users u ON u.id = o.set_by
       WHERE o.learner_id = $1 ORDER BY o.subject, u.display_name`,
      [learnerId],
    ),
    pool.query(
      `SELECT subject, to_char(week, 'YYYY-MM-DD') AS week, kind, amount, set_by_name, earned_at FROM reward_earnings
       WHERE learner_id = $1 ORDER BY earned_at DESC LIMIT $2`,
      [learnerId, EARNINGS_SHOWN],
    ),
    pool.query(
      `SELECT kind, SUM(amount) AS total FROM reward_earnings WHERE learner_id = $1 GROUP BY kind
       UNION ALL SELECT 'lesson', SUM(points) FROM lesson_points WHERE learner_id = $1`,
      [learnerId],
    ),
    pool.query(
      `SELECT subject, to_char(week, 'YYYY-MM-DD') AS week, points FROM lesson_points WHERE learner_id = $1
       ORDER BY week DESC, subject LIMIT $2`,
      [learnerId, WEEKS_SHOWN],
    ),
    canSetWork(viewer, learnerId),
  ]);
  const total = (kind: RewardKind | "lesson") => Number(totals.rows.find((r) => r.kind === kind)?.total ?? 0);
  return {
    name: child[0].name as string,
    offers: offers.rows.map((r) => ({
      subject: r.subject as Subject,
      kind: r.kind as RewardKind,
      amount: Number(r.amount),
      setByName: r.display_name as string,
      mine: r.set_by === viewer.id,
    })),
    earnings: earnings.rows.map((r) => ({
      subject: r.subject as Subject,
      week: r.week as string,
      kind: r.kind as RewardKind,
      amount: Number(r.amount),
      setByName: r.set_by_name as string,
      earnedAt: new Date(r.earned_at as string).toISOString(),
    })),
    weeks: weeks.rows.map((r) => ({ subject: r.subject as Subject, week: r.week as string, points: Number(r.points) })),
    totals: { points: total("points") + total("lesson"), money: total("money") },
    canSet,
  };
}

/** A grown-up sets what finishing a subject's weekly lesson is worth, or takes their reward away (null). */
export async function setReward(
  viewer: User,
  learnerId: string,
  subject: Subject,
  reward: { kind: RewardKind; amount: number } | null,
): Promise<boolean> {
  if (!(await canSetWork(viewer, learnerId))) return false;
  const pool = await ready();
  if (reward)
    await pool.query(
      `INSERT INTO reward_offers (learner_id, subject, set_by, kind, amount) VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (learner_id, subject, set_by) DO UPDATE SET kind = $4, amount = $5, updated_at = NOW()`,
      [learnerId, subject, viewer.id, reward.kind, reward.amount],
    );
  else
    await pool.query(`DELETE FROM reward_offers WHERE learner_id = $1 AND subject = $2 AND set_by = $3`, [learnerId, subject, viewer.id]);
  await audit(viewer.id, "set_reward", learnerId, { subject, ...(reward ?? { removed: true }) });
  return true;
}

/**
 * Keeps the points a child's weekly lessons have earned, and gives them the rewards on offer for each
 * weekly lesson they've finished, once per week and grown-up. Called whenever their progress is saved,
 * for a child of `ownerId` (the parent or centre account they belong to). Returns how many rewards
 * were newly earned.
 */
export async function recordRewards(learnerId: string, ownerId: string, profile: Pick<LearnerProfile, "lessons">): Promise<number> {
  const weeks = lessonWeeks(profile).filter((w) => w.points > 0);
  if (!weeks.length) return 0;
  const pool = await ready();
  let earned = 0;
  for (const { subject, week, points, finished } of weeks) {
    // Answers are never taken back, so the points only go up.
    await pool.query(
      `INSERT INTO lesson_points (learner_id, subject, week, points)
       SELECT l.id, $2, $3::date, $4 FROM learners l WHERE l.id = $1 AND l.parent_id = $5
       ON CONFLICT (learner_id, subject, week) DO UPDATE SET points = GREATEST(lesson_points.points, EXCLUDED.points), updated_at = NOW()`,
      [learnerId, subject, week, Math.min(points, MAX_LESSON_POINTS), ownerId],
    );
    if (!finished) continue;
    const { rowCount } = await pool.query(
      `INSERT INTO reward_earnings (learner_id, subject, week, set_by, set_by_name, kind, amount)
       SELECT o.learner_id, o.subject, $3::date, o.set_by, u.display_name, o.kind, o.amount
       FROM reward_offers o JOIN users u ON u.id = o.set_by JOIN learners l ON l.id = o.learner_id AND l.parent_id = $4
       WHERE o.learner_id = $1 AND o.subject = $2
       ON CONFLICT (learner_id, subject, week, set_by) DO NOTHING`,
      [learnerId, subject, week, ownerId],
    );
    earned += rowCount ?? 0;
  }
  return earned;
}
