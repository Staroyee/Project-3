// Define typeDefs
const typeDefs = `
  type Profile {
    _id: ID
    username: String
    email: String
    password: String
    savedLaunches: [Launch]
  }

  type Launch {
    launchId: ID
    name: String
    status: String
    provider: String
    location: String
    date: String
    image: String
    webcastLive: String
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type APOD {
    copyright: String
    date: String
    explanation: String
    title: String
    hdurl: String
    media_type: String
  }

  input LaunchInput {
    launchId: ID
    name: String
    status: String
    provider: String
    location: String
    date: String
    image: String
    webcastLive: String
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    apod: APOD
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    updateProfile(username: String, email: String, password: String): Profile
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    saveLaunch(launch: LaunchInput): Profile
    removeLaunch(launchId: ID!): Profile
  }
`;

module.exports = typeDefs;
