import styled, { keyframes } from 'styled-components';
import Cogs from '../assets/images/player-cogs.svg';

const About = () => {
  return (
    <Container>
      <Card>
        <Title>
          e-lekcije je web aplikacija kojoj je namjera lakše snalaženje s
          mnogobrojnim video lekcijama objavljenim na YouTube kanalu
          "i-nastava".
        </Title>
        <P>
          U razdoblju između 2020. i 2022. tijek pandemije koronavirusa je
          zahtijevao da se nastava u RH u nekim kritičnim razdobljima odvija na
          daljinu. Prve video lekcije sa svrhom nastave na daljinu nastale su u
          sklopu projekta kurikularne reforme "Škola za život" u šk. god.
          2019./2020. Ove video lekcije objavljene su na YouTube-u pod
          istoimenim kanalom. Za šk. god. 2020./2021. nadležno Ministarstvo
          započinje projekt "i-nastava" pod istoimenim kanalom za predmetnu
          nastavu osnovne škole i srednju školu (gimnazijski program), dok je
          program razredne nastave objavljivan na kanalu "Škola na Trećem".
          Video lekcije dobile su još jednu iteraciju za šk. god. 2021./2022.
          Ovaj agregator za sada obuhvaća video lekcije kanala "i-nastava" za
          šk. god. 2020./2021. (kartice predmeta koje nisu označene školskom
          godinom) i šk. god. 2021./2022.
        </P>
        <Em>
          Sav video materijal u ovoj web aplikaciji je produciran od strane
          Ministarstva znanosti i obrazovanja Republike Hrvatske.
        </Em>
      </Card>
    </Container>
  );
};

export default About;

const scaleIn = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  color: #1443d5;
  max-width: 800px;
  margin: 10rem 2rem;
  text-align: center;
  padding: 2rem;
  background-image: url(${Cogs});
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${scaleIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 2rem auto;
`;

const P = styled.p`
  font-size: 1.8rem;
  padding: 1.5rem 0;
  line-height: 2.7rem;
  text-align: justify;
`;

const Em = styled.p`
  font-weight: bold;
  font-style: italic;
  font-size: 1.8rem;
  margin: 2rem auto;
  line-height: 2.5rem;
`;
