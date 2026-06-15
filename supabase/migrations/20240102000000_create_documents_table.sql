-- Create documents table
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references auth.users(id) not null default auth.uid(),
  storage_path text not null,
  name text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'ready', 'error')),
  doc_type text check (doc_type in ('datasheet', 'reference manual', 'errata', 'schematic')),
  size integer,
  page_count integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.documents enable row level security;

-- RLS policies
create policy "Users can view their own documents"
  on public.documents for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own documents"
  on public.documents for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own documents"
  on public.documents for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own documents"
  on public.documents for delete
  using ( auth.uid() = user_id );

-- Updated_at trigger (reuses the function from the projects migration)
create trigger handle_documents_updated_at
  before update on public.documents
  for each row
  execute function public.handle_updated_at();

-- Create storage bucket for project documents
insert into storage.buckets (id, name, public) values ('project-documents', 'project-documents', false);

-- Storage policies: users can upload to their own folder
create policy "Users can upload to their folder"
  on storage.objects for insert
  with check (
    bucket_id = 'project-documents'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can read their own files
create policy "Users can read their own files"
  on storage.objects for select
  using (
    bucket_id = 'project-documents'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can delete their own files
create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'project-documents'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
