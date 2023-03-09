import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetGrades, selectGrade } from '../reducers/gradesReducer';
import { useEffect } from 'react';

const Home = ({ onGradeChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const grades = useSelector((state) => state.grades);

  const handleClick = (gr) => {
    onGradeChange(gr);
    navigate('/playlists');
    dispatch(resetGrades());
  };

  return (
    <>
      <div>Osnovna škola</div>
      <div>
        {grades
          .filter((gr) => gr.type === 'elem')
          .map((gr, index) => (
            <div key={index} onClick={() => handleClick(gr)}>
              {gr.name}
            </div>
          ))}
      </div>
      <br />
      <div>Srednja škola (gimnazija)</div>
      <div>
        {grades
          .filter((gr) => gr.type === 'high')
          .map((gr, index) => (
            <div key={index} onClick={() => handleClick(gr)}>
              {gr.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
