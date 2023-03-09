import { useSelector, useDispatch } from 'react-redux';

const Playlists = ({ grade }) => {
  const dispatch = useDispatch();

  const playlists = useSelector((state) => state.playlists);

  console.log(grade);

  return (
    <>
      {playlists
        .filter((pl) => pl.type == grade.type && pl.grade == grade.grade)
        .map((pl) => (
          <li key={pl.id}>{pl.title}</li>
        ))}
    </>
  );
};

export default Playlists;
