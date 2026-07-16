"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

const philosophies = [
  {
    tag: "think",
    title: "Asking and Answering",
    desc: "We deeply contemplate the essence of value. True planning starts in the process of asking questions and finding answers.",
    img: "/cloned/about_vertical.png",
  },
  {
    tag: "mind",
    title: "Detailing the Value",
    desc: "We add value in details. A difference in an unexpected, unseen place is what ultimately determines the level of completeness.",
    img: "/cloned/about_img.png",
  },
  {
    tag: "behavior",
    title: "Discovering Experience",
    desc: "We change the world by discovering experiences and practicing action. We realize the value of business to help our partners leap forward.",
    img: "/cloned/project-abstract-glass.png",
  },
];

const businessFields = [
  {
    title: "website",
    description: "Designing and developing web platforms optimized for brand and business value.",
    image: "/vinus/work/shinhan-easy.jpg",
  },
  {
    title: "mobile app",
    description: "Crafting intuitive and user-centered mobile UX/UI designs and application architectures.",
    image: "/vinus/work/macadamia.png",
  },
  {
    title: "branding",
    description: "Building unique brand identities and cohesive visual systems that express core values.",
    image: "/vinus/work/mongdang.png",
  },
];

const clientWork = [
  "Samsung", "LG CNS", "Daekyo", "Koscom", "Shinhan Financial Group",
  "KEPCO", "KT alpha", "Deloitte", "Hyundai", "NH Bank",
  "Lotte Cinema", "Samyang", "Nexon", "Hankook Tire", "CJ CheilJedang"
];

export default function StudioPage() {
  return (
    <main className="subpage-wrapper selection:bg-[#0d0d0d] selection:text-[#faf9f6]">
      {/* 1. HERO SECTION */}
      <section className="subpage-header">
        <div className="subpage-header-inner">
          <p className="subpage-eyebrow">Studio</p>
          <h1 className="subpage-title mt-6">
            We elevate essential<br />value with beauty.
          </h1>
          <p className="subpage-description">
            Even amidst the intense speed of a rapidly changing era, we focus on the unchanging essence of value, striving to create beautiful design that transcends structural and physical limits.
          </p>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION (think, mind, behavior) */}
      <section className="w-full border-b border-[#0d0d0d]/10 px-6 py-20 md:px-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-8 md:gap-y-12">
          {philosophies.map((philo, idx) => (
            <motion.div
              key={philo.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group flex flex-col ${
                idx === 0
                  ? "md:col-span-5"
                  : idx === 1
                    ? "md:col-span-3 md:col-start-7 md:mt-28"
                    : "md:col-span-4 md:col-start-9 md:mt-4"
              }`}
            >
              <div className={`relative w-full overflow-hidden bg-[#eae8e4] ${idx === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <Image
                  src={philo.img}
                  alt={philo.tag}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-102"
                />
              </div>
              <div className="mt-6">
                <span className="text-[var(--type-body-lg)] font-normal lowercase text-[#0d0d0d]/40">
                  ({philo.tag})
                </span>
                <h3 className="mt-3 text-2xl font-medium">{philo.title}</h3>
                <p className="mt-4 text-[var(--type-body-lg)] font-normal leading-[1.55] text-[#0d0d0d]/65">
                  {philo.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. VISION SECTION (Spread the Beautiful Things) */}
      <section className="w-full border-b border-[#0d0d0d]/10 px-6 py-20 md:px-16 md:py-28">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-6 lg:pr-12"
          >
            <span className="text-xs uppercase tracking-widest text-[#0d0d0d]/50 font-medium">Our Vision</span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[0.9] tracking-[-0.05em] mt-6">
              Spread the<br />Beautiful Things
            </h2>
            <p className="mt-8 max-w-[620px] text-[var(--type-body-lg)] font-normal leading-[1.55] text-[#0d0d0d]/70">
              We believe the visual works we create will change tomorrow&apos;s world to be more beautiful than today.
            </p>

            {/* Formula / Pills */}
            <div className="mt-12 flex flex-wrap items-center gap-3 text-sm md:text-base font-light">
              <span className="bg-[#eae8e4] px-5 py-2.5 rounded-full text-black font-medium tracking-tight">
                vinus <span className="text-xs font-light text-black/50 ml-1">(beauty)</span>
              </span>
              <span className="text-black/40">+</span>
              <span className="bg-[#eae8e4] px-5 py-2.5 rounded-full text-black font-medium tracking-tight">
                virus <span className="text-xs font-light text-black/50 ml-1">(inspiration)</span>
              </span>
              <span className="text-black/40">+</span>
              <span className="bg-[#0d0d0d] px-5 py-2.5 rounded-full text-white font-medium tracking-tight">
                spread <span className="text-xs font-light text-white/50 ml-1">(action)</span>
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden lg:col-span-5 lg:col-start-8"
          >
            <Image
              src="/cloned/brands_vertical.png"
              alt="VINUSPREAD visual perspective"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. BUSINESS FIELDS SECTION */}
      <section className="w-full border-b border-[#0d0d0d]/10 px-6 py-20 md:px-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-xs uppercase tracking-widest text-[#0d0d0d]/50 font-medium">Field of Business</h2>
            <p className="mt-6 max-w-[640px] text-[var(--type-body-lg)] font-normal leading-[1.55] text-[#0d0d0d]/70">
              We provide optimized digital services, enabling users to interact easily and comfortably across digital touchpoints.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {businessFields.map((field, index) => (
            <motion.div
              key={field.title}
              initial={{ opacity: 0, y: 54 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="group flex flex-col border-t border-[#0d0d0d]/10 pt-5"
            >
              <div className="relative mb-7 aspect-[16/10] overflow-hidden bg-[#eae8e4]">
                <Image
                  src={field.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div>
                <h3 className="text-2xl font-light uppercase tracking-tight text-[#0d0d0d] font-sans">
                  {field.title}
                </h3>
                <p className="mt-6 text-[var(--type-body)] font-normal leading-[1.6] text-[#0d0d0d]/65">
                  {field.description}
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="size-8 rounded-full border border-[#0d0d0d]/10 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CLIENTS SECTION */}
      <section className="w-full px-6 py-20 md:px-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <h2 className="text-xs uppercase tracking-widest text-[#0d0d0d]/50 font-medium">Client</h2>
            <p className="mt-6 text-[clamp(1.5rem,3.2vw,3rem)] font-normal leading-[1.15] tracking-tight text-[#0d0d0d] max-w-[950px]">
              New value begins with the connection between people. We do work that moves people&apos;s hearts.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-8 border-t border-[#0d0d0d]/10 pt-12">
          {clientWork.map((client) => (
            <div key={client} className="flex items-center text-sm font-medium tracking-tight text-[#0d0d0d]/60 uppercase hover:text-black transition-colors">
              {client}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
