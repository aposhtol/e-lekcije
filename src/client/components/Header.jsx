import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../reducers/userReducer';
import {
  Head,
  Logo,
  Nav,
  UserWrapper,
  StyledLink,
  LinkWRedirect,
  Button,
} from './StyledComponents';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(handleLogout());
    navigate('/');
  };

  return (
    <Head>
      <Link style={{ textDecoration: 'none' }} to='/'>
        <Logo>e-lekcije</Logo>
      </Link>
      <Nav>
        {user ? (
          <UserWrapper>
            <StyledLink to='/profile'>{user.username}</StyledLink>
            <Button onClick={() => logout()}>Odjava</Button>
          </UserWrapper>
        ) : (
          <div>
            <LinkWRedirect
              onClick={() =>
                navigate('/login', { state: { from: location.pathname } })
              }
            >
              Prijava
            </LinkWRedirect>
            <LinkWRedirect
              onClick={() =>
                navigate('/register', { state: { from: location.pathname } })
              }
            >
              Registracija
            </LinkWRedirect>
          </div>
        )}
      </Nav>
    </Head>
  );
};

export default Header;
