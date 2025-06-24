export default function Button({
  children,
  className = "",
  variant = "primary",
  disabled,
  ...props
}) {
  const base =
    "px-4 py-2 rounded focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gray-700 text-white hover:bg-gray-800",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
  };
  return (
    <button
      className={`${base} ${variants[variant] || ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
