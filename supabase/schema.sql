-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Pages Table
CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY, -- e.g. 'home'
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Blocks Table
CREATE TABLE IF NOT EXISTS blocks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_id TEXT REFERENCES pages(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Initial Data (Home Page)
INSERT INTO pages (id, title, slug) VALUES ('home', 'Home Page', '/');

-- Insert Initial Blocks (from Mock Data)
INSERT INTO blocks (page_id, type, sort_order, data) VALUES 
(
    'home', 
    'hero', 
    0, 
    '{"title": "VINUSPREAD", "subtitle": "Redefining Digital Experiences through Technology & Design"}'::jsonb
),
(
    'home',
    'interactive_visual',
    1,
    '{"type": "particles"}'::jsonb
),
(
    'home',
    'sticky_split',
    2,
    '{"sticky_content": "<h2>Our Philosophy</h2><p>We blend art and code to create immersive digital narratives that resonate with audiences.</p>", "scroll_content": [{"type": "image", "src": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"}, {"type": "text", "text": "Innovation is not just about technology, but how it touches the human spirit."}, {"type": "image", "src": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964"}]}'::jsonb
),
(
    'home',
    'grid_gallery',
    3,
    '{"images": [{"src": "https://images.unsplash.com/photo-1614850523060-8da1d56e37def?q=80&w=2070", "alt": "Project Alpha", "span": 2}, {"src": "https://images.unsplash.com/photo-1614851099311-61b39080c9b8?q=80&w=2070", "alt": "Project Beta", "span": 1}, {"src": "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974", "alt": "Project Gamma", "span": 1}, {"src": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070", "alt": "Project Delta", "span": 2}]}'::jsonb
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Allow public read access (Modify policies as needed for admin write access)
CREATE POLICY "Allow public read access on pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blocks" ON blocks FOR SELECT USING (true);
