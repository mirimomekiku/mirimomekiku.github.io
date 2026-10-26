import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, Mail, Pause, Play } from "lucide-react";

const EMAIL = "viernes.jhonlloydd@gmail.com";

const dock = [
  { name: "Flutter", icon: "flutter", href: "https://flutter.dev" },
  { name: "Kotlin", icon: "kotlin", href: "https://kotlinlang.org" },
  { name: "React", icon: "react", href: "https://react.dev" },
  { name: "Figma", icon: "figma", href: "https://figma.com" },
  { name: "Godot", icon: "godotengine", href: "https://godotengine.org" },
  { name: "GitHub", icon: "github", href: "https://github.com/mirimomekiku" },
  { name: "Fedora", icon: "fedora", href: "https://fedoraproject.org" },
  { name: "Spotify", icon: "spotify", href: "https://spotify.com" },
];

const interests = [
  { label: "Pixel art", href: "#art" },
  { label: "Music", href: "#art" },
  { label: "Game design", href: "https://github.com/mirimomekiku/the-fox-run" },
  { label: "Lifting", href: "https://github.com/mirimomekiku/grit" },
  { label: "Fedora ricing", href: "https://github.com/mirimomekiku/gnome-ricing" },
];

const blank = { target: "_blank", rel: "noreferrer" } as const;
const external = (href: string) => (href.startsWith("http") ? blank : {});

/** A card that can be dragged around the desk; a tap (no movement) still clicks through. */
function Widget({
  className,
  rotate,
  delay,
  children,
}: {
  className: string;
  rotate: number;
  delay: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef<{
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);
  const suppress = useRef(false);

  function down(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: pos.current.x,
      oy: pos.current.y,
      moved: false,
    };
  }
  function move(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.classList.add("dragging");
    }
    pos.current = { x: d.ox + dx, y: d.oy + dy };
    el.style.translate = `${pos.current.x}px ${pos.current.y}px`;
  }
  function up() {
    const d = drag.current;
    drag.current = null;
    ref.current?.classList.remove("dragging");
    if (d?.moved) {
      suppress.current = true;
      setTimeout(() => (suppress.current = false), 0);
    }
  }

  return (
    <div
      ref={ref}
      className={`widget ${className}`}
      style={{ "--r": `${rotate}deg`, "--delay": `${delay}s` } as CSSProperties}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onClickCapture={(e) => {
        if (suppress.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {children}
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return (
    <>
      <span className="w-label">Cagayan de Oro, PH</span>
      <p className="clock">
        {get("hour")}:{get("minute")}:{get("second")}
        <small>{get("dayPeriod")}</small>
      </p>
      <span className="w-meta">PHT · UTC+8</span>
    </>
  );
}

function Stars() {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const shown = hover || rating;
  return (
    <>
      <span className="w-label">Rate this portfolio</span>
      <div className="stars" onPointerLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={n <= shown ? "on" : ""}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onPointerEnter={() => setHover(n)}
            onClick={() => setRating(n)}
          >
            ★
          </button>
        ))}
      </div>
      <span className="w-meta" role="status">
        {rating ? `Thanks for the ${rating}★!` : "Tap a star"}
      </span>
    </>
  );
}

function Music() {
  const [playing, setPlaying] = useState(true);
  return (
    <>
      <div className="music-top">
        <span className={`eq${playing ? " on" : ""}`} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <div>
          <strong>. untitled .</strong>
          <small>SoundCloud playlist</small>
        </div>
      </div>
      <div className="music-bar" aria-hidden="true">
        <i className={playing ? "on" : ""} />
      </div>
      <div className="music-ctl">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause visualizer" : "Play visualizer"}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <a href="#art">Listen below ↓</a>
      </div>
    </>
  );
}

