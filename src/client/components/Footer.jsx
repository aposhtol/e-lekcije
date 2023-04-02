import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <Foot>
        <StyledLink to='/about'>O aplikaciji</StyledLink>
        <StyledLink as='a' href='https://github.com/aposhtol' target='_blank'>
          <GHIcon />
        </StyledLink>
      </Foot>
    </>
  );
};

export default Footer;

const slideInBottom = keyframes`
    0% {
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;

const Foot = styled.footer`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 4rem;
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

  animation: ${slideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 380px) {
    height: 3rem;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.8rem;
  color: #1443d5;
  cursor: pointer;
  text-decoration: none;
  //padding: 0 1.2rem;
  text-shadow: 0px 0px 5px rgba(125, 148, 219, 0.5);
  &:hover {
    color: #107fa6;
  }

  @media only screen and (max-width: 380px) {
    font-size: 1.4rem;
  }
`;

const GHIcon = styled(FaGithub)`
  font-size: 3rem;
  vertical-align: middle;

  @media only screen and (max-width: 380px) {
    font-size: 2rem;
  }
`;
