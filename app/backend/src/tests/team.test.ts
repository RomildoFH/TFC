import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';
import TeamsMock from './Mocks/team.mock';

import { Response } from 'superagent';
import PersonalizedErrors from './Mocks/error.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('Retorna statusHttp 200, ao realizar requisitção get/teams', async () => {

    sinon
      .stub(TeamModel, "findAll")
      .resolves( TeamsMock as TeamModel[]);

    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamsMock);

    // (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('Retorna statusHttp 500, ao ocorrer um erro na requisição get /teams', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .throws(new Error('Sorry'));

    chaiHttpResponse = await chai
       .request(app).get('/teams');
    

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });

  it('Retorna statusHttp 200 e um objeto com os dados de time específico, ao realizar requisitção get/teams/:id', async () => {
    
    sinon
      .stub(TeamModel, "findOne")
      .resolves( TeamsMock[0] as TeamModel);

      const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200)
    expect(body).to.deep.equal(TeamsMock[0])
  });

  it('Retorna statusHttp 404 e a mensagem "Team not found" quando feita requisição com um id inexistente', async () => {

    sinon
      .stub(TeamModel, "findOne")
      .resolves( undefined )

      const { status, body } = await chai.request(app).get('/teams/999');

    expect(status).to.be.equal(404);
    expect(body).to.deep.equal({ message: "Team not found" })
  });

  it('Retorna statusHttp 500, ao ocorrer um erro na requisição get /teams/:id', async () => {
    sinon
      .stub(TeamModel, "findOne")
      .throws(new Error('Sorry'));

    chaiHttpResponse = await chai
       .request(app).get('/teams/1');
    

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});
