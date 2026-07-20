export type StorySection = {
  heading: string;
  paragraphs: readonly string[];
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  intro: string;
  sections: readonly StorySection[];
  tags: readonly string[];
};

export const stories: readonly Story[] = [
  {
    slug: "brand-colors-by-instinct",
    title: "브랜드 컬러, 감으로 고르면 안 되는 이유",
    excerpt:
      "색은 취향이 아니라 기준에서 출발할 때 더 강한 브랜드 자산이 됩니다.",
    date: "2026.04.20",
    category: "Insight",
    image: "/vinus/dummy-photo/story-01.jpg",
    intro:
      "색은 사람들이 브랜드를 가장 빠르게 알아보는 단서입니다. 하지만 눈에 띄는 것만으로는 충분하지 않습니다. 좋은 컬러 시스템은 브랜드가 어떤 인상을 남기고, 어떤 역할을 해야 하는지 정의하는 데서 시작합니다.",
    sections: [
      {
        heading: "Begin with meaning",
        paragraphs: [
          "색을 고르기 전에 브랜드가 남겨야 할 인상과 실제로 쓰일 상황을 먼저 정해야 합니다. 그래야 이후의 선택에 분명한 이유가 생깁니다.",
          "단독으로 볼 때 매력적인 색도 제품, 인터페이스, 캠페인, 공간 안에서는 전혀 다르게 느껴질 수 있습니다.",
        ],
      },
      {
        heading: "Build a system, not a swatch",
        paragraphs: [
          "대표 색상은 인식을 만들고, 보조 색상은 위계, 상태, 대비, 접근성을 구성합니다. 각각의 색은 따로 존재하는 샘플이 아니라 하나의 실용적인 시스템으로 작동해야 합니다.",
          "무드보드 위의 색보다 실제 레이아웃 안에서 테스트한 색이 더 많은 것을 알려줍니다. 맥락 속에서 브랜드가 명확하고 유연하며 일관되게 보이는지 확인할 수 있기 때문입니다.",
        ],
      },
    ],
    tags: ["Brand", "Color system", "Identity"],
  },
  {
    slug: "design-principles",
    title: "디자인 원칙이 없으면 생기는 일들",
    excerpt:
      "일관된 기준은 모든 디자인 판단을 하나의 방향으로 모읍니다.",
    date: "2026.05.22",
    category: "Insight",
    image: "/vinus/dummy-photo/story-02.jpg",
    intro:
      "디자인 원칙은 판단의 기준을 드러냅니다. 어떤 방향이 제품에 더 적합한지 설명할 수 있게 하고, 작업이 커질수록 각각의 결정이 서로 연결되도록 돕습니다.",
    sections: [
      {
        heading: "A shared basis for decisions",
        paragraphs: [
          "원칙이 없으면 피드백은 쉽게 개인 취향의 문제로 바뀝니다. 가장 큰 목소리가 방향을 정하고, 제품은 리뷰가 반복될 때마다 흔들립니다.",
          "명확한 원칙 몇 가지는 팀이 아이디어를 평가하는 공통 언어가 됩니다. 탐색의 여지는 남기되, 판단의 기준은 분명하게 잡아줍니다.",
        ],
      },
      {
        heading: "Principles should guide action",
        paragraphs: [
          "쓸모 있는 원칙은 실제 디자인 선택에 영향을 줄 만큼 구체적이어야 합니다. 경험이 무엇을 우선해야 하는지, 어려운 상황에서 제품이 어떤 태도를 가져야 하는지 설명할 수 있어야 합니다.",
          "원칙이 꾸준히 사용되면 일관성은 기계적인 반복이 아니라 정렬된 판단의 결과가 됩니다.",
        ],
      },
    ],
    tags: ["Design system", "Principles", "Collaboration"],
  },
  {
    slug: "ux-writing-single-button",
    title: "UX Writing: 버튼 하나에서 시작하는 방법",
    excerpt:
      "버튼 하나의 문장도 사용자의 다음 행동과 경험의 방향을 바꿉니다.",
    date: "2026.05.01",
    category: "Insight",
    image: "/vinus/dummy-photo/story-03.jpg",
    intro:
      "버튼은 압축된 약속입니다. 그 안의 문장은 다음에 어떤 일이 일어나는지, 얼마나 많은 노력이 필요한지, 그 행동이 안전한지 사용자에게 알려줍니다.",
    sections: [
      {
        heading: "Write for the next moment",
        paragraphs: [
          "좋은 인터페이스 문장은 행동과 결과에 집중합니다. 다음 화면이나 결과가 명확하지 않은 상황에서 Continue나 Submit 같은 라벨은 사용자를 망설이게 합니다.",
          "구체적인 라벨은 선택 이후의 결과를 예측하게 해주기 때문에 불필요한 망설임을 줄입니다.",
        ],
      },
      {
        heading: "Test words inside the flow",
        paragraphs: [
          "버튼은 주변 메시지, 폼, 과업과 분리해서 판단할 수 없습니다. 주변 맥락이 버튼 문장에 필요한 설명의 양을 결정합니다.",
          "전체 여정을 함께 검토하면 언어의 일관성을 지킬 수 있고, 작은 문장 선택이 더 큰 사용성 문제로 번지는 것을 막을 수 있습니다.",
        ],
      },
    ],
    tags: ["UX writing", "Product design", "Interaction"],
  },
] as const;

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
