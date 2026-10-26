import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, X } from "lucide-react";
import projects, { type ProjectInterface } from "./types/projects";
import education from "./types/education";
import experience from "./types/experience";
import images from "./types/images";

const EMAIL = "viernes.jhonlloydd@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jhon-lloyd-viernes/";
const GITHUB = "https://github.com/dlord213";
const verbs = [
  { word: "Building", font: "'Pixelify Sans', monospace" },
  { word: "Shipping", font: "'Permanent Marker', cursive" },
  { word: "Tinkering", font: "'Special Elite', monospace" },
  { word: "Sketching", font: "'Gochi Hand', cursive" },
  { word: "Debugging", font: "'VT323', monospace" },
  { word: "Wiring", font: "'Rubik Mono One', sans-serif" },
];
const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "art", label: "Art" },
  { id: "contact", label: "Contact" },
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

/** Types each verb in its own typeface, holds, erases, then moves on. */
function TypewriterVerb() {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const { word, font } = verbs[index];

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
    <span className="verb" style={{ fontFamily: font }} aria-hidden="true">
      {reduced ? word : word.slice(0, length)}
      <span className="verb-caret" />
    </span>
  );
}

const SCRAMBLE = "!<>-_\\/[]{}=+*^?#01";
const prefersReduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Text decodes from random glyphs into the final string. */
function Scramble({ text, delay = 400 }: { text: string; delay?: number }) {
  const [out, setOut] = useState(() => text.replace(/\S/g, "·"));
  useEffect(() => {
    if (prefersReduced()) {
      setOut(text);
      return;
    }
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        frame++;
        const done = Math.floor(frame / 2);
        setOut(
          text
            .split("")
            .map((c, i) =>
              c === " " || i < done
                ? c
                : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
            )
            .join(""),
        );
        if (done >= text.length) clearInterval(timer);
      }, 40);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, delay]);
  return <>{out}</>;
}

/** Per-letter rise + blur-in, then a travelling sheen and gentle wave. */
function Letters({ text, start = 0.4 }: { text: string; start?: number }) {
  let n = 0;
  return (
    <>
      {text.split(" ").map((word, w) => (
        <span className="word" key={w}>
          {word.split("").map((c) => {
            const i = n++;
            return (
              <span
                className="ch"
                key={i}
                style={{ "--i": i, "--d": `${start + i * 0.05}s` } as CSSProperties}
              >
                {c}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

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

/** Drifting orbs, a panning dot grid, orbiting rings and floating glass glyph tiles. */
function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const move = (e: PointerEvent) => {
      el.style.setProperty("--mx", String((e.clientX / innerWidth - 0.5) * 2));
      el.style.setProperty("--my", String((e.clientY / innerHeight - 0.5) * 2));
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);
  const glyphs = ["</>", "{ }", "✦", "( )=>", "01", "npm", "git", "</"];
  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="layer l1">
        <i className="orb o1" />
        <i className="orb o2" />
        <i className="orb o3" />
      </div>
      <div className="dots" />
      <svg className="rings" viewBox="-200 -200 400 400">
        <circle r="90" />
        <circle r="140" />
        <circle r="190" />
        <circle className="sat s1" r="5" cx="90" />
        <circle className="sat s2" r="4" cx="-140" />
        <circle className="sat s3" r="6" cx="0" cy="190" />
      </svg>
      <div className="layer l2">
        {glyphs.map((g, n) => (
          <span key={g} className={`tile glass t${n + 1}`}>
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}

function Typed({
  id,
  text,
  font,
  className = "script",
}: {
  id?: string;
  text: string;
  font: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={className} data-reveal>
      <span
        className="typed"
        style={
          {
            fontFamily: font,
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

function BottomNav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          aria-current={active === n.id ? "true" : undefined}
        >
          {n.label}
        </a>
      ))}
    </nav>
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
        <div className="nav-icons glass">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        <a className="brand glass" href="#home">
          mirimomekiku
        </a>
      </header>
      <BottomNav />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <HeroBackdrop />
          <div className="hero-inner">
            <p className="eyebrow glass" aria-hidden="true">
              <Scramble text="mirimomekiku · software developer" />
            </p>
            <h1 id="hero-title">
              <span className="sr-only">Building apps people love.</span>
              <span className="verb-line" aria-hidden="true">
                <TypewriterVerb />
              </span>
              <span className="hero-rest" aria-hidden="true">
                <Letters text="apps people love." />
              </span>
            </h1>
            <p className="hero-sub">
              I work across <Roller words={["mobile", "web", "backend", "AI"]} />
            </p>
          </div>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <Typed id="work-title" text="Projects" font="'Caveat', cursive" />
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

        <section id="experience" className="block about" aria-labelledby="exp-title">
          <Typed id="exp-title" text="Experience" font="'Special Elite', monospace" />
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

          <h3 className="sub" data-reveal>Work history</h3>
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
        <section id="art" className="block" aria-labelledby="art-title">
          <Typed id="art-title" text="Art" font="'Gochi Hand', cursive" />
          <p className="lede" data-reveal>
            Sketches and playlists, for a different kind of flow.
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

      </main>

      <footer className="footer" id="contact">
        <div className="footer-hello">
          <Typed text="Say hello" font="'Pacifico', cursive" className="script hello" />
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="footer-lists">
          {footerLists.map((list) => (
            <div key={list.title}>
              <h3 className="script">{list.title}</h3>
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
          <a className="top-btn" href="#home" aria-label="Back to top">
            ↑
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
