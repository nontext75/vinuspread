import { InnerPage } from "@/components/InnerPage";

export default function StudioPage() {
  return <InnerPage eyebrow="About vinuspread" title="Studio" description="A product management and design group working with clients from the first idea through completion and beyond." items={[
    { title: "Product Strategy", detail: "Discovery, roadmap, service structure, and AI opportunity mapping." },
    { title: "Experience Design", detail: "UX/UI, web, app, and interaction design built around real product use." },
    { title: "Brand Systems", detail: "Identity, visual direction, and content systems that stay coherent as brands grow." },
    { title: "Launch & Operation", detail: "CMS, SEO, analytics, and continuous improvement after launch." },
  ]} />;
}
