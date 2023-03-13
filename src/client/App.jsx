import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePlaylists } from './reducers/playlistReducer';
import Playlists from './components/Playlists';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Older from './components/Older';
import Videolist from './components/Videolist';
import PlayerView from './components/PlayerView';

// styled-components
import { createGlobalStyle } from 'styled-components';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializePlaylists());
  }, [dispatch]);

  const playlists = useSelector((state) => state.playlists);

  const [grade, setGrade] = useState([]);

  const filteredList = playlists.filter(
    (pl) => pl.type == grade.type && pl.grade == grade.grade
  );

  const oldList = [];
  const newList = [];

  for (let i = 0; i < filteredList.length; i++) {
    filteredList[i].title.match(/(?<=Š,|Š).*?(?=2)/)
      ? newList.push(filteredList[i])
      : oldList.push(filteredList[i]);
  }

  useEffect(() => {
    const data = window.localStorage.getItem('GRADE_STATE');
    if (data !== null) {
      setGrade(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('GRADE_STATE', JSON.stringify(grade));
  }, [grade]);

  const handleGradeChange = (grade) => setGrade(grade);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home onGradeChange={handleGradeChange} />} />
        <Route
          path='playlists'
          element={<Playlists grade={grade} newList={newList} />}
        />
        <Route path='playlists/:id' element={<Videolist />} />
        <Route path='playlists/:id/:id' element={<PlayerView />} />
        <Route
          path='older'
          element={<Older grade={grade} oldList={oldList} />}
        />
        <Route path='older/:id' element={<Videolist />} />
        <Route path='older/:id/:id' element={<PlayerView />} />
      </Routes>
    </>
  );
};

export default App;
