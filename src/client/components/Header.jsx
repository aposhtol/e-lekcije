import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Head>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <Logo>e-lekcije</Logo>
        </Link>
        <Nav>
          <StyledLink to='/about'>O aplikaciji</StyledLink>
          <StyledLink as='a' href='https://github.com/aposhtol' target='_blank'>
            GitHub
          </StyledLink>
        </Nav>
      </Head>
    </>
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

const Head = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  background: linear-gradient(
    90deg,
    hsla(186, 33%, 94%, 1) 0%,
    hsla(216, 41%, 79%, 1) 100%
  );
  box-shadow: 0px 4px 10px 5px rgba(29, 63, 212, 0.5);
  //padding: 0 -10rem;
`;

const Logo = styled.h1`
  font-size: 3.6rem;
  font-family: 'Shadows Into Light', cursive;
  padding-bottom: 0.8rem;
  padding-top: 0.5rem;
  //padding-left: 10rem;
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(55, 16, 166, 0.5);
  &:hover {
    color: #107fa6;
  }

  animation: ${popOut} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 380px) {
    font-size: 2.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  //padding-right: 10rem;
  /* @media screen and (max-width: 768px) {
    display: none;
  }*/
`;

const StyledLink = styled(Link)`
  font-size: 1.8rem;
  color: #1443d5;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1.2rem;
  //height: 100%;
  text-shadow: 0px 0px 5px rgba(125, 148, 219, 0.5);
  &:hover {
    color: #107fa6;
  }

  @media only screen and (max-width: 380px) {
    font-size: 1.4rem;
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
