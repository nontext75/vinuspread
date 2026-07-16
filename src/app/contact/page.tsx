import { InnerPage } from "@/components/InnerPage";

export default function ContactPage() {
  return <InnerPage eyebrow="Start a project" title="Contact" description="We are ready to turn ideas into meaningful experiences and begin what comes next together." items={[
    { title: "Business enquiries", detail: "vinus@vinus.co.kr · 02-3661-1907", href: "mailto:vinus@vinus.co.kr" },
    { title: "Open positions", detail: "Tell us about the work you want to make with us.", href: "mailto:vinus@vinus.co.kr?subject=Open%20Position" },
    { title: "Seoul, Korea", detail: "Suite 1202, 227 Gonghang-daero, Gangseo-gu, Seoul 07802" },
    { title: "Business hours", detail: "Monday to Friday · 10:00 AM–6:00 PM GMT (+9)" },
  ]} />;
}
