import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Head>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <Logo>e-lekcije</Logo>
        </Link>
        <Nav>
          <StyledLink to='/about'>O stranici</StyledLink>
        </Nav>
      </Head>
    </>
  );
};

export default Header;

const Head = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
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
  //border: 1px solid black;
`;

const Logo = styled.h1`
  font-size: 4.8rem;
  font-family: 'Shadows Into Light', cursive;
  padding: 2rem;
  //padding-left: 10rem;
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(29, 63, 212, 0.5);
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
  font-size: 2.2rem;
  color: #0000cd;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1.2rem;
  //height: 100%;
  text-shadow: 0px 0px 5px rgba(19, 37, 170, 0.5);
  &:hover {
    color: #000000;
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
