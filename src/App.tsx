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
  Plus,
  Code2,
} from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";
import { SmoothScroll } from "./component/smooth_scroll";
import { AnimatedDetails } from "./component/animated_details";
import { useAnimatedLayout } from "./hooks/use_animated_layout";
import { useAnimatedDialog } from "./hooks/use_animated_dialog";
import { usePortfolioMotion } from "./hooks/use_portfolio_motion";
import { gsap, ScrollTrigger, useGSAP } from "./lib/animation";
import { useLenis } from "lenis/react";

const filters = ["All work", "Web", "Mobile", "AI & systems"];
const playlists = [
  { id: "1852158159", title: ". untitled ." },
  { id: "1653426820", title: "[ 1 ]" },
  { id: "1447603840", title: "- self" },
  { id: "1440835774", title: "MAY 18." },
];
const selected = [
  {
    title: "AdaptiveHub LMS",
    label: "Learning, with a little more possibility.",
    summary:
      "A connected learning experience for students, teachers, and the teams supporting them. Adaptive practice, classroom tools, and everyday progress — across web and mobile.",
    type: "lms",
  },
  {
    title: "Adaptive Library",
    label: "A new chapter for the school library.",
    summary:
      "From finding the right book to running the circulation desk. A shared platform for catalogs, borrowing, digital collections, and the people who use them.",
    type: "library",
  },
  {
    title: "Crest",
    label: "Making the moving parts work together.",
    summary:
      "Client relationships, delivery, finance, HR, and payroll in one connected workspace. A clearer view of the work behind school technology.",
    type: "crest",
  },
  {
    title: "Checkpoint",
    label: "Good games. One very long backlog.",
    summary:
      "A personal Android app for keeping track of what you’re playing, what you’ve finished, and the games you’ll definitely get around to. Eventually.",
    type: "checkpoint",
  },
];

function Flower({ className = "" }: { className?: string }) {
  return (
    <span className={`flower ${className}`} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <i key={index} style={{ rotate: `${index * 45}deg` }} />
      ))}
      <b>✳</b>
    </span>
  );
}

