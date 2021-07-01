import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
    }
  }, [result.data, setToken]);

  if (!show) {
    return null;
  }

  const submit = async event => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername('');
    setPassword('');
    setPage('authors') 
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <div>
          Username:
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password:
          <input value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
