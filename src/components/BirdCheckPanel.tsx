export default function BirdCheckPanel({
  department,
  departmentReason,
  notRecommendedDepartment,
  notRecommendedReason,
}: {
  department: string;
  departmentReason: string;
  notRecommendedDepartment: string | null;
  notRecommendedReason: string | null;
}) {
  return (
    <div className="birdcheck">
      <h2 className="birdcheck__title">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 12l2 2 4-4"
            stroke="var(--color-success)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="10" stroke="var(--color-success)" strokeWidth="2" />
        </svg>
        BirdCheck — Department matching
      </h2>
      <div className="birdcheck__card birdcheck__card--yes">
        <p className="birdcheck__label">Recommended department</p>
        <p className="birdcheck__value">{department}</p>
        <p className="birdcheck__reason">{departmentReason}</p>
      </div>
      {notRecommendedDepartment && (
        <div className="birdcheck__card birdcheck__card--no">
          <p className="birdcheck__label">Not recommended</p>
          <p className="birdcheck__value">{notRecommendedDepartment}</p>
          {notRecommendedReason && (
            <p className="birdcheck__reason">{notRecommendedReason}</p>
          )}
        </div>
      )}
    </div>
  );
}