function ProjectArtwork({
  project,
  feature = false,
}: {
  project: ProjectInterface;
  feature?: boolean;
}) {
  if (project.imageSrc && !feature)
    return (
      <img
        className="project-image"
        src={project.imageSrc}
        alt={`${project.title} application preview`}
        loading="lazy"
      />
    );
  if (feature && project.title === "Checkpoint")
    return (
      <div className="case-art checkpoint-art">
        <span className="case-art-label">A PERSONAL SIDE QUEST</span>
        <div className="checkpoint-word">
          PLAY.
          <br />
          <span>LOG.</span>
          <br />
          REPEAT.
        </div>
        <div className="phone-frame">
          <span />
          <img
            src="/assets/projects/playlog/1.jpg"
            alt="Checkpoint game backlog application"
            loading="lazy"
          />
        </div>
        <span className="case-art-footnote">
          Kotlin / Jetpack Compose / Android
        </span>
      </div>
    );
  const library = project.title === "Adaptive Library";
  const crest = project.title === "Crest";
  return (
    <div
      className={`project-artwork ${project.color ?? "blue"} ${feature ? "feature-artwork" : ""} ${library ? "library-artwork" : ""} ${crest ? "crest-artwork" : ""}`}
      aria-hidden="true"
    >
      <span className="artwork-caption">
        {project.group ?? "Personal"} / {project.devices}
      </span>
      <div className="artwork-wordmark">
        {feature ? (
          library ? (
            <>
              A good
              <br />
              place to
              <br />
              <em>get lost.</em>
            </>
          ) : crest ? (
            <>
              Everything.
              <br />
              <em>Connected.</em>
            </>
          ) : (
            <>
              Room for
              <br />
              <em>curiosity.</em>
            </>
          )
        ) : (
          <>
            {project.mark ?? project.title.slice(0, 2).toLowerCase()}
            <sup>↗</sup>
          </>
        )}
      </div>
      {library ? (
        <div className="book-stack">
          <span>THE NEXT CHAPTER</span>
          <span>A LITTLE CURIOSITY</span>
          <span>ADAPTIVE LIBRARY ↗</span>
        </div>
      ) : (
        <div className="interface-window">
          <div className="interface-toolbar">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span>{project.title}</span>
            <ArrowUpRight size={10} />
          </div>
          <div className="interface-body">
            <aside>
              <b>{crest ? "crest." : "ah."}</b>
              <span />
              <span />
              <span />
              <span />
            </aside>
            <div className="interface-main">
              <span className="interface-eyebrow">
                {crest ? "YOUR WORKSPACE" : "YOUR NEXT DISCOVERY"}
              </span>
              <strong>
                {crest
                  ? "Good work starts here."
                  : "Keep your curiosity going."}
              </strong>
              <div className="interface-banner">
                <span>
                  {crest ? "One shared view." : "Small steps. Big ideas."}
                </span>
                <Flower />
              </div>
              <div className="interface-tiles">
                <div>
                  ↗<span>{crest ? "Clients" : "Discover"}</span>
                </div>
                <div>
                  ✳<span>{crest ? "Delivery" : "Practice"}</span>
                </div>
                <div>
                  ◉<span>{crest ? "Revenue" : "Master"}</span>
                </div>
              </div>
              <div className="interface-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      )}
      <span className="artwork-bottom">
        {feature
          ? "PRODUCT INTERFACE ILLUSTRATION"
          : project.stack.slice(0, 3).join(" / ")}
      </span>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All work");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("Index");
  const [scene, setScene] = useState("Mix");
  const [infoInitiallyOpen] = useState(() => window.innerWidth > 700);
  const [menuOpen, setMenuOpen] = useState(false);
  const [creativeTab, setCreativeTab] = useState("Art");
  const [artCount, setArtCount] = useState(6);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInterface | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [motionEnabled, setMotion] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const motion = motionEnabled && !reducedMotion;
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
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
  const { ref: menuDialog, close: closeMenu } = useAnimatedDialog(
    menuOpen,
    motion,
    () => setMenuOpen(false),
  );
  const projectLayout = useAnimatedLayout(`${filter}:${query}:${view}`, motion);
  const creativeLayout = useAnimatedLayout(
    `${creativeTab}:${artCount}`,
    motion,
  );
  usePortfolioMotion(root, motion);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const locked = selectedProject !== null || lightbox !== null || menuOpen;

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
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
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
  useGSAP(
    () => {
      if (!motion) return;
      gsap.fromTo(
        ".mood-item",
        { opacity: 0, scale: 0.88, y: 18 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.055,
          ease: "power3.out",
        },
      );
      gsap.utils
        .toArray<HTMLElement>(".mood-media", root.current!)
        .forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 ? 9 : -9,
            duration: 3.5 + index * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
    },
    { scope: root, dependencies: [scene, motion], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      if (lightbox === null || !motion) return;
      gsap.fromTo(
        ".art-dialog > img",
        { opacity: 0.2, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
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
  function openProject(title: string) {
    setSelectedProject(projects.find((project) => project.title === title)!);
  }
  function navigateFromMenu(href: string) {
    menuDialog.current?.close();
    setMenuOpen(false);
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    history.pushState(null, "", href);
    const focus = () => {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
    };
    if (motion && lenis) {
      lenis.start();
      lenis.scrollTo(target, {
        offset: -64,
        duration: 1,
        force: true,
        onComplete: focus,
      });
    } else {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "instant" });
        focus();
      });
    }
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
    <div
      ref={root}
      className={`portfolio ${motion ? "motion-on" : "motion-off"}`}
    >
      {motion && <SmoothScroll locked={locked} />}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-identity">
          <a
            className="brand chip"
            href="#home"
            aria-label="Jhon Lloyd Viernes, home"
          >
            jlv<span>↗</span>
          </a>
          <span className="header-caption chip">A personal portfolio</span>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="chip" href="#work">
            Work <sup>{projects.length}</sup>
          </a>
          <a className="chip" href="#background">
            About
          </a>
          <a className="chip" href="#creative">
            Playground
          </a>
          <a className="chip" href="#contact">
            Get in touch <ArrowUpRight size={12} />
          </a>
        </nav>
        <button
          className="chip mobile-menu"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
        >
          Menu <Plus size={13} />
        </button>
      </header>
      <section
        className={`hero scene-${scene.toLowerCase()}`}
        id="home"
        aria-labelledby="hero-title"
      >
        <div className="hero-widgets">
          <AnimatedDetails
            enabled={motion}
            className="info-window"
            open={infoInitiallyOpen}
            summary={
              <>
                <span>README.TXT</span>
                <Plus size={13} />
              </>
            }
          >
            <p>
              <strong>Jhon Lloyd Viernes</strong> is a software developer who
              likes useful things, thoughtful details, and a little room to
              play.
            </p>
            <div className="widget-footer">
              <span>
                <i /> Mobile / Web / Systems
              </span>
              <a href="#background">A little more ↗</a>
            </div>
          </AnimatedDetails>
          <button
            className="latest-window"
            onClick={() => openProject("AdaptiveHub LMS")}
            aria-label="Explore latest project, AdaptiveHub LMS"
          >
            <span className="window-heading">
              IN THE WORKS <ArrowUpRight size={13} />
            </span>
            <span className="latest-copy">
              A learning platform with a little more possibility.
            </span>
            <div className="latest-thumbnail">
              <span>
                adaptive<span>hub ↗</span>
              </span>
              <Flower />
            </div>
          </button>
        </div>
        <div
          className="moodboard"
          aria-label="A collection of projects and personal interests"
        >
          {scene !== "Work" && (
            <a className="mood-item mood-photo" href="#background">
              <div className="mood-media">
                <img
                  src="/assets/images/profile.jpeg"
                  alt="Jhon, away from the code editor"
                  fetchPriority="high"
                />
                <span>OUTSIDE.JPG ↗</span>
              </div>
            </a>
          )}
          <button
            className="mood-item mood-games"
            onClick={() => openProject("Checkpoint")}
            aria-label="Explore Checkpoint from the moodboard"
          >
            <div className="mood-media">
              <img
                src="/assets/projects/playlog/1.jpg"
                alt="Checkpoint mobile app"
              />
              <span>A SIDE QUEST ↗</span>
            </div>
          </button>
          {scene !== "Play" && (
            <button
              className="mood-item mood-music"
              onClick={() => openProject("Wavvy")}
              aria-label="Explore Wavvy from the moodboard"
            >
              <div className="mood-media">
                <img
                  src="/assets/projects/wavvy/1.jpg"
                  alt="Wavvy music player"
                />
                <span>NOW PLAYING ↗</span>
              </div>
            </button>
          )}
          <div className="mood-item mood-note">
            <div className="mood-media">
              <span className="note-pin" />
              <span>
                Less noise.
                <br />
                More <em>meaning.</em>
              </span>
              <small>A NOTE TO SELF</small>
            </div>
          </div>
          {scene !== "Work" && (
            <a
              className="mood-item mood-flower"
              href="#creative"
              aria-label="Explore the creative playground"
            >
              <div className="mood-media">
                <Flower />
                <span>STAY CURIOUS ↗</span>
              </div>
            </a>
          )}
          <button
            className="mood-item mood-code"
            onClick={() => openProject("Zync")}
            aria-label="Explore Zync from the moodboard"
          >
            <div className="mood-media">
              <span>hello, world_</span>
              <Code2 size={35} />
              <small>MADE TO CONNECT</small>
            </div>
          </button>
          {scene === "Work" && (
            <button
              className="mood-item mood-library"
              onClick={() => openProject("Adaptive Library")}
              aria-label="Explore Adaptive Library from the moodboard"
            >
              <div className="mood-media">
                <span>
                  Find your
                  <br />
                  <em>next chapter.</em>
                </span>
                <small>ADAPTIVE LIBRARY ↗</small>
              </div>
            </button>
          )}
          {scene === "Play" && (
            <div className="mood-item mood-type">
              <div className="mood-media">
                what
                <br />
                <i>if?</i>
              </div>
            </div>
          )}
        </div>
        <div className="hero-copy">
          <p className="hero-kicker">SOFTWARE DEVELOPER & CURIOUS HUMAN</p>
          <h1 id="hero-title">
            A curious mind building <br />
            useful digital things.
          </h1>
          <p className="hero-subtitle">
            Mobile experiences. Connected platforms.
            <br />A little unexpected.
          </p>
        </div>
        <a className="hero-scroll" href="#intro">
          Scroll to explore <ArrowDown size={13} />
        </a>
        <div
          className="scene-controls"
          role="group"
          aria-label="Moodboard collection"
        >
          {["Mix", "Work", "Play"].map((item) => (
            <button
              key={item}
              aria-pressed={scene === item}
              onClick={() => setScene(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="hero-edition">A WORK IN PROGRESS, ALWAYS.</span>
      </section>
      <main id="main">
        <section className="intro-section page-width" id="intro">
          <span className="section-label">
            Hello, I’m Jhon. Nice to meet you.
          </span>
          <h2>
            Good ideas deserve
            <br />a good <em>way in.</em>
          </h2>
          <div className="intro-bottom">
            <span className="intro-coordinate">A LITTLE CONTEXT ↘</span>
            <div className="intro-text">
              <p>
                I build mobile apps, web experiences, and the systems connecting
                them. My work spans learning platforms, library systems, school
                operations, and the occasional side project that starts with
                “what if?”
              </p>
              <p>
                Thoughtful interfaces. Dependable data flows. Details that make
                a complicated thing feel a little more natural.
              </p>
              <div className="capabilities">
                <span>Mobile development</span>
                <span>Full-stack engineering</span>
                <span>Connected systems</span>
              </div>
            </div>
          </div>
        </section>
        <section
          className="selected-work page-width"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-meta">
            <h2 id="work-title">A few things I’ve been making</h2>
            <span>SELECTED WORK / 01—04</span>
          </div>
          {selected.map((item, index) => {
            const project = projects.find(
              (project) => project.title === item.title,
            )!;
            return (
              <article
                className={`case-study ${index === 0 ? "case-feature" : ""}`}
                key={item.title}
              >
                <header className="case-heading">
                  <span className="section-label">
                    0{index + 1} / {project.title}
                  </span>
                  <h3>{item.label}</h3>
                  <div className="case-tags">
                    {project.stack.map((stack) => (
                      <span key={stack}>{stack}</span>
                    ))}
                  </div>
                </header>
                <div className="case-main">
                  <button
                    className="case-media"
                    aria-label={`View ${item.title} case study`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <ProjectArtwork project={project} feature />
                    <span className="case-view">
                      Explore project <ArrowUpRight size={14} />
                    </span>
                  </button>
                  <div className="case-description">
                    <p>{item.summary}</p>
                    <button
                      className="chip"
                      onClick={() => setSelectedProject(project)}
                    >
                      View project notes <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
        <section
          className="archive-section page-width"
          id="all-work"
          aria-labelledby="archive-title"
        >
          <div className="section-meta">
            <h2 id="archive-title">
              The full collection <span>({projects.length})</span>
            </h2>
            <div
              className="view-controls"
              role="group"
              aria-label="Project view"
            >
              {["Index", "Grid"].map((item) => (
                <button
                  key={item}
                  aria-pressed={view === item}
                  onClick={() => {
                    projectLayout.capture();
                    setView(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="work-controls">
            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item}
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
              <Search size={14} />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  projectLayout.capture();
                  setQuery(event.target.value);
                }}
                placeholder="Find a project or technology"
                aria-label="Search projects"
              />
            </label>
          </div>
          <p className="results-count" role="status">
            {visibleProjects.length} projects
            {query ? ` matching “${query}”` : ""}
          </p>
          <div
            className={`project-grid view-${view.toLowerCase()}`}
            ref={projectLayout.ref}
          >
            {visibleProjects.map((project, index) => (
              <article
                className="project-card"
                key={project.title}
                data-layout-item
                data-flip-id={`project-${project.title}`}
              >
                <button
                  className="project-entry"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Explore ${project.title}`}
                >
                  <div className="project-cover">
                    <ProjectArtwork project={project} />
                    <span className="project-cover-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <div className="entry-line">
                    <span className="entry-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{project.title}</h3>
                    <span className="entry-platform">{project.devices}</span>
                    <ArrowUpRight size={17} />
                  </div>
                </button>
                <p className="project-summary">{project.description}</p>
              </article>
            ))}
          </div>
          {visibleProjects.length === 0 && (
            <div className="empty-state">
              <h3>No projects found.</h3>
              <p>Try a different name, technology, or filter.</p>
              <button
                className="chip"
                onClick={() => {
                  projectLayout.capture();
                  setFilter("All work");
                  setQuery("");
                }}
              >
                Reset filters <ArrowUpRight size={13} />
              </button>
            </div>
          )}
        </section>
        <section
          className="background-section page-width"
          id="background"
          aria-labelledby="background-title"
        >
          <span className="section-label">The person behind the pixels</span>
          <div className="about-intro">
            <h2 id="background-title">
              Always curious.
              <br />
              <em>Still making.</em>
            </h2>
            <p>
              It started with modding GTA and building custom Android ROMs in
              high school. Somewhere along the way, taking things apart became a
              love for building things people can use.
            </p>
          </div>
          <div className="background-grid">
            <aside className="about-sidebar">
              <div className="about-photo">
                <img
                  src="/assets/images/profile.jpeg"
                  alt="Jhon Lloyd Viernes"
                  loading="lazy"
                />
                <span>JHON LLOYD VIERNES / OFFLINE</span>
              </div>
              <p>
                Software developer.
                <br />
                Occasional artist. Music person.
                <br />
                Always another idea open.
              </p>
              <a
                className="chip"
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
              >
                Connect on LinkedIn <ArrowUpRight size={12} />
              </a>
            </aside>
            <div className="background-content">
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
              <AnimatedDetails
                enabled={motion}
                open
                summary={
                  <>
                    <span>
                      AdaptiveHub<small>Full-stack & mobile development</small>
                    </span>
                    <span>Project work</span>
                  </>
                }
              >
                <p>
                  Connected school and business products across web, mobile, and
                  backend services: LMS, Library, Crest, AdaptivePay,
                  attendance, scheduling, conferencing, and AI services.
                </p>
              </AnimatedDetails>
              {[...experience].reverse().map((item) => (
                <AnimatedDetails
                  enabled={motion}
                  key={item.position + item.period}
                  summary={
                    <>
                      <span>{item.position}</span>
                      <span>{item.period}</span>
                    </>
                  }
                >
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
                </AnimatedDetails>
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
          </div>
        </section>
        <section
          className="creative-section page-width"
          id="creative"
          aria-labelledby="creative-title"
        >
          <div className="section-meta">
            <h2 id="creative-title">Other tabs I keep open.</h2>
            <div
              className="filters"
              role="group"
              aria-label="Creative interests"
            >
              {["Art", "Music"].map((tab) => (
                <button
                  key={tab}
                  aria-pressed={creativeTab === tab}
                  onClick={() => {
                    creativeLayout.capture();
                    setCreativeTab(tab);
                  }}
                >
                  {tab === "Music" && <Music2 size={12} />} {tab}
                </button>
              ))}
            </div>
          </div>
          <p className="creative-intro">
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
                        SKETCHBOOK / {String(index + 1).padStart(2, "0")}{" "}
                        <ArrowUpRight size={14} />
                      </span>
                    </button>
                  ))}
                </div>
                {artCount < images.length && (
                  <button
                    className="chip gallery-more"
                    onClick={() => {
                      creativeLayout.capture();
                      setArtCount((count) =>
                        Math.min(count + 6, images.length),
                      );
                    }}
                  >
                    More from the sketchbook <Plus size={12} />
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
                      <Music2 size={14} />
                      {playlist.title}
                    </h3>
                    <iframe
                      title={`SoundCloud playlist: ${playlist.title}`}
                      width="100%"
                      height="166"
                      loading="lazy"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlist.id}&color=%2328b4d8&auto_play=false&hide_related=true&show_comments=false`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="contact-section page-width" id="contact">
          <div className="contact-heading">
            <span className="section-label">
              A good conversation is a good start.
            </span>
            <h2>
              Something in mind?
              <br />
              <em>Let’s make it real.</em>
            </h2>
            <Flower />
          </div>
          <div className="contact-grid">
            <div>
              <button
                className="email-button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied!" : "Copy email address"}
              >
                <span>viernes.jhonlloydd@gmail.com</span>
                {copied ? <Check size={21} /> : <ArrowUpRight size={21} />}
              </button>
              <p className="copy-status" role="status">
                {copied
                  ? "Copied. Looking forward to it."
                  : "Click to copy, or send a little hello."}
              </p>
              <a
                className="chip email-link"
                href="mailto:viernes.jhonlloydd@gmail.com"
              >
                Write an email <Mail size={12} />
              </a>
            </div>
            <div className="contact-links">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/dlord213"
              >
                GitHub <ArrowUpRight size={13} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
              >
                LinkedIn <ArrowUpRight size={13} />
              </a>
              <a href="#home" aria-label="Back to top">
                Back to top <ArrowUp size={13} />
              </a>
            </div>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            jhon lloyd<span>↗</span>
          </div>
          <footer>
            <span>© {new Date().getFullYear()} Jhon Lloyd Viernes</span>
            <span>Made with curiosity. Always evolving.</span>
          </footer>
        </section>
      </main>
      <div className="utility-dock">
        <span>CODE, WITH A LITTLE CHARACTER.</span>
        <a
          href="https://github.com/dlord213"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <Github size={13} />
        </a>
        <a
          href="https://www.linkedin.com/in/jhon-lloyd-viernes/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <Linkedin size={13} />
        </a>
        <button
          className="motion-toggle"
          aria-label={
            reducedMotion
              ? "Animations disabled by system preference"
              : motion
                ? "Pause animations"
                : "Enable animations"
          }
          disabled={reducedMotion}
          aria-pressed={!motion}
          onClick={() => setMotion(!motion)}
        >
          {motion ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>
      <dialog
        ref={menuDialog}
        className="menu-dialog"
        aria-label="Navigation"
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setMenuOpen(false)}
      >
        <button
          className="dialog-close icon-button"
          aria-label="Close navigation"
          onClick={closeMenu}
          autoFocus
        >
          <X size={18} />
        </button>
        <span className="section-label">A few places to go</span>
        <nav aria-label="Mobile navigation">
          {[
            ["Work", "#work"],
            ["About", "#background"],
            ["Playground", "#creative"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              href={href}
              key={href}
              onClick={(event) => {
                event.preventDefault();
                navigateFromMenu(href);
              }}
            >
              {label}
              <ArrowUpRight size={25} />
            </a>
          ))}
        </nav>
        <span className="menu-signature">
          Jhon Lloyd Viernes / Software developer
        </span>
      </dialog>
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
            <button
              className="dialog-close icon-button"
              autoFocus
              aria-label="Close project"
              onClick={closeProject}
            >
              <X size={18} />
            </button>
            <ProjectArtwork project={selectedProject} />
            <div className="dialog-content">
              <span className="section-label">
                {selectedProject.group ?? "Personal project"} /{" "}
                {selectedProject.devices}
              </span>
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
                    className="chip dark-chip"
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project <ArrowUpRight size={13} />
                  </a>
                )}
                <button className="chip" onClick={closeProject}>
                  Back to projects <ArrowUpRight size={13} />
                </button>
              </div>
              {!selectedProject.link && (
                <p className="project-access">
                  Professional project / Public source and demo links aren’t
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
            <button
              className="dialog-close icon-button"
              aria-label="Close artwork"
              autoFocus
              onClick={closeArt}
            >
              <X size={18} />
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
