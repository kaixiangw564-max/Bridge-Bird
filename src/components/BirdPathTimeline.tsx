export default function BirdPathTimeline({
  actions,
}: {
  actions: string[];
}) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="birdpath">
      <h2 className="birdpath__title">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 20C4 20 10 8 20 4"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="4" r="2" fill="var(--color-accent)" />
        </svg>
        BirdPath — Your step-by-step action plan
      </h2>
      <ol className="birdpath__list">
        {actions.map((action, i) => (
          <li key={i} className="birdpath__step">
            <div className="birdpath__step-marker">
              <span className="birdpath__step-number">{i + 1}</span>
              {i < actions.length - 1 && (
                <div className="birdpath__step-line" aria-hidden="true" />
              )}
            </div>
            <div className="birdpath__step-content">
              <p>{action}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
