const { Profile } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");
const axios = require("axios");
require("dotenv").config();
// Set API key provided by Heroku config var
const { NASA_API_KEY } = process.env;

// Define resolvers
const resolvers = {
  Query: {
    // Query all profiles
    profiles: async () => {
      return Profile.find().select("-__v -password");
    },
    // Query single profile
    profile: async (_, { profileId }) => {
      return Profile.findOne({ _id: profileId }).select("-__v -password");
    },
    // Query user profile
    me: async (_, __, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.profile._id }).select(
          "-__v -password"
        );
      }
      throw AuthenticationError;
    },

    // Query NASA Open api fetch request using Axios
    apod: async () => {
      try {
        // Make a request to the NASA APOD API using the API key
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod",
          {
            params: {
              api_key: NASA_API_KEY,
            },
          }
        );

        // Return the APOD API response data
        return response.data;
      } catch (error) {
        // Handle errors
        console.error("Error:", error.message);
        throw new Error("Internal Server Error");
      }
    },
  },

  Mutation: {
    // Mutation to create a user profile
    addProfile: async (_, { username, email, password }) => {
      if (!username || !email || !password) {
        throw new Error("All fields are required.");
      }
      console.log('Received values:', username, email, password);
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    // Mutation to update a users profile details
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

    // Mutation to log the user in
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

    // Mutation to save a single launches data to the database under the current users profile
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

    // Mutation to remove the saved launch from the database on the current users profile.
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

// Export resolvers
module.exports = resolvers;
