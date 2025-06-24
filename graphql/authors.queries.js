import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query Authors {
    authors {
      id
      name
      biography
      born_date
      books {
        id
        title
        published_date
      }
    }
  }
`;
