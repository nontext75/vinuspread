"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft, Upload, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    phone: "",
    email: "",
    budget: "$5,000 - $10,000",
    description: "",
    file: null as File | null,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Website"]);

  const categories = [
    "Website", "Responsive Web", "Mobile Web", "Mobile App",
    "Branding", "Character", "Editorial & Print", "Other"
  ];

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been submitted successfully.");
  };

  return (
    <main className="subpage-wrapper selection:bg-[#0d0d0d] selection:text-[#faf9f6]">
      {/* 1. Header Section */}
      <section className="subpage-header [&_.subpage-header-inner]:border-b-0">
        <div className="subpage-header-inner">
          <p className="subpage-eyebrow">Contact</p>
          <h1 className="subpage-title mt-6">
            Make wonderful things<br />with us.
          </h1>
          <div className="subpage-description">
            Our dedication begins where the client&apos;s expectations end.<br />
            We strive to create and share beautiful, diverse experiences together.
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS GRID */}
      <section className="subpage-content !pb-24">
        <div className="grid grid-cols-1 border-y border-[#0d0d0d]/20 lg:grid-cols-12 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="border-b border-[#0d0d0d]/15 py-12 lg:col-span-5 lg:h-full lg:border-b-0 lg:border-r lg:py-12 lg:pr-12"
          >
            <div className="group relative aspect-[4/3] overflow-hidden bg-[#e8e7e3] lg:h-full lg:min-h-[660px] lg:aspect-auto">
              <Image
                src="/cloned/about_img.png"
                alt="VINUSPREAD studio environment"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-20 text-white md:px-7 md:pb-7">
                <p className="text-sm font-semibold uppercase">Seoul, Korea</p>
                <p className="text-sm">37.5587° N · 126.8351° E</p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 lg:pl-12">
            {[
              { label: "Business enquiries", value: "vinus@vinus.co.kr", detail: "TEL 02-3661-1907  /  FAX 02-3661-1906", href: "mailto:vinus@vinus.co.kr" },
              { label: "Open positions", value: "Join our team", detail: "We are always looking for talent.", href: "mailto:vinus@vinus.co.kr?subject=Open%20Position" },
              { label: "Korea office", value: "Suite 1202, 227 Gonghang-daero, Gangseo-gu, Seoul 07802", detail: "Seoul, Korea", href: "#" },
              { label: "Business hours", value: "Monday to Friday", detail: "10:00 AM – 18:00 PM · GMT (+9)" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className={`grid grid-cols-1 gap-4 py-8 md:min-h-[160px] md:grid-cols-[170px_1fr_auto] md:items-baseline md:gap-8 lg:py-10 ${index < 3 ? "border-b border-[#0d0d0d]/15" : ""}`}
              >
                <p className="text-sm font-semibold uppercase leading-[1.35]">{item.label}</p>
                <div>
                  {item.href ? (
                    <a href={item.href} className="text-xl font-medium leading-[1.35] hover:opacity-60">{item.value}</a>
                  ) : (
                    <p className="text-xl font-medium leading-[1.35]">{item.value}</p>
                  )}
                  <p className="mt-3 text-base leading-[1.45] text-[#0d0d0d]/55">{item.detail}</p>
                </div>
                {item.href && <ArrowUpRight className="hidden size-5 stroke-[1.2] md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INQUIRY REGISTRATION FORM */}
      <section className="w-full bg-[#f1f1ee] px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-6 border-b border-[#0d0d0d]/20 pb-14 md:grid-cols-12 md:items-end md:pb-20">
            <p className="text-sm font-medium uppercase md:col-span-3">Start a project</p>
            <div className="md:col-span-8 md:col-start-5">
              <h2 className="text-[clamp(3rem,5vw,6rem)] font-normal leading-[0.95]">
                Tell us about<br />your next project.
              </h2>
              <p className="mt-7 max-w-[680px] text-lg leading-[1.55] text-[#0d0d0d]/65">
                Share the essentials below. We&apos;ll review your request and get back to you with the right direction.
              </p>
            </div>
          </div>

            <form onSubmit={handleSubmit} className="mt-4">
              {/* Inputs Grid */}
              <div className="grid grid-cols-1 border-b border-[#0d0d0d]/20 py-14 md:grid-cols-12 md:gap-8 md:py-20">
                <p className="mb-10 text-sm font-medium uppercase md:col-span-3 md:mb-0">01 / Essentials</p>
                <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:col-span-8 md:col-start-5 md:grid-cols-2">
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Company Name</label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full border-b border-[#0d0d0d]/35 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-[#0d0d0d]/35 focus:border-black"
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Please write your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-[#0d0d0d]/35 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-[#0d0d0d]/35 focus:border-black"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Please enter contactable phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-[#0d0d0d]/35 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-[#0d0d0d]/35 focus:border-black"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Please write your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-[#0d0d0d]/35 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-[#0d0d0d]/35 focus:border-black"
                  />
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Project Budget *</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full cursor-pointer appearance-none border-b border-[#0d0d0d]/35 bg-transparent py-4 text-lg outline-none transition-colors focus:border-black"
                  >
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $30,000">$10,000 - $30,000</option>
                    <option value="Above $30,000">Above $30,000</option>
                  </select>
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Attachment</label>
                  <div className="relative flex items-center justify-between border-b border-[#0d0d0d]/35 py-2">
                    <span className="max-w-[250px] truncate text-lg text-[#0d0d0d]/45">
                      {formData.file ? formData.file.name : "Select a file to attach..."}
                    </span>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#0d0d0d]/25 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#0d0d0d] hover:text-white">
                      <Upload className="size-3.5" />
                      Browse
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                </div>
              </div>

              {/* Service Type Pills */}
              <div className="grid grid-cols-1 border-b border-[#0d0d0d]/20 py-14 md:grid-cols-12 md:gap-8 md:py-20">
                <p className="mb-10 text-sm font-medium uppercase md:col-span-3 md:mb-0">02 / Services</p>
                <div className="md:col-span-8 md:col-start-5">
                <label className="mb-5 block text-sm font-semibold uppercase text-[#0d0d0d]">Select all that apply *</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-base font-normal transition-all duration-200 active:scale-[0.97] ${
                          isSelected
                            ? "bg-[#0d0d0d] border-black text-white"
                            : "bg-transparent border-[#0d0d0d]/15 text-[#0d0d0d] hover:border-black"
                        }`}
                      >
                        {isSelected && <Check className="size-3.5" />}
                        {cat}
                      </button>
                    );
                  })}
                </div>
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 border-b border-[#0d0d0d]/20 py-14 md:grid-cols-12 md:gap-8 md:py-20">
                <p className="mb-10 text-sm font-medium uppercase md:col-span-3 md:mb-0">03 / Project brief</p>
                <div className="flex flex-col gap-4 md:col-span-8 md:col-start-5">
                <label className="text-sm font-semibold uppercase text-[#0d0d0d]">Project Details *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us about the project goals, timeline, and any specific requirements."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full resize-y border border-[#0d0d0d]/35 bg-white/45 p-5 text-lg outline-none transition-colors placeholder:text-[#0d0d0d]/35 focus:border-black"
                />
                </div>
              </div>

              {/* Submit Area */}
              <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-12 md:items-center md:pt-16">
                <p className="text-sm text-[#0d0d0d]/50 md:col-span-5 md:col-start-5">
                  Your inquiry will be sent directly to our team. We do not store your personal information.
                </p>
                <button
                  type="submit"
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#0d0d0d] px-8 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] md:col-span-3 md:justify-self-end"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
