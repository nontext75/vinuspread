export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  client: string;
  period: string;
  overview: string;
  blocks: Array<{ heading: string; body: string; image?: string }>;
};

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    slug: "mongdang",
    title: "몽당",
    subtitle: "캐릭터 기반 브랜드 경험",
    category: "Character",
    image: "/vinus/dummy-photo/work-01.jpg",
    client: "Mongdang Studio",
    period: "2023.08",
    overview:
      "몽당은 캐릭터를 중심으로 브랜드 이야기를 풀어낸 프로젝트입니다. 따뜻한 시각 언어와 확장 가능한 캐릭터 시스템을 통해 아이와 부모 모두에게 자연스럽게 닿는 경험을 만들었습니다.",
    blocks: [
      {
        heading: "Character System & Visual Identity",
        body:
          "캐릭터는 단순한 그림이 아니라 브랜드의 태도와 메시지를 전하는 매개체입니다. 온오프라인 환경에서 일관되게 쓰일 수 있도록 형태, 색상, 사용 규칙을 하나의 시스템으로 정리했습니다.",
      },
    ],
  },
  {
    slug: "shinhan-easy",
    title: "신한 이지",
    subtitle: "금융 모바일 웹 경험",
    category: "Web",
    image: "/vinus/dummy-photo/work-02.jpg",
    client: "Shinhan Financial Group",
    period: "2023.02",
    overview:
      "복잡한 금융 정보를 모바일 환경에 맞게 단순하고 직관적으로 재구성한 디지털 포털입니다. 사용자가 필요한 정보를 빠르게 찾고, 다음 행동으로 자연스럽게 이동할 수 있도록 흐름을 정리했습니다.",
    blocks: [
      {
        heading: "UX/UI Design System Integration",
        body:
          "금융 서비스 특유의 복잡한 절차를 명확한 단계로 나누고, 모바일 화면에 맞는 정보 위계를 다시 설계했습니다. 핵심 정보와 주요 행동이 한눈에 연결되도록 탐색 부담을 줄였습니다.",
      },
    ],
  },
  {
    slug: "crowdsourcing-platform-crowd-oh",
    title: "크라우드 오!",
    subtitle: "크라우드소싱 플랫폼 경험",
    category: "Web",
    image: "/vinus/dummy-photo/work-03.jpg",
    client: "Crowd OH Corp",
    period: "2022.11",
    overview:
      "크리에이터와 비즈니스를 연결하는 크라우드소싱 플랫폼입니다. 참여자가 프로젝트의 흐름을 쉽게 이해하고, 필요한 작업에 몰입할 수 있도록 화면 구조와 인터랙션을 정리했습니다.",
    blocks: [
      {
        heading: "Dashboard Experience",
        body:
          "많은 작업 상태와 데이터를 부담 없이 보여주는 것이 핵심 과제였습니다. 반복되는 업무 흐름에 맞춰 모듈형 대시보드와 직관적인 프로젝트 추적 방식을 만들었습니다.",
      },
    ],
  },
  {
    slug: "macadamia-website",
    title: "마카다미아",
    subtitle: "제품 전략과 UX/UI 디자인",
    category: "Web",
    image: "/vinus/dummy-photo/work-04.jpg",
    client: "Macadamia Labs",
    period: "2022.09",
    overview:
      "디자인 원칙과 크리에이티브 전략을 명확한 공간감, 강한 타이포그래피, 유연한 인터랙션으로 전달한 제품 경험입니다.",
    blocks: [
      {
        heading: "Interaction & Motion Design",
        body:
          "섬세한 페이지 전환과 스크롤 반응으로 경험에 리듬을 더했습니다. 동시에 정보 접근은 빠르고 직접적으로 유지해 콘텐츠의 명확성을 해치지 않도록 조율했습니다.",
      },
    ],
  },
  {
    slug: "budongsan114-mediate-bizsolution",
    title: "부동산114 중개 Biz솔루션",
    subtitle: "엔터프라이즈 B2B 제품 전략",
    category: "Web",
    image: "/vinus/dummy-photo/work-05.jpg",
    client: "Budongsan 114",
    period: "2022.07",
    overview:
      "부동산 관리와 중개 업무 커뮤니케이션을 효율화한 엔터프라이즈 플랫폼입니다. 복잡한 레거시 시스템을 실무자가 바로 이해할 수 있는 업무 도구로 바꾸는 데 집중했습니다.",
    blocks: [
      {
        heading: "Optimizing B2B Systems",
        body:
          "반복적인 실무를 안정적으로 처리할 수 있도록 정보를 전용 컨트롤 그리드와 모듈형 작업 공간으로 재구성했습니다. 오류 가능성을 낮추고 업무 지연을 줄이는 흐름을 만들었습니다.",
      },
    ],
  },
  {
    slug: "donga-on-book",
    title: "동아 온북",
    subtitle: "브랜딩과 디지털 플랫폼",
    category: "Web",
    image: "/vinus/dummy-photo/work-06.jpg",
    client: "Donga Publishing",
    period: "2022.06",
    overview:
      "전통적인 출판 경험을 인터랙티브한 디지털 학습 환경으로 확장한 프로젝트입니다. 교사와 학습자가 직관적인 도구를 통해 자연스럽게 연결되도록 구성했습니다.",
    blocks: [
      {
        heading: "Digital Learning Ecosystem",
        body:
          "텍스트, 학습지, 영상, 인터랙티브 콘텐츠를 다양한 디바이스에서 안정적으로 다룰 수 있도록 모듈형 콘텐츠 그리드를 구성했습니다. 학습 흐름이 끊기지 않도록 일관성을 우선했습니다.",
      },
    ],
  },
  {
    slug: "aliot-brand-identity",
    title: "알리엇 브랜드 아이덴티티",
    subtitle: "기업 아이덴티티 시스템",
    category: "Web",
    image: "/vinus/dummy-photo/work-07.jpg",
    client: "Aliot Technology",
    period: "2022.05",
    overview:
      "기술 기업을 위한 명확하고 유연한 아이덴티티 시스템입니다. 제품 인터페이스부터 커뮤니케이션, 인쇄 매체까지 일관된 시각적 선명도를 유지하도록 정리했습니다.",
    blocks: [
      {
        heading: "Visual Identity System",
        body:
          "기하학적 디테일, 집중도 높은 색상, 간결한 위계 구조를 바탕으로 유연한 브랜드 시스템을 만들었습니다. 디지털 인터페이스와 인쇄 환경 모두에서 확장 가능하도록 설계했습니다.",
      },
    ],
  },
  {
    slug: "the-frame-artstore-catalogue",
    title: "더 프레임 아트스토어 카탈로그",
    subtitle: "에디토리얼 디자인과 브랜딩 시스템",
    category: "Web",
    image: "/vinus/dummy-photo/work-08.jpg",
    client: "Samsung Electronics",
    period: "2022.04",
    overview:
      "삼성전자 라이프스타일 TV 더 프레임의 아트스토어 콘텐츠를 정리한 디자인 프로젝트입니다. 디지털 퍼블리케이션 안에 카탈로그의 밀도와 갤러리북의 호흡을 담아 제품의 프리미엄 감각을 전달했습니다.",
    blocks: [
      {
        heading: "A Catalogue for Art, Not Television.",
        body:
          "더 프레임은 단순한 TV가 아니라 켜져 있을 때는 스크린, 꺼져 있을 때는 벽에 걸린 작품처럼 존재하는 라이프스타일 제품입니다. 전자제품 매뉴얼이 아니라 큐레이션된 미술관 카탈로그처럼 읽히는 정보 경험에 집중했습니다.",
      },
      {
        heading: "A Museum Monograph on Digital Screens.",
        body:
          "카탈로그는 제품 소개를 넘어 아트스토어의 세계로 들어가는 입구가 되어야 했습니다. 고대부터 현대까지 이어지는 작품의 흐름을 정리하고, 제품 정보의 명확성과 미술사적 무게감을 함께 담았습니다.",
      },
    ],
  },
] as const;

export const portfolioData = Object.fromEntries(
  portfolioProjects.map((project) => [project.slug, project]),
) as Record<string, PortfolioProject>;
