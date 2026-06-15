-- Enable pgvector extension (required for vector embeddings)
create extension if not exists vector;

-- Create document_chunks table with vector embeddings
create table public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references public.documents(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  content text not null,
  page_number integer not null,
  chunk_index integer not null,
  embedding vector(768),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for fast vector similarity search
create index on public.document_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Index for filtering by project / document
create index idx_chunks_document_id on public.document_chunks(document_id);
create index idx_chunks_project_id on public.document_chunks(project_id);

-- Enable RLS
alter table public.document_chunks enable row level security;

-- RLS policies: access through the parent document's user_id
create policy "Users can view chunks of their documents"
  on public.document_chunks for select
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_chunks.document_id
      and d.user_id = auth.uid()
    )
  );

create policy "Service role can insert chunks"
  on public.document_chunks for insert
  with check (true);

create policy "Users can delete chunks of their documents"
  on public.document_chunks for delete
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_chunks.document_id
      and d.user_id = auth.uid()
    )
  );

-- Similarity search function
create or replace function match_document_chunks(
  query_embedding vector(768),
  match_project_id uuid,
  match_threshold float default 0.7,
  match_count int default 10
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  page_number integer,
  chunk_index integer,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    dc.id,
    dc.document_id,
    dc.content,
    dc.page_number,
    dc.chunk_index,
    1 - (dc.embedding <=> query_embedding) as similarity
  from public.document_chunks dc
  where dc.project_id = match_project_id
    and 1 - (dc.embedding <=> query_embedding) > match_threshold
  order by dc.embedding <=> query_embedding
  limit match_count;
end;
$$;
