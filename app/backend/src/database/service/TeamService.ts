import Team from '../models/Team';

export default class TeamService {
  constructor(private team = Team) {}

  public async getAll() {
    const result = await this.team.findAll();
    return { type: null, message: result };
  }
}
