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
