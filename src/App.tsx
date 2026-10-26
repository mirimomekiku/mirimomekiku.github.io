import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Pause,
  Play,
} from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";
import { SmoothScroll } from "./component/smooth_scroll";
import { AnimatedDetails } from "./component/animated_details";
import { AsciiName, AsciiPortrait } from "./component/ascii_identity";
import { useAnimatedLayout } from "./hooks/use_animated_layout";
import { useAnimatedDialog } from "./hooks/use_animated_dialog";
import { usePortfolioMotion } from "./hooks/use_portfolio_motion";
import { gsap, ScrollTrigger, useGSAP } from "./lib/animation";

const themes = ["phosphor", "violet", "amber", "ice"] as const;
type Theme = (typeof themes)[number];
const filters = ["All work", "Web", "Mobile", "AI & systems"];
const playlists = [
  { id: "1852158159", title: ". untitled ." },
  { id: "1653426820", title: "[ 1 ]" },
  { id: "1447603840", title: "- self" },
  { id: "1440835774", title: "MAY 18." },
];
const cat = "  /\\_/\\\n ( o.o )\n  > ^ <";

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("portfolio-terminal-theme");
      return themes.includes(stored as Theme) ? (stored as Theme) : "phosphor";
    } catch {
      return "phosphor";
    }
  });
  const [filter, setFilter] = useState("All work");
  const [query, setQuery] = useState("");
  const [creativeTab, setCreativeTab] = useState("Art");
  const [artCount, setArtCount] = useState(6);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [motionEnabled, setMotion] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [section, setSection] = useState("intro");
  const motion = motionEnabled && !reducedMotion;
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLProgressElement>(null);
  const progressLabel = useRef<HTMLSpanElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const { ref: projectDialog, close: closeProject } = useAnimatedDialog(
    selectedProject !== null,
    motion,
    () => setSelectedProject(null),
  );
  const { ref: artDialog, close: closeArt } = useAnimatedDialog(
    lightbox !== null,
    motion,
    () => setLightbox(null),
  );
  const projectLayout = useAnimatedLayout(`${filter}:${query}`, motion);
  const creativeLayout = useAnimatedLayout(
    `${creativeTab}:${artCount}`,
    motion,
  );
  usePortfolioMotion(root, motion, setSection, progress, progressLabel);
  const locked = selectedProject !== null || lightbox !== null;
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-terminal-theme", theme);
    } catch {
      /* Theme remains usable when storage is restricted. */
    }
  }, [theme]);
  useGSAP(
    () => {
      if (lightbox === null || !motion) return;
      gsap.fromTo(
        ".art-dialog > img",
        { opacity: 0.2 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
    },
    { scope: root, dependencies: [lightbox, motion], revertOnUpdate: true },
  );
  const visibleProjects = projects.filter((project) => {
    const categories =
      project.category ??
      ["Web", "Mobile"].filter((category) =>
        category === "Web"
          ? project.devices.includes("Web")
          : /Android|Windows|Linux/.test(project.devices),
      );
    return (
      (filter === "All work" || categories.includes(filter)) &&
      `${project.title} ${project.description} ${project.stack.join(" ")} ${project.group ?? "Personal"}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
    );
  });
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("viernes.jhonlloydd@gmail.com");
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      location.href = "mailto:viernes.jhonlloydd@gmail.com";
    }
  }
  function cycleTheme() {
    setTheme(
      (current) => themes[(themes.indexOf(current) + 1) % themes.length],
    );
  }

  return (
    <div
      ref={root}
      id="home"
      tabIndex={-1}
      data-theme={theme}
      className={`portfolio ${motion ? "motion-on" : "motion-off"}`}
    >
      {motion && <SmoothScroll locked={locked} />}
      <div className="scanlines" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="terminal-shell">
        <header className="terminal-header" data-section="intro">
          <a
            className="shell-prompt"
            href="#home"
            aria-label="Jhon Lloyd Viernes, home"
          >
            <span>jhon@viernes</span>
            <span className="dim"> ~ % ./portfolio</span>
            <span className="terminal-cursor" aria-hidden="true">
              _
            </span>
          </a>
          <button
            className="theme-control"
            onClick={cycleTheme}
            aria-label={`Change terminal theme. Current: ${theme}`}
          >
            [{theme}]
          </button>
        </header>
        <main id="main" tabIndex={-1}>
          <section
            className="intro-section"
            id="intro"
            tabIndex={-1}
            aria-labelledby="hero-title"
            data-section="intro"
          >
            <h1 id="hero-title" className="sr-only">
              Jhon Lloyd Viernes — Software Developer
            </h1>
            <button
              className="name-button"
              onClick={cycleTheme}
              aria-label="Change the look of Jhon Lloyd’s ASCII name"
            >
              <AsciiName variant={themes.indexOf(theme)} />
            </button>
            <p className="role-line">
              <mark>software developer</mark>
              <span className="role-note">mobile / web / systems</span>
            </p>
            <p className="hero-lead">
              I build mobile apps, web experiences, and the systems that make
              them <mark>work together.</mark>
            </p>
            <p className="hero-detail">
              From adaptive learning and school operations to a growing
              collection of side projects. Thoughtful interfaces, dependable
              backends, and a little <span className="accent">curiosity</span>{" "}
              in everything.
            </p>
            <div className="hero-links">
              <a href="mailto:viernes.jhonlloydd@gmail.com">email</a>
              <a
                href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin
              </a>
              <a
                href="https://github.com/dlord213"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>
            </div>
            <nav className="command-nav" aria-label="Main navigation">
              <span className="dim">cd</span>
              <a href="#work">./work</a>
              <a href="#background">./about</a>
              <a href="#creative">./off-duty</a>
              <a href="#contact" aria-label="Get in touch">
                ./contact
              </a>
            </nav>
            <pre className="ascii-sigil" aria-hidden="true">
              {cat}
            </pre>
          </section>
          <section
            className="work-section"
            id="work"
            tabIndex={-1}
            aria-labelledby="work-title"
            data-section="work"
          >
            <div className="section-heading">
              <h2 id="work-title">selected work</h2>
              <span>{String(projects.length).padStart(2, "0")} entries</span>
            </div>
            <p className="section-intro">
              School platforms, everyday utilities, and a few personal
              experiments.
            </p>
            <div className="work-controls">
              <div
                className="filters"
                role="group"
                aria-label="Filter projects"
              >
                {filters.map((item) => (
                  <button
                    key={item}
                    aria-label={item}
                    aria-pressed={filter === item}
                    onClick={() => {
                      projectLayout.capture();
                      setFilter(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="search">
                <Search size={12} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    projectLayout.capture();
                    setQuery(event.target.value);
                  }}
                  placeholder="grep projects..."
                  aria-label="Search projects"
                />
              </label>
            </div>
            <p className="results-count" role="status">
              {query
                ? `${visibleProjects.length} matches for “${query}”`
                : `${visibleProjects.length} projects / ${filter.toLowerCase()}`}
            </p>
            <div className="project-grid" ref={projectLayout.ref}>
              {visibleProjects.map((project, index) => (
                <article
                  className="project-card"
                  key={project.title}
                  data-layout-item
                  data-flip-id={`project-${project.title}`}
                >
                  <div className="project-heading">
                    <span className="project-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>
                      <button
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Explore ${project.title}`}
                      >
                        {project.title}
                      </button>
                    </h3>
                    <span className="project-source">
                      {project.group ?? "Personal"} / {project.devices}
                    </span>
                  </div>
                  <div className="project-content">
                    <p>{project.description}</p>
                    <p className="stack-line">
                      <span aria-hidden="true">└─ </span>
                      {project.stack.join(" · ")}
                    </p>
                    <button
                      className="project-open"
                      onClick={() => setSelectedProject(project)}
                    >
                      read project notes <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {visibleProjects.length === 0 && (
              <div className="empty-state">
                <span aria-hidden="true">[ no matches ]</span>
                <h3>No projects found.</h3>
                <p>Try another project name or technology.</p>
                <button
                  className="terminal-button"
                  onClick={() => {
                    projectLayout.capture();
                    setFilter("All work");
                    setQuery("");
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
          <section
            className="about-section"
            id="background"
            tabIndex={-1}
            aria-labelledby="about-title"
            data-section="about"
          >
            <h2 className="section-heading" id="about-title">
              about
            </h2>
            <div className="about-grid">
              <div className="about-copy">
                <p>
                  I’m <mark>Jhon Lloyd Viernes</mark> — a software developer
                  drawn to the space between a good idea and a useful product.
                </p>
                <p>
                  It started with modding GTA and building custom Android ROMs
                  in high school. Now I work across{" "}
                  <span className="accent">
                    mobile, web, and backend engineering
                  </span>
                  , connecting interfaces to the systems behind them.
                </p>
                <p>
                  Off the clock: art, music, games, and usually another idea
                  open in a tab.
                </p>
              </div>
              <AsciiPortrait />
            </div>
            <div className="skill-groups">
              <div>
                <h3>interfaces & mobile</h3>
                <p>
                  Flutter · Dart · Kotlin · Jetpack Compose · React · Expo ·
                  Tailwind CSS
                </p>
              </div>
              <div>
                <h3>systems & data</h3>
                <p>
                  Laravel · Node.js · Next.js · Express · Fastify · MySQL ·
                  PostgreSQL · AI integrations
                </p>
              </div>
            </div>
            <div className="experience-section">
              <h2 className="section-heading">experience</h2>
              <AnimatedDetails
                enabled={motion}
                open
                summary={
                  <>
                    <span className="experience-date">project work</span>
                    <span>
                      AdaptiveHub<small>full-stack & mobile development</small>
                    </span>
                  </>
                }
              >
                <p>
                  Connected school and business products across web, mobile, and
                  backend services.
                </p>
                <ul className="tree-list">
                  <li>LMS, Library, and AI-assisted learning</li>
                  <li>Crest, AdaptivePay, and school operations</li>
                  <li>Attendance, scheduling, and conferencing</li>
                </ul>
              </AnimatedDetails>
              {[...experience].reverse().map((item) => (
                <AnimatedDetails
                  enabled={motion}
                  key={item.position + item.period}
                  summary={
                    <>
                      <span className="experience-date">{item.period}</span>
                      <span>{item.position}</span>
                    </>
                  }
                >
                  <p>{item.description}</p>
                  {item.details && (
                    <ul className="tree-list">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  <div className="tags">
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </AnimatedDetails>
              ))}
            </div>
            <div className="education-section">
              <h2 className="section-heading">education</h2>
              {education.map((item) => (
                <div className="education-entry" key={item.school}>
                  <span>{item.date}</span>
                  <div>
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section
            className="creative-section"
            id="creative"
            tabIndex={-1}
            aria-labelledby="creative-title"
            data-section="off-duty"
          >
            <div className="section-heading">
              <h2 id="creative-title">outside the editor</h2>
              <div
                className="filters"
                role="group"
                aria-label="Creative interests"
              >
                {["Art", "Music"].map((tab) => (
                  <button
                    key={tab}
                    aria-label={tab}
                    aria-pressed={creativeTab === tab}
                    onClick={() => {
                      creativeLayout.capture();
                      setCreativeTab(tab);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <p className="section-intro">
              A sketchbook, a playlist, a different kind of flow.
            </p>
            <div className="creative-content" ref={creativeLayout.ref}>
              {creativeTab === "Art" ? (
                <>
                  <div className="art-grid">
                    {images.slice(0, artCount).map((image, index) => (
                      <button
                        key={image.src}
                        data-layout-item
                        data-flip-id={`art-${index}`}
                        onClick={() => setLightbox(index)}
                        aria-label={`View artwork ${index + 1}`}
                      >
                        <img
                          src={image.src}
                          alt={`Personal artwork ${index + 1}`}
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                        />
                        <span>
                          sketch_{String(index + 1).padStart(2, "0")}.jpg{" "}
                          <ArrowUpRight size={12} />
                        </span>
                      </button>
                    ))}
                  </div>
                  {artCount < images.length && (
                    <button
                      className="terminal-button gallery-more"
                      onClick={() => {
                        creativeLayout.capture();
                        setArtCount((count) =>
                          Math.min(count + 6, images.length),
                        );
                      }}
                    >
                      More from the sketchbook{" "}
                      <span aria-hidden="true">[+]</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="music-grid">
                  {playlists.map((playlist) => (
                    <div
                      className="playlist"
                      key={playlist.id}
                      data-layout-item
                      data-flip-id={`playlist-${playlist.id}`}
                    >
                      <h3>
                        <span aria-hidden="true">▸ </span>
                        {playlist.title}
                      </h3>
                      <iframe
                        title={`SoundCloud playlist: ${playlist.title}`}
                        width="100%"
                        height="166"
                        loading="lazy"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlist.id}&color=%239cdb93&auto_play=false&hide_related=true&show_comments=false`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          <section
            className="contact-section"
            id="contact"
            tabIndex={-1}
            aria-labelledby="contact-title"
            data-section="contact"
          >
            <pre className="ascii-sigil contact-sigil" aria-hidden="true">
              {"   .-._.-.\n  (  o o  )\n   |  ^  |\n    -----"}
            </pre>
            <h2 className="section-heading" id="contact-title">
              contact
            </h2>
            <p className="section-intro">
              A project, a collaboration, or a simple hello.
            </p>
            <dl className="contact-list">
              <div>
                <dt>email</dt>
                <dd>
                  <button
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied!" : "Copy email address"}
                  >
                    viernes.jhonlloydd@gmail.com {copied && <Check size={13} />}
                  </button>
                  <span className="copy-status" role="status">
                    {copied ? "copied to clipboard" : "click to copy"}
                  </span>
                </dd>
              </div>
              <div>
                <dt>write</dt>
                <dd>
                  <a href="mailto:viernes.jhonlloydd@gmail.com">
                    open your email client <ArrowUpRight size={12} />
                  </a>
                </dd>
              </div>
              <div>
                <dt>linkedin</dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    jhon-lloyd-viernes <ArrowUpRight size={12} />
                  </a>
                </dd>
              </div>
              <div>
                <dt>github</dt>
                <dd>
                  <a
                    href="https://github.com/dlord213"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/dlord213 <ArrowUpRight size={12} />
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} jhon lloyd viernes</p>
          <button onClick={cycleTheme}>
            tap the name for a different signal{" "}
            <span aria-hidden="true">↗</span>
          </button>
          <a href="#home" aria-label="Back to top">
            ↑ back to top
          </a>
        </footer>
      </div>
      <div className="status-bar">
        <a href="#home" className="status-owner" aria-label="Portfolio home">
          [jlv]
        </a>
        <span className="status-section">
          <span aria-hidden="true">▸</span> {section}
        </span>
        <div className="status-right">
          <button
            className="motion-toggle"
            aria-label={
              reducedMotion
                ? "Animations disabled by system preference"
                : motion
                  ? "Pause animations"
                  : "Enable animations"
            }
            aria-pressed={!motion}
            disabled={reducedMotion}
            onClick={() => setMotion(!motion)}
          >
            {motion ? <Pause size={10} /> : <Play size={10} />}
            <span>motion:{motion ? "on" : "off"}</span>
          </button>
          <progress
            ref={progress}
            max="100"
            value="0"
            aria-label="Reading progress"
          />
          <span ref={progressLabel} className="progress-label">
            00%
          </span>
        </div>
      </div>
      <dialog
        ref={projectDialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
      >
        {selectedProject && (
          <>
            <div className="dialog-titlebar">
              <span>
                project://
                {selectedProject.title.toLowerCase().replace(/ /g, "-")}
              </span>
              <button
                className="icon-button"
                autoFocus
                aria-label="Close project"
                onClick={closeProject}
              >
                <X size={17} />
              </button>
            </div>
            <div className="dialog-content">
              <span className="dialog-kicker">
                {selectedProject.group ?? "personal project"} / project notes
              </span>
              <h2 id="project-dialog-title">{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <dl className="project-facts">
                <div>
                  <dt>surface</dt>
                  <dd>{selectedProject.devices}</dd>
                </div>
                <div>
                  <dt>stack</dt>
                  <dd>{selectedProject.stack.join(" / ")}</dd>
                </div>
                <div>
                  <dt>context</dt>
                  <dd>{selectedProject.group ?? "Personal project"}</dd>
                </div>
              </dl>
              {selectedProject.highlights && (
                <ul className="tree-list">
                  {selectedProject.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              {selectedProject.imageSrc && (
                <img
                  className="dialog-preview"
                  src={selectedProject.imageSrc}
                  alt={`${selectedProject.title} application preview`}
                  loading="lazy"
                />
              )}
              <div className="dialog-actions">
                {selectedProject.link && (
                  <a
                    className="terminal-button"
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project <ArrowUpRight size={13} />
                  </a>
                )}
                <button className="terminal-button" onClick={closeProject}>
                  Back to projects <span aria-hidden="true">↩</span>
                </button>
              </div>
              {!selectedProject.link && (
                <p className="project-access">
                  // professional project; public source and demo links aren’t
                  listed.
                </p>
              )}
            </div>
          </>
        )}
      </dialog>
      <dialog
        ref={artDialog}
        className="art-dialog"
        aria-label="Artwork viewer"
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          closeArt();
        }}
        onClose={() => setLightbox(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeArt();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft")
            setLightbox(
              (index) => ((index ?? 0) - 1 + images.length) % images.length,
            );
          if (event.key === "ArrowRight")
            setLightbox((index) => ((index ?? 0) + 1) % images.length);
        }}
      >
        {lightbox !== null && (
          <>
            <div className="dialog-titlebar">
              <span>sketch_{String(lightbox + 1).padStart(2, "0")}.jpg</span>
              <button
                className="icon-button"
                aria-label="Close artwork"
                autoFocus
                onClick={closeArt}
              >
                <X size={17} />
              </button>
            </div>
            <img
              src={images[lightbox].src}
              alt={`Personal artwork ${lightbox + 1}`}
            />
            <div className="art-dialog-controls">
              <button
                className="icon-button"
                aria-label="Previous artwork"
                onClick={() =>
                  setLightbox((lightbox - 1 + images.length) % images.length)
                }
              >
                <ChevronLeft />
              </button>
              <span aria-live="polite">
                {lightbox + 1} / {images.length}
              </span>
              <button
                className="icon-button"
                aria-label="Next artwork"
                onClick={() => setLightbox((lightbox + 1) % images.length)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
