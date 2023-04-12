import ITeamBoard from '../interfaces/ITeamBoard';

export default class Organizer {
  public static DefaultOrder(teamsBoard: ITeamBoard[]) {
    const order = (a: ITeamBoard, b: ITeamBoard) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      return 0;
    };

    return teamsBoard.sort(order);
  }

  // public static OrderByName(teamsBoard: ITeamBoard[]) {
  //   const order = (a: ITeamBoard, b: ITeamBoard) => {
  //     if (a.name < b.name) return 1;
  //     if (a.name > b.name) return -1;

  //     return 0;
  //   };

  //   return teamsBoard.sort(order);
  // }

  // public static OrderByVictories(teamsBoard: ITeamBoard[]) {
  //   const order = (a: ITeamBoard, b: ITeamBoard) => {
  //     if (a.totalVictories < b.totalVictories) return 1;
  //     if (a.totalVictories > b.totalVictories) return -1;

  //     return 0;
  //   };

  //   return teamsBoard.sort(order);
  // }

  // public static OrderByGoalsBalance(teamsBoard: ITeamBoard[]) {
  //   const order = (a: ITeamBoard, b: ITeamBoard) => {
  //     if (a.goalsBalance < b.goalsBalance) return 1;
  //     if (a.goalsBalance > b.goalsBalance) return -1;

  //     return 0;
  //   };

  //   return teamsBoard.sort(order);
  // }

  // public static OrderByGoalsFavor(teamsBoard: ITeamBoard[]) {
  //   const order = (a: ITeamBoard, b: ITeamBoard) => {
  //     if (a.goalsFavor < b.goalsFavor) return 1;
  //     if (a.goalsFavor > b.goalsFavor) return -1;

  //     return 0;
  //   };

  //   return teamsBoard.sort(order);
  // }

  // public static OrderByTotalGames(teamsBoard: ITeamBoard[]) {
  //   const order = (a: ITeamBoard, b: ITeamBoard) => {
  //     if (a.totalGames < b.totalGames) return 1;
  //     if (a.totalGames > b.totalGames) return -1;

  //     return 0;
  //   };

  //   return teamsBoard.sort(order);
  // }

  // public static OrderByTotalPoints(teamsBoard: ITeamBoard[]) {
  //   const order = (a: ITeamBoard, b: ITeamBoard) => {
  //     if (a.totalPoints < b.totalPoints) return 1;
  //     if (a.totalPoints > b.totalPoints) return -1;

  //     return 0;
  //   };

  //   return teamsBoard.sort(order);
  // }
}
