import { Request, Response } from 'express';
import MatcheService from '../service/MatcheService';
import PersonalizedErrors from '../../tests/Mocks/error.mock';

export default class MatcheController {
  constructor(private matcheService: MatcheService) {}

  public getAll = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { inProgress } = req.query;
      if (inProgress === undefined) {
        const { message } = await this.matcheService.getAll();
        return res.status(200).json(message);
      }
      if (inProgress === 'true') {
        const { message } = await this.matcheService.getAllFiltred(true);
        return res.status(200).json(message);
      }
      const { message } = await this.matcheService.getAllFiltred(false);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };

  public finishMatche = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { id } = req.params;
      await this.matcheService.finishMatche(Number(id)); // pode implementar condição para avaliar se nenhuma linha foi alterada, sendo o retorno = 0;
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };

  public updateMatche = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { message } = await this.matcheService
        .updateMatche(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ affectedRows: message });
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };

  public createMatche = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const { message } = await this.matcheService.createMatche(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json(PersonalizedErrors.internal);
    }
  };
}

//
