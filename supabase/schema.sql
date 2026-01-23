-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Blocks Table
create table public.blocks (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Block identification
  type text not null check (type in ('hero', 'sticky_split', 'grid_gallery', 'interactive_visual')),
  slug text unique, -- Optional: for identifying specific blocks by name (e.g. 'homepage-hero')
  
  -- Block content (JSONB for flexibility)
  data jsonb not null default '{}'::jsonb,
  
  -- Ordering and Organization
  page_id text, -- To group blocks by page (e.g. 'home', 'about')
  sort_order integer default 0
);

-- 2. Create Pages Table (Optional but recommended for multi-page structure)
-- For this simple project, we might just use 'page_id' string column in blocks, but let's be robust.
create table public.pages (
  id text primary key, -- e.g. 'home', 'about'
  title text not null,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add foreign key reference to blocks
alter table public.blocks 
add constraint fk_page
foreign key (page_id) 
references public.pages(id)
on delete cascade;

-- 3. Row Level Security (RLS)
alter table public.blocks enable row level security;
alter table public.pages enable row level security;

-- Policies: Public Read Access
create policy "Allow public read access on blocks"
on public.blocks for select
to public
using (true);

create policy "Allow public read access on pages"
on public.pages for select
to public
using (true);

-- Policies: Authenticated Admin Write Access (assuming auth is set up later)
-- For now, allow anon insert/update for development if needed, OR user manually inserts via Dashboard.
-- Let's stick to Public Read Only for the app, Admin Write for Dashboard.

-- 4. Initial Seed Data (Matches our Mock Data)
insert into public.pages (id, title) values ('home', 'Home Page');

insert into public.blocks (type, page_id, sort_order, data)
values 
(
  'hero', 
  'home', 
  10,
  '{
    "title": "VINUS SPREAD", 
    "subtitle": "Redefining Digital Experiences through Technology & Design"
  }'::jsonb
),
(
  'interactive_visual',
  'home',
  20,
  '{
    "type": "particles"
  }'::jsonb
),
(
  'sticky_split',
  'home',
  30,
  '{
    "sticky_content": "<h2>Our Philosophy</h2><p>We blend art and code to create immersive digital narratives that resonate with audiences.</p>",
    "scroll_content": [
      { "type": "image", "src": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" },
      { "type": "text", "text": "Innovation is not just about technology, but how it touches the human spirit." },
      { "type": "image", "src": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964" }
    ]
  }'::jsonb
),
(
  'grid_gallery',
  'home',
  40,
  '{
    "images": [
      { "src": "https://images.unsplash.com/photo-1614850523060-8da1d56e37def?q=80&w=2070", "alt": "Project Alpha", "span": 2 },
      { "src": "https://images.unsplash.com/photo-1614851099311-61b39080c9b8?q=80&w=2070", "alt": "Project Beta", "span": 1 },
      { "src": "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974", "alt": "Project Gamma", "span": 1 },
      { "src": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070", "alt": "Project Delta", "span": 2 }
    ]
  }'::jsonb
);
