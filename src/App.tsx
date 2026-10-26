import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Music2,
  Search,
  X,
  Pause,
  Play,
} from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";

const filters = ["All work", "Web", "Mobile", "AI & systems"];
const playlists = [
  { id: "1852158159", title: ". untitled ." },
  { id: "1653426820", title: "[ 1 ]" },
  { id: "1447603840", title: "- self" },
  { id: "1440835774", title: "MAY 18." },
];
const featured = [
  {
    title: "AdaptiveHub LMS",
    theme: "navy",
    note: "First up: learning that adapts. One connected experience for students, teachers, and school teams.",
    caption: "A little less friction. A lot more learning.",
    kind: "learning",
  },
  {
    title: "Crest",
    theme: "lilac",
    note: "Behind every good product is a lot of moving parts. This one brings the business side together.",
    caption: "From the first conversation to everyday operations.",
    kind: "operations",
  },
  {
    title: "Checkpoint",
    theme: "yellow",
    note: "And something a little more personal. A home for the games you’re playing, finishing, and saving for later.",
    caption: "For the backlog that keeps getting bigger.",
    kind: "games",
  },
];

function Avatar({
  dancing,
  onClick,
  className = "",
}: {
  dancing: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`avatar ${dancing ? "dancing" : ""} ${className}`}
      onClick={onClick}
      aria-label="Make Jhon’s avatar dance"
      title="Go on, give me a click."
    >
      <img
        src="/assets/images/avatar-halftone.png"
        alt="Illustrated Jhon wearing a flat cap and glasses"
        width="800"
        height="1000"
        fetchPriority="high"
        draggable="false"
      />
    </button>
  );
}

function ProjectVisual({ project }: { project: ProjectInterface }) {
  if (project.imageSrc)
    return (
      <img
        className="project-image"
        src={project.imageSrc}
        alt={`${project.title} application preview`}
        loading="lazy"
      />
    );
  return (
    <div className={`project-visual ${project.color}`} aria-hidden="true">
      <span className="visual-wordmark">
        {project.mark}
        <span>↗</span>
      </span>
      <div className="visual-window">
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span>{project.title}</span>
        </div>
        <div className="window-layout">
          <div className="mini-sidebar">
            <b />
            <b />
            <b />
            <b />
          </div>
          <div className="mini-content">
            <strong />
            <span />
            <div>
              <i />
              <i />
              <i />
            </div>
            <p />
            <p />
            <p />
          </div>
        </div>
      </div>
      <span className="visual-caption">{project.devices}</span>
    </div>
  );
}

