import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import PersonalizedErrors from './Mocks/error.mock';
import * as Jwt from '../database/utils/JWT.functions';
import MatcheModel from '../database/models/Matches';
import MatcheMocks from './Mocks/matche.mock';
import UserMocks from './Mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matche', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('retorna statusHttp 200 ao fazer uam requisição do tipo get/matches', async () => {
    sinon
      .stub(MatcheModel, "findAll")
      .resolves(MatcheMocks.AllMatches as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(MatcheMocks.AllMatches);
  });

  it('retorna statusHttp 200 ao fazer uam requisição do tipo get/matches?inProgress=true', async () => {
    sinon
      .stub(MatcheModel, "findAll")
      .resolves(MatcheMocks.MatcheInProgress as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(MatcheMocks.MatcheInProgress);
  });

  it('retorna statusHttp 200 ao fazer uam requisição do tipo get/matches?inProgress=false', async () => {
    sinon
      .stub(MatcheModel, "findAll")
      .resolves(MatcheMocks.MatcheFinished as unknown as MatcheModel[]);

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(MatcheMocks.MatcheFinished);
  });

  it('retorna statusHttp 500 ao fazer uam requisição do tipo get/matches e falhar', async () => {
    sinon
      .stub(MatcheModel, "findAll")
      .throws(new Error('Sorry'));

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
  
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});

describe('Testes da rota matches/:id/finish', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('Ao realizar requisição sem um token informado, recebe statusHttp 401 e a mensagem "Token not found"', async () => {
    
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/2/finish')
      .set('authorization', '');
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.tokenNotFound);
  });

  it('Ao realizar requisição sem um token invalido, recebe statusHttp 401 e a mensagem "Token must be a valid token"', async () => {
    
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/2/finish')
      .set('authorization', UserMocks.InvalidToken);
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.mustBeToken);
  });

  it('retorna statusHttp 200 e a mensagem "Finished" ao realizar requisição com dados válidos', async () => {
    const token = UserMocks.TokenMock();
    
    sinon
      .stub(MatcheModel, "update")
      .resolves([1]);
    
    sinon
      .stub(Jwt, "verifyToken")
      .returns(UserMocks.TokenDecoded);

      chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/2/finish')
      .set('authorization', token);  
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(MatcheMocks.CorrectReturn);
  });
});

