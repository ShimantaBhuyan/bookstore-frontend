import { gql } from "@apollo/client";
import { AUTHOR_BASIC_FRAGMENT, REVIEW_FRAGMENT } from "./fragments";

export const GET_BOOK = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      description
      published_date
      author {
        ...AuthorBasic
      }
      metadata {
        reviews {
          ...Review
        }
        average_rating
        cover_image_url
      }
    }
  }
  ${AUTHOR_BASIC_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const ADD_REVIEW = gql`
  mutation AddReview($input: ReviewInput!) {
    addReview(input: $input) {
      bookId
      reviews {
        ...Review
      }
      average_rating
    }
  }
  ${REVIEW_FRAGMENT}
`;