function ProductScene({ kind }: { kind: string }) {
  if (kind === "games")
    return (
      <div className="game-scene">
        <div className="game-type" aria-hidden="true">
          One more
          <br />
          <i>side quest.</i>
        </div>
        <div className="game-screen">
          <div className="phone-camera" />
          <img
            src="/assets/projects/playlog/1.jpg"
            alt="Checkpoint game backlog app"
            loading="lazy"
          />
        </div>
        <span className="scene-sticker">PLAY. TRACK. REPEAT. ↗</span>
      </div>
    );
  const learning = kind === "learning";
  return (
    <div
      className={`product-scene ${kind}`}
      role="img"
      aria-label={
        learning
          ? "Illustrative AdaptiveHub learning dashboard with classes and a learning path"
          : "Illustrative Crest workspace connecting clients, delivery, and revenue"
      }
    >
      <div className="browser-frame">
        <div className="browser-bar">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span>
            {learning ? "AdaptiveHub / My learning" : "Crest / Workspace"}
          </span>
          <ArrowUpRight size={14} />
        </div>
        <div className="product-layout">
          <div className="product-sidebar">
            <b className="product-logo">{learning ? "a↗" : "crest."}</b>
            {(learning
              ? [
                  "Overview",
                  "My classes",
                  "Learning path",
                  "Library",
                  "Messages",
                ]
              : ["Workspace", "Clients", "Projects", "Finance", "People"]
            ).map((item, i) => (
              <span key={item} className={i === 0 ? "active" : ""}>
                <i />
                {item}
              </span>
            ))}
            <small>
              {learning
                ? "A little progress, every day."
                : "Everything, working together."}
            </small>
          </div>
          <div className="product-content">
            <div className="product-topline">
              <span>
                {learning ? "YOUR LEARNING SPACE" : "THE BIG PICTURE"}
              </span>
              <span>◉</span>
            </div>
            <h4>
              {learning
                ? "Keep your curiosity going."
                : "Good work starts here."}
            </h4>
            <p>
              {learning
                ? "Your next discovery is just around the corner."
                : "A clearer view of what’s next."}
            </p>
            <div className="product-banner">
              <span>
                {learning ? "Your learning path" : "Client relationships"}
                <strong>
                  {learning
                    ? "Small steps. Big ideas."
                    : "Connected from day one."}
                </strong>
                <button tabIndex={-1} aria-hidden="true" disabled>
                  {learning ? "Continue learning" : "Explore workspace"} ↗
                </button>
              </span>
              <span className="banner-orbit" aria-hidden="true">
                ✳
              </span>
            </div>
            <div className="product-heading">
              {learning
                ? "Pick up where you left off"
                : "Your workspace, connected"}
              <ArrowUpRight size={14} />
            </div>
            <div className="product-tiles">
              {(learning
                ? ["Discover", "Practice", "Master"]
                : ["Client records", "Delivery", "Revenue"]
              ).map((item, index) => (
                <div key={item}>
                  <span className={`tile-art tile-${index}`}>
                    {["↗", "✳", "◉"][index]}
                  </span>
                  <b>{item}</b>
                  <small>
                    {learning
                      ? [
                          "Explore new concepts",
                          "Build your confidence",
                          "Make progress visible",
                        ][index]
                      : [
                          "One shared view",
                          "Keep things moving",
                          "Follow the full picture",
                        ][index]}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="floating-label">
        {learning
          ? "Built for the way you learn."
          : "The details make the difference."}
        <span>Web + mobile + everything behind it</span>
      </div>
      <span className="scene-label">
        Interface illustration · Product capabilities from project documentation
      </span>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All work");
  const [query, setQuery] = useState("");
  const [creativeTab, setCreativeTab] = useState("Art");
  const [artCount, setArtCount] = useState(6);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [dancing, setDancing] = useState(false);
  const [motion, setMotion] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [activeStory, setActiveStory] = useState(0);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const artDialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const danceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (selectedProject) projectDialog.current?.showModal();
    else projectDialog.current?.close();
  }, [selectedProject]);
  useEffect(() => {
    if (lightbox !== null) artDialog.current?.showModal();
    else artDialog.current?.close();
  }, [lightbox]);
  useEffect(() => {
    if (!selectedProject && lightbox === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [selectedProject, lightbox]);
  useEffect(
    () => () => {
      clearTimeout(copyTimer.current);
      clearTimeout(danceTimer.current);
    },
    [],
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveStory(Number((entry.target as HTMLElement).dataset.story));
        });
      },
      { rootMargin: "-30% 0px -35% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-story]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

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
  function dance() {
    if (!motion) return;
    setDancing(false);
    requestAnimationFrame(() => setDancing(true));
    clearTimeout(danceTimer.current);
    danceTimer.current = setTimeout(() => setDancing(false), 1700);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("viernes.jhonlloydd@gmail.com");
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:viernes.jhonlloydd@gmail.com";
    }
  }

  return (
    <div className={motion ? "portfolio motion-on" : "portfolio motion-off"}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <section
        className="hero grid-surface"
        id="home"
        aria-labelledby="hero-title"
      >
        <header className="site-header">
          <a
            className="brand"
            href="#home"
            aria-label="Jhon Lloyd Viernes, home"
          >
            Jhon Lloyd Viernes<span>Software developer</span>
          </a>
          <a className="pill" href="#contact">
            Get in touch <ArrowDown size={17} />
          </a>
        </header>
        <div className="hero-main">
          <div className="hero-text">
            <h1 id="hero-title">
              I build apps
              <br />
              with a little
              <br />
              <span>character.</span>
            </h1>
            <a className="scroll-note" href="#intro">
              <span className="scroll-icon">
                <ArrowDown size={18} />
              </span>
              Scroll down. I’ll show you around.
            </a>
          </div>
          <div className="hero-character">
            <p className="speech hero-speech">
              Hey, I’m Jhon.
              <br />I make things that <em>work.</em>
              <span className="speech-star">✳</span>
            </p>
            <Avatar dancing={dancing} onClick={dance} />
            <span className="avatar-hint">Psst. Give me a click.</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>Mobile, web & everything behind it.</span>
          <a href="#work">
            Selected work <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <main id="main">
        <section className="intro-section grid-surface" id="intro">
          <div className="intro-label">
            <span className="dot" /> A quick introduction
          </div>
          <div>
            <h2 className="intro-copy reveal">
              I’m a software developer with a soft spot for{" "}
              <span>mobile experiences</span> and the systems that make them
              work.
            </h2>
            <p className="intro-detail">
              From custom Android ROMs to connected school platforms, I’ve
              always liked figuring out how things work — then making them a
              little better. These days, that means Flutter, React, Laravel,
              TypeScript, and a healthy amount of curiosity.
            </p>
            <nav className="inline-nav" aria-label="Explore portfolio">
              <a href="#work">
                Work <ArrowDown size={15} />
              </a>
              <a href="#background">
                Background <ArrowDown size={15} />
              </a>
              <a href="#creative">
                Off the clock <ArrowDown size={15} />
              </a>
            </nav>
          </div>
        </section>
        <section
          className={`project-tour grid-surface theme-${featured[activeStory].theme}`}
          id="work"
          aria-label="Selected project tour"
        >
          <aside className="tour-guide">
            <div className="guide-inner">
              <p className="speech" aria-live="polite">
                {featured[activeStory].note}
              </p>
              <Avatar dancing={dancing} onClick={dance} />
              <span className="tour-counter">
                {String(activeStory + 1).padStart(2, "0")} / 03{" "}
                <span>Keep scrolling ↓</span>
              </span>
            </div>
          </aside>
          <div className="tour-stories">
            {featured.map((item, index) => (
              <article
                className="featured-project"
                key={item.title}
                data-story={index}
              >
                <div className="featured-header">
                  <h2>{item.title}</h2>
                  <button
                    className="pill"
                    onClick={() =>
                      setSelectedProject(
                        projects.find(
                          (project) => project.title === item.title,
                        )!,
                      )
                    }
                  >
                    View project <ArrowUpRight size={17} />
                  </button>
                </div>
                <ProductScene kind={item.kind} />
                <p className="featured-caption">
                  {item.caption}
                  <span>
                    {projects
                      .find((project) => project.title === item.title)!
                      .stack.join(" / ")}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="archive-section grid-surface"
          id="all-work"
          aria-labelledby="archive-title"
        >
          <div className="section-heading">
            <h2 id="archive-title">
              All work<span>({projects.length})</span>
            </h2>
            <p>
              Some for work. Some for fun.
              <br />
              All made with care.
            </p>
          </div>
          <div className="work-controls">
            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Project or technology"
                aria-label="Search projects"
              />
            </label>
          </div>
          <p className="results-count" role="status">
            {visibleProjects.length} projects
            {query ? ` matching “${query}”` : ""}
          </p>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <button
                  className="project-cover"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Explore ${project.title}`}
                >
                  <ProjectVisual project={project} />
                  <span className="cover-arrow">
                    <ArrowUpRight size={24} />
                  </span>
                </button>
                <h3>
                  <button onClick={() => setSelectedProject(project)}>
                    {project.title}
                    <span>{project.group ?? "Personal"}</span>
                  </button>
                </h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
          {visibleProjects.length === 0 && (
            <div className="empty-state">
              <h3>No projects found.</h3>
              <p>Try another name or technology.</p>
              <button
                className="pill"
                onClick={() => {
                  setFilter("All work");
                  setQuery("");
                }}
              >
                Reset filters <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </section>
        <section
          className="background-section grid-surface"
          id="background"
          aria-labelledby="background-title"
        >
          <div className="background-heading">
            <span className="section-label">A little context</span>
            <h2 id="background-title">
              Curiosity.
              <br />
              Then code.
              <br />
              <span>Repeat.</span>
            </h2>
            <img
              className="background-photo"
              src="/assets/images/profile.jpeg"
              alt="Jhon Lloyd Viernes"
              loading="lazy"
            />
            <p>
              Somewhere between making things
              <br />
              and figuring things out.
            </p>
          </div>
          <div className="background-content">
            <p className="background-lead">
              I started by modding games and tinkering with Android. Now I build
              the interfaces, APIs, and workflows that connect entire products.
            </p>
            <div className="skill-groups">
              <div>
                <h3>On the screen</h3>
                <p>
                  Flutter / Dart / Kotlin / Jetpack Compose / React / Expo /
                  Tailwind CSS
                </p>
              </div>
              <div>
                <h3>Behind the scenes</h3>
                <p>
                  Laravel / Node.js / Next.js / Express / Fastify / MySQL /
                  PostgreSQL / AI integrations
                </p>
              </div>
            </div>
            <h3 className="background-subtitle">Experience</h3>
            <details className="experience-entry" open>
              <summary>
                <span>
                  AdaptiveHub<small>Full-stack & mobile development</small>
                </span>
                <span>Project work</span>
              </summary>
              <p>
                Connected school and business products across web, mobile, and
                backend services: LMS, Library, Crest, AdaptivePay, attendance,
                scheduling, conferencing, and AI services.
              </p>
            </details>
            {[...experience].reverse().map((item) => (
              <details
                className="experience-entry"
                key={item.position + item.period}
              >
                <summary>
                  <span>{item.position}</span>
                  <span>{item.period}</span>
                </summary>
                <p>{item.description}</p>
                {item.details && (
                  <ul>
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
              </details>
            ))}
            <h3 className="background-subtitle">Education</h3>
            {education.map((item) => (
              <div className="education-entry" key={item.school}>
                <span>{item.date}</span>
                <h4>{item.degree}</h4>
                <p>{item.school}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          className="creative-section grid-surface"
          id="creative"
          aria-labelledby="creative-title"
        >
          <div className="section-heading">
            <h2 id="creative-title">
              Off the clock<span>↗</span>
            </h2>
            <div
              className="filters"
              role="group"
              aria-label="Creative interests"
            >
              {["Art", "Music"].map((tab) => (
                <button
                  key={tab}
                  aria-pressed={creativeTab === tab}
                  onClick={() => setCreativeTab(tab)}
                >
                  {tab === "Music" && <Music2 size={15} />}
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <p className="creative-intro">
            A few things from the other side of my brain.
          </p>
          {creativeTab === "Art" ? (
            <>
              <div className="art-grid">
                {images.slice(0, artCount).map((image, index) => (
                  <button
                    key={image.src}
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
                      Sketchbook / {String(index + 1).padStart(2, "0")}{" "}
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                ))}
              </div>
              {artCount < images.length && (
                <button
                  className="pill gallery-more"
                  onClick={() =>
                    setArtCount((count) => Math.min(count + 6, images.length))
                  }
                >
                  More from the sketchbook <ArrowDown size={16} />
                </button>
              )}
            </>
          ) : (
            <div className="music-grid">
              {playlists.map((playlist) => (
                <div className="playlist" key={playlist.id}>
                  <h3>
                    <Music2 size={17} />
                    {playlist.title}
                  </h3>
                  <iframe
                    title={`SoundCloud playlist: ${playlist.title}`}
                    width="100%"
                    height="166"
                    loading="lazy"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlist.id}&color=%232261e9&auto_play=false&hide_related=true&show_comments=false`}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="contact-section grid-surface" id="contact">
          <div className="contact-top">
            <p>Got something in mind?</p>
            <a href="#home" className="top-link">
              Back to top <ArrowUp size={17} />
            </a>
          </div>
          <h2>
            Let’s make
            <br />
            <span>it happen.</span>
          </h2>
          <button
            className="email-button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied!" : "Copy email address"}
          >
            <span>viernes.jhonlloydd@gmail.com</span>
            {copied ? <Check /> : <ArrowUpRight />}
            <small role="status">
              {copied ? "Copied. Talk soon!" : "Click to copy. Say hello."}
            </small>
          </button>
          <div className="contact-bottom">
            <p>
              Jhon Lloyd Viernes
              <br />
              <span>Software developer & curious human.</span>
            </p>
            <div>
              <a href="mailto:viernes.jhonlloydd@gmail.com">
                <Mail size={16} /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/dlord213"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </section>
      </main>
      <button
        className="motion-toggle"
        aria-label={motion ? "Pause animations" : "Enable animations"}
        aria-pressed={!motion}
        onClick={() => {
          setMotion(!motion);
          setDancing(false);
        }}
      >
        {motion ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <dialog
        ref={projectDialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={() => setSelectedProject(null)}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}
      >
        {selectedProject && (
          <>
            <button
              className="dialog-close icon-button"
              autoFocus
              aria-label="Close project"
              onClick={() => setSelectedProject(null)}
            >
              <X />
            </button>
            <ProjectVisual project={selectedProject} />
            <div className="dialog-content">
              <p className="section-label">
                {selectedProject.group ?? "Personal project"} /{" "}
                {selectedProject.devices}
              </p>
              <h2 id="project-dialog-title">{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              {selectedProject.highlights && (
                <ul>
                  {selectedProject.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="tags">
                {selectedProject.stack.map((stack) => (
                  <span key={stack}>{stack}</span>
                ))}
              </div>
              <div className="dialog-actions">
                {selectedProject.link && (
                  <a
                    className="pill dark-pill"
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project <ArrowUpRight size={16} />
                  </a>
                )}
                <button
                  className="pill"
                  onClick={() => setSelectedProject(null)}
                >
                  Back to projects <ArrowUpRight size={16} />
                </button>
              </div>
              {!selectedProject.link && (
                <p className="project-access">
                  Professional project · Public source and demo links aren’t
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
        onCancel={() => setLightbox(null)}
        onClose={() => setLightbox(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightbox(null);
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
            <button
              className="dialog-close icon-button"
              aria-label="Close artwork"
              autoFocus
              onClick={() => setLightbox(null)}
            >
              <X />
            </button>
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
