import * as express from 'express';
import MatcheController from './database/controller/MatcheController';
import TeamController from './database/controller/TeamController';
import UserController from './database/controller/UserContoller';
import MatcheService from './database/service/MatcheService';
import TeamService from './database/service/TeamService';
import UserService from './database/service/UserService';
import LoginValidate from './middleware/loginValidation';
import TokenValidation from './middleware/tokenValidation';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    const teamService = new TeamService();
    const teamController = new TeamController(teamService);

    this.app.get('/teams/:id', teamController.findById);

    this.app.get('/teams', teamController.getAll);

    const userService = new UserService();
    const userController = new UserController(userService);

    this.app.get('/login/role', TokenValidation.validateToken, userController.getRole);
    this.app.post('/login', LoginValidate.validateRequest, userController.login);

    const matcheService = new MatcheService();
    const matcheController = new MatcheController(matcheService);

    this.app.get('/matches', matcheController.getAll);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
