import { Router } from 'express';
import MatcheController from '../database/controller/MatcheController';
import MatcheService from '../database/service/MatcheService';
import TokenValidation from '../middleware/tokenValidation';

const matcheRouter = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

matcheRouter.patch('/:id/finish', TokenValidation.validateToken, matcheController.finishMatche);
matcheRouter.patch('/:id', TokenValidation.validateToken, matcheController.updateMatche);
matcheRouter.post('/', TokenValidation.validateToken, matcheController.createMatche);
matcheRouter.get('/', matcheController.getAll);

export default matcheRouter;
