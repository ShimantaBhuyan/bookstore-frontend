import { gql } from "@apollo/client";
import { AUTHOR_BASIC_FRAGMENT } from "./fragments";

export const GET_BOOKS = gql`
  query Books(
    $offset: Int = 0
    $limit: Int = 10
    $searchTerm: String
    $authorId: ID
  ) {
    books(
      offset: $offset
      limit: $limit
      searchTerm: $searchTerm
      authorId: $authorId
    ) {
      books {
        id
        title
        description
        published_date
        author {
          ...AuthorBasic
        }
      }
      totalCount
    }
  }
  ${AUTHOR_BASIC_FRAGMENT}
`;
