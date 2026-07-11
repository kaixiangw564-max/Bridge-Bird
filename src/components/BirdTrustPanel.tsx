import { Confidence } from "@/types/analysis";

const CONFIDENCE_LABELS: Record<Confidence, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function BirdTrustPanel({
  confidence,
  resourceMatched,
  lastVerified,
  needsHumanConfirmation,
}: {
  confidence: Confidence;
  resourceMatched: boolean;
  lastVerified: string | null;
  needsHumanConfirmation: boolean;
}) {
  return (
    <div className="birdtrust">
      <h2 className="birdtrust__title">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <path
            d="M12 8v4M12 16h.01"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        BirdTrust — Verification info
      </h2>
      <div className="birdtrust__grid">
        <div className="birdtrust__item">
          <span className="birdtrust__label">AI guidance confidence</span>
          <span
            className={`birdtrust__confidence birdtrust__confidence--${confidence}`}
          >
            {CONFIDENCE_LABELS[confidence]}
          </span>
        </div>
        <div className="birdtrust__item">
          <span className="birdtrust__label">Official resource matched</span>
          <span className="birdtrust__value">
            {resourceMatched ? "Yes" : "No"}
          </span>
        </div>
        {lastVerified && (
          <div className="birdtrust__item">
            <span className="birdtrust__label">Last verified</span>
            <span className="birdtrust__value">{lastVerified}</span>
          </div>
        )}
        <div className="birdtrust__item">
          <span className="birdtrust__label">Human confirmation recommended</span>
          <span className="birdtrust__value">
            {needsHumanConfirmation ? "Yes" : "No"}
          </span>
        </div>
      </div>
      <div className="birdtrust__separator" aria-hidden="true">
        <span>AI Interpretation</span>
        <span>Verified Resource Data</span>
      </div>
      <p className="birdtrust__warning">
        Always confirm deadlines and document requirements with the official
        campus office. AI-generated guidance may not reflect the latest policy
        changes.
      </p>
    </div>
  );
}
