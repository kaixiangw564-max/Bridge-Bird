import { CampusResource } from "@/types/analysis";

export default function ResourceCard({
  resource,
  showWhy,
}: {
  resource: CampusResource;
  showWhy?: string;
}) {
  return (
    <article className="resource-card">
      <div className="resource-card__header">
        <h3 className="resource-card__name">{resource.name}</h3>
        {resource.verified && (
          <span className="verified-badge" aria-label="Verified resource">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="8" fill="var(--color-success)" />
              <path
                d="M5 8l2 2 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verified
          </span>
        )}
      </div>
      <p className="resource-card__category">{resource.category}</p>
      <p className="resource-card__description">{resource.description}</p>
      {resource.topics.length > 0 && (
        <div className="resource-card__topics">
          <span className="resource-card__label">Topics handled:</span>
          <div className="resource-card__tags">
            {resource.topics.map((topic) => (
              <span key={topic} className="resource-card__tag">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
      {resource.requiredDocuments.length > 0 && (
        <div className="resource-card__docs">
          <span className="resource-card__label">Common documents:</span>
          <ul className="resource-card__doc-list">
            {resource.requiredDocuments.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
      {showWhy && (
        <div className="resource-card__why">
          <strong>Why this resource?</strong>
          <p>{showWhy}</p>
        </div>
      )}
      <div className="resource-card__footer">
        <a
          href={resource.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-card__link"
        >
          Open official resource
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 11L11 1M11 1H4M11 1V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span className="resource-card__verified-date">
          Last verified: {resource.lastVerified}
        </span>
      </div>
    </article>
  );
}
