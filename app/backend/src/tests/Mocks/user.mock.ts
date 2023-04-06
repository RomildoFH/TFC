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

const TokenMock = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjgwNzc3MTg3LCJleHAiOjE2ODA4NjM1ODd9.UgjsSJazMyfVQJBEtgEQypRCUxunAg-nSChrjGP-VXw' };

const UserMocks = { UserReturn, UserRequest, TokenMock, RequestWithoutEmail, RequestWithoutPass, RequestInvalidEmail, RequestInvalidPass, RequestWrongEmail, RequestWrongPass };

export default UserMocks;
