import { Urgency } from "@/types/analysis";

const URGENCY_LABELS: Record<Urgency, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export default function UrgencyBadge({ level }: { level: Urgency }) {
  return (
    <span className={`urgency-badge urgency-badge--${level}`} role="status">
      <span className="urgency-badge__indicator" aria-hidden="true" />
      {URGENCY_LABELS[level]}
    </span>
  );
}
