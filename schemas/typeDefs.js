const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    artist: Boolean
    email: String
    bio: String
    social: String
    style: [String]
    profilePicture: String
  }
  
  type Works {
    userId: Int
    tattoos: String
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
    findUsers(search: String!): [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, artist: Boolean): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    singleUpload(file: Upload!): File!
  }



`;

module.exports = typeDefs;
