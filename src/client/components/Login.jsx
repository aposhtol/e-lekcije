import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { setLogin } from '../reducers/userReducer';
import {
  ARLContainer,
  RLCard,
  Form,
  RLTitle,
  RLP,
  Input,
  RLButton,
  NoticeWrapper,
  VLBack,
  ArrBack,
  BackText,
} from './StyledComponents';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    const userObj = { username, password };
    dispatch(setLogin(userObj));
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    user ? navigate(location.state?.from || '/') : null;
  }, [handleLogin]);

  return (
    <ARLContainer>
      <VLBack
        style={{ marginTop: '8rem', marginBottom: '-8rem' }}
        onClick={() => navigate(-1)}
      >
        <ArrBack />
        <BackText>Natrag</BackText>
      </VLBack>
      <RLCard>
        <Form onSubmit={handleLogin}>
          <RLTitle>Prijavite se</RLTitle>

          <Input
            required
            id='username'
            type='text'
            autoComplete='on'
            placeholder='Korisničko ime'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />

          <Input
            required
            id='password'
            type='password'
            autoComplete='on'
            placeholder='Lozinka'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
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
          <RLButton type='submit'>Prijava</RLButton>
          <RLP>
            Niste registrirani?{' '}
            <RLP as={Link} to='/register'>
              Registrirajte se
            </RLP>
          </RLP>
        </Form>
      </RLCard>
      {message && <NoticeWrapper>{message}</NoticeWrapper>}
    </ARLContainer>
  );
};

export default Login;
