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
    tattoo: [String]
    flash: [String]
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
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, artist: Boolean, bio: String, style: String): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    singleUpload(file: Upload!, tattooType: String!): File!
  }



`;

module.exports = typeDefs;
