"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../graphql/bookMutation";
import Button from "./ui/Button";
import Input from "./ui/Input";
import FormError from "./ui/FormError";
import DatePicker from "./ui/DatePicker";
import FormSuccess from "./ui/FormSuccess";

export default function EditAuthorForm({ author, onSuccess }) {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [success, setSuccess] = useState("");

  const [editAuthor, { loading, error }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: ["Authors", "Author"],
  });

  // Pre-populate form with existing author data
  useEffect(() => {
    if (author) {
      setName(author.name || "");
      setBiography(author.biography || "");
      setBornDate(author.born_date || "");
    }
  }, [author]);

  const handleSubmit = async e => {
    e.preventDefault();
    await editAuthor({
      variables: {
        input: {
          id: author.id,
          name,
          biography,
        },
      },
    });
    setSuccess("Author updated successfully!");
    if (onSuccess) onSuccess();
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 font-semibold">Edit author</h3>
      <Input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="mr-2 mb-2"
      />
      <Input
        placeholder="Biography"
        value={biography}
        onChange={e => setBiography(e.target.value)}
        className="mr-2 mb-2"
      />
      <DatePicker
        value={bornDate}
        onChange={setBornDate}
        className="mr-2 mb-2 w-fit"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Author"}
      </Button>
      <FormError error={error} />
      <FormSuccess message={success} />
    </form>
  );
} 