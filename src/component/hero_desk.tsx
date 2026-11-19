import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";

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

const now = [
  { name: "Oronikola", role: "Adaptive products", state: "Active" },
  { name: "Antimony Technologies", role: "Whipo · Flutter", state: "Active" },
  { name: "AdaptiveHub", role: "LMS · Library · Pay", state: "Shipping" },
];

const BOT_QUESTION = "Where are you based, and what time is it there?";

const blank = { target: "_blank", rel: "noreferrer" } as const;
const external = (href: string) => (href.startsWith("http") ? blank : {});

/** A framed halftone tile: a white UI panel on an engraved backdrop, caption underneath. */
export function Tile({
  art,
  title,
  text,
  className = "",
  children,
}: {
  art: number;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`tile ${className}`}
      style={{ "--art": `url(/assets/art/tile-${art}.png)` } as CSSProperties}
    >
      <div className="tile-stage">{children}</div>
      <div className="tile-cap">
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
    </article>
  );
}

function Clock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(time);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", hour: "numeric", hour12: false }).format(time),
  ) % 24;
  return (
    <div className="panel">
      <div className="panel-head">
        <span>Cagayan de Oro, PH</span>
        <span className="panel-dots" aria-hidden="true">⋮</span>
      </div>
      <p className="clock">
        {get("hour")}:{get("minute")}:{get("second")}
        <small>{get("dayPeriod")}</small>
      </p>
      <p className="panel-meta">PHT · UTC+8</p>
      <div className="hours" aria-hidden="true">
        {Array.from({ length: 24 }, (_, h) => (
          <i key={h} className={h === hour ? "on" : h >= 9 && h <= 22 ? "awake" : ""} />
        ))}
      </div>
      <div className="hours-axis" aria-hidden="true">
        <span>12a</span><span>6a</span><span>12p</span><span>6p</span>
      </div>
    </div>
  );
}

export function HeroDesk() {
  return (
    <div className="bento">
      <Tile art={1} title="Tiny bot" text="Ask anything — answers come straight from this page.">
        <div className="panel panel-bot">
          <div className="panel-title">
            <span className="panel-icon"><Sparkles size={14} aria-hidden="true" /></span>
            Ask mirimomekiku
          </div>
          <p className="panel-q">How can I help you today?</p>
          <p className="panel-box">{BOT_QUESTION}</p>
          <button
            className="panel-btn"
            onClick={() => window.dispatchEvent(new CustomEvent("portfolio:ask", { detail: BOT_QUESTION }))}
          >
            <Sparkles size={15} aria-hidden="true" /> Ask now
          </button>
          <span className="cursor-tag" aria-hidden="true">
            <MousePointer2 size={16} /> <b>you</b>
          </span>
        </div>
      </Tile>

      <Tile art={2} title="Currently" text="Where I'm shipping right now.">
        <div className="panel">
          <div className="panel-head"><span>Work in progress</span></div>
          <ul className="now-list">
            {now.map((n) => (
              <li key={n.name}>
                <span className="now-avatar" aria-hidden="true">{n.name[0]}</span>
                <span>
                  <strong>{n.name}</strong>
                  <small>{n.role}</small>
                </span>
                <em>{n.state}</em>
              </li>
            ))}
          </ul>
        </div>
      </Tile>

      <Tile art={3} title="Local time" text="Based in the Philippines, online mostly PHT hours.">
        <Clock />
      </Tile>

      <Tile art={4} title="Daily drivers" text="The tools I reach for first.">
        <div className="panel">
          <div className="panel-head"><span>My tech stack</span></div>
          <div className="dock">
            {dock.map((d) => (
              <a key={d.name} href={d.href} {...external(d.href)} aria-label={d.name} title={d.name}>
                <img src={`/assets/icons/${d.icon}.svg`} alt="" width="24" height="24" />
              </a>
            ))}
          </div>
        </div>
      </Tile>

      <Tile art={2} title="Hi, I'm mirimomekiku" text="Developer, sketcher, playlist curator.">
        <a href="#experience" className="panel polaroid" aria-label="About mirimomekiku">
          <img src="/assets/images/profile.jpeg" alt="mirimomekiku" width="557" height="991" />
          <span className="cap">mirimomekiku · CDO <ArrowUpRight size={13} aria-hidden="true" /></span>
        </a>
      </Tile>

      <Tile art={1} title="Off the clock" text="Art, music, games, and another idea open in a tab.">
        <div className="panel">
          <div className="panel-head"><span>Currently learning</span><span>72%</span></div>
          <strong className="learn">Kotlin + Jetpack Compose</strong>
          <div className="meter" aria-hidden="true"><i style={{ width: "72%" }} /></div>
          <div className="chip-row">
            {interests.map((i) => (
              <a key={i.label} href={i.href} {...external(i.href)}>
                {i.label}
              </a>
            ))}
          </div>
        </div>
      </Tile>
    </div>
  );
}
