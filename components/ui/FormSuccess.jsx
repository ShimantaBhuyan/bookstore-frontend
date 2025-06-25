export default function FormSuccess({ message }) {
  if (!message) return null;
  return (
    <div className="my-2 rounded border border-green-200 bg-green-100 px-3 py-2 text-sm font-medium text-green-800">
      {message}
    </div>
  );
}
