import { Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  constructor(private userService: UserService) {}

  public login = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { email, password } = req.body;
      const { type, message } = await this.userService.getByEmail(email, password);
      if (type) {
        return res.status(type).json({ message });
      }
      return res.status(200).json({ token: message });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };

  public getRole = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { email } = req.body.user;
      const { message } = await this.userService.getRole(email);
      return res.status(200).json({ role: message });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };
}
