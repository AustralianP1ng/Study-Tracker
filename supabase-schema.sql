-- Run this once in Supabase SQL Editor.
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  started_at timestamptz not null,
  study_date date not null,
  duration_seconds integer not null check (duration_seconds > 0),
  created_at timestamptz not null default now()
);

alter table public.study_sessions enable row level security;

drop policy if exists "Users can read their sessions" on public.study_sessions;
create policy "Users can read their sessions"
on public.study_sessions for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their sessions" on public.study_sessions;
create policy "Users can insert their sessions"
on public.study_sessions for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their sessions" on public.study_sessions;
create policy "Users can delete their sessions"
on public.study_sessions for delete
using (auth.uid() = user_id);

create index if not exists study_sessions_user_date_idx
on public.study_sessions(user_id, study_date);
