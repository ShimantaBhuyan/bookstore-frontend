"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_AUTHOR } from "../graphql/bookMutation";
import Button from "./ui/Button";
import Input from "./ui/Input";
import FormError from "./ui/FormError";
import DatePicker from "./ui/DatePicker";
import FormSuccess from "./ui/FormSuccess";

export default function CreateAuthorForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [success, setSuccess] = useState("");

  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: ["Authors"],
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await createAuthor({
      variables: {
        input: {
          name,
          biography,
          born_date: bornDate,
        },
      },
    });
    setName("");
    setBiography("");
    setBornDate("");
    setSuccess("Author created successfully!");
    if (onSuccess) onSuccess();
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <h3 className="mb-2 font-semibold">Add a new author</h3>
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
        {loading ? "Creating..." : "Create Author"}
      </Button>
      <FormError error={error} />
      <FormSuccess message={success} />
    </form>
  );
}
