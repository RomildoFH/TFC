import * as express from 'express';
import leaderRouter from './routes/leader.router';
import userRouter from './routes/login.router';
import matcheRouter from './routes/matche.router';
import teamRouter from './routes/team.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

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
    /* const teamService = new TeamService();
    const teamController = new TeamController(teamService);

    this.app.get('/teams/:id', teamController.findById);

    this.app.get('/teams', teamController.getAll);

    const userService = new UserService();
    const userController = new UserController(userService);

    this.app.get('/login/role', TokenValidation.validateToken, userController.getRole);
    this.app.post('/login', LoginValidate.validateRequest, userController.login);

    const matcheService = new MatcheService();
    const matcheController = new MatcheController(matcheService);

    this.app.patch(
      '/matches/:id/finish',
      TokenValidation.validateToken,
      matcheController.finishMatche,
    );
    this.app.get('/matches', matcheController.getAll); */

    this.app.use('/login', userRouter);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matcheRouter);
    this.app.use('/leaderboard', leaderRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
