import Matche from '../models/Matches';
import Team from '../models/Team';
import PerformaceCalculate from '../utils/LeaderBoardCalc';

export default class LeaderBoardService {
  constructor(private matcheModel = Matche, private teamModel = Team) {}

  public async getAllHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({ where: { inProgress: false } });

    const homeBoard = teams.map((team) => {
      const filtredMatches = matches.filter((matche) => matche.homeTeamId === team.id);
      const teamBoard = {
        name: team.teamName,
        totalPoints: PerformaceCalculate.totalPoints(filtredMatches),
        totalGames: PerformaceCalculate.totalGames(filtredMatches),
        totalVictories: PerformaceCalculate.totalVictories(filtredMatches),
        totalDraws: PerformaceCalculate.totalDraws(filtredMatches),
        totalLosses: PerformaceCalculate.totalLosses(filtredMatches),
        goalsFavor: PerformaceCalculate.goalsFavor(filtredMatches),
        goalsOwn: PerformaceCalculate.goalsOwn(filtredMatches),
      };
      return teamBoard;
    });
    return { type: null, message: homeBoard };
  }
}
