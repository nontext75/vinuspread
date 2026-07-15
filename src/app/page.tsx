import Image from "next/image";
import { IntroSection } from "@/components/intro-section";
import { SiteHeader } from "@/components/site-header";
import { WorkSection } from "@/components/work-section";

const insights = [
  {
    date: "2026.04.20",
    title: "브랜드 컬러, 감으로 고르면 안 되는 이유",
    summary:
      "M&M's가 2022년에 캐릭터 신발 색을 바꿨을 때, 미국에서 꽤 큰 소동이 났습니다. 제품이 바뀐 것도 아니고, 맛이나 가격이 달라진 것도 아닙니다.",
    image: "/cloned/project-branding-luxury.png",
  },
  {
    date: "2026.05.22",
    title: "디자인 원칙이 없으면 생기는 일들",
    summary:
      "디자인 작업을 하다 보면 이런 상황이 반복되는 경우가 많습니다. 대표가 좀 더 세련되게 해달라고 하면 원칙을 바꾸고, 얼마 지나지 않아 팀장이 너무 튀는 것 같다고 하면 또 바뀝니다.",
    image: "/cloned/project-futuristic-product.png",
  },
  {
    date: "2026.05.01",
    title: "UX 라이팅, 버튼 하나부터 시작하는 법",
    summary:
      "웹사이트나 앱을 만들 때 디자인에는 꽤 많은 시간을 씁니다. 색상, 여백, 폰트 크기, 버튼 모양까지 꼼꼼하게 챙기죠.",
    image: "/cloned/project-nextgen-ui.png",
  },
];

const clients = [
  "Samyang",
  "Lotte Cinema",
  "Samsung Electronics",
  "Seoul Paik Hospital",
  "Realty 114",
  "Macadamia",
  "CJ CheilJedang",
  "Hankook Tire",
  "Nexon",
  "LG Electronics",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#0d0e13]">
      <SiteHeader />

      <section
        data-header-theme="dark"
        className="relative min-h-[100dvh] overflow-hidden bg-[#0d0e13] text-white"
      >
        <Image
          src="/cloned/brands_vertical.png"
          alt="Vinuspread product visual"
          fill
          priority
          className="object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,19,.15),rgba(13,14,19,.72))]" />
        <div className="relative z-10 grid min-h-[100dvh] content-end px-5 pb-8 pt-28 md:px-12 md:pb-12">
          <div className="mb-[9vh] max-w-[760px]">
            <p className="text-[clamp(1.4rem,2.4vw,2.2rem)] leading-tight">
              <span className="block">We plan and develop products with</span>
              <span className="block">AI, strengthening competitiveness through</span>
              <span className="block">continuous improvement.</span>
            </p>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-white/72">
              바이너스프레드는 AI를 활용해 제품을 기획하고 개발하며,
              지속적인 개선으로 경쟁력을 강화합니다.
            </p>
          </div>
          <h1 className="max-w-[10ch] text-[clamp(5.3rem,15vw,15rem)] font-semibold leading-[.8] tracking-tight">
            Product Practice
          </h1>
        </div>
      </section>

      <WorkSection />

      <IntroSection />

      <section
        id="lab"
        data-header-theme="light"
        className="relative bg-white px-5 py-28 md:px-12 md:py-44"
      >
        <div className="grid gap-14 md:grid-cols-[.33fr_.47fr_.2fr]">
          <div className="md:sticky md:top-28 md:h-[60vh] md:self-start">
            <h2 className="text-[clamp(4.8rem,8vw,8.5rem)] font-semibold leading-[.82] tracking-[-.07em]">
              <span className="block">Ideas &</span>
              <span className="block">Insights</span>
            </h2>
          </div>

          <div className="space-y-24 md:pt-2">
            {insights.map((item) => (
              <a
                key={item.title}
                href="#contact"
                className="grid gap-6 md:grid-cols-[96px_1fr] md:gap-8"
              >
                <div className="relative size-24 overflow-hidden rounded-full bg-black/5">
                  <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <div className="max-w-[680px]">
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/25">
                    Insight <span className="mx-2">·</span> {item.date}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-5 line-clamp-2 text-base leading-7 text-black/42">
                    {item.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section data-header-theme="light" className="bg-white px-5 pb-24 md:px-12 md:pb-32">
        <p className="text-sm uppercase text-black/45">Clients</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {clients.map((client) => (
            <span
              key={client}
              className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/60"
            >
              {client}
            </span>
          ))}
        </div>
      </section>

      <footer
        id="contact"
        data-header-theme="dark"
        className="relative overflow-hidden bg-[#0d0e13] px-5 py-20 text-[#e0ccbb] md:px-12"
      >
        <Image
          src="/cloned/about_img.png"
          alt="Vinuspread contact visual"
          fill
          className="object-cover opacity-16"
        />
        <div className="relative z-10 grid gap-12 md:grid-cols-[1.1fr_.9fr]">
          <h2 className="max-w-4xl text-[clamp(4rem,11vw,10rem)] font-semibold leading-[.82] tracking-tight">
            Start the next possibility.
          </h2>
          <div className="self-end text-lg leading-8">
            <p>
              아이디어를 가치 있는 경험으로 만들 준비가 되어 있습니다.
              우리와 함께 다음 가능성을 시작해보세요.
            </p>
            <a className="mt-8 block text-3xl font-semibold" href="mailto:vinus@vinus.co.kr">
              vinus@vinus.co.kr
            </a>
            <p className="mt-8">TEL 02-3661-1907 FAX 02-3661-1906</p>
            <p>Mon-Fri 10:00-18:00 GMT+9</p>
            <p>07802 서울특별시 강서구 공항대로 227, 1202호</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
