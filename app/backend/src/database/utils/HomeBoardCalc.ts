import Matche from '../models/Matches';

export default class HomePerformaceCalculate {
  public static totalPoints(matches: Matche[]) {
    const totalPoints = matches.reduce((acc: number, curr: Matche) => {
      let points = 0;
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        points += 3;
      }
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        points += 1;
      }
      return acc + points;
    }, 0);
    return totalPoints;
  }

  public static totalGames(matches: Matche[]) {
    return matches.length;
  }

  public static totalVictories(matches: Matche[]) {
    const totalVictories = matches.reduce((acc: number, curr: Matche) => {
      let victories = 0;
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        victories += 1;
      }
      return acc + victories;
    }, 0);
    return totalVictories;
  }

  public static totalDraws(matches: Matche[]) {
    const totalDraws = matches.reduce((acc: number, curr: Matche) => {
      let draws = 0;
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        draws += 1;
      }
      return acc + draws;
    }, 0);
    return totalDraws;
  }

  public static totalLosses(matches: Matche[]) {
    const totalLosses = matches.reduce((acc: number, curr: Matche) => {
      let losses = 0;
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        losses += 1;
      }
      return acc + losses;
    }, 0);
    return totalLosses;
  }

  public static goalsFavor(matches: Matche[]) {
    const goalsFavor = matches.reduce((acc: number, curr: Matche) => {
      let goals = 0;
      if (curr.homeTeamGoals) {
        goals += curr.homeTeamGoals;
      }
      return acc + goals;
    }, 0);
    return goalsFavor;
  }

  public static goalsOwn(matches: Matche[]) {
    const goalsOwn = matches.reduce((acc: number, curr: Matche) => {
      let goals = 0;
      if (curr.awayTeamGoals) {
        goals += curr.awayTeamGoals;
      }
      return acc + goals;
    }, 0);
    return goalsOwn;
  }

  public static goalsBalance(matches: Matche[]) {
    const goalsFavor = this.goalsFavor(matches);
    const goalsOwn = this.goalsOwn(matches);

    return goalsFavor - goalsOwn;
  }

  public static efficiency(matches: Matche[]) {
    const totalGames = this.totalGames(matches);
    const totalPoints = this.totalPoints(matches);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return efficiency;
  }
}
