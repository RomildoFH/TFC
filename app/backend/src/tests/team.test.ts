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

  // afterEach(()=>{
  //   (TeamModel.findAll as sinon.SinonStub).restore();
  // })

  it('Retorna statusHttp 200, ao realizar requisitção get/teams', async () => {

    sinon
      .stub(TeamModel, "findAll")
      .resolves( TeamsMock as TeamModel[]);

    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamsMock);

    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('Retorna statusHttp 200 e um objeto com os dados de time específico, ao realizar requisitção get/teams/:id', async () => {
    
    sinon
      .stub(TeamModel, "findByPk")
      .resolves( TeamsMock[0] as TeamModel);

      const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200)
    expect(body).to.deep.equal(TeamsMock[0])
  });
});
