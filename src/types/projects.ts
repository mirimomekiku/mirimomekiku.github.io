interface ProjectInterface {
  title: string;
  devices: string;
  description: string;
  imageSrc: string;
  link: string;
  stack: string[];
}

const projects: ProjectInterface[] = [
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
    link: "https://github.com/dlord213/playlog",
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
];

export default projects;
