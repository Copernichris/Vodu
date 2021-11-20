const { AuthenticationError } = require("apollo-server-express");
const { User, Vod } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("vods");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("vods");
    },
    vods: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Vod.find(params).sort({ timeStamp: -1 });
    },
    vod: async (parent, { vodId }) => {
      return Vod.findOne({ _id: vodId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("vods");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    editUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    addVod: async (parent, { vodUrl, vodTitle, description }, context) => {
      if (context.user) {
        const vod = await Vod.create({
          vodUrl,
          vodAuthor: context.user.username,
          vodTitle,
          description,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { vods: vod._id, vodTitle, description } }
        );

        return vod;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { vodId, commentText, timeStamp }, context) => {
      if (context.user) {
        return Vod.findOneAndUpdate(
          { _id: vodId },
          {
            $addToSet: {
              comments: {
                commentText,
                commentAuthor: context.user.username,
                timeStamp,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addVotes: async (parent, { vodId, voteCount }, context) => {
    //   if (context.user) {
    //     return Vod.findOneAndUpdate(
    //       { _id: vodId },
    //       {
    //         $addToSet: {
    //           comments: { voteCount },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    removeVod: async (parent, { vodId }, context) => {
      if (context.user) {
        const vod = await Vod.findOneAndDelete({
          _id: vodId,
          vodAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { vods: vod._id } }
        );

        return vod;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { vodId, commentId }, context) => {
      if (context.user) {
        return Vod.findOneAndUpdate(
          { _id: vodId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
