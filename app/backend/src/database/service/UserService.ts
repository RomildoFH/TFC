import bcrypt = require('bcryptjs');
import User from '../models/Users';
import { createJWT } from '../utils/JWT.functions';

export default class UserService {
  constructor(private user = User) {}

  public async getByEmail(email: string, password: string) {
    const search = await this.user.findOne(
      { where: { email } },
    );
    if (!search) {
      return { type: 401, message: 'Invalid email or password' };
    }

    const isPassword = bcrypt.compareSync(password, search.password);

    if (!isPassword) {
      return { type: 401, message: 'Invalid email or password' };
    }
    const { id, username, role } = search;
    const payload = { id, username, email, role };
    const token = createJWT(payload);
    return { type: null, message: token };
  }

  public async getRole(email:string) {
    const search = await this.user.findOne({ where: { email } });
    if (!search) {
      return { type: 401, message: 'User not found' };
    }
    const { role } = search;
    return { type: null, message: role };
  }
}
