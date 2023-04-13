import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../reducers/userReducer';
import styled, { keyframes } from 'styled-components';
import Cogs from '../assets/images/player-cogs.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const userObj = { username, password };
    dispatch(setLogin(userObj));
    navigate('/');
    setUsername('');
    setPassword('');
  };

  return (
    <Container>
      <Card>
        <h1>Prijavite se</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor='Username'>Korisničko ime:</label>
          <input
            required
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />

          <label htmlFor='Password'>Lozinka:</label>
          <input
            required
            id='password'
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />

          <button type='submit'>Prijava</button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;

const scaleIn = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 5rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  color: #1443d5;
  max-width: 800px;
  margin: 10rem 2rem;
  text-align: center;
  padding: 2rem;
  background-image: url(${Cogs});
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${scaleIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
