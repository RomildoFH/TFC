import Matche from '../models/Matches';
import Team from '../models/Team';
import PerformaceCalculate from '../utils/LeaderBoardCalc';

export default class LeaderBoardService {
  constructor(private matcheModel = Matche, private teamModel = Team) {}

  public async getAllHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({ where: { inProgress: false } });

    const homeBoard = teams.map((team) => {
      const teamBoard = {
        name: team.teamName,
        totalPoints: PerformaceCalculate.totalPoints(
          matches.filter((matche) => matche.homeTeamId === team.id),
        ),
      };
      return teamBoard;
    });
    return { type: null, message: homeBoard };
  }
}
