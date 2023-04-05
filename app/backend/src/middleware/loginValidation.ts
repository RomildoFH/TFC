import { NextFunction, Request, Response } from 'express';
import InputValidator from '../validations/InputValidator';

export default class LoginValidate {
  public static validateRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const isEmail = InputValidator.validateEmail(email);
    if (!isEmail || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
