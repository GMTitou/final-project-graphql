import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String
    createdAt: String!
    songs: [Song!]!
  }

  type Song {
    id: Int!
    title: String!
    artist: String!
    createdAt: String!
    user: User!
  }

  type Query {
    users: [User!]!
    songs: [Song!]!
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: Int!, email: String, name: String): User!
    deleteUser(id: Int!): User!
    createSong(title: String!, artist: String!, userId: Int!): Song!
    deleteSong(id: Int!): Song!
  }
`;

export default typeDefs;
