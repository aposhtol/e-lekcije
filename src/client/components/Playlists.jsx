import { Link } from 'react-router-dom';

const Playlists = ({ grade, newList }) => {
  return (
    <>
      <div>
        {grade && grade.grade} razred{' '}
        {!grade
          ? null
          : grade.type == 'elem'
          ? 'osnovne škole'
          : 'srednje škole'}
      </div>

      <br />
      {newList.map((pl) => (
        <div key={pl.id}>
          <Link to={`/playlists/${pl.id}`}>
            {pl.title.match(/(?<=,\s|,Š\s)(.*?)(?=\s2|,)/g)}
          </Link>
        </div>
      ))}
      <br />
      <div>
        <Link to='/older'>Starije lekcije</Link>
      </div>
    </>
  );
};

export default Playlists;
