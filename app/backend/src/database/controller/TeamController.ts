import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  public getAll = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { type, message } = await this.teamService.getAll();
      if (!type) {
        res.status(200).json(message);
      } else {
        res.status(type).json(message);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  };

  public findById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const { type, message } = await this.teamService.findById(id);
      if (type) {
        res.status(type).json(message);
      } else {
        res.status(200).json(message);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal error' });
    }
  };
}
