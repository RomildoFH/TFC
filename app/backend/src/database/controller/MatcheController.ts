import { Request, Response } from 'express';
import MatcheService from '../service/MatcheService';

export default class MatcheController {
  constructor(private matcheService: MatcheService) {}

  public getAll = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { message } = await this.matcheService.getAll();
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };
}
