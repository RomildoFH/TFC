// import { ResultSetHeader } from 'mysql2';
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

  public async getAllFiltred(inProgress: boolean) {
    const search = await this.matche.findAll({ where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ] });

    return ({ type: null, message: search });
  }

  public async finishMatche(id: number) {
    const result = await this.matche.update(
      { inProgress: false },
      { where: { id } },
    );
    return ({ type: null, message: result[0] });
  }

  public async updateMatche(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const result = await this.matche.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return ({ type: null, message: result[0] });
  }

  public async createMatche(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const query = await this.matche.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return { type: null, message: query };
  }
}
