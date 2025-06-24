export default function Pagination({ page, setPage, hasNext }) {
  return (
    <nav className="mt-2 flex justify-center gap-2">
      <button
        className="cursor-pointer rounded border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="px-2 py-1">Page {page}</span>
      <button
        className="cursor-pointer rounded border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </nav>
  );
}