export function HeroDesk({ onOpenLatest }: { onOpenLatest: () => void }) {
  return (
    <div className="desk">
      <Widget className="p-photo w-paper" rotate={-5} delay={0.5}>
        <a href="#experience" className="polaroid" aria-label="About mirimomekiku">
          <img src="/assets/images/profile.jpeg" alt="mirimomekiku" width="557" height="991" />
          <span className="cap">mirimomekiku · CDO</span>
        </a>
      </Widget>

      <Widget className="p-music w-dark" rotate={2} delay={0.65}>
        <Music />
      </Widget>

      <Widget className="p-hi w-dark" rotate={-4} delay={0.8}>
        <a href={`mailto:${EMAIL}`} className="w-link">
          <span className="w-label">Say hi</span>
          <strong>
            <Mail size={15} /> Send an email
          </strong>
          <small>Open to collaborations</small>
        </a>
      </Widget>

      <Widget className="p-now w-green" rotate={4} delay={0.95}>
        <a href="#experience" className="w-link">
          <span className="w-label">
            <i className="dot" /> Now
          </span>
          <strong>Software developer</strong>
          <ul>
            <li>AdaptiveHub</li>
            <li>Antimony Technologies</li>
            <li>Cagayan de Oro, PH</li>
          </ul>
        </a>
      </Widget>

      <Widget className="p-clock w-paper" rotate={-3} delay={1.1}>
        <Clock />
      </Widget>

      <Widget className="p-dock w-paper" rotate={3} delay={1.25}>
        <span className="w-label">Apps I use</span>
        <div className="dock">
          {dock.map((d) => (
            <a
              key={d.name}
              href={d.href}
              {...external(d.href)}
              aria-label={d.name}
              title={d.name}
            >
              <img src={`/assets/icons/${d.icon}.svg`} alt="" width="26" height="26" />
            </a>
          ))}
        </div>
      </Widget>

      <Widget className="p-learn w-yellow" rotate={-4} delay={1.4}>
        <span className="note">Currently learning</span>
        <strong className="note-big">Kotlin + Jetpack Compose</strong>
      </Widget>

      <Widget className="p-stars w-paper" rotate={-2} delay={1.5}>
        <Stars />
      </Widget>

      <Widget className="p-folder" rotate={0} delay={1.6}>
        <a href="#work" className="folder" aria-label="Open projects">
          <svg viewBox="0 0 120 92" aria-hidden="true">
            <path
              className="back"
              d="M6 14a8 8 0 0 1 8-8h28l10 12h54a8 8 0 0 1 8 8v52a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8z"
            />
            <rect className="sheet-in" x="16" y="22" width="88" height="50" rx="4" />
            <path
              className="front"
              d="M6 34a8 8 0 0 1 8-8h92a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8z"
            />
          </svg>
          <span className="w-label">My projects</span>
        </a>
      </Widget>

      <Widget className="p-latest w-paper" rotate={2} delay={1.7}>
        <button className="latest" onClick={onOpenLatest}>
          <span className="w-label">Latest project</span>
          <span className="latest-img">
            <img src="/assets/projects/adaptivelibrary/1.webp" alt="" loading="lazy" />
            <img src="/assets/projects/adaptivelibrary/2.webp" alt="" loading="lazy" />
          </span>
          <strong>
            Adaptive Library <ArrowUpRight size={14} />
          </strong>
        </button>
      </Widget>

      <Widget className="p-links w-blue" rotate={-4} delay={1.85}>
        <span className="w-label">Find me online</span>
        <a className="w-row" href="https://www.linkedin.com/in/jhon-lloyd-viernes/" {...blank}>
          LinkedIn <ArrowUpRight size={13} />
        </a>
        <a className="w-row" href="https://github.com/mirimomekiku" {...blank}>
          GitHub <ArrowUpRight size={13} />
        </a>
      </Widget>

      <Widget className="p-chips w-paper" rotate={-2} delay={2}>
        <span className="w-label">Interests</span>
        <div className="chip-row">
          {interests.map((i) => (
            <a key={i.label} href={i.href} {...external(i.href)}>
              {i.label}
            </a>
          ))}
        </div>
      </Widget>
    </div>
  );
}
