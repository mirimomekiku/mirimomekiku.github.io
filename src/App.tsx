import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Music2,
  Search,
  X,
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
      <div className="visual-grid" />
      <span className="visual-wordmark">
        {project.mark}
        <span>✳</span>
      </span>
      <div className="visual-window">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="window-content">
          <span />
          <span />
          <span />
          <div>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <span className="visual-caption">
        {project.title} <ArrowUpRight size={14} />
      </span>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All work");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [creativeTab, setCreativeTab] = useState("Art");
  const [artCount, setArtCount] = useState(8);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const artDialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
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
  useEffect(() => () => clearTimeout(copyTimer.current), []);

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
      window.location.href = "mailto:viernes.jhonlloydd@gmail.com";
    }
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Jhon Lloyd Viernes, home">
          jlv<span>✳</span>
        </a>
        <nav
          id="mobile-nav"
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          {[
            ["Work", "#work"],
            ["Background", "#background"],
            ["Off the clock", "#creative"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-contact"
          href="mailto:viernes.jhonlloydd@gmail.com"
        >
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          className="icon-button menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        <section
          className="hero page-width"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> A developer. A maker. Always
              curious.
            </p>
            <h1 id="hero-title">
              Thoughtful code.
              <br />
              Useful things.
              <br />
              <span>A little personality.</span>
            </h1>
            <p className="hero-description">
              Hi, I’m <strong>Jhon Lloyd Viernes</strong>. I build mobile apps,
              web experiences, and the systems behind them — with care for the
              people using them.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <ArrowDown size={17} />
              </a>
              <a className="text-link" href="#background">
                A bit about me <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <Code2 size={16} />
              <span>From Android tinkering to connected platforms.</span>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-label">
              <span className="status-dot" /> Behind the code
            </div>
            <img
              src="/assets/images/profile.jpeg"
              alt="Jhon Lloyd Viernes"
              fetchPriority="high"
              width="640"
              height="720"
            />
            <span className="portrait-spark" aria-hidden="true">
              ✳
            </span>
            <div className="portrait-caption">
              <span>
                Jhon Lloyd Viernes
                <small>Software developer & curious human</small>
              </span>
              <span className="caption-arrow">
                <ArrowUpRight size={22} />
              </span>
            </div>
            <div className="floating-note">
              Made with care.<span>Always a work in progress.</span>
            </div>
          </div>
        </section>
        <div className="stack-strip">
          <div className="page-width">
            <span>My everyday toolkit</span>
            <p>
              Flutter <i>·</i> React <i>·</i> TypeScript <i>·</i> Laravel{" "}
              <i>·</i> Next.js <i>·</i> Node.js
            </p>
          </div>
        </div>
        <section
          className="work-section page-width section-space"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ideas into interfaces</p>
              <h2 id="work-title">
                Things I’ve been building<span>.</span>
              </h2>
            </div>
            <p>
              School platforms, everyday utilities,
              <br />
              and a few things just for the fun of it.
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
                placeholder="Find a project or stack…"
                aria-label="Search projects"
              />
            </label>
          </div>
          <p className="results-count" role="status">
            {visibleProjects.length} projects{" "}
            {filter === "All work" && !query
              ? "· Professional & personal work"
              : "found"}
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
                    <ArrowUpRight size={20} />
                  </span>
                </button>
                <div className="project-meta">
                  <span>{project.group ?? "Personal project"}</span>
                  <span>{project.devices}</span>
                </div>
                <h3>
                  <button onClick={() => setSelectedProject(project)}>
                    {project.title}
                    <ArrowUpRight size={19} />
                  </button>
                </h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.stack.map((stack) => (
                    <span key={stack}>{stack}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {visibleProjects.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No projects found</h3>
              <p>Try a different name, technology, or filter.</p>
              <button
                className="button secondary"
                onClick={() => {
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
          className="background-section"
          id="background"
          aria-labelledby="background-title"
        >
          <div className="page-width section-space">
            <div className="section-heading">
              <div>
                <p className="eyebrow">The person behind the projects</p>
                <h2 id="background-title">
                  Built on curiosity<span>.</span>
                </h2>
              </div>
              <span className="section-doodle" aria-hidden="true">
                ✳
              </span>
            </div>
            <div className="background-grid">
              <div className="about-copy">
                <h3>It started with “what if?”</h3>
                <p>
                  Modding GTA and building custom Android ROMs in high school
                  turned curiosity into a love for making software. Today, that
                  same instinct takes me from mobile interfaces to backend
                  services and full-stack platforms.
                </p>
                <p>
                  My work spans adaptive learning, library systems, school
                  operations, payments, and real-time experiences. I care about
                  clear interfaces, dependable data flows, and making complex
                  workflows feel approachable.
                </p>
                <div className="skill-groups">
                  <div>
                    <span>Interfaces & mobile</span>
                    <p>
                      Flutter · Dart · Kotlin · Jetpack Compose · React · Expo ·
                      Tailwind CSS
                    </p>
                  </div>
                  <div>
                    <span>Behind the scenes</span>
                    <p>
                      Laravel · Node.js · Next.js · Express · Fastify · MySQL ·
                      PostgreSQL · AI integrations
                    </p>
                  </div>
                </div>
                <a
                  className="text-link"
                  href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Connect on LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="timeline">
                <h3>Experience & education</h3>
                <article className="timeline-item">
                  <span className="timeline-dot" />
                  <p className="timeline-label">AdaptiveHub · Project work</p>
                  <h4>Full-stack & mobile development</h4>
                  <p>
                    Connected school and business products across web, mobile,
                    and backend services. Work includes LMS and library
                    experiences, Crest, AdaptivePay, attendance, scheduling,
                    conferencing, and AI services.
                  </p>
                </article>
                {[...experience].reverse().map((item) => (
                  <article
                    className="timeline-item"
                    key={item.position + item.period}
                  >
                    <span className="timeline-dot" />
                    <p className="timeline-label">{item.period}</p>
                    <h4>{item.position}</h4>
                    <p>{item.description}</p>
                    <div className="tags">
                      {item.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </article>
                ))}
                {education.map((item) => (
                  <article
                    className="timeline-item education-item"
                    key={item.school}
                  >
                    <span className="timeline-dot" />
                    <p className="timeline-label">{item.date} · Education</p>
                    <h4>{item.degree}</h4>
                    <p>{item.school}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="page-width section-space creative-section"
          id="creative"
          aria-labelledby="creative-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A different kind of making</p>
              <h2 id="creative-title">
                Off the clock<span>.</span>
              </h2>
            </div>
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
            Away from the editor, you’ll find me exploring art, getting lost in
            music, or playing a game.
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
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />
                    <span>
                      Artwork {String(index + 1).padStart(2, "0")}{" "}
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                ))}
              </div>
              {artCount < images.length && (
                <button
                  className="button secondary gallery-more"
                  onClick={() =>
                    setArtCount((count) => Math.min(count + 8, images.length))
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
                    <Music2 size={17} /> {playlist.title}
                  </h3>
                  <iframe
                    title={`SoundCloud playlist: ${playlist.title}`}
                    width="100%"
                    height="166"
                    loading="lazy"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlist.id}&color=%23b33e63&auto_play=false&hide_related=true&show_comments=false`}
                  />
                  <a
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://soundcloud.com/mirimomekiku/sets`}
                  >
                    Listen on SoundCloud <ArrowUpRight size={15} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="contact-section page-width" id="contact">
          <span className="contact-spark" aria-hidden="true">
            ✳
          </span>
          <p className="eyebrow">Have something in mind?</p>
          <h2>
            Let’s make something
            <br />
            <em>worth using.</em>
          </h2>
          <p>
            A project, a collaboration, or a simple hello.
            <br />
            I’d love to hear from you.
          </p>
          <div className="contact-actions">
            <a
              className="button primary"
              href="mailto:viernes.jhonlloydd@gmail.com"
            >
              Get in touch <ArrowUpRight size={18} />
            </a>
            <button
              className="text-link"
              onClick={copyEmail}
              aria-label={copied ? "Email copied!" : "Copy email address"}
            >
              {copied ? <Check size={16} /> : <Mail size={16} />}
              <span role="status">
                {copied ? "Email copied!" : "Copy email address"}
              </span>
            </button>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <p>
          © {new Date().getFullYear()} Jhon Lloyd Viernes
          <span>Crafted with curiosity & care.</span>
        </p>
        <div>
          <a
            href="https://github.com/dlord213"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a href="mailto:viernes.jhonlloydd@gmail.com" aria-label="Email">
            <Mail size={19} />
          </a>
          <a className="back-top" href="#home">
            Back to top ↑
          </a>
        </div>
      </footer>
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
              <p className="eyebrow">
                {selectedProject.group ?? "Personal project"} ·{" "}
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
              {selectedProject.link ? (
                <a
                  className="button primary"
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit project <ArrowUpRight size={16} />
                </a>
              ) : (
                <p className="project-access">
                  Professional project · Public source and demo links aren’t
                  listed.
                </p>
              )}
              <button
                className="button secondary"
                onClick={() => setSelectedProject(null)}
              >
                Back to projects
              </button>
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
    </>
  );
}
