import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePlaylists } from './reducers/playlistReducer';
//import reactLogo from "./assets/react.svg";
//import "./App.css";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

function App() {
  //const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists);

  useEffect(() => {
    dispatch(initializePlaylists());
  }, [dispatch]);

  return (
    <>
      <div>
        Playlists:
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.playlistId}</li>
        ))}
      </div>
    </>
  );
}

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
