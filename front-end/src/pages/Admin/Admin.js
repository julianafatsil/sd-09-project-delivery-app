import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3001';
let headers;
let adminConnectBack;

function Admin() {
  const [userName, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, trueOrFalse] = useState(true);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [invalidRegister, setInvalidRegister] = useState(false);
  const prefix = 'admin_manage__';
  const passMin = 6;
  const nameMin = 11;

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));
    console.log(userToken);
    if (userToken) {
      headers = {
        authorization: userToken.token };
    }
    adminConnectBack = axios.create({
      baseURL, headers,
    });
  }, []);

  const verifyDisabled = () => {
    const re = /(.+)@(.+){2,}\.(.+){2,}/;
    if (password.length >= passMin && re.test(email)
    && userName.length >= nameMin) {
      trueOrFalse(false);
    } else {
      trueOrFalse(true);
    }
  };

  const userChange = ({ target }) => {
    setUser(target.value);
    verifyDisabled();
  };

  const passwordChange = ({ target }) => {
    setPassword(target.value);
    verifyDisabled();
  };
  const emailChange = ({ target }) => {
    setEmail(target.value);
    verifyDisabled();
  };

  const roleChange = ({ target }) => {
    setRole(target.value);
    verifyDisabled();
  };

  const registerUser = async () => {
    adminConnectBack
      .post('/admin/register',
        { email, password, name: userName, role })
      .then((response) => {
        console.log(response.data.user);
        // saveTokenLocalStorage(response.data.user);
        // redirectCostummer();
      })
      .catch((error) => {
        console.log(error);
        setInvalidRegister(true);
      });
    setUser('');
    setEmail('');
    setPassword('');
    setRole('');
  };
  return (
    <div className="login-Page">
      <input
        className="name-input"
        name="userName"
        value={ userName }
        data-testid={ `${prefix}input-name` }
        onChange={ userChange }
        placeholder="User Name"
      />
      <input
        className="email-input"
        name="email"
        value={ email }
        data-testid={ `${prefix}input-email` }
        onChange={ emailChange }
        placeholder="User Email"
      />
      <input
        className="password-input"
        name="password"
        data-testid={ `${prefix}input-password` }
        value={ password }
        onChange={ passwordChange }
        placeholder="Password"
      />
      <select
        className="role-input"
        name="role"
        data-testid={ `${prefix}select-role` }
        value={ role }
        onChange={ roleChange }
        placeholder="Role"
      >
        <option value="customer">Consumidor</option>
        <option value="seller">Vendedor</option>
        <option value="administrator">Administrador</option>
      </select>
      <div className="buttons">
        <button
          type="button"
          className="signin-button"
          data-testid={ `${prefix}button-register` }
          onClick={ registerUser }
          disabled={ isDisabled }
        >
          REGISTER
        </button>
        {invalidRegister ? (
          <div data-testid={ `${prefix}element-invalid-register` }>
            REGISTRO INVALIDO
            {' '}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Admin;
