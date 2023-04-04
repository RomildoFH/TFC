import bcrypt = require('bcryptjs');
import User from '../models/Users';

export default class UserService {
  constructor(private user = User) {}

  public async getByEmail(email: string, password: string) {
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);
    const result = await this.user.findOne({ where: { email } });
    if (!result) {
      return { type: 404, message: 'Invalid email or password' };
    }

    // const isPassword = bcrypt.compareSync(password, result.password);

    // if (!isPassword) {
    //   return { type: 404, message: 'Invalid email or password' };
    // }
    return { type: null, message: result };
  }
}
