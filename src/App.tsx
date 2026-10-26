import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";
import { Mascot } from "./component/mascot";

const EMAIL = "viernes.jhonlloydd@gmail.com";
const verbs = [
  "Building",
  "Shipping",
  "Tinkering",
  "Sketching",
  "Debugging",
  "Wiring",
  "Listening",
  "Learning",
];
const filters = ["All", "Web", "Mobile", "AI & systems"];
const playlists = [
  { id: "1852158159", title: ". untitled ." },
  { id: "1653426820", title: "[ 1 ]" },
  { id: "1447603840", title: "- self" },
  { id: "1440835774", title: "MAY 18." },
];
const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jhon-lloyd-viernes/" },
  { label: "GitHub", href: "https://github.com/dlord213" },
  { label: "Email", href: `mailto:${EMAIL}` },
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

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectInterface;
  index: number;
  onOpen: () => void;
}) {
  const cover = project.images?.[0];
  return (
    <article className="card" data-reveal>
      <button
        className="card-hit"
        onClick={onOpen}
        aria-label={`Open ${project.title}`}
      />
      <div className="card-text">
        <span className="card-num">{String(index + 1).padStart(2, "0")}</span>
        <p className="card-tag">
          {project.group ?? "Personal"} · {project.devices}
        </p>
        <h3>{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <p className="card-stack">{project.stack.join(" / ")}</p>
      </div>
      <div className={`card-media${cover ? "" : " empty"}`} aria-hidden="true">
        {cover ? (
          <img src={cover} alt="" loading="lazy" />
        ) : (
          <span>{project.title}</span>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<ProjectInterface | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [artCount, setArtCount] = useState(6);
  const [copied, setCopied] = useState(false);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const artDialog = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useReveal();

  useEffect(() => () => clearTimeout(copyTimer.current), []);
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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <div id="home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <a className="brand" href="#home">
          mirimomekiku
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#playground">Playground</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </p>
            <h1>
              Software that feels <em>alive</em>.
            </h1>
            <p className="hero-sub">
              I’m mirimomekiku — a developer building mobile apps, web
              experiences, and the systems that make them work together.
            </p>
          </div>
          <Mascot className="hero-mascot" />
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...verbs, ...verbs, ...verbs, ...verbs].map((v, i) => (
              <span key={i}>{v}</span>
            ))}
          </div>
        </div>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-head" data-reveal>
            <h2 id="work-title">Selected projects</h2>
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
          <div className="cards">
            {visible.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                onOpen={() => setSelected(p)}
              />
            ))}
          </div>
        </section>

        <section
          id="playground"
          className="section"
          aria-labelledby="play-title"
        >
          <div className="section-head" data-reveal>
            <h2 id="play-title">Playground</h2>
            <p className="muted">A sketchbook, a few playlists, a different flow.</p>
          </div>
          <div className="art-grid">
            {images.slice(0, artCount).map((image, i) => (
              <button
                key={image.src}
                onClick={() => setLightbox(i)}
                aria-label={`View artwork ${i + 1}`}
                data-reveal
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
              className="pill"
              onClick={() =>
                setArtCount((c) => Math.min(c + 6, images.length))
              }
            >
              More sketches +
            </button>
          )}
          <div className="playlists">
            {playlists.map((pl) => (
              <div key={pl.id} data-reveal>
                <h3>{pl.title}</h3>
                <iframe
                  title={`SoundCloud playlist: ${pl.title}`}
                  width="100%"
                  height="166"
                  loading="lazy"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${pl.id}&color=%23ff7a59&auto_play=false&hide_related=true&show_comments=false`}
                />
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="section-head" data-reveal>
            <h2 id="about-title">About</h2>
          </div>
          <div className="about-grid" data-reveal>
            <div className="about-copy">
              <p>
                It started with modding GTA and building custom Android ROMs in
                high school. Now I work across <em>mobile, web, and backend</em>{" "}
                engineering, connecting interfaces to the systems behind them.
              </p>
              <p>
                Off the clock: art, music, games, and usually another idea open
                in a tab.
              </p>
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
          </div>

          <h3 className="sub" data-reveal>
            Experience
          </h3>
          <ul className="timeline">
            <li data-reveal>
              <span className="when">Project work</span>
              <div>
                <h4>AdaptiveHub</h4>
                <p>
                  Connected school and business products across web, mobile, and
                  backend services: LMS, Library, payments, conferencing, and
                  support.
                </p>
              </div>
            </li>
            {[...experience].reverse().map((item) => (
              <li key={item.position + item.period} data-reveal>
                <span className="when">{item.period}</span>
                <div>
                  <h4>{item.position}</h4>
                  <p>{item.description}</p>
                  <p className="tags">{item.skills.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="sub" data-reveal>
            Education
          </h3>
          <ul className="timeline">
            {education.map((e) => (
              <li key={e.school} data-reveal>
                <span className="when">{e.date}</span>
                <div>
                  <h4>{e.degree}</h4>
                  <p>{e.school}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section contact" aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>
            Let’s make something <em>together</em>.
          </h2>
          <button className="pill big" onClick={copyEmail} data-reveal>
            {copied ? (
              <>
                Copied <Check size={16} />
              </>
            ) : (
              EMAIL
            )}
          </button>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} mirimomekiku</p>
        <p>Last updated on Oct 27 2026</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      <dialog
        ref={projectDialog}
        className="sheet"
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
            <p className="card-tag">
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
            <p className="card-stack">{selected.stack.join(" / ")}</p>
            <div className="sheet-actions">
              {selected.link && (
                <a
                  className="pill"
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit <ArrowUpRight size={14} />
                </a>
              )}
              {selected.store && (
                <a
                  className="pill"
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
  );
}
