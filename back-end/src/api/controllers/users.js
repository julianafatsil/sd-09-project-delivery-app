const jwt = require('jsonwebtoken');
const { join } = require('path');
const jwtKey = require('fs')
.readFileSync(join(__dirname, '..', '..', '..', 'jwt.evaluation.key'), {
  encoding: 'utf-8',
})
.trim();

const userService = require('../services/user');

const tokenConfig = (email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email } }, jwtKey, jwtConfig);
  return token;
};

const findUser = async (req, res) => {
  const { password, email } = req.body;
  const response = await userService.findUser({ password, email });
  const token = tokenConfig(email);
  if (!response) {
    return res.status(404).send({ hasToken: false });
  }
  return res.status(200).send({ user: { token, email, name: response.name, role: response.role } });
  // ponto de atencao para o token, talvez deixe de passar o requisito 4
};

const registerUser = async (req, res) => {
  console.log(req);
  const { password, name, email, role } = req.body;
  const response = await userService.registerUser({ password, name, email, role });
  const token = tokenConfig(email);
  if (!response) {
    return res.status(409).send({ alreadyExists: true });
  }
  // return res.status(201).send({ user: {name, email, token, role: 'customer' }});
  return res.status(201).send({ user: { token, email, name: response.name, role: response.role } });
};

module.exports = {
  findUser,
  registerUser,
};
