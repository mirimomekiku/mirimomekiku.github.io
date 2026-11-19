import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Moon, Radio, Sun, X } from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";
import { HeroDesk, Tile } from "./component/hero_desk";
import { ChatDock } from "./component/chat_dock";
import { SmoothScroll } from "./component/smooth_scroll";
import { usePageMotion } from "./hooks/page_motion";

const EMAIL = "viernes.jhonlloydd@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jhon-lloyd-viernes/";
const GITHUB = "https://github.com/dlord213";
const verbs = ["Building", "Shipping", "Tinkering", "Sketching", "Debugging", "Wiring"];
const filters = ["All", "Web", "Mobile", "AI & systems"];
const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#art", label: "Art" },
];
const marquee = ["AdaptiveHub", "Whipo", "Oronikola", "educentra.ai", "Adaptive Library", "Checkpoint", "Wavvy", "QuickEase"];
const playlists = [
  { id: "1852158159", title: ". untitled ." },
  { id: "1653426820", title: "[ 1 ]" },
  { id: "1447603840", title: "- self" },
  { id: "1440835774", title: "MAY 18." },
];
const footerLists = [
  {
    title: "working",
    items: [
      { label: "AdaptiveHub", href: "https://adaptivehub.app" },
      { label: "Antimony Technologies", href: "https://whipo.ph/" },
      { label: "Oronikola", href: "https://oronikola.org" },
    ],
  },
  {
    title: "making",
    items: [
      { label: "Checkpoint", href: "https://play.google.com/store/apps/details?id=com.mirimomekiku.checkpoint" },
      { label: "Wavvy", href: "https://github.com/dlord213/wavvy-flutter" },
    ],
  },
  {
    title: "listening",
    items: playlists.map((p) => ({ label: p.title, href: "#art" })),
  },
  {
    title: "elsewhere",
    items: [
      { label: "LinkedIn", href: LINKEDIN },
      { label: "GitHub", href: GITHUB },
      { label: "Email", href: `mailto:${EMAIL}` },
    ],
  },
];

function categoriesOf(project: ProjectInterface) {
  return (
    project.category ??
    ["Web", "Mobile"].filter((c) =>
      c === "Web"
        ? project.devices.includes("Web")
        : /Android|Windows|Linux/.test(project.devices),
    )
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/** Types each verb in its own typeface, holds, erases, then moves on. */
function TypewriterVerb() {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const word = verbs[index];

  useEffect(() => {
    if (reduced) return;
    let delay = deleting ? 45 : 90;
    if (!deleting && length === word.length) delay = 1700;
    if (deleting && length === 0) delay = 300;
    const t = setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % verbs.length);
      } else setLength(length + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [length, deleting, word, reduced]);

  return (
    <span className="verb" aria-hidden="true">
      {reduced ? word : word.slice(0, length)}
      <span className="verb-caret" />
    </span>
  );
}

const prefersReduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Slot-machine style word swap: the old word rolls up as the new one arrives. */
function Roller({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReduced()) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  const prev = (i - 1 + words.length) % words.length;
  return (
    <span className="roller" aria-hidden="true">
      <span className="roll-out" key={`o${i}`}>{words[prev]}</span>
      <span className="roll-in" key={`i${i}`}>{words[i]}</span>
      <span className="roll-size">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
    </span>
  );
}

function Typed({
  id,
  text,
  className = "display",
}: {
  id?: string;
  text: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={className} data-reveal>
      <span
        className="typed"
        style={
          {
            "--n": text.length,
            "--dur": `${Math.max(0.8, text.length * 0.07)}s`,
          } as CSSProperties
        }
      >
        {text}
      </span>
    </h2>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#0c100e" : "#ffffff");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* the choice still applies for this visit */
    }
    setDark(!dark);
  }
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
    >
      <Sun className="sun" size={16} aria-hidden="true" />
      <Moon className="moon" size={16} aria-hidden="true" />
    </button>
  );
}

