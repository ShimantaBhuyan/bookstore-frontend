import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($input: AuthorInput!) {
    createAuthor(input: $input) {
      id
      name
      biography
      born_date
    }
  }
`;
