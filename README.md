# my247tutor

An AI tutor for NSW students in Years 3 to 6 (NESA Stages 2 and 3), covering Mathematics and English.
This is the first working version (MVP) from the product plan.

## What it does

- **Placement check.** Up to five questions per subject find where a child should start.
- **Practice loop.** Picks the next skill from a curriculum graph tagged with NESA outcome codes:
  due reviews first, then the skill in progress, then the next unlocked skill.
- **Maths questions** are generated in code (17 skills) and marked exactly, so the tutor
  never has to judge whether an answer is right.
- **English practice:** spelling, vocabulary and reading comprehension (original passages),
  plus writing tasks marked by Claude against criteria written from the outcomes.
- **Tutor chat ("Wattle")** on every question, powered by Claude. It guides with hints and is
  told the answer only so it can steer, with instructions not to reveal it before the student answers.
- **Child safety:** messages are checked before they reach the model. Signs of distress get a
  caring reply with Kids Helpline (1800 55 1800) and are flagged on the parent dashboard.
  Phone numbers, emails and addresses are removed.
- **Topic tree:** students can browse Australia → NSW → Subject → Year → Topic → Subtopic and practise
  any subtopic directly, alongside the "let us choose" adaptive path. Subtopics either use a skill's generated
  questions or a set of written questions (multiple choice, true/false, short answer, fill in the blank,
  choose all that apply, and put in order).
- **Parent dashboard** behind a simple grown-up check: progress by NESA outcome, weekly activity,
  writing feedback and wellbeing alerts.

## Run it

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

Without an API key, practice and marking still work; the chat and writing feedback say they are
switched off. Set `TUTOR_MOCK=1` to use canned tutor replies for demos.

```bash
npm test          # unit tests (curriculum graph, generators, checker, mastery, safety)
npm run typecheck
npm run build
```

## Layout

| Path | What's there |
| --- | --- |
| `src/lib/content` | The content tree (same tables and ids as the myteacher LMS database) and written questions |
| `database/` | SQL to load the content tree into the myteacher PostgreSQL database |
| `src/lib/curriculum` | NESA outcomes and the skill graph (prerequisites, stage, outcome code) |
| `src/lib/practice` | Seeded question generators, answer checker, number formatting |
| `src/lib/english/bank.ts` | Spelling, vocabulary, reading passages and writing tasks |
| `src/lib/learner` | Mastery model, spaced review, next-skill picker, placement |
| `src/lib/tutor` | Tutor prompt, safety checks, Claude calls |
| `src/app` | Pages (`/learn`, `/learn/[subject]`, `/learn/writing`, `/parent`) and API routes |

## Content tree and the myteacher database

`src/lib/content/tree.ts` holds the content tree. Its records match the myteacher LMS tables column for column
(countries, states, subjects, year_levels, topics, subtopics, questions) and reuse that project's ids for
Australia, the states, subjects and year levels. To add content, add a topic, subtopic or question there with a
new hand-written id, then regenerate the SQL:

```bash
npm run content:sql   # writes database/005_my247tutor_content.sql (a test fails if you forget)
```

To load it into a myteacher database, run myteacher's migrations 001–003, then `database/004_add_skill_link.sql`,
then `database/005_my247tutor_content.sql`. Re-running it is safe.

## Known limits of this version

- Progress is stored in the browser (localStorage). Parent accounts, sign-in and a database are next.
- Stage 3 outcome codes (MA3-…, EN3-…) follow the Stage 2 pattern and still need confirming
  against the NESA syllabus; they're marked with an asterisk in the parent dashboard.
- Progress on written question sets is saved, but the parent dashboard still reports by NESA outcome only.
- English content is a starter set and should be reviewed by a NSW teacher.
- The wellbeing check is a simple first layer, not a full safeguarding system. A written
  safeguarding policy and legal review of privacy obligations are needed before launch.
