import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import { answer, type Action } from "../lib/assistant";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  actions?: Action[];
}

const sections = [
  { id: "work", label: "see my work" },
  { id: "experience", label: "experience" },
  { id: "art", label: "art" },
  { id: "contact", label: "wanna chat?" },
];
const questions = ["who are you?", "what's your stack?", "how do you ship?"];
const links = [
  { label: "linkedin", href: "https://www.linkedin.com/in/jhon-lloyd-viernes/" },
  { label: "github", href: "https://github.com/mirimomekiku" },
];

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Types a bot reply out character by character. */
function Typewriter({ text, onDone }: { text: string; onDone: () => void }) {
  const [n, setN] = useState(reduced() ? text.length : 0);
  useEffect(() => {
    if (n >= text.length) {
      onDone();
      return;
    }
    const t = setTimeout(() => setN((v) => Math.min(text.length, v + 2)), 16);
    return () => clearTimeout(t);
  }, [n, text, onDone]);
  return <>{text.slice(0, n)}</>;
}

export function ChatDock() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typingId, setTypingId] = useState<number | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* slide the dock away while the contact section is on screen */
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send(question: string) {
    const q = question.trim();
    if (!q || thinking || typingId !== null) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    timer.current = setTimeout(() => {
      const reply = answer(q);
      const id = nextId.current++;
      setThinking(false);
      setTypingId(id);
      setMessages((m) => [...m, { id, role: "bot", ...reply }]);
    }, reduced() ? 0 : 650);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const open = messages.length > 0;

  return (
    <section
      className={`chatdock${hidden ? " is-hidden" : ""}`}
      aria-label="Ask mirimomekiku"
      aria-hidden={hidden}
      inert={hidden}
    >
      {open && (
        <div className="chat-panel glass-panel">
          <div className="chat-head">
            <span>tiny bot · answers come from this page</span>
            <button
              onClick={() => {
                clearTimeout(timer.current);
                setMessages([]);
                setThinking(false);
                setTypingId(null);
              }}
              aria-label="Clear conversation"
            >
              <X size={14} />
            </button>
          </div>
          <div className="chat-log" ref={log} role="log" aria-live="polite" data-lenis-prevent>
            {messages.map((m) => (
              <div key={m.id} className={`msg ${m.role}`}>
                <p>
                  {m.role === "bot" && m.id === typingId ? (
                    <Typewriter text={m.text} onDone={() => setTypingId(null)} />
                  ) : (
                    m.text
                  )}
                </p>
                {m.actions && m.id !== typingId && (
                  <div className="msg-actions">
                    {m.actions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        {...(a.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {a.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="msg bot" aria-label="Typing">
                <p className="dots-typing">
                  <i /><i /><i />
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="chat-chips">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="chip"
            aria-current={active === s.id ? "true" : undefined}
          >
            {s.label} <span aria-hidden="true">{s.id === "contact" ? "↓" : "↓"}</span>
          </a>
        ))}
        {questions.map((q) => (
          <button key={q} className="chip" onClick={() => send(q)}>
            {q}
          </button>
        ))}
        {links.map((l) => (
          <a key={l.label} className="chip" href={l.href} target="_blank" rel="noreferrer">
            {l.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <form className="chat-input" onSubmit={submit}>
        <span className="prompt" aria-hidden="true">&gt;_</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask mirimomekiku anything…"
          aria-label="Ask a question"
          maxLength={200}
          autoComplete="off"
          enterKeyHint="send"
        />
        <button type="submit" aria-label="Send" disabled={!input.trim() || thinking || typingId !== null}>
          <ArrowRight size={18} />
        </button>
      </form>
    </section>
  );
}
