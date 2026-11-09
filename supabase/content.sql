-- Content schema for AI Learning Hub: tracks, exams, lessons, questions, flashcards, the library and the roadmap.
-- Plain Postgres (works on Supabase, Neon, RDS, Cloud SQL...). Run once, then load the rows from
-- `npm run content:export` (see README, "Moving content to a database").
--
-- Keys are the same ids the site already uses, so URLs and saved progress keep working:
--   exam key "claude/ccar-f" is what progress is stored under; lesson, question and card ids are unique within an exam;
--   section ids are slugs unique within a lesson. `position` keeps the order the site shows.
-- Content is public: anyone may read it, only the service role (or the database owner) may write it.

create table if not exists public.tracks (
  id text primary key,
  position int not null,
  name text not null,
  nav_label text,
  provider text not null,
  tagline text not null,
  description text not null,
  note text,
  guide_md text            -- the track's study runbook, Markdown
);

create table if not exists public.track_resources (
  track_id text not null references public.tracks (id) on delete cascade,
  position int not null,
  title text not null,
  url text not null,
  note text not null,
  primary key (track_id, position)
);

create table if not exists public.track_paths (
  track_id text not null references public.tracks (id) on delete cascade,
  position int not null,
  who text not null,
  exam_ids text[] not null, -- suggested order, ids within the track
  why text not null,
  primary key (track_id, position)
);

create table if not exists public.exams (
  key text primary key,     -- "<track>/<exam>", the progress key
  track_id text not null references public.tracks (id) on delete cascade,
  id text not null,
  position int not null,
  kind text not null check (kind in ('exam', 'course')),
  code text not null,
  name text not null,
  level text not null,
  tier text not null,
  audience text not null,
  price text not null,
  items int not null,
  minutes int not null,
  passing int not null,
  format text,
  scenarios jsonb not null default '[]',  -- [{title, description}]
  review jsonb,                            -- {date, questionsChecked, fixed, dropped}
  unique (track_id, id)
);

create table if not exists public.domains (
  exam_key text not null references public.exams (key) on delete cascade,
  id text not null,
  position int not null,
  name text not null,
  weight numeric not null,
  summary text,
  subskills text[] not null default '{}',
  primary key (exam_key, id)
);

create table if not exists public.lessons (
  exam_key text not null references public.exams (key) on delete cascade,
  id text not null,
  domain_id text not null,
  position int not null,
  title text not null,
  minutes int,
  summary text,
  key_points text[] not null default '{}',
  traps jsonb not null default '[]',      -- [{trap, correct}]
  lab text,
  primary key (exam_key, id),
  foreign key (exam_key, domain_id) references public.domains (exam_key, id)
);

create table if not exists public.lesson_sections (
  exam_key text not null,
  lesson_id text not null,
  id text not null,
  position int not null,
  heading text not null,
  body text not null,                      -- Markdown with KaTeX math
  primary key (exam_key, lesson_id, id),
  foreign key (exam_key, lesson_id) references public.lessons (exam_key, id) on delete cascade
);

create table if not exists public.questions (
  exam_key text not null references public.exams (key) on delete cascade,
  id text not null,
  domain_id text not null,
  position int not null,
  difficulty int check (difficulty between 1 and 3),
  scenario text,
  stem text not null,
  explanation text not null,
  primary key (exam_key, id),
  foreign key (exam_key, domain_id) references public.domains (exam_key, id)
);

create table if not exists public.question_options (
  exam_key text not null,
  question_id text not null,
  position int not null,                   -- the option's index, as used by saved answers
  body text not null,
  rationale text,
  is_correct boolean not null,
  primary key (exam_key, question_id, position),
  foreign key (exam_key, question_id) references public.questions (exam_key, id) on delete cascade
);

create table if not exists public.flashcards (
  exam_key text not null references public.exams (key) on delete cascade,
  id text not null,
  domain_id text not null,
  position int not null,
  front text not null,
  back text not null,
  primary key (exam_key, id),
  foreign key (exam_key, domain_id) references public.domains (exam_key, id)
);

-- Official documentation behind a lesson or a question.
create table if not exists public.sources (
  exam_key text not null references public.exams (key) on delete cascade,
  owner_type text not null check (owner_type in ('lesson', 'question')),
  owner_id text not null,
  position int not null,
  title text not null,
  url text not null,
  primary key (exam_key, owner_type, owner_id, position)
);

create table if not exists public.library_topics (
  id text primary key,
  position int not null,
  name text not null,
  blurb text not null
);

create table if not exists public.library_items (
  url text primary key,
  position int not null,
  title text not null,
  author text not null,
  kind text not null,
  topic_id text not null references public.library_topics (id),
  track_ids text[] not null,
  why text not null,
  read_first text,
  start_here boolean not null default false
);

create table if not exists public.roadmap_months (
  month int primary key,
  title text not null,
  outcome text not null,
  skills text[] not null,
  tech text[] not null,
  milestone text not null
);

create table if not exists public.roadmap_weeks (
  week int primary key,
  month int not null references public.roadmap_months (month) on delete cascade,
  title text not null,
  goal text not null,
  done_when text not null
);

create table if not exists public.roadmap_tasks (
  id text primary key,                     -- "w<week>-<index>", the key saved progress uses
  week int not null references public.roadmap_weeks (week) on delete cascade,
  position int not null,
  kind text not null check (kind in ('learn', 'build', 'skill', 'exam')),
  text text not null,
  hours numeric not null,
  cloud text check (cloud in ('aws', 'azure')),
  library_titles text[] not null default '{}',
  link_path text,
  link_label text
);

create index if not exists lessons_domain on public.lessons (exam_key, domain_id);
create index if not exists questions_domain on public.questions (exam_key, domain_id);
create index if not exists flashcards_domain on public.flashcards (exam_key, domain_id);

-- Everyone may read content; nobody but the service role may change it.
do $$
declare t text;
begin
  foreach t in array array['tracks', 'track_resources', 'track_paths', 'exams', 'domains', 'lessons', 'lesson_sections',
    'questions', 'question_options', 'flashcards', 'sources', 'library_topics', 'library_items',
    'roadmap_months', 'roadmap_weeks', 'roadmap_tasks']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('revoke insert, update, delete, truncate on public.%I from anon, authenticated', t);
    execute format('grant select on public.%I to anon, authenticated', t);
  end loop;
end $$;
