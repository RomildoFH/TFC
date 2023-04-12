import Matche from '../models/Matches';
import Team from '../models/Team';
import ABC from '../utils/AwayBoardCalc';
import HBC from '../utils/HomeBoardCalc';

// const sumFunction = (curr: ITeamBoard, next: ITeamBoard) => {

// }

const ef = (awayGames: number, homeGames: number, awayPoints: number, homePoints: number) =>
  (((awayPoints + homePoints) / ((awayGames + homeGames) * 3)) * 100);

export default class LeaderBoardService {
  constructor(private matcheModel = Matche, private teamModel = Team) {}

  public async getAllHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({ where: { inProgress: false } });

    const homeBoard = teams.map((team) => {
      const filtredMatches = matches.filter((matche) => matche.homeTeamId === team.id);
      return ({
        name: team.teamName,
        totalPoints: HBC.tPoints(filtredMatches),
        totalGames: HBC.tGames(filtredMatches),
        totalVictories: HBC.totalVictories(filtredMatches),
        totalDraws: HBC.totalDraws(filtredMatches),
        totalLosses: HBC.totalLosses(filtredMatches),
        goalsFavor: HBC.goalsFavor(filtredMatches),
        goalsOwn: HBC.goalsOwn(filtredMatches),
        goalsBalance: HBC.goalsBalance(filtredMatches),
        efficiency: HBC.efficiency(filtredMatches).toFixed(2),
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
        totalPoints: ABC.tPoints(filtredMatches),
        totalGames: ABC.tGames(filtredMatches),
        totalVictories: ABC.totalVictories(filtredMatches),
        totalDraws: ABC.totalDraws(filtredMatches),
        totalLosses: ABC.totalLosses(filtredMatches),
        goalsFavor: ABC.goalsFavor(filtredMatches),
        goalsOwn: ABC.goalsOwn(filtredMatches),
        goalsBalance: ABC.goalsBalance(filtredMatches),
        efficiency: ABC.efficiency(filtredMatches).toFixed(2),
      });
    });
    return { type: null, message: awayBoard };
  }

  public async test() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({ where: { inProgress: false } });
    return teams.map((team) => {
      const fA = matches.filter((matche) => matche.awayTeamId === team.id);
      const fH = matches.filter((matche) => matche.homeTeamId === team.id);
      return ({
        name: team.teamName,
        totalPoints: ABC.tPoints(fA) + HBC.tPoints(fH),
        totalGames: ABC.tGames(fA) + HBC.tGames(fH),
        totalVictories: ABC.totalVictories(fA) + HBC.totalVictories(fH),
        totalDraws: ABC.totalDraws(fA) + HBC.totalDraws(fH),
        totalLosses: ABC.totalLosses(fA) + HBC.totalLosses(fH),
        goalsFavor: ABC.goalsFavor(fA) + HBC.goalsFavor(fH),
        goalsOwn: ABC.goalsOwn(fA) + HBC.goalsOwn(fH),
        goalsBalance: ABC.goalsBalance(fA) + HBC.goalsBalance(fH),
        efficiency: ef(ABC.tGames(fA), HBC.tGames(fH), ABC.tPoints(fA), HBC.tPoints(fH)).toFixed(2),
      });
    });
  }

  public async getAll() {
    const result = await this.test();
    return { type: null, message: result };
  }
}
