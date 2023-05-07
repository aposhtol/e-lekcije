import { useState, useEffect } from 'react';
import {
  CardsContainer,
  CardsTitle,
  Grid,
  CardItem,
  CardImg,
  CardTextArea,
  CardText,
} from './StyledComponents';

const Playlists = ({ grade, filteredList }) => {
  const [animated, setAnimated] = useState(true);
  const [hidden, setHidden] = useState(true);

  const cardTitle = (
    <>
      {grade && grade.grade}. razred{' '}
      {!grade ? null : grade.type == 'elem' ? 'osnovne škole' : 'srednje škole'}
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 500);
  }, []);

  if (hidden) return null;

  return (
    <CardsContainer>
      <Grid>
        <CardsTitle>{cardTitle}</CardsTitle>

        {filteredList.map((pl) => (
          <CardItem
            to={`/playlists/${pl.playlistId}`}
            key={pl.id}
            animated={animated ? 1 : 0}
            onMouseOver={() => setAnimated(false)}
          >
            <CardImg
              src={pl.thumbnail}
              alt={pl.title.match(/(?<=Š, |Š |Š\.)(.*)/g)}
            />
            <CardTextArea>
              <CardText>{pl.title.match(/(?<=Š, |Š |Š\.)(.*)/g)}</CardText>
            </CardTextArea>
          </CardItem>
        ))}

        <CardsTitle>{cardTitle}</CardsTitle>
      </Grid>
    </CardsContainer>
  );
};

export default Playlists;
