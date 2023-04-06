import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import PersonalizedErrors from './Mocks/error.mock';
import UserModel from '../database/models/Users';
import UserMocks from './Mocks/user.mock';
import * as Jwt from '../database/utils/JWT.functions'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da roda /login', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('Retorna statusHttp 200 e um token válido, ao realizar requisição para post /login', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves( UserMocks.UserReturn as UserModel);

    sinon
      .stub(Jwt, "createJWT")
      .returns(UserMocks.TokenMock.token)

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(UserMocks.UserRequest);

      // console.log(chaiHttpResponse)
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(UserMocks.TokenMock);
  });
});