const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bio: String
    favGame: String
    name: String
    vods: [Vod]!
  }

  type Vod {
    _id: ID
    vodUrl: String
    vodAuthor: String
    description: String
    vodTitle: String
    timeStamp: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    timeStamp: String
    voteCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    vods(username: String): [Vod]
    vod(vodId: ID!): Vod
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    editUser(name: String, favGame: String, bio: String): User
    addVod(vodUrl: String!, vodTitle: String!, description: String!): Vod
    addComment(vodId: ID!, commentText: String!, timeStamp: String!): Vod
    removeVod(vodId: ID!): Vod
    removeComment(vodId: ID!, commentId: ID!): Vod
  }
`;

module.exports = typeDefs;
