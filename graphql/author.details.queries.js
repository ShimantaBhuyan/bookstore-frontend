import { gql } from "@apollo/client";

export const GET_AUTHOR = gql`
  query Author($id: ID!) {
    author(id: $id) {
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
