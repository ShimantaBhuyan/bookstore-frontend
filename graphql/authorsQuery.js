import { gql } from "@apollo/client";
import { AUTHOR_FULL_FRAGMENT, BOOK_BASIC_FRAGMENT } from "./fragments";

export const GET_AUTHORS = gql`
  query Authors {
    authors {
      ...AuthorFull
      books {
        ...BookBasic
      }
    }
  }
  ${AUTHOR_FULL_FRAGMENT}
  ${BOOK_BASIC_FRAGMENT}
`;
