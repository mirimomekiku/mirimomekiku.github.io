export interface ProjectInterface {
  title: string;
  devices: string;
  description: string;
  images?: string[];
  link?: string;
  store?: string;
  year?: string;
  stack: string[];
  group?: "AdaptiveHub";
  category?: string[];
  highlights?: string[];
}

const A = "/assets/projects";

const projects: ProjectInterface[] = [
  {
    title: "AdaptiveHub LMS",
    devices: "Web, Android & iOS",
    group: "AdaptiveHub",
    description:
      "An adaptive learning platform that connects students, teachers, and school teams.",
    stack: ["Laravel", "Flutter", "MySQL"],
    category: ["Web", "Mobile", "AI & systems"],
    images: [1, 2, 3].map((n) => `${A}/adaptivehub/${n}.webp`),
    store:
      "https://play.google.com/store/apps/details?id=com.adaptivehub.mobile&hl=en",
    link: "https://adaptivehub.app",
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
    images: [1, 2, 3].map((n) => `${A}/adaptivelibrary/${n}.webp`),
    store:
      "https://play.google.com/store/apps/details?id=com.adaptivehub.library&hl=en",
    link: "https://library.adaptivehub.app",
    highlights: [
      "Multi-tenant catalogs, reservations, circulation, fines, and member support.",
      "EPUB/PDF access, bibliographic metadata, and AI-assisted cataloging.",
      "Mobile workflows for members and librarians, including camera-based scanning.",
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
    images: [`${A}/adaptivepay/1.png`],
    link: "https://payments.adaptivehub.app/",
    highlights: [
      "Laravel-to-Next.js migration organized as a shared-package monorepo.",
      "Exact-decimal money handling and shared contracts.",
      "Client and personnel workflows with background workers and queued email.",
    ],
  },
  {
    title: "AdaptiveHub Meet",
    devices: "Web",
    group: "AdaptiveHub",
    description: "Classroom conferencing connected to the learning platform.",
    stack: ["React", "TypeScript", "LiveKit"],
    category: ["Web", "AI & systems"],
    images: [`${A}/adaptivemeet/1.svg`],
    link: "http://meet.adaptivehub.app",
    highlights: [
      "Protected classroom handoff from the LMS.",
      "Short-lived conferencing tokens issued by the authenticated backend.",
      "LiveKit-based room experience with separate conferencing infrastructure.",
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
    highlights: [
      "Tenant-scoped availability, event types, and public booking flows.",
      "Interview loops, scorecards, workflows, and webhooks.",
      "Database-per-tenant architecture and enterprise SSO workflows.",
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
    images: [`${A}/oronikola/1.png`],
    link: "https://oronikola.org",
    highlights: [
      "Public product pages, blog discovery, and demo lead capture.",
      "React publisher dashboard with a TipTap editor and publication management.",
      "TypeScript monorepo with a headless API and shared MySQL schemas.",
    ],
  },
  {
    title: "Adaptive Help Center",
    devices: "Web",
    group: "AdaptiveHub",
    description:
      "A unified institutional support hub for the AdaptiveHub products.",
    stack: ["Laravel", "Inertia", "React"],
    category: ["Web"],
    images: [`${A}/helpcenter/1.png`],
    link: "https://support.adaptivehub.app",
    highlights: [
      "Authentication, verified-account dashboard, and account settings.",
      "A single place for institutions to reach support across products.",
    ],
  },
  {
    title: "SwitchDeals",
    devices: "Web & Android",
    description: "Find the best deals here on Nintendo eShop store!",
    images: [`${A}/switchdeals/1.jpg`],
    link: "https://switchdeals.vercel.app",
    stack: ["Next.js", "Expo"],
  },
  {
    title: "PSDrops",
    devices: "Web",
    description: "Find deals on PlayStation store.",
    images: [`${A}/psdrops/1.png`],
    link: "https://psdrops.vercel.app",
    stack: ["Next.js"],
  },
  {
    title: "Checkpoint",
    devices: "Android",
    description: "A game backlog tracker for Android.",
    images: [`${A}/playlog/1.jpg`],
    link: "https://play.google.com/store/apps/details?id=com.mirimomekiku.checkpoint",
    stack: ["Kotlin", "Jetpack Compose"],
  },
  {
    title: "Wavvy",
    devices: "Android",
    description:
      "A music player/downloader for Android, with custom native audio effects.",
    images: [`${A}/wavvy/1.jpg`],
    link: "https://github.com/dlord213/wavvy-flutter",
    stack: ["Flutter", "Dart", "Kotlin"],
  },
  {
    title: "QuickEase",
    category: ["Web", "Mobile", "AI & systems"],
    devices: "Web & Android",
    description:
      "A community-first forum with study assistant that helps you generate flashcards and quizzes effortlessly.",
    images: [`${A}/quickease/1.png`],
    link: "https://quickease.online/",
    stack: ["React", "Vite", "Fastify", "Expo"],
  },
  {
    title: "TheoryPocket",
    devices: "Android",
    description:
      "A comprehensive, interactive music theory and utility toolset built with Flutter",
    images: [`${A}/theorypocket/1.jpeg`],
    link: "https://github.com/dlord213/theorypocket",
    stack: ["Dart", "Flutter"],
  },
  {
    title: "Zync",
    devices: "Android/Windows/Linux",
    description:
      "A cross-platform peer-to-peer (P2P) file-sharing application designed for fast, local transfers between Android, Windows, and Linux devices.",
    images: [`${A}/zync/1.jpeg`],
    link: "https://github.com/dlord213/zync",
    stack: ["Dart", "Flutter"],
  },
];

export default projects;
