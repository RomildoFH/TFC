import Matche from '../models/Matches';

export default class PerformaceCalculate {
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
}
