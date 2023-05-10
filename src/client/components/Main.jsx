import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Flex, FlexItem, Title } from './StyledComponents';
import bgiHigh from '../assets/images/mid.webp';
import bgiElem from '../assets/images/elem.webp';

const Home = ({ onGradeChange }) => {
  const grades = useSelector((state) => state.grades);
  const navigate = useNavigate();

  const handleClick = (gr) => {
    onGradeChange(gr);
    navigate('/playlists');
  };

  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimated(false);
    }, 550);
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
