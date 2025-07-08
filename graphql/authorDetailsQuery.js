import { gql } from "@apollo/client";
import { AUTHOR_FULL_FRAGMENT, BOOK_BASIC_FRAGMENT } from "./fragments";

export const GET_AUTHOR = gql`
  query Author($id: ID!) {
    author(id: $id) {
      ...AuthorFull
      books {
        ...BookBasic
      }
    }
  }
  ${AUTHOR_FULL_FRAGMENT}
  ${BOOK_BASIC_FRAGMENT}
`;
