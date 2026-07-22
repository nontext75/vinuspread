"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { SubpageHero } from "@/components/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { ContactInfoRow } from "@/components/ContactInfoRow";
import { CaptionedMedia } from "@/components/CaptionedMedia";
import { FormField, formControlClassName, formLabelClassName } from "@/components/form/FormField";
import { FormSection } from "@/components/form/FormSection";

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
        title={<><span>Let&apos;s shape what</span><br /><span>comes next.</span></>}
        description={<><span>Share your idea, challenge, or product goal.</span><br className="hidden md:block" /> <span>We&apos;ll help you find the right direction.</span></>}
        size="medium"
        className="md:!pt-[var(--space-section)]"
      />

      <section className="flex w-full flex-col gap-8 overflow-visible px-6 py-12 md:hidden">
        <div className="relative h-[234px] w-full overflow-hidden bg-vinus-wash">
          <Image src="/vinus/dummy-photo/contact.jpg" alt="VINUSPREAD studio environment" fill sizes="342px" className="object-cover" />
        </div>
        <div className="flex flex-col">
          {contactDetails.map((item, index) => (
            <ContactInfoRow key={`mobile-${item.label}`} {...item} index={index} divider={false} />
          ))}
        </div>
      </section>

      <section className="hidden w-full px-6 pb-24 md:block md:px-16">
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
              className="aspect-[4/3] w-full lg:h-[660px] lg:aspect-auto"
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

      <section className="w-full overflow-visible bg-vinus-paper px-6 py-24 md:hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="type-contact-heading font-normal">Let&apos;s shape what<br />comes next.</h2>
            <p className="type-body text-vinus-ink">Share your idea, challenge, or product goal. We&apos;ll help you find the right direction.</p>
          </div>

          <div className="flex flex-col gap-6">
            <FormField label="Company Name" htmlFor="mobile-company-name"><input id="mobile-company-name" type="text" placeholder="Enter your company name" value={formData.companyName} onChange={(event) => setFormData({ ...formData, companyName: event.target.value })} className={formControlClassName} /></FormField>
            <FormField label="Your Name" htmlFor="mobile-your-name" required><input id="mobile-your-name" type="text" required placeholder="Please write your name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={formControlClassName} /></FormField>
            <FormField label="Phone Number" htmlFor="mobile-phone-number" required><input id="mobile-phone-number" type="tel" required placeholder="Enter your phone number" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={formControlClassName} /></FormField>
            <FormField label="Email Address" htmlFor="mobile-email-address" required><input id="mobile-email-address" type="email" required placeholder="Please write your email address" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={formControlClassName} /></FormField>
            <FormField label="Project Budget" htmlFor="mobile-project-budget" required><select id="mobile-project-budget" value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })} className={`${formControlClassName} cursor-pointer appearance-none`}><option>Under $5,000</option><option>$5,000 - $10,000</option><option>$10,000 - $30,000</option><option>Above $30,000</option></select></FormField>
            <FormField label="Attachment" htmlFor="mobile-attachment">
              <span className="flex h-[61px] min-w-0 items-center justify-between gap-3 border-b border-vinus-ink/35">
                <span className="type-body min-w-0 truncate text-vinus-ink/45">{formData.file?.name ?? "Select a file to attach..."}</span>
                <label htmlFor="mobile-attachment" className="type-body inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-vinus-ink/35 px-4 py-2 font-medium"><Upload className="size-3.5" />Browse<input id="mobile-attachment" type="file" onChange={(event) => setFormData({ ...formData, file: event.target.files?.[0] ?? null })} className="hidden" /></label>
              </span>
            </FormField>
          </div>

          <div className="flex flex-col gap-4">
            <p className={formLabelClassName}>Service type *</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const selected = selectedCategories.includes(category);
                return <Tag key={`mobile-${category}`} selected={selected} onClick={() => toggleCategory(category)}>{category}</Tag>;
              })}
            </div>
          </div>

          <FormField label="Project details" htmlFor="mobile-project-details" required className="gap-4">
            <textarea id="mobile-project-details" required rows={5} placeholder="Share your goals, timeline, and key requirements." value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="type-body h-40 w-full resize-none border border-vinus-ink/35 bg-transparent p-4 outline-none placeholder:text-vinus-ink/45 focus:border-vinus-ink" />
          </FormField>

          <p className="type-body text-vinus-ink">By submitting this form, you agree to our privacy policy.</p>
          <Button type="submit" size="lg" className="w-fit">Send request</Button>
        </form>
      </section>

      <section className="hidden w-full bg-vinus-paper px-6 py-16 md:block md:px-16 md:py-24">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
          <div className="grid min-h-[266px] grid-cols-1 gap-12 border-b border-vinus-ink/35 pb-[98px] pt-8 md:grid-cols-12 md:items-end md:gap-8">
            <div className="flex flex-col gap-6 md:col-span-8 md:col-start-1">
              <h2 className="type-contact-heading font-normal">Let&apos;s shape what<br />comes next.</h2>
              <p className="type-lead max-w-[760px] font-normal text-vinus-ink">Share your idea, challenge, or product goal. We&apos;ll help you find the right direction.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <FormSection label="01 / Essentials" contentClassName="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
                <FormField label="Company Name" htmlFor="company-name"><input id="company-name" type="text" placeholder="Enter your company name" value={formData.companyName} onChange={(event) => setFormData({ ...formData, companyName: event.target.value })} className={formControlClassName} /></FormField>
                <FormField label="Your Name" htmlFor="your-name" required><input id="your-name" type="text" required placeholder="Please write your name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={formControlClassName} /></FormField>
                <FormField label="Phone Number" htmlFor="phone-number" required><input id="phone-number" type="tel" required placeholder="Enter your phone number" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={formControlClassName} /></FormField>
                <FormField label="Email Address" htmlFor="email-address" required><input id="email-address" type="email" required placeholder="Please write your email address" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={formControlClassName} /></FormField>
                <FormField label="Project Budget" htmlFor="project-budget" required><select id="project-budget" value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })} className={`${formControlClassName} cursor-pointer appearance-none`}><option>Under $5,000</option><option>$5,000 - $10,000</option><option>$10,000 - $30,000</option><option>Above $30,000</option></select></FormField>
                <FormField label="Attachment" htmlFor="attachment">
                  <span className="flex h-[61px] min-w-0 items-center justify-between gap-3 border-b border-vinus-ink/35">
                    <span className="type-body min-w-0 truncate text-vinus-ink/45">{formData.file?.name ?? "Select a file to attach..."}</span>
                    <label htmlFor="attachment" className="type-body inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-vinus-ink/35 px-4 py-2 font-medium transition-colors duration-200 hover:bg-vinus-ink hover:text-white"><Upload className="size-3.5" />Browse<input id="attachment" type="file" onChange={(event) => setFormData({ ...formData, file: event.target.files?.[0] ?? null })} className="hidden" /></label>
                  </span>
                </FormField>
            </FormSection>

            <FormSection label="02 / Services" className="md:min-h-[349px]" contentClassName="flex min-h-[156px] flex-col gap-6">
                <p className={formLabelClassName}>Select all that apply *</p>
                <div className="flex flex-wrap gap-[var(--space-inline)]">
                  {categories.map((category) => {
                    const selected = selectedCategories.includes(category);
                    return <Tag key={category} selected={selected} onClick={() => toggleCategory(category)}>{category}</Tag>;
                  })}
                </div>
            </FormSection>

            <FormSection label="03 / Project brief">
              <FormField label="Project Details" htmlFor="project-details" required className="gap-4" labelClassName="font-bold"><textarea id="project-details" required rows={6} placeholder="Share your goals, timeline, and key requirements." value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="type-body h-[210px] w-full resize-y border border-vinus-ink/35 bg-white/55 p-6 outline-none placeholder:text-vinus-ink/45 focus:border-vinus-ink" /></FormField>
            </FormSection>

            <div className="grid min-h-[120px] grid-cols-1 gap-8 pt-16 md:grid-cols-12 md:items-start">
              <Button type="submit" size="lg" className="w-full md:col-span-3">Send request</Button>
              <p className="type-body text-vinus-ink/45 md:col-span-5 md:col-start-5 md:self-center">Your inquiry will be sent directly to our team. We do not store your personal information.</p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
