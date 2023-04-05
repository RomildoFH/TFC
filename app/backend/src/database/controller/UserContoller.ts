import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import UserService from '../service/UserService';

const secret = process.env.JWT_SECRET || 'xablau';
const configJWT: SignOptions = { algorithm: 'HS256', expiresIn: '1h' };

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
      const token = jwt.sign({ email }, secret, configJWT);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };
}
