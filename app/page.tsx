import { createClient } from "@/lib/supabase/server";
import BlockRenderer from "@/components/BlockRenderer";
import { ContentBlock } from "@/types/blocks";

// Fallback Mock Data
const MOCK_HOMEPAGE_BLOCKS: ContentBlock[] = [
  {
    id: "hero-1",
    type: "hero",
    data: {
      title: "VINUSPREAD",
      subtitle: "Redefining Digital Experiences through Technology & Design",
    },
  },
  {
    id: "visual-1",
    type: "interactive_visual",
    data: {
      type: "particles",
    },
  },
  {
    id: "split-1",
    type: "sticky_split",
    data: {
      sticky_content: "<h2>Our Philosophy</h2><p>We blend art and code to create immersive digital narratives that resonate with audiences.</p>",
      scroll_content: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070' }, // Retro tech
        { type: 'text', text: 'Innovation is not just about technology, but how it touches the human spirit.' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964' } // Abstract fluid
      ]
    }
  },
  {
    id: "gallery-1",
    type: "grid_gallery",
    data: {
      images: [
        { src: "https://images.unsplash.com/photo-1614850523060-8da1d56e37def?q=80&w=2070", alt: "Project Alpha", span: 2 },
        { src: "https://images.unsplash.com/photo-1614851099311-61b39080c9b8?q=80&w=2070", alt: "Project Beta", span: 1 },
        { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974", alt: "Project Gamma", span: 1 },
        { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070", alt: "Project Delta", span: 2 },
      ]
    }
  },
];

export const revalidate = 60; // Revalidate every minute

async function getBlocks(): Promise<ContentBlock[]> {
  try {
    // If we are using placeholder credentials, skip the fetch to avoid errors
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
      console.log("Using mock data (placeholder credentials detected)");
      return MOCK_HOMEPAGE_BLOCKS;
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blocks')
      .select('*')
      .eq('page_id', 'home')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error("Error fetching blocks:", error);
      return MOCK_HOMEPAGE_BLOCKS;
    }

    if (!data || data.length === 0) {
      return MOCK_HOMEPAGE_BLOCKS;
    }

    // Map Supabase data to ContentBlock type
    return data.map((block: any) => ({
      id: block.id,
      type: block.type as any, // Cast to specific block type enum
      data: block.data as any
    }));

  } catch (e) {
    console.error("Unexpected error:", e);
    return MOCK_HOMEPAGE_BLOCKS;
  }
}

export default async function Home() {
  const blocks = await getBlocks();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
