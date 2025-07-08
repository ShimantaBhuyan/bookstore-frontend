"use client";

import { useState } from "react";
import BooksTable from "../components/BooksTable";
import AuthorsTable from "../components/AuthorsTable";
import CreateBookForm from "../components/CreateBookForm";
import CreateAuthorForm from "../components/CreateAuthorForm";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

export default function Page() {
  const [tab, setTab] = useState("books");
  const [showBookModal, setShowBookModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="mx-auto flex w-full flex-col items-center py-16">
        <div className="mb-8 flex flex-col items-center">
          <span className="mb-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Find Your Next Read{" "}
            <span className="ml-1" role="img" aria-label="Books">
              📚
            </span>
          </span>
          <h1 className="mb-4 text-center text-4xl font-extrabold md:text-5xl">
            Book Discovery Platform
          </h1>
        </div>
        <div className="mb-10 flex gap-2">
          <Button
            variant={tab === "books" ? "primary" : "outline"}
            className="flex items-center gap-2 rounded-full px-6 py-2 text-base font-medium"
            onClick={() => setTab("books")}
          >
            <span role="img" aria-label="Books">
              📖
            </span>{" "}
            Books
          </Button>
          <Button
            variant={tab === "authors" ? "primary" : "outline"}
            className="flex items-center gap-2 rounded-full px-6 py-2 text-base font-medium"
            onClick={() => setTab("authors")}
          >
            <span role="img" aria-label="Authors">
              🖊️
            </span>{" "}
            Authors
          </Button>
        </div>
        <div className="w-full rounded-xl bg-white p-6 shadow">
          {/* Keep both tables mounted, toggle visibility with CSS */}
          <div style={{ display: tab === "books" ? "block" : "none" }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Books</h2>
              <Button
                onClick={() => setShowBookModal(true)}
                variant="primary"
              >
                + Add Book
              </Button>
            </div>
            <BooksTable />
            <Modal
              open={showBookModal}
              onClose={() => setShowBookModal(false)}
            >
              <CreateBookForm onSuccess={() => setShowBookModal(false)} />
            </Modal>
          </div>
          <div style={{ display: tab === "authors" ? "block" : "none" }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Authors</h2>
              <Button
                onClick={() => setShowAuthorModal(true)}
                variant="primary"
              >
                + Add Author
              </Button>
            </div>
            <AuthorsTable />
            <Modal
              open={showAuthorModal}
              onClose={() => setShowAuthorModal(false)}
            >
              <CreateAuthorForm onSuccess={() => setShowAuthorModal(false)} />
            </Modal>
          </div>
        </div>
      </div>
    </main>
  );
}
