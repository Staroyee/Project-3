import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
    }
  }
`;

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
