"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW, GET_BOOK } from "../graphql/bookDetailsQuery";
import Button from "./ui/Button";
import Input from "./ui/Input";
import FormError from "./ui/FormError";
import StarRating from "./ui/StarRating";
import FormSuccess from "./ui/FormSuccess";

export default function AddReviewForm({ bookId }) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState("");

  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_BOOK, variables: { id: bookId } }],
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await addReview({
      variables: {
        input: {
          bookId,
          username,
          rating: Number(rating),
          comment,
        },
      },
    });
    setUsername("");
    setRating(5);
    setComment("");
    setSuccess("Review added successfully!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form
      className="mb-4 rounded bg-gray-50 p-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-4 text-lg font-semibold">Add a review</h3>
      <div className="mb-3 flex flex-col gap-3 md:flex-row">
        <Input
          placeholder="Your name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="flex-1"
        />
        {/* Star rating input */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Your rating:</span>
          <span title={`Rating: ${rating}`} className="cursor-pointer">
            <StarRating
              value={Number(rating)}
              size={22}
              className=""
              onClick={e => {
                // Get star index from click event
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const starWidth = rect.width / 5;
                const clicked = Math.ceil(x / starWidth);
                setRating(clicked);
              }}
              style={{ pointerEvents: "auto" }}
            />
          </span>
        </div>
      </div>
      <div className="mb-3">
        <Input
          placeholder="Comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Review"}
        </Button>
      </div>
      <FormError error={error} />
      <FormSuccess message={success} />
    </form>
  );
}
