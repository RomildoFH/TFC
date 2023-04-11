import ITeamBoard from '../interfaces/ITeamBoard';
import Matche from '../models/Matches';
import Team from '../models/Team';
import AwayPerformaceCalculate from '../utils/AwayBoardCalc';
import HomePerformaceCalculate from '../utils/HomeBoardCalc';

export default class LeaderBoardService {
  constructor(private matcheModel = Matche, private teamModel = Team) {}

  public async getAllHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({ where: { inProgress: false } });

    const homeBoard = teams.map((team) => {
      const filtredMatches = matches.filter((matche) => matche.homeTeamId === team.id);
      return ({
        name: team.teamName,
        totalPoints: HomePerformaceCalculate.totalPoints(filtredMatches),
        totalGames: HomePerformaceCalculate.totalGames(filtredMatches),
        totalVictories: HomePerformaceCalculate.totalVictories(filtredMatches),
        totalDraws: HomePerformaceCalculate.totalDraws(filtredMatches),
        totalLosses: HomePerformaceCalculate.totalLosses(filtredMatches),
        goalsFavor: HomePerformaceCalculate.goalsFavor(filtredMatches),
        goalsOwn: HomePerformaceCalculate.goalsOwn(filtredMatches),
        goalsBalance: HomePerformaceCalculate.goalsBalance(filtredMatches),
        efficiency: HomePerformaceCalculate.efficiency(filtredMatches),
      });
    });
    return { type: null, message: homeBoard };
  }

  public async getAllAway() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({ where: { inProgress: false } });

    const awayBoard = teams.map((team) => {
      const filtredMatches = matches.filter((matche) => matche.awayTeamId === team.id);
      return ({
        name: team.teamName,
        totalPoints: AwayPerformaceCalculate.totalPoints(filtredMatches),
        totalGames: AwayPerformaceCalculate.totalGames(filtredMatches),
        totalVictories: AwayPerformaceCalculate.totalVictories(filtredMatches),
        totalDraws: AwayPerformaceCalculate.totalDraws(filtredMatches),
        totalLosses: AwayPerformaceCalculate.totalLosses(filtredMatches),
        goalsFavor: AwayPerformaceCalculate.goalsFavor(filtredMatches),
        goalsOwn: AwayPerformaceCalculate.goalsOwn(filtredMatches),
        goalsBalance: AwayPerformaceCalculate.goalsBalance(filtredMatches),
        efficiency: AwayPerformaceCalculate.efficiency(filtredMatches),
      });
    });
    return { type: null, message: awayBoard };
  }

  public async getAll() {
    const homeBoard = await (this.getAllHome());
    const awayBoard = await (this.getAllAway());
    const board = [...homeBoard.message, ...awayBoard.message];

    const leaderBoard: ITeamBoard[] = [];

    for (let index = 0; index < board.length; index += 1) {
      const current = board[index];
      if (!leaderBoard.some((boardTeam) => boardTeam.name === current.name)) {
        for (let count = 0; count < board.length; count += 1) {
          const next = board[count];
          if (current.name === next.name && index !== count) {
            current.totalPoints += next.totalPoints;
          }
        }
        leaderBoard.push(current);
      }
    }
    return { type: null, message: leaderBoard };
  }
}
