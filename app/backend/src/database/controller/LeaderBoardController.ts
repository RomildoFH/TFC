import { Request, Response } from 'express';
// import { sortObjectArrByProps } from '@nighly/sort-object-array-by-property';
import PersonalizedErrors from '../../tests/Mocks/error.mock';
import LeaderBoardService from '../service/LeaderBoardService';
import Organizer from '../utils/Organizer';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) {}

  public getAllHome = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { message } = await this.leaderBoardService.getAllHome();
      // const ordered = sortObjectArrByProps(message, ['totalPoints']);
      const orderedResults = Organizer.DefaultOrder(message);
      return res.status(200).json(orderedResults);
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };

  public getAllAway = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { message } = await this.leaderBoardService.getAllAway();
      const orderedResults = Organizer.DefaultOrder(message);
      return res.status(200).json(orderedResults);
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };
}
