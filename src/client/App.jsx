import { useState } from 'react';
//import reactLogo from "./assets/react.svg";
//import "./App.css";
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => (props.whiteColor ? 'white' : 'black')};
  }
`;

function App() {
  //const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <p>e-lekcije</p>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  background-color: blue;
`;
