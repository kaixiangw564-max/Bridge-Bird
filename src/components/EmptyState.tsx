import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="var(--color-border)"
            strokeWidth="2"
          />
          <path
            d="M20 44 C28 28 36 28 44 44"
            stroke="var(--color-primary)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="24" cy="18" r="3" fill="var(--color-accent)" />
          <path
            d="M30 16L34 14 M32 20L38 18"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__description">{description}</p>
      <Link href={actionHref} className="btn btn--primary">
        {actionLabel}
      </Link>
    </div>
  );
}
