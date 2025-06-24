export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`rounded border px-4 py-2 placeholder:text-sm focus:ring-2 focus:ring-blue-200 ${className}`}
      {...props}
    />
  );
}
