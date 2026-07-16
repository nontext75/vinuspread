import { InnerPage } from "@/components/InnerPage";

export default function NewsPage() {
  return <InnerPage eyebrow="Ideas & insights" title="News" description="Practical observations on brands, products, design principles, and the words that shape digital experiences." items={[
    { title: "브랜드 컬러, 감으로 고르면 안 되는 이유", detail: "2026.04.20 · 브랜드 인식과 감정을 결정하는 컬러의 역할", href: "https://vinus-website.vercel.app/story/post-1779326372529" },
    { title: "디자인 원칙이 없으면 생기는 일들", detail: "2026.05.22 · 취향이 아니라 일관된 기준으로 디자인하는 방법", href: "https://vinus-website.vercel.app/story/post-1779449177212" },
    { title: "UX 라이팅, 버튼 하나부터 시작하는 법", detail: "2026.05.01 · 짧고 명확한 문장으로 다음 행동을 설계하는 방법", href: "https://vinus-website.vercel.app/story/ux-3" },
  ]} />;
}
