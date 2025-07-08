"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_AUTHOR } from "../graphql/authorDetailsQuery";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import EditAuthorForm from "./EditAuthorForm";

export default function AuthorDetails({ authorId }) {
  const [showEditModal, setShowEditModal] = useState(false);
  
  const { data, loading, error, refetch } = useQuery(GET_AUTHOR, {
    variables: { id: authorId },
  });

  const handleEditSuccess = () => {
    setShowEditModal(false);
    refetch();
  };

  if (loading) return <div>Loading author...</div>;
  if (error) return <div>Error loading author.</div>;

  const author = data?.author;
  if (!author) return <div>Author not found.</div>;

  return (
    <section className="flex flex-col gap-8 rounded bg-white p-6 shadow-md md:flex-row">
      {/* Author Info */}
      <div className="flex flex-col gap-2 md:w-1/3">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 text-3xl font-bold">{author.name}</h1>
          <Button
            variant="outline"
            onClick={() => setShowEditModal(true)}
            className="ml-4"
          >
            Edit Author
          </Button>
        </div>
        {author.born_date && (
          <p className="mb-1 text-sm text-gray-700">Born: {author.born_date}</p>
        )}
        {author.biography && (
          <p className="mb-2 text-base leading-relaxed text-gray-800">
            {author.biography}
          </p>
        )}
      </div>
      {/* Author's Books */}
      <div className="flex-1">
        <h2 className="mb-3 text-xl font-semibold">Books by {author.name}</h2>
        {author.books.length === 0 ? (
          <p className="text-gray-500">No books available for this author.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {author.books?.map(book => (
              <li
                key={book.id}
                className="flex flex-col py-3 md:flex-row md:items-center md:justify-between"
              >
                <Link
                  href={`/books/${book.id}`}
                  className="text-base font-medium text-blue-700 hover:underline"
                >
                  {book.title}
                </Link>
                <span className="text-xs text-gray-500 md:ml-2">
                  {book.published_date}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <EditAuthorForm 
          author={author} 
          onSuccess={handleEditSuccess} 
        />
      </Modal>
    </section>
  );
}
