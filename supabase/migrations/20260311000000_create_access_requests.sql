create table public.access_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  country text not null,
  organization text,
  role text,
  primary_interest text not null,
  connection text not null,
  description text,
  created_at timestamp with time zone default now() not null
);

alter table public.access_requests enable row level security;

create policy "Anyone can submit access request"
  on public.access_requests
  for insert
  to public
  with check (true);
