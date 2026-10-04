import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';

// Mock reducers
const mockStore = configureStore({
  reducer: {
    playlists: () => [],
    user: () => null,
  },
});

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });
});
