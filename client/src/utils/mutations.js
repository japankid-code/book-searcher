import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// save book data for a logged in user
export const ADD_BOOK = gql`
  mutation addBook(
    $authors: [String]
    $description: String
    $bookId: String
    $image: String
    $link: String
    $title: String
  ) {
    addBook(
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
      title: $title
    ) {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;

// remove saved book data for a logged in user
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      bookId
    }
  }
`;
