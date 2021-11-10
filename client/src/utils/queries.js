import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      vods {
        _id
        vodUrl        
      }
    }
  }
`;

export const QUERY_VODS = gql`
  query getVods {
    vods {
      _id
      vodUrl
      vodAuthor      
    }
  }
`;

export const QUERY_SINGLE_VOD = gql`
  query getSingleVod($vodId: ID!) {
    vod(vodId: $vodId) {
      _id
      vodUrl
      vodAuthor      
      comments {
        _id
        commentText
        commentAuthor
        timeStamp
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      vods {
        _id
        vodUrl
        vodAuthor
        timeStamp
      }
    }
  }
`;
