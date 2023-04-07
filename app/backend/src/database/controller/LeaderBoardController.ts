import { Request, Response } from 'express';
import PersonalizedErrors from '../../tests/Mocks/error.mock';
import LeaderBoardService from '../service/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {}

  public getAllHome = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { message } = await this.leaderBoardService.getAllHome();
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };
}
