export default function FormError({ error }) {
  if (!error) return null;
  return <div className="mt-2 text-red-500">Error: {error.message}</div>;
}
