const { Profile } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().select("-__v -password");
    },

    profile: async (_, { profileId }) => {
      return Profile.findOne({ _id: profileId }).select("-__v -password");
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (_, __, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.profile._id }).select(
          "-__v -password"
        );
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (_, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    
    updateProfile: async (_, { username, email, password }, context) => {
      try {
        if (context.profile) {
          if (password) {
            const saltRounds = 10;
            password = await bcrypt.hash(password, saltRounds);
          }
          const updatedProfile = await Profile.findByIdAndUpdate(
            context.profile._id,
            { $set: { username, email, password } },
            { new: true }
          );
          return updatedProfile;
        }
        throw AuthenticationError;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update profile");
      }
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
        return Profile.findOneAndDelete({ _id: context.profile._id });
      }
      throw AuthenticationError;
    },

    saveLaunch: async (_, { launch }, context) => {
      if (context.profile) {
        const updatedProfile = await Profile.findByIdAndUpdate(
          { _id: context.profile._id },
          { $addToSet: { savedLaunches: launch } },
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
