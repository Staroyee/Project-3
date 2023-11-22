import { gql } from "@apollo/client";

// Mutation to create a profile
export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

// Mutation to update a users profile
export const UPDATE_PROFILE = gql`
  mutation updateProfile($username: String, $email: String, $password: String) {
    updateProfile(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

// Mutation to log the user in
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

// Mutation to save a launch to a users profile
export const SAVE_LAUNCH = gql`
  mutation saveLaunch($launch: LaunchInput!) {
    saveLaunch(launch: $launch) {
      username
      email
      savedLaunches {
        launchId
        name
        status
        provider
        location
        date
        image
        webcastLive
      }
    }
  }
`;

// Mutation to remove a launch from the users profile
export const REMOVE_LAUNCH = gql`
  mutation removeLaunch($launchId: ID!) {
    removeLaunch(launchId: $launchId) {
      _id
      username
      email
      savedLaunches {
        launchId
        name
        status
        provider
        location
        date
        image
        webcastLive
      }
    }
  }
`;