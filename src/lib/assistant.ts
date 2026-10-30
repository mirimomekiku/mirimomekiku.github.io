import projects from "../types/projects";
import experience from "../types/experience";
import education from "../types/education";

export interface Action {
  label: string;
  href: string;
}
export interface Reply {
  text: string;
  actions?: Action[];
}

const EMAIL = "viernes.jhonlloydd@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jhon-lloyd-viernes/";
const GITHUB = "https://github.com/mirimomekiku";

const current = [...experience].reverse()[0];
const school = education[0];

const rules: { test: RegExp; reply: () => Reply }[] = [
  {
    test: /\b(hi|hello|hey|yo|sup)\b/,
    reply: () => ({
      text: "Hey! I'm a tiny bot that only knows what's on this page. Ask about my work, my stack, or how to reach me.",
    }),
  },
  {
    test: /who|about|yourself|introduce|designer|developer|you do/,
    reply: () => ({
      text: "I'm mirimomekiku, a software developer from Cagayan de Oro, Philippines. I build mobile apps, web experiences, and the backends behind them. It started with modding GTA and building custom Android ROMs in high school.",
      actions: [{ label: "Experience ↓", href: "#experience" }],
    }),
  },
  {
    test: /stack|tech|tools|language|framework|use\b|flutter|kotlin|react|laravel/,
    reply: () => ({
      text: "Mobile: Flutter, Dart, Kotlin, Jetpack Compose, Expo. Web: React, Next.js, Vite, Tailwind. Backend: Laravel, Node.js, Fastify, Express, MySQL, PostgreSQL, Prisma. For design and art: Figma, Aseprite, Godot.",
    }),
  },
  {
    test: /ship|build|process|how do you|workflow|architecture/,
    reply: () => ({
      text: "From the projects listed here: shared-package monorepos with typed contracts, background workers and queued email for the heavy lifting, school-isolated (multi-tenant) data, and Flutter or React front ends on top. Each project's notes have the details.",
      actions: [{ label: "See my work ↓", href: "#work" }],
    }),
  },
  {
    test: /work|project|portfolio|app\b|apps|made|made/,
    reply: () => ({
      text: `There are ${projects.length} projects on this page, from the AdaptiveHub platform (LMS, Library, payments, attendance, conferencing, help center), EDUCENTRA and Crest to personal apps like Checkpoint, Wavvy and Zync. Tap any card for its notes and screenshots.`,
      actions: [{ label: "See my work ↓", href: "#work" }],
    }),
  },
  {
    test: /experience|job|career|resume|cv|company|employ|history|currently|now\b/,
    reply: () => ({
      text: `Right now: ${current.position} (${current.period}), alongside my job at Antimony Technologies (Whipo). At Oronikola I build the Adaptive products: AdaptiveHub, Library, Pay and Station. Before that, a run of freelance work: frontend, full-stack with AI features, and automation.`,
      actions: [{ label: "Experience ↓", href: "#experience" }],
    }),
  },
  {
    test: /contact|email|reach|hire|available|availability|collab|chat|talk|message/,
    reply: () => ({
      text: `Email is the best way: ${EMAIL}. LinkedIn works too. For availability or collaborations, drop a line there and I'll reply.`,
      actions: [
        { label: "Email ↗", href: `mailto:${EMAIL}` },
        { label: "LinkedIn ↗", href: LINKEDIN },
      ],
    }),
  },
  {
    test: /where|location|based|live|time|timezone|country|philippines/,
    reply: () => ({
      text: "Cagayan de Oro, Philippines (UTC+8). The clock on the hero is my local time.",
    }),
  },
  {
    test: /school|education|study|degree|college|universit/,
    reply: () => ({
      text: `${school.degree} at ${school.school} (${school.date}), after TVL-ICT at Liceo de Cagayan University.`,
    }),
  },
  {
    test: /art|draw|sketch|pixel|music|playlist|hobby|hobbies|fun|game/,
    reply: () => ({
      text: "Off the clock: pixel art, sketching, games, and a few playlists. It's all in the Art section.",
      actions: [{ label: "Art ↓", href: "#art" }],
    }),
  },
  {
    test: /learn|kotlin|compose|next/,
    reply: () => ({
      text: "Currently learning Kotlin and Jetpack Compose for modern Android development.",
    }),
  },
  {
    test: /github|code|repo|source|open.?source/,
    reply: () => ({
      text: "My repos are on GitHub, including a few of the personal projects listed here.",
      actions: [{ label: "GitHub ↗", href: GITHUB }],
    }),
  },
  {
    test: /linkedin|social/,
    reply: () => ({
      text: "You can find me on LinkedIn and GitHub.",
      actions: [
        { label: "LinkedIn ↗", href: LINKEDIN },
        { label: "GitHub ↗", href: GITHUB },
      ],
    }),
  },
];

export function answer(question: string): Reply {
  const q = question.toLowerCase();
  for (const rule of rules) if (rule.test.test(q)) return rule.reply();
  return {
    text: "Hmm, I'm a tiny on-page bot and didn't catch that. Try “what's your stack?”, “who are you?”, or “how do I reach you?”.",
  };
}
