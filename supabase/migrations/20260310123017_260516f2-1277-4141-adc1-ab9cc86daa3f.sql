
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone default now() not null
);

alter table public.subscribers enable row level security;

create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to public
  with check (true);
