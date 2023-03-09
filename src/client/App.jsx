import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePlaylists } from './reducers/playlistReducer';
import Playlists from './components/Playlists';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
//import reactLogo from "./assets/react.svg";
//import "./App.css";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializePlaylists());
  }, [dispatch]);

  const [grade, setGrade] = useState(null);

  const handleGradeChange = (grade) => setGrade(grade);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home onGradeChange={handleGradeChange} />} />
        <Route path='/playlists' element={<Playlists grade={grade} />} />
      </Routes>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => (props.whiteColor ? 'white' : 'black')};
  }
`;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: blue;
`;
