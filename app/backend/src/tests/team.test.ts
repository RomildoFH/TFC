import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';
import TeamsMock from './Mocks/team.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  afterEach(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('Retorna statusHttp 200, ao realizar requisitção get/teams', async () => {

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves( TeamsMock as TeamModel[]);
  });

    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be('200');
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamsMock);
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
