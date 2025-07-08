import { gql } from "@apollo/client";

// Fragment for basic author information (used in nested contexts)
export const AUTHOR_BASIC_FRAGMENT = gql`
  fragment AuthorBasic on Author {
    id
    name
  }
`;

// Fragment for full author information (used in author-focused queries)
export const AUTHOR_FULL_FRAGMENT = gql`
  fragment AuthorFull on Author {
    id
    name
    biography
    born_date
  }
`;

// Fragment for basic book information (used in nested contexts like author's books)
export const BOOK_BASIC_FRAGMENT = gql`
  fragment BookBasic on Book {
    id
    title
    published_date
  }
`;

// Fragment for review information (used in book details and add review mutation)
export const REVIEW_FRAGMENT = gql`
  fragment Review on Review {
    username
    rating
    comment
    createdAt
  }
`;
