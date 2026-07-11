export default function LoadingAnalysis() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__spinner" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="var(--color-border)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="var(--color-primary)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="80"
            strokeDashoffset="60"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      <p className="loading__text">Analyzing your message...</p>
      <p className="loading__subtext">
        Bridge Bird is identifying key dates, required documents, and the right
        campus office.
      </p>
    </div>
  );
}
