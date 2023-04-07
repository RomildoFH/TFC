const AllMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }
];

const CorrectReturn = { message: "Finished" };

const MatcheInProgress = [AllMatches[1]];

const MatcheFinished = [AllMatches[0]];

const NewMatche = {
  id: 99,
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 7,
  awayTeamGoals: 2,
  inProgress: true
};

const NewMatcheRequest = {
  homeTeamId: 1,
  awayTeamId: 2,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const MatcheRequestEqualTeams = {
  homeTeamId: 2,
  awayTeamId: 2,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const MatcheRequestWrongTeams = {
  homeTeamId: 99,
  awayTeamId: 2,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const MatcheMocks = {
  AllMatches,
  MatcheInProgress,
  MatcheFinished,
  CorrectReturn,
  NewMatche,
  NewMatcheRequest,
  MatcheRequestEqualTeams,
  MatcheRequestWrongTeams,
}

export default MatcheMocks;

