import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../reducers/userReducer';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Head>
      <Link style={{ textDecoration: 'none' }} to='/'>
        <Logo>e-lekcije</Logo>
      </Link>
      <Nav>
        {user ? (
          <UserWrapper>
            <StyledLink to='/profile'>{user.username}</StyledLink>
            <Button onClick={() => dispatch(handleLogout())}>Odjava</Button>
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

const popOut = keyframes`
  0% {
    letter-spacing: 1em;
    transform: translateZ(300px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: translateZ(12px);
    filter: blur(0);
    opacity: 1;
  }
`;

const slideInTop = keyframes`
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  `;

const Head = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
  background: linear-gradient(
    90deg,
    hsla(186, 33%, 94%, 1) 0%,
    hsla(216, 41%, 79%, 1) 100%
  );
  box-shadow: 0px 4px 10px 5px rgba(29, 63, 212, 0.5);

  animation: ${slideInTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const Logo = styled.h1`
  font-size: 3.6rem;
  font-family: 'Shadows Into Light', cursive;
  padding-bottom: 0.8rem;
  padding-top: 0.5rem;
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(55, 16, 166, 0.5);
  &:hover {
    color: #107fa6;
  }

  animation: ${popOut} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 528px) {
    font-size: 2.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  //visibility: hidden;
`;

const UserWrapper = styled.div`
  font-size: 1.8rem;
  color: #1443d5;
  //padding: 0 1.2rem;
  text-shadow: 0px 0px 5px rgba(125, 148, 219, 0.5);

  @media only screen and (max-width: 528px) {
    font-size: 1.4rem;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.8rem;
  color: #1443d5;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1.2rem;
  //text-shadow: 0px 0px 5px rgba(125, 148, 219, 0.5);
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  &:hover {
    color: #107fa6;
  }

  @media only screen and (max-width: 528px) {
    font-size: 1.6rem;
  }
`;

const LinkWRedirect = styled.span`
  font-size: 1.8rem;
  color: #1443d5;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1.2rem;
  //text-shadow: 0px 0px 5px rgba(125, 148, 219, 0.5);
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  &:hover {
    color: #107fa6;
  }

  @media only screen and (max-width: 528px) {
    font-size: 1.6rem;
  }
`;

const Button = styled.button`
  font-size: 1.4rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  font-variant: small-caps;
  margin: 2rem;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1.5rem;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgba(0, 3, 255, 1) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;
/*const Hamburger = styled(FaBars)`
  display: none;
  color: #0000cd;
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 2.8rem;
    //margin-left: 2rem;
    top: 2rem;
    right: 0;
    position: absolute;
    cursor: pointer;
    transform: translate(-100%, 75%);
  }
`;*/
