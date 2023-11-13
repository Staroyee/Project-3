import { gql } from "@apollo/client";

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