import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bookmark, Github, Linkedin, Mail, X } from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";
import { Mascot } from "./component/mascot";

const EMAIL = "viernes.jhonlloydd@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jhon-lloyd-viernes/";
const GITHUB = "https://github.com/dlord213";
const verbs = [
  "Building",
  "Shipping",
  "Tinkering",
  "Sketching",
  "Debugging",
  "Wiring",
];
const filters = ["All", "Web", "Mobile", "AI & systems"];
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
      { label: "Antimony Technologies" },
      { label: "Oronikola", href: "https://oronikola.org" },
    ],
  },
  {
    title: "making",
    items: [
      { label: "Checkpoint", href: "https://play.google.com/store/apps/details?id=com.mirimomekiku.checkpoint" },
      { label: "Wavvy", href: "https://github.com/dlord213/wavvy-flutter" },
      { label: "Zync", href: "https://github.com/dlord213/zync" },
      { label: "TheoryPocket", href: "https://github.com/dlord213/theorypocket" },
    ],
  },
  {
    title: "listening",
    items: playlists.map((p) => ({ label: p.title, href: "#playground" })),
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

function useReveal(...deps: unknown[]) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function RotatingVerb() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % verbs.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="verb" key={i} aria-hidden="true">
      {verbs[i]}
    </span>
  );
}

function Paws() {
  const steps = [
    [0, 0, -22], [80, -44, -8], [168, -22, -30], [250, -70, -14], [338, -48, -34], [420, -96, -18],
  ];
  return (
    <svg className="paws" viewBox="0 -40 560 260" aria-hidden="true">
      <defs>
        <filter id="soft"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>
      {steps.map(([x, y, r], n) => (
        <g
          key={n}
          className="paw"
          style={{ animationDelay: `${0.4 + n * 0.45}s` }}
          transform={`translate(${x + 40} ${y + 120}) rotate(${r})`}
          filter="url(#soft)"
        >
          <ellipse cx="0" cy="8" rx="22" ry="17" />
          <ellipse cx="-24" cy="-14" rx="8" ry="11" transform="rotate(-24 -24 -14)" />
          <ellipse cx="-8" cy="-26" rx="8" ry="11" transform="rotate(-6 -8 -26)" />
          <ellipse cx="9" cy="-26" rx="8" ry="11" transform="rotate(6 9 -26)" />
          <ellipse cx="25" cy="-14" rx="8" ry="11" transform="rotate(24 25 -14)" />
        </g>
      ))}
    </svg>
  );
}

function Cover({ project }: { project: ProjectInterface }) {
  const imgs = project.images ?? [];
  if (!imgs.length)
    return (
      <div className="cover plain" style={{ background: project.tint }}>
        <span>{project.title}</span>
      </div>
    );
  if (project.shot === "web")
    return (
      <div className="cover web" style={{ background: project.tint }}>
        <div className="browser">
          <i /><i /><i />
          <img src={imgs[0]} alt="" loading="lazy" />
        </div>
      </div>
    );
  return (
    <div className="cover phones" style={{ background: project.tint }}>
      {imgs.slice(0, 3).map((src, n) => (
        <img key={src} src={src} alt="" loading="lazy" data-n={n} />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: ProjectInterface;
  onOpen: () => void;
}) {
  const tags = [project.group ?? "Personal", ...categoriesOf(project).slice(0, 2)];
  return (
    <article className="card" data-reveal>
      <button
        className="card-hit"
        onClick={onOpen}
        aria-label={`Open ${project.title}`}
      />
      <Cover project={project} />
      <div className="card-row">
        <h3>
          {project.title}
          {(project.link || project.store) && (
            <ArrowUpRight size={15} aria-hidden="true" />
          )}
        </h3>
        <p className="chips">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      </div>
      <p className="card-desc">{project.description}</p>
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
  useReveal(filter, artCount);

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
    <div id="home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="nav-icons">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <Mail size={20} />
          </a>
          <a href="#work" aria-label="Selected work">
            <Bookmark size={20} />
          </a>
        </div>
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
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">
            <RotatingVerb />
            <span className="sr-only">Building</span>
            <span className="hero-rest"> apps people love.</span>
          </h1>
          <Paws />
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <h2 id="work-title" className="script" data-reveal>
            Selected projects
          </h2>
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
          <div className="cards">
            {visible.map((p) => (
              <ProjectCard key={p.title} project={p} onOpen={() => setSelected(p)} />
            ))}
          </div>
        </section>

        <section id="playground" className="block" aria-labelledby="play-title">
          <h2 id="play-title" className="script" data-reveal>
            Playground
          </h2>
          <p className="lede" data-reveal>
            A sketchbook and a few playlists, for a different kind of flow.
          </p>
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
              className="mono-btn"
              onClick={() => setArtCount((c) => Math.min(c + 6, images.length))}
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
                  src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${pl.id}&color=%23e8532f&auto_play=false&hide_related=true&show_comments=false`}
                />
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="block about" aria-labelledby="about-title">
          <h2 id="about-title" className="script" data-reveal>
            About
          </h2>
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

          <h3 className="sub" data-reveal>Experience</h3>
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

          <h3 className="sub" data-reveal>Education</h3>
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
      </main>

      <footer className="footer">
        <Mascot className="footer-mascot" />
        <div className="footer-lists">
          {footerLists.map((list) => (
            <div key={list.title}>
              <h2 className="script">{list.title}</h2>
              <ul>
                {list.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bar">
          <p>Copyright @ mirimomekiku</p>
          <p>Lives in the Philippines</p>
          <p>Last updated on Oct 27 2026</p>
          <a className="paw-btn" href="#home" aria-label="Back to top">
            <svg viewBox="-30 -36 60 60" aria-hidden="true">
              <ellipse cx="0" cy="8" rx="14" ry="11" />
              <ellipse cx="-16" cy="-8" rx="5" ry="7" transform="rotate(-24 -16 -8)" />
              <ellipse cx="-5" cy="-17" rx="5" ry="7" />
              <ellipse cx="6" cy="-17" rx="5" ry="7" />
              <ellipse cx="17" cy="-8" rx="5" ry="7" transform="rotate(24 17 -8)" />
            </svg>
          </a>
        </div>
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
                  className="mono-btn"
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit <ArrowUpRight size={14} />
                </a>
              )}
              {selected.store && (
                <a
                  className="mono-btn"
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
