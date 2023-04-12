import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import bgiHigh from '../assets/images/mid.webp';
import bgiElem from '../assets/images/elem.webp';
import Cogs from '../assets/images/main-cogs.svg';

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
    <Container>
      <Title bgi={bgiElem}>Osnovna škola</Title>
      <Flex>
        {grades
          .filter((gr) => gr.type === 'elem')
          .map((gr) => (
            <FlexItem
              animated={animated}
              onMouseOver={() => setAnimated(false)}
              key={crypto.randomUUID()}
              onClick={() => handleClick(gr)}
            >
              {gr.name}
            </FlexItem>
          ))}
      </Flex>

      <Title bgi={bgiHigh}>Srednja škola (gimnazija)</Title>
      <Flex>
        {grades
          .filter((gr) => gr.type === 'high')
          .map((gr) => (
            <FlexItem
              animated={animated}
              onMouseOver={() => setAnimated(false)}
              key={crypto.randomUUID()}
              onClick={() => handleClick(gr)}
            >
              {gr.name}
            </FlexItem>
          ))}
      </Flex>
    </Container>
  );
};

export default Home;

const hoverItem = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 20px 10px rgba(0, 140, 255, 0.5);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 6rem;

  @media only screen and (max-width: 380px) {
    margin-top: 8.5rem;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;

  @media only screen and (max-width: 1016px) {
    gap: 1rem;
  }

  @media only screen and (max-width: 380px) {
    gap: 0.5rem;
  }
`;

const FlexItem = styled.div`
  color: #1443d5;
  width: 19.55rem;
  font-size: 2.4rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  padding: 2rem;
  text-align: center;
  cursor: pointer;

  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  background-image: url(${Cogs});

  animation: ${({ animated }) => animated && appear} 0.45s ease-out both;

  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @media only screen and (max-width: 1016px) {
    width: 16rem;
    font-size: 2rem;
  }

  @media only screen and (max-width: 380px) {
    width: 14rem;
    font-size: 1.8rem;
  }
`;

const Title = styled.div`
  width: 100%;
  max-width: 170.4rem;
  color: #1034a6;
  text-shadow: rgba(55, 16, 166, 0.5) 0px 0px 10px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989993px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756803px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279416px 0px;

  font-size: 3.2rem;
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: ${({ bgi }) => `url(${bgi}) no-repeat center`};
  background-size: cover;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  animation: ${slideDiv} 1.1s both;

  @media only screen and (max-width: 1016px) {
    font-size: 2.6rem;
  }

  @media only screen and (max-width: 380px) {
    font-size: 2.4rem;
  }
`;
