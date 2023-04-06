import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  public getAll = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { message } = await this.teamService.getAll();
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };

  public findById = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    try {
      const { type, message } = await this.teamService.findById(id);
      if (type) {
        return res.status(type).json({ message });
      }
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };
}
