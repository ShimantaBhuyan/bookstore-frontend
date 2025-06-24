import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
      metadata {
        reviews {
          username
          rating
          comment
          createdAt
        }
        average_rating
        cover_image_url
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($input: ReviewInput!) {
    addReview(input: $input) {
      bookId
      reviews {
        username
        rating
        comment
        createdAt
      }
      average_rating
    }
  }
`;
