"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/booksQuery";
import Pagination from "./ui/Pagination";
import Link from "next/link";
import Table from "./ui/Table";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import EditBookForm from "./EditBookForm";

export default function BooksTable() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
    variables: { offset, limit, searchTerm: debouncedSearch || undefined },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Remove the redundant refetch useEffect since the query will automatically
  // re-run when debouncedSearch changes due to the variables dependency

  const handleSearchChange = e => {
    console.log({ e });
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedBook(null);
    refetch();
  };

  // Don't replace the entire UI with loading state
  const books = data?.books?.books || [];
  const totalCount = data?.books?.totalCount || 0;
  const hasNext = offset + books.length < totalCount;

  return (
    <section className="flex flex-col gap-4">
      <div className="mb-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by book"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64 rounded border px-2 py-1"
        />
      </div>
      
      {error && <div className="text-red-500">Error loading books: {error.message}</div>}
      
      {loading && books.length === 0 ? (
        <div className="text-gray-500">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="text-gray-500">No books available.</div>
      ) : (
        <>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="text-gray-500">Updating...</div>
              </div>
            )}
            <Table>
              <thead>
                <tr>
                  <th className="border px-2 py-1">Title</th>
                  <th className="border px-2 py-1">Author</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id}>
                    <td className="border px-2 py-1">{book.title}</td>
                    <td className="border px-2 py-1">{book.author?.name}</td>
                    <td className="border px-2 py-1">
                      <div className="flex gap-4 items-end">
                        <Link
                          href={`/books/${book.id}`}
                          className="text-blue-600 underline"
                        >
                          Details
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(book)}
                          className="px-2 py-1 text-xs"
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination page={page} setPage={setPage} hasNext={hasNext} />
        </>
      )}
      
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {selectedBook && (
          <EditBookForm 
            book={selectedBook} 
            onSuccess={handleEditSuccess} 
          />
        )}
      </Modal>
    </section>
  );
}
