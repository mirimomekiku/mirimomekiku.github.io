import ReactLenis from "lenis/react";
import projects from "./types/projects";
import education from "./types/education";
import images from "./types/images";

import { SparklesText } from "./component/sparkle_text";
import { Highlighter } from "./component/highlighter";
import {
  Mail,
  Linkedin,
  Github,
  Briefcase,
  User2,
  GalleryHorizontal,
  Music,
} from "lucide-react";
import { useState } from "react";

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabClass = (index: number) =>
    `cursor-pointer transition-colors duration-200 ${tabIndex === index ? "text-rose-700" : "text-rose-900/30 hover:text-rose-900"}`;

  return (
    <>
      <ReactLenis root />
      <main className="flex flex-col xl:grid xl:grid-cols-[0.4fr_1fr] gap-16 my-16 max-w-7xl xl:mx-auto mx-8">
        <div className="hidden xl:flex flex-col gap-8 p-8 overflow-hidden rounded-3xl xl:min-h-[85vh] xl:max-h-[85vh] 2xl:min-h-[80vh] 2xl:max-h-[80vh] 3xl:min-h-[70vh] 3xl:max-h-[70vh] sticky top-8 justify-end pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <img
            src="./assets/images/profile.jpeg"
            className="absolute inset-0 -z-20 w-full h-full object-cover blur-[1px]"
            alt="Profile Background"
          />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-rose-950 via-rose-950/40 to-transparent" />

          <h1 className="text-rose-100 text-5xl font-bold relative">
            Jhon Lloyd Viernes
          </h1>
          <div className="flex flex-row gap-6 flex-wrap">
            <a target="_blank" href="mailto:viernes.jhonlloydd@gmail.com">
              <Mail size={28} className="shrink-0 text-rose-300" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
            >
              <Linkedin size={28} className="shrink-0 text-rose-300" />
            </a>
            <a target="_blank" href="https://github.com/dlord213">
              <Github size={28} className="shrink-0 text-rose-300" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row px-6 py-2 bg-rose-100 rounded-3xl w-fit gap-6 lg:gap-8 items-center">
            <div
              className={`tooltip ${tabClass(0)}`}
              data-tip="About me"
              onClick={() => setTabIndex(0)}
            >
              <User2 />
            </div>
            <div
              className={`tooltip ${tabClass(1)}`}
              data-tip="Education"
              onClick={() => setTabIndex(1)}
            >
              <Briefcase />
            </div>
            <div
              className={`tooltip ${tabClass(2)}`}
              data-tip="Arts"
              onClick={() => setTabIndex(2)}
            >
              <GalleryHorizontal />
            </div>
            <div
              className={`tooltip ${tabClass(3)}`}
              data-tip="Music"
              onClick={() => setTabIndex(3)}
            >
              <Music />
            </div>
          </div>

          {tabIndex == 0 && (
            <>
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SparklesText>
                  <h1 className="text-6xl text-center lg:text-left lg:text-8xl font-black">
                    SOFTWARE<br></br>
                    <Highlighter action="underline" animationDuration={1500}>
                      <span className="text-rose-300">DEVELOPER</span>
                    </Highlighter>
                  </h1>
                </SparklesText>
                <p className="text-rose-900 text-xl font-medium">
                  From modding GTA and building custom Android ROMs in high
                  school, my passion for tech runs deep. Nowadays, I focus
                  primarily on mobile development and backend engineering, while
                  maintaining a strong commitment to accessible design. Off the
                  clock, I explore new tech, game, and enjoy music.
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-1 flex-col">
                  <h1 className="text-4xl font-black">1+</h1>
                  <p className="text-rose-900 opacity-50">
                    YEARS OF EXPERIENCE
                  </p>
                </div>
                <div className="flex flex-1 flex-col">
                  <h1 className="text-4xl font-black">500K+</h1>
                  <p className="text-rose-900 opacity-50">
                    LINES OF CODE WRITTEN
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-5xl font-black text-rose-800">
                  CURRENTLY WORKING AT
                </h1>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 lg:items-center">
                  <div className="flex flex-col flex-1">
                    <h1 className="text-2xl font-bold">
                      Antimony Technologies
                    </h1>
                    <p className="text-rose-900 opacity-50">
                      Mobile Developer (Flutter) / Backend Developer
                    </p>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h1 className="text-2xl font-bold">
                      Cerebrox IT Solutions
                    </h1>
                    <p className="text-rose-900 opacity-50">
                      Mobile Developer (Flutter)
                    </p>
                  </div>
                </div>
              </div>
              {/* <div
                className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2"
                id="stack"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-rose-900/50 tracking-wider">
                      FRONTEND
                    </h2>
                    <div className="flex flex-row flex-wrap gap-3">
                      {[
                        "Next.js",
                        "React",
                        "Tailwind CSS",
                        "Vite",
                        "TypeScript",
                        "Figma",
                        "Flutter",
                        "React Native",
                        "React Router",
                      ].map((s, i) => (
                        <p
                          key={i}
                          className="px-5 py-2 rounded-full bg-rose-100 text-rose-900 font-semibold text-sm"
                        >
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-rose-900/50 tracking-wider">
                      BACKEND
                    </h2>
                    <div className="flex flex-row flex-wrap gap-3">
                      {[
                        "Next.js",
                        "Fastify",
                        "Express",
                        "Laravel",
                        "Node.js",
                        "PocketBase",
                        "Supabase",
                        "Firebase",
                      ].map((s, i) => (
                        <p
                          key={i}
                          className="px-5 py-2 rounded-full bg-rose-100 text-rose-900 font-semibold text-sm"
                        >
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-rose-900/50 tracking-wider">
                      DATABASE
                    </h2>
                    <div className="flex flex-row flex-wrap gap-3">
                      {[
                        "PostgreSQL",
                        "MySQL",
                        "Prisma",
                        "Sequelize",
                        "Drizzle",
                      ].map((s, i) => (
                        <p
                          key={i}
                          className="px-5 py-2 rounded-full bg-rose-100 text-rose-900 font-semibold text-sm"
                        >
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-rose-900/50 tracking-wider">
                      TOOLS
                    </h2>
                    <div className="flex flex-row flex-wrap gap-3">
                      {[
                        "Adobe Photoshop",
                        "Adobe Illustrator",
                        "Git",
                        "GitHub",
                      ].map((s, i) => (
                        <p
                          key={i}
                          className="px-5 py-2 rounded-full bg-rose-100 text-rose-900 font-semibold text-sm"
                        >
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                {projects.map((project) => (
                  <a
                    href={project.link}
                    target="_blank"
                    className="flex flex-col relative justify-center transition-all delay-0 duration-300 hover:scale-105"
                  >
                    <img
                      src={project.imageSrc}
                      className="rounded-xl absolute w-full h-full object-cover brightness-[0.5] -z-10"
                    />
                    <div className="p-4">
                      <h1 className="font-bold text-white text-4xl">
                        {project.title}
                      </h1>
                      <p className="text-white/50">{project.devices}</p>
                      <p className="text-white/50">{project.description}</p>
                      <div className="flex flex-row gap-2 items-center mt-2">
                        {project.stack.map((s) => (
                          <p className="px-4 py-1 rounded-3xl bg-black/50 text-white">
                            {s}
                          </p>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {tabIndex == 1 && (
            <div
              className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
              id="education"
            >
              <h1 className="text-4xl font-bold">Education</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {education.map((e) => (
                  <div className="flex flex-row gap-4">
                    <img
                      src={e.imageSrc}
                      className="w-[48px] aspect-square object-contain lg:w-[160px]"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">{e.degree}</p>
                      <div>
                        <h1 className="font-bold text-base-content/50">
                          {e.school}
                        </h1>
                        <p className="text-sm text-base-content/50 italic">
                          {e.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tabIndex == 2 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {images.map((image) => (
                <img
                  src={image.src}
                  className="w-full h-full aspect-square object-contain rounded-3xl"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {tabIndex == 3 && (
            <div className="flex flex-col gap-4 flex-wrap">
              <div className="mb-8">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1852158159&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/mirimomekiku"
                    title="mirimomekiku"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    mirimomekiku
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/mirimomekiku/sets/untitled"
                    title=". untitled ."
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    . untitled .
                  </a>
                </div>
              </div>
              <div className="mb-8">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1653426820&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/mirimomekiku"
                    title="mirimomekiku"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    mirimomekiku
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/mirimomekiku/sets/1a-1"
                    title="[ 1 ]"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    [ 1 ]
                  </a>
                </div>
              </div>
              <div className="mb-8">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1447603840&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/mirimomekiku"
                    title="mirimomekiku"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    mirimomekiku
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/mirimomekiku/sets/self"
                    title="- self"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    - self
                  </a>
                </div>
              </div>
              <div className="mb-8">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1440835774&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/mirimomekiku"
                    title="mirimomekiku"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    mirimomekiku
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/mirimomekiku/sets/may-18"
                    title="MAY 18."
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    MAY 18.
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
