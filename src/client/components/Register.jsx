import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { register } from '../reducers/userReducer';
//import Notification from './Notification';
import styled, { keyframes } from 'styled-components';
import Cogs from '../assets/images/player-cogs.svg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const user = useSelector((state) => state.user);
  const message = useSelector((state) => state.notification);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    if (email) {
      return null;
    }
    /*if (message !== '') {
      return message;
    }*/

    const userObj = { username, password, confirm };
    dispatch(register(userObj));
    setUsername('');
    setPassword('');
    setConfirm('');
  };

  useEffect(() => {
    user ? navigate(location.state?.from || '/') : null;
  }, [handleLogin]);

  return (
    <Container>
      <Card>
        <Form onSubmit={handleLogin}>
          <Title>Registracija</Title>
          <P>
            Postupak registracije ciljano od korisnika ne traži nikakve osobne
            podatke, čak ni e-mail adresu, kako bi se osigurala što veća
            anonimnost i zaštitio identitet korisnika. Preporučuje se
            registrirati s korisničkim imenom koje ni po čemu ne otkriva
            identitet.
          </P>

          <Input
            required
            id='username'
            type='text'
            autoComplete='on'
            maxLength={30}
            value={username}
            name='Username'
            placeholder='Korisničko ime (min. 4 znaka)'
            onChange={({ target }) => setUsername(target.value)}
          />

          <Input
            required
            id='password'
            type='password'
            autoComplete='on'
            value={password}
            name='Password'
            placeholder='Lozinka (min. 8 znakova)'
            onChange={({ target }) => setPassword(target.value)}
          />

          <Input
            required
            id='confirm'
            type='password'
            autoComplete='on'
            value={confirm}
            name='Confirm'
            placeholder='Lozinka ponovno'
            onChange={({ target }) => setConfirm(target.value)}
          />
          <Input
            style={{ visibility: 'hidden' }}
            id='email'
            type='email'
            autoComplete='off'
            tabIndex='-1'
            value={email}
            name='Email'
            placeholder='E-mail'
            onChange={({ target }) => setEmail(target.value)}
          />
          <Button type='submit'>Registrirajte se</Button>
          <P>
            Već ste registrirani?{' '}
            <P as={Link} to='/login'>
              Prijavite se
            </P>
          </P>
        </Form>
      </Card>
      {message && <NoticeWrapper>{message}</NoticeWrapper>}
    </Container>
  );
};

export default Register;

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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  font-family: inherit;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  color: #1443d5;
  margin: 10rem 2rem;
  width: 800px;
  padding: 4rem;
  background-image: url(${Cogs});
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${scaleIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    width: min-content;
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-variant: small-caps;
  margin: 0 auto;

  @media only screen and (max-width: 1016px) {
    font-size: 2.8rem;
  }
`;

const P = styled.p`
  margin-top: -2rem;
  font-size: 1.4rem;
  color: #14003a;
  text-align: justify;
  padding-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  font-size: 2rem;
  margin: 0 auto;
`;

const Input = styled.input`
  font-size: inherit;
  background-color: #ffffffb2;
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 0 2rem;
  height: 4rem;
  color: #1443d5;

  &::placeholder {
    font-size: 1.8rem;
  }
`;

const Button = styled.button`
  font-size: 1.4rem;
  font-variant: small-caps;
  margin-bottom: 2rem;
  margin-top: -6rem;
  width: 15rem;
  color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  background: rgb(6, 14, 131);
  background: linear-gradient(0deg, #060e83 0%, #0c1ab4 100%);
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(0deg, #0004ff 0%, #027efb 100%);
  }
`;

const NoticeWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 3rem;
  padding: 1rem;
  font-family: inherit;
  color: #fff;
  text-align: center;
  z-index: 11;
  background: #1443d5;
  background: linear-gradient(to right, #1443d5 0%, #0c2a85 50%, #091f63 100%);

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;
