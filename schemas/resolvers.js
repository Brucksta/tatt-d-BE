const { AuthenticationError } = require("apollo-server-express");
const { GraphQLUpload } = require("graphql-upload");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const fs = require("fs");
const path = require("path");
const { finished } = require("stream/promises");

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    findUsers: async (parent, { search }, context) => {
      const searchRegex = new RegExp(search, 'i');
      const users = await User.find( { $or: [{ firstName: searchRegex }, { lastName: searchRegex}] },);
      return users;
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    singleUpload: async (parent, { file, tattooType }, context) => {
      console.log("Upload File");
      const { createReadStream, filename, mimetype, encoding } = await file;
      const readStream = createReadStream();
      const out = fs.createWriteStream(
        path.join(__dirname, "../data", filename)
      );
      readStream.pipe(out);
      await finished(out);
      if (context.user) {
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { [tattooType]: filename } },
          { new: true }
        );
      }
      console.log(`Saved file ${filename} to disk`);
      return { filename, mimetype, encoding };
    },
  },
};

module.exports = resolvers;
