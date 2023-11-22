import { gql } from '@apollo/client';

// Query to retrieve all profiles
export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
    }
  }
`;

// Query to retrieve one single profile by ID
export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
    }
  }
`;

// Query to retrieve one user profile using user context
export const QUERY_ME = gql`
  query me {
    me {
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

// Query to retrieve the APOD from NASA Open API
export const QUERY_APOD = gql`
query apod {
  apod {
    copyright
    date
    explanation
    title
    hdurl
    media_type
  }
}`
