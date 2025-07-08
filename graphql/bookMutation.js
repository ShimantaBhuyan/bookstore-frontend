import { gql } from "@apollo/client";
import { AUTHOR_BASIC_FRAGMENT, AUTHOR_FULL_FRAGMENT } from "./fragments";

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      description
      published_date
      author {
        ...AuthorBasic
      }
    }
  }
  ${AUTHOR_BASIC_FRAGMENT}
`;

export const EDIT_BOOK = gql`
  mutation EditBook($input: EditBookInput!) {
    editBook(input: $input) {
      id
      title
      description
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($input: AuthorInput!) {
    createAuthor(input: $input) {
      ...AuthorFull
    }
  }
  ${AUTHOR_FULL_FRAGMENT}
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($input: EditAuthorInput!) {
    editAuthor(input: $input) {
      ...AuthorFull
    }
  }
  ${AUTHOR_FULL_FRAGMENT}
`;
