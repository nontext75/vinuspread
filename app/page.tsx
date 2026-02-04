import { createClient } from "@/lib/supabase/client"; // Using client for now to avoid server component complexity if needed, but standard is server. 
// Actually, let's skip supabase import for this specific 'mock force' version to be 100% safe.
// import { ContentBlock } from "@/types/blocks";
import BlockRenderer from "@/components/BlockRenderer";
// Redeclare types locally if needed or import. 
import { ContentBlock } from "@/types/blocks";

// Fallback Mock Data
const MOCK_HOMEPAGE_BLOCKS: ContentBlock[] = [
  {
    id: "hero-1",
    type: "hero",
    data: {
      title: "VINUSPREAD",
      subtitle: "Redefining Digital Experiences through \nTechnology & Design",
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
  // Directly return mock data for stability
  return MOCK_HOMEPAGE_BLOCKS;
}

export default async function Home() {
  const blocks = await getBlocks();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
