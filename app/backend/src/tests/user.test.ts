import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import PersonalizedErrors from './Mocks/error.mock';
import UserModel from '../database/models/Users';
import UserMocks from './Mocks/user.mock';
import * as Jwt from '../database/utils/JWT.functions';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da roda /login', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('Retorna statusHttp 200 e um token válido, ao realizar requisição para post /login', async () => {
    const token = UserMocks.TokenMock();
    sinon
      .stub(UserModel, "findOne")
      .resolves( UserMocks.UserReturn as UserModel);

    sinon
      .stub(Jwt, "createJWT")
      .returns(token)

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(UserMocks.UserRequest);

      // console.log(chaiHttpResponse)
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ token });
  });

  it('Retorna statusHttp 400 quando não é informado um e-mail', async () => {
    // sinon
    //   .stub(UserController, "")
    //   .resolves( UserMocks.UserReturn as UserModel);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(UserMocks.RequestWithoutEmail);
    
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.fieldsNotFilled);
  });

  it('Retorna statusHttp 400 quando não é informado um password', async () => {

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(UserMocks.RequestWithoutPass);
    
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.fieldsNotFilled);
  });

  it('Retorna statusHttp 401 quando email informado não é válido', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(UserMocks.RequestInvalidEmail);
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.invalidData);
});

  it('Retorna statusHttp 401 quando password informado possui menos de 6 dígitos', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(UserMocks.RequestInvalidPass);
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.invalidData);
});

  it('Retorna statusHttp 401 quando e-mail não é cadastrado', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(undefined);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(UserMocks.RequestWrongEmail);
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.invalidData);
  });

  it('Retorna statusHttp 401 quando password não é correto', async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(UserMocks.UserReturn as UserModel);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(UserMocks.RequestWrongPass);
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.invalidData);
  });

  it('Retorna statusHttp 200 e um token válido, ao realizar requisição para post /login', async () => {
    const token = UserMocks.TokenMock();
    sinon
      .stub(UserModel, "findOne")
      .throws(new Error('Sorry'));

    sinon
      .stub(Jwt, "createJWT")
      .returns(token)

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(UserMocks.UserRequest);
    
      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});

describe('Testes da rota /login/role', () => {

  afterEach(() => {
    sinon.restore();
  });

  let chaiHttpResponse: Response;

  it('Retorna statusHttp 200 e uma role no body da resposta', async () => {
    const token = UserMocks.TokenMock();

    sinon
      .stub(UserModel, "findOne")
      .resolves(UserMocks.UserReturn as UserModel);

    sinon
    .stub(Jwt, "verifyToken")
    .returns(UserMocks.TokenDecoded);

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', token);    
      
    // console.log(chaiHttpResponse);
      
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  });

  it('Retorna statusHttp 401 e a mensagem "Token not found" quando não passado um token através do headers', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', '');
      
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.tokenNotFound);
  });

  it('Retorna statusHttp 401 e a mensagem "Token must be a valid token" quando token inválido', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', UserMocks.InvalidToken);
      
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.mustBeToken);
  });

  it('Retorna statusHttp 200 e uma role no body da resposta', async () => {
    const token = UserMocks.TokenMock();

    sinon
      .stub(UserModel, "findOne")
      .throws(new Error('Sorry'));

    sinon
    .stub(Jwt, "verifyToken")
    .returns(UserMocks.TokenDecoded);

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', token);    
      
    // console.log(chaiHttpResponse);
      
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.deep.equal(PersonalizedErrors.internal);
  });
});
