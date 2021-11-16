import { gql } from '@apollo/client';

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
  mutation addVod($vodUrl: String!) {
    addVod(vodUrl: $vodUrl) {
      _id
      vodUrl
      vodAuthor      
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($vodId: ID!, $commentText: String!) {
    addComment(vodId: $vodId, commentText: $commentText) {
      _id
      vodUrl
      vodAuthor      
      comments {
        _id
        commentText
        commentAuthor
        timeStamp
        voteCount
      }
    }
  }
`;

export const ADD_VOTES = gql`
  mutation addVotes($commentId: ID!, $voteCount: Int) {
    addVotes(commentId: $commentId, voteCount: $voteCount) {
      _id
      vodUrl
      vodAuthor    
      comments {
        _id
        commentText
        commentAuthor
        timeStamp
        voteCount
      }
    }
  }
`;
