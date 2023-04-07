const PersonalizedErrors = {
  internal: { message: 'Internal Error' },
  teamNotFound: { message: 'Team not found' },
  fieldsNotFilled: { message: "All fields must be filled" },
  invalidData: { message: "Invalid email or password" },
  tokenNotFound: { message: "Token not found" },
  mustBeToken: { message: "Token must be a valid token" },
  matcheEqualTeams: { message: 'It is not possible to create a match with two equal teams' },
  matcheNotTeam: { message: "There is no team with such id!" }
}

export default PersonalizedErrors;