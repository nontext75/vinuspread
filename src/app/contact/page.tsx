"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { ContactInfoRow } from "@/components/ContactInfoRow";
import { CaptionedMedia } from "@/components/CaptionedMedia";
import { FormField, FormFileControl, formCompactControlClassName, formLabelClassName, formTextareaClassName } from "@/components/form/FormField";

const categories = ["Website", "Responsive Web", "Mobile Web", "Mobile App", "Branding", "Character", "Editorial & Print", "Other"] as const;

const contactDetails: ReadonlyArray<{ label: string; value: string; detail: string; href?: string }> = [
  { label: "Business enquiries", value: "vinus@vinus.co.kr", detail: "TEL 02-3661-1907 / FAX 02-3661-1906", href: "mailto:vinus@vinus.co.kr" },
  { label: "Open positions", value: "Join our team", detail: "We are always looking for talent.", href: "mailto:vinus@vinus.co.kr?subject=Open%20Position" },
  { label: "Korea office", value: "Suite 1202, 227 Gonghang-daero, Gangseo-gu, Seoul 07802", detail: "Seoul, Korea", href: "https://maps.google.com/?q=227+Gonghang-daero+Seoul" },
  { label: "Business hours", value: "Monday to Friday", detail: "10:00 AM - 18:00 PM, GMT (+9)" },
] as const;

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ companyName: "", name: "", phone: "", email: "", budget: "$5,000 - $10,000", description: "", file: null as File | null });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Website"]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Thank you. Your inquiry has been submitted successfully.");
  };

  return (
    <main className="subpage-wrapper selection:bg-vinus-ink selection:text-vinus-paper">
      <SubpageHero
        eyebrow="Contact"
        title={<><span>Tell us about</span>{" "}<br /><span>your next project.</span></>}
        titleLabel="Tell us about your next project."
        description={<><span>Share the essentials below. We&apos;ll review your request</span><br className="hidden md:block" /> <span>and get back to you with the right direction.</span></>}
        size="medium"
        className="contact-page-hero"
      />

      <section className="contact-info-mobile flex w-full flex-col gap-8 overflow-visible px-6 py-12 md:hidden">
        <div className="relative h-[234px] w-full overflow-hidden bg-vinus-wash">
          <Image src="/vinus/dummy-photo/contact.jpg" alt="VINUSPREAD studio environment" fill sizes="342px" className="object-cover" />
        </div>
        <div className="flex flex-col">
          {contactDetails.map((item, index) => (
            <ContactInfoRow key={`mobile-${item.label}`} {...item} index={index} divider={false} />
          ))}
        </div>
      </section>

      <section className="contact-info-desktop hidden w-full overflow-visible px-6 pb-24 md:block md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.68, ease: [0.23, 1, 0.32, 1] }}
            className="py-6 lg:col-span-5 lg:py-12 lg:pr-12"
          >
            <CaptionedMedia
              src="/vinus/dummy-photo/contact.jpg"
              alt="VINUSPREAD studio environment"
              title="Seoul, Korea"
              meta="37.5587° N · 126.8351° E"
              sizes="(max-width: 1023px) calc(100vw - 48px), 42vw"
              ratio="contact"
              className="w-full"
            />
          </motion.div>

          <div className="lg:col-span-7 lg:pl-12">
            {contactDetails.map((item, index) => (
              <ContactInfoRow
                key={item.label}
                {...item}
                index={index}
                divider={index < contactDetails.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="contact-inquiry-mobile w-full overflow-visible bg-vinus-paper px-6 py-12 md:hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <h2 className="heading-contact font-normal">Project Inquiry</h2>
            <p className="body-md text-vinus-ink">Tell us about your project below. We&apos;ll review your request and get back to you with the right direction.</p>
          </div>

          <div className="flex flex-col gap-4">
            <FormField label="Company Name" htmlFor="mobile-company-name"><input id="mobile-company-name" type="text" placeholder="Enter your company name" value={formData.companyName} onChange={(event) => setFormData({ ...formData, companyName: event.target.value })} className={formCompactControlClassName} /></FormField>
            <FormField label="Your Name" htmlFor="mobile-your-name" required><input id="mobile-your-name" type="text" required placeholder="Please write your name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={formCompactControlClassName} /></FormField>
            <FormField label="Phone Number" htmlFor="mobile-phone-number" required><input id="mobile-phone-number" type="tel" required placeholder="Enter your phone number" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={formCompactControlClassName} /></FormField>
            <FormField label="Email Address" htmlFor="mobile-email-address" required><input id="mobile-email-address" type="email" required placeholder="Please write your email address" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={formCompactControlClassName} /></FormField>
            <FormField label="Project Budget" htmlFor="mobile-project-budget" required><select id="mobile-project-budget" value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })} className={`${formCompactControlClassName} cursor-pointer appearance-none`}><option>Under $5,000</option><option>$5,000 - $10,000</option><option>$10,000 - $30,000</option><option>Above $30,000</option></select></FormField>
            <FormField label="Attachment" htmlFor="mobile-attachment">
              <FormFileControl id="mobile-attachment" compact fileName={formData.file?.name} onChange={(event) => setFormData({ ...formData, file: event.target.files?.[0] ?? null })} />
            </FormField>
          </div>

          <div className="flex flex-col gap-3">
            <p className={formLabelClassName}>Service type *</p>
                <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const selected = selectedCategories.includes(category);
                return <Tag key={`mobile-${category}`} selected={selected} onClick={() => toggleCategory(category)}>{category}</Tag>;
              })}
            </div>
          </div>

          <FormField label="Project details" htmlFor="mobile-project-details" required variant="textarea">
            <textarea id="mobile-project-details" required rows={4} placeholder="Share your goals, timeline, and key requirements." value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className={`${formTextareaClassName} h-24 resize-none bg-transparent p-4`} />
          </FormField>

          <p className="body-md text-vinus-ink">By submitting, you agree to our privacy policy.</p>
          <Button type="submit" size="lg" className="w-fit">Send request</Button>
        </form>
      </section>

      <section className="contact-inquiry-desktop hidden w-full overflow-visible bg-vinus-paper px-6 py-16 md:block md:px-16 md:py-16 min-[2200px]:px-20 min-[2200px]:py-32">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 min-[2200px]:gap-[72px]">
          <div className="flex flex-col gap-6 min-[2200px]:h-[186px] min-[2200px]:gap-8">
            <h2 className="contact-inquiry-title display-section font-normal">Project Inquiry</h2>
            <p className="body-lg w-full max-w-[1440px] font-normal text-vinus-ink">Tell us about your project below. We&apos;ll review your request and get back to you with the right direction.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex h-auto flex-col gap-8 border-y border-vinus-ink/35 py-8 min-[2200px]:h-[590px] min-[2200px]:gap-14 min-[2200px]:py-0">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 min-[2200px]:gap-16">
                <FormField label="Company Name" htmlFor="company-name"><input id="company-name" type="text" placeholder="Enter your company name" value={formData.companyName} onChange={(event) => setFormData({ ...formData, companyName: event.target.value })} className={formCompactControlClassName} /></FormField>
                <FormField label="Your Name" htmlFor="your-name" required><input id="your-name" type="text" required placeholder="Please write your name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={formCompactControlClassName} /></FormField>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 min-[2200px]:gap-16">
                <FormField label="Phone Number" htmlFor="phone-number" required><input id="phone-number" type="tel" required placeholder="Enter your phone number" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={formCompactControlClassName} /></FormField>
                <FormField label="Email Address" htmlFor="email-address" required><input id="email-address" type="email" required placeholder="Please write your email address" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={formCompactControlClassName} /></FormField>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 min-[2200px]:gap-16">
                <FormField label="Project Budget" htmlFor="project-budget" required><select id="project-budget" value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })} className={`${formCompactControlClassName} cursor-pointer appearance-none`}><option>Under $5,000</option><option>$5,000 - $10,000</option><option>$10,000 - $30,000</option><option>Above $30,000</option></select></FormField>
                <FormField label="Attachment" htmlFor="attachment">
                  <FormFileControl id="attachment" compact fileName={formData.file?.name} onChange={(event) => setFormData({ ...formData, file: event.target.files?.[0] ?? null })} />
                </FormField>
              </div>
              <div className="flex h-auto flex-col gap-4 min-[2200px]:gap-6">
                <p className={formLabelClassName}>Select all that apply *</p>
                <div className="flex flex-wrap gap-[var(--space-inline)]">
                  {categories.map((category) => {
                    const selected = selectedCategories.includes(category);
                    return <Tag key={category} selected={selected} onClick={() => toggleCategory(category)}>{category}</Tag>;
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex min-h-12 items-center justify-between gap-4 min-[2200px]:mt-[72px] min-[2200px]:min-h-[58px]">
              <Button type="submit" size="lg" className="h-[58px] px-7">Send request</Button>
              <Button type="reset" size="lg" variant="outline" className="h-[58px] px-7" onClick={() => { setFormData({ companyName: "", name: "", phone: "", email: "", budget: "$5,000 - $10,000", description: "", file: null }); setSelectedCategories(["Website"]); }}>Reset</Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
