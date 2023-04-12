import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import PersonalizedErrors from './Mocks/error.mock';
import MatcheModel from '../database/models/Matches';
import leaderBoardMock from './Mocks/leaderBoard.mock';
import TeamModel from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /leaderboard/home', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('retorna statusHttp 200 ao fazer uam requisição do tipo get/leaderboard/home', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(leaderBoardMock.allTeams as TeamModel[]);

    sinon
      .stub(MatcheModel, "findAll")
      .resolves(leaderBoardMock.finishedMatches as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardMock.correctHomeReturn);
  });

  it('retorna statusHttp 500 e a mensagem "Internal Error" ao realizar requisição com dados válidos, mas falhar', async () => {

    sinon
      .stub(TeamModel, "findAll")
      .throws(new Error('Sorry'));

    sinon
      .stub(MatcheModel, "findAll")
      .resolves(leaderBoardMock.finishedMatches as unknown as MatcheModel[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
  
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});

describe('Testes da rota /leaderboard/away', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('retorna statusHttp 200 ao fazer uam requisição do tipo get/leaderboard/away', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(leaderBoardMock.allTeams as TeamModel[]);

    sinon
      .stub(MatcheModel, "findAll")
      .resolves(leaderBoardMock.finishedMatches as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardMock.correctAwayReturn);
  });

  it('retorna statusHttp 500 e a mensagem "Internal Error" ao realizar requisição com dados válidos, mas falhar', async () => {

    sinon
      .stub(TeamModel, "findAll")
      .throws(new Error('Sorry'));

    sinon
      .stub(MatcheModel, "findAll")
      .resolves(leaderBoardMock.finishedMatches as unknown as MatcheModel[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
  
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});

describe('Testes da rota /leaderboard', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('retorna statusHttp 200 ao fazer uam requisição do tipo get/leaderboard', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(leaderBoardMock.allTeams as TeamModel[]);

    sinon
      .stub(MatcheModel, "findAll")
      .resolves(leaderBoardMock.finishedMatches as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardMock.correctLeaderBoardReturn);
  });

  it('retorna statusHttp 500 e a mensagem "Internal Error" ao realizar requisição com dados válidos, mas falhar', async () => {

    sinon
      .stub(TeamModel, "findAll")
      .throws(new Error('Sorry'));

    sinon
      .stub(MatcheModel, "findAll")
      .resolves(leaderBoardMock.finishedMatches as unknown as MatcheModel[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')
  
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});
  
