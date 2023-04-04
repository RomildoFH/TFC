import Team from '../models/Team';

export default class TeamService {
  constructor(private team = Team) {}

  public async getAll() {
    const result = await this.team.findAll();
    return { type: null, message: result };
  }

  public async findById(id: string) {
    const result = await this.team.findByPk(id);
    if (!result) {
      return { type: 404, message: 'Team not found' };
    }
    return { type: null, message: result };
  }
}
