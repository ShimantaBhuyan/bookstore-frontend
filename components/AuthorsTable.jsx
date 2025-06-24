"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_AUTHORS } from "../graphql/authors.queries";
import Table from "./ui/Table";

export default function AuthorsTable() {
  const { data, loading, error } = useQuery(GET_AUTHORS);

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
                    <Link
                      href={`/authors/${author.id}`}
                      className="text-blue-600 underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </section>
  );
}
