import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Home = ({ onGradeChange }) => {
  const grades = useSelector((state) => state.grades);
  const navigate = useNavigate();

  const handleClick = (gr) => {
    onGradeChange(gr);
    navigate('/playlists');
  };

  return (
    <>
      <Container>
        <Div>Osnovna škola</Div>
        <Grid>
          {grades
            .filter((gr) => gr.type === 'elem')
            .map((gr) => (
              <GridItem
                key={crypto.randomUUID()}
                onClick={() => handleClick(gr)}
              >
                {gr.name}
              </GridItem>
            ))}
        </Grid>

        <br />
        <Div>Srednja škola (gimnazija)</Div>
        <Grid>
          {grades
            .filter((gr) => gr.type === 'high')
            .map((gr) => (
              <GridItem
                key={crypto.randomUUID()}
                onClick={() => handleClick(gr)}
              >
                {gr.name}
              </GridItem>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.main`
  width: 80vw;
  margin: 0 auto;
  margin-top: 20rem;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 400px));
  grid-gap: 4rem;
  justify-content: center;
  align-content: center;
  margin-bottom: 4rem;
  @media only screen and (max-width: 1235px) {
    grid-template-columns: repeat(2, minmax(200px, 400px));
  }
  @media only screen and (max-width: 690px) {
    grid-template-columns: repeat(1, minmax(200px, 400px));
  }
`;

const GridItem = styled.div`
  font-size: 2.4rem;
  border: 1px solid #ccc;
  padding: 6rem;
  text-align: center;
`;

const Div = styled.div`
  font-size: 4.8rem;
  margin: 4rem auto;
  text-align: center;
  padding: 4rem;
  border: 1px solid #ccc;
  @media only screen and (max-width: 690px) {
    font-size: 3.2rem;
  }
`;
