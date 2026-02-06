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
      theme: 'dark',
      // layout: 'background', // Reverted as per user request: "Don't use background mode"
      sticky_content: `
        <h2 class="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-white/60">Essential Values</h2>
        <p class="text-5xl md:text-7xl lg:text-9xl leading-[1.0] text-foreground mb-6 font-black tracking-tight" style="word-break: keep-all;">
          SPREAD<br/>THE BEAUTIFUL<br/>THINGS
        </p>
        <p class="text-base text-muted-foreground font-light tracking-wide mb-24">
          우리는 고객의 본질적 가치에 집중하고 아름다움을 더합니다.<br/>
          빠르게 변하는 시대 속에서도 변하지 않는 가치에 주목하며,<br/>
          한계를 뛰어넘는 구조적 아름다움을 만듭니다.
        </p>
      `,
      values_list: [
        {
          title: "THINK", // Uppercase to match Section 3 style
          subtitle: "Establish common goals with clients and contemplate together.",
          description: "고객과 공통된 목표를 설정하고 고민하며, 다양한 선택 속에서 최선의 방법을 제시합니다."
        },
        {
          title: "MIND",
          subtitle: "Recreating new values suited to the purpose.",
          description: "우리가 만든 가치가 어제보다 더 아름다운 오늘을 만듭니다. 목적에 맞는 새로운 가치로 재창조합니다."
        },
        {
          title: "BEHAVIOR",
          subtitle: "Constantly exploring and experimenting without stopping.",
          description: "멈추지 않고 끊임없이 탐구하고 실험합니다. 본질적인 가치를 표현하려는 즐거운 고민을 즐깁니다."
        }
      ],
      scroll_content: [
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000' // THINK: Structural Realism (Architecture)
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1519817650390-64a93db3d648?q=80&w=2000' // MIND: Depth & Inner Core (Spiral)
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2000' // BEHAVIOR: Kinetic Energy (Light Motion)
        }
      ]
    }
  },
  {
    id: "business-fields",
    type: "sticky_split",
    data: {
      theme: 'light',
      layout: 'background', // Reverted: Background mode restore
      sticky_content: `
        <h2 class="text-xl md:text-2xl font-bold mb-8 tracking-tighter text-white/60">Field of Business</h2>
        <p class="text-5xl md:text-7xl lg:text-9xl leading-[1.0] mb-6 font-black tracking-tight" style="word-break: keep-all;">
          NO BOUNDARY<br/>CREATIVE
        </p>
        <p class="text-base text-slate-600 font-light tracking-wide">
          우리는 시각적 디자인의 다양한 분야를 다루며,<br/>
          물리적 경계 없는 최고의 결과물을 공유합니다.
        </p>
      `,
      values_list: [
        {
          title: "Website",
          subtitle: "Developing unified web & mobileUI/UX platforms \nfor successful online business.",
          description: "통일된 경험의 웹 & 모바일 UI/UX 플랫폼 개발."
        },
        {
          title: "MOBILE APP",
          subtitle: "Creating optimized layouts and efficient interactions \nfor high-quality apps. iOS, Android, Windows",
          description: " 환경에 최적화된 어플리케이션."
        },
        {
          title: "Branding",
          subtitle: "Building strong brand identities that resonate \nwith your target audience. ",
          description: "브랜드의 핵심 가치를 시각화하여 강력한 인상을 남깁니다."
        }
      ],
      items: [], // No items array needed for sticky split? Ah it uses scroll_content
      scroll_content: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000' }, // 1. Tech Blue (Network/Globe)
        { type: 'image', src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000' }, // 2. Dark Abstract (Smoother/Darker)
        { type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000' }  // 3. Hardware/Chip (Dark)
      ]
    }
  },
  {
    id: "portfolio-gallery",
    type: "horizontal_gallery",
    data: {
      title: "MAJOR WORKS",
      view_all_link: "/portfolio",
      items: [
        {
          src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000",
          alt: "Genesis X Gran Berlinetta",
          title: "GENESIS X CONCEPT",
          category: "Automotive",
          year: "2024",
          link: "/work/genesis-x"
        },
        {
          src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000",
          alt: "MIH Website",
          title: "MIH WEBSITE",
          category: "Website",
          year: "2023"
        },
        {
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
          alt: "Budongsan 114",
          title: "BUDONGSAN 114",
          category: "Website",
          year: "2022"
        },
        {
          src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000",
          alt: "Samsung Galaxy",
          title: "SAMSUNG GALAXY",
          category: "Interactive",
          year: "2023"
        },
        {
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000",
          alt: "Hyundai Motor",
          title: "HYUNDAI MOTOR",
          category: "Campaign",
          year: "2023"
        },
        {
          src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2000",
          alt: "LG Signature",
          title: "LG SIGNATURE",
          category: "Luxury",
          year: "2022"
        },
        {
          src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000",
          alt: "Hankook Tire",
          title: "HANKOOK TIRE",
          category: "Global",
          year: "2022"
        },
        {
          src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000",
          alt: "Nike Korea",
          title: "NIKE KOREA",
          category: "Retail",
          year: "2022"
        },
        {
          src: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2000",
          alt: "Gentle Monster",
          title: "GENTLE MONSTER",
          category: "Fashion",
          year: "2021"
        },
        {
          src: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000",
          alt: "KakaoBank",
          title: "KAKAOBANK",
          category: "Finance",
          year: "2021"
        },
        {
          src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2000",
          alt: "Naver Map",
          title: "NAVER MAP",
          category: "Platform",
          year: "2021"
        },
        {
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000",
          alt: "SK Telecom",
          title: "SK TELECOM",
          category: "Service",
          year: "2020"
        },
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000",
          alt: "Coupang Eats",
          title: "COUPANG EATS",
          category: "App",
          year: "2020"
        },
        {
          src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000",
          alt: "Woowa Bros",
          title: "WOOWA BROS",
          category: "Corporate",
          year: "2020"
        },
        {
          src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000",
          alt: "Toss",
          title: "TOSS",
          category: "Fintech",
          year: "2019"
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
