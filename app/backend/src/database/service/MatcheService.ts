import Matche from '../models/Matches';
import Team from '../models/Team';

export default class MatcheService {
  constructor(private matche = Matche) {}

  public async getAll() {
    const search = await this.matche.findAll({ include: [
      { model: Team, as: 'homeTeam' },
      { model: Team, as: 'awayTeam' },
    ] });

    return ({ type: null, message: search });
  }
}
