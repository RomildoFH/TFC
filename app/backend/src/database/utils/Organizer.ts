import ITeamBoard from '../interfaces/ITeamBoard';

export default class Organizer {
  public static OrderByProps(teamsBoard: ITeamBoard[]) {
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
}
