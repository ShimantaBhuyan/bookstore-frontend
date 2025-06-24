import BooksTable from "../components/BooksTable";
import AuthorsTable from "../components/AuthorsTable";
import CreateBookForm from "../components/CreateBookForm";
import CreateAuthorForm from "../components/CreateAuthorForm";

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Bookstore</h1>
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold">Books</h2>
      <BooksTable />
      {/* <div className="my-8" /> */}
      <CreateBookForm />
      <hr className="my-8" />
      <h2 className="text-2xl font-semibold">Authors</h2>
      <AuthorsTable />
      {/* <div className="my-8" /> */}
      <CreateAuthorForm />
    </main>
  );
}
