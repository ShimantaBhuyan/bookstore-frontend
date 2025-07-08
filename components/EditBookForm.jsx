"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_BOOK } from "../graphql/bookMutation";
import { GET_AUTHORS } from "../graphql/authorsQuery";
import Button from "./ui/Button";
import Input from "./ui/Input";
import FormError from "./ui/FormError";
import DatePicker from "./ui/DatePicker";
import FormSuccess from "./ui/FormSuccess";

export default function EditBookForm({ book, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [_, setAuthorId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [success, setSuccess] = useState("");

  const { data: authorsData } = useQuery(GET_AUTHORS);
  const [editBook, { loading, error }] = useMutation(EDIT_BOOK, {
    refetchQueries: ["Books", "Book"],
  });

  // Pre-populate form with existing book data
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setDescription(book.description || "");
      setAuthorId(book.author?.id || "");
      setCoverImageUrl(book.metadata?.cover_image_url || "");
    }
  }, [book]);

  const handleSubmit = async e => {
    e.preventDefault();
    await editBook({
      variables: {
        input: {
          id: book.id,
          title,
          description,
          coverImageUrl
        },
      },
    });
    setSuccess("Book updated successfully!");
    if (onSuccess) onSuccess();
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 font-semibold">Edit book</h3>
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="mr-2 mb-2"
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="mr-2 mb-2"
      />
      <Input
        placeholder="Cover Image URL"
        value={coverImageUrl}
        onChange={e => setCoverImageUrl(e.target.value)}
        className="mr-2 mb-2"
      />
      {coverImageUrl && (
        <div className="mb-2">
          <img
            src={coverImageUrl}
            alt="Cover Preview"
            className="max-h-40 rounded border"
          />
        </div>
      )}
      <Button
        type="submit"
        variant="primary"
        disabled={loading || !authorsData?.authors?.length}
      >
        {loading ? "Updating..." : "Update Book"}
      </Button>
      <FormError error={error} />
      <FormSuccess message={success} />
    </form>
  );
} 