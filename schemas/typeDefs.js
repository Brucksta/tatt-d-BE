const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    isArtist: Boolean
    firstName: String
    lastName: String
    email: String
    bio: String
    social: String
    style: String
    profilePicture: String
  }
  
  type Works {
    userId: Int
    workurl: String
    post: String
    flash: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    works: Works
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    singleUpload(file: Upload!): File!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

`;

module.exports = typeDefs;
