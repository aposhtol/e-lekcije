import { Link } from 'react-router-dom';

const Older = ({ grade, oldList }) => {
  return (
    <>
      <div>
        <div>Starije lekcije</div>
        <br />
        {grade ? grade.grade : null}. razred{' '}
        {!grade
          ? null
          : grade.type == 'elem'
          ? 'osnovne škole'
          : 'srednje škole'}
      </div>
      <br />
      {oldList.map((pl) => (
        <div key={pl.id}>
          <Link to={`/older/${pl.id}`}>{pl.title.match(/(?<=,\s)(.*)/g)}</Link>
        </div>
      ))}
    </>
  );
};

export default Older;

//<div key={pl.id}>{pl.title.match(/(?<=,\s)(.*)/g)}</div>
