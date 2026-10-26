export interface ProjectInterface {
  title: string;
  devices: string;
  description: string;
  imageSrc?: string;
  link?: string;
  stack: string[];
  group?: "AdaptiveHub";
  category?: string[];
  highlights?: string[];
  mark?: string;
  color?: string;
}

const projects: ProjectInterface[] = [
  {
    title: "AdaptiveHub LMS",
    devices: "Web, Android & iOS",
    group: "AdaptiveHub",
    description:
      "An adaptive learning platform that connects students, teachers, and school teams.",
    stack: ["Laravel", "Flutter", "MySQL"],
    category: ["Web", "Mobile", "AI & systems"],
    mark: "ah",
    color: "blue",
    highlights: [
      "School-isolated academic workflows across web and Flutter mobile apps.",
      "Assessments, mastery practice, AI-assisted grading, and learning materials.",
      "XP, streaks, badges, messaging, and real-time classroom updates.",
    ],
  },
  {
    title: "Adaptive Library",
    devices: "Web & Mobile",
    group: "AdaptiveHub",
    description:
      "A connected library experience, from catalog discovery to the circulation desk.",
    stack: ["Laravel", "Expo", "React Native"],
    category: ["Web", "Mobile", "AI & systems"],
    mark: "al",
    color: "green",
    highlights: [
      "Multi-tenant catalogs, reservations, circulation, fines, and member support.",
      "EPUB/PDF access, bibliographic metadata, and AI-assisted cataloging.",
      "Mobile workflows for members and librarians, including camera-based scanning.",
    ],
  },
  {
    title: "Crest",
    devices: "Web & Mobile",
    group: "AdaptiveHub",
    description:
      "One workspace for school technology CRM, revenue operations, HR, and payroll.",
    stack: ["Next.js", "MySQL", "Expo"],
    category: ["Web", "Mobile", "AI & systems"],
    mark: "cr",
    color: "lavender",
    highlights: [
      "Client-school records, sales pipelines, contracts, and subscriptions.",
      "Billing, verified payments, collections, inventory, and service delivery.",
      "Role-based employee portals, attendance, HR, and payroll.",
    ],
  },
  {
    title: "AdaptivePay",
    devices: "Web",
    group: "AdaptiveHub",
    description:
      "A school billing and payment workspace with connected client and personnel portals.",
    stack: ["Next.js", "Drizzle", "MySQL"],
    category: ["Web", "AI & systems"],
    mark: "ap",
    color: "peach",
    highlights: [
      "Laravel-to-Next.js migration organized as a shared-package monorepo.",
      "Exact-decimal money handling and shared contracts for Crest integration.",
      "Client and personnel workflows with background workers and queued email.",
    ],
  },
  {
    title: "Adaptive Station",
    devices: "Web & Flutter Mobile",
    group: "AdaptiveHub",
    description:
      "Offline-first school attendance, with RFID kiosks and family updates.",
    stack: ["Laravel", "React", "Flutter"],
    category: ["Web", "Mobile", "AI & systems"],
    mark: "as",
    color: "blue",
    highlights: [
      "RFID taps saved locally before syncing, with duplicate-safe recovery.",
      "School administration, card assignments, station health, and reports.",
      "Parent and student attendance views, push alerts, and Android SMS gateway builds.",
    ],
  },
  {
    title: "EDUCENTRA",
    devices: "Web",
    group: "AdaptiveHub",
    description:
      "An academic innovation platform connecting research, institutions, and emerging ventures.",
    stack: ["React", "Express", "TypeScript"],
    category: ["Web", "AI & systems"],
    mark: "ec",
    color: "green",
    highlights: [
      "Research, intellectual property, extension programs, and institutional partnerships.",
      "Problem matching, investors, startups, and an incubation pipeline.",
      "Migration from Laravel/Inertia to a React and Express monorepo with shared API contracts and real-time events.",
    ],
  },
  {
    title: "Adaptive Human Resource",
    devices: "Web",
    group: "AdaptiveHub",
    description:
      "Scheduling and recruitment automation that adapts to how teams work.",
    stack: ["Laravel", "Inertia", "React"],
    category: ["Web", "AI & systems"],
    mark: "hr",
    color: "lavender",
    highlights: [
      "Tenant-scoped availability, event types, and public booking flows.",
      "Interview loops, scorecards, workflows, and webhooks.",
      "Database-per-tenant architecture and enterprise SSO workflows.",
    ],
  },
  {
    title: "AdaptiveHub Meet",
    devices: "Web",
    group: "AdaptiveHub",
    description: "Classroom conferencing connected to the learning platform.",
    stack: ["React", "TypeScript", "LiveKit"],
    category: ["Web", "AI & systems"],
    mark: "am",
    color: "peach",
    highlights: [
      "Protected classroom handoff from the LMS.",
      "Short-lived conferencing tokens issued by the authenticated backend.",
      "LiveKit-based room experience with separate conferencing infrastructure.",
    ],
  },
  {
    title: "AdaptiveHub AI",
    devices: "Backend service",
    group: "AdaptiveHub",
    description:
      "A dedicated AI backend for curriculum-grounded mastery question generation.",
    stack: ["Bun", "Hono", "TypeScript"],
    category: ["AI & systems"],
    mark: "ai",
    color: "lavender",
    highlights: [
      "Mastery Bank generation extracted from the Laravel monolith.",
      "LLM routing, tenant database pooling, telemetry, and BullMQ jobs.",
      "Question generation structured around learning types and proficiency levels.",
    ],
  },
  {
    title: "KAWAY Mobile",
    devices: "Android & iOS",
    group: "AdaptiveHub",
    description:
      "Companion apps for commuters and drivers sharing one Flutter foundation.",
    stack: ["Flutter", "Dart", "Maps"],
    category: ["Mobile"],
    mark: "kw",
    color: "green",
    highlights: [
      "Separate commuter and driver app flavors with shared sign-in and design.",
      "Driver onboarding, vehicle verification, routes, and foreground GPS updates.",
      "Commuter live maps, waiting pins, trip tracking, and booking on eligible routes.",
    ],
  },
  {
    title: "Oronikola",
    devices: "Web",
    group: "AdaptiveHub",
    description:
      "A company marketing site and publishing workspace built on a shared API.",
    stack: ["Astro", "React", "Express", "Drizzle"],
    category: ["Web"],
    mark: "or",
    color: "peach",
    highlights: [
      "Public product pages, blog discovery, and demo lead capture.",
      "React publisher dashboard with a TipTap editor and publication management.",
      "TypeScript monorepo with a headless API and shared MySQL schemas.",
    ],
  },
  {
    title: "Help Center",
    devices: "Web · Foundation",
    group: "AdaptiveHub",
    description:
      "An early web application foundation for a dedicated help-center experience.",
    stack: ["Laravel", "Inertia", "React"],
    category: ["Web"],
    mark: "hc",
    color: "blue",
    highlights: [
      "Initial Laravel and React application scaffold.",
      "Authentication, verified-account dashboard, and account settings.",
      "Early application foundation, with dedicated support workflows still to follow.",
    ],
  },
  {
    title: "SwitchDeals",
    devices: "Web & Android",
    description: "Find the best deals here on Nintendo eShop store!",
    imageSrc: "/assets/projects/switchdeals/1.jpg",
    link: "https://switchdeals.vercel.app",
    stack: ["Next.js", "Expo"],
  },
  {
    title: "PSDrops",
    devices: "Web",
    description: "Find deals on PlayStation store.",
    imageSrc: "/assets/projects/psdrops/1.png",
    link: "https://psdrops.vercel.app",
    stack: ["Next.js"],
  },
  {
    title: "Checkpoint",
    devices: "Android",
    description: "A game backlog tracker for Android.",
    imageSrc: "/assets/projects/playlog/1.jpg",
    link: "https://play.google.com/store/apps/details?id=com.mirimomekiku.checkpoint",
    stack: ["Kotlin", "Jetpack Compose"],
  },
  {
    title: "Wavvy",
    devices: "Android",
    description:
      "A music player/downloader for Android, with custom native audio effects.",
    imageSrc: "/assets/projects/wavvy/1.jpg",
    link: "https://github.com/dlord213/wavvy-flutter",
    stack: ["Flutter", "Dart", "Kotlin"],
  },
  {
    title: "QuickEase",
    category: ["Web", "Mobile", "AI & systems"],
    devices: "Web & Android",
    description:
      "A community-first forum with study assistant that helps you generate flashcards and quizzes effortlessly.",
    imageSrc: "/assets/projects/quickease/1.png",
    link: "https://quickease.online/",
    stack: ["React", "Vite", "Fastify", "Expo"],
  },
  {
    title: "TheoryPocket",
    devices: "Android",
    description:
      "A comprehensive, interactive music theory and utility toolset built with Flutter",
    imageSrc: "/assets/projects/theorypocket/1.jpeg",
    link: "https://github.com/dlord213/theorypocket",
    stack: ["Dart", "Flutter"],
  },
  {
    title: "Zync",
    devices: "Android/Windows/Linux",
    description:
      "A cross-platform peer-to-peer (P2P) file-sharing application designed for fast, local transfers between Android, Windows, and Linux devices.",
    imageSrc: "/assets/projects/zync/1.jpeg",
    link: "https://github.com/dlord213/zync",
    stack: ["Dart", "Flutter"],
  },
];

export default projects;
