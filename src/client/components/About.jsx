import styled from 'styled-components';

const About = () => {
  return (
    <>
      <Container>
        <P>Zdravo ljudi!</P>
        <P>Kako smo danas?</P>
      </Container>
    </>
  );
};

export default About;

const P = styled.p`
  font-size: 1.8rem;
  color: black;
  padding: 1.5rem 0;
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;
  height: 100vh;
  margin: 0 auto;
`;
