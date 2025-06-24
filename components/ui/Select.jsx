export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`rounded border px-4 py-2 focus:ring-2 focus:ring-blue-200 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
