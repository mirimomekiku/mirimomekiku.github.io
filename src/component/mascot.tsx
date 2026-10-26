/** Hand-drawn SVG cat for the mirimomekiku brand. Animation lives in globals.css. */
export function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mascot ${className}`}
      viewBox="0 0 240 240"
      role="img"
      aria-label="mirimomekiku, a cat with a laptop"
    >
      <ellipse className="m-shadow" cx="120" cy="222" rx="78" ry="9" />
      <path
        className="m-tail"
        d="M176 190c34 4 52-18 40-46-6-13-1-22 8-22"
        fill="none"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path className="m-body" d="M62 214c-6-48 8-84 58-84s64 36 58 84z" />
      <g className="m-head">
        <path className="m-ear" d="M62 80 58 28l40 24z" />
        <path className="m-ear" d="M178 80l4-52-40 24z" />
        <path className="m-ear-in" d="M68 68 66 44l18 11z" />
        <path className="m-ear-in" d="M172 68l2-24-18 11z" />
        <ellipse className="m-face" cx="120" cy="96" rx="66" ry="56" />
        <g className="m-eyes">
          <ellipse cx="94" cy="92" rx="8" ry="11" />
          <ellipse cx="146" cy="92" rx="8" ry="11" />
          <circle className="m-glint" cx="97" cy="87" r="3" />
          <circle className="m-glint" cx="149" cy="87" r="3" />
        </g>
        <path className="m-nose" d="m114 108 12 0-6 7z" />
        <path
          className="m-mouth"
          d="M120 115c0 7-7 9-12 6m12-6c0 7 7 9 12 6"
          fill="none"
          strokeLinecap="round"
        />
        <g className="m-whiskers" strokeLinecap="round">
          <path d="M70 108 44 102M70 116 44 120M170 108l26-6M170 116l26 4" />
        </g>
        <circle className="m-blush" cx="80" cy="114" r="9" />
        <circle className="m-blush" cx="160" cy="114" r="9" />
      </g>
      <g className="m-laptop">
        <path className="m-lid" d="M76 196 90 150h60l14 46z" />
        <circle className="m-logo" cx="120" cy="174" r="6" />
        <rect className="m-base" x="62" y="196" width="116" height="10" rx="5" />
      </g>
      <g className="m-paws">
        <ellipse cx="92" cy="198" rx="13" ry="9" />
        <ellipse cx="148" cy="198" rx="13" ry="9" />
      </g>
      <g className="m-spark">
        <path d="M30 60l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
        <path d="M208 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </g>
    </svg>
  );
}
