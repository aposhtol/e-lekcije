import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import bgiHigh from '../assets/images/alexander-grey-eMP4sYPJ9x0-unsplash.jpg';
import bgiElem from '../assets/images/leohoho-rngTKHXumy0-unsplash.jpg';
const Home = ({ onGradeChange }) => {
  const grades = useSelector((state) => state.grades);
  const navigate = useNavigate();

  const handleClick = (gr) => {
    onGradeChange(gr);
    navigate('/playlists');
  };

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <>
      <Container>
        <Div bgi={bgiElem}>Osnovna škola</Div>
        <Grid>
          {grades
            .filter((gr) => gr.type === 'elem')
            .map((gr) => (
              <GridItem
                animated={animated}
                onMouseOver={() => setAnimated(false)}
                key={crypto.randomUUID()}
                onClick={() => handleClick(gr)}
              >
                {gr.name}
              </GridItem>
            ))}
        </Grid>

        <br />
        <Div bgi={bgiHigh}>Srednja škola (gimnazija)</Div>
        <Grid>
          {grades
            .filter((gr) => gr.type === 'high')
            .map((gr) => (
              <GridItem
                animated={animated}
                onMouseOver={() => setAnimated(false)}
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

const hoverItem = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
`;

const appear = keyframes`
  0% {
    transform: translateZ(-800px) rotateX(90deg);
    opacity: 0;
  }
  54% {
    transform: translateZ(-160px) rotateX(87deg);
    opacity: 1;
  }
  100% {
    transform: translateZ(0) rotateX(0);
  }
`;

const slideDiv = keyframes`
  0% {
    transform: translateY(-500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
`;

const Container = styled.main`
  width: 80vw;
  height: 100%;
  margin: 0 auto;
  margin-top: 16rem;
  overflow-x: visible;
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
  color: #1443d5;
  font-size: 3.2rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  padding: 4rem;
  text-align: center;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  animation: ${({ animated }) => animated && appear} 0.45s ease-out both;

  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

const Div = styled.div`
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(55, 16, 166, 0.5);
  font-size: 4.8rem;
  margin: 4rem auto;
  text-align: center;
  padding: 4rem;
  border-radius: 10px;
  background: ${({ bgi }) => `url(${bgi}) no-repeat center`};

  animation: ${slideDiv} 1.1s both;

  @media only screen and (max-width: 690px) {
    font-size: 3.2rem;
  }
`;
