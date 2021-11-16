import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_VOD = gql`
  mutation addVod($vodUrl: String!, $vodTitle: String!, $description: String!) {
    addVod(vodUrl: $vodUrl, vodTitle: $vodTitle, description: $description) {
      _id
      vodUrl
      vodAuthor
      description
      vodTitle
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($vodId: ID!, $commentText: String!, $timeStamp: String!) {
    addComment(vodId: $vodId, commentText: $commentText, timeStamp: $timeStamp) {
      _id
      vodUrl
      vodAuthor
      description
      vodTitle
      comments {
        _id
        commentText
        timeStamp
      }
    }
  }
`;
