import { gql } from "@apollo/client";

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
          id
          name
        }
      }
      totalCount
    }
  }
`;
