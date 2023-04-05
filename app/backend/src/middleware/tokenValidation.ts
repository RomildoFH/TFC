import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../database/utils/JWT.functions';
// import IRequest from '../database/interfaces/IRequest';
// import IUser from '../database/interfaces/IUser';

export default class TokenValidation {
  public static validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const decoded = verifyToken(authorization);
      req.body.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
