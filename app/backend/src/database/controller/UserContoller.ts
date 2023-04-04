import { NextFunction, Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  constructor(private userService: UserService) {}

  public login = async (
    req: Request,
    res: Response,
    // next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      if (email.length < 1 || password.length < 1) {
        return res.status(404).json({ message: 'All fields must be filled' });
      }
      const { type, message } = await this.userService.getByEmail(email, password);
      if (type) {
        return res.status(type).json(message);
      }
      return res.status(201).json(message);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };
}
