import { Request } from 'express';
import IUser from './IUser';

interface IRequest extends Request {
  user: Omit<IUser, 'password'>
}

export default IRequest;
