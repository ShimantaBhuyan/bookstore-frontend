export default function StarRating({
  value,
  max = 5,
  size = 24,
  className = "",
  ...props
}) {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5;
  const emptyStars = max - fullStars - (halfStar ? 1 : 0);

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      {...props}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={"full-" + i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="#f6c700"
          stroke="#bfa100"
        >
          <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
        </svg>
      ))}
      {halfStar && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="#f6c700"
          stroke="#bfa100"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f6c700" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <polygon
            points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36"
            fill="url(#half)"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={"empty-" + i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="#e5e7eb"
          stroke="#bfa100"
        >
          <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
        </svg>
      ))}
    </span>
  );
}
