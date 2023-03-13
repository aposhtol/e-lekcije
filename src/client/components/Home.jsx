import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = ({ onGradeChange }) => {
  const grades = useSelector((state) => state.grades);
  const navigate = useNavigate();

  const handleClick = (gr) => {
    onGradeChange(gr);
    navigate('/playlists');
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
          .map((gr) => (
            <div key={crypto.randomUUID()} onClick={() => handleClick(gr)}>
              {gr.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
