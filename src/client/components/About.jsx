import { ARLContainer, ATitle, Card, AP, Em } from './StyledComponents';

const About = () => {
  return (
    <ARLContainer>
      <Card>
        <ATitle>
          e-lekcije je web aplikacija kojoj je namjera lakše snalaženje s
          mnogobrojnim video lekcijama objavljenim na YouTube kanalu
          "i-nastava".
        </ATitle>
        <AP>
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
        </AP>
        <Em>
          Sav video materijal u ovoj web aplikaciji je produciran od strane
          Ministarstva znanosti i obrazovanja Republike Hrvatske.
        </Em>
      </Card>
    </ARLContainer>
  );
};

export default About;
