import { createJWT } from "../../database/utils/JWT.functions";

const UserReturn = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

const UserRequest = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};

const RequestWithoutEmail = {
  email: '',
  password: 'secret_admin'
}

const RequestWithoutPass = {
  email: 'admin@admin.com',
  password: ''
};

const RequestInvalidEmail = {
  email: '@admin.com',
  password: 'secret_admin'
};

const RequestInvalidPass = {
  email: 'admin@admin.com',
  password: 'sec'
};

const RequestWrongEmail = {
  email: 'adminnn@admin.com',
  password: 'secret_admin'
};

const RequestWrongPass = {
  email: 'admin@admin.com',
  password: 'not_secret_admin'
};

const TokenMock = () => {
  return createJWT({
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  });
};

const InvalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjgwNzM2MzcxLCJleHAiOjE2ODA4MjI3NzF9.d9CZAU8qfIvPRni6GygFgnJM65grx8M8csE6hFcdBUk'

const TokenDecoded = {
  "id": 1,
  "username": "Admin",
  "email": "admin@admin.com",
  "role": "admin",
  "iat": 1680736371,
  "exp": 1680822771
};

const UserMocks = { UserReturn, UserRequest, TokenMock, RequestWithoutEmail, RequestWithoutPass, RequestInvalidEmail, RequestInvalidPass, RequestWrongEmail, RequestWrongPass, TokenDecoded, InvalidToken };

export default UserMocks;
