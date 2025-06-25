"use client";

import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../graphql/book.details.queries";
import AddReviewForm from "./AddReviewForm";
import StarRating from "./ui/StarRating";
import Link from "next/link";

export default function BookDetails({ bookId }) {
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  if (loading) return <div>Loading book...</div>;
  if (error) return <div>Error loading book.</div>;

  const book = data?.book;
  if (!book) return <div>Book not found.</div>;

  return (
    <section className="flex flex-col gap-8 md:flex-row">
      {/* Book Cover */}
      <div className="flex w-full flex-shrink-0 flex-col items-center md:w-56">
        {book.metadata?.cover_image_url ? (
          <img
            src={book.metadata.cover_image_url}
            alt="Book Cover"
            className="mb-4 h-72 w-48 rounded border object-cover shadow"
          />
        ) : (
          <img
            src="/assets/placeholder.png"
            alt="No Cover Available"
            className="mb-4 h-72 w-48 rounded border bg-gray-200 object-cover shadow"
          />
        )}
      </div>
      {/* Book Details */}
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="mb-1 text-3xl font-bold">{book.title}</h1>
        <p className="mb-2 text-lg text-gray-700">
          by{" "}
          <Link
            href={`/authors/${book.author.id}`}
            className="text-base font-medium text-blue-700 hover:underline"
          >
            {book.author.name}
          </Link>
        </p>
        {/* Average Rating */}
        {typeof book.metadata?.average_rating === "number" && (
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium">
              {book.metadata.average_rating.toFixed(2)}
            </span>
            <span
              title={`Average rating: ${book.metadata.average_rating.toFixed(2)}`}
              className="cursor-pointer"
            >
              <StarRating value={book.metadata.average_rating} size={22} />
            </span>
            <span className="text-sm text-gray-500">
              ({book.metadata?.reviews.length || 0} ratings)
            </span>
          </div>
        )}
        {/* Genres */}
        {book.metadata?.genres && book.metadata.genres.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {book.metadata.genres.map((genre, idx) => (
              <span
                key={idx}
                className="rounded border bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        {/* Description */}
        <p className="mb-2 leading-relaxed text-gray-800">{book.description}</p>
        {/* Book meta info */}
        <div className="mb-2 flex flex-wrap gap-4 text-sm text-gray-600">
          {book.metadata?.page_count && (
            <span>{book.metadata.page_count} pages</span>
          )}
          {book.published_date && (
            <span>First published {book.published_date}</span>
          )}
        </div>

        <AddReviewForm bookId={book.id} />

        {/* Reviews */}
        <h2 className="mb-2 text-xl font-semibold">Reviews</h2>
        {book.metadata?.reviews.length > 0 ? (
          <ul className="mb-4">
            {book.metadata?.reviews?.map((review, idx) => (
              <li key={idx} className="border-b py-2">
                <strong>{review.username}</strong> ({review.rating}/5):{" "}
                {review.comment}
                <div className="text-xs text-gray-500">
                  {Date(review?.createdAt ?? Date.now())}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ratings</p>
        )}
      </div>
    </section>
  );
}
