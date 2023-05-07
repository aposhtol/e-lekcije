import {
  Foot,
  Nav,
  Heading,
  StyledLink,
  GHIcon,
  LIIcon,
  FlyIcon,
} from './StyledComponents';

const Footer = () => {
  return (
    <Foot>
      <Heading>
        agregator YouTube kanala <i>i-nastava</i>
      </Heading>
      <Nav>
        <StyledLink to='/about'>O aplikaciji</StyledLink>
        <StyledLink
          as='a'
          href='https://www.linkedin.com/in/aposhtol/'
          target='_blank'
          alt='LinkedIn Icon'
        >
          <LIIcon />
        </StyledLink>
        <StyledLink
          as='a'
          href='https://github.com/aposhtol'
          target='_blank'
          alt='GitHub Icon'
        >
          <GHIcon />
        </StyledLink>
        <StyledLink
          as='a'
          href='https://fly.io'
          target='_blank'
          alt='Fly.io icon'
        >
          <FlyIcon />
        </StyledLink>
      </Nav>
    </Foot>
  );
};

export default Footer;
