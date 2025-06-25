export default function FormError({ error }) {
  if (!error) return null;
  return <div className="my-2 text-red-500">Error: {error.message}</div>;
}
