const { Profile } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (_, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (_, __, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (_, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (_, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (_, __, context) => {
      if (context.profile) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    saveLaunch: async (_, { Launch }, context) => {
      if (context.profile) {
        const updatedProfile = await Profile.findByIdAndUpdate(
          { _id: context.profile._id },
          { $push: { savedLaunches: Launch } },
          { new: true }
        );
        return updatedProfile;
      }
      throw AuthenticationError;
    },

    removeLaunch: async (_, { launchId }, context) => {
      if (context.profile) {
        const updatedProfile = await Profile.findByIdAndUpdate(
          { _id: context.profile._id },
          { $pull: { savedLaunches: { launchId } } },
          { new: true }
        );
        return updatedProfile;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
