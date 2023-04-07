import { Router } from 'express';
import LeaderBoardController from '../database/controller/LeaderBoardController';
import LeaderBoardService from '../database/service/LeaderBoardService';

const leaderRouter = Router();
const leaderService = new LeaderBoardService();
const leaderController = new LeaderBoardController(leaderService);

leaderRouter.get('/home', leaderController.getAllHome);
leaderRouter.get('/away', leaderController.getAllAway);

export default leaderRouter;
