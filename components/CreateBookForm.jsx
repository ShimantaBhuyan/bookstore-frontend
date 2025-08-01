"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOK } from "../graphql/bookMutation";
import { GET_AUTHORS } from "../graphql/authorsQuery";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import FormError from "./ui/FormError";
import DatePicker from "./ui/DatePicker";
import FormSuccess from "./ui/FormSuccess";

export default function CreateBookForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [success, setSuccess] = useState("");

  const { data: authorsData } = useQuery(GET_AUTHORS);
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["Books"],
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await createBook({
      variables: {
        input: {
          title,
          description,
          published_date: publishedDate,
          authorId,
          cover_image_url: coverImageUrl,
        },
      },
    });
    setTitle("");
    setDescription("");
    setPublishedDate("");
    setAuthorId("");
    setCoverImageUrl("");
    setSuccess("Book created successfully!");
    if (onSuccess) onSuccess();
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 font-semibold">Add a new book</h3>
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
      <DatePicker
        value={publishedDate}
        onChange={setPublishedDate}
        className="mr-2 mb-2 w-fit"
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
      <Select
        value={authorId}
        onChange={e => setAuthorId(e.target.value)}
        required
        className="mr-2 mb-2"
      >
        <option value="">Select Author</option>
        {authorsData?.authors?.map(author => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </Select>
      <Button
        type="submit"
        variant="primary"
        disabled={loading || !authorId || authorsData.length == 0}
      >
        {loading ? "Creating..." : "Create Book"}
      </Button>
      <FormError error={error} />
      <FormSuccess message={success} />
    </form>
  );
}
