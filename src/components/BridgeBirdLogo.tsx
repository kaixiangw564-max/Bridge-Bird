export default function BridgeBirdLogo() {
  return (
    <div className="logo">
      <svg
        viewBox="0 0 40 40"
        width="40"
        height="40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bridge Bird logo"
        role="img"
      >
        <circle cx="20" cy="20" r="20" fill="var(--color-primary)" />
        <path
          d="M8 28 Q20 16 32 28"
          stroke="var(--color-accent)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 14 C18 8 14 6 14 6 C14 6 16 10 20 14Z"
          fill="var(--color-accent)"
        />
        <circle cx="22" cy="8" r="2" fill="var(--color-accent)" />
        <path
          d="M26 12 L28 10 M27 14 L30 13"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