function Cover({ project }: { project: ProjectInterface }) {
  const imgs = project.images ?? [];
  if (!imgs.length)
    return (
      <div className="cover plain">
        <span>{project.title}</span>
      </div>
    );
  if (project.shot === "web")
    return (
      <div className="cover web">
        <div className="browser">
          <i /><i /><i />
          <img src={imgs[0]} alt="" loading="lazy" />
        </div>
      </div>
    );
  return (
    <div className="cover phones">
      {imgs.slice(0, 3).map((src, n) => (
        <img key={src} src={src} alt="" loading="lazy" data-n={n} />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectInterface;
  index: number;
  onOpen: () => void;
}) {
  const tags = [project.group ?? "Personal", ...categoriesOf(project).slice(0, 2)];
  return (
    <article
      className="card tile"
      style={{ "--art": `url(/assets/art/tile-${(index % 4) + 1}.png)` } as CSSProperties}
    >
      <button
        className="card-hit"
        onClick={onOpen}
        aria-label={`Open ${project.title}`}
      />
      <div className="tile-stage">
        <Cover project={project} />
      </div>
      <div className="tile-cap">
        <p className="chips">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
        <h3>
          {project.title}
          {(project.link || project.store) && (
            <ArrowUpRight size={18} aria-hidden="true" />
          )}
        </h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<ProjectInterface | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [artCount, setArtCount] = useState(6);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const artDialog = useRef<HTMLDialogElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useReveal();
  usePageMotion(root, filter);

  useEffect(() => {
    const d = projectDialog.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
  }, [selected]);
  useEffect(() => {
    const d = artDialog.current;
    if (!d) return;
    if (lightbox !== null && !d.open) d.showModal();
    if (lightbox === null && d.open) d.close();
  }, [lightbox]);

  const visible = projects.filter(
    (p) => filter === "All" || categoriesOf(p).includes(filter),
  );

  return (
    <SmoothScroll>
    <div id="home" ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="frame nav-row">
          <a className="logo" href="#home" aria-label="mirimomekiku, back to top">
            <span className="logo-mark" aria-hidden="true">m</span>
            mirimomekiku
          </a>
          <nav className="nav-links" aria-label="Sections">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <div className="nav-icons">
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={16} />
              </a>
            </div>
            <ThemeToggle />
            <a className="btn btn-light nav-hide" href="#work">See work</a>
            <a className="btn btn-dark" href={`mailto:${EMAIL}`}>
              <Mail size={14} aria-hidden="true" /> Email me
            </a>
          </div>
        </div>
      </header>
      <ChatDock />

      <main id="main">
        <section id="hero" className="hero" aria-labelledby="hero-title">
          <div className="frame ticker">
            <p className="tick-cell">
              <span className="pill">Now</span>
              <Radio size={15} aria-hidden="true" />
              Software developer at Oronikola
            </p>
            <p className="tick-cell tick-stack">
              <span className="faces" aria-hidden="true">
                {["flutter", "react", "kotlin"].map((i) => (
                  <img key={i} src={`/assets/icons/${i}.svg`} alt="" width="16" height="16" />
                ))}
              </span>
              Shipping with Flutter, React &amp; Laravel
            </p>
            <div className="tick-marquee" aria-label="Products I've worked on">
              <div className="marquee-track">
                {[...marquee, ...marquee].map((m, i) => (
                  <span key={i} aria-hidden={i >= marquee.length}>{m}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img src="/assets/art/hero.png" alt="" />
          </div>
          <div className="frame hero-frame">
            <div className="hero-inner">
              <h1 id="hero-title">
                <span className="sr-only">Building apps people love.</span>
                <span aria-hidden="true">
                  <TypewriterVerb />
                  <br />
                  apps people love.
                </span>
              </h1>
              <p className="hero-sub">
                Software developer from Cagayan de Oro. I work across{" "}
                <Roller words={["mobile", "web", "backend", "AI"]} />
              </p>
              <div className="hero-cta">
                <a className="btn btn-light" href="#work">See selected work</a>
                <a className="btn btn-dark" href="#contact">Say hello</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="frame section-frame">
            <div className="section-head">
              <h2 id="about-title" className="display" data-reveal>
                Apps, sites &amp; the systems behind them
              </h2>
              <div className="section-lede">
                <p>
                  It started with modding GTA and building custom Android ROMs in
                  high school. Now I work across <em>mobile, web, and backend</em>{" "}
                  engineering, connecting interfaces to the systems behind them.
                </p>
              </div>
            </div>
            <HeroDesk />
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="exp-title">
          <div className="frame section-frame">
            <div className="section-head">
              <Typed id="exp-title" text="Experience" />
              <div className="section-lede">
                <p>
                  From freelance commissions to full-time product work: mobile
                  apps, web platforms, and the backends that hold them together.
                </p>
              </div>
            </div>
            <dl className="skills">
              <div>
                <dt>Interfaces &amp; mobile</dt>
                <dd>
                  Flutter · Dart · Kotlin · Jetpack Compose · React · Expo ·
                  Tailwind CSS
                </dd>
              </div>
              <div>
                <dt>Systems &amp; data</dt>
                <dd>
                  Laravel · Node.js · Next.js · Express · Fastify · MySQL ·
                  PostgreSQL · AI integrations
                </dd>
              </div>
            </dl>

            <div className="ledger">
              <h3 className="ledger-label">Work history</h3>
              <ul className="timeline">
                {[...experience].reverse().map((item) => (
                  <li key={item.position + item.period}>
                    <span className="when">{item.period}</span>
                    <div>
                      <h4>{item.position}</h4>
                      <p>{item.description}</p>
                      <p className="tags">{item.skills.join(" · ")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ledger">
              <h3 className="ledger-label">Education</h3>
              <ul className="timeline">
                {education.map((e) => (
                  <li key={e.school}>
                    <span className="when">{e.date}</span>
                    <div>
                      <h4>{e.degree}</h4>
                      <p>{e.school}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="work" className="section work" aria-labelledby="work-title">
          <div className="frame section-frame">
            <div className="section-head">
              <Typed id="work-title" text="Selected work" />
              <div className="section-lede">
                <p>
                  Learning platforms, marketplaces, and small apps I made for
                  myself. Open any card for notes and screenshots.
                </p>
                <div className="filters" role="group" aria-label="Filter projects">
                  {filters.map((f) => (
                    <button
                      key={f}
                      aria-pressed={filter === f}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="cards">
              {visible.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} onOpen={() => setSelected(p)} />
              ))}
            </div>
          </div>
        </section>

        <section id="art" className="section" aria-labelledby="art-title">
          <div className="frame section-frame">
            <div className="section-head">
              <Typed id="art-title" text="Art & sound" />
              <div className="section-lede">
                <p>Sketches and playlists, for a different kind of flow.</p>
              </div>
            </div>
            <div className="art-grid">
              {images.slice(0, artCount).map((image, i) => (
                <button
                  key={image.src}
                  onClick={() => setLightbox(i)}
                  aria-label={`View artwork ${i + 1}`}
                >
                  <img
                    src={image.src}
                    alt={`Personal artwork ${i + 1}`}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            {artCount < images.length && (
              <button
                className="btn btn-dark more-btn"
                onClick={() => setArtCount((c) => Math.min(c + 6, images.length))}
              >
                More sketches +
              </button>
            )}
            <div className="playlists">
              {playlists.map((pl, i) => (
                <Tile key={pl.id} art={(i % 4) + 1} title={pl.title} text="SoundCloud playlist">
                  <iframe
                    title={`SoundCloud playlist: ${pl.title}`}
                    width="100%"
                    height="166"
                    loading="lazy"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${pl.id}&color=%232f4a3c&auto_play=false&hide_related=true&show_comments=false`}
                  />
                </Tile>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="frame footer-frame">
          <div className="footer-hello">
            <Typed text="Say hello" className="display hello" />
            <div>
              <p>Open to collaborations, freelance work, and good conversations about apps.</p>
              <a className="btn btn-light" href={`mailto:${EMAIL}`}>
                <Mail size={14} aria-hidden="true" /> {EMAIL}
              </a>
            </div>
          </div>
          <div className="footer-lists">
            {footerLists.map((list) => (
              <div key={list.title}>
                <h3>{list.title}</h3>
                <ul>
                  {list.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bar">
            <p>© mirimomekiku</p>
            <p>Lives in the Philippines</p>
            <p>Last updated Nov 20 2026</p>
            <a className="top-btn" href="#home" aria-label="Back to top">
              ↑
            </a>
          </div>
        </div>
      </footer>

      <dialog
        ref={projectDialog}
        className="sheet"
        data-lenis-prevent
        aria-labelledby="sheet-title"
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
      >
        {selected && (
          <div className="sheet-body">
            <button
              className="icon"
              autoFocus
              aria-label="Close project"
              onClick={() => setSelected(null)}
            >
              <X size={18} />
            </button>
            <p className="sheet-tag">
              {selected.group ?? "Personal"} · {selected.devices}
            </p>
            <h2 id="sheet-title">{selected.title}</h2>
            <p className="sheet-desc">{selected.description}</p>
            {selected.images && (
              <div className="shots">
                {selected.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${selected.title} screenshot ${i + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            )}
            {selected.highlights && (
              <ul className="highlights">
                {selected.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <p className="sheet-tag">{selected.stack.join(" / ")}</p>
            <div className="sheet-actions">
              {selected.link && (
                <a
                  className="btn btn-dark"
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit <ArrowUpRight size={14} />
                </a>
              )}
              {selected.store && (
                <a
                  className="btn btn-dark"
                  href={selected.store}
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Play <ArrowUpRight size={14} />
                </a>
              )}
            </div>
            {!selected.link && !selected.store && (
              <p className="muted">
                Professional project — public links aren’t listed.
              </p>
            )}
          </div>
        )}
      </dialog>

      <dialog
        ref={artDialog}
        className="sheet art"
        data-lenis-prevent
        aria-label="Artwork viewer"
        onClose={() => setLightbox(null)}
        onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft")
            setLightbox((i) => ((i ?? 0) - 1 + images.length) % images.length);
          if (e.key === "ArrowRight")
            setLightbox((i) => ((i ?? 0) + 1) % images.length);
        }}
      >
        {lightbox !== null && (
          <div className="sheet-body">
            <button
              className="icon"
              autoFocus
              aria-label="Close artwork"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <img
              src={images[lightbox].src}
              alt={`Personal artwork ${lightbox + 1}`}
            />
            <p className="muted">
              {lightbox + 1} / {images.length} · use ← → to browse
            </p>
          </div>
        )}
      </dialog>
    </div>
    </SmoothScroll>
  );
}
