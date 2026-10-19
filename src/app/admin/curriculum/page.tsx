import { AdminTabs } from "@/components/AdminTabs";
import { Picture } from "@/components/Picture";
import { accountsEnabled } from "@/lib/auth/session";
import {
  COUNTRIES,
  NSW_ID,
  questionsOf,
  STATES,
  SUBJECT_IDS,
  SUBJECTS,
  subtopicsOf,
  topicsFor,
  US_COUNTRY,
  US_STATE,
  US_SUBJECT_IDS,
  US_SUBJECTS,
  yearsWithContent,
} from "@/lib/content/tree";
import type { ContentQuestion, Country, State, Subject, Subtopic, Topic } from "@/lib/content/types";
import { type Curriculum, pictureToUS, toUS, yearName } from "@/lib/curriculum/curricula";
import { getSkill } from "@/lib/curriculum/skills";
import type { Subject as SubjectKey } from "@/lib/curriculum/types";

export const metadata = { title: "Curriculum · Admin · my247tutor" };
// Whether accounts are on is read when the page is requested, not when the site is built.
export const dynamic = "force-dynamic";

const SUBJECT_KEYS = Object.keys(SUBJECT_IDS) as SubjectKey[];

const TYPE_NAMES: Record<ContentQuestion["question_type"], string> = {
  multiple_choice: "multiple choice",
  true_false: "true or false",
  short_answer: "short answer",
  multi_select: "choose all that apply",
  fill_blank: "fill the blank",
  ordering: "put in order",
};

const LEVEL_NAMES: Record<ContentQuestion["difficulty"], string> = {
  very_easy: "very easy",
  easy: "easy",
  medium: "medium",
  hard: "hard",
  very_hard: "very hard",
};

const PRACTICE: Record<string, string> = {
  generated: "questions made fresh each time and marked exactly",
  comprehension: "reading passages with multiple-choice questions",
  writing: "free writing, marked by the AI tutor against the outcome",
  wordwork: "spelling and vocabulary questions",
};

/** Each curriculum's tree. The US one reuses the NSW questions, shown here as US students see them. */
const NSW_STATE = STATES.find((s) => s.id === NSW_ID)!;
const TREES: { curriculum: Curriculum; country: Country; state: State; subjects: Record<SubjectKey, Subject> }[] = [
  {
    curriculum: "nsw",
    country: COUNTRIES.find((c) => c.id === NSW_STATE.country_id)!,
    state: NSW_STATE,
    subjects: { maths: SUBJECTS.find((s) => s.id === SUBJECT_IDS.maths)!, english: SUBJECTS.find((s) => s.id === SUBJECT_IDS.english)! },
  },
  {
    curriculum: "us",
    country: US_COUNTRY,
    state: US_STATE,
    subjects: {
      maths: US_SUBJECTS.find((s) => s.id === US_SUBJECT_IDS.maths)!,
      english: US_SUBJECTS.find((s) => s.id === US_SUBJECT_IDS.english)!,
    },
  },
];

/** The whole content tree, Country → State → Subject → Year → Topic → Subtopic → Question, as in myteacher. */
export default function CurriculumAdminPage() {
  // The proxy keeps /admin pages to admins once accounts are on; until then, answers stay hidden.
  if (!accountsEnabled()) {
    return (
      <div className="stack">
        <h1>Admin</h1>
        <p className="muted">Switch on accounts to see the curriculum here.</p>
      </div>
    );
  }

  const nsw = SUBJECT_KEYS.map((key) => countSubject(key, "nsw"));
  const total = nsw.reduce(
    (a, c) => ({ topics: a.topics + c.topics, subtopics: a.subtopics + c.subtopics, questions: a.questions + c.questions }),
    {
      topics: 0,
      subtopics: 0,
      questions: 0,
    },
  );

  return (
    <div className="stack">
      <h1>Admin</h1>
      <AdminTabs current="curriculum" />
      <p className="muted" style={{ margin: 0 }}>
        {total.topics} topics, {total.subtopics} subtopics and {total.questions} written questions. Subtopics linked to a skill also
        practise with questions the app makes fresh each time. US Common Core reuses these subtopics and questions under Common Core
        standards, in US English, leaving out questions only an Australian would know.
      </p>
      <div className="tree">
        {TREES.map(({ curriculum, country, state, subjects }) => (
          <details key={country.id} open>
            <summary>
              <strong>{country.name}</strong> <span className="muted small">{country.curriculum_framework}</span>
            </summary>
            <details open>
              <summary>
                <strong>{state.name}</strong> <span className="muted small">{state.curriculum_authority}</span>
              </summary>
              {SUBJECT_KEYS.map((key) => {
                const subject = subjects[key];
                return (
                  <details key={key}>
                    <summary>
                      <span className="dot" style={{ background: subject.colour_hex }} /> <strong>{subject.name}</strong>{" "}
                      <Count {...countSubject(key, curriculum)} />
                    </summary>
                    {yearsWithContent(key, curriculum).map((year) => {
                      const topics = topicsFor(key, year, curriculum);
                      return (
                        <details key={year}>
                          <summary>
                            <strong>{yearName(year, curriculum)}</strong> <Count {...countTopics(topics, curriculum)} />
                          </summary>
                          {topics.map((topic) => (
                            <TopicNode key={topic.id} topic={topic} curriculum={curriculum} />
                          ))}
                        </details>
                      );
                    })}
                  </details>
                );
              })}
            </details>
          </details>
        ))}
      </div>
    </div>
  );
}

