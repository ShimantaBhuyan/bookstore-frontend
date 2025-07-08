"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_AUTHORS } from "../graphql/authorsQuery";
import Table from "./ui/Table";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import EditAuthorForm from "./EditAuthorForm";

export default function AuthorsTable() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  
  const { data, loading, error, refetch } = useQuery(GET_AUTHORS);

  const handleEditClick = (author) => {
    setSelectedAuthor(author);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedAuthor(null);
    refetch();
  };

  if (loading) return <div>Loading authors...</div>;
  if (error) return <div>Error loading authors.</div>;

  const authors = data?.authors || [];

  return (
    <section>
      {authors.length === 0 ? (
        <div className="text-gray-500">No authors available.</div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map(author => (
                <tr key={author.id}>
                  <td className="border px-2 py-1">{author.name}</td>
                  <td className="border px-2 py-1">
                    <div className="flex gap-2">
                      <Link
                        href={`/authors/${author.id}`}
                        className="text-blue-600 underline"
                      >
                        Details
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(author)}
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
        </>
      )}
      
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {selectedAuthor && (
          <EditAuthorForm 
            author={selectedAuthor} 
            onSuccess={handleEditSuccess} 
          />
        )}
      </Modal>
    </section>
  );
}
