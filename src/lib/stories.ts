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
    title: "Why You Shouldn't Choose Brand Colors by Instinct",
    excerpt:
      "Color decisions become stronger when they begin with a clear principle rather than personal preference.",
    date: "2026.04.20",
    category: "Insight",
    image: "/vinus/dummy-photo/story-01.jpg",
    intro:
      "Color is one of the fastest ways people recognize a brand, but recognition alone does not make a color system useful. A strong palette starts with the role the brand needs to play.",
    sections: [
      {
        heading: "Begin with meaning",
        paragraphs: [
          "Before choosing a hue, define the impression the brand should leave and the situations in which the color must work. This gives every later decision a clear reason.",
          "A color that feels attractive in isolation may behave very differently across products, interfaces, campaigns, and physical environments.",
        ],
      },
      {
        heading: "Build a system, not a swatch",
        paragraphs: [
          "Primary colors create recognition. Supporting colors establish hierarchy, states, contrast, and accessibility. Together they should operate as one practical system.",
          "Testing the palette in real layouts reveals more than comparing samples on a mood board. Context shows whether the brand remains clear, flexible, and consistent.",
        ],
      },
    ],
    tags: ["Brand", "Color system", "Identity"],
  },
  {
    slug: "design-principles",
    title: "What Happens Without Design Principles",
    excerpt:
      "Consistent standards keep every design decision moving in one clear direction.",
    date: "2026.05.22",
    category: "Insight",
    image: "/vinus/dummy-photo/story-02.jpg",
    intro:
      "Design principles make judgment visible. They help a team explain why one direction fits the product better than another and keep decisions connected as the work grows.",
    sections: [
      {
        heading: "A shared basis for decisions",
        paragraphs: [
          "Without principles, feedback is easily reduced to personal preference. The loudest opinion wins and the product changes direction from one review to the next.",
          "A small set of clear principles gives teams a shared language for evaluating ideas without removing room for exploration.",
        ],
      },
      {
        heading: "Principles should guide action",
        paragraphs: [
          "Useful principles are specific enough to influence a real design choice. They describe what the experience should prioritize and how the product should behave under pressure.",
          "When principles are used continuously, consistency becomes the result of aligned decisions rather than rigid repetition.",
        ],
      },
    ],
    tags: ["Design system", "Principles", "Collaboration"],
  },
  {
    slug: "ux-writing-single-button",
    title: "UX Writing: How to Start with a Single Button",
    excerpt:
      "Even the wording of one button shapes the next action and the direction of an experience.",
    date: "2026.05.01",
    category: "Insight",
    image: "/vinus/dummy-photo/story-03.jpg",
    intro:
      "A button is a compact promise. Its words tell people what will happen next, how much effort is required, and whether the action feels safe to take.",
    sections: [
      {
        heading: "Write for the next moment",
        paragraphs: [
          "Good interface writing focuses on the action and its result. Labels such as Continue or Submit can be vague when the next screen or outcome is not already obvious.",
          "A specific label reduces hesitation because it helps users predict the immediate consequence of their choice.",
        ],
      },
      {
        heading: "Test words inside the flow",
        paragraphs: [
          "A button cannot be judged apart from the message, form, or task around it. The surrounding context determines how much explanation the label needs.",
          "Reviewing the complete journey helps teams keep language consistent and prevents small wording decisions from creating larger usability problems.",
        ],
      },
    ],
    tags: ["UX writing", "Product design", "Interaction"],
  },
] as const;

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
