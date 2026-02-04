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
    id: "philosophy",
    type: "sticky_split",
    data: {
      sticky_content: `
        <h2 class="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-muted-foreground">Essential Values</h2>
        <p class="text-5xl md:text-7xl lg:text-9xl leading-[1.0] text-foreground mb-6 font-black tracking-tight" style="word-break: keep-all;">
          NO BOUNDARY<br/>CREATIVE
        </p>
        <p class="text-base text-muted-foreground font-light tracking-wide mb-24">
          우리는 고객의 본질적 가치에 집중하고 아름다움을 더합니다.<br/>
          빠르게 변하는 시대 속에서도 변하지 않는 가치에 주목하며,<br/>
          한계를 뛰어넘는 구조적 아름다움을 만듭니다.
        </p>

        <div class="space-y-16">
          <div>
            <h3 class="text-3xl md:text-4xl font-semibold mb-4">Think</h3>
            <p class="text-xl md:text-2xl mb-2 font-light">Establish common goals with clients and contemplate together.</p>
            <p class="text-sm text-muted-foreground font-light">고객과 공통된 목표를 설정하고 고민하며, 다양한 선택 속에서 최선의 방법을 제시합니다.</p>
          </div>
          <div>
            <h3 class="text-3xl md:text-4xl font-semibold mb-4">Mind</h3>
            <p class="text-xl md:text-2xl mb-2 font-light">Recreating new values suited to the purpose.</p>
            <p class="text-sm text-muted-foreground font-light">우리가 만든 가치가 어제보다 더 아름다운 오늘을 만듭니다. 목적에 맞는 새로운 가치로 재창조합니다.</p>
          </div>
          <div>
            <h3 class="text-3xl md:text-4xl font-semibold mb-4">Behavior</h3>
            <p class="text-xl md:text-2xl mb-2 font-light">Constantly exploring and experimenting without stopping.</p>
            <p class="text-sm text-muted-foreground font-light">멈추지 않고 끊임없이 탐구하고 실험합니다. 본질적인 가치를 표현하려는 즐거운 고민을 즐깁니다.</p>
          </div>
        </div>
      `,
      scroll_content: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974'
        }
      ]
    }
  },
  {
    id: "business-fields",
    type: "sticky_split",
    data: {
      sticky_content: `
        <h2 class="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-muted-foreground">Field of Business</h2>
        <p class="text-5xl md:text-7xl lg:text-9xl leading-[1.0] text-foreground mb-6 font-black tracking-tight" style="word-break: keep-all;">
          SPREAD<br/>THE BEAUTIFUL<br/>THINGS
        </p>
        <p class="text-base text-muted-foreground font-light tracking-wide">
          우리는 시각적 디자인의 다양한 분야를 다루며,<br/>
          물리적 경계 없는 최고의 결과물을 공유합니다.
        </p>
      `,
      scroll_content: [
        {
          type: 'text',
          title: 'Website',
          description_en: 'Developing unified web & mobile UI/UX platforms for successful online business.',
          description_ko: '통일된 경험의 웹 & 모바일 UI/UX 플랫폼 개발. 자체 CMS를 통한 빠르고 안정적인 서비스 구축.'
        },
        {
          type: 'text',
          title: 'Application',
          description_en: 'Creating optimized layouts and efficient interactions for high-quality apps.',
          description_ko: 'iOS, Android, Windows 환경의 최적화된 어플리케이션 UI 제작. 디바이스 간 동일한 경험 제공.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070'
        },
        {
          type: 'text',
          title: 'Character & Branding',
          description_en: 'Developing unique characters and sustainable brand strategies.',
          description_ko: '유머러스하고 개성 있는 캐릭터 개발 및 지속 가능한 브랜드 전략 제시.'
        },
        {
          type: 'text',
          title: 'Editorial',
          description_en: 'Creating various visual design elements based on marketing strategies.',
          description_ko: '마케팅 전략에 따른 시각적 디자인 요소 제작 및 경쟁력 강화.'
        }
      ]
    }
  },
  {
    id: "portfolio-gallery",
    type: "horizontal_gallery",
    data: {
      title: "PURPOSEFUL SPACES",
      view_all_link: "/portfolio",
      items: [
        {
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301",
          alt: "Corporate Office Design",
          title: "GENESIS SPACE",
          category: "SPACE",
          year: "2023"
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2370",
          alt: "Skyscraper Architecture",
          title: "HYUNDAI MOTORSTUDIO",
          category: "EXHIBITION",
          year: "2022"
        },
        {
          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070",
          alt: "Tech Hub",
          title: "KIA BRAND IDENTITY",
          category: "BRANDING",
          year: "2021"
        },
        {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2370",
          alt: "Digital Experience",
          title: "SAMSUNG GALAXY STUDIO",
          category: "INTERACTIVE",
          year: "2023"
        },
        {
          src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2370",
          alt: "Luxury Kitchen",
          title: "LG SIGNATURE KITCHEN",
          category: "WEBSITE",
          year: "2022"
        }
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
