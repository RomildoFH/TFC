import { Router } from 'express';
import TeamController from '../database/controller/TeamController';
import TeamService from '../database/service/TeamService';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/:id', teamController.findById);
teamRouter.get('', teamController.getAll);

export default teamRouter;
