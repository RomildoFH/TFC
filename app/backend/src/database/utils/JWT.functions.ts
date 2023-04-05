import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET || 'xablau';
const configJWT: SignOptions = { algorithm: 'HS256', expiresIn: '24h' };

export const createJWT = (payload: Omit<IUser, 'password'>): string =>
  jwt.sign(payload, secret, configJWT);

export const verifyToken = (token: string) => jwt.verify(token, secret);
