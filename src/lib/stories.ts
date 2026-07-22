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
  {
    slug: "product-language-experience",
    title: "When Product Language Changes the Experience",
    excerpt: "Clear product language helps users understand what happened and what to do next.",
    date: "2026.06.04", category: "Insight", image: "/vinus/dummy-photo/story-04.png",
    intro: "Product language is part of the interface. Clear words reduce uncertainty, explain system behavior, and help people move forward with confidence.",
    sections: [{ heading: "Make every state understandable", paragraphs: ["Useful language explains what happened without forcing users to decode the interface.", "Labels, confirmations, and recovery messages should work together as one coherent conversation."] }],
    tags: ["Product language", "UX writing", "Experience"],
  },
  {
    slug: "small-brand-system-scale",
    title: "How a Small Brand System Begins to Scale",
    excerpt: "A useful brand system starts with repeated decisions and grows into shared standards.",
    date: "2026.06.18", category: "Insight", image: "/vinus/dummy-photo/story-05.png",
    intro: "A brand system becomes valuable when it turns recurring choices into clear, reusable standards.",
    sections: [{ heading: "Start with repeated decisions", paragraphs: ["The strongest foundations often begin with the patterns a team already uses every day.", "Documenting those patterns creates consistency without removing flexibility."] }],
    tags: ["Brand system", "Identity", "Scale"],
  },
  {
    slug: "interface-hierarchy",
    title: "Where Interface Hierarchy Begins",
    excerpt: "Clear information order reduces effort and helps users read the screen faster.",
    date: "2026.07.02", category: "Insight", image: "/vinus/dummy-photo/story-06.png",
    intro: "Interface hierarchy begins by deciding what people need first, then shaping every visual relationship around that priority.",
    sections: [{ heading: "Order before decoration", paragraphs: ["Scale, contrast, spacing, and position should express the sequence in which information matters.", "A clear order lets people understand the screen before they begin reading every detail."] }],
    tags: ["Interface", "Hierarchy", "UX"],
  },
  {
    slug: "better-design-feedback",
    title: "How Better Feedback Moves Design Forward",
    excerpt: "Useful feedback aligns teams around goals, not personal taste.",
    date: "2026.07.16", category: "Insight", image: "/vinus/dummy-photo/story-07.png",
    intro: "Good feedback connects a design decision to the outcome the team is trying to create.",
    sections: [{ heading: "Discuss the goal", paragraphs: ["Feedback becomes actionable when it names the user need, business objective, or design principle at stake.", "A shared goal turns critique into progress instead of a debate about preference."] }],
    tags: ["Feedback", "Collaboration", "Process"],
  },
  {
    slug: "practical-ai-design",
    title: "A Practical Way to Bring AI into Design",
    excerpt: "AI works best when it expands exploration while people keep the criteria clear.",
    date: "2026.08.01", category: "Insight", image: "/vinus/dummy-photo/story-08.png",
    intro: "AI is most useful as part of a deliberate design process, extending exploration while leaving judgment with the team.",
    sections: [{ heading: "Keep the criteria human", paragraphs: ["Clear objectives make generated options easier to evaluate and refine.", "The quality of the outcome still depends on the questions, constraints, and decisions people bring to the work."] }],
    tags: ["AI", "Design process", "Exploration"],
  },
  {
    slug: "service-details-trust",
    title: "How Service Details Build Trust",
    excerpt: "Small moments such as loading, errors, and confirmations shape how reliable a product feels.",
    date: "2026.08.14", category: "Insight", image: "/vinus/dummy-photo/story-09.png",
    intro: "Trust is built through the small service moments that show people what is happening and what they can do next.",
    sections: [{ heading: "Design the in-between moments", paragraphs: ["Loading, empty, error, and confirmation states are part of the core experience.", "Thoughtful details reduce uncertainty and make the service feel dependable."] }],
    tags: ["Service design", "Trust", "Details"],
  },
  {
    slug: "visual-consistency-brand-memory",
    title: "Why Visual Consistency Builds Brand Memory",
    excerpt: "Repeated visual language helps people recognize a brand faster across different contexts.",
    date: "2026.08.28", category: "Insight", image: "/vinus/dummy-photo/story-10.png",
    intro: "Consistent visual signals make a brand easier to recognize, understand, and remember wherever it appears.",
    sections: [{ heading: "Repeat with purpose", paragraphs: ["Consistency comes from recurring relationships between type, color, imagery, motion, and space.", "A flexible system preserves those relationships while allowing each expression to fit its context."] }],
    tags: ["Visual identity", "Consistency", "Brand memory"],
  },
] as const;

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
