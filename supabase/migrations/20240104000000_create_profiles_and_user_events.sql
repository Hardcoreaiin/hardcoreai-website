-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade not null,
  email text,
  full_name text,
  company_name text,
  job_title text,
  user_type text,
  role text not null default 'user' check (role in ('user', 'admin')),
  avatar_url text,
  last_active_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_events table for analytics
create table if not exists public.user_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  event_type text not null,
  project_id uuid references public.projects(id) on delete set null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for optimal admin analytics performance
create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_profiles_company on public.profiles(company_name);
create index if not exists idx_profiles_role on public.profiles(role);

create index if not exists idx_user_events_user_id on public.user_events(user_id);
create index if not exists idx_user_events_type on public.user_events(event_type);
create index if not exists idx_user_events_created_at on public.user_events(created_at);

-- Helper function to check if current authenticated user is an administrator
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.user_events enable row level security;

-- Policies for profiles
create policy "Users can view own profile or admins view all"
  on public.profiles for select
  using ( auth.uid() = id or public.is_admin() );

create policy "Users can update own profile or admins update all"
  on public.profiles for update
  using ( auth.uid() = id or public.is_admin() );

create policy "Users can insert own profile"
  on public.profiles for insert
  with check ( auth.uid() = id or public.is_admin() );

-- Policies for user_events
create policy "Users can view own events or admins view all"
  on public.user_events for select
  using ( auth.uid() = user_id or public.is_admin() );

create policy "Users can insert own events"
  on public.user_events for insert
  with check ( auth.uid() = user_id );

-- Additional Admin view policies on existing tables
create policy "Admins can view all projects"
  on public.projects for select
  using ( public.is_admin() );

create policy "Admins can view all documents"
  on public.documents for select
  using ( public.is_admin() );

-- Updated_at trigger for profiles
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Function to handle auto profile creation on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    user_id,
    email,
    full_name,
    avatar_url,
    role
  )
  values (
    new.id,
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    case when new.email = 'sricharan.srikrishna@gmail.com' then 'admin' else 'user' end
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill query for existing users
insert into public.profiles (id, user_id, email, full_name, avatar_url, role)
select 
  u.id, 
  u.id, 
  u.email, 
  coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)), 
  u.raw_user_meta_data->>'avatar_url',
  case when u.email = 'sricharan.srikrishna@gmail.com' then 'admin' else 'user' end
from auth.users u
on conflict (id) do update set
  email = excluded.email;
