"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/books.queries";
import Pagination from "./ui/Pagination";
import Link from "next/link";
import Table from "./ui/Table";

export default function BooksTable() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
    variables: { offset, limit, searchTerm: debouncedSearch || undefined },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    refetch({ offset: 0, limit, searchTerm: debouncedSearch || undefined });
  }, [debouncedSearch, refetch, limit]);

  const handleSearchChange = e => {
    console.log({ e });
    setSearchTerm(e.target.value);
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error loading books.</div>;

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
      {books.length === 0 ? (
        <div className="text-gray-500">No books available.</div>
      ) : (
        <>
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
                    <Link
                      href={`/books/${book.id}`}
                      className="text-blue-600 underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination page={page} setPage={setPage} hasNext={hasNext} />
        </>
      )}
    </section>
  );
}