function TopicNode({ topic, curriculum }: { topic: Topic; curriculum: Curriculum }) {
  const subtopics = subtopicsOf(topic.id);
  return (
    <details>
      <summary>
        {topic.title} <Count {...countTopics([topic], curriculum)} />
      </summary>
      {topic.description && <p className="small muted node-note">{topic.description}</p>}
      {subtopics.map((subtopic) => (
        <SubtopicNode key={subtopic.id} subtopic={subtopic} curriculum={curriculum} />
      ))}
    </details>
  );
}

function SubtopicNode({ subtopic, curriculum }: { subtopic: Subtopic; curriculum: Curriculum }) {
  const questions = questionsOf(subtopic.id, curriculum);
  const skill = subtopic.skill_id ? getSkill(subtopic.skill_id) : null;
  return (
    <details>
      <summary>
        {subtopic.title}{" "}
        <span className="muted small">
          {[subtopic.outcome_code, plural(questions.length, "question"), skill?.practice === "generated" && "then fresh questions"]
            .filter(Boolean)
            .join(" · ")}
        </span>
      </summary>
      {subtopic.description && <p className="small muted node-note">{subtopic.description}</p>}
      {skill && (
        <p className="small node-note">
          Skill: <strong>{skill.title}</strong> ({skill.outcome}): {PRACTICE[skill.practice] ?? skill.practice}.
        </p>
      )}
      {questions.length > 0 && (
        <ol className="question-list">
          {questions.map((q) => (
            <QuestionItem key={q.id} q={q} curriculum={curriculum} />
          ))}
        </ol>
      )}
    </details>
  );
}

function QuestionItem({ q, curriculum }: { q: ContentQuestion; curriculum: Curriculum }) {
  // As the student sees it: in US English on the US curriculum.
  const t = (text: string) => (curriculum === "us" ? toUS(text) : text);
  const correct = new Set(Array.isArray(q.correct_answer) ? q.correct_answer : [q.correct_answer]);
  return (
    <li>
      {q.passage && (
        <details className="small">
          <summary>Passage: {t(q.passage.title)}</summary>
          <p style={{ whiteSpace: "pre-line" }}>{t(q.passage.text)}</p>
        </details>
      )}
      <div>{t(q.question_text)}</div>
      <div className="small muted">
        {TYPE_NAMES[q.question_type]} · {LEVEL_NAMES[q.difficulty]} · {plural(q.points, "point")}
        {q.picture && " · with picture"}
      </div>
      {q.picture && (
        <div className="admin-picture">
          <Picture picture={curriculum === "us" ? pictureToUS(q.picture) : q.picture} />
        </div>
      )}
      {q.answer_options ? (
        <ul className="small">
          {(q.question_type === "ordering"
            ? (q.correct_answer as string[]).map((id) => q.answer_options!.find((o) => o.id === id)!).filter(Boolean)
            : q.answer_options
          ).map((o) => (
            <li key={o.id} className={q.question_type !== "ordering" && correct.has(o.id) ? "correct" : undefined}>
              {t(o.text)}
              {q.question_type !== "ordering" && correct.has(o.id) && " ✓"}
            </li>
          ))}
        </ul>
      ) : (
        <div className="small">
          Answer: <span className="correct">{[...correct].map(t).join(" or ")}</span>
        </div>
      )}
      {q.question_type === "ordering" && <div className="small muted">Shown in the correct order.</div>}
      {q.explanation && <div className="small muted">Why: {t(q.explanation)}</div>}
    </li>
  );
}

function Count({ topics, subtopics, questions }: { topics?: number; subtopics: number; questions: number }) {
  return (
    <span className="muted small">
      {topics !== undefined && `${plural(topics, "topic")} · `}
      {plural(subtopics, "subtopic")} · {plural(questions, "question")}
    </span>
  );
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

function countTopics(topics: Topic[], curriculum: Curriculum) {
  const subtopics = topics.flatMap((t) => subtopicsOf(t.id));
  return { subtopics: subtopics.length, questions: subtopics.reduce((n, s) => n + questionsOf(s.id, curriculum).length, 0) };
}

function countSubject(key: SubjectKey, curriculum: Curriculum) {
  const topics = yearsWithContent(key, curriculum).flatMap((y) => topicsFor(key, y, curriculum));
  return { topics: topics.length, ...countTopics(topics, curriculum) };
}
