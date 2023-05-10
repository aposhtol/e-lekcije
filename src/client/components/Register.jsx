import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { register } from '../reducers/userReducer';
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
          <RLTitle>Registracija</RLTitle>
          <RLP>
            Postupak registracije ciljano od korisnika ne traži nikakve osobne
            podatke, čak ni e-mail adresu, kako bi se osigurala što veća
            anonimnost i zaštitio identitet korisnika. Preporučuje se
            registrirati s korisničkim imenom koje ni po čemu ne otkriva
            identitet.
          </RLP>

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
          <RLButton type='submit'>Registrirajte se</RLButton>
          <RLP>
            Već ste registrirani?{' '}
            <RLP as={Link} to='/login'>
              Prijavite se
            </RLP>
          </RLP>
        </Form>
      </RLCard>
      {message && <NoticeWrapper>{message}</NoticeWrapper>}
    </ARLContainer>
  );
};

export default Register;
