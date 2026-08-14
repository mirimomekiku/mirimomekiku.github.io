import ReactLenis from "lenis/react";
import projects from "./types/projects";
import education from "./types/education";
import images from "./types/images";

import { SparklesText } from "./component/sparkle_text";
import { Highlighter } from "./component/highlighter";
import { BubbleBackground } from "./component/bubble_background";
import { RetroGrid } from "./component/retro_grid";
import {
  Mail,
  Linkedin,
  Github,
  Briefcase,
  User2,
  GalleryHorizontal,
  Music,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (lightboxIndex === null && !profileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setProfileOpen(false);
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i! - 1 + images.length) % images.length);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i! + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, profileOpen]);

  const tabClass = (index: number) =>
    `cursor-pointer transition-all duration-300 rounded-full p-3 ${
      tabIndex === index
        ? "bg-rose-300 text-white shadow-lg shadow-rose-300/30 scale-110"
        : "text-rose-400 hover:text-rose-600 hover:bg-rose-100"
    }`;

  return (
    <>
      <ReactLenis root />
      <BubbleBackground />
      <RetroGrid
        className="z-[1]"
        angle={65}
        cellSize={40}
        opacity={0.12}
        lightLineColor="rgba(244,114,182,0.4)"
      />

      <main className="flex flex-col min-h-screen relative z-10">
        {/* Mobile Header */}
        <header className="flex flex-col items-center gap-4 pt-12 pb-6 px-6 md:hidden">
          <div className="relative cursor-pointer" onClick={() => setProfileOpen(true)}>
            <img
              src="./assets/images/profile.jpeg"
              className="w-28 h-28 rounded-full object-cover border-4 border-rose-300 shadow-xl shadow-rose-300/30 hover:scale-105 transition-transform duration-300"
              alt="Profile"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
              <span className="text-white text-xs">✦</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-rose-800">Jhon Lloyd Viernes</h1>
          <p className="text-rose-500 text-sm">Software Developer</p>
          <div className="flex flex-row gap-4">
            <a target="_blank" href="mailto:viernes.jhonlloydd@gmail.com" className="p-2 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors">
              <Mail size={20} />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/jhon-lloyd-viernes/" className="p-2 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors">
              <Linkedin size={20} />
            </a>
            <a target="_blank" href="https://github.com/dlord213" className="p-2 rounded-full bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors">
              <Github size={20} />
            </a>
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-[0.35fr_1fr] gap-8 lg:gap-12 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 lg:my-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex flex-col items-center gap-5 py-10 px-6 lg:sticky lg:top-8 lg:min-h-[80vh] lg:max-h-[80vh] justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {/* Floating decorations */}
            <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-rose-300/40 float" style={{ animationDelay: "0s" }} />
            <div className="absolute top-16 right-10 w-2 h-2 rounded-full bg-pink-400/50 float" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-20 left-12 w-4 h-4 rounded-full bg-rose-200/50 float" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/3 right-6 w-2.5 h-2.5 rounded-full bg-rose-400/30 float" style={{ animationDelay: "1.5s" }} />

            {/* Profile image with ring */}
            <div className="relative mb-2 cursor-pointer group" onClick={() => setProfileOpen(true)}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 animate-spin" style={{ animationDuration: "8s" }} />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-rose-50" />
              <img
                src="./assets/images/profile.jpeg"
                className="relative w-36 h-36 2xl:w-48 2xl:h-48 rounded-full object-cover border-4 border-white shadow-xl shadow-rose-200/40 group-hover:scale-105 transition-transform duration-300"
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-green-400 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                <span className="text-white text-sm">✦</span>
              </div>
            </div>

            {/* Name & role */}
            <div className="text-center flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold text-rose-800">Jhon Lloyd Viernes</h1>
              <p className="text-rose-400 text-sm tracking-wide">Software Developer</p>
            </div>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />

            {/* Bio */}
            <p className="text-rose-600/70 text-sm text-center leading-relaxed max-w-[260px]">
              Crafting mobile & web experiences with a passion for clean code and accessible design.
            </p>

            {/* Social links */}
            <div className="flex flex-row gap-3">
              <a target="_blank" href="mailto:viernes.jhonlloydd@gmail.com" className="p-3 rounded-2xl bg-white/60 backdrop-blur-sm text-rose-400 hover:bg-rose-100 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-sm border border-rose-100/50">
                <Mail size={20} />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/jhon-lloyd-viernes/" className="p-3 rounded-2xl bg-white/60 backdrop-blur-sm text-rose-400 hover:bg-rose-100 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-sm border border-rose-100/50">
                <Linkedin size={20} />
              </a>
              <a target="_blank" href="https://github.com/dlord213" className="p-3 rounded-2xl bg-white/60 backdrop-blur-sm text-rose-400 hover:bg-rose-100 hover:text-rose-600 hover:scale-110 transition-all duration-300 shadow-sm border border-rose-100/50">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 pb-24 lg:pb-12">
            {/* Tab Navigation - Desktop: top sticky, Mobile: bottom floating */}
            <div className="hidden lg:flex flex-row px-3 py-2 bg-white/60 backdrop-blur-md rounded-full w-fit gap-2 items-center shadow-lg shadow-rose-200/20 border border-rose-100/50 sticky top-2 z-30">
              {[
                { icon: User2, label: "About" },
                { icon: Briefcase, label: "Education" },
                { icon: GalleryHorizontal, label: "Arts" },
                { icon: Music, label: "Music" },
              ].map((tab, i) => (
                <div
                  key={i}
                  className={`tooltip ${tabClass(i)}`}
                  data-tip={tab.label}
                  onClick={() => setTabIndex(i)}
                >
                  <tab.icon size={20} />
                </div>
              ))}
            </div>

            {/* About Tab */}
            {tabIndex === 0 && (
              <>
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SparklesText>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl text-center font-black leading-tight w-full">
                      <span className="block lg:inline">SOFTWARE</span>{" "}
                      <span className="block lg:inline">
                        <Highlighter action="underline" animationDuration={1500}>
                          <span className="text-rose-400">DEVELOPER</span>
                        </Highlighter>
                      </span>
                    </h1>
                  </SparklesText>
                  <p className="text-rose-800/70 text-base sm:text-lg font-medium leading-relaxed text-center lg:text-left">
                    From modding GTA and building custom Android ROMs in high
                    school, my passion for tech runs deep. Nowadays, I focus
                    primarily on mobile development and backend engineering, while
                    maintaining a strong commitment to accessible design. Off the
                    clock, I explore new tech, game, and enjoy music.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-rose-100/50 shadow-sm">
                    <h1 className="text-3xl font-black text-rose-600">1+</h1>
                    <p className="text-rose-900/50 text-xs font-medium tracking-wide">
                      YEARS OF EXPERIENCE
                    </p>
                  </div>
                  <div className="flex flex-col p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-rose-100/50 shadow-sm">
                    <h1 className="text-3xl font-black text-rose-600">500K+</h1>
                    <p className="text-rose-900/50 text-xs font-medium tracking-wide">
                      LINES OF CODE
                    </p>
                  </div>
                </div>

                {/* Work */}
                {/* <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h1 className="text-xl font-bold text-rose-800 tracking-wide">
                    CURRENTLY WORKING AT
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-rose-100/50 shadow-sm">
                      <h1 className="text-lg font-bold text-rose-900">
                        Antimony Technologies
                      </h1>
                      <p className="text-rose-500 text-sm">
                        Mobile Developer (Flutter) / Backend Developer
                      </p>
                    </div>
                    <div className="flex flex-col p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-rose-100/50 shadow-sm">
                      <h1 className="text-lg font-bold text-rose-900">
                        AdaptiveHub
                      </h1>
                      <p className="text-rose-500 text-sm">
                        Full-stack Developer
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* Projects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {projects.map((project, i) => (
                    <a
                      key={i}
                      href={project.link}
                      target="_blank"
                      className="flex flex-col relative justify-center rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-200/30 group"
                    >
                      <img
                        src={project.imageSrc}
                        className="w-full h-48 object-cover brightness-[0.4] group-hover:brightness-[0.5] transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h1 className="font-bold text-white text-xl">
                          {project.title}
                        </h1>
                        <p className="text-white/60 text-xs">{project.devices}</p>
                        <p className="text-white/50 text-xs mt-1 line-clamp-2">{project.description}</p>
                        <div className="flex flex-row gap-1.5 items-center mt-2 flex-wrap">
                          {project.stack.map((s, j) => (
                            <p key={j} className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">
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

            {/* Education Tab */}
            {tabIndex === 1 && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-rose-800">Education</h1>
                <div className="flex flex-col gap-4">
                  {education.map((e, i) => (
                    <div key={i} className="flex flex-row gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-rose-100/50 shadow-sm">
                      <img
                        src={e.imageSrc}
                        className="w-12 h-12 lg:w-16 lg:h-16 object-contain shrink-0"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-base lg:text-lg text-rose-900">{e.degree}</p>
                        <h1 className="font-medium text-sm text-rose-700">
                          {e.school}
                        </h1>
                        <p className="text-xs text-rose-500 italic">
                          {e.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Arts Tab */}
            {tabIndex === 2 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {images.map((image, i) => (
                    <img
                      key={i}
                      src={image.src}
                      className="w-full h-full aspect-square object-cover rounded-2xl shadow-sm hover:shadow-lg hover:shadow-rose-200/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      loading="lazy"
                      onClick={() => setLightboxIndex(i)}
                    />
                  ))}
                </div>

                {/* Lightbox */}
                {lightboxIndex !== null && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setLightboxIndex(null)}
                  >
                    <button
                      className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light z-10"
                      onClick={() => setLightboxIndex(null)}
                    >
                      ×
                    </button>
                    <button
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
                      }}
                    >
                      ‹
                    </button>
                    <img
                      src={images[lightboxIndex].src}
                      className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((lightboxIndex + 1) % images.length);
                      }}
                    >
                      ›
                    </button>
                    <div className="absolute bottom-4 text-white/50 text-sm">
                      {lightboxIndex + 1} / {images.length}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Music Tab */}
            {tabIndex === 3 && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[
                  { url: "https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1852158159", title: ". untitled ." },
                  { url: "https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1653426820", title: "[ 1 ]" },
                  { url: "https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1447603840", title: "- self" },
                  { url: "https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1440835774", title: "MAY 18." },
                ].map((playlist, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-rose-100/50 shadow-sm p-3">
                    <iframe
                      width="100%"
                      height="160"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=${playlist.url}&color=%23ffb6c1&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                    />
                    <div className="px-2 py-1">
                      <p className="text-rose-500 text-xs">
                        mirimomekiku · {playlist.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-row px-3 py-2 bg-white/70 backdrop-blur-xl rounded-full gap-2 items-center shadow-xl shadow-rose-300/20 border border-rose-100/50">
          {[
            { icon: User2, label: "About" },
            { icon: Briefcase, label: "Education" },
            { icon: GalleryHorizontal, label: "Arts" },
            { icon: Music, label: "Music" },
          ].map((tab, i) => (
            <div
              key={i}
              className={`tooltip ${tabClass(i)}`}
              data-tip={tab.label}
              onClick={() => setTabIndex(i)}
            >
              <tab.icon size={20} />
            </div>
          ))}
        </nav>

        {/* Profile Hero */}
        {profileOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setProfileOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light z-10"
              onClick={() => setProfileOpen(false)}
            >
              ×
            </button>
            <img
              src="./assets/images/profile.jpeg"
              className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
              alt="Profile"
            />
          </div>
        )}
      </main>
    </>
  );
}
